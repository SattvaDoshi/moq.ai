import { QUESTION_PROMPT } from "@/services/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    // Ensure all required fields are present
    if (!jobPosition || !jobDescription || !duration || !type) {
        return NextResponse.json(
            { error: true, message: "Missing required fields in the request body." },
            { status: 400 }
        );
    }

    const FINAL_PROMPT = QUESTION_PROMPT
  .replaceAll("{jobTitle}", jobPosition)
  .replaceAll("{jobDescription}", jobDescription)
  .replaceAll("{duration}", duration)
  .replaceAll("{type}", type);

    // Initialize the OpenAI client with OpenRouter configuration
    // It's cleaner to set default headers here for all requests made with this client
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPEN_ROUTER_API_KEY
    });

    console.log("FINAL_PROMPT:", FINAL_PROMPT);
    

    // Make the API call to OpenRouter
    const completion = await openai.chat.completions.create({
      // CORRECTED: Use a valid and available model name for OpenRouter.
      // "google/gemini-2.5-flash-preview" is not a valid identifier.
      // "google/gemini-flash-1.5" is the correct name for the Gemini 1.5 Flash model.
      model: "google/gemini-flash-1.5", 
      messages: [
        { role: "user", content: FINAL_PROMPT },
      ],
      // Add additional parameters for more control over the response
      temperature: 0.7,
      max_tokens: 1000,
    });

    const messageContent = completion.choices[0]?.message?.content;

    if (!messageContent) {
        return NextResponse.json(
            { error: true, message: "Received an empty response from the AI model." },
            { status: 500 }
        );
    }

    // Try to parse the content as JSON. If it fails, return the raw text.
    let questions;
    try {
      // The response from some models might be a JSON string.
      questions = JSON.parse(messageContent);
    } catch (parseError) {
      // If parsing fails, it's likely plain text. Wrap it in the expected structure.
      questions = [{ question: messageContent }];
    }
    
    return NextResponse.json({ questions });

  } catch (e) {
    console.error("API Error:", e);

    // IMPROVED: More specific error handling
    if (e instanceof OpenAI.APIError) {
      if (e.status === 404) {
        // Handle model not found error specifically
        return NextResponse.json(
          { 
            error: true, 
            message: "The requested AI model was not found.",
            details: e.message, // The message from OpenRouter is helpful
            solution: "Please verify the model name is correct and available on OpenRouter.ai."
          }, 
          { status: 404 }
        );
      }
      if (e.status === 400 && e.message?.includes("data policy")) {
        // Handle data policy errors
        return NextResponse.json(
          { 
            error: true, 
            message: "OpenRouter data policy error. Please check your account settings.",
            details: e.message,
            solution: "Go to https://openrouter.ai/settings and adjust your data privacy settings."
          }, 
          { status: 400 }
        );
      }
    }
    
    // Generic fallback for any other errors
    return NextResponse.json(
      { error: true, message: e.message || "An unexpected error occurred." }, 
      { status: 500 }
    );
  }
}

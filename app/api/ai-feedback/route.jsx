import { FEEDBACK_PROMPT } from "@/services/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    // Validate that the conversation data is a non-empty array
    if (!Array.isArray(conversation) || conversation.length === 0) {
      return NextResponse.json(
        {
          error: true,
          message: "Invalid or empty conversation data. An array of messages is required.",
        },
        { status: 400 }
      );
    }

    console.log(`Processing feedback for a conversation with ${conversation.length} messages.`);

    // Replace the placeholder with the stringified conversation
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation, null, 2));

    // Initialize the OpenAI client with OpenRouter configuration
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPEN_ROUTER_API_KEY,
      defaultHeaders: {
        "HTTP-Referer": process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:3000",
        "X-Title": "AI Recruiter App", // Or your app's name
      },
    });

    // Make the API call to OpenRouter
    const completion = await openai.chat.completions.create({
      // CORRECTED: Use the valid model name for Gemini 1.5 Flash
      model: "google/gemini-flash-1.5",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      temperature: 0.7,
      max_tokens: 2000, // Increased max tokens for potentially longer feedback
      // Instruct the model to return a JSON object for easier parsing
      response_format: { type: "json_object" },
    });

    const messageContent = completion.choices[0]?.message?.content;

    if (!messageContent) {
        return NextResponse.json(
            { error: true, message: "Received an empty response from the AI model." },
            { status: 500 }
        );
    }

    // Try to parse the JSON response
    try {
      const feedbackData = JSON.parse(messageContent);
      return NextResponse.json({
        success: true,
        feedback: feedbackData,
      });
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      // If parsing fails, return the raw content so the client can inspect it
      return NextResponse.json({
        success: false,
        rawContent: messageContent,
        message: "Failed to parse the AI's response into the expected JSON format.",
        error: parseError.message,
      }, { status: 500 });
    }

  } catch (e) {
    console.error("API Error:", e);

    // IMPROVED: Specific error handling for different API errors
    if (e instanceof OpenAI.APIError) {
      if (e.status === 404) {
        return NextResponse.json(
          {
            error: true,
            message: "The requested AI model was not found on OpenRouter.",
            details: e.message,
            solution: "Please verify the model name ('google/gemini-flash-1.5') is correct and available on OpenRouter.ai.",
          },
          { status: 404 }
        );
      }
      // You can add more specific status checks here if needed (e.g., 401 for auth, 429 for rate limits)
    }

    // Generic fallback for any other errors
    return NextResponse.json(
      { error: true, message: e.message || "An unexpected error occurred while fetching feedback." },
      { status: 500 }
    );
  }
}

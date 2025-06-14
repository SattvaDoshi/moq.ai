import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { QUESTIONS_PROMPT } from "@/services/Constants";

export async function POST(req) {
  const {
    JobPosition,
    JobDescription,
    InterviewDuration,
    InterviewType,
    ExperienceLevel,
  } = await req.json();

  

  // Replace placeholders in the prompt
  let FINAL_PROMPT = QUESTIONS_PROMPT
  .replace("{{jobTitle}}", JobPosition || "")
  .replace("{{jobDescription}}", JobDescription || "")
  .replace("{{duration}}", InterviewDuration || "")
  .replace("{{interviewType}}", Array.isArray(InterviewType) ? InterviewType.join(", ") : InterviewType || "")
  .replace("{{experience}}", ExperienceLevel || "");

  // Models to try in order (free tier first)
  const modelsToTry = [
    "gemini-1.5-flash",           // Free tier, fastest
    "gemini-1.5-pro",             // Free tier with higher limits
    "gemini-2.0-flash-exp",       // Alternative experimental model
    "gemini-pro"                  // Fallback legacy model
  ];


  for (let i = 0; i < modelsToTry.length; i++) {
    const modelName = modelsToTry[i];
    
    try {
      console.log(`Trying model: ${modelName}`);
      
      // Initialize Google Generative AI API with API Key
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

      // Specify the generative model
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 2048,
        },
      });

      // Generate content using the final prompt
      const result = await model.generateContent(FINAL_PROMPT);
      const response = await result.response;
      const text = await response.text();

      console.log(`Success with model: ${modelName}`);
      
      // Return the generated text as JSON response
      return NextResponse.json({ 
        result: text,
        modelUsed: modelName 
      });

    } catch (error) {
      console.error(`Error with model ${modelName}:`, error.message);
      
      // If this is the last model and it failed, return error
      if (i === modelsToTry.length - 1) {
        // If all models failed, provide a fallback response
        const fallbackQuestions = generateFallbackQuestions(JobPosition, ExperienceLevel, InterviewDuration);
        
        return NextResponse.json({ 
          result: JSON.stringify(fallbackQuestions),
          fallback: true,
          error: "All AI models failed, using fallback questions"
        });
      }
      
      // Continue to next model
      continue;
    }
  }
}

// Fallback function to generate basic questions when AI fails
function generateFallbackQuestions(jobPosition, experienceLevel, duration) {
  const questionCount = duration === "5 min" ? 3 : duration === "15 min" ? 5 : 8;
  
  const fallbackQuestions = {
    interviewQuestions: []
  };

  // Basic questions based on job position and experience
  if (jobPosition.toLowerCase().includes('frontend') || jobPosition.toLowerCase().includes('react')) {
    if (experienceLevel === 'fresher') {
      fallbackQuestions.interviewQuestions = [
        { question: "What is React and why would you use it?", type: "Technical" },
        { question: "Explain the difference between props and state in React.", type: "Technical" },
        { question: "What motivates you to work in frontend development?", type: "Behavioral" },
        { question: "Describe a project you've worked on using React.", type: "Experience" },
        { question: "How do you handle debugging in your code?", type: "Problem Solving" }
      ].slice(0, questionCount);
    } else {
      fallbackQuestions.interviewQuestions = [
        { question: "Explain React hooks and when you would use them.", type: "Technical" },
        { question: "How do you optimize React application performance?", type: "Technical" },
        { question: "Describe a challenging technical problem you solved.", type: "Problem Solving" },
        { question: "How do you handle state management in large applications?", type: "Technical" },
        { question: "Tell me about a time you had to learn a new technology quickly.", type: "Behavioral" }
      ].slice(0, questionCount);
    }
  } else {
    // Generic questions for other positions
    fallbackQuestions.interviewQuestions = [
      { question: "Tell me about yourself and your experience.", type: "Experience" },
      { question: "What interests you about this role?", type: "Behavioral" },
      { question: "Describe a challenging project you've worked on.", type: "Experience" },
      { question: "How do you approach problem-solving?", type: "Problem Solving" },
      { question: "Where do you see yourself in the next few years?", type: "Behavioral" }
    ].slice(0, questionCount);
  }

  return fallbackQuestions;
}
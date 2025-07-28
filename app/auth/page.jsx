"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, Sparkles, Target, TrendingUp } from "lucide-react";

export default function Login() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Check if user is signed in, Clerk is loaded, and we are not already redirecting
    if (isLoaded && isSignedIn && !redirecting) {
      console.log("User is signed in, preparing to redirect...");
      setRedirecting(true); // Set redirecting state to true to prevent loops
      router.replace("/dashboard");
    }
  }, [isSignedIn, isLoaded, router, redirecting]);

  // Show a loading state while Clerk is initializing
  if (!isLoaded || redirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">
            {redirecting ? "Redirecting to your dashboard..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // Render the login page only if Clerk is loaded and the user is not signed in
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-lighten opacity-70 animate-pulse blur-xl"></div>
        <div className="absolute top-0 -left-20 w-72 h-72 bg-green-500/10 rounded-full mix-blend-lighten opacity-70 animate-pulse animation-delay-2000 blur-xl"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-lighten opacity-70 animate-pulse animation-delay-4000 blur-xl"></div>
      </div>

      <div className="lg:grid lg:min-h-screen lg:grid-cols-12 relative z-10">
        {/* Left side - Branding */}
        <section className="relative flex h-32 items-end bg-gradient-to-br from-gray-800 to-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-green-900/30"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%239C92AC%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

          <div className="hidden lg:relative lg:block lg:p-12">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center">
                <Brain size={24} className="text-white" />
              </div>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                InterviewAce
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-6">
              Master Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">Interviews</span>
            </h2>

            <p className="text-lg leading-relaxed text-gray-300 mb-8">
              Sign in and transform your interview skills with AI-powered practice sessions,
              personalized study plans, and intelligent resume optimization.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Target size={16} className="text-blue-400" />
                </div>
                <span className="text-gray-300">AI-powered mock interviews</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <TrendingUp size={16} className="text-green-400" />
                </div>
                <span className="text-gray-300">Personalized study planning</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Sparkles size={16} className="text-purple-400" />
                </div>
                <span className="text-gray-300">Resume analysis & optimization</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right side - Sign In */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-2xl w-full">
            <div className="relative -mt-16 block lg:hidden mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-green-600 flex items-center justify-center">
                  <Brain size={24} className="text-white" />
                </div>
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                  InterviewAce
                </div>
              </div>

              <h1 className="text-2xl font-bold text-white text-center sm:text-3xl md:text-4xl mb-4">
                Welcome Back!
              </h1>

              <p className="text-center text-gray-400 text-sm">
                Sign in to continue your interview preparation journey
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"></div>
              
              <div className="relative p-8 lg:p-12">
                <div className="text-center">
                  <div className="hidden lg:block mb-8">
                    <h1 className="text-3xl font-bold text-white mb-4">
                      Welcome Back!
                    </h1>
                    <p className="text-gray-400">
                      Sign in to access your personalized interview preparation dashboard
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-sm">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-600 rounded-xl flex items-center justify-center">
                        <Brain size={32} className="text-white" />
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white text-center mb-2">
                    Ready to Ace Your Interviews?
                  </h2>
                  
                  <p className="text-center text-gray-400 mb-6">
                    Your AI-powered interview preparation platform
                  </p>
                  
                  <p className="text-center text-gray-500 text-sm mb-8">
                    Please sign in to continue your journey
                  </p>

                  <SignInButton mode="modal">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white shadow-lg transition-all duration-300 text-lg py-6 rounded-xl">
                      <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </Button>
                  </SignInButton>

                  <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Secure & Private</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Free to Start</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log("User is signed in, redirecting to dashboard...");
      // Add a slight delay to ensure the redirect happens
      const timeoutId = setTimeout(() => {
        router.replace("/dashboard");
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isSignedIn, isLoaded, router]);

  // Show loading while checking auth status
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is signed in, optionally show redirecting message
  if (isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4">Redirecting to dashboard...</p>
        <Button 
          onClick={() => router.replace("/dashboard")} 
          variant="outline"
          className="mt-4"
        >
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border rounded-2xl p-8 ">
        <Image
          src="/logo.svg"
          alt="logo"
          width={400}
          height={100}
          className="w-[180px]"
        />
        <div className="flex flex-col items-center">
          <Image
            src="/ai.jpeg"
            alt="login"
            width={600}
            height={400}
            className="w-[400px] h-[250px] rounded-2xl mt-3"
          />
          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome To Ai Recruiter
          </h2>
          <p className="text-center text-gray-600">
            Your AI powered recruitment assistant
          </p>
          <p className="text-center text-gray-600">
            Please login to continue
          </p>

          <SignInButton mode="modal">
            <Button className="mt-7 w-full">Login With Google</Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}

export default Login;
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error("OAuth error:", error.message);
      alert("Failed to sign in. Please try again.");
    }

    setLoading(false);
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* LEFT IMAGE & BRANDING */}
        <section className="relative flex h-48 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="AI Career Assistant"
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="relative z-10 p-8 text-white lg:p-12">
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Welcome to Moq.AI 🧠
            </h2>
            <p className="mt-4 max-w-md text-white/90">
              Your AI-powered companion for interview prep and career growth.
              Get expert mock interviews, feedback, and career path insights in minutes.
            </p>
          </div>
        </section>

        {/* RIGHT LOGIN PANEL */}
        <main className="flex items-center justify-center px-6 py-12 sm:px-12 lg:col-span-7 xl:col-span-6">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Moq.AI</h1>
              <p className="mt-2 text-sm text-gray-600">
                Accelerate your career with AI-powered tools & insights
              </p>
            </div>

            <div className="space-y-4">
              <Button
                className="w-full"
                onClick={signInWithGoogle}
                disabled={loading}
              >
                {loading ? "Redirecting..." : "Login with Google"}
              </Button>
              <p className="text-center text-xs text-gray-400">
                By continuing, you agree to Moq.AI’s Terms & Privacy Policy.
              </p>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

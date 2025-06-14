"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useUser } from "./provider";
import Image from "next/image";

const HomePage = () => {
  const router = useRouter();
  const { user } = useUser;

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navbar */}
      <header className="flex justify-between items-center px-10 py-6 bg-background/60 backdrop-blur border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-center gap-3">
          <Image src={'logo.svg'} alt={'logo'} width={50} height={50} className={"w-[50px] h-[50px] text-primary"}/>
          <div className="text-2xl font-bold text-primary">Moq.AI</div>
        </div>
        <Button
          onClick={() => router.push("/auth")}
          variant="default"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 px-6 text-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900 via-indigo-900 to-background opacity-30 blur-2xl" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          AI-Driven Interviews,<br /> Hassle-Free Hiring
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
          Create, send, and manage smart interviews in minutes with intelligent automation built for modern teams.
        </p>
        <Button
          onClick={() => router.push(user ? "/dashboard" : "/auth")}
          className="mt-8 px-8 py-3 text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          Get Started
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </section>

      {/* Features */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          {
            title: "Create Interviews",
            desc: "Build structured interviews for any role in seconds.",
          },
          {
            title: "Track Candidates",
            desc: "Review candidate performance with AI-generated reports.",
          },
          {
            title: "Automate Follow-ups",
            desc: "Send invites and reminders seamlessly from your dashboard.",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-card text-card-foreground p-6 rounded-2xl shadow-xl border border-border hover:shadow-2xl transition"
          >
            <h3 className="text-xl font-semibold text-primary mb-2">
              {feature.title}
            </h3>
            <p className="text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center py-20 bg-muted/10 border-t border-border">
        <h2 className="text-3xl font-bold">Ready to streamline your hiring?</h2>
        <p className="mt-2 text-muted-foreground">
          Start creating interviews and discover talent like never before.
        </p>
        <Button
          onClick={() => router.push("/auth")}
          className="mt-6 px-8 py-3 bg-primary hover:bg-primary/90 text-white"
        >
          Launch Now
        </Button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} AIcruiter. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;

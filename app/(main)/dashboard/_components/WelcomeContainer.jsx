"use client";
import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";

const WelcomeContainer = () => {
  const { user } = useUser();

  return (
    <div className="bg-[#1F1F2B] p-5 rounded-xl flex items-center justify-between shadow-md border border-[#2A2A3B]">
      <div>
        <h1 className="text-2xl font-bold text-primary">
          Welcome Back, {user?.name}
        </h1>
        <p className="text-gray-400">AI-Driven Interviews, Hassle-free Hiring</p>
      </div>
      {user?.picture && (
        <Image
          src={user.picture}
          alt="user avatar"
          width={40}
          height={40}
          className="rounded-full border border-gray-600"
        />
      )}
    </div>
  );
};

export default WelcomeContainer;

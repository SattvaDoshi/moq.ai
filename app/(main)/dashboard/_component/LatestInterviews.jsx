'use client';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import React, { useState } from 'react';

const LatestInterviews = () => {
  const [InterviewList, setInterviewList] = useState([]);

  return (
    <div className="w-[80vw] px-5 mt-8 ">
      <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 sm:p-8 lg:p-10">
        {/* Gradient Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-blue-400/5 to-purple-500/10 z-0"></div>

        {/* Decorative Blurs */}
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse z-0"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500 z-0"></div>

        {/* Content */}
        <div className="relative z-10 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-300 text-transparent bg-clip-text">
            Previous Interviews
          </h1>

          {InterviewList?.length === 0 ? (
            <div className="flex flex-col items-center text-center gap-4 mt-8">
              <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-full border border-white/10">
                <Camera className="w-8 h-8 text-white/70" />
              </div>
              <h2 className="text-lg font-semibold text-white/80">
                You don’t have any previous interviews
              </h2>
              <p className="text-sm text-white/60">
                Start now and schedule your first mock interview!
              </p>
              <Button className="mt-2">Create your Interview</Button>
            </div>
          ) : (
            <div>
              {/* List of past interviews will go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestInterviews;
 
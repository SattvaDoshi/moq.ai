"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { useRouter } from "next/navigation";

const InterviewSVG = () => (
  <svg width="280" height="200" viewBox="0 0 280 200" className="my-6">
    {/* Background elements */}
    <defs>
      <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.4"/>
      </linearGradient>
      <linearGradient id="personGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1"/>
        <stop offset="100%" stopColor="#8b5cf6"/>
      </linearGradient>
    </defs>
    
    {/* Desk */}
    <rect x="20" y="140" width="240" height="8" rx="4" fill="#374151" opacity="0.8"/>
    
    {/* Monitor */}
    <rect x="80" y="60" width="120" height="80" rx="8" fill="#1f2937" stroke="#4b5563" strokeWidth="2"/>
    <rect x="85" y="65" width="110" height="70" rx="4" fill="url(#screenGlow)"/>
    
    {/* Monitor stand */}
    <rect x="135" y="140" width="10" height="15" fill="#374151"/>
    <rect x="125" y="150" width="30" height="4" rx="2" fill="#374151"/>
    
    {/* Person silhouette */}
    <g className="animate-pulse">
      <circle cx="140" cy="90" r="12" fill="url(#personGradient)" opacity="0.9"/>
      <rect x="130" y="102" width="20" height="25" rx="10" fill="url(#personGradient)" opacity="0.9"/>
    </g>
    
    {/* Floating UI elements */}
    <g className="animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3s'}}>
      <circle cx="50" cy="40" r="8" fill="#10b981" opacity="0.7"/>
      <circle cx="46" cy="40" r="2" fill="white"/>
    </g>
    
    <g className="animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}>
      <rect x="210" y="35" width="25" height="10" rx="5" fill="#f59e0b" opacity="0.7"/>
    </g>
    
    <g className="animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3s'}}>
      <rect x="45" y="160" width="15" height="15" rx="3" fill="#ef4444" opacity="0.7"/>
    </g>
    
    {/* Microphone */}
    <rect x="165" y="120" width="4" height="20" fill="#6b7280"/>
    <circle cx="167" cy="115" r="6" fill="#374151" stroke="#9ca3af" strokeWidth="1"/>
    
    {/* Sound waves */}
    <g className="animate-pulse" style={{animationDuration: '2s'}}>
      <path d="M175 110 Q180 108 180 115 Q180 122 175 120" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.6"/>
      <path d="M175 105 Q185 100 185 115 Q185 130 175 125" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.4"/>
    </g>
    
    {/* Network connection indicators */}
    <g className="animate-pulse" style={{animationDelay: '0.3s'}}>
      <rect x="25" y="25" width="3" height="8" fill="#10b981"/>
      <rect x="30" y="20" width="3" height="13" fill="#10b981"/>
      <rect x="35" y="15" width="3" height="18" fill="#10b981"/>
      <rect x="40" y="22" width="3" height="11" fill="#fbbf24"/>
    </g>
  </svg>
);

const Interview = () => {
  const { interview_id } = useParams();
  console.log(interview_id);

  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { InterviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    if (interview_id) {
      GetInterviewDetails();
    }
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from("Interviews")
        .select(
          "JobPosition, JobDescription, InterviewDuration, ExperienceLevel"
        )
        .eq("interview_id", interview_id);

      setInterviewData(Interviews[0]);
      console.log("data", Interviews[0]);
      setLoading(false);

      if (Interviews.length === 0) {
        toast.error("Interview not found", {
          style: {
            background: "#fee2e2",
            color: "#b91c1c",
            border: "1px solid #fca5a5",
          },
        });
      }
    } catch (error) {
      toast.error("Incorrect Interview Link", {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
        },
      });
    }
    setLoading(false);
  };

  const onJoinInterview = async () => {
    setLoading(true);
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("interview_id", interview_id);
    console.log("interview", Interviews[0]);
    if (error) {
      toast.error("Error fetching interview data", {
        style: {
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
        },
      });
      setLoading(false);
      return;
    }
    setInterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: Interviews[0],
    });
    router.push("/interview/" + interview_id + "/start");

    setLoading(false);
  };

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-10 ">
      <div className="flex flex-col justify-center items-center backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl px-8 py-8 w-full max-w-2xl mx-auto shadow-2xl">
        {/* Header with glassmorphism logo */}
        <div className="flex gap-3 items-center mb-2">
          <Image src={'/logo.svg'} alt="Logo" width={40} height={40} />
          <h1 className="text-3xl font-bold text-white">Moq.AI</h1>
        </div>
        
        <h2 className="text-gray-300 text-lg mb-2">AI-Powered Interview Platform</h2>
        
        {/* Animated Interview SVG */}
        <InterviewSVG />
        
        <h2 className="text-2xl font-bold mb-3 text-white text-center">
          {interviewData?.JobPosition}
        </h2>
        <div className="flex gap-2 items-center text-gray-400 mb-6">
          <Clock className="h-5 w-5" />
          <span className="text-lg">{interviewData?.InterviewDuration}</span>
        </div>
        
        {/* Input Fields with glassmorphism effect */}
        <div className="w-full space-y-4 mb-6">
          <div>
            <h2 className="text-md text-gray-100 dark:text-gray-300 mb-2 font-medium">
              Enter your full name
            </h2>
            <div className="relative">
              <Input
                placeholder="e.g. John Smith"
                onChange={(e) => setUserName(e.target.value)}
                className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-600/30 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-md text-gray-100 dark:text-gray-300 mb-2 font-medium">
              Enter your Email
            </h2>
            <div className="relative">
              <Input
                placeholder="e.g. john@gmail.com"
                onChange={(e) => setUserEmail(e.target.value)}
                className="backdrop-blur-md bg-white/50 dark:bg-gray-800/50 border border-white/30 dark:border-gray-600/30 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>
        
        {/* Info Card with glassmorphism */}
        <div className="w-full p-4 rounded-xl backdrop-blur-md bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/30 dark:border-blue-600/30 mb-6">
          <div className="flex gap-3">
            <Info className="text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" size={20} />
            <div>
              <h2 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Before you begin</h2>
              <ul className="space-y-1">
                <li className="text-sm text-blue-700 dark:text-blue-300">
                  • Test your camera and microphone
                </li>
                <li className="text-sm text-blue-700 dark:text-blue-300">
                  • Ensure you have a stable internet connection
                </li>
                <li className="text-sm text-blue-700 dark:text-blue-300">
                  • Find a quiet place for interview
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Enhanced Button with glassmorphism */}
        <Button
          className="mt-3 mb-7 w-full font-bold py-4 px-6 bg-gradient-to-r from-blue-500/90 to-purple-600/90 hover:from-blue-600/90 hover:to-purple-700/90 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 text-white"
          disabled={loading || !userName || !userEmail}
          onClick={() => onJoinInterview()}
        >
          <Video className="mr-2" size={20} />
          {loading && <Loader2Icon className="mr-2 animate-spin" size={20} />}
          {loading ? 'Joining Interview...' : 'Join Interview'}
        </Button>
      </div>
    </div>
  );
};

export default Interview;
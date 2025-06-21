"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState } from "react";
import { CameraIcon } from "lucide-react";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { Button } from "@/components/ui/button";

const ScheduledInterview = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
    const result = await supabase
      .from("Interviews")
      .select(
        "JobPosition, InterviewDuration, interview_id, interview-feedback(userEmail)"
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });
    console.log(result);
    setInterviewList(result.data);
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-xl">
        Interview List with Candidate Feedback
      </h2>
      {interviewList?.length === 0 ? (
        <div className="p-6 mt-6 flex flex-col items-center gap-4 bg-[#1F1F2B] border border-[#2A2A3B] rounded-xl shadow-md">
          <CameraIcon className="h-10 w-10 text-purple-500 bg-purple-900/20 p-2 rounded-lg" />
          <h2 className="text-gray-300">You haven't created any interviews yet.</h2>
          <Button variant="default" className="bg-primary hover:bg-purple-700 text-white">
            Create New Interview
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
          {interviewList?.map((interview, index) => (
            <InterviewCard
              key={index}
              interview={interview}
              viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduledInterview;

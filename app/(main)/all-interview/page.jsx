"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { CameraIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";

const page = () => {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    console.log(Interviews);
    setInterviewList(Interviews);
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl">All Previously Created Interview</h2>
      {interviewList?.length == 0 ? (
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
            <InterviewCard key={index} interview={interview} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;

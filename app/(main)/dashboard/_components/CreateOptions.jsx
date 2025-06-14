import { Video, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

const CreateOptions = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {/* AI-Powered Interview Card */}
      <Link
        href="/dashboard/create-interview"
        className="bg-[#1F1F2B] border border-[#2A2A3B] rounded-2xl p-5 shadow-md hover:shadow-xl transition"
      >
        <Video className="p-3 text-primary bg-purple-900/30 rounded-xl h-12 w-12" />
        <h2 className="mt-4 text-lg font-semibold text-white">Create New Interview</h2>
        <p className="text-gray-400 text-sm">Generate AI-powered mock interviews</p>
      </Link>

      {/* Resume-Based Interview Card */}
      <Link
        href="/dashboard/resume-interview"
        className="bg-[#1F1F2B] border border-[#2A2A3B] rounded-2xl p-5 shadow-md hover:shadow-xl transition"
      >
        <FileText className="p-3 text-primary bg-purple-900/30 rounded-xl h-12 w-12" />
        <h2 className="mt-4 text-lg font-semibold text-white">Generate Interview from Resume</h2>
        <p className="text-gray-400 text-sm">
          Upload a resume to create a personalized interview
        </p>
      </Link>
    </div>
  );
};

export default CreateOptions;

import React from "react";
import moment from "moment";
import { Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

const InterviewCard = ({ interview, viewDetail = false }) => {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/interview/" + interview?.interview_id;

  const CopyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Link copied to clipboard!");
  };

  const onSend = () => {
    window.location.href =
      `mailto:${interview?.userEmail}?subject=` +
      encodeURIComponent("AiCruiter Link") +
      `&body=` +
      encodeURIComponent("Interview Link: " + url);
  };

  return (
    <div className="p-5 bg-[#1F1F2B] border border-[#2A2A3B] rounded-xl shadow-sm text-white">
      <div className="flex items-center justify-between">
        <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
          {interview?.JobPosition?.[0] ?? "J"}
        </div>
        <h2 className="text-sm text-gray-400">{moment(interview?.created_at).format("MMM DD, YYYY")}</h2>
      </div>

      <h2 className="mt-3 font-semibold text-lg text-primary">{interview?.JobPosition}</h2>

      <h2 className="mt-2 flex justify-between text-sm text-gray-400">
        {interview?.InterviewDuration}
      </h2>

      <h2 className="text-xs text-gray-500 mt-2">
        {interview?.ExperienceLevel}
      </h2>

      {!viewDetail ? (
        <div className="flex justify-center gap-3 w-full mt-4">
          <div className="w-full">
            <Button variant="outline" className="w-full border-gray-700 text-gray-200 hover:border-primary" onClick={CopyLink}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
          </div>
          <div className="w-full">
            <Button className="w-full bg-primary hover:bg- text-white" onClick={onSend}>
              <Send className="mr-2 h-4 w-4" /> Send
            </Button>
          </div>
        </div>
      ) : (
        <Link href={`/scheduled-interview/${interview?.interview_id}/details`} className="block mt-5">
          <Button className="w-full bg-primary hover:bg-purple-700 text-white">View Detail</Button>
        </Link>
      )}
    </div>
  );
};

export default InterviewCard;

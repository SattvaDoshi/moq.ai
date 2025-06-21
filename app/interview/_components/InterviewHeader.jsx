import Image from "next/image";
import React from "react";

const InterviewHeader = () => {
  return (
    <div className="flex items-center gap-3">
      <Image
        src={"/logo.svg"}
        alt="logo"
        width={50}
        height={50}
        className="w-[50px]"
      />
      <h1 className="text-2xl font-bold">Moq.AI</h1>
    </div>
  );
};

export default InterviewHeader;

import React from "react";
import DashboardProvider from "./provider";

const DashboardLayout = ({ children }) => {
  return (
    <div className=" ">
      <DashboardProvider>
        <div className="p-10 ">{children}</div>
      </DashboardProvider>
    </div>
  );
};

export default DashboardLayout;

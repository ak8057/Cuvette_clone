import React from "react";
import JobList from "./JobList";
import RightSidebar from "./RightSidebar";

const MainContent = () => {
  return (
    <main className="flex flex-row p-6 gap-5">
      <JobList />
      <RightSidebar />
    </main>
  );
};

export default MainContent;

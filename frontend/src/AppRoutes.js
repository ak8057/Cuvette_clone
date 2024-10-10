// src/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import FulltimeJobs from "./components/JobList";
import OtherJobs from "./pages/OtherJobs";
import AppliedJobs from "./pages/AppliedJobs"; // Assuming you have this component

const AppRoutes = () => {
  return (
    <main className="flex flex-row p-6 gap-5">
      <Routes>
        <Route path="/" element={<FulltimeJobs />} />
        <Route path="/fulltime-jobs" element={<FulltimeJobs />} />
        <Route path="/other-jobs" element={<OtherJobs />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        {/* Add more routes as needed */}
      </Routes>
    </main>
  );
};

export default AppRoutes;

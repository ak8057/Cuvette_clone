import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import {
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Users,
  DollarSign,
} from "lucide-react";

const AppliedJobs = () => {
  const [activeTab, setActiveTab] = useState("internship");
  const [loading, setLoading] = useState(false);

  const appliedInternships = [
    {
      _id: "1",
      title: "Internship at Tech Company",
      location: "New York, USA",
      officeType: "Remote",
      experience: "Fresher",
      salaryRange: { min: 2, max: 4 },
      skills: ["JavaScript", "React", "Node.js"],
      description:
        "This is an internship at a tech company where you'll learn full-stack development.",
    },
    {
      _id: "2",
      title: "Internship at Tech Company",
      location: "New York, USA",
      officeType: "Remote",
      experience: "Fresher",
      salaryRange: { min: 2, max: 4 },
      skills: ["JavaScript", "React", "Node.js"],
      description:
        "This is an internship at a tech company where you'll learn full-stack development.",
    },
    {
      _id: "3",
      title: "Internship at Tech Company",
      location: "New York, USA",
      officeType: "Remote",
      experience: "Fresher",
      salaryRange: { min: 2, max: 4 },
      skills: ["JavaScript", "React", "Node.js"],
      description:
        "This is an internship at a tech company where you'll learn full-stack development.",
    },
    // Add more internship objects here
  ];

  const appliedJobs = [
    {
      _id: "10",
      title: "Full-Time Developer at Web Corp",
      location: "San Francisco, USA",
      officeType: "Hybrid",
      experience: "2-4 years",
      salaryRange: { min: 6, max: 8 },
      skills: ["React", "Node.js", "GraphQL"],
      description:
        "Join our team as a full-time developer and work on exciting projects.",
    },
    // Add more job objects here
  ];

  const getJobTypeColor = (jobOffer) => {
    switch (jobOffer) {
      case "full-time":
        return "bg-green-100 text-green-800";
      case "part-time":
        return "bg-blue-100 text-blue-800";
      case "internship":
        return "bg-yellow-100 text-yellow-800";
      case "freelance":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-[58rem] container mx-auto px-4 py-8 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="flex justify-center mb-8 space-x-4">
        <div
          className={`cursor-pointer px-6 py-3 rounded-full transition duration-300 ${
            activeTab === "internship"
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-600"
          }`}
          onClick={() => setActiveTab("internship")}
        >
          Applied Internship{" "}
          <span className=" text-l text-white-600">
            ({appliedInternships.length})
          </span>
        </div>
        <div
          className={`cursor-pointer px-6 py-3 rounded-full transition duration-300 ${
            activeTab === "jobs"
              ? "bg-indigo-600 text-white"
              : "bg-white text-indigo-600"
          }`}
          onClick={() => setActiveTab("jobs")}
        >
          Applied Jobs{" "}
          <span className="text-l text-white-600">
            ({appliedJobs.length})</span>
        </div>
      </div>

      <div className="relative mb-8">
        <div
          className={`h-1 w-[56rem] transition-all duration-300 ${
            activeTab === "internship" ? "bg-indigo-600" : "bg-cyan-500"
          }`}
        ></div>
      </div>

      <div className="flex gap-5">
        {activeTab === "internship" ? (
          <div className="w-[58rem] grid grid-cols-1 gap-8">
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <TailSpin color="#4F46E5" height={80} width={80} />
              </div>
            ) : (
              appliedInternships.map((internship) => (
                <div
                  key={internship._id}
                  className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 truncate">
                      {internship.title}
                    </h2>
                    <div className="flex flex-wrap justify-between items-center mb-6 text-gray-600">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Briefcase className="w-5 h-5 mr-2 text-indigo-600" />
                        <span className="font-semibold">Experience:</span>
                        <span>{internship.experience}</span>
                      </div>
                    </div>
                    <div className="flex items-center mb-6">
                      <DollarSign className="w-5 h-5 mr-3 text-indigo-600" />
                      <p className="text-sm">
                        <span className="font-semibold">Salary Range:</span>{" "}
                        {internship.salaryRange.min
                          ? `${internship.salaryRange.min}LPA - ${internship.salaryRange.max}LPA`
                          : "Not Available"}
                      </p>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">
                        Required Skills:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {internship.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className=" w-[58rem] grid grid-cols-1 gap-8">
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <TailSpin color="#4F46E5" height={80} width={80} />
              </div>
            ) : (
              appliedJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 truncate">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap justify-between items-center mb-6 text-gray-600">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Briefcase className="w-5 h-5 mr-2 text-indigo-600" />
                        <span className="font-semibold">Experience:</span>
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    <div className="flex items-center mb-6">
                      <DollarSign className="w-5 h-5 mr-3 text-indigo-600" />
                      <p className="text-sm">
                        <span className="font-semibold">Salary Range:</span>{" "}
                        {job.salaryRange.min
                          ? `${job.salaryRange.min}LPA - ${job.salaryRange.max}LPA`
                          : "Not Available"}
                      </p>
                    </div>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2 text-gray-800">
                        Required Skills:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;

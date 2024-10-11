import React, { useEffect, useState } from "react";
import axios from "axios";
import JobDetails from "./JobDetails";
import { TailSpin } from "react-loader-spinner";
import { Eye, EyeOff, Send } from 'lucide-react';
import { X } from "lucide-react";

import {
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Users,
  Zap,
  DollarSign,
  Award,
  Search,
} from "lucide-react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [officeType, setOfficeType] = useState(""); // Added officeType filter
  const [experience, setExperience] = useState(""); // Added experience filter
  const [salary, setSalary] = useState(""); // Added salary filter

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "https://cuvette-tia0.onrender.com/api/jobs"
        );
        const modifiedJobs = await Promise.all(
          res.data.map(async (job) => {
            const imageRes = await axios.get(
              "https://cuvette-tia0.onrender.com/api/unsplash",
              {
                params: { query: job.title },
              }
            );
            const imageUrl =
              imageRes.data.results[0]?.urls?.small || "default-image-url.jpg";
            return {
              ...job,
              jobOffer: getRandomJobOffer(),
              imageUrl,
            };
          })
        );
        setJobs(modifiedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getRandomJobOffer = () => {
    const offers = ["full-time", "part-time", "internship", "freelance"];
    return offers[Math.floor(Math.random() * offers.length)];
  };

  const handleApply = () => {
    // Apply filter logic
    console.log("Filters Applied:", { officeType, experience, salary });
  };

  const handleClear = () => {
    setOfficeType("");
    setExperience("");
    setSalary("");
  };

  

  const filteredJobs = jobs.filter((job) => {
    return (
      (filterType === "all" || job.jobOffer === filterType) &&
      (filterLocation === "all" || job.location === filterLocation) &&
      (officeType === "" || job.officeType === officeType) &&
      (experience === "" || job.experience === experience) &&
      (salary === "" || parseInt(job.salaryRange?.min) >= parseInt(salary)) &&
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (jobId) => {
    if (selectedJob && selectedJob._id === jobId) {
      setSelectedJob(null);
    } else {
      const job = jobs.find((job) => job._id === jobId);
      setSelectedJob(job);
    }
  };

  const handleApplyNow = (jobId) => {
    alert(`Applied to Job ID: ${jobId}`);
  };

  // const filteredJobs = jobs.filter((job) => {
  //   return (
  //     (filterType === "all" || job.jobOffer === filterType) &&
  //     (filterLocation === "all" || job.location === filterLocation) &&
  //     job.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

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
    <div className="w-[52rem] container mx-auto px-4 py-8 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        {/* Search Input Container */}
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Search for your dream job..."
            className="w-full p-4 pl-12 text-lg bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-300"
            onChange={handleSearch}
          />
          {/* Search Icon Position */}
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Filter Dropdown */}
        <div className="flex space-x-5">
          <select
            onChange={(e) => setFilterType(e.target.value)}
            className="p-4 border border-gray-200 rounded-full shadow-md hover:shadow-lg bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-300"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>
      </div>

      <div className="flex gap-[52rem]">
        <div >
          {loading ? (
            <div className="flex ml-[23rem] justify-center items-center h-screen">
              <TailSpin color="#4F46E5" height={80} width={80} />
            </div>
          ) : (
            <div className="grid grid-cols-1  gap-8">
              {filteredJobs.map((job, index) => (
                <div
                  key={job._id}
                  className={`bg-white shadow-xl rounded-2xl overflow-hidden transform transition duration-500 ease-in-out border border-gray-100 w-[50rem]`}
                >
                  <div className="p-6">
                    <div className="relative mb-6">
                      {/* Job Image */}
                      <img
                        src={job.imageUrl}
                        alt={job.title}
                        className="w-full h-48 object-cover rounded-xl"
                      />

                      {/* Job Type Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getJobTypeColor(
                            job.jobOffer
                          )}`}
                        >
                          {job.jobOffer}
                        </span>
                      </div>

                      {/* Company Logo - Circular */}
                      <div className="absolute top-[13rem] left-0">
                        <img
                          src={
                            job.companyLogoUrl ||
                            "https://picsum.photos/seed/companylogo/100" // Clearbit generates random company logos
                          }
                          alt={job.companyName || "Company Name"}
                          className="h-12 w-12 rounded-full border-2 border-white shadow-lg object-cover"
                        />
                      </div>
                    </div>

                    {/* Job Title */}
                    <h2 className="text-2xl md:text-3xl ml-[4rem] pb-1 font-bold text-gray-900 mb-4 truncate">
                      {job.title}
                    </h2>

                    <div className="flex flex-wrap justify-between items-center mb-6 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 w-full sm:w-auto mb-2 sm:mb-0">
                        <MapPin className="w-6 h-6 text-indigo-600" />
                        <span className="text-lg font-medium text-gray-700">
                          {job.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 w-full sm:w-auto">
                        <Briefcase className="w-6 h-6 text-indigo-600" />
                        <span className="text-lg font-medium text-gray-700">
                          Experience:
                        </span>
                        <span className="text-lg text-indigo-700 font-semibold">
                          {job.experience}
                        </span>
                      </div>
                    </div>

                    <div className="mb-8 bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                        <svg
                          className="w-6 h-6 mr-2 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                          ></path>
                        </svg>
                        Required Skills
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-white border border-indigo-200 text-indigo-800 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 bg-white rounded-md p-3 shadow-sm">
                        <Calendar className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            Start Date
                          </p>
                          <p className="text-base text-indigo-700">
                            {job.startDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-white rounded-md p-3 shadow-sm">
                        <Clock className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            Apply by
                          </p>
                          <p className="text-base text-red-600">
                            {job.lastDateToApply}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-white rounded-md p-3 shadow-sm">
                        <Clock className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            Probation Period
                          </p>
                          <p className="text-base text-gray-800">
                            {job.probationPeriod}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-white rounded-md p-3 shadow-sm">
                        <Users className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            Openings
                          </p>
                          <p className="text-base text-green-600">
                            {job.openings}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-white rounded-md p-3 shadow-sm">
                        <Users className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            Office Type
                          </p>
                          <p className="text-base text-purple-600">
                            {job.officeType}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 bg-white rounded-md p-3 shadow-sm">
                        <DollarSign className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-600">
                            Salary Range
                          </p>
                          <p className="text-base text-green-600">
                            {job.salaryRange?.min
                              ? `${job.salaryRange.min}LPA - ${job.salaryRange.max}LPA`
                              : "Not Available"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                      <button
                        className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center"
                        onClick={() => handleViewDetails(job._id)}
                      >
                        {selectedJob && selectedJob._id === job._id ? (
                          <>
                            <EyeOff className="w-5 h-5 mr-2" />
                            <span>Hide Details</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-5 h-5 mr-2" />
                            <span>View Details</span>
                          </>
                        )}
                      </button>
                      <button
                        className="w-full sm:w-auto bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out flex items-center justify-center"
                        onClick={() => handleApplyNow(job._id)}
                      >
                        <Send className="w-5 h-5 mr-2" />
                        <span>Apply Now</span>
                      </button>
                    </div>

                    {selectedJob && selectedJob._id === job._id && (
                      <JobDetails job={job} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* rigthsidebar */}

        <div className="mt-[-9rem]">
          <div className="bg-white shadow-xl min-w-96 min-h-96 rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
              <button
                onClick={handleClear}
                className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                aria-label="Clear filters"
              >
                <X size={20} />
              </button>
            </div>

            {/* Office Type Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <Briefcase size={18} className="mr-2 text-indigo-600" />
                Office Type
              </h3>
              <div className="space-y-2">
                {["Remote", "Hybrid", "In-office"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="officeType"
                      value={type}
                      checked={officeType === type}
                      onChange={(e) => setOfficeType(e.target.value)}
                      className="form-radio text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Work Experience Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <Briefcase size={18} className="mr-2 text-indigo-600" />
                Work Experience
              </h3>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
              >
                <option value="">Select experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1-3">1-3 Years</option>
                <option value="3+">3+ Years</option>
              </select>
            </div>

            {/* Minimum Salary Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <DollarSign size={18} className="mr-2 text-indigo-600" />
                Min Salary
              </h3>
              <input
                type="range"
                min="4"
                max="12"
                step="1"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>3 LPA</span>
                <span>6 LPA</span>
                <span>8 LPA</span>
                <span>10 LPA</span>
                <span>12 LPA</span>
              </div>
              <div className="mt-2 text-center">
                <span className="text-indigo-600 font-semibold">
                  Selected: {salary} LPA
                </span>
              </div>
            </div>

            <button
              onClick={handleClear}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center"
            >
              Clear
            </button>

            {/* Apply Button */}
            {/* <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center">
              Apply Filters
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;

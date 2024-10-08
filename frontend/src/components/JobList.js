import React, { useEffect, useState } from "react";
import axios from "axios";
import JobDetails from "./JobDetails"; // Import the JobDetails component

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get("http://localhost:5000/api/jobs");
      const modifiedJobs = res.data.map((job) => ({
        ...job,
        jobOffer: getRandomJobOffer(),
        imageUrl: `https://via.placeholder.com/150?text=Job+Image+${Math.floor(
          Math.random() * 1000
        )}`,
      }));
      setJobs(modifiedJobs);
    };
    fetchJobs();
  }, []);

  const getRandomJobOffer = () => {
    const offers = ["full-time", "part-time", "internship", "freelance"];
    return offers[Math.floor(Math.random() * offers.length)];
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewDetails = (jobId) => {
    if (selectedJob && selectedJob._id === jobId) {
      setSelectedJob(null); // Hide details if the same job is clicked again
    } else {
      const job = jobs.find((job) => job._id === jobId);
      setSelectedJob(job);
    }
  };

  const handleApplyNow = (jobId) => {
    // Logic for applying to the job can go here.
    alert(`Applied to Job ID: ${jobId}`);
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filterType === "all" || job.jobOffer === filterType) &&
      (filterLocation === "all" || job.location === filterLocation) &&
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-w-[58rem] container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search for your dream job..."
          className="p-4 w-full md:w-1/3 text-lg bg-gray-100 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
          onChange={handleSearch}
        />
        <div className="flex space-x-4">
          <select
            onChange={(e) => setFilterType(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </select>
          {/* <select
            onChange={(e) => setFilterLocation(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
          >
            <option value="all">All Locations</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-Site</option>
          </select> */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-500 ease-in-out"
          >
            <div className="p-6">
              {/* Job Image */}
              <img
                src={job.imageUrl}
                alt={job.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {job.title}
              </h2>
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-500">{job.jobOffer}</span>
                <span className="text-sm text-gray-500">{job.location}</span>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-indigo-600">
                    Experience:
                  </span>{" "}
                  {job.experience}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-indigo-600">
                    Openings:
                  </span>{" "}
                  {job.openings}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-indigo-600">
                    Start Date:
                  </span>{" "}
                  {job.startDate}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-indigo-600">
                    Last Date to Apply:
                  </span>{" "}
                  {job.lastDateToApply}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-indigo-600">
                    Number of Applicants:
                  </span>{" "}
                  {job.noOfApplicants}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-indigo-600">Skills:</span>{" "}
                  {job.skills.join(", ")}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-indigo-600">Salary:</span>{" "}
                  {job.salaryRange?.min
                    ? `${job.salaryRange.min} - ${job.salaryRange.max}`
                    : "Not Available"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-indigo-600">
                    Probation Period:
                  </span>{" "}
                  {job.probationPeriod}
                </p>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  className="bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                  onClick={() => handleViewDetails(job._id)}
                >
                  {selectedJob && selectedJob._id === job._id
                    ? "Hide Details"
                    : "View Details"}
                </button>
                <button
                  className="bg-green-500 text-white p-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
                  onClick={() => handleApplyNow(job._id)}
                >
                  Apply Now
                </button>
              </div>

              {selectedJob && selectedJob._id === job._id && (
                <JobDetails job={job} /> // Pass selected job details to the JobDetails component
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import {
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Search,
} from "lucide-react";

const OtherJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [officeType, setOfficeType] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/jobs/other-jobs"
        );
        const modifiedJobs = await Promise.all(
          res.data.map(async (job) => {
            const imageRes = await axios.get(
              "http://localhost:5000/api/unsplash",
              {
                params: { query: job.title },
              }
            );
            const imageUrl =
              imageRes.data.results[0]?.urls?.small || "default-image-url.jpg";
            return {
              ...job,
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

  const handleClear = () => {
    setOfficeType("");
    setExperience("");
    setSalary("");
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filterType === "all" || job.jobOffer === filterType) &&
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search for your dream job..."
            className="w-full p-4 pl-12 text-lg bg-white border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
            onChange={handleSearch}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex space-x-4">
          <select
            onChange={(e) => setFilterType(e.target.value)}
            className="p-3 border border-gray-300 rounded-full shadow-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>
      </div>

      <div className="flex gap-5">
        <div>
          {loading ? (
            <div className="flex ml-[25rem] justify-center items-center h-screen">
              <TailSpin color="#4F46E5" height={80} width={80} />
            </div>
          ) : (
            <div className="grid grid-cols-1  gap-8">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition duration-500 ease-in-out border border-gray-100 w-[56rem]"
                >
                  <div className="p-6">
                    <div className="relative mb-6">
                      <img
                        src={job.imageUrl}
                        alt={job.title}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${getJobTypeColor(
                            job.jobOffer
                          )}`}
                        >
                          {job.jobOffer}
                        </span>
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 truncate">
                      {job.title}
                    </h2>
                    <div className="flex flex-wrap justify-between items-center mb-6 text-gray-600">
                      <div className="flex items-center mb-2 mr-4">
                        <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex gap-2 items-center mb-2">
                        <Briefcase className="w-5 h-5 mr-2  text-indigo-600" />
                        <span className="font-semibold">Experience:</span>
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-6">
        
                      <div className="flex items-center">
                        <Users className="w-5 h-5 mr-3 text-indigo-600 flex-shrink-0" />
                        <p className="text-sm">
                          <span className="font-semibold">Office Type:</span>{" "}
                          {job.officeType}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-3 text-indigo-600 flex-shrink-0" />
                        <p className="text-sm">
                          <span className="font-semibold">Salary Range:</span>{" "}
                          {job.salaryRange?.min
                            ? `${job.salaryRange.min}LPA - ${job.salaryRange.max}LPA`
                            : "Not Available"}
                        </p>
                      </div>
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
                    <div className="mt-6 flex justify-between">
                     
                      <button
                        className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 ease-in-out flex items-center"
                        onClick={() => handleApplyNow(job._id)}
                      >
                        <svg
                          className="w-5 h-5 mr-2"
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
                        Apply Now
                      </button>
                    </div>

                    {selectedJob && selectedJob._id === job._id && (
                      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">
                          Job Details
                        </h3>
                        <p>{job.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherJobs;
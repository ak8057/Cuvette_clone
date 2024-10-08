// JobDetails.js
import React from "react";

const JobDetails = ({ job }) => {
  return (
    <div className="p-4 bg-gray-200">
      <h3 className="text-lg font-semibold text-gray-800">Job Details</h3>
      <p className="text-sm text-gray-700 mt-2">
        <span className="font-semibold">Job Offer:</span> {job.jobOffer}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Location:</span> {job.location}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Experience Required:</span>{" "}
        {job.experience}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Openings:</span> {job.openings}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Last Date to Apply:</span>{" "}
        {job.lastDateToApply}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Start Date:</span> {job.startDate}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">No of Applicants:</span>{" "}
        {job.noOfApplicants}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Salary:</span> {job.salary}
      </p>
      <div className="flex space-x-2 mt-2">
        <span className="text-sm text-gray-700 font-semibold">Skills:</span>
        <ul className="flex space-x-2 ml-2">
          {job.skills.map((skill, index) => (
            <li
              key={index}
              className="bg-gray-200 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobDetails;

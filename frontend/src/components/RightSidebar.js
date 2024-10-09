import React, { useState } from "react";

const RightSidebar = () => {
  const [officeType, setOfficeType] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");

  const handleApply = () => {
    // Apply filter logic
    console.log("Filters Applied:", { officeType, experience, salary });
  };

  const handleClear = () => {
    setOfficeType("");
    setExperience("");
    setSalary("");
  };

  return (
    <div className="min-w-96 min-h-96 bg-white shadow-lg p-6 space-y-6 z-10">
      <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>

      {/* Office Type Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-700">Office Type</h3>
        <div className="mt-2 space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="officeType"
              value="remote"
              checked={officeType === "remote"}
              onChange={(e) => setOfficeType(e.target.value)}
              className="form-radio text-indigo-600"
            />
            <span>Remote</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="officeType"
              value="in-office"
              checked={officeType === "in-office"}
              onChange={(e) => setOfficeType(e.target.value)}
              className="form-radio text-indigo-600"
            />
            <span>In-Office</span>
          </label>
        </div>
      </div>

      {/* Work Experience Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-700">Work Experience</h3>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">Select experience</option>
          <option value="Fresher">Fresher</option>
          <option value="1-3">1-3 Years</option>
          <option value="3+">3+ Years</option>
         
        </select>
      </div>

      {/* Minimum Salary Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-700">Min Salary</h3>
        <div className="mt-2 space-y-2">
          <input
            type="range"
            min="3"
            max="12"
            step="1"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer range-slider"
          />
          <div className="flex justify-between">
            <span>3 LPA</span>
            <span>6 LPA</span>
            <span>8 LPA</span>
            <span>10 LPA</span>
            <span>12 LPA</span>
          </div>
          <div className="mt-2">
            <span className="text-gray-600">Selected Salary: {salary} LPA</span>
          </div>
        </div>
      </div>

      {/* Clear and Apply Buttons */}
      <div className="mt-6 flex justify-between gap-5">
        <button
          onClick={handleClear}
          className="w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Clear
        </button>
        <button
          onClick={handleApply}
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;

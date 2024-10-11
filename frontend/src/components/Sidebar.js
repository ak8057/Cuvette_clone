import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-68 sticky top-[4.5rem] bg-white border-r border-gray-200 h-screen shadow-md">
      <nav className="mt-5 px-3">
        {/* Full-time Jobs */}
        <NavLink
          to="/fulltime-jobs"
          className={({ isActive }) =>
            isActive
              ? "group flex items-center px-3 py-3 text-base font-medium rounded-lg text-blue-600 bg-gray-100 transition duration-300 ease-in-out"
              : "group flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition duration-300 ease-in-out"
          }
        >
          <svg
            className="mr-4 h-6 w-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Fulltime Jobs
        </NavLink>

        {/* Other Jobs */}
        <NavLink
          to="/other-jobs"
          className={({ isActive }) =>
            isActive
              ? "group flex items-center px-3 py-3 text-base font-medium rounded-lg text-blue-600 bg-gray-100 transition duration-300 ease-in-out"
              : "group flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition duration-300 ease-in-out"
          }
        >
          <svg
            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 transition duration-300 ease-in-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          Other Jobs
          <span className="ml-auto inline-block py-0.5 px-2 text-xs font-medium rounded-full bg-green-100 text-green-800">
            New
          </span>
        </NavLink>

        {/* Applied Jobs */}
        <NavLink
          to="/applied-jobs"
          className={({ isActive }) =>
            isActive
              ? "group flex items-center px-3 py-3 text-base font-medium rounded-lg text-blue-600 bg-gray-100 transition duration-300 ease-in-out"
              : "group flex items-center px-3 py-3 text-base font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition duration-300 ease-in-out"
          }
        >
          <svg
            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500 transition duration-300 ease-in-out"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
            />
          </svg>
          Applied
        </NavLink>
      </nav>
    </aside>  
  );
};

export default Sidebar;

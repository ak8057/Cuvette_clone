import React from "react";
import logo from "../assets/logo.svg";
import ProfilePic from "../assets/Profile-picture-created-with-ai.jpeg"


const Navbar = () => {
  return (
    <div className="navbar sticky top-0 z-10">
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <a
                href="#"
                className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <img className="h-10 w-auto" src={logo} alt="Cuvette" />
              </a>
            </div>

            {/* Profile Section */}
            <div className="flex items-center">
              <div className="ml-4 flex items-center">
                <div className="flex items-center border border-gray-300 rounded-lg py-1 px-3 hover:bg-gray-100 transition duration-300 shadow-sm">
                  {/* Profile Picture */}
                  <img
                    className="h-8 w-8 rounded-full hover:ring-2 ring-offset-2 ring-indigo-500 transition-all duration-300"
                    src={ProfilePic}
                    alt="Profile"
                  />
                  {/* Username */}
                  <span className="ml-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-300">
                    Abhay Kumar
                  </span>
                  {/* Dropdown Arrow */}
                  <svg
                    className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-all duration-300 transform group-hover:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

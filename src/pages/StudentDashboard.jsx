import React, { useState } from "react";
import { NavLink, Routes, Route, } from "react-router-dom";
import { PiStudentBold } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";

import Topbar from "../components/Topbar.jsx";
import DashboardFooter from "../components/DashboardFooter.jsx";
import StudentDashboardHome from "../Dashboard/Student/StudentDashboardHome.jsx";
import StudentResults from "../Dashboard/Student/StudentResults.jsx";
import { useAuth } from "../context/AuthContext.jsx";


const StudentDashboard = () => {
  const { user } = useAuth(); // Get student details
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Track sidebar state


  // Toggle the sidebar state
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } bg-blue-500 text-white w-64 lg:block sm:hidden transition-all duration-300 ease-in-out 
            sticky top-0 h-screen overflow-hidden`}
        >
          <div className="p-4 font-bold text-lg"><h3 className="items-center justify-center flex"> Student<span className="text-rose-400 ml-1"> Dashboard </span></h3></div>

          {/* Search Bar */}
          <div className="mb-6 relative p-2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {/* Search Icon */}
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white bg-green-500 p-2 rounded-full w-7 h-7 shadow-lg cursor-pointer" />
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <NavLink
              to="/student/dashboard"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <PiStudentBold className="inline-block mr-2 text-red-500" /> Dashboard Home
            </NavLink>
            <NavLink
              to="/student/dashboard/student/results"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <PiStudentBold className="inline-block mr-2 text-red-500" /> Results
            </NavLink>
          </nav>
        </aside>


      {/* Main Content */}
      <main className="flex-1">
              
            {/* Dashbord Topbar  */}
          <Topbar toggleSidebar={toggleSidebar} />

        {/* Content Area */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={<StudentDashboardHome />} />
            <Route path="/student/results" element={<StudentResults />} />

           
            <Route path="*" element={<div>Page Not Found (Admin)</div>} />
          </Routes>
        </div>

              {/* Dashboard Footer  */}
            <DashboardFooter/>
      </main>
    </div>
  )
}

export default StudentDashboard
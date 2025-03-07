import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route, } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaClipboardList, FaSearch } from "react-icons/fa";
import Topbar from "../components/Topbar.jsx";
import { MdGroupAdd, MdOutlinePostAdd } from "react-icons/md";
import { SiGooglepubsub } from "react-icons/si";
import { GrAchievement, GrGallery } from "react-icons/gr";
import DashboardFooter from "../components/DashboardFooter.jsx";
import PostEvent from "../Dashboard/OfficeAssistant/PostEvent.jsx";
import ResultsList from "../Dashboard/OfficeAssistant/ResultsList.jsx";
import ResultManagement from "../Dashboard/OfficeAssistant/ResultManagement.jsx";
import AchievementsDashboard from "../Dashboard/OfficeAssistant/AchievementsDashboard.jsx";
import Gallery from "../Dashboard/OfficeAssistant/Gallery.jsx";
import DashboardHome from "../Dashboard/OfficeAssistant/DashboardHome.jsx";
import StudentProfileForm from "../components/StudentProfileForm.jsx";
import AttendanceDownloadPDF from "../Dashboard/OfficeAssistant/AttendanceDownloadPDF.jsx";
import { FaCloudDownloadAlt } from "react-icons/fa";
const OfficeAssistant = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Sync sidebar state with screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true); // Open sidebar on lg screens
      } else {
        setSidebarOpen(false); // Close sidebar on sm screens
      }
    };

    // Set initial state based on screen size
    handleResize();

    // Add event listener for screen size changes
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle the sidebar state
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
  className={`${
    isSidebarOpen ? "w-64" : "w-0"
  } bg-gray-800 text-white transition-all duration-300 ease-in-out fixed lg:relative top-0 h-screen overflow-hidden z-50`}
>
          <div className="p-4 font-bold text-lg"><h3 className="items-center justify-center flex"> OfficeAssistant<span className="text-orange-400 ml-1"> Dashboard </span></h3></div>

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
              to="/office-assistant/dashboard/"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <RiDashboardHorizontalFill className="inline-block mr-2 text-red-500" /> Dashboard Home
            </NavLink> 
            <NavLink
              to="/office-assistant/dashboard/StudentProfileForm"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <MdGroupAdd className="inline-block mr-2 text-sky-400" /> Student Profile Form
            </NavLink> 
            <NavLink
              to="/office-assistant/dashboard/PostEvent"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <MdOutlinePostAdd className="inline-block mr-2 text-green-500" /> Post Event
            </NavLink> 
            <NavLink
              to="/office-assistant/dashboard/ResultManagement"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <SiGooglepubsub className="inline-block mr-2 text-orange-600" /> Result Management
            </NavLink> 
            <NavLink
              to="/office-assistant/dashboard/ResultsList"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaClipboardList className="inline-block mr-2 text-rose-600" /> Results List
            </NavLink>  
            <NavLink
              to="/office-assistant/dashboard/AchievementsDashboard"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <GrAchievement className="inline-block mr-2 text-green-300" /> Achievements Dashboard
            </NavLink> 
            <NavLink
              to="/office-assistant/dashboard/Gallery"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <GrGallery className="inline-block mr-2 text-cyan-500" /> Gallery
            </NavLink>
            <NavLink
              to="/office-assistant/dashboard/AttendanceDownloadPDF"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaCloudDownloadAlt className="inline-block mr-2 text-green-500" />Download Attendance
            </NavLink>       
           
          </nav>
        </aside>


      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? "lg:ml-0 ml-64" : "ml-0"} transition-all duration-300 ease-in-out`}>
              
            {/* Dashbord Topbar  */}
          <Topbar toggleSidebar={toggleSidebar} />

        {/* Content Area */}
        <div className="p-6">
          <Routes>
            <Route path="" element={<DashboardHome />} />
            <Route path="StudentProfileForm" element={<StudentProfileForm />} />
            <Route path="PostEvent" element={<PostEvent />} />
            <Route path="ResultManagement" element={<ResultManagement />} />
            <Route path="ResultsList" element={<ResultsList />} />
            <Route path="AchievementsDashboard" element={<AchievementsDashboard />} />
            <Route path="Gallery" element={<Gallery />} />
            <Route path="AttendanceDownloadPDF" element={<AttendanceDownloadPDF />} />
          
           
            <Route path="*" element={<div>Page Not Found (Admin)</div>} />
          </Routes>
        </div>

              {/* Dashboard Footer  */}
            <DashboardFooter/>
      </main>
    </div>
  )
}

export default OfficeAssistant
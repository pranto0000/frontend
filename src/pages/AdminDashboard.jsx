import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route, } from "react-router-dom";
import DashboardHome from "../Dashboard/Admin/DashboardHome.jsx";
import ManageTeachers from "../Dashboard/Admin/ManageTeachers.jsx";
import StudentIDCard from "../Dashboard/Admin/StudentIDCard.jsx";
import AttendanceDownloadPDF from "../Dashboard/Admin/AttendanceDownloadPDF.jsx";
import StudentList from "../Dashboard/Admin/StudentList.jsx";
import { FaUserCog, FaUsers, FaChalkboardTeacher, FaIdCard, FaDownload } from "react-icons/fa";
import Topbar from "../components/Topbar.jsx";
import DashboardFooter from "../components/DashboardFooter.jsx";
import TeacherAttendanceDashboard from "../Dashboard/Teacher/TeacherAttendanceDashboard.jsx";
import { MdEvent, MdQrCodeScanner } from "react-icons/md";
import { FcApproval } from "react-icons/fc";
import PostEvent from "../Dashboard/Admin/PostEvent.jsx";
import ApprovedAttendance from "../Dashboard/Admin/ApprovedAttendance.jsx";
import AdminResultManagement from "../Dashboard/Admin/AdminResultManagement.jsx";
import ResultsList from "../Dashboard/Admin/ResultsList.jsx";
import { BsClipboard2DataFill } from "react-icons/bs";
import { SiGooglecampaignmanager360 } from "react-icons/si";
import ResultSearch from "../Dashboard/Admin/ResultSearch.jsx";
import NoticeForm from "../Dashboard/Admin/NoticeForm.jsx";
import { IoNotifications, IoSearch } from "react-icons/io5";
const AdminDashboard = () => {
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
  } bg-gray-800 text-white transition-all duration-300 ease-in-out fixed lg:relative top-0  overflow-hidden z-50`}
>
          <div className="p-4 font-bold text-lg"><h3 className="items-center justify-center flex"> Admin<span className="text-red-400 ml-1"> Dashboard </span></h3></div>

          {/* Navigation */}
          <nav className="space-y-1">
            <NavLink
              to="/admin-dashboard/"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaUserCog className="inline-block mr-2 text-red-500" /> Dashboard Home
            </NavLink>
            <NavLink
              to="/admin-dashboard/studentsList"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaUsers className="inline-block mr-2 text-sky-500" /> All Students List
            </NavLink>
            <NavLink
              to="/admin-dashboard/teachers"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaChalkboardTeacher className="inline-block mr-2 text-orange-500" /> Manage Teachers
            </NavLink>
            <NavLink
              to="/admin-dashboard/ApprovedAttendance"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FcApproval className="inline-block mr-2 text-green-500" /> Approved Attendance
            </NavLink>
            <NavLink
              to="/admin-dashboard/student-id"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaIdCard className="inline-block mr-2 text-blue-500" /> Student ID Card
            </NavLink>
            <NavLink
              to="/admin-dashboard/post-event"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <MdEvent  className="inline-block mr-2 text-rose-600" /> Upcoming Event Post 
            </NavLink>
            <NavLink
              to="/admin-dashboard/attendance-today"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <MdQrCodeScanner className="inline-block mr-2 text-red-500" /> Today Attendance
            </NavLink>
            <NavLink
              to="/admin-dashboard/attendance-sheet"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaDownload className="inline-block mr-2 text-green-500" /> Download Attendance
            </NavLink>
            <NavLink
              to="/admin-dashboard/AdminResultManagement"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <SiGooglecampaignmanager360 className="inline-block mr-2 text-rose-400" />Result Management
            </NavLink>
            <NavLink
              to="/admin-dashboard/ResultsList"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <BsClipboard2DataFill className="inline-block mr-2 text-green-300" />Results List
            </NavLink>
            <NavLink
              to="/admin-dashboard/ResultSearch"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <IoSearch className="inline-block mr-2 text-green-500" />Result Search 
            </NavLink>
            <NavLink
              to="/admin-dashboard/NoticeForm"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <IoNotifications className="inline-block mr-2 text-rose-600" />Notice Form 
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
            <Route path="/" element={<DashboardHome />} />
            <Route path="studentsList" element={<StudentList />} />
            <Route path="teachers" element={<ManageTeachers />} />
            <Route path="ApprovedAttendance" element={<ApprovedAttendance />} />
            <Route path="student-id" element={<StudentIDCard />} />
            <Route path="post-event" element={<PostEvent/>} />
            <Route path="attendance-today" element={<TeacherAttendanceDashboard />} />
            <Route path="attendance-sheet" element={<AttendanceDownloadPDF />} />
            <Route path="AdminResultManagement" element={<AdminResultManagement />} />
            <Route path="ResultsList" element={<ResultsList />} />
            <Route path="ResultSearch" element={<ResultSearch/>} />
            <Route path="NoticeForm" element={<NoticeForm/>} />
            <Route path="*" element={<div>Page Not Found (Admin)</div>} />
          </Routes>
        </div>

              {/* Dashboard Footer  */}
            <DashboardFooter/>
      </main>
    </div>
  );
};
export default AdminDashboard;

// import React, { useState } from "react";
// import { NavLink, Routes, Route, } from "react-router-dom";
// import DashboardHome from "../Dashboard/Admin/DashboardHome.jsx";
// import ManageTeachers from "../Dashboard/Admin/ManageTeachers.jsx";
// import StudentIDCard from "../Dashboard/Admin/StudentIDCard.jsx";
// import AttendanceDownloadPDF from "../Dashboard/Admin/AttendanceDownloadPDF.jsx";
// import StudentList from "../Dashboard/Admin/StudentList.jsx";
// import { FaUserCog, FaUsers, FaChalkboardTeacher, FaIdCard, FaDownload, FaBars, FaSignOutAlt, FaSearch } from "react-icons/fa";
// import Topbar from "../components/Topbar.jsx";
// const AdminDashboard = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(true); // Track sidebar state

//   // Toggle the sidebar state
//   const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           isSidebarOpen ? "block" : "hidden"
//         } bg-gray-800 text-white w-64 lg:block sm:hidden transition-all duration-300 ease-in-out sticky`}
//       >
//         <div className="p-4 font-bold text-lg">Admin Panel</div>
//         {/* search bar  */}
//         <div className="mb-6 relative p-2">
//         <input
//           type="text"
//           placeholder="Search..."
//           className="w-full p-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          
          
//         />
//         {/* Search Icon with Unique Styling */}
//         <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white bg-green-500 p-2 rounded-full w-7 h-7 shadow-lg cursor-pointer" />
//       </div>
//         <nav>
//           <NavLink
//             to="/admin-dashboard/"
//             className={({ isActive }) =>
//               `block px-4 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
//             }
//           >
//             <FaUserCog className="inline-block mr-2 text-red-500" /> Dashboard Home
//           </NavLink>
//           <NavLink
//             to="/admin-dashboard/students-list"
//             className={({ isActive }) =>
//               `block px-4 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
//             }
//           >
//             <FaUsers className="inline-block mr-2 text-sky-500" /> All Students List
//           </NavLink>
//           <NavLink
//             to="/admin-dashboard/teachers"
//             className={({ isActive }) =>
//               `block px-4 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
//             }
//           >
//             <FaChalkboardTeacher className="inline-block mr-2 text-orange-500" /> Manage Teachers
//           </NavLink>
//           <NavLink
//             to="/admin-dashboard/student-id"
//             className={({ isActive }) =>
//               `block px-4 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
//             }
//           >
//             <FaIdCard className="inline-block mr-2 text-blue-500" /> Student ID Card
//           </NavLink>
//           <NavLink
//             to="/admin-dashboard/attendance-sheet"
//             className={({ isActive }) =>
//               `block px-4 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
//             }
//           >
//             <FaDownload className="inline-block mr-2 text-green-500" /> Download Attendance
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1">
      
//       <Topbar toggleSidebar={toggleSidebar} />

//         {/* Content Area */}
//         <div className="p-6">
//           <Routes>
//             <Route path="/" element={<DashboardHome />} />
//             <Route path="students-list" element={<StudentList />} />
//             <Route path="teachers" element={<ManageTeachers />} />
//             <Route path="student-id" element={<StudentIDCard />} />
//             <Route path="attendance-sheet" element={<AttendanceDownloadPDF />} />
//             <Route path="*" element={<div>Page Not Found (Admin)</div>} />
//           </Routes>
//         </div>
//       </main>
//     </div>
//   );
// };
// export default AdminDashboard;

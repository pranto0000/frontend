import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route, } from "react-router-dom";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaDownload, FaSearch } from "react-icons/fa";
import { FaCircleDollarToSlot, FaHandHoldingDollar, FaSquarePollVertical } from "react-icons/fa6";
import { MdAccountBalance, MdDownloading } from "react-icons/md";
import { TbTransactionDollar } from "react-icons/tb";
import { ImEyePlus } from "react-icons/im";
import Topbar from "../components/Topbar.jsx";
import AccountantDashboardHome from "../Dashboard/Accountant/AccountantDashboardHome.jsx";
import DashboardFooter from "../components/DashboardFooter.jsx";
import FeeManagement from "../Dashboard/Accountant/FeeManagement.jsx";
import AddFeeForm from "../Dashboard/Accountant/AddFeeForm.jsx";
import Receipt from "../Dashboard/Accountant/Receipt.jsx";
import FeeReport from "../Dashboard/Accountant/FeeReport.jsx";
import ExpensesReport from "../Dashboard/Accountant/ExpensesReport.jsx";
import AccountantAllReport from "../Dashboard/Accountant/AccountantAllReport.jsx";
import AllFeeReport from "../Dashboard/Accountant/AllFeeReport.jsx";
import FinancialExpenses from "../Dashboard/Accountant/FinancialExpenses.jsx";

const AccountantDashboard = () => {
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
          <div className="p-4 font-bold text-lg"><h3 className="items-center justify-center flex"> Accountant<span className="text-green-500 ml-1"> Dashboard </span></h3></div>

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
              to="/accountant/dashboard/"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <RiDashboardHorizontalFill className="inline-block mr-2 text-red-500" /> Dashboard Home
            </NavLink>

            <NavLink
              to="/accountant/dashboard/feemanagesment"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaCircleDollarToSlot className="inline-block mr-2 text-green-500" /> Fee Management
            </NavLink>

            <NavLink
              to="/accountant/dashboard/AddFeeForm"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaHandHoldingDollar  className="inline-block mr-2 text-orange-500" /> Add Fee Form
            </NavLink>
            <NavLink
              to="/accountant/dashboard/Receipt"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <ImEyePlus  className="inline-block mr-2 text-rose-700" /> Receipt
            </NavLink>
            <NavLink
              to="/accountant/dashboard/FeeReport"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <MdDownloading  className="inline-block mr-2 text-sky-400" /> Fee Report 
            </NavLink>
            <NavLink
              to="/accountant/dashboard/AllFeeReport"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaSquarePollVertical className="inline-block mr-2 text-rose-500" /> All Fee Report 
            </NavLink>
            <NavLink
              to="/accountant/dashboard/FinancialExpenses"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <MdAccountBalance className="inline-block mr-2 text-green-500" /> Financial Expenses 
            </NavLink>
            <NavLink
              to="/accountant/dashboard/ExpensesReport"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <TbTransactionDollar  className="inline-block mr-2 text-rose-500" /> Expenses Report 
            </NavLink>
            <NavLink
              to="/accountant/dashboard/AccountantAllReport"
              className={({ isActive }) =>
                `block px-4 py-2 ${isActive ? "bg-gray-700 rounded-l-full" : "hover:bg-gray-700"}`
              }
            >
              <FaDownload  className="inline-block mr-2 text-green-400" /> Accountant All Report 
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
            <Route path="" element={<AccountantDashboardHome />} />
            <Route path="feemanagesment" element={<FeeManagement />} />
            <Route path="AddFeeForm" element={<AddFeeForm />} />
            <Route path="Receipt" element={<Receipt />} />
            <Route path="FeeReport" element={<FeeReport />} />
            <Route path="AllFeeReport" element={<AllFeeReport />} />
            <Route path="FinancialExpenses" element={<FinancialExpenses />} />
            <Route path="ExpensesReport" element={<ExpensesReport />} />
            <Route path="AccountantAllReport" element={<AccountantAllReport />} />
           
            <Route path="*" element={<div>Page Not Found (Admin)</div>} />
          </Routes>
        </div>

              {/* Dashboard Footer  */}
            <DashboardFooter/>
      </main>
    </div>
  )
}

export default AccountantDashboard

// import React, { useState } from 'react';
// import axios from 'axios';
// import FeeReceipt from '../components/FeeReceipt.jsx';

// const AccountantDashboard = () => {
//     const [userId, setUserId] = useState('');
//     const [amount, setAmount] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     const handleDeposit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post('/api/fees/deposit', { userId, amount: parseFloat(amount) });
//             setSuccessMessage(response.data.message);
//             setUserId('');
//             setAmount('');
//         } catch (error) {
//             console.error('Error depositing fee:', error);
//         }
//     };

//     return (
//         <div className="p-4">
//             <h2 className="text-2xl font-semibold mb-4">Accountant Dashboard</h2>
//             <form onSubmit={handleDeposit} className="space-y-4">
//                 <div>
//                     <label className="block text-gray-700">Student ID:</label>
//                     <input
//                         type="text"
//                         value={userId}
//                         onChange={(e) => setUserId(e.target.value)}
//                         className="border p-2 w-full"
//                         placeholder="Enter Student ID"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700">Amount:</label>
//                     <input
//                         type="number"
//                         value={amount}
//                         onChange={(e) => setAmount(e.target.value)}
//                         className="border p-2 w-full"
//                         placeholder="Enter Amount"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//                     Deposit Fee
//                 </button>
//             </form>
//             {successMessage && (
//                 <FeeReceipt userId={userId} amount={amount} name="Student Name Placeholder" />
//                 )}
//         </div>
//     );
// };

// export default AccountantDashboard;

import React from "react";
import { FaUserTie, FaTasks, FaBell, FaFileAlt, FaChartBar } from "react-icons/fa";

const DashboardHome = () => {
  return (
    <div className="">

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaUserTie className="text-blue-500 text-3xl" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">Employees</h2>
              <p className="text-gray-500">150</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaTasks className="text-green-500 text-3xl" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">Pending Tasks</h2>
              <p className="text-gray-500">12</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <FaBell className="text-red-500 text-3xl" />
            <div className="ml-4">
              <h2 className="text-xl font-bold">Notifications</h2>
              <p className="text-gray-500">5 New</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Recent Activities</h2>
          <div className="bg-white p-6 rounded-lg shadow-md mt-4">
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaFileAlt className="text-blue-500" />
                <span className="ml-3">John Doe submitted a report</span>
              </li>
              <li className="flex items-center">
                <FaChartBar className="text-green-500" />
                <span className="ml-3">Quarterly sales report updated</span>
              </li>
              <li className="flex items-center">
                <FaUserTie className="text-yellow-500" />
                <span className="ml-3">New employee onboarding started</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaWallet, FaBook } from "react-icons/fa";

const StudentDashboardHome = () => {
  const [studentData, setStudentData] = useState(null);
  const [attendanceToday, setAttendanceToday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudentDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://school-4ee7.onrender.com/api/students/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudentData(response.data);
    } catch (error) {
      console.error("Error fetching student dashboard data:", error);
      setError("Failed to load dashboard data");
    }
  };

  const fetchTodayAttendance = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://school-4ee7.onrender.com/api/today", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Find the logged-in student's attendance
      const studentAttendance = response.data.attendance.find(
        (record) => record.studentId === studentData?.student?._id
      );

      setAttendanceToday(studentAttendance || null);
    } catch (error) {
      console.error("Error fetching today's attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentDashboardData();
  }, []);

  useEffect(() => {
    if (studentData) {
      fetchTodayAttendance();
    }
  }, [studentData]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  const { student, attendancePercentage, feesPaid, pendingFees, upcomingClasses } = studentData;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Dashboard</h1>

      {/* Student Info */}
      <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-6">
        <img
          src={student.userId.profileImage}
          alt="Student"
          className="w-24 h-24 rounded-full border-4 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-white bg-green-500 pt-0.5 pb-1 pl-3 pr-3  rounded-full"><span className="flex items-center justify-center">{student.userId.name}</span></h2>
          <p className="text-gray-600">{student.className} - Roll: {student.rollNumber}</p>
          <p className="text-gray-600">Email: {student.userId.email}</p>
          <p className="text-gray-600">Phone: {student.phone}</p>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Attendance */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
          <FaCheckCircle className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-600 text-sm">Attendance</p>
            <h3 className="text-xl font-bold">{attendancePercentage}%</h3>
          </div>
        </div>

        {/* Fees Paid */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
          <FaWallet className="text-blue-500 text-3xl" />
          <div>
            <p className="text-gray-600 text-sm">Fees Paid</p>
            <h3 className="text-xl font-bold">৳ {feesPaid}</h3>
          </div>
        </div>

        {/* Pending Fees */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
          <FaWallet className="text-red-500 text-3xl" />
          <div>
            <p className="text-gray-600 text-sm">Pending Fees</p>
            <h3 className="text-xl font-bold">৳ {pendingFees}</h3>
          </div>
        </div>
      </div>

      {/* Today's Attendance */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">📅 <span className="text-blue-500">Today's Attendance</span></h2>
        {attendanceToday ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Start Time</p>
              <h3 className="text-lg font-bold">
                {attendanceToday.presentStartTime
                  ? new Date(attendanceToday.presentStartTime).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "N/A"}
              </h3>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">End Time</p>
              <h3 className="text-lg font-bold">
                {attendanceToday.presentEndTime
                  ? new Date(attendanceToday.presentEndTime).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : "N/A"}
              </h3>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No attendance recorded for today.</p>
        )}
      </div>

      {/* Upcoming Classes */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FaBook className="mr-2 text-blue-500" /> Upcoming Classes
        </h2>
        {upcomingClasses.length > 0 ? (
          <ul>
            {upcomingClasses.map((classItem, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span className="font-bold">{classItem.className}</span>
                <span>{new Date(classItem.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No upcoming classes</p>
        )}
      </div>
    </div>
  );
};

export default StudentDashboardHome;

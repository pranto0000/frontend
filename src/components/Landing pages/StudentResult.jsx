import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const StudentResult = () => {
  const [studentId, setStudentId] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [className, setClassName] = useState("");
  const [examName, setExamName] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const printRef = useRef(); // Reference for printing

  const classOptions = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const examOptions = ["Pre Test", "Test", "Final Exam" , "Class Test"];

  const handleSearch = async () => {
    setError("");
    setResults([]);

    if (!studentId || !rollNumber || !className || !examName) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://school-4ee7.onrender.com/api/search/search/results",
        { studentId, rollNumber, className, examName }
      );

      console.log("API Response:", response.data);
      setResults(response.data);
      setModalOpen(true);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No matching results found.");
      } else {
        setError("Server error. Please try again later.");
      }
    }
  };

  // Function to handle print
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 mt-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Search Student Result
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
            />

          <input
            type="number"
            placeholder="Enter Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          />

          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          >
            <option value="">Select Class</option>
            {classOptions.map((cls, index) => (
              <option key={index} value={cls}>
                {cls}
              </option>
            ))}
          </select>

          <select
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          >
            <option value="">Select Exam</option>
            {examOptions.map((exam, index) => (
              <option key={index} value={exam}>
                {exam}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Search Result
          </button>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>

      {/* 🔹 Modal for displaying results */}
      {modalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl relative mt-10 ">
      {/* Close Button */}
      <button
        onClick={() => setModalOpen(false)}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl"
      >
        ×
      </button>

      {/* Modal Content */}
      <div ref={printRef} className="space-y-6">
        {/* School Name */}
        <h3 className="text-2xl font-bold text-green-600 text-center mb-6">
          Hatibandha SS High School
        </h3>

        {/* Results */}
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700">
                    <strong>Student Name:</strong> {result.studentName}
                  </p>
                  <p className="text-gray-700">
                    <strong>Exam Name:</strong> {result.examName}
                  </p>
                  
                  <p className="text-gray-700">
                    <strong>Class:</strong> {result.className}
                  </p>
                  <p className="text-gray-700">
                    <strong>Roll Number:</strong> {result.rollNumber}
                  </p>
                </div>
                <div>
                  <p className="text-gray-700">
                    <strong>Status:</strong> {result.resultStatus}
                  </p>
                  <p className="text-gray-700">
                    <strong>Total Marks:</strong> {result.totalMarks}
                  </p>
                  <p className="text-gray-700">
                    <strong>Percentage:</strong> {result.percentage}%
                  </p>
                </div>
              </div>

              {/* Subject-wise Marks */}
              {result.subjects && result.subjects.length > 0 ? (
                <div className="mt-4">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    Subject Marks
                  </h4>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-green-100">
                        <th className="border border-gray-300 p-2">Subject</th>
                        <th className="border border-gray-300 p-2">Marks</th>
                        <th className="border border-gray-300 p-2">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.subjects.map((subject, subIndex) => (
                        <tr key={subIndex} className="text-center hover:bg-gray-100">
                          <td className="border border-gray-300 p-2">{subject.name}</td>
                          <td className="border border-gray-300 p-2">{subject.marks}</td>
                          <td className="border border-gray-300 p-2">{subject.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 mt-2">No subject details available.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No results found.</p>
        )}
      </div>

      {/* Print Button */}
      <div className="text-center mt-6">
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Print Result
        </button>
      </div>
    </div>
  </div>
)}
    </div>
    <Footer/>
  </>
  );
};

export default StudentResult;

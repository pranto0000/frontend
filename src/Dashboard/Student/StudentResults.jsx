import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx"; 

const StudentResults = () => {
  const { user } = useAuth();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!user || !user._id) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const response = await axios.get(`https://school-4ee7.onrender.com/api/results/${user._id}`);
        setResult(response.data.result);
      } catch (err) {
        setError("Failed to fetch results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Student Results</h2>

      {loading && <p className="text-center">Loading results...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {result ? (
        <div className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">Exam: {result.examName}</h3>
          <p className="text-gray-600">Class: {result.className}</p>
          <p className="text-gray-600">Roll Number: {result.rollNumber}</p>
          <p className="text-gray-600">Total Marks: {result.totalMarks}</p>
          <p className="text-gray-600">Percentage: {result.percentage.toFixed(2)}%</p>
          <p className={`text-lg font-bold ${result.resultStatus === "Pass" ? "text-green-600" : "text-red-600"}`}>
            Status: {result.resultStatus}
          </p>

          <h3 className="mt-4 text-lg font-semibold">Subjects</h3>
          <table className="w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Subject</th>
                <th className="border p-2">Marks</th>
                <th className="border p-2">Grade</th>
                <th className="border p-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((subject) => (
                <tr key={subject.name}>
                  <td className="border p-2">{subject.name}</td>
                  <td className="border p-2">{subject.marks}</td>
                  <td className="border p-2">{subject.grade}</td>
                  <td className="border p-2">{subject.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default StudentResults;

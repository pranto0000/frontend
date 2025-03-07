import React, { useEffect, useState } from "react";
import axios from "axios";

const ResultsList = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [examTypes, setExamTypes] = useState(["Pre Test", "Test", "Final Exam", "Class Test"]);
  const [filters, setFilters] = useState({ studentId: "", name: "", examName: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 15;

  useEffect(() => {
    fetchResults();
    fetchStudents();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get("https://school-4ee7.onrender.com/api/results");
      const sortedResults = res.data.results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setResults(sortedResults || []);
      setFilteredResults(res.data.results || []);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("https://school-4ee7.onrender.com/api/students");
      setStudents(res.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    let filtered = results;
    if (filters.studentId) {
      filtered = filtered.filter((result) => result.studentId?._id === filters.studentId);
    }
    if (filters.name) {
      filtered = filtered.filter((result) => result.name?._id === filters.name);
    }
    if (filters.examName) {
      filtered = filtered.filter((result) => result.examName === filters.examName);
    }
    setFilteredResults(filtered);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredResults.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Results List</h1>

      {/* Filtering Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-6 flex flex-wrap gap-4">
        <select
          name="studentId"
          value={filters.studentId}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg"
          >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.userId?.name} - {student.rollNumber} - {student.className}
            </option>
          ))}
        </select>

        <select
          name="examName"
          value={filters.examName}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg"
          >
          <option value="">Select Exam</option>
          {examTypes.map((exam, index) => (
            <option key={index} value={exam}>{exam}</option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
          Search
        </button>
      </div>

      {/* Results Table */}
      <div className="bg-white  rounded-lg shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full sm:w-[600px] md:w-[800px] min-w-[400px] border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Class</th>
                <th className="p-3 text-left">Exam</th>
                <th className="p-3 text-left">Subjects & Marks</th>
                <th className="p-3 text-left">Total Marks</th>
                <th className="p-3 text-left">Percentage</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
            {currentResults.length > 0 ? (
              currentResults.map((result) => (
                <tr key={result._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-gray-700">{result.studentId?.userId?.name || "Unknown"}</td>
                    <td className="p-3 text-gray-700">{result.studentId?.className || "N/A"}</td>
                    <td className="p-3 text-gray-700">{result.examName || "N/A"}</td>
                    <td className="p-3 text-gray-700">
                      {result.subjects.map((subject, index) => (
                        <div key={index} className="mb-1">
                          <strong>{subject.name}</strong>: {subject.marks} Marks ({subject.grade})
                        </div>
                      ))}
                    </td>
                    <td className="p-3 text-gray-700">{result.totalMarks}</td>
                    <td className="p-3 text-gray-700">{result.percentage?.toFixed(2)}%</td>
                    <td className="p-3 text-gray-700">{result.resultStatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 p-4">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(filteredResults.length / resultsPerPage) }, (_, i) => (
            <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-3 py-1 rounded-lg ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

      </div>
    </div>
          </>
  );
};

export default ResultsList;
import React, { useState } from "react";
import axios from "axios";

const ResultPage = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    className: "",
    rollNumber: "",
    examName: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Dropdown options
  const classOptions = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
  const examOptions = ["Pre Test", "Test", "Final Exam", "Class Test"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const { data } = await axios.get("https://school-4ee7.onrender.com/api/search/search", {
        params: formData,
      });

      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.message || "No approved result found.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch result. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Search Student Result</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          placeholder="Student ID"
          className="p-2 border rounded"
          required
        />
        <select
          name="className"
          value={formData.className}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Class</option>
          {classOptions.map((className, index) => (
            <option key={index} value={className}>
              {className}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          placeholder="Roll Number"
          className="p-2 border rounded"
          required
        />
        <select
          name="examName"
          value={formData.examName}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        >
          <option value="">Select Exam</option>
          {examOptions.map((exam, index) => (
            <option key={index} value={exam}>
              {exam}
            </option>
          ))}
        </select>
        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded">
          Search
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Result Display */}
      {result && (
        <div className="mt-6 border p-4 rounded">
          <h3 className="text-xl font-bold">Result Details</h3>
          <p><strong>Exam:</strong> {result.examName}</p>
          <p><strong>Class:</strong> {result.className}</p>
          <p><strong>Roll Number:</strong> {result.rollNumber}</p>
          <p><strong>Total Marks:</strong> {result.totalMarks}</p>
          <p><strong>Percentage:</strong> {result.percentage.toFixed(2)}%</p>
          <p><strong>Result Status:</strong> {result.resultStatus}</p>

          <h4 className="mt-4 font-bold">Subjects:</h4>
          <ul>
            {result.subjects.map((subject, index) => (
              <li key={index}>
                {subject.name}: {subject.marks} Marks ({subject.grade} - {subject.remarks})
              </li>
            ))}
          </ul>

          <button
            className="mt-4 bg-green-500 text-white p-2 rounded"
            onClick={() => window.print()}
          >
            Print Result
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultPage;
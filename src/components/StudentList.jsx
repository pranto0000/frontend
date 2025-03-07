import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5); // Number of students per page

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://school-4ee7.onrender.com/api/students');
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(students.length / studentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;

  return (
 
    <>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Students List</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Roll</th>
            <th className="border p-2">Parent Email</th>
            <th className="border p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length > 0 ? (
            currentStudents.map((student, index) => (
              <tr key={student._id}>
                <td className="border p-2">{indexOfFirstStudent + index + 1}</td>
                <td className="border p-2">
                  <img
                    src={student?.userId?.profileImage || 'https://via.placeholder.com/50'}
                    alt={student?.userId?.name || 'Unknown'}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="border p-2">{student?.userId?.name || 'N/A'}</td>
                <td className="border p-2">{student?.userId?.email || 'N/A'}</td>
                <td className="border p-2">{student?.className || 'N/A'}</td>
                <td className="border p-2">{student?.rollNumber || 'N/A'}</td>
                <td className="border p-2">{student?.parentEmail || 'N/A'}</td>
                <td className="border p-2">{student?.phone || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-2 text-center" colSpan="8">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 border rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
        </>
  );
};

export default StudentList;

import React, { useEffect, useState } from "react";
import axios from "axios";

const FeeDashboard = () => {
  const [students, setStudents] = useState([]);
  const [searchId, setSearchId] = useState(""); // Search input state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const studentsPerPage = 5; // ✅ Set number of students per page

  useEffect(() => {
    axios.get("https://school-4ee7.onrender.com/api/fees/due").then((response) => {
      setStudents(response.data);
    });
  }, []);

  // 🔹 Filter students based on search input
  const filteredStudents = searchId
    ? students.filter((student) => {
        const studentName = student.studentName || ""; // ✅ Ensure it's a string
        return (
          student.studentId.includes(searchId) ||
          studentName.toLowerCase().includes(searchId.toLowerCase())
        );
      })
    : students;

  // ✅ Pagination Logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  // 🔹 Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Student Fee Details</h2>

      {/* 🔹 Search Input */}
      <input
        type="text"
        placeholder="Search by ID or Name..."
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Student Name</th>
              <th className="border px-4 py-2">Total Paid</th>
              <th className="border px-4 py-2">Total Due</th>
              <th className="border px-4 py-2">Fee Breakdown</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr key={student.studentId} className="border">
                  <td className="border px-4 py-2">{student.studentName || "Unknown"}</td>
                  <td className="border px-4 py-2 text-green-600 font-bold">${student.totalPaid}</td>
                  <td className="border px-4 py-2 text-red-600 font-bold">${student.totalDue}</td>
                  <td className="border px-4 py-2">
                    <ul>
                      {student.feeDetails.map((fee) => (
                        <li key={fee.feeType}>
                          {fee.feeType}: Required: <span className="text-blue-600">${fee.required}</span>, 
                          Paid: <span className="text-green-600">${fee.paid}</span>, 
                          Due: <span className="text-red-600">${fee.due}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-red-500">No student found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Buttons */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeeDashboard;

// FeeManagement

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const FeeDashboard = () => {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     axios.get("https://school-4ee7.onrender.com/api/fees/due").then((response) => {
//       setStudents(response.data);
//     });
//   }, []);

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Student Fee Details</h2>
      
//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="border px-6 py-3 text-left">Student Name</th>
//               <th className="border px-6 py-3 text-left">Total Paid</th>
//               <th className="border px-6 py-3 text-left">Total Due</th>
//               <th className="border px-6 py-3 text-left">Fee Breakdown</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student, index) => (
//               <tr
//                 key={student.studentId}
//                 className={`border ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
//               >
//                 <td className="border px-6 py-4 font-semibold text-gray-700">{student.studentName}</td>
//                 <td className="border px-6 py-4 text-green-600 font-bold">${student.totalPaid}</td>
//                 <td className={`border px-6 py-4 font-bold ${student.totalDue > 0 ? "text-red-600" : "text-gray-600"}`}>
//                   ${student.totalDue}
//                 </td>
//                 <td className="border px-6 py-4">
//                   <ul>
//                     {student.feeDetails.map((fee) => (
//                       <li key={fee.feeType} className="py-1">
//                         <span className="font-semibold text-gray-800">{fee.feeType}:</span>
//                         <span className="text-blue-600 ml-2">Required: ${fee.required}</span>,
//                         <span className="text-green-600 ml-2">Paid: ${fee.paid}</span>,
//                         <span className={`ml-2 font-bold ${fee.due > 0 ? "text-red-600" : "text-gray-600"}`}>
//                           Due: ${fee.due}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FeeDashboard;
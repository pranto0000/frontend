import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5); // Number of students per page
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://school-4ee7.onrender.com/api/students");
        setStudents(response.data);
        setFilteredStudents(response.data); // Initialize filtered data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = students.filter(
      (student) =>
        student?.userId?.name?.toLowerCase().includes(query) ||
        student?.className?.toLowerCase().includes(query) ||
        student?.rollNumber?.toString().includes(query) ||
        student?.parentEmail?.toLowerCase().includes(query) ||
        student?.userId?.email?.toLowerCase().includes(query)
    );

    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to first page on search
  };

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Students List</h1>

      {/* Search Input */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search students..."
          className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={search}
          onChange={handleSearch}
        />
        {/* Search Icon with Unique Styling */}
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white bg-green-500 p-2 rounded-full w-8 h-8 shadow-lg cursor-pointer" />
      </div>

      {/* Student List Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Class
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Roll
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Parent Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase tracking-wider">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentStudents.length > 0 ? (
              currentStudents.map((student, index) => (
                <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {indexOfFirstStudent + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={student?.userId?.profileImage || "https://via.placeholder.com/50"}
                      alt={student?.userId?.name || "Unknown"}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {student?.userId?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {student?.userId?.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {student?.className || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {student?.rollNumber || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {student?.parentEmail || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {student?.phone || "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-sm text-gray-500 text-center" colSpan="8">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function StudentList() {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const [studentsPerPage] = useState(5); // Number of students per page
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get("https://school-4ee7.onrender.com/api/students");
//         setStudents(response.data);
//         setFilteredStudents(response.data); // Initialize filtered data
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//         setLoading(false);
//       }
//     };

//     fetchStudents();
//   }, []);

//   // Handle Search
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearch(query);

//     const filtered = students.filter(
//       (student) =>
//         student?.userId?.name?.toLowerCase().includes(query) ||
//         student?.className?.toLowerCase().includes(query) ||
//         student?.rollNumber?.toString().includes(query) ||
//         student?.parentEmail?.toLowerCase().includes(query) ||
//         student?.userId?.email?.toLowerCase().includes(query)
//     );

//     setFilteredStudents(filtered);
//     setCurrentPage(1); // Reset to first page on search
//   };

//   // Pagination logic
//   const indexOfLastStudent = currentPage * studentsPerPage;
//   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

//   const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-4">Students List</h1>

//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search students..."
//         className="w-full p-2 mb-4 border rounded-lg"
//         value={search}
//         onChange={handleSearch}
//       />

//       {/* Student List Table */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">#</th>
//               <th className="border p-2">Image</th>
//               <th className="border p-2">Name</th>
//               <th className="border p-2">Email</th>
//               <th className="border p-2">Class</th>
//               <th className="border p-2">Roll</th>
//               <th className="border p-2">Parent Email</th>
//               <th className="border p-2">Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentStudents.length > 0 ? (
//               currentStudents.map((student, index) => (
//                 <tr key={student._id} className="border-b hover:bg-gray-100">
//                   <td className="border p-2">{indexOfFirstStudent + index + 1}</td>
//                   <td className="border p-2">
//                     <img
//                       src={student?.userId?.profileImage || "https://via.placeholder.com/50"}
//                       alt={student?.userId?.name || "Unknown"}
//                       className="w-12 h-12 rounded-full"
//                     />
//                   </td>
//                   <td className="border p-2">{student?.userId?.name || "N/A"}</td>
//                   <td className="border p-2">{student?.userId?.email || "N/A"}</td>
//                   <td className="border p-2">{student?.className || "N/A"}</td>
//                   <td className="border p-2">{student?.rollNumber || "N/A"}</td>
//                   <td className="border p-2">{student?.parentEmail || "N/A"}</td>
//                   <td className="border p-2">{student?.phone || "N/A"}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td className="border p-2 text-center" colSpan="8">
//                   No students found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-4 space-x-2">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button
//               key={index + 1}
//               onClick={() => handlePageChange(index + 1)}
//               className={`px-4 py-2 border rounded ${
//                 currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default StudentList;

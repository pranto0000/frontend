import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const ResultManagement = () => {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    examName: "",
    subjects: [{ name: "", marks: "", grade: "", remarks: "" }],
  });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 15;

  const examTypes = ["Pre Test", "Test", "Final Exam", "Class Test"];

  // Fetch all results
  const fetchResults = async () => {
    try {
      const res = await axios.get("https://school-4ee7.onrender.com/api/results");
      const sortedResults = res.data.results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setResults(sortedResults || []);
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]);
    }
  };

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("https://school-4ee7.onrender.com/api/students");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    fetchResults();
  }, []);

  // Handle form changes
  const handleChange = (e, index, field) => {
    if (field === "examName") {
      setFormData({ ...formData, examName: e.target.value });
    } else {
      const updatedSubjects = [...formData.subjects];
      updatedSubjects[index][field] = e.target.value;

      if (field === "marks") {
        const marks = parseFloat(e.target.value);
        let grade = "";
        let remarks = "";

        if (marks >= 80) {
          grade = "A+";
          remarks = "Very Good";
        } else if (marks >= 70) {
          grade = "A";
          remarks = "Very Good";
        } else if (marks >= 60) {
          grade = "A-";
          remarks = "Very Good";
        } else if (marks >= 50) {
          grade = "B";
          remarks = "Good";
        } else if (marks >= 40) {
          grade = "C";
          remarks = "Normal";
        } else if (marks >= 33) {
          grade = "D";
          remarks = "Normal";
        } else {
          grade = "F";
          remarks = "Bad";
        }

        updatedSubjects[index]["grade"] = grade;
        updatedSubjects[index]["remarks"] = remarks;
      }

      setFormData({ ...formData, subjects: updatedSubjects });
    }
  };

  // Add a new subject field
  const addSubjectField = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { name: "", marks: "", grade: "", remarks: "" }],
    });
  };

  // Submit the form (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`https://school-4ee7.onrender.com/api/results/${editingId}`, {
          studentId: formData.studentId,
          examName: formData.examName,
          subjects: formData.subjects,
        });
        setEditMode(false);
        setEditingId(null);
      } else {
        await axios.post("https://school-4ee7.onrender.com/api/results/add", {
          studentId: formData.studentId,
          examName: formData.examName,
          subjects: formData.subjects,
        });
      }

      fetchResults();
      setFormData({ studentId: "", examName: "", subjects: [{ name: "", marks: "", grade: "", remarks: "" }] });
    } catch (error) {
      console.error("Error submitting result:", error);
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Student Results</h1>

      {/* Form */}
      <form className="bg-white p-6 rounded-lg shadow-lg mb-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Exam Name Dropdown */}
          <div>
            <label className="block mb-2 font-bold text-gray-700">Exam Name</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.examName}
              onChange={(e) => handleChange(e, null, "examName")}
              required
            >
              <option value="">Select Exam</option>
              {examTypes.map((exam, index) => (
                <option key={index} value={exam}>
                  {exam}
                </option>
              ))}
            </select>
          </div>

          {/* Student Dropdown */}
          <div>
            <label className="block mb-2 font-bold text-gray-700">Student</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              required
            >
              <option value="">Select Student</option>
              {students && students.length > 0 ? (
                students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.userId?.name || "Unnamed"} - {student.rollNumber || "No Roll Number"} - {student.className || "No Class"} - {student._id || "No Class"}
                  </option>
                ))
              ) : (
                <option disabled>No students found</option>
              )}
            </select>
          </div>
        </div>

        {/* Subject Fields */}
        {formData.subjects.map((subject, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Subject Name"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={subject.name}
                onChange={(e) => handleChange(e, index, "name")}
                required
              />
              <input
                type="number"
                placeholder="Marks"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={subject.marks}
                onChange={(e) => handleChange(e, index, "marks")}
                required
              />
              <input
                type="text"
                placeholder="Grade"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={subject.grade}
                onChange={(e) => handleChange(e, index, "grade")}
                required
              />
              <input
                type="text"
                placeholder="Remarks"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={subject.remarks}
                onChange={(e) => handleChange(e, index, "remarks")}
              />
            </div>
          </div>
        ))}

        {/* Add Subject Button */}
        <button
          type="button"
          onClick={addSubjectField}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors flex items-center"
        >
          <FaPlus className="mr-2" /> Add Subject
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition-colors"
        >
          {editMode ? "Update Result" : "Add Result"}
        </button>
      </form>

      {/* Results List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Results List</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
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
                  <tr key={result._id} className="border-b hover:bg-gray-50 transition-colors text-center">
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
                  <td colSpan="8" className="text-center text-gray-500 p-4">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(results.length / resultsPerPage)).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`mx-1 px-3 py-1 rounded-lg ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default ResultManagement;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

// const ResultManagement = () => {
//   const [results, setResults] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [formData, setFormData] = useState({
//     studentId: "",
//     examName: "",
//     subjects: [{ name: "", marks: "", grade: "", remarks: "" }],
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const examTypes = ["Pre Test", "Test", "Final Exam", "Class Test"];

//   // Fetch all results
//   const fetchResults = async () => {
//     try {
//       const res = await axios.get("https://school-4ee7.onrender.com/api/results");
//       const sortedResults = res.data.results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setResults(sortedResults || []);
//     } catch (error) {
//       console.error("Error fetching results:", error);
//       setResults([]);
//     }
//   };

//   // Fetch all students
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch("https://school-4ee7.onrender.com/api/students");
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         setStudents(data);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     fetchResults();
//   }, []);

//   // Handle form changes
//   const handleChange = (e, index, field) => {
//     if (field === "examName") {
//       setFormData({ ...formData, examName: e.target.value });
//     } else {
//       const updatedSubjects = [...formData.subjects];
//       updatedSubjects[index][field] = e.target.value;

//       if (field === "marks") {
//         const marks = parseFloat(e.target.value);
//         let grade = "";
//         let remarks = "";

//         if (marks >= 80) {
//           grade = "A+";
//           remarks = "Very Good";
//         } else if (marks >= 70) {
//           grade = "A";
//           remarks = "Very Good";
//         } else if (marks >= 60) {
//           grade = "A-";
//           remarks = "Very Good";
//         } else if (marks >= 50) {
//           grade = "B";
//           remarks = "Good";
//         } else if (marks >= 40) {
//           grade = "C";
//           remarks = "Normal";
//         } else if (marks >= 33) {
//           grade = "D";
//           remarks = "Normal";
//         } else {
//           grade = "F";
//           remarks = "Bad";
//         }

//         updatedSubjects[index]["grade"] = grade;
//         updatedSubjects[index]["remarks"] = remarks;
//       }

//       setFormData({ ...formData, subjects: updatedSubjects });
//     }
//   };

//   // Add a new subject field
//   const addSubjectField = () => {
//     setFormData({
//       ...formData,
//       subjects: [...formData.subjects, { name: "", marks: "", grade: "", remarks: "" }],
//     });
//   };

//   // Submit the form (Add or Edit)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editMode) {
//         await axios.put(`https://school-4ee7.onrender.com/api/results/${editingId}`, {
//           studentId: formData.studentId,
//           examName: formData.examName,
//           subjects: formData.subjects,
//         });
//         setEditMode(false);
//         setEditingId(null);
//       } else {
//         await axios.post("https://school-4ee7.onrender.com/api/results/add", {
//           studentId: formData.studentId,
//           examName: formData.examName,
//           subjects: formData.subjects,
//         });
//       }

//       fetchResults();
//       setFormData({ studentId: "", examName: "", subjects: [{ name: "", marks: "", grade: "", remarks: "" }] });
//     } catch (error) {
//       console.error("Error submitting result:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Student Results</h1>

//       {/* Form */}
//       <form className="bg-white p-6 rounded-lg shadow-lg mb-8" onSubmit={handleSubmit}>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Exam Name Dropdown */}
//           <div>
//             <label className="block mb-2 font-bold text-gray-700">Exam Name</label>
//             <select
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={formData.examName}
//               onChange={(e) => handleChange(e, null, "examName")}
//               required
//             >
//               <option value="">Select Exam</option>
//               {examTypes.map((exam, index) => (
//                 <option key={index} value={exam}>
//                   {exam}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Student Dropdown */}
//           <div>
//             <label className="block mb-2 font-bold text-gray-700">Student</label>
//             <select
//               className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={formData.studentId}
//               onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
//               required
//             >
//               <option value="">Select Student</option>
//               {students && students.length > 0 ? (
//                 students.map((student) => (
//                   <option key={student._id} value={student._id}>
//                     {student.userId?.name || "Unnamed"} - {student.rollNumber || "No Roll Number"} - {student.className || "No Class"} - {student._id || "No Class"}
//                   </option>
//                 ))
//               ) : (
//                 <option disabled>No students found</option>
//               )}
//             </select>
//           </div>
//         </div>

//         {/* Subject Fields */}
//         {formData.subjects.map((subject, index) => (
//           <div key={index} className="bg-gray-50 p-4 rounded-lg mt-4">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <input
//                 type="text"
//                 placeholder="Subject Name"
//                 className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={subject.name}
//                 onChange={(e) => handleChange(e, index, "name")}
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Marks"
//                 className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={subject.marks}
//                 onChange={(e) => handleChange(e, index, "marks")}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Grade"
//                 className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={subject.grade}
//                 onChange={(e) => handleChange(e, index, "grade")}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Remarks"
//                 className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={subject.remarks}
//                 onChange={(e) => handleChange(e, index, "remarks")}
//               />
//             </div>
//           </div>
//         ))}

//         {/* Add Subject Button */}
//         <button
//           type="button"
//           onClick={addSubjectField}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors flex items-center"
//         >
//           <FaPlus className="mr-2" /> Add Subject
//         </button>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-green-600 transition-colors"
//         >
//           {editMode ? "Update Result" : "Add Result"}
//         </button>
//       </form>

//       {/* Results List */}
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Results List</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
//                 <th className="p-3 text-left">Student</th>
//                 <th className="p-3 text-left">Class</th>
//                 <th className="p-3 text-left">Exam</th>
//                 <th className="p-3 text-left">Subjects & Marks</th>
//                 <th className="p-3 text-left">Total Marks</th>
//                 <th className="p-3 text-left">Percentage</th>
//                 <th className="p-3 text-left">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {results && results.length > 0 ? (
//                 results.map((result) => (
//                   <tr key={result._id} className="border-b hover:bg-gray-50 transition-colors text-center">
//                     <td className="p-3 text-gray-700">{result.studentId?.userId?.name || "Unknown"}</td>
//                     <td className="p-3 text-gray-700">{result.studentId?.className || "N/A"}</td>
//                     <td className="p-3 text-gray-700">{result.examName || "N/A"}</td>
//                     <td className="p-3 text-gray-700">
//                       {result.subjects.map((subject, index) => (
//                         <div key={index} className="mb-1">
//                           <strong>{subject.name}</strong>: {subject.marks} Marks ({subject.grade})
//                         </div>
//                       ))}
//                     </td>
//                     <td className="p-3 text-gray-700">{result.totalMarks}</td>
//                     <td className="p-3 text-gray-700">{result.percentage?.toFixed(2)}%</td>
//                     <td className="p-3 text-gray-700">{result.resultStatus}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-center text-gray-500 p-4">
//                     No results found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultManagement;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// const AdminResultManagement = () => {
//     const [results, setResults] = useState([]); // ✅ Default empty array
//     const [students, setStudents] = useState([]); // ✅ Default empty array
//   const [formData, setFormData] = useState({
//     studentId: "",
//     examName: "", // ✅ NEW FIELD FOR EXAM NAME
//     subjects: [{ name: "", marks: "", grade: "", remarks: "" }],
//   });
//   const [editMode, setEditMode] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const examTypes = ["Pre Test", "Test", "Final Exam", "Class Test"]; // ✅ EXAM TYPE OPTIONS

//   // Fetch all results
//   const fetchResults = async () => {
//     try {
//       const res = await axios.get("https://school-4ee7.onrender.com/api/results");
//       setResults(res.data.results || []); // ✅ Ensure it's always an array
//     } catch (error) {
//       console.error("Error fetching results:", error);
//       setResults([]); // ✅ Prevent `undefined`
//     }
//   };

//   // Fetch all students (for selecting students in form)
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch("https://school-4ee7.onrender.com/api/students");
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setStudents(data);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };
  
//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     fetchResults();
//   }, []);

//   // Handle form changes
//   const handleChange = (e, index, field) => {
//     if (field === "examName") {
//       setFormData({ ...formData, examName: e.target.value });
//     } else {
//       const updatedSubjects = [...formData.subjects];
//       updatedSubjects[index][field] = e.target.value;

//       if (field === "marks") {
//         const marks = parseFloat(e.target.value);
//         let grade = "";
//         let remarks = "";

//         if (marks >= 80) {
//           grade = "A+";
//           remarks = "Very Good";
//         } else if (marks >= 70) {
//           grade = "A";
//           remarks = "Very Good";
//         } else if (marks >= 60) {
//           grade = "A-";
//           remarks = "Very Good";
//         } else if (marks >= 50) {
//           grade = "B";
//           remarks = "Good";
//         } else if (marks >= 40) {
//           grade = "C";
//           remarks = "Normal";
//         } else if (marks >= 33) {
//           grade = "D";
//           remarks = "Normal";
//         } else {
//           grade = "F";
//           remarks = "Bad";
//         }

//         updatedSubjects[index]["grade"] = grade;
//         updatedSubjects[index]["remarks"] = remarks;
//       }

//       setFormData({ ...formData, subjects: updatedSubjects });
//     }
//   };

//   // Add a new subject field
//   const addSubjectField = () => {
//     setFormData({
//       ...formData,
//       subjects: [...formData.subjects, { name: "", marks: "", grade: "", remarks: "" }],
//     });
//   };


//   // Edit a result
//   const handleEdit = (result) => {
//     setFormData({
//       studentId: result.studentId?._id || "",
//       examName: result.examName || "", // ✅ Ensure examName is set
//       subjects: result.subjects.map((sub) => ({
//         name: sub.name || "",
//         marks: sub.marks || "",
//         grade: sub.grade || "",
//         remarks: sub.remarks || "",
//       })),
//     });
//     setEditMode(true);
//     setEditingId(result._id);
//   };

//   // Submit the form (Add or Edit)
// // Submit the form (Add or Edit)
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     if (editMode) {
//       await axios.put(`https://school-4ee7.onrender.com/api/results/${editingId}`, {
//         studentId: formData.studentId,
//         examName: formData.examName, // ✅ Ensure examName is sent
//         subjects: formData.subjects,
//       });

//       setEditMode(false);
//       setEditingId(null);
//     } else {
//       await axios.post("https://school-4ee7.onrender.com/api/results/add", {
//         studentId: formData.studentId,
//         examName: formData.examName,
//         subjects: formData.subjects,
//       });
//     }

//     fetchResults();
//     setFormData({ studentId: "", examName: "", subjects: [{ name: "", marks: "", grade: "", remarks: "" }] });
//   } catch (error) {
//     console.error("Error submitting result:", error);
//   }
// };
//   // Delete a result
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://school-4ee7.onrender.com/api/results/${id}`);
//       fetchResults();
//     } catch (error) {
//       console.error("Error deleting result:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Student Results</h1>

//       {/* Form */}
//       <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>

//                 {/* ✅ Exam Name Dropdown */}
//                 <label className="block mb-2 font-bold">Exam Name</label>
//         <select
//           className="w-full p-2 border rounded mb-4"
//           value={formData.examName}
//           onChange={(e) => handleChange(e, null, "examName")}
//           required
//         >
//           <option value="">Select Exam</option>
//           {examTypes.map((exam, index) => (
//             <option key={index} value={exam}>
//               {exam}
//             </option>
//           ))}
//         </select>


//         <label className="block mb-2 font-bold">Student</label>
//         <select
//           className="w-full p-2 border rounded mb-4"
//           value={formData.studentId}
//           onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
//           required
//         >
//           <option value="">Select Student</option>
//           {students && students.length > 0 ? (
//             students.map((student) => (
//                 <option key={student._id} value={student._id}>
//                 {student.userId?.name || "Unnamed"} - {student.rollNumber || "No Roll Number"} - {student.className || "No Roll Number"}
//                 </option>
//             ))
//             ) : (
//             <option disabled>No students found</option>
//             )}
//         </select>

//         {formData.subjects.map((subject, index) => (
//           <div key={index} className="mb-4 p-3 border rounded">
//             <input
//               type="text"
//               placeholder="Subject Name"
//               className="w-full p-2 border rounded mb-2"
//               value={subject.name}
//               onChange={(e) => handleChange(e, index, "name")}
//               required
//             />
//             <input
//               type="number"
//               placeholder="Marks"
//               className="w-full p-2 border rounded mb-2"
//               value={subject.marks}
//               onChange={(e) => handleChange(e, index, "marks")}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Grade"
//               className="w-full p-2 border rounded mb-2"
//               value={subject.grade}
//               onChange={(e) => handleChange(e, index, "grade")}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Remarks"
//               className="w-full p-2 border rounded"
//               value={subject.remarks}
//               onChange={(e) => handleChange(e, index, "remarks")}
//             />
//           </div>
//         ))}

//         <button type="button" onClick={addSubjectField} className="bg-gray-500 text-white px-3 py-2 rounded mr-2">
//           + Add Subject
//         </button>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           {editMode ? "Update Result" : "Add Result"}
//         </button>
//       </form>

//       {/* Results List */}
//       <h2 className="mt-8 text-2xl font-bold text-gray-800">Results List</h2>
//       <table className="w-full mt-4 border-collapse border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-4 py-2">Student</th>
//             <th className="border px-4 py-2">Class</th>
//             <th className="border px-4 py-2">Exam</th> {/* ✅ Show Exam Name */}
//             <th className="border px-4 py-2">Subjects & Marks</th>
//             <th className="border px-4 py-2">Total Marks</th>
//             <th className="border px-4 py-2">Percentage</th>
//             <th className="border px-4 py-2">Status</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results  &&  results.length > 0 ? (
//             results.map((result) => (
//               <tr key={result._id} className="text-center">
//                 <td className="border px-4 py-2">{result.studentId?.userId?.name || "Unknown"}</td>
//                 <td className="border px-4 py-2">{result.studentId?.className || "N/A"}</td>
//                 <td className="border px-4 py-2">{result.examName || "N/A"}</td> {/* ✅ Display Exam Name */}
//                 <td className="border px-4 py-2 text-left">
//                   {result.subjects.map((subject, index) => (
//                     <div key={index} className="mb-1">
//                       <strong>{subject.name}</strong>: {subject.marks} Marks ({subject.grade})
//                     </div>
//                   ))}
//                 </td>
//                 <td className="border px-4 py-2">{result.totalMarks}</td>
//                 <td className="border px-4 py-2">{result.percentage?.toFixed(2)}%</td>
//                 <td className="border px-4 py-2">{result.resultStatus}</td>
//                 <td className="border px-4 py-2 flex">
//                   <button onClick={() => handleEdit(result)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
//                   <FaEdit />
//                   </button>
//                   <button onClick={() => handleDelete(result._id)} className="bg-red-500 text-white px-2 py-1 rounded">
//                   <MdDelete />
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center text-gray-500 p-4">
//                 No results found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminResultManagement;

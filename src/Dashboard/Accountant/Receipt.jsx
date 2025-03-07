import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPrint, FaTrash } from "react-icons/fa";

const Receipt = () => {
  const [fees, setFees] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const feesPerPage = 20; // Show 5 records per page

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get("https://school-4ee7.onrender.com/api/fees/fees");
        console.log("API Response:", response.data); // Debugging
  
        // Sort fees by date (newest first)
        const sortedFees = response.data.sort((a, b) => 
          new Date(b.paymentDate) - new Date(a.paymentDate)
        );
  
        setFees(sortedFees);
      } catch (error) {
        console.error("Error fetching fees:", error);
      }
    };
    fetchFees();
  }, []);

  // Delete fee record
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this fee record?")) return;
    try {
      await axios.delete(`https://school-4ee7.onrender.com/api/fees/fees/${id}`);
      setFees(fees.filter((fee) => fee._id !== id));
    } catch (error) {
      console.error("Error deleting fee record:", error);
      alert("Error deleting fee record");
    }
  };

  // Print Receipt
  const handlePrint = (fee) => {
    const receiptContent = `
      <div style="text-align: center;">
        <h2>Hatibandha SS High School</h2>
        <p><strong>Receipt No:</strong> ${fee.receiptNumber}</p>
        <p><strong>Student Name:</strong> ${fee.studentName}</p>
        <p><strong>Fees Type:</strong> ${fee.feeType}</p>
        <p><strong>Amount Paid:</strong> $${fee.amount}</p>
        <p><strong>Payment Date:</strong> ${new Date(fee.paymentDate).toLocaleDateString()}</p>
        <p><strong>Payment Method:</strong> ${fee.paymentMethod}</p>
        <hr>
        <p>Thank you for your payment.</p>
      </div>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(receiptContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Filtered Fees based on Student ID
  const filteredFees = searchId
  ? fees.filter((fee) => 
      String(fee.studentId?._id || fee.studentId || "").toLowerCase().includes(searchId.toLowerCase())
    )
  : fees;

  // Pagination Logic
  const indexOfLastFee = currentPage * feesPerPage;
const indexOfFirstFee = indexOfLastFee - feesPerPage;
const currentFees = filteredFees.slice(indexOfFirstFee, indexOfLastFee);

// Reset to page 1 if search input changes
useEffect(() => {
  setCurrentPage(1);
}, [searchId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Accountant Dashboard</h1>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Student ID"
          className="px-4 py-2 border rounded-lg w-full"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
      </div>

      {/* Fee Records Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Fee Records</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {/* <th className="p-2">Student ID</th> */}
              <th className="p-2">Student</th>
              <th className="p-2">Fees Types</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Date</th>
              <th className="p-2">Method</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentFees.map((fee) => (
              <tr key={fee._id} className="border-t text-center">
                {/* <td className="p-2">{fee.studentId?._id || fee.studentId || "N/A"}</td>  */}
                <td className="p-2 font-bold">{fee.studentName}</td>
                <td className="p-2">{fee.feeType}</td>
                <td className="p-2 text-green-500 font-bold">${fee.amount}</td>
                <td className="p-2">{new Date(fee.paymentDate).toLocaleDateString()}</td>
                <td className="p-2">{fee.paymentMethod}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => handlePrint(fee)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    <FaPrint />
                  </button>
                  <button onClick={() => handleDelete(fee._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 bg-orange-500 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white bg-rose-400 p-2 rounded">Page {currentPage}</span>
          <button
            disabled={indexOfLastFee >= filteredFees.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 bg-orange-500 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaPrint, FaTrash } from "react-icons/fa";

// const Receipt = () => {
//   const [fees, setFees] = useState([]);

//   useEffect(() => {
//     const fetchFees = async () => {
//       try {
//         const response = await axios.get("https://school-4ee7.onrender.com/api/fees/fees");
//         setFees(response.data);
//       } catch (error) {
//         console.error("Error fetching fees:", error);
//       }
//     };

//     fetchFees();
//   }, []);
//   // Delete fee record
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this fee record?")) return;
//     try {
//       await axios.delete(`https://school-4ee7.onrender.com/api/fees/fees/${id}`);
//       setFees(fees.filter((fee) => fee._id !== id));
//     } catch (error) {
//       console.error("Error deleting fee record:", error);
//       alert("Error deleting fee record");
//     }
//   };

//   // Print Receipt
//   const handlePrint = (fee) => {
//     const receiptContent = `
//       <div style="text-align: center;">
//         <h2>Hatibandha SS High School</h2>
//         <p><strong>Receipt No:</strong> ${fee.receiptNumber}</p>
//         <p><strong>Student Name:</strong> ${fee.studentName}</p>
//         <p><strong>Fees Type:</strong> ${fee.feeType}</p>
//         <p><strong>Amount Paid:</strong> $${fee.amount}</p>
//         <p><strong>Payment Date:</strong> ${new Date(fee.paymentDate).toLocaleDateString()}</p>
//         <p><strong>Payment Method:</strong> ${fee.paymentMethod}</p>
//         <hr>
//         <p>Thank you for your payment.</p>
//       </div>
//     `;

//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(receiptContent);
//     printWindow.document.close();
//     printWindow.print();
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Accountant Dashboard</h1>

//       {/* Fee Records */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Fee Records</h2>
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="p-2">Student</th>
//               <th className="p-2">Fees Types</th>
//               <th className="p-2">Amount</th>
//               <th className="p-2">Date</th>
//               <th className="p-2">Method</th>
//               <th className="p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {fees.map((fee) => (
//               <tr key={fee._id} className="border-t">
//                 <td className="p-2">{fee.studentName}</td>
//                 <td className="p-2">{fee.feeType}</td>
//                 <td className="p-2">${fee.amount}</td>
//                 <td className="p-2">{new Date(fee.paymentDate).toLocaleDateString()}</td>
//                 <td className="p-2">{fee.paymentMethod}</td>
//                 <td className="p-2 flex gap-2">
//                   <button onClick={() => handlePrint(fee)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
//                     <FaPrint />
//                   </button>
//                   <button onClick={() => handleDelete(fee._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };


// export default Receipt
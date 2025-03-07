import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFeeForm = ({ onFeeAdded }) => {
  const [students, setStudents] = useState([]);
  const [receiptData, setReceiptData] = useState(null); // ✅ Store receipt details
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showPrint, setShowPrint] = useState(false); // ✅ Show Print Button after success
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    feeType: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "Cash",
  });

  // ✅ Fetch students when component loads
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://school-4ee7.onrender.com/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  // ✅ Handle Student ID input change & Suggest Matching IDs
  const handleStudentIdChange = (e) => {
    const input = e.target.value;
    setFormData({ ...formData, studentId: input, studentName: "" });

    if (input) {
      const matches = students.filter((student) =>
        student._id.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredStudents(matches);
    } else {
      setFilteredStudents([]);
    }
  };

  // ✅ Select Student and Auto-Fill Name
  const handleSelectStudent = (student) => {
    setFormData({
      ...formData,
      studentId: student._id,
      studentName: student.userId.name,
    });
    setFilteredStudents([]);
  };

  // ✅ Handle other input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit Fee Payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://school-4ee7.onrender.com/api/fees/fees", formData);
      toast.success("✅ Fee payment successful!");

      setReceiptData(response.data.fee); // ✅ Store fee data for printing

      setFormData({
        studentId: "",
        studentName: "",
        feeType: "Tuition Fee",
        amount: "",
        paymentDate: "",
        paymentMethod: "Cash",
      });

      setShowPrint(true); // ✅ Show Print Button

      if (onFeeAdded) {
        onFeeAdded();
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("❌ Error processing payment!");
    }
  };

  // ✅ Print Receipt Function
   // ✅ Custom Print Function (Replaces react-to-print)
   const handlePrint = (fee) => {
    if (!fee) {
      toast.error("❌ No receipt data available!");
      return;
    }
  
    const receiptContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Receipt</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            display: flex;
           
            margin: 0;
          }
          .receipt-container {
          display: flex;
          gap: 30px;
        }
        .receipt-box {
          background-color: #ffffff;
          border: 2px solid #2c3e50;
          border-radius: 10px;
          padding: 20px;
          width: 350px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        h2 {
          color: #2c3e50;
          font-size: 20px;
          margin-bottom: 10px;
          font-weight: bold;
          text-align: center;
        }
        .receipt-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #2c3e50;
          padding: 8px;
          margin: 5px 0;
          font-size: 14px;
          color: #34495e;
          background: #f8f8f8;
          border-radius: 5px;
        }
        .receipt-item strong {
          color: #2c3e50;
          font-weight: 600;
          width: 50%;
          text-align: left;
        }
        .receipt-item span {
          width: 50%;
          text-align: right;
        }
          p {
            margin: 5px 0;
            font-size: 14px;
            color: #34495e;
          }
          p strong {
            color: #2c3e50;
            font-weight: 600;
          }
          hr {
            border: 0;
            height: 1px;
            background: #e0e0e0;
            margin: 15px 0;
          }
          .thank-you {
            color: #27ae60;
            font-weight: bold;
            font-size: 14px;
            margin-top: 15px;
            text-align: center;
          }
            .signature {
           
            font-weight: bold;
            font-size: 14px;
            margin-top: 15px;
            text-align: center;
          }
            .thank-you-student {
            font-weight: bold;
            font-size: 14px;
            margin-top: 15px;
            text-align: start;
            display: flex;
          justify-content: space-between;
          }
          .school-name {
          text-align: center;
          }
          .copy{
            text-align:end;
            margin-top:-10px
          }
        </style>
      </head>
      <body>
        <div class="receipt-container">
          <!-- ✅ School Copy -->
          <div class="receipt-box">
            <h4 class="school-name">Hatibandha SS High School</h4>
              <p class="copy">School Copy</p>
          <div class="receipt-item"><strong>Receipt No:</strong> <span>${fee.receiptNumber}</span></div>
          <div class="receipt-item"><strong>Student Name:</strong> <span>${fee.studentName}</span></div>
          <div class="receipt-item"><strong>Fees Type:</strong> <span>${fee.feeType}</span></div>
          <div class="receipt-item"><strong>Amount Paid:</strong> <span>$${fee.amount}</span></div>
          <div class="receipt-item"><strong>Payment Date:</strong> <span>${new Date(fee.paymentDate).toLocaleDateString()}</span></div>
          <div class="receipt-item"><strong>Payment Method:</strong> <span>${fee.paymentMethod}</span></div>
          
            <p class="thank-you">Thank you for your payment!</p>
          </div>
  
          <!-- ✅ Student Copy -->
          <div class="receipt-box">
            <h4 class="school-name">Hatibandha SS High School</h4>
              <p class="copy">Student Copy</p>
          <div class="receipt-item"><strong>Receipt No:</strong> <span>${fee.receiptNumber}</span></div>
          <div class="receipt-item"><strong>Student Name:</strong> <span>${fee.studentName}</span></div>
          <div class="receipt-item"><strong>Fees Type:</strong> <span>${fee.feeType}</span></div>
          <div class="receipt-item"><strong>Amount Paid:</strong> <span>$${fee.amount}</span></div>
          <div class="receipt-item"><strong>Payment Date:</strong> <span>${new Date(fee.paymentDate).toLocaleDateString()}</span></div>
          <div class="receipt-item"><strong>Payment Method:</strong> <span>${fee.paymentMethod}</span></div>
            <p class="thank-you-student"><span class="thank-you">Keep this copy for your records!</span>  <span class="signature">Signature</span></p>
          </div>
        </div>
  
        <script>
          window.onload = function () {
            window.print();
            setTimeout(() => { window.close(); }, 100);
          };
        </script>
      </body>
      </html>
    `;
  
    const printWindow = window.open("", "_blank");
    printWindow.document.write(receiptContent);
    printWindow.document.close();
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-10 mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Fee Payment</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
        {/* ✅ Student ID Input with Autocomplete */}
        <div className="relative">
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleStudentIdChange}
            placeholder="Enter Student ID"
            required
            className="p-2 border rounded w-full"
          />
          {filteredStudents.length > 0 && (
            <ul className="absolute bg-white border rounded w-full mt-1 shadow-lg max-h-40 overflow-y-auto z-10">
              {filteredStudents.map((student) => (
                <li
                  key={student._id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectStudent(student)}
                >
                  {student._id} - {student.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ✅ Student Name (Auto-Filled) */}
        <input
          type="text"
          name="studentName"
          value={formData.studentName}
          readOnly
          placeholder="Student Name"
          className="p-2 border rounded bg-gray-100"
        />

        {/* ✅ Select Fee Type */}
        <select name="feeType" value={formData.feeType} onChange={handleChange} required className="p-2 border rounded">
          <option value="">Select Fee Type</option>
          <option value="Tuition Fee">Tuition Fee</option>
          <option value="Exam Fee">Exam Fee</option>
          <option value="Library Fee">Library Fee</option>
          <option value="Sports Fee">Sports Fee</option>
        </select>

        {/* ✅ Enter Amount */}
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required className="p-2 border rounded" />

        {/* ✅ Select Payment Date */}
        <input type="date" name="paymentDate" value={formData.paymentDate} onChange={handleChange} required className="p-2 border rounded" />

        {/* ✅ Select Payment Method */}
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required className="p-2 border rounded">
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>

        {/* ✅ Submit Button */}
        <button type="submit" className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-7">
          Submit Payment
        </button>
      </form>

      {/* ✅ Print Receipt Button (Only shown after success)
      {showPrint && (
        <button onClick={handlePrint} className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Print Receipt
        </button>
      )} */}

      {/* ✅ Show Print Button when data exists */}
      {receiptData && (
        <button onClick={() => handlePrint(receiptData)} className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Print Receipt
        </button>
      )}
    </div>
  );
};

export default AddFeeForm;
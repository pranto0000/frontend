import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountantAllReport = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const incomeRes = await axios.get("https://school-4ee7.onrender.com/api/fees/api/fees/total-income");
        const expenseRes = await axios.get("https://school-4ee7.onrender.com/api/fees/api/expenses/total-expenses");
        const expenseList = await axios.get("https://school-4ee7.onrender.com/api/fees/api/expenses/report");

        setTotalIncome(incomeRes.data.total || 0);
        setTotalExpenses(expenseRes.data.total || 0);
        setRemainingBalance(incomeRes.data.total - expenseRes.data.total);
        setExpenses(expenseList.data);
      } catch (error) {
        console.error("Error fetching accountant report:", error);
      }
    };
    fetchReport();
  }, []);

  // Function to Download PDF
  const handleDownloadPDF = () => {
    window.open("https://school-4ee7.onrender.com/api/fees/api/accountant/report/download", "_blank");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Accountant Report</h1>
      
      {/* Summary Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Financial Summary</h2>
        <p className="text-lg">Total Income: <span className="font-semibold text-green-600">৳{totalIncome.toFixed(2)}</span></p>
        <p className="text-lg">Total Expenses: <span className="font-semibold text-red-600">৳{totalExpenses.toFixed(2)}</span></p>
        <p className="text-lg">Remaining Balance: <span className="font-semibold text-blue-600">৳{remainingBalance.toFixed(2)}</span></p>
      </div>

      {/* Expense Report */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Expense Report</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Reason</th>
              <th className="p-2">Amount (৳)</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <tr key={expense._id} className="border-t text-center">
                  <td className="p-2">{expense.reason}</td>
                  <td className="p-2">৳{expense.amount}</td>
                  <td className="p-2">{new Date(expense.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 text-center">No expenses recorded</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Download PDF Button */}
      <div className="mt-6 text-center">
        <button 
          onClick={handleDownloadPDF} 
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
        >
          Download Report as PDF
        </button>
      </div>
    </div>
  );
};

export default AccountantAllReport;

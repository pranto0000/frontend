import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMoneyBill, FaChartPie, FaWallet, FaHistory } from "react-icons/fa";
const AccountantDashboardHome = () => {
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    pendingFees: 0,
    remainingBalance: 0,
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeRes = await axios.get("https://school-4ee7.onrender.com/api/fees/total-income");
        const expenseRes = await axios.get("https://school-4ee7.onrender.com/api/fees/total-expenses"); // Fix route
        const pendingFeesRes = await axios.get("https://school-4ee7.onrender.com/api/fees/pending-fees");
        const transactionRes = await axios.get("https://school-4ee7.onrender.com/api/fees/transactions/recent"); // Fix route
    
        const totalIncome = incomeRes.data.total || 0;
        const totalExpenses = expenseRes.data.total || 0;
        const pendingFees = pendingFeesRes.data.total || 0;
        const remainingBalance = totalIncome - totalExpenses;
    
        setStats({ totalIncome, totalExpenses, pendingFees, remainingBalance });
        setTransactions(transactionRes.data);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Accountant Dashboard</h1>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded text-center">
          <FaMoneyBill className="text-green-500 text-4xl mx-auto mb-2" />
          <h2 className="text-lg font-bold">Total Income</h2>
          <p className="text-2xl text-green-600">৳{stats.totalIncome}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <FaChartPie className="text-red-500 text-4xl mx-auto mb-2" />
          <h2 className="text-lg font-bold">Total Expenses</h2>
          <p className="text-2xl text-red-600">৳{stats.totalExpenses}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <FaWallet className="text-blue-500 text-4xl mx-auto mb-2" />
          <h2 className="text-lg font-bold">Pending Fees</h2>
          <p className="text-2xl text-blue-600">৳{stats.pendingFees}</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <FaHistory className="text-yellow-500 text-4xl mx-auto mb-2" />
          <h2 className="text-lg font-bold">Remaining Balance</h2>
          <p className="text-2xl text-yellow-600">৳{stats.remainingBalance}</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
            <th className="p-2">Date</th>
              <th className="p-2">Reason</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx._id} className="border-t text-center">
                  <td className="p-2">{new Date(tx.date).toLocaleDateString()}</td>
                  <td className="p-2">{tx.reason}</td>
                  <td className={`p-2 ${tx.type === "Expense" ? "text-red-600" : "text-green-600"}`}>
                    ৳{tx.amount}
                  </td>
                  <td className="p-2">{tx.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 p-4">
                  No recent transactions
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountantDashboardHome
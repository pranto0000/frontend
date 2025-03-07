import React, { useState, useEffect } from "react";
import axios from "axios";
const FinancialExpenses = () => {
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [balance, setBalance] = useState(0);
    const [reason, setReason] = useState("");
    const [amount, setAmount] = useState("");
  
    useEffect(() => {
      fetchReport();
    }, []);
  
    const fetchReport = async () => {
      try {
        const incomeRes = await axios.get("https://school-4ee7.onrender.com/api/fees/api/income");
        const expenseRes = await axios.get("https://school-4ee7.onrender.com/api/fees/api/expenses");
        const balanceRes = await axios.get("https://school-4ee7.onrender.com/api/fees/api/balance");
  
        setIncome(incomeRes.data.totalIncome);
        setExpenses(expenseRes.data.totalExpenses);
        setBalance(balanceRes.data.balance);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
  
    const handleAddExpense = async (e) => {
      e.preventDefault();
      if (!reason || !amount) return alert("Please fill all fields");
  
      try {
        await axios.post("https://school-4ee7.onrender.com/api/fees/api/expenses", { reason, amount: Number(amount) });
        setReason("");
        setAmount("");
        fetchReport();
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    };
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Accountant Financial Report</h1>
  
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Total Income</h2>
            <p className="text-2xl font-bold text-green-500">${income}</p>
          </div>
  
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Total Expenses</h2>
            <p className="text-2xl font-bold text-red-500">${expenses}</p>
          </div>
  
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700">Available Balance</h2>
            <p className="text-2xl font-bold text-blue-500">${balance}</p>
          </div>
        </div>
  
        <div className="mt-6 bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold text-gray-800">Add Expense</h2>
          <form onSubmit={handleAddExpense} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Reason</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Amount</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
  
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Expense
            </button>
          </form>
        </div>
      </div>
    );
  };
  
export default FinancialExpenses
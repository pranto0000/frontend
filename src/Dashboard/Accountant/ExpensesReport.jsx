import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const ExpensesReport = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10); // Number of items per page

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("https://school-4ee7.onrender.com/api/fees/api/expenses/report");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses report:", error);
      }
    };
    fetchExpenses();
  }, []);

  // Calculate pagination details
  const offset = currentPage * itemsPerPage;
  const currentExpenses = expenses.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(expenses.length / itemsPerPage);

  const handlePageChange = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Expenses Report</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">All Expenses</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Reason</th>
              <th className="p-2">Amount (৳)</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentExpenses.length > 0 ? (
              currentExpenses.map((expense) => (
                <tr key={expense._id} className="border-t text-center">
                  <td className="p-2 font-bold">{expense.reason}</td>
                  <td className="p-2">৳<span className="text-red-500 font-bold"> {expense.amount}</span></td>
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

        {/* Pagination */}
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination flex justify-center mt-4"}
          activeClassName={"text-blue-500 font-bold"}
          previousClassName={"mr-2 px-3 py-1 bg-gray-200 rounded"}
          nextClassName={"ml-2 px-3 py-1 bg-gray-200 rounded"}
          pageClassName={"px-3 py-1 mx-1 bg-gray-100 rounded"}
          breakClassName={"px-3 py-1 mx-1 bg-gray-100 rounded"}
        />
      </div>
    </div>
  );
};

export default ExpensesReport;

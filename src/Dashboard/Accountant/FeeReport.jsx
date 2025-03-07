import React, { useState, useEffect } from "react";
import axios from "axios";

const FeeReport = () => {
  const [report, setReport] = useState({
    todayCollection: 0,
    thisMonthCollection: 0,
    monthlyCollection: [],
    yearlyCollection: [],
    totalFees: 0,
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get("https://school-4ee7.onrender.com/api/fees/report");
        setReport(response.data);
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    };

    fetchReport();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Fee Report</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Today's Collection */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-bold text-gray-800">Today's Collection</h2>
          <p className="text-2xl font-semibold text-green-500">${report.todayCollection}</p>
        </div>

        {/* This Month's Collection */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-bold text-gray-800">This Month</h2>
          <p className="text-2xl font-semibold text-orange-500">${report.thisMonthCollection}</p>
        </div>

        {/* Total Fees */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-bold text-gray-800">Total Fees</h2>
          <p className="text-2xl font-semibold text-blue-500">${report.totalFees}</p>
        </div>

        {/* Yearly Collection */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-bold text-gray-800">This Year</h2>
          <p className="text-2xl font-semibold text-purple-500">
            ${report.yearlyCollection.length > 0 ? report.yearlyCollection[0].total : 0}
          </p>
        </div>
      </div>

      {/* Monthly Collection */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6 ">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Collection</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Month</th>
              <th className="p-2">Year</th>
              <th className="p-2">Amount</th>
            </tr>
          </thead>
          <tbody className="">
            {report.monthlyCollection.map((month, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{month._id.month}</td>
                <td className="p-2">{month._id.year}</td>
                <td className="p-2">${month.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeReport;

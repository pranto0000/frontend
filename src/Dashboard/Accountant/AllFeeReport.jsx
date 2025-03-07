import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AllFeeReport = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [feeReport, setFeeReport] = useState([]);

  useEffect(() => {
    const fetchFeeReport = async () => {
      try {
        const response = await axios.get(`https://school-4ee7.onrender.com/api/fees/monthly-fee-report?year=${year}`);
        setFeeReport(response.data);
      } catch (error) {
        console.error("Error fetching fee report:", error);
      }
    };

    fetchFeeReport();
  }, [year]);

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const chartData = {
    labels: feeReport.map((entry) => `Month ${entry.month}`),
    datasets: [
      {
        label: "Tuition Fee",
        data: feeReport.map((entry) => entry["Tuition Fee"] || 0),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Exam Fee",
        data: feeReport.map((entry) => entry["Exam Fee"] || 0),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Library Fee",
        data: feeReport.map((entry) => entry["Library Fee"] || 0),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Sports Fee",
        data: feeReport.map((entry) => entry["Sports Fee"] || 0),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tuition Fee Collection Report</h1>

      {/* Year Selection */}
      <div className="mb-4">
        <label className="font-bold text-lg">Select Year: </label>
        <select className="p-2 border rounded ml-2" value={year} onChange={(e) => setYear(e.target.value)}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-lg font-bold">Total Tuition Fee</h2>
          <p className="text-2xl text-blue-600">
            ৳{feeReport.reduce((sum, entry) => sum + (entry["Tuition Fee"] || 0), 0)}
          </p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-lg font-bold">Total Exam Fee</h2>
          <p className="text-2xl text-red-600">
            ৳{feeReport.reduce((sum, entry) => sum + (entry["Exam Fee"] || 0), 0)}
          </p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-lg font-bold">Total Library Fee</h2>
          <p className="text-2xl text-green-600">
            ৳{feeReport.reduce((sum, entry) => sum + (entry["Library Fee"] || 0), 0)}
          </p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h2 className="text-lg font-bold">Total Sports Fee</h2>
          <p className="text-2xl text-yellow-600">
            ৳{feeReport.reduce((sum, entry) => sum + (entry["Sports Fee"] || 0), 0)}
          </p>
        </div>
      </div>

      {/* Fee Report Table */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Breakdown</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Month</th>
              <th className="p-2">Tuition Fee</th>
              <th className="p-2">Exam Fee</th>
              <th className="p-2">Library Fee</th>
              <th className="p-2">Sports Fee</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {feeReport.map((entry) => (
              <tr key={entry.month} className="border-t text-center">
                <td className="p-2">{entry.month}</td>
                <td className="p-2">৳{entry["Tuition Fee"] || 0}</td>
                <td className="p-2">৳{entry["Exam Fee"] || 0}</td>
                <td className="p-2">৳{entry["Library Fee"] || 0}</td>
                <td className="p-2">৳{entry["Sports Fee"] || 0}</td>
                <td className="p-2 font-bold">
                  ৳
                  {(entry["Tuition Fee"] || 0) +
                    (entry["Exam Fee"] || 0) +
                    (entry["Library Fee"] || 0) +
                    (entry["Sports Fee"] || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Fee Collection Chart</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default AllFeeReport;

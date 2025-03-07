import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserGraduate, FaChalkboardTeacher, FaChartLine } from "react-icons/fa"; // Import icons

const CountingStats = () => {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    averageResult: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("https://school-4ee7.onrender.com/api/stats/stats"); // Backend API
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Our School at a Glance
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Students Count */}
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-2xl text-white transform transition-all duration-300 hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center">
              <FaUserGraduate className="text-4xl mb-4" />
              <h2 className="text-xl font-semibold">Total Students</h2>
              <p className="text-4xl font-bold">
                <CountUp end={stats.students} duration={3} separator="," />
              </p>
            </div>
          </motion.div>

          {/* Teachers Count */}
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-2xl text-white transform transition-all duration-300 hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col items-center">
              <FaChalkboardTeacher className="text-4xl mb-4" />
              <h2 className="text-xl font-semibold">Total Teachers</h2>
              <p className="text-4xl font-bold">
                <CountUp end={stats.teachers} duration={3} separator="," />
              </p>
            </div>
          </motion.div>

          {/* Average Result */}
          <motion.div
            className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-2xl text-white transform transition-all duration-300 hover:scale-105"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col items-center">
              <FaChartLine className="text-4xl mb-4" />
              <h2 className="text-xl font-semibold">Average Result</h2>
              <p className="text-4xl font-bold">
                <CountUp end={'96.8'} duration={3} decimals={2} />
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CountingStats;
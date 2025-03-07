import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const AllTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("https://school-4ee7.onrender.com/api/teachers/teachers");
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-10 mt-10">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">
        All Teachers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher) => (
            <div
            key={teacher._id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
            <div className="flex flex-col items-center">
              <img
                src={teacher.image || "https://via.placeholder.com/150"}
                alt={teacher.userId.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
                />
              <h3 className="text-xl font-bold text-gray-800">
                {teacher.userId.name}
              </h3>
              <p className="text-gray-600 text-sm">{teacher.userId.role}</p>
              <p className="text-gray-600 text-sm">{teacher.phone}</p>
              <p className="text-gray-600 text-sm">{teacher.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
        </>
  );
};

export default AllTeachers;

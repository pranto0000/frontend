import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

const AllAchievements = () => {
  const [achievements, setAchievements] = useState([]);

  // Fetch all achievements from backend
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get("https://school-4ee7.onrender.com/api/achievements");
        setAchievements(response.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <>
    <Navbar/>
    <section className="py-12 bg-gray-50 min-h-screen mt-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">All Achievements</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div
            key={achievement._id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={achievement.imageUrl}
                alt={achievement.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
              <p className="text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer/>
          </>
  );
};

export default AllAchievements;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const navigate = useNavigate();

  // Fetch achievements from backend
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

  // Only show 6 achievements on homepage
  const displayedAchievements = achievements.slice(0, 3);

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Achievements</h2>
          <button
            onClick={() => navigate("/achievements")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
            >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedAchievements.map((achievement) => (
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
  );
};

export default Achievements;

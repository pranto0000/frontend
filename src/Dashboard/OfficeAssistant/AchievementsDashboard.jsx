import React, { useState, useEffect } from "react";
import axios from "axios";

const AchievementsDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [editId, setEditId] = useState(null); 

  
  // Fetch achievements
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

  // Add or update achievement
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        // Update achievement
        await axios.put(`https://school-4ee7.onrender.com/api/achievements/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Add new achievement
        await axios.post("https://school-4ee7.onrender.com/api/achievements", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      // Refresh achievements list
      const response = await axios.get("https://school-4ee7.onrender.com/api/achievements");
      setAchievements(response.data);
      setTitle("");
      setDescription("");
      setImage(null);
      setEditId(null);
    } catch (error) {
      console.error("Error saving achievement:", error);
    }
  };

  // Delete achievement
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://school-4ee7.onrender.com/api/achievements/${id}`);
      // Refresh achievements list
      const response = await axios.get("https://school-4ee7.onrender.com/api/achievements");
      setAchievements(response.data);
    } catch (error) {
      console.error("Error deleting achievement:", error);
    }
  };

  // Edit achievement
  const handleEdit = (achievement) => {
    setTitle(achievement.title);
    setDescription(achievement.description);
    setEditId(achievement._id);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Achievements Uplode</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update Achievement" : "Add Achievement"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Achievements List</h3>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement._id} className="border-b pb-4 last:border-b-0">
              <h4 className="text-lg font-semibold">{achievement.title}</h4>
              <p className="text-gray-600">{achievement.description}</p>
              <img
                src={achievement.imageUrl}
                alt={achievement.title}
                className="w-24 h-24 object-cover mt-2"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(achievement)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(achievement._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsDashboard;
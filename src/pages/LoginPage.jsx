import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FaUser, FaLock } from "react-icons/fa"; // Import icons
import { ToastContainer, toast } from "react-toastify";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    try {
      const response = await axios.post("https://school-4ee7.onrender.com/api/auth/login", { email, password });
      console.log("Login response:", response.data); // Debugging

      const { token } = response.data;
      if (!token) throw new Error("Token not received");

      login(token); // Save token in AuthContext
      localStorage.setItem("token", token);

      const decodedUser = jwt_decode(token);
      // console.log("Decoded user:", decodedUser); // Debugging

        // Show success toast
        toast.success("Login successful!", { position: "top-right", autoClose: 3000 });

      switch (decodedUser.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "teacher":
          navigate("/teacher/dashboard");
          break;
        case "student":
          navigate("/student/dashboard");
          break;
        case "accountant":
          navigate("/accountant/dashboard");
          break;
        case "office-assistant":
          navigate("/office-assistant/dashboard");
          break;
        default:
          setError("Invalid role");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
        {/* School Name and Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="./logo.png" // Replace with your school logo path
            alt="School Logo"
            className="w-20 h-20 rounded-full"
          />
          <h1 className="text-2xl font-bold text-gray-500">Hatibandha SS High School</h1>
        </div>
        {error && (
          <p className="text-red-500 text-center bg-red-50 p-2 rounded-lg mb-4">
            {error}
          </p>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
            <FaUser className="text-gray-400 mr-2 inline-block" />Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
            <FaLock className="text-gray-400 mr-2 inline-block" />Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-end">
            <a
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-800 transition-all duration-300"
            >
              Forgot Password?
            </a>
          </div>

        </form>
      </div>
        {/* Toast Container */}
            <ToastContainer />
    </div>
  );
};

export default LoginPage;
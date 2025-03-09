import React, { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; // Import jwt-decode
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Function to handle Dashboard click
  const handleDashboardClick = () => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        console.log("Decoded Token:", decoded); // Debugging
  
        if (decoded.role === "admin") {
          navigate("/admin-dashboard");
        } else if (decoded.role === "teacher") {
          navigate("/teacher/dashboard");
        } else if (decoded.role === "accountant") {
          navigate("/accountant/dashboard");
        }
        else if (decoded.role === "office-assistant") {
          navigate("/office-assistant/dashboard");
        }
         else {
          navigate("/student/dashboard");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        navigate("/login"); // Redirect if token is invalid
      }
    } else {
      navigate("/login"); // Redirect if no token is found
    }
  };

  return (
    <>
    {/* Topbar */}
    <div
      className={`bg-gray-900 text-white py-2 px-4 transition-all duration-300 ${
        isScrolled ? "-translate-y-full opacity-0" : "opacity-100"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center text-sm">
        <div>
          📞 +123-456-7890 | <MdMarkEmailRead className="inline-block text-green-500" /> info@school.com
        </div>
        <div className="flex items-center space-x-4">
          <FaUser className="text-green-500" />
          <button onClick={handleDashboardClick} className="hover:underline">Dashboard</button>
          <button
            onClick={() => navigate("/login")}
            className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 flex items-center"
          >
            <FiLogIn className="mr-2" /> Login
          </button>
        </div>
      </div>
    </div>

    {/* Navbar */}
    <nav
      className={`p-4 text-white fixed w-full z-20 transition-all duration-300 ${
        isScrolled ? "bg-blue-800 shadow-lg top-0" : "bg-rose-500"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">School Name</h1>
        <ul className="hidden md:flex space-x-6">
          {["Home", "About", "Result", "Notice", "Contact"].map((item, index) => (
            <li key={index}>
              <a
                href={`/${item.toLowerCase()}`}
                className="text-white hover:text-rose-500 font-medium transition-all"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>

    {/* Mobile Menu */}
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-6 transform transition-transform duration-300 ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {["Home", "About", "Result", "Notice", "Contact"].map((item, index) => (
        <a
          key={index}
          href={`/${item.toLowerCase()}`}
          className="text-white text-lg font-semibold hover:text-yellow-300 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          {item}
        </a>
      ))}
    </div>
  </>
  );
};

export default Navbar;

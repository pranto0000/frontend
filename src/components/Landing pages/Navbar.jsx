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
    isScrolled ? "bg-blue-800 shadow-lg top-0" : "bg-blue-900"
  }`}
>
  <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
    <h1 className="text-xl font-bold">School Name</h1>

    {/* Desktop Menu */}
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

    {/* Mobile Menu Button */}
    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
      {isMenuOpen ? <FaTimes /> : <FaBars />}
    </button>
  </div>

  {/* Mobile Menu */}
  {isMenuOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-end">
      <div className="w-64 bg-blue-900 text-white h-full shadow-lg p-6">
        <button
          onClick={() => setIsMenuOpen(false)}
          className="text-white text-2xl absolute top-4 right-4"
        >
          <FaTimes />
        </button>
        <ul className="mt-10 space-y-4">
          {["Home", "About", "Result", "Notice", "Contact"].map((item, index) => (
            <li key={index}>
              <a
                href={`/${item.toLowerCase()}`}
                className="text-white block py-2 px-4 hover:bg-rose-500 rounded transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )}
</nav>
  </>
  );
};

export default Navbar;

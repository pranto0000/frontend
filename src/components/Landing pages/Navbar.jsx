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
      <div className={`bg-gray-900 text-white py-2 px-4 transition-all duration-300 ${isScrolled ? "-translate-y-full opacity-0" : "opacity-100"}`}>
        <div className="container mx-auto flex justify-between items-center text-sm">
          {/* Left Side: Contact Info */}
          <div>
            📞 +123-456-7890 | <MdMarkEmailRead className=" inline-block text-green-500"/> info@school.com
          </div>
          {/* Right Side: User Links */}
          <div className="flex items-center space-x-4">
            <FaUser className="text-green-500" />
            <button onClick={handleDashboardClick} className="hover:underline">Dashboard </button>
            {/* <a href="/login" className="hover:underline bg-orange-500 px-2 py-0.5 rounded-md"><FiLogIn className=" inline-block mr-2 text-black" />Login</a> */}
            <button onClick={() => navigate("/login")} className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-orange-500 rounded hover:bg-orange-500 group py-1 px-1.5">
<span className="w-56 h-48 rounded bg-white absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
<span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-black"><FiLogIn className=" inline-block mr-2 text-black group-hover:text-rose-500" /> Login</span>
</button>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`p-4 text-white  fixed w-full z-20 transition-all duration-300 ${isScrolled ? "bg-blue-800 shadow-lg top-0" : "bg-blue-900 top-2rem"}`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-xl font-bold">School Name</h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li><a href="/" className="text-white hover:text-rose-500 hover:font-bold transition-all duration-300 ease-in-out relative after:block after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">Home</a></li>
            <li><a href="/AboutPages" className="text-white hover:text-rose-500 hover:font-bold transition-all duration-300 ease-in-out relative after:block after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">About</a></li>
            <li><a href="/result" className="text-white hover:text-rose-500 hover:font-bold transition-all duration-300 ease-in-out relative after:block after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">Result</a></li>
            <li><a href="/NoticeBoard" className="text-white hover:text-rose-500 hover:font-bold transition-all duration-300 ease-in-out relative after:block after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-full">Notice</a></li>
            <li><a href="/contact" className="hover:text-gray-950 font-semibold transition bg-green-500 py-1 px-3 rounded-full">Contact</a></li>
            
          </ul>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-2xl"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <ul className="md:hidden bg-rose-400 text-white absolute top-full left-0 w-full flex flex-col items-center space-y-4 py-4 shadow-lg">
            <li><a href="/" className="hover:text-yellow-300 transition" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#about" className="hover:text-yellow-300 transition" onClick={() => setIsMenuOpen(false)}>About</a></li>
            <li><a href="#events" className="hover:text-yellow-300 transition" onClick={() => setIsMenuOpen(false)}>Events</a></li>
            <li><a href="#admission" className="hover:text-yellow-300 transition" onClick={() => setIsMenuOpen(false)}>Admission</a></li>
            <li><a href="/result" className="hover:text-yellow-300 transition" onClick={() => setIsMenuOpen(false)}>Result</a></li>
            <li><a href="/contact" className="hover:text-yellow-300 transition" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;

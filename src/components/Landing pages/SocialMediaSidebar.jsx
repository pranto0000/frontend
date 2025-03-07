import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";

const SocialMediaSidebar = () => {
  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 p-2 bg-gradient-to-r from-blue-800 to-indigo-900 shadow-lg rounded-l-lg z-40">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group">
        <FaFacebook className="w-6 h-6 text-white transition-transform transform hover:scale-125" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group">
        <FaInstagram className="w-6 h-6 text-pink-500 transition-transform transform hover:scale-125" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group">
        <FaTwitter className="w-6 h-6 text-blue-400 transition-transform transform hover:scale-125" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group">
        <FaLinkedin className="w-6 h-6 text-gray-300 transition-transform transform hover:scale-125" />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="group">
        <FaYoutube className="w-6 h-6 text-red-600 transition-transform transform hover:scale-125" />
      </a>
    </div>
  );
};

export default SocialMediaSidebar;

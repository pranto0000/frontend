import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import schoolLogo from "../../assets/soft-webmission-logo-icon.png"; // Replace with actual path
import companyLogo from "../../assets/soft-webmission-text-logo-text.png"; // Replace with actual path";

const Footer = () => {
  const [email, setEmail] = useState("");

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}`);
    setEmail("");
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* School Logo */}
          <div className="flex flex-col items-center">
            <img src={schoolLogo} alt="School Logo" className="w-24 h-24 mb-2 animate-pulse" />
            <h3 className="text-xl font-bold">Your School Name</h3>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Contact"].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="transition duration-300"
                >
                  <a href={`/${item.toLowerCase().replace(" ", "-")}`} className="hover:text-gray-400">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                123 Main Street, City, Country
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +123 456 7890
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                info@example.com
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>

        {/* Google Map */}
        <div className="mt-8 border-t border-gray-800 pt-8">
          <h3 className="text-xl font-bold mb-4 text-center">Our Location</h3>
          <div className="h-64 w-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.862646558618!2d90.3882773154314!3d23.75086808458922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cffc3fb%3A0x4a826f475fd312af!2sDhanmondi%2C%20Dhaka%201205!5e0!3m2!1sen!2sbd!4v1633084800000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Company Info */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-gray-400 border-t border-gray-800 pt-4">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Soft WebMission. All rights reserved.</p>
          <img src={companyLogo} alt="Company Logo" width={300} height={10} className="mt-4 md:mt-0" />
        </div>

        {/* Back-to-Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <FaArrowUp className="w-6 h-6" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
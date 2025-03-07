import React from "react";
import { FaChalkboardTeacher, FaBook, FaAward, FaUsers } from "react-icons/fa";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

const AboutPages = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{
            backgroundImage:
            "url('https://images.pexels.com/photos/5212332/pexels-photo-5212332.jpeg')",
        }}
        >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            About Our School
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in-up">
            Where curiosity meets opportunity, and every student is empowered to
            shine. We are more than a school—we are a community of dreamers,
            thinkers, and achievers.
          </p>
        </div>
      </section>

      {/* School Overview */}
      <section className="container mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-slide-in">
          Who We Are
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-slide-in">
          At the heart of our mission is a commitment to nurturing young minds
          through innovative teaching, state-of-the-art facilities, and a
          culture of excellence. We believe in creating an environment where
          every student can thrive academically, socially, and emotionally.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Mission Card */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg">
              To inspire a lifelong love of learning, foster critical thinking,
              and empower students to become compassionate, confident, and
              capable individuals.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg">
              To be a beacon of educational excellence, shaping future leaders
              who will make a positive impact on the world.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-8 animate-slide-in">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-4 gap-8 mt-8">
            {/* Feature Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaChalkboardTeacher className="text-blue-500 text-5xl mb-4" />
              <h4 className="font-bold text-2xl mb-2">Expert Teachers</h4>
              <p className="text-gray-600">
                Our passionate educators are dedicated to unlocking the potential
                in every student.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaBook className="text-green-500 text-5xl mb-4" />
              <h4 className="font-bold text-2xl mb-2">Innovative Curriculum</h4>
              <p className="text-gray-600">
                A dynamic curriculum designed to inspire creativity and critical
                thinking.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaAward className="text-orange-500 text-5xl mb-4" />
              <h4 className="font-bold text-2xl mb-2">Proven Excellence</h4>
              <p className="text-gray-600">
                Consistently ranked among the top schools for academic and
                extracurricular achievements.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <FaUsers className="text-purple-500 text-5xl mb-4" />
              <h4 className="font-bold text-2xl mb-2">Inclusive Community</h4>
              <p className="text-gray-600">
                A welcoming environment where every student feels valued and
                supported.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 text-center">
        <h2 className="text-4xl font-bold mb-4 animate-fade-in">
          Join Our Vibrant Community
        </h2>
        <p className="text-xl mb-8 animate-fade-in-up">
          Discover a place where your child can grow, learn, and achieve their
          dreams.
        </p>
        <a
          className="mt-4 inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full transition-all hover:bg-gray-100 hover:scale-105"
          >
          Apply Now
        </a>
      </section>
    </div>
    <Footer/>
            </>
  );
};

export default AboutPages;
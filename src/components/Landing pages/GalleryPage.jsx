import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null); // For Lightbox Preview
      const [showAll, setShowAll] = useState(false); // Toggle to show all images
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get("https://school-4ee7.onrender.com/api/gallery/images");
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching images", error);
    }
  };
  const displayedImages = showAll ? images : images.slice();
  return (
    <>
    <Navbar/>
    <section className="py-16 bg-gray-100 min-h-screen mt-8">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800 uppercase tracking-wide">
            All Gallery Images
          </h2>
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
            Back
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayedImages.map((img) => (
              <div
              key={img._id}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(img.imageUrl)}
              >
              <img
                src={img.imageUrl}
                alt="Gallery"
                className="w-full h-56 object-cover transform group-hover:scale-110 transition duration-300"
              />
              {/* Overlay Effect */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center text-white font-semibold text-lg">
                View Image
              </div>
            </div>

))}
        </div>

        {/* Lightbox (Image Preview) */}
        {selectedImage && (
            <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
            >
            <div className="relative max-w-3xl p-4">
              <button
                className="absolute top-4 right-4 text-white text-3xl font-bold"
                onClick={() => setSelectedImage(null)}
                >
                ×
              </button>
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto rounded-lg shadow-lg"
                />
            </div>
          </div>
        )}
      </div>
    </section>

    <Footer/>
    </>
  );
};

export default GalleryPage;

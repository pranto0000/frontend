import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const Gallery = () => {
  const [images, setImages] = useState([]);
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

  // Show only the first 8 images unless "View More" is clicked
  const displayedImages = showAll ? images : images.slice(0, 8);

  return (
    <section id="gallery" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10 uppercase tracking-wide">
          Gallery
        </h2>

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

        {/* View More Button */}
        {images.length > 8 && (
          <div className="text-center mt-6">
            <Link to="/gallery">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              View More
            </button>
            </Link>
          </div>
        )}

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
  );
};

export default Gallery;

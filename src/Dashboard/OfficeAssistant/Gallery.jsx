import React, { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post("https://school-4ee7.onrender.com/api/gallery/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSelectedFile(null);
      fetchImages();
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://school-4ee7.onrender.com/api/gallery/delete/${id}`);
      fetchImages();
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Gallery</h2>

      <div className="mb-4">
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={handleUpload} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
          Upload
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative">
            <img src={img.imageUrl} alt="Gallery" className="w-full rounded-md shadow-md" />
            <button onClick={() => handleDelete(img._id)} className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded">
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

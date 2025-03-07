import React, { useState } from "react";
import axios from "axios";
import { MdNotificationAdd } from "react-icons/md";
const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (pdfFile) formData.append("pdf", pdfFile);

    try {
      const response = await axios.post("https://school-4ee7.onrender.com/api/notices", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Notice posted successfully!");
      setTitle("");
      setDescription("");
      setPdfFile(null);
    } catch (error) {
      console.error("Error posting notice:", error);
      alert("Failed to post notice.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Upload PDF (Optional)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="text-center md:text-start">
        <button
          type="submit"
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-blue-700 "
        >
          <MdNotificationAdd className="inline-block mr-2 text-2xl text-rose-500"/> Post Notice
        </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;
// import { useState } from "react";

// const NoticeForm = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [pdf, setPdf] = useState(null);
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await fetch("https://school-4ee7.onrender.com/api/notices", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           pdf, // Ensure this is included only if a PDF is uploaded
//         }),
//       });
  
//       const data = await response.json(); // Make sure response is JSON
//       console.log("Server Response:", data);
  
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to create notice");
//       }
  
//       alert("Notice created successfully!");
//     } catch (error) {
//       console.error("Error submitting notice:", error);
//       alert("Error submitting notice. Check the console for details.");
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4">📌 Add Notice</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           className="w-full p-2 border mb-2"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Description"
//           className="w-full p-2 border mb-2"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           type="file"
//           accept="application/pdf"
//           className="w-full p-2 border mb-2"
//           onChange={(e) => setPdf(e.target.files[0])}
//           required
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
//           📢 Publish Notice
//         </button>
//       </form>
//     </div>
//   );
// };

// export default NoticeForm;

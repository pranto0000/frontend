import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    parentEmail: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://school-4ee7.onrender.com/api/auth/register", formData);
      setSuccess(response.data.message);
      setError("");
      setFormData({ name: "", email: "", password: "", role: "student", parentEmail: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        {success && <p className="text-green-500 text-center">{success}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              name="role"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="accountant">Accountant</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {formData.role === "student" && (
            <div className="mb-4">
              <label className="block text-gray-700">Parent Email</label>
              <input
                type="email"
                name="parentEmail"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter parent's email"
                value={formData.parentEmail}
                onChange={handleChange}
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;


// import axios from "axios";
// import React, { useState } from "react";

// function RegisterPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await axios.post("https://school-4ee7.onrender.com/api/auth/register", formData);
//         setSuccess(response.data.message);
//         setError("");
//         setFormData({ name: "", email: "", password: "", role: "student" });
//       } catch (err) {
//         setError(err.response?.data?.message || "Registration failed");
//         setSuccess("");
//       }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
//         <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
//         {success && <p className="text-green-500 text-center">{success}</p>}
//         <form onSubmit={handleRegister}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               name="name"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               name="email"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Create a password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700">Role</label>
//             <select
//               name="role"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option value="student">Student</option>
//               <option value="teacher">Teacher</option>
//               <option value="accountant">Accountant</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//           >
//             Register
//           </button>
//         </form>
//         <p className="text-center text-gray-600 mt-4">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-500 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default RegisterPage;


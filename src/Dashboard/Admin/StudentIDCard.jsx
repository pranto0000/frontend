

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { toPng } from 'html-to-image';
import softLogo from '../../assets/soft-webmission-logo-icon.png';
import { Link } from 'react-router-dom';

const StudentIDCard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch student data from the server
  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://school-4ee7.onrender.com/api/students');
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle ID card download
  const downloadIDCard = async (id) => {
    const element = document.getElementById(`student-id-card-${id}`);
    if (!element) {
      console.error('Element not found!');
      return;
    }
  
    // Select the button and set visibility instead of display:none
    const button = element.querySelector('button');
    if (button) {
      button.style.visibility = 'hidden'; // Keeps space but hides content
    }
  
    try {
      const dataUrl = await toPng(element, { quality: 0.95 });
  
      // Restore button visibility
      if (button) {
        button.style.visibility = 'visible';
      }
  
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `student-id-card-${id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading ID card:', error);
  
      // Restore visibility in case of error
      if (button) {
        button.style.visibility = 'visible';
      }
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Student ID Cards</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => {
          const studentData = {
            name: student?.userId?.name || 'N/A',
            profileImage: student?.userId?.profileImage || 'https://via.placeholder.com/150',
            className: student.className,
            rollNumber: student.rollNumber,
            phone: student?.phone || 'N/A',
            id: student._id,
          };

          return (
            <div
              key={studentData.id}
              id={`student-id-card-${studentData.id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden w-80 relative"
            >

              {/* Card Header */}
              <div className="bg-rose-400 p-4 rounded-t-xl">
                <h5 className="text-white font-bold text-center text-lg">HATIBANDHA SS HIGH SCHOOL</h5>
                <p className="text-center text-sm text-gray-600 font-semibold">Hatibandha, Lalmonirhat</p>
              </div>

              {/* Student Image */}
              <div className="flex items-center justify-center mt-1">
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-sky-300 to-blue-500 p-1.5">
                  <img
                    src={studentData.profileImage}
                    alt="Student"
                    className="w-full h-full rounded-full border-4 border-white"
                  />
                </div> 
              </div>

              {/* Student Details */}
              <div className="text-start p-4">
                <h3 className="text-base font-bold text-gray-800">
                  Name: <span className="text-blue-600">{studentData.name}</span>
                </h3>
                <p className="text-sm font-bold mt-2">
                  ID: <span className="text-red-500">{studentData.id}</span>
                </p>
                <p className="text-sm font-bold mt-2">
                  Class: <span className="text-gray-700">{studentData.className}</span>
                </p>
                <p className="text-sm font-bold mt-2">
                  Roll No: <span className="text-gray-700">{studentData.rollNumber}</span>
                </p>
                <p className="text-sm font-bold mt-2">
                  Phone: <span className="text-gray-700">{studentData.phone}</span>
                </p>
              </div>

              {/* QR Code with Border & Shadow */}
              <div className="mt-2 mb-4 flex justify-center">
                <div className="p-2 bg-white rounded-lg shadow-xl-red-500 border-2 border-rose-200">
                  <QRCodeCanvas
                    value={JSON.stringify({
                      studentId: studentData.id,
                      rollNumber: studentData.rollNumber,
                      className: studentData.className,
                    })}
                    size={80}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="bg-green-500 p-2 mt-6 absolute bottom-2  left-0 right-0">
                <div className="flex items-center justify-between text-white text-xs">
                  <div>
                  <span>Powered by </span>
                  <span className="font-bold ml-1 text-slate-950">Soft WebMission</span>
                  </div>
                  <img src={softLogo} alt="Soft WebMission Logo" className="w-6 h-6 ml-2 rounded" />
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={() => downloadIDCard(studentData.id)}
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-b-xl w-full hover:from-blue-700 hover:to-blue-500 transition-all"
              >
                Download ID Card
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentIDCard;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { QRCodeCanvas } from 'qrcode.react';
// import { toPng } from 'html-to-image';
// import softLogo from '../../assets/soft-webmission-logo-icon.png';

// const StudentIDCard = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('https://school-4ee7.onrender.com/api/students');
//         setStudents(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   // Convert PNG Data URL to JPG Format
//   const convertToJpg = (pngDataUrl, callback) => {
//     const img = new Image();
//     img.src = pngDataUrl;
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0);
//       callback(canvas.toDataURL('image/jpeg', 0.95)); // Convert to JPEG
//     };
//   };

//   // Handle ID card download
//   const downloadIDCard = async (id) => {
//     const cardElement = document.getElementById(`student-id-card-${id}`);
//     if (!cardElement) {
//       console.error('Card element not found!');
//       return;
//     }
  
//     const downloadButton = cardElement.querySelector('.download-btn');
  
//     // Completely remove the button from layout
//     if (downloadButton) downloadButton.style.position = 'absolute';
  
//     try {
//       const pngDataUrl = await toPng(cardElement, { quality: 1 });
  
//       // Convert PNG to JPG
//       convertToJpg(pngDataUrl, (jpgDataUrl) => {
//         const link = document.createElement('a');
//         link.href = jpgDataUrl;
//         link.download = `student-id-card-${id}.jpg`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
  
//         // Restore Button Position
//         if (downloadButton) downloadButton.style.position = 'relative';
//       });
//     } catch (error) {
//       console.error('Error downloading ID card:', error);
//       if (downloadButton) downloadButton.style.position = 'relative';
//     }
//   };
  

//   if (loading) return <div className="text-center py-8">Loading...</div>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Student ID Cards</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {students.map((student) => {
//           const studentData = {
//             name: student?.userId?.name || 'N/A',
//             profileImage: student?.userId?.profileImage || 'https://via.placeholder.com/150',
//             className: student.className,
//             rollNumber: student.rollNumber,
//             phone: student?.phone || 'N/A',
//             id: student._id,
//           };

//           return (
//             <div
//               key={studentData.id}
//               id={`student-id-card-${studentData.id}`}
//               className="bg-white rounded-xl shadow-lg overflow-hidden w-80 relative"
//             >
//               {/* Card Header */}
//               <div className="bg-rose-400 p-4 rounded-t-xl">
//                 <h5 className="text-white font-bold text-center text-lg">HATIBANDHA SS HIGH SCHOOL</h5>
//                 <p className="text-center text-sm text-gray-600 font-semibold">Hatibandha, Lalmonirhat</p>
//               </div>

//               {/* Student Image */}
//               <div className="flex items-center justify-center mt-6">
//                 <div className="w-28 h-28 rounded-full bg-gradient-to-r from-sky-300 to-blue-500 p-1.5">
//                   <img
//                     src={studentData.profileImage}
//                     alt="Student"
//                     className="w-full h-full rounded-full border-4 border-white"
//                   />
//                 </div>
//               </div>

//               {/* Student Details */}
//               <div className="text-start p-6">
//                 <h3 className="text-base font-bold text-gray-800">
//                   Name: <span className="text-blue-600">{studentData.name}</span>
//                 </h3>
//                 <p className="text-sm font-bold mt-2">
//                   ID: <span className="text-red-500">{studentData.id}</span>
//                 </p>
//                 <p className="text-sm font-bold mt-2">
//                   Class: <span className="text-gray-700">{studentData.className}</span>
//                 </p>
//                 <p className="text-sm font-bold mt-2">
//                   Roll No: <span className="text-gray-700">{studentData.rollNumber}</span>
//                 </p>
//                 <p className="text-sm font-bold mt-2">
//                   Phone: <span className="text-gray-700">{studentData.phone}</span>
//                 </p>
//               </div>

//               {/* QR Code */}
//               <div className="mt-4 flex justify-center">
//                 <QRCodeCanvas
//                   value={JSON.stringify({
//                     studentId: studentData.id,
//                     rollNumber: studentData.rollNumber,
//                     className: studentData.className,
//                   })}
//                   size={100}
//                 />
//               </div>

//               {/* Footer */}
//               <div className="bg-green-500 p-2 mt-6">
//                 <div className="flex items-center justify-between text-white text-xs">
//                   <div>
//                     <span>Powered by </span>
//                     <span className="font-bold ml-1 text-slate-950">Soft WebMission</span>
//                   </div>
//                   <img src={softLogo} alt="Soft WebMission Logo" className="w-6 h-6 ml-2 rounded" />
//                 </div>
//               </div>

//               {/* Download Button (Hidden During Screenshot) */}
//               <button
//                 onClick={() => downloadIDCard(studentData.id)}
//                 className="download-btn bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-b-xl w-full hover:from-blue-700 hover:to-blue-500 transition-all relative"
//               >
//                 Download ID Card
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default StudentIDCard;




//  


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { QRCodeCanvas } from 'qrcode.react';
// import { toPng } from 'html-to-image';
// import softLogo from '../../assets/soft-webmission-logo-icon.png';
// import { Link } from 'react-router-dom';

// const StudentIDCard = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch student data from the server
//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get('https://school-4ee7.onrender.com/api/students');
//       setStudents(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   // Handle ID card download
//   const downloadIDCard = async (id) => {
//     const element = document.getElementById(`student-id-card-${id}`);
//     if (!element) {
//       console.error('Element not found!');
//       return;
//     }
  
//     // Select the button and set visibility instead of display:none
//     const button = element.querySelector('button');
//     if (button) {
//       button.style.visibility = 'hidden'; // Keeps space but hides content
//     }
  
//     try {
//       const dataUrl = await toPng(element, { quality: 0.95 });
  
//       // Restore button visibility
//       if (button) {
//         button.style.visibility = 'visible';
//       }
  
//       const link = document.createElement('a');
//       link.href = dataUrl;
//       link.download = `student-id-card-${id}.jpg`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Error downloading ID card:', error);
  
//       // Restore visibility in case of error
//       if (button) {
//         button.style.visibility = 'visible';
//       }
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Student ID Cards</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {students.map((student) => {
//           const studentData = {
//             name: student?.userId?.name || 'N/A',
//             profileImage: student?.userId?.profileImage || 'https://via.placeholder.com/150',
//             className: student.className,
//             rollNumber: student.rollNumber,
//             phone: student?.phone || 'N/A',
//             id: student._id,
//           };

//           return (
//             <div
//               key={studentData.id}
//               id={`student-id-card-${studentData.id}`}
//               className="bg-white rounded-xl shadow-lg overflow-hidden w-80 relative"
//             >
//               {/* Card Header */}
//               <div className="bg-rose-400 p-4 rounded-t-xl">
//                 <h5 className="text-white font-bold text-center text-lg">HATIBANDHA SS HIGH SCHOOL</h5>
//                 <p className="text-center text-sm text-gray-600 font-semibold">Hatibandha, Lalmonirhat</p>
//               </div>

//               {/* Student Image */}
//               <div className="flex items-center justify-center mt-6">
//                 <div className="w-28 h-28 rounded-full bg-gradient-to-r from-sky-300 to-blue-500 p-1.5">
//                   <img
//                     src={studentData.profileImage}
//                     alt="Student"
//                     className="w-full h-full rounded-full border-4 border-white"
//                   />
//                 </div>
//               </div>

//               {/* Student Details */}
//               <div className="text-start p-6">
//                 <h3 className="text-base font-bold text-gray-800">
//                   Name: <span className="text-blue-600">{studentData.name}</span>
//                 </h3>
//                 <p className="text-sm font-bold mt-2">
//                   ID: <span className="text-red-500">{studentData.id}</span>
//                 </p>
//                 <p className="text-sm font-bold mt-2">
//                   Class: <span className="text-gray-700">{studentData.className}</span>
//                 </p>
//                 <p className="text-sm font-bold mt-2">
//                   Roll No: <span className="text-gray-700">{studentData.rollNumber}</span>
//                 </p>
//                 <p className="text-sm font-bold mt-2">
//                   Phone: <span className="text-gray-700">{studentData.phone}</span>
//                 </p>
//               </div>

//               {/* QR Code with Border & Shadow */}
//               <div className="mt-4 flex justify-center">
//                 <div className="p-2 bg-white rounded-lg shadow-xl-red-500 border-2 border-rose-200">
//                   <QRCodeCanvas
//                     value={JSON.stringify({
//                       studentId: studentData.id,
//                       rollNumber: studentData.rollNumber,
//                       className: studentData.className,
//                     })}
//                     size={100}
//                   />
//                 </div>
//               </div>

//               {/* Footer */}
//               <div className="bg-green-500 p-2 mt-6">
//                 <div className="flex items-center justify-between text-white text-xs">
//                   <div>
//                   <span>Powered by </span>
//                   <span className="font-bold ml-1 text-slate-950">Soft WebMission</span>
//                   </div>
//                   <img src={softLogo} alt="Soft WebMission Logo" className="w-6 h-6 ml-2 rounded" />
//                 </div>
//               </div>

//               {/* Download Button */}
//               <button
//                 onClick={() => downloadIDCard(studentData.id)}
//                 className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-b-xl w-full hover:from-blue-700 hover:to-blue-500 transition-all relative"
//               >
//                 Download ID Card
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default StudentIDCard;
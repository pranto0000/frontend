import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import { FaFilePdf } from "react-icons/fa";

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10; // 5 notices per page
  // https://school-4ee7.onrender.com
  useEffect(() => {
    const fetchNotices = async () => {
      try { 
        const response = await axios.get("https://school-4ee7.onrender.com/api/notices");
        setNotices(response.data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };
    fetchNotices();
  }, []);

  // Pagination Logic
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
      <>
      <Navbar/>
    <section className="py-12 bg-gray-50 mt-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-sky-400 text-center mb-8">
          Notice Board
        </h2>

        {notices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border">No</th>
                  <th className="py-2 px-4 border">Title</th>
                  <th className="py-2 px-4 border">Time</th>
                  <th className="py-2 px-4 border">PDF</th>
                </tr>
              </thead>
              <tbody>
                {currentNotices.map((notice, index) => (
                  <React.Fragment key={notice._id}>
                    <tr className="text-gray-700 text-center">
                      <td className="py-2 px-4 border">{indexOfFirstNotice + index + 1}</td>
                      <td
                        className="py-2 px-4 border text-black cursor-pointer text-start hover:underline"
                        onClick={() =>
                          setExpandedId(expandedId === notice._id ? null : notice._id)
                        }
                        >
                        {notice.title}
                      </td>
                      <td className="py-2 px-4 border text-red-400">
                        {new Date(notice.createdAt).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border">
                        {notice.pdfUrl ? (
                          <a
                            href={notice.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaFilePdf className=" inline-block text-red-600" /> View PDF
                          </a>
                        ) : (
                          "No PDF"
                        )}
                      </td>
                    </tr>
                    {expandedId === notice._id && (
                      <tr>
                        <td colSpan="4" className="py-2 px-4 border bg-gray-100 text-gray-700 text-left">
                          <strong>Description:</strong> {notice.description}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No notices available.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-8 mb-5">
          {Array.from(
            { length: Math.ceil(notices.length / noticesPerPage) },
            (_, i) => (
              <button
              key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-800"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default NoticeBoard;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const NoticeBoard = () => {
//   const [notices, setNotices] = useState([]);

//   // Fetch notices from backend
//   useEffect(() => {
//     const fetchNotices = async () => {
//       try {
//         const response = await axios.get("https://school-4ee7.onrender.com/api/notices");
//         setNotices(response.data);
//       } catch (error) {
//         console.error("Error fetching notices:", error);
//       }
//     };
//     fetchNotices();
//   }, []);

//   return (
//     <section id="notice-board" className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
//           Notice Board
//         </h2>
//         {notices.length > 0 ? (
//           <div className="space-y-6">
//             {notices.map((notice) => (
//               <div
//                 key={notice._id}
//                 className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
//               >
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                   {notice.title}
//                 </h3>
//                 <p className="text-gray-600 mb-4">{notice.description}</p>
//                 {notice.pdfUrl && (
//                   <a
//                     href={notice.pdfUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:text-blue-800 font-medium"
//                   >
//                     View PDF
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center">No notices available.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default NoticeBoard;
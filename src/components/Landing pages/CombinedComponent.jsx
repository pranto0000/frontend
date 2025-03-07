import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCaretRight, FaFilePdf } from "react-icons/fa";
import { Link } from "react-router-dom";

// Marquee Component
const MarqueeNotices = ({ notices }) => {
  return (
    <div className="overflow-hidden bg-blue-100 py-2 flex ">
      {/* Title for the notices */}
     <div className="z-10 bg-green-500"> <h2 className="text-xl font-semibold text-white inline-block pl-1 pr-8">Notices:-</h2></div>

      <div className="flex space-x-8 animate-marquee whitespace-nowrap z-0">
        {notices.map((notice) => (
          <Link
            key={notice._id}
            to="/NoticeBoard"
            className="text-blue-700 font-medium hover:text-red-500 transition px-4"
          >
            <FaCaretRight className="inline-block text-green-500 mr-1" />
            {notice.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

// Upcoming Events Component
const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://school-4ee7.onrender.com/api/admin/events");
        // Sort by latest date first & show only first 3 events
        const sortedEvents = response.data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div id="events" className="bg-blue-200 rounded-xl shadow-lg p-2 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-sky-500 mb-2 text-center">Upcoming Events</h2>
      {events.length > 0 ? (
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event._id} className="border-b pb-4 last:border-b-0">
              <h3 className="text-xl font-semibold text-gray-700">{event.title}</h3>
              <p>
                <span className="text-red-400">{new Date(event.date).toLocaleDateString()}</span> <span className="text-gray-400"> | </span> <span className="text-gray-600">{event.time}</span>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No upcoming events.</p>
      )}
    </div>
  );
};

// Notice Board Component
const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [showAll, setShowAll] = useState(false);

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

  const displayedNotices = showAll ? notices : notices.slice(0, 5);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg px-5 hover:shadow-2xl transition-shadow duration-300">
      {/* Marquee for Notices */}
      {notices.length > 0 && <MarqueeNotices notices={notices} />}

      <div className="flex justify-between items-center mt-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Notice Board</h2>
        {notices.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-white rounded bg-green-500 p-2 hover:bg-green-700 font-medium"
          >
            {showAll ? "Show Less" : "View All"}
          </button>
        )}
      </div>

      {displayedNotices.length > 0 ? (
        <div className="space-y-4">
          {displayedNotices.map((notice) => (
            <div key={notice._id} className="border-b pb-2 last:border-b-0 flex justify-between gap-6">
              <div className="inline-block">
                <Link to="/NoticeBoard" className="font-semibold text-gray-800 line-clamp-1">
                  <FaCaretRight className="inline-block text-green-500" />
                  <span className="text-gray-600 text-sm">{notice.title}</span> - 
                  <span className="text-sm text-red-400 inline-block">{formatDate(notice.createdAt)}</span>
                </Link>
              </div>
              {notice.pdfUrl && (
                <a
                  href={notice.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  <FaFilePdf className="inline-block mr-2 text-red-600" />
                  <span>View PDF</span>
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No notices available.</p>
      )}
    </div>
  );
};

// Combined Component
const CombinedComponent = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UpcomingEvents />
          </div>
          <div className="lg:col-span-2">
            <NoticeBoard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CombinedComponent;

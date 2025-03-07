import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  // Fetch Upcoming Events from Backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://school-4ee7.onrender.com/api/admin/events");
        setUpcomingEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Function to format time to 12-hour format with AM/PM
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours, 10);
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 24-hour format to 12-hour format
    return `${hour}:${minutes} ${ampm}`;
  };

  return (
    <section id="events" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-rose-400 text-center mb-8">
          Upcoming Events
        </h2>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {new Date(event.date).toLocaleDateString()} |{" "}
                    {formatTime(event.time)}
                  </p>
                  <p className="text-gray-700">{event.description}</p>
                </div>
                <div className="bg-blue-50 p-4">
                  <a
                    href={event.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No upcoming events.</p>
        )}
      </div>
    </section>
  );
};

export default Events;
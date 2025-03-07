import React, { useEffect, useState } from 'react'
import axios from "axios";
const PostEvent = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "" });

  // Fetch Events
  useEffect(() => {
    axios.get("https://school-4ee7.onrender.com/api/admin/events")
      .then((res) => {
        // Sorting events by date in descending order (latest first)
        const sortedEvents = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEvents(sortedEvents);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Add Event
  const handleAddEvent = () => {
    axios.post("https://school-4ee7.onrender.com/api/admin/events", newEvent)
      .then((res) => setEvents([...events, res.data]))
      .catch((err) => console.error(err));
  };

  // Update Event
  const handleUpdateEvent = () => {
    axios.put(`https://school-4ee7.onrender.com/api/admin/events/${editingEvent._id}`, newEvent)
      .then((res) => {
        setEvents(events.map((event) => (event._id === res.data._id ? res.data : event)));
        setEditingEvent(null);
      })
      .catch((err) => console.error(err));
  };

  // Delete Event
  const handleDeleteEvent = (id) => {
    axios.delete(`https://school-4ee7.onrender.com/api/admin/events/${id}`)
      .then(() => setEvents(events.filter((event) => event._id !== id)))
      .catch((err) => console.error(err));
  };

  // Function to format time to 12-hour format with AM/PM
const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  let hour = parseInt(hours, 10);
  let ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert 24-hour format to 12-hour format
  return `${hour}:${minutes} ${ampm}`;
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Events</h1>

      {/* Add / Edit Event Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">{editingEvent ? "Edit Event" : "Add New Event"}</h2>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="time"
          name="time"
          value={newEvent.time}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-2"
        />
        {editingEvent ? (
          <button onClick={handleUpdateEvent} className="bg-green-500 text-white px-4 py-2 rounded">
            Update Event
          </button>
        ) : (
          <button onClick={handleAddEvent} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add Event
          </button>
        )}
      </div>

      {/* Event List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Title</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events
              .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sorting in descending order
              .map((event) => (
                <tr key={event._id} className="border-b">
                  <td className="border p-2">{event.title}</td>
                  <td className="border p-2">{event.date}</td>
                  <td className="border p-2">{formatTime(event.time)}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingEvent(event);
                        setNewEvent({ title: event.title, date: event.date, time: event.time });
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostEvent
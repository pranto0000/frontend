import React from "react";
import { useNavigate } from "react-router-dom";
const teachers = [
  {
    id: 1,
    name: "John Doe",
    post: "Mathematics Teacher",
    image: "https://img.freepik.com/free-photo/businessman-black-suit-holding-his-tasklist-makes-thumb-up_114579-15902.jpg?t=st=1739786810~exp=1739790410~hmac=dd791e9613cf67f029904d50a858554bfacd2862cc0f284fa6ace3ef70b8b065&w=740", // Replace with actual image URL
    description: "Experienced in teaching advanced mathematics for over 10 years.",
  },
  {
    id: 2,
    name: "Jane Smith",
    post: "Science Teacher",
    image: "https://img.freepik.com/free-photo/handsome-male-employee-holding-notebooks-looking-confident-standing_1258-26589.jpg?t=st=1739786846~exp=1739790446~hmac=9423fe253322e5160c361a0b260f59d1a478949de1f7edefa2370b7ef231805d&w=740", // Replace with actual image URL
    description: "Specializes in biology and chemistry with a passion for research.",
  },
  {
    id: 3,
    name: "Alice Johnson",
    post: "English Teacher",
    image: "https://img.freepik.com/free-photo/teacher-brunette-instructor-with-computer-suit-whiteboard-classroom-holding-notepad_140725-163341.jpg?t=st=1739786900~exp=1739790500~hmac=700dd43bb3ee58b448e82efa9648da499938a77bfba99bb7e5d09f06753b8ccf&w=740", // Replace with actual image URL
    description: "Focuses on literature and creative writing.",
  },
];

const TeachersProfile = () => {
  const navigate = useNavigate();
  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-10">
      <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Our Teachers</h2>
          <button
           onClick={() => navigate("/all-teachers")}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
            >
            View All Teachers
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex flex-col items-center">
                {/* Teacher's Image */}
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                {/* Teacher's Name and Post */}
                <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
                <p className="text-gray-600 text-sm">{teacher.post}</p>
                {/* Teacher's Description */}
                <p className="text-gray-600 text-center mt-4">
                  {teacher.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachersProfile;
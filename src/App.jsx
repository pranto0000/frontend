import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import AccountantDashboard from "./pages/AccountantDashboard";

import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import Unauthorized from "./pages/Unauthorized";
import NoticeBoard from "./components/Landing pages/NoticeBoard.jsx";
import OfficeAssistant from "./pages/OfficeAssistant.jsx";
import AllAchievements from "./components/Landing pages/AllAchievements.jsx";
import StudentResult from "./components/Landing pages/StudentResult.jsx";
import ContactPage from "./components/Landing pages/ContactPage.jsx";
import GalleryPage from "./components/Landing pages/GalleryPage.jsx";
import AllTeachers from "./components/Landing pages/AllTeachers.jsx";
import AboutPages from "./components/Landing pages/AboutPages.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/notice" element={<NoticeBoard />} />
          <Route path="/achievements" element={<AllAchievements />} />
          <Route path="/result" element={<StudentResult />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/all-teachers" element={<AllTeachers />} />
          <Route path="/about" element={<AboutPages />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/admin-dashboard/*"
            element={
              <PrivateRoute roles={["admin"]}>

                  <AdminDashboard />

              </PrivateRoute>
            }
          />

          <Route
            path="/teacher/dashboard/*"
            element={
              <PrivateRoute roles={["teacher"]}>
               
                  <TeacherDashboard />
               
              </PrivateRoute>
            }
          />

          <Route
            path="/student/dashboard/*"
            element={
              <PrivateRoute roles={["student"]}>
                  <StudentDashboard />

              </PrivateRoute>
            }
          />

          <Route
            path="/accountant/dashboard/*"
            element={
              <PrivateRoute roles={["accountant"]}>

                  <AccountantDashboard />

              </PrivateRoute>
            }
          />

          <Route
            path="/office-assistant/dashboard/*"
            element={
              <PrivateRoute roles={["office-assistant"]}>

                  <OfficeAssistant/>

              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import NotFoundPage from "./pages/NotFoundPage";
import HospitalListPage from "./pages/Hospitals/HospitalListPage";
import DoctorDetailPage from "./pages/Doctors/DoctorDetailPage";
import BookingPage from "./pages/Appointments/BookingPage";
import QueuePage from "./pages/Appointments/QueuePage";
import HospitalDetailsPage from "./pages/Hospitals/HospitalDetailsPage";
import DoctorListPage from "./pages/Doctors/DoctorListPage";
import UserProfilePage from "./pages/UserProfilePage";
import useAuth from "./hooks/useAuth";
import ConsultationPage from "./pages/Doctors/ConsultationPage";
import Appointments from "./pages/Appointments/Appointments";

const App = () => {
  const loadUser = useAuth((state) => state.loadUser);

  useEffect(() => {
    loadUser(); // restores session from localStorage
  }, [loadUser]);
  return (
    <AuthProvider>
      <LocationProvider>
        <Router>
          <div className="min-h-screen bg-background text-accentdark">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/hospitals" element={<HospitalListPage />} />
              <Route path="/hospitals/:id" element={<HospitalDetailsPage />} />
              <Route path="/doctors" element={<DoctorListPage />} />
              <Route path="/consult/:id" element={<ConsultationPage />} />
              <Route path="/doctors/:id" element={<DoctorDetailPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/queue" element={<QueuePage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/appointments" element={<Appointments />} />
            </Routes>
          </div>
        </Router>
      </LocationProvider>
    </AuthProvider>
  );
};

export default App;

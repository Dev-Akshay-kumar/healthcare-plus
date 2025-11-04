import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import HospitalListPage from "../pages/Hospitals/HospitalListPage";
import DoctorListPage from "../pages/Doctors/DoctorListPage";
import DoctorDetailPage from "../pages/Doctors/DoctorDetailPage";
import BookingPage from "../pages/Appointments/BookingPage";
import QueuePage from "../pages/Appointments/QueuePage";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hospitals" element={<HospitalListPage />} />
        <Route path="/doctors" element={<DoctorListPage />} />
        <Route path="/doctors/:id" element={<DoctorDetailPage />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/queue" element={<QueuePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;

import React from "react";
import {
  CalendarCheck,
  Bed,
  Pill,
  FileChartColumn,
  FileText,
  Stethoscope,
  UserCircle2,
  HeartPulse,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router";

// ✅ Transparent Hospital Dashboard Card
const TransparentCard = ({ title, description, icon: Icon }) => (
  <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center text-center cursor-pointer">
    <div className="flex justify-center items-center mb-4 bg-blue-50 rounded-full p-3 shadow-inner">
      <Icon className="h-12 w-12 text-blue-700" strokeWidth={1.5} />
    </div>
    <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// ✅ User Profile Card (for top section)
const UserCard = ({ user }) => (
  <div className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
    <img
      src={
        user?.photo || "https://cdn-icons-png.flaticon.com/512/219/219986.png"
      }
      alt="User Profile"
      className="w-28 h-28 rounded-full border-4 border-white shadow-md"
    />
    <div className="text-center sm:text-left">
      <h2 className="text-2xl font-semibold text-gray-800">
        {user?.fullName || "John Doe"}
      </h2>
      <p className="text-gray-700">
        {user?.gender || "Male"} • {user?.age || 29} yrs
      </p>
      <p className="text-gray-600 text-sm">
        Patient ID: {user?.patientId || "PT-00251"}
      </p>
      <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-gray-700">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          Blood: {user?.bloodType || "B+"}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
          BMI: {user?.bmi || 22.4}
        </span>
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
          Insured
        </span>
      </div>
    </div>
  </div>
);

const EnhancedHospitalDashboardPage = () => {
  const user = useAuth((state) => state.user);

  const features = [
    {
      title: "Consult a Doctor",
      description: "Instant video or in-person consultations with specialists.",
      icon: Stethoscope,
      link: "/doctors",
    },
    {
      title: "Book Appointments / OPD",
      description: "Schedule visits with available doctors and clinics.",
      icon: CalendarCheck,
      link: "/appointments",
    },
    {
      title: "Bed Availability",
      description: "Check real-time ward and ICU bed status.",
      icon: Bed,
      link: "",
    },
    {
      title: "Lab Test Reports",
      description: "Access your latest pathology and imaging results.",
      icon: FileChartColumn,
      link: "/reports",
    },
    {
      title: "Medicines & Pharmacy",
      description: "View prescriptions and order refills.",
      icon: Pill,
      link: "/pharmacy",
    },
    {
      title: "Health Records",
      description: "View your complete hospital treatment history.",
      icon: FileText,
      link: "/records",
    },
    {
      title: "Vitals & Monitoring",
      description: "Track your heart rate, BP, sugar levels, and progress.",
      icon: HeartPulse,
      link: "/vitals",
    },
    {
      title: "My Profile",
      description: "Update your information and preferences.",
      icon: UserCircle2,
      link: "/profile",
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-teal-200 py-12 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* 🧍 User Info Card */}
          <UserCard user={user} />

          {/* 🩺 Dashboard Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mt-10">
            Your Health Dashboard
          </h1>
          <p className="text-center text-gray-600 mb-10">
            Manage appointments, check reports, track vitals & more
          </p>

          {/* 🔹 Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
              <Link to={item.link} key={index} className="group">
                <TransparentCard {...item} />
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 text-gray-500 text-sm">
            Powered by your hospital’s smart health system.
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EnhancedHospitalDashboardPage;

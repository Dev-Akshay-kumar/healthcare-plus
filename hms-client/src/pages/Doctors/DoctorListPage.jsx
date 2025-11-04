import React, { useEffect, useState } from "react";
import { Search, Star, MapPin, Calendar, Phone } from "lucide-react";
import { getDoctors } from "../../api/doctorApi";
import { useDoctorStore } from "../../store/useDoctorStore";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router";

const DoctorListPage = () => {
  const { doctors, fetchDoctors } = useDoctorStore();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-background px-6 py-10 md:px-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Find <span className="text-teal-500">Doctors</span>
        </h1>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Search by doctor name or specialization..."
              className="flex-1 px-4 py-3 outline-none text-gray-700"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-teal-500 px-5 py-3">
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Doctor Cards */}
        {loading ? (
          <div className="text-center text-gray-500 mt-10">
            Loading doctors...
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No doctors found matching “{search}”
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {doctors.map((doctor) => {
              const fullName = `${doctor?.name?.first || ""} ${
                doctor?.name?.middle || ""
              } ${doctor?.name?.last || ""}`.trim();
              const specialization =
                doctor?.specialization?.join(", ") || "General Physician";
              const rating = doctor?.ratings?.average || "4.5";
              const reviewCount = doctor?.ratings?.count || 0;
              const hospitalName =
                doctor?.hospital?.name || "CityCare Hospital";
              const consultationFee = doctor?.consultation?.fee || 0;

              return (
                <div
                  key={doctor._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
                >
                  <img
                    src={
                      doctor.profilePicture || "/images/doctor-placeholder.jpg"
                    }
                    alt={fullName}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{fullName}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {specialization}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span>
                        {rating} ({reviewCount} reviews)
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                      <span>{doctor.address?.city || "Springfield"}</span>
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      Fee:{" "}
                      <span className="font-medium text-gray-800">
                        ₹{consultationFee}
                      </span>
                    </div>

                    <Link
                      to={`/doctors/${doctor._id}`}
                      className="w-full bg-teal-500 text-white py-2 rounded-full text-sm font-medium flex justify-center items-center gap-2 hover:shadow-lg hover:scale-[1.02] transition-all"
                    >
                      <Calendar className="w-4 h-4" /> View Profile
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6">
          <a
            href="/book"
            className="bg-teal-500 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition"
          >
            <Phone className="w-4 h-4" />
            Book Appointment
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorListPage;

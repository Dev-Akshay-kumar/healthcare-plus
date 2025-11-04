import React, { useEffect } from "react";
import { useParams } from "react-router";
import useHospitals from "../../hooks/useHospitals";
import useDoctors from "../../hooks/useDoctors";
// import { calcDistance } from "../../utils/calcDistance";
import { formatDate } from "../../utils/formatDate";
import Loader from "../../components/common/Laoder";
import MainLayout from "../../layouts/MainLayout";

const RatingStars = ({ rating = 0 }) => (
  <div className="flex items-center gap-1 text-yellow-500">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i}>{i < Math.round(rating) ? "★" : "☆"}</span>
    ))}
  </div>
);

const HospitalDetailsPage = () => {
  const { id } = useParams();
  const { loading, fetchHospitalById, hospital } = useHospitals();
  const userLocation = null; // replace with your actual user location logic

  useEffect(() => {
    const loadData = async () => {
      await fetchHospitalById(id);
    };
    loadData();
  }, [id, fetchHospitalById]);

  if (loading || !hospital) return <Loader />;

  return (
    <MainLayout>
      <section className="min-h-screen bg-gradient-to-br from-[#f7fcff] via-white to-[#f0faff] py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col md:flex-row gap-8">
            <img
              src={hospital.image || "/hospital-placeholder.jpg"}
              alt={hospital.name}
              className="w-full md:w-1/3 h-64 object-cover rounded-xl"
            />
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  {hospital.name}
                </h1>
                <p className="text-gray-500">{hospital.address}</p>
                {/* {distance && (
                  <p className="text-sm text-blue-600 mt-1">
                    📍 {distance} km away from your location
                  </p>
                )} */}
              </div>

              <div className="flex items-center gap-3">
                <RatingStars rating={hospital.rating} />
                <span className="text-gray-600 text-sm">
                  ({hospital.rating?.toFixed(1)}) ·{" "}
                  {hospital.reviews?.length || 0} reviews
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {hospital.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p>
                    <span className="font-semibold">📞 Phone:</span>{" "}
                    {hospital.phone}
                  </p>
                  <p>
                    <span className="font-semibold">📧 Email:</span>{" "}
                    {hospital.email}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">🏥 Beds:</span>{" "}
                    {hospital.beds}
                  </p>
                  <p>
                    <span className="font-semibold">🚨 Emergency:</span>{" "}
                    {hospital.emergency ? "Available ✅" : "Not available ❌"}
                  </p>
                </div>
              </div>

              {/* Open Hours */}
              {hospital.openHours && (
                <div className="mt-2">
                  <p className="text-gray-700 font-medium mb-1">
                    🕒 Opening Hours:
                  </p>
                  <p className="text-sm text-gray-600">
                    Weekdays: {hospital.openHours.weekdays}
                  </p>
                  <p className="text-sm text-gray-600">
                    Weekend: {hospital.openHours.weekend}
                  </p>
                </div>
              )}

              {/* Contact Person */}
              {hospital.contactPerson && (
                <div className="mt-3">
                  <p className="font-semibold text-gray-700">
                    👨‍⚕️ Contact Person:
                  </p>
                  <p className="text-sm text-gray-600">
                    {hospital.contactPerson.name} —{" "}
                    {hospital.contactPerson.phone}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Services */}
          {hospital.services?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Services Offered
              </h2>
              <div className="flex flex-wrap gap-3">
                {hospital.services.map((service, i) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Doctors List */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Available Doctors
            </h2>
            {/* {doctors.length === 0 ? (
              <p className="text-gray-500">No doctors available currently.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-gradient-to-br from-white to-blue-50 p-5 rounded-xl shadow hover:shadow-lg transition"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <img
                        src={doc.photo || "/doctor-avatar.png"}
                        alt={doc.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                      />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {doc.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {doc.specialization}
                        </p>
                      </div>
                    </div>
                    <RatingStars rating={doc.rating} />
                    <p className="text-sm text-gray-600 mt-3">
                      Experience: <b>{doc.experience} years</b>
                    </p>
                    <p className="text-sm text-gray-600">
                      Qualification: <b>{doc.qualification}</b>
                    </p>
                    <button
                      onClick={() =>
                        alert(`Booking consultation with ${doc.name}...`)
                      }
                      className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                      Book Consultation
                    </button>
                  </div>
                ))}
              </div>
            )} */}
          </div>

          {/* Token Queue */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              Clinical Visit Token Queue
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              View your live queue number and estimated consultation time.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg flex justify-between items-center">
              <p className="font-semibold text-blue-700 text-lg">
                Your Token: <span className="text-gray-800">#12</span>
              </p>
              <p className="text-sm text-gray-500">
                Estimated time: {formatDate(new Date())}
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HospitalDetailsPage;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getDoctorById } from "../../api/doctorApi";
import {
  Star,
  GraduationCap,
  Briefcase,
  MessageSquare,
  Calendar,
  Globe,
  Languages,
  Wallet,
  Clock,
} from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import MainLayout from "../../layouts/MainLayout";

const DoctorDetailPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await getDoctorById(id);
        setDoctor(data);
      } catch (err) {
        console.error("Error fetching doctor details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500 animate-pulse">
        Loading doctor details...
      </div>
    );

  if (!doctor)
    return (
      <div className="text-center mt-20 text-gray-500">Doctor not found.</div>
    );

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#f9f9f9] via-white to-[#e9fdf9] px-6 py-10 md:px-16">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row">
            <img
              src={doctor.profilePicture || "/images/doctor-placeholder.jpg"}
              alt={doctor.name}
              className="w-full md:w-1/3 h-72 md:h-auto object-cover border-b md:border-b-0 md:border-r border-gray-200"
            />

            <div className="p-8 flex-1">
              <h2 className="text-3xl font-bold text-[#0A9586] mb-1">
                Dr. {doctor.name?.first} {doctor.name?.last}
              </h2>
              <p className="text-gray-600 mb-3 text-lg">
                {doctor.specialization?.join(", ") || "General Practitioner"}
              </p>

              <div className="flex items-center text-yellow-500 mb-4">
                <Star className="w-5 h-5 fill-yellow-400" />
                <span className="ml-1 text-gray-700">
                  {doctor.ratings?.average || 4.6} ({doctor.ratings?.count || 0}{" "}
                  reviews)
                </span>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-5">
                {doctor.bio ||
                  "Experienced and compassionate doctor specializing in personalized patient care."}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-700 text-sm font-medium">
                  <GraduationCap className="w-5 h-5 text-[#0A9586] mr-2" />
                  <span>{doctor.qualifications?.join(", ")}</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm font-medium">
                  <Briefcase className="w-5 h-5 text-[#0A9586] mr-2" />
                  <span>{doctor.yearsOfExperience} years experience</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm font-medium">
                  <Languages className="w-5 h-5 text-[#0A9586] mr-2" />
                  <span>{doctor.languages?.join(", ")}</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm font-medium">
                  <Wallet className="w-5 h-5 text-[#0A9586] mr-2" />
                  <span>₹{doctor.consultation?.fee} per session</span>
                </div>
              </div>

              {/* Consultation Modes */}
              <div className="flex flex-wrap gap-2 mb-5">
                {doctor.consultation?.modes?.map((mode, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#e6faf7] text-[#0A9586] rounded-full text-sm font-medium border border-teal-200"
                  >
                    {mode}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  className="flex items-center gap-2 bg-gradient-to-r from-[#0A9586] to-teal-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
                  to={`/consult/${doctor._id}`}
                >
                  <MessageSquare className="w-4 h-4" /> Book Online Consultancy
                </Link>

                {/* <button
                  onClick={() =>
                    (window.location.href = `/appointments/${doctor._id}`)
                  }
                  className="flex items-center gap-2 border border-[#0A9586] text-[#0A9586] px-6 py-3 rounded-full font-semibold hover:bg-[#0A9586]/10 hover:shadow transition-all"
                >
                  <Calendar className="w-4 h-4" /> Schedule Visit
                </button> */}
              </div>
            </div>
          </div>

          {/* Weekly Availability */}
          <div className="p-8 border-t border-gray-100 bg-gradient-to-b from-white to-[#f9fffd]">
            <h3 className="text-xl font-semibold text-[#0A9586] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" /> Weekly Availability
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm text-gray-700">
                <thead>
                  <tr className="bg-[#e6faf7] text-[#0A9586]">
                    <th className="p-3 text-left">Day</th>
                    <th className="p-3 text-left">Available Slots</th>
                  </tr>
                </thead>
                <tbody>
                  {doctor.availability.map((day, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-100 ${
                        day.isAvailable
                          ? "bg-white"
                          : "bg-gray-50 text-gray-400"
                      }`}
                    >
                      <td className="p-3 font-medium">{day.day}</td>
                      <td className="p-3">
                        {day.isAvailable ? (
                          <div className="flex flex-wrap gap-2">
                            {day.slots.map((slot, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200"
                              >
                                {slot.start} - {slot.end}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="italic text-gray-400">
                            Not Available
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="p-8 border-t border-gray-100 bg-gradient-to-b from-white to-[#f9fffd]">
            <h3 className="text-xl font-semibold text-[#0A9586] mb-4">
              Patient Reviews
            </h3>
            {doctor.ratings?.reviews && doctor.ratings.reviews.length > 0 ? (
              <div className="space-y-5">
                {doctor.ratings.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-xl p-4 hover:bg-[#f9fffd] hover:shadow-sm transition"
                  >
                    <p className="text-gray-800 font-semibold">
                      Patient {i + 1}
                    </p>
                    <p className="text-sm text-gray-600 italic mb-1">
                      “{r.comment}”
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(r.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DoctorDetailPage;

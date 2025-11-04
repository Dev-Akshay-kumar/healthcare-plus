import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import {
  Calendar,
  Clock,
  Phone,
  Star,
  Stethoscope,
  MapPin,
  Award,
  Users,
  Mail,
  Languages,
} from "lucide-react";
import { useDoctorStore } from "../../store/useDoctorStore";
import useAuth from "../../hooks/useAuth";
import formatDoctorName from "../../services/nameFormatter";
import axiosClient from "../../api/axiosClient";
import MainLayout from "../../layouts/MainLayout";

const ConsultationPage = () => {
  const { id } = useParams();
  const { selectedDoctor, fetchDoctorById, loading, error } = useDoctorStore();
  const { user } = useAuth();

  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [consultationMode, setConsultationMode] = useState("");
  const [form, setForm] = useState({ issue: "" });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Memoize fetchDoctorById to fix useEffect dependency warning
  const memoizedFetchDoctor = useCallback(() => {
    if (id) fetchDoctorById(id);
  }, [id, fetchDoctorById]);

  // Fetch doctor details when component mounts
  useEffect(() => {
    memoizedFetchDoctor();
  }, [memoizedFetchDoctor]);

  // Generate next 7 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = daysOfWeek[date.getDay()];

      // Check if doctor is available on this day
      const availability = selectedDoctor?.availability?.find(
        (avail) => avail.day === dayName && avail.isAvailable
      );

      dates.push({
        full: date.toISOString().split("T")[0],
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        dayName: dayName,
        isAvailable: !!availability,
        slots: availability?.slots || [],
      });
    }
    return dates;
  };

  // Generate time slots based on selected date
  const getTimeSlotsForDate = () => {
    if (!selectedDate || !selectedDoctor?.availability) return [];

    const selectedDateObj = availableDates.find((d) => d.full === selectedDate);
    if (!selectedDateObj || !selectedDateObj.isAvailable) return [];

    const slots = [];
    const slotDuration = selectedDoctor.consultation?.slotDurationMinutes || 30;

    selectedDateObj.slots.forEach((timeRange) => {
      const [startHour, startMin] = timeRange.start.split(":").map(Number);
      const [endHour, endMin] = timeRange.end.split(":").map(Number);

      let currentTime = startHour * 60 + startMin;
      const endTime = endHour * 60 + endMin;

      while (currentTime + slotDuration <= endTime) {
        const hours = Math.floor(currentTime / 60);
        const minutes = currentTime % 60;
        const displayHours = hours % 12 || 12;
        const ampm = hours >= 12 ? "PM" : "AM";
        const timeString = `${displayHours}:${minutes
          .toString()
          .padStart(2, "0")} ${ampm}`;

        slots.push(timeString);
        currentTime += slotDuration;
      }
    });

    return slots;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedSlot || !form.issue.trim()) {
      alert("⚠️ Please describe your issue and select a time slot.");
      return;
    }

    if (!selectedDate) {
      alert("⚠️ Please select a date for your appointment.");
      return;
    }

    if (!consultationMode) {
      alert("⚠️ Please select a consultation mode.");
      return;
    }

    if (!selectedDoctor) {
      alert("⚠️ Doctor information not loaded yet.");
      return;
    }

    try {
      // Convert consultationMode to match schema enum: "InPerson" -> "in-person"
      const formattedMode =
        consultationMode === "InPerson" ? "in-person" : "telemedicine";

      const response = await axiosClient.post("/appointments", {
        doctorId: selectedDoctor._id,
        patientId: user._id,
        patientName: `${user.firstName} ${user.lastName}`,
        date: selectedDate,
        timeSlot: selectedSlot,
        consultationMode: formattedMode,
        issue: form.issue.trim(),
      });
      if (response.status == "scheduled") {
        setBookingConfirmed(true);
      }

      const selectedDateObj = availableDates.find(
        (d) => d.full === selectedDate
      );
      const dateDisplay = selectedDateObj
        ? `${selectedDateObj.day}, ${selectedDateObj.month} ${selectedDateObj.date}`
        : selectedDate;

      //   alert(
      //     `✅ Booking Confirmed!\n\nDoctor: ${formatDoctorName(
      //       selectedDoctor
      //     )}\nSpecialization: ${
      //       selectedDoctor.specialization?.join(", ") || "N/A"
      //     }\nDate: ${dateDisplay}\nTime: ${selectedSlot}\nMode: ${consultationMode}\nPatient: ${
      //       user?.firstName || ""
      //     } ${user?.lastName || ""}\nConsultation Fee: ${
      //       selectedDoctor.consultation?.fee || 0
      //     }\n\nYou will receive a confirmation email shortly.`
      //   );

      setForm({ issue: "" });
      setSelectedSlot("");
      setSelectedDate("");
      setConsultationMode("");
    } catch (error) {
      console.error("Booking error:", error);
      alert("⚠️ An error occurred while booking. Please try again.");
    }
  };

  // Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-teal-600 font-medium">Loading doctor details...</p>
        </div>
      </div>
    );

  // Error state
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      </div>
    );

  // No doctor data
  if (!selectedDoctor)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 font-medium">
            No doctor details available.
          </p>
        </div>
      </div>
    );

  const availableDates = getAvailableDates();
  const timeSlots = getTimeSlotsForDate();

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 px-4 py-8 md:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
            Book Your <span className="text-teal-600">Consultation</span>
          </h1>
          <p className="text-gray-600">
            Schedule an appointment with our expert doctors
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Doctor Info Card - Left Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Doctor Image */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img
                    src={selectedDoctor.profilePicture || "/default-doctor.jpg"}
                    alt={formatDoctorName(selectedDoctor) || "Doctor"}
                    className="w-32 h-32 rounded-full object-cover border-4 border-teal-100"
                  />
                  <div className="absolute bottom-0 right-0 bg-teal-600 rounded-full p-2">
                    <Stethoscope className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {formatDoctorName(selectedDoctor)}
                </h2>
                <p className="text-teal-600 font-medium">
                  {selectedDoctor.specialization?.join(" • ") ||
                    "General Practice"}
                </p>
                {selectedDoctor.qualifications && (
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedDoctor.qualifications.join(", ")}
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-teal-50 rounded-lg p-3 text-center">
                  <Star className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="font-bold text-gray-800">
                    {selectedDoctor.ratings?.average || "N/A"}
                    {selectedDoctor.ratings?.count && (
                      <span className="text-xs text-gray-500">
                        {" "}
                        ({selectedDoctor.ratings.count})
                      </span>
                    )}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <Award className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-bold text-gray-800">
                    {selectedDoctor.yearsOfExperience || "N/A"} yrs
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3 text-sm">
                {selectedDoctor.phone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span>{selectedDoctor.phone}</span>
                  </div>
                )}
                {selectedDoctor.email && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <span className="truncate">{selectedDoctor.email}</span>
                  </div>
                )}
                {selectedDoctor.address && (
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {selectedDoctor.address.line1}
                      {selectedDoctor.address.line2 &&
                        `, ${selectedDoctor.address.line2}`}
                      <br />
                      {selectedDoctor.address.city},{" "}
                      {selectedDoctor.address.state}{" "}
                      {selectedDoctor.address.postalCode}
                    </span>
                  </div>
                )}
                {selectedDoctor.languages &&
                  selectedDoctor.languages.length > 0 && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Languages className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span>{selectedDoctor.languages.join(", ")}</span>
                    </div>
                  )}
              </div>

              {selectedDoctor.bio && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-2">About</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedDoctor.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
          {!bookingConfirmed ? (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-teal-600">
                  <Calendar className="w-6 h-6" /> Appointment Details
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Patient Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Patient Information
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={`${user?.firstName || ""} ${
                          user?.lastName || ""
                        }`}
                        disabled
                        placeholder="Full Name"
                        className="border border-gray-300 bg-gray-100 text-gray-600 rounded-lg px-4 py-3 w-full outline-none cursor-not-allowed"
                      />
                      <input
                        type="number"
                        value={user?.age || ""}
                        disabled
                        placeholder="Age"
                        className="border border-gray-300 bg-gray-100 text-gray-600 rounded-lg px-4 py-3 w-full outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Medical Issue */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe Your Medical Issue *
                    </label>
                    <textarea
                      placeholder="Please describe your symptoms, concerns, or reason for consultation..."
                      value={form.issue}
                      onChange={(e) =>
                        setForm({ ...form, issue: e.target.value })
                      }
                      rows="4"
                      required
                      className="border border-gray-300 rounded-lg px-4 py-3 w-full outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Consultation Mode */}
                  {selectedDoctor.consultation?.modes &&
                    selectedDoctor.consultation.modes.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Consultation Mode *
                        </label>
                        <div className="flex gap-4">
                          {selectedDoctor.consultation.modes.map((mode) => (
                            <button
                              type="button"
                              key={mode}
                              onClick={() => setConsultationMode(mode)}
                              className={`flex-1 px-4 py-3 rounded-lg border font-medium text-sm transition-all ${
                                consultationMode === mode
                                  ? "bg-teal-600 text-white border-teal-600 shadow-md"
                                  : "border-gray-300 text-gray-700 bg-white hover:border-teal-400"
                              }`}
                            >
                              {mode === "InPerson"
                                ? "🏥 In-Person"
                                : "💻 Telemedicine"}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Date Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Date *
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {availableDates.map((dateObj) => (
                        <button
                          type="button"
                          key={dateObj.full}
                          onClick={() => {
                            setSelectedDate(dateObj.full);
                            setSelectedSlot(""); // Reset slot when date changes
                          }}
                          disabled={!dateObj.isAvailable}
                          className={`flex-shrink-0 px-4 py-3 rounded-lg border text-center min-w-[80px] transition-all ${
                            !dateObj.isAvailable
                              ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-200"
                              : selectedDate === dateObj.full
                              ? "bg-teal-600 text-white border-teal-600 shadow-md"
                              : "border-gray-300 text-gray-700 bg-white hover:border-teal-400"
                          }`}
                        >
                          <div className="text-xs font-medium">
                            {dateObj.day}
                          </div>
                          <div className="text-lg font-bold">
                            {dateObj.date}
                          </div>
                          <div className="text-xs">{dateObj.month}</div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      💡 Grayed out dates are not available
                    </p>
                  </div>

                  {/* Time Slot Selector */}
                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-teal-600" /> Select Time
                        Slot *
                      </label>
                      {timeSlots.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {timeSlots.map((slot, index) => (
                            <button
                              type="button"
                              key={`${slot}-${index}`}
                              onClick={() => setSelectedSlot(slot)}
                              className={`px-5 py-3 rounded-lg border font-medium text-sm transition-all ${
                                selectedSlot === slot
                                  ? "bg-teal-600 text-white shadow-md border-teal-600"
                                  : "border-gray-300 text-gray-700 bg-white hover:border-teal-400 hover:text-teal-600"
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">
                          No available slots for this date
                        </p>
                      )}
                    </div>
                  )}

                  {/* Consultation Fee */}
                  {selectedDoctor.consultation?.fee && (
                    <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
                      <span className="text-gray-600">Consultation Fee:</span>
                      <span className="text-2xl font-bold text-teal-600">
                        ${selectedDoctor.consultation.fee}
                      </span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Confirm Booking
                  </button>
                </form>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-500 text-center">
                    💡 You will receive a confirmation email and SMS with
                    appointment details
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center">
                <div className="text-6xl mb-4 text-teal-600">✅</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your appointment with {formatDoctorName(selectedDoctor)} has
                  been successfully scheduled.
                </p>
                <button
                  onClick={() => setBookingConfirmed(false)}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          )}
          {/* Booking Form - Right Side */}
        </div>
      </div>
    </MainLayout>
  );
};

export default ConsultationPage;

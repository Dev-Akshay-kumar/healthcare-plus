import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Calendar, Clock, Video, Building, CheckCircle } from "lucide-react";
import { getDoctorById } from "../../api/doctorApi";
// import { formatDate } from "../../utils/formatDate";

const BookingPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [mode, setMode] = useState("online");
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      const data = await getDoctorById(doctorId);
      setDoctor(data);
    };
    fetchDoctor();
  }, [doctorId]);

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
  ];

  const handleConfirm = () => {
    setConfirming(true);
    setTimeout(() => {
      navigate("/appointments/queue", {
        state: {
          doctor,
          selectedDate,
          selectedTime,
          mode,
        },
      });
    }, 1500);
  };

  if (!doctor)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-background px-6 py-10 md:px-16">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-100">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Book Appointment with{" "}
          <span className="text-blue-600">{doctor.name}</span>
        </h1>
        <p className="text-center text-gray-500 mb-6">
          {doctor.specialization} — {doctor.experience}
        </p>

        {/* Date Picker */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Select Date
          </label>
          <div className="flex items-center border rounded-lg p-3">
            <Calendar className="w-5 h-5 text-blue-600 mr-3" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 outline-none"
            />
          </div>
        </div>

        {/* Time Slot Selection */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Available Time Slots
          </label>
          <div className="grid grid-cols-3 gap-3">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`border rounded-lg py-2 text-sm font-medium ${
                  selectedTime === time
                    ? "bg-teal-500 text-white border-blue-600"
                    : "border-gray-300 hover:bg-blue-50"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selection */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Consultation Mode
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setMode("online")}
              className={`flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium ${
                mode === "online"
                  ? "bg-teal-500 text-white border-blue-600"
                  : "border-gray-300 hover:bg-blue-50"
              }`}
            >
              <Video className="w-4 h-4" /> Online
            </button>
            <button
              onClick={() => setMode("in-person")}
              className={`flex items-center gap-2 border rounded-full px-4 py-2 text-sm font-medium ${
                mode === "in-person"
                  ? "bg-teal-500 text-white border-blue-600"
                  : "border-gray-300 hover:bg-blue-50"
              }`}
            >
              <Building className="w-4 h-4" /> In-Person
            </button>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          disabled={!selectedDate || !selectedTime || confirming}
          onClick={handleConfirm}
          className="w-full bg-teal-500 hover:bg-teal-500 text-white py-3 rounded-full font-medium flex justify-center items-center gap-2 transition"
        >
          {confirming ? (
            <>
              <CheckCircle className="w-5 h-5 animate-spin" /> Confirming...
            </>
          ) : (
            "Confirm Appointment"
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingPage;

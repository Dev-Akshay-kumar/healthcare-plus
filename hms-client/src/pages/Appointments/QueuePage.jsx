import React from "react";
import { useLocation, useNavigate } from "react-router";
import { Clock, User, Calendar, Video, Building } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

const QueuePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state)
    return (
      <div className="text-center mt-20 text-gray-500">
        No booking found. <br />
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-600 underline"
        >
          Go back to homepage
        </button>
      </div>
    );

  const { doctor, selectedDate, selectedTime, mode } = state;

  const tokenNumber = Math.floor(Math.random() * 50) + 1;
  const estimatedWait = tokenNumber * 5; // 5 min per patient (example)

  return (
    <div className="min-h-screen bg-background px-6 py-10 md:px-16">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-md p-8 border border-gray-100 text-center">
        <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Appointment Confirmed!</h2>
        <p className="text-gray-500 mb-6">
          Your appointment details are below:
        </p>

        {/* Doctor Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
          <p className="text-sm text-gray-500">{doctor.specialization}</p>
        </div>

        {/* Token Info */}
        <div className="bg-blue-50 rounded-xl p-5 mb-6">
          <h4 className="text-5xl font-bold text-blue-600 mb-2">
            #{tokenNumber}
          </h4>
          <p className="text-gray-700 font-medium">Your Queue Token</p>
          <p className="text-sm text-gray-500">
            Estimated waiting time: {estimatedWait} mins
          </p>
        </div>

        {/* Appointment Info */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            {formatDate(selectedDate)}
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            {selectedTime}
          </div>
          <div className="flex items-center justify-center gap-2 col-span-2">
            {mode === "online" ? (
              <>
                <Video className="w-4 h-4 text-blue-600" /> Online Consultancy
              </>
            ) : (
              <>
                <Building className="w-4 h-4 text-blue-600" /> In-Person Visit
              </>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="bg-teal-500 text-white py-3 rounded-full font-medium hover:bg-teal-500 transition"
          >
            Go to Home
          </button>
          <button
            onClick={() => navigate("/appointments")}
            className="border border-blue-600 text-blue-600 py-3 rounded-full font-medium hover:bg-blue-50 transition"
          >
            View All Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueuePage;

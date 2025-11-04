import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import useAuth from "../../hooks/useAuth";
import {
  Calendar,
  Clock,
  User,
  FileText,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Appointments = () => {
  const { appointments = [], fetchAppointments, loading, error } = useAuth();
  const [filter, setFilter] = useState("all");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // ✅ Proper async useEffect
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        await fetchAppointments();
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
      }
    };
    loadAppointments();
  }, [fetchAppointments]);
  console.log("Appointments:", appointments);

  // ✅ Update filtered list when appointments or filter changes
  useEffect(() => {
    if (filter === "all") {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(appointments.filter((a) => a.status === filter));
    }
  }, [appointments, filter]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-teal-600 font-medium">Loading appointments...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center max-w-md">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-red-500 font-medium mb-4">{error}</p>
            <button
              onClick={fetchAppointments}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Try Again
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 px-4 py-8 md:px-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
            My <span className="text-teal-600">Appointments</span>
          </h1>
          <p className="text-gray-600">
            View and manage your medical appointments
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="bg-white rounded-lg shadow-md p-2 flex gap-2 flex-wrap">
            {["all", "scheduled", "completed", "cancelled"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all capitalize ${
                  filter === status
                    ? "bg-teal-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {status}
                {status === "all" && ` (${appointments.length})`}
                {status !== "all" &&
                  ` (${
                    appointments.filter((a) => a.status === status).length
                  })`}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        <div className="max-w-7xl mx-auto">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No {filter !== "all" ? filter : ""} appointments found
              </h3>
              <p className="text-gray-600">
                {filter === "all"
                  ? "You haven't booked any appointments yet."
                  : `You have no ${filter} appointments.`}
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Doctor Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-8 h-8 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800">
                              Dr.{" "}
                              {appointment.doctorId?.name?.first || "Unknown"}{" "}
                              {appointment.doctorId?.name?.last || ""}
                            </h3>
                            <p className="text-teal-600 font-medium">
                              {appointment.doctorId?.specialization?.join(
                                ", "
                              ) || "General Practice"}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {appointment.status}
                          </span>
                        </div>

                        {/* Appointment Details */}
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4 text-teal-600 flex-shrink-0" />
                            <span className="text-sm">
                              {formatDate(appointment.date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4 text-teal-600 flex-shrink-0" />
                            <span className="text-sm">
                              {appointment.timeSlot}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0" />
                            <span className="text-sm capitalize">
                              {appointment.consultationMode === "in-person"
                                ? "In-Person"
                                : "Telemedicine"}
                            </span>
                          </div>
                          {appointment.doctorId?.phone && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                              <span className="text-sm">
                                {appointment.doctorId.phone}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Issue Description */}
                        {appointment.issue && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-start gap-2">
                              <FileText className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-xs font-medium text-gray-500 mb-1">
                                  Medical Issue:
                                </p>
                                <p className="text-sm text-gray-700">
                                  {appointment.issue}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Doctor Contact */}
                        {appointment.doctorId?.email && (
                          <div className="mt-3 flex items-center gap-2 text-gray-600">
                            <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" />
                            <span className="text-sm">
                              {appointment.doctorId.email}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    {appointment.status === "scheduled" && (
                      <div className="flex lg:flex-col gap-2 justify-end">
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition text-sm font-medium">
                          Reschedule
                        </button>
                        <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition text-sm font-medium">
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Appointments;

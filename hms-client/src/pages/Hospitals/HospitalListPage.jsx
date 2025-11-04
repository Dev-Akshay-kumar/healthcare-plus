import React, { useEffect, useState } from "react";
import { MapPin, Search, Phone, Star } from "lucide-react";
import { getHospitals } from "../../api/hospitalApi"; // API call
import { Link } from "react-router";
import MainLayout from "../../layouts/MainLayout";

const HospitalListPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch all hospitals
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const data = await getHospitals(); // expected to return an array
        setHospitals(data || []);
      } catch (err) {
        console.error("❌ Failed to fetch hospitals:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  // ✅ Filter hospitals by search term
  const filteredHospitals = hospitals.filter((h) =>
    h.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="min-h-screen bg-background text-accentdark px-6 py-10 md:px-16">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Explore <span className="text-teal-500">Hospitals</span>
          </h1>
          <p className="text-muted text-base">
            Browse trusted hospitals and find the best care for your needs.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
            <input
              type="text"
              placeholder="Search hospitals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 text-gray-700 outline-none"
            />
            <button className="bg-teal-500 px-6 py-3 flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Hospital List */}
        {loading ? (
          <div className="text-center text-gray-500 mt-20">
            Loading hospitals...
          </div>
        ) : filteredHospitals.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No hospitals found for "{searchTerm}"
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100"
              >
                <img
                  src={hospital.image || "/images/hospital-placeholder.jpg"}
                  alt={hospital.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1 text-blue-600" />
                    <span>{hospital.city || "Unknown City"}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {hospital.description ||
                      "Multi-specialty hospital providing 24/7 emergency services and expert care."}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star className="w-4 h-4" />
                      <span className="ml-1 text-gray-600">
                        {hospital.rating || "4.5"} ({hospital.reviews || 100}{" "}
                        reviews)
                      </span>
                    </div>
                    <Link
                      to={`/hospitals/${hospital._id}`}
                      className="bg-green-500 rounded-full p-3 text-white"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Floating Call to Action */}
        <div className="fixed bottom-6 right-6">
          <a
            href="/book"
            className="bg-teal-500 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:scale-105 transition"
          >
            <Phone className="w-4 h-4" />
            Book Consultation
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default HospitalListPage;

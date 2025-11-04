import { useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "../utils/constants";

const useHospitals = () => {
  const [hospital, setHospital] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch all hospitals (for HospitalList page)
  const fetchHospitals = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/hospitals`);
      if (!res.ok) throw new Error("Failed to fetch hospitals");
      const data = await res.json();
      setHospitals(data);
    } catch (error) {
      console.error("❌ Error fetching hospitals:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch single hospital by ID (for HospitalDetails page)
  const fetchHospitalById = useCallback(async (id) => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/hospitals/${id}`);
      if (!res.ok) throw new Error("Failed to fetch hospital details");
      const data = await res.json();
      setHospital(data);
    } catch (error) {
      console.error("❌ Error fetching hospital by ID:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🟢 We DO NOT call anything automatically here.
  // HospitalListPage will call fetchHospitals()
  // HospitalDetailsPage will call fetchHospitalById(id)
  // This gives full control to each page component.

  return {
    hospitals,
    hospital,
    loading,
    setLoading,
    fetchHospitals,
    fetchHospitalById,
  };
};

export default useHospitals;

import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constants";

const useDoctors = (specialization = "") => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${API_BASE_URL}/doctors?specialization=${specialization}`
        );
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [specialization]);

  return { doctors, loading, error };
};

export default useDoctors;

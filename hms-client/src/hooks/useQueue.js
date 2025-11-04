import { useEffect, useState } from "react";
import { API_BASE_URL } from "../utils/constants";

const useQueue = (doctorId) => {
  const [queue, setQueue] = useState([]);
  const [myToken, setMyToken] = useState(null);

  // Fetch live queue
  useEffect(() => {
    if (!doctorId) return;
    const fetchQueue = async () => {
      const res = await fetch(`${API_BASE_URL}/queue/${doctorId}`);
      const data = await res.json();
      setQueue(data.queue);
    };
    fetchQueue();
  }, [doctorId]);

  // Book a token
  const bookToken = async (patientId) => {
    const res = await fetch(`${API_BASE_URL}/queue/${doctorId}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId }),
    });
    const data = await res.json();
    setMyToken(data.token);
  };

  // Cancel a token
  const cancelToken = async (tokenId) => {
    await fetch(`${API_BASE_URL}/queue/${doctorId}/cancel/${tokenId}`, {
      method: "DELETE",
    });
    setMyToken(null);
  };

  return { queue, myToken, bookToken, cancelToken };
};

export default useQueue;

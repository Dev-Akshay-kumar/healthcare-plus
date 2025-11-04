import { useEffect, useState } from "react";
import { calcDistance } from "../utils/calcDistance";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => setError(err.message)
    );
  }, []);

  const getDistance = (hospitalLat, hospitalLng) => {
    if (!location) return null;
    return calcDistance(location.lat, location.lng, hospitalLat, hospitalLng);
  };

  return { location, error, getDistance };
};

export default useLocation;

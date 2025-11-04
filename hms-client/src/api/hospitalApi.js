// src/api/hospitalApi.js
// import axiosClient from "./axiosClient";

import axiosClient from "./axiosClient"

export const getHospitals = async () => {
  const hospitals = axiosClient.get("/hospitals")
  return hospitals
}
// Replace with real endpoint when backend ready
// Example mock data:
// return [
//   {
//     _id: "1",
//     name: "CityCare Hospital",
//     city: "Delhi",
//     rating: 4.8,
//     reviews: 120,
//     image: "/images/hospital1.jpg",
//     location: { lat: 28.6139, lon: 77.209 },
//   },
//   {
//     _id: "2",
//     name: "LifeLine Medical Center",
//     city: "Mumbai",
//     rating: 4.6,
//     reviews: 95,
//     image: "/images/hospital2.jpg",
//     location: { lat: 19.076, lon: 72.8777 },
//   },
//   {
//     _id: "3",
//     name: "GreenLeaf Clinic",
//     city: "Bangalore",
//     rating: 4.9,
//     reviews: 180,
//     image: "/images/hospital3.jpg",
//     location: { lat: 12.9716, lon: 77.5946 },
//   },
// ];
// };

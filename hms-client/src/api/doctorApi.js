import axiosClient from "./axiosClient";

// Mock API — replace with backend later
export const getDoctors = async () => {
  const doctors = await axiosClient.get("/doctors");
  console.log("API response:", doctors);
  return doctors;
}
//   [
//   {
//     _id: "1",
//     name: "Dr. Ananya Sharma",
//     specialization: "Cardiologist",
//     hospital: "CityCare Hospital",
//     experience: "8 years",
//     rating: 4.9,
//     reviews: 120,
//     image:
//       "https://images.pexels.com/photos/12429178/pexels-photo-12429178.jpeg",
//   },
//   {
//     _id: "2",
//     name: "Dr. Rakesh Verma",
//     specialization: "Dermatologist",
//     hospital: "LifeLine Clinic",
//     experience: "12 years",
//     rating: 4.7,
//     reviews: 98,
//     image: "/images/doctor2.jpg",
//   },
// ];

export const getDoctorById = async (id) => {
  const doctor = await axiosClient.get(`/doctors/${id}`);
  return doctor;
};

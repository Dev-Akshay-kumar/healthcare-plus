import { create } from "zustand";
import { getDoctors, getDoctorById } from "../api/doctorApi";

export const useDoctorStore = create((set) => ({
  doctors: [],
  selectedDoctor: null,
  loading: false,
  error: null,

  // Fetch all doctors
  fetchDoctors: async () => {
    try {
      set({ loading: true, error: null });
      const data = await getDoctors();
      set({ doctors: data || [], loading: false });
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
      set({ error: err.message || "Failed to fetch doctors", loading: false });
    }
  },

  // Fetch single doctor by ID
  fetchDoctorById: async (id) => {
    try {
      set({ loading: true, error: null });
      const data = await getDoctorById(id);
      set({ selectedDoctor: data || null, loading: false });
    } catch (err) {
      console.error("Failed to fetch doctor:", err);
      set({ error: err.message || "Failed to fetch doctor", loading: false });
    }
  },

  // Optional utility actions
  clearSelectedDoctor: () => set({ selectedDoctor: null }),
}));

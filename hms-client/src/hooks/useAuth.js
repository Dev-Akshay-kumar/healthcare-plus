// 📁 src/store/useAuth.js
import { create } from "zustand";
import { API_BASE_URL } from "../utils/constants";
import axiosClient from "../api/axiosClient";

const useAuth = create((set) => ({
  user: null,
  appointments: [],
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,

  // ✅ Login: Calls /patients/login and stores user + token
  login: async (credentials) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(`${API_BASE_URL}/api/patients/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials), // { email, password }
      });

      const data = await res.json();
      console.log("Login response data:", data);
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Expected structure from backend:
      // { message: "Login successful", patient: {...}, token?: "..." }

      const userData = data.patient || data.user || null;
      const token = data.token || localStorage.getItem("token") || "";

      if (token) localStorage.setItem("token", token);
      if (userData) localStorage.setItem("user", JSON.stringify(userData));

      set({
        user: userData,
        token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });

      return data;
    } catch (error) {
      console.error("❌ Login error:", error);
      set({ loading: false, error: error.message, isAuthenticated: false });
      throw error;
    }
  },
  fetchAppointments: async () => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(`${API_BASE_URL}/api/appointments/patient/6908f124872a18488ff0b98d`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch appointments");

      const appointments = Array.isArray(data) ? data : [];
      set({ appointments, loading: false, error: null });
    } catch (error) {
      console.error("❌ Fetch appointments error:", error);
      set({ loading: false, error: error.message });
      throw error;
    }
  },


  // ✅ Register new user
  register: async (userData) => {
    try {
      set({ loading: true, error: null });

      const res = await fetch(`${API_BASE_URL}/patients/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      const token = data.token || "";
      const newUser = data.patient || data.user || userData;

      if (token) localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(newUser));

      set({
        user: newUser,
        token,
        isAuthenticated: true,
        loading: false,
      });

      return data;
    } catch (error) {
      console.error("❌ Register error:", error);
      set({ loading: false, error: error.message });
      throw error;
    }
  },

  // ✅ Load stored user/token (for app initialization)
  loadUser: () => {
    const stored = localStorage.getItem("user");
    if (stored) set({ user: JSON.parse(stored), isAuthenticated: true });
  },

  // ✅ Logout
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuth;

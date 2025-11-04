// Base configuration and reusable constants for your healthcare app

export const APP_NAME = "HealthConnect";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

export const COLORS = {
  primary: "#2563eb", // Blue
  secondary: "#7c3aed", // Violet
  accentdark: "#0f172a", // Deep navy
  background: "#f8fafc", // Soft background
  surface: "#ffffff", // Cards, modals
  muted: "#94a3b8", // Muted text or borders
  success: "#10b981", // Green - success highlights
};

export const SPECIALITIES = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "ENT",
  "Gynecology",
];

export const DEFAULT_LOCATION = {
  lat: 20.5937,
  lon: 78.9629, // Center of India
};

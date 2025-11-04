import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router"; // ✅ correct path
import AuthLayout from "../../layouts/AuthLayout";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuth((state) => state.login);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);
  const loading = useAuth((state) => state.loading);
  const error = useAuth((state) => state.error);

  const [form, setForm] = useState({ email: "", password: "" });

  // ✅ Redirect when user is already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/profile");
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({
        email: form.email,
        password: form.password,
      });
      console.log("✅ Login success:", data);
      navigate("/profile"); // ✅ redirect after successful login
    } catch (err) {
      console.error("❌ Login failed:", err.message);
      alert(err.message || "Login failed, please try again.");
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-[#0A9586] mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Login to your HealthConnect account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-[#0A9586] focus:border-[#0A9586] outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-700 focus:ring-2 focus:ring-[#0A9586] focus:border-[#0A9586] outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-[#0A9586]" /> Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-[#0A9586] hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#0A9586] to-teal-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:scale-[1.02] transition-transform disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-sm text-center mt-3">
              {error}
            </p>
          )}

          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#0A9586] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
  );
};

export default LoginPage;

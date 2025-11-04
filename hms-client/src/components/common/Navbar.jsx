import React from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  console.log("Navbar - isAuthenticated:", isAuthenticated, "user:", user);

  return (
    <nav className="bg-white/10 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold text-primary">
          HealthCare+
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-accentdark hover:text-primary transition font-medium"
          >
            Home
          </Link>

          <Link
            to="/hospitals"
            className="text-accentdark hover:text-primary transition font-medium"
          >
            Hospitals
          </Link>
          <Link
            to="/doctors"
            className="text-accentdark hover:text-primary transition font-medium"
          >
            Doctors
          </Link>
          <Link
            to="/appointments"
            className="text-accentdark hover:text-primary transition font-medium"
          >
            Appointments
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="flex items-center justify-between gap-2 text-accentdark hover:text-primary transition font-medium"
              >
                <img
                  src="/images/healthcare-illustration.svg"
                  alt={user?.firstName || "User"}
                  className="w-10 h-10 rounded-full p-1 border-2 border-gray-200 aspect-square object-cover"
                />
                {user?.firstName}
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-teal-500 text-white px-4 py-2 rounded-lg  transition hover:bg-[#0A9586] hover:text-white hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary/10 text-primary border border-primary px-4 py-2 rounded-lg hover:text-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

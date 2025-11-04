import React from "react";
import { Link } from "react-router";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left Side Illustration */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-primary text-white p-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">HealthConnect</h1>
          <p className="text-lg text-blue-700">
            Your digital bridge to better healthcare 🩺
          </p>
          <img
            src="/images/healthcare-illustration.svg"
            alt="Doctor illustration"
            className="w-80 mx-auto rounded-lg"
          />
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex flex-1 flex-col justify-center items-center p-8">
        <div className="bg-surface shadow-xl rounded-2xl w-full max-w-md p-8">
          <h2 className="text-3xl font-semibold text-primary text-center mb-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-center text-muted mb-6">{subtitle}</p>
          )}
          {children}
        </div>

        <p className="mt-6 text-sm text-muted text-center">
          <Link to="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;

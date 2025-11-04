import React from "react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-6">
      <div className="mt-10">
        <img
          src="/images/error-404.svg"
          alt="Not Found Illustration"
          className="w-64 mx-auto"
        />
      </div>
      {/* <h1 className="text-8xl font-bold text-primary">404</h1> */}
      <h2 className="text-2xl font-semibold text-accentdark mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-muted mt-2 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="mt-6 bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

import React, { useState } from "react";
import { Link } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-surface shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          Reset Password 🔐
        </h2>

        {sent ? (
          <p className="text-center text-success">
            Password reset link sent to <strong>{email}</strong>. Please check
            your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-muted mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary border text-black py-2 rounded-lg hover:bg-teal-500 transition"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div className="text-center mt-4">
          <Link to="/login" className="text-primary text-sm hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import loginBg from "../assets/loginbg.svg";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your inbox/spam folder for a reset link!");
      setError("");
    } catch (err) {
      setError("Could not send reset email. Try again.");
      setMessage("");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex items-center justify-center min-h-screen"
    >
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-10 max-w-md w-full relative">
        <Link
          to="/"
          className="absolute top-4 left-4 text-sm text-[#bcb2da] font-semibold hover:text-[#a48bc3]"
        >
          ← Back to Home
        </Link>

        <h2 className="text-3xl font-bold text-[#234451] mb-4 text-center">
          Reset Your Password
        </h2>
        <p className="text-sm text-[#234451]/80 mb-6 text-center">
          We'll email you a link to reset it.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
        />

        <button
          onClick={handleReset}
          className="w-full bg-gradient-to-r from-[#dfa69f] to-[#bcb2da] text-white py-3 rounded-xl font-semibold hover:from-[#fabdb5] hover:to-[#a48bc3] transition-colors"
        >
          Send Reset Link
        </button>

        {message && (
          <p className="text-green-600 text-sm mt-4 text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}

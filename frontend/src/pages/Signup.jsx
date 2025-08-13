import signupBg from "../assets/signupbg.svg";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      console.log("Google Firebase ID token:", token);
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      setErrorMessage(error.message);
    }
  };

  const handleSignup = () => {
    setErrorMessage("");
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (!/\d/.test(password)) {
      setErrorMessage("Password must include at least one number.");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setErrorMessage("Password must include at least one special character.");
      return;
    }
    // Proceed with signup logic here (e.g., call Firebase createUserWithEmailAndPassword)
    console.log("Signup successful with email:", email);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${signupBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
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
        <div className="mb-8 flex justify-center">
          <img
            src="/Logo.png"
            alt="Materna Logo"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>

        <h2 className="text-3xl font-bold text-[#234451] mb-2 text-center">Join Materna</h2>
        <p className="text-center text-[#234451]/80 mb-8 text-sm">
          Never face pregnancy alone.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
        />

        <div className="relative mb-2">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-[#dfa69f] to-[#bcb2da] text-white py-3 rounded-xl font-semibold hover:from-[#fabdb5] hover:to-[#a48bc3] transition-colors mb-6"
        >
          Get Started
        </button>

        <p className="text-sm text-center text-[#234451] mb-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#bcb2da] font-semibold hover:text-[#a48bc3]">
            Log in
          </Link>
        </p>

        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">or sign up with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignup}
            className="flex items-center border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
            aria-label="Sign up with Google"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            <span className="text-sm text-gray-700 font-medium">Sign up with Google</span>
          </button>
        </div>

        {errorMessage && (
          <p className="text-sm text-red-500 text-center mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
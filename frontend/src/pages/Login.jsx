import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../assets/loginbg.svg";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("maternaUserToken", token);
      console.log("Firebase ID token:", token);
      // You can now send this token to the Django backend for verification
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("maternaUserToken", token);
      console.log("Google login token:", token);
      navigate("/profile");
    } catch (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
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

        <h2 className="text-3xl font-bold text-[#234451] mb-2 text-center">Welcome back</h2>
        <p className="text-center text-[#234451]/80 mb-8 text-sm">
          We’ve missed you. Pick up where you left off.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 mb-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a48bc3] mb-6"
        />
        <Link
          to="/reset-password"
          className="mt-2 text-right text-sm text-[#a48bc3] hover:underline block mb-4"
        >
          Forgot your password?
        </Link>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-[#dfa69f] to-[#bcb2da] text-white py-3 rounded-xl font-semibold hover:from-[#fabdb5] hover:to-[#a48bc3] transition-colors mb-6"
        >
          Log in
        </button>

        <p className="text-sm text-center text-[#234451] mb-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#bcb2da] font-semibold hover:text-[#a48bc3]">
            Sign up
          </Link>
        </p>

        <div className="flex items-center mb-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">or log in with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition"
            aria-label="Log in with Google"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            <span className="text-sm text-gray-700 font-medium">Log in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

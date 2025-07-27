import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import selfCareImage from "../assets/self-care.svg";
import trackerImage from "../assets/tracker.svg";
import needs from "../assets/needs.svg";
import connect from "../assets/connect.svg";
import welcome from "../assets/welcome.svg";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const slides = [
    {
      title: "Track your symptoms effortlessly",
      image: trackerImage,
    },
    {
      title: "Personalize your care routine",
      image: selfCareImage,
    },
    {
      title: "Join the Materna community",
      image: welcome,
    },
    {
      title: "Connect with other moms",
      image: connect,
    },
    {
      title: "All your needs met for pregnancy and postpartem",
      image: needs,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    setErrorMessage(""); // Clear previous errors

    // Password requirements
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasNumber || !hasSymbol) {
      setErrorMessage("Password must include at least one number and one symbol.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      console.log("Firebase ID token:", token);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error.message);
      setErrorMessage(error.message);
    }
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-[#f5f7fa] to-[#e3ebf4] font-sans">
      {/* Left: Sign Up Form */}
      <div className="relative w-full max-w-md bg-white shadow-xl rounded-3xl p-8 m-6 flex flex-col justify-center">
        <Link
          to="/"
          className="absolute top-4 left-4 text-sm text-[#a48bc3] font-semibold hover:text-[#9771bc]"
        >
          ← Back to Home
        </Link>
        <h2 className="text-2xl font-bold text-[#234451]">Are you ready for a journey?</h2>
        <p className="text-sm text-[#234451] mt-2">Create your account.</p>

        <button className="mt-6 border border-gray-300 rounded-lg py-2 flex items-center justify-center">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
          <span className="text-sm">Sign up with Google</span>
        </button>

        <div className="text-xs text-center text-gray-500 mt-4">or sign up with your email</div>

        <input
          className="mt-4 px-4 py-3 w-full border border-gray-200 rounded-xl placeholder-gray-400"
          placeholder="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          className="mt-3 px-4 py-3 w-full border border-gray-200 rounded-xl placeholder-gray-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="mt-3 px-4 py-3 w-full border border-gray-200 rounded-xl placeholder-gray-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="mt-6 bg-[#a48bc3] text-white py-3 rounded-xl font-semibold hover:bg-[#9771bc]"
        >
          Sign up
        </button>

        {errorMessage && (
          <p className="text-sm text-red-500 text-center mt-2">{errorMessage}</p>
        )}

        <p className="mt-4 text-sm text-center text-[#234451]">
          Already have an account? <a href="/login" className="text-[#a48bc3] font-semibold">Log in</a>
        </p>
      </div>

      {/* Right: Carousel Section */}
      <div
        className="relative flex-1 bg-cover bg-center bg-no-repeat hidden md:flex flex-col items-center justify-center text-center transition-all duration-500"
        style={{
          backgroundImage: `url('${slides[currentSlide].image}')`,
        }}
      >
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-2xl text-[#234451] font-bold py-3 px-4 rounded-full shadow-md"
        >
          ‹
        </button>

        <div className="bg-white/70 p-6 rounded-2xl shadow-lg mt-16 mb-auto mx-6">
          <h2 className="text-2xl font-bold text-[#234451]">{slides[currentSlide].title}</h2>
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-2xl text-[#234451] font-bold py-3 px-4 rounded-full shadow-md"
        >
          ›
        </button>
      </div>
    </div>
  );
}
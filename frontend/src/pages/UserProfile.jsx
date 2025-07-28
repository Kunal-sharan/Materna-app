import React, { useEffect, useState, useRef } from "react";
import { getAuth, signOut, updateProfile, updateEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import bgVideo from "@/assets/sky1.mp4";
import { StarStill } from "@/components/StarStill";
import { Toaster, toast } from "react-hot-toast";
import editIcon from "@/assets/editing.png";
import babyIcon from "@/assets/baby.png";
import weight from "@/assets/bbweight.png";
import size from "@/assets/bbsize.png";
import calendarIcon from "@/assets/calendar.png";
import clockIcon from "@/assets/clock.png";
import phoneIcon from "@/assets/phone-call.png";
import increaseIcon from "@/assets/increase.png";

export default function UserProfile() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [userData, setUserData] = useState({});
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingJourney, setIsEditingJourney] = useState(false);
  const [growthView, setGrowthView] = useState("today");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserData({
        name: user.displayName || "Mama",
        email: user.email || "No email",
        photo: user.photoURL && user.photoURL.trim() !== "" ? user.photoURL : ""
      });
    }
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-screen object-cover -z-20">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <StarStill />
      <div className="fixed top-0 left-0 w-full h-screen bg-white/50 backdrop-blur-sm -z-10"></div>
      <main className="min-h-screen px-6 py-10 font-sans text-[#234451] pt-32">
        <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex justify-between items-start w-full">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={userData.photo && userData.photo.trim() !== "" ? userData.photo : "https://i.pinimg.com/236x/40/41/6f/40416fe5cfc9de788b1fcd769c93013a.jpg"}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://i.pinimg.com/236x/40/41/6f/40416fe5cfc9de788b1fcd769c93013a.jpg";
                  }}
                  alt="profile"
                  className="w-20 h-20 rounded-full border-4 border-white object-cover cursor-pointer"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = async () => {
                        const base64 = reader.result;
                        setUserData((prev) => ({
                          ...prev,
                          photo: base64
                        }));

                        try {
                          await updateProfile(auth.currentUser, {
                            photoURL: base64
                          });
                        } catch (err) {
                          console.error("Failed to update photo:", err);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Hi {userData.name}!</h1>
                <div className="mt-2 flex gap-2">
                  {isEditingJourney ? (
                    <>
                      <input
                        type="text"
                        className="bg-white/60 border border-gray-300 text-[#234451] py-1 px-3 rounded-full text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
                        value={userData.tag1 || ""}
                        placeholder="Tag 1"
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, tag1: e.target.value }))
                        }
                      />
                      <input
                        type="text"
                        className="bg-white/60 border border-gray-300 text-[#234451] py-1 px-3 rounded-full text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
                        value={userData.tag2 || ""}
                        placeholder="Tag 2"
                        onChange={(e) =>
                          setUserData((prev) => ({ ...prev, tag2: e.target.value }))
                        }
                      />
                    </>
                  ) : (
                    <>
                      {userData.tag1 && (
                        <span className="bg-[#fbdde3] text-[#b15d6e] px-3 py-1 rounded-full text-xs font-semibold">
                          {userData.tag1}
                        </span>
                      )}
                      {userData.tag2 && (
                        <span className="bg-[#daf5e9] text-[#317e5a] px-3 py-1 rounded-full text-xs font-semibold">
                          {userData.tag2}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-[#9771bc] text-white text-sm px-4 py-1 rounded-md hover:bg-[#745295]"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal Info */}
          <div className="col-span-2 bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg text-left">Personal Information</h2>
              {!isEditingPersonal ? (
                <img
                  src={editIcon}
                  alt="edit"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setIsEditingPersonal(true)}
                />
              ) : (
                <button
                  className="bg-[#a48bc3] text-white px-4 py-1 rounded-md text-sm hover:bg-[#9771bc]"
                  onClick={async () => {
                    try {
                      if (auth.currentUser) {
                        await updateProfile(auth.currentUser, {
                          displayName: userData.name,
                          photoURL: userData.photo,
                        });
                        if (auth.currentUser.email !== userData.email) {
                          await updateEmail(auth.currentUser, userData.email);
                        }
                        toast.success("Changes saved successfully!");
                        setIsEditingPersonal(false);
                      }
                    } catch (error) {
                      console.error("Error updating profile:", error);
                      toast.error("Failed to save changes. Please try again.");
                    }
                  }}
                >
                  Save
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-left">Full Name</label>
                <input
                  type="text"
                  className="bg-white/60 border border-gray-300 text-[#234451] py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
                  value={userData.name}
                  readOnly={!isEditingPersonal}
                  onChange={isEditingPersonal ? (e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  : undefined}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-left">Email</label>
                <input
                  type="email"
                  className="bg-white/60 border border-gray-300 text-[#234451] py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
                  value={userData.email}
                  readOnly={!isEditingPersonal}
                  onChange={isEditingPersonal ? (e) =>
                    setUserData((prev) => ({ ...prev, email: e.target.value }))
                  : undefined}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-left">Phone Number</label>
                <input
                  type="tel"
                  className="bg-white/60 border border-gray-300 text-[#234451] py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
                  value={userData.phone || ""}
                  readOnly={!isEditingPersonal}
                  onChange={isEditingPersonal ? (e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  : undefined}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-left">Date of Birth</label>
                <input
                  type="date"
                  className="bg-white/60 border border-gray-300 text-[#234451] py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
                  value={userData.dob || ""}
                  readOnly={!isEditingPersonal}
                  onChange={isEditingPersonal ? (e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  : undefined}
                />
              </div>
            </div>
          </div>



          {/* Maternal Journey */}
          <div className="col-span-2 bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg text-left">Maternal Journey</h2>
              {!isEditingJourney ? (
                <img
                  src={editIcon}
                  alt="edit"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setIsEditingJourney(true)}
                />
              ) : (
                <button
                  className="bg-[#a48bc3] text-white px-4 py-1 rounded-md text-sm hover:bg-[#9771bc]"
                  onClick={() => {
                    try {
                      toast.success("Changes saved successfully!");
                      setIsEditingJourney(false);
                    } catch (error) {
                      console.error("Error saving changes:", error);
                      toast.error("Failed to save changes. Please try again.");
                    }
                  }}
                >
                  Save
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-left">Status</label>
                <select
                  className="bg-white/60 border border-gray-300 text-[#234451] py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
                  value={userData.status || ""}
                  disabled={!isEditingJourney}
                  onChange={isEditingJourney ? (e) =>
                    setUserData((prev) => ({ ...prev, status: e.target.value }))
                  : undefined}
                >
                  <option>Pregnant</option>
                  <option>Postpartum</option>
                  <option>Trying to Conceive</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-left">Due Date</label>
                <input
                  type="date"
                  className="bg-white/60 border border-gray-300 text-[#234451] py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
                  value={userData.dueDate || ""}
                  readOnly={!isEditingJourney}
                  onChange={isEditingJourney ? (e) =>
                    setUserData((prev) => ({ ...prev, dueDate: e.target.value }))
                  : undefined}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-left">Healthcare Provider</label>
                <input
                  type="text"
                  className="bg-white/60 border border-gray-300 text-[#234451] py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
                  value={userData.provider || ""}
                  readOnly={!isEditingJourney}
                  onChange={isEditingJourney ? (e) =>
                    setUserData((prev) => ({ ...prev, provider: e.target.value }))
                  : undefined}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-left">Emergency Contact</label>
                <input
                  type="text"
                  className="bg-white/60 border border-gray-300 text-[#234451] py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
                  value={userData.emergency || ""}
                  readOnly={!isEditingJourney}
                  onChange={isEditingJourney ? (e) =>
                    setUserData((prev) => ({ ...prev, emergency: e.target.value }))
                  : undefined}
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4">Preferences</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Daily Reminders</span>
                <input type="checkbox" className="toggle" checked readOnly />
              </div>
              <div className="flex items-center justify-between">
                <span>Email Updates</span>
                <input type="checkbox" className="toggle" checked readOnly />
              </div>
              <div className="flex items-center justify-between">
                <span>Community Notifications</span>
                <input type="checkbox" className="toggle" readOnly />
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow p-6 md:col-start-3 md:row-start-1">
            <h2 className="font-semibold text-lg mb-4">Upcoming Appointments</h2>
            <div className="bg-white/60 border border-gray-300 text-[#234451] rounded-xl p-4 shadow-lg flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Dr. Lila Everly"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="leading-tight space-y-0.5">
                    <p className="font-semibold text-sm">Dr. Lila Everly</p>
                    <p className="text-xs text-[#9771bc]">Gynecologist</p>
                  </div>
                </div>
                <div className="bg-[#9771bc] text-white p-2 rounded-full cursor-pointer flex items-center justify-center">
                  <img src={phoneIcon} alt="Phone" className="w-4 h-4" />
                </div>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <div className="flex items-center gap-1">
                  <img src={calendarIcon} alt="Calendar" className="w-4 h-4" /> <span>11 Dec. '24</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src={clockIcon} alt="Clock" className="w-4 h-4" /> <span>09:15 AM</span>
                </div>
              </div>
            </div>
          </div>
          {/* Growth Tracker */}
          <div className="col-span-3 bg-white/30 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-lg text-[#234451]">
            <h2 className="text-xl font-bold text-[#6f4fa1] mb-4">Growth tracker</h2>
            <div className="flex justify-start gap-6 mb-4">
              {["today", "weekly", "trimester"].map((view) => (
                <button
                  key={view}
                  className={`${
                    growthView === view
                      ? "bg-[#a48bc3] text-white"
                      : "bg-[#e8d8f8] text-[#6f4fa1]"
                  } text-sm font-medium px-4 py-1 rounded-full shadow`}
                  onClick={() => setGrowthView(view)}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4 items-center">
              {/* Illustration */}
              <div className="col-span-1 flex justify-center">
                <div className="w-40 h-40 rounded-full bg-[#e8d8f8] flex items-center justify-center relative">
                  <img
                    src={babyIcon}
                    alt="Fetus"
                    className="w-28 h-28 object-contain"
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                {/* Weight */}
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/50 p-2 rounded-xl">
                      <img src={weight} alt="Weight" className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#444]">Weight</p>
                      <p className="text-xl font-bold text-[#234451]">1,8 kg</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#f87171] font-semibold">
                    <img src={increaseIcon} alt="Increase" className="w-3 h-3 inline mr-1" />
                    3.6%
                  </p>
                </div>

                {/* Size */}
                <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/50 p-2 rounded-xl">
                      <img src={size} alt="Size" className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#444]">Size</p>
                      <p className="text-xl font-bold text-[#234451]">1.8 in</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#f87171] font-semibold">
                    <img src={increaseIcon} alt="Increase" className="w-3 h-3 inline mr-1" />
                    3.6%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Removed Edit/Save/Cancel buttons at the bottom */}
        </div>
      </main>
      <Footer />
    </>
  );
}
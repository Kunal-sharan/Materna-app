

import React from "react";
import { CalendarCheck, Heart, Users } from "lucide-react";

const MobileProfile = () => {
  return (
    <main className="p-4 space-y-6 bg-[#fffaf9] min-h-screen text-[#234451]">
      <header className="text-center space-y-1">
        <h1 className="text-2xl font-semibold">Welcome back, Mama 💕</h1>
        <p className="text-sm text-[#6b7280]">Here’s your journey at a glance</p>
      </header>

      {/* Symptom Tracker Summary */}
      <section className="bg-white rounded-xl shadow-md p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Heart className="text-pink-400" />
          <h2 className="text-lg font-semibold">Wellness & Symptoms</h2>
        </div>
        <p className="text-sm">Track how you’re feeling today or log symptoms.</p>
        <button className="w-full bg-[#a48bc3] text-white py-2 rounded-lg text-sm font-medium">
          Open Tracker
        </button>
      </section>

      {/* Appointments */}
      <section className="bg-white rounded-xl shadow-md p-4 space-y-2">
        <div className="flex items-center gap-2">
          <CalendarCheck className="text-green-500" />
          <h2 className="text-lg font-semibold">Next Appointment</h2>
        </div>
        <p className="text-sm">OB Check-up with Dr. Lee</p>
        <p className="text-xs text-gray-500">Aug 5, 2025 • 10:00 AM</p>
        <button className="w-full bg-[#234451] text-white py-2 rounded-lg text-sm font-medium">
          View All Appointments
        </button>
      </section>

      {/* Partner Access */}
      <section className="bg-white rounded-xl shadow-md p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Users className="text-[#bcb2da]" />
          <h2 className="text-lg font-semibold">Partner Access</h2>
        </div>
        <p className="text-sm">Your partner is connected and can view key updates.</p>
        <button className="w-full border border-[#a48bc3] text-[#a48bc3] py-2 rounded-lg text-sm font-medium">
          Manage Access
        </button>
      </section>

      {/* Settings Link */}
      <footer className="text-center text-xs text-gray-400 pt-6">
        <p>Need to update preferences? Visit your <span className="underline text-[#a48bc3]">settings</span>.</p>
      </footer>
    </main>
  );
};

export default MobileProfile;
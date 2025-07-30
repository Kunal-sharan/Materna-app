import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarStill } from "@/components/StarStill";
import bgVideo from "@/assets/sky1.mp4";

const SCHEDULES = {
  USA: [
    { name: "Hepatitis B", dueDay: 0, info: "First dose at birth." },
    { name: "DTaP", dueDay: 60, info: "First dose at 2 months." },
    { name: "Polio (IPV)", dueDay: 60, info: "First dose at 2 months." },
    { name: "MMR", dueDay: 365, info: "First dose at 12 months." },
  ],
  Malaysia: [
    { name: "BCG", dueDay: 0, info: "At birth." },
    { name: "Hepatitis B", dueDay: 0, info: "First dose at birth." },
    { name: "DTP", dueDay: 60, info: "First dose at 2 months." },
    { name: "Polio", dueDay: 60, info: "First dose at 2 months." },
    { name: "Measles", dueDay: 270, info: "First dose at 9 months." },
  ],
  UK: [
    { name: "6-in-1 Vaccine", dueDay: 56, info: "First dose at 8 weeks." },
    { name: "Rotavirus", dueDay: 56, info: "First dose at 8 weeks." },
    { name: "MenB", dueDay: 56, info: "First dose at 8 weeks." },
    { name: "Pneumococcal (PCV)", dueDay: 56, info: "First dose at 8 weeks." },
    { name: "MMR", dueDay: 365, info: "First dose at 12 months." },
  ],
  India: [
    { name: "BCG", dueDay: 0, info: "At birth." },
    { name: "Hepatitis B", dueDay: 0, info: "First dose at birth." },
    { name: "OPV", dueDay: 45, info: "First dose at 6 weeks." },
    { name: "Pentavalent", dueDay: 45, info: "First dose at 6 weeks." },
    { name: "MMR", dueDay: 270, info: "First dose at 9 months." },
  ],
};

const pastelBg = "linear-gradient(135deg, #eaf6ff 0%, #f6eaff 100%)";
const pastelCard = "bg-white bg-opacity-80";

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function daysBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}



function VaccineCard({
  vaccine,
  dueDate,
  completed,
  completedDate,
  onToggle,
  onDateChange,
  expanded,
  onExpand,
}) {
  return (
    <div
      className={`${pastelCard} rounded-2xl shadow-md p-4 mb-4 transition-all`}
      style={{
        borderLeft: completed
          ? "6px solid #bcb2da"
          : "6px solid #a48bc3",
        background: completed ? "#fef6f5" : "rgba(255,255,255,0.9)",
      }}
    >
      <div className="flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={onExpand}
        >
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              completed ? "bg-[#bcb2da]" : "bg-[#a48bc3]"
            }`}
          />
          <span className="font-semibold text-lg text-[#234451]">
            {vaccine.name}
          </span>
          <span className="ml-2 text-xs text-gray-500">
            {dueDate ? `Due: ${formatDate(dueDate)}` : ""}
          </span>
        </div>
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={completed}
            onChange={onToggle}
            className="accent-[#DFA69F] w-5 h-5"
          />
          <span className="text-xs text-gray-500">Completed</span>
        </label>
      </div>
      {expanded && (
        <div className="mt-3 ml-6">
          <div className="text-gray-700 mb-2">{vaccine.info}</div>
          <div className="flex gap-3 items-center">
            <span className="text-sm text-gray-600">Completion date:</span>
            <input
              type="date"
              value={completedDate ? formatDate(new Date(completedDate)) : ""}
              disabled={!completed}
              onChange={e => onDateChange(e.target.value)}
              className="rounded-lg px-2 py-1 bg-gray-50 border border-gray-200"
              style={{ minWidth: 120 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function UpcomingReminders({ schedule, completed, birthdate }) {
  if (!birthdate) return null;
  const today = new Date();
  const upcoming = schedule
    .map((v, idx) => {
      const dueDate = addDays(birthdate, v.dueDay);
      return {
        ...v,
        dueDate,
        completed: completed[idx]?.completed,
      };
    })
    .filter(v => !v.completed && v.dueDate >= today)
    .sort((a, b) => a.dueDate - b.dueDate)
    .slice(0, 2);
  if (!upcoming.length) return null;
  return (
    <div
      className={`${pastelCard} rounded-2xl shadow p-4 mb-4 flex flex-col gap-2`}
    >
      <div className="text-base font-semibold text-[#a48bc3] mb-1">
        Upcoming Vaccines
      </div>
      {upcoming.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[#234451] font-medium">{v.name}</span>
          <span className="text-xs text-gray-500">
            {daysBetween(today, v.dueDate) === 0
              ? "Today!"
              : `in ${daysBetween(today, v.dueDate)} days`}
          </span>
        </div>
      ))}
    </div>
  );
}

function FloatingTeddy({ show }) {
  // Cute teddy bear svg floating at bottom right
  if (!show) return null;
  return (
    <div
      className="fixed z-30"
      style={{
        right: 24,
        bottom: 24,
        pointerEvents: "none",
        animation: "teddyfloat 2.8s ease-in-out infinite alternate",
      }}
    >
      {/* SVG Teddy */}
      <svg width="64" height="64" viewBox="0 0 64 64">
        <ellipse cx="32" cy="40" rx="18" ry="18" fill="#fff6e6" />
        <ellipse cx="20" cy="22" rx="8" ry="8" fill="#e3c6a8" />
        <ellipse cx="44" cy="22" rx="8" ry="8" fill="#e3c6a8" />
        <ellipse cx="32" cy="38" rx="16" ry="16" fill="#f5d2a8" />
        <ellipse cx="24" cy="36" rx="2.5" ry="4" fill="#fff" />
        <ellipse cx="40" cy="36" rx="2.5" ry="4" fill="#fff" />
        <ellipse cx="24" cy="37" rx="1" ry="2" fill="#7c5b44" />
        <ellipse cx="40" cy="37" rx="1" ry="2" fill="#7c5b44" />
        <ellipse cx="32" cy="44" rx="3" ry="2" fill="#7c5b44" />
        <ellipse cx="32" cy="47" rx="5" ry="2" fill="#fff" />
      </svg>
      <style>
        {`
        @keyframes teddyfloat {
          0% { transform: translateY(0);}
          100% { transform: translateY(-18px);}
        }
        `}
      </style>
    </div>
  );
}

export default function Vaccines() {
  const [country, setCountry] = useState("USA");
  const [birthdate, setBirthdate] = useState("");
  const [completed, setCompleted] = useState([]);
  const [expanded, setExpanded] = useState({});
  const idleTimer = useRef();
  const [showTeddy, setShowTeddy] = useState(false);

  // Reset completed state if schedule changes
  useEffect(() => {
    setCompleted(
      SCHEDULES[country].map(() => ({
        completed: false,
        completedDate: "",
      }))
    );
    setExpanded({});
  }, [country]);

  // Teddy bear easter egg: show after 18s idle
  useEffect(() => {
    const reset = () => {
      setShowTeddy(false);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setShowTeddy(true), 18000);
    };
    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    reset();
    return () => {
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("keydown", reset);
      clearTimeout(idleTimer.current);
    };
  }, []);

  const handleComplete = idx => {
    setCompleted(prev =>
      prev.map((v, i) =>
        i === idx
          ? {
              ...v,
              completed: !v.completed,
              completedDate: !v.completed
                ? formatDate(new Date())
                : "",
            }
          : v
      )
    );
  };
  const handleDateChange = (idx, date) => {
    setCompleted(prev =>
      prev.map((v, i) => (i === idx ? { ...v, completedDate: date } : v))
    );
  };
  const handleExpand = idx => {
    setExpanded(prev => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const schedule = SCHEDULES[country];
  let birthDateObj = birthdate ? new Date(birthdate) : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden pt-32 p-8">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed top-0 left-0 w-full h-screen object-cover -z-10"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <StarStill />
        <div className="fixed top-0 left-0 w-full h-screen bg-white/50 backdrop-blur-sm -z-10"></div>

        <div className="relative z-10 max-w-2xl mx-auto rounded-3xl p-6 sm:p-10 bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="w-full">
              <h1 className="text-3xl font-bold text-[#234451] mb-1 text-left">
                Vaccination Reminder
              </h1>
              <div className="text-[#a48bc3] font-medium text-base text-left">
                Track your baby's vaccines with gentle reminders.
              </div>
            </div>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="bg-white border border-gray-300 text-[#234451] font-medium px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a48bc3]"
            >
              <option value="USA">🇺🇸 USA</option>
              <option value="Malaysia">🇲🇾 Malaysia</option>
              <option value="UK">🇬🇧 UK</option>
              <option value="India">🇮🇳 India</option>
            </select>
          </div>
          {/* Birthdate input */}
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
            <label className="text-[#234451] font-medium">
              Baby's Birthdate:
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={e => setBirthdate(e.target.value)}
              className="rounded-xl px-3 py-2 bg-gray-50 border border-gray-200 text-[#234451] font-semibold"
              style={{ minWidth: 160 }}
            />
          </div>
          {/* Dashboard */}
          <UpcomingReminders
            schedule={schedule}
            completed={completed}
            birthdate={birthDateObj}
          />
          {/* Vaccine cards */}
          <div>
            {schedule.map((v, idx) => (
              <VaccineCard
                key={v.name}
                vaccine={v}
                dueDate={birthDateObj ? addDays(birthDateObj, v.dueDay) : null}
                completed={completed[idx]?.completed}
                completedDate={completed[idx]?.completedDate}
                onToggle={() => handleComplete(idx)}
                onDateChange={date => handleDateChange(idx, date)}
                expanded={!!expanded[idx]}
                onExpand={() => handleExpand(idx)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingTeddy show={showTeddy} />
      {/* Responsive tweaks */}
      <style>
        {`
        @media (max-width: 640px) {
          main > div {
            padding: 1.25rem !important;
            border-radius: 1.2rem !important;
          }
        }
        `}
      </style>
    </>
  );
}
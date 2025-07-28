import React, { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import bgVideo from "@/assets/sky1.mp4";
import { StarStill } from "@/components/StarStill.jsx";

// Example milestone data for months 1-12
const MILESTONES_BY_MONTH = [
  {
    month: 1,
    milestones: ["Responds to sounds", "Begins to smile", "Moves arms and legs"],
  },
  {
    month: 2,
    milestones: ["Holds head up", "Coos and makes gurgling sounds"],
  },
  {
    month: 3,
    milestones: ["Follows moving objects", "Begins to babble", "Recognizes faces"],
  },
  {
    month: 4,
    milestones: ["Rolls over from tummy to back", "Laughs aloud"],
  },
  {
    month: 5,
    milestones: ["Reaches for toys", "Shows curiosity"],
  },
  {
    month: 6,
    milestones: ["Sits with support", "Responds to own name"],
  },
  {
    month: 7,
    milestones: ["Transfers objects between hands", "Begins to crawl"],
  },
  {
    month: 8,
    milestones: ["Stands with support", "Plays peek-a-boo"],
  },
  {
    month: 9,
    milestones: ["Pulls to stand", "Understands 'no'"],
  },
  {
    month: 10,
    milestones: ["Waves bye-bye", "Picks things up with thumb and finger"],
  },
  {
    month: 11,
    milestones: ["Cruises along furniture", "Shows preferences for people/toys"],
  },
  {
    month: 12,
    milestones: ["May take first steps", "Says simple words like 'mama' or 'dada'"],
  },
];

// Flatten all milestones for the checklist, adding month info
const getInitialMilestoneList = () => {
  let id = 1;
  const list = [];
  MILESTONES_BY_MONTH.forEach((monthObj) => {
    monthObj.milestones.forEach((m) => {
      list.push({
        id: id++,
        month: monthObj.month,
        text: m,
        checked: false,
        note: "",
        image: null,
        imageUrl: "",
      });
    });
  });
  return list;
};

export default function Milestones() {
  const [milestones, setMilestones] = useState(getInitialMilestoneList());
  const [customMilestone, setCustomMilestone] = useState("");
  const [filterMonth, setFilterMonth] = useState(null);
  const fileInputs = useRef({});
  const trackerRef = useRef();

  // Handle checking/unchecking a milestone
  const handleCheck = (id) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, checked: !m.checked } : m
      )
    );
  };

  // Handle adding a custom milestone
  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customMilestone.trim()) return;
    setMilestones((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((m) => m.id)) + 1 : 1,
        month: filterMonth || 1,
        text: customMilestone,
        checked: false,
        note: "",
        image: null,
        imageUrl: "",
      },
    ]);
    setCustomMilestone("");
  };

  // Handle journal note change
  const handleNoteChange = (id, note) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, note } : m))
    );
  };

  // Handle image upload
  const handleImageChange = (id, file) => {
    if (!file) return;
    const reader = new window.FileReader();
    reader.onloadend = () => {
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, image: file, imageUrl: reader.result }
            : m
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteMilestone = (id) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  // Group milestones by month for display
  const milestonesByMonth = milestones.reduce((acc, m) => {
    if (!acc[m.month]) acc[m.month] = [];
    acc[m.month].push(m);
    return acc;
  }, {});

  // Export as PDF handler using html2canvas and jsPDF
  const handleExportPDF = async () => {
    if (!trackerRef.current) {
      console.warn("No tracker section found to export.");
      return;
    }

    try {
      const canvas = await html2canvas(trackerRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("milestone_tracker.pdf");
    } catch (err) {
      console.error("PDF export failed:", err);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden pt-32 p-8 font-inter">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-screen object-cover -z-10"
        >
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <StarStill />
        {/* Blurred Overlay */}
        <div className="fixed top-0 left-0 w-full h-screen bg-[#fff]/50 backdrop-blur-sm -z-10"></div>
        {/* Main Content */}
        <div className="relative z-10 font-inter">


          {/* Developmental Milestones Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-[#fff]/20 rounded-2xl shadow-lg p-6 mb-2">
              <div className="flex items-center mb-2">
                <span className="text-xl font-bold text-[#234451] mr-2">Developmental Milestones</span>
                <span className="ml-auto text-sm text-[#234451]/50" title="Milestones are general guides!">
                  REMINDER: Every baby is different. This is a general guide.
                </span>
              </div>
              <div className="overflow-x-auto">
                <div className="relative flex gap-8 py-6 px-4 min-w-[900px]">
                  {MILESTONES_BY_MONTH.map((month) => (
                    <div
                      key={month.month}
                      className="relative z-10 min-w-[200px] max-w-[200px] bg-white border border-[#a48bc3] rounded-xl shadow-lg p-4 text-[#234451] flex-shrink-0"
                    >
                      <h3 className="text-[#a48bc3] font-bold text-lg mb-2 text-left">Month {month.month}</h3>
                      <ul className="list-disc pl-4 text-sm space-y-1 text-left">
                        {month.milestones.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Customizable Tracker Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div ref={trackerRef} className="bg-[#fff]/20 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-[#234451]">Milestone Tracker</span>
                <select
                  className="rounded-lg border border-[#bcb2da] px-2 py-1 bg-white text-[#234451] focus:outline-none focus:ring-2 focus:ring-[#DFA69F]"
                  value={filterMonth || ""}
                  onChange={(e) => setFilterMonth(e.target.value ? Number(e.target.value) : null)}
                >
                  <option value="">All Months</option>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Month {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {/* Checklist UI */}
              <div>
                {Object.keys(milestonesByMonth)
                  .map((m) => Number(m))
                  .filter((month) => !filterMonth || month === filterMonth)
                  .sort((a, b) => a - b)
                  .map((month) => {
                  const list = milestonesByMonth[month] || [];
                  if (!list.length) return null;
                  return (
                    <div key={month} className="mb-6">
                      <div className="text-[#234451] font-semibold mb-2 text-base">
                        Month {month}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {list.map((m) => (
                          <div
                            key={m.id}
                            className="bg-white rounded-xl shadow p-4 flex flex-col"
                          >
                            <label className="flex items-center gap-2 mb-1">
                              <input
                                type="checkbox"
                                checked={m.checked}
                                onChange={() => handleCheck(m.id)}
                                className="accent-[#DFA69F] w-5 h-5"
                              />
                              <span
                                className={`font-medium ${
                                  m.checked ? "text-[#a48bc3] line-through" : "text-[#234451]"
                                }`}
                              >
                                {m.text}
                              </span>
                              {m.id > MILESTONES_BY_MONTH.flatMap(m => m.milestones).length && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMilestone(m.id)}
                                  className="ml-auto text-xs text-red-500 underline hover:text-red-700"
                                >
                                  Delete
                                </button>
                              )}
                            </label>
                            {/* Photo upload & journal */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-2">
                              {/* Image Upload */}
                              <div className="flex flex-col items-center">
                                {m.imageUrl ? (
                                  <img
                                    src={m.imageUrl}
                                    alt="Milestone"
                                    className="w-16 h-16 object-cover rounded-lg shadow mb-1"
                                  />
                                ) : (
                                  <div className="w-16 h-16 bg-[#DFA69F]/20 rounded-lg flex items-center justify-center text-[#DFA69F] mb-1">
                                    <svg width="24" height="24" fill="currentColor" className="opacity-40">
                                      <path d="M12 5a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0V10H7a1 1 0 1 1 0-2h2V6a1 1 0 0 1 1-1zm-6 14a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.17a3 3 0 0 1 5.66 0H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6zm6-14a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-6 2v10h12V7H6zm2 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-7z"></path>
                                    </svg>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  ref={el => (fileInputs.current[m.id] = el)}
                                  onChange={e =>
                                    handleImageChange(m.id, e.target.files && e.target.files[0])
                                  }
                                />
                                <button
                                  type="button"
                                  className="text-xs text-[#DFA69F] underline hover:text-[#a48bc3]"
                                  onClick={() => fileInputs.current[m.id]?.click()}
                                >
                                  {m.imageUrl ? "Change Photo" : "Add Photo"}
                                </button>
                              </div>
                              {/* Journal */}
                              <div className="flex-1">
                                <textarea
                                  className="w-full rounded-lg border border-[#bcb2da] bg-[#bcb2da]/10 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#DFA69F]"
                                  placeholder="Add a note or memory..."
                                  value={m.note}
                                  onChange={e => handleNoteChange(m.id, e.target.value)}
                                  rows={2}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              {filterMonth && (
                <form
                  className="flex flex-col sm:flex-row items-center gap-2 sm:mt-4"
                  onSubmit={handleAddCustom}
                >
                  <input
                    type="text"
                    className="rounded-lg border border-[#bcb2da] px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#DFA69F] bg-[#bcb2da]/10 text-[#234451]"
                    placeholder="Add custom milestone"
                    value={customMilestone}
                    onChange={(e) => setCustomMilestone(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-[#DFA69F] text-white font-semibold px-4 py-1.5 rounded-lg shadow hover:bg-[#b8796e] transition"
                  >
                    Add
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
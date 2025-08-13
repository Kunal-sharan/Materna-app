import bgVideo from "@/assets/sky1.mp4";
import editIcon from "@/assets/editing.png";
import nextIcon from "@/assets/next.png";
import backIcon from "@/assets/back.png";
import angryFace from "@/assets/mood/angry-face.png";
import annoyed from "@/assets/mood/annoyed.png";
import crying from "@/assets/mood/crying.png";
import happy from "@/assets/mood/happy.png";
import puke from "@/assets/mood/puke.png";
import sleeping from "@/assets/mood/sleeping.png";
import smile from "@/assets/mood/smile.png";
import unhappy from "@/assets/mood/unhappy.png";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarStill } from "@/components/StarStill.jsx";
import backPainIcon from "@/assets/journal_symptom/backpain.png";
import braxtonIcon from "@/assets/journal_symptom/braxton.png";
import breastTenderIcon from "@/assets/journal_symptom/breast-tender.png";
import crampIcon from "@/assets/journal_symptom/cramp.png";
import difficultyBreathingIcon from "@/assets/journal_symptom/difficulty-breathing.png";
import drySkinIcon from "@/assets/journal_symptom/dry-skin.png";
import insomniaIcon from "@/assets/journal_symptom/insomnia.png";
import nasalCongestionIcon from "@/assets/journal_symptom/nasal-congestion.png";
import stomachIcon from "@/assets/journal_symptom/stomach.png";
import swellingIcon from "@/assets/journal_symptom/swelling.png";
import toiletIcon from "@/assets/journal_symptom/toilet.png";

const Journal = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mood, setMood] = useState(smile);
  const [energy, setEnergy] = useState(70);
  const [notes, setNotes] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [entryLog, setEntryLog] = useState({});
  const [newSymptom, setNewSymptom] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  // New state for login prompt
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [weeksPregnant, setWeeksPregnant] = useState(() => {
    const saved = localStorage.getItem("maternaWeeks");
    return saved ? parseInt(saved, 10) : 18; // default if not set
  });
  const [predictionFeedback, setPredictionFeedback] = useState({});
  const [lookingAheadOpen, setLookingAheadOpen] = useState(false);

  // Symptom suggestions for autofill dropdown
  const symptomSuggestions = [
    "Larger belly and breasts",
    "Lower back pain",
    "Braxton Hicks contractions",
    "Skin changes",
    "More melanin",
    "Melasma",
    "Linea Nigra",
    "Stretch marks",
    "Nosebleed",
    "Dental issues",
    "Dizziness",
    "Leg cramps",
    "Vaginal discharge",
    "Urinary tract infections",
    "Missed period",
    "Light bleeding / spotting",
    "Cramping",
    "Breast changes or tenderness",
    "Darkened areolas",
    "Morning sickness / nausea",
    "Vomiting",
    "Increased urination",
    "Fatigue/tired",
    "Mood changes / irritability",
    "Bloating",
    "Lower backaches",
    "Nasal congestion",
    "Headaches",
    "Constipation",
    "Smell sensitivity",
    "Heartburn / acid reflux",
    "Increased heart rate / blood flow",
    "Shortness of breath after small physical tasks",
    "Back aches",
    "Shortness of breath",
    "Heart palpitations",
    "Frequent urination",
    "Swollen feet and ankles",
    "Insomnia",
    "Nesting",
    "Varicose veins and hemorrhoids",
    "Spider veins",
    "Food cravings",
    "Bleeding gums",
    "Itchy skin",
    "Overheated",
    "Irrational fear/ vivid dreams",
    "Panic attack",
    "Pelvic pain",
    "Round ligament pain",
    "Colostrum leakage",
    "Joint pain",
    "Carpal tunnel syndrome",
    "Forgetfulness / brain fog",
    "Gas",
    "Diarrhea",
    "Anemia",
    "Pica (craving non-food items)",
    "Anxiety",
    "Depression",
    "Vision changes",
    "Swelling",
    "Thirst",
    "High BP (blood pressure)",
  ];

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    document.body.classList.add("journal-page");
    document.documentElement.classList.add("journal-page");

    const token = localStorage.getItem("maternaUserToken");
    setIsLoggedIn(!!token);

    return () => {
      document.body.classList.remove("journal-page");
      document.documentElement.classList.remove("journal-page");
    };
  }, []);
  useEffect(() => {
    localStorage.setItem("maternaWeeks", String(weeksPregnant));
  }, [weeksPregnant]);

  const moods = [
    angryFace,
    happy,
    crying,
    unhappy,
    sleeping,
    puke,
    smile,
    annoyed,
  ];
  const pastelColors = [
    "#ffe0e0", // light red
    "#fff5cc", // light yellow
    "#e0f7fa", // light cyan
    "#e6e6ff", // light violet
    "#f9e6ff", // light pink
    "#e0ffe0", // light green
    "#fff0e6", // peach
    "#e0e6ff", // periwinkle
  ];

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEntry = () => {
    const key = selectedDate.toDateString();
    setEntryLog({
      ...entryLog,
      [key]: {
        mood,
        energy,
        notes,
        symptoms,
      },
    });
    setIsEditing(false);
  };

  const loadEntry = (date) => {
    const key = date.toDateString();
    const entry = entryLog[key];
    if (entry) {
      setMood(entry.mood);
      setEnergy(entry.energy);
      setNotes(entry.notes);
      setSymptoms(entry.symptoms);
    } else {
      setMood(smile);
      setEnergy(70);
      setNotes("");
      setSymptoms([]);
    }
  };

  const handleDayClick = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    loadEntry(newDate);
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleAddSymptom = () => {
    if (newSymptom.trim() !== "") {
      setSymptoms([...symptoms, newSymptom.trim()]);
      setNewSymptom("");
    }
  };

  const past7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const weeklyMoods = past7Days.map((date) => {
    const key = date.toDateString();
    return entryLog[key]?.mood || "";
  });

  const moodCounts = moods.reduce((acc, m) => ({ ...acc, [m]: 0 }), {});
  const symptomCounts = {};

  Object.values(entryLog).forEach((entry) => {
    if (entry.mood) moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    entry.symptoms.forEach((symptom) => {
      symptomCounts[symptom] = (symptomCounts[symptom] || 0) + 1;
    });
  });

  const totalMoodEntries = Object.values(moodCounts).reduce((a, b) => a + b, 0);

  // --- Wellness Tips & Prediction Helper Functions ---
  const getTrimester = (weeks) => (weeks < 14 ? 1 : weeks < 28 ? 2 : 3);

  const computePredictions = (weeks, symptomCounts) => {
    const tri = getTrimester(weeks);
    const base = [];
    // Icon mapping for each label
    if (tri === 1) {
      base.push(
        {
          label: "Morning sickness",
          icon: puke,
          prob: 65,
          tip: "Small, frequent meals and ginger tea can help.",
        },
        {
          label: "Fatigue",
          icon: sleeping,
          prob: 70,
          tip: "Short naps, hydration, and light walks.",
        },
        {
          label: "Mood changes",
          icon: unhappy,
          prob: 50,
          tip: "Gentle movement and journaling can stabilize mood.",
        },
        {
          label: "Frequent urination",
          icon: toiletIcon,
          prob: 55,
          tip: "Plan breaks and avoid fluids right before bed.",
        },
        {
          label: "Breast tenderness",
          icon: breastTenderIcon,
          prob: 45,
          tip: "Supportive bras and warm compresses.",
        },
      );
    }

    if (tri === 2) {
      base.push(
        {
          label: "Back aches",
          icon: backPainIcon,
          prob: 60,
          tip: "Prenatal stretches and supportive pillows.",
        },
        {
          label: "Leg cramps",
          icon: crampIcon,
          prob: 65,
          tip: "Hydration and magnesium-rich foods (if approved).",
        },
        {
          label: "Skin changes",
          icon: drySkinIcon,
          prob: 40,
          tip: "Moisturize and use SPF daily.",
        },
        {
          label: "Heartburn",
          icon: stomachIcon,
          prob: 50,
          tip: "Smaller meals; avoid late-night spicy/acidic foods.",
        },
        {
          label: "Nasal congestion",
          icon: nasalCongestionIcon,
          prob: 35,
          tip: "Humidifier and saline rinses.",
        },
      );
    }

    if (tri === 3) {
      base.push(
        {
          label: "Swelling",
          icon: swellingIcon,
          prob: 60,
          tip: "Elevate feet, hydrate, and wear comfy footwear.",
        },
        {
          label: "Shortness of breath",
          icon: difficultyBreathingIcon,
          prob: 55,
          tip: "Slow the pace and try side-sleeping.",
        },
        {
          label: "Braxton Hicks",
          icon: braxtonIcon,
          prob: 50,
          tip: "Hydrate, rest, and time contractions.",
        },
        {
          label: "Insomnia",
          icon: insomniaIcon,
          prob: 65,
          tip: "Wind-down routine; limit screens before bed.",
        },
        {
          label: "Back aches",
          icon: backPainIcon,
          prob: 60,
          tip: "Pillows and posture support.",
        },
      );
    }

    // Universal item
    base.push({
      label: "Headaches",
      icon: angryFace,
      prob: 30,
      tip: "Hydrate, take breaks, dim bright screens.",
    });

    // Adjust using user's recent symptom history
    const lowered = Object.keys(symptomCounts).map((k) => k.toLowerCase());
    const bump = (label, keywords) => {
      const hit = lowered.some((k) =>
        keywords.some((word) => k.includes(word)),
      );
      if (hit) {
        const item = base.find((p) => p.label === label);
        if (item) item.prob = Math.min(95, item.prob + 15);
      }
    };

    bump("Morning sickness", ["nausea", "morning", "vomit"]);
    bump("Fatigue", ["fatigue", "tired"]);
    bump("Mood changes", ["mood", "anxiety", "depression"]);
    bump("Back aches", ["back"]);
    bump("Leg cramps", ["cramp", "leg"]);
    bump("Skin changes", ["skin", "melasma", "linea", "stretch"]);
    bump("Heartburn", ["heartburn", "acid"]);
    bump("Nasal congestion", ["nasal", "congestion", "nose"]);
    bump("Swelling", ["swelling", "swollen", "edema"]);
    bump("Shortness of breath", ["shortness of breath", "breath"]);
    bump("Braxton Hicks", ["braxton"]);
    bump("Insomnia", ["insomnia", "sleep"]);
    bump("Headaches", ["headache"]);

    base.sort((a, b) => b.prob - a.prob);
    return base.slice(0, 6);
  };

  const handleFeedback = (label, happened) => {
    setPredictionFeedback((prev) => ({
      ...prev,
      [label]: happened ? "yes" : "no",
    }));
  };


  const trimester = getTrimester(weeksPregnant);
  const predictions = computePredictions(weeksPregnant, symptomCounts);

  return (
    <>
      <Navbar />
      <div
        onClick={() => {
          if (!isLoggedIn) setShowLoginPrompt(true);
        }}
      >
        <main className="min-h-screen pt-32 px-8 relative overflow-hidden">
          <video
            key={bgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="fixed top-0 left-0 w-full h-screen object-cover -z-10 opacity-100"
          >
            <source src={bgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <StarStill />
          <div className="fixed top-0 left-0 w-full h-screen bg-white/40 backdrop-blur-sm -z-10"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white/60 backdrop-blur-md border border-white/20 rounded-lg shadow px-6 pt-9 pb-0">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold leading-6">
                    {monthNames[currentMonth]} {currentYear}
                  </h2>
                  <div className="flex space-x-2 items-center">
                    <button onClick={prevMonth}>
                      <img
                        src={backIcon}
                        alt="Previous"
                        className="w-6 h-6 hover:scale-110 transition-transform"
                      />
                    </button>
                    <button onClick={nextMonth}>
                      <img
                        src={nextIcon}
                        alt="Next"
                        className="w-6 h-6 hover:scale-110 transition-transform"
                      />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 text-center text-[#234451] font-medium">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (d) => (
                      <div key={d}>{d}</div>
                    ),
                  )}
                </div>
                <div className="grid grid-cols-7 text-center mt-2 gap-y-4 text-[#234451]">
                  {(() => {
                    const firstDay = new Date(
                      currentYear,
                      currentMonth,
                      1,
                    ).getDay();
                    const daysInMonth = new Date(
                      currentYear,
                      currentMonth + 1,
                      0,
                    ).getDate();
                    const totalCells =
                      Math.ceil((firstDay + daysInMonth) / 7) * 7;
                    const daysArray = [];
                    for (let i = 0; i < totalCells; i++) {
                      const dayNum = i - firstDay + 1;
                      if (i < firstDay || dayNum > daysInMonth) {
                        daysArray.push(<div key={i}></div>);
                      } else {
                        const isSelected =
                          selectedDate.getDate() === dayNum &&
                          selectedDate.getMonth() === currentMonth &&
                          selectedDate.getFullYear() === currentYear;
                        daysArray.push(
                          <div
                            key={i}
                            className="relative"
                            onClick={() => handleDayClick(dayNum)}
                          >
                            <div
                              className={`inline-block w-8 h-8 leading-8 rounded-full cursor-pointer transition-colors duration-200 ${isSelected ? "bg-[#DFA69F] text-white" : "hover:bg-[#234451]/20 text-[#234451]"}`}
                            >
                              {dayNum}
                            </div>
                            {(() => {
                              const entry =
                                entryLog[
                                  new Date(
                                    currentYear,
                                    currentMonth,
                                    dayNum,
                                  ).toDateString()
                                ];
                              return (
                                <div className="flex justify-center mt-1 space-x-1 h-2">
                                  {entry?.symptoms?.length > 0 && (
                                    <div className="w-2 h-2 bg-[#99C8C1] rounded-full"></div>
                                  )}
                                  {entry?.mood && (
                                    <div className="w-2 h-2 bg-[#C88E88] rounded-full"></div>
                                  )}
                                </div>
                              );
                            })()}
                          </div>,
                        );
                      }
                    }
                    return daysArray;
                  })()}
                </div>
                <div className="flex justify-center space-x-4 mt-6 mb-1 text-sm text-[#234451]">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[#99C8C1] rounded-full"></div>
                    <span>Physical Symptoms</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-[#DFA69F] rounded-full"></div>
                    <span>Mood Entry</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-lg shadow p-6 space-y-4">
                <div className="flex justify-end items-center">
                  {isEditing ? (
                    <button
                      onClick={handleSaveEntry}
                      className="bg-[#DFA69F] text-white text-xs px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button onClick={toggleEdit}>
                      <img
                        src={editIcon}
                        alt="Edit"
                        className="w-5 h-5 inline hover:scale-110 transition-transform"
                      />
                    </button>
                  )}
                </div>
                <div>
                  <p className="text-sm text-[#234451]">
                    How are you feeling today?
                  </p>
                  <div className="relative w-48 h-48 mx-auto my-4">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <svg
                        viewBox="0 0 100 100"
                        className="absolute inset-0 w-full h-full"
                      >
                        {moods.map((_, i) => {
                          const startAngle = (360 / moods.length) * i;
                          const endAngle = (360 / moods.length) * (i + 1);
                          const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                          const polarToCartesian = (angle) => {
                            const rad = (angle - 90) * (Math.PI / 180);
                            return {
                              x: 50 + 50 * Math.cos(rad),
                              y: 50 + 50 * Math.sin(rad),
                            };
                          };

                          const start = polarToCartesian(startAngle);
                          const end = polarToCartesian(endAngle);

                          const d = `
                            M 50 50
                            L ${start.x} ${start.y}
                            A 50 50 0 ${largeArc} 1 ${end.x} ${end.y}
                            Z
                          `;

                          return <path key={i} d={d} fill={pastelColors[i]} />;
                        })}
                      </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={mood}
                        alt="Selected mood"
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {moods.map((m, i) => {
                          // Center each emoji image in its wedge
                          const angle =
                            (360 / moods.length) * i -
                            90 +
                            360 / moods.length / 2;
                          const radians = (angle * Math.PI) / 180;
                          const x = 50 + 38 * Math.cos(radians);
                          const y = 50 + 38 * Math.sin(radians);
                          return (
                            <img
                              key={i}
                              src={m}
                              alt={`Mood ${i}`}
                              onClick={() => isEditing && setMood(m)}
                              className={`absolute w-6 h-6 object-contain transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition ${m === mood ? "scale-125" : ""}`}
                              style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                opacity: isEditing ? 1 : 0.4,
                                pointerEvents: isEditing ? "auto" : "none",
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-[#234451]">
                    Energy Level: {energy}%
                  </div>
                  <div className="relative mt-4 w-full h-6 rounded-full bg-[#fff] shadow-inner overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-[#DFA69F]"
                      style={{ width: `${energy}%` }}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={energy}
                      onChange={(e) => setEnergy(e.target.value)}
                      className="w-full h-full opacity-0 cursor-pointer"
                      disabled={!isEditing}
                      style={{
                        opacity: isEditing ? 1 : 0.4,
                        cursor: isEditing ? "pointer" : "not-allowed",
                      }}
                    />
                    <div className="absolute -bottom-3 left-0 h-6 w-full pointer-events-none">
                      <div
                        className="absolute h-6 w-6 rounded-full shadow-md transform -translate-y-1/2"
                        style={{
                          left: `calc(${energy}% - 12px)`,
                          backgroundColor: "#B87872",
                          opacity: isEditing ? 1 : 0.4,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Symptoms</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {symptoms.map((s, i) => (
                      <span
                        key={i}
                        className="bg-[#fff] text-sm px-2 py-1 rounded-full flex items-center gap-1 group"
                      >
                        {s}
                        {isEditing && (
                          <button
                            onClick={() =>
                              setSymptoms(
                                symptoms.filter((_, index) => index !== i),
                              )
                            }
                            className="text-xs text-[#234451] hidden group-hover:inline"
                          >
                            ✕
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="mt-2 flex flex-col gap-2 relative">
                      <div className="flex gap-2">
                        <input
                          value={newSymptom}
                          onChange={(e) => {
                            const value = e.target.value;
                            setNewSymptom(value);
                            setFilteredSuggestions(
                              value
                                ? symptomSuggestions.filter((symptom) =>
                                    symptom
                                      .toLowerCase()
                                      .includes(value.toLowerCase()),
                                  )
                                : [],
                            );
                          }}
                          className="border text-sm rounded px-2 py-1 flex-1"
                          placeholder="Add symptom..."
                        />
                        <button
                          onClick={handleAddSymptom}
                          className="text-xs bg-[#DFA69F] text-white px-2 py-1 rounded"
                        >
                          Add
                        </button>
                      </div>
                      {filteredSuggestions.length > 0 && (
                        <ul className="border bg-white rounded text-sm max-h-40 overflow-auto mt-1 shadow absolute top-full left-0 right-16 z-10">
                          {filteredSuggestions.map((suggestion, idx) => (
                            <li
                              key={idx}
                              onClick={() => {
                                setNewSymptom(suggestion);
                                setFilteredSuggestions([]);
                              }}
                              className="px-2 py-1 hover:bg-[#fff] cursor-pointer"
                            >
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-medium">Notes</h3>
                  {isEditing ? (
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full border rounded p-2 text-sm mt-1"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-[#234451] mt-1">{notes}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-lg shadow p-4">
                <h3 className="font-semibold text-[#234451]">
                  Mood Trends (Past 7 Days)
                </h3>
                <div className="flex justify-between mt-4 text-center">
                  {past7Days.map((date, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center text-[#234451]"
                    >
                      <span className="text-xs">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </span>
                      {weeklyMoods[i] ? (
                        <img
                          src={weeklyMoods[i]}
                          alt="Mood"
                          className="w-6 h-6 object-contain mt-1"
                        />
                      ) : (
                        <span className="text-xl mt-1">–</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-lg shadow p-4">
                <h3 className="font-semibold text-[#234451]">
                  Common Symptoms
                </h3>
                {Object.entries(symptomCounts).length === 0 ? (
                  <p className="text-sm text-[#234451] mt-2">
                    No symptom data yet.
                  </p>
                ) : (
                  Object.entries(symptomCounts).map(([label, value], i) => {
                    const total = Object.values(symptomCounts).reduce(
                      (a, b) => a + b,
                      0,
                    );
                    const percent = total
                      ? Math.round((value / total) * 100)
                      : 0;
                    return (
                      <div key={i} className="mt-2">
                        <div className="flex justify-between text-sm text-[#234451]">
                          <span>{label}</span>
                          <span>{percent}%</span>
                        </div>
                        <div className="w-full bg-[#fff] h-2 rounded-full">
                          <div
                            className="bg-[#DFA69F] h-2 rounded-full"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="bg-white/60 backdrop-blur-md border border-white/20 rounded-lg shadow p-4">
                <h3 className="font-semibold text-[#234451]">Wellness Tips</h3>
                <ul className="list-disc list-inside text-[#234451] text-sm space-y-1 mt-2">
                  <p>
                    <strong>In progress</strong>: this card will display tips
                    based on user data.
                  </p>
                </ul>
              </div>
              {/* Looking Ahead Card */}
              <div
                className={`bg-white/70 backdrop-blur-md border border-white/20 rounded-lg shadow p-4 md:col-span-3 transition-all duration-500 ease-out overflow-hidden ${lookingAheadOpen ? "max-h-[1000px] opacity-100" : "max-h-20 opacity-90"}`}
              >
                <div
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 cursor-pointer"
                  onClick={() => setLookingAheadOpen((o) => !o)}
                >
                  <h3 className="font-semibold text-[#234451]">
                    Looking Ahead
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-[#bcb2da] text-[#234451]">
                      Trimester {trimester}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-white text-[#234451] border border-white/40">
                      Week {weeksPregnant}
                    </span>
                  </div>
                </div>
                {lookingAheadOpen && (
                  <div className="animate-fadeIn">
                    <p className="text-sm text-[#234451] mt-2">
                      Based on your week and recent logs, you may notice:{" "}
                      {predictions
                        .slice(0, 2)
                        .map((p) => p.label)
                        .join(" and ")}
                      .
                    </p>

                    <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
                      {Array.from({ length: 37 }, (_, idx) => {
                        const weekNumber = idx + 4;
                        return (
                          <div
                            key={weekNumber}
                            onClick={() => setWeeksPregnant(weekNumber)}
                            className={`flex flex-col items-center cursor-pointer ${
                              weeksPregnant === weekNumber ? "text-[#234451] font-semibold" : "text-[#234451]/60"
                            }`}
                          >
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 ${
                                weeksPregnant === weekNumber ? "bg-[#DFA69F] text-white" : "bg-white border border-[#234451]/20"
                              }`}
                            >
                              {weekNumber}
                            </div>
                            <span className="text-[10px] whitespace-nowrap">Week {weekNumber}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 overflow-x-auto snap-x snap-mandatory flex gap-3 pb-2">
                      {predictions.map((p, i) => (
                        <div
                          key={i}
                          className="min-w-[240px] snap-start bg-white/80 border border-white/30 rounded-lg p-3 shadow transition-all duration-300 ease-out"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {p.icon ? (
                                <img
                                  src={p.icon}
                                  alt={p.label}
                                  className="w-5 h-5"
                                />
                              ) : (
                                <span className="w-5 h-5 inline-block"></span>
                              )}
                              <span className="text-sm font-medium text-[#234451]">
                                {p.label}
                              </span>
                            </div>
                            <span className="text-xs text-[#234451]">
                              {p.prob}%
                            </span>
                          </div>
                          <div className="w-full bg-white h-2 rounded-full mt-2">
                            <div
                              className="bg-[#DFA69F] h-2 rounded-full"
                              style={{ width: `${p.prob}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-[#234451] mt-2">{p.tip}</p>
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => handleFeedback(p.label, true)}
                              className={`text-xs px-2 py-1 rounded ${predictionFeedback[p.label] === "yes" ? "bg-[#234451] text-white" : "bg-white text-[#234451]"}`}
                            >
                              This happened
                            </button>
                            <button
                              onClick={() => handleFeedback(p.label, false)}
                              className={`text-xs px-2 py-1 rounded ${predictionFeedback[p.label] === "no" ? "bg-[#234451] text-white" : "bg-white text-[#234451] border border-[#234451]/10"}`}
                            >
                              Not me
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-16 text-center text-xs text-[hsl(var(--foreground))] px-4 max-w-2xl mx-auto">
            <p className="italic leading-relaxed">
              <strong className="block mb-1 text-red-500">DISCLAIMER</strong>
              Materna is currently in early-stage development and is not
              intended for clinical use. <br />
              We do not collect, store, or process any Protected Health
              Information (PHI). <br />
              This platform is for educational and demonstration purposes only
              and is not HIPAA-compliant at this time. <br />
              Please do not submit any personal or health-related data.
            </p>
          </div>
        </main>
      </div>
      {/* Login modal */}
      {!isLoggedIn && showLoginPrompt && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg space-y-4 relative w-80">
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="absolute top-2 right-2 text-gray-500 text-sm hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold text-[#234451]">
              Login Required
            </h2>
            <p className="text-sm text-[#234451]">
              You need to be logged in to use the journal.
            </p>
            <a
              href="/login"
              className="block w-full bg-[#DFA69F] hover:bg-[#c9786d] text-white text-sm py-2 rounded mt-2"
            >
              Log In
            </a>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Journal;

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarStill } from "@/components/StarStill.jsx";
import bgVideo from "@/assets/sky1.mp4";
import { useState, useEffect, useRef } from "react";
import playIcon from "@/assets/play.png";
import pauseIcon from "@/assets/pause.png";

const checklistData = [
  {
    title: "Diapers & Wipes",
    items: ["Newborn diapers", "Sensitive wipes", "Diaper rash cream"],
  },
  {
    title: "Onesies, Swaddles, Mittens",
    items: ["Cotton onesies", "Swaddles", "Scratch mittens"],
  },
  {
    title: "Feeding Supplies",
    items: ["Bottles", "Formula", "Breast pump"],
  },
  {
    title: "Bathing Basics",
    items: ["Baby tub", "Gentle soap", "Soft towels"],
  },
  {
    title: "Sleep Essentials",
    items: ["Bassinet", "White noise machine", "Sleep sacks"],
  },
  {
    title: "First Aid",
    items: ["Thermometer", "Gas drops", "Nail clippers"],
  },
];

const Checklist = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("checklist");
    if (saved) setCheckedItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("checklist", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheck = (section, item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [item]: !prev[section]?.[item],
      },
    }));
  };

  const toggleExpand = (title) => {
    setExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <section className="my-12 fade-in">
      <h2 className="text-3xl font-semibold text-[#234451] mb-6">
        Interactive Checklist
      </h2>
      <div className="space-y-4">
        {checklistData.map(({ title, items }) => (
          <div
            key={title}
            className="bg-white/70 rounded-xl shadow-md p-4 backdrop-blur-sm transition-all duration-300"
            aria-live="polite"
          >
            <button
              onClick={() => toggleExpand(title)}
              className="w-full text-left text-xl font-medium flex justify-between items-center focus:outline-none rounded-lg transition-colors"
              aria-expanded={!!expanded[title]}
              aria-controls={`checklist-section-${title.replace(/\s+/g, "-")}`}
            >
              {title}
              <span className="ml-3 text-2xl transition-transform duration-200">
                {expanded[title] ? "−" : "+"}
              </span>
            </button>
            {expanded[title] && (
              <ul
                className="mt-2 space-y-2 animate-fadeIn"
                id={`checklist-section-${title.replace(/\s+/g, "-")}`}
              >
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checkedItems[title]?.[item] || false}
                      onChange={() => toggleCheck(title, item)}
                      className="w-5 h-5 rounded text-[#DFA69F] focus:ring-2 focus:ring-[#DFA69F] transition-shadow"
                      id={`${title}-${item}`}
                    />
                    <label
                      className="text-[#234451] select-none cursor-pointer"
                      htmlFor={`${title}-${item}`}
                    >
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const productRecommendations = [
  {
    name: "Pampers Swaddlers",
    rating: 4.8,
    price: "$24.99",
    why: "Super soft and absorbent for newborns.",
  },
  {
    name: "Philips Avent Bottles",
    rating: 4.6,
    price: "$19.99",
    why: "Anti-colic design loved by moms.",
  },
  {
    name: "Hatch Rest Sound Machine",
    rating: 4.7,
    price: "$59.99",
    why: "Helps baby sleep with white noise and light.",
  },
];

const ProductRecommendations = () => (
  <section className="my-16 fade-in">
    <h2 className="text-3xl font-semibold text-[#234451] mb-6">Product Recommendations</h2>
    <p className="text-[#ffffff] mb-4">Vetted by pediatricians and real moms.</p>
    <div className="grid md:grid-cols-2 gap-6">
      {productRecommendations.map((product) => (
        <div key={product.name} className="bg-white/80 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow backdrop-blur-sm">
          <h3 className="text-xl font-semibold text-[#234451] mb-1">{product.name}</h3>
          <p className="text-sm text-[#666] mb-1">⭐ {product.rating} · {product.price}</p>
          <p className="text-[#444]">“{product.why}”</p>
        </div>
      ))}
    </div>
  </section>
);

// Mom-Recommended Tips Carousel and data moved above Essentials
const momTips = [
  {
    id: 1,
    text: "Always trust your instincts as a mom.",
    author: "Jessica",
  },
  {
    id: 2,
    text: "Swaddling helped my baby sleep better.",
    author: "Maya",
  },
  {
    id: 3,
    text: "Don't hesitate to ask for help when needed.",
    author: "Lara",
  },
];

const MomTipsCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % momTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="my-16 fade-in">
      <h2 className="text-3xl font-semibold text-[#234451] mb-6">Mom-Recommended Tips</h2>
      <div className="bg-white/80 rounded-xl p-6 shadow-md backdrop-blur-sm max-w-xl mx-auto text-center">
        <p className="text-lg text-[#444] mb-4">“{momTips[index].text}”</p>
        <p className="text-sm font-semibold text-[#234451]">- {momTips[index].author}</p>
      </div>
    </section>
  );
};

const Essentials = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen relative overflow-hidden pt-32 p-6 sm:p-12 font-inter">
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
        <div className="fixed top-0 left-0 w-full h-screen bg-white/50 backdrop-blur-sm -z-10"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Interactive Checklist Section */}
          <Checklist />
          <ProductRecommendations />
          <BudgetPicks />
          <MomTipsCarousel />
        </div>
      </main>
      <LullabyToggle />
      <Footer />
    </>
  );
};

const LullabyToggle = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white/80 rounded-full shadow-md px-4 py-2 flex items-center space-x-2 backdrop-blur-sm">
      <button
        onClick={togglePlayback}
        className="text-[#234451] font-medium hover:text-[#DFA69F] transition flex items-center gap-2"
        aria-label="Toggle lullaby music"
      >
        <img
          src={playing ? pauseIcon : playIcon}
          alt={playing ? "Pause lullaby" : "Play lullaby"}
          className="w-5 h-5"
        />
        <span>Lullaby</span>
      </button>
      <audio ref={audioRef} src="/lullaby.mp3" loop />
    </div>
  );
};

export default Essentials;

// Tailwind fade-in animation for checklist
// Add this in your global CSS if not present:
// .animate-fadeIn { animation: fadeIn 0.5s; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// Budget-Friendly Picks with Tabs
const BudgetPicks = () => {
  const [tab, setTab] = useState("Amazon");

  const picks = {
    Amazon: [
      { name: "Luvs Diapers", price: "$18.99", compareUrl: "#" },
      { name: "Munchkin Bottles", price: "$14.99", compareUrl: "#" },
    ],
    Walmart: [
      { name: "Parent's Choice Diapers", price: "$16.49", compareUrl: "#" },
      { name: "Equate Baby Wipes", price: "$12.29", compareUrl: "#" },
    ],
    Clinics: [
      { name: "Free Diaper Packs", price: "$0", compareUrl: "#" },
      { name: "Sample Formula", price: "$0", compareUrl: "#" },
    ],
  };

  return (
    <section className="my-16 fade-in">
      <h2 className="text-3xl font-semibold text-[#234451] mb-6">Budget-Friendly Picks</h2>
      <div className="flex space-x-4 mb-4">
        {["Amazon", "Walmart", "Clinics"].map((site) => (
          <button
            key={site}
            onClick={() => setTab(site)}
            className={`px-4 py-2 rounded-full ${
              tab === site
                ? "bg-[#DFA69F]/20 text-[#234451]"
                : "bg-white/60 text-[#666]"
            } shadow hover:bg-[#DFA69F]/20 transition`}
          >
            {site}
          </button>
        ))}
      </div>
      <ul className="space-y-3">
        {picks[tab].map((item) => (
          <li
            key={item.name}
            className="bg-white/80 p-4 rounded-lg shadow flex justify-between items-center backdrop-blur-sm"
          >
            <div>
              <p className="text-[#234451] font-medium">{item.name}</p>
              <p className="text-[#666] text-sm">{item.price}</p>
            </div>
            <a
              href={item.compareUrl}
              className="text-[#DFA69F] underline hover:text-[#DFA69F] text-sm"
            >
              Compare prices
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
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
    items: [
      "Newborn diapers (cloth or disposable)",
      "Sensitive wipes (fragrance-free)",
      "Diaper rash cream (Aquaphor/Boudreaux’s)",
    ],
  },
  {
    title: "Onesies, Swaddles, Mittens",
    items: [
      "Zip-up cotton onesies (avoid button-up)",
      "Swaddles",
      "Scratch mittens",
      "Socks and baby hats",
    ],
  },
  {
    title: "Feeding Supplies",
    items: [
      "Anti-colic bottles",
      "Nursing pads",
      "Nipple cream",
      "Manual breast pump",
      "Electric breast pump",
      "Formula (optional if not breastfeeding)",
    ],
  },
  {
    title: "Bathing Basics",
    items: ["Baby tub", "Gentle baby soap", "Soft washcloths", "Hooded towels"],
  },
  {
    title: "Sleep Essentials",
    items: [
      "Swaddles",
      "Crib or bassinet",
      "White noise machine",
      "Blackout curtains",
    ],
  },
  {
    title: "First Aid",
    items: [
      "Digital rectal thermometer",
      "Nasal aspirator",
      "Nail clippers",
      "Gas drops",
      "Baby Tylenol",
    ],
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
    name: "Hatch Rest Sound Machine & Night Light",
    rating: 4.5,
    price: "$69.99",
    why: "Longer sleep with white noise",
    link: "https://a.co/d/dYcPVdT",
    image:
      "https://www.hatch.co/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F98401%2F1693243315-carousel-5.jpg&w=3840&q=75",
  },
  {
    name: "FridaBaby NoseFrida SnotSucker",
    rating: 4.7,
    price: "$14.97",
    why: "Clearer breathing = better sleep",
    link: "https://a.co/d/hJhXO4g",
    image:
      "https://frida.com/cdn/shop/files/NoseFridaSnotSuckerASIN_B00171WXI__NoseFridaASIN_B00171WXII_Frame3_992x.progressive.jpg?v=1706049614",
  },
  {
    name: "Aquaphor Baby Healing Ointment",
    rating: 4.8,
    price: "$18.37",
    why: "Soothes & protects baby skin",
    link: "https://www.amazon.com/dp/B006IB5T4W",
    image:
      "https://threebs.co/cdn/shop/files/aquaphor-baby-healing-ointment-advanced-therapy-396g-IMG1-20250701_8827f650-60f3-4f60-9164-7a7baaae05af.jpg?v=1751343261",
  },
  {
    name: "Philips Avent Natural Baby Bottles",
    rating: 4.8,
    price: "$18.53",
    why: "Reduces gas and fussiness",
    link: "https://a.co/d/3Xnzu2p",
    image:
      "https://images.philips.com/is/image/philipsconsumer/d984b3980cb84c04b238ac540186670d?$pnglarge$&wid=1250",
  },
  {
    name: "Owlet Dream Sock Baby Monitor",
    rating: 4.2,
    price: "$273.89",
    why: "Peace of mind for parents",
    link: "https://a.co/d/e1eNRRR",
    image:
      "https://owletcare.com/cdn/shop/files/DreamSock-1.jpg?v=1704675164&width=1400",
  },
  {
    name: "Love to Dream Swaddle UP",
    rating: 4.6,
    price: "$34.95",
    why: "Arms-up = better sleep",
    link: "https://www.amazon.com/dp/B0081GJ038",
    image:
      "https://m.media-amazon.com/images/I/61qNHTMjmvL._UF894,1000_QL80_.jpg",
  },
];

const ProductRecommendations = () => (
  <section className="my-16 fade-in">
    <h2 className="text-3xl font-semibold text-[#234451] mb-6">
      Product Recommendations
    </h2>
    <p className="text-[#234451] mb-4">
      The very best, vetted by pediatricians, scientists and real moms.
    </p>
    <div className="grid md:grid-cols-2 gap-6">
      {productRecommendations.map((product) => (
        <a
          key={product.name}
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white/80 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow backdrop-blur-sm"
        >
          <div className="flex gap-4 items-start">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-20 h-20 object-contain rounded-md bg-[#f4f4f4]"
              style={{ backgroundColor: "#f4f4f4" }}
            />
            <div>
              <h3 className="text-sm font-semibold text-[#234451]">
                {product.name}
              </h3>
              <p className="text-sm text-[#666] mt-1">
                {product.rating} · {product.price}
              </p>
              <p className="text-sm text-[#444] mt-2">{product.why}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  </section>
);

const FAQSection = () => {
  const faqs = [
    {
      question: "How many diapers a day?",
      answer: "Newborns usually go through 8–12 diapers daily.",
    },
    {
      question: "What size clothes do I start with?",
      answer: "Start with newborn and 0–3M sizes. It’s good to have both.",
    },
    {
      question: "Is it normal if ___?",
      answer:
        "Usually, yes. But when in doubt, don’t hesitate to call your pediatrician.",
    },
    {
      question: "Do I need a bottle sterilizer?",
      answer:
        "Not necessarily. Boiling water or dishwasher-safe sterilization usually works just fine.",
    },
    {
      question: "How often should my newborn eat?",
      answer: "Typically every 2–3 hours, or about 8–12 times in 24 hours.",
    },
    {
      question: "When should I schedule my baby’s first doctor visit?",
      answer:
        "Usually within 3–5 days after birth, or as directed by your hospital or pediatrician.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="my-16 fade-in">
      <h2 className="text-3xl font-semibold text-[#234451] mb-6">
        Newborn FAQ
      </h2>
      <ul className="space-y-4">
        {faqs.map((faq, idx) => (
          <li
            key={idx}
            className="bg-white/80 p-4 rounded-lg shadow backdrop-blur-sm transition-all"
          >
            <button
              className="w-full text-left text-lg font-medium text-[#234451] flex justify-between items-center"
              onClick={() => toggle(idx)}
              aria-expanded={openIndex === idx}
              aria-controls={`faq-${idx}`}
            >
              {faq.question}
              <span className="ml-3 text-2xl">
                {openIndex === idx ? "−" : "+"}
              </span>
            </button>
            {openIndex === idx && (
              <p id={`faq-${idx}`} className="text-[#444] mt-2 animate-fadeIn">
                {faq.answer}
              </p>
            )}
          </li>
        ))}
      </ul>
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
        <div className="fixed top-0 left-0 -z-10 h-screen w-full bg-white/40 backdrop-blur-sm"></div>
        <StarStill />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Interactive Checklist Section */}
          <Checklist />
          <ProductRecommendations />
          <BudgetPicks />
          <FAQSection />
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
      {
        name: "Luvs Diapers x19",
        price: "$5.57",
        compareUrl: "https://a.co/d/hxc4CpL",
      },
      {
        name: "Lansinoh Bottles x3",
        price: "$15.57",
        compareUrl: "https://a.co/d/5c2EVyo",
      },
      {
        name: "Dr.Brown Bottle Warmer (Optional)",
        price: "$17.47",
        compareUrl: "https://a.co/d/duB2sDO",
      },
    ],
    Walmart: [
      {
        name: "Luvs Platinum Diapers",
        price: "$7.47",
        compareUrl:
          "https://www.walmart.com/ip/Luvs-Platinum-Protection-Baby-Diapers-Size-6-20-Count-Select-for-More-Options/5431562129?classType=VARIANT&from=%2Fsearch&sid=370f42a1-a388-4e85-a3cb-f572b6ba05b6",
      },
      {
        name: "Parent's Choice Baby Wipes",
        price: "$0.98",
        compareUrl:
          "https://www.walmart.com/ip/Parent-s-Choice-Fragrance-Free-Baby-Wipes-Travel-Pack-50-Count/1190727227?classType=REGULAR&athbdg=L1200&from=%2Fsearch&sid=1150ef0b-ce9c-4346-9b0c-ca4935631021",
      },
      {
        name: "Munchkin Wipe Warmer (Optional)",
        price: "$15.10",
        compareUrl:
          "https://www.walmart.com/ip/Munchkin-Warm-Glow-Baby-and-Infant-Wipe-Warmer-White/8032825?classType=VARIANT&athbdg=L1103&from=%2Fsearch&sid=b22283f5-1aa4-4dd2-bf14-ef99d59a3ac9",
      },
    ],
  };

  return (
    <section className="my-16 fade-in">
      <h2 className="text-3xl font-semibold text-[#234451] mb-6">
        Budget-Friendly Picks
      </h2>
      <div className="flex space-x-4 mb-4">
        {["Amazon", "Walmart"].map((site) => (
          <button
            key={site}
            onClick={() => setTab(site)}
            className={`px-4 py-2 rounded-full font-medium ${
              tab === site
                ? "bg-[#DFA69F]/40 text-[#234451]"
                : "bg-white text-[#444] hover:bg-[#DFA69F]/30"
            } shadow transition`}
          >
            {site}
          </button>
        ))}
      </div>
      <ul className="space-y-3">
        {picks[tab].map((item) => (
          <li
            key={item.name}
            className="bg-white/80 p-4 rounded-lg shadow flex justify-between backdrop-blur-sm"
          >
            <div className="flex flex-col items-start">
              <p className="text-[#234451] font-medium">{item.name}</p>
              <p className="text-[#666] text-sm mt-1">{item.price}</p>
            </div>
            <a
              href={item.compareUrl}
              target="_blank"
              rel="noopener noreferrer"
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

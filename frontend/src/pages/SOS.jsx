import React, { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import bgVideo from "@/assets/sky1.mp4";
import { StarStill } from "@/components/StarStill.jsx"

const suggestedComplications = [
  "Preeclampsia",
  "Gestational diabetes",
  "Preterm labor",
  "Stillbirth",
  "Placenta previa"
];
const Normal = () => {
  // Helper to get the local emergency number and country name using IP-based location
  const getEmergencyNumber = () => {
    const [emergencyInfo, setEmergencyInfo] = useState({ number: "112", country: "Unknown" });

    useEffect(() => {
      const fetchLocation = async () => {
        try {
          const response = await fetch("https://ipapi.co/json/");
          const data = await response.json();
          const countryCode = data.country_code.toUpperCase();

          switch (countryCode) {
            case "US":
              setEmergencyInfo({ number: "911", country: "United States" });
              break;
            case "GB":
              setEmergencyInfo({ number: "999", country: "United Kingdom" });
              break;
            case "AU":
              setEmergencyInfo({ number: "000", country: "Australia" });
              break;
            case "IN":
              setEmergencyInfo({ number: "112", country: "India" });
              break;
            case "CA":
              setEmergencyInfo({ number: "911", country: "Canada" });
              break;
            case "NZ":
              setEmergencyInfo({ number: "111", country: "New Zealand" });
              break;
            case "ZA":
              setEmergencyInfo({ number: "10111", country: "South Africa" });
              break;
            case "FR":
              setEmergencyInfo({ number: "112", country: "France" });
              break;
            case "DE":
              setEmergencyInfo({ number: "112", country: "Germany" });
              break;
            case "MY":
              setEmergencyInfo({ number: "999", country: "Malaysia" });
              break;
            case "PH":
              setEmergencyInfo({ number: "911", country: "Philippines" });
              break;
            case "SG":
              setEmergencyInfo({ number: "995", country: "Singapore" });
              break;
            case "JP":
              setEmergencyInfo({ number: "119", country: "Japan" });
              break;
            case "CN":
              setEmergencyInfo({ number: "120", country: "China" });
              break;
            case "BR":
              setEmergencyInfo({ number: "190", country: "Brazil" });
              break;
            case "MX":
              setEmergencyInfo({ number: "911", country: "Mexico" });
              break;
            case "TH":
              setEmergencyInfo({ number: "191", country: "Thailand" });
              break;
            case "ID":
              setEmergencyInfo({ number: "112", country: "Indonesia" });
              break;
            case "NG":
              setEmergencyInfo({ number: "112", country: "Nigeria" });
              break;
            case "KE":
              setEmergencyInfo({ number: "999", country: "Kenya" });
              break;
            case "AE":
              setEmergencyInfo({ number: "999", country: "United Arab Emirates" });
              break;
            case "SA":
              setEmergencyInfo({ number: "997", country: "Saudi Arabia" });
              break;
            default:
              setEmergencyInfo({ number: "112", country: data.country_name || "Unknown" });
          }
        } catch (error) {
          console.error("Failed to fetch location:", error);
          setEmergencyInfo({ number: "112", country: "Unknown" });
        }
      };

      fetchLocation();
    }, []);

    return [emergencyInfo, setEmergencyInfo];
  };
  // Initialize and retrieve the emergency info (number and country)
  const [emergencyInfo, setEmergencyInfo] = getEmergencyNumber();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [showSeverityDropdown, setShowSeverityDropdown] = useState(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
  const [confirmCall911, setConfirmCall911] = useState(false);
  const [formData, setFormData] = useState({
    parity: 0,
    substanceUse: '',
    pregnancyType: '',
    prevComplications: [],
    symptomType: [],
    severity: '',
    duration: '',
    durationAmount: '',
    durationUnit: '',
    frequency: '',
    associatedFactors: '',
    fetalMovement: '',
    mentalHealth: ''
  });
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [newComplication, setNewComplication] = useState('');
  const [newSymptom, setNewSymptom] = useState('');
  const [filteredSymptomSuggestions, setFilteredSymptomSuggestions] = useState([]);
  const suggestedSymptoms = [
    "Headache",
    "Swelling",
    "Nausea",
    "Cramping",
    "Contractions",
    "Bleeding",
    "Fatigue",
    "Pain",
    "Shortness of breath"
  ];

  useEffect(() => {
    if (currentStep === 3 && formData.parity === 0) {
      setCurrentStep(4);
    }
  }, [currentStep, formData.parity]);

  const nextStep = () => {
    const fields = [
      'parity', 'substanceUse', 'pregnancyType', 'prevComplications',
      'symptomType', 'severity', 'duration', 'frequency',
      'associatedFactors', 'fetalMovement', 'mentalHealth'
    ];
    const currentField = fields[currentStep];
    if (
      currentField === 'duration' &&
      (!formData.durationAmount || !formData.durationUnit)
    ) {
      setError('Please enter both duration amount and unit.');
      return;
    }

    if (
      !['associatedFactors', 'prevComplications', 'duration'].includes(currentField) &&
      (formData[currentField] === '' ||
       (Array.isArray(formData[currentField]) && formData[currentField].length === 0))
    ) {
      setError('Please complete this step before continuing.');
      return;
    }
    setError('');
    setCurrentStep((prev) => prev + 1);
  };
  const prevStep = () => {
    setCurrentStep((prev) => {
      // If we're at step 4 (Symptom Type) and we skipped step 3 (Prev Complications) due to parity 0, go back to step 2
      if (prev === 4 && formData.parity === 0) return 2;
      return Math.max(prev - 1, 0);
    });
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <Navbar />
      <video autoPlay muted loop playsInline className="fixed top-0 left-0 w-full h-screen object-cover -z-20">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <StarStill />
      <div className="fixed top-0 left-0 w-full h-screen bg-white/40 backdrop-blur-md -z-10"></div>
      
      <main className="min-h-screen p-6 pt-32 max-w-7xl mx-auto">
        

        {/* Middle Section - Symptom Checker and AI Results */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          {/* Check Your Symptoms Card */}
          <div className="bg-white/40 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-8 shadow-xl font-inter">
            <h2 className="text-[#234451] text-3xl font-bold mb-4 text-center drop-shadow-sm">Check Your Symptoms</h2>

            {currentStep === 0 && (
              <>
                <h3 className="text-[#234451] font-semibold text-lg mb-2">Number of Previous Pregnancies</h3>
                <div className="mb-4">
                  <p className="text-[#234451] text-sm mb-4">Selected: {formData.parity}</p>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={1}
                    value={formData.parity}
                    onChange={(e) => updateField('parity', Number(e.target.value))}
                    className="w-full accent-[#DFA69F] bg-transparent"
                  />
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 1 && (
              <>
                <h3 className="text-[#234451] font-semibold text-lg mb-2">Substance Use</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['None', 'Smoking', 'Alcohol', 'Recreational drugs'].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField('substanceUse', option.toLowerCase())}
                      className={`px-4 py-2 rounded-lg font-medium text-sm border ${
                        formData.substanceUse === option.toLowerCase()
                          ? 'bg-[#DFA69F] text-[#234451]'
                          : 'bg-white/30 text-[#234451] hover:bg-[#DFA69F]/20'
                      } border-[#bcb2da]/50 transition-all`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 2 && (
              <>
                <h3 className="text-[#234451] font-semibold text-lg mb-2">Type of Pregnancy</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Single', 'Twins', 'Triplets or more'].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField('pregnancyType', option.toLowerCase())}
                      className={`px-4 py-2 rounded-lg font-medium text-sm border ${
                        formData.pregnancyType === option.toLowerCase()
                          ? 'bg-[#DFA69F] text-[#234451]'
                          : 'bg-white/30 text-[#234451] hover:bg-[#DFA69F]/20'
                      } border-[#bcb2da]/50 transition-all`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 3 && (
              <>
                <h3 className="text-[#234451] font-semibold text-lg mb-2">Previous Pregnancy Complications</h3>
                <div className="mb-3 flex flex-wrap gap-2">
                  {formData.prevComplications.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-[#DFA69F]/30 text-[#234451] px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...formData.prevComplications];
                          updated.splice(idx, 1);
                          updateField('prevComplications', updated);
                        }}
                        className="text-[#234451] hover:text-red-600 font-bold text-sm"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={newComplication}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewComplication(value);
                      setFilteredSuggestions(
                        value
                          ? suggestedComplications.filter(
                              (option) =>
                                option.toLowerCase().includes(value.toLowerCase()) &&
                                !formData.prevComplications.includes(option)
                            )
                          : []
                      );
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newComplication.trim()) {
                        if (!formData.prevComplications.includes(newComplication.trim())) {
                          updateField('prevComplications', [...formData.prevComplications, newComplication.trim()]);
                          setNewComplication('');
                          setFilteredSuggestions([]);
                        }
                        e.preventDefault();
                      }
                    }}
                    placeholder="e.g. preeclampsia, gestational diabetes"
                    className="w-full px-4 py-3 pr-10 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 placeholder-[#a48bc3] text-[#234451] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                  />
                  {filteredSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-[#bcb2da]/50 rounded-md shadow-md max-h-48 overflow-y-auto text-left">
                      {filteredSuggestions.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            updateField('prevComplications', [...formData.prevComplications, option]);
                            setNewComplication('');
                            setFilteredSuggestions([]);
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-[#DFA69F]/30 text-[#234451] text-sm"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 4 && (
              <>
                <h3 className="text-[#234451] font-semibold text-lg mb-2">Symptom Type</h3>
                <div className="mb-3 flex flex-wrap gap-2">
                  {formData.symptomType.map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-[#DFA69F]/30 text-[#234451] px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...formData.symptomType];
                          updated.splice(idx, 1);
                          updateField('symptomType', updated);
                        }}
                        className="text-[#234451] hover:text-red-600 font-bold text-sm"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={newSymptom}
                    onChange={(e) => {
                      const value = e.target.value;
                      setNewSymptom(value);
                      setFilteredSymptomSuggestions(
                        value
                          ? suggestedSymptoms.filter(
                              (option) =>
                                option.toLowerCase().includes(value.toLowerCase()) &&
                                !formData.symptomType.includes(option)
                            )
                          : []
                      );
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newSymptom.trim()) {
                        if (!formData.symptomType.includes(newSymptom.trim())) {
                          updateField('symptomType', [...formData.symptomType, newSymptom.trim()]);
                          setNewSymptom('');
                          setFilteredSymptomSuggestions([]);
                        }
                        e.preventDefault();
                      }
                    }}
                    placeholder="e.g. headache, swelling"
                    className="w-full px-4 py-3 pr-10 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 placeholder-[#a48bc3] text-[#234451] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                  />
                  {filteredSymptomSuggestions.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-[#bcb2da]/50 rounded-md shadow-md max-h-48 overflow-y-auto text-left">
                      {filteredSymptomSuggestions.map((option, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            updateField('symptomType', [...formData.symptomType, option]);
                            setNewSymptom('');
                            setFilteredSymptomSuggestions([]);
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-[#DFA69F]/30 text-[#234451] text-sm"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 5 && (
              <>
                <h3 className="text-[#234451] font-semibold text-lg mb-2">Severity</h3>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSeverityDropdown(!showSeverityDropdown)}
                    className="w-full text-left px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 text-[#234451] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                  >
                    {formData.severity ? formData.severity.charAt(0).toUpperCase() + formData.severity.slice(1) : "Select severity"}
                  </button>
                  {showSeverityDropdown && (
                    <ul className="absolute z-10 w-full mt-2 bg-white/90 border border-[#bcb2da]/50 rounded-lg shadow-md text-[#234451] text-sm backdrop-blur-md">
                      {["mild", "moderate", "severe"].map((option) => (
                        <li
                          key={option}
                          onClick={() => {
                            updateField("severity", option);
                            setShowSeverityDropdown(false);
                          }}
                          className="px-4 py-2 hover:bg-[#DFA69F]/30 cursor-pointer rounded-md"
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 6 && (
              <>
                <h3 className="text-[#234451] font-semibold text-lg mb-2">Duration</h3>
                <div className="flex gap-3">
                  <input
                    type="number"
                    min={0}
                    placeholder="Amount"
                    value={formData.durationAmount || ''}
                    onChange={(e) => updateField('durationAmount', e.target.value)}
                    className="w-1/2 px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 placeholder-[#a48bc3] text-[#234451] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                  />
                  <select
                    value={formData.durationUnit || ''}
                    onChange={(e) => updateField('durationUnit', e.target.value)}
                    className="w-1/2 px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 text-[#234451] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                  >
                    <option value="">Unit</option>
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 7 && (
              <>
                <h3 className="text-[#234451] font-semibold text-lg mb-2">Frequency</h3>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
                    className="w-full text-left px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 text-[#234451] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                  >
                    {formData.frequency
                      ? formData.frequency.charAt(0).toUpperCase() + formData.frequency.slice(1)
                      : 'Select frequency'}
                  </button>
                  {showFrequencyDropdown && (
                    <ul className="absolute z-10 w-full mt-2 bg-white/90 border border-[#bcb2da]/50 rounded-lg shadow-md text-[#234451] text-sm backdrop-blur-md">
                      {['single', 'recurring', 'continuous'].map((option) => (
                        <li
                          key={option}
                          onClick={() => {
                            updateField('frequency', option);
                            setShowFrequencyDropdown(false);
                          }}
                          className="px-4 py-2 hover:bg-[#DFA69F]/30 cursor-pointer rounded-md"
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 8 && (
              <>
                <h3 className="text-[#234451] font-semibold text-lg mb-2">Associated Symptoms</h3>
                <input
                  type="text"
                  value={formData.associatedFactors}
                  onChange={(e) => updateField('associatedFactors', e.target.value)}
                  className="w-full px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 placeholder-[#a48bc3] text-[#234451] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                  placeholder="e.g. fever, urination, trauma"
                />
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 9 && (
              <>
                <h3 className="text-[#234451] font-semibold text-lg mb-2">Fetal Movement</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {['Normal', 'Reduced', 'No movement'].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField('fetalMovement', option.toLowerCase())}
                      className={`px-4 py-2 rounded-lg font-medium text-sm border ${
                        formData.fetalMovement === option.toLowerCase()
                          ? 'bg-[#DFA69F] text-[#234451]'
                          : 'bg-white/30 text-[#234451] hover:bg-[#DFA69F]/20'
                      } border-[#bcb2da]/50 transition-all`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 10 && (
              <>
                <h3 className="text-[#234451] font-semibold text-lg mb-2">How do you feel?</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {['Stable', 'Anxious', 'Sad', 'Overwhelmed', 'Depressed'].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField('mentalHealth', option.toLowerCase())}
                      className={`px-4 py-2 rounded-lg font-medium text-sm border ${
                        formData.mentalHealth === option.toLowerCase()
                          ? 'bg-[#DFA69F] text-[#234451]'
                          : 'bg-white/30 text-[#234451] hover:bg-[#DFA69F]/20'
                      } border-[#bcb2da]/50 transition-all`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="font-medium text-sm px-6 py-3 bg-[#234451] text-[#fabdb5] rounded-lg disabled:opacity-50"
              >
                Back
              </button>
              {currentStep < 10 ? (
                <button
                  onClick={nextStep}
                  className="font-medium text-sm px-6 py-3 bg-[#DFA69F] text-[#234451] rounded-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    // Combine duration amount and unit before submitting or using the data
                    const duration = `${formData.durationAmount} ${formData.durationUnit}`;
                    // You may want to use duration in your submission logic here
                    alert("Form submitted successfully!");
                  }}
                  className="font-medium text-sm px-6 py-3 bg-[#DFA69F] text-[#234451] rounded-lg"
                >
                  Submit
                </button>
              )}
            </div>
          </div>

          {/* AI Assessment Results Card*/}
          <div className="bg-white/40 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-8 shadow-xl">
            <h2 className="text-[#234451] text-3xl font-bold mb-4 text-center drop-shadow-sm">Assessment Results</h2>
            <p className="text-[#234451] text-md mb-8 text-center max-w-md mx-auto">Based on your answers, Materna's AI suggests:</p>
            <div className="space-y-6">
              <div className="bg-white/40 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-6 shadow-md transition-transform hover:scale-[1.01] duration-200">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 bg-[#fabdb5]/80 rounded-full shadow-lg border border-white"></div>
                  <div>
                    <h3 className="font-semibold text-[#234451] mb-1 text-lg">Recommendation</h3>
                    <p className="text-[#234451] text-sm leading-relaxed">Seek immediate care for severe symptoms.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/40 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-6 shadow-md transition-transform hover:scale-[1.01] duration-200">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 bg-[#fabdb5]/80 rounded-full shadow-lg border border-white"></div>
                  <div>
                    <h3 className="font-semibold text-[#234451] mb-1 text-lg">Recommendation</h3>
                    <p className="text-[#234451] text-sm leading-relaxed">Monitor symptoms and contact your healthcare provider.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Section - Emergency Actions */}
        <section className="mt-12 text-center font-inter">
          <h2 className="text-[#234451] text-3xl font-bold mb-4 text-center drop-shadow-sm">
            Need to talk to someone? Quick Contacts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto items-stretch">
            {/* Emergency Services */}
            <div className="bg-white/40 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-6 shadow-xl h-full flex flex-col justify-between">
              <h2 className="text-[#234451] text-xl font-semibold mb-4">Emergency</h2>
              <p className="text-[#234451] text-sm mb-4">Emergency Number for {emergencyInfo.country}</p>
              {!confirmCall911 ? (
                <button
                  onClick={() => setConfirmCall911(true)}
                  className="font-medium text-sm bg-red-600 text-white px-6 py-4 rounded-lg hover:bg-red-700 transition-all w-full border border-[#a48bc3]/50 flex items-center justify-center gap-2"
                >
                  Call {emergencyInfo.number}
                </button>
              ) : (
                <button
                  onClick={() => window.location.href = `tel:${emergencyInfo.number}`}
                  className="font-medium text-sm bg-red-700 text-white px-6 py-4 rounded-lg hover:bg-red-800 transition-all w-full border border-[#a48bc3]/50 flex items-center justify-center gap-2"
                >
                  Confirm Call to {emergencyInfo.number}
                </button>
              )}
            </div>

            {/* OB/GYN Contact */}
            <div className="bg-white/40 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-6 shadow-xl h-full flex flex-col justify-between">
              <h2 className="text-[#234451] text-xl font-semibold mb-4">Your OB/GYN</h2>
              <p className="text-[#234451] text-sm mb-4">Contact your doctor</p>
              <button className="font-medium text-sm bg-[#234451] text-white px-6 py-4 rounded-lg hover:bg-[#1b343f] transition-all w-full border border-[#a48bc3]/50 flex items-center justify-center gap-2">
                Call Doctor
              </button>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </>
  );
};

export default Normal;
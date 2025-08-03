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
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [showSeverityDropdown, setShowSeverityDropdown] = useState(false);
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
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
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

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
      <div className="fixed top-0 left-0 w-full h-screen bg-white/20 backdrop-blur-md -z-10"></div>
      
      <main className="min-h-screen p-6 pt-24 max-w-7xl mx-auto">
        

        {/* Middle Section - Symptom Checker and AI Results */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          {/* Check Your Symptoms Card */}
          <div className="bg-white/20 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-8 shadow-xl">
            <h2 className="text-[#234451] text-2xl font-semibold mb-6">Check Your Symptoms</h2>

            {currentStep === 0 && (
              <>
                <h3 className="text-[#234451] font-semibold mb-4">Number of Previous Pregnancies</h3>
                <div className="mb-4">
                  <p className="text-[#234451] text-sm mb-2">Selected: {formData.parity}</p>
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
                <h3 className="text-[#234451] font-semibold mb-4">Substance Use</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['None', 'Smoking', 'Alcohol', 'Recreational drugs'].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField('substanceUse', option.toLowerCase())}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border ${
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
                <h3 className="text-[#234451] font-semibold mb-4">Type of Pregnancy</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Single', 'Twins', 'Triplets or more'].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField('pregnancyType', option.toLowerCase())}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border ${
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
                <h3 className="text-[#234451] font-semibold mb-4">Previous Pregnancy Complications</h3>
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
                <h3 className="text-[#234451] font-semibold mb-4">Symptom Type</h3>
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
                <h3 className="text-[#234451] font-semibold mb-4">Severity</h3>
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
                <h3 className="text-[#234451] font-semibold mb-4">Duration</h3>
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
                <h3 className="text-[#234451] font-semibold mb-4">Frequency</h3>
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
                <h3 className="text-[#234451] font-semibold mb-4">Associated Symptoms</h3>
                <input
                  type="text"
                  value={formData.associatedFactors}
                  onChange={(e) => updateField('associatedFactors', e.target.value)}
                  className="w-full px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 placeholder-[#a48bc3] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                  placeholder="e.g. fever, urination, trauma"
                />
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 9 && (
              <>
                <h3 className="text-[#234451] font-semibold mb-4">Fetal Movement</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {['Normal', 'Reduced', 'No movement'].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField('fetalMovement', option.toLowerCase())}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border ${
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
                <h3 className="text-[#234451] font-semibold mb-4">How do you feel?</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {['Stable', 'Anxious', 'Sad', 'Overwhelmed', 'Depressed'].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateField('mentalHealth', option.toLowerCase())}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border ${
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
                className="text-sm px-6 py-3 bg-[#234451] text-[#fabdb5] rounded-lg font-medium disabled:opacity-50"
              >
                Back
              </button>
              {currentStep < 10 ? (
                <button
                  onClick={nextStep}
                  className="text-sm px-6 py-3 bg-[#DFA69F] text-[#234451] rounded-lg font-medium"
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
                  className="text-sm px-6 py-3 bg-[#DFA69F] text-[#234451] rounded-lg font-medium"
                >
                  Submit
                </button>
              )}
            </div>
          </div>

          {/* AI Assessment Results Card*/}
          <div className="relative bg-gradient-to-br from-[#fceef1] via-[#f3f0ff] to-[#e7f2ff] border border-[#bcb2da]/30 rounded-3xl p-10 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-stars opacity-10 pointer-events-none z-0"></div>
            <h2 className="text-[#234451] text-3xl font-bold mb-4 text-center z-10 relative drop-shadow-sm">Assessment Results</h2>
            <p className="text-[#234451] text-md mb-8 text-center z-10 relative max-w-md mx-auto">Based on your answers, Materna's AI suggests:</p>
            
            <div className="space-y-6 relative z-10">
              <div className="bg-white/70 backdrop-blur-md border border-[#e5d9fa] rounded-2xl p-6 shadow-md transition-transform hover:scale-[1.01] duration-200">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 bg-[#fabdb5]/80 rounded-full shadow-lg border border-white"></div>
                  <div>
                    <h3 className="font-semibold text-[#234451] mb-1 text-lg">Recommendation</h3>
                    <p className="text-[#234451] text-sm leading-relaxed">Seek immediate care for severe symptoms.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-md border border-[#e5d9fa] rounded-2xl p-6 shadow-md transition-transform hover:scale-[1.01] duration-200">
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
        <section className="mt-12 text-center">
          <h2 className="text-[#234451] text-2xl font-semibold mb-6 relative z-20 px-4 py-2 rounded-xl inline-block bg-white/20 backdrop-blur-md border border-[#bcb2da]/50">
            Need to talk to someone? Quick Contacts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Emergency Services */}
            <div className="bg-white/20 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-6 shadow-xl">
              <h2 className="text-[#234451] text-xl font-semibold mb-2">Emergency</h2>
              <p className="text-[#234451] text-sm mb-4">Call 911 immediately</p>
              <button className="bg-red-600 text-white px-6 py-4 rounded-lg font-medium hover:bg-red-700 transition-all w-full border border-[#a48bc3]/50 flex items-center justify-center gap-2">
                Call 911
              </button>
            </div>

            {/* OB/GYN Contact */}
            <div className="bg-white/20 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-6 shadow-xl">
              <h2 className="text-[#234451] text-xl font-semibold mb-2">Your OB/GYN</h2>
              <p className="text-[#234451] text-sm mb-4">Contact your doctor</p>
              <button className="bg-[#234451] text-white px-6 py-4 rounded-lg font-medium hover:bg-[#1b343f] transition-all w-full border border-[#a48bc3]/50 flex items-center justify-center gap-2">
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
import React, { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import bgVideo from "@/assets/sky1.mp4";
import { StarStill } from "@/components/StarStill.jsx"

const Normal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    parity: '',
    substanceUse: '',
    pregnancyType: '',
    prevComplications: '',
    symptomType: '',
    severity: '',
    duration: '',
    frequency: '',
    associatedFactors: '',
    fetalMovement: '',
    mentalHealth: ''
  });

  const nextStep = () => {
    const fields = [
      'parity', 'substanceUse', 'pregnancyType', 'prevComplications',
      'symptomType', 'severity', 'duration', 'frequency',
      'associatedFactors', 'fetalMovement', 'mentalHealth'
    ];
    const currentField = fields[currentStep];
    if (!formData[currentField]) {
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
        {/* Top Section - Emergency Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Symptom SOS Card */}
          <div className="bg-white/20 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-6 shadow-xl">
            <h2 className="text-[#234451] text-xl font-semibold mb-2">Symptom SOS</h2>
            <p className="text-[#234451] text-sm mb-4">Need immediate help?</p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-all w-full border border-[#a48bc3]/50">
              Emergency Services
            </button>
          </div>

          {/* Emergency Services */}
          <div className="bg-white/20 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-6 shadow-xl">
            <h2 className="text-[#234451] text-xl font-semibold mb-2">Emergency</h2>
            <p className="text-[#234451] text-sm mb-4">Call 911 immediately</p>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-all w-full border border-[#a48bc3]/50 flex items-center justify-center gap-2">
              Call 911
            </button>
          </div>

          {/* OB/GYN Contact */}
          <div className="bg-white/20 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-6 shadow-xl">
            <h2 className="text-[#234451] text-xl font-semibold mb-2">Your OB/GYN</h2>
            <p className="text-[#234451] text-sm mb-4">Contact your doctor</p>
            <button className="bg-[#234451] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1b343f] transition-all w-full border border-[#a48bc3]/50 flex items-center justify-center gap-2">
              Call Doctor
            </button>
          </div>
        </div>

        {/* Middle Section - Symptom Checker and AI Results */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          {/* Check Your Symptoms Card */}
          <div className="bg-white/20 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-8 shadow-xl">
            <h2 className="text-[#234451] text-2xl font-semibold mb-6">Check Your Symptoms</h2>

            {currentStep === 0 && (
              <>
                <h3 className="text-[#234451] font-semibold mb-4">Number of Previous Pregnancies</h3>
                <input
                  type="number"
                  min={0}
                  value={formData.parity}
                  onChange={(e) => updateField('parity', e.target.value)}
                  className="w-full px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 placeholder-[#a48bc3] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                  placeholder="e.g. 2"
                />
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 1 && (
              <>
                <h3 className="text-[#234451] font-semibold mb-4">Substance Use</h3>
                <div className="flex flex-wrap gap-3">
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
                <select
                  value={formData.pregnancyType}
                  onChange={(e) => updateField('pregnancyType', e.target.value)}
                  className="w-full px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 text-[#234451] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                >
                  <option value="">Select one</option>
                  <option value="singleton">Singleton</option>
                  <option value="twins">Twins</option>
                  <option value="triplets">Triplets or more</option>
                </select>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 3 && (
              <>
                <h3 className="text-[#234451] font-semibold mb-4">Previous Pregnancy Complications</h3>
                <input
                  type="text"
                  value={formData.prevComplications}
                  onChange={(e) => updateField('prevComplications', e.target.value)}
                  className="w-full px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 placeholder-[#a48bc3] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                  placeholder="e.g. preeclampsia, gestational diabetes"
                />
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 4 && (
              <>
                <h3 className="text-[#234451] font-semibold mb-4">Symptom Type</h3>
                <input
                  type="text"
                  value={formData.symptomType}
                  onChange={(e) => updateField('symptomType', e.target.value)}
                  className="w-full px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 placeholder-[#a48bc3] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                  placeholder="e.g. Headache, Swelling"
                />
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 5 && (
              <>
                <h3 className="text-[#234451] font-semibold mb-4">Severity</h3>
                <select
                  value={formData.severity}
                  onChange={(e) => updateField('severity', e.target.value)}
                  className="w-full px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 text-[#234451] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                >
                  <option value="">Select severity</option>
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 6 && (
              <>
                <h3 className="text-[#234451] font-semibold mb-4">Duration</h3>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => updateField('duration', e.target.value)}
                  className="w-full px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 placeholder-[#a48bc3] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                  placeholder="e.g. 2 hours, 3 days"
                />
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 7 && (
              <>
                <h3 className="text-[#234451] font-semibold mb-4">Frequency</h3>
                <select
                  value={formData.frequency}
                  onChange={(e) => updateField('frequency', e.target.value)}
                  className="w-full px-4 py-3 border border-[#bcb2da]/50 rounded-lg text-sm bg-white/30 text-[#234451] focus:ring-2 focus:ring-[#DFA69F]/50 transition-all"
                >
                  <option value="">Select frequency</option>
                  <option value="single">Single episode</option>
                  <option value="recurring">Recurring</option>
                  <option value="continuous">Continuous</option>
                </select>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </>
            )}

            {currentStep === 8 && (
              <>
                <h3 className="text-[#234451] font-semibold mb-4">Associated Factors</h3>
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
                <div className="flex flex-wrap gap-3">
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
                <h3 className="text-[#234451] font-semibold mb-4">Emotional or Mental Health Symptoms</h3>
                <div className="flex flex-wrap gap-3">
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
                className="text-sm px-6 py-3 bg-[#bcb2da] text-[#234451] rounded-lg font-medium disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === 10}
                className="text-sm px-6 py-3 bg-[#DFA69F] text-[#234451] rounded-lg font-medium"
              >
                Next
              </button>
            </div>
          </div>

          {/* AI Assessment Results Card*/}
          <div className="bg-white/20 backdrop-blur-md border border-[#bcb2da]/50 rounded-2xl p-8 shadow-xl">
            <h2 className="text-[#234451] text-2xl font-semibold mb-4">Assessment Results</h2>
            <p className="text-[#234451] text-sm mb-8">Based on your answers, Materna's AI suggests the following actions:</p>
            
            <div className="space-y-6">
              <div className="bg-[#bcb2da]/40 backdrop-blur-md border border-[#a48bc3]/50 rounded-xl p-6 shadow-md">
                <div className="flex gap-4">
                  <div className="w-5 h-5 bg-[#fabdb5]/80 backdrop-blur-md rounded-sm mt-1 flex-shrink-0 shadow-sm"></div>
                  <div>
                    <h3 className="font-semibold text-[#234451] mb-2">Recommendation</h3>
                    <p className="text-[#234451] text-sm leading-relaxed">Seek immediate care for severe symptoms.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#bcb2da]/40 backdrop-blur-md border border-[#a48bc3]/50 rounded-xl p-6 shadow-md">
                <div className="flex gap-4">
                  <div className="w-5 h-5 bg-[#fabdb5]/80 backdrop-blur-md rounded-sm mt-1 flex-shrink-0 shadow-sm"></div>
                  <div>
                    <h3 className="font-semibold text-[#234451] mb-2">Recommendation</h3>
                    <p className="text-[#234451] text-sm leading-relaxed">Monitor symptoms and contact your healthcare provider.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
      
      <Footer />
    </>
  );
};

export default Normal;
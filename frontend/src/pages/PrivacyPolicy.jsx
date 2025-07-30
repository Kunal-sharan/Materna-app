

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StarStill from "../components/StarStill";
import sky1 from "../assets/sky1.mp4";

const PrivacyPolicy = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
        src={sky1}
      />
      <div className="fixed top-0 left-0 w-full h-screen bg-white/50 backdrop-blur-sm -z-10" />
      <Navbar />
      <main className="min-h-screen pt-32 px-6 pb-20 text-[#234451] max-w-4xl mx-auto">
        <div className="space-y-6 bg-white/80 backdrop-blur-md p-6 rounded-lg">
          <h1 className="text-4xl font-bold">Materna Privacy Policy Agreement</h1>
          <p>
            At Materna, your privacy is not just a priority, it’s a promise. We understand that you're trusting us with deeply personal information, and we’re committed to handling that data with care, empathy, and respect.
          </p>
          <p>
            This Privacy Policy outlines how we collect, use, store, and protect the information you choose to share with us, whether through our website, app, chatbot, or other services. Our goal is to support you, not track you, so we only collect what’s truly necessary, and we never sell your data.
          </p>
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <ul className="list-disc list-inside pl-4">
            <li>Personal details: name, contact info (email, phone number)</li>
            <li>Demographics: age, city, pregnancy stage</li>
            <li>Health-related input: symptoms, moods, wellness logs, emergency tags</li>
            <li>App activity: interactions with our AI chatbot, usage of tools like Symptom Tracker or Wellness Hub</li>
            <li>Feedback: testimonials, surveys, messages you send us</li>
          </ul>
          <p>All of this is entirely optional — you’re always in control of what you share.</p>

          <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside pl-4">
            <li>Help you track your pregnancy and health with personalized insights</li>
            <li>Offer tailored support and wellness tips through our AI tools</li>
            <li>Improve our platform’s features, usability, and accuracy</li>
            <li>Communicate with you about features, reminders, or updates (only if you’ve opted in)</li>
          </ul>
          <p>We do not sell, rent, or share your data with advertisers or unrelated third parties. Period.</p>

          <h2 className="text-2xl font-semibold">3. Data Confidentiality</h2>
          <p>Your data is only accessible to:</p>
          <ul className="list-disc list-inside pl-4">
            <li>Our AI system and technical team maintaining the platform</li>
            <li>Professionals you voluntarily choose to connect with (e.g., community mentors or healthcare providers)</li>
            <li>Your partner if added by you</li>
          </ul>
          <p>All collaborators are contractually and ethically bound to maintain confidentiality. Materna is a judgment-free, private space.</p>

          <h2 className="text-2xl font-semibold">4. Storage and Security</h2>
          <ul className="list-disc list-inside pl-4">
            <li>Secure servers with encrypted storage</li>
            <li>HTTPS and SSL protocols for data transmission</li>
            <li>Limited access control for internal team members</li>
            <li>Routine audits and compliance checks</li>
          </ul>
          <p>We also store minimal personally identifiable information unless it’s required for a specific service you request.</p>

          <h2 className="text-2xl font-semibold">5. Your Rights</h2>
          <ul className="list-disc list-inside pl-4">
            <li>Access your data at any time</li>
            <li>Request correction of inaccurate or outdated information</li>
            <li>Withdraw consent and ask for your data to be deleted</li>
            <li>Limit what you share — many features work without needing all your details</li>
          </ul>
          <p>We comply with applicable data privacy laws in the United States and follow best practices globally.</p>

          <h2 className="text-2xl font-semibold">6. Use by Minors</h2>
          <p>
            Materna is intended for individuals aged 18 and over. We do not knowingly collect data from minors. If you believe a minor has submitted data, please contact us so we can delete it promptly.
          </p>

          <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
          <p>
            We may occasionally update this policy to reflect new features or legal requirements. We’ll notify you via the app or website when significant changes occur. Using Materna after those changes means you’re okay with the new terms.
          </p>

          <h2 className="text-2xl font-semibold">8. Contact Us</h2>
          <p>
            Have questions? Need help managing your data? Just want to talk to a human?
            <br />
            📧 materna.for.moms@gmail.com
            <br />
            🌐 www.materna-mothers.netlify.app
            <br />
            We’re always here: no bots, no nonsense, just real support.
          </p>
        </div>
      </main>
      <Footer />
      <StarStill />
    </div>
  );
};

export default PrivacyPolicy;
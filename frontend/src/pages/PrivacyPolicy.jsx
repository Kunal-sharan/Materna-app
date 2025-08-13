import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarStill } from "@/components/StarStill.jsx";
import bgVideo from "@/assets/sky1.mp4";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen overflow-hidden pt-32 p-8 text-left text-[#234451] z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-screen object-cover -z-10"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <StarStill />
        <div className="relative z-10 bg-white/40 backdrop-blur-md p-6 rounded-xl shadow-md max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 mt-6">Materna Privacy Policy</h1>
          <p className="text-sm mb-6 italic">
            Last Updated: {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <p className="text-sm mb-4">
    Materna (“we,” “us,” or “our”) is committed to protecting the privacy and data of every user who interacts with our platform. This Privacy Policy outlines how we collect, use, store, and safeguard your personal data through our website, mobile app, and any other digital interface we operate. By using our services, you agree to the terms of this policy.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
          <p className="text-sm mb-2">When you interact with Materna's UI/UX, we may collect the following types of information:</p>

          <h3 className="font-semibold text-[#234451] text-sm mb-1">a. Personal Information (provided by you):</h3>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>Full name</li>
            <li>Email address or phone number</li>
            <li>Age, city, or location</li>
            <li>Profile photo or avatar (optional)</li>
            <li>Symptom inputs, journal entries, and feedback you submit</li>
          </ul>

          <h3 className="font-semibold text-[#234451] text-sm mb-1">b. Technical Information (collected automatically):</h3>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>IP address</li>
            <li>Device type (mobile, desktop)</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Language and time zone</li>
            <li>Referring pages or links</li>
            <li>Interaction data (pages visited, buttons clicked, time spent, errors encountered)</li>
          </ul>

          <h3 className="font-semibold text-[#234451] text-sm mb-1">c. Cookies and Tracking Technologies:</h3>
          <p className="text-sm mb-2">We may use cookies and similar technologies (e.g. local storage, session tracking) to improve your experience, remember your preferences, and personalize content. You may disable cookies in your browser settings, but this may impact functionality.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>Create and manage your Materna account</li>
            <li>Personalize your dashboard and recommendations</li>
            <li>Improve site functionality, usability, and user flow</li>
            <li>Track user engagement and identify pain points</li>
            <li>Debug issues and improve system performance</li>
            <li>Respond to your messages or support requests</li>
            <li>Provide insights to better support new moms (in aggregate, anonymized form)</li>
          </ul>
          <p className="text-sm mb-2">We will never sell or share your personal data with third parties for advertising or profit.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">3. User-Generated Content and AI Tools</h2>
          <p className="text-sm mb-2">Some Materna features (e.g. Symptom SOS or chatbot) involve generating personalized responses or storing emotional/physical health insights. We treat these interactions as private, and only use them to:</p>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>Improve your personal experience</li>
            <li>Train or enhance our models in an anonymized, ethical way (only with your consent)</li>
          </ul>
          <p className="text-sm mb-2">You may delete your content at any time through your profile settings or by emailing us.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">4. Data Confidentiality & Access</h2>
          <p className="text-sm mb-2">Only authorized Materna team members and technical staff have access to your data, and solely for operational or support purposes. All team members are bound by strict confidentiality agreements.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">5. Storage, Security, and Retention</h2>
          <p className="text-sm mb-2">We use industry-standard security protocols to store and protect your data. This includes:</p>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>Encrypted HTTPS connections</li>
            <li>Secure cloud-based databases (e.g. Firebase, AWS, or equivalent)</li>
            <li>Regular backups and access audits</li>
            <li>Timely deletion of inactive or obsolete user data</li>
          </ul>
          <p className="text-sm mb-2">We retain your data only for as long as necessary to fulfill its purpose, unless otherwise required by law.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">6. Your Rights</h2>
          <p className="text-sm mb-2">You have the right to:</p>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>Access the data we have on you</li>
            <li>Request corrections or updates</li>
            <li>Delete your account and associated data</li>
            <li>Opt out of non-essential communications</li>
            <li>Disable cookies or tracking</li>
          </ul>
          <p className="text-sm mb-2">We will respond to all requests within a reasonable timeframe.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">7. Children’s Privacy</h2>
          <p className="text-sm mb-2">Materna is not intended for use by children under 13. We do not knowingly collect data from minors without parental consent.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">8. Changes to This Policy</h2>
          <p className="text-sm mb-2">We may update this policy to reflect changes in our services, technologies, or legal obligations. We’ll notify you via app alerts, email, or on-site notices. Continued use after an update means you accept the revised policy.</p>

          <h2 className="text-xl font-semibold mt-8 mb-2">9. Contact Us</h2>
          <p className="text-sm mb-2">
    If you have questions, concerns, or requests related to privacy or data, reach out anytime:
    <br />
    materna.for.moms@gmail.com<br />
          </p>
        </div>
        <div className="fixed top-0 left-0 w-full h-screen bg-white/50 backdrop-blur-sm -z-10" />
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StarStill } from "@/components/StarStill.jsx";
import bgVideo from "@/assets/sky1.mp4";

const TOS = () => {
  const effectiveDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
          <h1 className="text-3xl font-bold mb-4 mt-6">
            Materna Terms of Service
          </h1>
          <p className="text-sm mb-6 italic">Effective Date: {effectiveDate}</p>

          <p className="text-sm mb-4">
            Welcome to Materna! We're excited to support you through your
            maternal journey. These Terms of Service (“Terms”) govern your
            access to and use of the Materna website, mobile application, and
            related services (“Services”), operated by Materna (“we,” “us,” or
            “our”).
          </p>

          <p className="text-sm mb-4">
            By using our Services, you agree to these Terms. If you don’t agree,
            please don’t use Materna.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">1. Eligibility</h2>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>Be at least 13 years old</li>
            <li>Have legal capacity to enter into a binding agreement</li>
            <li>Use the Services in accordance with applicable laws</li>
          </ul>
          <p className="text-sm mb-2">
            If you're under 18, you must have parental or guardian consent.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            2. Your Materna Account
          </h2>
          <p className="text-sm mb-2">
            To access some features, you may need to create an account. You're
            responsible for:
          </p>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>Providing accurate info</li>
            <li>Keeping your login credentials safe</li>
            <li>Not sharing your account with others</li>
          </ul>
          <p className="text-sm mb-2">
            We may suspend or terminate your account if we believe it’s been
            compromised or misused.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            3. What You Can and Can’t Do
          </h2>
          <p className="text-sm mb-2">You can use Materna to:</p>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>Track your health and wellness</li>
            <li>Access personalized support and tools</li>
            <li>Connect with our community respectfully</li>
          </ul>
          <p className="text-sm mb-2">You can’t use Materna to:</p>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>Post harmful, offensive, or misleading content</li>
            <li>Harass or exploit other users</li>
            <li>Upload viruses or try to hack our platform</li>
            <li>Scrape or harvest data without consent</li>
            <li>Misrepresent yourself or impersonate others</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            4. Our Content and Your Content
          </h2>
          <h3 className="font-semibold text-[#234451] text-sm mb-1">
            a. Our Stuff:
          </h3>
          <p className="text-sm mb-2">
            All trademarks, branding, design, content, and software on Materna
            are our intellectual property or used with permission. Please don’t
            copy, sell, or distribute it without our consent.
          </p>

          <h3 className="font-semibold text-[#234451] text-sm mb-1">
            b. Your Stuff:
          </h3>
          <p className="text-sm mb-2">
            You retain ownership of the data and content you upload (e.g.,
            journal entries, symptom logs). By using our platform, you give us a
            limited license to use that content to operate and improve the
            Services.
          </p>
          <p className="text-sm mb-2">
            We may anonymize and aggregate user data to generate insights or
            enhance product features—but we will never sell your personal info.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            5. AI Tools & Wellness Information
          </h2>
          <p className="text-sm mb-2">
            Materna may offer AI-powered tools or health-related tips. Important
            disclaimer:
          </p>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>We are not a substitute for professional medical advice</li>
            <li>Our content is for informational and support purposes only</li>
            <li>
              Always consult a doctor or licensed provider for medical decisions
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            6. Community Guidelines
          </h2>
          <p className="text-sm mb-2">
            Our platform is a safe space. To protect that:
          </p>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>Be respectful, inclusive, and empathetic</li>
            <li>Don’t share another person’s private information</li>
            <li>Report harmful or inappropriate behavior</li>
          </ul>
          <p className="text-sm mb-2">
            We reserve the right to remove content or suspend accounts that
            violate these values.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            7. Service Availability
          </h2>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>We don’t guarantee uninterrupted access or zero bugs</li>
            <li>We may update, pause, or discontinue features at any time</li>
          </ul>
          <p className="text-sm mb-2">
            If we make major changes, we’ll do our best to notify you.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">8. Termination</h2>
          <p className="text-sm mb-2">
            You can stop using Materna anytime. We also reserve the right to
            suspend or terminate your access if:
          </p>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>You break these Terms</li>
            <li>We detect misuse or unauthorized activity</li>
            <li>We decide to discontinue the platform</li>
          </ul>
          <p className="text-sm mb-2">
            Termination does not affect any rights or obligations incurred
            before the termination date.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            9. Limitation of Liability
          </h2>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>Materna is provided “as is” without warranties of any kind</li>
            <li>
              We’re not liable for damages, loss of data, or health outcomes
              that result from using our Services
            </li>
            <li>Your use of Materna is at your own risk</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2">10. Privacy</h2>
          <p className="text-sm mb-2">
            By using Materna, you also agree to our Privacy Policy which
            explains how we handle your data and protect your privacy.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">11. Governing Law</h2>
          <p className="text-sm mb-2">
            These Terms are governed by the laws of the State of Texas, USA. Any
            legal action relating to Materna must be brought in courts located
            in Dallas County, Texas.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            12. Changes to These Terms
          </h2>
          <p className="text-sm mb-2">
            We may revise these Terms from time to time. When we do:
          </p>
          <ul className="list-disc pl-5 text-sm mb-2">
            <li>We’ll post an updated version on our website</li>
            <li>Continued use of Materna means you accept the updated Terms</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2">13. Contact Us</h2>
          <p className="text-sm mb-2">
            Questions or concerns? Reach out anytime:
            <br />
            materna.for.moms@gmail.com
          </p>
        </div>
        <div className="fixed top-0 left-0 w-full h-screen bg-white/50 backdrop-blur-sm -z-10" />
      </main>
      <Footer />
    </>
  );
};

export default TOS;

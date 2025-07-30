import { Navbar } from "../components/Navbar";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/Mission";
import { ProjectsSection } from "../components/Waitlist";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import bgVideo from "@/assets/sky1.mp4";

export const Home = () => {
  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-screen object-cover -z-20 transition-opacity duration-1000"
        onEnded={(e) => {
          e.target.style.opacity = 0;
          setTimeout(() => {
            e.target.currentTime = 0;
            e.target.play();
            e.target.style.opacity = 1;
          }, 500);
        }}
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="fixed top-0 left-0 w-full h-screen bg-white/50 backdrop-blur-sm -z-10"></div>

      {/* Navbar */}
      <Navbar />


      {/* Background Effects + Main Content */}
      <div className="relative z-0">
        <StarBackground />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ContactSection />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

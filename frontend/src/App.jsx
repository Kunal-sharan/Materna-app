import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Toaster } from "@/components/ui/toaster";
import Chatbot from "@/pages/Chatbot";
import Journal from "./pages/Journal";
import Normal from "./pages/SOS";
import Wellness from "./pages/Wellness";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import Milestones from "./pages/Milestones";
import Vaccines from "./pages/Vaccines";
import Essentials from "./pages/Essentials";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TOS from "./pages/TOS";
import ResetPassword from "./pages/ResetPassword";
import CreatePost from "./pages/CreatePost";
import Blog from "./pages/Blog";

function AppContent() {
  const location = useLocation();
  const showChatbot = !["/signup", "/login"].includes(location.pathname);

  return (
    <>
      <Toaster />
      {showChatbot && <Chatbot />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/normal" element={<Normal />} />
        <Route path="/wellness" element={<Wellness />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/milestones" element={<Milestones />} />
        <Route path="/vaccination" element={<Vaccines />} />
        <Route path="/essentials" element={<Essentials />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/termsofservice" element={<TOS />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

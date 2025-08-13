import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Symptom Journal", href: "/journal" },
  { name: "Emergency Help", href: "/normal" },
  { name: "Wellness Hub", href: "/wellness" },
  { name: "Community", href: "/community" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.screenY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      const storedPhoto = localStorage.getItem("maternaUserPhoto");
      if (storedPhoto) setPhoto(storedPhoto);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300 font-sans",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs"
          : "py-5",
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          className="text-xl font-bold text-primary flex items-center"
          to="/"
        >
          <img
            src="/Logo.png"
            alt="Materna Logo"
            className="h-10 w-10.5 mr-1.5"
          />
          <span className="relative z-10 text-[#234451] font-bold">
            <span className="text-glow text-foreground"></span> Materna
          </span>
        </Link>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, key) => (
            <Link
              key={key}
              to={item.href}
              className="text-[#234451] hover:text-primary transition-colors duration-300 font-sans"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="relative group">
            <button className="text-[#234451] hover:text-primary transition-colors duration-300 font-sans">
              Postpartum
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              <Link
                to="/essentials"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Newborn Essentials
              </Link>
              <Link
                to="/vaccination"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Vaccination Reminder
              </Link>
              <Link
                to="/milestones"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Baby Milestones
              </Link>
            </div>
          </div>
        </div>

        {user ? (
          <Link to="/profile">
            <img
              src={
                photo ||
                "https://i.pinimg.com/236x/40/41/6f/40416fe5cfc9de788b1fcd769c93013a.jpg"
              }
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://i.pinimg.com/236x/40/41/6f/40416fe5cfc9de788b1fcd769c93013a.jpg";
              }}
              alt="profile"
              className="hidden md:inline-block h-10 w-10 rounded-full object-cover"
            />
          </Link>
        ) : (
          <Link
            to="/signup"
            className="hidden md:inline-block px-4 py-2 text-sm font-semibold text-white bg-[#a48bc3] rounded-xl hover:bg-[#9771bc] transition"
          >
            Login / Sign Up
          </Link>
        )}

        {/* mobile nav */}

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>

        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdroup-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <Link
                key={key}
                to={item.href}
                className="text-[#234451] hover:text-primary transition-colors duration-300 font-sans"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 text-lg">
              <span className="text-[#234451] font-semibold">Postpartum</span>
              <Link
                to="/essentials"
                className="text-[#234451] hover:text-primary transition"
              >
                Newborn Essentials
              </Link>
              <Link
                to="/vaccination"
                className="text-[#234451] hover:text-primary transition"
              >
                Vaccination Reminder
              </Link>
              <Link
                to="/milestones"
                className="text-[#234451] hover:text-primary transition"
              >
                My Baby Milestones
              </Link>
            </div>
            {user ? (
              <Link
                to="/profile"
                className="text-[#a48bc3] hover:text-[#9771bc] transition text-lg font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                View Profile
              </Link>
            ) : (
              <Link
                to="/signup"
                className="text-[#a48bc3] hover:text-[#9771bc] transition text-lg font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

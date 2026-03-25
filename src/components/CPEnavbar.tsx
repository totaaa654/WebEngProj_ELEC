import { useMemo } from "react";
import COELogo from "../assets/COE.svg";
import type { NavId } from "../types/nav";

/**
 * Rendered as CPEnavbarProps to avoid conflicts with 
 * global or generic Navbar types in your project.
 */
type CPEnavbarProps = {
  logoSrc?: string;
  onNav?: (id: NavId) => void;
};

export default function CPEnavbar({
  logoSrc = COELogo,
  onNav,
}: CPEnavbarProps) {
  const links = useMemo(
    () => [
      { id: "home" as const, label: "Home" },
      { id: "about" as const, label: "Program Overview" },
      { id: "peo" as const, label: "PEO" },
      { id: "so" as const, label: "SO" },
      { id: "curriculum" as const, label: "Curriculum" },
      { id: "laboratories" as const, label: "Laboratories" },
      { id: "faculty" as const, label: "Faculty" },
      { id: "careers" as const, label: "Careers" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="relative h-16 max-w-6xl mx-auto px-6 flex items-center">
        
        {/* Logo / Home Button */}
        <button
          type="button"
          onClick={() => onNav?.("home")}
          className="flex items-center gap-3 transition hover:opacity-80 group"
          aria-label="Home"
        >
          <img src={logoSrc} alt="BulSU COE Logo" className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300" />
          <div className="leading-tight text-left hidden sm:block">
            {/* Changed from Maroon to Dark Slate & Blue */}
            <span className="block font-black text-slate-900 text-sm tracking-tight">BulSU</span>
            <span className="block text-blue-600 font-bold text-[9px] uppercase tracking-[0.2em]">Computer Engineering</span>
          </div>
        </button>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 text-xs font-semibold text-slate-500">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNav?.(link.id)}
              className="relative group py-1 hover:text-blue-600 transition-colors duration-300"
            >
              {link.label}
              {/* Animated Tech Underline Effect */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 ease-out group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Right Side: Contact Action */}
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => onNav?.("contact")}
            // Changed from Maroon to the glowing Blue tech button style
            className="hidden md:inline-flex items-center justify-center px-6 py-2 rounded-full text-white text-sm font-bold bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}
import { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import MFENavbar from "../../components/MFEnavbar";
import { mergeDeptWithOverrides } from "../../lib/departmentAdmin";
import { MFE } from "../../data/department/MFE";
import "../../styles/departments/MFE.css";

function StatItem({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="group cursor-default">
      <div className="text-5xl font-black tracking-tighter italic mb-3 text-white transition-transform group-hover:scale-110 leading-none tabular-nums">
        {value.toLocaleString()}
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 group-hover:text-slate-300 transition-colors">
        {label}
      </div>
    </div>
  );
}

interface AnimatedStatProps {
  value: number;
  label: string;
  Component: React.ComponentType<{ value: number; label: string }>;
}

const AnimatedStat = ({ value, label, Component }: AnimatedStatProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) {
      setDisplayValue(0);
      return;
    }

    const totalMiliseconds = 2000;
    const frameRate = 16; 
    const totalFrames = totalMiliseconds / frameRate;
    const increment = end / totalFrames;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [value]);

  return <Component value={displayValue} label={label} />;
};

export default function MFEPage() {
  const [baseDept] = useState<typeof MFE>(MFE);
  const [activeId, setActiveId] = useState<string>("home");
  
  // FIX 1: ADDED REF TO PREVENT CLICK/SCROLL FIGHTING
  const isClickScrolling = useRef(false);
  
  const deptWithNewAccent = useMemo(() => ({
    ...baseDept,
    theme: { ...baseDept.theme, accentHex: "#26bac8" }
  }), [baseDept]);

  const dept = useMemo(() => mergeDeptWithOverrides(deptWithNewAccent), [deptWithNewAccent]);

  // FIX 1: UPDATED SCROLL LOGIC TO DETECT BOTTOM OF PAGE
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const sections = ["home", "stats", "peo", "so", "curriculum", "laboratories", "faculty", "contact"];
      
      // Check if we are at the very bottom of the page
      const isAtBottom = window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight - 50;
      if (isAtBottom) {
        setActiveId("contact");
        return;
      }

      // Normal section tracking
      let currentSection = sections[0];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold (200px from top) to trigger highlighting earlier
          if (rect.top <= 200) { 
            currentSection = section;
          }
        }
      }
      setActiveId(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!dept) return;
    document.title = `${dept.code} | BULSU COE`;
    const link = (document.querySelector("link[rel='icon']") as HTMLLinkElement | null) ??
                 (document.querySelector("link[rel~='icon']") as HTMLLinkElement | null);
    if (link) link.href = `/icons/${dept.code.toLowerCase()}.svg`;
  }, [dept]);

  // FIX 1: UPDATED ONNAV TO SET ID IMMEDIATELY AND PAUSE OBSERVER
  const onNav = (id: string) => {
    setActiveId(id);
    isClickScrolling.current = true;
    
    const el = document.getElementById(id);
    if (el) {
      // 80 is the offset for your fixed navbar
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    // Re-enable scroll listener after 1 second
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  const [selectedLab, setSelectedLab] = useState<null | { name: string; image: string }>(null);

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <style>{`
        @keyframes revealDown { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-reveal-down { animation: revealDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .blueprint-grid { background-image: radial-gradient(#e5e7eb 1.2px, transparent 1.2px); background-size: 35px 35px; }
        .glass-panel { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border: 1px solid rgba(229, 231, 235, 0.8); }
        .hover-lift { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-lift:hover { transform: translateY(-5px); }
        /* Hide scrollbar for horizontal sections but keep functionality */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <MFENavbar onNav={onNav as any} activeId={activeId} />

      {/* --- home --- */}
      <section id="home" className="relative mt-23 pb-24 blueprint-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/80 to-[#fcfcfc] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 animate-reveal-down text-center lg:text-left relative z-20">
              <div className="inline-flex items-center mb-10 cursor-default">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-[1.5px] bg-white opacity-80" />
                  <span className="text-white text-[11px] font-black tracking-tighter uppercase italic">
                    COE
                  </span>
                </div>

                <div className="mx-5 h-[1px] w-6 bg-zinc-800" />

                <div className="flex flex-col justify-center">
                  <span className="text-zinc-400 text-[10px] font-bold tracking-[0.2em] uppercase leading-none">
                    College of Engineering
                  </span>
                  <span className="text-zinc-600 text-[8px] font-mono tracking-widest mt-1.5 uppercase">
                    Bulacan State University
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-none mb-4 uppercase italic">
                Manufacturing
              </h1>
              <h2 className="text-xl md:text-2xl font-light tracking-[0.3em] text-slate-300 uppercase mb-10">
                Engineering
              </h2>
              <p className="text-sm md:text-base text-slate-500 font-medium max-w-md mb-12 leading-relaxed border-l-0 lg:border-l-2 border-black lg:pl-8 italic mx-auto lg:mx-0">
                {dept.subtitle}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-5">
                <Link 
                  to={`/dept/${dept.code}/admin`} 
                  className="relative inline-flex items-center gap-6 px-10 py-5 bg-zinc-950 text-white border border-white/10 rounded-sm font-black text-[9px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:border-white/40 group"
                >
                  <span className="relative z-10">Open Department Admin</span>
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-white stroke-[3] transition-transform duration-500 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Link>
                <button 
                  onClick={() => onNav('peo')} 
                  className="group relative px-6 py-3 bg-white text-black rounded-sm overflow-hidden transition-all duration-500 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <span className="relative z-10 font-black text-[9px] uppercase tracking-[0.25em] flex items-center gap-2">
                    Overview
                    <span className="w-1 h-1 rounded-full bg-black transition-all duration-500 group-hover:w-3" />
                  </span>
                  <div className="absolute inset-0 bg-zinc-100 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-6 relative z-10">
              <div className="space-y-6 pt-12">
                <div className="group relative rounded-2xl overflow-hidden shadow-xl border-2 border-white hover-lift">
                  <img src={dept.images.heroLeft} className="w-full h-36 md:h-44 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" />
                </div>
                <div className="group relative rounded-2xl overflow-hidden shadow-xl border-2 border-white hover-lift">
                  <img src={dept.images.heroSmall1} className="w-full h-48 md:h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:-rotate-1" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="group relative rounded-2xl overflow-hidden shadow-xl border-2 border-white hover-lift">
                  <img src={dept.images.heroBig} className="w-full h-64 md:h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" />
                </div>
                <div className="group relative rounded-2xl overflow-hidden shadow-xl border-2 border-white hover-lift">
                  <img src={dept.images.heroSmall2} className="w-full h-32 md:h-40 object-cover transition-all duration-700 group-hover:scale-110 group-hover:-rotate-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- stats --- */}
      <section id="stats" className="w-full bg-[#0f172a] border-y border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="shrink-0 text-center lg:text-left">
            <h2 className="text-4xl font-black text-white italic uppercase leading-none tracking-tighter">
              Department <br /> <span className="text-slate-500 font-light italic">Overview</span>
            </h2>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 w-full max-w-4xl">
            <div className="border-l border-slate-800 pl-8 hover:border-blue-600 transition-colors duration-500">
              <AnimatedStat value={dept.programOverview.stats.students} label="Enrolled Students" Component={StatItem} />
            </div>
            <div className="border-l border-slate-800 pl-8 hover:border-blue-600 transition-colors duration-500">
              <AnimatedStat value={dept.programOverview.stats.faculty} label="Academic Faculty" Component={StatItem} />
            </div>
            <div className="border-l border-slate-800 pl-8 hover:border-blue-600 transition-colors duration-500">
              <AnimatedStat value={dept.programOverview.stats.nonTeaching} label="Non-Teaching Personnel" Component={StatItem} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </section>

      {/* --- peo --- */}
      <section id="peo" className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="relative group aspect-square bg-zinc-50 border border-zinc-100 overflow-hidden rounded-sm shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-black/10">
              <img src={dept.images.peo} className="w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110" alt="PEO Visual" />
              <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none">
                <div className="h-4 w-[1px] bg-black/20" />
                <div className="w-4 h-[1px] bg-black/20" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <header className="mb-12 group/header cursor-default">
              <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter italic leading-[0.9] mb-4">
                Program Educational <br />
                <span className="text-zinc-200 transition-colors duration-700 group-hover/header:text-black">Objectives (PEO)</span>
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">
                  {dept.peo.subtitle}
                </span>
                <div className="flex-1 h-px bg-zinc-100" />
              </div>
            </header>
            <div className="grid grid-cols-1">
              {dept.peo.bullets.map((b, idx) => (
                <div key={idx} className="group flex flex-col space-y-3 pb-8 border-b border-zinc-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] font-black text-black border-b-2 border-black/10 group-hover:border-black transition-all">0{idx + 1}</span>
                    <div className="h-px w-12 bg-zinc-100 group-hover:w-20 group-hover:bg-black transition-all duration-700" />
                  </div>
                  <p className="text-zinc-900 group-hover:text-black text-[13px] font-medium leading-relaxed text-justify transition-colors duration-500 max-w-2xl">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- so --- */}
      <section id="so" className="bg-[#050505] py-20 rounded-[2rem] mx-4 md:mx-12 my-8 relative overflow-hidden border border-white/5 shadow-xl">
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="mb-10 flex items-end justify-between border-b border-white/5 pb-6">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter italic">Student Outcomes</h2>
              <div className="flex items-center gap-3">
                <div className="h-1 w-1 bg-white rounded-full animate-pulse" />
                <p className="text-zinc-600 font-bold tracking-[0.3em] text-[9px] uppercase">Framework Registry</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 opacity-30 hover:opacity-100 transition-opacity">
              <span className="text-[9px] font-mono text-white uppercase tracking-widest">Scroll to Explore</span>
              <div className="w-12 h-[1px] bg-white/20" />
            </div>
          </div>
          <div className="relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar pb-8 px-1">
              {dept.so.outcomes.map((o, idx) => (
                <div key={idx} className="min-w-[75%] md:min-w-[320px] snap-start p-8 rounded-xl bg-zinc-900/40 border border-white/5 transition-all duration-500 hover:bg-white group cursor-pointer">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-black text-zinc-500 group-hover:text-black tracking-widest">0{idx + 1}</span>
                    <div className="h-[1px] w-6 bg-white/10 group-hover:bg-black/20 transition-all" />
                  </div>
                  <h3 className="text-white group-hover:text-black font-black text-[15px] mb-4 uppercase tracking-tight leading-tight transition-colors">{o.title}</h3>
                  <p className="text-[12px] text-zinc-500 group-hover:text-zinc-700 leading-relaxed font-medium transition-colors line-clamp-5 text-justify">{o.text}</p>
                </div>
              ))}
            </div>
            <div className="max-w-[200px] h-[2px] bg-zinc-900 mx-auto overflow-hidden rounded-full">
              <div className="h-full bg-zinc-400 transition-all duration-300 ease-out" style={{ width: `${(1 / dept.so.outcomes.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* --- curriculum --- */}
      <section id="curriculum" className="relative max-w-7xl mx-auto px-6 py-20 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
          <div className="lg:col-span-4">
            <div className="sticky top-32 flex flex-col items-center lg:items-start">
              <div className="group relative">
                <div className="absolute -inset-4 bg-slate-50 rounded-[3rem] scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 -z-10" />
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm p-10 flex items-center justify-center transition-all duration-500 group-hover:border-black group-hover:shadow-2xl">
                  <img src={dept.images.watermark} className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-45 transition-all duration-1000" alt={dept.code} />
                </div>
              </div>
              <div className="mt-10 text-center lg:text-left">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] block mb-2">Program Core</span>
                <h2 className="text-3xl font-black text-black uppercase tracking-tighter italic leading-none">Curriculum <br /> <span className="text-slate-300">Overview</span></h2>
                <div className="h-[2px] w-12 mt-6 bg-black" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-4">
              {dept.curriculum.bullets.map((item, idx) => (
                <div key={idx} className="group relative flex items-center gap-6 p-6 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl transition-all duration-500 hover:border-black hover:bg-white hover:shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.05)] hover:-translate-x-2">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xs font-black text-slate-400 group-hover:bg-black group-hover:text-white group-hover:rotate-[15deg] transition-all duration-500 italic">{(idx + 1).toString().padStart(2, '0')}</div>
                  <div className="flex-1"><p className="text-slate-600 group-hover:text-black text-sm md:text-base font-medium leading-relaxed transition-colors">{item}</p></div>
                  <div className="w-1 h-0 group-hover:h-8 transition-all duration-500 rounded-full" style={{ backgroundColor: dept.theme.accentHex }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- laboratories --- */}
      <section id="laboratories" className="relative max-w-7xl mx-auto px-6 py-25 overflow-hidden border-y border-slate-100">
        <div className="blueprint-grid absolute inset-0 opacity-40 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex flex-col items-center mb-20 text-center">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.5em] block mb-4">Technical Facilities</span>
            <h2 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter italic leading-none">{dept.laboratories.title}</h2>
            <div className="h-1 w-24 mt-8" style={{ backgroundColor: dept.theme.accentHex }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {dept.laboratories.items.map((lab, idx) => (
              <div key={idx} onClick={() => setSelectedLab({ name: lab.name, image: lab.image || dept.images.heroSmall1 })} className="group relative bg-white border border-slate-100 rounded-3xl overflow-hidden transition-all duration-700 hover:border-black hover:shadow-2xl cursor-zoom-in">
                <div className="aspect-[16/10] bg-slate-50 overflow-hidden relative">
                  <img src={lab.image || dept.images.heroSmall1} alt={lab.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-500">
                    <span className="text-white text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">View Full Image</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-black text-black uppercase italic text-sm tracking-tight">{lab.name}</h3>
                  <div className="w-8 h-[2px] mt-2 transition-all duration-500 group-hover:w-full" style={{ backgroundColor: dept.theme.accentHex }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- faculty --- */}
      <section id="faculty" className="max-w-6xl mx-auto px-6 py-15 bg-white border-b border-slate-100">
        <div className="relative flex flex-col md:flex-row md:items-end justify-between mb-12 py-12 gap-8 group/header cursor-default">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase italic leading-none transition-transform duration-500 group-hover/header:translate-x-2">{dept.faculty.title}</h2>
            <div className="absolute -bottom-4 left-0 h-[3px] w-12 transition-all duration-700 group-hover/header:w-full" style={{ backgroundColor: dept.theme.accentHex }} />
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-slate-200 group-hover/header:w-24 transition-all duration-700" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{dept.code} // {dept.title}</span>
            </div>
          </div>
        </div>

        {/* FIX 2: FACULTY GRID TO HORIZONTAL SCROLL ON MOBILE */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-24 no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:snap-none md:overflow-visible px-4 md:px-0 -mx-4 md:mx-0">
          {dept.faculty.members.map((member, idx) => (
            <div key={idx} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center group relative flex items-start gap-5 p-6 bg-white border border-slate-100 transition-all duration-300 hover:border-black hover:shadow-xl hover:-translate-y-1">
              <div className="relative shrink-0 w-20 h-20 md:w-24 md:h-24 bg-slate-50 border border-slate-100 overflow-hidden transition-all duration-500 group-hover:border-black">
                {member.image ? <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /> : <div className="absolute inset-0 flex items-center justify-center bg-slate-50"><span className="text-slate-200 font-black italic text-xl">{dept.code}</span></div>}
              </div>
              <div className="flex-1 min-w-0 py-1">
                <div className="flex items-center gap-2 mb-2">
                   {member.role === "Department Chair" && <span className="text-[7px] font-black px-1.5 py-0.5 text-white uppercase tracking-tighter" style={{ backgroundColor: dept.theme.accentHex }}>Chair</span>}
                   <p className="text-[9px] font-bold text-slate-400 group-hover:text-black uppercase tracking-widest transition-colors">{member.role}</p>
                </div>
                <h3 className="text-base md:text-lg font-black text-black transition-colors uppercase italic leading-none break-words">{member.name}</h3>
                <div className="h-[1px] w-0 mt-3 transition-all duration-500 group-hover:w-12" style={{ backgroundColor: dept.theme.accentHex }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- contact --- */}
      <section id="contact" className="group relative w-full bg-[#050505] border-y border-white/5 py-12 transition-all duration-500 hover:border-white/10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-1000 pointer-events-none" 
          style={{ background: `radial-gradient(circle at center, ${dept.theme.accentHex}, transparent)` }} 
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
                Connect <span className="text-zinc-800 transition-colors duration-700 group-hover:text-zinc-500">With Us</span>
              </h2>
              <div className="h-1 w-8 bg-white mt-3 mx-auto md:mx-0" />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-medium">
              Primary contact for academic and industry coordination for <span className="text-white">{dept.code}</span>.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-center w-full md:w-auto">
            <div className="flex flex-col gap-1 items-center md:items-end opacity-40 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Operating Hours</span>
              <span className="text-[12px] font-bold text-white uppercase tracking-wider">08:00 — 17:00 // M—F</span>
            </div>

            <button className="group/btn relative px-8 py-4 overflow-hidden transition-all duration-500 active:scale-95 cursor-pointer border border-white/10 hover:border-white">
              <span className="relative z-10 font-black text-[10px] uppercase tracking-[0.3em] text-white group-hover:text-black transition-colors duration-500 flex items-center gap-3">
                Send Message 
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[3] transition-transform duration-500 group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-[500ms] ease-out" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-900">
          <div 
            className="h-full w-0 group-hover:w-full transition-all duration-700 ease-in-out" 
            style={{ backgroundColor: dept.theme.accentHex }} 
          />
        </div>
      </section>

      {selectedLab && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300" onClick={() => setSelectedLab(null)}>
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <div className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center">
            <button className="absolute -top-12 right-0 text-white hover:text-slate-400 transition-colors flex items-center gap-2 uppercase font-black text-[10px] tracking-widest" onClick={() => setSelectedLab(null)}>Close <span className="text-2xl">×</span></button>
            <img src={selectedLab.image} alt={selectedLab.name} className="w-full max-h-[70vh] object-contain shadow-2xl rounded-lg" />
            <div className="mt-8 text-center"><h3 className="text-white font-black uppercase italic text-2xl tracking-tighter">{selectedLab.name}</h3></div>
          </div>
        </div>
      )}

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 z-[100] flex items-center justify-center w-12 h-12 bg-zinc-950 text-white rounded-sm border border-white/10 shadow-2xl transition-all duration-500 hover:bg-[#26bac8] active:scale-90 group ${
          activeId === "home" ? "opacity-0 translate-y-20 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="absolute inset-0 border border-white/5 rounded-sm group-hover:border-white/20 transition-colors" />
        <svg 
          viewBox="0 0 24 24" 
          className="w-5 h-5 fill-none stroke-current stroke-[3] transition-transform group-hover:-translate-y-1"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
        <span className="absolute right-full mr-4 px-3 py-1.5 bg-zinc-900 text-white text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
          Top
        </span>
      </button>
    </div>
  );
}

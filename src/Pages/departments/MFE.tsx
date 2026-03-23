import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import SectionTitle from "../../components/SectionTitle";
import Footer from "../../components/Footer";
import { mergeDeptWithOverrides } from "../../lib/departmentAdmin";
import { MFE } from "../../data/department/MFE";
import "../../styles/departments/MFE.css";

function StatItem({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="group cursor-default">
      <div className="text-5xl font-black tracking-tighter italic mb-3 text-black transition-transform group-hover:scale-110 leading-none">
        {value.toLocaleString()}
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{label}</div>
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
  
  // Update the theme accent color dynamically before merging
  const deptWithNewAccent = useMemo(() => ({
    ...baseDept,
    theme: { ...baseDept.theme, accentHex: "#26bac8" }
  }), [baseDept]);

  const dept = useMemo(() => mergeDeptWithOverrides(deptWithNewAccent), [deptWithNewAccent]);

  useEffect(() => {
    if (!dept) return;
    document.title = `${dept.code} | BULSU COE`;
    const link = (document.querySelector("link[rel='icon']") as HTMLLinkElement | null) ??
                 (document.querySelector("link[rel~='icon']") as HTMLLinkElement | null);
    if (link) link.href = `/icons/${dept.code.toLowerCase()}.svg`;
  }, [dept]);

  const onNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans selection:bg-black selection:text-white overflow-x-hidden">
      <style>{`
        @keyframes revealDown { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-reveal-down { animation: revealDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .blueprint-grid { background-image: radial-gradient(#e5e7eb 1.2px, transparent 1.2px); background-size: 35px 35px; }
        .glass-panel { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(12px); border: 1px solid rgba(229, 231, 235, 0.8); }
        .hover-lift { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .hover-lift:hover { transform: translateY(-5px); }
        @keyframes scanline-v {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>

      <Navbar onNav={onNav} />

      {/* --- home --- */}
      <section id="home" className="relative mt-16 pb-24 blueprint-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/80 to-[#fcfcfc] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 animate-reveal-down text-center lg:text-left relative z-20">
              <div className="group inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md border border-slate-200 text-slate-500 text-[10px] font-bold tracking-[0.25em] uppercase mb-10 shadow-sm transition-all duration-500 hover:border-black hover:bg-white hover:shadow-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-20" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
                </span>
                
                <span className="group-hover:text-black transition-colors duration-500">
                  College of Engineering
                </span>
                
                <span className="text-slate-300 font-light translate-y-[0.5px]">/</span>
                <span className="text-[8px] opacity-60 group-hover:opacity-100 transition-opacity">BULSU</span>
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
                <Link to={`/dept/${dept.code}/admin`} className="px-8 py-4 bg-black text-white rounded-lg font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-slate-800 hover:-translate-y-1 transition-all active:scale-95">Open Department Admin</Link>
                <button 
                  onClick={() => onNav('about')} 
                  className="relative z-30 px-8 py-4 bg-white border border-slate-200 text-black rounded-lg font-black text-[10px] uppercase tracking-widest hover:border-black hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
                >
                  Overview
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-6 relative z-10">
              <div className="space-y-6 pt-12">
                <div className="group relative rounded-2xl overflow-hidden shadow-xl border-2 border-white hover-lift">
                  <img 
                    src={dept.images.heroLeft} 
                    className="w-full h-36 md:h-44 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" 
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: dept.theme.accentHex }} />
                </div>

                <div className="group relative rounded-2xl overflow-hidden shadow-xl border-2 border-white hover-lift">
                  <img 
                    src={dept.images.heroSmall1} 
                    className="w-full h-48 md:h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:-rotate-1" 
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: dept.theme.accentHex }} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="group relative rounded-2xl overflow-hidden shadow-xl border-2 border-white hover-lift">
                  <img 
                    src={dept.images.heroBig} 
                    className="w-full h-64 md:h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" 
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: dept.theme.accentHex }} />
                </div>

                <div className="group relative rounded-2xl overflow-hidden shadow-xl border-2 border-white hover-lift">
                  <img 
                    src={dept.images.heroSmall2} 
                    className="w-full h-32 md:h-40 object-cover transition-all duration-700 group-hover:scale-110 group-hover:-rotate-1" 
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: dept.theme.accentHex }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- stats --- */}
      <section className="max-w-5xl mx-auto px-6 -mt-12 relative z-20">
        <div className="glass-panel rounded-3xl p-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-t border-white bg-white/80 backdrop-blur-md">
          <AnimatedStat Component={StatItem} value={dept.programOverview.stats.nonTeaching} label="Non-Teaching Personnel" />
          <AnimatedStat Component={StatItem} value={dept.programOverview.stats.faculty} label="Academic Faculty" />
          <AnimatedStat Component={StatItem} value={dept.programOverview.stats.students} label="Enrolled Students" />
        </div>
      </section>

      {/* --- about --- */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24">
         <div className="bg-white rounded-[2.5rem] p-12 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
               <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 mb-6">Department Overview</h3>
               <p className="text-lg md:text-2xl font-black text-black leading-tight italic uppercase tracking-tighter">
                  {dept.programOverview.text}
               </p>
            </div>
            <div className="w-24 h-24 rounded-full border-[10px] border-slate-50 flex items-center justify-center text-slate-200 font-black italic shrink-0">MFE</div>
         </div>
      </section>

      {/* --- peo --- */}
      <section id="peo" className="max-w-6xl mx-auto px-6 py-12 relative overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-48 h-48 bg-slate-50 rounded-full blur-[80px] -z-10 pointer-events-none opacity-50" />
        <div className="text-center mb-12 group/header cursor-default">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] block mb-2 group-hover/header:text-black transition-colors duration-500">
            MANUFACTURING ENGINEERING
          </span>
          <h2 className="text-xl md:text-3xl font-black text-black uppercase tracking-tight italic leading-none mb-4">
            Program Educational <span className="text-slate-600 group-hover/header:text-slate-900 transition-colors duration-700">Objectives (PEO)</span>
          </h2>
          <div className="flex items-center justify-center gap-3 max-w-lg mx-auto">
            <div className="h-[1px] w-0 bg-black group-hover/header:w-8 transition-all duration-700" />
            <p className="text-slate-500 text-[10px] md:text-[11px] font-medium italic">{dept.peo.subtitle}</p>
            <div className="h-[1px] w-0 bg-black group-hover/header:w-8 transition-all duration-700" />
          </div>
        </div>
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-4 relative group">
            <div className="absolute -inset-1 border border-slate-100 rounded-xl -z-10 translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
            <div className="relative rounded-xl overflow-hidden shadow-md border-2 border-white">
              <img 
                src={dept.images.peo} 
                className="w-full h-[300px] md:h-[350px] object-cover transition-all duration-700 group-hover:scale-105" 
                alt="PEO" 
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" 
                style={{ backgroundColor: dept.theme.accentHex }} 
              />
            </div>
          </div>
          <div className="lg:col-span-8 relative pl-0 md:pl-10">
            <div className="absolute left-0 top-0 w-[1px] h-full bg-slate-100 hidden md:block" />
            <div className="space-y-3">
              {dept.peo.bullets.map((b, idx) => (
                <div key={idx} className="group relative flex items-start gap-6 p-5 bg-white border border-slate-100 rounded-xl transition-all duration-300 hover:border-black hover:shadow-sm hover:-translate-x-1">
                  <div className="hidden md:flex shrink-0 w-2 h-2 rounded-full bg-slate-200 mt-2 -ml-[45px] group-hover:bg-black group-hover:scale-110 transition-all border-2 border-white z-10" />
                  <div className="flex-1 px-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[9px] font-black text-slate-400 group-hover:text-black transition-colors uppercase tracking-[0.2em]">PEO 0{idx + 1}</span>
                      <div className="h-[1px] w-0 group-hover:w-10 bg-black/10 transition-all duration-500" />
                    </div>
                    <p className="text-slate-600 group-hover:text-black text-[13px] font-medium leading-relaxed transition-colors">{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- so --- */}
      <section id="so" className="bg-black py-28 rounded-[4rem] mx-4 md:mx-12 my-12 relative overflow-hidden shadow-2xl">
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="mb-20 text-center">
            <h2 className="text-3xl font-black text-white tracking-tight italic uppercase">Student Outcomes</h2>
            <p className="text-slate-500 font-black tracking-[0.5em] text-[10px] uppercase mt-4">Competency Framework</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {dept.so.outcomes.map((o, idx) => (
              <div key={idx} className="p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white transition-all duration-500 group cursor-default">
                <div className="text-5xl font-black text-white/5 group-hover:text-black/5 transition-colors mb-8 italic">SO{idx+1}</div>
                <h3 className="text-white group-hover:text-black font-black text-xs mb-5 uppercase tracking-widest leading-tight">{o.title}</h3>
                <p className="text-[11px] text-slate-500 group-hover:text-slate-600 leading-relaxed font-medium">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- curriculum --- */}
      <section id="curriculum" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <div className="sticky top-32 flex flex-col items-center lg:items-start">
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-3xl bg-white border border-slate-100 shadow-sm p-6 flex items-center justify-center group hover:border-black transition-all duration-500">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '8px 8px' }} />
                <img src={dept.images.watermark} className="w-full h-full object-contain grayscale opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="MFE" />
                <div className="absolute -bottom-3 -right-3 bg-black text-white text-[7px] font-black px-2 py-1 uppercase tracking-widest rounded-md shadow-lg group-hover:scale-110 transition-transform">
                  Manufacturing Engineering
                </div>
              </div>
              <div className="mt-8 px-2 hidden lg:block">
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] block mb-3">Academic Roadmap</span>
                <p className="text-[11px] text-slate-400 font-medium italic leading-relaxed">{dept.curriculum.text}</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter italic mb-10 border-b border-slate-100 pb-6">Curriculum Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dept.curriculum.bullets.map((item, idx) => (
                <div key={idx} className="group flex items-center gap-5 p-5 bg-white border border-slate-100 rounded-2xl transition-all duration-300 hover:border-black hover:shadow-xl hover:-translate-y-1">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all italic">0{idx + 1}</div>
                  <p className="text-slate-600 group-hover:text-black text-[13px] font-medium leading-snug transition-colors">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- laboratories --- */}
      <section id="laboratories" className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col items-center mb-16 text-center animate-reveal-down">
          <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter italic mb-6">
            {dept.laboratories.title}
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-10 bg-slate-200" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
              Department laboratories and learning spaces
            </span>
            <div className="h-[1px] w-10 bg-slate-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-center justify-items-center">
          {dept.laboratories.items.map((lab, idx) => (
            <div 
              key={idx} 
              className="group relative w-full max-w-[280px] bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all duration-500 hover:border-black hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative aspect-[4/3] bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-50">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }} />
                
                <img 
                  src={dept.images.heroSmall1} 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                  alt={lab} 
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" 
                  style={{ backgroundColor: dept.theme.accentHex }} 
                />

                <div className="absolute top-4 right-4 z-20 text-[7px] font-black text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded uppercase tracking-widest">
                  LAB 0{idx + 1}
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="font-black text-slate-900 uppercase italic text-[12px] leading-tight tracking-tight group-hover:text-black transition-colors">
                  {lab}
                </h3>
                <div className="mt-4 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: dept.theme.accentHex }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- faculty --- */}
      <section id="faculty" className="max-w-6xl mx-auto px-6 py-28 bg-white border-y border-slate-100">
        <div className="relative flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 group/header cursor-default">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase italic leading-none transition-transform duration-500 group-hover/header:translate-x-2">
              {dept.faculty.title}
            </h2>
            <div className="absolute -bottom-4 left-0 h-[3px] w-12 transition-all duration-700 group-hover/header:w-full" style={{ backgroundColor: dept.theme.accentHex }} />
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-slate-200 group-hover/header:w-24 transition-all duration-700" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{dept.code} // {dept.title}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dept.faculty.members.map((member, idx) => (
            <div key={idx} className="group relative flex items-start gap-5 p-6 bg-white border border-slate-100 transition-all duration-300 hover:border-black hover:shadow-xl hover:-translate-y-1">
              <div className="relative shrink-0 w-20 h-20 md:w-24 md:h-24 bg-slate-50 border border-slate-100 overflow-hidden transition-all duration-500 group-hover:border-black">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                    <span className="text-slate-200 font-black italic text-xl">{dept.code}</span>
                  </div>
                )}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ backgroundColor: dept.theme.accentHex }} />
              </div>
              <div className="flex-1 min-w-0 py-1">
                <div className="flex items-center gap-2 mb-2">
                   {member.role === "Department Chair" && (
                      <span className="text-[7px] font-black px-1.5 py-0.5 text-white uppercase tracking-tighter" style={{ backgroundColor: dept.theme.accentHex }}>Chair</span>
                   )}
                   <p className="text-[9px] font-bold text-slate-400 group-hover:text-black uppercase tracking-widest transition-colors">{member.role}</p>
                </div>
                <h3 className="text-base md:text-lg font-black text-black transition-colors uppercase italic leading-none break-words">{member.name}</h3>
                <div className="h-[1px] w-0 mt-3 transition-all duration-500 group-hover:w-12" style={{ backgroundColor: dept.theme.accentHex }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- careers --- */}
      <section id="careers" className="max-w-6xl mx-auto px-6 py-20 relative">
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em] block mb-4">Manufacturing Engineering</span>
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter italic leading-none mb-6">{dept.careers.title}</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-10 bg-slate-100" /><div className="w-1 h-1 rounded-full bg-slate-200" /><div className="h-[1px] w-10 bg-slate-100" />
          </div>
          <p className="text-slate-500 text-[11px] md:text-xs font-medium italic max-w-md leading-relaxed">{dept.careers.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
          {dept.careers.cards.map((card, idx) => (
            <div key={idx} className="group relative w-full max-w-[280px] bg-white border border-slate-100 rounded-[2rem] p-10 transition-all duration-500 hover:border-black hover:shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-black transition-all duration-500 group-hover:rotate-[5deg]">
                <div className="text-slate-300 group-hover:text-white transition-colors">
                  {idx === 0 && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><rect x="3" y="3" width="10" height="10" /><rect x="11" y="11" width="10" height="10" strokeDasharray="2 2" /></svg>}
                  {idx === 1 && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><path d="M4 7h16M4 12h12M4 17h8" /><circle cx="18" cy="17" r="2" fill="currentColor" /></svg>}
                  {idx === 2 && <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><circle cx="12" cy="12" r="9" /><path d="M12 3v3m0 12v3M3 12h3m12 0h3" /></svg>}
                </div>
              </div>
              <h3 className="text-xs font-black text-black uppercase tracking-[0.2em] mb-3">{card.title}</h3>
              <p className="text-slate-500 text-[11px] leading-relaxed font-medium">{card.text}</p>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"><div className="w-1.5 h-1.5 rounded-full bg-black animate-ping" /></div>
            </div>
          ))}
        </div>
      </section>

      {/* --- contact --- */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-12">
        <div className="relative bg-black rounded-[2rem] p-10 md:p-14 text-center overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }} />
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4">Department Contact</span>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter mb-4">Academic <span className="text-slate-500">Inquiry</span></h2>
            <p className="text-slate-400 text-[11px] md:text-xs font-medium max-w-sm mx-auto leading-relaxed mb-8 italic">Insert short department contact or coordination placeholder text here.</p>
            <button className="px-10 py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest transition-all hover:bg-slate-100 hover:-translate-y-0.5 active:scale-95 shadow-lg">Send Message</button>
          </div>
          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-1000" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
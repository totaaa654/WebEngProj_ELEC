import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar";
import SectionTitle from "../../components/SectionTitle";
import Footer from "../../components/Footer";
import { mergeDeptWithOverrides } from "../../lib/departmentAdmin";
import { EE } from "../../data/department/EE";
import "../../styles/departments/EE.css";


export default function EEPage() {
  const [baseDept] = useState<typeof EE>(EE);

  const dept = useMemo(
    () => mergeDeptWithOverrides(baseDept),
    [baseDept]
  );

  const [selectedYearId, setSelectedYearId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const bullets = baseDept.curriculum.bullets || [];
  const members = dept.faculty.members || [];
  
  const chairIdx = members.findIndex(m => 
    m.role?.toLowerCase().includes("program chair") || 
    m.role?.toLowerCase().includes("chairperson")
  );
  
  const [activeIdx, setActiveIdx] = useState(chairIdx >= 0 ? chairIdx : 0);
  
  useEffect(() => {
    if (!dept) return;

    document.title = `${dept.code} | BULSU COE`;

    const link =
      (document.querySelector("link[rel='icon']") as HTMLLinkElement | null) ??
      (document.querySelector("link[rel~='icon']") as HTMLLinkElement | null);

    if (link) {
      link.href = `/icons/${dept.code.toLowerCase()}.svg`;
    }
  }, [dept]);

  const onNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const currentYearData = useMemo(() => {
    return baseDept.curriculum.years.find((y) => y.id === selectedYearId) || null;
  }, [selectedYearId, baseDept]);

  return (
    <div className="bg-white">
      <Navbar onNav={onNav} />

      <section id="home" className="max-w-6xl mx-auto px-6 pt-10 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          <div className="w-full lg:w-5/12 text-center lg:text-left">
            <div className="space-y-5">
              <p className="text-[10px] md:text-sm font-bold tracking-[0.4em] md:tracking-[0.6em] uppercase text-red-600 lg:ml-3">
                College of Engineering
              </p>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black italic tracking-tighter leading-[0.9] lg:leading-[0.85] uppercase">
                <span className="block text-black">Electrical</span>
                <span className="inline-block bg-linear-to-r from-red-700 to-orange-500 bg-clip-text text-transparent lg:pr-8 lg:-mr-8">
                  Engineering
                </span>
              </h1>
              
              <div className="pt-2 border-l-4 border-black pl-5 inline-block lg:block text-left">
                <p className="text-base md:text-lg font-bold text-gray-900 leading-tight uppercase">
                  Bachelor of Science in <br />
                  <span className="text-gray-500 font-medium">Electrical Engineering</span>
                </p>
              </div>

              <div className="pt-4">
                <Link
                  to={`/dept/${dept.code}/admin`}
                  className="inline-flex items-center gap-3 bg-black text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 hover:bg-red-700 hover:shadow-2xl transition-all shadow-lg active:scale-95"
                >
                  Open Department Admin →
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="grid grid-cols-12 gap-3 aspect-square lg:aspect-auto lg:h-112.5">
              
              <div className="col-span-5 h-full">
                <div className="h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-md border border-gray-100 hover:shadow-red-500 hover:shadow-[0_0_30px_rgba(169,0,0,0.3)]">
                  <img 
                    src={dept.images.heroLeft} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    alt="Pic1" 
                  />
                </div>
              </div>

              <div className="col-span-7 grid grid-rows-2 gap-3 h-full">
                <div className="row-span-1 rounded-2xl md:rounded-3xl overflow-hidden shadow-md border border-gray-100 hover:shadow-red-500 hover:shadow-[0_0_30px_rgba(169,0,0,0.3)]">
                  <img 
                    src={dept.images.heroBig} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    alt="IIEE" 
                  />
                </div>

                <div className="row-span-1 grid grid-cols-2 gap-3">
                  <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-red-500 hover:shadow-[0_0_30px_rgba(169,0,0,0.3)]">
                    <img 
                      src={dept.images.heroSmall1} 
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" 
                      alt="pic3" 
                    />
                  </div>
                  <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-red-500 hover:shadow-[0_0_30px_rgba(169,0,0,0.3)]">
                    <img 
                      src={dept.images.heroSmall2} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                      alt="pic4" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative max-w-6xl mx-auto px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"></div>

        <div className="relative z-10">
          <div className="text-left mb-12">
            <div className="text-2xl md:text-3xl lg:text-4xl font-black uppercase italic bg-linear-to-r from-red-800 via-red-600 to-orange-500 bg-clip-text text-transparent leading-tight">
              {dept.programOverview.subtitle}
            </div>
            <div className="mt-3 w-16 h-1 bg-linear-to-r from-red-800 to-orange-500 rounded-full" />
          </div>

          <div className="space-y-12 w-full"> 
            {dept.programOverview.contents.map((c, idx) => (
              <div key={idx} className="group relative">
                <div className="flex flex-col space-y-3">
                  <div className="text-lg md:text-xl uppercase font-black text-black flex items-center gap-3 tracking-tight">
                    <span className="text-red-600 font-mono tracking-tighter">//</span>
                    {c.heading}
                  </div>
                  <p className="pl-6 md:pl-10 text-gray-500 leading-relaxed text-left md:text-justify text-sm md:text-lg font-small opacity-90 w-full">
                    {c.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { val: dept.programOverview.stats.nonTeaching, label: "Non-Teaching Personnel" },
              { val: dept.programOverview.stats.faculty, label: "Faculty Members" },
              { val: dept.programOverview.stats.students, label: "Enrolled Students" }
            ].map((stat, i) => (
              <div key={i} className="group relative bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_2px_rgba(169,0,0,0.3)] flex flex-col items-center text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-red-900 rounded-b-full transition-all duration-500 group-hover:w-80 group-hover:rounded-none" />
                <span className="text-3xl md:text-4xl lg:text-5xl font-black bg-linear-to-r from-red-900 via-red-800 to-orange-700 bg-clip-text text-transparent leading-tight mb-2 transition-transform duration-500 group-hover:scale-110">
                  {stat.val}
                </span>
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 group-hover:text-gray-900 transition-colors">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="peo" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="mb-8 md:mb-12
          [&_div.text-xs]:text-gray-500 [&_div.text-xs]:tracking-[0.6em] [&_div.text-xs]:text-[14px] [&_div.text-xs]:md:text-[15px] [&_div.text-xs]:font-bold [&_div.text-xs]:mb-4
          [&_h2]:mt-2 [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:italic [&_h2]:bg-linear-to-r [&_h2]:from-red-800 [&_h2]:via-red-700 [&_h2]:to-orange-600 [&_h2]:bg-clip-text [&_h2]:text-transparent [&_h2]:leading-tight [&_h2]:pr-4 [&_h2]:-mr-4
          [&_p]:text-gray-500 [&_p]:text-sm [&_p]:md:text-base [&_p]:tracking-wide [&_p]:mt-4 [&_p]:max-w-2xl [&_p]:mx-auto">
          <SectionTitle 
            center 
            eyebrow={dept.title} 
            title={dept.peo.title}
            subtitle={dept.peo.subtitle}
          />
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        <div className="order-2 md:order-1 md:col-span-5 flex justify-center group/logo">
          <div className="relative p-6 transition-transform duration-700 ease-out group-hover/logo:scale-105 group-hover/logo:-rotate-2">
            <img 
              src={dept.images.peo} 
              alt="Department Logo" 
              className="w-full max-w-50 sm:max-w-62.5 md:max-w-full h-auto object-contain z-10" 
            />
          </div>
        </div>

        <div className="order-1 md:order-2 md:col-span-7 space-y-4">
          {dept.peo.bullets.map((b, idx) => (
            <div 
              key={idx} 
              className="peo-card-racing group relative flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 p-5 md:p-6 rounded-3xl bg-white border border-gray-100 transition-all duration-500 hover:scale-[1.02] hover:border-red-200 shadow-sm"
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-50 text-red-900 font-bold text-lg group-hover:bg-red-900 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(153,27,27,0.4)] transition-all duration-300 z-10 relative">
                  {idx + 1}
                </div>
                <div className="absolute inset-0 rounded-full border border-red-900/0 group-hover:border-red-900/20 group-hover:scale-150 transition-all duration-500 pointer-events-none"></div>
              </div>

              <div className="w-full z-10 text-center md:text-left">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 group-hover:text-red-900 mb-2 md:mb-1 transition-colors">
                  PEO {idx + 1}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed text-center md:text-justify px-2 md:px-0">
                  {b}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      <section id="so" className="max-w-6xl mx-auto px-6 pt-16">
        <div className="mb-6 md:mb-7 
          [&_div.text-xs]:text-gray-500 [&_div.text-xs]:tracking-[0.6em] [&_div.text-xs]:text-[14px] [&_div.text-xs]:md:text-[15px] [&_div.text-xs]:font-bold [&_div.text-xs]:mb-4
          [&_h2]:mt-2 [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:italic [&_h2]:bg-linear-to-r [&_h2]:from-red-800 [&_h2]:via-red-700 [&_h2]:to-orange-600 [&_h2]:bg-clip-text [&_h2]:text-transparent [&_h2]:leading-tight [&_h2]:pr-4 [&_h2]:-mr-4">
          <SectionTitle 
            center 
            eyebrow={dept.title} 
            title={dept.so.title} 
          />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {dept.so.outcomes.map((o, idx) => {
            const isLast = idx === dept.so.outcomes.length - 1;

            return (
              <div
                key={idx}
                className={`h-full ${isLast ? "md:col-start-2" : ""}`}
              >
                <OutcomeCard title={o.title} text={o.text} iconUrl={o.iconUrl} />
              </div>
            );
          })}
        </div>
      </section>

      <section id="curriculum" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="mb-6 md:mb-12 
          [&_div.text-xs]:text-gray-500 [&_div.text-xs]:tracking-[0.6em] [&_div.text-xs]:text-[14px] [&_div.text-xs]:md:text-[15px] [&_div.text-xs]:font-bold [&_div.text-xs]:mb-4
          [&_h2]:mt-2 [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:italic [&_h2]:bg-linear-to-r [&_h2]:from-red-800 [&_h2]:via-red-700 [&_h2]:to-orange-600 [&_h2]:bg-clip-text [&_h2]:text-transparent [&_h2]:leading-tight [&_h2]:pr-4 [&_h2]:-mr-4">
          <SectionTitle 
            center 
            eyebrow={dept.title} 
            title={dept.curriculum.title} 
          />
        </div>

        <div className="relative mb-12 group px-0 md:px-4 max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2rem]">
            <div 
              className="flex transition-transform duration-600 ease-[cubic-bezier(0.45,0,0.55,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {bullets.map((bullet, index) => (
                <div key={index} className="w-full md:w-1/2 shrink-0 px-2 md:px-3 py-4">
                  <div className="group/bullet p-6 md:p-7 rounded-[1.5rem] md:rounded-[2rem] bg-gray-50 border border-gray-100 transition-all duration-500 h-80 md:h-64 flex flex-col hover:bg-red-50 hover:border-red-200 shadow-sm hover:-translate-y-1 hover:scale-[1.02]">
                    <Bullet title={bullet.title} text={bullet.text} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              const isMobile = window.innerWidth < 768;
              const totalSlides = isMobile ? bullets.length : Math.ceil(bullets.length / 2);
              setCurrentIndex(prev => prev === 0 ? totalSlides - 1 : prev - 1);
            }}
            className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 bg-white shadow-xl p-3 md:p-4 rounded-full text-red-900 z-20 md:opacity-0 md:group-hover:opacity-100 transition-all border border-gray-100 hover:bg-red-900 hover:text-white active:scale-95"
          >
            <span className="block transform rotate-180 text-[10px] md:text-xs font-bold">➜</span>
          </button>

          <button 
            onClick={() => {
              const isMobile = window.innerWidth < 768;
              const totalSlides = isMobile ? bullets.length : Math.ceil(bullets.length / 2);
              setCurrentIndex(prev => (prev + 1) % totalSlides);
            }}
            className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 bg-white shadow-xl p-3 md:p-4 rounded-full text-red-900 z-20 md:opacity-0 md:group-hover:opacity-100 transition-all border border-gray-100 hover:bg-red-900 hover:text-white active:scale-95"
          >
            <span className="text-[10px] md:text-xs font-bold">➜</span>
          </button>

          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ 
              length: (typeof window !== 'undefined' && window.innerWidth < 768) ? bullets.length : Math.ceil(bullets.length / 2) 
            }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-10 bg-red-900" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center space-y-2 mb-10">
          <p className="text-gray-500 tracking-[0.2em] text-[14px] md:text-[15px] font-bold mb-4">
            Click on a year level to view the specific courses.
          </p>
          <p className="text-gray-400 text-[13px] md:text-[14px] mb-4 uppercase tracking-wider">
            Bachelor of Science in Electrical Engineering  <br /> • Revised 2024   <br /> • CMO 88 Series of 2017 <br className="md:hidden" />
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-12">
          {baseDept.curriculum.years.map((year) => (
            <button
              key={year.id}
              onClick={() => setSelectedYearId(selectedYearId === year.id ? null : year.id)}
              className={`p-4 md:p-6 rounded-2xl border-2 transition-all duration-300 text-left relative ${
                selectedYearId === year.id
                  ? "border-red-900 bg-red-50 shadow-sm scale-105 z-10" 
                  : "border-gray-100 bg-white hover:border-orange-500 hover:scale-105 shadow-sm"
              }`}
            >
              {selectedYearId === year.id && (
                <span className="absolute top-2 right-3 text-red-900 font-bold text-[10px]">✕</span>
              )}
              <span className="block text-[9px] font-bold text-gray-400 uppercase mb-1 tracking-widest">
                CURRICULUM
              </span>
              <span className={`block text-xs md:text-sm font-extrabold leading-tight ${
                selectedYearId === year.id ? "text-red-900" : "text-gray-800"
              }`}>
                {year.label}
              </span>
            </button>
          ))}
        </div>

        {selectedYearId && (
          <div className="bg-gray-50 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 border border-gray-100 animate-fadeIn">
            {currentYearData?.terms.map((term, tIdx) => (
              <div key={tIdx} className={tIdx > 0 ? "mt-12 md:mt-16" : ""}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-1 bg-red-900 rounded-full"></div>
                    <h3 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-tight">
                      {term.name}
                    </h3>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase md:hidden animate-pulse">
                    Swipe left ➜
                  </span>
                </div>
              
                <div className="relative overflow-x-auto bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
                  <table className="w-full text-left border-collapse min-w-175 md:min-w-full">
                    <thead>
                      <tr className="bg-red-900 text-[10px] uppercase text-white">
                        <th className="py-4 px-4 font-bold w-24 sticky left-0 bg-red-900 z-10">Code</th>
                        <th className="py-4 px-4 font-bold min-w-50">Course Title</th>
                        <th className="py-4 px-2 text-center font-bold w-16">Lab Units</th>
                        <th className="py-4 px-2 text-center font-bold w-16">Lab Hours</th>
                        <th className="py-4 px-2 text-center font-bold w-16">Lec Units</th>
                        <th className="py-4 px-2 text-center font-bold w-16">Lec Hours</th>
                        <th className="py-4 px-4 font-bold w-32 text-center">Prerequisite</th>
                        <th className="py-4 px-4 font-bold w-32 text-center">Corequisite</th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px] md:text-[12px] divide-y divide-gray-50">
                      {term.courses?.map((course, cIdx) => (
                        <tr 
                          key={cIdx} 
                          className={course.code === 'TOTAL' ? 'bg-gray-100 font-black' : 'hover:bg-red-50/70'}
                        >
                          <td className={`py-4 px-4 font-mono font-bold sticky left-0 z-10 ${
                            course.code === 'TOTAL' ? 'bg-gray-100 text-black' : 'bg-white text-red-900'
                          }`}>
                            {course.code}
                          </td>
                          <td className="py-4 px-4 font-medium whitespace-normal leading-snug">
                            {course.title}
                          </td>
                          <td className="py-4 px-2 text-center">{course.lab_units}</td>
                          <td className="py-4 px-2 text-center">{course.lab_hours || 0}</td>
                          <td className="py-4 px-2 text-center">{course.lec_units}</td>
                          <td className="py-4 px-2 text-center">{course.lec_hours || 0}</td>
                          <td className="py-4 px-4 text-[10px] text-center">
                            {course.code === 'TOTAL' ? "" : (course.prereq || "—")}
                          </td>
                          <td className="py-4 px-4 text-[10px] text-center">
                            {course.code === 'TOTAL' ? "" : (course.coreq || "—")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="laboratories" className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-16">
        <div className="mb-6 md:mb-7 
          [&_div.text-xs]:text-gray-500 [&_div.text-xs]:tracking-[0.6em] [&_div.text-xs]:text-[14px] [&_div.text-xs]:md:text-[15px] [&_div.text-xs]:font-bold [&_div.text-xs]:mb-4
          [&_h2]:mt-2 [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:italic [&_h2]:bg-linear-to-r [&_h2]:from-red-800 [&_h2]:via-red-700 [&_h2]:to-orange-600 [&_h2]:bg-clip-text [&_h2]:text-transparent [&_h2]:leading-tight [&_h2]:pr-4 [&_h2]:-mr-4">
          <SectionTitle 
            center 
            eyebrow={dept.title} 
            title={dept.laboratories.title} 
          />
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {dept.laboratories.items.map((lab, idx) => (
            <div 
              key={idx} 
              className="group relative rounded-[2rem] md:rounded-[2.5rem] border border-red-100 bg-red-50/20 p-5 transition-all duration-500 hover:bg-white hover:shadow-xl hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="absolute -top-3 left-6 md:left-8 bg-red-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg z-20 uppercase tracking-widest">
                LAB {String(idx + 1).padStart(2, '0')}
              </div>

              <div className="relative h-48 sm:h-56 rounded-[1.5rem] md:rounded-[1.8rem] overflow-hidden bg-gray-200 border-2 border-white shadow-inner shrink-0">
                <img 
                  src={lab.photo} 
                  alt={lab.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="px-1 md:px-2 pt-6 pb-2 flex flex-col flex-1">
                <h3 className="font-black text-red-900 text-lg md:text-xl leading-tight tracking-tight uppercase text-center md:text-left">
                  {lab.name}
                </h3>
                
                <div className="w-16 h-1 bg-red-200 my-4 rounded-full group-hover:w-full transition-all duration-700 ease-in-out" />
                
                <p className="text-sm text-gray-600 leading-relaxed text-center md:text-justify line-clamp-6">
                  {lab.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faculty" className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 overflow-hidden">
        <div className="mb-6 md:mb-7 
          [&_div.text-xs]:text-gray-500 [&_div.text-xs]:tracking-[0.6em] [&_div.text-xs]:text-[14px] [&_div.text-xs]:md:text-[15px] [&_div.text-xs]:font-bold [&_div.text-xs]:mb-4
          [&_h2]:mt-2 [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:italic [&_h2]:bg-linear-to-r [&_h2]:from-red-800 [&_h2]:via-red-700 [&_h2]:to-orange-600 [&_h2]:bg-clip-text [&_h2]:text-transparent [&_h2]:leading-tight [&_h2]:pr-4 [&_h2]:-mr-4">
          <SectionTitle 
            center 
            eyebrow={dept.title} 
            title={dept.faculty.title} 
          />
        </div>
        <div className="relative mt-12 group h-105 md:h-112.5 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : members.length - 1))}
            className="absolute left-1 md:left-15 top-1/2 -translate-y-1/2 z-50 bg-white/95 backdrop-blur-md p-2 md:p-3 rounded-full shadow-lg border border-red-100 text-red-900 hover:bg-red-900 hover:text-white transition-all active:scale-90"
          >
            <span className="block transform rotate-180 text-[10px] font-bold">➜</span>
          </button>

          <button
            onClick={() => setActiveIdx((prev) => (prev < members.length - 1 ? prev + 1 : 0))}
            className="absolute right-1 md:right-15 top-1/2 -translate-y-1/2 z-50 bg-white/95 backdrop-blur-md p-2 md:p-3 rounded-full shadow-lg border border-red-100 text-red-900 hover:bg-red-900 hover:text-white transition-all active:scale-90"
          >
            <span className="block text-[10px] font-bold">➜</span>
          </button>

          <div className="relative h-full flex items-center justify-center">
            {members.map((member, idx) => {
              let position = idx - activeIdx;
              if (position > members.length / 2) position -= members.length;
              if (position < -members.length / 2) position += members.length;
              const isActive = idx === activeIdx;
              const isVisible = Math.abs(position) <= 1;

              if (!isVisible) return null;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`
                    absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer
                    flex flex-col rounded-[2rem] overflow-hidden border group/card
                    ${isActive
                      ? 'z-30 w-[85%] max-w-65 h-87.5 opacity-100 shadow-[0_20px_50px_rgba(153,27,27,0.25)] bg-white border-red-900'
                      : 'z-10 w-[70%] max-w-50 h-72.5 opacity-40 bg-red-50/50 border-red-100'
                    }
                  `}
                  style={{
                    transform: `
                      translateX(${position * (typeof window !== 'undefined' && window.innerWidth < 500 ? 50 : 75)}%) 
                      translateY(${isActive ? '-20px' : '0px'}) 
                      scale(${isActive ? 1 : 0.75})
                    `,
                  }}
                >
                  <div className="relative w-full h-[70%] overflow-hidden bg-gray-200">
                    <img
                      src={member.photo || "/faculty/placeholder.png"}
                      className="w-full h-full object-cover object-top transition-transform duration-1000"
                      alt={member.name}
                    />
                    {!isActive && <div className="absolute inset-0 bg-red-900/10" />}
                  </div>

                  <div className="px-4 py-3 text-center flex-1 flex flex-col justify-center items-center bg-white relative">
                    <h3 className={`font-black text-[12px] md:text-[14px] uppercase tracking-tight leading-tight transition-colors duration-300
                      ${isActive ? 'text-red-900' : 'text-gray-400'}`}>
                      {member.name}
                    </h3>
                    <div className={`h-0.5 my-2 rounded-full transition-all duration-500
                      ${isActive ? 'w-30 bg-red-900' : 'w-4 bg-red-200'}`}
                    />
                    <p className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em]
                      ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                      {member.role || "Faculty"}
                    </p>

                    <div className={`absolute bottom-0 left-0 h-1.5 transition-all duration-700 origin-left z-20
                      ${isActive ? 'w-full bg-red-900 opacity-100' : 'w-0 bg-red-900/50 opacity-0'}
                      group-hover/card:w-full group-hover/card:opacity-100`} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-1.5 mt-1">
          {members.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`h-1 rounded-full transition-all duration-500 ${
                activeIdx === i ? 'w-8 bg-red-900' : 'w-1.5 bg-red-100'
              }`}
            />
          ))}
        </div>
      </section>

      <section id="careers" className="max-w-6xl mx-auto px-6 pt-16">
        <div className="mb-6 md:mb-7 
          [&_div.text-xs]:text-gray-500 [&_div.text-xs]:tracking-[0.6em] [&_div.text-xs]:text-[14px] [&_div.text-xs]:md:text-[15px] [&_div.text-xs]:font-bold [&_div.text-xs]:mb-4
          [&_h2]:mt-2 [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-black [&_h2]:uppercase [&_h2]:italic [&_h2]:bg-linear-to-r [&_h2]:from-red-800 [&_h2]:via-red-700 [&_h2]:to-orange-600 [&_h2]:bg-clip-text [&_h2]:text-transparent [&_h2]:leading-tight [&_h2]:pr-4 [&_h2]:-mr-4">
          <SectionTitle 
            center 
            eyebrow={dept.title} 
            title={dept.careers.title} 
          />
        </div>

        <div id="careers" className="mt-8 grid grid-cols-1  gap-5">
          {dept.careers.categories.map((cat, idx) => (
            <div key={idx} className="rounded-2xl  bg-white p-6 text-center ">
              <h3 className="text-gray-900 tracking-[0.2em] text-[14px] md:text-[15px] font-bold mb-4">{cat.title}</h3>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {cat.cards.map((card, cardIdx) => {
                  const isLast = cardIdx === cat.cards.length - 1;
                  const shouldCenter = isLast && cat.cards.length % 3 === 1;
                  return (
                    <div key={cardIdx} className={`card rounded-2xl  bg-white p-4 gap-4 text-center flex flex-col items-center ${shouldCenter ? "md:col-start-2" : ""}`}>
                      <div className="text-3xl" aria-hidden="true">{card.icon}</div>
                      <h4 className="mt-2 font-bold text-gray-900">{card.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{card.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="rounded-[2rem] md:rounded-[2.5rem] border border-red-200 bg-red-50/20 p-6 md:p-12 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12">
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 w-full md:w-auto">
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4">
                <img src="/src/assets/bulsu.svg" alt="BULSU" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                <img src="/COE.svg" alt="COE" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                <img src="/departments/EE/ee-logo.png" alt="EE" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                <img src="/departments/EE/watermark.png" alt="IIEE" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
              </div>
              
              <div className="space-y-1">
                <h2 className="text-red-900 font-black text-xl md:text-2xl tracking-tight leading-tight uppercase">
                  College of Engineering
                </h2>
                <p className="text-gray-800 font-bold text-md md:text-lg">
                  Electrical Engineering Department
                </p>
                <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                  Bulacan State University
                </p>
              </div>
            </div>

            <div className="hidden md:block w-px h-32 bg-red-200"></div>
            <div className="block md:hidden w-20 h-px bg-red-200"></div>

            <div className="flex flex-col items-center md:items-end text-center md:text-right w-full md:w-auto">
              <span className="inline-block text-[12px] md:text-[14px] font-black text-gray-700 uppercase tracking-[0.2em] mb-4 bg-white/80 border border-red-100 px-4 py-1.5 rounded-full shadow-sm">
                Department Head
              </span>
              <h3 className="mt-2 text-xl md:text-2xl font-black uppercase italic bg-linear-to-r from-red-800 via-red-700 to-orange-800 bg-clip-text text-transparent leading-tight pr-4 -mr-4">
                Engr. Eleazer C. Nabong
              </h3>
              <a 
                href="mailto:eleazar.nabong@ms.bulsu.edu.ph" 
                className="text-gray-600 font-semibold text-xl md:text-base hover:text-red-800 transition-colors flex items-center gap-2 group break-all"
              >
                <span className="border-b border-transparent group-hover:border-red-800">
                  eleazar.nabong@ms.bulsu.edu.ph
                </span>
                <span className="group-hover:translate-x-1 transition-transform hidden md:inline">→</span>
              </a>
            </div>
            
          </div>
        </div>
      </section>

      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 group flex flex-col items-center gap-1 transition-all hover:-translate-y-2 active:scale-95"
        aria-label="Back to top"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white border border-red-100 shadow-xl text-red-600 group-hover:bg-red-700 group-hover:text-white group-hover:shadow-red-500/40 transition-all duration-300">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 md:h-7 md:w-7" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
          </svg>
        </div>
        
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-red-800 transition-colors drop-shadow-sm">
          Top
        </span>
      </button>

      <Footer />
    </div>
  );
}

function Bullet({ title, text }: { title: string; text: string }) {
  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-4 shrink-0">
        <h3 className="text-red-900 font-black uppercase text-[12px] md:text-[13px] tracking-[0.18em] leading-tight text-center transition-colors duration-300 group-hover/bullet:text-red-600">
          {title}
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div 
          className="text-gray-600 text-[11px] md:text-[12px] leading-relaxed whitespace-pre-line group-hover/bullet:text-gray-900 text-justify [hyphens:auto] transition-colors duration-300" 
          dangerouslySetInnerHTML={{ __html: text }} 
        />
      </div>
    </>
  );
}

function OutcomeCard({ title, text, iconUrl }: { title: string; text: string; iconUrl: string }) {
  return (
    <div className="card h-full rounded-2xl bg-white p-6 text-center flex flex-col">
      <div id="so-icon-id" className="mx-auto w-15 h-15 rounded-xl bg-red-900 flex items-center justify-center">
        {iconUrl ? (
          <img id="so-icon" src={iconUrl} alt={title} className="w-10 h-10 object-contain" />
        ) : (
          <span className="text-gray-400">No Icon</span>
        )}
      </div>
      <div id="so-title" className="mt-4 font-semibold text-gray-900">{title}</div>
      <div id="so-text" className="mt-2 text-sm text-gray-500">{text}</div>
    </div>
  );
}
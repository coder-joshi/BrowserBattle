
import React from "react";
import PlacementValue from "./PlacementValue";
import { useNavigate } from "react-router-dom";
import Alumni from "../components/Alumni";
import Companies from "./Companies";

import { animate, motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

/* ─────────────────── Animated counter ─────────────────── */
const StatNumber = ({ target, suffix = "", prefix = "", highlight }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => prefix + Math.round(v).toLocaleString("en-IN"));
  useEffect(() => { animate(count, target, { duration: 2, ease: "easeOut" }); }, [count, target]);
  return (
    <p className={`mt-2 text-2xl sm:text-3xl font-black tabular-nums ${highlight ? "text-blue-400" : "text-white"}`}>
      <motion.span>{rounded}</motion.span>
      <span className="text-base font-bold text-white/80 whitespace-nowrap"> {suffix}</span>
    </p>
  );
};

/* ─────────────────── Why-BMSCE pillars ─────────────────── */
const pillars = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>,
    label: "Industry-Aligned Curriculum",
    desc: "Co-designed with leading tech companies — learn what the industry actually needs.",
    accent: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>,
    label: "Top-Tier Placements",
    desc: "383+ recruiters on campus. Alumni at Google, Microsoft, Amazon & beyond.",
    accent: "#06b6d4",
    bg: "rgba(6,182,212,0.08)",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
    label: "World-Class Infrastructure",
    desc: "State-of-the-art labs, research centres, and maker spaces for tomorrow's engineers.",
    accent: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.6"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
    label: "Vibrant Campus Life",
    desc: "100+ clubs, cultural fests & hackathons — a community that shapes lifelong bonds.",
    accent: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
  },
];

/* ─────────────────── Timeline milestones ─────────────────── */
const milestones = [
  { year: "1946", text: "Founded as BMS College of Engineering, Bengaluru" },
  { year: "1987", text: "Autonomous status granted by VTU" },
  { year: "2004", text: "NAAC Accreditation — A Grade" },
  { year: "2018", text: "Upgraded to NAAC A+ with NIRF Top-100 ranking" },
  { year: "2025", text: "1,307+ placement offers; ₹51.5 LPA highest package" },
];

/* ─────────────────── About Section ─────────────────── */
function AboutSection() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative bg-[#060d1f] text-white overflow-hidden">

      {/* ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full opacity-[0.14]"
          style={{ background: "radial-gradient(circle, #1d4ed8 0%, transparent 65%)" }} />
        <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.10]"
          style={{ background: "radial-gradient(circle, #0891b2 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 65%)" }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="g" width="56" height="56" patternUnits="userSpaceOnUse">
            <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#93c5fd" strokeWidth="0.5" />
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      {/* ══ PART 1: Story + Pillars ══ */}
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20">

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-blue-400 text-[10px] font-extrabold tracking-[0.28em] uppercase mb-3">About BMSCE</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-black leading-[1.04] tracking-tight"
              style={{ fontFamily: "'Georgia', serif" }}>
              75 Years of{" "}
              <span style={{ background: "linear-gradient(100deg,#60a5fa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Engineering
              </span>{" "}Excellence.
            </h2>
            <p className="lg:max-w-[340px] text-white/50 text-sm leading-relaxed lg:text-right">
              From its founding in 1946, BMS College of Engineering has been the launchpad for
              Bengaluru's brightest minds — engineers who build, lead, and shape the world.
            </p>
          </div>
          <div className="mt-7 h-px bg-gradient-to-r from-blue-500/60 via-cyan-400/25 to-transparent" />
        </motion.div>

        {/* main grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* LEFT: image + timeline */}
          <motion.div
            initial={{ opacity: 0, x: -36 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* campus image */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.65)]" style={{ aspectRatio: "4/3" }}>
              <img src="/college.jpg" alt="BMSCE Campus"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.style.background = "linear-gradient(135deg,#0f172a,#1e3a5f,#0c1a30)";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060d1f]/75 via-transparent to-transparent" />

              {/* live badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-white/90 tracking-wide">Placements Open 2026</span>
              </div>

              {/* stat strip */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-xl px-5 py-3 grid grid-cols-3 divide-x divide-white/10">
                  {[
                    { sup: "Est.", val: "1946", sub: "Bengaluru, KA" },
                    { sup: "NAAC", val: "A+", sub: "Accreditation", color: "#60a5fa" },
                    { sup: "NIRF", val: "Top 5", sub: "In the region", color: "#38bdf8" },
                  ].map((s, i) => (
                    <div key={i} className={`text-center ${i > 0 ? "pl-4" : ""} ${i < 2 ? "pr-4" : ""}`}>
                      <p className="text-[9px] uppercase tracking-widest text-white/45 mb-0.5">{s.sup}</p>
                      <p className="text-xl font-black" style={{ color: s.color || "#fff" }}>{s.val}</p>
                      <p className="text-[9px] text-white/45 mt-0.5">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-bold mb-5">Our Journey</p>
              <div className="relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/60 via-cyan-400/30 to-transparent" />
                <ul className="space-y-5">
                  {milestones.map((m, i) => (
                    <motion.li key={i}
                      initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.45, delay: 0.5 + i * 0.1 }}
                      className="flex items-start gap-4 pl-6 relative"
                    >
                      <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-blue-400 bg-[#060d1f]" />
                      <div>
                        <span className="text-[10px] font-black text-blue-400 tracking-widest">{m.year}</span>
                        <p className="text-xs text-white/60 leading-relaxed mt-0.5">{m.text}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: pillars + quote + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 36 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            {/* pillar cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.35 + i * 0.09 }}
                  className="group relative rounded-2xl border border-white/[0.07] p-5 overflow-hidden cursor-default transition-all duration-300 hover:border-white/[0.14] hover:-translate-y-0.5"
                  style={{ background: p.bg }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: `radial-gradient(circle at 20% 20%, ${p.accent}22, transparent 65%)` }} />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${p.accent}22`, color: p.accent }}>
                    {p.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{p.label}</h3>
                  <p className="text-xs text-white/48 leading-relaxed">{p.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />
                </motion.div>
              ))}
            </div>

            {/* pull quote */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.72 }}
              className="relative rounded-2xl border border-blue-500/18 overflow-hidden p-6"
              style={{ background: "linear-gradient(135deg, rgba(29,78,216,0.12), rgba(8,145,178,0.06))" }}
            >
              <span className="absolute -top-5 -left-1 text-[110px] leading-none font-serif text-blue-400/10 select-none pointer-events-none">"</span>
              <p className="relative text-white/75 text-sm sm:text-[15px] leading-[1.75] italic">
                BMS College of Engineering doesn't just produce graduates — it produces leaders
                who shape industries, launch startups, and drive the next wave of innovation across the globe.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 text-xs font-black">B</div>
                <div>
                  <p className="text-xs font-semibold text-white/75">BMSCE Training & Placement Cell</p>
                  <p className="text-[10px] text-white/38">Est. 1946 · Bengaluru, Karnataka</p>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap gap-3"
            >
              <button onClick={() => navigate("/departments")}  className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold shadow-lg hover:shadow-blue-500/30 hover:scale-[1.03] transition-all duration-300">
                Explore All Programs
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button onClick={() => window.open("https://drive.google.com/file/d/1B0kvjlREBx-NxaexIp8ANqXfyjZCrsW7/view?usp=sharing", "_blank")} className="px-6 py-3 rounded-full border border-white/15 text-white/65 text-sm font-semibold hover:bg-white/5 hover:border-white/25 hover:text-white/90 transition-all duration-300">
                Download Brochure
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ══ PART 2: Alumni Voices ══ */}
      <AlumniSection />
    </section>
  );
}

/* ─────────────────── Alumni Section ─────────────────── */
function AlumniSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative border-t border-white/[0.06]">
      {/* top fade */}
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, #060d1f, transparent)" }} />

      {/* header */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <p className="text-blue-400 text-[10px] font-extrabold tracking-[0.28em] uppercase mb-3">Alumni Voices</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}>
            Hear from Our{" "}
            <span style={{ background: "linear-gradient(100deg,#60a5fa,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Alumni
            </span>
          </h2>
          <p className="mt-4 text-white/45 text-sm max-w-lg mx-auto leading-relaxed">
            Thousands of BMSCE graduates are now leading teams, building products, and founding companies
            across the globe. Here's what some of them say.
          </p>

          {/* decorative dots */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-500/50" />
          </div>
        </motion.div>

        {/* stat chips */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { val: "18,500+", label: "Cumulative offers since 1995" },
            { val: "10K+", label: "Active alumni worldwide" },
            { val: "50+", label: "Countries represented" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <span className="text-sm font-black text-blue-400">{c.val}</span>
              <span className="text-[11px] text-white/45">{c.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Alumni marquee — rendered on dark bg */}
      <motion.div
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="[&_.bg-gray-50]:bg-transparent"
      >
        <Alumni />
      </motion.div>

      {/* bottom fade */}
      <div className="h-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #060d1f)" }} />
    </div>
  );
}

/* ─────────────────── Main HomePage ─────────────────── */
function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      {/* HERO */}
      <section className="relative w-full min-h-[92vh] overflow-hidden">
        <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/homevideo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#020617]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_600px_at_70%_20%,rgba(255,215,0,0.12),rgba(0,0,0,0))]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white pt-28 pb-16">
          <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
            <span className="text-xs font-black tracking-[0.2em] uppercase">BMSCE • Bengaluru</span>
            <span className="h-4 w-px bg-black/30" />
            <span className="text-xs font-semibold">Admissions & Placements 2026</span>
          </div>

          <div className="mt-8 grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <p className="uppercase tracking-[0.35em] text-[11px] text-white/70 mb-4">BMS College of Engineering</p>
              <h1 className="text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-[0.92] tracking-tight">
                Build.<br />
                <span className="text-blue-400 drop-shadow-[0_18px_40px_rgba(0,0,0,0.35)]">Lead.</span><br />
                Succeed.
              </h1>
              <p className="mt-6 max-w-xl text-white/80 text-base sm:text-lg leading-relaxed">
                A legacy of excellence with modern, industry-aligned learning — backed by strong outcomes in internships and placements.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => navigate("/departments")}  className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-full font-bold transition shadow-lg hover:opacity-90">Explore Programs</button>
                <button onClick={() => navigate("/placements")} className="border border-blue-400/40 bg-blue-500/10 px-6 py-3 rounded-full font-bold transition backdrop-blur hover:bg-blue-500/20">Placement Highlights</button>
                <button onClick={() => navigate("/campuslife")} className="border border-blue-400/20 hover:bg-blue-500/10 px-6 py-3 rounded-full font-semibold transition">Campus Tour</button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/15 bg-black/35 backdrop-blur-xl overflow-hidden shadow-[0_28px_80px_rgba(0,0,0,0.55)]">
                <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">Live outcomes</p>
                    <p className="text-lg font-extrabold">Placements loading…</p>
                  </div>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-black tracking-wide">2025–26</span>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  {[
                    { label: "Highest package", target: 51, suffix: ".5 LPA", prefix: "₹", highlight: true },
                    { label: "Avg package", target: 11, suffix: ".4 LPA", prefix: "₹" },
                    { label: "Offers", target: 1307, suffix: "+" },
                    { label: "Companies", target: 383, suffix: "+" },
                  ].map((s, i) => (
                    <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-4 hover:scale-[1.03] transition-all duration-300">
                      <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">{s.label}</p>
                      <StatNumber {...s} />
                      <div className="mt-3 h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full w-full placement-shimmer opacity-70" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 pb-6">
                  <div className="rounded-xl bg-blue-500/10 border border-blue-400/20 p-4 flex items-center justify-between">
                    <p className="text-sm text-white/85">Scroll to see the full placement dashboard</p>
                    <span className="text-xs font-black text-white bg-gradient-to-r from-blue-600 to-blue-800 px-3 py-1 rounded-full">↓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS STRIP */}
      <section className="bg-[#020617] text-white py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {[
            { cat: "Legacy", val: "75+", sub: "Years of excellence" },
            { cat: "Community", val: "10K+", sub: "Students & alumni" },
            { cat: "Faculty", val: "100+", sub: "Mentors & researchers" },
            { cat: "Reputation", val: "Top 5", sub: "In the region" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">{s.cat}</p>
              <h2 className="mt-1 text-2xl sm:text-3xl font-black text-blue-400 tabular-nums">{s.val}</h2>
              <p className="text-sm text-white/70">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT + ALUMNI — unified dark section */}
      <AboutSection />

      {/* COMPANIES */}
      {/* <Companies /> */}
      
    </>
  );
}

export default HomePage;
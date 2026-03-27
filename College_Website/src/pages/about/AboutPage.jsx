import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use these instead of useLocation
import "../shared.css";

const historyEvents = [
  { year: "1946", title: "Foundation", icon: "🏛️", desc: "Bhusanayana Mukundadas Sreenivasaiah founds BMSCE — India's first private engineering college — starting with just 3 undergraduate programs." },
  { year: "1960s", title: "Expansion", icon: "📐", desc: "Introduction of new departments in Electrical Engineering, Mechanical Engineering, and Civil Engineering to meet growing industrial demand." },
  { year: "1973", title: "Utsav Festival", icon: "🎉", desc: "The first edition of Utsav, BMSCE's cultural festival, is launched by students. It grows into one of Bengaluru's most anticipated annual events." },
  { year: "2008", title: "Autonomous Status", icon: "📜", desc: "VTU grants BMSCE autonomous status, enabling the college to design its own curriculum and adopt outcome-based education — a first in Karnataka." },
  { year: "2010", title: "NBA Tier-I Accreditation", icon: "🏅", desc: "BMSCE becomes the first institution in Karnataka to receive NBA accreditation in the prestigious Tier-I format." },
  { year: "2020", title: "NAAC A++ Grade", icon: "⭐", desc: "The National Assessment and Accreditation Council awards BMSCE the highest 'A++' grade with a CGPA of 3.83/4.0." },
  { year: "2024", title: "NIRF Recognition", icon: "🏆", desc: "Ranked in the 101–150 band by NIRF 2024 (Engineering category), cementing BMSCE's place among India's premier institutions." },
  { year: "2026", title: "Continuing Excellence", icon: "🚀", desc: "Admissions open for 2026–27 with expanded programs in AI, ML, Data Science, and IoT, keeping pace with tomorrow's tech landscape." },
];

function HistoryTimeline() {
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vt-item--visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    itemsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .vt-section { padding: 2.5rem 1.5rem 4rem; background: #f8faff; }
        .vt-header { text-align: center; max-width: 600px; margin: 0 auto 3.5rem; }
        .vt-label { display: inline-block; font-size: 0.7rem; font-weight: 800; letter-spacing: 0.2em; color: #1565c0; text-transform: uppercase; margin-bottom: 0.6rem; }
        .vt-heading { font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 800; color: #0f172a; margin: 0 0 0.75rem; line-height: 1.15; }
        .vt-sub { color: #64748b; font-size: 0.95rem; line-height: 1.7; margin: 0; }

        .vt-wrap { position: relative; max-width: 820px; margin: 0 auto; }
        .vt-spine {
          position: absolute; left: 50%; top: 0; bottom: 0;
          width: 3px; transform: translateX(-50%);
          background: linear-gradient(to bottom, #1565c0, #90caf9 80%, transparent);
          border-radius: 2px;
        }

        .vt-item {
          position: relative; width: 44%; margin-bottom: 3rem;
          opacity: 0; transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .vt-item--left  { left: 0;    transform: translateX(-36px); text-align: right; }
        .vt-item--right { left: 56%;  transform: translateX(36px);  text-align: left; }
        .vt-item--visible { opacity: 1; transform: translateX(0); }

        .vt-item:nth-child(2) { transition-delay: 0.05s; }
        .vt-item:nth-child(3) { transition-delay: 0.10s; }
        .vt-item:nth-child(4) { transition-delay: 0.15s; }
        .vt-item:nth-child(5) { transition-delay: 0.20s; }
        .vt-item:nth-child(6) { transition-delay: 0.25s; }
        .vt-item:nth-child(7) { transition-delay: 0.30s; }
        .vt-item:nth-child(8) { transition-delay: 0.35s; }
        .vt-item:nth-child(9) { transition-delay: 0.40s; }

        .vt-dot {
          position: absolute; top: 18px;
          width: 20px; height: 20px;
          background: #fff; border: 3px solid #1565c0;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 4px #e3eeff; z-index: 1;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .vt-item:hover .vt-dot {
          transform: scale(1.2);
          box-shadow: 0 0 0 6px #c7deff;
        }
        .vt-item--left  .vt-dot { right: -11%; }
        .vt-item--right .vt-dot { left:  -11%; }
        .vt-dot-inner { width: 7px; height: 7px; background: #1565c0; border-radius: 50%; }

        .vt-card {
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 14px; padding: 1.25rem 1.5rem;
          box-shadow: 0 4px 18px rgba(21,101,192,0.07);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .vt-card:hover { box-shadow: 0 8px 32px rgba(21,101,192,0.14); transform: translateY(-3px); }

        .vt-icon { font-size: 1.5rem; margin-bottom: 0.4rem; display: block; }
        .vt-year {
          display: inline-block; font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.12em; color: #1565c0; text-transform: uppercase;
          background: #eff6ff; border-radius: 999px; padding: 2px 10px; margin-bottom: 0.4rem;
        }
        .vt-title { font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 0.4rem; }
        .vt-desc  { font-size: 0.84rem; color: #475569; line-height: 1.7; margin: 0; }

        @media (max-width: 680px) {
          .vt-spine { left: 18px; }
          .vt-item { width: calc(100% - 48px) !important; left: 48px !important; text-align: left !important; transform: translateX(24px) !important; }
          .vt-item--visible { transform: translateX(0) !important; }
          .vt-dot { left: -38px !important; right: auto !important; }
          .vt-section { padding: 2rem 1rem 3rem; }
        }
      `}</style>

      <div className="vt-section">
        <div className="vt-header">
          <span className="vt-label">Our Journey</span>
          <h2 className="vt-heading">A Legacy of 78+ Years</h2>
          <p className="vt-sub">From a humble start with 3 programs to one of India's top engineering institutions — every milestone tells our story.</p>
        </div>

        <div className="vt-wrap">
          <div className="vt-spine" />
          {historyEvents.map((e, i) => (
            <div
              key={e.year}
              className={`vt-item ${i % 2 === 0 ? "vt-item--left" : "vt-item--right"}`}
              ref={(el) => (itemsRef.current[i] = el)}
            >
              <div className="vt-dot"><div className="vt-dot-inner" /></div>
              <div className="vt-card">
                <span className="vt-icon">{e.icon}</span>
                <span className="vt-year">{e.year}</span>
                <h3 className="vt-title">{e.title}</h3>
                <p className="vt-desc">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const tabs = ["Overview", "History", "Leadership", "Accreditation", "Achievements"];

function AboutPage() {
  const { section } = useParams(); // This grabs the "history" from "/about/history"
  const navigate = useNavigate();

  // Figure out which tab is active based on the URL parameter. 
  // If there isn't one (like just "/about"), default to "Overview".
  const activeTab = tabs.find((t) => t.toLowerCase() === section?.toLowerCase()) || "Overview";

  // When a user clicks a tab, cleanly change the URL
  const handleTabClick = (t) => {
    navigate(`/about/${t.toLowerCase()}`);
  };

  return (
    <div className="page-body">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="page-header-label">About BMSCE</div>
          <h1 className="page-header-title">B.M.S. College of Engineering</h1>
          <p className="page-header-sub">
            India's first private engineering college, founded in 1946 by Sri B. M. Sreenivasaiah.
            Located in the heart of Basavanagudi, Bengaluru — shaping engineers for over 78 years.
          </p>
        </div>
        <div className="page-header-stats">
          <div className="page-stat"><span className="page-stat-n">1946</span><span className="page-stat-l">Founded</span></div>
          <div className="page-stat"><span className="page-stat-n">40K+</span><span className="page-stat-l">Alumni</span></div>
          <div className="page-stat"><span className="page-stat-n">A++</span><span className="page-stat-l">NAAC Grade</span></div>
          <div className="page-stat"><span className="page-stat-n">350+</span><span className="page-stat-l">PhD Scholars</span></div>
        </div>
      </div>

      {/* Tab Nav */}
      <div style={{ background: "white", borderBottom: "1px solid #eef1f6", padding: "0 2rem", display: "flex", gap: "0.25rem", overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => handleTabClick(t)} style={{
            padding: "0.85rem 1.25rem",
            border: "none",
            background: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.875rem",
            color: activeTab === t ? "#1565c0" : "#555",
            borderBottom: activeTab === t ? "2.5px solid #1565c0" : "2.5px solid transparent",
            whiteSpace: "nowrap",
            transition: "color 0.15s",
          }}>{t}</button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "Overview" && (
        <>
          <div className="section-title"><span className="section-line"></span>Who We Are<span className="section-line"></span></div>
          <div className="two-col">
            <div className="content-block">
              <h3>Our Institution</h3>
              <p>B.M.S. College of Engineering (BMSCE) is the first private engineering college in India, established in 1946 by the visionary philanthropist Late Sri Bhusanayana Mukundadas Sreenivasaiah and nurtured by his son Late Sri B. S. Narayan. Run by the B.M.S. Educational Trust, the college spans 11 acres in Basavanagudi, Bengaluru.</p>
              <p>Affiliated with Visvesvaraya Technological University (VTU) and granted autonomous status in 2008, BMSCE offers 13 undergraduate and 16 postgraduate programs across conventional and emerging engineering disciplines.</p>
              <p>With over 5,000 students and 350+ PhD research scholars, BMSCE remains a powerhouse of technical education and innovation in Karnataka.</p>
            </div>
            <div className="content-block">
              <h3>Vision & Mission</h3>
              <div className="highlight-strip">
                <strong>Vision:</strong> To be a globally recognized institution for quality technical education, research, and innovation that creates leaders and problem-solvers for society.
              </div>
              <div className="highlight-strip">
                <strong>Mission:</strong> To impart quality education, foster research and entrepreneurship, and develop industry-ready engineers through an outcome-based curriculum and world-class infrastructure.
              </div>
              <p style={{fontSize:"0.85rem", color:"#666", marginTop:"1rem"}}>BMSCE has been practising outcome-based education since 2008 — among the earliest institutions in India to adopt this model.</p>
            </div>
          </div>

          <div className="section-title"><span className="section-line"></span>Key Highlights<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🏛️", title: "India's First Private Engineering College", desc: "Established in 1946, BMSCE holds the distinction of being the very first private engineering institution in India." },
              { icon: "🎓", title: "Autonomous Institution", desc: "Granted autonomous status by VTU in 2008, enabling BMSCE to design its own curriculum aligned with industry needs." },
              { icon: "🔬", title: "14 Research Centers", desc: "Fourteen departments are recognised as research centers offering PhD and M.Sc (Engineering by Research) degrees." },
              { icon: "🌍", title: "Melton Foundation Partner", desc: "The only partner institution of the Melton Foundation, USA from India, fostering global citizenship among students." },
              { icon: "🏅", title: "NBA Tier-I — First in Karnataka", desc: "First institution in Karnataka to receive NBA accreditation in the Tier-I format, setting a benchmark for quality." },
              { icon: "📚", title: "5,000+ Students", desc: "One of the largest student populations among engineering colleges in Karnataka, across UG, PG, and doctoral programs." },
            ].map(c => (
              <div className="info-card" key={c.title}>
                <span className="info-card-icon">{c.icon}</span>
                <div className="info-card-title">{c.title}</div>
                <p className="info-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* History */}
      {activeTab === "History" && <HistoryTimeline />}

      {/* Leadership */}
      {activeTab === "Leadership" && (
        <>
          <div className="section-title"><span className="section-line"></span>Our Leaders<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { initials: "BMS", name: "Late Sri B. M. Sreenivasaiah", role: "Founder", desc: "A visionary philanthropist who established India's first private engineering college in 1946, driven by a belief in technical education as a vehicle for national progress." },
              { initials: "BSN", name: "Late Sri B. S. Narayan", role: "Second-Generation Leader", desc: "Nurtured and expanded BMSCE into a premier institution, growing it from three departments to a comprehensive multi-disciplinary engineering college." },
              { initials: "PR", name: "Dr. K. S. Prakash Rao", role: "Principal", desc: "Provides academic and administrative leadership, guiding faculty and students toward excellence in engineering education and research." },
              { initials: "BT", name: "B.M.S. Educational Trust", role: "Governing Body", desc: "The Trust oversees eight group institutions including BMSCE, ensuring strategic direction, governance, and sustained investment in infrastructure and talent." },
            ].map(p => (
              <div className="profile-card" key={p.name} style={{ flexDirection: "column" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div className="profile-avatar">{p.initials}</div>
                  <div>
                    <div className="profile-name">{p.name}</div>
                    <div className="profile-role">{p.role}</div>
                  </div>
                </div>
                <p className="profile-desc" style={{ marginTop: "0.75rem" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Accreditation */}
      {activeTab === "Accreditation" && (
        <>
          <div className="section-title"><span className="section-line"></span>Accreditations & Affiliations<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🏆", title: "NAAC A++ Grade", desc: "Awarded the highest 'A++' grade by the National Assessment and Accreditation Council with a CGPA of 3.83/4.0 — a testament to academic excellence and institutional quality.", tag: "Highest Grade" },
              { icon: "✅", title: "NBA Accreditation (Tier-I)", desc: "First institution in Karnataka to achieve NBA accreditation in the Tier-I format. Multiple UG and PG programs are NBA-accredited.", tag: "Tier I — First in Karnataka" },
              { icon: "📋", title: "AICTE Approved", desc: "All programs at BMSCE are approved by the All India Council for Technical Education, ensuring compliance with national standards for technical education.", tag: "All Programs" },
              { icon: "🎓", title: "UGC Recognised", desc: "The University Grants Commission (UGC) recognizes BMSCE, validating its degrees for employment, higher studies, and research opportunities worldwide.", tag: "National Recognition" },
              { icon: "🏫", title: "VTU Affiliated & Autonomous", desc: "Affiliated with Visvesvaraya Technological University (VTU), Belagavi, and granted autonomous status in 2008 to design industry-relevant curricula.", tag: "Autonomous since 2008" },
              { icon: "🌐", title: "NIRF Ranked", desc: "Consistently ranked in the 101–150 engineering band by the National Institutional Ranking Framework, placing it among India's top private engineering colleges.", tag: "NIRF 2024" },
            ].map(c => (
              <div className="info-card" key={c.title}>
                <span className="info-card-icon">{c.icon}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <div className="info-card-title" style={{ margin: 0 }}>{c.title}</div>
                  <span className="badge badge-blue">{c.tag}</span>
                </div>
                <p className="info-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Achievements */}
      {activeTab === "Achievements" && (
        <>
          <div className="section-title"><span className="section-line"></span>Notable Achievements<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🥇", title: "India's First Private Engineering College", desc: "A historic milestone: BMSCE was the first privately run engineering institution in India, setting a precedent for the entire sector." },
              { icon: "🔬", title: "40,000+ Alumni Worldwide", desc: "Over four decades of engineering graduates now serve in leadership roles across technology, research, entrepreneurship, and public service globally." },
              { icon: "🧠", title: "160+ PhDs Produced", desc: "BMSCE's 14 research centers have so far produced over 160 PhD graduates, with 350+ researchers currently pursuing doctoral degrees." },
              { icon: "💰", title: "₹51.5 LPA Highest Package", desc: "The 2025 placement season recorded a highest package of ₹51.5 LPA, with 1,141+ job offers made to students by top companies." },
              { icon: "🌍", title: "Melton Foundation Partnership", desc: "The only institution in India partnered with the Melton Foundation (USA), enabling students to participate in global leadership and citizenship programs." },
              { icon: "📰", title: "Top 20 Private Colleges — India Today", desc: "Consistently ranked among the top 20 private engineering colleges in India by leading publications India Today and Outlook." },
            ].map(c => (
              <div className="info-card" key={c.title}>
                <span className="info-card-icon">{c.icon}</span>
                <div className="info-card-title">{c.title}</div>
                <p className="info-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AboutPage;
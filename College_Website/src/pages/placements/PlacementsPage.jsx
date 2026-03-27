import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // React Router hooks
import "../shared.css";

const tabs = ["Overview", "Recruiters", "Statistics", "Register"];

// Hook for animating numbers (kept for your utility)
function useCountUp(target, duration = 1800, suffix = "") {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            setDisplay(current.toLocaleString("en-IN") + suffix);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, suffix]);

  return { ref, display };
}

// Component for the animated stats in the hero section
function AnimatedStat({ prefix = "", target, suffix = "", label, decimals = 0 }) {
  const [display, setDisplay] = useState(prefix + "0" + suffix);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            const formatted = decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString("en-IN");
            setDisplay(prefix + formatted + suffix);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, prefix, suffix, decimals]);

  return (
    <div className="page-stat" ref={ref}>
      <span className="page-stat-n" style={{ transition: "all 0.1s" }}>{display}</span>
      <span className="page-stat-l">{label}</span>
    </div>
  );
}

function PlacementsPage() {
  const { section } = useParams(); // Grabs 'recruiters' from /placements/recruiters
  const navigate = useNavigate();

  // Determine active tab based on URL param, default to Overview
  const activeTab = tabs.find(t => t.toLowerCase() === section?.toLowerCase()) || "Overview";

  const topRecruiters = [
    "Oracle", "Accenture", "Adobe", "Atlassian", "L&T", "Infosys", "Wipro", "TCS",
    "Cohesity", "JP Morgan", "Paytm", "IBM", "HP India", "Yahoo!", "Delphi Automotive",
    "Bosch", "Honeywell", "Siemens", "Intel", "Qualcomm", "Microsoft", "Google",
    "Amazon", "Flipkart", "Tata Motors", "Larsen & Toubro", "ISRO", "DRDO",
  ];

  // Helper to change path when clicking a tab on the page
  const handleTabClick = (t) => {
    navigate(`/placements/${t.toLowerCase()}`);
  };

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <div className="page-header-label">Training & Placements</div>
          <h1 className="page-header-title">Placements at BMSCE</h1>
          <p className="page-header-sub">
            A stellar and consistent placement record backed by a 75+ year legacy and a powerful alumni network. Over 100 companies visit campus every year, offering roles across technology, core engineering, finance, and management.
          </p>
        </div>
        <div className="page-header-stats">
          {/* Using your awesome animated stats here! */}
          <AnimatedStat prefix="₹" target={51.5} suffix="L" label="Highest Package" decimals={1} />
          <AnimatedStat prefix="₹" target={13} suffix="L" label="Avg Package" decimals={0} />
          <AnimatedStat target={1141} suffix="+" label="Offers (2024)" />
          <AnimatedStat target={90} suffix="%+" label="Placed" />
        </div>
      </div>

      <div style={{ background: "white", borderBottom: "1px solid #eef1f6", padding: "0 2rem", display: "flex", gap: "0.25rem", overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => handleTabClick(t)} style={{
            padding: "0.85rem 1.25rem", border: "none", background: "none", cursor: "pointer",
            fontWeight: 600, fontSize: "0.875rem",
            color: activeTab === t ? "#1565c0" : "#555",
            borderBottom: activeTab === t ? "2.5px solid #1565c0" : "2.5px solid transparent",
            whiteSpace: "nowrap", transition: "color 0.15s",
          }}>{t}</button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <>
          <div className="section-title"><span className="section-line"></span>Placement Highlights 2025<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "💰", title: "Highest CTC — ₹51.5 LPA", desc: "The highest compensation package recorded in the 2025 placement season, offered by a leading technology firm." },
              { icon: "📈", title: "Average Package — ₹13 LPA", desc: "Strong average package reflecting the quality of BMSCE graduates and the depth of companies visiting campus." },
              { icon: "🎯", title: "1,141+ Offers", desc: "Over 1,141 job offers made during the 2024–25 placement season, covering UG and PG students across departments." },
              { icon: "🏢", title: "100+ Companies", desc: "More than 100 reputed companies visit the campus every year, from top IT firms to core engineering giants and finance companies." },
              { icon: "🎓", title: "90%+ Placement Rate", desc: "Over 90% of eligible students are placed each year, a consistent track record maintained across engineering disciplines." },
              { icon: "🌐", title: "Diverse Sectors", desc: "Placements span IT product/service, core engineering, aerospace, finance, consulting, and management sectors — ensuring varied career paths." },
            ].map(c => (
              <div className="info-card" key={c.title}>
                <span className="info-card-icon">{c.icon}</span>
                <div className="info-card-title">{c.title}</div>
                <p className="info-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div className="highlight-strip">
              BMSCE is a preferred destination for both core engineering companies and top IT product & service firms, ensuring a diverse range of career opportunities for graduates. Its location in Bengaluru — India's Silicon Valley — gives students direct access to the country's largest tech ecosystem.
            </div>
          </div>
        </>
      )}

      {activeTab === "Recruiters" && (
        <>
          <div className="section-title"><span className="section-line"></span>Top Recruiting Companies<span className="section-line"></span></div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div className="content-block">
              <h3>Our Recruiting Partners</h3>
              <p>Over 100 companies across technology, manufacturing, finance, and consulting visit BMSCE annually. Here are some of our prominent recruiters:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.25rem" }}>
                {topRecruiters.map(r => (
                  <span key={r} style={{
                    background: "#f0f5ff", color: "#1565c0", border: "1px solid #c5d8f5",
                    borderRadius: "8px", padding: "0.45rem 0.9rem", fontWeight: 600, fontSize: "0.85rem"
                  }}>{r}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="section-title"><span className="section-line"></span>Sector-Wise<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "💻", title: "Information Technology", desc: "Oracle, Atlassian, Adobe, Cohesity, Yahoo!, HP India, IBM, Infosys, Wipro, TCS, Flipkart, Amazon" },
              { icon: "⚙️", title: "Core Engineering", desc: "L&T, Tata Motors, Bosch, Honeywell, Siemens, Delphi Automotive, Amada India, Total Environment Building Systems" },
              { icon: "💳", title: "Finance & Banking", desc: "JP Morgan, various fintech companies including Paytm and other banking technology firms" },
              { icon: "🚀", title: "Defence & Research", desc: "ISRO, DRDO, and other public sector units recruit BMSCE engineers for high-impact national projects" },
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

      {activeTab === "Statistics" && (
        <>
          <div className="section-title"><span className="section-line"></span>Year-on-Year Statistics<span className="section-line"></span></div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div className="content-block" style={{ overflowX: "auto" }}>
              <h3>Placement Data</h3>
              <table className="data-table" style={{ marginTop: "0.75rem" }}>
                <thead>
                  <tr><th>Year</th><th>Highest CTC</th><th>Average CTC</th><th>UG Students Placed</th><th>PG Students Placed</th></tr>
                </thead>
                <tbody>
                  {[
                    ["2025", "₹51.5 LPA", "₹13.0 LPA", "1100+", "150+"],
                    ["2024", "₹50 LPA", "—", "1141 offers", "—"],
                    ["2023", "₹33.10 LPA", "₹10.03 LPA", "952", "63"],
                    ["2022", "₹50 LPA", "₹8.24 LPA", "900+", "50+"],
                  ].map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td>{r[4]}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div className="content-block" style={{ marginTop: "1.5rem", overflowX: "auto" }}>
              <h3>NIRF Reported Median Packages</h3>
              <table className="data-table" style={{ marginTop: "0.75rem" }}>
                <thead><tr><th>Program</th><th>Median Package</th><th>Source</th></tr></thead>
                <tbody>
                  {[
                    ["B.E. (UG)", "₹8.50 LPA", "NIRF 2025"],
                    ["M.Tech (PG)", "₹7.20 LPA", "NIRF 2025"],
                  ].map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === "Register" && (
        <>
          <div className="section-title"><span className="section-line"></span>Student Registration<span className="section-line"></span></div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div className="two-col">
              <div className="content-block">
                <h3>For Students</h3>
                <p>Final year and pre-final year students can register with the Training & Placement Cell to participate in campus recruitment drives.</p>
                <p>Students are advised to keep their resume updated, complete all pre-placement training modules, and maintain a clean CGPA record.</p>
                <div className="highlight-strip" style={{ marginTop: "1rem" }}>
                  To register, contact the T&P Cell or visit the Student Portal. A valid college email ID is required for registration.
                </div>
              </div>
              <div className="content-block">
                <h3>For Recruiters</h3>
                <p>Companies interested in recruiting BMSCE graduates can reach out to the Training & Placement Cell to schedule campus placement drives, pre-placement talks, or internship programs.</p>
                <p>BMSCE offers dedicated facilities for written tests, group discussions, and technical/HR interview rounds.</p>
                <div className="highlight-strip" style={{ marginTop: "1rem" }}>
                  📍 Training & Placement Cell<br/>
                  Bull Temple Road, Basavanagudi<br/>
                  Bengaluru – 560 019<br/>
                  📧 placements@bmsce.ac.in
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PlacementsPage;
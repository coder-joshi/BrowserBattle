
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../shared.css";
import Companies from "../../components/Companies";

const tabs = ["Overview", "Recruiters", "Statistics", "Register"];

/* ─── Animated Number Hook/Component ─── */
function CountUp({
  prefix = "",
  target,
  suffix = "",
  decimals = 0,
  duration = 2200,
}) {
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
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            const formatted =
              decimals > 0
                ? current.toFixed(decimals)
                : Math.round(current).toLocaleString("en-IN");
            setDisplay(prefix + formatted + suffix);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, prefix, suffix, decimals, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </span>
  );
}

// const topRecruiters = [
//   { name: "Oracle", logo: "https://logo.clearbit.com/oracle.com" },
//   { name: "Accenture", logo: "https://logo.clearbit.com/accenture.com" },
//   { name: "Adobe", logo: "https://logo.clearbit.com/adobe.com" },
//   { name: "Atlassian", logo: "https://logo.clearbit.com/atlassian.com" },
//   { name: "L&T", logo: "https://logo.clearbit.com/larsentoubro.com" },
//   { name: "Infosys", logo: "https://logo.clearbit.com/infosys.com" },
//   { name: "Wipro", logo: "https://logo.clearbit.com/wipro.com" },
//   { name: "TCS", logo: "https://logo.clearbit.com/tcs.com" },
//   { name: "JP Morgan", logo: "https://logo.clearbit.com/jpmorgan.com" },
//   { name: "IBM", logo: "https://logo.clearbit.com/ibm.com" },
//   { name: "Bosch", logo: "https://logo.clearbit.com/bosch.com" },
//   { name: "Honeywell", logo: "https://logo.clearbit.com/honeywell.com" },
//   { name: "Google", logo: "https://logo.clearbit.com/google.com" },
//   { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com" },
//   { name: "Flipkart", logo: "https://logo.clearbit.com/flipkart.com" },
//   { name: "ISRO", logo: "https://logo.clearbit.com/isro.gov.in" },
// ];

/* ─── Logo Marquee ─── */
// function LogoSlideshow({ companies }) {
//   const doubled = [...companies, ...companies];
//   return (
//     <div style={{ overflow: "hidden", width: "100%", padding: "1.5rem 0" }}>
//       <div className="logo-track" style={{ display: "flex", gap: "3rem", width: "max-content" }}>
//         {doubled.map((c, i) => (
//           <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", minWidth: "110px" }}>
//             <div style={{ width: "80px", height: "80px", borderRadius: "18px", background: "white", border: "1px solid #eef2f8", display: "flex", alignItems: "center", justifyCenter: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", overflow: "hidden", padding: "10px" }}>
//               <img src={c.logo} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "contain" }}
//                 onError={(e) => { e.target.style.display="none"; e.target.parentElement.innerHTML = `<span style="font-weight:800;color:#1565c0">${c.name[0]}</span>`; }} />
//             </div>
//             <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b" }}>{c.name}</span>
//           </div>
//         ))}
//       </div>
//       <style>{`
//         .logo-track { animation: logoScroll 25s linear infinite; }
//         @keyframes logoScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
//       `}</style>
//     </div>
//   );
// }

function PlacementsPage() {
  const { section } = useParams();
  const navigate = useNavigate();

  const activeTab =
    tabs.find((t) => t.toLowerCase() === section?.toLowerCase()) || "Overview";

  const handleTabClick = (t) => {
    navigate(`/placements/${t.toLowerCase()}`);
  };

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <div className="page-header-label">Training & Placements</div>
          <h1 className="page-header-title">Placement Excellence</h1>
          <p className="page-header-sub">
            BMSCE maintains a stellar placement record with over 383+ recruiters
            visiting annually. Strategically located in Bengaluru, we bridge the
            gap between academic brilliance and industry leadership.
          </p>
        </div>
        <div className="page-header-stats">
          <div className="page-stat">
            <span className="page-stat-n">
              <CountUp prefix="₹" target={51.5} suffix="L" decimals={1} />
            </span>
            <span className="page-stat-l">Highest Package</span>
          </div>
          <div className="page-stat">
            <span className="page-stat-n">
              <CountUp target={1141} suffix="+" />
            </span>
            <span className="page-stat-l">Offers (2024-25)</span>
          </div>
          <div className="page-stat">
            <span className="page-stat-n">
              <CountUp target={383} suffix="+" />
            </span>
            <span className="page-stat-l">Recruiters</span>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderBottom: "1px solid #eef1f6",
          padding: "0 2rem",
          display: "flex",
          gap: "0.25rem",
          overflowX: "auto",
          position: "sticky",
          top: "56px",
          zIndex: 10,
        }}
      >
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => handleTabClick(t)}
            style={{
              padding: "1rem 1.5rem",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: activeTab === t ? "#1565c0" : "#64748b",
              borderBottom:
                activeTab === t ? "3px solid #1565c0" : "3px solid transparent",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <>
          <div style={{ padding: "2.5rem 2rem 0" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #1e3a8a 0%, #1565c0 100%)",
                borderRadius: "24px",
                padding: "3rem",
                color: "white",
                boxShadow: "0 20px 40px rgba(21,101,192,0.15)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "2rem",
                  textAlign: "center",
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      tracking: "0.1em",
                      opacity: 0.8,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Average Package
                  </h4>
                  <div style={{ fontSize: "3rem", fontWeight: 900 }}>
                    <CountUp prefix="₹" target={13} suffix=" LPA" />
                  </div>
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      tracking: "0.1em",
                      opacity: 0.8,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Placement Rate
                  </h4>
                  <div style={{ fontSize: "3rem", fontWeight: 900 }}>
                    <CountUp target={90} suffix="%+" />
                  </div>
                </div>
                <div>
                  <h4
                    style={{
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      tracking: "0.1em",
                      opacity: 0.8,
                      marginBottom: "0.5rem",
                    }}
                  >
                    Median (UG)
                  </h4>
                  <div style={{ fontSize: "3rem", fontWeight: 900 }}>
                    <CountUp
                      prefix="₹"
                      target={8.5}
                      suffix=" LPA"
                      decimals={1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-title">
            <span className="section-line" />
            Highlights
            <span className="section-line" />
          </div>
          <div className="info-cards-grid">
            {[
              {
                icon: "💰",
                title: "Global Packages",
                desc: "Top-tier compensation packages from international tech giants and domestic unicorns.",
              },
              {
                icon: "🏢",
                title: "380+ Recruiters",
                desc: "A massive pool of companies ranging from Fortune 500s to high-growth startups.",
              },
              {
                icon: "🎯",
                title: "Core Opportunities",
                desc: "Strong focus on core engineering placements in Mechanical, Civil, and Electrical sectors.",
              },
              {
                icon: "🎓",
                title: "Internship Support",
                desc: "Over 60% of students secure paid internships with PPO opportunities before graduation.",
              },
            ].map((c) => (
              <div className="info-card" key={c.title}>
                <span className="info-card-icon">{c.icon}</span>
                <div className="info-card-title">{c.title}</div>
                <p className="info-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "Recruiters" && (
        <div style={{ padding: "0 2rem 3rem" }}>
          <div className="section-title">
            <span className="section-line" />
            Recruiters
            <span className="section-line" />
          </div>
          <div style={{ margin: "0 -2rem" }}>
            <Companies />
          </div>
          <div className="two-col" style={{ marginTop: "2rem" }}>
            <div className="content-block">
              <h3>Sector Focus: Tech & Product</h3>
              <p>
                Adobe, Oracle, Google, and Amazon lead the software recruitment,
                offering roles in SDE, Data Science, and Cloud Architecture.
              </p>
            </div>
            <div className="content-block">
              <h3>Sector Focus: Core & PSU</h3>
              <p>
                L&T, Bosch, and Toyota are consistent recruiters. PSUs like ISRO
                and DRDO frequently select students for research roles.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Statistics" && (
        <div style={{ padding: "0 2rem 3rem" }}>
          <div className="content-block">
            <h3>Consolidated Salary Trends</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Academic Year</th>
                  <th>Highest Package</th>
                  <th>Average Package</th>
                  <th>Total Offers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-25</td>
                  <td>₹51.50 LPA</td>
                  <td>₹13.00 LPA</td>
                  <td>1141+</td>
                </tr>
                <tr>
                  <td>2023-24</td>
                  <td>₹50.00 LPA</td>
                  <td>₹11.80 LPA</td>
                  <td>1080+</td>
                </tr>
                <tr>
                  <td>2022-23</td>
                  <td>₹33.10 LPA</td>
                  <td>₹10.03 LPA</td>
                  <td>952</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Register" && (
        <div style={{ padding: "0 2rem 3rem" }}>
          <div className="two-col">
            <div className="content-block">
              <h3>Student Placement Portal</h3>
              <p>
                Login to the Superset or college portal to upload your verified
                resume and apply for active drives.
              </p>
              <button
                className="apply-btn-main"
                style={{
                  marginTop: "1rem",
                  padding: "0.8rem 2rem",
                  background: "#1565c0",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Access Portal →
              </button>
            </div>
            <div className="content-block">
              <h3>Corporate Relations</h3>
              <p>
                For scheduling recruitment drives or internships, please contact
                our placement officer.
              </p>
              <div className="highlight-strip">📧 placements@bmsce.ac.in</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacementsPage;
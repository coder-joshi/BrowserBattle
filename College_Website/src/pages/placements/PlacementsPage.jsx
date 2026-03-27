import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use hooks
import "../shared.css";

const tabs = ["Overview", "Recruiters", "Statistics", "Register"];

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
          <div className="page-stat"><span className="page-stat-n">₹51.5L</span><span className="page-stat-l">Highest Package</span></div>
          <div className="page-stat"><span className="page-stat-n">₹13L</span><span className="page-stat-l">Avg Package</span></div>
          <div className="page-stat"><span className="page-stat-n">1141+</span><span className="page-stat-l">Offers (2024)</span></div>
          <div className="page-stat"><span className="page-stat-n">90%+</span><span className="page-stat-l">Placed</span></div>
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
                <div className="highlight-strip" style={{ marginTop: "1rem" }}>
                  To register, contact the T&P Cell or visit the Student Portal.
                </div>
              </div>
              <div className="content-block">
                <h3>For Recruiters</h3>
                <p>Companies interested in recruiting BMSCE graduates can reach out to schedule campus placement drives.</p>
                <div className="highlight-strip" style={{ marginTop: "1rem" }}>
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
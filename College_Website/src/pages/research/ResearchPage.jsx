import React from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks
import "../shared.css";

const tabs = ["Overview", "Projects", "Publications", "Labs"];

function ResearchPage() {
  const { section } = useParams(); // Grabs 'projects' from /research/projects
  const navigate = useNavigate();

  // Find active tab based on URL param, default to "Overview"
  const activeTab = tabs.find((t) => t.toLowerCase() === section?.toLowerCase()) || "Overview";

  // Helper to change path when clicking a tab on the page
  const handleTabClick = (t) => {
    navigate(`/research/${t.toLowerCase()}`);
  };

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <div className="page-header-label">Research & Innovation</div>
          <h1 className="page-header-title">Research at BMSCE</h1>
          <p className="page-header-sub">
            Fourteen departments recognised as research centers offering PhD and M.Sc degrees. With 350+ active scholars and 160+ PhDs awarded, BMSCE is one of Karnataka's most prolific research institutions.
          </p>
        </div>
        <div className="page-header-stats">
          <div className="page-stat"><span className="page-stat-n">14</span><span className="page-stat-l">Research Centers</span></div>
          <div className="page-stat"><span className="page-stat-n">350+</span><span className="page-stat-l">PhD Scholars</span></div>
          <div className="page-stat"><span className="page-stat-n">160+</span><span className="page-stat-l">PhDs Awarded</span></div>
          <div className="page-stat"><span className="page-stat-n">GIAN</span><span className="page-stat-l">Beneficiary</span></div>
        </div>
      </div>

      {/* Dynamic Tab Navigation */}
      <div style={{ background: "white", borderBottom: "1px solid #eef1f6", padding: "0 2rem", display: "flex", gap: "0.25rem", overflowX: "auto" }}>
        {tabs.map(t => (
          <button 
            key={t} 
            onClick={() => handleTabClick(t)} 
            style={{
              padding: "0.85rem 1.25rem", border: "none", background: "none", cursor: "pointer",
              fontWeight: 600, fontSize: "0.875rem",
              color: activeTab === t ? "#1565c0" : "#555",
              borderBottom: activeTab === t ? "2.5px solid #1565c0" : "2.5px solid transparent",
              whiteSpace: "nowrap", transition: "color 0.15s",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Overview Content */}
      {activeTab === "Overview" && (
        <>
          <div className="section-title"><span className="section-line"></span>Research Ecosystem<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🔬", title: "14 Recognised Research Centers", desc: "All major engineering departments are VTU-recognised research centers, offering full-time and part-time PhD programs." },
              { icon: "🧑‍🎓", title: "350+ Active PhD Scholars", desc: "A thriving research community of over 350 doctoral scholars pursuing cutting-edge research." },
              { icon: "🏆", title: "160+ PhDs Awarded", desc: "BMSCE has produced over 160 PhD graduates contributing to academia and industry R&D." },
              { icon: "💡", title: "Propel Labs", desc: "State-of-the-art 'Propel Labs' for applied research and advanced computing infrastructure." },
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

      {/* Projects Content */}
      {activeTab === "Projects" && (
        <>
          <div className="section-title"><span className="section-line"></span>Funded Research Projects<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🛸", title: "Aerospace & Defence R&D", desc: "Collaborative projects with ISRO and DRDO in propulsion systems.", tag: "ISRO / DRDO" },
              { icon: "🤖", title: "AI & Machine Learning Research", desc: "DST and AICTE-funded projects on deep learning and autonomous systems.", tag: "DST / AICTE" },
            ].map(c => (
              <div className="info-card" key={c.title}>
                <span className="info-card-icon">{c.icon}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <div className="info-card-title" style={{ margin: 0 }}>{c.title}</div>
                  <span className="badge badge-green">{c.tag}</span>
                </div>
                <p className="info-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Publications Content */}
      {activeTab === "Publications" && (
        <>
          <div className="section-title"><span className="section-line"></span>Research Publications<span className="section-line"></span></div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div className="content-block">
              <h3>Publication Highlights</h3>
              <p>BMSCE faculty and research scholars publish regularly in top-tier peer-reviewed journals including IEEE Transactions, Elsevier, and Springer.</p>
            </div>
          </div>
        </>
      )}

      {/* Labs Content */}
      {activeTab === "Labs" && (
        <>
          <div className="section-title"><span className="section-line"></span>Research Labs & Facilities<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🔧", title: "Propel Labs", desc: "Flagship applied research facility featuring advanced computing and rapid prototyping." },
              { icon: "💾", title: "Centralised Data Center", desc: "Supports big data analytics and AI/ML model training across departments." },
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

export default ResearchPage;
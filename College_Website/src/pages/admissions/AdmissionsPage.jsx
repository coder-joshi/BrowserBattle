import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../shared.css";

const tabs = ["Overview", "UG Admissions", "PG Admissions", "Fee Structure", "Scholarships"];

// Helper function to turn "UG Admissions" into "ug-admissions" for clean URLs
const toSlug = (text) => text.toLowerCase().replace(/\s+/g, '-');

function AdmissionsPage() {
  const { section } = useParams();
  const navigate = useNavigate();

  // Find active tab based on URL param, default to "Overview"
  const activeTab = tabs.find((t) => toSlug(t) === section?.toLowerCase()) || "Overview";

  const handleTabClick = (t) => {
    navigate(`/admissions/${toSlug(t)}`);
  };

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <div className="page-header-label">Admissions 2026–27</div>
          <h1 className="page-header-title">Join BMSCE</h1>
          <p className="page-header-sub">
            Admissions are open for Management Quota seats for B.E. and PG programs (M.Tech, MBA, MCA) for the academic year 2026–27. Entry via KCET, COMEDK UGET, JEE Main, GATE, and other recognised examinations.
          </p>
        </div>
        <div className="page-header-stats">
          <div className="page-stat"><span className="page-stat-n">5000+</span><span className="page-stat-l">Students</span></div>
          <div className="page-stat"><span className="page-stat-n">13</span><span className="page-stat-l">UG Programs</span></div>
          <div className="page-stat"><span className="page-stat-n">16</span><span className="page-stat-l">PG Programs</span></div>
          <div className="page-stat"><span className="page-stat-n">15%</span><span className="page-stat-l">NRI / OCI Quota</span></div>
        </div>
      </div>

      {/* Tabs */}
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
          <div className="section-title"><span className="section-line"></span>Admission Pathways<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "📝", title: "KCET (Government Quota)", desc: "Karnataka CET scores are used for Government/Aided seat allocation through KEA counselling. Karnataka students can access subsidised fees under the aided quota." },
              { icon: "🏫", title: "COMEDK UGET", desc: "COMEDK UGET scores are accepted for admission to B.E. programs. Management and NRI seats are filled through COMEDK counselling rounds." },
              { icon: "📐", title: "JEE Main (All India Quota)", desc: "JEE Main rank holders can apply under the All India Quota. Expected BMSCE cutoff for CSE is in the 4,000–6,000 rank range (~94–97 percentile)." },
              { icon: "🔬", title: "GATE (M.Tech)", desc: "Valid GATE scores or Karnataka PGCET scores are required for M.Tech admissions. Selection is merit-based." },
              { icon: "💼", title: "MBA / MCA Admissions", desc: "Accepted exams: KMAT, CMAT, MAT, Karnataka PGCET. MBA (2-year) and MCA programs are offered through the Department of Management Studies." },
              { icon: "🌍", title: "NRI / OCI / International", desc: "15% supernumerary quota available for foreign nationals, PIOs, OCI card holders, and children of Indian workers in Gulf countries. Scholarships available for UK/US/Australia passport holders." },
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
              <strong>📢 Notice:</strong> Admissions for Management Quota seats are currently open for First Year B.E. and PG (M.Tech, MBA, MCA) courses for 2026–27. Contact the Admissions Office or visit bmsce.ac.in for the application form and deadlines.
            </div>
          </div>
        </>
      )}

      {activeTab === "UG Admissions" && (
        <>
          <div className="section-title"><span className="section-line"></span>B.E. Undergraduate Programs<span className="section-line"></span></div>
          <div style={{ padding: "0 2rem 1rem" }}>
            <div className="content-block">
              <h3>Eligibility</h3>
              <p>Candidates must have passed 10+2 (or equivalent) with Physics, Chemistry, and Mathematics as compulsory subjects, securing a minimum of 45% aggregate (40% for SC/ST candidates from Karnataka).</p>
            </div>
          </div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div className="content-block" style={{ overflowX: "auto" }}>
              <h3>Accepted Entrance Examinations</h3>
              <table className="data-table" style={{ marginTop: "0.75rem" }}>
                <thead>
                  <tr><th>Exam</th><th>Quota</th><th>Seats</th><th>Authority</th></tr>
                </thead>
                <tbody>
                  {[
                    ["KCET", "Government / Aided", "~65% of intake", "KEA Karnataka"],
                    ["COMEDK UGET", "Management / NRI", "~35% of intake", "COMEDK"],
                    ["JEE Main", "All India Quota", "Supernumerary", "NTA / JoSAA"],
                    ["Management Quota", "Direct (College)", "Limited seats", "BMSCE Admissions"],
                  ].map(r => (
                    <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="section-title"><span className="section-line"></span>B.E. Programs Offered<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {["Civil Engineering", "Mechanical Engineering", "Electrical & Electronics", "Electronics & Communication", "Computer Science & Engineering", "Information Science", "Chemical Engineering", "Bio-Technology", "Aerospace Engineering", "Industrial Engineering", "AI & ML", "AI & Data Science", "Medical Electronics", "Electronics & Instrumentation"].map(p => (
              <div className="info-card" key={p} style={{ padding: "1rem 1.25rem" }}>
                <div className="info-card-title" style={{ marginBottom: 0 }}>🎓 {p}</div>
                <p className="info-card-desc" style={{ marginTop: "0.3rem" }}>4-year B.E. Program · VTU Autonomous</p>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "PG Admissions" && (
        <>
          <div className="section-title"><span className="section-line"></span>Postgraduate Programs<span className="section-line"></span></div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div className="content-block" style={{ overflowX: "auto" }}>
              <h3>M.Tech Programs</h3>
              <table className="data-table" style={{ marginTop: "0.75rem" }}>
                <thead>
                  <tr><th>Program</th><th>Duration</th><th>Exam Accepted</th></tr>
                </thead>
                <tbody>
                  {[
                    ["M.Tech – Computer Science & Engineering", "2 Years", "GATE / Karnataka PGCET"],
                    ["M.Tech – VLSI Design & Embedded Systems", "2 Years", "GATE / Karnataka PGCET"],
                    ["M.Tech – Digital Communication", "2 Years", "GATE / Karnataka PGCET"],
                    ["M.Tech – Power Electronics", "2 Years", "GATE / Karnataka PGCET"],
                    ["M.Tech – Machine Design", "2 Years", "GATE / Karnataka PGCET"],
                    ["M.Tech – Structural Engineering", "2 Years", "GATE / Karnataka PGCET"],
                    ["M.Tech – Biotechnology", "2 Years", "GATE / Karnataka PGCET"],
                  ].map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div className="content-block" style={{ marginTop: "1.5rem", overflowX: "auto" }}>
              <h3>MBA & MCA</h3>
              <table className="data-table" style={{ marginTop: "0.75rem" }}>
                <thead>
                  <tr><th>Program</th><th>Duration</th><th>Exam Accepted</th><th>Fee (Total)</th></tr>
                </thead>
                <tbody>
                  {[
                    ["MBA", "2 Years (4 Semesters)", "KMAT / CMAT / MAT / PGCET", "₹9,00,000"],
                    ["MCA", "2 Years", "KMAT / PGCET", "As per VTU norms"],
                  ].map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === "Fee Structure" && (
        <>
          <div className="section-title"><span className="section-line"></span>Fee Structure 2026–27<span className="section-line"></span></div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div className="content-block" style={{ overflowX: "auto" }}>
              <h3>B.E. Annual Fee</h3>
              <table className="data-table" style={{ marginTop: "0.75rem" }}>
                <thead>
                  <tr><th>Category</th><th>Annual Fee</th><th>Total (4 Years)</th></tr>
                </thead>
                <tbody>
                  {[
                    ["KCET Aided Quota", "~₹50,000", "~₹2,00,000"],
                    ["KCET Unaided Quota", "~₹1,12,500", "~₹4,50,000"],
                    ["COMEDK / Management Quota", "~₹2,87,500", "~₹11,50,000"],
                    ["NRI / OCI Quota", "USD-based", "Contact Admissions"],
                  ].map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}
                </tbody>
              </table>
              <p style={{ fontSize: "0.78rem", color: "#888", marginTop: "0.75rem" }}>* Fees are indicative. Verify exact figures from bmsce.ac.in or the Admissions Office before applying.</p>
            </div>
            <div className="content-block" style={{ marginTop: "1.5rem" }}>
              <h3>PG Program Fees</h3>
              <table className="data-table" style={{ marginTop: "0.75rem" }}>
                <thead><tr><th>Program</th><th>Total Fee</th></tr></thead>
                <tbody>
                  {[["M.Tech (2 Years)", "As per VTU / AICTE norms"], ["MBA (2 Years)", "₹9,00,000"], ["MCA (2 Years)", "As per VTU norms"]].map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === "Scholarships" && (
        <>
          <div className="section-title"><span className="section-line"></span>Scholarships & Financial Aid<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🏛️", title: "SC/ST Government Scholarship", desc: "Full tuition fee waiver and stipend for students from Scheduled Castes/Tribes through the Karnataka Social Welfare Department." },
              { icon: "💡", title: "Merit Scholarship (BMSCE)", desc: "Awarded to the top 10 meritorious students from 2nd, 3rd, and 4th year who demonstrate both academic excellence and financial need." },
              { icon: "📊", title: "OBC/EWS Scholarships", desc: "Government scholarships available to Other Backward Class and Economically Weaker Section students based on annual family income criteria." },
              { icon: "🌍", title: "NRI / Foreign Passport Scholarship", desc: "Special scholarships for students holding foreign passports from UK, USA, or Australia, including OCI card holders admitted through the International Division." },
              { icon: "🎖️", title: "State & Central Post-Matric Scholarships", desc: "Multiple state and central government post-matric scholarship schemes are available based on caste category and family income, disbursed via the DBT portal." },
              { icon: "🤝", title: "Industry-Sponsored Scholarships", desc: "Several companies recruiting at BMSCE offer sponsored scholarships to high-performing students in their respective departments." },
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

export default AdmissionsPage;
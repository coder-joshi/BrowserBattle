import React, { useState } from "react";
import "../shared.css";

const tabs = ["Overview", "Student Portal", "Results", "Grievance"];

function StudentsPage() {
  const [tab, setTab] = useState("Overview");

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <div className="page-header-label">Student Services</div>
          <h1 className="page-header-title">Student Corner</h1>
          <p className="page-header-sub">
            Your one-stop destination for academic resources, results, exam schedules, grievance redressal, and student welfare services at BMSCE.
          </p>
        </div>
        <div className="page-header-stats">
          <div className="page-stat"><span className="page-stat-n">5000+</span><span className="page-stat-l">Students</span></div>
          <div className="page-stat"><span className="page-stat-n">13</span><span className="page-stat-l">UG Programs</span></div>
          <div className="page-stat"><span className="page-stat-n">16</span><span className="page-stat-l">PG Programs</span></div>
          <div className="page-stat"><span className="page-stat-n">24/7</span><span className="page-stat-l">Portal Access</span></div>
        </div>
      </div>

      <div style={{ background: "white", borderBottom: "1px solid #eef1f6", padding: "0 2rem", display: "flex", gap: "0.25rem", overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "0.85rem 1.25rem", border: "none", background: "none", cursor: "pointer",
            fontWeight: 600, fontSize: "0.875rem",
            color: tab === t ? "#1565c0" : "#555",
            borderBottom: tab === t ? "2.5px solid #1565c0" : "2.5px solid transparent",
            whiteSpace: "nowrap", transition: "color 0.15s",
          }}>{t}</button>
        ))}
      </div>

      {tab === "Overview" && (
        <>
          <div className="section-title"><span className="section-line"></span>Quick Links<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🖥️", title: "Student Portal", desc: "Access your academic profile, attendance records, timetable, fee receipts, and course materials via the BMSCE Student Portal (college email required)." },
              { icon: "📊", title: "Results", desc: "Semester exam results, internal assessment marks, and academic transcripts are published through the VTU portal and the BMSCE internal portal." },
              { icon: "📅", title: "Academic Calendar", desc: "Download the semester academic calendar including important dates for exams, internals, project submissions, and holidays." },
              { icon: "🙋", title: "Grievance Cell", desc: "The Student Grievance Redressal Cell ensures a fair and transparent mechanism for addressing academic and non-academic concerns." },
              { icon: "📖", title: "Library Resources", desc: "Access the central library's digital resources, e-journals, NPTEL content, and research databases remotely via your student credentials." },
              { icon: "🏥", title: "Health & Counselling", desc: "On-campus health center and student counselling services are available for physical and mental wellness support throughout the academic year." },
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

      {tab === "Student Portal" && (
        <>
          <div className="section-title"><span className="section-line"></span>Student Portal Services<span className="section-line"></span></div>
          <div className="two-col" style={{ padding: "0 2rem 2rem" }}>
            <div className="content-block">
              <h3>Academic Services</h3>
              <ul style={{ paddingLeft: "1.25rem", fontSize: "0.875rem", color: "#444", lineHeight: 2 }}>
                <li>View and download timetable</li>
                <li>Track attendance (subject-wise)</li>
                <li>Access course materials & notes</li>
                <li>View internal assessment marks</li>
                <li>Download admit card for exams</li>
                <li>Semester registration</li>
                <li>View CGPA and transcript</li>
              </ul>
            </div>
            <div className="content-block">
              <h3>Administrative Services</h3>
              <ul style={{ paddingLeft: "1.25rem", fontSize: "0.875rem", color: "#444", lineHeight: 2 }}>
                <li>Fee payment and receipts</li>
                <li>Bonafide certificate request</li>
                <li>No Objection Certificate (NOC)</li>
                <li>Leave application</li>
                <li>Hostel room allotment</li>
                <li>Scholarship status tracking</li>
                <li>Library book issue/return</li>
              </ul>
            </div>
          </div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div className="highlight-strip">
              <strong>🔐 Login:</strong> Use your BMSCE-issued college email ID and password to access the Student Portal. For access issues, contact the IT Helpdesk or your Department Office.
            </div>
          </div>
        </>
      )}

      {tab === "Results" && (
        <>
          <div className="section-title"><span className="section-line"></span>Exam Results & Transcripts<span className="section-line"></span></div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div className="two-col">
              <div className="content-block">
                <h3>VTU Semester Results</h3>
                <p>End-semester exam results for autonomous programs are published through VTU's official portal (vtu.ac.in) and the BMSCE portal simultaneously.</p>
                <p>BMSCE's autonomous examination results are released within 45 days of the exam conclusion, as per VTU norms.</p>
                <div className="highlight-strip">
                  Visit <strong>vtu.ac.in</strong> or the BMSCE student portal to check your semester results using your USN (University Seat Number).
                </div>
              </div>
              <div className="content-block">
                <h3>Internal Assessment</h3>
                <p>Internal Assessment (IA) marks are published on the student portal after each assessment cycle. Students may view marks per subject, per semester.</p>
                <p>For IA mark discrepancies, students should contact the concerned faculty within 5 working days of publication. A formal review process is available.</p>
              </div>
            </div>
            <div className="content-block" style={{ marginTop: "1.5rem" }}>
              <h3>Important Exam Dates (Typical Academic Year)</h3>
              <table className="data-table" style={{ marginTop: "0.75rem" }}>
                <thead><tr><th>Event</th><th>Semester</th><th>Approximate Period</th></tr></thead>
                <tbody>
                  {[
                    ["Internal Assessment 1", "Odd & Even", "4–5 weeks after semester start"],
                    ["Internal Assessment 2", "Odd & Even", "8–9 weeks after semester start"],
                    ["End-Semester Exams", "Odd", "November – December"],
                    ["End-Semester Exams", "Even", "May – June"],
                    ["Supplementary Exams", "Both", "August – September"],
                  ].map(r => <tr key={r[0]+r[2]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {tab === "Grievance" && (
        <>
          <div className="section-title"><span className="section-line"></span>Grievance Redressal<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🏫", title: "Academic Grievances", desc: "For issues related to exam results, attendance, marks moderation, or course evaluation — contact your Department's Academic Coordinator or file through the Student Portal." },
              { icon: "⚖️", title: "Disciplinary Matters", desc: "BMSCE follows a transparent disciplinary process. Students facing disciplinary action have the right to be heard before the Student Welfare Committee." },
              { icon: "♀️", title: "Internal Complaints Committee (ICC)", desc: "The ICC handles complaints related to sexual harassment. The committee is constituted per UGC and POSH Act guidelines with external members." },
              { icon: "📋", title: "Anti-Ragging Cell", desc: "BMSCE maintains a zero-tolerance policy on ragging. An Anti-Ragging Committee and helpline are active year-round. UGC anti-ragging norms are strictly enforced." },
              { icon: "💬", title: "Student Counselling", desc: "Professional counsellors are available on campus for academic stress, personal challenges, and career guidance. Sessions are confidential." },
              { icon: "📬", title: "Online Grievance Portal", desc: "Students can submit grievances online through the BMSCE Student Portal or directly by email to the Student Welfare Officer. A response is assured within 7 working days." },
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
              📞 <strong>Anti-Ragging Helpline:</strong> 1800-180-5522 (UGC Toll-Free) &nbsp;|&nbsp; 📧 <strong>Student Welfare:</strong> studentwelfare@bmsce.ac.in
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StudentsPage;

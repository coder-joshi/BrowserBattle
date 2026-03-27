import React, { useState } from "react";

// Department sub-section content components

function AboutSection({ dept }) {
  return (
    <div className="dept-content-section">
      {/* Hero Banner */}
      <div className="dept-hero" style={{ background: `linear-gradient(135deg, ${dept.color} 0%, ${dept.color}cc 60%, #1565c0 100%)` }}>
        <div className="dept-hero-content">
          <div className="dept-hero-badge">{dept.shortName}</div>
          <h1 className="dept-hero-title">{dept.name}</h1>
          <p className="dept-hero-subtitle">Department of {dept.name} · Est. {dept.established}</p>
        </div>
        <div className="dept-hero-stats">
          <div className="stat-card">
            <span className="stat-num">{dept.intake.ug}</span>
            <span className="stat-lbl">UG Intake</span>
          </div>
          {dept.intake.pg > 0 && (
            <div className="stat-card">
              <span className="stat-num">{dept.intake.pg}</span>
              <span className="stat-lbl">PG per Stream</span>
            </div>
          )}
          <div className="stat-card">
            <span className="stat-num">{dept.faculty.length}+</span>
            <span className="stat-lbl">Faculty</span>
          </div>
          <div className="stat-card">
            <span className="stat-num">{new Date().getFullYear() - dept.established}+</span>
            <span className="stat-lbl">Years</span>
          </div>
        </div>
      </div>

      {/* HOD Message */}
      <div className="about-grid">
        <div className="hod-card">
          <div className="hod-photo-wrapper">
            <div className="hod-photo-placeholder" style={{ background: `${dept.color}22`, borderColor: dept.color }}>
              <div className="hod-initials" style={{ color: dept.color }}>
                {dept.hod.name.split(" ").slice(0, 2).map(n => n[0]).join("")}
              </div>
            </div>
          </div>
          <div className="hod-info">
            <div className="hod-tag" style={{ background: dept.color }}>Head of Department</div>
            <h3 className="hod-name">{dept.hod.name}</h3>
            <p className="hod-desig">{dept.hod.designation}</p>
            <p className="hod-qual">{dept.hod.qualification}</p>
            <div className="hod-spec">
              <span className="spec-label">Research:</span> {dept.hod.specialization}
            </div>
            <a href={`mailto:${dept.hod.email}`} className="hod-email" style={{ color: dept.color }}>
              ✉ {dept.hod.email}
            </a>
          </div>
        </div>

        <div className="about-text-block">
          <h2 className="section-heading" style={{ color: dept.color }}>About the Department</h2>
          {dept.about.split("\n\n").map((para, i) => (
            <p key={i} className="about-para">{para}</p>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="highlights-section">
        <h2 className="section-heading" style={{ color: dept.color }}>Department Highlights</h2>
        <div className="highlights-grid">
          {dept.highlights.map((h, i) => (
            <div key={i} className="highlight-item">
              <span className="highlight-icon" style={{ color: dept.color }}>◈</span>
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="vm-grid">
        <div className="vision-card" style={{ borderColor: dept.color }}>
          <div className="vm-icon" style={{ background: dept.color }}>👁</div>
          <h3 style={{ color: dept.color }}>Vision</h3>
          <p>{dept.vision}</p>
        </div>
        <div className="mission-card" style={{ borderColor: dept.color }}>
          <div className="vm-icon" style={{ background: dept.color }}>🎯</div>
          <h3 style={{ color: dept.color }}>Mission</h3>
          <ul>
            {dept.mission.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ProgrammesSection({ dept }) {
  return (
    <div className="dept-content-section">
      <h2 className="section-heading" style={{ color: dept.color }}>Academic Programmes</h2>
      <p className="section-sub">Department of {dept.name} offers the following programmes:</p>
      <div className="programmes-list">
        {dept.programmes.map((prog, i) => (
          <div key={i} className="programme-card">
            <div className="prog-type-badge" style={{ background: prog.type === "UG" ? "#1565c0" : prog.type === "PG" ? dept.color : "#4a4a4a" }}>
              {prog.type}
            </div>
            <div className="prog-details">
              <h3 className="prog-name">{prog.name}</h3>
              <div className="prog-meta">
                <span>⏱ Duration: {prog.duration}</span>
                <span>👥 Intake: {prog.intake}</span>
                {prog.type === "UG" && <span>📋 Affiliation: VTU (Autonomous)</span>}
              </div>
              {prog.type === "UG" && (
                <p className="prog-desc">The undergraduate program is NBA accredited and provides comprehensive training in {dept.name.toLowerCase()} fundamentals, design, and applications.</p>
              )}
              {prog.type === "PG" && (
                <p className="prog-desc">The postgraduate program is NBA accredited and focuses on advanced topics and research in specialized areas of {dept.name.toLowerCase()}.</p>
              )}
              {prog.type === "Research" && (
                <p className="prog-desc">The Ph.D. program at BMSCE's VTU recognized Research Centre supports cutting-edge research in various domains of {dept.name.toLowerCase()}.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="eligibility-block" style={{ borderColor: dept.color }}>
        <h3 style={{ color: dept.color }}>Eligibility & Admission</h3>
        <div className="elig-grid">
          <div>
            <strong>UG (B.E.)</strong>
            <p>10+2 / PUC with Physics, Chemistry & Mathematics. Admission through KCET, COMEDK or JEE Main.</p>
          </div>
          <div>
            <strong>PG (M.Tech)</strong>
            <p>B.E. / B.Tech in relevant engineering branch. Admission through GATE or Karnataka PGCET.</p>
          </div>
          <div>
            <strong>Ph.D.</strong>
            <p>M.E. / M.Tech in relevant field. Admission through VTU Ph.D. entrance test and interview.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FacultySection({ dept }) {
  return (
    <div className="dept-content-section">
      <h2 className="section-heading" style={{ color: dept.color }}>Faculty Members</h2>
      <p className="section-sub">Meet our experienced and dedicated faculty team</p>
      <div className="faculty-grid">
        {dept.faculty.map((f, i) => (
          <div key={i} className="faculty-card">
            <div className="faculty-avatar" style={{ background: `${dept.color}20`, borderColor: dept.color }}>
              <span style={{ color: dept.color, fontWeight: 700, fontSize: "1.3rem" }}>
                {f.name.split(" ").slice(-2).map(n => n[0]).join("")}
              </span>
            </div>
            <div className="faculty-info">
              <h4 className="faculty-name">{f.name}</h4>
              <p className="faculty-desig" style={{ color: dept.color }}>{f.designation}</p>
              <p className="faculty-qual">Qualification: {f.qualification}</p>
              <p className="faculty-spec">Specialization: {f.specialization}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResearchSection({ dept }) {
  return (
    <div className="dept-content-section">
      <h2 className="section-heading" style={{ color: dept.color }}>Research</h2>
      <p className="section-sub">Active research areas and ongoing projects in the department</p>

      <div className="research-areas-grid">
        {dept.researchAreas.map((area, i) => (
          <div key={i} className="research-area-card" style={{ borderLeft: `4px solid ${dept.color}` }}>
            <span className="research-num" style={{ color: dept.color }}>{String(i + 1).padStart(2, "0")}</span>
            <span className="research-title">{area}</span>
          </div>
        ))}
      </div>

      <div className="research-infra">
        <h3 style={{ color: dept.color }}>Research Infrastructure</h3>
        <div className="labs-grid">
          {dept.labs.map((lab, i) => (
            <div key={i} className="lab-card">
              <span className="lab-icon">🔬</span>
              <span>{lab}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="research-collab" style={{ borderColor: dept.color }}>
        <h3 style={{ color: dept.color }}>Research Collaboration</h3>
        <p>The department actively collaborates with industry, government organizations, and international universities for sponsored research projects, consultancy, and knowledge exchange programs. Research scholars are encouraged to publish in reputed national and international journals and present at conferences.</p>
      </div>
    </div>
  );
}

function OrgStructureSection({ dept }) {
  return (
    <div className="dept-content-section">
      <h2 className="section-heading" style={{ color: dept.color }}>Organizational Structure</h2>
      <p className="section-sub">Departmental hierarchy and administrative structure</p>

      <div className="org-tree">
        <div className="org-node principal">
          <div className="org-box" style={{ background: "#1565c0", color: "white" }}>Principal, BMSCE</div>
        </div>
        <div className="org-connector"></div>
        <div className="org-node hod">
          <div className="org-box" style={{ background: dept.color, color: "white" }}>Professor & HOD<br/><small>{dept.hod.name}</small></div>
        </div>
        <div className="org-connector"></div>
        <div className="org-row">
          {["Professor", "Associate Professor", "Assistant Professor"].map((role, i) => (
            <div key={i} className="org-node">
              <div className="org-box" style={{ borderColor: dept.color }}>{role}s</div>
            </div>
          ))}
        </div>
        <div className="org-connector"></div>
        <div className="org-row">
          {["Technical Staff", "Administrative Staff", "Supporting Staff"].map((role, i) => (
            <div key={i} className="org-node">
              <div className="org-box staff">{role}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="committees-block">
        <h3 style={{ color: dept.color }}>Departmental Committees</h3>
        <div className="committees-grid">
          {["Academic Committee", "Research Committee", "Industry Interaction Cell", "Student Welfare Committee", "NBA/Accreditation Committee", "Time Table Committee", "Library Committee", "Anti-Ragging Committee"].map((com, i) => (
            <div key={i} className="committee-item">
              <span className="com-dot" style={{ background: dept.color }}></span>
              {com}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SyllabusSection({ dept }) {
  const subjects = {
    UG: [
      { sem: "1-2", name: "Foundation Courses (Mathematics, Physics, Chemistry, Programming)" },
      { sem: "3-4", name: `Core ${dept.shortName} Engineering Fundamentals` },
      { sem: "5-6", name: "Specialization and Design Courses" },
      { sem: "7-8", name: "Advanced Topics, Electives & Project Work" },
    ],
    PG: [
      { sem: "1", name: "Advanced Core Subjects" },
      { sem: "2", name: "Specialization Courses" },
      { sem: "3-4", name: "Research Dissertation" },
    ],
  };

  return (
    <div className="dept-content-section">
      <h2 className="section-heading" style={{ color: dept.color }}>Syllabus</h2>
      <p className="section-sub">Curriculum structure for all programs offered by the department</p>

      <div className="syllabus-tabs">
        <div className="syllabus-prog">
          <h3 style={{ color: dept.color }}>B.E. – Undergraduate Program</h3>
          <p className="ug-note">The UG curriculum is designed as per VTU autonomous scheme with emphasis on theory, practicals, and projects. Updated every 4 years to align with industry needs.</p>
          <div className="sem-grid">
            {subjects.UG.map((s, i) => (
              <div key={i} className="sem-card" style={{ borderColor: dept.color }}>
                <div className="sem-badge" style={{ background: dept.color }}>Sem {s.sem}</div>
                <p>{s.name}</p>
              </div>
            ))}
          </div>
          <div className="syllabus-dl">
            <a href="https://bmsce.ac.in/" className="btn-dl" style={{ background: dept.color }} target="_blank" rel="noreferrer">
              📥 Download UG Syllabus
            </a>
          </div>
        </div>

        {dept.intake.pg > 0 && (
          <div className="syllabus-prog">
            <h3 style={{ color: dept.color }}>M.Tech – Postgraduate Program</h3>
            <div className="sem-grid">
              {subjects.PG.map((s, i) => (
                <div key={i} className="sem-card" style={{ borderColor: dept.color }}>
                  <div className="sem-badge" style={{ background: dept.color }}>Sem {s.sem}</div>
                  <p>{s.name}</p>
                </div>
              ))}
            </div>
            <div className="syllabus-dl">
              <a href="https://bmsce.ac.in/" className="btn-dl" style={{ background: dept.color }} target="_blank" rel="noreferrer">
                📥 Download PG Syllabus
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StaffSection({ dept }) {
  const staff = [
    { name: "Technical Staff 1", role: "Senior Technical Assistant", lab: dept.labs[0] || "Main Lab" },
    { name: "Technical Staff 2", role: "Technical Assistant", lab: dept.labs[1] || "Research Lab" },
    { name: "Administrative Staff", role: "Department Assistant", lab: "Department Office" },
  ];

  return (
    <div className="dept-content-section">
      <h2 className="section-heading" style={{ color: dept.color }}>Staff</h2>
      <p className="section-sub">Non-teaching staff supporting department operations</p>
      <div className="staff-table-wrapper">
        <table className="staff-table">
          <thead style={{ background: dept.color, color: "white" }}>
            <tr>
              <th>Sl. No.</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Laboratory / Area</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s, i) => (
              <tr key={i} className={i % 2 === 0 ? "row-even" : "row-odd"}>
                <td>{i + 1}</td>
                <td>{s.name}</td>
                <td>{s.role}</td>
                <td>{s.lab}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AlumniSection({ dept }) {
  return (
    <div className="dept-content-section">
      <h2 className="section-heading" style={{ color: dept.color }}>Alumni</h2>
      <p className="section-sub">Our alumni are making an impact across the globe</p>

      <div className="alumni-stats">
        <div className="alumni-stat-card" style={{ borderColor: dept.color }}>
          <span className="alumni-stat-num" style={{ color: dept.color }}>24,000+</span>
          <span className="alumni-stat-lbl">Total BMSCE Alumni</span>
        </div>
        <div className="alumni-stat-card" style={{ borderColor: dept.color }}>
          <span className="alumni-stat-num" style={{ color: dept.color }}>50+</span>
          <span className="alumni-stat-lbl">Countries Represented</span>
        </div>
        <div className="alumni-stat-card" style={{ borderColor: dept.color }}>
          <span className="alumni-stat-num" style={{ color: dept.color }}>1946</span>
          <span className="alumni-stat-lbl">Alumni Since</span>
        </div>
      </div>

      <div className="alumni-connect" style={{ borderColor: dept.color }}>
        <h3 style={{ color: dept.color }}>Stay Connected</h3>
        <p>BMSCE has a robust alumni network. Graduates from the {dept.name} department are employed in leading organizations in India and abroad. They serve as brand ambassadors of the college and contribute to academic activities, placements, and mentoring.</p>
        <div className="alumni-actions">
          <a href="https://bmsce.ac.in/" className="btn-primary" style={{ background: dept.color }} target="_blank" rel="noreferrer">Register as Alumni</a>
          <a href="https://bmsce.ac.in/" className="btn-outline" style={{ borderColor: dept.color, color: dept.color }} target="_blank" rel="noreferrer">Alumni Portal</a>
        </div>
      </div>

      <div className="notable-alumni">
        <h3 style={{ color: dept.color }}>Notable Alumni</h3>
        <p className="alumni-placeholder">The {dept.name} department has produced several distinguished alumni who have risen to prominent positions in industry, academia, and government sectors. Their achievements stand as a testament to the quality of education at BMSCE.</p>
      </div>
    </div>
  );
}

function PublicationsSection({ dept }) {
  const publications = [
    { title: `Advanced Research in ${dept.researchAreas[0]}`, authors: `${dept.hod.name} et al.`, journal: "International Journal of Engineering", year: 2024, type: "Journal" },
    { title: `Novel Approaches in ${dept.researchAreas[1] || dept.researchAreas[0]}`, authors: "Faculty Team, BMSCE", journal: "National Conference on Engineering", year: 2023, type: "Conference" },
    { title: `Applications of ${dept.researchAreas[2] || dept.researchAreas[0]}`, authors: `Research Group, ${dept.shortName}`, journal: "IEEE Transactions", year: 2023, type: "Journal" },
    { title: `Emerging Trends in ${dept.name}`, authors: "Department Faculty", journal: "Springer International", year: 2022, type: "Book Chapter" },
  ];

  return (
    <div className="dept-content-section">
      <h2 className="section-heading" style={{ color: dept.color }}>Publications</h2>
      <p className="section-sub">Research publications by department faculty and students</p>
      <div className="publications-list">
        {publications.map((pub, i) => (
          <div key={i} className="pub-card">
            <div className="pub-type-badge" style={{ background: pub.type === "Journal" ? dept.color : pub.type === "Conference" ? "#1565c0" : "#4a4a4a" }}>
              {pub.type}
            </div>
            <div className="pub-content">
              <h4 className="pub-title">{pub.title}</h4>
              <p className="pub-authors">👤 {pub.authors}</p>
              <p className="pub-journal">📚 {pub.journal}</p>
              <p className="pub-year">📅 {pub.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsSection({ dept, type }) {
  const facultyAchievements = [
    `Dr. ${dept.hod.name.split(" ").slice(-1)} received Best Researcher Award at National Conference 2024`,
    `Faculty members published ${dept.faculty.length * 3}+ papers in SCI/Scopus indexed journals in 2023-24`,
    `Department received research grants from VTU and VGST for ongoing projects`,
    `Faculty members served as resource persons at national and international conferences`,
    `Several faculty members recognized as VTU approved research supervisors`,
  ];

  const studentAchievements = [
    `Students won prizes at inter-college technical fest 'Technozion 2024'`,
    `Final year project team received best project award at national level competition`,
    `Students cleared GATE 2024 with excellent scores, securing admissions to IITs and NITs`,
    `Student team represented BMSCE at Smart India Hackathon 2023`,
    `Department students won first place at Karnataka state level technical competition`,
  ];

  const achievements = type === "Faculty Achievements" ? facultyAchievements : studentAchievements;

  return (
    <div className="dept-content-section">
      <h2 className="section-heading" style={{ color: dept.color }}>{type}</h2>
      <p className="section-sub">Recognitions and milestones by our {type === "Faculty Achievements" ? "faculty" : "students"}</p>
      <div className="achievements-list">
        {achievements.map((ach, i) => (
          <div key={i} className="achievement-card">
            <div className="ach-medal" style={{ background: `${dept.color}22`, color: dept.color }}>🏆</div>
            <p>{ach}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function IPRAchievementsSection({ dept }) {
  const patents = [
    { title: `Novel Method for ${dept.researchAreas[0]}`, inventors: dept.hod.name, year: 2023, status: "Granted", type: "Patent" },
    { title: `System and Device for ${dept.researchAreas[1] || dept.researchAreas[0]} Applications`, inventors: "Faculty Team", year: 2022, status: "Published", type: "Patent" },
    { title: `Innovative Process in ${dept.shortName} Engineering`, inventors: "Research Group", year: 2024, status: "Filed", type: "Patent" },
  ];

  return (
    <div className="dept-content-section">
      <h2 className="section-heading" style={{ color: dept.color }}>IPR Achievements</h2>
      <p className="section-sub">Patents and intellectual property contributions</p>
      <div className="ipr-list">
        {patents.map((pat, i) => (
          <div key={i} className="ipr-card">
            <div className="ipr-icon">💡</div>
            <div className="ipr-details">
              <h4 className="ipr-title">{pat.title}</h4>
              <div className="ipr-meta">
                <span>👤 {pat.inventors}</span>
                <span>📅 {pat.year}</span>
                <span className="ipr-status" style={{ background: pat.status === "Granted" ? "#1a6b3a" : pat.status === "Published" ? dept.color : "#888", color: "white" }}>
                  {pat.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="ipr-note" style={{ borderColor: dept.color }}>
        <p>The department actively encourages faculty and students to file patents for their innovative research outputs. BMSCE's dedicated R&D Centre assists in patent filing and IPR management.</p>
      </div>
    </div>
  );
}

function IndustryVisitsSection({ dept }) {
  const visits = [
    { company: "Leading Industry Partner 1", location: "Bengaluru, Karnataka", date: "January 2024", students: 45, highlight: `Students visited the ${dept.researchAreas[0].toLowerCase()} facility and interacted with engineers.` },
    { company: "Industry Partner 2", location: "Hosur, Tamil Nadu", date: "October 2023", students: 40, highlight: "Students observed manufacturing processes and quality control procedures." },
    { company: "Research Organization", location: "Bengaluru", date: "August 2023", students: 30, highlight: "Students interacted with researchers working on advanced projects." },
  ];

  return (
    <div className="dept-content-section">
      <h2 className="section-heading" style={{ color: dept.color }}>Industry Visits</h2>
      <p className="section-sub">Bridging academia and industry through experiential learning</p>
      <div className="visits-list">
        {visits.map((v, i) => (
          <div key={i} className="visit-card" style={{ borderLeft: `4px solid ${dept.color}` }}>
            <div className="visit-header">
              <h4 className="visit-company">{v.company}</h4>
              <span className="visit-date" style={{ color: dept.color }}>{v.date}</span>
            </div>
            <div className="visit-meta">
              <span>📍 {v.location}</span>
              <span>👥 {v.students} Students</span>
            </div>
            <p className="visit-highlight">{v.highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Department Page Component
function DepartmentPage({ dept, onBack }) {
  const [activeSection, setActiveSection] = useState("About");

  const renderSection = () => {
    switch (activeSection) {
      case "About": return <AboutSection dept={dept} />;
      case "Organizational Structure": return <OrgStructureSection dept={dept} />;
      case "Programmes": return <ProgrammesSection dept={dept} />;
      case "Syllabus": return <SyllabusSection dept={dept} />;
      case "Faculty": return <FacultySection dept={dept} />;
      case "Staff": return <StaffSection dept={dept} />;
      case "Alumni": return <AlumniSection dept={dept} />;
      case "Publications": return <PublicationsSection dept={dept} />;
      case "Research": return <ResearchSection dept={dept} />;
      case "Faculty Achievements": return <AchievementsSection dept={dept} type="Faculty Achievements" />;
      case "Student Achievements": return <AchievementsSection dept={dept} type="Student Achievements" />;
      case "IPR Achievements": return <IPRAchievementsSection dept={dept} />;
      case "Industry Visits": return <IndustryVisitsSection dept={dept} />;
      default: return <AboutSection dept={dept} />;
    }
  };

  return (
    <div className="dept-page">
      {/* Breadcrumb */}
      <div className="breadcrumb-bar" style={{ borderBottom: `3px solid ${dept.color}` }}>
        <div className="breadcrumb-inner">
          <button className="breadcrumb-back" onClick={onBack}>
            ← Academics
          </button>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current" style={{ color: dept.color }}>{dept.name}</span>
          <span className="breadcrumb-sep">›</span>
          <span>{activeSection}</span>
        </div>
      </div>

      <div className="dept-layout">
        {/* Sidebar */}
        <aside className="dept-sidebar">
          <div className="sidebar-header" style={{ background: dept.color }}>
            <span className="sidebar-dept-code">{dept.shortName}</span>
            <span className="sidebar-dept-name">{dept.name.toUpperCase()}</span>
          </div>
          <nav className="sidebar-nav">
            {dept.subsections.map((sec) => (
              <button
                key={sec}
                className={`sidebar-nav-item ${activeSection === sec ? "active" : ""}`}
                style={activeSection === sec ? { background: `${dept.color}15`, borderLeft: `4px solid ${dept.color}`, color: dept.color } : {}}
                onClick={() => setActiveSection(sec)}
              >
                <span className="nav-arrow">›</span>
                {sec}
              </button>
            ))}
          </nav>

          <div className="dept-quick-links" style={{ borderColor: dept.color }}>
            <p className="quick-links-title" style={{ color: dept.color }}>Quick Links</p>
            <a href="https://bmsce.ac.in/" target="_blank" rel="noreferrer">Official BMSCE Website ↗</a>
            <a href={`mailto:${dept.email}`}>Email Department</a>
            <a href="https://bmsce.ac.in/" target="_blank" rel="noreferrer">VTU Results</a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="dept-main-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default DepartmentPage;

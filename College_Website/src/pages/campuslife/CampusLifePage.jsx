import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../shared.css";

const tabs = ["Overview", "Clubs & Societies", "Events", "Hostel & Facilities"];

// Upgraded helper function to remove special characters (like '&') for cleaner URLs
const toSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function CampusLifePage() {
  const { section } = useParams();
  const navigate = useNavigate();

  // Find active tab based on URL param, default to "Overview"
  const activeTab = tabs.find((t) => toSlug(t) === section?.toLowerCase()) || "Overview";

  const handleTabClick = (t) => {
    navigate(`/campuslife/${toSlug(t)}`);
  };

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <div className="page-header-label">Campus Life</div>
          <h1 className="page-header-title">Life at BMSCE</h1>
          <p className="page-header-sub">
            A unique blend of tradition and modernity. The BMSCE campus in Basavanagudi is always alive with student initiatives — from technical hackathons and cultural festivals to sports meets and community service.
          </p>
        </div>
        <div className="page-header-stats">
          <div className="page-stat"><span className="page-stat-n">11</span><span className="page-stat-l">Acre Campus</span></div>
          <div className="page-stat"><span className="page-stat-n">50+</span><span className="page-stat-l">Student Clubs</span></div>
          <div className="page-stat"><span className="page-stat-n">1973</span><span className="page-stat-l">Utsav Since</span></div>
          <div className="page-stat"><span className="page-stat-n">2</span><span className="page-stat-l">Hostel Units</span></div>
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
          <div className="section-title"><span className="section-line"></span>Campus Highlights<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🏛️", title: "Urban Tech Campus", desc: "A 15-acre compact urban campus in the heart of Basavanagudi, optimised with high-density academic blocks, labs, and modern amenities — diagonally opposite the famous Bull Temple." },
              { icon: "📚", title: "Central Library", desc: "A vast library with digital access to thousands of journals, e-books, and research databases including IEEE Xplore, ScienceDirect, and NPTEL." },
              { icon: "⚽", title: "Sports Facilities", desc: "Indoor and outdoor sports facilities for cricket, football, basketball, badminton, table tennis, chess, and more. Students actively participate in inter-college tournaments." },
              { icon: "🎉", title: "Utsav — Cultural Festival", desc: "The annual cultural flagship, Utsav (started 1973), attracts participants from IIT Madras, IIT Bombay, and colleges across India. Features rock concerts, dance, theatre, quizzes, and more." },
              { icon: "💡", title: "Technical Societies", desc: "Chapters of IEEE, ISTE, ACM, SAE, and other professional bodies run actively at BMSCE, organising workshops, seminars, and national competitions." },
              { icon: "🤝", title: "Community Service", desc: "Student clubs donate proceeds from events to NGOs like Navachetana Trust. BMSCE promotes social responsibility as part of holistic development." },
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

      {activeTab === "Clubs & Societies" && (
        <>
          <div className="section-title"><span className="section-line"></span>Student Clubs & Technical Bodies<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "⚡", title: "IEEE Student Branch", desc: "Active IEEE branch with sections in CS, EE, and Communication. Organises hackathons, paper presentations, and national-level technical events." },
              { icon: "💻", title: "ACM Student Chapter", desc: "The ACM chapter focuses on competitive programming, algorithmic problem-solving, and software development workshops." },
              { icon: "🚗", title: "SAE Collegiate Club", desc: "Society of Automotive Engineers chapter drives projects in electric vehicles, off-road buggy design, and automotive innovation." },
              { icon: "🎭", title: "Dramatics Club", desc: "BMSCE's theatre group performs original and adapted plays at Utsav and inter-collegiate events, celebrating the performing arts." },
              { icon: "🎵", title: "Music Club", desc: "From classical to rock, the Music Club performs at all major college events. Several student bands formed here have performed at city-wide venues." },
              { icon: "📸", title: "Photography Club", desc: "Captures the spirit of campus life. Members participate in photography competitions and publish a visual annual yearbook." },
              { icon: "🏃", title: "Sports Club", desc: "Coordinates all inter-department and inter-college sports events. BMSCE teams compete in VTU Sports Meets and national level tournaments." },
              { icon: "🌱", title: "Sustainability & Green Club", desc: "Focuses on waste management, solar energy awareness, tree plantation drives, and eco-friendly campus initiatives." },
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

      {activeTab === "Events" && (
        <>
          <div className="section-title"><span className="section-line"></span>Signature Events<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🎊", title: "Utsav — Cultural Festival", desc: "BMSCE's iconic annual cultural festival since 1973. Held in August, it draws participants from IITs, NITs, and colleges across India. Features rock concerts, western and Indian dance, theatre, quizzes, rangoli, face painting, and 'Mad Ads'.", tag: "Annual · August" },
              { icon: "🔬", title: "TechFest", desc: "The annual technical festival showcasing robotics, hackathons, coding competitions, paper presentations, and project exhibitions. Open to students across Karnataka.", tag: "Annual" },
              { icon: "🏆", title: "Sports Meet", desc: "The inter-department and inter-college sports meet covering cricket, football, basketball, badminton, athletics, and more. Students compete for departmental glory.", tag: "Annual" },
              { icon: "🎓", title: "Convocation", desc: "The annual convocation ceremony where graduating students receive their degrees, celebrating academic achievement with faculty, families, and distinguished guests.", tag: "Annual" },
              { icon: "🧠", title: "IEEE National Conference", desc: "BMSCE hosts national-level IEEE conferences and workshops that attract researchers, faculty, and students from across India.", tag: "Periodic" },
              { icon: "🌍", title: "Industry-Academia Summit", desc: "An annual summit bringing together BMSCE alumni, industry leaders, and academia to discuss emerging trends in technology and engineering.", tag: "Annual" },
            ].map(c => (
              <div className="info-card" key={c.title}>
                <span className="info-card-icon">{c.icon}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <div className="info-card-title" style={{ margin: 0 }}>{c.title}</div>
                  <span className="badge badge-orange">{c.tag}</span>
                </div>
                <p className="info-card-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "Hostel & Facilities" && (
        <>
          <div className="section-title"><span className="section-line"></span>Accommodation & Infrastructure<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🏠", title: "Hostel Unit I (Main)", desc: "The primary hostel for students, with modern amenities. Single rooms are available for pre-final and final year students on a priority basis." },
              { icon: "🌐", title: "International Hostel (Unit II)", desc: "A dedicated hostel for international students and NRI/OCI admissions, equipped with modern facilities to ensure comfort for global students." },
              { icon: "🍽️", title: "Canteen & Mess", desc: "Multiple canteens on campus serving hot meals, snacks, and beverages. The mess provides nutritious meals for hostel residents at subsidised rates." },
              { icon: "📶", title: "Wi-Fi Campus", desc: "The entire campus is covered by high-speed Wi-Fi, enabling students to access e-resources, NPTEL courses, and research databases anywhere on campus." },
              { icon: "🏋️", title: "Gym & Fitness Center", desc: "A well-equipped gymnasium for students to maintain physical fitness, with dedicated timings for men and women." },
              { icon: "🏥", title: "Health Center", desc: "An on-campus health center with a resident medical officer, providing first aid and primary healthcare services to students and staff." },
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

export default CampusLifePage;
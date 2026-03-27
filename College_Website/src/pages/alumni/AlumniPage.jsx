import React, { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added React Router hooks
import "../shared.css";

const testimonials = [
  {
    name: "Sundar Pichai",
    role: "CEO, Google & Alphabet",
    initials: "SP",
    color: "#4285F4",
    quote: "The discipline and analytical rigor I developed during my engineering years laid the foundation for everything I've built since. An institution that sharpens your thinking shapes your entire career.",
  },
  {
    name: "Kiran Mazumdar-Shaw",
    role: "Founder, Biocon",
    initials: "KM",
    color: "#34A853",
    quote: "Bengaluru's engineering spirit is world-class. The students coming out of institutions like BMSCE bring both technical depth and the hunger to innovate — exactly what industry needs.",
  },
  {
    name: "N. R. Narayana Murthy",
    role: "Co-founder, Infosys",
    initials: "NM",
    color: "#1565c0",
    quote: "Excellent engineers are made through hard work, mentorship and the right environment. BMSCE has always been a place where students are challenged to think beyond the textbook.",
  },
  {
    name: "Mohandas Pai",
    role: "Former CFO, Infosys",
    initials: "MP",
    color: "#0d47a1",
    quote: "The technical education in Bengaluru's top colleges is on par with the best in the world. I've seen BMSCE alumni thrive at every level — from startups to Fortune 500 boardrooms.",
  },
  {
    name: "Roshni Nadar Malhotra",
    role: "Chairperson, HCL Technologies",
    initials: "RN",
    color: "#7b1fa2",
    quote: "India's engineering talent is its greatest export. Institutions that invest in both technical excellence and character building produce leaders who make a lasting global impact.",
  },
  {
    name: "Deepa Malik",
    role: "Paralympic Champion & Entrepreneur",
    initials: "DM",
    color: "#c62828",
    quote: "Resilience and excellence go hand in hand. Bengaluru's engineering culture teaches you to push your limits — a lesson that serves you far beyond the campus gates.",
  },
  {
    name: "Sachin Bansal",
    role: "Co-founder, Flipkart & Navi",
    initials: "SB",
    color: "#e65100",
    quote: "The best engineers don't just solve problems — they find problems worth solving. That mindset, cultivated in great colleges, is what drives India's startup revolution.",
  },
  {
    name: "Nandan Nilekani",
    role: "Co-founder, Infosys & Aadhaar Architect",
    initials: "NN",
    color: "#00695c",
    quote: "India's digital transformation was built on the shoulders of engineers who dared to think big. BMSCE has been producing such engineers for nearly eight decades.",
  },
];

function AlumniSlider() {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const SPEED = 0.5; // px per frame

  // Duplicate for seamless loop
  const items = [...testimonials, ...testimonials];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div style={{ overflow: "hidden", padding: "0.5rem 0 2rem", position: "relative" }}>
      {/* fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, #f7f9fc, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, #f7f9fc, transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div
        ref={trackRef}
        style={{ display: "flex", gap: "1.25rem", width: "max-content", willChange: "transform" }}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {items.map((t, i) => (
          <div
            key={i}
            style={{
              width: "320px",
              flexShrink: 0,
              background: "white",
              borderRadius: "16px",
              padding: "1.5rem",
              border: "1px solid #e8edf5",
              boxShadow: "0 2px 12px rgba(21,101,192,0.07)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{
                width: "44px", height: "44px", borderRadius: "50%",
                background: t.color, color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: "0.9rem", flexShrink: 0,
              }}>{t.initials}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1a1a2e" }}>{t.name}</div>
                <div style={{ fontSize: "0.78rem", color: "#6b7280" }}>{t.role}</div>
              </div>
            </div>
            <p style={{
              fontSize: "0.875rem", color: "#374151", lineHeight: 1.65,
              margin: 0, fontStyle: "italic",
              borderLeft: `3px solid ${t.color}`, paddingLeft: "0.75rem",
            }}>
              "{t.quote}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

const tabs = ["Overview", "Network", "Events", "Donate"];

// Helper function for URLs
const toSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function AlumniPage() {
  const { section } = useParams();
  const navigate = useNavigate();

  // Find active tab based on URL param, default to "Overview"
  const activeTab = tabs.find((t) => toSlug(t) === section?.toLowerCase()) || "Overview";

  const handleTabClick = (t) => {
    navigate(`/alumni/${toSlug(t)}`);
  };

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <div className="page-header-label">Alumni</div>
          <h1 className="page-header-title">BMSCE Alumni Network</h1>
          <p className="page-header-sub">
            Over 40,000 BMSCE alumni can be found all over the world — leading organisations, founding startups, advancing research, and shaping policy. Together, we're a lifelong community.
          </p>
        </div>
        <div className="page-header-stats">
          <div className="page-stat"><span className="page-stat-n">40K+</span><span className="page-stat-l">Alumni Worldwide</span></div>
          <div className="page-stat"><span className="page-stat-n">78</span><span className="page-stat-l">Years of Legacy</span></div>
          <div className="page-stat"><span className="page-stat-n">100+</span><span className="page-stat-l">Countries</span></div>
          <div className="page-stat"><span className="page-stat-n">1946</span><span className="page-stat-l">First Batch</span></div>
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
          <div className="section-title"><span className="section-line"></span>What People Say<span className="section-line"></span></div>
          <AlumniSlider />
          <div className="section-title"><span className="section-line"></span>Our Alumni Community<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🌍", title: "Global Presence", desc: "BMSCE alumni are spread across the globe — from Silicon Valley to Singapore, from London to Bengaluru. Our network spans technology, research, manufacturing, finance, and public service." },
              { icon: "🏢", title: "Industry Leaders", desc: "Alumni hold leadership positions at Google, Microsoft, Amazon, Oracle, ISRO, Tata, L&T, and hundreds of other organisations worldwide." },
              { icon: "🚀", title: "Entrepreneurs & Founders", desc: "Many BMSCE alumni have founded successful startups, including ventures backed by top-tier VC firms in India and the United States." },
              { icon: "🔬", title: "Research & Academia", desc: "A strong cohort of alumni are researchers at IITs, IISc, and top international universities, contributing to frontier science and engineering." },
              { icon: "🎓", title: "Mentorship Program", desc: "Alumni actively mentor current students through guest lectures, mock interviews, internship guidance, and one-on-one career coaching." },
              { icon: "❤️", title: "Giving Back", desc: "Alumni contributions fund scholarships, lab upgrades, and infrastructure improvements — ensuring every generation of BMSCE students has the best resources." },
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

      {activeTab === "Network" && (
        <>
          <div className="section-title"><span className="section-line"></span>Connect with Alumni<span className="section-line"></span></div>
          <div className="two-col" style={{ padding: "0 2rem 2rem" }}>
            <div className="content-block">
              <h3>Alumni Association</h3>
              <p>The BMSCE Alumni Association is the official network connecting graduates across batches and disciplines. Membership is free for all BMSCE graduates.</p>
              <p>The association organises annual meets, chapter events in major cities, and facilitates connections between alumni and current students.</p>
              <div className="highlight-strip">
                📧 alumni@bmsce.ac.in<br/>
                🌐 Visit bmsce.ac.in/alumni to register and update your profile.
              </div>
            </div>
            <div className="content-block">
              <h3>Department Alumni Networks</h3>
              <p>Each department maintains its own alumni group, organised on WhatsApp, LinkedIn, and through annual department meets. These focused networks enable subject-matter mentorship and industry connections.</p>
              <ul style={{ paddingLeft: "1.25rem", fontSize: "0.875rem", color: "#444", lineHeight: 2, marginTop: "0.5rem" }}>
                <li>CSE Alumni Group (LinkedIn)</li>
                <li>ECE Alumni Network</li>
                <li>Mechanical Engineering Alumni</li>
                <li>Civil Engineering Alumni</li>
                <li>EEE Alumni Network</li>
              </ul>
            </div>
          </div>
        </>
      )}

      {activeTab === "Events" && (
        <>
          <div className="section-title"><span className="section-line"></span>Alumni Events<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🎊", title: "Annual Alumni Meet", desc: "The flagship annual alumni gathering at the BMSCE campus brings together graduates from all batches for networking, reminiscing, and reconnecting with the institution.", tag: "Annual" },
              { icon: "🗣️", title: "Guest Lecture Series", desc: "Distinguished alumni return to campus to deliver lectures, sharing career experiences and industry insights with current students across departments.", tag: "Year-Round" },
              { icon: "🤝", title: "Mentorship Day", desc: "A dedicated day when alumni meet final-year students for career counselling, interview preparation, and guidance on higher education and entrepreneurship.", tag: "Annual" },
              { icon: "🏙️", title: "City Chapter Meets", desc: "Alumni chapters in Bengaluru, Mumbai, Delhi, Hyderabad, Chennai, and international cities like the US Bay Area, UK, and Singapore organise regular local meetups.", tag: "Chapter Events" },
              { icon: "🎓", title: "Scholarship Award Ceremony", desc: "Alumni-funded scholarships are awarded at an annual ceremony, honouring both the donors and the deserving student recipients.", tag: "Annual" },
              { icon: "📣", title: "Industry-Academia Summit", desc: "Alumni leaders join faculty and industry experts for an annual summit exploring emerging trends in engineering, technology, and management.", tag: "Annual" },
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

      {activeTab === "Donate" && (
        <>
          <div className="section-title"><span className="section-line"></span>Give Back to BMSCE<span className="section-line"></span></div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div className="content-block" style={{ marginBottom: "1.5rem" }}>
              <h3>Support the Next Generation</h3>
              <p>Your contribution to BMSCE directly impacts the next generation of engineers. Donations fund scholarships for deserving students, upgrade laboratories, enhance library resources, and support faculty research.</p>
              <div className="highlight-strip" style={{ marginTop: "1rem" }}>
                Every contribution, big or small, helps BMSCE continue its 78-year legacy of producing world-class engineers and leaders.
              </div>
            </div>
            <div className="info-cards-grid" style={{ padding: 0 }}>
              {[
                { icon: "🎓", title: "Student Scholarships", desc: "Fund merit and need-based scholarships that enable talented students from all backgrounds to pursue engineering education at BMSCE." },
                { icon: "🔬", title: "Lab & Equipment", desc: "Contribute to upgrading research equipment, computing infrastructure, and specialised labs in your home department." },
                { icon: "📚", title: "Library & E-Resources", desc: "Help expand BMSCE's digital library subscriptions, e-journal access, and book collections available to all students." },
                { icon: "🏗️", title: "Infrastructure", desc: "Support infrastructure projects — new classrooms, renovation of heritage buildings, accessibility upgrades, and campus beautification." },
              ].map(c => (
                <div className="info-card" key={c.title}>
                  <span className="info-card-icon">{c.icon}</span>
                  <div className="info-card-title">{c.title}</div>
                  <p className="info-card-desc">{c.desc}</p>
                </div>
              ))}
            </div>
            <div className="highlight-strip" style={{ marginTop: "1.5rem" }}>
              📧 <strong>To make a contribution:</strong> Contact the Alumni Office at alumni@bmsce.ac.in or the B.M.S. Educational Trust at Bull Temple Road, Basavanagudi, Bengaluru – 560 019.
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AlumniPage;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../shared.css";

const tabs = ["Address & Map", "Enquiry", "Key Contacts"];

// Helper function for clean URLs
const toSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function ContactPage() {
  const { section } = useParams();
  const navigate = useNavigate();

  // Active tab setup based on URL slug
  const activeTab = tabs.find((t) => toSlug(t) === section?.toLowerCase()) || "Address & Map";

  const handleTabClick = (t) => {
    navigate(`/contact/${toSlug(t)}`);
  };

  // --- Backend & Form State ---
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // --- Form Submission Logic (Connected to Render) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const response = await fetch("https://bmsce-portal-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        setStatus("");
      } else {
        setStatus("Failed to send: " + (data.error || "Server error"));
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Failed to connect to the server.");
    }
  };

  return (
    <div className="page-body">
      <div className="page-header">
        <div>
          <div className="page-header-label">Contact Us</div>
          <h1 className="page-header-title">Get in Touch</h1>
          <p className="page-header-sub">
            B.M.S. College of Engineering, Bull Temple Road, Basavanagudi, Bengaluru – 560 019. About 5 km from the central railway station, diagonally opposite the famous Bull Temple.
          </p>
        </div>
        <div className="page-header-stats">
          <div className="page-stat"><span className="page-stat-n">📍</span><span className="page-stat-l">Basavanagudi</span></div>
          <div className="page-stat"><span className="page-stat-n">🚉</span><span className="page-stat-l">5km from City</span></div>
          <div className="page-stat"><span className="page-stat-n">📞</span><span className="page-stat-l">+91-80-26622130</span></div>
          <div className="page-stat"><span className="page-stat-n">📧</span><span className="page-stat-l">principal@bmsce.ac.in</span></div>
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

      {activeTab === "Address & Map" && (
        <>
          <div className="section-title"><span className="section-line"></span>Location<span className="section-line"></span></div>
          <div className="two-col" style={{ padding: "0 2rem 2rem" }}>
            <div className="content-block">
              <h3>Campus Address</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginTop: "0.5rem" }}>
                {[
                  { icon: "📍", label: "Address", value: "Bull Temple Road, Basavanagudi, Bengaluru, Karnataka – 560 019" },
                  { icon: "📞", label: "Phone", value: "+91-80-26622130 / 26622131" },
                  { icon: "📠", label: "Fax", value: "+91-80-26614357" },
                  { icon: "📧", label: "Email", value: "principal@bmsce.ac.in" },
                  { icon: "🕘", label: "Office Hours", value: "Mon – Sat, 9:00 AM – 5:00 PM" },
                ].map(i => (
                  <div key={i.label} style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{i.icon}</span>
                    <div>
                      <div style={{ fontSize: "0.68rem", fontWeight: 800, color: "#1565c0", textTransform: "uppercase", letterSpacing: "0.08em" }}>{i.label}</div>
                      <div style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.55 }}>{i.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="content-block">
              <h3>How to Reach Us</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginTop: "0.5rem" }}>
                {[
                  { icon: "🚇", title: "By Metro", desc: "Nearest: South End Circle (Purple Line). 10-min walk to campus." },
                  { icon: "🚌", title: "By Bus", desc: "BMTC routes 37E, 201, 201C stop at Bull Temple Road / BMS College." },
                  { icon: "🚂", title: "By Train", desc: "5 km from KSR Bengaluru City Station. Cabs/Autos available." },
                  { icon: "✈️", title: "By Air", desc: "40 km from Kempegowda Intl Airport. Vayu Vajra buses available." },
                ].map(m => (
                  <div key={m.title} style={{ display: "flex", gap: "0.8rem" }}>
                    <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 800, color: "#1a1a2e" }}>{m.title}</div>
                      <div style={{ fontSize: "0.82rem", color: "#5a6478", lineHeight: 1.62 }}>{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div style={{ background: "white", borderRadius: "18px", border: "1px solid #e0e9f5", overflow: "hidden", height: "400px", boxShadow: "0 4px 20px rgba(21,101,192,0.08)" }}>
              <iframe
                title="BMSCE Location"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3888.38423405391!2d77.56333331526685!3d12.942222218931185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1591f1b33945%3A0xc6660d191ae36eb8!2sBMS%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1615967894562!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </>
      )}

      {activeTab === "Enquiry" && (
        <div className="animate-in fade-in duration-500">
          <div className="section-title"><span className="section-line"></span>Send an Enquiry<span className="section-line"></span></div>
          <div style={{ padding: "0 2.5rem 3.5rem" }}>
            {submitted ? (
              <div className="content-block" style={{ textAlign: "center", padding: "3.5rem 2rem", maxWidth: 540, margin: "0 auto" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1.1rem" }}>✅</div>
                <h3 style={{ fontSize: "1.3rem", color: "#1565c0" }}>Message Sent!</h3>
                <p style={{ color: "#555" }}>Our team will respond within 2–3 working days.</p>
                <button onClick={() => setSubmitted(false)} style={{ marginTop: "1.75rem", background: "#1565c0", color: "white", border: "none", borderRadius: "10px", padding: "0.75rem 1.75rem", fontWeight: 700, cursor: "pointer" }}>Send Another</button>
              </div>
            ) : (
              <div className="content-block" style={{ maxWidth: "660px", margin: "0 auto" }}>
                <h3>Contact Form</h3>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginTop: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.1rem" }}>
                    <div>
                      <label className="form-label">Full Name</label>
                      <input type="text" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Email Address</label>
                      <input type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className="form-input" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input type="tel" placeholder="+91 XXXXXXXXXX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Subject</label>
                    <input type="text" placeholder="Enquiry Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Message</label>
                    <textarea placeholder="Write your message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows={5} className="form-input" style={{resize: "vertical"}} />
                  </div>
                  
                  {status && <p style={{ color: status.includes("Sending") ? "#1565c0" : "red", fontSize: "0.9rem" }}>{status}</p>}

                  <button type="submit" disabled={status.includes("Sending")} style={{ background: status.includes("Sending") ? "#888" : "#1565c0", color: "white", border: "none", borderRadius: "10px", padding: "0.85rem 2.5rem", fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }}>
                    {status.includes("Sending") ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "Key Contacts" && (
        <div className="animate-in fade-in duration-500">
          <div className="section-title"><span className="section-line"></span>Key Contacts<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🏫", title: "Principal's Office", email: "principal@bmsce.ac.in", phone: "+91-80-26622130" },
              { icon: "📋", title: "Admissions Office", email: "admissions@bmsce.ac.in", phone: "+91-80-26622131" },
              { icon: "💼", title: "Training & Placement", email: "placements@bmsce.ac.in", phone: "+91-80-26622132" },
              { icon: "🔬", title: "Research Cell", email: "research@bmsce.ac.in", phone: "Contact via college" },
            ].map(c => (
              <div className="info-card" key={c.title}>
                <span className="info-card-icon">{c.icon}</span>
                <div className="info-card-title">{c.title}</div>
                <p className="info-card-desc" style={{ marginTop: "0.5rem" }}>
                  📧 <a href={`mailto:${c.email}`} style={{ color: "#1565c0", textDecoration: "none" }}>{c.email}</a><br/>
                  📞 {c.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Internal CSS for the Form */}
      <style>{`
        .form-label { font-size: 0.75rem; font-weight: 800; color: #1565c0; display: block; margin-bottom: 0.4rem; letter-spacing: 0.04em; text-transform: uppercase; }
        .form-input { width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #dce6f5; border-radius: 10px; font-size: 0.9rem; outline: none; box-sizing: border-box; transition: border-color 0.2s; }
        .form-input:focus { border-color: #1565c0; }
      `}</style>
    </div>
  );
}

export default ContactPage;
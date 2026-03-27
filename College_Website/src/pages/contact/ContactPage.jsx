import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../shared.css";

const tabs = ["Address & Map", "Enquiry", "Key Contacts"];

// Helper function for clean URLs
const toSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function ContactPage() {
  const { section } = useParams();
  const navigate = useNavigate();

  // Active tab setup
  const activeTab = tabs.find((t) => toSlug(t) === section?.toLowerCase()) || "Address & Map";

  const handleTabClick = (t) => {
    navigate(`/contact/${toSlug(t)}`);
  };

  // --- Backend Integration State ---
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // --- Form Submission Logic ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    console.log(form);
    try {
      // INSIDE ContactPage.jsx -> handleSubmit function

      const response = await fetch("https://bmsce-portal-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Now sending them as 5 completely separate fields!
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
        setStatus("Failed to send: " + data.error);
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
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
                {[
                  { icon: "📍", label: "Address", value: "Bull Temple Road, Basavanagudi, Bengaluru, Karnataka – 560 019" },
                  { icon: "📞", label: "Phone", value: "+91-80-26622130 / 26622131" },
                  { icon: "📠", label: "Fax", value: "+91-80-26614357" },
                  { icon: "📧", label: "Email", value: "principal@bmsce.ac.in" },
                  { icon: "🌐", label: "Website", value: "www.bmsce.ac.in" },
                  { icon: "🕘", label: "Office Hours", value: "Monday – Saturday, 9:00 AM – 5:00 PM" },
                ].map(i => (
                  <div key={i.label} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{i.icon}</span>
                    <div>
                      <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1565c0", textTransform: "uppercase", letterSpacing: "0.05em" }}>{i.label}</div>
                      <div style={{ fontSize: "0.9rem", color: "#333", marginTop: "0.1rem" }}>{i.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="content-block">
              <h3>How to Reach Us</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
                {[
                  { icon: "🚇", title: "By Metro", desc: "Nearest metro station: South End Circle (Purple Line). 10-minute walk to BMSCE campus from the station exit." },
                  { icon: "🚌", title: "By Bus", desc: "BMTC buses 37E, 201, 201C, 201M, and several others stop at Bull Temple Road / BMS College stop." },
                  { icon: "🚂", title: "By Train", desc: "About 5 km from KSR Bengaluru City Railway Station. Take an auto-rickshaw or cab to Bull Temple Road, Basavanagudi." },
                  { icon: "✈️", title: "By Air", desc: "Approximately 40 km from Kempegowda International Airport. Cabs and Vayu Vajra Airport buses connect to the city centre." },
                ].map(m => (
                  <div key={m.title} style={{ display: "flex", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{m.icon}</span>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1a1a2e" }}>{m.title}</div>
                      <div style={{ fontSize: "0.82rem", color: "#555", lineHeight: 1.6, marginTop: "0.15rem" }}>{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: "0 2rem 2rem" }}>
            <div style={{ background: "white", borderRadius: "14px", border: "1px solid #e8edf5", overflow: "hidden", height: "360px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <iframe
                title="BMSCE Location"
                width="100%"
                height="360"
                style={{ border: "none", display: "block" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6075186657247!2d77.56523697516897!3d12.942783987366396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15f1a0d4a2b7%3A0x7b82f5e9e96f98d8!2sBMS%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1711538400000!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </>
      )}

      {activeTab === "Enquiry" && (
        <>
          <div className="section-title"><span className="section-line"></span>Send an Enquiry<span className="section-line"></span></div>
          <div style={{ padding: "0 2rem 3rem" }}>
            {submitted ? (
              <div className="content-block" style={{ textAlign: "center", padding: "3rem 2rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontSize: "1.25rem", color: "#1565c0" }}>Message Sent!</h3>
                <p style={{ color: "#555", marginTop: "0.5rem" }}>Thank you for reaching out. Our team will respond within 2–3 working days.</p>
                <button onClick={() => setSubmitted(false)} style={{ marginTop: "1.5rem", background: "#1565c0", color: "white", border: "none", borderRadius: "8px", padding: "0.7rem 1.5rem", fontWeight: 700, cursor: "pointer" }}>Send Another</button>
              </div>
            ) : (
              <div className="content-block" style={{ maxWidth: "640px" }}>
                <h3>Contact Form</h3>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                  {[
                    { id: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                    { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                    { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXXXXXXX" },
                    { id: "subject", label: "Subject", type: "text", placeholder: "Enquiry subject" },
                  ].map(f => (
                    <div key={f.id}>
                      <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1565c0", display: "block", marginBottom: "0.35rem" }}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={form[f.id]}
                        onChange={e => setForm(p => ({ ...p, [f.id]: e.target.value }))}
                        required={f.id !== "phone"} // Made phone optional, name/email/subject required
                        style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1.5px solid #d8e3f0", borderRadius: "8px", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1565c0", display: "block", marginBottom: "0.35rem" }}>Message</label>
                    <textarea
                      placeholder="Write your message here..."
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      required
                      rows={5}
                      style={{ width: "100%", padding: "0.65rem 0.85rem", border: "1.5px solid #d8e3f0", borderRadius: "8px", fontSize: "0.875rem", outline: "none", resize: "vertical", boxSizing: "border-box" }}
                    />
                  </div>
                  
                  {/* Status Error Display */}
                  {status && !status.includes("Sending") && (
                    <p style={{ color: "red", fontSize: "0.9rem", margin: "0" }}>{status}</p>
                  )}

                  <button type="submit" disabled={status === "Sending..."} style={{ background: status === "Sending..." ? "#888" : "#1565c0", color: "white", border: "none", borderRadius: "8px", padding: "0.8rem 1.75rem", fontWeight: 700, fontSize: "0.95rem", cursor: status === "Sending..." ? "not-allowed" : "pointer", alignSelf: "flex-start", transition: "background 0.15s" }}>
                    {status === "Sending..." ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === "Key Contacts" && (
        <>
          <div className="section-title"><span className="section-line"></span>Department Contacts<span className="section-line"></span></div>
          <div className="info-cards-grid">
            {[
              { icon: "🏫", title: "Principal's Office", email: "principal@bmsce.ac.in", phone: "+91-80-26622130" },
              { icon: "📋", title: "Admissions Office", email: "admissions@bmsce.ac.in", phone: "+91-80-26622131" },
              { icon: "💼", title: "Training & Placement Cell", email: "placements@bmsce.ac.in", phone: "Contact via college" },
              { icon: "🔬", title: "Research Cell", email: "research@bmsce.ac.in", phone: "Contact via college" },
              { icon: "👨‍🎓", title: "Student Welfare", email: "studentwelfare@bmsce.ac.in", phone: "Contact via college" },
              { icon: "🎓", title: "Alumni Office", email: "alumni@bmsce.ac.in", phone: "Contact via college" },
              { icon: "📚", title: "Central Library", email: "library@bmsce.ac.in", phone: "Contact via college" },
              { icon: "💻", title: "IT Helpdesk", email: "ithelpdesk@bmsce.ac.in", phone: "Contact via college" },
            ].map(c => (
              <div className="info-card" key={c.title}>
                <span className="info-card-icon">{c.icon}</span>
                <div className="info-card-title">{c.title}</div>
                <p className="info-card-desc" style={{ marginTop: "0.35rem" }}>
                  📧 {c.email}<br/>📞 {c.phone}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ContactPage;
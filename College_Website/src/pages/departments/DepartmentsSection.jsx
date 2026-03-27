import React, { useState } from "react";
import { departments } from "../../data/departmentsData";
import DepartmentPage from "./DepartmentPage";

function DepartmentCard({ dept, onClick }) {
  return (
    <div className="dept-card" onClick={() => onClick(dept)}>
      <div className="dept-card-accent" style={{ background: `linear-gradient(135deg, ${dept.color}, ${dept.color}88)` }}>
        <span className="dept-card-code">{dept.shortName}</span>
      </div>
      <div className="dept-card-body">
        <h3 className="dept-card-name">{dept.name}</h3>
        <div className="dept-card-meta">
          <span>Est. {dept.established}</span>
          <span>UG: {dept.intake.ug}</span>
          {dept.intake.pg > 0 && <span>PG: {dept.intake.pg}/stream</span>}
        </div>
        <div className="dept-card-subsections">
          {dept.subsections.slice(0, 5).map((s) => (
            <span key={s} className="dept-tag">{s}</span>
          ))}
          {dept.subsections.length > 5 && <span className="dept-tag dept-tag-more">+{dept.subsections.length - 5} more</span>}
        </div>
      </div>
      <div className="dept-card-arrow" style={{ color: dept.color }}>→</div>
    </div>
  );
}

function DepartmentsListPage({ onSelectDept }) {
  const ugDepts = departments.filter(d => d.intake.ug > 0);

  return (
    <div className="depts-list-page">
      {/* Page Header */}
      <div className="depts-page-header">
        <div className="depts-header-content">
          <div className="depts-header-label">ACADEMICS</div>
          <h1 className="depts-header-title">Departments</h1>
          <p className="depts-header-sub">
            B.M.S. College of Engineering offers 18 undergraduate and 13 postgraduate programs across diverse engineering disciplines. Explore each department's programs, faculty, research, and more.
          </p>
        </div>
        <div className="depts-header-stats">
          <div className="depts-stat"><span className="depts-stat-n">18</span><span className="depts-stat-l">UG Programs</span></div>
          <div className="depts-stat"><span className="depts-stat-n">13</span><span className="depts-stat-l">PG Programs</span></div>
          <div className="depts-stat"><span className="depts-stat-n">350+</span><span className="depts-stat-l">Research Scholars</span></div>
          <div className="depts-stat"><span className="depts-stat-n">1946</span><span className="depts-stat-l">Est. Year</span></div>
        </div>
      </div>

      {/* Department Grid */}
      <div className="depts-section-title">
        <span className="section-line"></span>
        Engineering Departments
        <span className="section-line"></span>
      </div>
      <div className="depts-grid">
        {ugDepts.map((dept) => (
          <DepartmentCard key={dept.id} dept={dept} onClick={onSelectDept} />
        ))}
      </div>

      {/* Allied Departments */}
      <div className="allied-depts">
        <div className="depts-section-title">
          <span className="section-line"></span>
          Allied Departments
          <span className="section-line"></span>
        </div>
        <div className="allied-grid">
          {[
            { name: "Mathematics Department", icon: "∑" },
            { name: "Physics Department", icon: "⚛" },
            { name: "Chemistry Department", icon: "🧪" },
            { name: "Computer Applications (MCA)", icon: "💻" },
            { name: "Management Studies & Research Centre", icon: "📊" },
          ].map((d, i) => (
            <div key={i} className="allied-card">
              <span className="allied-icon">{d.icon}</span>
              <span className="allied-name">{d.name}</span>
              <span className="allied-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DepartmentsSection() {
  const [selectedDept, setSelectedDept] = useState(null);

  if (selectedDept) {
    return <DepartmentPage dept={selectedDept} onBack={() => setSelectedDept(null)} />;
  }

  return <DepartmentsListPage onSelectDept={setSelectedDept} />;
}

export default DepartmentsSection;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "./pages/departments/departments.css";

// --- LAYOUT ---
import Navbar from "./layout/Navbar";

// --- PAGES ---
import HomePage from "./components/HomePage"; // Teammate's custom home page!
import DepartmentsSection from "./pages/departments/DepartmentsSection";
import AboutPage from "./pages/about/AboutPage";
import AdmissionsPage from "./pages/admissions/AdmissionsPage";
import PlacementsPage from "./pages/placements/PlacementsPage";
import ResearchPage from "./pages/research/ResearchPage";
import CampusLifePage from "./pages/campuslife/CampusLifePage";
import StudentsPage from "./pages/students/StudentsPage";
import AlumniPage from "./pages/alumni/AlumniPage";
import ContactPage from "./pages/contact/ContactPage"; 

function App() {
  return (
    <BrowserRouter>
      {/* Global Navbar */}
      <Navbar />
      
      <Routes>
        {/* 1. Home Route */}
        <Route path="/" element={<HomePage />} />

        {/* 2. Departments (Key Module) */}
        <Route path="/departments" element={<DepartmentsSection />} />
        <Route path="/departments/:deptId" element={<DepartmentsSection />} />
        <Route path="/departments/:deptId/:section" element={<DepartmentsSection />} />
        
        {/* 3. About Section */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/:section" element={<AboutPage />} />
        
        {/* 4. Admissions Section */}
        <Route path="/admissions" element={<AdmissionsPage />} />
        <Route path="/admissions/:section" element={<AdmissionsPage />} />
        
        {/* 5. Placements Section */}
        <Route path="/placements" element={<PlacementsPage />} />
        <Route path="/placements/:section" element={<PlacementsPage />} />
        
        {/* 6. Research Section */}
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/research/:section" element={<ResearchPage />} />
        
        {/* 7. Campus Life Section */}
        <Route path="/campuslife" element={<CampusLifePage />} />
        <Route path="/campuslife/:section" element={<CampusLifePage />} />
        
        {/* 8. Students Section */}
        <Route path="/students" element={<StudentsPage />} />
        
        {/* 9. Alumni Section */}
        <Route path="/alumni" element={<AlumniPage />} />
        <Route path="/alumni/:section" element={<AlumniPage />} />
        
        {/* 10. Contact Section (Backend Integrated) */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/contact/:section" element={<ContactPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const menuItems = [
  { label: "Home", path: "/" },
  {
    label: "About",
    path: "/about",
    submenu: [
      { label: "Overview", path: "/about/overview" },
      { label: "History", path: "/about/history" },
      { label: "Leadership", path: "/about/leadership" },
      { label: "Accreditation", path: "/about/accreditation" },
      { label: "Achievements", path: "/about/achievements" },
    ],
  },
  {
    label: "Academics",
    path: "/departments",
    grid: true,
    submenu: [
      { label: "Civil Engineering", path: "/departments/civil" },
      { label: "Mechanical Engineering", path: "/departments/mechanical" },
      { label: "Electrical & Electronics", path: "/departments/eee" },
      { label: "Electronics & Communication", path: "/departments/ece" },
      { label: "Computer Science", path: "/departments/cse" },
      { label: "Information Science", path: "/departments/is" },
      { label: "Chemical Engineering", path: "/departments/chemical" },
      { label: "Bio-Technology", path: "/departments/biotech" },
      { label: "Aerospace Engineering", path: "/departments/aerospace" },
      { label: "Industrial Engineering", path: "/departments/iem" },
      { label: "AI & ML", path: "/departments/aiml" },
      { label: "AI & Data Science", path: "/departments/aids" },
    ],
  },
  {
    label: "Admissions",
    path: "/admissions",
    submenu: [
      { label: "UG Admissions", path: "/admissions/ug-admissions" },
      { label: "PG Admissions", path: "/admissions/pg-admissions" },
      { label: "Fee Structure", path: "/admissions/fee-structure" },
      { label: "Scholarships", path: "/admissions/scholarships" },
    ],
  },
  {
    label: "Placements",
    path: "/placements",
    submenu: [
      { label: "Recruiters", path: "/placements/recruiters" },
      { label: "Statistics", path: "/placements/statistics" },
      { label: "Register", path: "/placements/register" },
    ],
  },
  {
    label: "Research",
    path: "/research",
    submenu: [
      { label: "Projects", path: "/research/projects" },
      { label: "Publications", path: "/research/publications" },
      { label: "Labs", path: "/research/labs" },
    ],
  },
  {
    label: "Campus Life",
    path: "/campuslife",
    submenu: [
      { label: "Clubs & Societies", path: "/campuslife/clubs-societies" },
      { label: "Events", path: "/campuslife/events" },
      { label: "Hostel & Facilities", path: "/campuslife/hostel-facilities" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

function DropdownItem({ item, navigate, currentPath, isScrolled }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);
  const dropWidth = item.grid ? 480 : 220;

  const isActive = currentPath.startsWith(item.path) && item.path !== "/";

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <li
      className="relative list-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => navigate(item.path)}
        className={`px-3 py-2 rounded-md font-semibold text-sm transition-all duration-300 ${
          isActive 
            ? "bg-blue-600 text-white shadow-md" 
            : isScrolled ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/20"
        }`}
      >
        {item.label}
      </button>

      {open && item.submenu && (
        <div className="absolute top-full left-0 pt-2 z-[9999] animate-in fade-in slide-in-from-top-1 duration-200">
          <div 
            className="bg-white rounded-xl shadow-2xl border border-gray-100 p-2 overflow-hidden"
            style={{ width: dropWidth }}
          >
            <ul className={`${item.grid ? "grid grid-cols-2 gap-1" : "flex flex-col gap-1"}`}>
              {item.submenu.map((sub) => (
                <li key={sub.label}>
                  <button
                    onClick={() => { navigate(sub.path); setOpen(false); }}
                    className="w-full text-left px-4 py-2 rounded-lg text-[13px] font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {sub.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? "bg-white shadow-xl py-2" : "bg-transparent py-5"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 flex items-center justify-between transition-colors duration-300 ${
        isScrolled ? "text-black" : "text-white"
      }`}>
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className={`text-2xl font-black tracking-tighter transition-all ${
            !isScrolled && "drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
          }`}>
            BMSCE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-1">
          {menuItems.map((item) => (
            <DropdownItem 
              key={item.label} 
              item={item} 
              navigate={navigate} 
              currentPath={currentPath} 
              isScrolled={isScrolled} 
            />
          ))}
        </ul>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link 
            to="/contact/enquiry" 
            className={`hidden sm:inline-block px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
              isScrolled 
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg" 
                : "bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white hover:text-black"
            }`}
          >
            Enquiry
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            className="lg:hidden p-2 focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Integrated) */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 max-h-[85vh] overflow-y-auto">
          <div className="p-4">
            {menuItems.map((item) => (
              <div key={item.label} className="mb-2">
                <button
                  onClick={() => { navigate(item.path); if(!item.submenu) setMobileOpen(false); }}
                  className="w-full text-left p-3 font-bold text-gray-800 hover:bg-gray-50 rounded-lg flex justify-between"
                >
                  {item.label}
                  {item.submenu && <span className="text-gray-400">▼</span>}
                </button>
                {item.submenu && (
                  <div className="ml-4 border-l-2 border-blue-100 pl-4 space-y-1">
                    {item.submenu.map(sub => (
                      <button
                        key={sub.label}
                        onClick={() => { navigate(sub.path); setMobileOpen(false); }}
                        className="w-full text-left p-2 text-sm text-gray-600 hover:text-blue-600"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link 
              to="/contact/enquiry"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center mt-4 bg-blue-600 text-white p-3 rounded-xl font-bold"
            >
              Contact Enquiry
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import React, { useState, useRef, useEffect } from "react";

const menuItems = [
  { label: "Home", submenu: ["About Us", "Vision & Mission", "Leadership"] },
  { label: "About", submenu: ["History", "Accreditation", "Achievements"] },
  {
    label: "Departments",
    submenu: [
      "Civil Engineering", "Computer Science", "Mechanical",
      "Electrical", "Electronics", "Chemical",
      "Biotechnology", "Aerospace", "Information Science",
    ],
    grid: true,
  },
  { label: "Academics", submenu: ["Programs", "Curriculum", "Calendar"] },
  { label: "Admissions", submenu: ["UG Admissions", "PG Admissions", "Fee Structure"] },
  { label: "Placements", submenu: ["Recruiters", "Statistics", "Register"] },
  { label: "Research", submenu: ["Projects", "Publications", "Labs"] },
  { label: "Campus Life", submenu: ["Clubs", "Events", "Hostel"] },
  { label: "Students", submenu: ["Portal", "Results", "Grievance"] },
  { label: "Alumni", submenu: ["Network", "Events", "Donate"] },
  { label: "Contact", submenu: ["Address", "Map", "Enquiry"] },
];

function DropdownItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

  useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const dropdownWidth = item.grid ? 480 : 200;
      const windowWidth = window.innerWidth;

      let left = rect.left;
      // If it would overflow the right edge, shift left
      if (left + dropdownWidth > windowWidth - 16) {
        left = windowWidth - dropdownWidth - 16;
      }
      // Never go off the left edge
      if (left < 8) left = 8;

      setDropdownStyle({ left: left, width: dropdownWidth });
    }
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a className="cursor-pointer px-3 py-2 rounded hover:bg-gray-100 font-medium text-sm">
        {item.label}
      </a>

      {open && (
        <div
          ref={dropdownRef}
          className="fixed bg-white text-black z-50 shadow-lg rounded-lg p-4 border border-gray-100"
          style={{
            top: ref.current?.getBoundingClientRect().bottom,
            left: dropdownStyle.left,
            width: dropdownStyle.width,
          }}
        >
          <ul className={item.grid ? "grid grid-cols-3 gap-1" : "flex flex-col gap-1"}>
            {item.submenu.map((sub) => (
              <li key={sub}>
                <a className="block hover:bg-gray-100 px-3 py-1.5 rounded text-sm cursor-pointer whitespace-nowrap">
                  {sub}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function Navbar() {
  return (
    <div className="navbar bg-white shadow-sm text-black">
      {/* Mobile */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-white text-black rounded-box z-50 mt-3 w-52 p-2 shadow">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a>{item.label}</a>
                {item.submenu && (
                  <ul className="p-2 bg-white text-black">
                    {item.submenu.map((sub) => <li key={sub}><a>{sub}</a></li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-bold">CollegeName</a>
      </div>

      {/* Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item) => (
            <DropdownItem key={item.label} item={item} />
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        <a className="btn btn-primary text-white">Apply Now</a>
      </div>
    </div>
  );
}

export default Navbar;
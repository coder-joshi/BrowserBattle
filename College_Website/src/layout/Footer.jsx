
export default function Footer() {
  const ExternalLink = ({ href, children, className }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <footer className="flex flex-wrap justify-between items-start gap-10 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-black">
        
        <ExternalLink href="https://prebuiltui.com">
          {/* Logo placeholder */}
        </ExternalLink>

        {/* Admissions */}
        <div className="min-w-[180px]">
          <p className="text-slate-100 font-semibold">Admissions</p>
          <ul className="mt-2 space-y-2">
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Under-Graduation" className="hover:text-indigo-600 transition">
                Under Graduation
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Post-Graduation" className="hover:text-indigo-600 transition">
                Post Graduation
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/PhD" className="hover:text-indigo-600 transition">
                Ph.D
              </ExternalLink>
            </li>
            <li>
              <a href="/" className="hover:text-indigo-600 transition">
                Fee Structure
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-indigo-600 transition">
                Scholarship
              </a>
            </li>
          </ul>
        </div>

        {/* Important */}
        <div className="min-w-[180px]">
          <p className="text-slate-100 font-semibold">Important</p>
          <ul className="mt-2 space-y-2">
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/COE-Notifications" className="hover:text-indigo-600 transition">
                Notifications and Results
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Rules-and-Regulations" className="hover:text-indigo-600 transition">
                Rules and Regulations
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Placement-Recruiting-Companies" className="hover:text-indigo-600 transition">
                Recruiting Companies
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Placement-Statistics" className="hover:text-indigo-600 transition">
                Placement Statistics
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Placement-Achievements" className="hover:text-indigo-600 transition">
                Placement Achievements
              </ExternalLink>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="min-w-[180px]">
          <p className="text-slate-100 font-semibold">Quick Links</p>
          <ul className="mt-2 space-y-2">
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Grievance-Redressal-Cell" className="hover:text-indigo-600 transition">
                Grievance Redressal Cell
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Constitution-of-SCSTOBC-Cell" className="hover:text-indigo-600 transition">
                SC/ST/OBC Cell
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Women-Cell-Committee" className="hover:text-indigo-600 transition">
                Women Cell Committee
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Life-at-BMSCE" className="hover:text-indigo-600 transition">
                Life at BMSCE
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Graduation-Day" className="hover:text-indigo-600 transition">
                Graduation Day
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Education-Videos" className="hover:text-indigo-600 transition">
                Education Videos
              </ExternalLink>
            </li>
          </ul>
        </div>

        {/* Extra Pages */}
        <div className="min-w-[180px]">
          <p className="text-slate-100 font-semibold">Extra Pages</p>
          <ul className="mt-2 space-y-2">
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Calendar-of-Events" className="hover:text-indigo-600 transition">
                Calendar of Events
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/BMSCE-Monthly-Activities" className="hover:text-indigo-600 transition">
                BMSCE Monthly Activities
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Scholarships" className="hover:text-indigo-600 transition">
                Scholarships
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href="https://bmsce.ac.in/home/Contact-Us" className="hover:text-indigo-600 transition">
                Contact Us
              </ExternalLink>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="min-w-[180px]">
          <p className="text-slate-100 font-semibold">Contact Us</p>

          <p className="mt-2 text-white font-bold">
            080-26622130/31/32/33/34/35
          </p>

          <ul className="mt-3 space-y-2 text-gray-400">
            <li>
              <span className="text-white font-medium">Address:</span>
              <br />
              P.O. Box No.: 1908, Bull Temple Road,
              <br />
              Bangalore – 560 019
              <br />
              Karnataka, India.
            </li>

            <li>
              <span className="text-white font-medium">Fax:</span>{" "}
              +91-80-26614357
            </li>

            <li>
              <span className="text-white font-medium">Email:</span>{" "}
              info@bmsce.ac.in
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
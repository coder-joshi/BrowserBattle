import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { Search, MonitorPlay, Users, BookOpen, GraduationCap, Building } from "lucide-react";


export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle the menu when ⌘K or Ctrl+K is pressed
  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  return (
    <>
      {/* Floating Hint for the Judges */}
      <div className="fixed bottom-6 left-6 z-[99] hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white/70 text-xs font-semibold shadow-2xl">
        <Search size={14} />
        <span>Press</span>
        <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-white">⌘</kbd>
        <kbd className="bg-white/20 px-1.5 py-0.5 rounded text-white">K</kbd>
        <span>to navigate</span>
      </div>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cmdk-dialog"
      >
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col cmdk-box">
          <Command.Input 
            placeholder="What are you looking for?..." 
            className="w-full bg-transparent text-white p-5 border-b border-white/10 outline-none text-lg placeholder:text-white/30"
          />
          <Command.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
            <Command.Empty className="p-4 text-center text-white/50 text-sm">
              No results found.
            </Command.Empty>

            <Command.Group heading="Core Pages" className="text-xs font-bold text-blue-400 uppercase tracking-wider p-2">
              <Command.Item onSelect={() => runCommand(() => navigate("/"))} className="cmdk-item">
                <Building size={16} /> Home / Campus
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => navigate("/departments"))} className="cmdk-item">
                <BookOpen size={16} /> Explore Departments
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => navigate("/placements"))} className="cmdk-item">
                <MonitorPlay size={16} /> Placement Dashboard
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => navigate("/alumni"))} className="cmdk-item">
                <Users size={16} /> Alumni Network
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => navigate("/admissions"))} className="cmdk-item">
                <GraduationCap size={16} /> Admissions 2026
              </Command.Item>
            </Command.Group>
            
            <Command.Group heading="Quick Actions" className="text-xs font-bold text-blue-400 uppercase tracking-wider p-2 mt-2">
              <Command.Item onSelect={() => runCommand(() => window.open("https://drive.google.com/file/d/1B0kvjlREBx-NxaexIp8ANqXfyjZCrsW7/view", "_blank"))} className="cmdk-item">
                ⬇️ Download Placement Brochure
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => navigate("/contact"))} className="cmdk-item">
                ✉️ Contact T&P Cell
              </Command.Item>
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}
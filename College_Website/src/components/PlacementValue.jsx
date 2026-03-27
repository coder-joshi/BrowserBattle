
import React from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const StatCard = ({ target, suffix, prefix = "", label }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => 
    prefix + Math.round(latest).toLocaleString('en-IN')
  );
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, target]);

  return (
    <div 
      ref={ref}
      className="bg-white/5 p-6 text-center border border-white/10 hover:bg-[#0088cc]/10 transition-colors duration-300"
    >
      <div className="text-3xl font-bold text-[#0088cc] flex items-baseline justify-center gap-1">
        <motion.span>{rounded}</motion.span>
        <span className="text-lg text-gray-200">{suffix}</span>
      </div>
      <p className="text-xs uppercase tracking-wider text-gray-400 mt-2 leading-relaxed">
        {label}
      </p>
    </div>
  );
};

const PlacementValue = () => {
  const stats = [
    { target: 383, suffix: "+", label: "companies visited campus in 2025" },
    { target: 1307, suffix: "+", label: "total offers made in 2025" },
    { target: 51, suffix: ".5 LPA", prefix: "₹", label: "highest package offered" },
    { target: 11, suffix: ".4 LPA", prefix: "₹", label: "average package 2025" },
    { target: 968, suffix: "+", label: "students placed in 2025" },
    { target: 775, suffix: "+", label: "internship offers made" },
    { target: 18500, suffix: "+", label: "cumulative offers since 1995" },
    { target: 98, suffix: "K/mo", prefix: "₹", label: "highest internship stipend" },
  ];

  return (
    <section className="bg-[#212529] py-16 px-4 relative overflow-hidden font-sans">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#0088cc]" />

      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <p className="text-[#0088cc] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
            Training & Placement Cell
          </p>
          <h2 className="text-2xl md:text-3xl font-medium text-white">
            Our Placement Excellence
          </h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden border border-white/10">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementValue;
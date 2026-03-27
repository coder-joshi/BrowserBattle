import React, { useRef, useEffect, useState } from "react";

const cardsData = [
  {
    image: "https://i.pravatar.cc/150?img=11",
    name: "Arjun Krishnamurthy",
    handle: "@arjun_bmsce",
    text: "BMSCE gave me the platform to grow — from hackathons to internships, the faculty always pushed us beyond our limits. Best decision of my life.",
  },
  {
    image: "https://i.pravatar.cc/150?img=47",
    name: "Priya Venkatesh",
    handle: "@priya.v_ece",
    text: "The labs here are world-class and the professors genuinely care. I landed my dream job at a top MNC straight out of placement season. Grateful to BMSCE!",
  },
  {
    image: "https://i.pravatar.cc/150?img=14",
    name: "Rahul Nair",
    handle: "@rahul_nair_cse",
    text: "Four incredible years. The Utsav fest, late-night project sessions, and mentors who believed in us — BMSCE shaped who I am as an engineer.",
  },
  {
    image: "https://i.pravatar.cc/150?img=45",
    name: "Sneha Iyer",
    handle: "@sneha_iyer99",
    text: "From the autonomous curriculum to industry tie-ups, BMSCE keeps up with the real world. The AI & ML program here is genuinely cutting-edge.",
  },
  {
    image: "https://i.pravatar.cc/150?img=12",
    name: "Karthik Reddy",
    handle: "@karthikreddy_me",
    text: "The Mechanical department at BMSCE is outstanding. Great infrastructure, passionate faculty, and a culture that encourages innovation at every step.",
  },
  {
    image: "https://i.pravatar.cc/150?img=48",
    name: "Ananya Sharma",
    handle: "@ananya_sharma_ec",
    text: "I was nervous about college but BMSCE welcomed me with open arms. The student clubs and tech events made sure I was always learning and growing.",
  },
  {
    image: "https://i.pravatar.cc/150?img=15",
    name: "Vikram Bhat",
    handle: "@vikram_bhat_ise",
    text: "NAAC A++ and it really shows — the quality of education, campus life, and placement support here is unmatched in Bangalore. Proud to be a BMSCEian!",
  },
  {
    image: "https://i.pravatar.cc/150?img=46",
    name: "Divya Patel",
    handle: "@divya_p_civil",
    text: "BMSCE's legacy and reputation opened doors for me even before my final year. The alumni network is incredibly supportive and active.",
  },
  {
    image: "https://i.pravatar.cc/150?img=16",
    name: "Aditya Kulkarni",
    handle: "@aditya_k_ds",
    text: "Joined the Data Science program and couldn't be happier. Real projects, industry-relevant skills, and professors who are experts in their fields.",
  },
  {
    image: "https://i.pravatar.cc/150?img=44",
    name: "Meghna Subramanian",
    handle: "@meghna_sub_cse",
    text: "The campus culture at BMSCE is what sets it apart — collaborative, competitive in a healthy way, and always buzzing with exciting events.",
  },
];

const CheckBadge = () => (
  <svg className="fill-blue-500 shrink-0" width="14" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z"
    />
  </svg>
);

const Card = ({ card }) => (
  <div
    style={{ width: "288px", flexShrink: 0,}}
    className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div className="flex items-center gap-3 mb-3">
      <img
        src={card.image}
        alt={card.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-gray-900 truncate">{card.name}</span>
          <CheckBadge />
        </div>
        <span className="text-xs text-gray-400">{card.handle}</span>
      </div>
    </div>
    <p className="text-sm text-gray-700 leading-relaxed">{card.text}</p>
  </div>
);

// Card width (288) + margin (12*2) = 312px per card
const CARD_WIDTH = 312;

function MarqueeRow({ cards, reverse = false, speed = 60 }) {
  const CARD_BASE_WIDTH = 288;
  const GAP = 24; // This replaces your 12px + 12px margins
  const totalCardSpace = CARD_BASE_WIDTH + GAP;
  const oneSetWidth = cards.length * totalCardSpace;

  // We repeat the cards enough times to ensure no gaps on 4K screens
  const renderCards = [...cards, ...cards, ...cards, ...cards];
  
  const duration = oneSetWidth / speed;

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div
        className="flex w-max"
        style={{
          gap: `${GAP}px`, // Apply the gap here
          animation: `${reverse ? "marquee-rev" : "marquee-fwd"} ${duration}s linear infinite`,
        }}
      >
        {renderCards.map((card, i) => (
          <Card key={i} card={card} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-fwd {
          from { transform: translateX(0); }
          to { transform: translateX(-${oneSetWidth}px); }
        }
        @keyframes marquee-rev {
          from { transform: translateX(-${oneSetWidth}px); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function Alumni() {
  return (
    <div className="w-full bg-gray-50 py-10 overflow-hidden">
      <MarqueeRow cards={cardsData} reverse={false} speed={60} />
      <MarqueeRow cards={cardsData} reverse={true} speed={50} />
    </div>
  );
}
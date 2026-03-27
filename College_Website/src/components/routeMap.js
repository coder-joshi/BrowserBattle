/**
 * routeMap.js
 * ============
 * Single source of truth for all navigable routes on the BMSCE website.
 *
 * HOW TO EXTEND:
 *   1. Add a new entry to ROUTE_MAP with a unique key.
 *   2. Populate `keywords` with the terms users might say.
 *   3. That's it — the intent engine picks it up automatically.
 *
 * STRUCTURE:
 *   key          → internal identifier (also sent to Gemini as valid intent values)
 *   path         → react-router path to navigate to
 *   label        → human-readable page name (shown on suggestion cards)
 *   description  → one-liner shown on suggestion card subtitle
 *   icon         → emoji icon for the card UI
 *   keywords     → seed terms for local fuzzy matching (Gemini is the primary matcher)
 *   section      → optional anchor/hash to scroll to after navigation
 */

export const ROUTE_MAP = {
  // ── Home ──────────────────────────────────────────────────────────
  home: {
    path: "/",
    label: "Home",
    description: "BMSCE main home page",
    icon: "🏠",
    keywords: ["home", "main", "index", "bmsce", "college", "bms"],
  },

  // ── About ─────────────────────────────────────────────────────────
  about: {
    path: "/about",
    label: "About BMSCE",
    description: "History, vision, mission, and leadership",
    icon: "🏛️",
    keywords: ["about", "history", "founded", "established", "vision", "mission", "principal", "management", "bms educational trust"],
  },

  // ── Admissions ────────────────────────────────────────────────────
  admissions: {
    path: "/admissions",
    label: "Admissions",
    description: "Admission process, eligibility, and fee structure",
    icon: "📋",
    keywords: ["admission", "apply", "application", "eligibility", "cutoff", "rank", "kcet", "comedk", "fee", "seats", "intake", "enroll", "join", "how to get into"],
  },

  // ── Departments ───────────────────────────────────────────────────
  departments: {
    path: "/departments",
    label: "Departments",
    description: "All engineering departments at BMSCE",
    icon: "🏗️",
    keywords: ["department", "branch", "engineering", "all departments"],
  },

  "departments/civil": {
    path: "/departments/civil",
    label: "Civil Engineering",
    description: "Civil Engineering department overview",
    icon: "🏗️",
    keywords: ["civil", "civil engineering", "construction", "structural", "transportation engineering"],
  },

  "departments/mechanical": {
    path: "/departments/mechanical",
    label: "Mechanical Engineering",
    description: "Mechanical Engineering department overview",
    icon: "⚙️",
    keywords: ["mechanical", "mech", "thermal", "automobile", "manufacturing", "robotics", "machine"],
  },

  "departments/ece": {
    path: "/departments/ece",
    label: "Electronics & Communication Engineering",
    description: "ECE department overview",
    icon: "📡",
    keywords: ["electronics", "ece", "communication", "vlsi", "embedded", "signal processing"],
  },

  "departments/cse": {
    path: "/departments/cse",
    label: "Computer Science & Engineering",
    description: "CSE department overview",
    icon: "💻",
    keywords: ["computer science", "cse", "programming", "software", "coding", "computer"],
  },

  "departments/eee": {
    path: "/departments/eee",
    label: "Electrical & Electronics Engineering",
    description: "EEE department overview",
    icon: "⚡",
    keywords: ["electrical", "eee", "power systems", "electric", "electronics electrical"],
  },

  "departments/is": {
    path: "/departments/is",
    label: "Information Science & Engineering",
    description: "IS department overview",
    icon: "🖥️",
    keywords: ["information science", "is", "ise", "data science", "networks"],
  },

  "departments/aiml": {
    path: "/departments/aiml",
    label: "AI & Machine Learning",
    description: "AIML department overview",
    icon: "🤖",
    keywords: ["artificial intelligence", "machine learning", "aiml", "ai", "ml", "deep learning", "neural"],
  },

  "departments/aids": {
    path: "/departments/aids",
    label: "AI & Data Science",
    description: "AIDS department overview",
    icon: "📊",
    keywords: ["data science", "aids", "artificial intelligence data", "analytics"],
  },

  "departments/aerospace": {
    path: "/departments/aerospace",
    label: "Aerospace Engineering",
    description: "Aerospace Engineering department overview",
    icon: "✈️",
    keywords: ["aerospace", "aeronautical", "aviation", "aircraft", "space", "rocket"],
  },

  "departments/chemical": {
    path: "/departments/chemical",
    label: "Chemical Engineering",
    description: "Chemical Engineering department overview",
    icon: "🧪",
    keywords: ["chemical", "chemistry", "process", "biochemical"],
  },

  "departments/biotech": {
    path: "/departments/biotech",
    label: "Biotechnology",
    description: "Biotechnology department overview",
    icon: "🧬",
    keywords: ["biotechnology", "biotech", "biology", "genetics", "bioscience"],
  },

  "departments/iem": {
    path: "/departments/iem",
    label: "Industrial Engineering & Management",
    description: "IEM department overview",
    icon: "🏭",
    keywords: ["industrial engineering", "iem", "management engineering", "operations"],
  },

  // ── Placements ────────────────────────────────────────────────────
  placements: {
    path: "/placements",
    label: "Placements",
    description: "Placement statistics, recruiters, and packages",
    icon: "💼",
    keywords: ["placement", "job", "recruit", "salary", "package", "campus placement", "company", "hiring", "lpa", "offer"],
  },

  // ── Research ──────────────────────────────────────────────────────
  research: {
    path: "/research",
    label: "Research",
    description: "Research centers, publications, and projects",
    icon: "🔬",
    keywords: ["research", "publication", "project", "phd", "paper", "journal", "lab", "innovation", "patent"],
  },

  // ── Campus Life ───────────────────────────────────────────────────
  campuslife: {
    path: "/campuslife",
    label: "Campus Life",
    description: "Clubs, events, facilities, and hostel",
    icon: "🎓",
    keywords: ["campus", "hostel", "clubs", "events", "sports", "canteen", "library", "facilities", "fest", "cultural", "accommodation"],
  },

  // ── Students ──────────────────────────────────────────────────────
  students: {
    path: "/students",
    label: "Students",
    description: "Student resources, council, and activities",
    icon: "👩‍🎓",
    keywords: ["student", "council", "activities", "resources", "scholarship"],
  },

  // ── Alumni ────────────────────────────────────────────────────────
  alumni: {
    path: "/alumni",
    label: "Alumni",
    description: "Alumni network, notable graduates, and reunions",
    icon: "🤝",
    keywords: ["alumni", "graduate", "old students", "reunion", "network", "former students"],
  },

  // ── Contact ───────────────────────────────────────────────────────
  contact: {
    path: "/contact",
    label: "Contact Us",
    description: "Contact information, address, and enquiry form",
    icon: "📞",
    keywords: ["contact", "phone", "email", "address", "location", "reach", "enquiry", "map", "directions"],
  },
};

/**
 * Looks up a route entry by its key.
 * Returns null if the key is not found.
 * @param {string} intentKey
 * @returns {{ path: string, label: string, description: string, icon: string } | null}
 */
export function getRouteByIntent(intentKey) {
  return ROUTE_MAP[intentKey] ?? null;
}

/**
 * Returns all valid intent keys as a flat array.
 * Used when building the Gemini prompt so the model knows what values are legal.
 * @returns {string[]}
 */
export function getAllIntentKeys() {
  return Object.keys(ROUTE_MAP);
}

/**
 * Local keyword-based fallback matcher.
 * Used when Gemini is unavailable or returns low confidence.
 * Returns the best-matching route key, or null if no match found.
 * @param {string} userText
 * @returns {{ key: string, confidence: number } | null}
 */
export function localKeywordMatch(userText) {
  const lower = userText.toLowerCase();
  let bestKey = null;
  let bestScore = 0;

  for (const [key, route] of Object.entries(ROUTE_MAP)) {
    for (const keyword of route.keywords) {
      if (lower.includes(keyword)) {
        // Longer keyword matches are more precise → higher score
        const score = keyword.length;
        if (score > bestScore) {
          bestScore = score;
          bestKey = key;
        }
      }
    }
  }

  if (!bestKey) return null;

  // Normalise confidence: longer keyword = higher confidence, max ~0.75
  // (We cap local matches below 0.8 so they never auto-redirect — only Gemini can do that)
  const confidence = Math.min(0.4 + bestScore * 0.02, 0.75);
  return { key: bestKey, confidence };
}

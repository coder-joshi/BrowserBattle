/**
 * intentEngine.js
 * ================
 * Calls the Gemini API to detect the user's navigational intent.
 *
 * RETURNS one of three shapes:
 *
 *   { intent, target_page, confidence, answer }
 *     → Gemini understood a navigational intent.
 *       `answer`  = a short conversational reply (shown in chat before the card).
 *       `intent`  = one of the keys from ROUTE_MAP.
 *       `target_page` = the path string.
 *       `confidence`  = 0.0 – 1.0 (drives auto-redirect vs. suggestion card).
 *
 *   { intent: "chat_only", answer }
 *     → No navigation needed; answer the user in the chat bubble normally.
 *
 *   { intent: "error", answer }
 *     → Something went wrong; display the answer as a fallback chat message.
 */

import { getAllIntentKeys, getRouteByIntent, localKeywordMatch } from "./routeMap.js";

// ── Gemini model & endpoint ──────────────────────────────────────────────────
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL = (apiKey) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

// ── Prompt builder ───────────────────────────────────────────────────────────

/**
 * Builds the structured prompt we send to Gemini.
 * We ask for a JSON blob so we can parse it deterministically.
 *
 * @param {string} userMessage
 * @returns {string}
 */
function buildIntentPrompt(userMessage) {
  const validIntents = getAllIntentKeys().join(", ");

  return `
You are an AI navigation assistant for BMSCE (B.M.S. College of Engineering), Bangalore.
Your job is to understand what page or section of the website the user wants to visit,
AND provide a helpful conversational reply about that topic.

VALID INTENT KEYS (use EXACTLY one of these):
${validIntents}

USER MESSAGE: "${userMessage}"

TASK:
1. Determine if the user wants information that maps to a specific page on the website.
2. If yes:
   - Set "intent" to the most relevant key from the list above.
   - Set "confidence" between 0.0 and 1.0 (how sure you are this is the right page).
     * Use 0.85–1.0 only if the user is very explicitly asking for that page.
     * Use 0.5–0.84 if it's likely but not certain.
     * Use 0.0–0.49 if it's a weak match.
   - Write a short, friendly "answer" (1–3 sentences) about the topic.
     The answer should give the user a useful snippet of info AND mention
     that they can visit the page for full details.

3. If the user is asking a general question NOT tied to a specific page
   (e.g. "What year was BMSCE founded?", "Who is the principal?"),
   set "intent" to "chat_only" and write a complete answer.

4. If multiple pages could match, pick the SINGLE best one.

BMSCE CONTEXT (use when writing answers):
- Founded: 1946, Basavanagudi, Bangalore
- Ranked: NAAC A++, NBA accredited departments
- 12 departments: civil, mechanical, ece, cse, eee, is, aiml, aids, aerospace, chemical, biotech, iem
- Strong placement record; top recruiters include Google, Amazon, Microsoft, Infosys, TCS
- Facilities: library, hostel, sports complex, research centres

RESPOND WITH ONLY VALID JSON — no markdown fences, no extra text:
{
  "intent": "<intent_key or chat_only>",
  "confidence": <number 0.0–1.0>,
  "answer": "<conversational reply>"
}
`.trim();
}

// ── Main exported function ───────────────────────────────────────────────────

/**
 * Detects intent from the user's message using Gemini.
 * Falls back to local keyword matching if Gemini fails.
 *
 * @param {string} userMessage
 * @param {string} apiKey - Gemini API key (from import.meta.env.VITE_GEMINI_API_KEY)
 * @returns {Promise<{
 *   intent: string,
 *   target_page: string | null,
 *   confidence: number,
 *   answer: string,
 *   suggestions: Array<{ key: string, path: string, label: string, description: string, icon: string }> | null
 * }>}
 */
export async function detectIntent(userMessage, apiKey) {
  // ── 1. Call Gemini ─────────────────────────────────────────────────────────
  try {
    const response = await fetch(GEMINI_URL(apiKey), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: buildIntentPrompt(userMessage) }],
          },
        ],
        // Ask Gemini to respond in JSON mode for reliable parsing
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2, // Low temperature → more deterministic intent classification
        },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || `Gemini HTTP ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // ── 2. Parse JSON from Gemini ──────────────────────────────────────────
    let parsed;
    try {
      // Strip any accidental markdown fences Gemini might include
      const cleaned = rawText.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.warn("[intentEngine] JSON parse failed, raw:", rawText);
      throw new Error("Gemini returned non-JSON response");
    }

    const { intent, confidence = 0.5, answer } = parsed;

    // ── 3. chat_only path ──────────────────────────────────────────────────
    if (intent === "chat_only" || !intent) {
      return {
        intent: "chat_only",
        target_page: null,
        confidence: 1.0,
        answer: answer || "I'm here to help! Could you rephrase your question?",
        suggestions: null,
      };
    }

    // ── 4. Validate intent key ─────────────────────────────────────────────
    const route = getRouteByIntent(intent);
    if (!route) {
      console.warn("[intentEngine] Unknown intent key from Gemini:", intent);
      return {
        intent: "chat_only",
        target_page: null,
        confidence: 0,
        answer: answer || "I wasn't sure which page to suggest. Could you be more specific?",
        suggestions: null,
      };
    }

    // ── 5. Build suggestion list ───────────────────────────────────────────
    // Primary suggestion (always included)
    const suggestions = [
      {
        key: intent,
        path: route.path,
        label: route.label,
        description: route.description,
        icon: route.icon,
      },
    ];

    return {
      intent,
      target_page: route.path,
      confidence,
      answer,
      suggestions,
    };
  } catch (geminiError) {
    console.warn("[intentEngine] Gemini failed, using local fallback:", geminiError.message);

    // ── 6. Local keyword fallback ──────────────────────────────────────────
    const localMatch = localKeywordMatch(userMessage);

    if (localMatch) {
      const route = getRouteByIntent(localMatch.key);
      return {
        intent: localMatch.key,
        target_page: route.path,
        confidence: localMatch.confidence, // Always ≤ 0.75, so never auto-redirects
        answer: `I found some information about ${route.label}. You can visit the page for full details.`,
        suggestions: [
          {
            key: localMatch.key,
            path: route.path,
            label: route.label,
            description: route.description,
            icon: route.icon,
          },
        ],
      };
    }

    // ── 7. Complete fallback: plain error message ─────────────────────────
    return {
      intent: "error",
      target_page: null,
      confidence: 0,
      answer: `I'm having trouble connecting right now. Please try again, or navigate using the menu above. (Error: ${geminiError.message})`,
      suggestions: null,
    };
  }
}

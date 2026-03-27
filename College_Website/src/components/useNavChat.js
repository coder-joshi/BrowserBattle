/**
 * useNavChat.js
 * ==============
 * Custom React hook that manages:
 *   - Chat message history
 *   - Intent detection via Gemini
 *   - Navigation decisions (auto-redirect vs. suggestion card)
 *   - Highlight state after navigation
 *
 * Used by: SmartChatbot.jsx
 *
 * MESSAGE SHAPE:
 * {
 *   id:          string  — unique ID for React key
 *   sender:      "user" | "bot"
 *   text:        string  — chat bubble text
 *   suggestion:  NavigationSuggestion | null
 *   timestamp:   number
 * }
 *
 * NAVIGATION SUGGESTION SHAPE:
 * {
 *   key:         string  — route map key
 *   path:        string  — URL path
 *   label:       string  — human-readable page name
 *   description: string  — subtitle for the card
 *   icon:        string  — emoji
 * }
 */

import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { detectIntent } from "./intentEngine.js";

// Confidence threshold above which we auto-redirect instead of showing a card
const AUTO_REDIRECT_THRESHOLD = 0.8;

// How long (ms) to keep the page highlight active after navigation
const HIGHLIGHT_DURATION_MS = 3000;

// ── Helper: generate a simple unique ID ─────────────────────────────────────
let _idCounter = 0;
function uid() {
  return `msg_${Date.now()}_${_idCounter++}`;
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useNavChat() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      id: uid(),
      sender: "bot",
      text: "Hi! I'm the BMSCE Smart Assistant 🎓\nAsk me anything about admissions, departments, placements, or campus life — I'll answer and take you to the right page!",
      suggestion: null,
      timestamp: Date.now(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [highlightPath, setHighlightPath] = useState(null); // path of the highlighted page

  // Stable ref for the auto-redirect timer so we can cancel if needed
  const redirectTimerRef = useRef(null);

  // ── Internal: append a message to state ───────────────────────────────────
  const addMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, { id: uid(), timestamp: Date.now(), ...msg }]);
  }, []);

  // ── Internal: perform the actual navigation + highlight ───────────────────
  const navigateTo = useCallback(
    (path, label) => {
      navigate(path);

      // Activate highlight (consumed by Navbar / page via context or URL hash)
      setHighlightPath(path);
      setTimeout(() => setHighlightPath(null), HIGHLIGHT_DURATION_MS);

      // Toast-style confirmation message in chat
      addMessage({
        sender: "bot",
        text: `✅ Taking you to the ${label} page…`,
        suggestion: null,
      });
    },
    [navigate, addMessage]
  );

  // ── Main send handler — called when user submits a message ────────────────
  const handleSend = useCallback(
    async (e) => {
      e?.preventDefault();
      const trimmed = input.trim();
      if (!trimmed || isTyping) return;

      // Clear input immediately for snappy UX
      setInput("");

      // 1. Append user message
      addMessage({ sender: "user", text: trimmed, suggestion: null });
      setIsTyping(true);

      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) throw new Error("VITE_GEMINI_API_KEY is not set in your .env file.");

        // 2. Call intent engine
        const result = await detectIntent(trimmed, apiKey);

        // 3. Route on intent type
        if (result.intent === "chat_only" || result.intent === "error") {
          // Pure conversational reply — no navigation
          addMessage({ sender: "bot", text: result.answer, suggestion: null });
          return;
        }

        // 4. We have a navigational intent
        const primarySuggestion = result.suggestions?.[0] ?? null;

        if (result.confidence >= AUTO_REDIRECT_THRESHOLD && primarySuggestion) {
          // HIGH CONFIDENCE → show answer + auto-redirect after a short pause
          addMessage({
            sender: "bot",
            text: result.answer,
            suggestion: null,
          });

          // Slight delay so the user reads the answer before being whisked away
          redirectTimerRef.current = setTimeout(() => {
            navigateTo(primarySuggestion.path, primarySuggestion.label);
          }, 1400);
        } else if (primarySuggestion) {
          // LOWER CONFIDENCE → show answer + suggestion card; user decides
          addMessage({
            sender: "bot",
            text: result.answer,
            suggestion: primarySuggestion,
          });
        } else {
          // Safety net
          addMessage({ sender: "bot", text: result.answer, suggestion: null });
        }
      } catch (error) {
        console.error("[useNavChat] handleSend error:", error);
        addMessage({
          sender: "bot",
          text: `⚠️ ${error.message}`,
          suggestion: null,
        });
      } finally {
        setIsTyping(false);
      }
    },
    [input, isTyping, addMessage, navigateTo]
  );

  // ── Called when user clicks "Visit Page" on a suggestion card ────────────
  const handleSuggestionAccept = useCallback(
    (suggestion) => {
      navigateTo(suggestion.path, suggestion.label);
    },
    [navigateTo]
  );

  // ── Called when user dismisses a suggestion card ──────────────────────────
  const handleSuggestionDismiss = useCallback(
    (messageId) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, suggestion: null } : m))
      );
    },
    []
  );

  return {
    // State
    messages,
    input,
    isTyping,
    highlightPath,

    // Actions
    setInput,
    handleSend,
    handleSuggestionAccept,
    handleSuggestionDismiss,
  };
}

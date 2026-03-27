/**
 * SmartChatbot.jsx
 * =================
 * Drop-in replacement for the original chatbot.jsx.
 * Adds AI-powered navigation on top of the existing Gemini chat.
 *
 * ARCHITECTURE:
 *   SmartChatbot
 *     └── useNavChat (hook)          — all state & logic
 *           ├── detectIntent()       — Gemini + local fallback
 *           └── react-router navigate()
 *     └── ChatMessage (inline)      — renders a single chat bubble
 *     └── NavigationCard            — suggestion card with Visit Page button
 *
 * USAGE (App.jsx — no other changes needed):
 *   import SmartChatbot from "./components/SmartChatbot";
 *   ...
 *   <SmartChatbot />
 *
 * ENVIRONMENT:
 *   VITE_GEMINI_API_KEY must be set in College_Website/.env
 */

import React, { useRef, useEffect } from "react";
import { useNavChat } from "./useNavChat.js";
import NavigationCard from "./NavigationCard.jsx";
import { useState } from "react";

// ── ChatMessage ───────────────────────────────────────────────────────────────
/**
 * Renders a single message bubble (user or bot).
 * Bot messages may carry a NavigationCard suggestion.
 */
function ChatMessage({ msg, onAccept, onDismiss }) {
  const isUser = msg.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] ${
          isUser ? "items-end" : "items-start"
        } flex flex-col gap-1`}
      >
        {/* Text bubble */}
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
          }`}
        >
          {msg.text}
        </div>

        {/* Navigation suggestion card (bot messages only) */}
        {!isUser && msg.suggestion && (
          <div className="w-full">
            <NavigationCard
              suggestion={msg.suggestion}
              messageId={msg.id}
              onAccept={onAccept}
              onDismiss={onDismiss}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ── TypingIndicator ────────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1 items-center">
        {[0, 0.2, 0.4].map((delay, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── SmartChatbot ──────────────────────────────────────────────────────────────
export default function SmartChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const {
    messages,
    input,
    isTyping,
    setInput,
    handleSend,
    handleSuggestionAccept,
    handleSuggestionDismiss,
  } = useNavChat();

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {/* ── Chat Window ────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-4"
          style={{ height: "520px" }}
          role="dialog"
          aria-label="BMSCE Smart Assistant"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none">BMSCE Smart Assistant</h3>
                <p className="text-[10px] text-blue-100 mt-1">
                  AI-powered navigation ✨
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="hover:bg-white/10 p-1 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Quick-access chips — common queries */}
          <div className="flex gap-1.5 px-3 pt-2 pb-1 flex-wrap flex-shrink-0 bg-gray-50 border-b border-gray-100">
            {[
              { label: "Admissions", query: "How do I apply for admission?" },
              { label: "Placements", query: "Tell me about placements" },
              { label: "Departments", query: "What departments are available?" },
              { label: "Campus Life", query: "Tell me about campus life and hostel" },
            ].map((chip) => (
              <button
                key={chip.label}
                onClick={() => {
                  // Directly set input and trigger send
                  const fakeEvent = { preventDefault: () => {} };
                  // We set the input in a micro-task so the hook sees the updated value
                  setInput(chip.query);
                  // Let React flush, then trigger send via a small timeout
                  setTimeout(() => {
                    const form = document.getElementById("smart-chat-form");
                    form?.requestSubmit();
                  }, 50);
                }}
                className="text-[10px] bg-white border border-blue-200 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-50 transition-colors font-medium"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto bg-[#f8f9fc] flex flex-col gap-3">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                msg={msg}
                onAccept={handleSuggestionAccept}
                onDismiss={handleSuggestionDismiss}
              />
            ))}

            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <form
            id="smart-chat-form"
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-gray-100 flex gap-2 flex-shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              disabled={isTyping}
              aria-label="Type your message"
              className="flex-1 bg-white/90 text-gray-900 placeholder-gray-400 text-sm rounded-xl px-4 py-2.5 border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* ── Floating toggle button ─────────────────────────────────── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open BMSCE Smart Assistant"
          className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all duration-300 relative group"
        >
          {/* "New" notification dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse" />
          <svg
            className="w-8 h-8 group-hover:rotate-12 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

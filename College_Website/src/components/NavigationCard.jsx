/**
 * NavigationCard.jsx
 * ===================
 * Rendered inside a chat bubble when Gemini detects a navigational intent
 * but confidence is below the auto-redirect threshold (< 0.8).
 *
 * PROPS:
 *   suggestion  — { key, path, label, description, icon }
 *   messageId   — parent message ID (used to dismiss the card)
 *   onAccept    — fn(suggestion) — user clicked "Visit Page"
 *   onDismiss   — fn(messageId) — user clicked the ✕ dismiss button
 */

import React from "react";

export default function NavigationCard({ suggestion, messageId, onAccept, onDismiss }) {
  if (!suggestion) return null;

  return (
    <div
      className="mt-2 rounded-xl border border-blue-200 bg-blue-50 overflow-hidden shadow-sm"
      role="region"
      aria-label={`Navigate to ${suggestion.label}`}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-3 py-2 bg-blue-100">
        <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest">
          📍 Suggested Page
        </span>
        <button
          onClick={() => onDismiss(messageId)}
          aria-label="Dismiss suggestion"
          className="text-blue-400 hover:text-blue-700 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Card body */}
      <div className="px-3 py-2.5 flex items-center gap-3">
        {/* Icon */}
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm flex-shrink-0">
          {suggestion.icon}
        </div>

        {/* Text info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-800 leading-tight truncate">
            {suggestion.label}
          </p>
          <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">
            {suggestion.description}
          </p>
        </div>
      </div>

      {/* CTA button */}
      <div className="px-3 pb-3">
        <button
          onClick={() => onAccept(suggestion)}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold py-2 rounded-lg transition-all duration-150 flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Visit Page</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

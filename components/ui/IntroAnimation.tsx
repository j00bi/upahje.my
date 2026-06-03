"use client";

import { useEffect, useState } from "react";

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("upahje-intro-seen");

    // Always show content immediately - no blocking
    document.documentElement.removeAttribute('data-intro');

    if (hasSeenIntro) {
      setVisible(false);
      return;
    }

    sessionStorage.setItem("upahje-intro-seen", "true");

    // Quick fade out after 300ms (just enough to show logo registered)
    const fadeTimer = setTimeout(() => {
      setOpacity(0);
    }, 300);

    // Remove from DOM after fade animation
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300"
      style={{
        backgroundColor: '#ffffff',
        opacity: opacity,
        pointerEvents: opacity === 0 ? 'none' : 'auto',
      }}
    >
      {/* Static SVG logo - instant load, no video */}
      <div className="w-40 h-40 flex items-center justify-center">
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simple "U" letter mark */}
          <rect
            x="20"
            y="20"
            width="80"
            height="80"
            rx="16"
            fill="#1a8a4e"
          />
          <text
            x="60"
            y="78"
            textAnchor="middle"
            fill="white"
            fontFamily="system-ui, sans-serif"
            fontSize="48"
            fontWeight="bold"
          >
            U
          </text>
        </svg>
      </div>
    </div>
  );
}

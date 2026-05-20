"use client";

import { useEffect, useState } from "react";

export default function IntroAnimation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("upahje-intro-seen");

    if (!hasSeenIntro) {
      setShow(true);
      sessionStorage.setItem("upahje-intro-seen", "true");

      const timer = setTimeout(() => setShow(false), 2800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f5f5f4]">
      <video
        src="/upahje-logo-animation.mp4"
        autoPlay
        muted
        playsInline
        className="w-56 h-56 object-contain mix-blend-multiply"
        onEnded={() => setShow(false)}
      />
    </div>
  );
}

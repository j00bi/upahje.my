"use client";

import { useEffect, useState } from "react";

export default function IntroAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("upahje-intro-seen");

    if (hasSeenIntro) {
      document.documentElement.removeAttribute('data-intro');
      setShow(false);
      return;
    }

    sessionStorage.setItem("upahje-intro-seen", "true");

    const timer = setTimeout(() => {
      document.documentElement.removeAttribute('data-intro');
      setShow(false);
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.documentElement.removeAttribute('data-intro');
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: '#ffffff',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <video
        src="/upahje-logo-animation.mp4"
        autoPlay
        muted
        playsInline
        className="w-56 h-56 object-contain"
        onEnded={() => {
          document.documentElement.removeAttribute('data-intro');
          setShow(false);
        }}
      />
    </div>
  );
}

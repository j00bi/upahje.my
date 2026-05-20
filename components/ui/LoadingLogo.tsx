export function LoadingLogo() {
  return (
    <div className="flex items-center justify-center bg-[#f8f8f8]">
      <video
        src="/upahje-logo-animation.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-24 h-24 object-contain mix-blend-multiply"
      />
    </div>
  );
}

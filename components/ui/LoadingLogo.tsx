export function LoadingLogo() {
  return (
    <div className="flex items-center justify-center" style={{ backgroundColor: '#f9f9f9' }}>
      <video
        src="/upahje-logo-animation.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-24 h-24 object-contain"
      />
    </div>
  );
}

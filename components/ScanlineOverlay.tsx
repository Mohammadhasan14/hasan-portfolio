export default function ScanlineOverlay() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 90,
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          height: 120,
          pointerEvents: "none",
          zIndex: 91,
          background:
            "linear-gradient(180deg, transparent, rgba(255,77,90,0.03), transparent)",
          animation: "scanMove 9s linear infinite",
        }}
      />
    </>
  );
}

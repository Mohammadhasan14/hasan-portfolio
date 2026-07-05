"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const enabled = window.matchMedia("(pointer: fine)").matches;
    document.body.style.cursor = enabled ? "none" : "";
    if (!enabled) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hot = target.closest && target.closest("a, button");
      ring.style.width = hot ? "52px" : "34px";
      ring.style.height = hot ? "52px" : "34px";
      ring.style.borderColor = hot ? "var(--ac, #ff4d5a)" : "rgba(255,255,255,0.45)";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    let raf: number;
    const loop = () => {
      dot.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%) rotate(45deg)`;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 6,
          height: 6,
          background: "var(--ac, #ff4d5a)",
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%) rotate(45deg)",
          boxShadow: "0 0 8px rgba(255,77,90,0.7)",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: 34,
          height: 34,
          border: "1px solid rgba(255,255,255,0.45)",
          zIndex: 9998,
          pointerEvents: "none",
          transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: -1,
            left: -1,
            width: 7,
            height: 7,
            borderTop: "1px solid var(--ac, #ff4d5a)",
            borderLeft: "1px solid var(--ac, #ff4d5a)",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: -1,
            right: -1,
            width: 7,
            height: 7,
            borderBottom: "1px solid var(--ac, #ff4d5a)",
            borderRight: "1px solid var(--ac, #ff4d5a)",
          }}
        />
      </div>
    </>
  );
}

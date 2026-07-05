"use client";

import { useEffect, useState } from "react";

function formatUtc(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
}

export function useClock() {
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const timer = setInterval(() => setClock(formatUtc(new Date())), 1000);
    return () => clearInterval(timer);
  }, []);

  return clock;
}

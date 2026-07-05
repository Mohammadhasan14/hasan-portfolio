"use client";

import { useClock } from "@/hooks/useClock";

export default function SessionClock() {
  const clock = useClock();
  return <span>v2.0.26 / SESSION {clock}</span>;
}

"use client";

import { useClock } from "@/hooks/useClock";

export default function Clock() {
  const clock = useClock();
  return <span>{clock} UTC</span>;
}

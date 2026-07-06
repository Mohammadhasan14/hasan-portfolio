"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export default function AnimatedNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const numeric = match ? parseFloat(match[1]) : null;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(
    numeric === null ? value : (0).toFixed(decimals)
  );

  useEffect(() => {
    if (!inView || numeric === null) return;
    if (reduceMotion) {
      setDisplay(numeric.toFixed(decimals));
      return;
    }
    const controls = animate(0, numeric, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, numeric, decimals, reduceMotion]);

  if (numeric === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

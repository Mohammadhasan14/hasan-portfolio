"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = [
  "MERN Stack Developer",
  "Shopify App Developer",
  "React Native Engineer",
  "SaaS & Real-Time Systems Builder",
];

export default function TypingText() {
  const [typed, setTyped] = useState("");
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  const holdUntil = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const word = ROLES[roleIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        if (charIdx.current >= word.length) {
          deleting.current = true;
          holdUntil.current = Date.now() + 1800;
        }
      } else {
        if (holdUntil.current && Date.now() < holdUntil.current) {
          // pause
        } else {
          holdUntil.current = null;
          charIdx.current -= 2;
          if (charIdx.current <= 0) {
            charIdx.current = 0;
            deleting.current = false;
            roleIdx.current = (roleIdx.current + 1) % ROLES.length;
          }
        }
      }
      setTyped(word.slice(0, Math.max(0, charIdx.current)));
    };

    const timer = setInterval(tick, 65);
    return () => clearInterval(timer);
  }, []);

  return <>{typed}</>;
}

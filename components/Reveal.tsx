"use client";

import { useEffect, useRef } from "react";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

export default function Reveal<T extends ElementType = "div">({
  as,
  ...props
}: RevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(26px)";
    el.style.transition = "opacity 0.7s ease-out, transform 0.7s ease-out";

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  return <Component ref={ref} {...props} />;
}

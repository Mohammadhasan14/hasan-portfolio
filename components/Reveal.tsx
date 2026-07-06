"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ComponentPropsWithoutRef, ElementType } from "react";

export type RevealEffect =
  | "fade-up"
  | "fade"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "blur";

const EFFECTS: Record<RevealEffect, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 16 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

type RevealOwnProps = {
  effect?: RevealEffect;
  delay?: number;
  duration?: number;
};

type RevealProps<T extends ElementType> = RevealOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as" | keyof RevealOwnProps>;

export default function Reveal<T extends ElementType = "div">({
  as,
  effect = "fade-up",
  delay = 0,
  duration = 0.7,
  ...props
}: RevealProps<T>) {
  const reduceMotion = useReducedMotion();
  const tag = as ?? "div";

  if (reduceMotion) {
    const Static = tag as ElementType;
    return <Static {...(props as Record<string, unknown>)} />;
  }

  const MotionTag = tag === "a" ? motion.a : motion.div;

  return (
    <MotionTag
      variants={EFFECTS[effect]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      {...(props as Record<string, unknown>)}
    />
  );
}

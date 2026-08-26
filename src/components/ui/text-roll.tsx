"use client";

import { motion } from "motion/react";

export function TextRoll({ text = "Neue Montreal" }: { text?: string }) {
  return (
    <p className="whitespace-nowrap font-neue-montreal text-center text-[clamp(3.5rem,10vw,11rem)] font-medium leading-none tracking-[-0.065em] text-branco" aria-label={text}>
      {text.split("").map((letter, index) => (
        <span key={`${letter}-${index}`} className="relative inline-block [perspective:1200px]">
          <motion.span
            className="inline-block"
            animate={{ rotateX: [0, 90, 0], opacity: [1, 0.25, 1], y: [0, -16, 0] }}
            transition={{ duration: 3.6, delay: index * 0.11, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 1.2 }}
            style={{ transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
          >
            {letter === " " ? " " : letter}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

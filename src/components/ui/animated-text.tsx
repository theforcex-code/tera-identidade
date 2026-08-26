"use client";

import { useEffect, useRef } from "react";

type AnimatedTextProps = {
  text: string;
  duration?: number;
  delayMultiplier?: number;
};

const WEIGHTS = [300, 400, 500, 700, 500, 400] as const;

export function AnimatedText({
  text,
  duration = 3.2,
  delayMultiplier = 0.14,
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const spans = containerRef.current?.querySelectorAll("span") ?? [];
    spans.forEach((span, index) => {
      const offset = index - (spans.length - 1) / 2;
      (span as HTMLElement).style.animationDelay = `${offset * delayMultiplier}s`;
    });
  }, [delayMultiplier, text]);

  return (
    <p
      ref={containerRef}
      aria-label={text}
      className="whitespace-nowrap font-neue-montreal text-[clamp(2.4rem,7.3vw,8rem)] leading-none tracking-[-0.06em] text-branco"
    >
      {text.split("").map((character, index) => {
        const weight = WEIGHTS[index % WEIGHTS.length];
        const width = index % 2 === 0 ? 1.16 : 0.86;
        return (
          <span
            key={`${character}-${index}`}
            aria-hidden="true"
            className="inline-block animate-[neue-breathe_3.2s_alternate_infinite]"
            style={{
              animationDuration: `${duration}s`,
              ["--neue-weight" as string]: weight,
              ["--neue-width" as string]: width,
            }}
          >
            {character === " " ? " " : character}
          </span>
        );
      })}
    </p>
  );
}

"use client";

import { useMemo, useState } from "react";

const WEIGHTS = [
  { label: "Light", value: 300 },
  { label: "Regular", value: 400 },
  { label: "Medium", value: 500 },
  { label: "Bold", value: 700 },
] as const;

export function NeueMontrealExplorer() {
  const [text, setText] = useState("Neue Montreal");
  const [weight, setWeight] = useState<(typeof WEIGHTS)[number]["value"]>(500);
  const [uppercase, setUppercase] = useState(false);
  const [scale, setScale] = useState(100);
  const [width, setWidth] = useState(100);
  const [slant, setSlant] = useState(0);

  const preview = useMemo(
    () => (uppercase ? text.toUpperCase() : text.toLowerCase()),
    [text, uppercase],
  );

  function reset() {
    setText("Neue Montreal");
    setWeight(500);
    setUppercase(false);
    setScale(100);
    setWidth(100);
    setSlant(0);
  }

  return (
    <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] md:mt-20">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-8">
        <p className="font-univers text-[10px] uppercase tracking-[0.28em] text-branco/45">
          Laboratório tipográfico
        </p>
        <button
          type="button"
          onClick={reset}
          className="font-univers text-[10px] uppercase tracking-[0.2em] text-branco/50 transition-colors hover:text-branco focus-visible:outline focus-visible:outline-1 focus-visible:outline-branco"
        >
          Redefinir
        </button>
      </div>

      <div className="min-h-[360px] overflow-hidden px-6 py-16 md:min-h-[460px] md:px-12 md:py-24">
        <p
          className="origin-center break-words font-neue-montreal text-center text-[clamp(3.75rem,10vw,10rem)] leading-[0.84] tracking-[-0.06em] text-branco will-change-transform"
          style={{
            fontWeight: weight,
            transform: `scale(${scale / 100}) scaleX(${width / 100}) skewX(${slant}deg)`,
          }}
        >
          {preview || "Neue Montreal"}
        </p>
      </div>

      <div className="grid border-t border-white/10 md:grid-cols-[1.3fr_1fr]">
        <label className="flex min-h-24 flex-col justify-center border-b border-white/10 px-6 py-5 md:border-b-0 md:border-r md:px-8">
          <span className="font-univers text-[10px] uppercase tracking-[0.24em] text-branco/45">
            Texto
          </span>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            aria-label="Texto de demonstração"
            className="mt-2 w-full bg-transparent font-neue-montreal text-xl font-medium text-branco outline-none placeholder:text-branco/30"
            placeholder="Neue Montreal"
          />
        </label>

        <div className="flex min-h-24 items-center justify-between gap-4 px-6 py-5 md:px-8">
          <span className="font-univers text-[10px] uppercase tracking-[0.24em] text-branco/45">
            Caixa
          </span>
          <div className="flex rounded-full border border-white/15 p-1">
            <button
              type="button"
              onClick={() => setUppercase(false)}
              aria-pressed={!uppercase}
              className={`rounded-full px-3 py-1.5 font-neue-montreal text-sm transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-branco ${
                !uppercase ? "bg-branco text-preto" : "text-branco/55 hover:text-branco"
              }`}
            >
              Aa
            </button>
            <button
              type="button"
              onClick={() => setUppercase(true)}
              aria-pressed={uppercase}
              className={`rounded-full px-3 py-1.5 font-neue-montreal text-sm transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-branco ${
                uppercase ? "bg-branco text-preto" : "text-branco/55 hover:text-branco"
              }`}
            >
              AA
            </button>
          </div>
        </div>
      </div>

      <div className="grid divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
        <div className="px-6 py-5 md:px-8">
          <p className="font-univers text-[10px] uppercase tracking-[0.24em] text-branco/45">Peso</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {WEIGHTS.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setWeight(item.value)}
                aria-pressed={weight === item.value}
                className={`rounded-full border px-3 py-1 font-neue-montreal text-sm transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-branco ${
                  weight === item.value
                    ? "border-branco bg-branco text-preto"
                    : "border-white/15 text-branco/60 hover:border-white/45 hover:text-branco"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <RangeControl label="Escala" value={scale} min={70} max={130} suffix="%" onChange={setScale} />
        <RangeControl label="Largura" value={width} min={75} max={125} suffix="%" onChange={setWidth} />
        <RangeControl label="Inclinação" value={slant} min={-12} max={12} suffix="°" onChange={setSlant} />
      </div>
    </div>
  );
}

function RangeControl({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block px-6 py-5 md:px-8">
      <span className="flex items-center justify-between font-univers text-[10px] uppercase tracking-[0.24em] text-branco/45">
        {label}
        <span className="text-branco/75">{value}{suffix}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
        className="mt-5 h-px w-full cursor-ew-resize appearance-none bg-white/25 accent-white"
      />
    </label>
  );
}

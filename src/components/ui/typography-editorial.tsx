"use client";

import { AnimatedText } from "@/components/ui/animated-text";
import { TextRoll } from "@/components/ui/text-roll";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789.,:;!?@#%&/()[]{}+-=*";

const PRIMARY_WEIGHTS = [
  { name: "Light", className: "font-light" },
  { name: "Regular", className: "font-normal" },
  { name: "Bold", className: "font-bold" },
] as const;

const MONO_WEIGHTS = [
  { name: "Book", className: "font-normal" },
  { name: "Regular", className: "font-normal" },
  { name: "Bold", className: "font-bold" },
] as const;

export function TypographyEditorial() {
  return (
    <>
      <SpecimenBoard
        title="PP Neue Montreal"
        metadata={[
          "Pangram Pangram",
          "Mat Desjardins",
          "2018",
          "Tipografia principal",
        ]}
        weights={PRIMARY_WEIGHTS}
        fontClass="font-neue-montreal"
        boardLabel="PP Neue Montreal — tipografia principal"
      />

      <SpecimenBoard
        title="PP Neue Montreal Mono"
        metadata={[
          "Pangram Pangram",
          "Largura fixa",
          "Dados e informação",
          "Tipografia secundária",
        ]}
        weights={MONO_WEIGHTS}
        fontClass="font-neue-montreal-mono"
        boardLabel="PP Neue Montreal Mono — tipografia secundária"
        mono
      />

      <section className="type-motion-board" aria-labelledby="type-motion-title">
        <header className="type-motion-board__head">
          <p>Tipografia em movimento</p>
          <p>03 / 03</p>
        </header>
        <h2 id="type-motion-title" className="sr-only">Movimentos da tipografia Neue Montreal</h2>
        <div className="type-motion-board__grid">
          <div className="type-motion-board__cell type-motion-board__cell--roll">
            <p className="type-motion-board__label">Ritmo / sequência</p>
            <TextRoll text="Neue Montreal" />
          </div>
          <div className="type-motion-board__cell type-motion-board__cell--weight">
            <p className="type-motion-board__label">Peso / largura</p>
            <AnimatedText text="TÉRA" duration={4.2} delayMultiplier={0.18} />
          </div>
          <figure className="type-motion-board__cell type-motion-board__cell--gif">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/continuidade-tipografia-motion.gif"
              alt="Neue Montreal se estende e se contrai em movimento"
            />
            <figcaption className="type-motion-board__label">Forma / continuidade</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}

function SpecimenBoard({
  title,
  metadata,
  weights,
  fontClass,
  boardLabel,
  mono = false,
}: {
  title: string;
  metadata: readonly string[];
  weights: readonly { name: string; className: string }[];
  fontClass: string;
  boardLabel: string;
  mono?: boolean;
}) {
  return (
    <section className="type-specimen-board" aria-label={boardLabel}>
      <header className="type-specimen-board__head">
        <h2 className={fontClass}>{title}</h2>
        <div className="type-specimen-board__metadata">
          {metadata.map((item) => <p key={item}>{item}</p>)}
        </div>
      </header>

      <div className="type-specimen-board__weights">
        {weights.map((weight) => (
          <article key={weight.name} className="type-specimen-board__weight">
            <h3 className={`${fontClass} ${weight.className}`}>{weight.name}</h3>
            <div className={`${fontClass} ${weight.className} type-specimen-board__charset`}>
              <p>{ALPHABET}</p>
              <p>{LOWERCASE}</p>
              <p>{NUMBERS}</p>
            </div>
            <p className={`${fontClass} ${weight.className} type-specimen-board__sample`}>
              {mono ? "T É R A" : "Aa"}
            </p>
          </article>
        ))}
      </div>

      {mono && (
        <div className="type-specimen-board__mono-proof" aria-label="Prova de largura fixa">
          <span>MMMM</span>
          <span>iiii</span>
          <span>0000</span>
          <p>Todos os caracteres ocupam a mesma largura.</p>
        </div>
      )}
    </section>
  );
}

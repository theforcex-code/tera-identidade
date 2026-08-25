"use client";

import { TIERS, type NodeDef } from "@/lib/mindmap-data";
import { useContent } from "@/components/content-provider";
import { EditableImage, EditOverlay } from "@/components/editable";

/* ------------------------------------------------------------------
   MAPA MENTAL TÉRA — diagrama em níveis (tiers)
   Fluxo vertical, alinhado e limpo: cada nível é uma linha centrada,
   conectada ao próximo por um traço reto. Sem linhas curvas cruzando.
   As imagens e textos de cada nó são editáveis no localhost (dev).
------------------------------------------------------------------- */

function Connector() {
  return (
    <div className="flex justify-center py-6 md:py-8" aria-hidden>
      <div className="h-14 w-px bg-white/20 md:h-20" />
    </div>
  );
}

// Nó da capa: wordmark "téra" (SVG preto) contido, invertido pra branco no
// tile escuro — sem overlay redundante. Continua editável.
function TeraMark({
  id,
  defaultSrc,
  label,
}: {
  id: string;
  defaultSrc: string;
  label: string;
}) {
  const { content } = useContent();
  const src = content.mindmap[id]?.img || defaultSrc;
  return (
    <div className="relative flex h-full w-full items-center justify-center p-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} className="h-auto w-full object-contain invert" />
      <EditOverlay group="mindmap" id={id} />
    </div>
  );
}

function Node({ n }: { n: NodeDef }) {
  const { content } = useContent();
  const ov = content.mindmap[n.id];
  const label = ov?.label ?? n.label;
  const desc = ov?.desc ?? n.desc;

  // Nó só de texto: título de maior importância, sem miniatura.
  if (n.noImage) {
    return (
      <div className="flex max-w-xl flex-col items-center px-4 text-center">
        <h3 className="font-univers text-3xl font-light leading-tight tracking-tight text-branco md:text-5xl">
          {label}
        </h3>
        {desc && (
          <div className="mt-3 max-w-md font-univers text-base leading-snug text-branco/60">
            {desc}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex w-52 flex-col items-center text-center md:w-64">
      <div className="relative h-32 w-32 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.9)] md:h-44 md:w-44">
        {n.id === "tera" ? (
          <TeraMark id={n.id} defaultSrc={n.img} label={label} />
        ) : (
          <EditableImage
            group="mindmap"
            id={n.id}
            defaultSrc={n.img}
            alt={label}
            grayscale
          />
        )}
      </div>
      {!n.hideLabel && label && (
        <div
          className={`mt-4 font-univers leading-tight ${
            n.milestone
              ? "text-2xl font-light tracking-tight text-branco md:text-3xl"
              : "text-base text-branco/80 md:text-lg"
          }`}
        >
          {label}
        </div>
      )}
      {desc && (
        <div className="mt-2 max-w-[240px] font-univers text-sm leading-snug text-branco/55">
          {desc}
        </div>
      )}
    </div>
  );
}

export function MindMap() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      {TIERS.map((tier, i) => {
        const lead = tier.find((n) => n.lead)?.lead;
        return (
          <div key={i}>
            {i > 0 && <Connector />}
            {lead && (
              <p className="mx-auto max-w-2xl pb-8 text-center font-univers text-base leading-snug text-branco/70 md:pb-10 md:text-lg">
                {lead}
              </p>
            )}
            <div className="flex flex-wrap items-start justify-center gap-8 md:gap-14">
              {tier.map((n) => (
                <Node key={n.id} n={n} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

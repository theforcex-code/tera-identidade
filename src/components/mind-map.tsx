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

  return (
    <div className="flex w-44 flex-col items-center text-center md:w-56">
      <div className="relative h-28 w-28 overflow-hidden rounded-md border border-white/10 bg-neutral-900 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.9)] md:h-36 md:w-36">
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
      <div
        className={`mt-3 font-univers leading-tight ${
          n.milestone
            ? "text-base text-branco md:text-lg"
            : "text-sm text-branco/80 md:text-base"
        }`}
      >
        {label}
      </div>
      {desc && (
        <div className="mt-2 max-w-[200px] font-univers text-[12px] leading-snug text-branco/55">
          {desc}
        </div>
      )}
    </div>
  );
}

export function MindMap() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      {TIERS.map((tier, i) => (
        <div key={i}>
          {i > 0 && <Connector />}
          <div className="flex flex-wrap items-start justify-center gap-8 md:gap-14">
            {tier.map((n) => (
              <Node key={n.id} n={n} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

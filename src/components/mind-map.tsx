"use client";

import type { CSSProperties } from "react";
import { TIERS, type NodeDef } from "@/lib/mindmap-data";
import { useContent } from "@/components/content-provider";
import { EditableImage, EditOverlay } from "@/components/editable";

/* ------------------------------------------------------------------
   MAPA MENTAL TÉRA — diagrama em níveis (tiers)
   Fluxo vertical, alinhado e limpo: cada nível é uma linha centrada,
   conectada ao próximo por um traço reto. Sem linhas curvas cruzando.
   As imagens e textos de cada nó são editáveis no localhost (dev).

   Tipografia: os 7 degraus do fluxo-conceito (9/10/11/13.5/17/21/clamp),
   multiplicados por --fx — o documento original é lido a 100%, aqui é
   projeção. --fx: 1 devolve os tamanhos literais do original.
   Os degraus de 8px do ritmo vertical NÃO escalam: o grid é o grid.
------------------------------------------------------------------- */

const TYPE = {
  "--fx": "1.35",
  "--t1": "calc(9px * var(--fx))",
  "--t2": "calc(10px * var(--fx))",
  "--t3": "calc(11px * var(--fx))",
  "--t4": "calc(13.5px * var(--fx))",
  "--t5": "calc(17px * var(--fx))",
  "--t6": "calc(21px * var(--fx))",
  // só os limites escalam: o termo em vw já responde ao viewport sozinho,
  // multiplicá-lo por --fx contaria o mesmo ajuste duas vezes.
  "--t7": "clamp(calc(26px * var(--fx)), 4.4vw, calc(52px * var(--fx)))",
} as CSSProperties;

/** Marcação inline mínima: **negrito**, *itálico*, [sublinhado]. */
function Rich({ t }: { t: string }) {
  const parts = t.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\])/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**"))
          return (
            <b key={i} className="font-bold text-branco">
              {p.slice(2, -2)}
            </b>
          );
        if (p.startsWith("*") && p.endsWith("*"))
          return (
            <i key={i} className="italic">
              {p.slice(1, -1)}
            </i>
          );
        if (p.startsWith("[") && p.endsWith("]"))
          return (
            <span key={i} className="border-b-2 border-current pb-px">
              {p.slice(1, -1)}
            </span>
          );
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

function Connector() {
  return (
    <div className="flex justify-center py-6 md:py-8" aria-hidden>
      <div className="h-14 w-px bg-white/20 md:h-20" />
    </div>
  );
}

// Selo do estágio: número em quadrado + título espaçado.
function Stage({ no, tt }: { no: string; tt: string }) {
  return (
    <div className="flex flex-col items-center gap-[9px] pb-2 pt-14">
      <span className="flex h-[calc(34px*var(--fx))] w-[calc(34px*var(--fx))] items-center justify-center border border-branco/70 font-univers text-[length:var(--t3)] font-bold text-branco">
        {no}
      </span>
      <span className="font-univers text-[length:var(--t3)] font-bold uppercase tracking-[0.22em] text-branco">
        {tt}
      </span>
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
    <div className="flex w-[260px] flex-col items-center text-center md:w-[300px]">
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

      {n.sub && (
        <div className="mt-4 font-univers text-[length:var(--t1)] uppercase tracking-[0.14em] text-branco/40">
          {n.sub}
        </div>
      )}

      {!n.hideLabel && label && (
        <div
          className={`font-univers font-bold uppercase leading-[1.6] tracking-[0.05em] text-branco ${
            n.sub ? "mt-[5px]" : "mt-4"
          } text-[length:var(--t2)]`}
        >
          {label}
        </div>
      )}

      {desc && (
        <div className="font-univers text-[length:var(--t2)] uppercase leading-[1.6] tracking-[0.05em] text-branco/55">
          <Rich t={desc} />
        </div>
      )}

      {n.src && (
        <div className="mt-[5px] whitespace-pre-line font-univers text-[length:var(--t1)] leading-[1.6] text-branco/35">
          <Rich t={n.src} />
        </div>
      )}
    </div>
  );
}

// O conceito como ciclo fechado. Duas placas e dois colchetes: desce pela
// esquerda até "da luz à matéria", sobe pela direita e volta ao começo — o
// processo se inverte e recomeça, que é o que o texto acima descreve.
function Loop({ ida, volta }: { ida: string; volta: string }) {
  const placa =
    "relative z-10 bg-branco px-6 py-3 text-center font-univers text-[length:var(--t7)] font-bold uppercase leading-[1.1] tracking-[0.02em] text-preto";
  const seta =
    "absolute z-10 font-univers text-[length:var(--t6)] leading-none text-branco";
  return (
    <div className="flex justify-center pb-2 pt-10">
      <div className="relative flex max-w-[840px] flex-col items-center gap-10 px-12 md:px-16">
        {/* colchete esquerdo: da primeira placa para a segunda */}
        <span
          aria-hidden
          className="absolute bottom-7 left-0 top-7 w-8 rounded-l-[999px] border-y border-l border-branco/50 md:w-12"
        />
        <span aria-hidden className={`${seta} bottom-[18px] left-6 md:left-10`}>
          ▸
        </span>
        {/* colchete direito: da segunda de volta para a primeira */}
        <span
          aria-hidden
          className="absolute bottom-7 right-0 top-7 w-8 rounded-r-[999px] border-y border-r border-branco/50 md:w-12"
        />
        <span aria-hidden className={`${seta} right-6 top-[14px] md:right-10`}>
          ◂
        </span>

        <span className={placa}>{ida}</span>
        <span className={placa}>{volta}</span>
      </div>
    </div>
  );
}

function Explain({ ps }: { ps: string[] }) {
  return (
    <div className="mx-auto max-w-[760px] px-6 pt-6 text-left font-univers text-[length:var(--t4)] leading-[1.78] tracking-[0.012em] text-branco/70">
      {ps.map((p, i) => (
        <p key={i} className={i > 0 ? "mt-3" : ""}>
          <Rich t={p} />
        </p>
      ))}
    </div>
  );
}

// Cadeia de estados: o racional inteiro comprimido numa linha. Quebra em
// várias linhas no mobile sem perder as setas entre os elos.
function Chain({ steps }: { steps: string[] }) {
  return (
    <ol className="mx-auto flex max-w-[1024px] flex-wrap items-center justify-center gap-x-2 gap-y-2 px-2 pt-8">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-3">
          {i > 0 && (
            <span aria-hidden className="font-univers text-[length:var(--t3)] text-branco/35">
              →
            </span>
          )}
          <span className="border border-branco/25 px-3 py-1.5 font-univers text-[length:var(--t3)] font-bold uppercase tracking-[0.16em] text-branco">
            {s}
          </span>
        </li>
      ))}
    </ol>
  );
}

// Statement: a síntese do estágio. Sobe dois degraus em relação à legenda
// justamente pra não ser lida como mais uma legenda.
function Concl({ t }: { t: string }) {
  return (
    <p className="mx-auto my-2 max-w-[820px] whitespace-pre-line px-6 py-4 text-center font-univers text-[length:var(--t6)] font-bold uppercase leading-[1.45] tracking-[0.02em] text-branco">
      <Rich t={t} />
    </p>
  );
}

function Trans({ t }: { t: string }) {
  return (
    <p className="mx-auto max-w-[560px] px-6 pt-8 text-center font-univers text-[length:var(--t2)] uppercase leading-[1.6] tracking-[0.06em] text-branco/45">
      {t}
      <span aria-hidden className="mt-1.5 block text-branco">
        ↓
      </span>
    </p>
  );
}

function Close({
  statements,
  kicker,
  sub,
}: {
  statements: string[];
  kicker: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 pb-14 pt-16">
      {statements.map((s, i) => (
        <span
          key={i}
          className="max-w-[720px] whitespace-pre-line bg-branco px-6 py-3 text-center font-univers text-[length:var(--t6)] font-bold uppercase leading-[1.35] tracking-[0.06em] text-preto"
        >
          {s}
        </span>
      ))}
      <span className="mt-2 font-univers text-[length:var(--t3)] font-bold uppercase tracking-[0.16em] text-branco">
        {kicker}
      </span>
      <span className="font-univers text-[length:var(--t2)] uppercase tracking-[0.1em] text-branco/45">
        {sub}
      </span>
    </div>
  );
}

export function MindMap() {
  return (
    <div className="mx-auto w-full max-w-5xl" style={TYPE}>
      {TIERS.map((tier, i) => (
        <div key={i}>
          {i > 0 && !tier.stage && !tier.close && <Connector />}
          {tier.stage && <Stage no={tier.stage.no} tt={tier.stage.tt} />}

          {tier.nodes.length > 0 && (
            <div className="flex flex-wrap items-start justify-center gap-8 md:gap-14">
              {tier.nodes.map((n) => (
                <Node key={n.id} n={n} />
              ))}
            </div>
          )}

          {tier.explain && <Explain ps={tier.explain} />}
          {tier.chain && <Chain steps={tier.chain} />}
          {tier.loop && <Loop ida={tier.loop.ida} volta={tier.loop.volta} />}
          {tier.concl && <Concl t={tier.concl} />}
          {tier.trans && <Trans t={tier.trans} />}
          {tier.close && (
            <Close
              statements={tier.close.statements}
              kicker={tier.close.kicker}
              sub={tier.close.sub}
            />
          )}
        </div>
      ))}
    </div>
  );
}

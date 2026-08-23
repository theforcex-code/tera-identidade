"use client";

import Image from "next/image";

/* ------------------------------------------------------------------
   MAPA MENTAL TÉRA — diagrama em níveis (tiers)
   Fluxo vertical, alinhado e limpo: cada nível é uma linha centrada,
   conectada ao próximo por um traço reto. Sem linhas curvas cruzando.
------------------------------------------------------------------- */

interface NodeDef {
  id: string;
  label: string;
  img: string;
  milestone?: boolean;
  desc?: string;
}

// Níveis, de cima (origem) para baixo (dobra).
const TIERS: NodeDef[][] = [
  [{ id: "tera", label: "TÉRA", img: "/mapa/tera-hero.jpg", milestone: true }],
  [
    { id: "escala", label: "Escala", img: "/mapa/escala.jpg" },
    { id: "solo", label: "Solo", img: "/mapa/solo.jpg" },
    { id: "extraordinario", label: "Extraordinário", img: "/mapa/extraordinario.jpg" },
  ],
  [
    {
      id: "espetaculos",
      label: "Espetáculos Multidimensionais",
      img: "/mapa/espetaculos.jpg",
      milestone: true,
      desc: "Arquitetura, arte, cultura, tecnologia, natureza e presença em um só acontecimento.",
    },
  ],
  [
    { id: "tempo", label: "Tempo", img: "/mapa/tempo.jpg", desc: "Passado, presente e possível coexistem." },
    { id: "perspectiva", label: "Perspectiva", img: "/mapa/perspectiva.jpg", desc: "A experiência muda conforme o ponto de vista." },
    { id: "participacao", label: "Participação", img: "/mapa/participacao.jpg", desc: "A presença modifica o acontecimento." },
  ],
  [
    {
      id: "realidade",
      label: "Realidade Expandida",
      img: "/mapa/realidade-expandida.jpg",
      milestone: true,
      desc: "Diferentes percepções coexistem em um mesmo acontecimento.",
    },
  ],
  [
    { id: "continuidade", label: "Continuidade", img: "/mapa/continuidade.jpg", desc: "Os estados pertencem ao mesmo campo." },
    { id: "relacao", label: "Relação", img: "/mapa/relacao.jpg", desc: "Cada estado se define pelas relações que estabelece." },
  ],
  [{ id: "tecido", label: "Tecido da Realidade", img: "/mapa/tecido.jpg", milestone: true, desc: "Um campo contínuo formado por relações." }],
  [{ id: "dobra", label: "Dobra", img: "/mapa/dobra.jpg", milestone: true, desc: "Reconfigurar essas relações sem romper sua continuidade." }],
  [{ id: "dobrar", label: "Dobrar o Tecido da Realidade", img: "/mapa/dobrar.jpg", milestone: true }],
];

function Connector() {
  return (
    <div className="flex justify-center py-6 md:py-8" aria-hidden>
      <div className="h-14 w-px bg-white/20 md:h-20" />
    </div>
  );
}

function Node({ n }: { n: NodeDef }) {
  return (
    <div className="flex w-40 flex-col items-center text-center md:w-52">
      <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-white/10 bg-neutral-800 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.9)] md:h-36 md:w-36">
        <Image
          src={n.img}
          alt={n.label}
          fill
          priority
          sizes="180px"
          className="object-cover grayscale"
        />
        {n.id === "tera" && (
          <div className="absolute inset-0 grid place-content-center bg-preto/45">
            <span className="font-monument text-xl tracking-tight text-branco md:text-2xl">
              TÉRA
            </span>
          </div>
        )}
      </div>
      <div
        className={`mt-3 font-suisse leading-tight ${
          n.milestone ? "text-[15px] text-branco md:text-base" : "text-[13px] text-branco/75"
        }`}
      >
        {n.label}
      </div>
      {n.desc && (
        <div className="mt-1.5 max-w-[180px] font-suisse text-[10px] leading-snug text-branco/45">
          {n.desc}
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

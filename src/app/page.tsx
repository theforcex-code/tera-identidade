"use client";

import { useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MindMap } from "@/components/mind-map";
import { EditableImage } from "@/components/editable";
import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout";
import { makeFrames, makeAppFrames } from "@/components/media-frames";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ================================================================
   TÉRA — APRESENTAÇÃO DE IDENTIDADE VISUAL
   Fundo preto; apenas o Manifesto é branco.
   Design preto e branco — cor só como conteúdo (paleta) e fotos.
   Tipografia de apoio na mesma família do texto (Suisse Int'l).
================================================================ */

const SHELL = "mx-auto w-full max-w-[1400px] px-8 md:px-16";
// `relative bg-preto` = base opaca p/ o empilhamento (stacking) no desktop.
// `md:min-h-screen` garante que a seção nunca fique menor que a tela (senão o
// pin do empilhamento "quebra", mostrando uma faixa da seção anterior).
const SECTION =
  "relative bg-preto w-full border-t border-white/10 py-24 md:min-h-screen md:py-36";
const LABEL = "font-univers uppercase tracking-[0.28em]";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMS = "0123456789";
const SYM = ".,:;!?@#%&/()[]{}+-=*";

// Cores de matéria — variáveis (03 a 14). HEX derivado do RGB fornecido.
const MATERIAL = [
  { code: "03", name: "Azul Mineral", hex: "#3A8EAD", rgb: "58 / 142 / 173", cmyk: "66 / 18 / 0 / 32", pantone: "7704 C", tag: "profundidade / mineral / atmosfera", note: "Minerais, profundidade, água e atmosfera. Grande capacidade de expansão no LED." },
  { code: "04", name: "Ciano", hex: "#4BC3CE", rgb: "75 / 195 / 206", cmyk: "64 / 5 / 0 / 19", pantone: "3115 C", tag: "expansão / transparência / luz", note: "Extensão luminosa do universo mineral. Funciona bem no digital e imersivo." },
  { code: "05", name: "Verde Profundo", hex: "#5B9070", rgb: "91 / 144 / 112", cmyk: "37 / 0 / 22 / 44", pantone: "7736 C", tag: "regeneração / crescimento / matéria viva", note: "A dimensão orgânica como outro estado do sistema, não como natureza literal." },
  { code: "06", name: "Enxofre", hex: "#D7B52F", rgb: "215 / 181 / 47", cmyk: "0 / 16 / 78 / 16", pantone: "7754 C", tag: "energia / concentração / mineral", note: "Universo mineral e sulfúrico. Uma das cores de maior luminosidade." },
  { code: "07", name: "Âmbar", hex: "#DE8530", rgb: "222 / 133 / 48", cmyk: "0 / 40 / 78 / 13", pantone: "7572 C", tag: "calor / pressão / transformação", note: "Passagem entre o amarelo do enxofre e o vermelho do óxido." },
  { code: "08", name: "Óxido", hex: "#D65B43", rgb: "214 / 91 / 67", cmyk: "0 / 57 / 69 / 16", pantone: "7416 C", tag: "reação / oxidação / transformação", note: "A matéria depois de transformada. Substitui o marrom como terra literal." },
  { code: "09", name: "Violeta", hex: "#9069B8", rgb: "144 / 105 / 184", cmyk: "22 / 43 / 0 / 28", pantone: "7676 C", tag: "cristalização / espectro / concentração", note: "Cristalização e espectro. Afasta a identidade das cores literais da terra." },
  { code: "10", name: "Metal", hex: "#BFC2BE", rgb: "191 / 194 / 190", cmyk: "2 / 0 / 2 / 24", pantone: "Cool Gray 2 C", tag: "metal / reflexo / superfície", note: "Superfície, reflexo e materialidade industrial, sem estética cibernética." },
];


export default function Page() {
  const lenisRef = useRef<LenisRef>(null);
  const mainRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Sincroniza o smooth-scroll do Lenis com o ScrollTrigger do GSAP.
      const lenis = lenisRef.current?.lenis;
      if (lenis) lenis.on("scroll", ScrollTrigger.update);

      // Empilhamento (stacking): cada seção prende quando seu fim chega ao
      // fim da tela e a próxima sobe por cima. Só desktop + sem reduced-motion.
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const sections = gsap.utils.toArray<HTMLElement>(
            mainRef.current?.querySelectorAll(":scope > section") ?? [],
          );
          sections.forEach((section, i) => {
            gsap.set(section, { zIndex: i + 1 });
            if (i < sections.length - 1) {
              ScrollTrigger.create({
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                pin: true,
                pinSpacing: false,
              });
            }
          });
          ScrollTrigger.refresh();
        },
      );

      return () => {
        if (lenis) lenis.off("scroll", ScrollTrigger.update);
        mm.revert();
      };
    },
    { scope: mainRef },
  );

  return (
    <ReactLenis root ref={lenisRef}>
      <main
        ref={mainRef}
        className="bg-preto text-branco selection:bg-branco selection:text-preto"
      >
        {/* ============ 00 · CAPA ============ */}
        <section className="relative h-screen w-full overflow-hidden bg-preto">
          <EditableImage
            group="images"
            id="capa"
            defaultSrc="/brand/capa-sala.jpg"
            alt="TÉRA — Sala Abaixo, subsolo da Cidade Matarazzo"
          />
          <div className="absolute inset-0 bg-preto/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-preto/75 via-preto/15 to-preto/45" />

          <div className="relative z-[5] grid h-full place-content-center px-6 text-center">
            <Logo invert className="mx-auto w-[78vw] max-w-[820px]" />
          </div>
        </section>

        {/* ============ 01 · MANIFESTO (única seção branca) ============ */}
        <section className="relative flex w-full flex-col justify-center border-t border-white/10 bg-branco py-24 text-preto md:min-h-screen md:py-36">
          <div className={SHELL}>
            <header className="max-w-4xl">
              <div className="flex items-center gap-4">
                <span className="font-univers text-xs text-preto/40">01</span>
                <span className="h-px w-10 bg-preto/25" />
                <span className={`${LABEL} text-[11px] text-preto/45`}>Manifesto</span>
              </div>
            </header>
            <h2 className="mt-8 max-w-4xl font-univers text-3xl font-light leading-[1.08] tracking-tight md:text-6xl">
              A identidade como estrutura de suporte — nunca competindo com a
              obra.
            </h2>
            <div className="mt-14 grid max-w-4xl gap-10 font-univers text-base leading-relaxed text-preto/70 md:grid-cols-2 md:text-lg">
              <p>
                Téra é um espaço imersivo de arte, tecnologia e experiências
                multidimensionais, no subsolo da Cidade Matarazzo. A identidade
                funciona como estrutura de suporte para diferentes artistas e
                obras, sem competir visualmente com o conteúdo.
              </p>
              <p>
                Os dois caminhos partem do mesmo princípio: a identidade
                permanece reconhecível enquanto pode se transformar conforme a
                experiência. A diferença está no{" "}
                <span className="text-preto">comportamento</span> dessa
                transformação.
              </p>
            </div>
          </div>
        </section>

        {/* ============ 02 · MAPA CONCEITUAL ============ */}
        <section className={SECTION}>
          <div className={SHELL}>
            <SectionHead
              num="02"
              kicker="Mapa conceitual"
              title="Da escala à dobra."
              desc="Um campo contínuo de relações. Cada nível se desdobra no próximo, até dobrar o tecido da realidade."
            />
            <div className="mt-20">
              <MindMap />
            </div>
          </div>
        </section>

        {/* ============ 03 · DOIS CAMINHOS ============ */}
        <section className="relative bg-preto w-full md:flex md:min-h-screen md:flex-col md:justify-center">
          <div className={`${SHELL} py-24 md:py-36`}>
            <SectionHead
              center
              num="03"
              kicker="O sistema se desdobra em"
              title="Dois caminhos."
              desc="Mesmo princípio, dois comportamentos: a continuidade da Dobra e o contraste da Ruptura."
            />
          </div>

          <div className="mx-auto grid w-full max-w-4xl md:grid-cols-2">
            {/* CAMINHO 01 · DOBRA */}
            <div className="flex min-h-[45vh] flex-col items-center justify-center gap-8 px-8 py-16 text-center md:min-h-[55vh]">
              <div className="flex w-full max-w-sm items-center justify-center">
                <span className={`${LABEL} text-xs text-branco/50`}>Caminho 01</span>
              </div>
              <h3 className="display-lg font-forma font-extralight">Dobra</h3>
              <div className="max-w-sm">
                <p className="font-forma text-lg leading-snug text-branco/70">
                  A forma permanece reconhecível; sua relação com o espaço se
                  transforma.
                </p>
                <p className={`mt-4 ${LABEL} text-[11px] text-branco/45`}>
                  Transformação · permanência · transição
                </p>
              </div>
            </div>

            {/* CAMINHO 02 · QUEBRA */}
            <div className="flex min-h-[45vh] flex-col items-center justify-center gap-8 px-8 py-16 text-center md:min-h-[55vh]">
              <div className="flex w-full max-w-sm items-center justify-center">
                <span className={`${LABEL} text-xs text-branco/50`}>Caminho 02</span>
              </div>
              <h3 className="display-lg font-futura">RUPTURA</h3>
              <div className="max-w-sm">
                <p className="font-univers text-lg leading-snug text-branco/70">
                  Elementos diferentes entram em contraste sem perder a unidade
                  do sistema.
                </p>
                <p className={`mt-4 ${LABEL} text-[11px] text-branco/45`}>
                  Contraste · alternância · interrupção
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 04 · CAMINHO 01 · DOBRA ================= */}
        <PathDivider num="04" camada="Caminho 01" name="Dobra" variant="dobra" />

        {/* 04 · Conceito — painel dividido + imagem de apoio */}
        <Split
          id="dobra"
          src="/media/apoio-dobra.png"
          alt="Ágata — camadas minerais que continuam sem se romper"
        >
          <Eyebrow>04 · Dobra — Conceito</Eyebrow>
          <p className="mt-8 border-l-2 border-white/30 pl-6 font-forma text-2xl font-light leading-snug md:text-4xl">
            A forma não é substituída por outra: permanece reconhecível enquanto
            sua relação com o espaço se modifica.
          </p>
        </Split>

        {/* 04 · Tipografia — board de introdução */}
        <TopicDivider label="Dobra" name="Tipografia" />
        <section className={SECTION}>
          <div className={SHELL}>
            <TypeIntro
              num="04"
              path="Dobra"
              primary="Univers"
              secondary="Forma DJR"
              principle="A dobra acontece quando a forma muda de peso, largura e escala mas continua pertencendo ao mesmo tecido. Univers e Forma DJR compartilham a genealogia grotesca — a transformação é contínua, não uma troca."
              primaryClass="font-univers font-light"
              bodyClass="font-univers"
            />
            <RationalePair
              primary={{
                name: "Univers — Primária",
                text: "Neo-grotesca racional que estabelece o tecido comum da identidade. Sua construção em diferentes pesos e larguras — do Light ao Bold, do normal ao Condensed — permite criar variações mantendo reconhecimento e continuidade. É a estrutura estável a partir da qual a forma se deforma.",
                uso: "Informação, textos, sinalização, programação, interface",
                bodyClass: "font-univers",
              }}
              secondary={{
                name: "Forma DJR — Secundária",
                text: "Mantém proximidade com a tradição grotesca da Univers, mas acrescenta densidade, tensão, calor e uma textura muito particular. A pesquisa de David Jonathan Ross ajusta peso, largura e tamanhos ópticos à escala — o que a torna ideal para uma identidade que passa de Instagram a impressão, sinalização e LED monumental. A forma parece se deslocar e condensar sem abandonar sua origem.",
                uso: "Grandes títulos, campanhas, obras, intervenções, LED",
                bodyClass: "font-forma",
              }}
            />
            <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
              <TypeSpecimen name="Univers" role="Primária" use="Estrutura, textos, sinalização" fontClass="font-univers" />
              <TypeSpecimen name="Forma DJR" role="Secundária" use="Títulos, campanhas, LED" fontClass="font-forma" display />
            </div>
          </div>
        </section>

        {/* 04 · Aplicações — grid full-bleed em cor */}
        <MediaWall offset={0} grayscale={false} />

        {/* ================= 05 · CAMINHO 02 · QUEBRA ================= */}
        <PathDivider num="05" camada="Caminho 02" name="Ruptura" variant="quebra" />

        {/* 05 · Conceito — painel dividido + imagem de apoio */}
        <Split
          id="ruptura"
          src="/media/apoio-quebra.png"
          alt="Padrão de interferência — dois sistemas em contraste"
          light
          reverse
        >
          <Eyebrow>05 · Ruptura — Conceito</Eyebrow>
          <p className="mt-8 font-futura text-3xl leading-[1.05] md:text-5xl">
            CONTRASTE, ALTERNÂNCIA E RUPTURA.
          </p>
          <p className="mt-8 max-w-md font-univers text-base leading-relaxed text-branco/60">
            Diferentes estados coexistem e criam tensão entre si: uma forma
            interrompe, desloca ou contrasta com outra. A identidade se constrói
            pela diferença entre elementos.
          </p>
        </Split>

        {/* 05 · Tipografia — board de introdução */}
        <TopicDivider label="Ruptura" name="Tipografia" />
        <section className={SECTION}>
          <div className={SHELL}>
            <TypeIntro
              num="05"
              path="Ruptura"
              primary="Univers"
              secondary="Futura"
              principle="A quebra não está em usar duas fontes diferentes: acontece quando a lógica racional da Univers é interrompida pela geometria abstrata da Futura — uma alternância entre dois estados formais."
              bodyClass="font-univers"
            />
            <RationalePair
              primary={{
                name: "Univers — Primária",
                text: "Continua sendo a base comum: neo-grotesca racional, construída sobre pesos e larguras que dão estrutura e continuidade. É a linguagem estável que a Futura vem interromper — sem ela, não haveria contra o que romper.",
                uso: "Informação, textos, sinalização, interface",
                bodyClass: "font-univers",
              }}
              secondary={{
                name: "Futura — Secundária",
                text: "Introduz outro estado formal. Paul Renner a concebeu como uma tentativa deliberada de abandonar a dinâmica da escrita e transformar a letra em uma forma mais estática e abstrata — geometria pura, uma nova forma para “o nosso tempo”. Sua personalidade histórica é forte, por isso deve ser usada de modo controlado: títulos, intervenções e momentos de maior impacto.",
                uso: "Títulos, intervenções, momentos de impacto",
                bodyClass: "font-futura-regular",
              }}
            />
            <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
              <TypeSpecimen name="Univers" role="Primária" use="Estrutura, textos, sinalização" fontClass="font-univers" />
              <TypeSpecimen name="Futura" role="Secundária" use="Títulos, intervenções, impacto" fontClass="font-futura" display />
            </div>
          </div>
        </section>

        {/* 05 · Aplicações — grid full-bleed em cor */}
        <MediaWall offset={3} grayscale={false} />

        {/* 06 · Paleta — board de introdução */}
        <TopicDivider name="Paleta" />

        {/* ============ 06 · PALETA (capítulo único de cor) ============ */}
        <section className={SECTION}>
          <div className={SHELL}>
            <SectionHead
              num="06"
              kicker="Sistema cromático"
              title="A estrutura permanece; a matéria muda."
            />

            {/* 01 · 02 — Cores institucionais */}
            <div className="mt-16">
              <p className={`${LABEL} text-[11px] text-branco/45`}>
                01 / 02 · Cores institucionais
              </p>
              <p className="mt-3 max-w-2xl font-univers text-branco/55">
                Permanentes. Garantem reconhecimento em todos os materiais, mesmo
                quando nenhuma cor variável está presente.
              </p>
              <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2">
                <InstitutionalColor
                  name="Téra White"
                  hex="#F5F4F0"
                  rgb="245 / 244 / 240"
                  cmyk="0 / 0 / 2 / 4"
                  pantone="referência física a validar"
                  role="Institucional · Campo"
                  light
                  note="Superfície, abertura, clareza e luz. Um branco levemente quebrado, com presença própria de marca."
                  uso="Comunicação institucional, informações, programação, sinalização e interfaces."
                  led="Máxima luminosidade e expansão."
                />
                <InstitutionalColor
                  name="Téra Black"
                  hex="#11110F"
                  rgb="17 / 17 / 15"
                  cmyk="0 / 0 / 12 / 93"
                  pantone="Preto C"
                  role="Institucional · Estrutura"
                  note="Profundidade, contraste, silêncio e presença. Um quase-preto no lugar do preto absoluto."
                  uso="Experiência, obras, artistas e o ambiente imersivo."
                  led="Ausência de luz, intervalo e profundidade."
                />
              </div>
            </div>

            {/* 03 a 14 — Cores de matéria */}
            <div className="mt-20">
              <h3 className="font-univers text-2xl font-light tracking-tight md:text-4xl">
                Cores de matéria.
              </h3>
              <p className="mt-4 max-w-2xl font-univers text-branco/55">
                Diferentes estados e manifestações da matéria. Podem ser usadas
                individualmente, combinadas ou transformadas em gradientes. Não
                precisam combinar entre si: a unidade vem do sistema, não da
                semelhança.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-4">
                {MATERIAL.map((c) => (
                  <MaterialSwatch key={c.code} {...c} />
                ))}
              </div>
            </div>

            {/* Conceito central */}
            <div className="mt-20 border-t border-white/10 pt-12">
              <p className={`${LABEL} text-[11px] text-branco/45`}>Conceito central</p>
              <p className="mt-4 max-w-2xl font-univers text-2xl font-light leading-snug tracking-tight md:text-3xl">
                A estrutura permanece. A matéria muda.
              </p>
              <p className="mt-4 max-w-2xl font-univers leading-relaxed text-branco/60">
                White e Black garantem continuidade. As cores de matéria dão a cada
                obra uma manifestação própria.
              </p>
            </div>
          </div>
        </section>

        {/* Aplicações — board de introdução + grade de 8 (tamanho dos outros) */}
        <TopicDivider label="A identidade em uso" name="Aplicações" />
        <section className="relative w-full bg-preto py-24 md:py-32">
          <div className="w-full">
            <DynamicFrameLayout
              frames={makeAppFrames()}
              gapSize={0}
              grayscale={false}
            />
          </div>
        </section>

        {/* ============ 07 · PRINCÍPIO FINAL ============ */}
        <section className="relative bg-preto flex min-h-screen w-full flex-col justify-center overflow-hidden border-t border-white/10 py-24">
          <div className={`relative ${SHELL}`}>
            <SectionHead num="07" kicker="Princípio final" />
            <div className="mt-14 grid max-w-5xl gap-16 md:grid-cols-2">
              <div>
                <h3 className="font-forma text-4xl font-extralight tracking-tight md:text-5xl">
                  Dobra
                </h3>
                <p className="mt-6 font-forma text-lg leading-relaxed text-branco/70">
                  A identidade muda sem deixar de ser a mesma.
                </p>
              </div>
              <div>
                <h3 className="font-futura text-3xl md:text-4xl">RUPTURA</h3>
                <p className="mt-6 font-univers text-lg leading-relaxed text-branco/70">
                  A identidade cria significado a partir da diferença entre
                  elementos.
                </p>
              </div>
            </div>
            <p className="mt-20 max-w-2xl font-univers leading-relaxed text-branco/55">
              Em ambos os caminhos, a identidade permanece{" "}
              <span className="text-branco">
                discreta, flexível e subordinada à obra
              </span>{" "}
              — uma estrutura capaz de receber diferentes artistas, linguagens e
              experiências.
            </p>
            <Logo invert className="mt-16 w-[60vw] max-w-[640px]" />
          </div>
        </section>
      </main>
    </ReactLenis>
  );
}

/* ---------------------------------------------------------------- */
/* Blocos de layout                                                 */
/* ---------------------------------------------------------------- */

function Logo({
  className = "",
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/tera-logo.svg"
      alt="TÉRA"
      className={`inline-block h-auto ${invert ? "invert" : ""} ${className}`}
    />
  );
}

function SectionHead({
  num,
  kicker,
  title,
  desc,
  center = false,
}: {
  num: string;
  kicker: string;
  title?: string;
  desc?: string;
  center?: boolean;
}) {
  return (
    <header className={`max-w-4xl ${center ? "mx-auto text-center" : ""}`}>
      <div className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}>
        <span className="font-univers text-xs text-branco/40">{num}</span>
        <span className="h-px w-10 bg-white/25" />
        <span className={`${LABEL} text-[11px] text-branco/45`}>{kicker}</span>
      </div>
      {title && (
        <h2 className="mt-6 font-univers text-3xl font-light tracking-tight md:text-5xl">
          {title}
        </h2>
      )}
      {desc && (
        <p
          className={`mt-4 max-w-2xl font-univers text-branco/55 ${
            center ? "mx-auto" : ""
          }`}
        >
          {desc}
        </p>
      )}
    </header>
  );
}

function Split({
  src,
  alt,
  children,
  reverse = false,
  light = false,
  id,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  reverse?: boolean;
  light?: boolean;
  id?: string;
}) {
  return (
    <section className="relative bg-preto grid min-h-[80vh] w-full border-t border-white/10 md:min-h-screen md:grid-cols-2">
      <figure
        className={`relative flex min-h-[50vh] items-center justify-center overflow-hidden md:min-h-screen ${
          light ? "bg-white p-8 md:p-12" : "bg-white/[0.03]"
        } ${reverse ? "md:order-1" : "md:order-2"}`}
      >
        {id ? (
          <div className="relative h-full w-full">
            <EditableImage
              group="images"
              id={id}
              defaultSrc={src}
              alt={alt}
              fit={light ? "contain" : "cover"}
            />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className={
              light
                ? "max-h-full w-full object-contain"
                : "absolute inset-0 h-full w-full object-cover"
            }
          />
        )}
      </figure>
      <div
        className={`flex flex-col justify-center bg-preto px-8 py-20 md:px-16 ${
          reverse ? "md:order-2" : "md:order-1"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Subcomponentes                                                   */
/* ---------------------------------------------------------------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className={`${LABEL} text-[11px] text-branco/45`}>{children}</p>;
}

function PathDivider({
  num,
  camada,
  name,
  variant,
}: {
  num: string;
  camada: string;
  name: string;
  variant: "dobra" | "quebra";
}) {
  const dobra = variant === "dobra";
  return (
    <section className="relative grid h-screen w-full place-content-center border-t border-white/10 bg-preto">
      <div className="text-center">
        <p className={`mb-8 ${LABEL} text-sm text-branco/40`}>
          {num} · {camada}
        </p>
        <h2 className={`display-xl ${dobra ? "font-forma font-extralight" : "font-futura"}`}>
          {name}
        </h2>
        <div className="mx-auto mt-10 h-px w-40 bg-white/40" />
      </div>
    </section>
  );
}

// Board de introdução (tela cheia, só a palavra) — como o divisor da Dobra.
function TopicDivider({
  label,
  name,
  fontClass = "font-futura",
}: {
  label?: string;
  name: string;
  fontClass?: string;
}) {
  return (
    <section className="relative grid h-screen w-full place-content-center bg-preto">
      <div className="text-center">
        {label && (
          <p className={`mb-8 ${LABEL} text-sm text-branco/40`}>{label}</p>
        )}
        <h2 className={`display-xl ${fontClass}`}>{name}</h2>
        <div className="mx-auto mt-10 h-px w-40 bg-white/40" />
      </div>
    </section>
  );
}

function TypeIntro({
  num,
  path,
  primary,
  secondary,
  principle,
  displayPrimary = false,
  primaryClass,
  bodyClass = "font-univers",
}: {
  num: string;
  path: string;
  primary: string;
  secondary: string;
  principle: string;
  displayPrimary?: boolean;
  primaryClass?: string;
  bodyClass?: string;
}) {
  const pc = primaryClass ?? (displayPrimary ? "font-futura" : "font-univers font-light");
  return (
    <div className="max-w-4xl">
      <SectionHead num={num} kicker={`${path} — Tipografia`} />
      <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2">
        <span className={`text-3xl md:text-4xl ${pc}`}>{primary}</span>
        <span className="font-univers text-sm text-branco/40">+ {secondary}</span>
      </div>
      <p className={`mt-6 ${bodyClass} text-lg leading-relaxed text-branco/60 md:text-xl`}>
        {principle}
      </p>
    </div>
  );
}

function RationalePair({
  primary,
  secondary,
  principle,
}: {
  primary: { name: string; text: string; uso: string; bodyClass?: string };
  secondary: { name: string; text: string; uso: string; bodyClass?: string };
  principle?: string;
}) {
  const items = [primary, secondary];
  return (
    <div className="mt-12 max-w-4xl">
      <div className="grid gap-10 md:grid-cols-2">
        {items.map((r) => (
          <div key={r.name}>
            <p className={`${LABEL} text-[11px] text-branco/50`}>{r.name}</p>
            <p className={`mt-3 leading-relaxed text-branco/70 ${r.bodyClass ?? "font-univers"}`}>
              {r.text}
            </p>
            <p className={`mt-3 ${LABEL} text-[10px] text-branco/40`}>Uso · {r.uso}</p>
          </div>
        ))}
      </div>
      {principle && (
        <p className={`mt-10 border-l-2 border-white/20 pl-5 ${LABEL} text-[11px] text-branco/55`}>
          {principle}
        </p>
      )}
    </div>
  );
}

function TypeSpecimen({
  name,
  role,
  use,
  fontClass,
  display = false,
}: {
  name: string;
  role: string;
  use: string;
  fontClass: string;
  display?: boolean;
}) {
  return (
    <div className="bg-white/[0.03] p-8 md:p-12">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className={`${LABEL} text-xs text-branco`}>{name}</span>
          <span className={`ml-3 ${LABEL} text-[10px] text-branco/45`}>{role}</span>
        </div>
        <p className={`${LABEL} text-[10px] text-branco/45 md:text-right`}>{use}</p>
      </div>
      <div className={`${fontClass} mb-8 leading-none text-branco ${display ? "text-6xl md:text-8xl" : "text-7xl md:text-9xl"}`}>
        Aa
      </div>
      <div className={`${fontClass} space-y-1.5 break-words text-base text-branco/80 md:text-xl`}>
        <p>{UPPER}</p>
        <p>{LOWER}</p>
        <p>
          {NUMS} <span className="text-branco/45">{SYM}</span>
        </p>
      </div>
    </div>
  );
}

function MediaWall({
  offset,
  grayscale = true,
}: {
  offset: number;
  grayscale?: boolean;
}) {
  return (
    <section className="relative bg-preto flex w-full flex-col justify-center border-t border-white/10 py-16 md:min-h-screen md:py-20">
      {/* full-bleed, sem borda, tela inteira */}
      <div className="w-full">
        <DynamicFrameLayout frames={makeFrames(offset)} gapSize={0} grayscale={grayscale} />
      </div>
    </section>
  );
}

// Cores institucionais — campos de cor grandes com dados completos.
function InstitutionalColor({
  name,
  hex,
  rgb,
  cmyk,
  pantone,
  role,
  note,
  uso,
  led,
  light = false,
}: {
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  pantone: string;
  role: string;
  note: string;
  uso: string;
  led: string;
  light?: boolean;
}) {
  const fg = light ? "text-preto" : "text-branco";
  const sub = light ? "text-preto/60" : "text-branco/60";
  const soft = light ? "text-preto/45" : "text-branco/45";
  return (
    <div
      className="flex min-h-[420px] flex-col justify-between p-8 md:p-10"
      style={{ background: hex }}
    >
      <div className="flex items-start justify-between">
        <span className={`${LABEL} text-[11px] ${soft}`}>{role}</span>
        <span className={`font-univers text-xs ${soft}`}>{hex}</span>
      </div>
      <div>
        <p className={`font-univers text-3xl font-light tracking-tight md:text-4xl ${fg}`}>
          {name}
        </p>
        <div className={`mt-3 flex flex-wrap gap-x-5 gap-y-1 font-univers text-[11px] ${soft}`}>
          <span>RGB {rgb}</span>
          <span>CMYK {cmyk}</span>
          <span>Pantone {pantone}</span>
        </div>
        <p className={`mt-5 max-w-sm font-univers text-sm leading-relaxed ${sub}`}>{note}</p>
        <p className={`mt-3 max-w-sm font-univers text-xs leading-relaxed ${sub}`}>
          <span className={fg}>Uso.</span> {uso}
        </p>
        <p className={`mt-1.5 max-w-sm font-univers text-xs leading-relaxed ${sub}`}>
          <span className={fg}>LED.</span> {led}
        </p>
      </div>
    </div>
  );
}

// Uma cor de matéria — campo de cor + dados (rótulo abaixo, contraste seguro).
function MaterialSwatch({
  code,
  name,
  hex,
  rgb,
  cmyk,
  pantone,
  tag,
  note,
}: {
  code: string;
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  pantone: string;
  tag: string;
  note: string;
}) {
  return (
    <div className="flex flex-col bg-preto">
      <div className="h-28 w-full md:h-32" style={{ background: hex }} />
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-univers text-sm text-branco">{name}</span>
          <span className={`${LABEL} text-[10px] text-branco/35`}>{code}</span>
        </div>
        <p className="mt-1 font-univers text-[11px] leading-snug text-branco/50">{tag}</p>
        <dl className="mt-3 space-y-0.5 font-univers text-[10px] text-branco/40">
          <div>{hex}</div>
          <div>RGB {rgb}</div>
          <div>CMYK {cmyk}</div>
          <div>Pantone {pantone}</div>
        </dl>
        {note && (
          <p className="mt-3 font-univers text-[11px] leading-snug text-branco/45">{note}</p>
        )}
      </div>
    </div>
  );
}




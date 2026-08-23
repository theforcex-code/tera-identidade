"use client";

import { ReactLenis } from "lenis/react";
import Image from "next/image";
import { MindMap } from "@/components/mind-map";
import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout";
import { makeFrames } from "@/components/media-frames";

/* ================================================================
   TÉRA — APRESENTAÇÃO DE IDENTIDADE VISUAL
   Fundo preto; apenas o Manifesto é branco.
   Design preto e branco — cor só como conteúdo (paleta) e fotos.
   Tipografia de apoio na mesma família do texto (Suisse Int'l).
================================================================ */

const SHELL = "mx-auto w-full max-w-[1400px] px-8 md:px-16";
const SECTION = "w-full border-t border-white/10 py-24 md:py-36";
const LABEL = "font-suisse uppercase tracking-[0.28em]";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMS = "0123456789";
const SYM = ".,:;!?@#%&/()[]{}+-=*";

export default function Page() {
  return (
    <ReactLenis root>
      <main className="bg-preto text-branco selection:bg-branco selection:text-preto">
        {/* ============ 00 · CAPA ============ */}
        <section className="relative h-screen w-full overflow-hidden bg-preto">
          <Image
            src="/brand/capa-sala.jpg"
            alt="TÉRA — Sala Abaixo, subsolo da Cidade Matarazzo"
            fill
            priority
            sizes="100vw"
            className="scale-105 object-cover grayscale"
          />
          <div className="absolute inset-0 bg-preto/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-preto via-preto/40 to-preto/60" />

          <header className={`absolute inset-x-0 top-0 z-10 flex items-center justify-between py-6 ${SHELL}`}>
            <Logo invert className="h-4 md:h-5" />
            <span className={`${LABEL} text-[10px] text-branco/50`}>
              Identidade Visual · 2026
            </span>
          </header>

          <div className="relative z-[5] grid h-full place-content-center px-6 text-center">
            <Logo invert className="mx-auto w-[78vw] max-w-[820px]" />
            <p className={`mt-8 ${LABEL} text-[11px] text-branco/70 md:text-sm`}>
              Realidade expandida em 32K
            </p>
            <div className="mt-8 flex justify-center">
              <span className={`inline-block rounded-full border border-branco/25 px-4 py-1.5 ${LABEL} text-[10px] text-branco/70`}>
                Subsolo · Cidade Matarazzo
              </span>
            </div>
          </div>

          <div className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 ${LABEL} text-[10px] text-branco/40`}>
            role para descer ↓
          </div>
        </section>

        {/* ============ 01 · MANIFESTO (única seção branca) ============ */}
        <section className="w-full border-t border-white/10 bg-branco py-24 text-preto md:py-36">
          <div className={SHELL}>
            <header className="max-w-4xl">
              <div className="flex items-center gap-4">
                <span className="font-suisse text-xs text-preto/40">01</span>
                <span className="h-px w-10 bg-preto/25" />
                <span className={`${LABEL} text-[11px] text-preto/45`}>Manifesto</span>
              </div>
            </header>
            <h2 className="mt-8 max-w-4xl font-suisse text-3xl font-light leading-[1.08] tracking-tight md:text-6xl">
              A identidade como estrutura de suporte — nunca competindo com a
              obra.
            </h2>
            <div className="mt-14 grid max-w-4xl gap-10 font-suisse text-base leading-relaxed text-preto/70 md:grid-cols-2 md:text-lg">
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
        <section className="w-full border-t border-white/10">
          <div className={`${SHELL} py-24 md:py-36`}>
            <SectionHead
              num="03"
              kicker="O sistema se desdobra em"
              title="Dois caminhos."
              desc="Mesmo princípio, dois comportamentos: a continuidade da Dobra e a ruptura da Quebra."
            />
          </div>

          <div className="grid border-t border-white/10 md:grid-cols-2">
            {/* CAMINHO 01 · DOBRA */}
            <div className="flex min-h-[60vh] flex-col justify-between border-white/10 bg-preto px-8 py-14 md:min-h-[70vh] md:border-r md:px-16 md:py-20">
              <div className="flex items-center justify-between">
                <span className={`${LABEL} text-xs text-branco/50`}>Caminho 01</span>
                <span className={`${LABEL} text-xs text-branco/60`}>Continuidade</span>
              </div>
              <h3 className="my-10 display-lg font-museo font-extralight">Dobra</h3>
              <div>
                <p className="max-w-sm font-museo text-lg leading-snug text-branco/70">
                  A forma permanece reconhecível; sua relação com o espaço se
                  transforma.
                </p>
                <p className={`mt-4 ${LABEL} text-[11px] text-branco/45`}>
                  Transformação · permanência · transição
                </p>
              </div>
            </div>

            {/* CAMINHO 02 · QUEBRA */}
            <div className="flex min-h-[60vh] flex-col justify-between bg-preto px-8 py-14 md:min-h-[70vh] md:px-16 md:py-20">
              <div className="flex items-center justify-between">
                <span className={`${LABEL} text-xs text-branco/50`}>Caminho 02</span>
                <span className={`${LABEL} text-xs text-branco/60`}>Ruptura</span>
              </div>
              <h3 className="my-10 display-lg font-monument">QUEBRA</h3>
              <div>
                <p className="max-w-sm font-favorit text-lg leading-snug text-branco/70">
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

        {/* 04 · Conceito — painel dividido + figura de apoio */}
        <Split src="/mapa/realidade-expandida.jpg" alt="Realidade expandida">
          <Eyebrow>04 · Dobra — Conceito</Eyebrow>
          <p className="mt-8 border-l-2 border-white/30 pl-6 font-museo text-2xl font-light leading-snug md:text-4xl">
            A forma não é substituída por outra: permanece reconhecível enquanto
            sua relação com o espaço se modifica.
          </p>
          <p className="mt-8 max-w-md font-museo text-base leading-relaxed text-branco/60">
            Referência: <em className="text-branco/90">Caminhando</em>, de Lygia
            Clark — percurso contínuo e transformação dentro de uma mesma
            estrutura.
          </p>
          <SupportFigure
            src="/media/apoio-dobra.png"
            alt="Ágata — camadas minerais"
            caption="Ágata · camadas que continuam sem se romper"
          />
        </Split>

        {/* 04 · Tipografia */}
        <section className={SECTION}>
          <div className={SHELL}>
            <TypeIntro
              num="04"
              path="Dobra"
              primary="MuseoModerno"
              secondary="Suisse Int’l"
              principle="A dobra acontece quando a forma permanece, mas sua relação com o espaço se transforma."
              primaryClass="font-museo font-light"
              bodyClass="font-museo"
            />
            <RationalePair
              primary={{
                name: "MuseoModerno — Primária",
                text: "Criada para o Museo de Arte Moderno de Buenos Aires a partir da pesquisa sobre a identidade e a história gráfica do museu, assume a função de voz institucional. Construção geométrica e contemporânea, com ampla variação de pesos: a mesma estrutura passa de estados leves a densos sem perder identidade. É o próprio conceito de dobra — transformar a mesma estrutura mantendo continuidade.",
                uso: "Marca, títulos, campanhas, momentos de maior presença",
                bodyClass: "font-museo",
              }}
              secondary={{
                name: "Suisse Int’l — Secundária",
                text: "Neo-grotesca de caráter neutro e altamente funcional, adequada a textos, sinalização, informações e interfaces. Organiza a comunicação sem disputar atenção com a obra.",
                uso: "Textos, sinalização, informações, interface",
              }}
              principle="MuseoModerno → identidade e transformação · Suisse Int’l → informação e contenção"
            />
            <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
              <TypeSpecimen name="MuseoModerno" role="Primária" use="Marca, títulos, textos da Dobra" fontClass="font-museo" />
              <TypeSpecimen name="Suisse Int’l" role="Secundária" use="Textos, sinalização, informações, interface" fontClass="font-suisse" />
            </div>
          </div>
        </section>

        {/* 04 · Aplicações — grid full-bleed em cor */}
        <MediaWall num="04" path="Dobra" kicker="Aplicações — continuidade" offset={0} grayscale={false} />

        {/* ================= 05 · CAMINHO 02 · QUEBRA ================= */}
        <PathDivider num="05" camada="Caminho 02" name="Quebra" variant="quebra" />

        {/* 05 · Conceito — painel dividido + figura de apoio */}
        <Split src="/mapa/espetaculos.jpg" alt="Espetáculos multidimensionais" reverse>
          <Eyebrow>05 · Quebra — Conceito</Eyebrow>
          <p className="mt-8 font-monument text-3xl leading-[1.05] md:text-5xl">
            CONTRASTE, ALTERNÂNCIA E RUPTURA.
          </p>
          <p className="mt-8 max-w-md font-favorit text-base leading-relaxed text-branco/60">
            Diferentes estados coexistem e criam tensão entre si: uma forma
            interrompe, desloca ou contrasta com outra. A identidade se constrói
            pela diferença entre elementos.
          </p>
          <SupportFigure
            src="/media/apoio-quebra.png"
            alt="Padrão de interferência"
            caption="Interferência · dois sistemas em contraste"
            light
          />
        </Split>

        {/* 05 · Tipografia */}
        <section className={SECTION}>
          <div className={SHELL}>
            <TypeIntro
              num="05"
              path="Quebra"
              primary="Monument Extended"
              secondary="ABC Favorit"
              principle="A quebra acontece quando elementos diferentes entram em contraste sem perder a unidade do sistema."
              displayPrimary
              bodyClass="font-favorit"
            />
            <RationalePair
              primary={{
                name: "Monument Extended — Primária",
                text: "Grotesca de baixo contraste inspirada na geometria e no peso visual da arquitetura brutalista. Largura, massa e presença fazem a tipografia funcionar como elemento espacial e de grande escala. As diferentes larguras e pesos reforçam sua capacidade de criar hierarquia e contraste.",
                uso: "Logotipo, títulos, campanhas, projeções, LED",
                bodyClass: "font-favorit",
              }}
              secondary={{
                name: "ABC Favorit — Secundária",
                text: "Grotesca de baixo contraste que combina rigidez geométrica com pequenas particularidades formais. Possui diferentes pesos e versões Extended, Expanded e Mono, permitindo uma linguagem funcional sem abandonar a identidade visual.",
                uso: "Textos corridos, legendas, programação, interface",
                bodyClass: "font-favorit",
              }}
              principle="Monument Extended → presença, massa, escala · ABC Favorit → informação, legibilidade, contenção"
            />
            <div className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
              <TypeSpecimen name="Monument Extended" role="Primária" use="Logotipo, títulos, projeções, LED" fontClass="font-monument" display />
              <TypeSpecimen name="ABC Favorit" role="Secundária" use="Textos de apoio, legendas, interface" fontClass="font-favorit" />
            </div>
          </div>
        </section>

        {/* 05 · Aplicações — grid full-bleed em cor */}
        <MediaWall num="05" path="Quebra" kicker="Aplicações — alternância" offset={3} grayscale={false} />

        {/* ============ 06 · PALETA (capítulo único de cor) ============ */}
        <section className={SECTION}>
          <div className={SHELL}>
            <SectionHead
              num="06"
              kicker="Paleta — Camadas do Subsolo"
              title="Uma paleta para os dois caminhos."
              desc="O subsolo é a constante. Preto e branco estruturam a identidade; as cores minerais são camadas variáveis que mudam conforme o artista, a obra e a experiência. A mesma paleta serve à Dobra e à Quebra — o que muda é a relação entre as cores, não as cores em si."
            />

            <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
              <SwatchCard tag="Constante" name="Preto Profundo" hex="#0A0A0A" rgb="10 / 10 / 10" cmyk="0 / 0 / 0 / 96" pantone="Black 6 C" uso="Base, profundidade, imersão" />
              <SwatchCard tag="Constante" name="Branco" hex="#F7F7F5" rgb="247 / 247 / 245" cmyk="0 / 0 / 1 / 3" pantone="Cool Gray 1 C" uso="Superfície, respiro, contraste" />
              <SwatchCard tag="Variável" name="Óxido" hex="#873F32" rgb="135 / 63 / 50" cmyk="0 / 53 / 63 / 47" pantone="7523 C" uso="Acento mineral · interferência" />
              <SwatchCard tag="Variável" name="Ocre Mineral" hex="#A88952" rgb="168 / 137 / 82" cmyk="0 / 18 / 51 / 34" pantone="4655 C" uso="Acento mineral · transição" />
            </div>
            <p className={`mt-6 ${LABEL} text-[11px] text-branco/45`}>
              Preto + Branco = constantes dos dois caminhos · Óxido + Ocre =
              camadas variáveis
            </p>

            <h3 className="mt-24 font-suisse text-2xl font-light tracking-tight md:text-4xl">
              A mesma paleta, duas relações.
            </h3>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {/* Dobra · transição */}
              <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                <div className="h-44 bg-[linear-gradient(90deg,#F7F7F5_0%,#A88952_40%,#873F32_70%,#0A0A0A_100%)] md:h-56" />
                <div className="p-8">
                  <p className={`${LABEL} text-[11px] text-branco/60`}>Caminho 01 · Dobra</p>
                  <p className="mt-3 font-museo text-2xl font-light">Transição</p>
                  <p className="mt-3 font-museo text-branco/60">
                    As camadas se aproximam, sobrepõem e mudam gradualmente. Campo
                    neutro → cor → nova condição, sem rupturas.
                  </p>
                  <p className={`mt-4 ${LABEL} text-[11px] text-branco/40`}>
                    Branco → Ocre → Óxido → Preto
                  </p>
                </div>
              </div>
              {/* Quebra · interrupção */}
              <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                <div className="flex h-44 md:h-56">
                  <div className="flex-1 bg-preto" />
                  <div className="flex-1 bg-branco" />
                  <div className="w-1/5 bg-oxido" />
                  <div className="flex-1 bg-branco" />
                  <div className="flex-1 bg-preto" />
                </div>
                <div className="p-8">
                  <p className={`${LABEL} text-[11px] text-branco/60`}>Caminho 02 · Quebra</p>
                  <p className="mt-3 font-monument text-2xl">INTERRUPÇÃO</p>
                  <p className="mt-3 font-favorit text-branco/60">
                    Preto e branco estruturam; a cor entra como interferência
                    definida. Campo neutro → cor → ruptura.
                  </p>
                  <p className={`mt-4 ${LABEL} text-[11px] text-branco/40`}>
                    Preto | Branco | Óxido
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-8 max-w-2xl font-suisse text-sm text-branco/55">
              A diferença entre os caminhos não está nas cores escolhidas, mas em
              como elas se relacionam dentro do sistema.
            </p>

            {/* Fundamentação e precedentes */}
            <div className="mt-20 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-2">
              <div>
                <p className={`${LABEL} text-[11px] text-branco/45`}>Fundamentação</p>
                <p className="mt-4 font-suisse leading-relaxed text-branco/65">
                  A paleta parte do subsolo como condição física e conceitual da
                  Téra. O preto é a constante — profundidade, ausência de luz e
                  caráter imersivo da sala. As demais cores não funcionam como
                  cor proprietária fixa, mas como camadas cromáticas que variam
                  conforme o artista, a obra e a experiência.
                </p>
              </div>
              <div>
                <p className={`${LABEL} text-[11px] text-branco/45`}>Referências e precedentes</p>
                <p className="mt-4 font-suisse leading-relaxed text-branco/65">
                  Flávia Gonsales identifica usos sistêmicos e transformativos da
                  cor no branding; Figueira, Raposo e Brandão destacam
                  flexibilidade e coerência como características centrais de
                  sistemas de identidade flexíveis para instituições culturais. O
                  Humboldt Labor mantém o preto como constante e deixa as cores
                  das exposições serem determinadas por referências temáticas; o
                  M21D trabalha com base preta e branca e acentos cromáticos que
                  evoluem e se adaptam.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 07 · PRINCÍPIO FINAL ============ */}
        <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden border-t border-white/10 py-24">
          <div className={`relative ${SHELL}`}>
            <SectionHead num="07" kicker="Princípio final" />
            <div className="mt-14 grid max-w-5xl gap-16 md:grid-cols-2">
              <div>
                <h3 className="font-museo text-4xl font-extralight tracking-tight md:text-5xl">
                  Dobra
                </h3>
                <p className="mt-6 font-museo text-lg leading-relaxed text-branco/70">
                  A identidade muda sem deixar de ser a mesma.
                </p>
                <p className={`mt-3 ${LABEL} text-xs text-branco/40`}>
                  Tipografia: continuidade · Cor: transição
                </p>
              </div>
              <div>
                <h3 className="font-monument text-3xl md:text-4xl">QUEBRA</h3>
                <p className="mt-6 font-favorit text-lg leading-relaxed text-branco/70">
                  A identidade cria significado a partir da diferença entre
                  elementos.
                </p>
                <p className={`mt-3 ${LABEL} text-xs text-branco/40`}>
                  Tipografia: contraste · Cor: interrupção
                </p>
              </div>
            </div>
            <p className="mt-20 max-w-2xl font-suisse leading-relaxed text-branco/55">
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
      className={`inline-block w-auto ${invert ? "invert" : ""} ${className}`}
    />
  );
}

function SupportFigure({
  src,
  alt,
  caption,
  light = false,
}: {
  src: string;
  alt: string;
  caption: string;
  light?: boolean;
}) {
  return (
    <figure className="mt-10 w-full max-w-[240px]">
      <div className={`overflow-hidden rounded-lg border border-white/10 ${light ? "bg-white p-3" : ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-full" />
      </div>
      <figcaption className={`mt-2 ${LABEL} text-[10px] text-branco/45`}>
        {caption}
      </figcaption>
    </figure>
  );
}

function SectionHead({
  num,
  kicker,
  title,
  desc,
}: {
  num: string;
  kicker: string;
  title?: string;
  desc?: string;
}) {
  return (
    <header className="max-w-4xl">
      <div className="flex items-center gap-4">
        <span className="font-suisse text-xs text-branco/40">{num}</span>
        <span className="h-px w-10 bg-white/25" />
        <span className={`${LABEL} text-[11px] text-branco/45`}>{kicker}</span>
      </div>
      {title && (
        <h2 className="mt-6 font-suisse text-3xl font-light tracking-tight md:text-5xl">
          {title}
        </h2>
      )}
      {desc && <p className="mt-4 max-w-2xl font-suisse text-branco/55">{desc}</p>}
    </header>
  );
}

function Split({
  src,
  alt,
  children,
  reverse = false,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section className="grid min-h-[80vh] w-full border-t border-white/10 md:min-h-screen md:grid-cols-2">
      <div
        className={`relative min-h-[50vh] md:min-h-screen ${
          reverse ? "md:order-1" : "md:order-2"
        }`}
      >
        <Image src={src} alt={alt} fill priority sizes="50vw" className="object-cover grayscale" />
      </div>
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
        <h2 className={`display-xl ${dobra ? "font-museo font-extralight" : "font-monument"}`}>
          {name}
        </h2>
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
  bodyClass = "font-suisse",
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
  const pc = primaryClass ?? (displayPrimary ? "font-monument" : "font-suisse font-light");
  return (
    <div className="max-w-4xl">
      <SectionHead num={num} kicker={`${path} — Tipografia`} />
      <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2">
        <span className={`text-3xl md:text-4xl ${pc}`}>{primary}</span>
        <span className="font-suisse text-sm text-branco/40">+ {secondary}</span>
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
  principle: string;
}) {
  const items = [primary, secondary];
  return (
    <div className="mt-12 max-w-4xl">
      <div className="grid gap-10 md:grid-cols-2">
        {items.map((r) => (
          <div key={r.name}>
            <p className={`${LABEL} text-[11px] text-branco/50`}>{r.name}</p>
            <p className={`mt-3 leading-relaxed text-branco/70 ${r.bodyClass ?? "font-suisse"}`}>
              {r.text}
            </p>
            <p className={`mt-3 ${LABEL} text-[10px] text-branco/40`}>Uso · {r.uso}</p>
          </div>
        ))}
      </div>
      <p className={`mt-10 border-l-2 border-white/20 pl-5 ${LABEL} text-[11px] text-branco/55`}>
        {principle}
      </p>
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
  num,
  path,
  kicker,
  offset,
  grayscale = true,
}: {
  num: string;
  path: string;
  kicker: string;
  offset: number;
  grayscale?: boolean;
}) {
  return (
    <section className="w-full border-t border-white/10 py-24 md:py-36">
      <div className={SHELL}>
        <SectionHead num={num} kicker={`${path} — ${kicker}`} />
        <p className="mt-4 font-suisse text-sm text-branco/45">
          Grade de fotos e vídeos dos artistas e experiências.
        </p>
      </div>
      {/* full-bleed, sem borda, tela inteira */}
      <div className="mt-12 w-full">
        <DynamicFrameLayout frames={makeFrames(offset)} gapSize={0} grayscale={grayscale} />
      </div>
    </section>
  );
}

function SwatchCard({
  tag,
  name,
  hex,
  rgb,
  cmyk,
  pantone,
  uso,
}: {
  tag: string;
  name: string;
  hex: string;
  rgb: string;
  cmyk: string;
  pantone: string;
  uso: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
      <div className="relative h-40 md:h-52" style={{ background: hex }}>
        <span className={`absolute left-4 top-4 rounded-full border border-white/40 bg-black/20 px-2.5 py-1 ${LABEL} text-[9px] text-white/90`}>
          {tag}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <span className="font-suisse text-base text-branco">{name}</span>
          <span className="font-suisse text-xs text-branco/60">{hex}</span>
        </div>
        <p className="mt-2 font-suisse text-xs leading-snug text-branco/50">{uso}</p>
        <dl className={`mt-4 space-y-1.5 border-t border-white/10 pt-4 ${LABEL} text-[10px]`}>
          <Row k="RGB" v={rgb} />
          <Row k="CMYK" v={cmyk} />
          <Row k="Pantone" v={pantone} />
        </dl>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-branco/30">{k}</dt>
      <dd className="text-branco/70 normal-case tracking-normal">{v}</dd>
    </div>
  );
}

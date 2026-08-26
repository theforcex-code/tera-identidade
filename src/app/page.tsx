"use client";

import { useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MindMap } from "@/components/mind-map";
import { EditableImage } from "@/components/editable";
import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout";
import { makeFrames } from "@/components/media-frames";
import { AreiaLab } from "@/components/areia-lab";

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
        className="slides bg-preto px-2 py-2 text-branco selection:bg-branco selection:text-preto md:px-4 md:py-3"
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
            <h2 className="mt-8 max-w-4xl font-univers text-4xl font-light leading-[1.08] tracking-tight md:text-7xl">
              Uma identidade para espetáculos que ainda não existem.
            </h2>
            <div className="mt-14 grid max-w-4xl gap-10 font-univers text-lg leading-relaxed text-preto/70 md:grid-cols-2 md:text-xl">
              <p>
                Téra nasce para receber artistas, linguagens e obras de
                diferentes naturezas. Por isso, sua identidade não define uma
                estética fechada: estabelece um sistema reconhecível, capaz de se
                transformar a cada espetáculo.
              </p>
              <p>
                Essa capacidade se desenvolve em dois caminhos, e o conceito já
                tem uma palavra para cada um. Matéria nasce do que ficou: o
                módulo das chapas gradeadas, a emenda dos gabinetes, a marca
                vazada com luz atravessando por trás. Luz nasce do que entrou: a
                matéria escoa, entra por uma fresta e preenche as letras por
                dentro.
              </p>
            </div>
          </div>
        </section>

        {/* ============ 02 · MAPA CONCEITUAL ============ */}
        <section className={SECTION}>
          <div className={SHELL}>
            <SectionHead
              num="02"
              kicker="Fluxograma"
              title="A construção do conceito."
            />
            <div className="mt-20">
              <MindMap />
            </div>
          </div>
        </section>

        {/* ============ 03 · CONCEITO CENTRAL ============ */}
        {/* Espaço amplo: hero em 16:9 mostra a imagem INTEIRA (contain, sem
            recorte) + parágrafo com respiro. A seção cresce além de 1 tela,
            então o pin do empilhamento nunca corta o conteúdo. */}
        <section className="relative w-full overflow-hidden border-t border-white/10 bg-preto">
          <div className={`${SHELL} pt-24 md:pt-28`}>
            <span className={`${LABEL} text-xs text-branco/50`}>
              03 — Conceito central
            </span>
          </div>

          {/* Hero — o geodo: pedra bruta por fora, cristal por dentro. A
              imagem do conceito inteiro numa peça só. */}
          <figure className="relative mx-auto mt-8 aspect-video max-h-[82vh] w-full max-w-[1600px] overflow-hidden md:mt-10">
            <div className="absolute inset-0">
              <EditableImage
                group="images"
                id="conceito-geral"
                defaultSrc="/media/mood-materia-r0-03.jpeg"
                alt="Geodo — a pedra bruta por fora, o cristal que emite luz por dentro"
                fit="contain"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-preto/10 via-preto/10 to-preto/55" />
            <figcaption className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-8 text-center">
              <h2 className="max-w-4xl font-univers text-4xl font-light leading-[1.05] tracking-tight text-branco drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-6xl">
                Da matéria à luz
              </h2>
              <p className="mt-5 max-w-xl font-univers text-lg leading-snug text-branco/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] md:text-xl">
                Onde havia terra, hoje há luz.
              </p>
            </figcaption>
          </figure>

          {/* Tese — a premissa que sustenta o conceito inteiro */}
          <div className={`${SHELL} pt-24 md:pt-32`}>
            <p className="mx-auto max-w-3xl text-center font-univers text-3xl font-light leading-[1.15] tracking-tight text-branco md:text-5xl">
              A tecnologia não é o oposto da natureza. É a natureza reorganizada
              pela inteligência.
            </p>
          </div>

          {/* Parágrafo — abaixo da imagem, com respiro generoso */}
          <div className={`${SHELL} py-20 md:py-28`}>
            <p className="mx-auto max-w-2xl text-center font-univers text-lg leading-relaxed text-branco/70 md:text-xl">
              Para receber o projeto, a obra escavou o subsolo do antigo Hospital
              Matarazzo: retirou-se a terra em volta da fundação e os pilares
              ficaram de pé. O LED ocupa hoje esse mesmo plano escavado — onde
              havia terra, hoje há luz, e toda noite o público atravessa essa
              fundação para chegar até ela. A própria tela repete o percurso: do
              quartzo vem o silício, e do silício vem o fóton que o olho absorve.
              A matéria produziu luz; agora a luz age sobre a matéria.
            </p>
          </div>

          {/* O percurso, frase a frase — mesma espinha vertical do fluxograma */}
          <div className={`${SHELL} pb-20 md:pb-28`}>
            <ol className="mx-auto flex max-w-xl flex-col items-center gap-0">
              {[
                "Terra vira cristal.",
                "Cristal vira circuito.",
                "Circuito controla cristal.",
                "Cristal emite luz.",
                "Luz encontra o corpo.",
              ].map((linha, i) => (
                <li key={linha} className="flex flex-col items-center">
                  {i > 0 && <span aria-hidden className="h-8 w-px bg-white/20" />}
                  <span className="py-2 text-center font-univers text-xl font-light leading-snug text-branco md:text-3xl">
                    {linha}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Fechamento — placa invertida, a mesma linguagem do fluxograma */}
          <div className={`${SHELL} pb-24 md:pb-36`}>
            <p className="mx-auto max-w-3xl bg-branco px-6 py-4 text-center font-univers text-xl font-bold uppercase leading-[1.4] tracking-[0.06em] text-preto md:text-3xl">
              A tecnologia não escapa da natureza. Ela a reorganiza.
            </p>
          </div>
        </section>

        {/* ================= 04 · CAMINHO 01 · MATÉRIA ================= */}
        {/* Capa — o grid pixelado: o módulo antes de qualquer imagem */}
        <PathDivider
          num="04"
          camada="Caminho 01"
          name="Matéria"
          variant="dobra"
          subtitle="Chapa · grid · corte · dobra · vão"
          media="/media/capa-modulacao.gif"
          mediaId="capa-materia"
          mediaZoom
        />

        {/* 04 · Descrição — painel dividido + imagem de apoio */}
        <Split
          id="dobra"
          src="/media/continuidade-conceito.png"
          alt="Estratos do solo — a terra que ficou, camada sobre camada"
        >
          <Eyebrow>04 · Matéria — Descrição</Eyebrow>
          <p className="mt-8 border-l-2 border-white/30 pl-6 font-forma text-2xl font-light leading-snug md:text-4xl">
            A identidade nasce do que ficou.
          </p>
          <p className="mt-8 max-w-md font-univers text-base leading-relaxed text-branco/60">
            O grid de 1×1 m das chapas gradeadas, a emenda dos gabinetes, o
            formato da tela de LED, a terra que ficou nos pilares. Tudo o que é
            sólido, imutável, geométrico — a moldura que não muda de um
            espetáculo para o outro.
          </p>
          <p className={`mt-6 ${LABEL} text-[11px] text-branco/45`}>
            chapa · grid · módulo · corte · dobra · vão
          </p>
        </Split>

        {/* 04 · Racional — entre o conceito e o moodboard (texto + pixel-stretch) */}
        <Split
          id="caminho1-racional"
          src="/media/mood-materia-r0-00.jpeg"
          alt="Matéria — o módulo repetido: a superfície antes de qualquer imagem"
        >
          <Eyebrow>04 · Matéria — Racional</Eyebrow>
          <p className="mt-8 max-w-md font-univers text-lg leading-relaxed text-branco/70">
            A fundação original do antigo Hospital Matarazzo foi preservada:
            retirou-se a terra em volta e os pilares ficaram de pé, aparentes na
            entrada. Este caminho parte do que sobrou dessa operação — o concreto
            aparente, a chapa gradeada de 1×1 m, a emenda dos gabinetes — e
            transforma a arquitetura da sala na moldura da identidade.
          </p>
        </Split>

        {/* 04 · Moodboard — grade 5×2 full-bleed em preto e branco (coeso) */}
        <TopicDivider label="Matéria" name="Moodboard" fontClass="font-forma font-extralight" />
        <MediaWall offset={0} grayscale={true} />

        {/* 04 · Tipografia — Roboto Flex: a mesma estrutura em 3 larguras */}
        <TopicDivider label="Matéria" name="Tipografia" fontClass="font-forma font-extralight" />
        <section className={SECTION}>
          <div className={SHELL}>
            {/* Mesma diagramação da paleta: texto à esquerda, specimens à direita */}
            <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
              <div className="max-w-md">
                <SectionHead num="04" kicker="Matéria — Tipografia" />
                <h3 className="mt-8 font-forma text-3xl font-light italic leading-tight text-branco md:text-4xl">
                  Roboto Flex
                </h3>
                <p className="mt-6 font-univers text-lg leading-snug text-branco/80">
                  A moldura tipográfica.
                </p>
                <p className="mt-6 font-univers text-base leading-relaxed text-branco/55">
                  Uma estrutura que se estende e se contrai sem perder sua
                  identidade — como a chapa, que muda de largura e continua sendo
                  o mesmo módulo.
                </p>
              </div>
              {/* Specimens — extended / regular / condensed */}
              <div className="flex flex-col gap-6 md:gap-8">
                <RobotoSpecimen variant="extended" widthClass="rf-extended" />
                <RobotoSpecimen variant="regular" widthClass="rf-regular" />
                <RobotoSpecimen variant="condensed" widthClass="rf-condensed" />
              </div>
            </div>
            {/* Secundária — Futura (mesma estrutura) */}
            <FuturaBoard />
            {/* Motion — o tipo variável em movimento (pixel-stretch): a forma se estende sem se romper */}
            <figure className="mt-24 overflow-hidden rounded-2xl border border-white/10 bg-black md:mt-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/continuidade-tipografia-motion.gif"
                alt="Tipografia em movimento — pixel-stretch: a forma se estende e se contrai"
                className="h-full w-full object-cover grayscale"
              />
              <figcaption className="px-6 py-4 font-univers text-sm leading-snug text-branco/55">
                Em movimento, a estrutura se estende e se contrai sem se romper —
                a forma muda sem deixar de ser a mesma.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* 04 · Paleta — Vibração da Matéria (segue o PDF do Caminho 01) */}
        <TopicDivider label="Matéria" name="Paleta" fontClass="font-forma font-extralight" />
        <PaletaMateria />

        {/* ================= 05 · CAMINHO 02 · LUZ ================= */}
        {/* Capa — a matéria escoando: o plasma antes de virar forma */}
        <PathDivider
          num="05"
          camada="Caminho 02"
          name="LUZ"
          variant="quebra"
          subtitle="Plasma · onda · orgânico · preenchimento"
          media="/media/mood-luz-r0-01.mp4"
          mediaId="capa-luz"
          grayscale={false}
          fontClass="font-inter font-semibold"
          mediaZoom
        />

        {/* 05 · Descrição — painel dividido + vídeo (card portrait) */}
        <Split
          video="/media/mood-luz-r0-04.mp4"
          alt="A matéria escoa e entra por uma fresta"
        >
          <Eyebrow>05 · Luz — Descrição</Eyebrow>
          <p className="mt-8 border-l-2 border-white/30 pl-6 font-inter text-2xl font-bold leading-snug md:text-4xl">
            A identidade nasce do que entrou.
          </p>
          <p className="mt-8 max-w-md font-univers text-base leading-relaxed text-branco/60">
            A matéria escoa, entra por uma fresta e preenche as letras por
            dentro. A onda, o orgânico, o plasma, as artes de cada espetáculo:
            tudo o que muda de uma obra para a outra e encontra na moldura o seu
            limite.
          </p>
          <p className={`mt-6 ${LABEL} text-[11px] text-branco/45`}>
            plasma · onda · fresta · escoamento · preenchimento
          </p>
        </Split>

        {/* 05 · Racional — texto + moiré invertido (card do mesmo tamanho do vídeo) */}
        <Split
          video="/media/mood-luz-r1-01.mp4"
          alt="A letra preenchida por dentro — o plasma dentro da forma"
        >
          <Eyebrow>05 · Luz — Racional</Eyebrow>
          <p className="mt-8 max-w-md font-univers text-lg leading-relaxed text-branco/70">
            Quatro faces de LED ocupam o fundo do vão, no mesmo plano de onde a
            terra saiu. Este caminho parte do que entrou nesse lugar — a imagem
            em 32K, o plasma, a obra de cada artista — para criar uma identidade
            que não tem forma própria: assume a do espetáculo que estiver
            acontecendo.
          </p>
        </Split>

        {/* 05 · Moodboard — grade 5×2 full-bleed em P&B */}
        <TopicDivider label="Luz" name="Moodboard" fontClass="font-inter font-semibold not-italic" />
        {/* Em cor, ao contrário do de Matéria: a moldura é P&B, o que a
            preenche é que traz cor — a regra do conceito, aplicada ao deck. */}
        <MediaWall offset={3} grayscale={false} />

        {/* 05 · Tipografia — Inter: a mesma base modular em 3 cortes */}
        <TopicDivider label="Luz" name="Tipografia" fontClass="font-inter font-semibold not-italic" />
        <section className={SECTION}>
          <div className={SHELL}>
            {/* Mesma diagramação da paleta: texto à esquerda, specimens à direita */}
            <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
              <div className="max-w-md">
                <SectionHead num="05" kicker="Luz — Tipografia" />
                <h3 className="mt-8 font-inter text-3xl font-semibold leading-tight text-branco md:text-4xl">
                  Inter
                </h3>
                <p className="mt-6 font-univers text-lg leading-snug text-branco/80">
                  Estrutura modular.
                </p>
                <p className="mt-6 font-univers text-base leading-relaxed text-branco/55">
                  Uma base precisa para organizar repetições, alternâncias e
                  sobreposições.
                </p>
              </div>
              {/* Specimens — Medium / Bold / Extra Light Italic */}
              <div className="flex flex-col gap-6 md:gap-8">
                <TextSpecimen label="INTER MEDIUM" styleClass="font-inter font-medium not-italic" />
                <TextSpecimen label="INTER BOLD" styleClass="font-inter font-bold not-italic" />
                <TextSpecimen label="INTER BOLD" styleClass="font-inter font-bold not-italic" />
              </div>
            </div>
            {/* Secundária — Futura (mesma estrutura) */}
            <FuturaBoard marginClass="mt-10" />
          </div>
        </section>

        {/* 05 · Paleta — sistema cromático do Caminho 02 */}
        <TopicDivider label="Luz" name="Paleta" fontClass="font-inter font-semibold not-italic" />

        {/* 05 · Paleta em movimento — Lab 02 · Areia (theforcex-code/tera-areia),
            servido de /public/areia para o deck não depender de rede. Cada grão
            guarda a cor do instante em que caiu: a paleta vira estrato. */}
        <section className={SECTION}>
          <div className={SHELL}>
            <SectionHead num="05" kicker="Luz — Paleta em movimento" />
            <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1fr)_320px] md:items-end">
              <h3 className="font-inter text-3xl font-semibold leading-tight text-branco md:text-5xl">
                A matéria escoa e preenche as letras por dentro.
              </h3>
              <p className="font-univers text-base leading-relaxed text-branco/60">
                Grãos de 1 pixel caem, escorregam e assentam dentro do wordmark.
                Cada camada guarda a cor do instante em que caiu — o logo cheio é
                um registro do tempo que levou para enchê-lo, e a paleta vira
                estrato.
              </p>
            </div>

            <p className="mt-12 flex flex-wrap gap-6 font-univers text-sm text-branco/45">
              <span>
                Lab 02 · Areia — a roda do mouse rola a apresentação; clique no
                lab para girar e dar zoom, Esc volta ao scroll.
              </span>
              <a href="/areia/index.html" target="_blank" rel="noreferrer" className="underline decoration-white/30 underline-offset-4 hover:text-branco">
                WebGPU
              </a>
              <a href="/areia/3d.html?encher" target="_blank" rel="noreferrer" className="underline decoration-white/30 underline-offset-4 hover:text-branco">
                WebGL
              </a>
              <a href="/areia/2d.html" target="_blank" rel="noreferrer" className="underline decoration-white/30 underline-offset-4 hover:text-branco">
                2D
              </a>
            </p>
          </div>
        </section>

        {/* O lab ocupa a tela inteira: a interface dele já é full-bleed, então
            qualquer moldura aqui só rouba área do wordmark se enchendo. */}
        <AreiaLab
          srcGpu="/areia/index.html?paleta=plasma"
          srcWebgl="/areia/3d.html?encher&paleta=plasma"
          title="Lab 02 · Areia — o wordmark Téra preenchido por areia"
        />

        <PaletaCaminho num="05" path="Luz" data={VIBRACAO_DATA} />

        {/* ============ 06 · LOGO ============ */}
        <section className={SECTION}>
          <div className={SHELL}>
            <SectionHead
              num="06"
              kicker="Sistema de marca"
              title="Logo."
              desc="Variações da marca aplicadas em diferentes contextos e suportes."
            />
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {[
                { id: "logo-1", src: "/brand/logo-1.svg", label: "Variação 01" },
                { id: "logo-2", src: "/brand/logo-2.svg", label: "Variação 02" },
                { id: "logo-3", src: "/brand/logo-3.svg", label: "Variação 03" },
                { id: "logo-1-repetido", src: "/brand/logo-1.svg", label: "Variação 01" },
                { id: "logo-2-repetido", src: "/brand/logo-2.svg", label: "Variação 02" },
                { id: "logo-3-repetido", src: "/brand/logo-3.svg", label: "Variação 03" },
              ].map((l) => (
                <figure key={l.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-branco">
                  <div className="absolute inset-8">
                    <EditableImage
                      group="images"
                      id={l.id}
                      defaultSrc={l.src}
                      alt={`TÉRA — ${l.label}`}
                      fit="contain"
                    />
                  </div>
                  <figcaption className={`absolute bottom-4 left-4 ${LABEL} text-[10px] text-preto/45`}>
                    {l.label}
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[
                { src: "/media/logo-motion-01.mp4", label: "Movimento 01" },
                { src: "/media/logo-motion-02.mp4", label: "Movimento 02" },
                { src: "/media/logo-motion-03.mp4", label: "Movimento 03" },
                { src: "/media/logo-motion-04.mp4", label: "Movimento 04" },
                { src: "/media/logo-motion-05.mp4", label: "Movimento 05" },
              ].map((video) => (
                <figure key={video.src} className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-preto">
                  <video
                    src={video.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <figcaption className={`absolute bottom-4 left-4 ${LABEL} text-[10px] text-branco/45`}>
                    {video.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ============ 07 · PRINCÍPIO FINAL ============ */}
        <section className="relative bg-preto flex min-h-screen w-full flex-col justify-center overflow-hidden border-t border-white/10 py-24">
          <div className={`relative ${SHELL}`}>
            <SectionHead num="07" kicker="Princípio final" />
            <div className="mt-14 grid max-w-5xl gap-16 md:grid-cols-2">
              <div>
                <h3 className="font-univers text-4xl font-light tracking-tight md:text-5xl">
                  Matéria
                </h3>
                <p className="mt-6 font-univers text-lg leading-relaxed text-branco/70">
                  A identidade nasce do que ficou: o grid, a chapa, o vão. O que
                  é sólido, imutável, geométrico.
                </p>
              </div>
              <div>
                <h3 className="font-univers text-4xl font-light tracking-tight md:text-5xl">
                  Luz
                </h3>
                <p className="mt-6 font-univers text-lg leading-relaxed text-branco/70">
                  A identidade nasce do que entrou: a onda, o plasma, a obra de
                  cada artista. O que muda a cada espetáculo.
                </p>
              </div>
            </div>
            <p className="mt-20 max-w-2xl font-univers text-2xl leading-relaxed text-branco md:text-3xl">
              Terra é memória. Luz é o presente.
              <br />
              <span className="text-branco/55">
                Matéria é a moldura. Luz é o que a preenche.
              </span>
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
  id,
  video,
  invert = false,
}: {
  src?: string;
  alt: string;
  children: React.ReactNode;
  reverse?: boolean;
  id?: string;
  video?: string;
  invert?: boolean;
}) {
  // Mídia grande e contida (imagem inteira) sobre fundo preto — mesma cor do fundo.
  return (
    <section className="relative bg-preto grid min-h-[80vh] w-full border-t border-white/10 md:min-h-screen md:grid-cols-2">
      <figure
        className={`relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-preto p-6 md:min-h-screen md:p-10 ${
          reverse ? "md:order-1" : "md:order-2"
        }`}
      >
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className={`max-h-full max-w-full rounded-2xl object-contain ${invert ? "invert" : ""}`}
          />
        ) : id ? (
          <div className="relative h-full w-full">
            <EditableImage
              group="images"
              id={id}
              defaultSrc={src ?? ""}
              alt={alt}
              fit="contain"
              invert={invert}
            />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className={`max-h-full max-w-full object-contain ${invert ? "invert" : ""}`}
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

// Capa do caminho: tela cheia com a palavra e, opcionalmente, um GIF/vídeo de
// fundo editável (o "GIF de capa" do roteiro) sob um véu escuro.
function PathDivider({
  num,
  camada,
  name,
  variant,
  subtitle,
  media,
  mediaId,
  mediaZoom = false,
  fontClass,
  grayscale = true,
}: {
  num: string;
  camada: string;
  name: string;
  variant: "dobra" | "quebra";
  subtitle?: string;
  media?: string;
  mediaId?: string;
  mediaZoom?: boolean;
  fontClass?: string;
  /** Matéria é a moldura: P&B. Luz é o que a preenche: cor. */
  grayscale?: boolean;
}) {
  const dobra = variant === "dobra";
  const nameFont = fontClass ?? (dobra ? "font-forma font-extralight" : "font-futura");
  return (
    <section className="relative grid h-screen w-full place-content-center overflow-hidden border-t border-white/10 bg-preto">
      {media && mediaId && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            {media.endsWith(".mp4") ? (
              <video
                src={media}
                autoPlay
                loop
                muted
                playsInline
                className={`h-full w-full object-cover ${grayscale ? "grayscale" : ""}`}
              />
            ) : (
              <EditableImage
                group="images"
                id={mediaId}
                defaultSrc={media}
                alt={`${name} — capa`}
                grayscale={grayscale}
                className={mediaZoom ? "scale-125" : ""}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-preto/65" />
        </>
      )}
      <div className="relative z-[5] text-center">
        <p className={`mb-8 ${LABEL} text-sm text-branco/40`}>
          {num} · {camada}
        </p>
        <h2 className={`display-xl ${nameFont}`}>{name}</h2>
        {subtitle && (
          <p className={`mt-6 ${LABEL} text-xs text-branco/55`}>{subtitle}</p>
        )}
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

// Capítulo de paleta (institucionais + cores de matéria). Renderizado dentro de
// cada caminho — mesmo conteúdo cromático, cabeçalho parametrizado pelo caminho.
// Paleta do Caminho 01 — "Vibração da Matéria" (segue caminho1-04.pdf):
// base cromática reduzida (branco→cinza + preto) + 4 acentos que a luz revela.
// Dados de paleta por caminho (a base institucional White/Black é comum).
const VIBRACAO_DATA = {
  titleFontClass: "font-forma font-light italic",
  title: "Vibração da Luz",
  lead: ["A moldura permanece.", "A luz é o que muda de cor."],
  body: "A base cromática da matéria é fixa e reduzida. Reflexos, brilhos e interferências introduzem variações pontuais conforme a luz encontra a superfície — e cada espetáculo traz as suas.",
  materialSrc: "/media/vibracao-materia.png",
  materialAlt: "Matéria em vibração",
  materialAspect: "736 / 981",
  gradientV: "linear-gradient(180deg, #EE2F58 0%, #46A2B7 38%, #FFAE0D 72%, #F93406 100%)",
  gradientH: "linear-gradient(90deg, #EE2F58 0%, #46A2B7 38%, #FFAE0D 72%, #F93406 100%)",
  accentsTitle: "Acentos — a luz revela.",
  accentsBody: "Reflexos e interferências pontuais. Podem ser usadas isoladas, combinadas ou transformadas em gradiente — a unidade vem do sistema, não da semelhança.",
  accents: [
    { code: "A1", name: "Rosa", hex: "#EE2F58", rgb: "238 / 47 / 88", cmyk: "0 / 80 / 63 / 7", pantone: "a validar", tag: "Brilho", note: "Reflexo intenso — ponto de energia sobre a base." },
    { code: "A2", name: "Ciano", hex: "#46A2B7", rgb: "70 / 162 / 183", cmyk: "62 / 12 / 0 / 28", pantone: "a validar", tag: "Reflexo", note: "Frieza mineral — luz que atravessa a superfície." },
    { code: "A3", name: "Âmbar", hex: "#FFAE0D", rgb: "255 / 174 / 13", cmyk: "0 / 32 / 95 / 0", pantone: "a validar", tag: "Luz", note: "Calor luminoso — incidência direta sobre a matéria." },
    { code: "A4", name: "Óxido", hex: "#F93406", rgb: "249 / 52 / 6", cmyk: "0 / 79 / 98 / 2", pantone: "a validar", tag: "Calor", note: "Incandescência — a matéria no limite térmico." },
  ],
  conceitoTitle: "A moldura permanece. A luz muda.",
  conceitoBody: "Branco e Preto garantem continuidade. Os acentos dão a cada obra uma manifestação própria — a luz encontrando a matéria.",
};

const MATERIA_PALETTE = [
  { name: "Preto Carvão", hex: "#171819", rgb: "23 / 24 / 25", cmyk: "8 / 4 / 0 / 90", usage: "20%" },
  { name: "Cinza Concreto Escuro", hex: "#292B2C", rgb: "41 / 43 / 44", cmyk: "7 / 2 / 0 / 83", usage: "15%" },
  { name: "Cinza Mineral", hex: "#B8B5AF", rgb: "184 / 181 / 175", cmyk: "0 / 2 / 5 / 28", usage: "15%" },
  { name: "Azul Ardósia", hex: "#354A55", rgb: "53 / 74 / 85", cmyk: "38 / 13 / 0 / 67", usage: "12,5%" },
  { name: "Marrom Terra", hex: "#6E4A30", rgb: "110 / 74 / 48", cmyk: "0 / 33 / 56 / 57", usage: "12,5%" },
  { name: "Terracota", hex: "#A54E1F", rgb: "165 / 78 / 31", cmyk: "0 / 53 / 81 / 35", usage: "12,5%" },
  { name: "Ocre Iluminado", hex: "#C7955D", rgb: "199 / 149 / 93", cmyk: "0 / 25 / 53 / 22", usage: "12,5%" },
];

/** Luminância relativa (WCAG) de um hex. */
function luminancia(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const canal = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return (
    0.2126 * canal((n >> 16) & 255) +
    0.7152 * canal((n >> 8) & 255) +
    0.0722 * canal(n & 255)
  );
}

/** Tinta preta ou branca, a que render mais contraste sobre o swatch.
    Preto ganha acima de L≈0,179 — é onde as duas razões se cruzam, não 0,5. */
function tintaSobre(hex: string) {
  return luminancia(hex) > 0.1791 ? "preta" : "branca";
}

function PaletaMateria() {
  return (
    <section className={SECTION}>
      <div className={SHELL}>
        <SectionHead num="04" kicker="Matéria — Paleta" />

        <div className="mt-16 overflow-x-auto pb-2">
          <div className="mx-auto min-w-[980px] overflow-hidden rounded-2xl border border-white/10 bg-preto">
            <div className="grid" style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
              {MATERIA_PALETTE.map((color, index) => (
                <article
                  key={color.name}
                  className={`relative flex min-w-0 items-center justify-center px-5 text-center ${
                    index === 2 ? "border-r-2 border-white/50" : "border-r border-white/10"
                  } last:border-r-0`}
                  style={{ height: "520px", background: color.hex }}
                >
                  {/* Tinta escolhida pela luminância do swatch: em Cinza
                      Mineral e Ocre Iluminado o texto branco ficava ilegível. */}
                  <p
                    className="font-forma text-lg font-light leading-tight md:text-xl"
                    style={
                      tintaSobre(color.hex) === "preta"
                        ? { color: "#0a0a0a" }
                        : { color: "#ffffff", textShadow: "0 1px 10px rgba(0,0,0,0.28)" }
                    }
                  >
                    {color.name}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Paleta de um caminho: matéria + gradiente + swatches, base institucional e
// acentos com dados completos. Conteúdo vem de `data` (Vibração / Interferência).
function PaletaCaminho({
  num,
  path,
  data,
}: {
  num: string;
  path: string;
  data: typeof VIBRACAO_DATA;
}) {
  return (
    <section className={SECTION}>
      <div className={SHELL}>
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Texto */}
          <div className="max-w-md">
            <SectionHead num={num} kicker={`${path} — Paleta`} />
            <h3 className={`mt-8 ${data.titleFontClass} text-3xl leading-tight text-branco md:text-4xl`}>
              {data.title}
            </h3>
            <p className="mt-6 font-univers text-lg leading-snug text-branco/80">
              {data.lead.map((l, i) => (
                <span key={i}>
                  {l}
                  {i < data.lead.length - 1 && <br />}
                </span>
              ))}
            </p>
            <p className="mt-6 font-univers text-base leading-relaxed text-branco/55">
              {data.body}
            </p>
          </div>

          {/* Matéria + base (branco/preto) + gradiente dos acentos + swatches (Screenshot_5) */}
          <div className="flex h-[340px] gap-3 md:h-[460px]">
            <div
              className="h-full shrink-0 overflow-hidden rounded-xl"
              style={{ aspectRatio: data.materialAspect }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.materialSrc}
                alt={data.materialAlt}
                className={`block h-full w-full object-cover ${
                  path === "Possibilidade" ? "scale-[1.035]" : ""
                }`}
              />
            </div>
            <div
              className="flex-[0.7] rounded-xl border border-white/10"
              style={{ background: "linear-gradient(to bottom, #ffffff, #8a8a8a)" }}
              aria-label="Base clara"
            />
            <div
              className="flex-[0.7] rounded-xl border border-white/10"
              style={{ background: "linear-gradient(to bottom, #3a3a3a, #050505)" }}
              aria-label="Base escura"
            />
            <div
              className="flex-[0.7] rounded-xl border border-white/10"
              style={{ background: data.gradientV }}
              aria-label="Gradiente dos acentos"
            />
            <div className="flex flex-[1.15] flex-col gap-3">
              {data.accents.map((a) => (
                <div key={a.hex} className="flex flex-1 items-stretch gap-2">
                  <div
                    className="flex-1 rounded-xl border border-white/10"
                    style={{ background: a.hex }}
                  />
                  <span className="flex w-14 items-center font-univers text-[10px] tracking-wider text-branco/50">
                    {a.hex.replace("#", "")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Acentos — gradiente + dados completos por cor */}
        <div className="mt-20">
          <h3 className="font-univers text-2xl font-light tracking-tight md:text-4xl">
            {data.accentsTitle}
          </h3>
          <p className="mt-4 max-w-2xl font-univers text-branco/55">
            {data.accentsBody}
          </p>
          <div
            className="mt-8 h-14 w-full rounded-xl border border-white/10 md:h-16"
            style={{ background: data.gradientH }}
            aria-label="Gradiente dos acentos"
          />
          <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {data.accents.map((c) => (
              <MaterialSwatch key={c.code} {...c} />
            ))}
          </div>
        </div>

        {/* Conceito */}
        <div className="mt-20 border-t border-white/10 pt-12">
          <p className={`${LABEL} text-[11px] text-branco/45`}>Conceito</p>
          <p className="mt-4 max-w-2xl font-univers text-2xl font-light leading-snug tracking-tight md:text-3xl">
            {data.conceitoTitle}
          </p>
          <p className="mt-4 max-w-2xl font-univers leading-relaxed text-branco/60">
            {data.conceitoBody}
          </p>
        </div>
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

// Alfabeto em pares Aa Bb Cc … (specimen Roboto Flex, como no PDF do Caminho 01).
const ALPHA_PAIRS =
  "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz";

// Card de largura da Roboto Flex — mesma forma, larguras diferentes (continuidade).
function RobotoSpecimen({
  variant,
  widthClass,
}: {
  variant: string;
  widthClass: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <span className={`${widthClass} text-xl leading-none text-branco md:text-2xl`}>
          ROBOTO FLEX
        </span>
        <span className={`${LABEL} text-[10px] text-branco/45`}>{variant}</span>
      </div>
      <p className={`${widthClass} break-words text-base leading-snug text-branco/85 md:text-lg`}>
        {ALPHA_PAIRS}
      </p>
      <p className={`${widthClass} mt-2 text-base tracking-wider text-branco/55 md:text-lg`}>
        {NUMS}
      </p>
    </div>
  );
}

// Card de peso da Inter — a mesma base modular em cortes diferentes (Caminho 02).
function TextSpecimen({
  label,
  styleClass,
}: {
  label: string;
  styleClass: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
      <p className={`${styleClass} mb-4 text-xl leading-none text-branco md:text-2xl`}>
        {label}
      </p>
      <p className={`${styleClass} break-words text-base leading-snug text-branco/85 md:text-lg`}>
        {ALPHA_PAIRS}
      </p>
      <p className={`${styleClass} mt-2 text-base tracking-wider text-branco/55 md:text-lg`}>
        {NUMS}
      </p>
    </div>
  );
}

// Board da tipografia secundária (Futura) — mesma estrutura da primária.
// Presente nos dois caminhos: o contraponto geométrico à base.
function FuturaBoard({ marginClass = "mt-16" }: { marginClass?: string }) {
  return (
    <div className={`${marginClass} grid items-center gap-12 border-t border-white/10 pt-16 md:grid-cols-2 md:gap-16`}>
      <div className="max-w-md">
        <p className={`${LABEL} text-[11px] text-branco/45`}>Secundária</p>
        <h3 className="mt-3 font-futura text-3xl leading-tight text-branco md:text-4xl">
          Futura
        </h3>
        <p className="mt-6 font-univers text-lg leading-snug text-branco/80">
          Geometria abstrata.
        </p>
        <p className="mt-6 font-univers text-base leading-relaxed text-branco/55">
          Entra em títulos, intervenções e momentos de maior impacto — o
          contraponto geométrico à base.
        </p>
      </div>
      <div className="flex flex-col gap-6 md:gap-8">
        <TextSpecimen label="FUTURA BOLD" styleClass="font-futura" />
        <TextSpecimen label="FUTURA BOOK" styleClass="font-futura-regular" />
        <TextSpecimen label="FUTURA LIGHT" styleClass="font-futura-light" />
      </div>
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-12">
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
    <section className="relative w-full bg-preto">
      {/* full-bleed: grade 5×2 (desktop) / 2×5 (mobile) na altura do viewport */}
      <DynamicFrameLayout
        frames={makeFrames(offset)}
        gapSize={0}
        grayscale={grayscale}
        fullScreen
      />
    </section>
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




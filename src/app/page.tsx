"use client";

import { useEffect, useRef, useState } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MindMap } from "@/components/mind-map";
import { EditableImage, EditOverlay } from "@/components/editable";
import { DynamicFrameLayout } from "@/components/ui/dynamic-frame-layout";
import { TypographyEditorial, TypographyLuzEditorial } from "@/components/ui/typography-editorial";
import { makeFrames } from "@/components/media-frames";
import { AreiaLab } from "@/components/areia-lab";
import { VideoScrub } from "@/components/video-scrub";
import { LogoLab } from "@/components/logo-lab";
import { Defesa } from "@/components/defesa";
import { SHELL, SECTION, LABEL } from "@/lib/deck";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ================================================================
   TÉRA  -  APRESENTAÇÃO DE IDENTIDADE VISUAL
   Fundo preto; apenas o Manifesto é branco.
   Design preto e branco  -  cor só como conteúdo (paleta) e fotos.
   Tipografia de apoio na mesma família do texto (Suisse Int'l).
================================================================ */

// SHELL, SECTION e LABEL agora moram em src/lib/deck.ts: a defesa do Logo 2
// virou componente próprio e precisa das mesmas medidas.

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMS = "0123456789";
const SYM = ".,:;!?@#%&/()[]{}+-=*";

// Cores de matéria  -  variáveis (03 a 14). HEX derivado do RGB fornecido.
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
      //
      // O `pin` embrulha cada seção num `pin-spacer`, ou seja, mexe no DOM que
      // o React montou. Isso só é seguro porque o StrictMode está desligado
      // (next.config.ts): com ele ligado, o duplo-mount de desenvolvimento
      // remontava a árvore por cima dos spacers e a página caía inteira em
      // `insertBefore: node is no longer a child`. Vale para dev  -  em
      // produção o React nunca monta duas vezes.
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
            alt="TÉRA  -  Sala Abaixo, subsolo da Cidade Matarazzo"
          />
          <div className="absolute inset-0 bg-preto/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-preto/75 via-preto/15 to-preto/45" />

          {/* A capa anuncia a entrega, do mesmo jeito que a da Entrega 02:
              palavra grande e centrada sobre a mídia. Saiu daqui o wordmark 3D
              girando  -  ele mostrava a marca antiga, e capa de entrega não é
              lugar de mostrar marca. */}
          <h2 className="absolute inset-x-0 top-1/2 z-[5] -translate-y-1/2 px-8 text-center display-xl font-futura">
            Entrega 1
          </h2>
        </section>

        {/* ============ 01 · MAPA CONCEITUAL ============ */}
        <section className={SECTION}>
          <div className={SHELL}>
            <SectionHead
              num="01"
              kicker="Fluxograma"
              title="A construção do conceito."
            />
            <div className="mt-20">
              <MindMap />
            </div>
          </div>
        </section>

        {/* ============ 02 · CONCEITO CENTRAL ============ */}
        {/* Espaço amplo: hero em 16:9 mostra a imagem INTEIRA (contain, sem
            recorte) + parágrafo com respiro. A seção cresce além de 1 tela,
            então o pin do empilhamento nunca corta o conteúdo. */}
        <section className="relative w-full overflow-hidden border-t border-white/10 bg-preto">
          <div className={`${SHELL} pt-24 md:pt-28`}>
            <span className={`${LABEL} text-xs text-branco/50`}>
              02  -  Conceito central
            </span>
          </div>

          {/* Hero  -  o geodo: pedra bruta por fora, cristal por dentro. A
              imagem do conceito inteiro numa peça só. */}
          <figure className="relative mx-auto mt-8 aspect-video max-h-[82vh] w-full max-w-[1600px] overflow-hidden md:mt-10">
            <div className="absolute inset-0">
              <EditableImage
                group="images"
                id="conceito-geral"
                defaultSrc="/media/mood-materia-r0-03.jpeg"
                alt="Geodo  -  a pedra bruta por fora, o cristal que emite luz por dentro"
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

          {/* Tese  -  a premissa que sustenta o conceito inteiro */}
          <div className={`${SHELL} pt-24 md:pt-32`}>
            <p className="mx-auto max-w-3xl text-center font-univers text-3xl font-light leading-[1.15] tracking-tight text-branco md:text-5xl">
              A tecnologia não é o oposto da natureza. É a natureza reorganizada
              pela inteligência.
            </p>
          </div>

          {/* Sem parágrafo de racional aqui: ele era um resumo do texto que o
              estágio 04 do fluxograma já traz por inteiro. A seção vai direto
              da tese para o percurso. */}

          {/* O percurso, frase a frase  -  mesma espinha vertical do fluxograma.
              Fecha a seção: a placa que vinha depois repetia a tese de cima.
              O `pt` cobre o respiro que o parágrafo removido dava. */}
          <div className={`${SHELL} pb-24 pt-20 md:pb-36 md:pt-28`}>
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
        </section>

        {/* ============ 03 · MANIFESTO (única seção branca) ============ */}
        {/* Depois do conceito, não antes: o manifesto agora lê como consequência
            do argumento, e a única tela branca dá respiro após três escuras. */}
        <section className="relative flex w-full flex-col justify-center border-t border-white/10 bg-branco py-24 text-preto md:min-h-screen md:py-36">
          <div className={SHELL}>
            <header className="max-w-4xl">
              <div className="flex items-center gap-4">
                <span className="font-univers text-xs text-preto/40">03</span>
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
                Essa capacidade se desenvolve em dois caminhos, um para cada
                palavra do conceito. Matéria vem da arquitetura: as grades que
                revestem a sala, o formato e os ângulos dos painéis de LED, a
                terra que ficou nos pilares  -  a geometria que já estava lá. Luz
                vem do que acontece dentro dela: o orgânico, o fluido, a obra
                que muda a cada espetáculo.
              </p>
            </div>
          </div>
        </section>

        {/* ================= 04 · CAMINHO 01 · MATÉRIA ================= */}
        {/* Capa  -  o grid pixelado: o módulo antes de qualquer imagem */}
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

        {/* 04 · Descrição  -  painel dividido + imagem de apoio */}
        <Split
          video="/media/comp-1-68.mp4"
          alt="Composição em movimento para o caminho Matéria"
        >
          <Eyebrow>04 · Matéria  -  Descrição</Eyebrow>
          <p className="mt-8 border-l-2 border-white/30 pl-6 font-forma text-2xl font-light leading-snug md:text-4xl">
            Tudo se apoia no mesmo módulo.
          </p>
          <p className="mt-8 max-w-md font-univers text-base leading-relaxed text-branco/60">
            A sala foi construída à vista: estrutura, concreto e revestimento
            continuam aparentes. É dessa arquitetura que o sistema tira suas
            medidas. Proporção, alinhamento e recorte saem de uma grade só; marca,
            tipografia e imagem obedecem a ela antes de qualquer obra entrar.
          </p>
        </Split>

        {/* 04 · Racional  -  entre o conceito e o moodboard (texto + pixel-stretch) */}
        <Split
          id="caminho1-racional"
          src="/media/mood-materia-r0-00.jpeg"
          alt="Matéria  -  o módulo repetido: a superfície antes de qualquer imagem"
        >
          <Eyebrow>04 · Matéria  -  Racional</Eyebrow>
          <p className="mt-8 max-w-md font-univers text-lg leading-relaxed text-branco/70">
            A identidade é construída pela sedimentação de todas as artes e
            experiências que atravessam a TÉRA. Como um geodo, ela acumula
            camadas, matéria e tempo: por fora, estrutura; por dentro,
            possibilidades que se revelam a cada obra.
          </p>
        </Split>

        {/* Moodboard - ordem da estrutura lucianov2 */}
        <TopicDivider label="Matéria" name="Moodboard" fontClass="font-forma font-extralight" />
        <MediaWall offset={0} grayscale={true} />

        {/* Tipografia protegida */}
        <TopicDivider label="Matéria" name="Tipografia" fontClass="font-neue-montreal font-medium" />
        <TypographyEditorial />

        {/* Paleta mineral protegida */}
        <TopicDivider label="Matéria" name="Paleta" fontClass="font-neue-montreal font-medium" />
        <PaletaPossibilidade />


        {/* ================= 05 · CAMINHO 02 · LUZ ================= */}
        {/* Capa  -  a matéria escoando: o plasma antes de virar forma */}
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

        {/* 05 · Descrição  -  painel dividido + vídeo (card portrait) */}
        <Split
          video="/media/mood-luz-r0-04.mp4"
          alt="A matéria escoa e entra por uma fresta"
        >
          <Eyebrow>05 · Luz  -  Descrição</Eyebrow>
          <p className="mt-8 border-l-2 border-white/30 pl-6 font-inter text-2xl font-bold leading-snug md:text-4xl">
            Nada aqui tem forma fixa.
          </p>
          {/* Sem repetir "escoa / fresta / preenche": essa frase já é a legenda
              do fluxograma e o manifesto. Aqui o assunto é a regra. */}
          <p className="mt-8 max-w-md font-univers text-base leading-relaxed text-branco/60">
            Cor, textura e movimento chegam com cada obra e ocupam os vazios que
            o módulo abriu. O sistema não escolhe a imagem: abre lugar para ela.
          </p>
        </Split>

        {/* 05 · Racional  -  texto + moiré invertido (card do mesmo tamanho do vídeo) */}
        <Split
          video="/media/mood-luz-r1-01.mp4"
          alt="A letra preenchida por dentro  -  o plasma dentro da forma"
        >
          <Eyebrow>05 · Luz  -  Racional</Eyebrow>
          {/* A escavação já foi contada duas vezes antes; aqui entra o que a
              sala virou, e o que isso exige da marca. */}
          <p className="mt-8 max-w-md font-univers text-lg leading-relaxed text-branco/70">
            Quatro faces de LED envolvem o público, e a imagem em 32K deixa de
            ocupar uma parede para constituir o espaço. Cada temporada traz
            outra obra, outra paleta, outro ritmo  -  e a marca acompanha sem se
            redesenhar, porque o que muda é o preenchimento, não o contorno.
          </p>
        </Split>

<TopicDivider label="Luz" name="Moodboard" fontClass="font-inter font-semibold not-italic" />
        <MediaWall offset={3} grayscale={false} />



<TopicDivider label="Luz" name="Tipografia" fontClass="font-inter font-semibold not-italic" />
        <TypographyLuzEditorial />

        {/* 05 · Paleta da Luz */}
        
<TopicDivider label="Luz" name="Paleta" fontClass="font-inter font-semibold not-italic" />
        <LuzPalette />

        {/* Lab Areia funcional */}
        <AreiaLab
          srcGpu="/areia/index.html?paleta=plasma"
          srcWebgl="/areia/3d.html?encher&paleta=plasma"
          title="Lab Areia - wordmark TÉRA preenchido por areia"
        />

        {/* Moodboard fecha o caminho */}
                {/* ============ 06 · LOGO ============ */}
        <section className={SECTION}>
          <div className={SHELL}>
            <SectionHead
              num="06"
              kicker="Sistema de marca"
              title="Logo."
              desc="Variações da marca aplicadas em diferentes contextos e suportes."
            />
            {/* As três variações da marca e cinco estudos de símbolo no mesmo
                grid. Os símbolos trazem fundo preto no próprio SVG, então o
                tile deles é preto — o contraste separa marca de estudo sem
                precisar de dois blocos. */}
            <div className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
              {[
                { id: "logo-1", src: "/brand/logo-1.svg", label: "Variação 01", escuro: false },
                { id: "logo-2", src: "/brand/logo-2.svg", label: "Variação 02", escuro: false },
                // A assinatura entra no lugar da terceira variação. Já vem com
                // fundo preto e respiro próprios no arquivo, daí `justo`.
                { id: "assinatura", src: "/brand/lockup-monograma-descritor.png", label: "Assinatura com descritor", escuro: true, justo: true },
                { id: "simbolo-01", src: "/brand/simbolo-01-vao.svg", label: "01 · Vão", escuro: true },
                { id: "simbolo-02", src: "/brand/simbolo-02-arco.svg", label: "02 · Arco", escuro: true },
                { id: "simbolo-17", src: "/brand/simbolo-17-rastro.svg", label: "17 · Rastro", escuro: true },
                { id: "simbolo-14", src: "/brand/simbolo-14-torcao.svg", label: "14 · Torção", escuro: true },
                { id: "simbolo-46", src: "/brand/simbolo-46-grade.svg", label: "46 · Grade", escuro: true },
              ].map((l) => (
                <figure
                  key={l.id}
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 ${
                    // preto puro: é o mesmo do retângulo dentro do SVG, senão
                    // o quadrado do símbolo aparece recortado sobre o tile
                    l.escuro ? "bg-black" : "bg-branco"
                  }`}
                >
                  <div
                    className={`absolute ${
                      "justo" in l && l.justo ? "inset-0" : l.escuro ? "inset-4" : "inset-8"
                    }`}
                  >
                    <EditableImage
                      group="images"
                      id={l.id}
                      defaultSrc={l.src}
                      alt={`TÉRA — ${l.label}`}
                      fit="contain"
                    />
                  </div>
                  <figcaption
                    className={`absolute bottom-4 left-4 ${LABEL} text-[10px] ${
                      l.escuro ? "text-branco/45" : "text-preto/45"
                    }`}
                  >
                    {l.label}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-6 max-w-2xl font-univers text-sm leading-relaxed text-branco/45">
              As três primeiras são a marca. As cinco seguintes são estudos de
              símbolo — posições de partida da exploração, nenhuma delas final.
            </p>
          </div>
        </section>

        {/* 06 · A marca em movimento  -  tela cheia, sem moldura e sem legenda.
            O mouse é a linha do tempo: mover sobre a seção assume o controle
            da posição; sair devolve o loop. */}
        <VideoScrub
          src="/media/tera-logo.mp4"
          title="TÉRA  -  a marca em difração"
        />

        {/* ============ 07 · OBRIGADO ============ */}
        {/* Fecho de aperto de mão, no lugar do princípio final: as duas frases
            que estavam aqui já encerram o fluxograma, então repeti-las no fim
            era eco. Aqui sobra a marca, o agradecimento e quem assina. */}
        <section className="relative flex h-screen w-full items-center justify-center overflow-hidden border-t border-white/10 bg-preto px-6 text-center">
          <h2 className="font-univers text-6xl font-light leading-none tracking-tight text-branco md:text-8xl">
            Obrigado.
          </h2>
        </section>

        {/* ============ 08 · CAPA · ENTREGA 02 ============ */}
        {/* Construção da capa 00, só que com vídeo: mídia em tela cheia sob os
            dois véus + o wordmark em 3D girando por cima. O rótulo é o mesmo do
            TopicDivider (LABEL centrado, text-sm, branco/40)  -  o deck anuncia
            capítulo com rótulo centrado, nunca com carimbo em canto. */}
        <section
          id="entrega-02"
          className="relative h-screen w-full overflow-hidden border-t border-white/10 bg-preto"
        >
          {/* mp4 entra cru, como o PathDivider já faz: vídeo não passa pelo editor */}
          <video
            src="/media/entrega2-capa-resonance.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Véu mais fundo que o da capa 00: sobre plasma claro o branco do
              wordmark encostaria no fundo e perderia o contorno. */}
          <div className="absolute inset-0 bg-preto/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-preto/80 via-preto/20 to-preto/55" />

          {/* A capa anuncia a entrega, não a marca  -  quem mostra marca são
              os boards de logo. Palavra grande e centrada em `display-xl`, do
              mesmo jeito que os divisores do deck anunciam capítulo. */}
          <h2 className="absolute inset-x-0 top-1/2 z-[5] -translate-y-1/2 px-8 text-center display-xl font-futura">
            Entrega 2
          </h2>
        </section>

        {/* ============ 09 a 15 · BOARDS EM BRANCO (ENTREGA 02) ============ */}
        {/* Sete lugares vazios, numerados na mesma série das seções anteriores
            para poder chamar pelo número  -  "edita o 11" não é ambíguo com
            nada que já existe no deck. */}
        <BlankBoard num="09" name="Estudos de logo" />
        {/* A defesa abre os estudos, no arranjo em passos: mesma matéria do
            board do Logo 2, em uma coluna de leitura numerada. Em duas colunas
            o argumento chega fora de ordem  -  você desce a esquerda inteira
            antes de voltar ao topo pela direita. Aqui não há para onde voltar. */}
        <Defesa />

        {/* Cada logo é um capítulo fechado: abertura, a marca, os tratamentos,
            a grade e o mockup dele  -  só então o próximo. Antes o mockup era
            um bloco só no fim, e obrigava a voltar para saber de qual marca era
            a aplicação. */}

        <ManualEmbutido />

        {/* ================= Logo 1 · v0, módulo 22,47 ================= */}
        <BlankBoard num="10" name="Logo 1" />
        <MarcaBoard
          src="/brand/tera-modulo-solido.svg"
          alt="TÉRA v0  -  versão cheia"
        />
        <LogoTrioBoard
          nome="TÉRA v0"
          logo="/brand/tera-modulo-solido.svg"
          razao="943.74 / 314.58"
          midiaId="entrega2-trio-v0"
          midiaSrc="/media/entrega2-capa.mp4"
        />
        <MarcaBoard
          src="/brand/tera-modulo-grade.svg"
          alt="TÉRA v0  -  módulos sobre a grade"
        />
        <BlankBoard num="14" name="Mockup" />
        <PecasBoard
          pecas={[
            { id: "entrega2-mockup1-a", src: "/media/mockup-porta.jpg", razao: 0.6641, alt: "TÉRA v0  -  vinil na porta de vidro" },
            { id: "entrega2-mockup1-b", src: "/media/mockup-bone.jpg", razao: 0.6641, alt: "TÉRA v0  -  bordado em boné" },
            { id: "entrega2-mockup1-c", src: "/media/mockup-gradiente.mp4", razao: 0.8000, alt: "TÉRA v0  -  gradiente em movimento" },
          ]}
        />

        {/* ================= Logo 2 · v1 7x7 ================= */}
        <BlankBoard num="16" name="Logo 2" />
        {/* No lugar do board estático entra a ferramenta das variáveis: a marca
            grande em cima, os controles debaixo dela. */}
        <section className="relative grid h-screen w-full place-content-center overflow-hidden border-t border-white/10 bg-preto px-8 py-16">
          <LogoLab />
        </section>
        <FilmesLogo2 />
        <LogoTrioBoard
          nome="TÉRA v1 7x7"
          logo="/brand/tera-v1-7x7-solido.svg"
          razao="1015 / 230"
          midiaId="entrega2-trio-7x7"
          midiaSrc="/media/entrega2-capa.mp4"
        />
        <MarcaBoard
          src="/brand/tera-v1-7x7-grade.svg"
          alt="TÉRA v1 7x7  -  módulos sobre a grade"
        />
        <BlankBoard num="20" name="Mockup" />
        {/* Oito peças, com respiro. A ordem equilibra as duas fileiras: somo
            as proporções de cada uma para elas saírem com a mesma altura
            (3,27 contra 3,16), senão uma fica bem mais baixa que a outra. */}
        <PecasBoard
          respiro
          pecas={[
            { id: "l2-01", src: "/media/logo2/l2-01.mp4", razao: 0.8, alt: "TÉRA v1 7x7  -  feed do evento 01" },
            { id: "l2-casaco", src: "/media/logo2/l2-casaco.jpg", razao: 1.0, alt: "TÉRA v1 7x7  -  bordado no casaco" },
            { id: "l2-02", src: "/media/logo2/l2-02.mp4", razao: 0.8, alt: "TÉRA v1 7x7  -  feed do evento 02" },
            { id: "l2-placa", src: "/media/logo2/l2-placa.jpg", razao: 0.6656, alt: "TÉRA v1 7x7  -  placa de sinalização" },
            { id: "l2-05", src: "/media/logo2/l2-05.mp4", razao: 0.8, alt: "TÉRA v1 7x7  -  feed do espetáculo 48s" },
            { id: "l2-06", src: "/media/logo2/l2-06.mp4", razao: 0.8, alt: "TÉRA v1 7x7  -  feed do espetáculo 12s" },
            { id: "l2-03", src: "/media/logo2/l2-03.mp4", razao: 0.5625, alt: "TÉRA v1 7x7  -  reel do espetáculo" },
            { id: "l2-04", src: "/media/logo2/l2-04.mp4", razao: 1.0, alt: "TÉRA v1 7x7  -  quadrado do espetáculo" },
          ]}
        />

        {/* ================= Logo 3 · v2 ================= */}
        <BlankBoard num="22" name="Logo 3" />
        <MarcaBoard
          src="/brand/tera-v2-solido.svg"
          alt="TÉRA v2  -  versão cheia"
        />
        <LogoTrioBoard
          nome="TÉRA v2"
          logo="/brand/tera-v2-solido.svg"
          razao="1242.5 / 328.16"
          midiaId="entrega2-trio-v2"
          midiaSrc="/media/entrega2-capa.mp4"
        />
        <BlankBoard num="26" name="Mockup" />
        {/* Dez aplicações da v2, em dois boards de cinco. Numa tela só, com
            respiro, a menor delas caía para 131 px de largura  -  peça desse
            tamanho não prova aplicação nenhuma. Em cinco, cada uma fica com
            cerca do dobro de área. A soma das proporções de cada board fica
            perto da proporção da tela (1,64 e 1,76 contra 1,78), que é o que
            faz o bloco preencher o board em vez de encolher para caber. */}
        <PecasBoard
          respiro
          pecas={[
            { id: "l3-01", src: "/media/logo3/l3-01.jpg", razao: 1.7775, alt: "TÉRA v2  -  cartaz deitado" },
            { id: "l3-02", src: "/media/logo3/l3-02.jpg", razao: 1.0000, alt: "TÉRA v2  -  quadrado 01" },
            { id: "l3-03", src: "/media/logo3/l3-03.jpg", razao: 1.7779, alt: "TÉRA v2  -  peça deitada 01" },
            { id: "l3-04", src: "/media/logo3/l3-04.jpg", razao: 1.0000, alt: "TÉRA v2  -  quadrado 02" },
            { id: "l3-05", src: "/media/logo3/l3-05.jpg", razao: 1.0000, alt: "TÉRA v2  -  quadrado 03" },
          ]}
        />
        <PecasBoard
          respiro
          pecas={[
            { id: "l3-06", src: "/media/logo3/l3-06.jpg", razao: 1.8821, alt: "TÉRA v2  -  matéria" },
            { id: "l3-07", src: "/media/logo3/l3-07.jpg", razao: 0.6000, alt: "TÉRA v2  -  vertical" },
            { id: "l3-08", src: "/media/logo3/l3-08.jpg", razao: 1.7779, alt: "TÉRA v2  -  peça deitada 02" },
            { id: "l3-09", src: "/media/logo3/l3-09.jpg", razao: 1.0000, alt: "TÉRA v2  -  quadrado 04" },
            { id: "l3-10", src: "/media/logo3/l3-10.jpg", razao: 1.7779, alt: "TÉRA v2  -  peça deitada 03" },
          ]}
        />
        {/* A sala em movimento, depois das aplicações do Logo 3. Alternei
            deitado e em pé nas duas fileiras  -  agrupados por orientação, as
            fileiras ficariam com alturas muito diferentes e sobraria preto. */}
        <PecasBoard
          pecas={[
            { id: "sala-01", src: "/media/sala/sala-01.mp4", razao: 1.7316, alt: "TÉRA  -  a sala em movimento" },
            { id: "sala-03", src: "/media/sala/sala-03.mp4", razao: 0.8, alt: "TÉRA  -  sala abaixo, luz" },
            { id: "sala-02", src: "/media/sala/sala-02.mp4", razao: 1.7316, alt: "TÉRA  -  a sala em movimento, segundo corte" },
            { id: "sala-04", src: "/media/sala/sala-04.mp4", razao: 0.8, alt: "TÉRA  -  sala abaixo, rajada" },
          ]}
        />

        {/* ================= Logo 4 · grotesca ================= */}
        <BlankBoard num="28" name="Logo 4" />
        <MarcaBoard
          src="/brand/tera-v4-solido.svg"
          alt="TÉRA v4  -  versão cheia"
        />
        {/* As quatro variações, juntas, logo depois de apresentar a marca. */}
        <VariacoesBoard
          pecas={[
            { id: "var-01", src: "/brand/variacoes/var-png-1.png", inverter: false, alt: "TÉRA  -  sem tagline" },
            { id: "var-02", src: "/brand/variacoes/var-png-4.png", inverter: false, alt: "TÉRA  -  acento em ângulo, sem tagline" },
            { id: "var-03", src: "/brand/variacoes/var-png-3.png", inverter: false, alt: "TÉRA  -  acento em ângulo, com tagline" },
          ]}
        />
        <LogoTrioBoard
          nome="TÉRA v4"
          logo="/brand/tera-v4-solido.svg"
          razao="22520 / 8921.8"
          midiaId="entrega2-trio-v4"
          midiaSrc="/media/entrega2-capa.mp4"
        />
        <BlankBoard num="30" name="Mockup" />
        <PecasBoard
          pecas={[
            { id: "logo4-01", src: "/media/aplicacoes/logo4-01.mp4", razao: 0.8, alt: "TÉRA v4  -  palavra" },
            { id: "logo4-02", src: "/media/aplicacoes/logo4-02.mp4", razao: 0.8, alt: "TÉRA v4  -  laje" },
            { id: "logo4-03", src: "/media/aplicacoes/logo4-03.mp4", razao: 0.8, alt: "TÉRA v4  -  invertida" },
            { id: "logo4-04", src: "/media/aplicacoes/logo4-04.mp4", razao: 0.8, alt: "TÉRA v4  -  degradê" },
            { id: "logo4-05", src: "/media/aplicacoes/logo4-05.mp4", razao: 0.8, alt: "TÉRA v4  -  minúscula" },
            { id: "logo4-06", src: "/media/aplicacoes/logo4-06.mp4", razao: 0.8, alt: "TÉRA v4  -  cadência" },
          ]}
        />
        {/* Segundo board de mockup do Logo 4: os cartazes e o filme dos
            prismas. Cartaz é 1400 × 1980 e o filme é 16:9  -  cada célula sai
            na proporção da sua peça, então nenhum deles fica com preto dentro. */}
        <PecasBoard
          pecas={[
            { id: "cartaz-01", src: "/media/cartazes/cartaz-01.jpg", razao: 0.7071, alt: "TÉRA v4  -  cartaz 01" },
            { id: "cartaz-02", src: "/media/cartazes/cartaz-02.jpg", razao: 0.7071, alt: "TÉRA v4  -  cartaz 02" },
            { id: "cartaz-03", src: "/media/cartazes/cartaz-03.jpg", razao: 0.7071, alt: "TÉRA v4  -  cartaz 03" },
            { id: "cartaz-04", src: "/media/cartazes/cartaz-04.jpg", razao: 0.7071, alt: "TÉRA v4  -  cartaz 04" },
            { id: "camiseta", src: "/media/cartazes/camiseta.jpg", razao: 0.5655, alt: "TÉRA v4  -  camiseta na arara" },
            { id: "planta", src: "/media/cartazes/planta.jpg", razao: 1.6826, alt: "TÉRA v4  -  a marca na planta baixa da sala" },
          ]}
        />
        {/* Prismas sozinho, em tela cheia. É 16:9  -  a mesma proporção da
            tela de apresentação  -  então preenche o board sem corte e sem
            sobra, que é o único jeito de "tela cheia" e "sem cortar" caberem
            na mesma peça. */}
        <PecasBoard
          pecas={[
            { id: "prismas", src: "/media/cartazes/prismas.mp4", razao: 1.7778, alt: "TÉRA v4  -  prismas" },
          ]}
        />

      </main>

      <JumpButton lenisRef={lenisRef} />
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

// Board da Entrega 02. É o PathDivider montado com outros dados: mídia em tela
// cheia + véu `bg-preto/65` + a palavra em `display-xl` por cima, no z-[5]. Por
// isso o nome sobrevive ao preenchimento  -  é assim que as capas de Matéria e
// Luz funcionam. O rótulo centrado em cima vem do TopicDivider; enquanto o board
// está vazio a "palavra" é o número, que é como ele é chamado ("edita o 11").
function BlankBoard({ num, name }: { num: string; name?: string }) {
  return (
    <section className="relative grid h-screen w-full place-content-center overflow-hidden border-t border-white/10 bg-preto">
      <div className="absolute inset-0 overflow-hidden">
        <EditableImage
          group="images"
          id={`entrega2-${num}`}
          defaultSrc="/brand/board-vazio.svg"
          alt={name ? `${name}  -  board ${num}` : `Board ${num}  -  em branco`}
        />
      </div>
      <div className="absolute inset-0 bg-preto/65" />

      <div className="relative z-[5] px-8 text-center">
        {/* Os divisores do deck são de palavra única, e `display-xl` só cabe
            assim. Nome de mais de uma palavra desce para `display-lg`  -  a
            outra escala que o deck já tem  -  em vez de vazar da tela. */}
        <h2
          className={`font-futura ${
            (name ?? num).trim().includes(" ") ? "display-lg" : "display-xl"
          }`}
        >
          {name ?? num}
        </h2>
        <div className="mx-auto mt-10 h-px w-40 bg-white/40" />
      </div>
    </section>
  );
}

// Board de marca da Entrega 02. Mesma casca dos outros boards da entrega
// (tela cheia + rótulo centrado do TopicDivider); no lugar da palavra entra o
// desenho. Sempre `contain`: aqui o assunto é a medida do módulo, e recorte
// mataria o argumento.
function MarcaBoard({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="relative grid h-screen w-full place-content-center overflow-hidden border-t border-white/10 bg-preto px-8">
      <div className="text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="mx-auto max-h-[58vh] w-[82vw] max-w-[1280px] object-contain"
        />
      </div>
    </section>
  );
}

// Board de tratamentos: a tela dividida em três partes iguais, a mesma marca no
// meio de cada uma. Os três painéis usam UM mecanismo só  -  a marca como
// máscara  -  e mudam apenas o que preenche a letra e o que fica atrás:
//   1 · tinta preta sobre branco   2 · tinta branca sobre preto
//   3 · mídia dentro da letra, sobre o preto do próprio slide
// Máscara em vez de três arquivos coloridos: as cores saem dos tokens do deck
// e o terceiro painel vira um recorte de verdade, não uma imitação.
function LogoTrioBoard({
  logo,
  razao,
  midiaId,
  midiaSrc,
  nome,
}: {
  logo: string;
  razao: string;
  midiaId: string;
  midiaSrc: string;
  nome: string;
}) {
  const mascara = {
    maskImage: `url(${logo})`,
    WebkitMaskImage: `url(${logo})`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    aspectRatio: razao,
  } as const;

  return (
    <section className="relative h-screen w-full overflow-hidden border-t border-white/10 bg-preto">
      <div className="flex h-full w-full flex-col md:flex-row">
        <div className="flex flex-1 items-center justify-center bg-branco px-[9%]">
          <div className="w-full bg-preto" style={mascara} />
        </div>

        {/* O terceiro painel também é preto, então sem o fio a divisão entre os
            dois some e o board deixa de ler como três partes. É o mesmo
            `border-white/10` que separa as seções do deck. */}
        <div className="flex flex-1 items-center justify-center border-t border-white/10 bg-preto px-[9%] md:border-l md:border-t-0">
          <div className="w-full bg-branco" style={mascara} />
        </div>

        {/* O fundo aqui é o preto do slide: nada de painel próprio. A mídia
            aparece só dentro da letra, e o slot é editável como os outros. */}
        <div className="relative flex flex-1 items-center justify-center border-t border-white/10 px-[9%] md:border-l md:border-t-0">
          <div className="relative w-full overflow-hidden" style={mascara}>
            <EditableImage
              group="images"
              id={midiaId}
              defaultSrc={midiaSrc}
              alt={`${nome}  -  marca preenchida por mídia`}
            />
          </div>
          {/* fora da máscara: dentro dela a área clicável viraria a letra */}
          <EditOverlay group="images" id={midiaId} />
        </div>
      </div>
    </section>
  );
}

// Board de peças, em galeria justificada. Cada célula recebe a proporção da
// sua peça, então a peça a preenche por inteiro: sem corte e sem preto dentro
// da célula. Numa fileira as alturas são iguais e as larguras proporcionais à
// forma de cada peça  -  é assim que a fileira fecha na largura sem sobra.
//
// O bloco todo recebe a proporção que essas fileiras somam e é encaixado no
// board com `max` nos dois eixos. O navegador então escala o conjunto até
// encostar numa das bordas, mantendo tudo proporcional. Sobra preto de um lado
// só, nunca dentro nem entre as peças.
//
// Antes as células eram frações iguais do board, e uma foto em pé numa célula
// deitada aparecia como uma tira fina cercada de preto  -  parecia faltar
// imagem. A célula é que tem que obedecer à peça, não o contrário.
type Peca = { id: string; src: string; alt: string; razao: number };

// Teto de dez peças por board: acima disso cada uma fica pequena demais para
// provar coisa alguma, então o excedente vai para o board seguinte.
const PECAS_POR_BOARD = 10;

function PecasBoard({
  pecas,
  respiro = false,
}: {
  pecas: Peca[];
  respiro?: boolean;
}) {
  if (pecas.length > PECAS_POR_BOARD) {
    const grupos: Peca[][] = [];
    for (let i = 0; i < pecas.length; i += PECAS_POR_BOARD) {
      grupos.push(pecas.slice(i, i + PECAS_POR_BOARD));
    }
    return (
      <>
        {grupos.map((g) => (
          <PecasBoard key={g[0].id} pecas={g} respiro={respiro} />
        ))}
      </>
    );
  }

  // Quantas fileiras. Fixo em duas, dez peças davam fileiras de soma 6,8 e o
  // bloco saía com proporção 3,4  -  muito mais deitado que a tela, então
  // encolhia até caber na largura e ocupava 28% do board. Com k fileiras a
  // proporção do bloco é (soma total / k) / k, então o k que aproxima o bloco
  // da tela é a raiz de (soma / 1,7). Para dez peças isso dá três fileiras e
  // a ocupação sobe para perto de 85%.
  const somaTotal = pecas.reduce((a, p) => a + p.razao, 0);
  const nLinhas = Math.max(
    1,
    Math.min(pecas.length, Math.round(Math.sqrt(somaTotal / 1.7))),
  );
  // Reparte na ordem dada, fechando cada fileira quando ela chega à soma alvo.
  const alvo = somaTotal / nLinhas;
  const fileiras: Peca[][] = [];
  let atual: Peca[] = [];
  let acumulado = 0;
  pecas.forEach((p, i) => {
    atual.push(p);
    acumulado += p.razao;
    const faltam = pecas.length - i - 1;
    const podeFechar = fileiras.length < nLinhas - 1;
    if (podeFechar && (acumulado >= alvo || faltam <= nLinhas - fileiras.length - 1)) {
      fileiras.push(atual);
      atual = [];
      acumulado = 0;
    }
  });
  if (atual.length > 0) fileiras.push(atual);
  // Fileira de largura 1 tem altura 1/soma-das-proporções.
  const alturas = fileiras.map(
    (f) => 1 / f.reduce((soma, p) => soma + p.razao, 0),
  );
  const somaAlturas = alturas.reduce((a, b) => a + b, 0);
  const blocoRazao = 1 / somaAlturas;

  return (
    <section
      className={`relative flex h-screen w-full items-center justify-center overflow-hidden border-t border-white/10 bg-preto ${
        respiro ? "p-6 md:p-12" : ""
      }`}
    >
      <div
        className={`flex max-h-full max-w-full flex-col ${respiro ? "gap-4 md:gap-6" : ""}`}
        style={{ aspectRatio: blocoRazao, width: "100%" }}
      >
        {fileiras.map((fila, i) => (
          <div
            key={i}
            className={`flex min-h-0 w-full ${respiro ? "gap-4 md:gap-6" : ""}`}
            /* Normalizado: fator de crescimento abaixo de 1 distribui só essa
               fração do espaço livre, e as fileiras encolhiam. Somando 1, o
               espaço é repartido inteiro. */
            style={{ flex: alturas[i] / somaAlturas }}
          >
            {fila.map((p) => (
              <figure
                key={p.id}
                className={`relative min-h-0 min-w-0 overflow-hidden ${
                  p.src === "/brand/board-vazio.svg"
                    ? "border border-white/10"
                    : ""
                }`}
                style={{
                  flex:
                    p.razao / fila.reduce((soma, q) => soma + q.razao, 0),
                }}
              >
                {/* `contain`, sempre. Peça de mockup não pode ser cortada:
                    ela existe para mostrar a aplicação inteira. A célula já
                    vem na proporção da peça, então na prática não sobra preto
                    -  e onde a proporção declarada diferir do arquivo por um
                    décimo, o erro aparece como fio de preto, nunca como corte. */}
                <EditableImage
                  group="images"
                  id={p.id}
                  defaultSrc={p.src}
                  alt={p.alt}
                  fit="contain"
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

// Os filmes do Logo 2. Os dois primeiros são o mesmo formato (1972 × 522) e
// dividem a linha de cima em partes iguais  -  mesma largura, mesma altura,
// mesmo vão  -  então saem do mesmo tamanho por construção, e não por ajuste.
// O terceiro fica embaixo e recebe toda a altura que sobra, que é o que o faz
// maior sem precisar de medida arbitrária.
//
// Um respiro só governa tudo: o `p-8` da borda é o mesmo `gap-8` entre os dois
// de cima e entre a linha e o de baixo. É por isso que o espaçamento lê igual
// em qualquer lugar do board.
function FilmesLogo2() {
  const respiro = "gap-6 md:gap-8";
  return (
    <section
      className={`relative flex h-screen w-full flex-col overflow-hidden border-t border-white/10 bg-preto p-6 md:p-8 ${respiro}`}
    >
      <div className={`flex flex-col md:flex-row ${respiro}`}>
        {[
          { id: "logo2-filme-a", src: "/media/logo2-filme-a.mp4", alt: "TÉRA  -  filme da marca, corte 01" },
          { id: "logo2-filme-b", src: "/media/logo2-filme-b.mp4", alt: "TÉRA  -  filme da marca, corte 02" },
        ].map((f) => (
          <figure
            key={f.id}
            className="relative aspect-[1972/522] flex-1 overflow-hidden"
          >
            <EditableImage
              group="images"
              id={f.id}
              defaultSrc={f.src}
              alt={f.alt}
              fit="contain"
            />
          </figure>
        ))}
      </div>

      <figure className="relative min-h-0 w-full flex-1 overflow-hidden">
        <EditableImage
          group="images"
          id="logo2-filme-c"
          defaultSrc="/media/logo2-filme-c.mp4"
          alt="TÉRA  -  a marca em movimento"
          fit="contain"
        />
      </figure>
    </section>
  );
}

// O manual da marca, embutido inteiro. Sem barra de rolagem própria: o iframe
// entra com a altura completa do manual e é escalado para a largura do board,
// então quem rola é a apresentação  -  a seção se comporta como as outras, só
// que comprida, do mesmo jeito que o board da defesa.
//
// A medida é fixa (1440 × 12448, medido no site) porque o conteúdo é de outro
// domínio e não dá para ler a altura dele. Escalar a partir de uma medida
// conhecida é determinístico; deixar o iframe em 100% de largura faria a altura
// mudar com a tela e cortar o fim do manual.
// O manual é servido por este mesmo projeto, de public/manual — cópia de build
// de theforcex-code/tera-font, com o Poster Lab dentro. Antes ele vinha de um
// deploy separado, o que deixava as duas metades desencontradas: mudar a altura
// aqui exigia publicar lá. A variável ainda permite apontar para outro lugar.
const MANUAL_URL =
  process.env.NEXT_PUBLIC_MANUAL_URL ?? "/manual/index.html";

function ManualEmbutido() {
  const LARGURA = 1440;
  const ALTURA = 12448;
  const caixaRef = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(0);
  const [perto, setPerto] = useState(false);

  useEffect(() => {
    const el = caixaRef.current;
    if (!el) return;

    // Nunca acima de 1: ampliar passaria do tamanho em que o manual foi
    // desenhado e faria a seção crescer sem limite  -  numa tela de 1920 ela
    // ia a 20 mil px, dezessete telas de rolagem para um board só.
    const medir = () => setEscala(Math.min(el.clientWidth / LARGURA, 1));
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);

    // O iframe só existe quando o board está por perto. Um documento de outro
    // site com 15 370 px de altura é caro de compor mesmo parado, e mantê-lo
    // vivo durante o deck inteiro era o que mais pesava na rolagem. Duas telas
    // de margem dão tempo de ele carregar antes de aparecer.
    const io = new IntersectionObserver(
      ([e]) => setPerto(e.isIntersecting),
      { rootMargin: "200% 0px" },
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden border-t border-white/10 bg-preto">
      <div
        ref={caixaRef}
        className="relative mx-auto w-full"
        style={
          escala
            ? { height: ALTURA * escala, maxWidth: LARGURA }
            : { aspectRatio: `${LARGURA} / ${ALTURA}` }
        }
      >
        {perto && (
          <iframe
            src={MANUAL_URL}
            title="Manual Téra  -  construção e versões"
            width={LARGURA}
            height={ALTURA}
            scrolling="no"
            className="absolute left-0 top-0 border-0 bg-preto"
            style={{
              // O `html` do manual é transparente, então quem aparece atrás
              // dele é a tela padrão do iframe  -  branca, a menos que o
              // esquema de cor seja escuro.
              colorScheme: "dark",
              // Sem transform quando a escala é 1: `scale(1)` ainda cria
              // camada de composição, e para um elemento de 15 mil px isso
              // custa caro à toa.
              ...(escala < 1
                ? {
                    transformOrigin: "top left",
                    transform: `scale(${escala})`,
                  }
                : null),
            }}
          />
        )}
      </div>
    </section>
  );
}

// Board das variações: as três lado a lado, em células iguais, sem legenda.
// Célula igual e `contain` dentro dela: as três têm proporções diferentes
// (2,57 / 2,87 / 1,94), então "mesmo tamanho" é a célula  -  igualar a mancha
// exigiria cortar, e peça apresentada não se corta.
function VariacoesBoard({
  pecas,
}: {
  pecas: {
    id: string;
    src: string;
    alt: string;
    /** Arquivo já em branco não inverte. */
    inverter?: boolean;
  }[];
}) {
  return (
    // `flex` e não `grid place-content-center`: a faixa do grid é dimensionada
    // pelo conteúdo, e aí o `w-full` do SHELL não tem contra o que resolver  -
    // as células flex-1 colapsavam para zero.
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden border-t border-white/10 bg-preto px-8 py-16">
      <div className={`${SHELL} flex flex-col items-stretch gap-12 md:flex-row md:gap-14`}>
        {pecas.map((p) => (
          <figure key={p.id} className="relative h-[18vh] flex-1 md:h-[26vh]">
            <EditableImage
              group="images"
              id={p.id}
              defaultSrc={p.src}
              alt={p.alt}
              fit="contain"
              invert={p.inverter ?? true}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}

// Atalho de abertura: leva direto à capa da Entrega 02. Mora na borda direita
// (o rodapé direito é do editor) e usa o par fio/rótulo do deck em vez de virar
// um botão de produto. Some quando a primeira tela sai  -  é gesto de abertura,
// não barra de navegação.
//
// Estado e ScrollTriggers vivem aqui dentro de propósito. Subir o `useState`
// para o Page re-renderiza o `<main>`, e aí o React tenta reconciliar nós que o
// GSAP moveu ao prender as seções: dá `removeChild` e a árvore inteira cai. O
// botão é folha, então re-renderizar ele não toca em nenhuma seção.
function JumpButton({
  lenisRef,
}: {
  lenisRef: React.RefObject<LenisRef | null>;
}) {
  const [visivel, setVisivel] = useState(true);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "main.slides",
      start: "top top",
      end: () => `+=${window.innerHeight * 0.6}`,
      onLeave: () => setVisivel(false),
      onEnterBack: () => setVisivel(true),
    });
  }, []);

  function saltar() {
    // Onde a capa começa no documento. Somar as alturas das seções anteriores
    // em vez de ler `getBoundingClientRect` ou o `start` do ScrollTrigger: as
    // duas leituras mudam conforme o empilhamento prende e solta seção, e o
    // salto errava telas inteiras. `offsetHeight` não é afetado por pin.
    const main = document.querySelector("main.slides");
    const capa = document.getElementById("entrega-02");
    if (!main || !capa) return;
    const secoes = Array.from(main.querySelectorAll("section"));
    const ate = secoes.indexOf(capa);
    if (ate < 0) return;
    let alvo = parseFloat(getComputedStyle(main).paddingTop) || 0;
    for (let i = 0; i < ate; i++) alvo += (secoes[i] as HTMLElement).offsetHeight;

    // Salto seco, sem animação: percorrer 40 mil px suavemente não é transição
    // que alguém leia, e durante o trajeto os pins entram e saem  -  era isso
    // que deslocava a chegada. Instantâneo, o layout nunca fica no meio.
    const lenis = lenisRef.current?.lenis;
    const ir = (y: number) => {
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else window.scrollTo({ top: y, behavior: "auto" });
    };
    ir(alvo);

    // Chegando, o empilhamento se reorganiza e a capa sai do lugar por até uma
    // tela. Duas passadas de acerto no frame seguinte encostam ela no topo.
    let sobrou = 2;
    const acertar = () => {
      const desvio = capa.getBoundingClientRect().top;
      if (Math.abs(desvio) > 2) ir(window.scrollY + desvio);
      if (--sobrou > 0) requestAnimationFrame(acertar);
    };
    requestAnimationFrame(acertar);
  }

  return (
    <button
      type="button"
      onClick={saltar}
      aria-label="Ir direto para a capa da Entrega 02"
      className={`fixed bottom-24 right-0 z-50 md:bottom-auto md:top-1/2 md:-translate-y-1/2 border-y border-l border-white/15 bg-preto/85 py-5 pl-5 pr-6 transition duration-500 hover:bg-preto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none ${
        visivel ? "opacity-100" : "pointer-events-none translate-x-4 opacity-0"
      }`}
    >
      <span className="flex items-center gap-4">
        <span className="h-px w-8 bg-white/40" />
        <span className={`${LABEL} text-[11px] text-branco/80`}>Entrega 02</span>
      </span>
    </button>
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
  // Mídia grande e contida (imagem inteira) sobre fundo preto  -  mesma cor do fundo.
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
                alt={`${name}  -  capa`}
                grayscale={grayscale}
                className={mediaZoom ? "scale-125" : ""}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-preto/65" />
        </>
      )}
      <h2 className={`relative z-[5] text-center display-xl ${nameFont}`}>{name}</h2>
    </section>
  );
}

// Board de introdução (tela cheia, só a palavra)  -  como o divisor da Dobra.
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
// cada caminho  -  mesmo conteúdo cromático, cabeçalho parametrizado pelo caminho.
// Paleta do Caminho 01  -  "Vibração da Matéria" (segue caminho1-04.pdf):
// base cromática reduzida (branco→cinza + preto) + 4 acentos que a luz revela.
// Dados de paleta por caminho (a base institucional White/Black é comum).
const VIBRACAO_DATA = {
  titleFontClass: "font-forma font-light italic",
  title: "Vibração da Matéria",
  lead: ["Três cores estruturam o sistema.", "A luz revela seus acentos."],
  body: "A identidade trabalha com uma base cromática reduzida, enquanto reflexos, brilhos e interferências introduzem variações pontuais conforme a matéria encontra a luz.",
  materialSrc: "/media/vibracao-materia.png",
  materialAlt: "Matéria em vibração",
  materialAspect: "736 / 981",
  gradientV: "linear-gradient(180deg, #EE2F58 0%, #46A2B7 38%, #FFAE0D 72%, #F93406 100%)",
  gradientH: "linear-gradient(90deg, #EE2F58 0%, #46A2B7 38%, #FFAE0D 72%, #F93406 100%)",
  accentsTitle: "Acentos  -  a luz revela.",
  accentsBody: "Reflexos e interferências pontuais. Podem ser usadas isoladas, combinadas ou transformadas em gradiente  -  a unidade vem do sistema, não da semelhança.",
  accents: [
    { code: "A1", name: "Rosa", hex: "#EE2F58", rgb: "238 / 47 / 88", cmyk: "0 / 80 / 63 / 7", pantone: "a validar", tag: "Brilho", note: "Reflexo intenso  -  ponto de energia sobre a base." },
    { code: "A2", name: "Ciano", hex: "#46A2B7", rgb: "70 / 162 / 183", cmyk: "62 / 12 / 0 / 28", pantone: "a validar", tag: "Reflexo", note: "Frieza mineral  -  luz que atravessa a superfície." },
    { code: "A3", name: "Amarelo", hex: "#FFAE0D", rgb: "255 / 174 / 13", cmyk: "0 / 32 / 95 / 0", pantone: "a validar", tag: "Luz", note: "Calor luminoso  -  incidência direta sobre a matéria." },
    { code: "A4", name: "Vermelho", hex: "#F93406", rgb: "249 / 52 / 6", cmyk: "0 / 79 / 98 / 2", pantone: "a validar", tag: "Calor", note: "Incandescência  -  a matéria no limite térmico." },
  ],
  conceitoTitle: "A estrutura permanece. A matéria muda.",
  conceitoBody: "Branco e Preto garantem continuidade. Os acentos dão a cada obra uma manifestação própria  -  a matéria encontrando a luz.",
};

const POSSIBILIDADE_PALETTE = [
  { name: "Branco Cal", hex: "#F7F7F5", rgb: "247 / 247 / 245", cmyk: "0 / 0 / 1 / 3", text: "text-preto", role: "Base", weight: "palette-column--base" },
  { name: "Preto Subsolo", hex: "#0A0A0A", rgb: "10 / 10 / 10", cmyk: "0 / 0 / 0 / 96", text: "text-branco", role: "Base", weight: "palette-column--base" },
  { name: "Cinza Cimento", hex: "#B8B5AF", rgb: "184 / 181 / 175", cmyk: "0 / 2 / 5 / 28", text: "text-preto", role: "Acento", weight: "palette-column--accent" },
  { name: "Marrom Terra", hex: "#6E4A30", rgb: "110 / 74 / 48", cmyk: "0 / 33 / 56 / 57", text: "text-branco", role: "Acento", weight: "palette-column--accent" },
  { name: "Aço Corten", hex: "#A54E1F", rgb: "165 / 78 / 31", cmyk: "0 / 53 / 81 / 35", text: "text-branco", role: "Acento", weight: "palette-column--accent" },
  { name: "Ocre Iluminado", hex: "#C7955D", rgb: "199 / 149 / 93", cmyk: "0 / 25 / 53 / 22", text: "text-preto", role: "Acento", weight: "palette-column--accent" },
] as const;

const POSSIBILIDADE_GRADIENT = "linear-gradient(180deg, #B8B5AF 0%, #6E4A30 34%, #A54E1F 67%, #C7955D 100%)";
const LUZ_GRADIENT = "linear-gradient(180deg, #EE2F58 0%, #46A2B7 38%, #FFAE0D 72%, #F93406 100%)";

function LuzPalette() {
  return (
    <section className="palette-screen" aria-label="Paleta Luz">
      <div className="palette-board palette-board--screen">
        <article className="palette-column palette-column--base relative flex min-w-0 flex-col justify-between p-5 sm:p-7 md:p-10 text-preto" style={{ background: "#F5F4F0" }}>
          <div className="flex items-start justify-between gap-3"><span className={`${LABEL} text-[10px] opacity-65`}>01</span><span className={`${LABEL} text-right text-[9px] opacity-65`}>Base</span></div>
          <h3 className="palette-column__name font-inter font-bold not-italic">Branco</h3>
          <div className="palette-column__details font-univers opacity-70">Luz de base</div>
        </article>
        <article className="palette-column palette-column--base relative flex min-w-0 flex-col justify-between p-5 sm:p-7 md:p-10 text-branco" style={{ background: "#11110F" }}>
          <div className="flex items-start justify-between gap-3"><span className={`${LABEL} text-[10px] opacity-65`}>02</span><span className={`${LABEL} text-right text-[9px] opacity-65`}>Base</span></div>
          <h3 className="palette-column__name font-inter font-bold not-italic">Preto</h3>
          <div className="palette-column__details font-univers opacity-70">Campo de contraste</div>
        </article>
        <article className="palette-column palette-column--accent relative flex min-w-0 flex-col justify-between p-5 sm:p-7 md:p-10 text-branco" style={{ background: LUZ_GRADIENT }}>
          <div className="flex items-start justify-between gap-3"><span className={`${LABEL} text-[10px] opacity-65`}>03</span><span className={`${LABEL} text-right text-[9px] opacity-65`}>Gradiente</span></div>
          <h3 className="palette-column__name font-inter font-bold not-italic">Luz</h3>
          <div className="palette-column__details invisible" aria-hidden="true">Campo de contraste</div>
        </article>
      </div>
    </section>
  );
}

function PaletaPossibilidade() {
  return (
    <section className="palette-screen" aria-label="Paleta Possibilidade">
      <div className="palette-board palette-board--screen">
        {POSSIBILIDADE_PALETTE.map((color, index) => (
          <article
            key={color.name}
            className={`palette-column ${color.weight} relative flex min-w-0 flex-col justify-between p-5 sm:p-7 md:p-10 ${color.text}`}
            style={{ background: color.hex }}
          >
            <div className="flex items-start justify-between gap-3">
              <span className={`${LABEL} text-[10px] opacity-65`}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={`${LABEL} text-right text-[9px] opacity-65`}>
                {color.role}
              </span>
            </div>
            <h3 className="palette-column__name font-inter font-bold not-italic">{color.name}</h3>
            <div className="palette-column__details space-y-1 font-univers opacity-70">
              <p>RGB {color.rgb}</p>
              <p>CMYK {color.cmyk}</p>
            </div>
          </article>
        ))}
        <article
          className="palette-column palette-column--accent palette-column--gradient relative flex min-w-0 flex-col justify-between p-5 sm:p-7 md:p-10 text-branco"
          style={{ background: POSSIBILIDADE_GRADIENT }}
        >
          <div className="flex items-start justify-between gap-3">
            <span className={`${LABEL} text-[10px] opacity-65`}>07</span>
            <span className={`${LABEL} text-right text-[9px] opacity-65`}>Gradiente</span>
          </div>
          <h3 className="palette-column__name font-inter font-bold not-italic">Matéria em variação</h3>
          <div className="palette-column__details font-univers opacity-70">Cinza · Terra · Corten · Ocre</div>
        </article>
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
            <SectionHead num={num} kicker={`${path}  -  Paleta`} />
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Acentos  -  gradiente + dados completos por cor */}
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
      <SectionHead num={num} kicker={`${path}  -  Tipografia`} />
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

// Card de largura da Roboto Flex  -  mesma forma, larguras diferentes (continuidade).
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

// Card de peso da Inter  -  a mesma base modular em cortes diferentes (Caminho 02).
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

// Board da tipografia secundária (Futura)  -  mesma estrutura da primária.
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
          Entra em títulos, intervenções e momentos de maior impacto  -  o
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

// Uma cor de matéria  -  campo de cor + dados (rótulo abaixo, contraste seguro).
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




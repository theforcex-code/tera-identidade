import type { Frame } from "@/components/ui/dynamic-frame-layout";

/* ================================================================
   MÍDIAS DO MEDIA WALL  -  mix de imagens e vídeos.

   Para trocar/adicionar mídias reais dos artistas/experiências:
   - Coloque os arquivos em /public/media/
   - Edite as listas DOBRA_MEDIA e QUEBRA_MEDIA abaixo, com
     { src: "/media/arquivo.jpg", type: "image" } ou type: "video".
   Vídeos tocam em loop mudo automaticamente.
================================================================ */

type Item = { src: string; type: "image" | "video"; alt?: string };

// Camada 01 · MATÉRIA  -  o que ficou: superfície, módulo, corte, dobra e vão.
// Peças do moodboard "matéria" do conceito (theforcex-code @1faa711).
// O geodo (mood-materia-r0-03) não entra aqui: ele é o hero do Conceito Central.
const MATERIA_MEDIA: Item[] = [
  { src: "/media/mood-materia-r0-00.jpeg", type: "image", alt: "Matéria  -  o módulo repetido em faixas" },
  { src: "/media/mood-materia-r1-00.mp4", type: "video", alt: "Matéria  -  corte e dobra em movimento" },
  { src: "/media/mood-materia-r0-01.jpeg", type: "image", alt: "Matéria  -  Carsten Nicolai, unitxt" },
  { src: "/media/mood-materia-r0-05.jpeg", type: "image", alt: "Matéria  -  estratos: a terra que ficou, camada sobre camada" },
  { src: "/media/mood-materia-r1-02.mp4", type: "video", alt: "Matéria  -  vão e profundidade" },
  { src: "/media/mood-materia-r0-02.jpeg", type: "image", alt: "Matéria  -  faixas cromáticas em grade" },
  { src: "/media/mood-materia-r1-01.jpeg", type: "image", alt: "Matéria  -  arquitetura em plano dobrado" },
  { src: "/media/mood-materia-r1-04.jpeg", type: "image", alt: "Matéria  -  Luigi Snozzi, cartaz tipográfico" },
  { src: "/media/mood-materia-r1-05.mp4", type: "video", alt: "Matéria  -  superfície em corte" },
  { src: "/media/mood-materia-r1-06.jpeg", type: "image", alt: "Matéria  -  marca vazada sobre a chapa" },
];

// Camada 02 · LUZ  -  o que entrou: matéria luminosa e luz na arquitetura.
// Peças do moodboard "luz" do mesmo conceito.
const LUZ_MEDIA: Item[] = [
  { src: "/media/mood-luz-r0-00.jpeg", type: "image", alt: "Luz  -  o plasma preenchendo a letra" },
  { src: "/media/mood-luz-r0-01.mp4", type: "video", alt: "Luz  -  matéria luminosa em movimento" },
  { src: "/media/mood-luz-r0-02.jpeg", type: "image", alt: "Luz  -  gradiente que escoa pela grade" },
  { src: "/media/mood-luz-r0-03.jpeg", type: "image", alt: "Luz  -  corpo preenchido por espectro" },
  { src: "/media/mood-luz-r0-05.jpeg", type: "image", alt: "Luz  -  a matéria em estado líquido" },
  { src: "/media/mood-luz-r1-01.mp4", type: "video", alt: "Luz  -  projeção sobre a arquitetura" },
  { src: "/media/mood-luz-r0-06.jpeg", type: "image", alt: "Luz  -  espectro cristalizado" },
  { src: "/media/mood-luz-r1-02.jpeg", type: "image", alt: "Luz  -  tipografia atravessada por luz" },
  { src: "/media/mood-luz-r1-04.jpeg", type: "image", alt: "Luz  -  sistema em variação cromática" },
  { src: "/media/mood-luz-r1-05.jpeg", type: "image", alt: "Luz  -  a peça acesa na rua" },
];

// Grade de 10 mídias  -  arranjo (colunas × linhas) é definido no
// DynamicFrameLayout (5×2 no desktop, 2×5 no mobile via fullScreen).
export function makeFrames(offset = 0): Frame[] {
  const media = offset === 0 ? MATERIA_MEDIA : LUZ_MEDIA;
  return media.map((item, i) => ({
    id: i + 1 + offset * 100,
    media: item.src,
    type: item.type,
    alt: item.alt,
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1,
  }));
}

// Aplicações gerais  -  grade de 10 (mesmo layout 5×2 dos media walls).
const APP_MEDIA: Item[] = [
  { src: "/media/app-1.mp4", type: "video", alt: "Aplicação  -  vídeo" },
  { src: "/media/app-2.png", type: "image", alt: "Aplicação  -  pôster" },
  { src: "/media/quebra-2.png", type: "image", alt: "Aplicação  -  pôster geométrico" },
  { src: "/media/quebra-6.png", type: "image", alt: "Aplicação  -  referência gráfica" },
  { src: "/media/dobra-4.png", type: "image", alt: "Aplicação  -  marca" },
  { src: "/media/quebra-8.png", type: "image", alt: "Aplicação  -  referência gráfica" },
  { src: "/media/dobra-2.png", type: "image", alt: "Aplicação  -  tipografia em perspectiva" },
  { src: "/media/quebra-4.png", type: "image", alt: "Aplicação  -  capa geométrica" },
  { src: "/media/dobra-8.mp4", type: "video", alt: "Aplicação  -  vídeo fluxo" },
  { src: "/media/quebra-5.gif", type: "image", alt: "Aplicação  -  animação gráfica" },
];

export function makeAppFrames(): Frame[] {
  return APP_MEDIA.map((item, i) => ({
    id: 900 + i,
    media: item.src,
    type: item.type,
    alt: item.alt,
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1,
  }));
}

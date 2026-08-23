import type { Frame } from "@/components/ui/dynamic-frame-layout";

/* ================================================================
   MÍDIAS DO MEDIA WALL — mix de imagens e vídeos.

   Para trocar/adicionar mídias reais dos artistas/experiências:
   - Coloque os arquivos em /public/media/
   - Edite as listas DOBRA_MEDIA e QUEBRA_MEDIA abaixo, com
     { src: "/media/arquivo.jpg", type: "image" } ou type: "video".
   Vídeos tocam em loop mudo automaticamente.
================================================================ */

type Item = { src: string; type: "image" | "video"; alt?: string };

// Camada 01 · Dobra — continuidade (em cor: transição / fluxo)
const DOBRA_MEDIA: Item[] = [
  { src: "/media/dobra-1.mp4", type: "video", alt: "Dobra — vídeo de abertura" },
  { src: "/media/dobra-2.png", type: "image", alt: "Dobra — tipografia em perspectiva" },
  { src: "/media/dobra-3.png", type: "image", alt: "Dobra — fluxo de tinta" },
  { src: "/media/dobra-4.png", type: "image", alt: "Dobra — marca" },
  { src: "/media/continuidade.mp4", type: "video", alt: "Dobra — vídeo continuidade" },
  { src: "/media/dobra-5.gif", type: "image", alt: "Dobra — animação" },
  { src: "/media/dobra-6.gif", type: "image", alt: "Dobra — animação" },
  { src: "/media/dobra-7.gif", type: "image", alt: "Dobra — logotipo animado" },
  { src: "/media/dobra-8.mp4", type: "video", alt: "Dobra — vídeo fluxo" },
];

// Camada 02 · Ruptura — alternância (referências gráficas de alto contraste)
const QUEBRA_MEDIA: Item[] = [
  { src: "/media/quebra-1.png", type: "image", alt: "Ruptura — instalação LED tipográfica" },
  { src: "/media/quebra-2.png", type: "image", alt: "Ruptura — pôsteres geométricos" },
  { src: "/media/quebra-3.png", type: "image", alt: "Ruptura — tipografia em ripas" },
  { src: "/media/quebra-4.png", type: "image", alt: "Ruptura — capa geométrica" },
  { src: "/media/quebra-5.gif", type: "image", alt: "Ruptura — animação gráfica" },
  { src: "/media/quebra-6.png", type: "image", alt: "Ruptura — referência gráfica" },
  { src: "/media/quebra-7.gif", type: "image", alt: "Ruptura — animação gráfica" },
  { src: "/media/quebra-8.png", type: "image", alt: "Ruptura — referência gráfica" },
  { src: "/media/quebra-9.gif", type: "image", alt: "Ruptura — animação gráfica" },
];

const GRID = [
  { x: 0, y: 0 },
  { x: 4, y: 0 },
  { x: 8, y: 0 },
  { x: 0, y: 4 },
  { x: 4, y: 4 },
  { x: 8, y: 4 },
  { x: 0, y: 8 },
  { x: 4, y: 8 },
  { x: 8, y: 8 },
];

export function makeFrames(offset = 0): Frame[] {
  const media = offset === 0 ? DOBRA_MEDIA : QUEBRA_MEDIA;
  return GRID.map((pos, i) => {
    const item = media[i % media.length];
    return {
      id: i + 1 + offset * 100,
      media: item.src,
      type: item.type,
      alt: item.alt,
      defaultPos: { ...pos, w: 4, h: 4 },
      mediaSize: 1,
    };
  });
}

// Aplicações gerais — grade de 6 (mesmo tamanho de tile dos grids de 9).
const APP_MEDIA: Item[] = [
  { src: "/media/app-1.mp4", type: "video", alt: "Aplicação — vídeo" },
  { src: "/media/dobra-3.png", type: "image", alt: "Aplicação — pôster" },
  { src: "/media/quebra-2.png", type: "image", alt: "Aplicação — pôster geométrico" },
  { src: "/media/quebra-6.png", type: "image", alt: "Aplicação — referência gráfica" },
  { src: "/media/dobra-4.png", type: "image", alt: "Aplicação — marca" },
  { src: "/media/quebra-8.png", type: "image", alt: "Aplicação — referência gráfica" },
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

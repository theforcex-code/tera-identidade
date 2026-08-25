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
  { src: "/media/moodboard-c1-video.mp4", type: "video", alt: "Continuidade — vídeo pixel-stretch" },
  { src: "/media/moodboard-c1-stretch.png", type: "image", alt: "Continuidade — colagem pixel-stretch (parque)" },
  { src: "/media/moodboard-c1-klalam.jpg", type: "image", alt: "Continuidade — mural tipográfico KLALAM" },
  { src: "/media/dobra-1.png", type: "image", alt: "Dobra — frame de abertura" },
];

// Camada 02 · Possibilidade — alternância (materiais reais; posições 4,5,7,9,10 atualizadas)
const QUEBRA_MEDIA: Item[] = [
  { src: "/media/mod-4.mp4", type: "video", alt: "Possibilidade — material 04" },
  { src: "/media/quebra-2.png", type: "image", alt: "Possibilidade — pôsteres geométricos" },
  { src: "/media/quebra-3.png", type: "image", alt: "Possibilidade — tipografia em ripas" },
  { src: "/media/quebra-1.png", type: "image", alt: "Possibilidade — instalação LED tipográfica" },
  { src: "/media/mod-5.mp4", type: "video", alt: "Possibilidade — material 05" },
  { src: "/media/quebra-6.png", type: "image", alt: "Possibilidade — referência gráfica" },
  { src: "/media/mod-7.png", type: "image", alt: "Possibilidade — material 07" },
  { src: "/media/quebra-8.png", type: "image", alt: "Possibilidade — referência gráfica" },
  { src: "/media/mod-9.webp", type: "image", alt: "Possibilidade — material 09" },
  { src: "/media/mod-10.mp4", type: "video", alt: "Possibilidade — material 10" },
];

// Grade de 10 mídias — arranjo (colunas × linhas) é definido no
// DynamicFrameLayout (5×2 no desktop, 2×5 no mobile via fullScreen).
export function makeFrames(offset = 0): Frame[] {
  const media = offset === 0 ? DOBRA_MEDIA : QUEBRA_MEDIA;
  return media.map((item, i) => ({
    id: i + 1 + offset * 100,
    media: item.src,
    type: item.type,
    alt: item.alt,
    defaultPos: { x: 0, y: 0, w: 4, h: 4 },
    mediaSize: 1,
  }));
}

// Aplicações gerais — grade de 10 (mesmo layout 5×2 dos media walls).
const APP_MEDIA: Item[] = [
  { src: "/media/app-1.mp4", type: "video", alt: "Aplicação — vídeo" },
  { src: "/media/app-2.png", type: "image", alt: "Aplicação — pôster" },
  { src: "/media/quebra-2.png", type: "image", alt: "Aplicação — pôster geométrico" },
  { src: "/media/quebra-6.png", type: "image", alt: "Aplicação — referência gráfica" },
  { src: "/media/dobra-4.png", type: "image", alt: "Aplicação — marca" },
  { src: "/media/quebra-8.png", type: "image", alt: "Aplicação — referência gráfica" },
  { src: "/media/dobra-2.png", type: "image", alt: "Aplicação — tipografia em perspectiva" },
  { src: "/media/quebra-4.png", type: "image", alt: "Aplicação — capa geométrica" },
  { src: "/media/dobra-8.mp4", type: "video", alt: "Aplicação — vídeo fluxo" },
  { src: "/media/quebra-5.gif", type: "image", alt: "Aplicação — animação gráfica" },
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

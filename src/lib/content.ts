// Conteúdo editável (mapa mental + imagens grandes). Só tipos e helpers puros
// aqui — nada de fs — para ser seguro em componentes client.
import type { CSSProperties } from "react";

export type NodeOverride = Partial<{
  label: string;
  desc: string;
  img: string;
  posX: number;
  posY: number;
  scale: number;
}>;

export type ImageOverride = Partial<{
  img: string;
  posX: number;
  posY: number;
  scale: number;
}>;

export type Content = {
  mindmap: Record<string, NodeOverride>;
  images: Record<string, ImageOverride>;
};

export const EMPTY_CONTENT: Content = { mindmap: {}, images: {} };

// Enquadramento: object-position (pan) + scale (zoom).
export function frameStyle(o?: {
  posX?: number;
  posY?: number;
  scale?: number;
}): CSSProperties {
  const posX = o?.posX ?? 50;
  const posY = o?.posY ?? 50;
  const scale = o?.scale ?? 1;
  return {
    objectPosition: `${posX}% ${posY}%`,
    transform: `scale(${scale})`,
    transformOrigin: "center",
  };
}

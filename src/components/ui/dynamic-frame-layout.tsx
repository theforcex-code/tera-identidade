"use client";

import { useState } from "react";

export type FrameMediaType = "video" | "image";

export interface Frame {
  id: number;
  /** URL da mídia (vídeo ou imagem) */
  media: string;
  /** Tipo explícito. Se omitido, é inferido pela extensão do arquivo. */
  type?: FrameMediaType;
  alt?: string;
  defaultPos: { x: number; y: number; w: number; h: number };
  mediaSize?: number;
}

function inferType(src: string, explicit?: FrameMediaType): FrameMediaType {
  if (explicit) return explicit;
  return /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i.test(src) ? "video" : "image";
}

function FrameComponent({
  media,
  type,
  alt = "",
  mediaSize,
  grayscale,
}: {
  media: string;
  type: FrameMediaType;
  alt?: string;
  mediaSize: number;
  grayscale: boolean;
}) {
  const gs = grayscale ? "grayscale" : "";
  return (
    <div className="relative h-full w-full overflow-hidden bg-neutral-900">
      <div
        className="h-full w-full overflow-hidden"
        style={{ transform: `scale(${mediaSize})`, transformOrigin: "center" }}
      >
        {type === "video" ? (
          <video
            className={`h-full w-full object-cover ${gs}`}
            src={media}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={`h-full w-full object-cover ${gs}`} src={media} alt={alt} />
        )}
      </div>
    </div>
  );
}

interface DynamicFrameLayoutProps {
  frames: Frame[];
  className?: string;
  gapSize?: number;
  /** Aplica preto e branco em todas as mídias (default true) */
  grayscale?: boolean;
  /**
   * Tela inteira: preenche a altura do viewport com uma grade 5×2 no desktop
   * (2×5 no mobile). Tiles deixam de ser quadrados e cobrem a célula. Ideal
   * para 10 mídias. Sem esta flag, mantém o grid quadrado de 3 colunas.
   */
  fullScreen?: boolean;
}

/**
 * Grade estática de mídias (fotos e vídeos). Sem animação de hover.
 * - Padrão: grid de 3 colunas com tiles quadrados.
 * - fullScreen: grade 5×2 (desktop) / 2×5 (mobile) na altura do viewport.
 * Vídeos tocam em loop mudo automaticamente.
 */
export function DynamicFrameLayout({
  frames: initialFrames,
  className,
  gapSize = 4,
  grayscale = true,
  fullScreen = false,
}: DynamicFrameLayoutProps) {
  const [frames] = useState<Frame[]>(initialFrames);

  const gridCls = fullScreen
    ? "grid h-[100svh] w-full grid-cols-2 grid-rows-5 md:grid-cols-5 md:grid-rows-2"
    : "grid w-full grid-cols-3";
  const tileCls = fullScreen ? "relative h-full w-full" : "relative aspect-square";

  return (
    <div className={`${gridCls} ${className ?? ""}`} style={{ gap: `${gapSize}px` }}>
      {frames.map((frame) => (
        <div key={frame.id} className={tileCls}>
          <FrameComponent
            media={frame.media}
            type={inferType(frame.media, frame.type)}
            alt={frame.alt}
            mediaSize={frame.mediaSize ?? 1}
            grayscale={grayscale}
          />
        </div>
      ))}
    </div>
  );
}

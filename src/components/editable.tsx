"use client";

import { useEffect, useRef } from "react";

import { frameStyle } from "@/lib/content";
import { useContent } from "@/components/content-provider";

type Group = "mindmap" | "images";

// Overlay clicável (só em modo edição) que seleciona o item para editar.
export function EditOverlay({ group, id }: { group: Group; id: string }) {
  const { editing, select, selected } = useContent();
  if (!editing) return null;
  const isSel = selected?.group === group && selected?.id === id;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        select(group, id);
      }}
      className={`absolute inset-0 z-30 cursor-pointer rounded-[inherit] transition ${
        isSel
          ? "ring-2 ring-emerald-400"
          : "ring-1 ring-emerald-300/40 hover:bg-emerald-300/10 hover:ring-emerald-300/80"
      }`}
      aria-label={`Editar ${id}`}
    />
  );
}

// Imagem editável: preenche o container (relative) com enquadramento aplicado.
export function EditableImage({
  group,
  id,
  defaultSrc,
  alt,
  fit = "cover",
  grayscale = false,
  invert = false,
  className = "",
}: {
  group: Group;
  id: string;
  defaultSrc: string;
  alt: string;
  fit?: "cover" | "contain";
  grayscale?: boolean;
  invert?: boolean;
  className?: string;
}) {
  const { content } = useContent();
  const ov = group === "mindmap" ? content.mindmap[id] : content.images[id];
  const src = ov?.img || defaultSrc;
  // Um slot aceita vídeo tanto quanto imagem: o upload guarda qualquer arquivo,
  // então quem decide a tag é a extensão do que está no slot.
  const video = /\.(mp4|webm|mov|m4v)$/i.test(src);
  const classe = `absolute inset-0 h-full w-full ${
    fit === "cover" ? "object-cover" : "object-contain"
  } ${grayscale ? "grayscale" : ""} ${invert ? "invert" : ""} ${className}`;
  return (
    <>
      {video ? (
        <VideoNaTela
          src={src}
          alt={alt}
          className={classe}
          style={frameStyle(ov)}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={classe} style={frameStyle(ov)} />
      )}
      <EditOverlay group={group} id={id} />
    </>
  );
}

/** Vídeo que só roda quando está em cena.
 *
 *  O deck tem mais de vinte vídeos. Todos tocando ao mesmo tempo são vinte
 *  decodificações simultâneas, e a rolagem começa a travar mesmo com o resto
 *  do quadro barato. Com o observador, tocam dois ou três  -  os que estão na
 *  tela  -  e o custo cai junto.
 *
 *  A margem de uma tela em volta faz o vídeo já estar rodando quando o board
 *  entra, em vez de dar o "engasgo" de começar na hora.
 */
function VideoNaTela({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className: string;
  style: React.CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      // Margem curta de propósito. O empilhamento deixa várias seções presas
      // na mesma faixa de rolagem, então uma margem larga marcava como "em
      // cena" boards que estão cobertos por outros  -  perto do manual isso
      // dava onze vídeos rodando ao mesmo tempo. Meia tela é o suficiente
      // para o vídeo já estar rodando quando o board aparece.
      { rootMargin: "0px", threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      loop
      muted
      playsInline
      preload="none"
      aria-label={alt}
      className={className}
      style={style}
    />
  );
}

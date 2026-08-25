"use client";

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
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${
          fit === "cover" ? "object-cover" : "object-contain"
        } ${grayscale ? "grayscale" : ""} ${invert ? "invert" : ""} ${className}`}
        style={frameStyle(ov)}
      />
      <EditOverlay group={group} id={id} />
    </>
  );
}

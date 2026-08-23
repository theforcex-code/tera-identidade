"use client";

import { useRef } from "react";
import { useContent } from "@/components/content-provider";
import { NODE_DEFAULTS, IMAGE_TARGETS } from "@/lib/mindmap-data";
import type { ImageOverride, NodeOverride } from "@/lib/content";

const DEV = process.env.NODE_ENV === "development";

export function Editor() {
  const { editing, setEditing, selected, clearSelection, save, dirty, saving } =
    useContent();
  if (!DEV) return null;

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-2 font-univers">
        {editing && (
          <button
            type="button"
            onClick={save}
            disabled={!dirty || saving}
            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
              dirty
                ? "bg-emerald-500 text-black hover:bg-emerald-400"
                : "bg-white/10 text-white/40"
            }`}
          >
            {saving ? "Salvando…" : dirty ? "Salvar" : "Salvo"}
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setEditing(!editing);
            clearSelection();
          }}
          className="rounded-full bg-white px-4 py-2 text-xs font-medium text-black hover:bg-white/90"
        >
          {editing ? "Sair da edição" : "Editar"}
        </button>
      </div>

      {editing && !selected && (
        <div className="fixed bottom-20 right-5 z-[100] w-72 rounded-xl border border-white/15 bg-neutral-900/95 p-4 font-univers text-xs text-white/60 shadow-2xl backdrop-blur">
          Clique em uma imagem do mapa mental, na ágata, no diagrama ou na foto da
          capa para editar texto, trocar a imagem e ajustar o enquadramento.
        </div>
      )}

      {editing && selected && <Panel />}
    </>
  );
}

function Panel() {
  const { selected, clearSelection, content, updateNode, updateImage } =
    useContent();
  const fileRef = useRef<HTMLInputElement>(null);
  if (!selected) return null;

  const { group, id } = selected;
  const isNode = group === "mindmap";
  const title = isNode
    ? NODE_DEFAULTS[id]?.label ?? id
    : IMAGE_TARGETS.find((t) => t.id === id)?.label ?? id;
  const ov = isNode ? content.mindmap[id] : content.images[id];
  const posX = ov?.posX ?? 50;
  const posY = ov?.posY ?? 50;
  const scale = ov?.scale ?? 1;

  const setPatch = (patch: NodeOverride & ImageOverride) =>
    isNode ? updateNode(id, patch) : updateImage(id, patch);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const j = await res.json().catch(() => ({}));
    if (j.url) setPatch({ img: j.url });
    else alert(j?.error ?? "Falha no upload.");
    e.target.value = "";
  }

  return (
    <div className="fixed bottom-20 right-5 z-[100] max-h-[75vh] w-80 overflow-y-auto rounded-xl border border-white/15 bg-neutral-900/95 p-5 font-univers text-white shadow-2xl backdrop-blur">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
            {isNode ? "Nó do mapa" : "Imagem"}
          </p>
          <p className="mt-1 text-sm">{title}</p>
        </div>
        <button
          type="button"
          onClick={clearSelection}
          className="text-lg leading-none text-white/40 hover:text-white"
        >
          ×
        </button>
      </div>

      {isNode && (
        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="text-[11px] text-white/50">Título</span>
            <input
              value={content.mindmap[id]?.label ?? NODE_DEFAULTS[id]?.label ?? ""}
              onChange={(e) => updateNode(id, { label: e.target.value })}
              className="mt-1 w-full rounded bg-white/10 px-2 py-1.5 text-sm outline-none focus:bg-white/15"
            />
          </label>
          <label className="block">
            <span className="text-[11px] text-white/50">Descrição</span>
            <textarea
              value={content.mindmap[id]?.desc ?? NODE_DEFAULTS[id]?.desc ?? ""}
              onChange={(e) => updateNode(id, { desc: e.target.value })}
              rows={2}
              className="mt-1 w-full resize-none rounded bg-white/10 px-2 py-1.5 text-sm outline-none focus:bg-white/15"
            />
          </label>
        </div>
      )}

      <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20"
          >
            Trocar imagem
          </button>
          {ov?.img && (
            <button
              type="button"
              onClick={() => setPatch({ img: undefined })}
              className="text-xs text-white/40 hover:text-white"
            >
              restaurar
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onUpload}
            className="hidden"
          />
        </div>
        <Slider label="Posição X" min={0} max={100} value={posX} onChange={(v) => setPatch({ posX: v })} />
        <Slider label="Posição Y" min={0} max={100} value={posY} onChange={(v) => setPatch({ posY: v })} />
        <Slider label="Zoom" min={1} max={3} step={0.05} value={scale} onChange={(v) => setPatch({ scale: v })} />
        <button
          type="button"
          onClick={() => setPatch({ posX: 50, posY: 50, scale: 1 })}
          className="text-xs text-white/40 hover:text-white"
        >
          resetar enquadramento
        </button>
      </div>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex justify-between text-[11px] text-white/50">
        <span>{label}</span>
        <span>{Math.round(value * 100) / 100}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-1 w-full accent-emerald-400"
      />
    </label>
  );
}

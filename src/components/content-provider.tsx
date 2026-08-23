"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type { Content, ImageOverride, NodeOverride } from "@/lib/content";

export type Selection = { group: "mindmap" | "images"; id: string } | null;

type Ctx = {
  content: Content;
  editing: boolean;
  setEditing: (b: boolean) => void;
  selected: Selection;
  select: (group: "mindmap" | "images", id: string) => void;
  clearSelection: () => void;
  updateNode: (id: string, patch: NodeOverride) => void;
  updateImage: (id: string, patch: ImageOverride) => void;
  save: () => Promise<void>;
  dirty: boolean;
  saving: boolean;
};

const ContentContext = createContext<Ctx | null>(null);

export function useContent(): Ctx {
  const c = useContext(ContentContext);
  if (!c) throw new Error("useContent precisa estar dentro de <ContentProvider>");
  return c;
}

export function ContentProvider({
  initial,
  children,
}: {
  initial: Content;
  children: React.ReactNode;
}) {
  const [content, setContent] = useState<Content>(initial);
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<Selection>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const select = useCallback(
    (group: "mindmap" | "images", id: string) => setSelected({ group, id }),
    [],
  );
  const clearSelection = useCallback(() => setSelected(null), []);

  const updateNode = useCallback((id: string, patch: NodeOverride) => {
    setContent((c) => ({
      ...c,
      mindmap: { ...c.mindmap, [id]: { ...c.mindmap[id], ...patch } },
    }));
    setDirty(true);
  }, []);

  const updateImage = useCallback((id: string, patch: ImageOverride) => {
    setContent((c) => ({
      ...c,
      images: { ...c.images, [id]: { ...c.images[id], ...patch } },
    }));
    setDirty(true);
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) setDirty(false);
      else {
        const j = await res.json().catch(() => ({}));
        alert(j?.error ?? "Falha ao salvar.");
      }
    } finally {
      setSaving(false);
    }
  }, [content]);

  return (
    <ContentContext.Provider
      value={{
        content,
        editing,
        setEditing,
        selected,
        select,
        clearSelection,
        updateNode,
        updateImage,
        save,
        dirty,
        saving,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   LAB 02 · AREIA — embed em tela cheia.

   O problema: o lab usa a roda do mouse para dar zoom (OrbitControls).
   Como eventos dentro de um iframe não sobem para a janela de fora, a
   roda ficava presa ali e a apresentação não rolava mais.

   A solução mantém as duas coisas. Por padrão a roda ROLA A PÁGINA:
   um listener em fase de captura no documento do iframe barra o evento
   antes do OrbitControls e o reemite na janela de fora, onde o Lenis
   escuta. Um clique no canvas entra em modo zoom e a roda volta a ser
   do lab; Esc, ou tirar o ponteiro do quadro, devolve o scroll.

   Cliques nunca são interceptados — os botões do lab (encher, paletas,
   formas) seguem funcionando no primeiro clique, sem camada por cima.
------------------------------------------------------------------- */

export function AreiaLab({
  srcGpu,
  srcWebgl,
  title,
}: {
  srcGpu: string;
  srcWebgl: string;
  title: string;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  // Ref além do state: o listener é registrado uma vez e lê sempre o valor atual.
  const zoomRef = useRef(false);
  const [zoom, setZoom] = useState(false);
  // null = ainda testando. Só monta o iframe depois de decidir, senão a
  // versão WebGL carregaria e seria trocada logo em seguida.
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let vivo = true;
    // O lab GPU enche até 1,9 milhão de grãos e recircula; o WebGL para em
    // ~229 mil. Vale tentar a GPU, mas sem tela preta se o adaptador faltar.
    const escolher = async () => {
      let temGpu = false;
      try {
        const gpu = (navigator as Navigator & { gpu?: { requestAdapter(): Promise<unknown> } }).gpu;
        temGpu = !!gpu && !!(await gpu.requestAdapter());
      } catch {
        temGpu = false;
      }
      if (vivo) setSrc(temGpu ? srcGpu : srcWebgl);
    };
    escolher();
    return () => {
      vivo = false;
    };
  }, [srcGpu, srcWebgl]);

  const setModo = useCallback((ligado: boolean) => {
    zoomRef.current = ligado;
    setZoom(ligado);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !src) return;

    let doc: Document | null = null;

    const naRoda = (e: WheelEvent) => {
      // Alt segurado também dá zoom, sem precisar entrar no modo.
      if (zoomRef.current || e.altKey) return;
      e.preventDefault();
      e.stopPropagation();
      // Reemite lá fora: é o Lenis quem consome e rola o deck.
      window.dispatchEvent(
        new WheelEvent("wheel", {
          deltaX: e.deltaX,
          deltaY: e.deltaY,
          deltaMode: e.deltaMode,
          bubbles: true,
          cancelable: true,
        }),
      );
    };

    const naDescida = (e: MouseEvent) => {
      // Só o canvas liga o zoom; barra de botões e links seguem normais.
      if ((e.target as HTMLElement)?.tagName === "CANVAS") setModo(true);
    };

    const naTecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModo(false);
    };

    const aoSair = () => setModo(false);

    const ligar = () => {
      doc = frame.contentDocument;
      if (!doc) return;
      doc.addEventListener("wheel", naRoda, { capture: true, passive: false });
      doc.addEventListener("mousedown", naDescida, true);
      doc.addEventListener("keydown", naTecla, true);
      doc.addEventListener("mouseleave", aoSair);
    };

    frame.addEventListener("load", ligar);
    if (frame.contentDocument?.readyState === "complete") ligar();
    document.addEventListener("keydown", naTecla);

    return () => {
      frame.removeEventListener("load", ligar);
      document.removeEventListener("keydown", naTecla);
      if (!doc) return;
      doc.removeEventListener("wheel", naRoda, { capture: true });
      doc.removeEventListener("mousedown", naDescida, true);
      doc.removeEventListener("keydown", naTecla, true);
      doc.removeEventListener("mouseleave", aoSair);
    };
  }, [setModo, src]);

  return (
    // Sem onMouseLeave aqui: entrar no iframe já dispara mouseleave no
    // documento de fora, o que desligaria o zoom no mesmo clique que o liga.
    // Quem sai do modo é o mouseleave de DENTRO do iframe, ou o Esc.
    <section
      className={`relative h-screen w-full overflow-hidden border-t bg-black transition-colors ${
        zoom ? "border-white/60" : "border-white/10"
      }`}
    >
      {src && (
        <iframe
          ref={frameRef}
          src={src}
          title={title}
          className="absolute inset-0 block h-full w-full border-0"
          allow="fullscreen"
          loading="lazy"
        />
      )}

      {/* Só aparece no modo zoom, num canto que a interface do lab não usa. */}
      {zoom && (
        <p className="pointer-events-none absolute right-6 top-[72px] z-10 rounded-full border border-white/25 bg-black/80 px-4 py-1.5 font-univers text-[11px] uppercase tracking-[0.16em] text-branco/80 backdrop-blur">
          Zoom ativo · Esc volta ao scroll
        </p>
      )}
    </section>
  );
}

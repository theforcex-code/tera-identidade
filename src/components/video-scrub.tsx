"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   VÍDEO COMO TIMELINE  -  o mouse é a linha do tempo.

   Sozinho, o vídeo roda em loop. Assim que o ponteiro se MOVE sobre a
   seção, ele pausa e passa a seguir a posição horizontal do mouse: da
   borda esquerda ao fim, da direita ao começo. Ao sair, volta a rodar
   de onde parou.

   Só `mousemove` assume o controle  -  rolar a página com a roda não move
   o ponteiro, então passar por aqui rolando não bagunça o vídeo.

   O seek acontece dentro de um requestAnimationFrame: um mousemove pode
   disparar dezenas de vezes por quadro, e atribuir `currentTime` a cada
   um trava a decodificação. O arquivo é codificado com keyframe a cada
   0,5 s justamente para o seek cair perto e responder na hora.
------------------------------------------------------------------- */

export function VideoScrub({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef(0);
  const alvoRef = useRef(0);
  // Ref junto do state: o handler lê o valor atual sem recriar o listener.
  const scrubRef = useRef(false);
  const [scrub, setScrub] = useState(false);
  const [pos, setPos] = useState(0);
  const [tocou, setTocou] = useState(false);

  const aplicaSeek = useCallback(() => {
    rafRef.current = 0;
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = alvoRef.current * v.duration;
  }, []);

  const assume = useCallback(
    (clientX: number, alvo: HTMLElement) => {
      const v = videoRef.current;
      if (!v) return;
      const r = alvo.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      alvoRef.current = t;
      setPos(t);
      if (!scrubRef.current) {
        scrubRef.current = true;
        setScrub(true);
        setTocou(true);
        v.pause();
      }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(aplicaSeek);
    },
    [aplicaSeek],
  );

  const solta = useCallback(() => {
    if (!scrubRef.current) return;
    scrubRef.current = false;
    setScrub(false);
    videoRef.current?.play().catch(() => {});
  }, []);

  // Enquanto roda sozinho, a barra segue o vídeo.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const acompanha = () => {
      if (!scrubRef.current && Number.isFinite(v.duration) && v.duration > 0) {
        setPos(v.currentTime / v.duration);
      }
    };
    v.addEventListener("timeupdate", acompanha);
    return () => {
      v.removeEventListener("timeupdate", acompanha);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      className="relative h-screen w-full overflow-hidden border-t border-white/10 bg-preto"
      onMouseMove={(e) => assume(e.clientX, e.currentTarget)}
      onMouseLeave={solta}
    >
      <video
        ref={videoRef}
        src={src}
        title={title}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* A linha do tempo. Discreta enquanto roda, acesa no controle. */}
      <div
        aria-hidden
        className={`absolute inset-x-0 bottom-0 z-10 h-px transition-colors ${
          scrub ? "bg-white/25" : "bg-white/10"
        }`}
      >
        <div
          className={`h-full origin-left transition-colors ${
            scrub ? "bg-branco" : "bg-branco/50"
          }`}
          style={{ width: `${pos * 100}%` }}
        />
      </div>

      {/* Some depois do primeiro contato: já foi descoberto. */}
      <p
        aria-hidden
        className={`pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-univers text-[11px] uppercase tracking-[0.28em] text-branco/45 transition-opacity duration-500 ${
          tocou ? "opacity-0" : "opacity-100"
        }`}
      >
        Mova o mouse para percorrer
      </p>
    </section>
  );
}

// Tokens de layout do deck. Estavam soltos dentro de page.tsx; saíram para cá
// quando a defesa virou componente próprio, para os dois lados usarem a mesma
// medida em vez de cada um manter a sua cópia.

export const SHELL = "mx-auto w-full max-w-[1400px] px-8 md:px-16";

// `relative bg-preto` = base opaca p/ o empilhamento (stacking) no desktop.
// `md:min-h-screen` garante que a seção nunca fique menor que a tela (senão o
// pin do empilhamento "quebra", mostrando uma faixa da seção anterior).
export const SECTION =
  "relative bg-preto w-full border-t border-white/10 py-24 md:min-h-screen md:py-36";

export const LABEL = "font-univers uppercase tracking-[0.28em]";

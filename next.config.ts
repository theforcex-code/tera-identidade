import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desligado de propósito. O empilhamento usa `pin` do ScrollTrigger, que
  // embrulha cada seção num `pin-spacer`  -  mexe no DOM que o React montou.
  // Com o duplo-mount de desenvolvimento do StrictMode, a segunda montagem
  // caía por cima dos spacers e derrubava a página inteira em
  // `insertBefore: node is no longer a child`. Em produção o React monta uma
  // vez só, então isso é só a paridade entre dev e o que vai ao ar.
  reactStrictMode: false,
};

export default nextConfig;

// Estrutura do mapa mental (compartilhada entre o MindMap e o Editor).
export interface NodeDef {
  id: string;
  label: string;
  img: string;
  milestone?: boolean;
  desc?: string;
}

export const TIERS: NodeDef[][] = [
  [{ id: "tera", label: "TÉRA", img: "/mapa/tera-hero.svg", milestone: true }],
  [
    { id: "escala", label: "Escala", img: "/mapa/escala.png" },
    { id: "solo", label: "Solo", img: "/mapa/solo.png" },
    { id: "extraordinario", label: "Extraordinário", img: "/mapa/extraordinario.png" },
  ],
  [
    {
      id: "espetaculos",
      label: "Espetáculos Multidimensionais",
      img: "/mapa/espetaculos.png",
      milestone: true,
      desc: "Arquitetura, arte, cultura, tecnologia, natureza e presença em um só acontecimento.",
    },
  ],
  [
    { id: "tempo", label: "Tempo", img: "/mapa/tempo.png", desc: "Passado, presente e possível coexistem." },
    { id: "perspectiva", label: "Perspectiva", img: "/mapa/perspectiva.png", desc: "A experiência muda conforme o ponto de vista." },
    { id: "participacao", label: "Participação", img: "/mapa/participacao.png", desc: "A presença modifica o acontecimento." },
  ],
  [
    {
      id: "realidade",
      label: "Realidade Expandida",
      img: "/mapa/realidade-expandida.png",
      milestone: true,
      desc: "Diferentes percepções coexistem em um mesmo acontecimento.",
    },
  ],
  [
    { id: "continuidade", label: "Continuidade", img: "/mapa/continuidade.png", desc: "Os diferentes estados pertencem ao mesmo campo." },
    { id: "relacao", label: "Relação", img: "/mapa/relacao.png", desc: "Cada estado se define pelas relações que estabelece com os outros." },
  ],
  [{ id: "tecido", label: "Tecido da Realidade", img: "/mapa/tecido.png", milestone: true, desc: "Um campo contínuo formado por relações." }],
  [{ id: "dobra", label: "Dobra", img: "/mapa/dobra.png", milestone: true, desc: "Reconfigurar essas relações sem romper sua continuidade." }],
  [{ id: "dobrar", label: "Dobrar o Tecido da Realidade", img: "/mapa/dobrar.png", milestone: true }],
];

// Mapa plano id -> padrões, para o Editor mostrar os valores atuais.
export const NODE_DEFAULTS: Record<string, { label: string; desc: string; img: string }> =
  Object.fromEntries(
    TIERS.flat().map((n) => [n.id, { label: n.label, desc: n.desc ?? "", img: n.img }]),
  );

// Imagens grandes editáveis.
export const IMAGE_TARGETS: { id: string; label: string; img: string }[] = [
  { id: "capa", label: "Capa — foto de fundo", img: "/brand/capa-sala.jpg" },
  { id: "dobra", label: "Conceito Dobra — ágata", img: "/media/apoio-dobra.png" },
  { id: "ruptura", label: "Conceito Ruptura — diagrama", img: "/media/apoio-quebra.png" },
];

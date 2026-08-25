// Estrutura do mapa mental (compartilhada entre o MindMap e o Editor).
export interface NodeDef {
  id: string;
  label: string;
  img: string;
  milestone?: boolean;
  desc?: string;
  /** Frase de transição renderizada ACIMA da imagem, em largura total e centralizada. */
  lead?: string;
  /** Oculta o label textual do nó (mantido apenas como alt da imagem). */
  hideLabel?: boolean;
  /** Nó só de texto (sem miniatura) — título de maior importância no fluxo. */
  noImage?: boolean;
}

export const TIERS: NodeDef[][] = [
  [{
    id: "tera",
    label: "TÉRA",
    img: "/mapa/tera-hero.svg",
    milestone: true,
    hideLabel: true,
    desc: "Plataforma onde patrimônio e tecnologia convergem para expandir a criação contemporânea.",
  }],
  [
    { id: "escala", label: "Escala", img: "/mapa/escala.png", desc: "A dimensão da palavra. A imagem que arquiteta o espaço." },
    { id: "solo", label: "Solo", img: "/mapa/solo.png", desc: "O som da palavra. A experiência nasce dentro da matéria." },
    { id: "extraordinario", label: "Extraordinário", img: "/mapa/extraordinario.png", desc: "A origem da palavra. De teras, maravilha: o que rompe a ordem comum." },
  ],
  [
    {
      id: "espetaculos",
      label: "Espetáculos Multidimensionais",
      img: "",
      milestone: true,
      noImage: true,
    },
  ],
  [
    { id: "multilinguagem", label: "Multilinguagem", img: "/mapa/multilinguagem.png", desc: "Diferentes formas de criação coexistem." },
    { id: "multiperspectiva", label: "Multiperspectiva", img: "/mapa/multiperspectiva.png", desc: "O acontecimento muda conforme o ponto de vista." },
    { id: "presenca", label: "Presença", img: "/mapa/presenca.png", desc: "O corpo modifica e completa o acontecimento." },
  ],
  [
    {
      id: "espaco",
      label: "O Espaço",
      img: "/mapa/o-espaco.gif",
      desc: "o princípio de possibilidade",
      lead: "Integrada à arquitetura em 32K, a imagem deixa de ocupar uma superfície para constituir o espaço.",
    },
    { id: "luz", label: "A Luz", img: "/mapa/a-luz.gif", desc: "o princípio de manifestação" },
    { id: "otempo", label: "O Tempo", img: "/mapa/o-tempo.gif", desc: "o princípio de continuidade" },
  ],
  [{ id: "tecido", label: "Tecido da Realidade", img: "/mapa/tecido.png", milestone: true, desc: "Espaço, luz, tempo e matéria pertencem a uma mesma realidade." }],
];

// Mapa plano id -> padrões, para o Editor mostrar os valores atuais.
export const NODE_DEFAULTS: Record<string, { label: string; desc: string; img: string }> =
  Object.fromEntries(
    TIERS.flat().map((n) => [n.id, { label: n.label, desc: n.desc ?? "", img: n.img }]),
  );

// Imagens grandes editáveis.
export const IMAGE_TARGETS: { id: string; label: string; img: string }[] = [
  { id: "capa", label: "Capa — foto de fundo", img: "/brand/capa-sala.jpg" },
  { id: "conceito-geral", label: "Conceito Central — mãos tecendo", img: "/media/conceito-central.png" },
  { id: "capa-continuidade", label: "Capa Continuidade — GIF", img: "/media/capa-continuidade.gif" },
  { id: "dobra", label: "Conceito Continuidade — estratos", img: "/media/continuidade-conceito.png" },
  { id: "caminho1-racional", label: "Racional Continuidade — pixel-stretch", img: "/media/caminho1-racional.png" },
  { id: "capa-modulacao", label: "Capa Possibilidade — GIF", img: "/media/capa-modulacao.gif" },
  { id: "possibilidade-descricao", label: "Descrição Possibilidade — ripas", img: "/media/possibilidade-descricao.png" },
  { id: "possibilidade-racional", label: "Racional Possibilidade — moiré", img: "/media/possibilidade-racional.png" },
  { id: "logo-1", label: "Logo — variação 01", img: "/brand/logo-1.svg" },
  { id: "logo-2", label: "Logo — variação 02", img: "/brand/logo-2.svg" },
  { id: "logo-3", label: "Logo — variação 03", img: "/brand/logo-3.svg" },
];

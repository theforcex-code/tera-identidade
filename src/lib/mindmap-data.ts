// Estrutura do mapa mental (compartilhada entre o MindMap e o Editor).
//
// Texto portado na íntegra de conceito/fluxo-conceito.html (theforcex-code @1faa711):
// nada foi abreviado. A hierarquia segue a escala de 7 degraus do original
// (ver TYPE em mind-map.tsx); os statements sobem de degrau para marcar que
// são a síntese do estágio, não mais uma legenda.

/** Marcação inline mínima: *itálico*, **negrito**, [sublinhado]. */
export interface NodeDef {
  id: string;
  label: string;
  img: string;
  /** Corpo da legenda. */
  desc?: string;
  /** Rótulo curto acima do título — "chapa", "plasma". */
  sub?: string;
  /** Crédito/fonte abaixo da legenda. Aceita \n. */
  src?: string;
  milestone?: boolean;
  hideLabel?: boolean;
  noImage?: boolean;
  lead?: string;
}

export interface Tier {
  /** Selo do estágio: número + título. */
  stage?: { no: string; tt: string };
  nodes: NodeDef[];
  /** O conceito como ciclo fechado, embaixo do texto: ida e volta. */
  loop?: { ida: string; volta: string };
  /** Parágrafos do racional. */
  explain?: string[];
  /** Cadeia de estados: o racional comprimido numa linha só. */
  chain?: string[];
  /** Statement: a síntese do estágio. Aceita \n. */
  concl?: string;
  /** Transição para o próximo estágio. */
  trans?: string;
  /** Fechamento do fluxo. */
  close?: { statements: string[]; kicker: string; sub: string };
}

export const TIERS: Tier[] = [
  {
    nodes: [
      {
        id: "tera",
        label: "TÉRA",
        img: "/mapa/tera-hero.svg",
        milestone: true,
        hideLabel: true,
      },
    ],
  },

  {
    stage: { no: "01", tt: "O nome" },
    nodes: [
      {
        id: "nome-terra",
        label: "Terra",
        img: "/mapa/nome-terra.jpg",
        desc: "o solo como origem, matéria e fundamento — os pilares da fundação, aparentes na entrada",
        src: "briefing · slide 10",
      },
      {
        id: "nome-teras",
        label: "Teras",
        img: "/mapa/nome-teras.jpg",
        desc: "em grego: o prodígio, o sinal no céu, o monstro — o que assombra pela grandeza",
        src: "briefing · slide 10 · Liddell & Scott",
      },
      {
        id: "nome-tera",
        label: "Tera",
        img: "/mapa/nome-tera.jpg",
        desc: "o prefixo da escala gigante: 10¹², como em terabyte",
        src: "briefing · slide 10",
      },
    ],
    concl: "O nome já diz o que o lugar é:\nextraordinário, enorme, nascido do chão.",
    trans: "E a obra fez, no concreto, o que o nome diz",
  },

  {
    stage: { no: "02", tt: "A obra" },
    nodes: [
      {
        id: "obra-subsolo",
        label: "O subsolo foi escavado",
        img: "/mapa/obra-subsolo.jpg",
        desc: "a fundação original do antigo Hospital Matarazzo foi preservada: retirou-se a terra em volta, e os pilares ficaram de pé e aparentes na entrada",
        src: "briefing · respostas 21.08\nfoto: Carol Cerejo",
      },
      {
        id: "obra-led",
        label: "E no lugar dela, luz",
        img: "/mapa/obra-led.jpg",
        desc: "quatro faces de LED no fundo do vão, sobre concreto aparente revestido de chapa gradeada",
        src: "briefing · respostas 21.08",
      },
    ],
    concl: "A terra saiu.\nNo lugar dela, [entrou luz].",
    trans: "O cliente definiu a categoria pela física — e disse a mesma coisa",
  },

  {
    stage: { no: "03", tt: "A categoria" },
    nodes: [
      {
        id: "categoria-espetaculo",
        label: "Espetáculo",
        img: "/mapa/categoria-espetaculo.jpg",
        desc: "de *specere*: olhar, ver. A categoria é nomeada pelo ato de olhar",
        src: "briefing · slide 05",
      },
      {
        id: "categoria-multidimensional",
        label: "Multidimensional",
        img: "/mapa/categoria-multidimensional.jpg",
        desc: "grau de liberdade: a capacidade de um objeto mudar de estado",
        src: "briefing · slide 05",
      },
      {
        id: "categoria-estados",
        label: "Múltiplos estados do espaço",
        img: "/mapa/categoria-estados.jpg",
        desc: "a sala muda de configuração, comportamento e escala a cada projeto",
        src: "briefing · slide 07\nreferência: Lygia Clark, *Bicho*, c.1960",
      },
    ],
    concl: "A categoria já é sobre [mudar de estado]\n— e sobre o ato de olhar.",
    trans: "O nome, a obra e a categoria dizem a mesma operação",
  },

  {
    stage: { no: "04", tt: "O conceito" },
    nodes: [],
    explain: [
      "Para receber o projeto, a obra escavou o subsolo do antigo Hospital Matarazzo. Sob as estruturas históricas, novas fundações foram executadas e reforçadas — algumas escavadas manualmente — para que o edifício permanecesse de pé enquanto a terra era retirada.",
      "O LED ocupa hoje esse mesmo plano escavado. **Onde havia terra, hoje há luz** — e toda noite o público atravessa essa fundação para chegar até ela.",
      "A própria tela repete o percurso. Do quartzo vem o silício: extraído, purificado e cristalizado até virar a base dos circuitos que comandam a imagem. A luz nasce em outros semicondutores cristalinos, construídos camada por camada — quando a corrente os atravessa, eles emitem fótons.",
      "E então o processo se inverte. A matéria produziu luz; agora a luz age sobre a matéria. Um fóton é absorvido dentro do olho e uma molécula muda de forma — um dos primeiros eventos da visão, o que desencadeia o sinal que o cérebro transforma em percepção.",
    ],
    chain: ["Pedra", "Mineral", "Elemento", "Cristal", "Chip", "Imagem", "Luz"],
    loop: { ida: "Da matéria à luz", volta: "Da luz à matéria" },
    trans: "E o conceito já tem duas palavras — uma para cada caminho",
  },

  {
    stage: { no: "05", tt: "Os dois caminhos" },
    nodes: [
      {
        id: "caminho-materia",
        label: "01 · Matéria",
        sub: "chapa",
        img: "/mapa/caminho-materia.jpg",
        desc: "a identidade nasce do que ficou: o módulo de 1×1 m das chapas gradeadas, a emenda dos gabinetes, a marca vazada com luz atravessando por trás. o grid da chapa, o formato da tela de LED, a terra que ficou nos pilares — tudo o que é sólido, imutável, geométrico",
        src: "o caminho ligado à arquitetura da sala",
      },
      {
        id: "caminho-luz",
        label: "02 · Luz",
        sub: "plasma",
        img: "/mapa/caminho-luz.jpg",
        desc: "a identidade nasce do que entrou: a matéria escoa, entra por uma fresta e preenche as letras por dentro. a onda, o orgânico, o plasma, as artes de cada espetáculo — tudo o que muda a cada obra",
        src: "o caminho das referências visuais de vocês",
      },
    ],
  },

  {
    nodes: [],
    close: {
      statements: [
        "Terra é memória.\nLuz é o presente.",
        "Matéria é a moldura.\nLuz é o que a preenche.",
      ],
      kicker: "Téra · Da matéria à luz",
      sub: "Cinco estágios · do nome aos dois caminhos",
    },
  },
];

// Mapa plano id -> padrões, para o Editor mostrar os valores atuais.
export const NODE_DEFAULTS: Record<string, { label: string; desc: string; img: string }> =
  Object.fromEntries(
    TIERS.flatMap((t) => t.nodes).map((n) => [n.id, { label: n.label, desc: n.desc ?? "", img: n.img }]),
  );

// Imagens grandes editáveis.
export const IMAGE_TARGETS: { id: string; label: string; img: string }[] = [
  { id: "capa", label: "Capa — foto de fundo", img: "/brand/capa-sala.jpg" },
  { id: "conceito-geral", label: "Conceito Central — geodo", img: "/media/mood-materia-r0-03.jpeg" },
  { id: "capa-materia", label: "Capa Matéria — grid", img: "/media/capa-modulacao.gif" },
  { id: "dobra", label: "Descrição Matéria — estratos", img: "/media/continuidade-conceito.png" },
  { id: "caminho1-racional", label: "Racional Matéria — módulo", img: "/media/mood-materia-r0-00.jpeg" },
  { id: "capa-luz", label: "Capa Luz — escoamento", img: "/media/capa-continuidade.gif" },
  { id: "possibilidade-descricao", label: "Descrição Luz — ripas", img: "/media/possibilidade-descricao.png" },
  { id: "possibilidade-racional", label: "Racional Luz — moiré", img: "/media/possibilidade-racional.png" },
  { id: "logo-1", label: "Logo — variação 01", img: "/brand/logo-1.svg" },
  { id: "logo-2", label: "Logo — variação 02", img: "/brand/logo-2.svg" },
  { id: "logo-3", label: "Logo — variação 03", img: "/brand/logo-3.svg" },
];

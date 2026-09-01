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
  /** Rótulo curto acima do título  -  "chapa", "plasma". */
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
        desc: "o solo como origem, matéria e fundamento  -  os pilares da fundação, aparentes na entrada",
        src: "briefing · slide 10",
      },
      {
        id: "nome-teras",
        label: "Teras",
        img: "/mapa/nome-teras.jpg",
        desc: "em grego: o prodígio, o sinal no céu, o monstro  -  o que assombra pela grandeza",
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
    trans: "O cliente definiu a categoria pela física  -  e disse a mesma coisa",
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
    concl: "A categoria já é sobre [mudar de estado]\n -  e sobre o ato de olhar.",
    trans: "O nome, a obra e a categoria dizem a mesma operação",
  },

  {
    stage: { no: "04", tt: "O conceito" },
    nodes: [],
    explain: [
      "Para receber o projeto, a obra escavou o subsolo do antigo Hospital Matarazzo. Sob as estruturas históricas, novas fundações foram executadas e reforçadas para que o edifício permanecesse de pé enquanto a terra era retirada.",
      "O LED ocupa hoje esse mesmo plano escavado. **Onde havia terra, hoje há luz**  -  e toda noite o público atravessa essa fundação para chegar até ela.",
      "A própria tela repete o percurso. Do quartzo vem o silício: extraído, purificado e cristalizado até virar a base dos circuitos que comandam a imagem. A luz nasce em outros semicondutores cristalinos, construídos camada por camada  -  quando a corrente os atravessa, eles emitem fótons.",
      "E então o processo se inverte. A matéria produziu luz; agora a luz age sobre a matéria. Um fóton é absorvido dentro do olho e uma molécula muda de forma  -  um dos primeiros eventos da visão, o que desencadeia o sinal que o cérebro transforma em percepção.",
    ],
    chain: ["Pedra", "Mineral", "Elemento", "Cristal", "Chip", "Imagem", "Luz"],
    loop: { ida: "Da matéria à luz", volta: "Da luz à matéria" },
    trans: "E o conceito já tem duas palavras  -  uma para cada caminho",
  },

  {
    stage: { no: "05", tt: "Os dois caminhos" },
    nodes: [
      {
        id: "caminho-materia",
        label: "01 · Matéria",
        sub: "chapa",
        img: "/mapa/caminho-materia.jpg",
        desc: "a identidade nasce do que ficou: o módulo de 1×1 m das chapas gradeadas, a emenda dos gabinetes, a marca vazada com luz atravessando por trás. o grid da chapa, o formato da tela de LED, a terra que ficou nos pilares  -  tudo o que é sólido, imutável, geométrico",
        src: "o caminho ligado à arquitetura da sala",
      },
      {
        id: "caminho-luz",
        label: "02 · Luz",
        sub: "plasma",
        img: "/mapa/caminho-luz.jpg",
        desc: "a identidade nasce do que entrou: a matéria escoa, entra por uma fresta e preenche as letras por dentro. a onda, o orgânico, o plasma, as artes de cada espetáculo  -  tudo o que muda a cada obra",
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
  { id: "capa", label: "Capa  -  foto de fundo", img: "/brand/capa-sala.jpg" },
  { id: "conceito-geral", label: "Conceito Central  -  geodo", img: "/media/mood-materia-r0-03.jpeg" },
  { id: "capa-materia", label: "Capa Matéria  -  grid", img: "/media/capa-modulacao.gif" },
  { id: "dobra", label: "Descrição Matéria  -  estratos", img: "/media/continuidade-conceito.png" },
  { id: "caminho1-racional", label: "Racional Matéria  -  módulo", img: "/media/mood-materia-r0-00.jpeg" },
  { id: "capa-luz", label: "Capa Luz  -  escoamento", img: "/media/capa-continuidade.gif" },
  { id: "possibilidade-descricao", label: "Descrição Luz  -  ripas", img: "/media/possibilidade-descricao.png" },
  { id: "possibilidade-racional", label: "Racional Luz  -  moiré", img: "/media/possibilidade-racional.png" },
  { id: "logo-1", label: "Logo  -  variação 01", img: "/brand/logo-1.svg" },
  { id: "logo-2", label: "Logo  -  variação 02", img: "/brand/logo-2.svg" },
  { id: "logo-3", label: "Logo  -  variação 03", img: "/brand/logo-3.svg" },
  { id: "entrega2-09", label: "Entrega 02  -  estudos de logo", img: "/brand/board-vazio.svg" },
  { id: "entrega2-10", label: "Entrega 02  -  logo 1", img: "/brand/board-vazio.svg" },
  { id: "entrega2-trio-v0", label: "Tratamentos v0  -  mídia na máscara", img: "/media/entrega2-capa.mp4" },
  { id: "entrega2-14", label: "Entrega 02  -  mockup logo 1", img: "/brand/board-vazio.svg" },
  { id: "entrega2-mockup1-a", label: "Mockup logo 1  -  peça 01", img: "/media/mockup-porta.jpg" },
  { id: "entrega2-mockup1-b", label: "Mockup logo 1  -  peça 02", img: "/media/mockup-bone.jpg" },
  { id: "entrega2-mockup1-c", label: "Mockup logo 1  -  peça 03", img: "/media/mockup-gradiente.mp4" },
  { id: "aplic-01", label: "Aplicações logo 3  -  01", img: "/media/aplicacoes/aplic-01.jpg" },
  { id: "aplic-02", label: "Aplicações logo 3  -  02", img: "/media/aplicacoes/aplic-02.jpg" },
  { id: "aplic-03", label: "Aplicações logo 3  -  03", img: "/media/aplicacoes/aplic-03.jpg" },
  { id: "aplic-04", label: "Aplicações logo 3  -  04", img: "/media/aplicacoes/aplic-04.jpg" },
  { id: "aplic-08", label: "Aplicações logo 3  -  08 (trocada)", img: "/media/aplicacoes/aplic-08.mp4" },
  { id: "entrega2-16", label: "Entrega 02  -  logo 2", img: "/brand/board-vazio.svg" },
  { id: "logo2-filme-a", label: "Logo 2  -  filme 01", img: "/media/logo2-filme-a.mp4" },
  { id: "logo2-filme-b", label: "Logo 2  -  filme 02", img: "/media/logo2-filme-b.mp4" },
  { id: "logo2-filme-c", label: "Logo 2  -  filme 03 (grande)", img: "/media/logo2-filme-c.mp4" },
  { id: "entrega2-trio-7x7", label: "Tratamentos 7x7  -  mídia na máscara", img: "/media/entrega2-capa.mp4" },
  { id: "entrega2-20", label: "Entrega 02  -  mockup logo 2", img: "/brand/board-vazio.svg" },
  { id: "entrega2-22", label: "Entrega 02  -  logo 3", img: "/brand/board-vazio.svg" },
  { id: "entrega2-trio-v2", label: "Tratamentos v2  -  mídia na máscara", img: "/media/entrega2-capa.mp4" },
  { id: "entrega2-28", label: "Entrega 02  -  logo 4", img: "/brand/board-vazio.svg" },
  { id: "entrega2-trio-v4", label: "Tratamentos v4  -  mídia na máscara", img: "/media/entrega2-capa.mp4" },
  { id: "entrega2-30", label: "Entrega 02  -  mockup logo 4", img: "/brand/board-vazio.svg" },
  { id: "var-01", label: "Variação  -  sem tagline", img: "/brand/variacoes/var-png-1.png" },
  { id: "var-02", label: "Variação  -  sem tagline alternativa", img: "/brand/variacoes/var-png-6.png" },
  { id: "var-03", label: "Variação  -  acento em ângulo com tagline", img: "/brand/variacoes/var-png-3.png" },
  { id: "var-04", label: "Variação  -  acento em ângulo invertida", img: "/brand/variacoes/var-png-2.png" },
  { id: "logo4-01", label: "Mockup logo 4  -  palavra", img: "/media/aplicacoes/logo4-01.mp4" },
  { id: "logo4-02", label: "Mockup logo 4  -  laje", img: "/media/aplicacoes/logo4-02.mp4" },
  { id: "logo4-03", label: "Mockup logo 4  -  invertida", img: "/media/aplicacoes/logo4-03.mp4" },
  { id: "logo4-04", label: "Mockup logo 4  -  degradê", img: "/media/aplicacoes/logo4-04.mp4" },
  { id: "logo4-05", label: "Mockup logo 4  -  minúscula", img: "/media/aplicacoes/logo4-05.mp4" },
  { id: "logo4-06", label: "Mockup logo 4  -  cadência", img: "/media/aplicacoes/logo4-06.mp4" },
  { id: "cartaz-01", label: "Cartaz 01", img: "/media/cartazes/cartaz-01.jpg" },
  { id: "cartaz-02", label: "Cartaz 02", img: "/media/cartazes/cartaz-02.jpg" },
  { id: "cartaz-03", label: "Cartaz 03", img: "/media/cartazes/cartaz-03.jpg" },
  { id: "cartaz-04", label: "Cartaz 04", img: "/media/cartazes/cartaz-04.jpg" },
  { id: "sala-01", label: "Sala em movimento  -  01", img: "/media/sala/sala-01.mp4" },
  { id: "sala-02", label: "Sala em movimento  -  02", img: "/media/sala/sala-02.mp4" },
  { id: "sala-03", label: "Sala em movimento  -  03", img: "/media/sala/sala-03.mp4" },
  { id: "sala-04", label: "Sala em movimento  -  04", img: "/media/sala/sala-04.mp4" },
  { id: "camiseta", label: "Camiseta na arara", img: "/media/cartazes/camiseta.jpg" },
  { id: "l2-01", label: "Mockup logo 2  -  feed evento 01", img: "/media/logo2/l2-01.mp4" },
  { id: "l2-02", label: "Mockup logo 2  -  feed evento 02", img: "/media/logo2/l2-02.mp4" },
  { id: "l2-03", label: "Mockup logo 2  -  reel do espetáculo", img: "/media/logo2/l2-03.mp4" },
  { id: "l2-04", label: "Mockup logo 2  -  quadrado do espetáculo", img: "/media/logo2/l2-04.mp4" },
  { id: "l2-05", label: "Mockup logo 2  -  feed espetáculo 48s", img: "/media/logo2/l2-05.mp4" },
  { id: "l2-06", label: "Mockup logo 2  -  feed espetáculo 12s", img: "/media/logo2/l2-06.mp4" },
  { id: "planta", label: "Planta baixa da sala", img: "/media/cartazes/planta.jpg" },
  { id: "prismas", label: "Prismas  -  filme", img: "/media/cartazes/prismas.mp4" },
  { id: "entrega2-26", label: "Entrega 02  -  mockup logo 3", img: "/brand/board-vazio.svg" },
];

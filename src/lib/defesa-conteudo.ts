// O documento de defesa da marca, em dados, separado do componente que o
// apresenta: mexer numa palavra é mexer aqui, e só aqui.
//
// Texto do arquivo do cliente, sem palavra trocada nem acrescentada. Duas
// mudanças: os travessões viraram hífen entre espaços, que é a pontuação do
// resto do deck; e os capítulos "A grade do logotipo" e "A marca" saíram a
// pedido  -  eles descreviam a construção da v1, que os boards de grade já
// mostram desenhada logo adiante.

export const TESE = {
  kicker: "Téra · a marca",
  titulo: "Matriz 1:1 e ponto de perspectiva.",
  corpo:
    "A sala é uma matriz de quadrados vista de um ponto só. A marca é essa matriz vista de frente.",
};

export type Capitulo = {
  titulo: string;
  frase: string;
  corpo: string[];
  legendas: string[];
};

export const CAPITULOS: Capitulo[] = [
  {
    titulo: "Onde ela está",
    frase: "Toda superfície da sala é uma grade de quadrados.",
    corpo: [
      "Paredes, teto e fundo são revestidos pela mesma chapa gradeada. Não é uma leitura nossa do espaço: é o acabamento construído. A tela de LED ocupa o fundo e continua a mesma grade  -  32 por 17 quadrados de 48 cm, sem sobra em nenhum dos dois lados.",
    ],
    legendas: [
      "A tela de fundo em 32 × 17 · o quadrado cheio, no canto, é um módulo de 48 cm",
    ],
  },
  {
    titulo: "Como ela é vista",
    frase: "A sala inteira converge para um ponto.",
    corpo: [
      "Teto, piso e as duas paredes laterais apontam para o mesmo lugar, e esse lugar é a tela. A sala é uma perspectiva de um ponto, e o ponto é a luz.",
    ],
    legendas: [
      "As quatro arestas e o ponto onde elas se encontram · ele cai dentro da tela",
    ],
  },
  {
    titulo: "O que a diagonal faz",
    frase: "Numa grade 1:1, o 45° é o que dá profundidade.",
    corpo: [
      "Numa matriz de quadrados vista em perspectiva, as ortogonais vão para o ponto de fuga  -  mas elas sozinhas não dizem onde cada fileira termina. Quem marca a profundidade é a diagonal a 45°: cada vez que ela cruza uma ortogonal, nasce a linha seguinte. É a construção clássica, e é a única operação que a grade não faz sozinha.",
    ],
    legendas: [
      "A diagonal em vermelho · cada cruzamento é uma profundidade",
      "O mesmo 45° na barra de topo do É · cheio, vão, cunha",
    ],
  },
  {
    titulo: "Aplicação",
    frase: "O formato muda. A matriz não.",
    corpo: [
      "Reduza qualquer peça à sua fração mais simples e você tem a grade, em quadrados inteiros. Margem de um quadrado, imagem sangrada, texto ancorado. As duas âncoras  -  o módulo no alto e o logotipo no rodapé  -  caem sobre a diagonal, que num formato 1:1 é o próprio 45°.",
      "A cor mora na imagem e nunca no tipo. E o alfabeto modular é só do logotipo: conteúdo se lê em grotesco normal, porque conteúdo se lê, não se decifra.",
      "O logotipo também é medido em módulos. Ele tem 31 de largura na grade dele; quando esse módulo é 1/32 do módulo da página, o logotipo inteiro ocupa exatamente uma coluna. Daí a escada, em potência de dois  -  e nada entre os degraus.",
    ],
    legendas: [
      "1, 2 e 4 módulos de largura · módulo da logo em 1/32, 1/16 e 1/8 do módulo da página",
    ],
  },
  {
    titulo: "O fecho",
    frase: "O quadrado dá a regra. A diagonal dá a exceção.",
    corpo: [
      "Não há uma terceira operação. Tudo o que a Téra desenha é matriz repetida e um corte a 45°  -  e é por isso que a marca volta para a parede sem precisar de ajuste: ela já é feita da mesma coisa que a sala.",
    ],
    legendas: [
      "A marca acesa na tela, no módulo de 12 cm · 3,72 m de largura em 15,36 · a tela é do espetáculo, não da assinatura",
    ],
  },
];

// Cada peça carrega a linha que o arquivo põe nela. Três repetem a mesma; o
// cartaz troca espetáculo por temporada. A repetição é do documento.
const ESPETACULO = "from matter to light · Espetáculo · 27.06.2027 · 18:35 · 240 min";
const TEMPORADA = "from matter to light · Temporada · junho  -  agosto de 2027";

export const FORMATOS = [
  { nome: "Feed", grade: "8 × 8 quadrados", px: "1080 × 1080", nota: "com a grade à mostra", linha: ESPETACULO },
  { nome: "Story", grade: "9 × 16 quadrados", px: "1080 × 1920", linha: ESPETACULO },
  { nome: "Cartaz", grade: "8 × 12 quadrados", px: "600 × 900", linha: TEMPORADA },
  { nome: "Web", grade: "8 × 5 quadrados", px: "1440 × 900", linha: ESPETACULO },
];

/** Onde a lista de formatos entra: dentro do capítulo "Aplicação". */
export const CAPITULO_DOS_FORMATOS = "Aplicação";

export const RODAPE =
  "Téra · matriz 1:1 e ponto de perspectiva · setembro de 2026";

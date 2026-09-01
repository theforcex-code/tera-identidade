// Malha do wordmark TÉRA 7x7  -  decalcada de LOGO-v1-7x7.svg, não digitada.
// 31 x 7 módulos: quatro letras de 7 colunas com avanço de 8 (uma coluna de vão
// entre elas). É a mesma medida da parede da sala: 32 x 17 módulos de 480 mm,
// 32 dividido por 4 letras dá a quadra de 8, um dos oito é o vão.

export const COLUNAS = 31;
export const LINHAS = 7;

/** Todos os módulos de tinta, incluindo o último da barra do É  -  é ele que
 *  vira cunha quando o acento está "no fim". */
export const MODULOS: [number, number][] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [3, 1],
  [3, 2],
  [3, 3],
  [3, 4],
  [3, 5],
  [3, 6],
  [4, 0],
  [5, 0],
  [6, 0],
  [8, 0],
  [8, 3],
  [8, 6],
  [9, 0],
  [9, 3],
  [9, 6],
  [10, 0],
  [10, 3],
  [10, 6],
  [11, 0],
  [11, 3],
  [11, 6],
  [12, 0],
  [12, 3],
  [12, 6],
  [13, 0],
  [13, 3],
  [13, 6],
  [14, 0],
  [14, 3],
  [14, 6],
  [16, 0],
  [16, 1],
  [16, 2],
  [16, 3],
  [16, 4],
  [16, 5],
  [16, 6],
  [17, 0],
  [18, 0],
  [19, 0],
  [20, 0],
  [21, 0],
  [22, 0],
  [22, 1],
  [24, 0],
  [24, 1],
  [24, 2],
  [24, 3],
  [24, 4],
  [24, 5],
  [24, 6],
  [25, 0],
  [25, 3],
  [26, 0],
  [26, 3],
  [27, 0],
  [27, 3],
  [28, 0],
  [28, 3],
  [29, 0],
  [29, 3],
  [30, 0],
  [30, 1],
  [30, 2],
  [30, 3],
  [30, 4],
  [30, 5],
  [30, 6],
];

/** Haste esquerda do É. Entra só quando a letra é "preenchida"; sem ela o É
 *  são três barras soltas, que é como o arquivo original desenha. */
export const HASTE_E: [number, number][] = [
  [8, 1],
  [8, 2],
  [8, 4],
  [8, 5],
];

/** Onde a cunha de 45° pode morar. Sempre na barra de topo do É (linha 0):
 *  no fim da barra, um módulo recuado, ou no eixo da letra. */
export const ACENTOS: Record<string, [number, number] | null> = {
  fim: [14, 0],
  recuado: [13, 0],
  eixo: [11, 0],
  nenhum: null,
};

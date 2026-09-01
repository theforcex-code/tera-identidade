"use client";

import { useState } from "react";
import { COLUNAS, LINHAS, MODULOS, HASTE_E, ACENTOS } from "@/lib/logo-7x7";

/* ------------------------------------------------------------------ *
 * Ferramenta das variáveis do wordmark  -  versão de apresentação.
 *
 * A malha vem decalcada do SVG (src/lib/logo-7x7.ts), não digitada. O que
 * a ferramenta faz é trocar COMO cada módulo é pintado, sem nunca mexer em
 * ONDE ele está: a palavra é sempre os mesmos 31 x 7 módulos.
 *
 * O acento segue a mesma regra do documento: não é um módulo a mais, é um
 * módulo da barra de topo do É trocando o cheio por uma cunha a 45°. Por
 * isso ele é a MESMA forma dos outros, recortada  -  quando o módulo vira
 * ponto, o acento vira ponto cortado.
 *
 * Fora daqui ficaram os controles de exportação do arquivo original
 * (módulo em px, salvar SVG, copiar código): num board de apresentação eles
 * são ruído  -  o assunto aqui é a variável, não o arquivo.
 * ------------------------------------------------------------------ */

const LABEL = "font-univers uppercase tracking-[0.28em]";

const M = 100; // lado do módulo em unidades do viewBox

type Preenchimento = "cheio" | "dez" | "pontos" | "faixaEsq" | "faixaTopo";
type Acento = keyof typeof ACENTOS;
type LetraE = "barras" | "preenchido";
type Fundo = "transparente" | "solido";

// Tinta clara e fixa: o deck é preto e a marca é branca nele. Escolher tinta
// era controle de arquivo, não de forma  -  saiu junto com os de exportação.
const TINTA = "#f7f7f5";
const CHAPA = "#141518";

/** A forma de um módulo. Mesma caixa de 100 x 100 em todos os casos: o que
 *  muda é quanto dela recebe tinta e de que lado ela encosta. */
function Modulo({ x, y, tipo }: { x: number; y: number; tipo: Preenchimento }) {
  const px = x * M;
  const py = y * M;
  switch (tipo) {
    case "cheio":
      return <rect x={px} y={py} width={M} height={M} />;
    // 10% da área do módulo, centrado: lado = raiz de 0,10 ≈ 31,6%.
    case "dez": {
      const l = M * 0.3162;
      const o = (M - l) / 2;
      return <rect x={px + o} y={py + o} width={l} height={l} />;
    }
    case "pontos":
      return <circle cx={px + M / 2} cy={py + M / 2} r={M * 0.35} />;
    case "faixaEsq":
      return <rect x={px} y={py} width={M * 0.25} height={M} />;
    case "faixaTopo":
      return <rect x={px} y={py} width={M} height={M * 0.25} />;
  }
}

export function LogoLab() {
  const [preenchimento, setPreenchimento] = useState<Preenchimento>("cheio");
  const [acento, setAcento] = useState<Acento>("fim");
  const [letraE, setLetraE] = useState<LetraE>("barras");
  const [fundo, setFundo] = useState<Fundo>("transparente");

  const celulaAcento = ACENTOS[acento];
  const modulos = letraE === "preenchido" ? [...MODULOS, ...HASTE_E] : MODULOS;
  const cor = TINTA;

  return (
    <div className="w-full">
      {/* ---------------- a marca ---------------- */}
      <div className="mx-auto w-full max-w-[1180px]">
        <svg
          viewBox={`0 0 ${COLUNAS * M} ${LINHAS * M}`}
          className="h-auto w-full"
          role="img"
          aria-label={`TÉRA  -  preenchimento ${preenchimento}, acento ${acento}, É ${letraE}, fundo ${fundo}`}
        >
          <defs>
            {/* A cunha: metade do módulo, diagonal subindo para a direita.
                É um clip, não uma forma própria  -  assim o acento herda o
                preenchimento escolhido em vez de virar exceção. */}
            {celulaAcento && (
              <clipPath id="cunha-acento">
                <polygon
                  points={`${celulaAcento[0] * M},${celulaAcento[1] * M} ${
                    (celulaAcento[0] + 1) * M
                  },${celulaAcento[1] * M} ${celulaAcento[0] * M},${
                    (celulaAcento[1] + 1) * M
                  }`}
                />
              </clipPath>
            )}
          </defs>

          {fundo === "solido" ? (
            <rect
              x={0}
              y={0}
              width={COLUNAS * M}
              height={LINHAS * M}
              fill={CHAPA}
            />
          ) : (
            /* Sem fundo o arquivo sai transparente. Na tela isso é a malha
               aparecendo: é ela que mostra que não há chapa por baixo. */
            <g fill="none" stroke="#f7f7f5" strokeOpacity={0.1} strokeWidth={2}>
              {Array.from({ length: COLUNAS }, (_, c) =>
                Array.from({ length: LINHAS }, (_, r) => (
                  <rect
                    key={`${c}-${r}`}
                    x={c * M}
                    y={r * M}
                    width={M}
                    height={M}
                  />
                )),
              )}
            </g>
          )}

          <g fill={cor}>
            {modulos.map(([c, r]) => {
              const eAcento =
                celulaAcento && celulaAcento[0] === c && celulaAcento[1] === r;
              return (
                <g key={`${c}-${r}`} clipPath={eAcento ? "url(#cunha-acento)" : undefined}>
                  <Modulo x={c} y={r} tipo={preenchimento} />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* ---------------- os controles ---------------- */}
      <div className="mx-auto mt-16 flex max-w-[1180px] flex-wrap justify-center gap-x-12 gap-y-9 border-t border-white/10 pt-12">
        <Grupo titulo="O preenchimento">
          <Opcao ativo={preenchimento === "cheio"} onClick={() => setPreenchimento("cheio")}>100%</Opcao>
          <Opcao ativo={preenchimento === "dez"} onClick={() => setPreenchimento("dez")}>10%</Opcao>
          <Opcao ativo={preenchimento === "pontos"} onClick={() => setPreenchimento("pontos")}>Pontos</Opcao>
          <Opcao ativo={preenchimento === "faixaEsq"} onClick={() => setPreenchimento("faixaEsq")}>Faixa esquerda</Opcao>
          <Opcao ativo={preenchimento === "faixaTopo"} onClick={() => setPreenchimento("faixaTopo")}>Faixa topo</Opcao>
        </Grupo>

        <Grupo titulo="O acento">
          <Opcao ativo={acento === "fim"} onClick={() => setAcento("fim")}>No fim</Opcao>
          <Opcao ativo={acento === "recuado"} onClick={() => setAcento("recuado")}>Recuado</Opcao>
          <Opcao ativo={acento === "eixo"} onClick={() => setAcento("eixo")}>No eixo</Opcao>
          <Opcao ativo={acento === "nenhum"} onClick={() => setAcento("nenhum")}>Nenhum</Opcao>
        </Grupo>

        <Grupo titulo="O É">
          <Opcao ativo={letraE === "barras"} onClick={() => setLetraE("barras")}>Três barras</Opcao>
          <Opcao ativo={letraE === "preenchido"} onClick={() => setLetraE("preenchido")}>Preenchido</Opcao>
        </Grupo>

        <Grupo titulo="O fundo">
          <Opcao ativo={fundo === "transparente"} onClick={() => setFundo("transparente")}>Transparente</Opcao>
          <Opcao ativo={fundo === "solido"} onClick={() => setFundo("solido")}>Com fundo</Opcao>
        </Grupo>
      </div>

      {/* A medida é o argumento: a palavra não foi encaixada na parede, ela
          saiu dela. 31 x 480 mm = 14,88 m; 7 x 480 mm = 3,36 m. */}
      <p className={`mt-12 text-center ${LABEL} text-[10px] text-branco/30`}>
        Malha 31 × 7 módulos · na parede da sala 14,88 × 3,36 m
      </p>
    </div>
  );
}

function Grupo({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className={`${LABEL} text-[10px] text-branco/35`}>{titulo}</span>
      <div className="flex flex-wrap justify-center gap-2">{children}</div>
    </div>
  );
}

// Botão sem canto arredondado e sem preenchimento: no deck o que marca estado
// é o fio, não a chapa.
function Opcao({
  ativo,
  onClick,
  children,
}: {
  ativo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={ativo}
      className={`${LABEL} border px-4 py-2.5 text-[10px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none ${
        ativo
          ? "border-white/45 text-branco"
          : "border-white/10 text-branco/40 hover:border-white/25 hover:text-branco/75"
      }`}
    >
      {children}
    </button>
  );
}

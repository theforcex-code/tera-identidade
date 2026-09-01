"use client";

import { SHELL, SECTION, LABEL } from "@/lib/deck";
import {
  TESE,
  CAPITULOS,
  FORMATOS,
  CAPITULO_DOS_FORMATOS,
  RODAPE,
  type Capitulo,
} from "@/lib/defesa-conteudo";

/* ------------------------------------------------------------------ *
 * A defesa da marca. Todo o texto vem de src/lib/defesa-conteudo.ts.
 *
 * A organização sai da forma do próprio documento: todo capítulo tem uma
 * frase que afirma, um corpo que explica e legendas que medem. São dois
 * tipos de informação diferentes e antes estavam empilhados no mesmo fio,
 * o que fazia as medidas lerem como continuação do argumento  -  e uma
 * legenda de figura, sem a figura, lê como frase solta.
 *
 * Então o board tem duas trilhas: à esquerda o argumento, à direita as
 * medidas, separadas por fio. Dá para ler só as frases e ter a tese
 * inteira, ou só a coluna da direita e ter todos os números. A ordem dos
 * capítulos é a do arquivo.
 *
 * O que saiu foi enfeite meu, não matéria do documento: a numeração 01-07
 * que eu tinha posto, o rótulo "Defesa" duplicando o título, e a frase que
 * eu havia escrito para apresentar a linha das peças. As medidas saíram do
 * caixa-alta com entreletra larga  -  aquilo é medida para rótulo curto, e
 * empurrado numa sentença de noventa caracteres vira decifração.
 * ------------------------------------------------------------------ */

export function Defesa() {
  return (
    <section className={SECTION}>
      <div className={SHELL}>
        <header className="max-w-3xl">
          <p className={`${LABEL} text-[11px] text-branco/45`}>{TESE.kicker}</p>
          <h2 className="mt-6 font-univers text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
            {TESE.titulo}
          </h2>
          <p className="mt-6 font-univers text-lg leading-relaxed text-branco/60">
            {TESE.corpo}
          </p>
        </header>

        <div className="mt-24 border-t border-white/10">
          {CAPITULOS.map((c) => (
            <Bloco key={c.titulo} capitulo={c} />
          ))}
        </div>

        <p className={`mt-16 ${LABEL} text-[10px] text-branco/30`}>{RODAPE}</p>
      </div>
    </section>
  );
}

function Bloco({ capitulo }: { capitulo: Capitulo }) {
  const temFormatos = capitulo.titulo === CAPITULO_DOS_FORMATOS;
  return (
    <div className="grid gap-x-16 gap-y-8 border-b border-white/10 py-14 md:grid-cols-12">
      {/* ---- o argumento ---- */}
      <div className="md:col-span-7">
        <p className={`${LABEL} text-[11px] text-branco/45`}>
          {capitulo.titulo}
        </p>
        <p className="mt-6 font-forma text-2xl font-light leading-[1.15] md:text-4xl">
          {capitulo.frase}
        </p>
        {capitulo.corpo.map((t) => (
          <p
            key={t.slice(0, 24)}
            className="mt-6 max-w-[62ch] font-univers text-[15px] leading-relaxed text-branco/60"
          >
            {t}
          </p>
        ))}
      </div>

      {/* ---- as medidas. Fio à esquerda no desktop, acima no telefone: é o
              que diz que esta coluna é nota de margem, não continuação. ---- */}
      <div className="border-t border-white/10 pt-6 md:col-span-5 md:border-l md:border-t-0 md:pl-8 md:pt-1">
        {temFormatos && <Formatos />}
        {capitulo.legendas.map((l) => (
          <p
            key={l.slice(0, 24)}
            className="font-univers text-[13px] leading-relaxed text-branco/40 [&+p]:mt-4"
          >
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}

// Os quatro formatos. Nome à esquerda, grade e pixels alinhados à direita,
// fio só entre as linhas: é tabela de medida, não caixa de produto.
function Formatos() {
  return (
    <>
      <dl className="mb-8 divide-y divide-white/10 border-y border-white/10">
        {FORMATOS.map((f) => (
          <div key={f.nome} className="flex gap-4 py-3">
            <dt className="w-20 shrink-0 font-univers text-[15px] leading-relaxed text-branco/75">
              {f.nome}
            </dt>
            <dd className="font-univers text-[13px] leading-relaxed text-branco/40">
              {f.grade}
              <span className="mx-2 text-branco/20">·</span>
              {f.px}
              {f.nota && (
                <>
                  <span className="mx-2 text-branco/20">·</span>
                  {f.nota}
                </>
              )}
              <span className="mt-1 block text-branco/30">{f.linha}</span>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

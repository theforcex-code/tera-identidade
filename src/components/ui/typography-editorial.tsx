"use client";

import { AnimatedText } from "@/components/ui/animated-text";
import { TextRoll } from "@/components/ui/text-roll";

const WEIGHTS = ["Light", "Regular", "Medium", "Bold"] as const;
const LETTER_DETAILS = [
  { character: "a", label: "curvas" },
  { character: "e", label: "contraformas" },
  { character: "o", label: "aberturas" },
  { character: "R T", label: "proporções" },
] as const;

export function TypographyEditorial() {
  return (
    <>
      <section className="type-editorial-panel type-editorial-specimen" aria-labelledby="type-specimen-title">
        <header className="type-editorial-meta">
          <p>04 · Continuidade / Tipografia</p>
          <p>01 / 03</p>
        </header>

        <div className="type-editorial-specimen__columns" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>

        <div className="type-editorial-specimen__title-block">
          <h2 id="type-specimen-title">Neue<br />Montreal</h2>
          <div className="type-editorial-specimen__origin">
            <p>PP Neue Montreal</p>
            <p>2018</p>
            <p>Pangram Pangram</p>
            <p>Grotesca</p>
          </div>
        </div>

        <div className="type-editorial-specimen__weights">
          {WEIGHTS.map((weight) => <span key={weight}>{weight}</span>)}
        </div>

        <div className="type-editorial-specimen__letter-object" aria-hidden="true">a</div>

        <div className="type-editorial-specimen__details" aria-label="Estudo de caracteres">
          {LETTER_DETAILS.map((item) => (
            <div key={item.label}>
              <span>{item.character}</span>
              <small>{item.label}</small>
            </div>
          ))}
        </div>

        <p className="type-editorial-specimen__statement">Construção simples, curvas controladas e contraformas abertas.</p>
        <p className="type-editorial-specimen__charset">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789</p>

        <div className="type-editorial-specimen__motion" aria-label="Neue Montreal em movimento">
          <TextRoll text="Neue Montreal" />
          <AnimatedText text="TÉRA" duration={4.2} delayMultiplier={0.18} />
        </div>
      </section>

      <section className="type-editorial-panel type-editorial-family" aria-labelledby="type-family-title">
        <header className="type-editorial-meta">
          <p>04 · Continuidade / Sistema</p>
          <p>02 / 03</p>
        </header>

        <div className="type-editorial-family__voice">
          <p className="type-editorial-label">Neue Montreal / voz</p>
          <h2 id="type-family-title">TÉRA</h2>
          <p>Títulos<br />Nomes<br />Mensagens<br />Comunicação principal</p>
        </div>

        <div className="type-editorial-family__information">
          <p className="type-editorial-label">Neue Montreal Mono / informação</p>
          <p className="type-editorial-family__mono-word">T É R A</p>
          <div className="type-editorial-family__proof" aria-label="Demonstração de largura monoespaçada">
            <span>MMMM</span>
            <span>iiii</span>
            <span>0000</span>
          </div>
          <p>Datas<br />Horários<br />Créditos<br />Informações</p>
        </div>

        <div className="type-editorial-family__notes">
          <p>Na versão Mono, todos os caracteres ocupam a mesma largura horizontal.</p>
          <p>A mesma linguagem. Duas funções dentro do sistema.</p>
        </div>
      </section>

      <section className="type-editorial-panel type-editorial-space" aria-labelledby="type-space-title">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/capa-sala.jpg" alt="Sala da TÉRA com estrutura arquitetônica e instalação luminosa" className="type-editorial-space__image" />
        <div className="type-editorial-space__contrast" aria-hidden="true" />
        <header className="type-editorial-meta type-editorial-meta--overlay">
          <p>04 · Continuidade / Aplicação</p>
          <p>03 / 03</p>
        </header>
        <div className="type-editorial-space__rule type-editorial-space__rule--vertical" aria-hidden="true" />
        <div className="type-editorial-space__rule type-editorial-space__rule--horizontal" aria-hidden="true" />
        <div className="type-editorial-space__application">
          <h2 id="type-space-title">TÉRA</h2>
          <p className="type-editorial-space__artist">NOME DO ARTISTA</p>
          <p className="type-editorial-space__date">24.08.26 / 22:00</p>
          <p className="type-editorial-space__format">EXPERIÊNCIA IMERSIVA</p>
        </div>
        <p className="type-editorial-space__caption">A identidade nasce da relação entre letra e espaço.</p>
        <figure className="type-editorial-space__motion">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/continuidade-tipografia-motion.gif" alt="Tipografia Neue Montreal se expandindo e contraindo" />
        </figure>
      </section>
    </>
  );
}

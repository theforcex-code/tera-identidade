const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789.,:;!?@#%&/()[]{}+-=*";

type Weight = {
  name: string;
  weight: number;
};

const FAMILY_WEIGHTS: Weight[] = [
  { name: "Light", weight: 300 },
  { name: "Regular", weight: 400 },
  { name: "Bold", weight: 700 },
];

export function TypographyEditorial() {
  return (
    <>
      <SpecimenBoard
        title="Futura PT"
        metadata={["ParaType", "Geometria", "Títulos e intervenções", "Tipografia principal"]}
        weights={FAMILY_WEIGHTS}
        fontClass="font-futura"
        boardLabel="Futura PT - tipografia principal da Matéria"
      />
      <SpecimenBoard
        title="Inter"
        metadata={["Rasmus Andersson", "2016", "Google Fonts", "Tipografia secundária"]}
        weights={FAMILY_WEIGHTS}
        fontClass="font-inter"
        boardLabel="Inter - tipografia secundária da Matéria"
      />
    </>
  );
}

export function TypographyLuzEditorial() {
  return (
    <>
      <SpecimenBoard
        title="PP Neue Montreal"
        metadata={["Pangram Pangram", "Mat Desjardins", "2018", "Tipografia principal"]}
        weights={FAMILY_WEIGHTS}
        fontClass="font-neue-montreal"
        boardLabel="PP Neue Montreal - tipografia principal da Luz"
      />
      <SpecimenBoard
        title="PP Neue Montreal Mono"
        metadata={["Pangram Pangram", "Largura fixa", "Dados e informação", "Tipografia secundária"]}
        weights={FAMILY_WEIGHTS}
        fontClass="font-neue-montreal-mono"
        boardLabel="PP Neue Montreal Mono - tipografia secundária da Luz"
        compactTitle
      />
    </>
  );
}

function SpecimenBoard({
  title,
  metadata,
  weights,
  fontClass,
  boardLabel,
  compactTitle = false,
}: {
  title: string;
  metadata: string[];
  weights: Weight[];
  fontClass: string;
  boardLabel: string;
  compactTitle?: boolean;
}) {
  return (
    <section
      className={`type-specimen-board ${compactTitle ? "type-specimen-board--compact" : ""}`}
      aria-label={boardLabel}
    >
      <header className="type-specimen-board__head">
        <h2 className={fontClass}>{title}</h2>
        <div className={`type-specimen-board__metadata ${fontClass}`}>
          {metadata.map((item) => <p key={item}>{item}</p>)}
        </div>
      </header>

      <div className="type-specimen-board__weights">
        {weights.map((weight) => (
          <article key={weight.name} className="type-specimen-board__weight">
            <h3 className={fontClass} style={{ fontWeight: weight.weight }}>{weight.name}</h3>
            <div className={`${fontClass} type-specimen-board__charset`} style={{ fontWeight: weight.weight }}>
              <p>{ALPHABET}</p>
              <p>{LOWERCASE}</p>
              <p>{NUMBERS}</p>
            </div>
            <p className={`${fontClass} type-specimen-board__sample`} style={{ fontWeight: weight.weight }}>
              Aa
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

const COLORS = [
  { name: "Branco", hex: "#F5F4F0", rgb: "245 / 244 / 240", cmyk: "0 / 0 / 2 / 4", text: "text-preto", role: "Base", weight: "palette-column--base" },
  { name: "Preto", hex: "#11110F", rgb: "17 / 17 / 15", cmyk: "0 / 0 / 12 / 93", text: "text-branco", role: "Base", weight: "palette-column--base" },
  { name: "Rosa", hex: "#EE2F58", rgb: "238 / 47 / 88", cmyk: "0 / 80 / 63 / 7", text: "text-branco", role: "Acento", weight: "palette-column--accent" },
  { name: "Ciano", hex: "#46A2B7", rgb: "70 / 162 / 183", cmyk: "62 / 12 / 0 / 28", text: "text-branco", role: "Acento", weight: "palette-column--accent" },
  { name: "Amarelo", hex: "#FFAE0D", rgb: "255 / 174 / 13", cmyk: "0 / 32 / 95 / 0", text: "text-preto", role: "Acento", weight: "palette-column--accent" },
  { name: "Vermelho", hex: "#F93406", rgb: "249 / 52 / 6", cmyk: "0 / 79 / 98 / 2", text: "text-branco", role: "Acento", weight: "palette-column--accent" },
] as const;

const GRADIENT = "linear-gradient(180deg, #EE2F58 0%, #46A2B7 38%, #FFAE0D 72%, #F93406 100%)";

export function VibracaoPaletteBoard() {
  return (
    <section className="palette-screen" aria-label="Paleta Vibração da Matéria">
      <div className="palette-board palette-board--screen">
        {COLORS.slice(0, 2).map((color, index) => (
          <PaletteColumn key={color.name} color={color} index={index} />
        ))}
        {COLORS.slice(2).map((color, index) => (
          <PaletteColumn key={color.name} color={color} index={index + 2} />
        ))}
        <article
          className="palette-column palette-column--accent palette-column--gradient relative flex min-w-0 flex-col justify-between p-5 sm:p-7 md:p-10 text-branco"
          style={{ background: GRADIENT }}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="font-univers text-[10px] uppercase tracking-[0.28em] opacity-65">07</span>
            <span className="font-univers text-[9px] uppercase tracking-[0.2em] opacity-65">Gradiente</span>
          </div>
          <h3 className="palette-column__name font-neue-montreal">Luz em movimento</h3>
          <div className="palette-column__details font-univers opacity-70">Rosa · Ciano · Amarelo · Vermelho</div>
        </article>
      </div>
    </section>
  );
}

function PaletteColumn({
  color,
  index,
}: {
  color: (typeof COLORS)[number];
  index: number;
}) {
  return (
    <article
      className={`palette-column ${color.weight} relative flex min-w-0 flex-col justify-between p-5 sm:p-7 md:p-10 ${color.text}`}
      style={{ background: color.hex }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-univers text-[10px] uppercase tracking-[0.28em] opacity-65">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-univers text-[9px] uppercase tracking-[0.2em] opacity-65">
          {color.role}
        </span>
      </div>

      <h3 className="palette-column__name font-neue-montreal">{color.name}</h3>

      <div className="palette-column__details space-y-1 font-univers opacity-70">
        <p>RGB {color.rgb}</p>
        <p>CMYK {color.cmyk}</p>
      </div>
    </article>
  );
}

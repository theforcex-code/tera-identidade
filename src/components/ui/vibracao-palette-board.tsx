const COLORS = [
  { name: "Branco", hex: "#F5F4F0", rgb: "245 / 244 / 240", cmyk: "0 / 0 / 2 / 4", text: "text-preto" },
  { name: "Preto", hex: "#11110F", rgb: "17 / 17 / 15", cmyk: "0 / 0 / 12 / 93", text: "text-branco" },
  { name: "Rosa", hex: "#EE2F58", rgb: "238 / 47 / 88", cmyk: "0 / 80 / 63 / 7", text: "text-branco" },
  { name: "Ciano", hex: "#46A2B7", rgb: "70 / 162 / 183", cmyk: "62 / 12 / 0 / 28", text: "text-branco" },
  { name: "Âmbar", hex: "#FFAE0D", rgb: "255 / 174 / 13", cmyk: "0 / 32 / 95 / 0", text: "text-preto" },
  { name: "Óxido", hex: "#F93406", rgb: "249 / 52 / 6", cmyk: "0 / 79 / 98 / 2", text: "text-branco" },
] as const;

export function VibracaoPaletteBoard() {
  return (
    <div className="mt-20 overflow-x-auto pb-2 md:mt-28">
      <div className="palette-board mx-auto min-w-[980px] overflow-hidden rounded-2xl bg-preto ring-1 ring-white/10">
        {COLORS.map((color, index) => (
          <article
            key={color.name}
            className={`palette-column group relative flex min-w-0 flex-1 flex-col justify-between p-6 ${color.text} ${
              index === 1 ? "ring-1 ring-inset ring-white/45" : ""
            }`}
            style={{ background: color.hex }}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-univers text-[10px] uppercase tracking-[0.28em] opacity-65">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="my-auto pr-4">
              <h3 className="font-neue-montreal text-2xl font-bold leading-[0.98] tracking-tight md:text-3xl">
                {color.name}
              </h3>
            </div>

            <div className="space-y-1.5 font-univers text-[10px] leading-snug opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-70">
              <p>HEX {color.hex}</p>
              <p>RGB {color.rgb}</p>
              <p>CMYK {color.cmyk}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

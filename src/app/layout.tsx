import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/* ------------------------------------------------------------------
   FONTES — ORIGINAIS LICENCIADAS (public/fonts)
   Suisse Int'l        -> SuisseIntl-Regular        (--font-suisse)
   Suisse Int'l Mono   -> Suisse-Intl-Mono          (--font-suisse-mono)
   Monument Extended   -> Regular + Bold            (--font-monument)
   ABC Favorit         -> Bold (único peso fornecido)(--font-favorit)
------------------------------------------------------------------- */

const suisse = localFont({
  variable: "--font-suisse",
  display: "swap",
  src: [
    { path: "../../public/fonts/SuisseIntl-Regular.ttf", weight: "400", style: "normal" },
  ],
});

const suisseMono = localFont({
  variable: "--font-suisse-mono",
  display: "swap",
  src: [
    { path: "../../public/fonts/Suisse-Intl-Mono.ttf", weight: "400", style: "normal" },
  ],
});

const monument = localFont({
  variable: "--font-monument",
  display: "swap",
  src: [
    { path: "../../public/fonts/monument-extended-regular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/monument-extended-bold.ttf", weight: "700", style: "normal" },
  ],
});

const favorit = localFont({
  variable: "--font-favorit",
  display: "swap",
  src: [
    { path: "../../public/fonts/ABCFavorit-Bold.otf", weight: "700", style: "normal" },
  ],
});

// MuseoModerno — primária da Dobra (variável: Thin → Black)
const museo = localFont({
  variable: "--font-museo",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/MuseoModerno-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "TÉRA — Identidade Visual",
  description:
    "Espaço de realidade expandida em 32K, no subsolo da Cidade Matarazzo. Diretrizes de identidade visual — Dobra e Quebra.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${suisse.variable} ${suisseMono.variable} ${monument.variable} ${favorit.variable} ${museo.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-preto text-branco font-suisse">
        {children}
      </body>
    </html>
  );
}

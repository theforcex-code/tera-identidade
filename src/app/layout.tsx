import type { Metadata } from "next";
import localFont from "next/font/local";
import { promises as fs } from "fs";
import path from "path";
import "./globals.css";
import { ContentProvider } from "@/components/content-provider";
import { Editor } from "@/components/editor";
import { EMPTY_CONTENT, type Content } from "@/lib/content";

async function readContent(): Promise<Content> {
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "data", "content.json"),
      "utf-8",
    );
    const p = JSON.parse(raw);
    return { mindmap: p.mindmap ?? {}, images: p.images ?? {} };
  } catch {
    return EMPTY_CONTENT;
  }
}

/* ------------------------------------------------------------------
   FONTES  -  SISTEMA FINAL: Univers × Forma DJR × Futura (public/fonts)
   Univers      -> estrutura comum aos dois caminhos     (--font-univers)
                   Light/Regular/Bold + Condensed         (--font-univers-cn)
   Forma DJR    -> secundária da DOBRA (variável wght/wdth)(--font-forma)
   Futura PT    -> secundária da QUEBRA (Light → Bold)    (--font-futura)
------------------------------------------------------------------- */

const univers = localFont({
  variable: "--font-univers",
  display: "swap",
  src: [
    { path: "../../public/fonts/UniversLight.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/UniversRegular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/UniversBold.ttf", weight: "700", style: "normal" },
  ],
});

// Univers Condensed  -  variação de largura dentro do mesmo sistema.
const universCn = localFont({
  variable: "--font-univers-cn",
  display: "swap",
  src: [
    { path: "../../public/fonts/UniversCnRg.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/UniversCnBold.ttf", weight: "700", style: "normal" },
  ],
});

// Forma DJR Display  -  variável (optical size, slant, width, weight).
const forma = localFont({
  variable: "--font-forma",
  display: "swap",
  src: [
    { path: "../../public/fonts/FormaDJRVariable.ttf", weight: "100 900", style: "normal" },
  ],
});

// Neue Montreal  -  tipografia primária do Caminho 01 (Continuidade).
const neueMontreal = localFont({
  variable: "--font-neue-montreal",
  display: "swap",
  src: [
    { path: "../../public/fonts/NeueMontrealLight.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/NeueMontrealRegular.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/NeueMontrealMedium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/NeueMontrealBold.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/NeueMontrealBoldItalic.otf", weight: "700", style: "italic" },
  ],
});

// Roboto Flex permanece disponível como ativo histórico da apresentação.
const robotoFlex = localFont({
  variable: "--font-roboto-flex",
  display: "swap",
  src: [
    { path: "../../public/fonts/RobotoFlex.woff2", weight: "100 1000", style: "normal" },
  ],
});

// PP Neue Montreal Mono  -  secundária do Caminho 01, para legendas e dados técnicos.
const neueMontrealMono = localFont({
  variable: "--font-neue-montreal-mono",
  display: "swap",
  src: [
    { path: "../../public/fonts/PPNeueMontrealMono-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/PPNeueMontrealMono-Regular-Verified.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/PPNeueMontrealMono-Bold-Verified.ttf", weight: "700", style: "normal" },
  ],
});

// Inter  -  tipografia do Caminho 02 (Possibilidade): cortes roman dedicados.
const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "../../public/fonts/Inter-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Inter-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Inter-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Inter-Italic.woff2", weight: "100 900", style: "italic" },
  ],
});

// Futura PT  -  geométrica; cortes Light → Bold.
const futura = localFont({
  variable: "--font-futura",
  display: "swap",
  src: [
    { path: "../../public/fonts/FuturaPT-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/FuturaPT-Book.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/FuturaPT-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/FuturaPT-Demi.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/FuturaPT-Bold.ttf", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "TÉRA  -  Identidade Visual",
  description:
    "Espaço de realidade expandida em 32K, no subsolo da Cidade Matarazzo. Diretrizes de identidade visual  -  Dobra e Ruptura.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await readContent();
  return (
    <html
      lang="pt-BR"
      className={`${univers.variable} ${universCn.variable} ${forma.variable} ${neueMontreal.variable} ${neueMontrealMono.variable} ${robotoFlex.variable} ${inter.variable} ${futura.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-preto text-branco font-univers">
        <ContentProvider initial={content}>
          {children}
          <Editor />
        </ContentProvider>
      </body>
    </html>
  );
}

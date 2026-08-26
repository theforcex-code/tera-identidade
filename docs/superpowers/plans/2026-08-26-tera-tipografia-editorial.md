# TÉRA Typography Editorial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current fragmented Continuidade typography chapter with three full-screen, specimen-led editorial panels that establish PP Neue Montreal and PP Neue Montreal Mono as the TÉRA system, while preserving every existing typography motion asset.

**Architecture:** Create `TypographyEditorial`, a single client component that owns the three semantic panels and imports the existing `TextRoll` and `AnimatedText` motions rather than recreating them. Replace only the current Caminho 01 typography block in `page.tsx`, then add a prefixed CSS system that uses functional dividers and responsive editorial columns.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4 utility classes, global CSS, Motion React through the existing `TextRoll` component.

**Spec:** `docs/superpowers/specs/2026-08-26-tera-tipografia-editorial-design.md`

## Global Constraints

- Work exclusively in the current Caminho 01 (Continuidade) typography area; do not change palettes, moodboards, logo section, or Caminho 02.
- Preserve `TextRoll`, `AnimatedText`, and `public/media/continuidade-tipografia-motion.gif`; do not delete, rewrite, or alter these assets.
- Use a black field, white primary text, gray secondary text, and only thin functional dividers.
- Do not use cards, rounded containers, gradients, decorative grids, icons, HUD elements, glow, or new ornamental animation.
- Use `capa-sala.jpg` as the real-space photograph in the third panel.
- Use PP Neue Montreal for scale/voice and PP Neue Montreal Mono for captions, technical labels, and event metadata.
- Add no dependencies.
- Use semantic sections/headings and meaningful image alt text.
- Preserve reduced-motion behavior by adding no new animation and by reusing the existing motion components.

---

## File Structure

- **Create:** `src/components/ui/typography-editorial.tsx` — the three-panel typographic narrative and preserved motion imports.
- **Modify:** `src/app/page.tsx` — removes only the previous Continuidade typography markup and renders `<TypographyEditorial />`.
- **Modify:** `src/app/globals.css` — adds the `type-editorial-*` layout system and responsive column-to-stack reflow.
- **Test/verify:** browser rendering at `http://localhost:3001`, `npm run lint`, and production build after stopping the dev server.

### Task 1: Build the three-panel specimen component

**Files:**
- Create: `src/components/ui/typography-editorial.tsx`
- Read: `src/components/ui/text-roll.tsx`
- Read: `src/components/ui/animated-text.tsx`
- Read: `docs/superpowers/specs/2026-08-26-tera-tipografia-editorial-design.md`

**Interfaces:**
- Consumes: `TextRoll({ text?: string }): JSX.Element` from `@/components/ui/text-roll`.
- Consumes: `AnimatedText({ text: string; duration?: number; delayMultiplier?: number }): JSX.Element` from `@/components/ui/animated-text`.
- Produces: `TypographyEditorial(): JSX.Element` from `@/components/ui/typography-editorial`.
- Later consumer: `src/app/page.tsx` renders exactly one `<TypographyEditorial />` in the existing Caminho 01 typography location.

- [ ] **Step 1: Verify the component does not already exist**

Run:

```powershell
Test-Path "C:\Users\leona\tera-identidade-atualizado\src\components\ui\typography-editorial.tsx"
```

Expected: `False`.

- [ ] **Step 2: Create the component and preserve the existing motions by import**

Create `src/components/ui/typography-editorial.tsx`. Use the existing `TextRoll` and `AnimatedText` components directly; do not reproduce their implementation. Start with these constants and structure:

```tsx
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
```

Do not add components for cards, filters, controls, or decorative overlays. All dividers in this component must correspond to a visible column or image boundary.

- [ ] **Step 3: Run the targeted static check**

Run:

```powershell
npm --prefix "C:\Users\leona\tera-identidade-atualizado" run lint
```

Expected: no errors originating in `src/components/ui/typography-editorial.tsx`. Existing unrelated warnings may remain.

- [ ] **Step 4: Self-review the component against the spec**

Confirm in the source that the output includes all of these concrete requirements:

- Panel 1: `Neue Montreal`, `PP Neue Montreal`, `2018`, `Pangram Pangram`, `Grotesca`, four named weights, `a/e/o/R T`, the character set, and both preserved text motion components.
- Panel 2: visual PP Neue Montreal vs. Mono split plus `MMMM`, `iiii`, `0000`.
- Panel 3: `capa-sala.jpg`, event application text, and `continuidade-tipografia-motion.gif`.
- No `rounded`, gradient, HUD, or icon markup has been added.

### Task 2: Integrate the component at the existing Continuidade typography position

**Files:**
- Modify: `src/app/page.tsx:10-14` (imports)
- Modify: `src/app/page.tsx:260-306` (existing Continuidade typography block)
- Read: `src/components/ui/typography-editorial.tsx`

**Interfaces:**
- Consumes: `TypographyEditorial(): JSX.Element` from `@/components/ui/typography-editorial`.
- Produces: the current Caminho 01 typography area presents exactly the three-panel narrative.
- Preserve: no adjacent moodboard, palette, logo, or Caminho 02 markup may change.

- [ ] **Step 1: Add the component import**

Add:

```tsx
import { TypographyEditorial } from "@/components/ui/typography-editorial";
```

Remove imports for `NeueMontrealSpecimen`, `TextRoll`, and `AnimatedText` only if no other code in `page.tsx` uses them after this replacement.

- [ ] **Step 2: Replace only the old Continuaidade typography block**

Locate the block that begins with:

```tsx
<TopicDivider label="Continuidade" name="Tipografia" fontClass="font-neue-montreal font-medium" />
```

and ends just before the following `TopicDivider` for `Continuidade / Paleta`. Replace the complete typography divider and section with:

```tsx
<TypographyEditorial />
```

Do not alter the immediately preceding `MediaWall` or any subsequent palette markup.

- [ ] **Step 3: Verify integration scope and lint**

Run:

```powershell
git -C "C:\Users\leona\tera-identidade-atualizado" diff -- src/app/page.tsx
npm --prefix "C:\Users\leona\tera-identidade-atualizado" run lint
```

Expected: the page diff only replaces the old Continuidade typography block and updates its imports. Lint has no errors.

### Task 3: Implement the specimen-led visual system and responsive reflow

**Files:**
- Modify: `src/app/globals.css` after the font utility rules and before palette/Lenis rules
- Read: `src/components/ui/typography-editorial.tsx`

**Interfaces:**
- Consumes: all `type-editorial-*` class names from Task 1.
- Produces: three full-screen desktop panels with black field/functional dividers and a no-overflow stacked mobile layout.

- [ ] **Step 1: Establish a strictly prefixed base system**

Add these base rules:

```css
.type-editorial-panel {
  position: relative;
  isolation: isolate;
  min-height: 100dvh;
  overflow: hidden;
  background: #000;
  color: var(--color-branco);
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}
.type-editorial-meta {
  position: absolute;
  z-index: 5;
  top: clamp(1.25rem, 2.5vw, 2.75rem);
  right: clamp(1.25rem, 3vw, 4rem);
  left: clamp(1.25rem, 3vw, 4rem);
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-family: var(--font-neue-montreal-mono);
  font-size: 0.58rem;
  line-height: 1.2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(247, 247, 245, 0.56);
}
.type-editorial-label {
  font-family: var(--font-neue-montreal-mono);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(247, 247, 245, 0.58);
}
```

- [ ] **Step 2: Build Panel 1 as a five-column specimen**

Implement the following layout characteristics using CSS Grid and thin borders only:

```css
.type-editorial-specimen__columns {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1.3fr 0.7fr 0.7fr 0.7fr 1.6fr;
  pointer-events: none;
}
.type-editorial-specimen__columns span {
  border-right: 1px solid rgba(255, 255, 255, 0.16);
}
.type-editorial-specimen__columns span:last-child { border-right: 0; }
.type-editorial-specimen__title-block { position: relative; z-index: 1; }
.type-editorial-specimen__title-block h2 {
  font-family: var(--font-neue-montreal);
  font-size: clamp(5.5rem, 11vw, 12rem);
  font-weight: 500;
  line-height: 0.8;
  letter-spacing: -0.075em;
}
.type-editorial-specimen__letter-object {
  position: absolute;
  z-index: 1;
  font-family: var(--font-neue-montreal);
  font-size: clamp(20rem, 47vw, 55rem);
  font-weight: 500;
  line-height: 0.62;
  letter-spacing: -0.13em;
}
```

Position the title in the first column, origin/statement/charset at the lower region of that column, the weights above columns 2–4, and the oversized `a` across the final right-side columns. Position character details near the oversize glyph so the labels visually refer to it. Place `TextRoll` and `AnimatedText` in a lower strip separated by a thin horizontal divider. Do not give any of these elements a background box or rounded container.

- [ ] **Step 3: Build Panel 2 as the proportional versus monospaced evidence**

Use a 60/40 grid with one central divider:

```css
.type-editorial-family {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
}
.type-editorial-family__voice,
.type-editorial-family__information {
  position: relative;
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(5rem, 10vw, 10rem) clamp(1.5rem, 4vw, 5rem) clamp(2rem, 4vw, 4rem);
}
.type-editorial-family__information { border-left: 1px solid rgba(255, 255, 255, 0.16); }
.type-editorial-family__voice h2 {
  font-family: var(--font-neue-montreal);
  font-size: clamp(8rem, 23vw, 28rem);
  font-weight: 500;
  line-height: 0.72;
  letter-spacing: -0.1em;
}
.type-editorial-family__mono-word,
.type-editorial-family__proof {
  font-family: var(--font-neue-montreal-mono);
}
.type-editorial-family__mono-word { font-size: clamp(2.5rem, 6vw, 8rem); }
.type-editorial-family__proof {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
}
.type-editorial-family__proof span { padding: 1rem 0; text-align: center; border-right: 1px solid rgba(255, 255, 255, 0.16); }
.type-editorial-family__proof span:last-child { border-right: 0; }
```

Use small Mono labels and a low-positioned two-line note. Do not add transitions or hover behavior.

- [ ] **Step 4: Build Panel 3 as the spatial application**

Use the existing cover photo as full-bleed imagery. Implement a flat contrast layer — **not a gradient** — and functional dividers aligned to the application columns:

```css
.type-editorial-space__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.type-editorial-space__contrast {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.38);
}
.type-editorial-meta--overlay { color: rgba(247, 247, 245, 0.74); }
.type-editorial-space__rule { position: absolute; z-index: 2; background: rgba(255, 255, 255, 0.42); }
.type-editorial-space__rule--vertical { top: 0; bottom: 0; left: 56%; width: 1px; }
.type-editorial-space__rule--horizontal { right: 0; bottom: 29%; left: 56%; height: 1px; }
.type-editorial-space__application { position: absolute; z-index: 3; left: clamp(1.5rem, 5vw, 6rem); bottom: clamp(2.5rem, 9vw, 8rem); }
.type-editorial-space__application h2 {
  font-family: var(--font-neue-montreal);
  font-size: clamp(8rem, 25vw, 29rem);
  font-weight: 500;
  line-height: 0.7;
  letter-spacing: -0.1em;
}
.type-editorial-space__artist { font-family: var(--font-neue-montreal); font-size: clamp(1.5rem, 3vw, 4rem); }
.type-editorial-space__date,
.type-editorial-space__format,
.type-editorial-space__caption { font-family: var(--font-neue-montreal-mono); }
```

Position the date and format in the right-hand image field. Position the GIF in the same right-hand field below the horizontal divider, with an unrounded rectangular crop and `object-fit: cover`. Keep the caption minimal and positioned separately from the event data.

- [ ] **Step 5: Add the mobile reflow with no document overflow**

Add a single mobile breakpoint:

```css
@media (max-width: 767px) {
  .type-editorial-panel { min-height: 100svh; }
  .type-editorial-meta { top: 1.25rem; right: 1.25rem; left: 1.25rem; }
  .type-editorial-specimen__columns { grid-template-columns: repeat(3, 1fr); }
  .type-editorial-specimen__weights { grid-template-columns: repeat(2, 1fr); }
  .type-editorial-specimen__motion { overflow: hidden; }
  .type-editorial-family { display: block; }
  .type-editorial-family__voice,
  .type-editorial-family__information { min-height: 62svh; padding: 5rem 1.25rem 2rem; }
  .type-editorial-family__information { border-top: 1px solid rgba(255, 255, 255, 0.16); border-left: 0; }
  .type-editorial-space__rule--vertical { left: 68%; }
  .type-editorial-space__rule--horizontal { bottom: 34%; left: 68%; }
  .type-editorial-space__application { right: 1.25rem; left: 1.25rem; }
  .type-editorial-space__motion { width: min(42vw, 11rem); }
}
```

Add only necessary dimensions/positions around this baseline. Every decorative desktop arrangement must have a mobile reading order; none may create page-level horizontal scrolling.

- [ ] **Step 6: Run static verification**

Run:

```powershell
git -C "C:\Users\leona\tera-identidade-atualizado" diff --check
npm --prefix "C:\Users\leona\tera-identidade-atualizado" run lint
```

Expected: no whitespace errors and no lint errors. Existing unrelated warnings may remain.

### Task 4: Run and inspect the real presentation

**Files:**
- Verify: `src/components/ui/typography-editorial.tsx`
- Verify: `src/app/page.tsx`
- Verify: `src/app/globals.css`

**Interfaces:**
- Consumes: the finished `<TypographyEditorial />` integration and the existing `npm run dev` script.
- Produces: visual verification that the actual site renders the three panels, preserves all assets, and has no desktop/mobile document overflow.

- [ ] **Step 1: Start or confirm the local application**

If port 3001 already serves current code, reuse it. Otherwise run:

```powershell
npm --prefix "C:\Users\leona\tera-identidade-atualizado" run dev -- --port 3001
```

Do not run `npm run build` while `next dev` is active; this project can corrupt `.next` and cause 404s when both modes share that output directory.

- [ ] **Step 2: Verify desktop at 1440px width**

Open `http://localhost:3001` and scroll to Continuidade. Confirm:

1. only three full-screen specimen-led panels replace the old typography chapter;
2. Panel 1 has black field, five functional columns, large cropped letters, weights, origin data, charset, and both text motions;
3. Panel 2 proves proportional versus mono width through `TÉRA`, `T É R A`, `MMMM`, `iiii`, and `0000`;
4. Panel 3 uses `capa-sala.jpg`, event typography, technical metadata, dividers, and the existing GIF;
5. no cards, rounded frames, gradients, HUD, glow, icons, or newly-added animation appear;
6. no page-level horizontal overflow occurs.

- [ ] **Step 3: Verify mobile at 390px width**

At 390px width, confirm:

1. all informative content remains readable and uncropped;
2. oversized letterforms may crop deliberately but do not hide labels/data;
3. the family panel reads sequentially without horizontal document scroll;
4. photo application text remains legible;
5. the GIF and text motions render or honor the user’s reduced-motion settings.

- [ ] **Step 4: Run final automated checks**

After stopping a dev server using the same `.next` directory, run:

```powershell
npm --prefix "C:\Users\leona\tera-identidade-atualizado" run lint
npm --prefix "C:\Users\leona\tera-identidade-atualizado" run build
```

Expected: lint has no errors; build completes successfully. Report unrelated pre-existing warnings faithfully.

- [ ] **Step 5: Verify asset preservation and final boundaries**

Run:

```powershell
git -C "C:\Users\leona\tera-identidade-atualizado" status --short
git -C "C:\Users\leona\tera-identidade-atualizado" diff --stat
git -C "C:\Users\leona\tera-identidade-atualizado" diff --check
```

Expected implementation changes are limited to `src/components/ui/typography-editorial.tsx`, `src/app/page.tsx`, and `src/app/globals.css`; documentation may change. No file in `public/media/` may be removed or modified.

## Self-Review

- **Spec coverage:** Task 1 supplies the three narratives, exact specimen content, functional labels, real photo, and preserved motion elements. Task 2 restricts the page integration to Caminho 01. Task 3 provides the black specimen field, columns, thin dividers, strict aesthetic exclusions, responsive behavior, and image contrast treatment. Task 4 verifies all visual and runtime constraints.
- **Placeholder scan:** Every task names exact files, component interfaces, required content, class families, assets, and commands. No requirement is deferred or left undefined.
- **Type consistency:** Task 1 exports `TypographyEditorial`; Task 2 imports that exact name. Task 3 names the exact `type-editorial-*` selectors emitted in Task 1.

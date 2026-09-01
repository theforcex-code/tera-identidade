# TÉRA Lucianov2 Compatibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebase the presentation structure on `lucianov2` while preserving the local Typography, Palette and Lab Areia modules exactly as protected components.

**Architecture:** Treat `luciano/lucianov2` as the source of deck order, content, updated paths, map and brand-motion assets. Port the structural content selectively into the current project, then reinsert the local protected components at the fixed Matéria/Luz positions rather than taking the remote `page.tsx`, CSS, fonts or dependency files wholesale.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, GSAP/Lenis, local fonts, WebGPU/WebGL iframe Lab Areia.

**Spec:** `docs/superpowers/specs/2026-08-26-lucianov2-compatibility-design.md`

## Global Constraints

- `luciano/lucianov2` supplies structural content and new brand assets only.
- Preserve current local Tipografia, Paletas and Lab Areia as protected modules.
- Do not check out or overwrite `src/app/globals.css`, `src/app/layout.tsx`, `package.json`, `package-lock.json`, `.gitignore`, local font files, `src/components/ui/typography-editorial.tsx`, `src/components/ui/vibracao-palette-board.tsx`, `src/components/areia-lab.tsx`, or `public/areia/**` from the remote branch.
- Matéria order: Capa → descrição → racional → Tipografia (Futura, Inter) → paleta mineral → moodboard.
- Luz order: Capa → descrição → racional → Tipografia (PP Neue Montreal, PP Neue Montreal Mono) → paleta Luz → Lab Areia → moodboard.
- Publish only after observing the real local site and committing the verified change.

---

## File Structure

- **Modify:** `src/app/page.tsx` — apply lucianov2 narrative/brand structure, while rendering protected local components in fixed positions.
- **Modify:** `src/lib/mindmap-data.ts` — bring only the compatible lucianov2 map-text adjustment.
- **Create:** only new brand assets under `public/brand/`, `public/media/tera-logo.mp4`, `public/logo3d/index.html`, and `src/components/video-scrub.tsx` from lucianov2.
- **Preserve:** all protected typography/palette/areia files named in Global Constraints.

### Task 1: Inventory and import lucianov2 brand assets

**Files:**
- Create from remote: `public/brand/lockup-monograma-descritor.png`
- Create from remote: `public/brand/simbolo-01-vao.svg`
- Create from remote: `public/brand/simbolo-02-arco.svg`
- Create from remote: `public/brand/simbolo-14-torcao.svg`
- Create from remote: `public/brand/simbolo-17-rastro.svg`
- Create from remote: `public/brand/simbolo-46-grade.svg`
- Create from remote: `public/media/tera-logo.mp4`
- Create from remote: `public/logo3d/index.html`
- Create from remote: `src/components/video-scrub.tsx`

**Interfaces:**
- Produces local files referenced only by the later mark-motion section in `page.tsx`.
- Must not modify protected `public/areia/**` or font directories.

- [ ] **Step 1: Record remote file list**

Run:

```powershell
git -C "C:\Users\leona\tera-identidade-atualizado" diff --name-status "luciano/versao-luciano-1" "luciano/lucianov2" -- "public/brand" "public/media/tera-logo.mp4" "public/logo3d" "src/components/video-scrub.tsx"
```

Expected: only the named brand-motion files are listed.

- [ ] **Step 2: Import only listed assets from lucianov2**

Run:

```powershell
git -C "C:\Users\leona\tera-identidade-atualizado" checkout "luciano/lucianov2" -- "public/brand/lockup-monograma-descritor.png" "public/brand/simbolo-01-vao.svg" "public/brand/simbolo-02-arco.svg" "public/brand/simbolo-14-torcao.svg" "public/brand/simbolo-17-rastro.svg" "public/brand/simbolo-46-grade.svg" "public/media/tera-logo.mp4" "public/logo3d/index.html" "src/components/video-scrub.tsx"
```

- [ ] **Step 3: Verify protected assets were not touched**

Run:

```powershell
git -C "C:\Users\leona\tera-identidade-atualizado" status --short -- "public/areia" "public/fonts" "src/components/areia-lab.tsx" "src/components/ui/typography-editorial.tsx" "src/components/ui/vibracao-palette-board.tsx"
```

Expected: no remote-origin replacement under these protected locations.

### Task 2: Apply lucianov2 structure without replacing protected path modules

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/lib/mindmap-data.ts`
- Read: `docs/superpowers/specs/2026-08-26-lucianov2-compatibility-design.md`

**Interfaces:**
- Consumes protected `TypographyEditorial`, `TypographyLuzEditorial`, `PaletaPossibilidade`, `LuzPalette`, and `AreiaLab` as they exist locally.
- Produces the lucianov2 narrative/brand updates without moving protected components out of their required order.

- [ ] **Step 1: Extract remote change regions before editing**

Run:

```powershell
git -C "C:\Users\leona\tera-identidade-atualizado" diff --unified=12 "luciano/versao-luciano-1" "luciano/lucianov2" -- "src/app/page.tsx" "src/lib/mindmap-data.ts"
```

Read all regions and make a list of changes that belong to: manifesto copy, Matéria copy, Luz copy, final principle, map text, and brand motion/3D section.

- [ ] **Step 2: Apply content and ordering updates by anchor**

Update current `page.tsx` only at the matching content anchors. The final path order must be exactly:

```tsx
// Matéria
<PathDivider ... name="Matéria" />
<Split ...>{/* descrição */}</Split>
<Split ...>{/* racional */}</Split>
<TopicDivider label="Matéria" name="Tipografia" ... />
<TypographyEditorial />
<TopicDivider label="Matéria" name="Paleta" ... />
<PaletaPossibilidade />
<TopicDivider label="Matéria" name="Moodboard" ... />
<MediaWall offset={0} grayscale />

// Luz
<PathDivider ... name="LUZ" />
<Split ...>{/* descrição */}</Split>
<Split ...>{/* racional */}</Split>
<TopicDivider label="Luz" name="Tipografia" ... />
<TypographyLuzEditorial />
<TopicDivider label="Luz" name="Paleta" ... />
<LuzPalette />
<AreiaLab srcGpu="/areia/index.html?paleta=plasma" srcWebgl="/areia/3d.html?encher&paleta=plasma" title="Lab Areia - wordmark TÉRA preenchido por areia" />
<TopicDivider label="Luz" name="Moodboard" ... />
<MediaWall offset={3} grayscale={false} />
```

Port the updated lucianov2 copy and mark section but do not replace those protected JSX blocks.

- [ ] **Step 3: Verify protected component placements statically**

Run:

```powershell
rg -n -C 2 "TypographyEditorial|TypographyLuzEditorial|PaletaPossibilidade|LuzPalette|AreiaLab|MediaWall" "C:\Users\leona\tera-identidade-atualizado\src\app\page.tsx"
```

Expected: exact order matches the two code skeletons in Step 2.

### Task 3: Add brand motion / 3D section to the lucianov2 deck structure

**Files:**
- Modify: `src/app/page.tsx`
- Create from Task 1: `src/components/video-scrub.tsx`
- Create from Task 1: `public/logo3d/index.html`
- Create from Task 1: `public/media/tera-logo.mp4`

**Interfaces:**
- Consumes `VideoScrub` export from `@/components/video-scrub`.
- Produces a brand section that uses lucianov2 assets without replacing the current two-logo final treatment unless lucianov2 explicitly structures it as an additional mark section.

- [ ] **Step 1: Read the source component and remote page use together**

Run:

```powershell
git -C "C:\Users\leona\tera-identidade-atualizado" show "luciano/lucianov2:src/components/video-scrub.tsx"
git -C "C:\Users\leona\tera-identidade-atualizado" show "luciano/lucianov2:src/app/page.tsx" | Select-String -Pattern "VideoScrub|logo3d|tera-logo.mp4|lockup-monograma" -Context 8,16
```

- [ ] **Step 2: Add the new lucianov2 mark media in its remote narrative position**

Import `VideoScrub`, then add the remote structure and assets at the corresponding section position. Keep the final local logos section as only Variação 01 and Variação 02 on black, with no white square and no removed legacy logo videos.

- [ ] **Step 3: Confirm 3D source responds from local app**

With dev server running, run:

```powershell
(Invoke-WebRequest -Method Head -Uri "http://localhost:3001/logo3d/index.html" -UseBasicParsing).StatusCode
(Invoke-WebRequest -Method Head -Uri "http://localhost:3001/media/tera-logo.mp4" -UseBasicParsing).StatusCode
```

Expected: both return `200`.

### Task 4: Observe, save, and publish

**Files:**
- Verify: all modified files
- Modify: `.vercelignore` only if temporary local profiles would otherwise be uploaded

- [ ] **Step 1: Run the local app and inspect the actual user surface**

Start or reuse the local server at `http://localhost:3001`. Inspect in the browser:

1. Manifesto and Matéria/Luz content reflect lucianov2.
2. The two protected palette boards retain current proportions, names, and placement.
3. Typography boards retain the current protected families and grids.
4. Lab Areia sits after Paleta Luz and controls scroll/zoom as designed.
5. New logo video/3D assets load and do not replace the two-logo final section.

- [ ] **Step 2: Run source validation**

Run:

```powershell
npx --prefix "C:\Users\leona\tera-identidade-atualizado" eslint "src/app/page.tsx" "src/lib/mindmap-data.ts" "src/components/video-scrub.tsx" "src/components/ui/typography-editorial.tsx"
git -C "C:\Users\leona\tera-identidade-atualizado" diff --check
```

Expected: no lint errors in changed files and no whitespace errors.

- [ ] **Step 3: Commit only implementation files and real assets**

Stage the modified source and new `public/brand`, `public/logo3d`, `public/media/tera-logo.mp4` files. Exclude `.chrome-*`, `.claude-*`, screenshots, CDP scripts, and local logs.

```powershell
git -C "C:\Users\leona\tera-identidade-atualizado" commit -m "Compatibiliza estrutura lucianov2"
git -C "C:\Users\leona\tera-identidade-atualizado" push origin master
```

- [ ] **Step 4: Publish the saved result to the existing Vercel project**

Verify `.vercel/project.json` names `tera-identidade`, then deploy:

```powershell
vercel --prod --yes --scope "theforce-7256s-projects"
```

Expected: deployment reaches READY and aliases `https://tera-identidade.vercel.app`.

## Self-Review

- **Spec coverage:** Tasks 1-3 rebuild lucianov2 structure/assets while keeping the protected Typography, Palette and Lab Areia modules. Task 4 covers real local observation, source validation, Git save, and Vercel production publishing.
- **Placeholder scan:** No implementation step leaves a module or source path undefined. Protected placement skeletons and source references are explicit.
- **Type consistency:** Task 2 uses exact local exports (`TypographyEditorial`, `TypographyLuzEditorial`, `PaletaPossibilidade`, `LuzPalette`, `AreiaLab`); Task 3 introduces `VideoScrub` only through its remote source export.

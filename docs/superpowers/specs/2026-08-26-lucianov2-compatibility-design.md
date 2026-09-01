# TÉRA - compatibilização estrutural com lucianov2

**Data:** 2026-08-26  
**Base estrutural:** `theforcex-code/tera-identidade`, branch `lucianov2` (`8736c8a`).

## Objetivo

Reconstruir a apresentação local a partir da estrutura, ordem de conteúdo, narrativa, mídia e marca em movimento presentes em `lucianov2`, preservando como componentes protegidos as versões locais já aprovadas de Tipografia, Paletas e Lab Areia.

A operação não é um merge parcial sobre o `page.tsx` atual. O conteúdo e a arquitetura de `lucianov2` constituem a base; os três módulos protegidos são encaixados explicitamente em seus pontos de narrativa.

## Base importada de lucianov2

- Ordem de apresentação e conteúdo dos caminhos Matéria e Luz.
- Revisões do manifesto e dos textos de descrição/racional.
- Mapa conceitual e suas atualizações em `src/lib/mindmap-data.ts`.
- Marca em movimento:
  - vídeo `public/media/tera-logo.mp4`;
  - componente `src/components/video-scrub.tsx`;
  - visualizador em `public/logo3d/index.html`;
  - lockup e símbolos em `public/brand/`.
- Ajustes de identidade e ordem do deck que não substituam os módulos protegidos.

## Módulos protegidos

### Tipografia

A estrutura tipográfica atual deve sobreviver como uma unidade independente, incluindo os boards construídos nesta cópia e as fontes locais correspondentes.

- **Matéria:** Futura PT primeiro, Inter depois.
- **Luz:** PP Neue Montreal primeiro, PP Neue Montreal Mono depois.
- Cada board deve ter fundo preto, linhas claras, Light / Regular / Bold, alfabeto, minúsculas, números e `Aa` na mesma grade.
- A Mono usa os arquivos locais aprovados:
  - `PPNeueMontrealMono-Light.ttf` (300);
  - `PPNeueMontrealMono-Regular-Verified.ttf` (400);
  - `PPNeueMontrealMono-Bold-Verified.ttf` (700).
- Manter kerning e ligatures ativados.
- Não reintroduzir a antiga seção de movimento tipográfico.

### Paletas

A estrutura visual das paletas atuais deve permanecer intacta, incluindo tela cheia, proporções, posição dos títulos e gradientes.

- **Matéria:** paleta mineral atual.
- **Luz:** Branco, Preto e uma faixa de Gradiente; o título Luz fica no centro vertical da faixa gradiente e não mostra a lista de cores abaixo.
- Não importar paletas alternativas, helpers de contraste, ou bordas/cards do branch `lucianov2`.

### Lab Areia

Preservar e posicionar o Lab Areia completo logo após a Paleta Luz, antes do moodboard Luz.

- Conservar `src/components/areia-lab.tsx` e `public/areia/**` locais.
- WebGPU é a tentativa inicial; WebGL é o fallback.
- A rolagem navega o deck por padrão; clique no canvas ativa zoom; `Esc` devolve a rolagem para a página.

## Ordem obrigatória dos caminhos

### Matéria

Capa → descrição → racional → Tipografia (boards Futura, Inter) → Paleta mineral → Moodboard de Matéria.

### Luz

Capa → descrição → racional → Tipografia (boards PP Neue Montreal, PP Neue Montreal Mono) → Paleta Luz → Lab Areia → Moodboard de Luz.

## Exclusões

Não importar do `lucianov2`:

- `src/app/globals.css`;
- `src/app/layout.tsx`;
- `package.json`, `package-lock.json`, `.gitignore`;
- quaisquer deleções de fontes ou componentes locais;
- versões do `TypographyEditorial`, `VibracaoPaletteBoard`, ou layouts de paleta do branch;
- arquivos de perfil/validação do Chrome;
- qualquer substituição do Lab Areia local.

## Publicação

1. Validar a cópia local em `http://localhost:3001`.
2. Salvar em `theforcex-code/tera-identidade-backup-2026-08-26`.
3. Publicar o resultado no projeto Vercel existente `tera-identidade` (`https://tera-identidade.vercel.app`).

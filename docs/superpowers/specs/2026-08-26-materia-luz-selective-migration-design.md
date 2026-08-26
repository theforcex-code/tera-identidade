# TÉRA — migração seletiva Matéria / Luz

**Data:** 2026-08-26  
**Fonte:** `theforcex-code/tera-identidade`, branch `versao-luciano-1` (`686a360`).

## Objetivo

Atualizar os dois caminhos do TÉRA para a narrativa **Da matéria à luz**, importando mapa, textos, imagens e moodboards do branch Luciano, sem substituir a tipografia ou as paletas atualmente aprovadas nesta cópia.

## Escopo importado

- Novo mapa conceitual: nome, obra, categoria, conceito e divisão final entre Matéria e Luz.
- Ativos do mapa em `public/mapa/`: terra, teras, escala, obra/subsolo, LED, categoria e os dois caminhos.
- Moodboards e mídias de Matéria e Luz em `public/media/mood-materia-*` e `public/media/mood-luz-*`.
- Dados e apresentação do mapa em `src/lib/mindmap-data.ts` e `src/components/mind-map.tsx`.
- Fonte dos moodboards em `src/components/media-frames.ts`.
- Textos e nomes dos Caminhos 01/02 em `src/app/page.tsx`:
  - Caminho 01: Matéria — chapa, grid, corte, dobra, vão.
  - Caminho 02: Luz — plasma, onda, orgânico, preenchimento.
- Ajustes do manifesto, conceito central e princípio final que vinculam a narrativa nova.

## Escopo protegido — não alterar

- `src/components/ui/typography-editorial.tsx` e os motions que ele usa.
- A seção atual de Tipografia no `src/app/page.tsx`.
- `src/components/ui/vibracao-palette-board.tsx`.
- Estrutura, cores, nomes, gradientes, proporções e posicionamento das duas paletas atuais.
- `src/app/globals.css`, exceto se for indispensável para a compatibilidade do novo mapa; alterações de paleta/tipografia são proibidas.
- `src/app/layout.tsx`, fontes, `package.json`, `package-lock.json`, `.gitignore`, `public/areia/` e `src/components/areia-lab.tsx`.
- Seção de logo e demais capítulos não listados neste documento.

## Estratégia de migração

1. Importar somente os assets novos do mapa e dos moodboards, sem deletar assets existentes.
2. Trazer os arquivos de dados/componentes do mapa e mídia, adaptando seus tipos à cópia atual quando necessário.
3. Aplicar os textos, capas, descrições e racionais de Matéria/Luz em blocos delimitados de `page.tsx`.
4. Manter a atual área tipográfica intacta dentro do Caminho 01, mesmo que o branch de origem use uma tipografia diferente.
5. Manter as paletas atuais no mesmo local da sequência, mesmo que o branch de origem proponha Paleta Matéria e laboratório de Areia/Luz.
6. Não portar o laboratório Areia: seus componentes e arquivos são uma funcionalidade independente e não pertencem a esta migração.

## Conteúdo visual

- **Matéria:** moodboard com grade, módulo, corte, dobra, estratos, chapa e arquitetura.
- **Luz:** moodboard em cor com plasma, escoamento, onda, preenchimento, projeção e luz na arquitetura.
- O moodboard Luz deve renderizar em cor; Matéria conserva o tratamento compatível com sua narrativa material.

## Verificação

1. Lint sem erros novos.
2. Localhost renderiza o novo mapa sem imagens quebradas.
3. Caminhos Matéria e Luz exibem as novas capas, textos, imagens e moodboards.
4. Tipografia existente, motions e as duas paletas permanecem visualmente e estruturalmente inalterados.
5. Não há referências a `AreiaLab` ou a `/areia/` no resultado.

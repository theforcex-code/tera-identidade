# TÉRA — narrativa tipográfica editorial

**Data:** 2026-08-26  
**Escopo:** condensar o capítulo tipográfico do Caminho 01 em três painéis editoriais de tela cheia, substituindo a apresentação fragmentada atual sem eliminar nenhum motion existente.

## Objetivo

Demonstrar por que PP Neue Montreal e PP Neue Montreal Mono pertencem à TÉRA por meio de escala, ritmo, construção de letra e relação com o espaço. A apresentação deve operar como um specimen editorial: tipografia e informação técnica são o conteúdo visual principal, não ilustração de um argumento longo.

A referência visual fornecida orienta a estrutura — campo preto, divisórias lineares, colunas, letras cortadas e metadados mínimos. Não deve ser copiada: a composição, conteúdo, proporções e aplicação pertencem à TÉRA.

## Escopo e preservação

- Trabalhar exclusivamente na área atual de tipografia do Caminho 01 (Continuidade).
- Preservar todos os assets existentes em `public/media`, especialmente:
  - `continuidade-tipografia-motion.gif`;
  - `TextRoll`;
  - `AnimatedText`.
- Os motions serão reposicionados na nova narrativa; nenhum será apagado, reescrito ou removido.
- Não alterar paletas, moodboards, seção de logo ou Caminho 02.
- Usar `public/brand/capa-sala.jpg` como a fotografia real da sala no terceiro painel.

## Sistema visual

- Fundo preto absoluto e texto branco, com cinzas apenas para informação secundária.
- Divisórias verticais e horizontais finas, funcionais: estabelecem colunas de conteúdo e recorte, nunca decoração solta.
- Sem cards, cantos arredondados, gradientes, HUD, glow, ícones, grids decorativos ou efeitos cyberpunk.
- PP Neue Montreal é o elemento de escala, identidade e voz.
- PP Neue Montreal Mono é a camada de índice, peso, informação e evidência técnica.
- A tipografia pode cortar propositalmente nas bordas do painel, mas textos informativos não podem ser cortados.
- Composição assimétrica sob uma grade disciplinada: poucos elementos, áreas vazias generosas e contraste extremo de escalas.

## Painel 1 — O specimen / a letra

**Papel na narrativa:** apresentar a PP Neue Montreal como forma, antes da explicação.

**Composição:** painel preto dividido por linhas verticais em cinco campos. O primeiro campo mostra `TÉRA` ou `Neue Montreal` em grande escala e parcialmente recortado; os campos seguintes apresentam pesos da família, uma grande letra `a` como objeto gráfico e detalhes menores de `e`, `o`, `R` e `T`.

**Conteúdo editorial mínimo:**

- PP Neue Montreal
- 2018 · Pangram Pangram
- Grotesca
- Light / Regular / Medium / Bold
- Curvas · contraformas · aberturas · proporções
- “Construção simples, curvas controladas e contraformas abertas.”

**Evidência visual:** a letra ampliada e os detalhes de caracteres devem provar o argumento. O alfabeto e numerais entram como amostra pequena, não como parágrafo.

**Motion preservado:** `TextRoll` e `AnimatedText` entram em um campo inferior ou lateral como intervalo de forma e peso, mantendo-os como partes do specimen.

## Painel 2 — A família / Mono

**Papel na narrativa:** tornar visível como a linguagem muda de função sem mudar de família.

**Composição:** dois blocos assimétricos separados por uma divisória. A metade dominante usa PP Neue Montreal para `TÉRA`; a menor usa PP Neue Montreal Mono para `T É R A`. Uma prova monoespaçada alinha `MMMM`, `iiii` e `0000` em colunas comuns, mostrando concretamente que cada caractere ocupa a mesma largura.

**Conteúdo editorial mínimo:**

- Neue Montreal / voz
- Neue Montreal Mono / informação
- Títulos · nomes · mensagens · comunicação principal
- Datas · horários · créditos · informações
- “Na versão Mono, todos os caracteres ocupam a mesma largura horizontal.”
- “A mesma linguagem. Duas funções dentro do sistema.”

**Evidência visual:** a comparação usa largura, espaçamento e alinhamento; não usa explicações abstratas nem uma lista excessiva de atributos.

## Painel 3 — Tipografia + espaço

**Papel na narrativa:** provar a escolha dentro da arquitetura real da TÉRA.

**Composição:** `capa-sala.jpg` cobre a maior parte do painel em um recorte arquitetônico. Divisórias discretas derivadas dos limites da imagem organizam a aplicação. PP Neue Montreal entra em escala grande e diretamente sobre a arquitetura; PP Neue Montreal Mono organiza os dados. Um pequeno trecho do GIF tipográfico atua como segunda aplicação material, sem frame arredondado.

**Aplicação:**

- TÉRA
- NOME DO ARTISTA
- 24.08.26 / 22:00
- EXPERIÊNCIA IMERSIVA
- “A identidade nasce da relação entre letra e espaço.”

**Legibilidade:** usar uma camada preta semitransparente plana apenas onde o contraste for necessário; nunca gradiente, glow ou box flutuante.

## Responsividade e acessibilidade

- Desktop preserva a grade de colunas, as divisórias e o contraste de escala.
- Mobile reordena os campos verticalmente, mantendo o mesmo ritmo editorial e sem scroll horizontal do documento.
- Cada painel usa marcação semântica e título legível para leitores de tela.
- A foto recebe `alt` descritivo; conteúdo técnico mantém contraste legível.
- A composição nova não introduz novas animações; respeita o comportamento de movimento reduzido dos motions existentes.

## Arquitetura de código

- Criar `src/components/ui/typography-editorial.tsx` para conter os três painéis e reutilizar `TextRoll` e `AnimatedText` por importação.
- Substituir apenas a seção atual de tipografia do Caminho 01 em `src/app/page.tsx` por `<TypographyEditorial />`.
- Criar regras em `src/app/globals.css` com o prefixo `type-editorial-`.
- Nenhum arquivo dentro de `public/media/` é alterado ou removido.

## Verificação

1. `npm run lint` sem erros novos.
2. Abrir `http://localhost:3001` em desktop e mobile.
3. Confirmar os três painéis, as divisórias funcionais, os caracteres ampliados, a comparação Mono, a foto de capa e todos os motions preservados.
4. Confirmar ausência de cards, gradientes, HUD, glow e overflow horizontal de documento.

(() => {
  "use strict";

  const STORAGE_KEY = "tera-poster-lab:v1";
  const LIBRARY_DB = "tera-poster-library";
  const LIBRARY_STORE = "posters";
  const EXPORT_WIDTH = 1400;
  const DEFAULT_MEDIA_PATH = "assets/imagem-referencia.png";
  const BUNDLED_MEDIA = Object.freeze({
    sand: Object.freeze({ label: "AREIA", type: "image", src: DEFAULT_MEDIA_PATH }),
    flow: Object.freeze({ label: "VÍDEO 01", type: "video", src: "assets/media/fluxo-visual.mp4" }),
    morph: Object.freeze({ label: "MORPH QUADRADO CÍRCULO", type: "video", src: "assets/media/morph-quadrado-circulo.mp4" }),
    light: Object.freeze({ label: "LUZ E TEXTURA", type: "video", src: "assets/media/luz-e-textura.mp4" })
  });

  const DEFAULT_STATE = Object.freeze({
    title: "TÉRA",
    subtitle: "ESPETÁCULOS MULTIDIMENSIONAIS",
    info1: "Cidade Matarazzo\nSão Paulo - SP",
    info2: "Funcionamento:\nSeg: 14h às 18h30\nTer a Dom: 09h às 18h30",
    info3: "Entrada gratuita",
    format: "A2",
    module: "eclipse",
    palette: "paper",
    moduleScale: 100,
    moduleX: 50,
    moduleY: 50,
    showModuleShapes: false,
    mediaTreatment: "color",
    mediaBorder: "inset",
    mediaPreset: "light",
    posterLayout: "module",
    contentTreatment: "normal",
    titleScale: 100,
    logoVariant: "accent",
    logoSource: "font",
    showSubtitle: true,
    typeLayout: "padrao",
    infoY: 50,
    subtitleScale: 100,
    subtitleX: 50,
    subtitleY: 50,
    teraWeight: 640,
    teraAccentWidth: 100,
    teraCrossbar: 100,
    teraLegR: false,
    teraAccentForm: "",
    logoX: 50,
    logoY: 50,
    logoBlend: "normal",
    textWeight: "regular",
    textItalic: false,
    mediaType: "",
    mediaUrl: "",
    mediaFrame: "",
    mediaName: "AREIA",
    showGrid: false
  });

  const FORMATS = Object.freeze({
    A1: "594 × 841 MM",
    A2: "420 × 594 MM",
    A3: "297 × 420 MM",
    A4: "210 × 297 MM",
    SQ: "1:1 / QUADRADO"
  });

  const POSTER_GEOMETRIES = Object.freeze({
    portrait: Object.freeze({
      canvasHeight: 990,
      exportHeight: 1980,
      moduleMediaHeight: 560,
      fullMediaHeight: 910,
      logoY: 590,
      logoHeight: 190,
      logoPositionRange: 1,
      subtitleY: 832,
      subtitleSize: 29,
      infoY: 872,
      infoSize: 16,
      infoLineHeight: 20,
      gridRows: 10
    }),
    square: Object.freeze({
      canvasHeight: 700,
      exportHeight: 1400,
      moduleMediaHeight: 350,
      fullMediaHeight: 620,
      logoY: 382,
      logoHeight: 145,
      logoPositionRange: 0.62,
      subtitleY: 552,
      subtitleSize: 20,
      infoY: 592,
      infoSize: 11,
      infoLineHeight: 14,
      gridRows: 7
    })
  });

  const PALETTES = Object.freeze({
    paper: {
      background: "#ffffff",
      block: "#000000",
      text: "#000000",
      accent: "#000000",
      cutout: "#ffffff"
    },
    night: {
      background: "#000000",
      block: "#ffffff",
      text: "#ffffff",
      accent: "#ffffff",
      cutout: "#000000"
    }
  });

  const MODULES = Object.freeze(["eclipse", "portal", "fold", "beam"]);
  const POSTER_LAYOUTS = Object.freeze(["module", "full", "mask", "solid"]);
  const PALETTE_NAMES = Object.freeze(Object.keys(PALETTES));
  const FONT_WEIGHTS = Object.freeze(["light", "regular", "bold"]);
  const FONT_FACES = Object.freeze({
    light: Object.freeze({ roman: "NBInternationalPro-Lig", italic: "NBInternationalPro-LigIta" }),
    regular: Object.freeze({ roman: "NBInternationalPro-Reg", italic: "NBInternationalPro-Ita" }),
    bold: Object.freeze({ roman: "NBInternationalPro-Bol", italic: "NBInternationalPro-BolIta" })
  });
  const LOGO_ASSETS = Object.freeze({
    "accent-tagline": Object.freeze({
      label: "Acento angular + tagline",
      shortLabel: "ACENTO + TAG",
      hasTagline: true,
      src: "assets/logo-acento-tagline.svg",
      viewBox: Object.freeze([777, 395]),
      crop: Object.freeze([112, 16, 560, 356])
    }),
    plain: Object.freeze({
      label: "Sem acento, sem tagline",
      shortLabel: "SEM TAG",
      hasTagline: false,
      src: "assets/logo-sem-tagline.svg",
      viewBox: Object.freeze([777, 293]),
      crop: Object.freeze([112, 14, 560, 263])
    }),
    accent: Object.freeze({
      label: "Acento angular, sem tagline",
      shortLabel: "ACENTO",
      hasTagline: false,
      src: "assets/logo-acento-sem-tagline.svg",
      viewBox: Object.freeze([777, 395]),
      crop: Object.freeze([112, 80, 560, 263])
    }),
    "plain-tagline": Object.freeze({
      label: "Sem acento + tagline",
      shortLabel: "COM TAG",
      hasTagline: true,
      src: "assets/logo-com-tagline.svg",
      viewBox: Object.freeze([777, 293]),
      crop: Object.freeze([113, 0, 560, 276])
    })
  });
  const LOGO_NAMES = Object.freeze(Object.keys(LOGO_ASSETS));

  // The wordmark can be drawn two ways: the four fixed SVG signatures, or the
  // Tera variable font itself, which puts weight, accent width, the A's
  // crossbar and both alternates on live axes.
  const LOGO_SOURCES = Object.freeze(["svg", "font"]);

  // The poster is 700 wide, which is exactly twenty 35-unit modules -- the
  // same module the typeface is drawn on. These five compositions land the
  // logotype, the subtitle and the information block on that grid, so the
  // sliders are left for fine adjustment instead of hunting for alignment.
  const TYPE_MODULE = 35;
  const TYPE_LAYOUTS = Object.freeze({
    padrao: Object.freeze({
      label: "PADRÃO",
      values: { titleScale: 100, logoY: 50, subtitleScale: 100, subtitleY: 50, infoY: 50 }
    }),
    alto: Object.freeze({
      label: "ALTO",
      values: { titleScale: 100, logoY: 5, subtitleScale: 90, subtitleY: 44, infoY: 74 }
    }),
    compacto: Object.freeze({
      label: "COMPACTO",
      values: { titleScale: 76, logoY: 26, subtitleScale: 76, subtitleY: 42, infoY: 40 }
    }),
    amplo: Object.freeze({
      label: "AMPLO",
      values: { titleScale: 128, logoY: 20, subtitleScale: 118, subtitleY: 56, infoY: 84 }
    }),
    rodape: Object.freeze({
      label: "RODAPÉ",
      values: { titleScale: 68, logoY: 96, subtitleScale: 68, subtitleY: 56, infoY: 12 }
    })
  });
  const TYPE_LAYOUT_NAMES = Object.freeze(Object.keys(TYPE_LAYOUTS));
  const TERA_ACCENT_FORMS = Object.freeze(["", "ss02", "ss03"]);
  const TERA_FONT_SRC = "assets/fonts/Tera-VF.ttf";
  let embeddedTeraFont = "";
  const variationRecipes = [
    { module: "eclipse", palette: "paper", moduleScale: 96, moduleX: 50, moduleY: 50 },
    { module: "portal", palette: "paper", moduleScale: 110, moduleX: 78, moduleY: 50 },
    { module: "fold", palette: "night", moduleScale: 104, moduleX: 50, moduleY: 36 },
    { module: "beam", palette: "night", moduleScale: 92, moduleX: 34, moduleY: 58 }
  ];

  const posterPreview = document.querySelector("#posterPreview");
  const posterShell = document.querySelector("#posterShell");
  const variationList = document.querySelector("#variationList");
  const formatLabel = document.querySelector("#formatLabel");
  const exportToggle = document.querySelector("#exportToggle");
  const exportMenu = document.querySelector("#exportMenu");
  const statusElement = document.querySelector("#status");
  const videoPreview = document.querySelector("#videoPreview");
  const mediaInput = document.querySelector("#mediaInput");
  const mediaName = document.querySelector("#mediaName");
  const removeMediaButton = document.querySelector("#removeMedia");
  const saveNameInput = document.querySelector("#saveName");
  const savedList = document.querySelector("#savedList");
  const savedCount = document.querySelector("#savedCount");
  let state = loadState();
  let toastTimer = 0;
  let variationNonce = 0;
  let currentMediaFile = null;
  let libraryDatabasePromise = null;
  let bundledMediaDataUrl = "";
  const embeddedLogos = {};

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      const restored = saved ? { ...DEFAULT_STATE, ...saved } : { ...DEFAULT_STATE };
      if (!PALETTE_NAMES.includes(restored.palette)) restored.palette = DEFAULT_STATE.palette;
      if (!FONT_WEIGHTS.includes(restored.textWeight)) restored.textWeight = DEFAULT_STATE.textWeight;
      if (!LOGO_NAMES.includes(restored.logoVariant)) restored.logoVariant = DEFAULT_STATE.logoVariant;
      if (!LOGO_SOURCES.includes(restored.logoSource)) restored.logoSource = DEFAULT_STATE.logoSource;
      if (!TYPE_LAYOUT_NAMES.includes(restored.typeLayout)) restored.typeLayout = DEFAULT_STATE.typeLayout;
      if (!TERA_ACCENT_FORMS.includes(restored.teraAccentForm)) restored.teraAccentForm = DEFAULT_STATE.teraAccentForm;
      if (!POSTER_LAYOUTS.includes(restored.posterLayout)) restored.posterLayout = DEFAULT_STATE.posterLayout;
      if (!BUNDLED_MEDIA[restored.mediaPreset] || restored.mediaPreset === "custom") {
        restored.mediaPreset = DEFAULT_STATE.mediaPreset;
      }
      applyBundledMediaState(restored);
      return restored;
    } catch {
      return { ...DEFAULT_STATE };
    }
  }

  function applyBundledMediaState(target) {
    const preset = BUNDLED_MEDIA[target.mediaPreset] || BUNDLED_MEDIA.sand;
    target.mediaPreset = BUNDLED_MEDIA[target.mediaPreset] ? target.mediaPreset : "sand";
    target.mediaFrame = "";
    target.mediaName = preset.label;
    if (preset.type === "video") {
      target.mediaType = "video";
      target.mediaUrl = new URL(preset.src, document.baseURI).href;
    } else {
      target.mediaType = "";
      target.mediaUrl = "";
    }
    return target;
  }

  function saveState() {
    try {
      const { mediaUrl, mediaFrame, mediaName: currentMediaName, mediaType, ...persistedState } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
    } catch {
      showStatus("Não foi possível salvar o estado local.");
    }
  }

  function openLibrary() {
    if (libraryDatabasePromise) return libraryDatabasePromise;
    libraryDatabasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(LIBRARY_DB, 1);
      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(LIBRARY_STORE)) {
          database.createObjectStore(LIBRARY_STORE, { keyPath: "id" });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    return libraryDatabasePromise;
  }

  async function libraryRequest(mode, action) {
    const database = await openLibrary();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(LIBRARY_STORE, mode);
      const store = transaction.objectStore(LIBRARY_STORE);
      const request = action(store);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  function getSavedPosters() {
    return libraryRequest("readonly", (store) => store.getAll());
  }

  function getSavedPoster(id) {
    return libraryRequest("readonly", (store) => store.get(id));
  }

  function putSavedPoster(record) {
    return libraryRequest("readwrite", (store) => store.put(record));
  }

  function deleteSavedPoster(id) {
    return libraryRequest("readwrite", (store) => store.delete(id));
  }

  function savedStateSnapshot() {
    return {
      ...state,
      mediaUrl: "",
      mediaFrame: ""
    };
  }

  async function savePosterVersion() {
    captureVideoFrame();
    const posters = await getSavedPosters();
    const fallbackName = `VERSÃO ${String(posters.length + 1).padStart(2, "0")}`;
    const name = saveNameInput.value.trim() || fallbackName;
    const now = Date.now();
    await putSavedPoster({
      id: crypto.randomUUID(),
      name,
      createdAt: now,
      state: savedStateSnapshot(),
      mediaFile: currentMediaFile,
      mediaName: state.mediaName
    });
    saveNameInput.value = "";
    await renderSavedPosters();
    showStatus(`${name} salva.`);
  }

  async function loadPosterVersion(id) {
    const record = await getSavedPoster(id);
    if (!record) return;
    releaseMedia();
    state = { ...DEFAULT_STATE, ...record.state, mediaUrl: "", mediaFrame: "" };
    if (record.mediaFile) {
      currentMediaFile = record.mediaFile;
      state.mediaPreset = "custom";
      state.mediaName = record.mediaName || "MÍDIA SALVA";
      if (state.mediaType === "image") {
        state.mediaUrl = await readImage(record.mediaFile);
      } else if (state.mediaType === "video") {
        state.mediaUrl = URL.createObjectURL(record.mediaFile);
      }
    } else {
      applyBundledMediaState(state);
    }
    syncControls();
    commit(`${record.name} aberta.`);
  }

  async function removePosterVersion(id) {
    await deleteSavedPoster(id);
    await renderSavedPosters();
    showStatus("Versão apagada.");
  }

  async function renderSavedPosters() {
    const posters = (await getSavedPosters()).sort((a, b) => b.createdAt - a.createdAt);
    savedList.replaceChildren();
    savedCount.textContent = `${posters.length} ${posters.length === 1 ? "VERSÃO" : "VERSÕES"}`;
    if (!posters.length) {
      const empty = document.createElement("p");
      empty.className = "saved-empty";
      empty.textContent = "NENHUMA VERSÃO SALVA";
      savedList.append(empty);
      return;
    }

    const formatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });
    posters.forEach((record) => {
      const item = document.createElement("div");
      item.className = "saved-item";
      const open = document.createElement("button");
      open.type = "button";
      open.className = "saved-open";
      open.dataset.savedOpen = record.id;
      const title = document.createElement("strong");
      title.textContent = record.name;
      const detail = document.createElement("small");
      detail.textContent = `${record.state.format} / ${formatter.format(record.createdAt)}`;
      open.append(title, detail);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "saved-delete";
      remove.dataset.savedDelete = record.id;
      remove.setAttribute("aria-label", `Apagar ${record.name}`);
      remove.textContent = "APAGAR";
      item.append(open, remove);
      savedList.append(item);
    });
  }

  function escapeXml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number(value)));
  }

  function posterGeometry(current) {
    return current.format === "SQ" ? POSTER_GEOMETRIES.square : POSTER_GEOMETRIES.portrait;
  }

  function posterMediaBox(current, geometry = posterGeometry(current)) {
    const usesFullMedia = current.posterLayout !== "module";
    const insetHeight = usesFullMedia
      ? geometry.fullMediaHeight
      : geometry.moduleMediaHeight;
    if (current.mediaBorder !== "bleed") {
      return { x: 40, y: 40, width: 620, height: insetHeight };
    }
    if (usesFullMedia) {
      return { x: 0, y: 0, width: 700, height: geometry.canvasHeight };
    }
    return { x: 0, y: 0, width: 700, height: Math.min(geometry.canvasHeight, insetHeight + 40) };
  }

  function lines(value, maxLines = 3) {
    return String(value)
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, maxLines);
  }

  function fontFace(weight, italic) {
    const faces = FONT_FACES[weight] || FONT_FACES.regular;
    return italic ? faces.italic : faces.roman;
  }

  function svgDataUri(source) {
    const bytes = new TextEncoder().encode(source);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return `data:image/svg+xml;base64,${btoa(binary)}`;
  }

  async function loadLogoAssets() {
    await Promise.all(LOGO_NAMES.map(async (name) => {
      const asset = LOGO_ASSETS[name];
      const response = await fetch(asset.src);
      if (!response.ok) throw new Error(`Falha ao carregar ${asset.label}.`);
      embeddedLogos[name] = svgDataUri(await response.text());
    }));

    // Exported SVG is rasterised through an <img>, which cannot reach the
    // page's fonts. Tera has to travel inside the document or the PNG falls
    // back to Arial.
    const font = await fetch(TERA_FONT_SRC);
    if (font.ok) {
      const bytes = new Uint8Array(await font.arrayBuffer());
      let binary = "";
      bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
      embeddedTeraFont = btoa(binary);
    }
  }

  function teraStyle(current) {
    const feats = [];
    if (current.teraLegR) feats.push("'ss01' 1");
    if (current.teraAccentForm) feats.push(`'${current.teraAccentForm}' 1`);
    return (
      `font-variation-settings:'wght' ${clamp(current.teraWeight, 100, 900)},` +
      `'ACCW' ${clamp(current.teraAccentWidth, 50, 200)},` +
      `'ABAR' ${clamp(current.teraCrossbar, 0, 100)};` +
      `font-feature-settings:${feats.length ? feats.join(",") : "normal"}`
    );
  }

  function teraFontFaceMarkup() {
    if (!embeddedTeraFont) return "";
    return `<style>@font-face{font-family:"Tera";src:url(data:font/ttf;base64,${embeddedTeraFont}) format("truetype-variations");font-weight:100 900;}</style>`;
  }

  // A hidden text node, measured with getBBox, is the only way to size the
  // wordmark honestly: canvas measureText ignores font-variation-settings, and
  // the axes change the advance width considerably.
  let teraRuler = null;

  function measureTera(styleText, probeSize) {
    if (!teraRuler) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("aria-hidden", "true");
      svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;";
      teraRuler = document.createElementNS("http://www.w3.org/2000/svg", "text");
      teraRuler.textContent = "TÉRA";
      svg.append(teraRuler);
      document.body.append(svg);
    }
    teraRuler.setAttribute("font-family", "Tera, Arial, sans-serif");
    teraRuler.setAttribute("font-size", String(probeSize));
    teraRuler.setAttribute("style", styleText);
    const box = teraRuler.getBBox();
    return { width: box.width, height: box.height, top: box.y };
  }

  function teraWordmarkMarkup(current, palette, uid, geometry) {
    const { x, y, width, height } = logoPlacement(current, geometry);
    const styleText = teraStyle(current);

    // No invert filter here. That filter exists for the SVG signatures, whose
    // pixels are baked black and have to be flipped before the difference
    // blend upstream. This wordmark is text: the palette already hands it the
    // right colour, and inverting it would cancel the blend out.
    const probe = 100;
    const ink = measureTera(styleText, probe);
    const size = ink.width > 0
      ? probe * Math.min(width / ink.width, height / ink.height)
      : height * 0.8;
    const scaled = {
      width: (ink.width / probe) * size,
      height: (ink.height / probe) * size,
      top: (ink.top / probe) * size
    };
    const baseline = y + (height - scaled.height) / 2 - scaled.top;
    const cx = x + width / 2;

    return `
      <g data-logo-blend="${current.logoBlend === "difference" ? "difference" : "normal"}">
        <text x="${cx}" y="${baseline}" text-anchor="middle" fill="${palette.text}"
              font-family="Tera, Arial, sans-serif" font-size="${size.toFixed(2)}"
              style="${styleText}">TÉRA</text>
      </g>
    `;
  }

  function logoMarkup(current, palette, uid, geometry) {
    if (current.logoSource === "font") return teraWordmarkMarkup(current, palette, uid, geometry);
    const name = LOGO_NAMES.includes(current.logoVariant) ? current.logoVariant : DEFAULT_STATE.logoVariant;
    const asset = LOGO_ASSETS[name];
    const source = embeddedLogos[name] || asset.src;
    const placement = logoPlacement(current, geometry);
    const { x, y, width, height } = placement;
    const filterId = `logo-invert-${uid}`;
    const usesPixelDifference = current.logoBlend === "difference";
    const filter = palette.text === "#ffffff" || usesPixelDifference ? ` filter="url(#${filterId})"` : "";
    const blendMode = usesPixelDifference ? "difference" : "normal";

    return `
      <defs>
        <filter id="${filterId}" color-interpolation-filters="sRGB">
          <feColorMatrix values="-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0"/>
        </filter>
      </defs>
      <g data-logo-blend="${blendMode}">
        <svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${asset.crop.join(" ")}" preserveAspectRatio="xMidYMid meet">
          <image href="${source}" x="0" y="0" width="${asset.viewBox[0]}" height="${asset.viewBox[1]}" preserveAspectRatio="none"${filter}/>
        </svg>
      </g>
    `;
  }

  // Each slider moves its anchor by a fixed number of units per step, so one
  // measurement is enough to solve for the value that lands on the module
  // line. The sliders themselves stay free -- this only runs when a layout is
  // applied, which is the whole point of the layouts.
  const SNAP_RATES = Object.freeze({ logoY: 1, subtitleY: 4.4, infoY: 2.6 });

  function snapTypeToModule() {
    const svg = document.getElementById("posterPreview");
    if (!svg) return;
    renderPoster();
    const anchors = [
      ["logoY", () => {
        const el = svg.querySelector('text[font-family^="Tera"], [data-logo-blend] svg');
        return el ? el.getBBox().y : null;
      }],
      ["subtitleY", () => {
        const el = [...svg.querySelectorAll("text")]
          .find((t) => t.textContent === (state.subtitle || ""));
        return el ? Number(el.getAttribute("y")) : null;
      }],
      ["infoY", () => {
        const first = (state.info1 || "").split(String.fromCharCode(10))[0].trim();
        const el = [...svg.querySelectorAll("text")].find((t) => {
          const span = t.querySelector("tspan");
          return span && span.textContent.trim() === first;
        });
        return el ? Number(el.getAttribute("y")) : null;
      }]
    ];
    for (const [key, read] of anchors) {
      const value = read();
      if (value === null || !Number.isFinite(value)) continue;
      const residual = value - Math.round(value / TYPE_MODULE) * TYPE_MODULE;
      const next = clamp(state[key] - residual / SNAP_RATES[key], 0, 100);
      state = { ...state, [key]: Math.round(next * 10) / 10 };
      renderPoster();
    }
  }

  function logoPlacement(current, geometry) {
    const centered = current.posterLayout === "mask" || current.posterLayout === "solid";
    const mediaBox = posterMediaBox(current, geometry);
    const scale = clamp(current.titleScale, 50, 200) / 100;
    const width = (centered ? 560 : 620) * scale;
    const height = geometry.logoHeight * scale;
    const x = (700 - width) / 2 + (clamp(current.logoX, 0, 100) - 50) * 1.6;
    const y = centered
      ? mediaBox.y + (mediaBox.height - height) / 2
        + (clamp(current.logoY, 0, 100) - 50) * geometry.logoPositionRange
      : geometry.logoY + (geometry.logoHeight - height) / 2
        + (clamp(current.logoY, 0, 100) - 50) * geometry.logoPositionRange;
    return { x, y, width, height };
  }

  function logoMaskMarkup(current, palette, uid, geometry) {
    const name = LOGO_NAMES.includes(current.logoVariant) ? current.logoVariant : DEFAULT_STATE.logoVariant;
    const asset = LOGO_ASSETS[name];
    const source = embeddedLogos[name] || asset.src;
    const { x, y, width, height } = logoPlacement(current, geometry);
    const maskId = `logo-media-mask-${uid}`;

    return `
      <defs>
        <mask id="${maskId}" x="0" y="0" width="700" height="${geometry.canvasHeight}" maskUnits="userSpaceOnUse" mask-type="luminance">
          <rect width="700" height="${geometry.canvasHeight}" fill="#ffffff"/>
          <svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="${asset.crop.join(" ")}" preserveAspectRatio="xMidYMid meet">
            <image href="${source}" x="0" y="0" width="${asset.viewBox[0]}" height="${asset.viewBox[1]}" preserveAspectRatio="none"/>
          </svg>
        </mask>
      </defs>
      <rect data-logo-mask="media" width="700" height="${geometry.canvasHeight}" fill="${palette.background}" mask="url(#${maskId})"/>
    `;
  }

  function textBlock(value, x, y, color, family, fontSize = 16, lineHeight = 20, anchor = "start") {
    const content = lines(value);
    const tspans = content
      .map((line, index) => `<tspan x="${x}" y="${y + index * lineHeight}">${escapeXml(line)}</tspan>`)
      .join("");

    return `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-family="${family}, Arial, sans-serif" font-size="${fontSize}">${tspans}</text>`;
  }

  function moduleMarkup(current, palette, mediaBox) {
    const moduleRatio = Math.min(1, mediaBox.height / 560, mediaBox.width / 620);
    const x = mediaBox.x + (clamp(current.moduleX, 10, 90) / 100) * mediaBox.width;
    const y = mediaBox.y + (clamp(current.moduleY, 10, 90) / 100) * mediaBox.height;
    const scale = clamp(current.moduleScale, 40, 200) / 100;
    const r = 252 * moduleRatio * scale;

    if (current.module === "portal") {
      const width = 370 * moduleRatio * scale;
      const height = 510 * moduleRatio * scale;
      return `
        <rect x="${x - width / 2}" y="${y - height / 2}" width="${width}" height="${height}" rx="${width / 2}" fill="${palette.cutout}"/>
        <rect x="${x - 31 * moduleRatio * scale}" y="${y - 122 * moduleRatio * scale}" width="${62 * moduleRatio * scale}" height="${244 * moduleRatio * scale}" fill="${palette.block}"/>
      `;
    }

    if (current.module === "fold") {
      const fold = 92 * moduleRatio * scale;
      return `
        <circle cx="${x}" cy="${y}" r="${r}" fill="${palette.cutout}"/>
        <polygon points="${x + r - fold},${y - r} ${x + r},${y - r} ${x + r},${y - r + fold}" fill="${palette.accent}"/>
        <path d="M ${x + r - fold} ${y - r} L ${x + r} ${y - r + fold}" stroke="${palette.block}" stroke-width="6"/>
      `;
    }

    if (current.module === "beam") {
      const beamWidth = 72 * moduleRatio * scale;
      return `
        <circle cx="${x}" cy="${y}" r="${r}" fill="${palette.cutout}"/>
        <rect x="${x - beamWidth / 2}" y="${y - r}" width="${beamWidth}" height="${r * 2}" fill="${palette.accent}"/>
      `;
    }

    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${palette.cutout}"/>`;
  }

  function gridMarkup(palette, geometry) {
    const gridBottom = geometry.canvasHeight - 40;
    const gridHeight = gridBottom - 40;
    const verticals = [40, 246.67, 453.33, 660]
      .map((x) => `<line x1="${x}" y1="40" x2="${x}" y2="${gridBottom}"/>`)
      .join("");
    const horizontals = Array.from(
      { length: geometry.gridRows + 1 },
      (_, index) => 40 + index * (gridHeight / geometry.gridRows)
    )
      .map((y) => `<line x1="40" y1="${y}" x2="660" y2="${y}"/>`)
      .join("");

    return `<g data-grid="visible" fill="none" stroke="${palette.accent}" stroke-width="1" opacity="0.48" pointer-events="none">${verticals}${horizontals}</g>`;
  }

  function posterSurfaceMarkup(current, palette, uid, geometry) {
    const isLiveVideo = current.mediaType === "video" && uid === "preview";
    const mediaBox = posterMediaBox(current, geometry);
    const mediaRight = mediaBox.x + mediaBox.width;
    const mediaBottom = mediaBox.y + mediaBox.height;
    const defaultMediaSource = uid === "export" && bundledMediaDataUrl
      ? bundledMediaDataUrl
      : DEFAULT_MEDIA_PATH;
    const mediaSource = current.mediaType === "image"
      ? current.mediaUrl
      : current.mediaType === "video"
        ? current.mediaFrame
        : defaultMediaSource;
    const background = isLiveVideo
      ? `<path d="M0 0H700V${geometry.canvasHeight}H0Z M${mediaBox.x} ${mediaBox.y}H${mediaRight}V${mediaBottom}H${mediaBox.x}Z" fill="${palette.background}" fill-rule="evenodd"/>`
      : `<rect width="700" height="${geometry.canvasHeight}" fill="${palette.background}"/>`;
    const emptyBlock = isLiveVideo
      ? ""
      : `<rect x="${mediaBox.x}" y="${mediaBox.y}" width="${mediaBox.width}" height="${mediaBox.height}" fill="${palette.block}"/>`;
    const mediaFilter = current.mediaTreatment === "color" ? "" : ` filter="url(#media-mono-${uid})"`;
    const mediaBlock = mediaSource
      ? `<image href="${mediaSource}" x="${mediaBox.x}" y="${mediaBox.y}" width="${mediaBox.width}" height="${mediaBox.height}" preserveAspectRatio="xMidYMid slice"${mediaFilter}/>`
      : emptyBlock;

    return `${background}${mediaBlock}`;
  }

  function posterMarkup(current, uid) {
    const palette = PALETTES[current.palette] || PALETTES.paper;
    const geometry = posterGeometry(current);
    const mediaBox = posterMediaBox(current, geometry);
    const overlayPalette = current.contentTreatment === "invert"
      ? {
          ...palette,
          block: palette.cutout,
          text: palette.background,
          accent: palette.cutout,
          cutout: palette.block
        }
      : palette;
    const subtitle = escapeXml(current.subtitle || " ");
    const textFace = fontFace(current.textWeight, current.textItalic);
    // The subtitle starts centred under the wordmark rather than at a fixed
    // height, so it follows the logo's scale and position instead of drifting
    // away from it. The two offsets then move it from there.
    const subtitleAnchor = logoPlacement(current, geometry);
    // The gap rides the scaled body size, so the spacing stays proportional
    // instead of collapsing as the line grows.
    const subtitleSize =
      geometry.subtitleSize * (clamp(current.subtitleScale, 50, 200) / 100);
    const subtitleHome = {
      x: subtitleAnchor.x + subtitleAnchor.width / 2,
      y: subtitleAnchor.y + subtitleAnchor.height + subtitleSize * 1.5
    };
    // Free-running: the five layouts are the ones tuned to the module grid,
    // and the sliders exist precisely to move off it by hand afterwards.
    const infoTop = geometry.infoY + (clamp(current.infoY, 0, 100) - 50) * 2.6;
    const subtitlePos = {
      x: subtitleHome.x + (clamp(current.subtitleX, 0, 100) - 50) * 6.2,
      y: subtitleHome.y + (clamp(current.subtitleY, 0, 100) - 50) * 4.4
    };
    const clipId = `block-clip-${uid}`;
    const usesPixelDifference = current.logoBlend === "difference";
    const typographyPalette = usesPixelDifference
      ? { ...overlayPalette, text: "#ffffff", accent: "#ffffff" }
      : overlayPalette;
    const typographyBlend = usesPixelDifference
      ? ` data-pixel-blend="difference" style="mix-blend-mode:difference"`
      : ` data-pixel-blend="normal"`;

    return `
      ${posterSurfaceMarkup(current, palette, uid, geometry)}
      <defs>
        <clipPath id="${clipId}"><rect x="${mediaBox.x}" y="${mediaBox.y}" width="${mediaBox.width}" height="${mediaBox.height}"/></clipPath>
        <filter id="media-mono-${uid}" color-interpolation-filters="sRGB">
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.12" intercept="-0.06"/>
            <feFuncG type="linear" slope="1.12" intercept="-0.06"/>
            <feFuncB type="linear" slope="1.12" intercept="-0.06"/>
          </feComponentTransfer>
        </filter>
      </defs>
      ${current.showModuleShapes ? `<g data-module-shapes="visible" clip-path="url(#${clipId})">${moduleMarkup(current, overlayPalette, mediaBox)}</g>` : ""}
      ${current.posterLayout === "mask" ? logoMaskMarkup(current, palette, uid, geometry) : ""}
      <g${typographyBlend}>
        ${current.posterLayout === "mask" ? "" : logoMarkup(current, typographyPalette, uid, geometry)}
        ${current.showSubtitle ? `<text x="${subtitlePos.x}" y="${subtitlePos.y}" text-anchor="middle" fill="${typographyPalette.text}" font-family="${textFace}, Arial, sans-serif" font-size="${subtitleSize.toFixed(1)}">${subtitle}</text>` : ""}
        ${textBlock(current.info1, 40, infoTop, typographyPalette.text, textFace, geometry.infoSize, geometry.infoLineHeight)}
        ${textBlock(current.info2, 270, infoTop, typographyPalette.text, textFace, geometry.infoSize, geometry.infoLineHeight)}
        ${textBlock(current.info3, 490, infoTop, typographyPalette.text, textFace, geometry.infoSize, geometry.infoLineHeight)}
      </g>
      ${current.showGrid ? gridMarkup(overlayPalette, geometry) : ""}
    `;
  }

  function posterDocument(current, uid = "export") {
    const geometry = posterGeometry(current);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${EXPORT_WIDTH}" height="${geometry.exportHeight}" viewBox="0 0 700 ${geometry.canvasHeight}" role="img" aria-label="Pôster ${escapeXml(current.title)}">${posterMarkup(current, uid)}</svg>`;
  }

  function renderPoster() {
    const geometry = posterGeometry(state);
    const mediaBox = posterMediaBox(state, geometry);
    posterPreview.setAttribute("viewBox", `0 0 700 ${geometry.canvasHeight}`);
    posterShell.style.setProperty("--poster-ratio", `700 / ${geometry.canvasHeight}`);
    posterShell.style.setProperty("--media-top", `${(mediaBox.y / geometry.canvasHeight) * 100}%`);
    posterShell.style.setProperty("--media-left", `${(mediaBox.x / 700) * 100}%`);
    posterShell.style.setProperty("--media-width", `${(mediaBox.width / 700) * 100}%`);
    posterShell.style.setProperty("--media-height", `${(mediaBox.height / geometry.canvasHeight) * 100}%`);
    posterPreview.innerHTML = posterMarkup(state, "preview");
    posterPreview.setAttribute("aria-label", `Pôster com logo ${LOGO_ASSETS[state.logoVariant].label}`);
    formatLabel.textContent = `${state.format} / ${FORMATS[state.format]}`;
    syncVideoPreview();
  }

  function syncVideoPreview() {
    const shouldShow = state.mediaType === "video" && Boolean(state.mediaUrl);
    videoPreview.hidden = !shouldShow;
    if (!shouldShow) {
      videoPreview.pause();
      videoPreview.removeAttribute("src");
      videoPreview.load();
    } else if (videoPreview.src !== state.mediaUrl) {
      videoPreview.src = state.mediaUrl;
      videoPreview.play().catch(() => {});
    }
    mediaName.textContent = state.mediaName || "IMAGEM DE REFERÊNCIA";
    videoPreview.dataset.treatment = state.mediaTreatment;
    videoPreview.dataset.layout = state.posterLayout;
    removeMediaButton.hidden = !state.mediaType;
  }

  function captureVideoFrame() {
    if (state.mediaType !== "video" || videoPreview.readyState < 2) return "";
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, videoPreview.videoWidth);
    canvas.height = Math.max(1, videoPreview.videoHeight);
    const context = canvas.getContext("2d");
    context.drawImage(videoPreview, 0, 0, canvas.width, canvas.height);
    state.mediaFrame = canvas.toDataURL("image/jpeg", 0.9);
    return state.mediaFrame;
  }

  function releaseMedia() {
    if (state.mediaType === "video" && state.mediaUrl.startsWith("blob:")) {
      URL.revokeObjectURL(state.mediaUrl);
    }
    state.mediaPreset = "sand";
    applyBundledMediaState(state);
    currentMediaFile = null;
    mediaInput.value = "";
  }

  function readImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }

  async function loadBundledMedia() {
    const response = await fetch(DEFAULT_MEDIA_PATH);
    if (!response.ok) throw new Error("Não foi possível carregar a imagem de referência.");
    bundledMediaDataUrl = await readImage(await response.blob());
  }

  async function loadMedia(file) {
    if (!file) return;
    releaseMedia();
    if (file.type.startsWith("image/")) {
      state.mediaType = "image";
      state.mediaUrl = await readImage(file);
    } else if (file.type.startsWith("video/")) {
      state.mediaType = "video";
      state.mediaUrl = URL.createObjectURL(file);
    } else {
      showStatus("Use um arquivo de imagem ou vídeo.");
      return;
    }
    currentMediaFile = file;
    state.mediaPreset = "custom";
    state.mediaName = file.name;
    commit("Mídia carregada no módulo.");
  }

  function loadBundledMediaPreset(name) {
    if (!BUNDLED_MEDIA[name]) return;
    releaseMedia();
    state.mediaPreset = name;
    applyBundledMediaState(state);
    commit(`${BUNDLED_MEDIA[name].label} selecionado.`);
  }

  function currentVariations() {
    return variationRecipes.map((recipe, index) => ({
      ...state,
      ...recipe,
      showGrid: false,
      moduleX: clamp(recipe.moduleX + ((variationNonce + index) % 3 - 1) * 7, 12, 88),
      moduleY: clamp(recipe.moduleY + ((variationNonce + index * 2) % 3 - 1) * 6, 12, 88)
    }));
  }

  function renderVariations() {
    variationList.replaceChildren();
    currentVariations().forEach((variationState, index) => {
      const geometry = posterGeometry(variationState);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "variation";
      button.setAttribute("aria-label", `Aplicar variação ${index + 1}`);
      button.innerHTML = `<svg viewBox="0 0 700 ${geometry.canvasHeight}" aria-hidden="true">${posterMarkup(variationState, `variation-${variationNonce}-${index}`)}</svg>`;
      button.addEventListener("click", () => {
        state = { ...state, ...variationRecipes[index], showGrid: false };
        syncControls();
        commit("Variação aplicada.");
        button.setAttribute("aria-current", "true");
      });
      variationList.append(button);
    });
  }

  function renderLogoOptions() {
    const control = document.querySelector("#logoControl");
    control.replaceChildren();
    LOGO_NAMES.forEach((name) => {
      const asset = LOGO_ASSETS[name];
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.logo = name;
      button.setAttribute("aria-label", `Usar logo ${asset.label}`);
      const preview = document.createElement("img");
      preview.src = embeddedLogos[name] || asset.src;
      preview.alt = "";
      preview.setAttribute("aria-hidden", "true");
      const label = document.createElement("b");
      label.textContent = asset.shortLabel;
      button.append(preview, label);
      control.append(button);
    });
  }

  function syncControls() {
    document.querySelectorAll("[data-bind]").forEach((input) => {
      input.value = state[input.dataset.bind] ?? "";
    });

    document.querySelectorAll("[data-bind-number]").forEach((input) => {
      const key = input.dataset.bindNumber;
      input.value = state[key];
      const output = document.querySelector(`[data-output="${key}"]`);
      if (output) output.value = `${state[key]}${input.dataset.unit ?? "%"}`;
    });

    document.querySelectorAll("[data-bind-checked]").forEach((input) => {
      input.checked = Boolean(state[input.dataset.bindChecked]);
    });

    document.querySelectorAll("[data-format]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.format === state.format));
    });

    document.querySelectorAll("[data-module]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.module === state.module));
    });

    document.querySelectorAll("[data-module-shapes]").forEach((button) => {
      const enabled = button.dataset.moduleShapes === "on";
      button.setAttribute("aria-pressed", String(enabled === state.showModuleShapes));
    });

    document.querySelectorAll("[data-media-treatment]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.mediaTreatment === state.mediaTreatment));
    });

    document.querySelectorAll("[data-media-border]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.mediaBorder === state.mediaBorder));
    });

    const usingFont = state.logoSource === "font";
    document.querySelectorAll("[data-tera-axes]").forEach((node) => {
      node.hidden = !usingFont;
    });
    const logoGrid = document.getElementById("logoControl");
    if (logoGrid) logoGrid.hidden = usingFont;

    document.querySelectorAll("[data-type-layout]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.typeLayout === state.typeLayout));
    });

    document.querySelectorAll("[data-logo-blend]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.logoBlend === state.logoBlend));
    });

    document.querySelectorAll("[data-media-preset]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.mediaPreset === state.mediaPreset));
    });

    document.querySelectorAll("[data-poster-layout]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.posterLayout === state.posterLayout));
    });

    document.querySelectorAll("[data-content-treatment]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.contentTreatment === state.contentTreatment));
    });

    document.querySelectorAll("[data-palette]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.palette === state.palette));
    });

    document.querySelectorAll("[data-type-layout]").forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.dataset.typeLayout;
        const layout = TYPE_LAYOUTS[name];
        if (!layout) return;
        state = { ...state, ...layout.values, typeLayout: name };
        snapTypeToModule();
        syncControls();
        commit(`Layout ${layout.label} aplicado.`);
      });
    });

    document.querySelectorAll("[data-logo]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.logo === state.logoVariant));
    });
  }

  function commit(message = "") {
    renderPoster();
    renderVariations();
    saveState();
    if (message) showStatus(message);
  }

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function randomBetween(min, max, step = 1) {
    const steps = Math.floor((max - min) / step);
    return min + Math.floor(Math.random() * (steps + 1)) * step;
  }

  function randomizePoster() {
    state = {
      ...state,
      module: randomItem(MODULES),
      palette: randomItem(PALETTE_NAMES),
      moduleScale: randomBetween(72, 132, 4),
      moduleX: randomBetween(24, 76, 4),
      moduleY: randomBetween(26, 72, 4),
      textWeight: randomItem(FONT_WEIGHTS),
      textItalic: Math.random() > 0.82,
      showGrid: false
    };
    variationNonce += 1;
    syncControls();
    commit("Nova composição gerada.");
  }

  function resetPoster() {
    releaseMedia();
    state = { ...DEFAULT_STATE };
    variationNonce = 0;
    syncControls();
    commit("Novo pôster criado.");
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function safeFilename() {
    const base = (state.title || "poster")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
    return base || "poster";
  }

  function exportSvg() {
    captureVideoFrame();
    const svg = posterDocument({ ...state, showGrid: false });
    downloadBlob(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), `${safeFilename()}-${state.format.toLowerCase()}.svg`);
    closeExportMenu();
    showStatus("SVG exportado.");
  }

  async function exportPng() {
    captureVideoFrame();
    const geometry = posterGeometry(state);
    const svg = posterDocument({ ...state, showGrid: false });
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { alpha: false });
      canvas.width = EXPORT_WIDTH;
      canvas.height = geometry.exportHeight;
      context.drawImage(image, 0, 0, EXPORT_WIDTH, geometry.exportHeight);
      canvas.toBlob((pngBlob) => {
        if (!pngBlob) {
          showStatus("Falha ao gerar PNG.");
          return;
        }
        downloadBlob(pngBlob, `${safeFilename()}-${state.format.toLowerCase()}.png`);
        showStatus("PNG exportado.");
      }, "image/png");
      URL.revokeObjectURL(url);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      showStatus("Falha ao preparar a imagem.");
    };

    image.src = url;
    closeExportMenu();
  }

  function showStatus(message) {
    window.clearTimeout(toastTimer);
    statusElement.textContent = message;
    statusElement.classList.add("is-visible");
    toastTimer = window.setTimeout(() => statusElement.classList.remove("is-visible"), 2200);
  }

  function closeExportMenu() {
    exportMenu.hidden = true;
    exportToggle.setAttribute("aria-expanded", "false");
  }

  function toggleExportMenu() {
    const nextOpen = exportMenu.hidden;
    exportMenu.hidden = !nextOpen;
    exportToggle.setAttribute("aria-expanded", String(nextOpen));
    if (nextOpen) exportMenu.querySelector("button")?.focus();
  }

  function wireControls() {
    document.querySelectorAll("[data-bind]").forEach((input) => {
      input.addEventListener("input", () => {
        state = { ...state, [input.dataset.bind]: input.value };
        syncControls();
        commit();
      });
    });

    document.querySelectorAll("[data-bind-number]").forEach((input) => {
      input.addEventListener("input", () => {
        const key = input.dataset.bindNumber;
        state = { ...state, [key]: Number(input.value) };
        syncControls();
        commit();
      });
    });

    document.querySelectorAll("[data-bind-checked]").forEach((input) => {
      input.addEventListener("change", () => {
        state = { ...state, [input.dataset.bindChecked]: input.checked };
        syncControls();
        commit(input.checked ? "Grade ativada." : "Grade desativada.");
      });
    });

    document.querySelectorAll("[data-format]").forEach((button) => {
      button.addEventListener("click", () => {
        state = { ...state, format: button.dataset.format };
        syncControls();
        commit(`Formato ${state.format} selecionado.`);
      });
    });

    document.querySelectorAll("[data-module]").forEach((button) => {
      button.addEventListener("click", () => {
        state = { ...state, module: button.dataset.module };
        syncControls();
        commit("Módulo atualizado.");
      });
    });

    document.querySelectorAll("[data-module-shapes]").forEach((button) => {
      button.addEventListener("click", () => {
        state = { ...state, showModuleShapes: button.dataset.moduleShapes === "on" };
        syncControls();
        commit(state.showModuleShapes ? "Shapes ativados." : "Shapes removidos.");
      });
    });

    document.querySelectorAll("[data-media-treatment]").forEach((button) => {
      button.addEventListener("click", () => {
        state = { ...state, mediaTreatment: button.dataset.mediaTreatment };
        syncControls();
        commit(state.mediaTreatment === "color" ? "Imagem colorida." : "Imagem em preto e branco.");
      });
    });

    document.querySelectorAll("[data-media-border]").forEach((button) => {
      button.addEventListener("click", () => {
        state = { ...state, mediaBorder: button.dataset.mediaBorder };
        syncControls();
        commit(state.mediaBorder === "bleed" ? "Mídia sem borda." : "Borda da mídia ativada.");
      });
    });

    document.querySelectorAll("[data-type-layout]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.typeLayout === state.typeLayout));
    });

    document.querySelectorAll("[data-logo-blend]").forEach((button) => {
      button.addEventListener("click", () => {
        state = { ...state, logoBlend: button.dataset.logoBlend };
        syncControls();
        commit(state.logoBlend === "difference" ? "Logo e textos invertendo os pixels do fundo." : "Logo e textos em composição normal.");
      });
    });

    document.querySelectorAll("[data-media-preset]").forEach((button) => {
      button.addEventListener("click", () => {
        loadBundledMediaPreset(button.dataset.mediaPreset);
        syncControls();
      });
    });

    document.querySelectorAll("[data-poster-layout]").forEach((button) => {
      button.addEventListener("click", () => {
        state = { ...state, posterLayout: button.dataset.posterLayout };
        if (state.posterLayout === "solid") state.logoBlend = "normal";
        syncControls();
        const layoutMessages = {
          module: "Layout modular.",
          full: "Layout de imagem total.",
          mask: "Logo central revelando a mídia como máscara.",
          solid: "Mídia no fundo com logo central sólido."
        };
        commit(layoutMessages[state.posterLayout]);
      });
    });

    document.querySelectorAll("[data-content-treatment]").forEach((button) => {
      button.addEventListener("click", () => {
        state = { ...state, contentTreatment: button.dataset.contentTreatment };
        syncControls();
        commit(state.contentTreatment === "invert" ? "Conteúdo invertido." : "Conteúdo normal.");
      });
    });

    document.querySelectorAll("[data-palette]").forEach((button) => {
      button.addEventListener("click", () => {
        state = { ...state, palette: button.dataset.palette };
        syncControls();
        commit("Paleta aplicada.");
      });
    });

    document.querySelectorAll("[data-type-layout]").forEach((button) => {
      button.addEventListener("click", () => {
        const name = button.dataset.typeLayout;
        const layout = TYPE_LAYOUTS[name];
        if (!layout) return;
        state = { ...state, ...layout.values, typeLayout: name };
        snapTypeToModule();
        syncControls();
        commit(`Layout ${layout.label} aplicado.`);
      });
    });

    document.querySelectorAll("[data-logo]").forEach((button) => {
      button.addEventListener("click", () => {
        const variant = button.dataset.logo;
        // The tagline signatures draw "ESPETÁCULOS MULTIDIMENSIONAIS" into the
        // artwork, so keeping the separate line would set it twice.
        const carriesTagline = Boolean(LOGO_ASSETS[variant]?.hasTagline);
        state = { ...state, logoVariant: variant, showSubtitle: !carriesTagline };
        syncControls();
        commit(carriesTagline
          ? "Assinatura com tagline: subtítulo removido."
          : "Logotipo atualizado.");
      });
    });

    document.querySelectorAll("[data-tab]").forEach((button) => {
      button.addEventListener("click", () => {
        document.body.dataset.mobileTab = button.dataset.tab;
        document.querySelectorAll("[data-tab]").forEach((tab) => {
          tab.setAttribute("aria-selected", String(tab === button));
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    document.querySelector("#newPoster").addEventListener("click", resetPoster);
    document.querySelector("#savePosterTop").addEventListener("click", () => {
      savePosterVersion().catch(() => showStatus("Falha ao salvar a versão."));
    });
    document.querySelector("#savePosterPanel").addEventListener("click", () => {
      savePosterVersion().catch(() => showStatus("Falha ao salvar a versão."));
    });
    document.querySelector("#randomizeTop").addEventListener("click", randomizePoster);
    document.querySelector("#randomizeMobile").addEventListener("click", randomizePoster);
    document.querySelector("#exportMobile").addEventListener("click", exportPng);
    document.querySelector("#refreshVariations").addEventListener("click", () => {
      variationNonce += 1;
      renderVariations();
      showStatus("Variações atualizadas.");
    });

    mediaInput.addEventListener("change", () => {
      loadMedia(mediaInput.files?.[0]).catch(() => showStatus("Falha ao carregar a mídia."));
    });
    removeMediaButton.addEventListener("click", () => {
      releaseMedia();
      commit("Mídia removida.");
    });
    videoPreview.addEventListener("loadeddata", () => {
      captureVideoFrame();
      renderVariations();
    });
    savedList.addEventListener("click", (event) => {
      const openButton = event.target.closest("[data-saved-open]");
      const deleteButton = event.target.closest("[data-saved-delete]");
      if (openButton) {
        loadPosterVersion(openButton.dataset.savedOpen).catch(() => showStatus("Falha ao abrir a versão."));
      } else if (deleteButton) {
        removePosterVersion(deleteButton.dataset.savedDelete).catch(() => showStatus("Falha ao apagar a versão."));
      }
    });

    exportToggle.addEventListener("click", toggleExportMenu);
    exportMenu.querySelector('[data-export="png"]').addEventListener("click", exportPng);
    exportMenu.querySelector('[data-export="svg"]').addEventListener("click", exportSvg);

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".export-control")) closeExportMenu();
    });

    document.addEventListener("keydown", (event) => {
      const isEditing = event.target.matches("input, select, textarea");
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        exportSvg();
      } else if (!isEditing && event.key.toLowerCase() === "r") {
        randomizePoster();
      } else if (!isEditing && event.key.toLowerCase() === "g") {
        state = { ...state, showGrid: !state.showGrid };
        syncControls();
        commit(state.showGrid ? "Grade ativada." : "Grade desativada.");
      } else if (event.key === "Escape") {
        closeExportMenu();
      }
    });
  }

  async function initialize() {
    await Promise.all([loadLogoAssets(), loadBundledMedia()]);
    renderLogoOptions();
    await renderSavedPosters();
    syncControls();
    renderPoster();
    renderVariations();
    wireControls();
  }

  initialize().catch((error) => {
    console.error(error);
    showStatus("Não foi possível carregar os logotipos.");
  });
})();

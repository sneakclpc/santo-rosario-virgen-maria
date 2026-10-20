/* =========================================================
   Santo Rosario — lógica de la app
   ========================================================= */
(function () {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const $ = (sel, root = document) => root.querySelector(sel);

  const OPCIONES = [
    { grupo: "Al comenzar", items: [
      { id: "apertura", label: "Señor, ábreme los labios", def: false },
      { id: "contricion", label: "Acto de contrición", def: true },
      { id: "credo", label: "Credo", def: true },
    ]},
    { grupo: "En cada misterio", items: [
      { id: "meditaciones", label: "Meditación y cita bíblica", def: true },
      { id: "fatima", label: "Oración de Fátima", def: true },
      { id: "jaculatoria", label: "Jaculatoria «María, Madre de gracia»", def: false },
    ]},
    { grupo: "Al terminar", items: [
      { id: "papa", label: "Por las intenciones del Papa", def: true },
      { id: "salve", label: "Salve", def: true },
      { id: "letanias", label: "Letanías Lauretanas", def: true },
      { id: "bajoTuAmparo", label: "Bajo tu amparo", def: false },
      { id: "senoraMia", label: "Consagración «Oh Señora mía»", def: false },
      { id: "acordaos", label: "Acordaos", def: false },
      { id: "benditaPureza", label: "Bendita sea tu pureza", def: false },
      { id: "sanMiguel", label: "Oración a San Miguel", def: false },
      { id: "oracionFinal", label: "Oración final del Rosario", def: true },
    ]},
    { grupo: "Rezar con otros o en el carro", items: [
      { id: "guia", label: "Modo guía y respuesta: una parte la dice quien guía y la otra la responden todos", def: false },
    ]},
    { grupo: "Escuchar en voz alta", id: "grupoVoz", items: [
      { id: "audio", label: "Leer las oraciones en voz alta", def: false },
      { id: "autoAvance", label: "Avanzar solo al terminar cada oración (manos libres)", def: true },
    ]},
    { grupo: "Pantalla", id: "grupoPantalla", items: [
      { id: "noche", label: "Modo noche (colores suaves y oscuros)", def: false },
    ]},
    { grupo: "Texto del Padre Nuestro", items: [
      { id: "latam", label: "«No nos dejes caer en tentación» (uso de Latinoamérica). Apagado: «en la tentación», como el Compendio del Catecismo", def: false },
    ]},
  ];

  // Oraciones finales opcionales, en el orden en que se rezan
  const FINALES = ["bajoTuAmparo", "senoraMia", "acordaos", "benditaPureza", "sanMiguel", "oracionFinal"];

  const LETRAS = [
    { valor: 1, nombre: "Normal" },
    { valor: 1.15, nombre: "Grande" },
    { valor: 1.3, nombre: "Muy grande" },
    { valor: 1.5, nombre: "Enorme" },
  ];

  /* Libros bíblicos → página del texto de la Biblia de Navarra publicado por EWTN */
  const LIBROS = {
    Mt: { url: "54-mateo", nombre: "Mateo" },
    Mc: { url: "53-marcos", nombre: "Marcos" },
    Lc: { url: "51-lucas", nombre: "Lucas" },
    Jn: { url: "43-juan", nombre: "Juan" },
    Hch: { url: "20-hechos", nombre: "Hechos de los Apóstoles" },
    Ap: { url: "64-apocalipsis", nombre: "Apocalipsis" },
  };

  function partesCita(ref) {
    return ref.split(";").map((r) => {
      const m = r.trim().match(/^(\S+)\s+(\d+),\s*([\d-]+)$/);
      if (!m || !LIBROS[m[1]]) return null;
      return { libro: LIBROS[m[1]], cap: m[2], vers: m[3], texto: r.trim() };
    }).filter(Boolean);
  }

  function citaHablada(ref) {
    return partesCita(ref).map((p) =>
      `${p.libro.nombre}, capítulo ${p.cap}, ` +
      (p.vers.includes("-") ? `versículos ${p.vers.replace("-", " al ")}` : `versículo ${p.vers}`)
    ).join("; y ");
  }

  const ADJ = { gozosos: "Gozoso", luminosos: "Luminoso", dolorosos: "Doloroso", gloriosos: "Glorioso" };
  const COMPLETO = ["gozosos", "luminosos", "dolorosos", "gloriosos"];
  const CLAVES_MISTERIOS = Object.keys(MISTERIOS).concat("completo");

  /* ---------- almacenamiento seguro ---------- */
  const store = {
    get(k) {
      try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; }
    },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* nada */ } },
  };

  const hoy = new Date();
  const misterioDelDia = MISTERIOS_POR_DIA[hoy.getDay()];

  const PREDETERMINADA = Object.assign(
    { misterios: misterioDelDia, intencion: "", voz: "", velocidad: 0.95, letra: 1 },
    Object.fromEntries(OPCIONES.flatMap((g) => g.items.map((o) => [o.id, o.def])))
  );

  // Solo acepta claves conocidas y del tipo esperado: unos datos guardados
  // dañados o de otra versión nunca deben romper la app.
  function sanear(guardado) {
    const c = Object.assign({}, PREDETERMINADA);
    if (!guardado || typeof guardado !== "object" || Array.isArray(guardado)) return c;
    Object.keys(PREDETERMINADA).forEach((k) => {
      if (Object.prototype.hasOwnProperty.call(guardado, k) && typeof guardado[k] === typeof PREDETERMINADA[k]) {
        c[k] = guardado[k];
      }
    });
    if (!CLAVES_MISTERIOS.includes(c.misterios)) c.misterios = misterioDelDia;
    c.intencion = c.intencion.slice(0, 400);
    c.voz = c.voz.slice(0, 200);
    if (!(c.velocidad >= 0.5 && c.velocidad <= 1.5)) c.velocidad = PREDETERMINADA.velocidad;
    if (!LETRAS.some((l) => l.valor === c.letra)) c.letra = 1;
    return c;
  }

  function leerProgreso() {
    const p = store.get("rosario.progreso");
    if (!p || typeof p !== "object" || typeof p.actual !== "number" || typeof p.fecha !== "number") return null;
    if (!(p.actual > 0) || Date.now() - p.fecha > 1000 * 60 * 60 * 12 || Date.now() < p.fecha) return null;
    return { cfg: sanear(p.cfg), actual: Math.floor(p.actual), etiqueta: typeof p.etiqueta === "string" ? p.etiqueta.slice(0, 120) : "" };
  }

  const config = sanear(store.get("rosario.config"));
  // Al abrir la app se proponen siempre los misterios del día
  config.misterios = misterioDelDia;

  let pasos = [];
  let actual = 0;

  /* =========================================================
     Construcción de la secuencia de oraciones
     ========================================================= */
  function gruposDe(cfg) {
    return cfg.misterios === "completo" ? COMPLETO : [cfg.misterios];
  }

  function nombreRosario(clave) {
    return clave === "completo" ? "Rosario completo" : MISTERIOS[clave].nombre;
  }

  function construirPasos(cfg) {
    const s = [];
    const grupos = gruposDe(cfg);
    let vuelta = 0;
    const add = (o) => s.push(Object.assign({ vuelta }, o));

    add({ cuenta: "cruz", tipo: "intro", fase: "Ofrecimiento" });
    add({ cuenta: "cruz", oracion: "senal", fase: "Inicio" });
    if (cfg.apertura) add({ cuenta: "cruz", oracion: "apertura", fase: "Inicio" });
    if (cfg.contricion) add({ cuenta: "cruz", oracion: "contricion", fase: "Inicio" });
    if (cfg.credo) add({ cuenta: "cruz", oracion: "credo", fase: "Inicio" });
    add({ cuenta: "p1", oracion: "padrenuestro", fase: "Inicio" });
    TRES_AVES.forEach((a, i) =>
      add({
        cuenta: "s" + (i + 1), oracion: "avemaria", fase: "Inicio",
        nota: "Por la virtud de la " + a.virtud, saludo: a.saludo, contador: [i + 1, 3],
      })
    );
    add({ cuenta: "p2", oracion: "gloria", fase: "Inicio" });

    grupos.forEach((grupo, v) => {
      vuelta = v;
      for (let m = 0; m < 5; m++) {
        // En el Rosario completo, cada nueva vuelta empieza en la medalla
        const grande = m === 0 ? (v === 0 ? "p2" : "medalla") : "l" + m;
        const despues = m < 4 ? "l" + (m + 1) : "medalla";
        add({ cuenta: grande, tipo: "misterio", misterio: m, grupo });
        add({ cuenta: grande, oracion: "padrenuestro", misterio: m, grupo });
        for (let k = 0; k < 10; k++) {
          add({ cuenta: `d${m}-${k}`, oracion: "avemaria", misterio: m, grupo, contador: [k + 1, 10] });
        }
        add({ cuenta: despues, oracion: "gloria", misterio: m, grupo, cierre: true });
        if (cfg.fatima) add({ cuenta: despues, oracion: "fatima", misterio: m, grupo, cierre: true });
        if (cfg.jaculatoria) add({ cuenta: despues, oracion: "jaculatoria", misterio: m, grupo, cierre: true });
      }
    });

    if (cfg.papa) {
      const nota = "Por las intenciones del Santo Padre";
      add({ cuenta: "medalla", oracion: "padrenuestro", fase: "Conclusión", nota });
      add({ cuenta: "medalla", oracion: "avemaria", fase: "Conclusión", nota });
      add({ cuenta: "medalla", oracion: "gloria", fase: "Conclusión", nota });
    }
    if (cfg.salve) add({ cuenta: "medalla", oracion: "salve", fase: "Conclusión" });
    if (cfg.letanias) {
      add({ cuenta: "medalla", tipo: "letanias", fase: "Conclusión" });
      add({ cuenta: "medalla", oracion: "oracionLetanias", fase: "Conclusión" });
    }
    FINALES.forEach((id) => { if (cfg[id]) add({ cuenta: "medalla", oracion: id, fase: "Conclusión" }); });
    add({ cuenta: "cruz", oracion: "senalFinal", fase: "Conclusión" });
    add({ cuenta: "cruz", tipo: "fin", fase: "Amén" });
    return s;
  }

  /* =========================================================
     Rosario gráfico (SVG)
     ========================================================= */
  const cuentasSVG = {}; // id -> <g>

  function el(tag, attrs, parent) {
    const n = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }

  function dibujarRosario(svg) {
    svg.textContent = "";
    const W = 400, H = 700;
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    const defs = el("defs", {}, svg);
    const grad = (id, stops, opts = {}) => {
      const g = el("radialGradient", Object.assign({ id, cx: "35%", cy: "30%", r: "75%" }, opts), defs);
      stops.forEach(([o, c]) => el("stop", { offset: o, "stop-color": c }, g));
    };
    grad("perla", [["0%", "#ffffff"], ["55%", "#eef3fb"], ["100%", "#bfcfe6"]]);
    grad("perlaRezada", [["0%", "#ffffff"], ["50%", "#d7e6f7"], ["100%", "#8fb0d8"]]);
    grad("oro", [["0%", "#fffaf0"], ["50%", "#f1dfb0"], ["100%", "#c9a75c"]]);
    grad("oroRezado", [["0%", "#fff8e6"], ["45%", "#ecd08a"], ["100%", "#b38d3a"]]);
    grad("halo", [["0%", "rgba(255,236,170,0.95)"], ["60%", "rgba(255,236,170,0.35)"], ["100%", "rgba(255,236,170,0)"]], { cx: "50%", cy: "50%", r: "50%" });
    // Cuenta en la que se está rezando: rosa, distinta de las perlas y de las cuentas doradas
    grad("actual", [["0%", "#fff7f9"], ["45%", "#f7bfd0"], ["100%", "#d4708f"]]);
    grad("haloActual", [["0%", "rgba(240,150,180,0.85)"], ["55%", "rgba(246,184,204,0.4)"], ["100%", "rgba(246,184,204,0)"]], { cx: "50%", cy: "50%", r: "50%" });
    const lin = el("linearGradient", { id: "cruzOro", x1: "0", y1: "0", x2: "1", y2: "1" }, defs);
    [["0%", "#fff6dc"], ["45%", "#e6c97f"], ["100%", "#b8924a"]].forEach(([o, c]) => el("stop", { offset: o, "stop-color": c }, lin));
    const f = el("filter", { id: "sombra", x: "-50%", y: "-50%", width: "200%", height: "200%" }, defs);
    el("feDropShadow", { dx: "0", dy: "1.2", stdDeviation: "1.2", "flood-color": "#8a7a5a", "flood-opacity": "0.35" }, f);

    const cx = 200, cy = 215, rx = 170, ry = 176;

    // Nuestra Señora de Fátima en el centro del rosario
    el("image", {
      href: "img/virgen-fatima.svg", x: cx - 98, y: cy - 147, width: 196, height: 294,
      class: "virgen", "aria-hidden": "true",
    }, svg);

    // Cadena del círculo
    el("ellipse", { cx, cy, rx, ry, class: "cadena" }, svg);

    // Orden de las cuentas en el círculo, saliendo de la medalla
    const lazo = [];
    for (let m = 0; m < 5; m++) {
      for (let k = 0; k < 10; k++) lazo.push({ id: `d${m}-${k}`, grande: false });
      if (m < 4) lazo.push({ id: "l" + (m + 1), grande: true });
    }
    const peso = (c) => (c.grande ? 1.8 : 1);
    const total = lazo.reduce((a, c) => a + peso(c), 0);
    const hueco = 0.2; // radianes libres alrededor de la medalla
    const rango = Math.PI * 2 - hueco * 2;
    let acc = 0;
    lazo.forEach((c) => {
      const centro = acc + peso(c) / 2;
      acc += peso(c);
      const t = hueco + (centro / total) * rango;
      c.x = cx + rx * Math.sin(t);
      c.y = cy + ry * Math.cos(t);
    });

    // Colgante: cadena vertical
    const medallaY = cy + ry + 20;
    el("line", { x1: cx, y1: medallaY, x2: cx, y2: 604, class: "cadena" }, svg);

    const capa = el("g", {}, svg);
    lazo.forEach((c) => cuenta(capa, c.id, c.x, c.y, c.grande ? 10.5 : 7, c.grande));

    // Colgante (de arriba abajo): p2, s3, s2, s1, p1, cruz
    cuenta(capa, "p2", cx, medallaY + 60, 10.5, true);
    cuenta(capa, "s3", cx, medallaY + 89, 7, false);
    cuenta(capa, "s2", cx, medallaY + 109, 7, false);
    cuenta(capa, "s1", cx, medallaY + 129, 7, false);
    cuenta(capa, "p1", cx, medallaY + 160, 10.5, true);

    medalla(capa, cx, medallaY);
    cruz(capa, cx, 604);
  }

  function hacerBoton(g, id) {
    g.setAttribute("class", "cuenta");
    g.setAttribute("tabindex", "-1");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", tituloCuenta(id));
    g.dataset.id = id;
    g.addEventListener("click", () => irACuenta(id));
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); irACuenta(id); }
    });
    cuentasSVG[id] = g;
  }

  function cuenta(parent, id, x, y, r, grande) {
    const g = el("g", {}, parent);
    hacerBoton(g, id);
    g.classList.add(grande ? "grande" : "pequena");
    el("circle", { cx: x, cy: y, r: r + 12, class: "brillo" }, g);
    el("circle", { cx: x, cy: y, r, class: "perla", filter: "url(#sombra)" }, g);
    el("circle", { cx: x, cy: y, r: r + 5, class: "anillo" }, g);
    el("ellipse", { cx: x - r * 0.32, cy: y - r * 0.38, rx: r * 0.32, ry: r * 0.2, class: "reflejo" }, g);
    el("title", {}, g).textContent = tituloCuenta(id);
  }

  function medalla(parent, x, y) {
    const g = el("g", {}, parent);
    hacerBoton(g, "medalla");
    g.classList.add("medalla");
    // Medalla Milagrosa (anverso), dibujada en img/medalla-milagrosa.svg
    const w = 42, h = 54.6;
    el("ellipse", { cx: x, cy: y, rx: w / 2 + 10, ry: h / 2 + 10, class: "brillo" }, g);
    el("image", { href: "img/medalla-milagrosa.svg", x: x - w / 2, y: y - h / 2, width: w, height: h, filter: "url(#sombra)" }, g);
    el("ellipse", { cx: x, cy: y, rx: w / 2 + 2, ry: h / 2 + 1.5, class: "aro" }, g);
    el("title", {}, g).textContent = tituloCuenta("medalla");
  }

  function cruz(parent, x, top) {
    const g = el("g", {}, parent);
    hacerBoton(g, "cruz");
    g.classList.add("crucifijo");
    const largo = 82, ancho = 52, grosor = 9, brazoY = top + 24;
    el("circle", { cx: x, cy: brazoY, r: 34, class: "brillo" }, g);
    // Rayos de gloria
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const r1 = 15, r2 = i % 2 ? 22 : 27;
      el("line", {
        x1: x + r1 * Math.cos(a), y1: brazoY + r1 * Math.sin(a),
        x2: x + r2 * Math.cos(a), y2: brazoY + r2 * Math.sin(a), class: "rayo",
      }, g);
    }
    const d =
      `M${x - grosor / 2} ${top} h${grosor} v${brazoY - top - grosor / 2} h${ancho / 2 - grosor / 2} v${grosor} ` +
      `h-${ancho / 2 - grosor / 2} v${largo - (brazoY - top) - grosor / 2} h-${grosor} ` +
      `v-${largo - (brazoY - top) - grosor / 2} h-${ancho / 2 - grosor / 2} v-${grosor} h${ancho / 2 - grosor / 2} z`;
    el("path", { d, fill: "url(#cruzOro)", stroke: "#a9853f", "stroke-width": 1, filter: "url(#sombra)", "stroke-linejoin": "round" }, g);
    // Remates redondeados en los extremos
    [[x, top], [x - ancho / 2, brazoY], [x + ancho / 2, brazoY], [x, top + largo]].forEach(([px, py]) =>
      el("circle", { cx: px, cy: py, r: 5.5, fill: "url(#cruzOro)", stroke: "#a9853f", "stroke-width": 1 }, g)
    );
    el("circle", { cx: x, cy: brazoY, r: 3, fill: "#fff6dc", stroke: "#a9853f", "stroke-width": 0.8 }, g);
    el("title", {}, g).textContent = tituloCuenta("cruz");
  }

  function tituloCuenta(id) {
    if (id === "cruz") return "Crucifijo: Señal de la Cruz y Credo";
    if (id === "medalla") return "Medalla Milagrosa: final del quinto misterio y conclusión del Rosario";
    if (id === "p1") return "Padre Nuestro";
    if (/^s\d$/.test(id)) return `Ave María ${id[1]} de 3`;
    if (id === "p2") return "Gloria y primer misterio";
    if (/^l\d$/.test(id)) return `Final del ${ORDINALES[+id[1] - 1].toLowerCase()} misterio y ${ORDINALES[+id[1]].toLowerCase()} misterio`;
    const [m, k] = id.slice(1).split("-").map(Number);
    return `${ORDINALES[m]} misterio, Ave María ${k + 1} de 10`;
  }

  function pintarEstado() {
    const vActual = pasos[actual].vuelta;
    const idActual = pasos[actual].cuenta;
    const hayAntes = new Set();
    const proximaVuelta = {};
    pasos.forEach((p, i) => {
      if (i < actual) hayAntes.add(p.cuenta);
      else if (i > actual && !(p.cuenta in proximaVuelta)) proximaVuelta[p.cuenta] = p.vuelta;
    });
    for (const id in cuentasSVG) {
      const g = cuentasSVG[id];
      const esActual = id === idActual;
      // Rezada: ya se pasó por ella y no vuelve a usarse en esta misma vuelta del Rosario
      const rezada = !esActual && hayAntes.has(id) && proximaVuelta[id] !== vActual;
      g.classList.toggle("actual", esActual);
      g.classList.toggle("rezada", rezada);
      g.setAttribute("tabindex", esActual ? "0" : "-1");
      if (esActual) g.setAttribute("aria-current", "step"); else g.removeAttribute("aria-current");
    }
  }

  /* =========================================================
     Panel de oración
     ========================================================= */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function parrafos(texto) {
    return texto
      .split("\n\n")
      .map((p) => `<p>${p.split("\n").map(esc).join("<br>")}</p>`)
      .join("");
  }

  function nombreMisterio(m, grupo) {
    return `${ORDINALES[m]} Misterio ${ADJ[grupo]}`;
  }

  function textoOracion(clave) {
    const o = ORACIONES[clave];
    return config.latam && o.textoLatam ? o.textoLatam : o.texto;
  }

  // Texto que se reza en el paso: en las tres primeras Avemarías el saludo
  // trinitario se integra en la oración («Dios te salve, María, Hija de Dios Padre, llena eres…»).
  function textoPaso(p) {
    const t = textoOracion(p.oracion);
    if (p.saludo && t.startsWith("Dios te salve, María,")) return p.saludo + "," + t.slice("Dios te salve, María,".length);
    return t;
  }

  function partesGuia(p) {
    const t = textoPaso(p);
    const i = t.indexOf("\n");
    if (!config.guia || !ORACIONES[p.oracion].responde || i < 0) return null;
    return { guia: t.slice(0, i), todos: t.slice(i + 1) };
  }

  function htmlOracion(p) {
    const g = partesGuia(p);
    if (g) {
      return `<div class="oracion modo-guia">
          <p><span class="quien">Guía</span>${esc(g.guia)}</p>
          <p class="todos"><span class="quien">Todos</span>${esc(g.todos)}</p>
        </div>`;
    }
    return `<div class="oracion">${parrafos(textoPaso(p))}</div>`;
  }

  function enlaceBiblia(c) {
    return `<a href="https://www.ewtn.com/es/biblia/${c.libro.url}/${c.cap}" target="_blank" rel="noopener noreferrer">${esc(c.texto)}</a>`;
  }

  function tarjetaMisterio(m, grupo, enAnuncio) {
    const mis = MISTERIOS[grupo].lista[m];
    const cita = mis.cita.texto
      ? `<blockquote class="cita-texto">${parrafos(mis.cita.texto)}</blockquote>`
      : `<p class="sintesis">${esc(mis.sintesis)}</p>`;
    const cuerpo = config.meditaciones
      ? `
        <div class="bloque">
          <h4><span class="icono" aria-hidden="true">✦</span> Lectura bíblica · <span class="ref">${esc(mis.cita.ref)}</span></h4>
          ${cita}
          <p class="fuente">Leer el pasaje completo en la Biblia de Navarra: ${partesCita(mis.cita.ref).map(enlaceBiblia).join(" · ")}</p>
        </div>
        <div class="bloque">
          <h4><span class="icono" aria-hidden="true">✦</span> Meditación</h4>
          <p class="meditacion">${esc(mis.meditacion)}</p>
        </div>`
      : "";
    if (enAnuncio) {
      return `
      <div class="misterio-card abierta">
        <p class="mc-fruto mc-fruto-anuncio">Fruto del misterio: ${esc(mis.fruto)}</p>
        ${cuerpo}
      </div>`;
    }
    return `
      <details class="misterio-card">
        <summary>
          <span class="mc-num">${nombreMisterio(m, grupo)}</span>
          <span class="mc-titulo">${esc(mis.titulo)}</span>
          <span class="mc-fruto">Fruto: ${esc(mis.fruto)}</span>
        </summary>
        ${cuerpo}
      </details>`;
  }

  function puntosDecena(n, total) {
    let h = `<div class="puntos" role="img" aria-label="${n} de ${total}">`;
    for (let i = 1; i <= total; i++) h += `<span class="${i < n ? "hecho" : i === n ? "ahora" : ""}"></span>`;
    return h + "</div>";
  }

  function etiquetaPaso(p) {
    if (p.tipo === "intro") return "Ofrecimiento";
    if (p.tipo === "misterio") return "Anuncio del misterio";
    if (p.tipo === "letanias") return "Letanías Lauretanas";
    if (p.tipo === "fin") return "Amén";
    const o = ORACIONES[p.oracion];
    const partes = [];
    if (p.cierre) partes.push(`Final del ${nombreMisterio(p.misterio, p.grupo)}`);
    else if (p.misterio !== undefined) partes.push(nombreMisterio(p.misterio, p.grupo));
    else if (p.fase) partes.push(p.fase);
    if (p.contador) partes.push(`${o.titulo} ${p.contador[0]} de ${p.contador[1]}`);
    return partes.join(" · ");
  }

  function renderPaso() {
    const p = pasos[actual];
    const panel = $("#contenido");
    let html = "";

    if (p.tipo === "intro") {
      const intencion = config.intencion.trim();
      html = `
        <h2>${esc(nombreRosario(config.misterios))}</h2>
        <p class="lead">Ponte en presencia de Dios, Padre, Hijo y Espíritu Santo, y de la mano de María,
        Madre de Dios y Madre nuestra, ofrece este Santo Rosario.</p>
        ${intencion ? `<div class="intencion"><span>Mi intención</span><p>${esc(intencion)}</p></div>` : ""}
        <p class="ayuda">Toca <strong>Siguiente</strong>, desliza o pulsa una cuenta del rosario para avanzar.</p>`;
    } else if (p.tipo === "misterio") {
      const mis = MISTERIOS[p.grupo].lista[p.misterio];
      html = `
        <p class="anuncio">${nombreMisterio(p.misterio, p.grupo)}</p>
        <h2>${esc(mis.titulo)}</h2>
        ${tarjetaMisterio(p.misterio, p.grupo, true)}`;
    } else if (p.tipo === "letanias") {
      html = `<h2>Letanías de la Santísima Virgen</h2>` + renderLetanias();
    } else if (p.tipo === "fin") {
      html = `
        <img class="fin-virgen" src="img/virgen-fatima.svg" alt="Nuestra Señora de Fátima" width="120" height="180">
        <h2>Bendito sea Dios</h2>
        <p class="lead">Has terminado el Santo Rosario. Que la Virgen María, Madre de Dios,
        presente tus intenciones a su Hijo Jesucristo, y que la gracia de la Santísima Trinidad
        permanezca siempre contigo.</p>
        <p class="jaculatoria-fin">«Ad Iesum per Mariam» — A Jesús por María</p>
        <div class="acciones-fin">
          <button class="btn primario" id="btnOtraVez" type="button">Rezar de nuevo</button>
          <button class="btn suave" id="btnCompartirFin" type="button">Compartir esta app</button>
        </div>`;
    } else {
      const o = ORACIONES[p.oracion];
      html = `
        <h2>${esc(o.titulo)}</h2>
        ${p.nota ? `<p class="nota">${esc(p.nota)}</p>` : ""}
        ${p.contador ? puntosDecena(p.contador[0], p.contador[1]) : ""}
        ${htmlOracion(p)}
        ${p.misterio !== undefined ? tarjetaMisterio(p.misterio, p.grupo, false) : ""}`;
    }

    if (p.cuenta === "medalla" && p.fase === "Conclusión") {
      html += `
        <figure class="medallas">
          <img src="img/medalla-milagrosa.svg" alt="Medalla Milagrosa, anverso" width="200" height="260">
          <img src="img/medalla-reverso.svg" alt="Medalla Milagrosa, reverso" width="200" height="260">
          <figcaption>Medalla Milagrosa · anverso y reverso</figcaption>
        </figure>`;
    }

    const etiqueta = etiquetaPaso(p);
    $("#etiqueta").textContent = etiqueta;
    panel.innerHTML = html;
    panel.classList.remove("entrar");
    void panel.offsetWidth; // reinicia la animación
    panel.classList.add("entrar");
    $(".panel-scroll").scrollTop = 0;
    // En móvil, si el usuario bajó leyendo, vuelve al inicio del texto
    const arriba = $("#panel").getBoundingClientRect().top;
    if (window.matchMedia("(max-width: 860px)").matches && arriba < 0) window.scrollBy({ top: arriba - 8 });

    const otra = $("#btnOtraVez");
    if (otra) otra.addEventListener("click", () => volverAInicio(true));
    const comp = $("#btnCompartirFin");
    if (comp) comp.addEventListener("click", compartir);

    const ultimo = actual === pasos.length - 1;
    $("#btnAnterior").disabled = actual === 0;
    $("#btnSiguiente").textContent = ultimo ? "Terminar" : "Siguiente";
    const pct = Math.round((actual / (pasos.length - 1)) * 100);
    $("#progreso").style.width = pct + "%";
    $("#progreso").parentElement.setAttribute("aria-valuenow", String(pct));

    pintarEstado();
    if (config.audio) leerPasoEnVoz();
    if (ultimo) store.del("rosario.progreso");
    else store.set("rosario.progreso", { cfg: config, actual, fecha: Date.now(), etiqueta });
  }

  function renderLetanias() {
    return `<div class="letanias">` + LETANIAS.map((grupo) => {
      if (!grupo.respuesta) {
        return `<ul class="pares">` + grupo.lineas.map(([v, r]) =>
          `<li><span class="v">${esc(v)}</span><span class="r">${esc(r)}.</span></li>`).join("") + `</ul>`;
      }
      return `<div class="grupo"><p class="respuesta">Respondemos: <em>${esc(grupo.respuesta)}</em>.</p>
        <ul class="invocaciones">${grupo.lineas.map((l) => `<li>${esc(l)}</li>`).join("")}</ul></div>`;
    }).join("") + `</div>`;
  }

  /* =========================================================
     Voz (lectura en voz alta con la voz del dispositivo)
     ========================================================= */
  const voz = {
    disponible: "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
    turno: 0,
    bloqueo: null,

    voces() {
      if (!this.disponible) return [];
      return speechSynthesis.getVoices().filter((v) => /^es([-_]|$)/i.test(v.lang));
    },

    elegida() {
      const vs = this.voces();
      return (
        vs.find((v) => v.name === config.voz) ||
        vs.find((v) => (config.latam ? /es[-_](MX|US|419|VE|CO|AR|CL|PE)/i : /es[-_]ES/i).test(v.lang)) ||
        vs[0] || null
      );
    },

    // Divide en frases: algunos navegadores cortan los textos largos.
    // (Sin «lookbehind» en la expresión: Safari anterior a 16.4 no lo entiende.)
    trozos(texto) {
      return texto
        .replace(/^[VR]\.\s*/gm, "")
        .replace(/[«»]/g, "")
        .replace(/([.;:!?])\s+/g, "$1\n")
        .split(/\n+/)
        .map((t) => t.trim())
        .filter(Boolean);
    },

    // segmentos: textos que se leen y números que son pausas en milisegundos
    hablar(segmentos, alTerminar) {
      if (!this.disponible) return;
      this.parar();
      const mio = ++this.turno;
      const cola = [];
      [].concat(segmentos).forEach((s) => {
        if (typeof s === "number") cola.push(s);
        else this.trozos(s).forEach((t) => cola.push(t));
      });
      const vozElegida = this.elegida();
      let i = 0;
      const siguienteTrozo = () => {
        if (mio !== this.turno) return;
        if (i >= cola.length) { if (alTerminar) alTerminar(); return; }
        const item = cola[i++];
        if (typeof item === "number") { setTimeout(siguienteTrozo, item); return; }
        const u = new SpeechSynthesisUtterance(item);
        if (vozElegida) u.voice = vozElegida;
        u.lang = vozElegida ? vozElegida.lang : config.latam ? "es-MX" : "es-ES";
        u.rate = Number(config.velocidad) || 1;
        u.onend = () => setTimeout(siguienteTrozo, 180);
        u.onerror = () => { if (mio === this.turno) setTimeout(siguienteTrozo, 180); };
        speechSynthesis.speak(u);
      };
      siguienteTrozo();
    },

    parar() {
      this.turno++;
      if (this.disponible) speechSynthesis.cancel();
    },

    async mantenerPantalla(activo) {
      try {
        if (activo && "wakeLock" in navigator && !this.bloqueo) {
          this.bloqueo = await navigator.wakeLock.request("screen");
          this.bloqueo.addEventListener("release", () => (this.bloqueo = null));
        } else if (!activo && this.bloqueo) {
          await this.bloqueo.release();
          this.bloqueo = null;
        }
      } catch (e) { /* el navegador no lo permite */ }
    },
  };

  // Tiempo para que la persona responda en voz alta en el modo guía
  function pausaPara(texto) {
    const palabras = texto.split(/\s+/).filter(Boolean).length;
    return Math.round((palabras * 430) / (Number(config.velocidad) || 1) + 700);
  }

  function textoHablado(p) {
    if (p.tipo === "intro") {
      const intencion = config.intencion.trim();
      return [`${nombreRosario(config.misterios)}. Ponte en presencia de Dios, Padre, Hijo y Espíritu Santo, ` +
        `y de la mano de María, Madre de Dios y Madre nuestra, ofrece este Santo Rosario.` +
        (intencion ? ` Mi intención: ${intencion}.` : "")];
    }
    if (p.tipo === "misterio") {
      const mis = MISTERIOS[p.grupo].lista[p.misterio];
      let t = `${nombreMisterio(p.misterio, p.grupo)}: ${mis.titulo}. Fruto del misterio: ${mis.fruto}.`;
      if (config.meditaciones) {
        t += ` Lectura bíblica: ${citaHablada(mis.cita.ref)}. ${mis.cita.texto || mis.sintesis} Meditación. ${mis.meditacion}`;
      }
      return [t];
    }
    if (p.tipo === "letanias") {
      const seg = [];
      LETANIAS.forEach((g) => {
        const lineas = g.respuesta ? g.lineas.map((l) => [l, g.respuesta]) : g.lineas;
        lineas.forEach(([v, r]) => {
          if (config.guia) seg.push(v + ".", pausaPara(r));
          else seg.push(`${v}, ${r}.`);
        });
      });
      return seg;
    }
    if (p.tipo === "fin") return ["Bendito sea Dios. Has terminado el Santo Rosario. A Jesús por María."];
    const seg = p.nota ? [p.nota + "."] : [];
    const g = partesGuia(p);
    if (g) seg.push(g.guia, pausaPara(g.todos));
    else seg.push(textoPaso(p));
    return seg;
  }

  function leerPasoEnVoz() {
    if (!config.audio || $("#rezo").hidden) return;
    const pasoLeido = actual;
    voz.hablar(textoHablado(pasos[actual]), () => {
      if (config.autoAvance && actual === pasoLeido && actual < pasos.length - 1) {
        setTimeout(() => { if (config.audio && actual === pasoLeido) ir(actual + 1); }, 900);
      }
    });
  }

  function pintarBotonVoz() {
    const b = $("#btnVoz");
    if (!voz.disponible) { b.hidden = true; return; }
    b.setAttribute("aria-pressed", config.audio ? "true" : "false");
    b.querySelector("span").textContent = config.audio ? "Silenciar" : "Escuchar";
    b.classList.toggle("activo", !!config.audio);
  }

  function alternarVoz() {
    config.audio = !config.audio;
    guardarConfig();
    pintarBotonVoz();
    voz.mantenerPantalla(config.audio);
    if (config.audio) leerPasoEnVoz(); else voz.parar();
  }

  /* =========================================================
     Pantalla: tamaño de letra y modo noche
     ========================================================= */
  function aplicarPantalla() {
    const raiz = document.documentElement;
    raiz.style.setProperty("--letra", String(config.letra));
    raiz.dataset.tema = config.noche ? "noche" : "claro";
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", config.noche ? "#1d2233" : "#fbf8f1");
    const nombre = (LETRAS.find((l) => l.valor === config.letra) || LETRAS[0]).nombre;
    const bl = $("#btnLetra");
    bl.setAttribute("aria-label", `Tamaño de letra: ${nombre}. Cambiar`);
    bl.title = `Letra: ${nombre}`;
    const bt = $("#btnTema");
    bt.setAttribute("aria-pressed", config.noche ? "true" : "false");
    bt.setAttribute("aria-label", config.noche ? "Volver al modo claro" : "Activar el modo noche");
    bt.title = config.noche ? "Modo claro" : "Modo noche";
  }

  function cambiarLetra() {
    const i = LETRAS.findIndex((l) => l.valor === config.letra);
    config.letra = LETRAS[(i + 1) % LETRAS.length].valor;
    guardarConfig();
    aplicarPantalla();
    const sel = $("#letraSel");
    if (sel) sel.value = String(config.letra);
    avisar(`Letra: ${LETRAS.find((l) => l.valor === config.letra).nombre}`);
  }

  function alternarTema() {
    config.noche = !config.noche;
    guardarConfig();
    aplicarPantalla();
    const c = document.querySelector("input[name=noche]");
    if (c) c.checked = config.noche;
  }

  function guardarConfig() {
    store.set("rosario.config", config);
  }

  /* =========================================================
     Compartir y avisos
     ========================================================= */
  let temporizadorAviso = null;
  function avisar(texto, accion) {
    const a = $("#aviso");
    a.textContent = "";
    a.appendChild(document.createTextNode(texto));
    if (accion) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "aviso-accion";
      b.textContent = accion.texto;
      b.addEventListener("click", accion.alPulsar);
      a.appendChild(b);
    }
    a.hidden = false;
    clearTimeout(temporizadorAviso);
    if (!accion) temporizadorAviso = setTimeout(() => (a.hidden = true), 2600);
  }

  async function compartir() {
    const url = location.origin + location.pathname;
    const datos = {
      title: "Santo Rosario · Jesús por María",
      text: "Reza el Santo Rosario con meditaciones y citas bíblicas. Gratis para todos.",
      url,
    };
    try {
      if (navigator.share) { await navigator.share(datos); return; }
      await navigator.clipboard.writeText(url);
      avisar("Enlace copiado. Ya puedes pegarlo en WhatsApp o donde quieras.");
    } catch (e) {
      if (e && e.name === "AbortError") return;
      avisar(`Copia este enlace: ${url}`);
    }
  }

  /* =========================================================
     Navegación
     ========================================================= */
  function ir(i) {
    actual = Math.max(0, Math.min(pasos.length - 1, i));
    renderPaso();
  }
  const siguiente = () => {
    if (actual === pasos.length - 1) { volverAInicio(true); return; }
    ir(actual + 1);
  };
  const anterior = () => ir(actual - 1);

  function irACuenta(id) {
    const indices = [];
    pasos.forEach((p, i) => { if (p.cuenta === id) indices.push(i); });
    if (!indices.length) return;
    let destino = indices[0];
    if (id === "medalla") {
      // La medalla lleva a la conclusión del Rosario (Salve, Letanías…)
      const conclusion = indices.find((i) => pasos[i].fase === "Conclusión");
      if (conclusion !== undefined) destino = conclusion;
    } else {
      // En el Rosario completo, ir a la cuenta dentro de la vuelta que se está rezando
      const mismaVuelta = indices.find((i) => pasos[i].vuelta === pasos[actual].vuelta);
      if (mismaVuelta !== undefined) destino = mismaVuelta;
    }
    ir(destino);
  }

  function comenzar(progreso) {
    if (progreso) {
      // Se reconstruye con las mismas opciones con que se empezó
      Object.assign(config, progreso.cfg, { letra: config.letra, noche: config.noche, audio: config.audio });
    } else {
      leerFormulario();
    }
    guardarConfig();
    pasos = construirPasos(config);
    actual = progreso ? Math.min(progreso.actual, pasos.length - 1) : 0;
    $("#tituloRezo").textContent = nombreRosario(config.misterios);
    document.body.dataset.misterio = config.misterios === "completo" ? "gozosos" : config.misterios;
    mostrar("rezo");
    pintarBotonVoz();
    voz.mantenerPantalla(config.audio);
    renderPaso();
    $("#btnSiguiente").focus({ preventScroll: true });
  }

  // terminado: el Rosario se acabó y ya no hay nada que continuar
  function volverAInicio(terminado) {
    voz.parar();
    voz.mantenerPantalla(false);
    if (terminado) store.del("rosario.progreso");
    mostrar("inicio");
    renderInicio();
  }

  function mostrar(pantalla) {
    document.querySelectorAll(".pantalla").forEach((s) => (s.hidden = s.id !== pantalla));
    window.scrollTo(0, 0);
  }

  /* =========================================================
     Pantalla de inicio (opciones)
     ========================================================= */
  function tarjetaGrupo(clave, nombre, dias, lista) {
    return `
      <label class="mist-opcion" data-misterio="${clave}">
        <input type="radio" name="misterios" value="${clave}" ${config.misterios === clave ? "checked" : ""}>
        <span class="mist-cara">
          <span class="mist-nombre">${esc(nombre)}</span>
          <span class="mist-dias">${dias}</span>
          ${lista ? `<ol>${lista.map((x) => `<li>${esc(x.titulo)}</li>`).join("")}</ol>` : ""}
        </span>
      </label>`;
  }

  function renderInicio() {
    const delDia = MISTERIOS[misterioDelDia].nombre;
    $("#hoyTexto").innerHTML =
      `Hoy es <strong>${DIAS[hoy.getDay()]}</strong>: la Iglesia propone los <strong>${delDia}</strong>.`;
    $("#btnRapido").textContent = `Rezar ahora los ${delDia}`;

    $("#selectorMisterios").innerHTML =
      Object.entries(MISTERIOS).map(([clave, m]) =>
        tarjetaGrupo(clave, m.nombre, esc(m.dias) + (clave === misterioDelDia ? " · <em>hoy</em>" : ""), m.lista)
      ).join("") +
      tarjetaGrupo("completo", "Rosario completo", "Los 20 misterios, en cuatro vueltas", null);

    $("#opciones").innerHTML = OPCIONES.map((g) => `
      <fieldset class="grupo-op" ${g.id ? `id="${g.id}"` : ""} ${g.id === "grupoVoz" && !voz.disponible ? "hidden" : ""}>
        <legend>${g.grupo}</legend>
        ${g.items.map((o) => `
          <label class="interruptor">
            <input type="checkbox" name="${o.id}" ${config[o.id] ? "checked" : ""}>
            <span class="pista" aria-hidden="true"></span>
            <span>${o.label}</span>
          </label>`).join("")}
      </fieldset>`).join("");

    $("#grupoPantalla").insertAdjacentHTML("beforeend", `
      <label class="campo">Tamaño de letra
        <select id="letraSel">${LETRAS.map((l) => `<option value="${l.valor}">${l.nombre}</option>`).join("")}</select>
      </label>`);
    $("#letraSel").value = String(config.letra);
    $("#letraSel").addEventListener("change", (e) => {
      config.letra = Number(e.target.value);
      guardarConfig();
      aplicarPantalla();
    });
    document.querySelector("input[name=noche]").addEventListener("change", (e) => {
      config.noche = e.target.checked;
      guardarConfig();
      aplicarPantalla();
    });

    if (voz.disponible) {
      $("#grupoVoz").insertAdjacentHTML("beforeend", `
        <label class="campo">Voz
          <select id="vozSel"></select>
        </label>
        <label class="campo">Velocidad
          <select id="velSel">
            <option value="0.8">Pausada</option>
            <option value="0.95">Normal</option>
            <option value="1.1">Ágil</option>
          </select>
        </label>
        <button class="btn suave mini" type="button" id="btnProbarVoz">Probar la voz</button>`);
      $("#velSel").value = String(config.velocidad);
      const llenarVoces = () => {
        const vs = voz.voces();
        const elegida = voz.elegida();
        $("#vozSel").innerHTML = vs.length
          ? vs.map((v) => `<option value="${esc(v.name)}" ${elegida && v.name === elegida.name ? "selected" : ""}>${esc(v.name)} (${esc(v.lang)})</option>`).join("")
          : `<option value="">Voz del dispositivo</option>`;
      };
      llenarVoces();
      speechSynthesis.onvoiceschanged = () => { if ($("#vozSel")) llenarVoces(); };
      $("#btnProbarVoz").addEventListener("click", () => {
        leerFormulario();
        voz.hablar("Dios te salve, María, llena eres de gracia; el Señor es contigo.");
      });
    }

    $("#intencion").value = config.intencion || "";

    const prog = leerProgreso();
    const cont = $("#btnContinuar");
    if (prog) {
      cont.hidden = false;
      cont.textContent = `Continuar donde ibas: ${nombreRosario(prog.cfg.misterios)}` + (prog.etiqueta ? ` · ${prog.etiqueta}` : "");
      cont.onclick = () => comenzar(prog);
    } else {
      cont.hidden = true;
    }
  }

  function leerFormulario() {
    const sel = document.querySelector("input[name=misterios]:checked");
    if (sel && CLAVES_MISTERIOS.includes(sel.value)) config.misterios = sel.value;
    OPCIONES.forEach((g) => g.items.forEach((o) => {
      const c = document.querySelector(`input[name="${o.id}"]`);
      if (c) config[o.id] = c.checked;
    }));
    config.intencion = ($("#intencion").value || "").slice(0, 400);
    if ($("#vozSel")) config.voz = $("#vozSel").value;
    if ($("#velSel")) config.velocidad = Number($("#velSel").value) || PREDETERMINADA.velocidad;
  }

  /* =========================================================
     Actualizaciones (service worker)
     ========================================================= */
  function registrarServiceWorker() {
    if (!("serviceWorker" in navigator) || !(location.protocol === "https:" || location.hostname === "localhost")) return;
    navigator.serviceWorker.register("sw.js").then((reg) => {
      reg.addEventListener("updatefound", () => {
        const nuevo = reg.installing;
        if (!nuevo) return;
        nuevo.addEventListener("statechange", () => {
          if (nuevo.state === "installed" && navigator.serviceWorker.controller) {
            avisar("Hay una versión nueva de la app.", { texto: "Actualizar", alPulsar: () => nuevo.postMessage("activar") });
          }
        });
      });
    }).catch(() => {});
    // Recarga solo al cambiar de versión, no la primera vez que se instala
    const habiaVersion = !!navigator.serviceWorker.controller;
    let recargando = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!habiaVersion || recargando) return;
      recargando = true;
      location.reload();
    });
  }

  /* =========================================================
     Arranque
     ========================================================= */
  function iniciar() {
    // Primero los eventos: si algo falla después, los botones siguen funcionando
    $("#formInicio").addEventListener("submit", (e) => { e.preventDefault(); comenzar(null); });
    $("#btnRapido").addEventListener("click", () => {
      const radio = document.querySelector(`input[name=misterios][value="${misterioDelDia}"]`);
      if (radio) radio.checked = true;
      comenzar(null);
    });
    $("#btnSiguiente").addEventListener("click", siguiente);
    $("#btnAnterior").addEventListener("click", anterior);
    $("#btnSalir").addEventListener("click", () => volverAInicio(false));
    $("#btnVoz").addEventListener("click", alternarVoz);
    $("#btnLetra").addEventListener("click", cambiarLetra);
    $("#btnTema").addEventListener("click", alternarTema);
    $("#btnCompartir").addEventListener("click", compartir);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && config.audio && !$("#rezo").hidden) voz.mantenerPantalla(true);
    });

    document.addEventListener("keydown", (e) => {
      if ($("#rezo").hidden) return;
      const tag = (e.target.tagName || "").toLowerCase();
      if (["input", "textarea", "select", "summary", "button", "a"].includes(tag)) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " " || e.key === "PageDown") { e.preventDefault(); siguiente(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); anterior(); }
    });

    // Deslizar en móviles
    let x0 = null, y0 = null;
    const zona = $("#panel");
    zona.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    zona.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? siguiente : anterior)();
      x0 = null;
    });

    aplicarPantalla();
    dibujarRosario($("#rosario"));
    try {
      renderInicio();
    } catch (e) {
      // Datos guardados irrecuperables: se empieza de cero
      store.del("rosario.config");
      store.del("rosario.progreso");
      Object.assign(config, PREDETERMINADA);
      renderInicio();
    }
    registrarServiceWorker();
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();

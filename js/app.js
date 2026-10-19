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
      { id: "sanMiguel", label: "Oración a San Miguel", def: false },
      { id: "oracionFinal", label: "Oración final del Rosario", def: true },
    ]},
    { grupo: "Escuchar en voz alta", id: "grupoVoz", items: [
      { id: "audio", label: "Leer las oraciones en voz alta", def: false },
      { id: "autoAvance", label: "Avanzar solo al terminar cada oración (manos libres)", def: true },
    ]},
    { grupo: "Texto del Padre Nuestro", items: [
      { id: "latam", label: "«No nos dejes caer en tentación» (uso de Latinoamérica). Apagado: «en la tentación», como el Compendio del Catecismo", def: false },
    ]},
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
      if (!m) return null;
      return { libro: LIBROS[m[1]], abrev: m[1], cap: m[2], vers: m[3], texto: r.trim() };
    }).filter(Boolean);
  }

  function citaHablada(ref) {
    return partesCita(ref).map((p) =>
      `${p.libro.nombre}, capítulo ${p.cap}, ` +
      (p.vers.includes("-") ? `versículos ${p.vers.replace("-", " al ")}` : `versículo ${p.vers}`)
    ).join("; y ");
  }

  const ADJ = { gozosos: "Gozoso", luminosos: "Luminoso", dolorosos: "Doloroso", gloriosos: "Glorioso" };

  /* ---------- almacenamiento seguro ---------- */
  const store = {
    get(k, fallback) {
      try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
    },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* nada */ } },
  };

  const hoy = new Date();
  const misterioDelDia = MISTERIOS_POR_DIA[hoy.getDay()];

  const config = Object.assign(
    { misterios: misterioDelDia, intencion: "", voz: "", velocidad: 0.95 },
    Object.fromEntries(OPCIONES.flatMap((g) => g.items.map((o) => [o.id, o.def]))),
    store.get("rosario.config", {})
  );
  // Por defecto siempre se propone el misterio del día al abrir la app
  config.misterios = misterioDelDia;

  let pasos = [];
  let actual = 0;

  /* =========================================================
     Construcción de la secuencia de oraciones
     ========================================================= */
  function construirPasos(cfg) {
    const s = [];
    const add = (o) => s.push(o);

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

    for (let m = 0; m < 5; m++) {
      const grande = m === 0 ? "p2" : "l" + m;
      const despues = m < 4 ? "l" + (m + 1) : "medalla";
      add({ cuenta: grande, tipo: "misterio", misterio: m });
      add({ cuenta: grande, oracion: "padrenuestro", misterio: m });
      for (let k = 0; k < 10; k++) {
        add({ cuenta: `d${m}-${k}`, oracion: "avemaria", misterio: m, contador: [k + 1, 10] });
      }
      add({ cuenta: despues, oracion: "gloria", misterio: m });
      if (cfg.fatima) add({ cuenta: despues, oracion: "fatima", misterio: m });
      if (cfg.jaculatoria) add({ cuenta: despues, oracion: "jaculatoria", misterio: m });
    }

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
    if (cfg.bajoTuAmparo) add({ cuenta: "medalla", oracion: "bajoTuAmparo", fase: "Conclusión" });
    if (cfg.sanMiguel) add({ cuenta: "medalla", oracion: "sanMiguel", fase: "Conclusión" });
    if (cfg.oracionFinal) add({ cuenta: "medalla", oracion: "oracionFinal", fase: "Conclusión" });
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
    svg.innerHTML = "";
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
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
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
    el("ellipse", { cx: x, cy: y, rx: w / 2, ry: h / 2 - 0.5, class: "aro" }, g);
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
    if (id === "cruz") return "Crucifijo — Señal de la Cruz y Credo";
    if (id === "medalla") return "Medalla Milagrosa — Conclusión del Rosario";
    if (id === "p1") return "Padre Nuestro";
    if (/^s\d$/.test(id)) return `Ave María (${id[1]} de 3)`;
    if (id === "p2") return "Gloria · Primer misterio · Padre Nuestro";
    if (/^l\d$/.test(id)) return `Gloria · ${ORDINALES[+id[1]]} misterio · Padre Nuestro`;
    const [m, k] = id.slice(1).split("-").map(Number);
    return `${ORDINALES[m]} misterio — Ave María ${k + 1} de 10`;
  }

  function pintarEstado() {
    const ultimoDe = {};
    const primeroDe = {};
    pasos.forEach((p, i) => {
      ultimoDe[p.cuenta] = i;
      if (!(p.cuenta in primeroDe)) primeroDe[p.cuenta] = i;
    });
    const cuentaActual = pasos[actual].cuenta;
    for (const id in cuentasSVG) {
      const g = cuentasSVG[id];
      g.classList.toggle("actual", id === cuentaActual);
      g.classList.toggle("rezada", ultimoDe[id] < actual && id !== cuentaActual);
    }
  }

  /* =========================================================
     Panel de oración
     ========================================================= */
  function parrafos(texto) {
    return texto
      .split("\n\n")
      .map((p) => `<p>${p.split("\n").map(esc).join("<br>")}</p>`)
      .join("");
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function nombreMisterio(m) {
    return `${ORDINALES[m]} Misterio ${ADJ[config.misterios]}`;
  }

  function tarjetaMisterio(m, abierta, enAnuncio) {
    const mis = MISTERIOS[config.misterios].lista[m];
    const cita = mis.cita.texto
      ? `<blockquote class="cita-texto">${parrafos(mis.cita.texto)}</blockquote>`
      : `<p class="sintesis">${esc(mis.sintesis)}</p>`;
    const cuerpo = config.meditaciones
      ? `
        <div class="bloque">
          <h4><span class="icono" aria-hidden="true">✦</span> Lectura bíblica · <span class="ref">${esc(mis.cita.ref)}</span></h4>
          ${cita}
          <p class="fuente">Leer el pasaje completo en la Biblia de Navarra:
            ${partesCita(mis.cita.ref).map((c) =>
              `<a href="https://www.ewtn.com/es/biblia/${c.libro.url}/${c.cap}" target="_blank" rel="noopener">${esc(c.texto)}</a>`
            ).join(" · ")}</p>
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
      <details class="misterio-card" ${abierta ? "open" : ""}>
        <summary>
          <span class="mc-num">${nombreMisterio(m)}</span>
          <span class="mc-titulo">${esc(mis.titulo)}</span>
          <span class="mc-fruto">Fruto: ${esc(mis.fruto)}</span>
        </summary>
        ${cuerpo}
      </details>`;
  }

  function puntosDecena(n, total) {
    let h = `<div class="puntos" aria-label="${n} de ${total}">`;
    for (let i = 1; i <= total; i++) h += `<span class="${i < n ? "hecho" : i === n ? "ahora" : ""}"></span>`;
    return h + "</div>";
  }

  function renderPaso() {
    const p = pasos[actual];
    const panel = $("#contenido");
    let etiqueta = "";
    let html = "";

    if (p.tipo === "intro") {
      etiqueta = "Ofrecimiento";
      const intencion = config.intencion.trim();
      html = `
        <h2>${esc(MISTERIOS[config.misterios].nombre)}</h2>
        <p class="lead">Ponte en presencia de Dios, Padre, Hijo y Espíritu Santo, y de la mano de María,
        Madre de Dios y Madre nuestra, ofrece este Santo Rosario.</p>
        ${intencion ? `<div class="intencion"><span>Mi intención</span><p>${esc(intencion)}</p></div>` : ""}
        <p class="ayuda">Toca <strong>Siguiente</strong>, desliza o pulsa una cuenta del rosario para avanzar.</p>`;
    } else if (p.tipo === "misterio") {
      etiqueta = "Anuncio del misterio";
      const mis = MISTERIOS[config.misterios].lista[p.misterio];
      html = `
        <p class="anuncio">${nombreMisterio(p.misterio)}</p>
        <h2>${esc(mis.titulo)}</h2>
        ${tarjetaMisterio(p.misterio, true, true)}`;
    } else if (p.tipo === "letanias") {
      etiqueta = "Letanías Lauretanas";
      html = `<h2>Letanías de la Santísima Virgen</h2>` + renderLetanias();
    } else if (p.tipo === "fin") {
      etiqueta = "Amén";
      html = `
        <img class="fin-virgen" src="img/virgen-fatima.svg" alt="Nuestra Señora de Fátima" width="120" height="180">
        <h2>Bendito sea Dios</h2>
        <p class="lead">Has terminado el Santo Rosario. Que la Virgen María, Madre de Dios,
        presente tus intenciones a su Hijo Jesucristo, y que la gracia de la Santísima Trinidad
        permanezca siempre contigo.</p>
        <p class="jaculatoria-fin">«Ad Iesum per Mariam» — A Jesús por María</p>
        <button class="btn primario" id="btnOtraVez" type="button">Rezar de nuevo</button>`;
    } else {
      const o = ORACIONES[p.oracion];
      const partes = [];
      if (p.misterio !== undefined) partes.push(nombreMisterio(p.misterio));
      else if (p.fase) partes.push(p.fase);
      if (p.contador) partes.push(`${o.titulo} ${p.contador[0]} de ${p.contador[1]}`);
      etiqueta = partes.join(" · ");
      html = `
        <h2>${esc(o.titulo)}</h2>
        ${p.nota ? `<p class="nota">${esc(p.nota)}</p>` : ""}
        ${p.contador ? puntosDecena(p.contador[0], p.contador[1]) : ""}
        ${p.saludo ? `<p class="saludo">${esc(p.saludo)}:</p>` : ""}
        <div class="oracion">${parrafos(textoOracion(p.oracion))}</div>
        ${p.misterio !== undefined ? tarjetaMisterio(p.misterio, false) : ""}`;
    }

    if (p.cuenta === "medalla") {
      html += `
        <figure class="medallas">
          <img src="img/medalla-milagrosa.svg" alt="Medalla Milagrosa, anverso" width="200" height="260">
          <img src="img/medalla-reverso.svg" alt="Medalla Milagrosa, reverso" width="200" height="260">
          <figcaption>Medalla Milagrosa · anverso y reverso</figcaption>
        </figure>`;
    }

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
    if (otra) otra.addEventListener("click", volverAInicio);

    $("#btnAnterior").disabled = actual === 0;
    $("#btnSiguiente").textContent = actual === pasos.length - 1 ? "Terminar" : "Siguiente";
    $("#progreso").style.width = ((actual / (pasos.length - 1)) * 100).toFixed(1) + "%";
    $("#progreso").parentElement.setAttribute("aria-valuenow", Math.round((actual / (pasos.length - 1)) * 100));

    pintarEstado();
    if (config.audio) leerPasoEnVoz();
    store.set("rosario.progreso", { misterios: config.misterios, actual, total: pasos.length, fecha: Date.now() });
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

  function textoOracion(clave) {
    const o = ORACIONES[clave];
    return config.latam && o.textoLatam ? o.textoLatam : o.texto;
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

    // Divide en frases: algunos navegadores cortan los textos largos
    trozos(texto) {
      return texto
        .replace(/^[VR]\.\s*/gm, "")
        .replace(/[«»]/g, "")
        .split(/(?<=[.;:!?])\s+|\n+/)
        .map((t) => t.trim())
        .filter(Boolean);
    },

    hablar(texto, alTerminar) {
      if (!this.disponible) return;
      this.parar();
      const mio = ++this.turno;
      const partes = this.trozos(texto);
      const voz = this.elegida();
      let i = 0;
      const siguienteTrozo = () => {
        if (mio !== this.turno) return;
        if (i >= partes.length) { if (alTerminar) alTerminar(); return; }
        const u = new SpeechSynthesisUtterance(partes[i++]);
        if (voz) u.voice = voz;
        u.lang = voz ? voz.lang : config.latam ? "es-MX" : "es-ES";
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

  function textoHablado(p) {
    if (p.tipo === "intro") {
      const intencion = config.intencion.trim();
      return `${MISTERIOS[config.misterios].nombre}. Ponte en presencia de Dios, Padre, Hijo y Espíritu Santo, ` +
        `y de la mano de María, Madre de Dios y Madre nuestra, ofrece este Santo Rosario.` +
        (intencion ? ` Mi intención: ${intencion}.` : "");
    }
    if (p.tipo === "misterio") {
      const mis = MISTERIOS[config.misterios].lista[p.misterio];
      let t = `${nombreMisterio(p.misterio)}: ${mis.titulo}. Fruto del misterio: ${mis.fruto}.`;
      if (config.meditaciones) {
        t += ` Lectura bíblica: ${citaHablada(mis.cita.ref)}. ${mis.cita.texto || mis.sintesis} Meditación. ${mis.meditacion}`;
      }
      return t;
    }
    if (p.tipo === "letanias") {
      return LETANIAS.map((g) => g.respuesta
        ? g.lineas.map((l) => `${l}, ${g.respuesta}.`).join("\n")
        : g.lineas.map(([v, r]) => `${v}. ${r}.`).join("\n")
      ).join("\n");
    }
    if (p.tipo === "fin") {
      return "Bendito sea Dios. Has terminado el Santo Rosario. A Jesús por María.";
    }
    return (p.nota ? p.nota + ". " : "") + textoOracion(p.oracion);
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
    store.set("rosario.config", config);
    pintarBotonVoz();
    voz.mantenerPantalla(config.audio);
    if (config.audio) leerPasoEnVoz(); else voz.parar();
  }

  /* =========================================================
     Navegación
     ========================================================= */
  function ir(i) {
    actual = Math.max(0, Math.min(pasos.length - 1, i));
    renderPaso();
  }
  const siguiente = () => {
    if (actual === pasos.length - 1) { volverAInicio(); return; }
    ir(actual + 1);
  };
  const anterior = () => ir(actual - 1);

  function irACuenta(id) {
    const i = pasos.findIndex((p) => p.cuenta === id);
    if (i >= 0) ir(i);
  }

  function comenzar(continuar) {
    leerFormulario();
    store.set("rosario.config", config);
    pasos = construirPasos(config);
    actual = 0;
    if (continuar) {
      const prog = store.get("rosario.progreso", null);
      if (prog && prog.total === pasos.length) actual = Math.min(prog.actual, pasos.length - 1);
    }
    $("#tituloRezo").textContent = MISTERIOS[config.misterios].nombre;
    document.body.dataset.misterio = config.misterios;
    mostrar("rezo");
    pintarBotonVoz();
    voz.mantenerPantalla(config.audio);
    renderPaso();
    $("#btnSiguiente").focus({ preventScroll: true });
  }

  function volverAInicio() {
    voz.parar();
    voz.mantenerPantalla(false);
    store.del("rosario.progreso");
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
  function renderInicio() {
    $("#hoyTexto").innerHTML =
      `Hoy es <strong>${DIAS[hoy.getDay()]}</strong>: la Iglesia propone los ` +
      `<strong>${MISTERIOS[misterioDelDia].nombre}</strong>. Puedes elegir otros si lo deseas.`;

    const cont = $("#selectorMisterios");
    cont.innerHTML = Object.entries(MISTERIOS).map(([clave, m]) => `
      <label class="mist-opcion" data-misterio="${clave}">
        <input type="radio" name="misterios" value="${clave}" ${config.misterios === clave ? "checked" : ""}>
        <span class="mist-cara">
          <span class="mist-nombre">${m.nombre}</span>
          <span class="mist-dias">${m.dias}${clave === misterioDelDia ? ' · <em>hoy</em>' : ""}</span>
          <ol>${m.lista.map((x) => `<li>${esc(x.titulo)}</li>`).join("")}</ol>
        </span>
      </label>`).join("");

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
      speechSynthesis.onvoiceschanged = llenarVoces;
      $("#btnProbarVoz").addEventListener("click", () => {
        leerFormulario();
        voz.hablar("Dios te salve, María, llena eres de gracia; el Señor es contigo.");
      });
    }

    $("#intencion").value = config.intencion || "";

    const prog = store.get("rosario.progreso", null);
    const cont2 = $("#btnContinuar");
    if (prog && prog.actual > 0 && Date.now() - prog.fecha < 1000 * 60 * 60 * 12) {
      cont2.hidden = false;
      cont2.textContent = `Continuar el rosario en curso (${MISTERIOS[prog.misterios].nombre})`;
      cont2.onclick = () => {
        config.misterios = prog.misterios;
        const radio = document.querySelector(`input[name=misterios][value=${prog.misterios}]`);
        if (radio) radio.checked = true;
        comenzar(true);
      };
    } else {
      cont2.hidden = true;
    }
  }

  function leerFormulario() {
    const sel = document.querySelector("input[name=misterios]:checked");
    if (sel) config.misterios = sel.value;
    OPCIONES.forEach((g) => g.items.forEach((o) => {
      const c = document.querySelector(`input[name=${o.id}]`);
      if (c) config[o.id] = c.checked;
    }));
    config.intencion = $("#intencion").value || "";
    if ($("#vozSel")) config.voz = $("#vozSel").value;
    if ($("#velSel")) config.velocidad = Number($("#velSel").value);
  }

  /* =========================================================
     Arranque
     ========================================================= */
  function iniciar() {
    dibujarRosario($("#rosario"));
    renderInicio();

    $("#formInicio").addEventListener("submit", (e) => { e.preventDefault(); comenzar(false); });
    $("#btnSiguiente").addEventListener("click", siguiente);
    $("#btnAnterior").addEventListener("click", anterior);
    $("#btnSalir").addEventListener("click", volverAInicio);
    $("#btnVoz").addEventListener("click", alternarVoz);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && config.audio && !$("#rezo").hidden) voz.mantenerPantalla(true);
    });

    document.addEventListener("keydown", (e) => {
      if ($("#rezo").hidden) return;
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "summary" || tag === "button") return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); siguiente(); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); anterior(); }
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

    if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  }

  document.addEventListener("DOMContentLoaded", iniciar);
})();

/* =========================================================
   Salas para rezar en grupo (conexión)
   Usa Firebase por su API web, sin librerías: fetch para escribir y
   EventSource para recibir los cambios al instante.
   Cada pestaña entra con una cuenta anónima que solo vive mientras está abierta.
   Las reglas de firebase/reglas.json deciden quién puede leer y escribir.
   ========================================================= */
(function () {
  "use strict";

  const CFG = window.CONFIG_SALAS;
  const DIA = 24 * 60 * 60 * 1000;
  const ALFABETO = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // sin I, L, O, 0 ni 1, que se confunden
  const HORA_SERVIDOR = { ".sv": "timestamp" };
  const CLAVE_SESION = "rosario.sesionSala";
  const CLAVE_MIS_SALAS = "rosario.misSalas";

  function fallo(tipo, detalle) {
    const e = new Error(detalle || tipo);
    e.tipo = tipo; // "permiso", "red" o "config"
    return e;
  }

  async function pedirJSON(url, opciones) {
    let r;
    try {
      r = await fetch(url, Object.assign({ cache: "no-store", credentials: "omit" }, opciones));
    } catch (e) {
      throw fallo("red");
    }
    let cuerpo = null;
    try { cuerpo = await r.json(); } catch (e) { /* sin cuerpo */ }
    if (r.status === 401 || r.status === 403) throw fallo("permiso");
    if (!r.ok) {
      const msg = cuerpo && cuerpo.error && (cuerpo.error.message || cuerpo.error);
      throw fallo(r.status === 400 ? "config" : "red", String(msg || r.status));
    }
    return cuerpo;
  }

  /* ---------- Identidad anónima (una por pestaña) ---------- */
  const sesion = {
    uid: null,
    token: null,
    vence: 0,
    refresco: null,
    pendiente: null,

    leer() {
      try {
        const s = JSON.parse(sessionStorage.getItem(CLAVE_SESION) || "null");
        if (s && typeof s.uid === "string" && typeof s.refresco === "string") return s;
      } catch (e) { /* nada guardado */ }
      return null;
    },

    fijar(uid, token, refresco, segundos) {
      this.uid = uid;
      this.token = token;
      this.refresco = refresco;
      this.vence = Date.now() + (Number(segundos) || 3600) * 1000;
      try { sessionStorage.setItem(CLAVE_SESION, JSON.stringify({ uid, refresco })); } catch (e) { /* sin almacenamiento */ }
    },

    valido() {
      return this.token && Date.now() < this.vence - 60000;
    },

    // Retoma la identidad con la que se creó o se entró en una sala
    usar(guardada) {
      this.uid = guardada.uid;
      this.refresco = guardada.refresco;
      this.token = null;
      this.vence = 0;
    },

    asegurar() {
      if (this.valido()) return Promise.resolve(this.token);
      if (!this.pendiente) {
        this.pendiente = this.obtener().finally(() => { this.pendiente = null; });
      }
      return this.pendiente;
    },

    async obtener() {
      const guardada = this.refresco ? { refresco: this.refresco } : this.leer();
      if (guardada) {
        try {
          const r = await pedirJSON(`${CFG.tokenURL || "https://securetoken.googleapis.com"}/v1/token?key=${encodeURIComponent(CFG.apiKey)}`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "grant_type=refresh_token&refresh_token=" + encodeURIComponent(guardada.refresco),
          });
          this.fijar(r.user_id, r.id_token, r.refresh_token, r.expires_in);
          return this.token;
        } catch (e) {
          if (e.tipo === "red") throw e;
          // La sesión guardada ya no sirve: se crea otra
        }
      }
      const r = await pedirJSON(`${CFG.authURL || "https://identitytoolkit.googleapis.com"}/v1/accounts:signUp?key=${encodeURIComponent(CFG.apiKey)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnSecureToken: true }),
      });
      this.fijar(r.localId, r.idToken, r.refreshToken, r.expiresIn);
      return this.token;
    },
  };

  /* ---------- Base de datos ---------- */
  function url(ruta, token, extra) {
    return `${CFG.databaseURL.replace(/\/+$/, "")}/${ruta}.json?auth=${encodeURIComponent(token)}${extra || ""}`;
  }

  async function db(ruta, metodo, cuerpo, extra) {
    const token = await sesion.asegurar();
    const opciones = { method: metodo };
    if (cuerpo !== undefined) opciones.body = JSON.stringify(cuerpo);
    return pedirJSON(url(ruta, token, extra), opciones);
  }

  /* Estadísticas sin nombres: cuántas salas se crean, cuántas personas entran y
     cuántos rosarios se rezan en grupo cada día. Si falla, no importa. */
  function contar(...datos) {
    const d = new Date();
    const dia = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const cambios = {};
    datos.forEach((k) => { cambios[`estadisticas/${dia}/${k}`] = { ".sv": { increment: 1 } }; });
    db("", "PATCH", cambios).catch(() => {});
  }

  function nuevoCodigo() {
    const azar = new Uint8Array(12);
    let codigo = "";
    while (codigo.length < 6) {
      crypto.getRandomValues(azar);
      for (const b of azar) {
        // 248 es múltiplo de 31: así todas las letras salen con la misma probabilidad
        if (b < 248 && codigo.length < 6) codigo += ALFABETO[b % ALFABETO.length];
      }
    }
    return codigo;
  }

  function normalizar(texto) {
    const c = String(texto || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    return /^[A-Z2-9]{6}$/.test(c) ? c : null;
  }

  // Aplica un evento «put» o «patch» de Firebase sobre la copia local de la sala
  const PROHIBIDAS = ["__proto__", "constructor", "prototype"];
  function aplicar(raiz, ruta, valor) {
    const partes = ruta.split("/").filter(Boolean);
    if (partes.some((p) => PROHIBIDAS.includes(p))) return raiz;
    if (!partes.length) return valor === null ? null : valor;
    const copia = raiz && typeof raiz === "object" ? Object.assign({}, raiz) : {};
    let nodo = copia;
    for (let i = 0; i < partes.length - 1; i++) {
      const k = partes[i];
      nodo[k] = nodo[k] && typeof nodo[k] === "object" ? Object.assign({}, nodo[k]) : {};
      nodo = nodo[k];
    }
    const ultima = partes[partes.length - 1];
    if (valor === null) delete nodo[ultima];
    else nodo[ultima] = valor;
    return copia;
  }

  /* Escucha la sala en vivo. alCambiar(datos) recibe la sala completa (o null si
     ya no existe); alEstado(estado) recibe "conectada", "reconectando" o "cerrada". */
  function escuchar(codigo, alCambiar, alEstado) {
    let fuente = null;
    let cerrado = false;
    let datos = null;
    let reintento = null;

    const reabrir = (ms) => {
      if (fuente) { fuente.close(); fuente = null; }
      clearTimeout(reintento);
      if (!cerrado) reintento = setTimeout(abrir, ms);
    };

    const leer = (e) => {
      try { return JSON.parse(e.data); } catch (err) { return null; }
    };

    async function abrir() {
      if (cerrado) return;
      let token;
      try {
        token = await sesion.asegurar();
      } catch (e) {
        alEstado("reconectando");
        reabrir(5000);
        return;
      }
      if (cerrado) return;
      fuente = new EventSource(url("salas/" + codigo, token));
      fuente.addEventListener("open", () => alEstado("conectada"));
      fuente.addEventListener("put", (e) => {
        const m = leer(e);
        if (!m || typeof m.path !== "string") return;
        datos = aplicar(datos, m.path, m.data);
        alCambiar(datos);
      });
      fuente.addEventListener("patch", (e) => {
        const m = leer(e);
        if (!m || typeof m.path !== "string" || !m.data || typeof m.data !== "object") return;
        Object.keys(m.data).forEach((k) => { datos = aplicar(datos, m.path.replace(/\/+$/, "") + "/" + k, m.data[k]); });
        alCambiar(datos);
      });
      // La credencial caduca cada hora: se renueva y se vuelve a escuchar
      fuente.addEventListener("auth_revoked", () => { sesion.token = null; reabrir(0); });
      // Firebase corta la escucha cuando ya no hay permiso: la sala se cerró o caducó
      fuente.addEventListener("cancel", () => {
        cerrado = true;
        if (fuente) fuente.close();
        alCambiar(null);
        alEstado("cerrada");
      });
      fuente.addEventListener("error", () => {
        if (cerrado) return;
        alEstado("reconectando");
        // Si el navegador se rinde, se vuelve a intentar a mano
        if (fuente && fuente.readyState === EventSource.CLOSED) reabrir(4000);
      });
    }

    abrir();
    return {
      cerrar() {
        cerrado = true;
        clearTimeout(reintento);
        if (fuente) fuente.close();
      },
    };
  }

  /* Salas en las que estuvo este navegador. Sirven para seguir siendo el anfitrión
     (o el mismo participante) si se cierra la pestaña y se vuelve a abrir el enlace,
     y para borrar al día siguiente las salas que el anfitrión no cerró. */
  const misSalas = {
    leer() {
      try {
        const l = JSON.parse(localStorage.getItem(CLAVE_MIS_SALAS) || "[]");
        return Array.isArray(l) ? l.filter((e) => e && normalizar(e.codigo) && typeof e.uid === "string" &&
          typeof e.refresco === "string" && typeof e.fecha === "number") : [];
      } catch (e) {
        return [];
      }
    },
    guardar(l) {
      try { localStorage.setItem(CLAVE_MIS_SALAS, JSON.stringify(l.slice(-8))); } catch (e) { /* sin almacenamiento */ }
    },
    anotar(codigo, anfitrion) {
      const l = this.leer().filter((e) => e.codigo !== codigo);
      l.push({ codigo, uid: sesion.uid, refresco: sesion.refresco, fecha: Date.now(), anfitrion: !!anfitrion });
      this.guardar(l);
    },
    quitar(codigo) {
      this.guardar(this.leer().filter((e) => e.codigo !== codigo));
    },
    de(codigo) {
      return this.leer().find((e) => e.codigo === codigo) || null;
    },
  };

  const Salas = {
    disponible: !!(CFG && CFG.apiKey && CFG.databaseURL && "EventSource" in window && window.crypto && window.fetch),
    normalizar,
    escuchar,
    uid: () => sesion.uid,

    async conectar(codigo) {
      const anterior = codigo && misSalas.de(codigo);
      if (anterior && anterior.uid !== sesion.uid) sesion.usar(anterior);
      await sesion.asegurar();
      if (anterior && sesion.uid !== anterior.uid) misSalas.quitar(codigo); // esa identidad ya no sirve
      return sesion.uid;
    },

    olvidar(codigo) {
      misSalas.quitar(codigo);
    },

    // Borra las salas propias de hace más de un día que nadie cerró (con sus nombres)
    async limpiarViejas() {
      const viejas = misSalas.leer().filter((e) => Date.now() - e.fecha > DIA + 10 * 60 * 1000);
      for (const e of viejas) {
        try {
          if (e.anfitrion) await db("", "PATCH", { ["salas/" + e.codigo]: null, ["caducan/" + e.codigo]: null });
          misSalas.quitar(e.codigo);
        } catch (err) {
          // Sin conexión se intenta otro día; si no hay permiso es que ya no existe
          if (err.tipo !== "red") misSalas.quitar(e.codigo);
        }
      }
    },

    async crear({ nombre, cfg, intencion }) {
      await sesion.asegurar();
      for (let intento = 0; intento < 4; intento++) {
        const codigo = nuevoCodigo();
        const sala = {
          anfitrion: sesion.uid, nombre, creada: HORA_SERVIDOR, estado: "espera",
          cfg: JSON.stringify(cfg), intencion: intencion || "", paso: 0, guia: sesion.uid,
        };
        try {
          // Una sola escritura para la sala y su fecha de caducidad
          await db("", "PATCH", { ["salas/" + codigo]: sala, ["caducan/" + codigo]: HORA_SERVIDOR });
          misSalas.anotar(codigo, true);
          contar("salas", "personas");
          return codigo;
        } catch (e) {
          if (e.tipo !== "permiso") throw e; // si el código ya existía, se prueba otro
        }
      }
      throw fallo("permiso");
    },

    // Lee la sala una vez; null si no existe o ya caducó
    async leer(codigo) {
      try {
        return await db("salas/" + codigo, "GET");
      } catch (e) {
        if (e.tipo === "permiso") return null;
        throw e;
      }
    },

    async entrar(codigo, nombre) {
      await db(`salas/${codigo}/participantes/${sesion.uid}`, "PUT", { nombre, entro: HORA_SERVIDOR });
      // Solo cuenta la primera vez; al recargar la página o volver a anotarse no
      if (!misSalas.de(codigo)) {
        misSalas.anotar(codigo, false);
        contar("personas");
      }
    },

    actualizar(codigo, cambios) {
      return db("salas/" + codigo, "PATCH", cambios);
    },

    async comenzar(codigo) {
      await db("salas/" + codigo, "PATCH", { estado: "rezando", paso: 0 });
      contar("rezados");
    },

    moverA(codigo, paso) {
      return db(`salas/${codigo}/paso`, "PUT", paso);
    },

    salir(codigo) {
      misSalas.quitar(codigo);
      return db(`salas/${codigo}/participantes/${sesion.uid}`, "DELETE");
    },

    // Al cerrar la pestaña: aviso rápido sin esperar respuesta
    salirAlCerrar(codigo) {
      if (!sesion.valido()) return;
      try {
        fetch(url(`salas/${codigo}/participantes/${sesion.uid}`, sesion.token), { method: "DELETE", keepalive: true, credentials: "omit" });
      } catch (e) { /* nada */ }
    },

    // El anfitrión cierra la sala: primero avisa a todos y luego la borra
    async cerrar(codigo) {
      try { await db("salas/" + codigo, "PATCH", { estado: "terminada" }); } catch (e) { /* se borra igual */ }
      await db("", "PATCH", { ["salas/" + codigo]: null, ["caducan/" + codigo]: null });
      misSalas.quitar(codigo);
    },
  };

  window.Salas = Salas;
})();

/* =========================================================
   Generador de códigos QR, sin dependencias.
   Modo byte (UTF-8), corrección de errores nivel M, versiones 1 a 20.
   Sigue la norma ISO/IEC 18004, con el método de Project Nayuki (licencia MIT).
   ========================================================= */
(function () {
  "use strict";

  // Nivel M, por versión: códigos de corrección en cada bloque y número de bloques
  const ECC_POR_BLOQUE = [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26];
  const BLOQUES = [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16];
  const VERSION_MAX = 20;
  const BITS_FORMATO_M = 0;

  function modulosDeDatos(v) {
    let r = (16 * v + 128) * v + 64;
    if (v >= 2) {
      const n = Math.floor(v / 7) + 2;
      r -= (25 * n - 10) * n - 55;
      if (v >= 7) r -= 36;
    }
    return r;
  }

  function codigosDeDatos(v) {
    return Math.floor(modulosDeDatos(v) / 8) - ECC_POR_BLOQUE[v] * BLOQUES[v];
  }

  /* ---------- Reed-Solomon sobre GF(256) ---------- */
  function multiplicar(x, y) {
    let z = 0;
    for (let i = 7; i >= 0; i--) {
      z = (z << 1) ^ ((z >>> 7) * 0x11d);
      z ^= ((y >>> i) & 1) * x;
    }
    return z;
  }

  function divisor(grado) {
    const r = new Array(grado).fill(0);
    r[grado - 1] = 1;
    let raiz = 1;
    for (let i = 0; i < grado; i++) {
      for (let j = 0; j < r.length; j++) {
        r[j] = multiplicar(r[j], raiz);
        if (j + 1 < r.length) r[j] ^= r[j + 1];
      }
      raiz = multiplicar(raiz, 0x02);
    }
    return r;
  }

  function resto(datos, div) {
    const r = div.map(() => 0);
    datos.forEach((b) => {
      const factor = b ^ r.shift();
      r.push(0);
      div.forEach((c, i) => { r[i] ^= multiplicar(c, factor); });
    });
    return r;
  }

  // Divide en bloques, añade la corrección de errores y entrelaza
  function conCorreccion(datos, v) {
    const nBloques = BLOQUES[v];
    const largoEcc = ECC_POR_BLOQUE[v];
    const total = Math.floor(modulosDeDatos(v) / 8);
    const cortos = nBloques - (total % nBloques);
    const largoCorto = Math.floor(total / nBloques);
    const div = divisor(largoEcc);
    const bloques = [];
    for (let i = 0, k = 0; i < nBloques; i++) {
      const dat = datos.slice(k, k + largoCorto - largoEcc + (i < cortos ? 0 : 1));
      k += dat.length;
      const ecc = resto(dat, div);
      if (i < cortos) dat.push(0);
      bloques.push(dat.concat(ecc));
    }
    const r = [];
    for (let i = 0; i < bloques[0].length; i++) {
      bloques.forEach((b, j) => {
        if (i !== largoCorto - largoEcc || j >= cortos) r.push(b[i]);
      });
    }
    return r;
  }

  /* ---------- Matriz ---------- */
  function matriz(texto) {
    const bytes = Array.from(new TextEncoder().encode(texto));
    let v = 1;
    while (v <= VERSION_MAX && 4 + (v < 10 ? 8 : 16) + bytes.length * 8 > codigosDeDatos(v) * 8) v++;
    if (v > VERSION_MAX) throw new Error("Texto demasiado largo para el código QR");

    const bits = [];
    const poner = (valor, n) => { for (let i = n - 1; i >= 0; i--) bits.push((valor >>> i) & 1); };
    poner(4, 4); // modo byte
    poner(bytes.length, v < 10 ? 8 : 16);
    bytes.forEach((b) => poner(b, 8));
    const capacidad = codigosDeDatos(v) * 8;
    poner(0, Math.min(4, capacidad - bits.length));
    poner(0, (8 - (bits.length % 8)) % 8);
    for (let relleno = 0xec; bits.length < capacidad; relleno ^= 0xec ^ 0x11) poner(relleno, 8);
    const datos = [];
    for (let i = 0; i < bits.length; i += 8) {
      let b = 0;
      for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
      datos.push(b);
    }

    const n = v * 4 + 17;
    const mod = Array.from({ length: n }, () => new Array(n).fill(false));
    const fija = Array.from({ length: n }, () => new Array(n).fill(false));
    const fijar = (x, y, oscuro) => { mod[y][x] = oscuro; fija[y][x] = true; };
    const bit = (x, i) => ((x >>> i) & 1) !== 0;

    // Patrones de sincronización
    for (let i = 0; i < n; i++) { fijar(6, i, i % 2 === 0); fijar(i, 6, i % 2 === 0); }
    // Patrones de posición (las tres esquinas)
    const posicion = (cx, cy) => {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          const d = Math.max(Math.abs(dx), Math.abs(dy));
          const x = cx + dx, y = cy + dy;
          if (x >= 0 && x < n && y >= 0 && y < n) fijar(x, y, d !== 2 && d !== 4);
        }
      }
    };
    posicion(3, 3); posicion(n - 4, 3); posicion(3, n - 4);
    // Patrones de alineación
    const alin = [];
    if (v > 1) {
      const cuantos = Math.floor(v / 7) + 2;
      const paso = Math.floor((v * 8 + cuantos * 3 + 5) / (cuantos * 4 - 4)) * 2;
      for (let p = n - 7; alin.length < cuantos - 1; p -= paso) alin.unshift(p);
      alin.unshift(6);
    }
    alin.forEach((ay, i) => alin.forEach((ax, j) => {
      const esquina = (i === 0 && j === 0) || (i === 0 && j === alin.length - 1) || (i === alin.length - 1 && j === 0);
      if (esquina) return;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) fijar(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
      }
    }));

    const formato = (mascara) => {
      const d = (BITS_FORMATO_M << 3) | mascara;
      let r = d;
      for (let i = 0; i < 10; i++) r = (r << 1) ^ ((r >>> 9) * 0x537);
      const b = ((d << 10) | r) ^ 0x5412;
      for (let i = 0; i <= 5; i++) fijar(8, i, bit(b, i));
      fijar(8, 7, bit(b, 6));
      fijar(8, 8, bit(b, 7));
      fijar(7, 8, bit(b, 8));
      for (let i = 9; i < 15; i++) fijar(14 - i, 8, bit(b, i));
      for (let i = 0; i < 8; i++) fijar(n - 1 - i, 8, bit(b, i));
      for (let i = 8; i < 15; i++) fijar(8, n - 15 + i, bit(b, i));
      fijar(8, n - 8, true); // módulo oscuro fijo
    };
    formato(0); // reserva la zona; se rehace con la máscara elegida

    if (v >= 7) {
      let r = v;
      for (let i = 0; i < 12; i++) r = (r << 1) ^ ((r >>> 11) * 0x1f25);
      const b = (v << 12) | r;
      for (let i = 0; i < 18; i++) {
        const a = n - 11 + (i % 3), c = Math.floor(i / 3);
        fijar(a, c, bit(b, i));
        fijar(c, a, bit(b, i));
      }
    }

    // Datos en zigzag, de dos en dos columnas, de derecha a izquierda
    const codigos = conCorreccion(datos, v);
    let i = 0;
    for (let der = n - 1; der >= 1; der -= 2) {
      if (der === 6) der = 5;
      for (let vert = 0; vert < n; vert++) {
        for (let j = 0; j < 2; j++) {
          const x = der - j;
          const y = ((der + 1) & 2) === 0 ? n - 1 - vert : vert;
          if (!fija[y][x] && i < codigos.length * 8) {
            mod[y][x] = bit(codigos[i >>> 3], 7 - (i & 7));
            i++;
          }
        }
      }
    }

    const invertir = (m) => {
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
          let inv;
          switch (m) {
            case 0: inv = (x + y) % 2 === 0; break;
            case 1: inv = y % 2 === 0; break;
            case 2: inv = x % 3 === 0; break;
            case 3: inv = (x + y) % 3 === 0; break;
            case 4: inv = (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0; break;
            case 5: inv = ((x * y) % 2) + ((x * y) % 3) === 0; break;
            case 6: inv = (((x * y) % 2) + ((x * y) % 3)) % 2 === 0; break;
            default: inv = (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
          }
          if (!fija[y][x] && inv) mod[y][x] = !mod[y][x];
        }
      }
    };

    // Elige la máscara con menor penalización (más fácil de leer para las cámaras)
    let mejor = 0, menor = Infinity;
    for (let m = 0; m < 8; m++) {
      invertir(m);
      formato(m);
      const p = penalizacion(mod, n);
      if (p < menor) { menor = p; mejor = m; }
      invertir(m);
    }
    invertir(mejor);
    formato(mejor);
    return mod;
  }

  function penalizacion(mod, n) {
    let r = 0;
    const historial = () => [0, 0, 0, 0, 0, 0, 0];
    const anotar = (largo, h) => {
      if (h[0] === 0) largo += n;
      h.pop();
      h.unshift(largo);
    };
    const contar = (h) => {
      const k = h[1];
      const centro = k > 0 && h[2] === k && h[3] === k * 3 && h[4] === k && h[5] === k;
      return (centro && h[0] >= k * 4 && h[6] >= k ? 1 : 0) + (centro && h[6] >= k * 4 && h[0] >= k ? 1 : 0);
    };
    const cerrar = (color, largo, h) => {
      if (color) { anotar(largo, h); largo = 0; }
      anotar(largo + n, h);
      return contar(h);
    };
    const linea = (get) => {
      let color = false, largo = 0;
      const h = historial();
      for (let i = 0; i < n; i++) {
        if (get(i) === color) {
          largo++;
          if (largo === 5) r += 3;
          else if (largo > 5) r++;
        } else {
          anotar(largo, h);
          if (!color) r += contar(h) * 40;
          color = get(i);
          largo = 1;
        }
      }
      r += cerrar(color, largo, h) * 40;
    };
    for (let y = 0; y < n; y++) linea((x) => mod[y][x]);
    for (let x = 0; x < n; x++) linea((y) => mod[y][x]);
    for (let y = 0; y < n - 1; y++) {
      for (let x = 0; x < n - 1; x++) {
        const c = mod[y][x];
        if (c === mod[y][x + 1] && c === mod[y + 1][x] && c === mod[y + 1][x + 1]) r += 3;
      }
    }
    let oscuros = 0;
    mod.forEach((fila) => fila.forEach((c) => { if (c) oscuros++; }));
    const total = n * n;
    r += (Math.ceil(Math.abs(oscuros * 20 - total * 10) / total) - 1) * 10;
    return r;
  }

  // SVG con margen de 4 módulos, como pide la norma
  function svg(texto, etiqueta) {
    const m = matriz(texto);
    const n = m.length, borde = 4, lado = n + borde * 2;
    let d = "";
    m.forEach((fila, y) => fila.forEach((c, x) => { if (c) d += `M${x + borde} ${y + borde}h1v1h-1z`; }));
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${lado} ${lado}" shape-rendering="crispEdges" role="img" aria-label="${etiqueta || "Código QR"}">` +
      `<rect width="${lado}" height="${lado}" fill="#ffffff"/><path d="${d}" fill="#2b2838"/></svg>`;
  }

  window.QR = { matriz, svg };
})();

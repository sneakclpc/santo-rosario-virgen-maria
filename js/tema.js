/* Aplica el modo noche y el tamaño de letra antes de pintar la página, para que no parpadee. */
try {
  var guardado = JSON.parse(localStorage.getItem("rosario.config") || "null");
  if (guardado && guardado.noche === true) document.documentElement.setAttribute("data-tema", "noche");
  if (guardado && typeof guardado.letra === "number" && guardado.letra >= 1 && guardado.letra <= 1.5) {
    document.documentElement.style.setProperty("--letra", String(guardado.letra));
  }
} catch (e) { /* sin almacenamiento: se usan los valores normales */ }

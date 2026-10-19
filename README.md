# Santo Rosario · Jesús por María

Rosario interactivo, gratuito y de acceso universal. Sitio estático (HTML, CSS y JavaScript sin dependencias) listo para GitHub Pages.

- Rosario gráfico: cada cuenta, la medalla y el crucifijo son botones; al tocar una cuenta vas a esa oración.
- Misterios del día propuestos automáticamente (lunes y sábado Gozosos, martes y viernes Dolorosos, miércoles y domingo Gloriosos, jueves Luminosos), con la opción de cambiarlos antes de comenzar.
- Cada misterio tiene su cita bíblica, una síntesis del pasaje, el fruto del misterio y una meditación.
- Oraciones opcionales: Señor ábreme los labios, Acto de contrición, Credo, Oración de Fátima, jaculatoria, intenciones del Papa, Salve, Letanías Lauretanas, Bajo tu amparo, San Miguel y la oración final.
- Funciona en el móvil (deslizar para avanzar), con teclado (← →) y sin conexión una vez abierta.

## Probar en tu computadora

```bash
python -m http.server 8765
```

Luego abre http://localhost:8765

## Publicar gratis en GitHub Pages

1. Crea un repositorio público en GitHub, por ejemplo `santo-rosario`.
2. Sube estos archivos:
   ```bash
   git init
   git add .
   git commit -m "Santo Rosario"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/santo-rosario.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. En uno o dos minutos la app estará en `https://TU_USUARIO.github.io/santo-rosario/`.

Más adelante puedes apuntar un dominio propio desde la misma pantalla de Pages, sin cambiar el código.

## Fuentes

- Oraciones y nombres de los misterios: Compendio del Catecismo de la Iglesia Católica, Apéndice (vatican.va).
- Letanías Lauretanas y modo de rezar: página «El Santo Rosario» de vatican.va.
- Misterios Luminosos y días: *Rosarium Virginis Mariae* (san Juan Pablo II, 2002).
- Citas bíblicas: Sagrada Biblia de la Universidad de Navarra. Cada misterio enlaza al capítulo completo en la edición en línea de EWTN.
- Las síntesis, meditaciones y frutos de los misterios son textos propios, de tradición piadosa.

El texto de la Biblia de Navarra tiene derechos de autor (EUNSA), así que la app muestra la referencia, una síntesis propia y el enlace. Si obtienes permiso de la editorial, pega el texto literal en el campo `texto` de cada `cita` en [js/data.js](js/data.js) y la app lo mostrará en lugar de la síntesis.

Imágenes: la Virgen de Fátima y la Medalla Milagrosa (anverso y reverso) son ilustraciones vectoriales propias, en [img/](img/).

## Editar contenidos

Todo el contenido está en [js/data.js](js/data.js): oraciones, letanías, misterios, citas, frutos y meditaciones. Cuando cambies archivos, sube la versión de `CACHE` en [sw.js](sw.js) para que los teléfonos reciban la actualización.

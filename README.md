# Santo Rosario · Jesús por María

Rosario interactivo, gratuito y de acceso universal: **https://sneakclpc.github.io/santo-rosario-virgen-maria/**

Sitio estático (HTML, CSS y JavaScript, sin dependencias) publicado con GitHub Pages.

- **Rosario gráfico:** cada cuenta, la Medalla Milagrosa y el crucifijo son botones. La cuenta rosa marca dónde vas.
- **Misterios del día** propuestos automáticamente (lunes y sábado Gozosos; martes y viernes Dolorosos; miércoles y domingo Gloriosos; jueves Luminosos), con la opción de elegir otros o el **Rosario completo** (20 misterios).
- **Cada misterio** trae su cita bíblica con enlace a la Biblia de Navarra, una síntesis del pasaje, el fruto del misterio y una meditación.
- **Oraciones opcionales:** Señor ábreme los labios, Acto de contrición, Credo, Oración de Fátima, jaculatoria, intenciones del Papa, Salve, Letanías Lauretanas, Bajo tu amparo, Consagración «Oh Señora mía», Acordaos, Bendita sea tu pureza, San Miguel y la oración final.
- **Modo guía y respuesta** para rezar en familia, en grupo o en el carro: la voz dice la primera parte y deja la pausa para responder.
- **Lectura en voz alta** con la voz del dispositivo, avance automático y pantalla siempre encendida.
- **Tamaño de letra** ajustable, **modo noche**, botón **Compartir**, uso con teclado (← →) y funcionamiento **sin conexión**.

## Probar en tu computadora

```bash
python -m http.server 8765
```

Luego abre http://localhost:8765

## Publicar cambios

Cada `git push` a la rama `main` actualiza la página en uno o dos minutos. Cuando cambies archivos, sube también la versión de `CACHE` en [sw.js](sw.js): así los teléfonos ven el aviso «Hay una versión nueva».

## Seguridad y privacidad

- No hay servidores, cuentas, cookies ni rastreo. La intención y las preferencias se guardan solo en el navegador de cada persona.
- La página declara una política de seguridad de contenido (CSP) que solo permite cargar archivos del propio sitio.
- Las fuentes tipográficas están alojadas en el proyecto: ninguna visita se envía a terceros.

## Fuentes

- Oraciones y nombres de los misterios: Compendio del Catecismo de la Iglesia Católica, Apéndice (vatican.va).
- Letanías Lauretanas y modo de rezar: página «El Santo Rosario» de vatican.va.
- Misterios Luminosos y días: *Rosarium Virginis Mariae* (san Juan Pablo II, 2002).
- Citas bíblicas: Sagrada Biblia de la Universidad de Navarra. Cada misterio enlaza al capítulo completo en la edición en línea de EWTN.
- «Oh Señora mía»: versión de los Marianos de la Inmaculada Concepción (amm.org). «Bendita sea tu pureza»: versión de es.catholic.net. «Acordaos»: texto tradicional atribuido a san Bernardo.
- Las síntesis, meditaciones y frutos de los misterios son textos propios, de tradición piadosa.

El texto de la Biblia de Navarra tiene derechos de autor (EUNSA), así que la app muestra la referencia, una síntesis propia y el enlace. Si obtienes permiso de la editorial, pega el texto literal en el campo `texto` de cada `cita` en [js/data.js](js/data.js) y la app lo mostrará en lugar de la síntesis.

## Licencia

Código bajo licencia MIT; textos propios e ilustraciones bajo CC BY-SA 4.0. Detalles en [LICENSE](LICENSE). Las fuentes de [fonts/](fonts/) usan la SIL Open Font License.

## Editar contenidos

Todo el contenido está en [js/data.js](js/data.js): oraciones, letanías, misterios, citas, frutos y meditaciones.

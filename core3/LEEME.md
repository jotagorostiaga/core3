# CORE 3 Studio · Sitio web

Sitio estático (HTML + CSS + JS, sin build). Todo listo para subir tal cual.

## Estructura

```
core3/
├── index.html            Home
├── about.html            Sobre nosotras
├── calendario.html       Calendario / reservas (bsport)
├── core-founders.html    Core Founders
├── contacto.html         Contacto
├── landing.html          Landing de captación (Fase 1)
├── css/styles.css        Estilos (todo el sistema de diseño)
├── js/main.js            Interacciones (menú, formularios, scroll)
└── assets/
    ├── favicon.svg / favicon-32.png / favicon.ico / apple-touch-icon.png
    ├── fonts/            Playfair Display + Montserrat (woff2)
    ├── img/              Imágenes
    └── logos/            Logotipos (SVG)
```

## Cómo subirlo a GitHub Pages (reemplazo completo)

1. Entra en el repo `jotagorostiaga/core3` en GitHub.
2. Abre la carpeta **core3** dentro del repo (donde ya está la web).
3. Arrastra **todos** los archivos y carpetas de aquí dentro (index.html, about.html, css/, js/, assets/, etc.) y confirma el reemplazo.
4. Commit. En 1–2 min queda publicado.
5. Abre la web en incógnito o con **Cmd + Shift + R** para saltarte la caché del navegador.

> Importante: sube el contenido **de la carpeta**, no la carpeta entera, para no crear otro nivel `core3/core3/`.

## Pendientes de integración (marcados en el código)

- **Formulario de captación** (`landing.html` + `js/main.js`): conectar a Google Sheets / CRM.
- **bsport** (`calendario.html`, bonos, reservas): reemplazar los placeholders por los widgets reales.
- **Instagram**: el bloque usa imágenes fijas; se puede conectar un widget (Behold / Elfsight) para que se actualice solo.

# CORE 3 Studio - Sitio web

Sitio estático (HTML + CSS + JavaScript vanilla), sin dependencias ni build. Se abre directamente en el navegador y se puede subir a cualquier hosting o integrar en un CMS.

## Estructura

```
/
├── index.html            Home (todas las secciones del brief)
├── calendario.html       Calendario + filtros + hueco del widget bsport
├── core-founders.html    Página propia de Core Founders (permanente)
├── about.html            Sobre nosotros / filosofía
├── contacto.html         Formulario + datos + mapa
├── css/styles.css        Sistema de diseño completo (colores, tipografía, componentes)
├── js/main.js            Interacciones (scroll reveal, acordeones, menú, validación)
└── assets/
    ├── fonts/            Playfair Display + Montserrat (woff2 variable, self-hosted)
    ├── img/              Fotografías optimizadas
    └── logos/            Logos SVG originales de marca
```

## Marca aplicada

- **Tipografías:** Playfair Display (títulos) + Montserrat (cuerpo), auto-alojadas en `assets/fonts` (no dependen de Google Fonts).
- **Colores** (en `css/styles.css`, bloque `:root`):
  Lino Puro `#E3D6C6`, Bosque Botánico `#69705E`, Ámbar Silvestre `#BA8D56`, Bruma Mineral `#A3A384`, Nuez Robusta `#563313`, Negro Obsidiana `#121212`.
- **Logo:** la marca "C···" se construye con SVG inline y cambia de color según el fondo. Los SVG originales están en `assets/logos`.

## Puntos de integración con bsport (pendientes del estudio)

Todo lo de bsport está montado como *placeholder* claro, listo para conectar. Busca en el código:

1. **Login / Acceso socias** (en el header de todas las páginas):
   `https://backoffice.bsport.io/login?membership=[ID_CORE3]`
   Sustituir `[ID_CORE3]` por el membership ID real.
2. **Widget de calendario / reservas** (`calendario.html`): bloque `.widget-embed`. Pegar ahí el embed de bsport.
3. **Bonos y tarjetas regalo** (`index.html`, botones "Añadir" / "Comprar"): hoy apuntan a `calendario.html`. Conectar al carrito/widget de bonos de bsport.

## Formulario de captación de leads (prioridad del brief)

En `index.html`, sección "Sé de las primeras en enterarte":
- Bloque obligatorio (nombre + email) + bloque opcional progresivo (disciplinas, franjas, frecuencia, días, código postal) + checkbox Core Founders.
- Ahora mismo valida en cliente y muestra confirmación. **Falta conectar el envío** a Google Sheets / Airtable / CRM.
  Punto de integración marcado en `js/main.js` con el comentario `integration point`. Ahí se hace el `POST` con los datos del formulario.
- El formulario de `contacto.html` funciona igual (validación cliente, pendiente el envío real).

## Contenido editable

Textos, precios, imágenes y el banner de aviso superior están en el HTML, pensados para pasarse a campos de CMS. Los tipos de clase dentro de cada disciplina y en Core Founders están como *placeholder* señalado, para cerrarlos con el equipo.

## Notas

- Responsive mobile-first, con menú hamburguesa en móvil.
- Animaciones suaves (fade-in al hacer scroll, hover, smooth scroll, acordeones) que respetan `prefers-reduced-motion`.
- El mapa de `contacto.html` usa un embed de Google Maps con la búsqueda de Alcobendas; se puede afinar a la dirección exacta cuando esté confirmada.

Luz de Nuit — Portafolio (Frontend)

Estructura actual
- src/App.tsx: App modular con header, router por hash (#/inicio, #/catalogo, #/beneficios, #/testimonios, #/historia), footer y botón flotante de WhatsApp.
- src/pages/*: Páginas separadas por vista (Inicio, Catálogo, Beneficios, Testimonios, Historia) con sus CSS opcionales.
- src/components/ui/*: Componentes de UI reutilizables (Button, Card, Badge).
- src/components/icons.tsx: Iconos SVG sin dependencias externas.
- src/lib/brand.ts: Paleta de colores principal.
- src/lib/utils.ts: Utilidades (cn, formato de moneda, link de WhatsApp, tipos y helpers).
- src/data/products.ts: Datos de productos de ejemplo.

Navegación
- Se usa hash routing: visitar `#/catalogo` abre el catálogo, etc.
- La función `goto(route)` actualiza `window.location.hash` y el estado interno.

Tema claro/oscuro
- Se inicializa desde `localStorage` o preferencia del sistema.
- El botón del header alterna el tema y persiste la preferencia.

Catálogo
- Filtros por texto, tipo, notas aromáticas y rango de precio.
- Tarjetas con botón “Comprar por WhatsApp” y badges.
- “Ver más” para cargar por lotes hacia abajo (sin paginación clásica).

Footer y botón flotante
- Footer uniforme en todas las vistas.
- Botón flotante con margen seguro (`env(safe-area-inset-bottom)`) y relleno inferior del main para evitar solapamientos.

Cómo correr
- `npm install`
- `npm run dev`

Siguientes pasos sugeridos
- Integrar `react-router-dom` si se quiere navegación sin hash.
- Añadir tests ligeros para utilidades (`formatCurrency`, `whatsappLink`).
- Conectar imágenes reales de productos y llevar los datos a una API si aplica.


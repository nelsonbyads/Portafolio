# Luz de Nuit - Portafolio de Velas

Un portafolio digital elegante y moderno para **Luz de Nuit**, marca de velas artesanales con enfoque en aromaterapia natural y diseño minimalista.

## ✨ Características

- 🕯️ **Catálogo completo** con filtros avanzados por tipo, aroma y precio
- 🌙 **Modo oscuro/claro** con persistencia en localStorage
- 📱 **Diseño responsivo** optimizado para todos los dispositivos
- 🛒 **Integración WhatsApp** para ventas directas
- ⚡ **Animaciones fluidas** con Framer Motion
- 🎨 **Paleta de colores personalizada** de la marca
- 🔍 **Búsqueda inteligente** en productos y etiquetas
- 📄 **Navegación SPA** con múltiples secciones

## 🚀 Tecnologías utilizadas

- **React 18** con TypeScript
- **Vite** como bundler y herramienta de desarrollo
- **TailwindCSS** para estilos
- **Framer Motion** para animaciones
- **ESLint** para calidad de código

## 📦 Estructura del proyecto

```
luz-de-nuit-portfolio/
├── public/
│   ├── vite.svg
│   └── index.html
├── src/
│   ├── App.tsx          # Componente principal con toda la aplicación
│   ├── main.tsx         # Punto de entrada
│   └── index.css        # Estilos globales y TailwindCSS
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── README.md
```

## 🛠️ Instalación y uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación
1. Clona o descarga el proyecto
2. Instala las dependencias:
   ```bash
   npm install
   ```

### Desarrollo
Para iniciar el servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### Construcción
Para crear la versión de producción:
```bash
npm run build
```

### Vista previa
Para previsualizar la versión de producción:
```bash
npm run preview
```

## 🔧 Configuración

### WhatsApp
Edita el número de WhatsApp en `src/App.tsx`:
```typescript
const PHONE_NUMBER = "573196791189"; // Cambia por tu número
```

### Paleta de colores
Los colores de la marca se definen en:
```typescript
const BRAND = {
  primary: "#E77764",   // Color principal
  secondary: "#141414", // Color secundario
  accent: "#EFD89A",    // Color de acento
};
```

### Productos
Los productos se definen en el array `PRODUCTS` en `src/App.tsx`. Cada producto incluye:
- Información básica (nombre, tipo, precio)
- Detalles técnicos (capacidad, duración, ingredientes)
- Notas aromáticas y etiquetas
- Promociones opcionales

## 📱 Funcionalidades

### Navegación
- **Inicio**: Presentación de la marca con promociones
- **Catálogo**: Lista completa de productos con filtros
- **Beneficios**: Características y ventajas de las velas
- **Testimonios**: Opiniones de clientes
- **Historia**: Información sobre la marca y creadora

### Filtros del catálogo
- Búsqueda por texto
- Filtro por tipo de vela
- Filtro por notas aromáticas
- Rango de precios
- Paginación

### Integración WhatsApp
Cada producto incluye un botón que abre WhatsApp con un mensaje predefinido que incluye:
- Nombre del producto
- Características técnicas
- Precio

## 🎨 Personalización

### Agregar nuevos productos
1. Edita el array `PRODUCTS` en `src/App.tsx`
2. Sigue la estructura TypeScript definida
3. Incluye todos los campos requeridos

### Modificar secciones
Cada sección tiene su propio JSX en el componente principal. Puedes:
- Editar contenido
- Cambiar estilos
- Agregar nuevas funcionalidades

### Estilos
- Utiliza clases de TailwindCSS
- Los estilos personalizados están en `src/index.css`
- Los colores de marca se aplican mediante JavaScript inline

## 📄 Licencia

Este proyecto está desarrollado para **Luz de Nuit**. Todos los derechos reservados.

## 🤝 Soporte

Para soporte técnico o consultas sobre el portafolio, contacta a través de WhatsApp: [+57 319 679 1189](https://wa.me/573196791189)

---

**Luz de Nuit** - Encendé tu ritual de calma ✨

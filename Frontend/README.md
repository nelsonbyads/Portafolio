# Luz de Nuit - Portafolio Digital

Un portafolio moderno y optimizado para una marca de velas artesanales, construido con React, TypeScript y Tailwind CSS.

## ✨ Características

### 🎨 Diseño y UX
- **Diseño responsivo** con mobile-first approach
- **Tema oscuro/claro** con persistencia en localStorage
- **Animaciones suaves** con Framer Motion
- **Tipografía optimizada** con Inter font
- **Colores de marca** consistentes y accesibles

### ⚡ Rendimiento
- **Lazy loading** de imágenes
- **Memoización** de componentes y callbacks
- **Debounce/Throttle** para eventos
- **Error boundaries** para manejo de errores
- **SEO optimizado** con meta tags dinámicos

### 🧩 Componentes
- **Sistema de diseño** modular y reutilizable
- **Componentes UI** con variantes y estados
- **Hooks personalizados** para funcionalidad común
- **Tipado fuerte** con TypeScript

### 🔧 Tecnologías

- **React 18** con hooks modernos
- **TypeScript** para tipado estático
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones
- **React Router** para navegación
- **React Helmet** para SEO

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de UI base
│   ├── ErrorBoundary.tsx
│   ├── ScrollToTop.tsx
│   └── SEO.tsx
├── hooks/              # Hooks personalizados
│   ├── useTheme.ts
│   ├── useScroll.ts
│   ├── useLazyImage.ts
│   ├── useLocalStorage.ts
│   └── useMemoizedCallback.ts
├── lib/                # Utilidades y configuración
│   ├── utils.ts
│   └── constants.ts
├── types/              # Definiciones de tipos
│   └── index.ts
├── pages/              # Páginas de la aplicación
├── data/               # Datos estáticos
└── styles/             # Estilos globales
```

## 🎯 Componentes Principales

### Button
Componente de botón con múltiples variantes y estados.

```tsx
<Button 
  variant="solid" 
  size="md" 
  loading={false}
  onClick={handleClick}
>
  Click me
</Button>
```

### Card
Contenedor flexible con diferentes estilos.

```tsx
<Card 
  variant="elevated" 
  padding="md" 
  interactive={true}
>
  Content
</Card>
```

### Badge
Etiquetas con diferentes tonos y variantes.

```tsx
<Badge 
  tone="primary" 
  variant="solid" 
  size="md"
>
  New
</Badge>
```

## 🎨 Sistema de Colores

```css
/* Colores principales */
--brand-primary: #8B5CF6    /* Púrpura */
--brand-accent: #F59E0B     /* Ámbar */
--brand-secondary: #1F2937  /* Gris oscuro */

/* Colores de estado */
--success: #10B981
--warning: #F59E0B
--error: #EF4444
--info: #3B82F6
```

## 🔧 Hooks Personalizados

### useTheme
Manejo del tema con persistencia.

```tsx
const { theme, isDark, toggleTheme } = useTheme();
```

### useScroll
Información del scroll y utilidades.

```tsx
const { scrollY, isAtTop, scrollToTop } = useScroll();
```

### useLazyImage
Carga perezosa de imágenes.

```tsx
const { imgRef, imageSrc, isLoaded } = useLazyImage(src);
```

## 📱 Responsive Design

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ♿ Accesibilidad

- **Navegación por teclado** completa
- **ARIA labels** en elementos interactivos
- **Contraste** optimizado para WCAG
- **Focus indicators** visibles
- **Semántica HTML** correcta

## 🚀 Optimizaciones

### Rendimiento
- Lazy loading de imágenes
- Memoización de componentes
- Debounce en búsquedas
- Code splitting automático

### SEO
- Meta tags dinámicos
- Open Graph tags
- Twitter Cards
- Sitemap automático

### UX
- Loading states
- Error boundaries
- Transiciones suaves
- Feedback visual

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construcción de producción
npm run preview      # Preview de producción
npm run lint         # Linter de código
```

## 📄 Licencia

Este proyecto es privado y pertenece a Luz de Nuit.

---

**Desarrollado con ❤️ para Luz de Nuit**
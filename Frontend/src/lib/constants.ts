// App constants
export const APP_NAME = 'Luz de Nuit';
export const APP_DESCRIPTION = 'Velas artesanales con aromaterapia natural para crear momentos memorables';
export const APP_URL = 'https://luzdenuit.com';

// Contact information
export const PHONE_NUMBER = '573196791189';
export const WHATSAPP_MESSAGE = 'Hola, quiero más información de Luz de Nuit ✨';

// Social media
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/luzdenuit',
  facebook: 'https://facebook.com/luzdenuit',
  whatsapp: `https://wa.me/${PHONE_NUMBER}`,
} as const;

// Navigation
export const NAVIGATION_ITEMS = [
  { key: 'inicio', label: 'Inicio', path: '/' },
  { key: 'catalogo', label: 'Catálogo', path: '/catalogo' },
  { key: 'beneficios', label: 'Beneficios', path: '/beneficios' },
  { key: 'historia', label: 'Historia', path: '/historia' },
] as const;

// Product types
export const PRODUCT_TYPES = [
  'Aromaterapia',
  'Masaje', 
  'Decorativa',
  'Personalizada'
] as const;

// Animation durations
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'luzdenuit-theme',
  cart: 'luzdenuit-cart',
  favorites: 'luzdenuit-favorites',
  userPreferences: 'luzdenuit-user-preferences',
} as const;

// API endpoints (if needed in the future)
export const API_ENDPOINTS = {
  products: '/api/products',
  contact: '/api/contact',
  newsletter: '/api/newsletter',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  generic: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.',
  network: 'Error de conexión. Verifica tu internet e intenta de nuevo.',
  notFound: 'El contenido que buscas no fue encontrado.',
  unauthorized: 'No tienes permisos para realizar esta acción.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  contactSent: '¡Mensaje enviado correctamente! Te contactaremos pronto.',
  newsletterSubscribed: '¡Te has suscrito exitosamente a nuestro boletín!',
  productAdded: 'Producto agregado al carrito',
} as const;


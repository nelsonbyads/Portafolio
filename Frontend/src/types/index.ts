// Base types
export type Theme = 'light' | 'dark';

export type Size = 'sm' | 'md' | 'lg';

export type Variant = 'solid' | 'ghost' | 'outline' | 'soft';

export type Tone = 'primary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error';

// Navigation types
export type RouteKey = 'inicio' | 'catalogo' | 'beneficios' | 'historia';

export interface NavigationItem {
  key: RouteKey;
  label: string;
  path: string;
}

// Product types
export type ProductType = 'Aromaterapia' | 'Masaje' | 'Decorativa' | 'Personalizada';

export interface Product {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  price: number;
  capacityMl: number;
  burnTimeHours: number;
  scentNotes: string[];
  description: string;
  ingredients: string[];
  isMassageSafe?: boolean;
  isNatural?: boolean;
  tags: string[];
  color?: string;
  image?: string;
  promo?: ProductPromo;
}

export interface ProductPromo {
  label: string;
  discountPercent: number;
  until?: string;
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export interface BadgeProps extends BaseComponentProps {
  tone?: Tone;
  size?: Size;
  variant?: 'solid' | 'soft' | 'outline';
}

// Hook types
export interface UseScrollReturn {
  scrollY: number;
  scrollDirection: 'up' | 'down';
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollToElement: (elementId: string) => void;
}

export interface UseThemeReturn {
  theme: Theme;
  isDark: boolean;
  isLoading: boolean;
  toggleTheme: () => void;
  setLightTheme: () => void;
  setDarkTheme: () => void;
}

// API types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
}

// SEO types
export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  siteName?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    custom?: (value: any) => string | null;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

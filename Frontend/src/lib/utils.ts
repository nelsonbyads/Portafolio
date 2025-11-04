import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PHONE_NUMBER } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, currency = "COP", locale = "es-CO") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function whatsappLink(message: string, phone = PHONE_NUMBER) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function formatDate(date: Date | string, locale = "es-CO"): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Re-export types from central types file
export type { ProductType, Product, ProductPromo } from '../types';

export function productToMessage(p: import('../types').Product) {
  const base = `Hola, me interesa la *${p.name}* (tipo: ${p.type}).`;
  const detalles = `\nCapacidad: ${p.capacityMl} ml\nDuración: ${p.burnTimeHours} h\nPrecio: ${formatCurrency(p.price)}`;
  const instrucciones = "\n¿Podemos coordinar compra y entrega?";
  return `${base}${detalles}${instrucciones}`;
}


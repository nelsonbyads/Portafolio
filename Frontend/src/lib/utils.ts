export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export const PHONE_NUMBER = "573196791189"; // Ajusta si lo necesitas

export function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${PHONE_NUMBER}?text=${encoded}`;
}

export type ProductType = "Aromaterapia" | "Masaje" | "Decorativa" | "Personalizada";

export type Product = {
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
  promo?: { label: string; discountPercent: number; until?: string };
};

export function productToMessage(p: Product) {
  const base = `Hola, me interesa la *${p.name}* (tipo: ${p.type}).`;
  const detalles = `\nCapacidad: ${p.capacityMl} ml\nDuración: ${p.burnTimeHours} h\nPrecio: ${formatCurrency(p.price)}`;
  const instrucciones = "\n¿Podemos coordinar compra y entrega?";
  return `${base}${detalles}${instrucciones}`;
}


import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Luz de Nuit – Portafolio de Velas (TypeScript + React, TailwindCSS)
 *
 * ✔ Varias "páginas" dentro del mismo componente mediante `route` (inicio, catálogo, beneficios, testimonios, historia)
 * ✔ Paleta de colores aplicada (primary, secondary, accent)
 * ✔ Modo claro/oscuro con toggle y persistencia en localStorage
 * ✔ Portada con mensaje atractivo y slogans rotativos
 * ✔ Catálogo con imágenes (placeholders), descripciones persuasivas, filtros y paginación
 * ✔ Beneficios, Testimonios, Historia
 * ✔ Botón fijo para comprar por WhatsApp + botón por producto (mensaje prellenado)
 * ✔ Promociones visibles en la página de Inicio
 *
 * 👉 Reemplaza PHONE_NUMBER con tu número de WhatsApp en formato internacional (por ejemplo, 573001112233).
 */

// Utilidad simple para concatenar clases
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const BRAND = {
  primary: "#E77764", // Primary color
  secondary: "#141414", // Secondary color
  accent: "#EFD89A", // Accent color
};

// ===== Tipos =====

type ProductType = "Aromaterapia" | "Masaje" | "Decorativa" | "Personalizada";

type Product = {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  price: number; // en COP o tu moneda preferida
  capacityMl: number;
  burnTimeHours: number;
  scentNotes: string[];
  description: string;
  ingredients: string[];
  isMassageSafe?: boolean;
  isNatural?: boolean;
  tags: string[];
  color?: string; // para placeholder visual
  image?: string; // URL opcional
  promo?: { label: string; discountPercent: number; until?: string };
};

// Número de WhatsApp a reemplazar (el usuario ya colocó su número)
const PHONE_NUMBER = "573196791189"; // ← Reemplaza por tu número si deseas otro formato

// Slogans para banners / titulares llamativos
const SLOGANS = [
  "Encendé tu ritual de calma",
  "Diseñadas para el momento perfecto",
  "Aromas que abrazan tu espacio",
  "Regala presencia, regala Luz de Nuit",
  "Bienestar en cada chispa",
];

// Lista de productos (mínimo 5 con descripciones persuasivas)
const PRODUCTS: Product[] = [
  {
    id: "vela-lavanda",
    name: "Vela de Lavanda Provenzal",
    slug: "vela-lavanda",
    type: "Aromaterapia",
    price: 48000,
    capacityMl: 220,
    burnTimeHours: 35,
    scentNotes: ["lavanda fresca", "hierbas suaves", "toque floral"],
    description:
      "Nuestra lavanda provenzal calma la mente y suaviza el ambiente. Elaborada con cera vegetal, mecha de algodón y aceites esenciales de grado terapéutico, es la compañera ideal para tu ritual nocturno de descanso.",
    ingredients: ["cera de soya", "aceite esencial de lavanda", "mecha de algodón"],
    isNatural: true,
    tags: ["relajación", "noches tranquilas", "aromaterapia"],
    color: "#D6D6FF",
    promo: { label: "-10% Semana Zen", discountPercent: 10, until: "2025-09-15" },
  },
  {
    id: "vela-vainilla",
    name: "Vela de Vainilla Bourbon",
    slug: "vela-vainilla",
    type: "Decorativa",
    price: 52000,
    capacityMl: 240,
    burnTimeHours: 40,
    scentNotes: ["vainilla cremosa", "azúcar morena", "madera suave"],
    description:
      "Cálida y envolvente, esta vela viste tus espacios con un aroma dulce y elegante. Perfecta para crear atmósferas acogedoras y celebrar momentos en casa.",
    ingredients: ["cera de soya", "fragancia grado cosmético", "mecha de algodón"],
    tags: ["hogar", "acogedor", "decoración"],
    color: "#FFE8C8",
  },
  {
    id: "vela-citronela",
    name: "Vela de Citronela al Aire Libre",
    slug: "vela-citronela",
    type: "Aromaterapia",
    price: 45000,
    capacityMl: 200,
    burnTimeHours: 30,
    scentNotes: ["cítrica", "limpia", "herbal"],
    description:
      "Refresca terrazas y balcones con notas cítricas de citronela 100% natural. Ideal para reuniones al atardecer y cenas al aire libre.",
    ingredients: ["cera de soya", "aceite esencial de citronela", "mecha de algodón"],
    isNatural: true,
    tags: ["exterior", "cenas", "cítrica"],
    color: "#E6FFCF",
    promo: { label: "2x1 Terraza Feliz", discountPercent: 50 },
  },
  {
    id: "vela-masaje-ylang",
    name: "Vela de Masaje Ylang-Ylang & Coco",
    slug: "vela-masaje-ylang",
    type: "Masaje",
    price: 68000,
    capacityMl: 180,
    burnTimeHours: 28,
    scentNotes: ["floral exótico", "coco suave", "vainilla ligera"],
    description:
      "Funde, apaga y masajea: una mezcla sedosa de manteca de karité, aceite de coco y ylang-ylang pensada para nutrir tu piel y relajar el cuerpo.",
    ingredients: ["cera de soya", "manteca de karité", "aceite de coco", "aceite esencial ylang-ylang"],
    isMassageSafe: true,
    tags: ["spa en casa", "piel suave", "ritual"],
    color: "#FFF0F6",
  },
  {
    id: "vela-personalizada",
    name: "Vela Personalizada (Aroma & Etiqueta)",
    slug: "vela-personalizada",
    type: "Personalizada",
    price: 75000,
    capacityMl: 250,
    burnTimeHours: 42,
    scentNotes: ["elige tu aroma", "tu dedicatoria", "empaque de regalo"],
    description:
      "Crea el detalle perfecto: elige aroma, color de cera y personaliza la etiqueta con nombre, fecha o mensaje especial. Ideal para regalos corporativos, bodas y cumpleaños.",
    ingredients: ["cera de soya", "aceites/aromas a elección", "mecha de algodón"],
    tags: ["regalos", "eventos", "personalización"],
    color: "#E7F0FF",
    promo: { label: "-15% Packs Corporativos", discountPercent: 15, until: "2025-10-01" },
  },
  {
    id: "vela-eucalipto-menta",
    name: "Vela Eucalipto & Menta Respira",
    slug: "vela-eucalipto-menta",
    type: "Aromaterapia",
    price: 50000,
    capacityMl: 220,
    burnTimeHours: 36,
    scentNotes: ["mentolada", "fresca", "claridad"],
    description:
      "Despeja y revitaliza. Eucalipto y menta para cuando necesitas foco, respiración profunda y un ambiente purificado.",
    ingredients: ["cera de soya", "aceite esencial de eucalipto", "aceite esencial de menta"],
    isNatural: true,
    tags: ["claridad", "foco", "pureza"],
    color: "#E0FFF7",
  },
];

// ===== Utilidades =====

function formatCurrency(value: number) {
  // Ajusta a tu moneda/localidad
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);
}

function whatsappLink(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${PHONE_NUMBER}?text=${encoded}`;
}

function productToMessage(p: Product) {
  const base = `Hola, me interesa la *${p.name}* (tipo: ${p.type}).`;
  const detalles = `\nCapacidad: ${p.capacityMl} ml\nDuración: ${p.burnTimeHours} h\nPrecio: ${formatCurrency(p.price)}`;
  const instrucciones = "\n¿Podemos coordinar compra y entrega?";
  return `${base}${detalles}${instrucciones}`;
}

// ===== Componentes =====

const Badge: React.FC<{ children: React.ReactNode; tone?: "primary" | "accent" | "neutral" } & React.HTMLAttributes<HTMLSpanElement>> = ({ children, tone = "neutral", className, ...props }) => (
  <span
    {...props}
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
      tone === "primary" && "text-white",
      tone === "neutral" && "text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800",
      tone === "accent" && "text-gray-900",
      className
    )}
    style={tone === "primary" ? { backgroundColor: BRAND.primary } : tone === "accent" ? { backgroundColor: BRAND.accent } : {}}
  >
    {children}
  </span>
);

const Card: React.FC<{ children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div
    {...props}
    className={cn(
      "rounded-2xl border shadow-sm transition hover:shadow-md bg-white/90 dark:bg-zinc-900/80 backdrop-blur",
      "border-zinc-200 dark:border-zinc-800",
      className
    )}
  >
    {children}
  </div>
);

const Button: React.FC<{ children: React.ReactNode; href?: string; onClick?: () => void; variant?: "solid" | "ghost"; size?: "md" | "lg" } & React.HTMLAttributes<HTMLAnchorElement>> = ({ children, href, onClick, className, variant = "solid", size = "md", ...props }) => {
  const base = cn(
    "inline-flex items-center justify-center rounded-2xl font-semibold transition focus:outline-none focus:ring-2 cursor-pointer",
    size === "md" ? "px-4 py-2 text-sm" : "px-6 py-3 text-base",
    variant === "solid"
      ? "text-white focus:ring-offset-2"
      : "text-gray-900 dark:text-gray-100 border border-zinc-200 dark:border-zinc-800 bg-transparent"
  );
  const style = variant === "solid" ? { backgroundColor: BRAND.primary } : undefined;
  if (href) {
    return (
      <a href={href} onClick={onClick} className={cn(base, className)} style={style} {...props} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <a onClick={onClick} className={cn(base, className)} style={style} {...props}>
      {children}
    </a>
  );
};

// Iconos simples en SVG (evita dependencias externas)
const IconSun = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
);
const IconMoon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
);
const IconSearch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
);
const IconChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M15 18l-6-6 6-6"/></svg>
);
const IconChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M9 18l6-6-6-6"/></svg>
);
const IconSparkles = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M5 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z" transform="translate(5 3)"/></svg>
);
const IconLeaf = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M5 21c8 0 14-6 14-14V3H7C7 11 1 17 1 17s2 4 4 4z"/></svg>
);
const IconHeart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
);
const IconFlame = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><path d="M14.5 4.5S16 7 13 9s-1 4 1 5 3-1 3-3 0-4-2.5-6.5z"/><path d="M8.5 8.5S7 11 10 13s1 4-1 5-3-1-3-3 0-4 2.5-6.5z"/></svg>
);
const IconMenu = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
);
const IconX = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

// ===== Componente principal =====

export default function App() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ProductType | "Todos">("Todos");
  const [scentFilter, setScentFilter] = useState<string | "Todos">("Todos");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const [sloganIndex, setSloganIndex] = useState(0);
  const [route, setRoute] = useState<'inicio'|'catalogo'|'beneficios'|'testimonios'|'historia'>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Persistencia modo oscuro
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem("luzdenuit-theme");
    if (saved) {
      setDark(saved === "dark");
      document.documentElement.classList.toggle('dark', saved === 'dark')
    }
  }, []);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem("luzdenuit-theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle('dark', dark)
  }, [dark]);

  // Cambio automático de slogan
  useEffect(() => {
    const t = setInterval(() => setSloganIndex((i) => (i + 1) % SLOGANS.length), 3800);
    return () => clearInterval(t);
  }, []);

  // Chequeos simples (pseudo-tests) para utilidades en dev
  useEffect(() => {
    const msg = productToMessage(PRODUCTS[0]);
    console.assert(msg.includes(PRODUCTS[0].name), 'Mensaje de WhatsApp debe incluir el nombre del producto');
    console.assert(whatsappLink('hola').includes('wa.me'), 'whatsappLink debe generar un enlace válido');
  }, []);

  const scents = useMemo(() => {
    const s = new Set<string>();
    PRODUCTS.forEach((p) => p.scentNotes.forEach((n) => s.add(n)));
    return ["Todos", ...Array.from(s)];
  }, []);

  const filtered = useMemo(() => {
    let data = PRODUCTS.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (typeFilter !== "Todos") {
      data = data.filter((p) => p.type === typeFilter);
    }
    if (scentFilter !== "Todos") {
      const sf = scentFilter.toLowerCase();
      data = data.filter((p) => p.scentNotes.some((n) => n.toLowerCase().includes(sf)));
    }
    if (minPrice !== "") data = data.filter((p) => p.price >= Number(minPrice));
    if (maxPrice !== "") data = data.filter((p) => p.price <= Number(maxPrice));
    return data;
  }, [query, typeFilter, scentFilter, minPrice, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const promotions = PRODUCTS.filter((p) => p.promo);

  return (
    <div className={cn("min-h-screen w-full antialiased transition-colors", dark ? "dark" : "")}
      style={{
        backgroundColor: dark ? BRAND.secondary : "#FAFAFA",
        color: dark ? "#F4F4F5" : "#111827",
        backgroundImage: dark
          ? `radial-gradient(1200px 500px at 10% 0%, ${BRAND.primary}15, transparent 60%), radial-gradient(800px 300px at 100% 20%, ${BRAND.accent}10, transparent 70%)`
          : `radial-gradient(1200px 500px at 10% 0%, ${BRAND.accent}18, transparent 60%), radial-gradient(800px 300px at 100% 20%, ${BRAND.primary}10, transparent 70%)`
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl" style={{ backgroundColor: BRAND.primary }} />
            <div className="leading-tight">
              <p className="text-sm sm:text-base font-extrabold tracking-tight">Luz de Nuit</p>
              <p className="text-[10px] sm:text-xs opacity-70 hidden xs:block">Velas artesanales • aromaterapia natural</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <button onClick={() => setRoute('inicio')} className={cn("opacity-80 hover:opacity-100 transition-opacity", route==='inicio' && "underline underline-offset-4")}>Inicio</button>
            <button onClick={() => setRoute('catalogo')} className={cn("opacity-80 hover:opacity-100 transition-opacity", route==='catalogo' && "underline underline-offset-4")}>Catálogo</button>
            <button onClick={() => setRoute('beneficios')} className={cn("opacity-80 hover:opacity-100 transition-opacity", route==='beneficios' && "underline underline-offset-4")}>Beneficios</button>
            <button onClick={() => setRoute('testimonios')} className={cn("opacity-80 hover:opacity-100 transition-opacity", route==='testimonios' && "underline underline-offset-4")}>Testimonios</button>
            <button onClick={() => setRoute('historia')} className={cn("opacity-80 hover:opacity-100 transition-opacity", route==='historia' && "underline underline-offset-4")}>Historia</button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button href={whatsappLink("Hola, quiero más información de Luz de Nuit ✨")} size="md">Comprar por WhatsApp</Button>
            <button
              aria-label="Alternar tema"
              onClick={() => setDark((d) => !d)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              {dark ? <IconSun width={18} height={18} /> : <IconMoon width={18} height={18} />}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              aria-label="Alternar tema"
              onClick={() => setDark((d) => !d)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              {dark ? <IconSun width={16} height={16} /> : <IconMoon width={16} height={16} />}
            </button>
            <button
              aria-label="Abrir menú"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              {mobileMenuOpen ? <IconX width={16} height={16} /> : <IconMenu width={16} height={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-zinc-200 dark:border-zinc-800 md:hidden overflow-hidden bg-white/95 dark:bg-zinc-900/95 backdrop-blur"
            >
              <div className="px-4 py-4 space-y-3">
                <button 
                  onClick={() => { setRoute('inicio'); setMobileMenuOpen(false); }} 
                  className={cn("block w-full text-left py-2 px-3 rounded-lg transition-colors", route==='inicio' ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}
                >
                  Inicio
                </button>
                <button 
                  onClick={() => { setRoute('catalogo'); setMobileMenuOpen(false); }} 
                  className={cn("block w-full text-left py-2 px-3 rounded-lg transition-colors", route==='catalogo' ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}
                >
                  Catálogo
                </button>
                <button 
                  onClick={() => { setRoute('beneficios'); setMobileMenuOpen(false); }} 
                  className={cn("block w-full text-left py-2 px-3 rounded-lg transition-colors", route==='beneficios' ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}
                >
                  Beneficios
                </button>
                <button 
                  onClick={() => { setRoute('testimonios'); setMobileMenuOpen(false); }} 
                  className={cn("block w-full text-left py-2 px-3 rounded-lg transition-colors", route==='testimonios' ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}
                >
                  Testimonios
                </button>
                <button 
                  onClick={() => { setRoute('historia'); setMobileMenuOpen(false); }} 
                  className={cn("block w-full text-left py-2 px-3 rounded-lg transition-colors", route==='historia' ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}
                >
                  Historia
                </button>
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                  <Button href={whatsappLink("Hola, quiero más información de Luz de Nuit ✨")} size="md" className="w-full justify-center">
                    Comprar por WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* INICIO */}
      <section className="relative" style={{display: route==='inicio' ? 'block' : 'none'}}>
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(1200px 400px at 20% 0%, ${BRAND.accent}20, transparent 50%), radial-gradient(800px 300px at 100% 20%, ${BRAND.primary}20, transparent 60%)`,
          }}
        />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-8 sm:py-12 md:py-14 md:grid-cols-2 lg:gap-10">
          <div className="text-center md:text-left">
            <Badge tone="accent" className="mb-4">Nuevo • Portafolio Digital</Badge>
            <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              Velas artesanales para
              <span className="ml-1 sm:ml-2 rounded-lg sm:rounded-xl px-1 sm:px-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl" style={{ backgroundColor: BRAND.accent, color: BRAND.secondary }}>momentos memorables</span>
            </h1>
            <p className="mb-4 sm:mb-6 max-w-prose text-base sm:text-lg opacity-90 mx-auto md:mx-0">
              En Luz de Nuit creamos velas con propósito: bienestar, belleza y aroma natural en piezas minimalistas. Encendé la calma y transformá tu espacio.
            </p>

            <div className="mb-4 sm:mb-6 h-6 sm:h-7 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={sloganIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-xs sm:text-sm font-medium opacity-90"
                >
                  {SLOGANS[sloganIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button onClick={() => setRoute('catalogo')} variant="ghost" className="w-full sm:w-auto">Ver catálogo</Button>
              <Button href={whatsappLink("Hola, quiero comprar una vela ✨")} className="w-full sm:w-auto">Comprar ahora</Button>
            </div>
          </div>

          {/* Imagen/Mockup */}
          <div className="relative order-first md:order-last">
            <div className="mx-auto aspect-[4/3] w-full max-w-sm sm:max-w-md md:max-w-lg rounded-2xl sm:rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-3 sm:p-4 shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
              <div className="flex h-full items-center justify-center rounded-xl sm:rounded-2xl" style={{ backgroundColor: `${BRAND.primary}15` }}>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {PRODUCTS.slice(0, 3).map((p) => (
                    <div key={p.id} className="h-20 w-16 sm:h-24 sm:w-20 md:h-32 md:w-28 rounded-xl sm:rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800" style={{ background: p.color || "#eee" }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-3 sm:-bottom-4 left-4 sm:left-6">
              <Badge tone="primary" className="text-[10px] sm:text-[11px]">Aromaterapia natural</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOCIONES (sólo en INICIO) */}
      <section id="promociones" style={{display: route==='inicio' ? 'block' : 'none'}} className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Promociones</h2>
            <div className="h-[2px] w-12 mt-2 rounded-full" style={{backgroundColor: BRAND.accent}}/>
          </div>
          <span className="text-xs sm:text-sm opacity-70">Válidas por tiempo limitado</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              <div className="h-40 w-full" style={{ background: p.color || "#eee" }} />
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <Badge tone="primary">{p.promo!.label}</Badge>
                </div>
                {p.promo?.until && (
                  <p className="text-xs opacity-70 mb-2">Hasta {new Date(p.promo.until).toLocaleDateString("es-CO")}</p>
                )}
                <p className="mb-3 text-sm opacity-85 line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold" style={{ color: BRAND.primary }}>{formatCurrency(Math.round(p.price * (1 - (p.promo!.discountPercent || 0) / 100)))}</div>
                  <Button href={whatsappLink(productToMessage(p))} size="md">Lo quiero</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="catalogo" style={{display: route==='catalogo' ? 'block' : 'none'}} className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Catálogo</h2>
            <div className="h-[2px] w-12 mt-2 rounded-full" style={{backgroundColor: BRAND.accent}}/>
            <p className="text-sm opacity-70">Explorá por tipo, notas aromáticas y precio</p>
          </div>

          {/* Filtros */}
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" width={16} height={16} />
              <input
                className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-0 transition placeholder:opacity-60 focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-700 sm:w-64"
                placeholder="Buscar producto o etiqueta"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              />
            </div>
            <select
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value as any); setPage(1); }}
            >
              {(["Todos", "Aromaterapia", "Masaje", "Decorativa", "Personalizada"] as const).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
              value={scentFilter}
              onChange={(e) => { setScentFilter(e.target.value as any); setPage(1); }}
            >
              {scents.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <input type="number" min={0} placeholder="$ mín" value={minPrice as any}
                     onChange={(e) => { setMinPrice(e.target.value === "" ? "" : Number(e.target.value)); setPage(1); }}
                     className="w-24 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900" />
              <span className="text-sm opacity-60">—</span>
              <input type="number" min={0} placeholder="$ máx" value={maxPrice as any}
                     onChange={(e) => { setMaxPrice(e.target.value === "" ? "" : Number(e.target.value)); setPage(1); }}
                     className="w-24 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900" />
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pageItems.map((p) => (
            <Card key={p.id} className="overflow-hidden">
              {/* Imagen */}
              <div className="relative h-44 w-full" style={{ background: p.color || "#eee" }}>
                {p.promo && (
                  <div className="absolute left-3 top-3">
                    <Badge tone="primary">{p.promo.label}</Badge>
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">{p.name}</h3>
                    <p className="text-xs opacity-60">{p.type} • {p.capacityMl} ml • {p.burnTimeHours} h</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm line-through opacity-40">{p.promo ? formatCurrency(p.price) : "\u00A0"}</p>
                    <p className="text-base font-bold" style={{ color: BRAND.primary }}>
                      {p.promo ? formatCurrency(Math.round(p.price * (1 - (p.promo.discountPercent || 0) / 100))) : formatCurrency(p.price)}
                    </p>
                  </div>
                </div>

                <p className="mb-3 line-clamp-3 text-sm opacity-85">{p.description}</p>

                <div className="mb-3 flex flex-wrap gap-2">
                  {p.scentNotes.slice(0, 3).map((n) => (
                    <Badge key={n} tone="neutral">{n}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button href={whatsappLink(productToMessage(p))}>Comprar por WhatsApp</Button>
                  <a href={`#${p.slug}`} className="text-sm opacity-70 underline-offset-4 hover:underline">Detalles</a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Paginación */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-zinc-200 bg-white px-3 text-sm disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <IconChevronLeft width={16} height={16} /> Anterior
          </button>
          <span className="text-sm opacity-80">Página {page} de {totalPages}</span>
          <button
            className="inline-flex h-10 items-center gap-1 rounded-xl border border-zinc-200 bg-white px-3 text-sm disabled:opacity-40 dark:border-zinc-800 dark:bg-zinc-900"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Siguiente <IconChevronRight width={16} height={16} />
          </button>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" style={{display: route==='beneficios' ? 'block' : 'none'}} className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Beneficios de nuestras velas</h2>
          <p className="mt-2 text-sm opacity-80">Bienestar real en piezas minimalistas y elegantes</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="p-6 text-center">
            <div className="mx-auto mb-3 h-10 w-10 text-rose-500" style={{ color: BRAND.primary }}><IconFlame width={40} height={40} /></div>
            <h3 className="font-semibold">Combustión limpia</h3>
            <p className="mt-1 text-sm opacity-80">Cera vegetal y mecha de algodón para una llama estable y menos hollín.</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="mx-auto mb-3 h-10 w-10" style={{ color: BRAND.primary }}><IconLeaf width={40} height={40} /></div>
            <h3 className="font-semibold">Aromas naturales</h3>
            <p className="mt-1 text-sm opacity-80">Aceites esenciales y fragancias grado cosmético, seleccionados con cuidado.</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="mx-auto mb-3 h-10 w-10" style={{ color: BRAND.primary }}><IconHeart width={40} height={40} /></div>
            <h3 className="font-semibold">Hechas a mano</h3>
            <p className="mt-1 text-sm opacity-80">Cada vela se vierte artesanalmente en pequeños lotes para garantizar calidad.</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="mx-auto mb-3 h-10 w-10" style={{ color: BRAND.primary }}><IconSparkles width={40} height={40} /></div>
            <h3 className="font-semibold">Diseño minimalista</h3>
            <p className="mt-1 text-sm opacity-80">Estética elegante que combina con cualquier espacio y ocasión.</p>
          </Card>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="testimonios" style={{display: route==='testimonios' ? 'block' : 'none'}} className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Testimonios</h2>
          <p className="mt-2 text-sm opacity-80">Lo que dicen quienes ya encendieron su ritual</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[{
            name: "Camila R.",
            text: "La vela de lavanda me cambió las noches. Aroma suave, dura mucho y la presentación es preciosa.",
          }, {
            name: "Daniel M.",
            text: "Regalé una personalizada y fue un éxito. El detalle de la etiqueta con el nombre ¡maravilloso!",
          }, {
            name: "Laura S.",
            text: "La de masaje es perfecta para relajarnos después del trabajo. Textura cálida y delicada con la piel.",
          }].map((t) => (
            <Card key={t.name} className="p-6">
              <p className="mb-3 text-sm opacity-90">"{t.text}"</p>
              <div className="text-sm font-semibold">{t.name}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* HISTORIA */}
      <section id="historia" style={{display: route==='historia' ? 'block' : 'none'}} className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Quién soy • Historia de la marca</h2>
            <p className="mt-3 text-sm leading-relaxed opacity-90">
              Soy la creadora de <strong>Luz de Nuit</strong>, una marca nacida de la búsqueda de calma en lo cotidiano. Empecé a verter velas en casa, explorando
              mezclas naturales y un diseño minimalista que se sintiera elegante y cercano. Hoy, cada vela que producimos mantiene esa esencia: calidad artesanal,
              ingredientes confiables y una estética que abraza tus espacios sin sobrecargarlos.
            </p>
            <p className="mt-3 text-sm leading-relaxed opacity-90">
              Creemos en el poder de los pequeños rituales. Encender una vela puede marcar el inicio de un momento: leer, meditar, compartir o simplemente respirar.
              Gracias por permitirnos acompañarte en esos instantes.
            </p>
            <div className="mt-5"><Button href={whatsappLink("Hola, me encantó la historia de Luz de Nuit y quiero comprar ✨")}>Quiero la mía</Button></div>
          </div>
          <div className="h-64 rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950" />
        </div>
      </section>

      {/* CTA Sección (siempre visible, debajo del contenido) */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <Card className="overflow-hidden">
            <div className="relative grid grid-cols-1 items-center gap-6 p-8 md:grid-cols-3" style={{ background: `${BRAND.accent}40` }}>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold tracking-tight">¿Listx para encender tu ritual?</h3>
                <p className="mt-2 text-sm opacity-85">Escribinos por WhatsApp para personalizar tu pedido o comprar de inmediato.</p>
              </div>
              <div className="md:justify-self-end">
                <Button size="lg" href={whatsappLink("Hola, quiero hacer mi pedido con Luz de Nuit ✨")} >Comprar por WhatsApp</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="border-t border-zinc-200 px-4 py-10 dark:border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm opacity-70">© {new Date().getFullYear()} Luz de Nuit • Todos los derechos reservados</div>
          <div className="flex items-center gap-3">
            <button onClick={() => setRoute('catalogo')} className="text-sm opacity-80 hover:opacity-100">Catálogo</button>
            <button onClick={() => setRoute('beneficios')} className="text-sm opacity-80 hover:opacity-100">Beneficios</button>
            <button onClick={() => setRoute('testimonios')} className="text-sm opacity-80 hover:opacity-100">Testimonios</button>
            <button onClick={() => setRoute('historia')} className="text-sm opacity-80 hover:opacity-100">Historia</button>
          </div>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a
        href={whatsappLink("Hola, vengo del portafolio web y quiero comprar ✨")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
        style={{ backgroundColor: BRAND.primary }}
      >
        Pide por WhatsApp
      </a>
    </div>
  );
}

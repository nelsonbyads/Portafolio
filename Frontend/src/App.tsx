import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn, whatsappLink } from "./lib/utils";
import Button from "./components/ui/Button";
import { IconMenu, IconMoon, IconSun, IconX } from "./components/icons";
import { Routes, Route, NavLink, useLocation, useNavigate } from "react-router-dom";

import InicioPage from "./pages/Inicio";
import CatalogoPage from "./pages/Catalogo";
import BeneficiosPage from "./pages/Beneficios";
import HistoriaPage from "./pages/Historia";
import ProductDetailPage from "./pages/ProductDetail";

/**
 * App (modular)
 * - Header con navegación y toggle de tema
 * - Router por hash: #/inicio, #/catalogo, #/beneficios, #/historia
 * - Páginas separadas en src/pages
 * - Footer consistente y botón flotante de WhatsApp
 */
export default function App() {
  const [dark, setDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Tema: inicializa desde preferencia guardada o del sistema
  useEffect(() => {
    const saved = localStorage.getItem("luzdenuit-theme");
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);
  useEffect(() => {
    localStorage.setItem("luzdenuit-theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle('dark', dark)
  }, [dark]);

  const path = location.pathname || "/";
  const routeActive = (key: 'inicio'|'catalogo'|'beneficios'|'historia') => {
    if (key === 'inicio') return path === '/' || path === '';
    return path.startsWith('/' + key);
  };
  const goto = (r: 'inicio'|'catalogo'|'beneficios'|'historia') => {
    navigate(r === 'inicio' ? '/' : `/${r}`);
  };

  return (
    <div className={cn("app-root min-h-screen w-full antialiased transition-colors flex flex-col", dark ? "dark" : "")}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-brand-primary" />
            <div className="leading-tight">
              <p className="text-sm sm:text-base font-extrabold tracking-tight">Luz de Nuit</p>
              <p className="text-[10px] sm:text-xs opacity-70 hidden xs:block">Velas artesanales • aromaterapia natural</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm">
            <NavLink to="/" className={({isActive}) => cn("opacity-80 hover:opacity-100 transition-opacity", (isActive) && "underline underline-offset-4")}>Inicio</NavLink>
            <NavLink to="/catalogo" className={({isActive}) => cn("opacity-80 hover:opacity-100 transition-opacity", (isActive) && "underline underline-offset-4")}>Catálogo</NavLink>
            <NavLink to="/beneficios" className={({isActive}) => cn("opacity-80 hover:opacity-100 transition-opacity", (isActive) && "underline underline-offset-4")}>Beneficios</NavLink>
            <NavLink to="/historia" className={({isActive}) => cn("opacity-80 hover:opacity-100 transition-opacity", (isActive) && "underline underline-offset-4")}>Historia</NavLink>
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
                <button onClick={() => { goto('inicio'); setMobileMenuOpen(false); }} className={cn("block w-full text-left py-2 px-3 rounded-lg transition-colors", routeActive('inicio') ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}>Inicio</button>
                <button onClick={() => { goto('catalogo'); setMobileMenuOpen(false); }} className={cn("block w-full text-left py-2 px-3 rounded-lg transition-colors", routeActive('catalogo') ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}>Catálogo</button>
                <button onClick={() => { goto('beneficios'); setMobileMenuOpen(false); }} className={cn("block w-full text-left py-2 px-3 rounded-lg transition-colors", routeActive('beneficios') ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}>Beneficios</button>
                <button onClick={() => { goto('historia'); setMobileMenuOpen(false); }} className={cn("block w-full text-left py-2 px-3 rounded-lg transition-colors", routeActive('historia') ? "bg-zinc-100 dark:bg-zinc-800" : "hover:bg-zinc-50 dark:hover:bg-zinc-800")}>Historia</button>
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-700">
                  <Button href={whatsappLink("Hola, quiero más información de Luz de Nuit ✨")} size="md" className="w-full justify-center">Comprar por WhatsApp</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pb-28 md:pb-28 lg:pb-24">
        <Routes>
          <Route path="/" element={<InicioPage goto={(r) => goto(r as any)} />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/catalogo/:slug" element={<ProductDetailPage />} />
          <Route path="/beneficios" element={<BeneficiosPage />} />
          <Route path="/historia" element={<HistoriaPage />} />
          <Route path="*" element={<InicioPage goto={(r) => goto(r as any)} />} />
        </Routes>
      </main>

      {/* Footer consistente */}
      <footer role="contentinfo" className="mt-auto border-t border-zinc-200 px-4 py-12 dark:border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 pr-36 md:pr-40">
          <div className="text-sm opacity-70">© {new Date().getFullYear()} Luz de Nuit • Todos los derechos reservados</div>
          <div className="flex items-center gap-4 flex-wrap">
            <button onClick={() => goto('catalogo')} className="text-sm opacity-80 hover:opacity-100">Catálogo</button>
            <button onClick={() => goto('beneficios')} className="text-sm opacity-80 hover:opacity-100">Beneficios</button>
            <button onClick={() => goto('historia')} className="text-sm opacity-80 hover:opacity-100">Historia</button>
          </div>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a
        href={whatsappLink("Hola, vengo del portafolio web y quiero comprar ✨")}
        target="_blank"
        rel="noreferrer"
        className="fixed z-40 right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] md:right-8 md:bottom-[max(2rem,env(safe-area-inset-bottom))] inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl bg-brand-primary"
      >
        Pide por WhatsApp
      </a>
    </div>
  );
}

import { useEffect, useState, useCallback, useMemo } from "react";
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
import ScrollToTop from "./components/ScrollToTop";
import SEO from "./components/SEO";

// Types
type RouteKey = 'inicio' | 'catalogo' | 'beneficios' | 'historia';

/**
 * App (modular)
 * - Header con navegación y toggle de tema
 * - Router: /inicio, /catalogo, /beneficios, /historia
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
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    const isDark = saved ? saved === 'dark' : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("luzdenuit-theme", dark ? "dark" : "light");
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  // Memoized values
  const path = useMemo(() => location.pathname || "/", [location.pathname]);
  
  const routeActive = useCallback((key: RouteKey) => {
    if (key === 'inicio') return path === '/' || path === '';
    return path.startsWith(`/${key}`);
  }, [path]);

  const goto = useCallback((r: RouteKey) => {
    navigate(r === 'inicio' ? '/' : `/${r}`);
  }, [navigate]);

  const toggleTheme = useCallback(() => {
    setDark(prev => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <SEO />
      <div className={cn("app-root min-h-screen w-full antialiased transition-colors flex flex-col", dark ? "dark" : "")}
      >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/40 border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent shadow-glow" />
            <div className="leading-tight">
              <p className="text-sm sm:text-base font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
                Luz de Nuit
              </p>
              <p className="text-[10px] sm:text-xs opacity-70 hidden xs:block">
                Velas artesanales • aromaterapia natural
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm" role="navigation" aria-label="Navegación principal">
            <NavLink 
              to="/" 
              className={({isActive}) => cn(
                "opacity-80 hover:opacity-100 transition-all duration-200 hover:text-brand-primary",
                isActive && "underline underline-offset-4 text-brand-primary font-semibold"
              )}
            >
              Inicio
            </NavLink>
            <NavLink 
              to="/catalogo" 
              className={({isActive}) => cn(
                "opacity-80 hover:opacity-100 transition-all duration-200 hover:text-brand-primary",
                isActive && "underline underline-offset-4 text-brand-primary font-semibold"
              )}
            >
              Catálogo
            </NavLink>
            <NavLink 
              to="/beneficios" 
              className={({isActive}) => cn(
                "opacity-80 hover:opacity-100 transition-all duration-200 hover:text-brand-primary",
                isActive && "underline underline-offset-4 text-brand-primary font-semibold"
              )}
            >
              Beneficios
            </NavLink>
            <NavLink 
              to="/historia" 
              className={({isActive}) => cn(
                "opacity-80 hover:opacity-100 transition-all duration-200 hover:text-brand-primary",
                isActive && "underline underline-offset-4 text-brand-primary font-semibold"
              )}
            >
              Historia
            </NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              href={whatsappLink("Hola, quiero más información de Luz de Nuit ✨")} 
              size="md"
              variant="solid"
            >
              Comprar por WhatsApp
            </Button>
            <button
              aria-label="Alternar tema"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-900 transition-all duration-200 hover:bg-zinc-50 hover:scale-105 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              {dark ? <IconSun width={18} height={18} /> : <IconMoon width={18} height={18} />}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              aria-label="Alternar tema"
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-900 transition-all duration-200 hover:bg-zinc-50 hover:scale-105 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              {dark ? <IconSun width={16} height={16} /> : <IconMoon width={16} height={16} />}
            </button>
            <button
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={toggleMobileMenu}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-900 transition-all duration-200 hover:bg-zinc-50 hover:scale-105 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
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
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="border-t border-zinc-200 dark:border-zinc-800 md:hidden overflow-hidden bg-white/95 dark:bg-zinc-900/95 backdrop-blur"
            >
              <div className="px-4 py-4 space-y-2">
                <button 
                  onClick={() => { goto('inicio'); closeMobileMenu(); }} 
                  className={cn(
                    "block w-full text-left py-3 px-4 rounded-lg transition-all duration-200 font-medium",
                    routeActive('inicio') 
                      ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-brand-primary"
                  )}
                >
                  Inicio
                </button>
                <button 
                  onClick={() => { goto('catalogo'); closeMobileMenu(); }} 
                  className={cn(
                    "block w-full text-left py-3 px-4 rounded-lg transition-all duration-200 font-medium",
                    routeActive('catalogo') 
                      ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-brand-primary"
                  )}
                >
                  Catálogo
                </button>
                <button 
                  onClick={() => { goto('beneficios'); closeMobileMenu(); }} 
                  className={cn(
                    "block w-full text-left py-3 px-4 rounded-lg transition-all duration-200 font-medium",
                    routeActive('beneficios') 
                      ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-brand-primary"
                  )}
                >
                  Beneficios
                </button>
                <button 
                  onClick={() => { goto('historia'); closeMobileMenu(); }} 
                  className={cn(
                    "block w-full text-left py-3 px-4 rounded-lg transition-all duration-200 font-medium",
                    routeActive('historia') 
                      ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-brand-primary"
                  )}
                >
                  Historia
                </button>
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <Button 
                    href={whatsappLink("Hola, quiero más información de Luz de Nuit ✨")} 
                    size="md" 
                    variant="solid"
                    className="w-full justify-center"
                  >
                    Comprar por WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 pb-28 md:pb-28 lg:pb-24">
        <Routes>
          <Route path="/" element={<InicioPage goto={(r) => goto(r as RouteKey)} />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/catalogo/:slug" element={<ProductDetailPage />} />
          <Route path="/beneficios" element={<BeneficiosPage />} />
          <Route path="/historia" element={<HistoriaPage />} />
          <Route path="*" element={<InicioPage goto={(r) => goto(r as RouteKey)} />} />
        </Routes>
      </main>

      {/* Footer consistente */}
      <footer role="contentinfo" className="mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-sm opacity-70 text-center sm:text-left">
              © {new Date().getFullYear()} Luz de Nuit • Todos los derechos reservados
            </div>
            <nav className="flex items-center gap-6 flex-wrap justify-center sm:justify-end" aria-label="Enlaces del footer">
              <button 
                onClick={() => goto('catalogo')} 
                className="text-sm opacity-80 hover:opacity-100 hover:text-brand-primary transition-colors duration-200"
              >
                Catálogo
              </button>
              <button 
                onClick={() => goto('beneficios')} 
                className="text-sm opacity-80 hover:opacity-100 hover:text-brand-primary transition-colors duration-200"
              >
                Beneficios
              </button>
              <button 
                onClick={() => goto('historia')} 
                className="text-sm opacity-80 hover:opacity-100 hover:text-brand-primary transition-colors duration-200"
              >
                Historia
              </button>
            </nav>
          </div>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp */}
      <a
        href={whatsappLink("Hola, vengo del portafolio web y quiero comprar ✨")}
        target="_blank"
        rel="noreferrer"
        className="fixed z-40 right-4 bottom-[max(1.25rem,env(safe-area-inset-bottom))] md:right-8 md:bottom-[max(2rem,env(safe-area-inset-bottom))] inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 bg-gradient-to-r from-brand-primary to-brand-accent hover:from-brand-primary/90 hover:to-brand-accent/90"
        aria-label="Contactar por WhatsApp"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
        Pide por WhatsApp
      </a>
      
      {/* Scroll to top button */}
      <ScrollToTop />
      </div>
    </>
  );
}

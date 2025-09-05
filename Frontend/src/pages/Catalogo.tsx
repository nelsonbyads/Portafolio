import { useMemo, useState, useEffect } from "react";
import PRODUCTS from "../data/products";
import { formatCurrency, productToMessage, whatsappLink, ProductType } from "../lib/utils";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { IconSearch } from "../components/icons";
import { Link } from "react-router-dom";
import "./catalogo.css";

export default function CatalogoPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ProductType | "Todos">("Todos");
  const [scentFilter, setScentFilter] = useState<string | "Todos">("Todos");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const scents = useMemo(() => {
    const s = new Set<string>();
    PRODUCTS.forEach((p) => p.scentNotes.forEach((n) => s.add(n)));
    return ["Todos", ...Array.from(s)];
  }, []);

  const filtered = useMemo(() => {
    let data = PRODUCTS.slice();
    const q = query.trim().toLowerCase();
    if (q) {
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.scentNotes.some((n) => n.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (typeFilter !== "Todos") data = data.filter((p) => p.type === typeFilter);
    if (scentFilter !== "Todos") {
      const sf = scentFilter.toLowerCase();
      data = data.filter((p) => p.scentNotes.some((n) => n.toLowerCase().includes(sf)));
    }
    if (minPrice !== "") data = data.filter((p) => p.price >= Number(minPrice));
    if (maxPrice !== "") data = data.filter((p) => p.price <= Number(maxPrice));
    return data;
  }, [query, typeFilter, scentFilter, minPrice, maxPrice]);

  useEffect(() => { setPage(1); }, [query, typeFilter, scentFilter, minPrice, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice(0, Math.min(page * perPage, filtered.length));

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Catálogo</h2>
          <div className="h-[2px] w-12 mt-2 rounded-full bg-brand-accent"/>
          <p className="text-sm opacity-70">Explorá por tipo, notas aromáticas y precio</p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" width={16} height={16} />
            <input
              className="w-full rounded-xl border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm outline-none ring-0 transition placeholder:opacity-60 focus:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-700 sm:w-64"
              placeholder="Buscar producto o etiqueta"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
          >
            {(["Todos", "Aromaterapia", "Masaje", "Decorativa", "Personalizada"] as const).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900"
            value={scentFilter}
            onChange={(e) => setScentFilter(e.target.value as any)}
          >
            {scents.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <input type="number" min={0} placeholder="$ mín" value={minPrice as any}
                   onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                   className="w-24 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900" />
            <span className="text-sm opacity-60">—</span>
            <input type="number" min={0} placeholder="$ máx" value={maxPrice as any}
                   onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                   className="w-24 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pageItems.map((p) => (
          <Card key={p.id} className="group overflow-hidden flex flex-col transition-shadow hover:shadow-md h-[420px] md:h-[460px]">
            {/* Zona de imagen (se amplía al hover) */}
            <div className="product-image relative w-full overflow-hidden h-44 md:h-56 transition-[height] duration-300 ease-out group-hover:h-56 md:group-hover:h-64" style={{ ['--product-color' as any]: p.color || '#eee' }}>
              {p.promo && (
                <div className="absolute left-3 top-3 z-10">
                  <Badge tone="primary">{p.promo.label}</Badge>
                </div>
              )}
            </div>
            <div className="p-5 flex flex-col h-full flex-1 overflow-hidden">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold leading-tight">{p.name}</h3>
                  <p className="text-xs opacity-60">{p.type} • {p.capacityMl} ml • {p.burnTimeHours} h</p>
                </div>
                <div className="text-right">
                  <p className="text-sm line-through opacity-40">{p.promo ? formatCurrency(p.price) : "\u00A0"}</p>
                  <p className="text-base font-bold text-brand-primary">
                    {p.promo ? formatCurrency(Math.round(p.price * (1 - (p.promo.discountPercent || 0) / 100))) : formatCurrency(p.price)}
                  </p>
                </div>
              </div>
              {/* El texto se contrae al pasar el mouse */}
              <p className="mb-3 line-clamp-3 group-hover:line-clamp-2 md:group-hover:line-clamp-1 text-sm opacity-85 transition-[all] duration-200">{p.description}</p>
              <div className="mb-3 flex flex-wrap gap-2">
                {p.scentNotes.slice(0, 3).map((n) => (
                  <Badge key={n} tone="neutral">{n}</Badge>
                ))}
              </div>
              <div className="mt-auto pt-1 flex items-center justify-between">
                <Button href={whatsappLink(productToMessage(p))}>Comprar por WhatsApp</Button>
                <Link to={`/catalogo/${p.slug}`} className="text-sm opacity-70 underline-offset-4 hover:underline">Detalles</Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center">
        {page < totalPages ? (
          <button
            className="inline-flex h-11 items-center gap-2 rounded-2xl px-4 text-sm font-semibold text-white shadow-sm transition hover:shadow-md bg-brand-primary"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Ver más
          </button>
        ) : (
          <span className="text-sm opacity-60">No hay más productos</span>
        )}
      </div>
    </section>
  );
}

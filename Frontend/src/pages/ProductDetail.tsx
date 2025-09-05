import { useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PRODUCTS from "../data/products";
import { formatCurrency, productToMessage, whatsappLink } from "../lib/utils";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import "./producto.css";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product = useMemo(() => PRODUCTS.find((p) => p.slug === slug), [slug]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [slug]);

  if (!product) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-12">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Producto no encontrado</h2>
          <p className="opacity-80 mb-4">El producto que buscas no existe o fue movido.</p>
          <div className="flex items-center justify-center gap-3">
            <Button onClick={() => navigate(-1)}>Volver</Button>
            <Button onClick={() => navigate('/catalogo')} variant="ghost">Ir al catálogo</Button>
          </div>
        </Card>
      </section>
    );
  }

  const p = product;
  const price = p.promo ? Math.round(p.price * (1 - (p.promo.discountPercent || 0) / 100)) : p.price;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Visual */}
        <div>
          <div className="product-hero relative h-64 w-full rounded-2xl" style={{ ['--product-color' as any]: p.color || '#eee' }}>
            {p.promo && (
              <div className="absolute left-3 top-3"><Badge tone="primary">{p.promo.label}</Badge></div>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight">{p.name}</h1>
          <p className="mt-1 text-sm opacity-70">{p.type} • {p.capacityMl} ml • {p.burnTimeHours} h</p>
          <div className="mt-3">
            <p className="text-sm line-through opacity-40">{p.promo ? formatCurrency(p.price) : '\u00A0'}</p>
            <p className="text-2xl font-bold text-brand-primary">{formatCurrency(price)}</p>
          </div>

          <p className="mt-4 text-sm opacity-90">{p.description}</p>

          {p.ingredients?.length ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Ingredientes</h3>
              <ul className="text-sm opacity-85 list-disc ml-5">
                {p.ingredients.map((i) => (<li key={i}>{i}</li>))}
              </ul>
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2">
            {p.scentNotes.map((n) => (<Badge key={n} tone="neutral">{n}</Badge>))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button href={whatsappLink(productToMessage(p))}>Comprar por WhatsApp</Button>
            <Button onClick={() => navigate('/catalogo')} variant="ghost">Volver al catálogo</Button>
          </div>
        </div>
      </div>
    </section>
  );
}


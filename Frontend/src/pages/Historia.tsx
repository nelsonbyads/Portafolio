import Button from "../components/ui/Button";
import { whatsappLink } from "../lib/utils";
import "./historia.css";

export default function HistoriaPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
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
  );
}

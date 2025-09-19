import { useState } from "react";
import Button from "../components/ui/Button";
import { whatsappLink } from "../lib/utils";
import "./historia.css";

export default function HistoriaPage() {
  const [tipo, setTipo] = useState("Petición");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const submitPQRS = () => {
    const text = `PQRS\nTipo: ${tipo}\nNombre: ${nombre || "(sin nombre)"}\nEmail: ${email || "(sin email)"}\nMensaje: ${mensaje || "(vacío)"}`;
    window.open(whatsappLink(text), "_blank");
  };

  const submitPQRSEmail = () => {
    const subject = encodeURIComponent(`PQRS ${tipo} - ${nombre || 'Sin nombre'}`);
    const body = encodeURIComponent(`Tipo: ${tipo}\nNombre: ${nombre || '(sin nombre)'}\nEmail: ${email || '(sin email)'}\n\nMensaje:\n${mensaje || '(vacío)'}\n`);
    window.location.href = `mailto:luzdenuit3@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      {/* Historia */}
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

      {/* Misión, Visión, Valores */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h3 className="font-semibold text-lg">Misión</h3>
          <p className="mt-2 text-sm opacity-85">Crear velas artesanales con ingredientes confiables y un diseño minimalista que favorezca el bienestar, acompañando rituales cotidianos con aroma y calidez.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h3 className="font-semibold text-lg">Visión</h3>
          <p className="mt-2 text-sm opacity-85">Ser la marca de referencia en velas de autor en la región, reconocida por su calidad, transparencia y experiencia sensorial consciente.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h3 className="font-semibold text-lg">Valores</h3>
          <ul className="mt-2 text-sm opacity-85 list-disc ml-5">
            <li>Honestidad en ingredientes y procesos</li>
            <li>Calidad artesanal y consistencia</li>
            <li>Diseño simple y funcional</li>
            <li>Sostenibilidad y mejora continua</li>
          </ul>
        </div>
      </div>

      {/* Políticas */}
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h3 className="font-semibold">Política de envíos y cambios</h3>
          <p className="mt-2 text-sm opacity-85">Enviamos a nivel nacional. Cambios por defectos de fabricación dentro de 7 días. Para más detalles, contáctanos por WhatsApp.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
          <h3 className="font-semibold">Política de seguridad y bienestar</h3>
          <p className="mt-2 text-sm opacity-85">Recomendamos uso supervisado, superficie estable y ventilación adecuada. Ingredientes de grado cosmético; evite contacto directo con piel salvo velas de masaje indicadas.</p>
        </div>
      </div>

      {/* PQRS */}
      <div className="mt-12">
        <h3 className="text-xl font-bold tracking-tight">PQRS</h3>
        <p className="mt-1 text-sm opacity-80">Envíanos tu petición, queja, reclamo o sugerencia. Te responderemos con gusto.</p>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="grid gap-3">
            <label className="text-sm opacity-80">Tipo</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900">
              {['Petición','Queja','Reclamo','Sugerencia'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <label className="text-sm opacity-80">Nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900" placeholder="Tu nombre" />
            <label className="text-sm opacity-80">Email (opcional)</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900" placeholder="tucorreo@dominio.com" />
          </div>
          <div className="grid gap-3">
            <label className="text-sm opacity-80">Mensaje</label>
            <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} rows={8} className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm resize-none dark:border-zinc-800 dark:bg-zinc-900" placeholder="Cuéntanos con detalle" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 flex-wrap">
          <Button onClick={submitPQRS}>Enviar por WhatsApp</Button>
          <Button onClick={submitPQRSEmail} variant="ghost">Enviar por Email</Button>
          <Button href={whatsappLink("Hola, quiero información de políticas ✨")} variant="ghost">Ver políticas completas</Button>
        </div>
      </div>
    </section>
  );
}

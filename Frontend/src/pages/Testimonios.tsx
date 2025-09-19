import Card from "../components/ui/Card";
import Carousel from "../components/ui/Carousel";
import "./testimonios.css";

export default function TestimoniosPage() {
  const items = [
    { name: "Camila R.", text: "La vela de lavanda me cambió las noches. Aroma suave, dura mucho y la presentación es preciosa." },
    { name: "Daniel M.", text: "Regalé una personalizada y fue un éxito. El detalle de la etiqueta con el nombre ¡maravilloso!" },
    { name: "Laura S.", text: "La de masaje es perfecta para relajarnos después del trabajo. Textura cálida y delicada con la piel." },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Testimonios</h2>
        <p className="mt-2 text-sm opacity-80">Lo que dicen quienes ya encendieron su ritual</p>
      </div>
      <Carousel itemClassName="md:!basis-1/2 lg:!basis-1/3">
        {items.map((t) => (
          <Card key={t.name} className="p-6">
            <p className="mb-3 text-sm opacity-90">"{t.text}"</p>
            <div className="text-sm font-semibold">{t.name}</div>
          </Card>
        ))}
      </Carousel>
    </section>
  );
}

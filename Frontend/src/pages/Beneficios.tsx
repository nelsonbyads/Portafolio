import Card from "../components/ui/Card";
import { IconFlame, IconLeaf, IconSparkle } from "../components/icons";
import "./beneficios.css";

export default function BeneficiosPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold tracking-tight">Beneficios de nuestras velas</h2>
        <p className="mt-2 text-sm opacity-80">Bienestar real en piezas minimalistas y elegantes</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="p-6 text-center">
          <div className="mx-auto mb-3 h-10 w-10 text-brand-primary"><IconFlame width={40} height={40} /></div>
          <h3 className="font-semibold">Combustión limpia</h3>
          <p className="mt-1 text-sm opacity-80">Cera vegetal y mecha de algodón para una llama estable y menos hollín.</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="mx-auto mb-3 h-10 w-10 text-brand-primary"><IconLeaf width={40} height={40} /></div>
          <h3 className="font-semibold">Ingredientes de confianza</h3>
          <p className="mt-1 text-sm opacity-80">Fragancias grado cosmético y aceites esenciales seleccionados.</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="mx-auto mb-3 h-10 w-10 text-brand-primary"><IconSparkle width={40} height={40} /></div>
          <h3 className="font-semibold">Diseño minimalista</h3>
          <p className="mt-1 text-sm opacity-80">Piezas que visten tu espacio sin sobrecargarlo.</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="mx-auto mb-3 h-10 w-10 text-brand-primary"><IconSparkle width={40} height={40} /></div>
          <h3 className="font-semibold">Hechas a mano</h3>
          <p className="mt-1 text-sm opacity-80">Proceso artesanal con controles de calidad para mejor experiencia.</p>
        </Card>
      </div>
    </section>
  );
}

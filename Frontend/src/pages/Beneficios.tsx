import Card from "../components/ui/Card";
import { IconFlame, IconLeaf, IconSparkle, IconHeart, IconShield, IconCheck, IconStar, IconZap } from "../components/icons";
import "./beneficios.css";

export default function BeneficiosPage() {
  const benefits = [
    {
      icon: IconFlame,
      title: "Combustión limpia",
      description: "Cera vegetal y mecha de algodón para una llama estable y menos hollín.",
      color: "from-orange-400 to-red-500"
    },
    {
      icon: IconLeaf,
      title: "Ingredientes naturales",
      description: "Fragancias grado cosmético y aceites esenciales seleccionados cuidadosamente.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: IconSparkle,
      title: "Diseño minimalista",
      description: "Piezas que visten tu espacio sin sobrecargarlo, perfectas para cualquier ambiente.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: IconHeart,
      title: "Hechas a mano",
      description: "Proceso artesanal con controles de calidad para una experiencia única.",
      color: "from-pink-400 to-rose-500"
    },
    {
      icon: IconShield,
      title: "Calidad garantizada",
      description: "Cada vela pasa por rigurosos controles de calidad antes de llegar a ti.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: IconStar,
      title: "Experiencia premium",
      description: "Disfruta de aromas duraderos y una experiencia sensorial excepcional.",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <section className="beneficios-page mx-auto max-w-7xl px-4 py-16">
      {/* Header mejorado */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent floating-icon">
          <IconZap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Beneficios de nuestras velas
        </h2>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Bienestar real en piezas minimalistas y elegantes. Descubre por qué nuestras velas son la elección perfecta para tu hogar.
        </p>
        <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent"/>
      </div>

      {/* Grid de beneficios mejorado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {benefits.map((benefit, index) => (
          <Card 
            key={index} 
            className="benefit-card group p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800 relative overflow-hidden"
          >
            <div className={`mx-auto mb-6 w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 pulse-icon`}>
              <benefit.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-brand-primary transition-colors duration-300">
              {benefit.title}
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              {benefit.description}
            </p>
          </Card>
        ))}
      </div>

      {/* Sección adicional de características destacadas */}
      <div className="feature-section bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Por qué elegir nuestras velas?</h3>
          <p className="text-lg opacity-80">Cada detalle está pensado para brindarte la mejor experiencia</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <IconCheck className="w-6 h-6 text-brand-primary" />
            </div>
            <h4 className="font-semibold mb-2 group-hover:text-brand-primary transition-colors duration-300">100% Naturales</h4>
            <p className="text-sm opacity-80">Sin químicos dañinos ni ingredientes artificiales</p>
          </div>
          
          <div className="text-center group">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <IconStar className="w-6 h-6 text-brand-accent" />
            </div>
            <h4 className="font-semibold mb-2 group-hover:text-brand-accent transition-colors duration-300">Duración extendida</h4>
            <p className="text-sm opacity-80">Hasta 40 horas de fragancia continua</p>
          </div>
          
          <div className="text-center group">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <IconHeart className="w-6 h-6 text-green-500" />
            </div>
            <h4 className="font-semibold mb-2 group-hover:text-green-500 transition-colors duration-300">Hecho con amor</h4>
            <p className="text-sm opacity-80">Cada vela es creada con pasión y dedicación</p>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// Buscamos la imagen de fondo por defecto
const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

interface HeroData {
  
  mainTitle?: string;
  subtitle?: string;
  whatsappLink?: string;
  buttonText1?: string;
  buttonText2?: string;
  backgroundImage?: string;
  // Añadimos content para que sea compatible con lo que guarda tu Admin
  content?: {
    mainTitle?: string;
    subtitle?: string;
    whatsappLink?: string;
    buttonText1?: string;
    buttonText2?: string;
  };
}

interface HeroProps {
  data?: HeroData;
}

const DEFAULT_DATA = {
  mainTitle: "Tapicería Rincón: El Arte de Restaurar Tus Muebles con Tradición.",
  subtitle: "Más de 40 años de experiencia familiar, desde Colombia hasta Avilés, devolviendo la vida a tus sofás, sillas y tesoros.",
  whatsappLink: 'https://wa.me/34000000000?text=Hola%20Tapicería%20Rincón,%20me%20gustaría%20pedir%20presupuesto%20para%20un%20trabajo%20de%20tapicería.',
  buttonText1: "Ver Nuestros Trabajos",
  buttonText2: "Contactar Ahora"
};

export function Hero({ data }: HeroProps) {
  // Lógica de Arquitecto: 
  // 1. Prioridad: data.content (lo que viene del Panel Admin/MongoDB)
  // 2. Segunda opción: data (si el objeto viene plano)
  // 3. Tercera opción: DEFAULT_DATA (si no hay base de datos conectada)
  
  const source = data?.content || data;

  const displayData = {
    mainTitle: source?.mainTitle || DEFAULT_DATA.mainTitle,
    subtitle: source?.subtitle || DEFAULT_DATA.subtitle,
    whatsappLink: source?.whatsappLink || DEFAULT_DATA.whatsappLink,
    buttonText1: source?.buttonText1 || DEFAULT_DATA.buttonText1,
    buttonText2: source?.buttonText2 || DEFAULT_DATA.buttonText2,
  };

  return (
    <section id="inicio" className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white p-0">
      {/* Imagen de fondo */}
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      
      {/* Overlay para legibilidad del texto */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl" style={{textWrap: 'balance'}}>
            {displayData.mainTitle}
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/90" style={{textWrap: 'balance'}}>
            {displayData.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {/* Botón Proyectos */}
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="#proyectos">
                <Eye className="mr-2 h-5 w-5" />
                {displayData.buttonText1}
              </Link>
            </Button>

            {/* Botón WhatsApp (Destructive/Rojo para destacar) */}
            <Button asChild size="lg" variant="destructive">
              <a href={displayData.whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" />
                {displayData.buttonText2}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
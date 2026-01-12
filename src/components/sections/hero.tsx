import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');
const WHATSAPP_LINK = 'https://wa.me/34000000000?text=Hola%20Tapicería%20Rincón,%20me%20gustaría%20pedir%20presupuesto%20para%20un%20trabajo%20de%20tapicería.';

export function Hero() {
  return (
    <section id="inicio" className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white p-0">
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
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl" style={{textWrap: 'balance'}}>
            Tapicería Rincón: El Arte de Restaurar Tus Muebles con Tradición.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/90" style={{textWrap: 'balance'}}>
            Más de 40 años de experiencia familiar, desde Colombia hasta Avilés, devolviendo la vida a tus sofás, sillas y tesoros.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#proyectos">
                <Eye className="mr-2 h-5 w-5" />
                Ver Nuestros Trabajos
              </Link>
            </Button>
            <Button asChild size="lg" variant="destructive">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contactar Ahora
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

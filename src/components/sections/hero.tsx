'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Eye, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useRevalidateOnSave } from '@/hooks/useRevalidateOnSave';
import type { SectionData, HeroContent } from '@/lib/content-types';
import { extractContent } from '@/lib/content-types';

interface HeroProps {
  data?: SectionData<'hero'> | null;
  globalWhatsapp?: string;
}

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-background');

export function Hero({ data, globalWhatsapp }: HeroProps) {
  useRevalidateOnSave();

  const content: HeroContent = extractContent<'hero'>(
    data as SectionData<'hero'> | undefined | null,
  );

  const displayData = {
    ...content,
    whatsappLink:
      globalWhatsapp || content.whatsappLink || heroImage?.imageUrl || '',
    backgroundImage: content.backgroundImage || heroImage?.imageUrl || '',
  };

  return (
    <section
      id="inicio"
      className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white p-0"
    >
      {/* Imagen de fondo Dinámica */}
      {displayData.backgroundImage && (
        <Image
          src={displayData.backgroundImage}
          alt="Tapicería Rincón Background"
          fill
          className="object-cover transition-opacity duration-700"
          priority
          sizes="100vw"
        />
      )}

      {/* Overlay para legibilidad del texto */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl"
            style={{ textWrap: 'balance' }}
          >
            {displayData.mainTitle}
          </h1>

          <p
            className="mt-6 text-lg md:text-xl text-primary-foreground/90"
            style={{ textWrap: 'balance' }}
          >
            {displayData.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="#proyectos">
                <Eye className="mr-2 h-5 w-5" />
                {displayData.buttonText1}
              </Link>
            </Button>

            <Button asChild size="lg" variant="destructive">
              <a
                href={displayData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
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

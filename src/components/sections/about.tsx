'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useRevalidateOnSave } from '@/hooks/useRevalidateOnSave';
import type { SectionData, AboutContent } from '@/lib/content-types';
import { extractContent } from '@/lib/content-types';

const teamImagePlaceholder = PlaceHolderImages.find(
  (img) => img.id === 'about-us-team',
);

const ColombiaFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 600"
    className="w-6 h-auto rounded-sm ml-2 inline-block"
  >
    <rect width="900" height="600" fill="#ffce00" />
    <rect width="900" height="300" y="300" fill="#003893" />
    <rect width="900" height="150" y="450" fill="#ce1126" />
  </svg>
);

const SpainFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 750 500"
    className="w-6 h-auto rounded-sm ml-2 inline-block"
  >
    <rect width="750" height="500" fill="#c60b1e" />
    <rect width="750" height="250" y="125" fill="#ffc400" />
  </svg>
);

interface AboutProps {
  data?: SectionData<'about'> | null;
}

export function About({ data }: AboutProps) {
  useRevalidateOnSave();

  const content: AboutContent = extractContent(data);
  const displayImage = content.aboutImage || teamImagePlaceholder?.imageUrl;

  return (
    <section id="sobre-nosotros" className="bg-card py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {content.title}
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              {content.paragraphs?.map((paragraph, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              {content.paragraphs?.some(
                (p) => p.includes('1984') || p.includes('Colombia'),
              ) && <ColombiaFlag />}
              {content.paragraphs?.some(
                (p) => p.includes('2001') || p.includes('Avilés'),
              ) && <SpainFlag />}
            </div>
          </div>
          <div>
            {displayImage && (
              <Card className="overflow-hidden shadow-[-10px_10px_15px_-3px_rgba(0,0,0,0.2)] rounded-lg transition-transform hover:scale-[1.01] duration-300">
                <Image
                  src={displayImage}
                  alt={content.title || 'Sobre Nosotros'}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover aspect-[4/3] border border-black/10"
                  priority={false}
                />
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

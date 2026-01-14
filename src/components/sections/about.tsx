'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect } from 'react';

const teamImage = PlaceHolderImages.find(img => img.id === 'about-us-team');

const ColombiaFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-6 h-auto rounded-sm ml-2 inline-block">
      <rect width="900" height="600" fill="#ffce00"/>
      <rect width="900" height="300" y="300" fill="#003893"/>
      <rect width="900" height="150" y="450" fill="#ce1126"/>
    </svg>
  );
  
const SpainFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" className="w-6 h-auto rounded-sm ml-2 inline-block">
      <rect width="750" height="500" fill="#c60b1e"/>
      <rect width="750" height="250" y="125" fill="#ffc400"/>
    </svg>
  );

interface AboutData {
  title?: string;
  paragraphs?: string[];
  teamImage?: string;
  historyStartYear?: number;
  spainEstablishmentYear?: number;
  location?: string;
  content?: {
    title?: string;
    paragraphs?: string[];
    teamImage?: string;
    historyStartYear?: number;
    spainEstablishmentYear?: number;
    location?: string;
  };
}

interface AboutProps {
  data?: AboutData;
}

const DEFAULT_DATA: AboutData = {
  title: "De Tradición: Nuestra Historia",
  paragraphs: [
    "Somos una empresa familiar con una herencia en el arte de la tapicería que se remonta a <strong>1984 en Colombia</strong>. Llevamos la pasión y el conocimiento de generaciones en cada puntada.",
    "Desde <strong>2001</strong>, establecimos nuestro taller en <strong>Avilés, Asturias</strong>, combinando las técnicas tradicionales que aprendimos con los mejores materiales y tendencias de España. 'Tapicería Rincón' es el puente entre la tradición colombiana y la calidad europea."
  ]
};

export function About({ data }: AboutProps) {
  const source = data?.content || data;
  const { title, paragraphs } = { ...DEFAULT_DATA, ...source };

  useEffect(() => {
    const channel = new BroadcastChannel('site_update');
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'refresh_home') {
        window.location.reload();
      }
    };

    channel.addEventListener('message', handleMessage);

    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, []);
  
  return (
    <section id="sobre-nosotros" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              {paragraphs?.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
              {paragraphs?.[0]?.includes('1984') && <ColombiaFlag />}
              {paragraphs?.[1]?.includes('2001') && <SpainFlag />}
            </div>
          </div>
          <div>
            {teamImage && (
              <Card className="overflow-hidden shadow-[-10px_10px_15px_-3px_rgba(0,0,0,0.2)] rounded-lg">
                <Image
                  src={teamImage.imageUrl}
                  alt={teamImage.description}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover aspect-[4/3] border border-black/20"
                  data-ai-hint={teamImage.imageHint}
                />
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

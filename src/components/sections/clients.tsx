'use client';

import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ClientItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

interface ClientsData {
  title?: string;
  subtitle?: string;
  items?: ClientItem[];
  content?: {
    title?: string;
    subtitle?: string;
    items?: ClientItem[];
  };
}

interface ClientsProps {
  data?: ClientsData;
}

export function Clients({ data }: ClientsProps) {
  const source = data?.content || data;
  const title = source?.title || "¿Para Quién Trabajamos?";
  const subtitle = source?.subtitle || "En Tapicería Rincón ofrecemos soluciones tanto para hogares como para negocios.";
  const clientsList = source?.items || [];

  // Duplicamos la lista para crear el efecto infinito sin saltos
  const duplicatedClients = [...clientsList, ...clientsList, ...clientsList];

  useEffect(() => {
    const channel = new BroadcastChannel('site_update');
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'refresh_home') window.location.reload();
    };
    channel.addEventListener('message', handleMessage);
    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, []);

  return (
    <section id="clientes" className="bg-card py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto italic">
          {subtitle}
        </p>
      </div>

      {/* Contenedor del Carrusel Infinito */}
      <div className="relative flex overflow-hidden py-10">
        <motion.div
          className="flex gap-8 px-4"
          animate={{
            x: [0, -100 * clientsList.length], // Se mueve hacia la izquierda para que visualmente parezca que van a la derecha
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30, // Velocidad del movimiento
              ease: "linear",
            },
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedClients.map((client, index) => (
            <div key={`${client.id}-${index}`} className="w-[350px] flex-shrink-0">
              <Card className="group text-center p-8 h-full shadow-md hover:shadow-xl transition-all duration-300 border-primary/5 rounded-2xl bg-white/50 backdrop-blur-sm flex flex-col items-center">
                <CardHeader className="items-center p-0 mb-6">
                  <div className="relative w-20 h-20 bg-primary/10 rounded-full p-4 mb-4 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    {client.icon ? (
                      <Image 
                        src={client.icon} 
                        alt={client.title}
                        width={48}
                        height={48}
                        className="object-contain group-hover:brightness-0 group-hover:invert transition-all"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary/20 rounded-full" />
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold">{client.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {client.subtitle}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>

        {/* Gradientes laterales para dar profundidad (fading effect) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-card to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-card to-transparent z-10" />
      </div>
    </section>
  );
}
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Home, Building2, Ruler } from 'lucide-react';
import { clientTypes } from '@/lib/data/clients';
import { useEffect } from 'react';

const iconMap = {
  Home: Home,
  Building2: Building2,
  Ruler: Ruler,
};

interface ClientsData {
  title?: string;
  subtitle?: string;
  clientTypes?: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
  }>;
  content?: {
    title?: string;
    subtitle?: string;
    clientTypes?: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
    }>;
  };
}

interface ClientsProps {
  data?: ClientsData;
}

const DEFAULT_DATA: ClientsData = {
  title: "¿Para Quién Trabajamos?",
  subtitle: "En Tapicería Rincón ofrecemos soluciones tanto para hogares como para negocios. Nuestra calidad artesanal es valorada por:"
};

export function Clients({ data }: ClientsProps) {
  const source = data?.content || data;
  const { title, subtitle } = { ...DEFAULT_DATA, ...source };
  const clientsList = source?.clientTypes || clientTypes;

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
    <section id="clientes" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {clientsList.map((client) => {
            const Icon = iconMap[client.icon as keyof typeof iconMap];
            return (
              <Card key={client.title} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow rounded-lg">
                <CardHeader className="items-center p-0 mb-4">
                  <div className="bg-primary text-primary-foreground rounded-full p-3 mb-4 inline-flex">
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl">{client.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-base text-muted-foreground">
                    {client.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

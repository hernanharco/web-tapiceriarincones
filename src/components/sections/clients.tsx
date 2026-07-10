import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { SectionData, ClientsContent, ClientItem } from '@/lib/content-types';
import { extractContent } from '@/lib/content-types';

interface ClientsProps {
  data?: SectionData<'clients'> | null;
}

export function Clients({ data }: ClientsProps) {
  const content: ClientsContent = extractContent(data);
  const clientsList: ClientItem[] = content.items ?? [];
  const duplicatedClients = [...clientsList, ...clientsList];

  return (
    <section id="clientes" className="bg-card py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          {content.title}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto italic">
          {content.subtitle}
        </p>
      </div>

      {clientsList.length > 0 ? (
        <div className="relative flex overflow-hidden py-10">
          <div
            className="flex gap-8 px-4 marquee-track"
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
                    <CardTitle className="text-xl font-bold">
                      {client.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {client.subtitle}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-card to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-card to-transparent z-10" />
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed rounded-xl bg-muted/20">
          <p className="text-muted-foreground">
            No hay servicios configurados todavía.
          </p>
        </div>
      )}
    </section>
  );
}

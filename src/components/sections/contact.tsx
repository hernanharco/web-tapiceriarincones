import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import type { SectionData, ContactContent } from '@/lib/content-types';
import { extractContent } from '@/lib/content-types';

interface ContactProps {
  data?: SectionData<'contact'> | null;
}

export function Contact({ data }: ContactProps) {

  const content: ContactContent = extractContent(data);

  return (
    <section id="contacto" className="bg-card">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {content.title}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {content.subtitle}
        </p>

        <div className="mt-8">
          <Button
            asChild
            size="lg"
            variant="destructive"
            className="text-lg py-8 px-10 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            <a
              href={content.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="mr-3 h-6 w-6" />
              {content.buttonText}
            </a>
          </Button>
        </div>

        <div className="mt-12 text-center space-y-4 text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>{content.address}</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <a href={`mailto:${content.email}`} className="hover:text-primary">
              {content.email}
            </a>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <a href={`tel:${content.phone}`} className="hover:text-primary">
              {content.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

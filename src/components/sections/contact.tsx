'use client';

import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { useEffect } from 'react';

interface ContactData {
  title?: string;
  subtitle?: string;
  whatsappLink?: string;
  buttonText?: string;
  address?: string;
  email?: string;
  phone?: string;
  content?: {
    title?: string;
    subtitle?: string;
    whatsappLink?: string;
    buttonText?: string;
    address?: string;
    email?: string;
    phone?: string;
  };
}

interface ContactProps {
  data?: ContactData;
}

const DEFAULT_DATA: ContactData = {
  title: "Hablemos de tu Proyecto",
  subtitle: "Estamos en Avilés, Asturias. Envíanos una foto de tu mueble y te damos presupuesto sin compromiso.",
  whatsappLink: 'https://wa.me/34000000000?text=Hola%20Tapicería%20Rincón,%20me%20gustaría%20pedir%20presupuesto%20para%20un%20trabajo%20de%20tapicería.',
  buttonText: "Pedir Presupuesto por WhatsApp",
  address: "[Dirección Completa], 3340X, Avilés, Asturias.",
  email: "contacto@tapiceriarincon.com",
  phone: "[Tu número de teléfono]"
};

export function Contact({ data }: ContactProps) {
  const source = data?.content || data;
  const { title, subtitle, whatsappLink, buttonText, address, email, phone } = { ...DEFAULT_DATA, ...source };

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
    <section id="contacto" className="bg-card">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {subtitle}
        </p>

        <div className="mt-8">
          <Button asChild size="lg" variant="destructive" className="text-lg py-8 px-10 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="mr-3 h-6 w-6" />
              {buttonText}
            </a>
          </Button>
        </div>

        <div className="mt-12 text-center space-y-4 text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>{address}</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <a href={`mailto:${email}`} className="hover:text-primary">
              {email}
            </a>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <a href={`tel:${phone}`} className="hover:text-primary">
              {phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

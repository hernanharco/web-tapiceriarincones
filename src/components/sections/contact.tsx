import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

const WHATSAPP_LINK = 'https://wa.me/34000000000?text=Hola%20Tapicería%20Rincón,%20me%20gustaría%20pedir%20presupuesto%20para%20un%20trabajo%20de%20tapicería.';

export function Contact() {
  return (
    <section id="contacto" className="bg-card">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Hablemos de tu Proyecto</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Estamos en Avilés, Asturias. Envíanos una foto de tu mueble y te damos presupuesto sin compromiso.
        </p>

        <div className="mt-8">
          <Button asChild size="lg" variant="destructive" className="text-lg py-8 px-10 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="mr-3 h-6 w-6" />
              Pedir Presupuesto por WhatsApp
            </a>
          </Button>
        </div>

        <div className="mt-12 text-center space-y-4 text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>[Dirección Completa], 3340X, Avilés, Asturias.</span>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <a href="mailto:contacto@tapiceriarincon.com" className="hover:text-primary">
              contacto@tapiceriarincon.com
            </a>
          </p>
          <p className="flex items-center justify-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <a href="tel:+34000000000" className="hover:text-primary">
              [Tu número de teléfono]
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

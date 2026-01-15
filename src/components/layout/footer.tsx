'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Mail, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  contactData: any;
}

export function Footer({ contactData }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  // Extraemos el contenido de forma segura del objeto SaaS
  const content = contactData?.content || {};
  
  // Mapeo exhaustivo para asegurar que si el dato existe, se use
  const globalLogo = contactData?.content?.logoUrl;
  const whatsappLink = content.whatsappLink || contactData?.whatsappLink;
  const address = content.address || contactData?.address;
  const phone = content.phone || contactData?.phone;
  const email = content.email || contactData?.email;
  const subtitle = content.subtitle;
  const title = content.title;

  const finalWhatsapp = whatsappLink || 'https://wa.me/34000000000';

  // Sub-componente para el Logo con fallback
  const LogoBrand = ({ className }: { className?: string }) => (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      {globalLogo ? (
        /* Aumentamos de h-12 a h-16 para que sea imponente */
        <div className="relative h-16 w-64 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={globalLogo}
            alt="Logo Tapicería Rincón"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      ) : (
        <span className="text-2xl font-black tracking-tighter uppercase transition-colors group-hover:text-primary">
          Tapicería <span className="text-destructive">Rincón</span>
        </span>
      )}
    </Link>
  );

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* COLUMNA 1: LOGO DINÁMICO (TAMAÑO MEJORADO) */}
          <div className="space-y-6">
            <LogoBrand className="pl-0 md:pl-2" />
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              {subtitle || "Más de 40 años transformando espacios con el arte de la tapicería artesanal. Tradición familiar desde Colombia hasta Asturias."}
            </p>
            <div className="flex gap-4">
              <Link href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Navegación</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#inicio" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link href="#sobre-nosotros" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="#proyectos" className="hover:text-primary transition-colors">Proyectos</Link></li>
              <li><Link href="#contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: DATOS DE CONTACTO DINÁMICOS */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Ubicación</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>{address || 'Avilés, Asturias, España'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>{phone || '+34 000 000 000'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="break-all">{email || 'info@tapiceriarincon.com'}</span>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: WHATSAPP */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h4 className="text-white font-bold mb-4">{title || '¿Hablamos?'}</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Pide tu presupuesto personalizado por WhatsApp sin compromiso.
            </p>
            <a 
              href={finalWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-900/20 active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Enviar Mensaje
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-slate-500">
          <p>© {currentYear} Tapicería Rincón. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
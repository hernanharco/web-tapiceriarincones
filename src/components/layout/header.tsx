'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-nosotros', label: 'Nosotros' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#clientes', label: 'Clientes' },
  { href: '#reseñas', label: 'Reseñas' },
  { href: '#contacto', label: 'Contacto' },
];

interface HeaderProps {
  globalWhatsapp?: string;
  globalLogo?: string;
}

export function Header({ globalWhatsapp, globalLogo }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const finalWhatsapp = globalWhatsapp || 'https://wa.me/34000000000';

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        
        {/* LOGO: Con margen a la izquierda para que no toque el borde */}
        {/* LOGO: Empujado hacia la izquierda */}
        <div className="flex-shrink-0">
          <LogoBrand />
        </div>

        {/* LADO DERECHO: NAV + BOTÓN */}
        <div className="flex items-center gap-8">
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-bold uppercase tracking-[0.2em] transition-all hover:text-primary relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="destructive"
              className="hidden sm:flex rounded-full px-6 font-bold shadow-lg shadow-destructive/20 hover:scale-105 active:scale-95 transition-all"
            >
              <a href={finalWhatsapp} target="_blank" rel="noopener noreferrer">
                Presupuesto
              </a>
            </Button>

            {/* MENÚ MÓVIL */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden border-2 border-primary/10"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <SheetDescription className="sr-only">
                  Acceso a secciones del sitio
                </SheetDescription>

                <div className="flex flex-col gap-10 mt-6">
                  <LogoBrand className="h-10" />

                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="text-2xl font-black uppercase tracking-tighter border-b border-muted py-2 transition-colors hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </a>
                    ))}
                  </nav>

                  <Button
                    asChild
                    variant="destructive"
                    className="rounded-full py-7 font-bold text-lg shadow-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    <a
                      href={finalWhatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="mr-3 h-5 w-5" />
                      Contactar ahora
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

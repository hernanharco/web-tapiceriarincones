'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/logo';
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#clientes', label: 'Clientes' },
  { href: '#reseñas', label: 'Reseñas' },
  { href: '#contacto', label: 'Contacto' },
];

const WHATSAPP_LINK = 'https://wa.me/34000000000?text=Hola%20Tapicería%20Rincón,%20me%20gustaría%20pedir%20presupuesto%20para%20un%20trabajo%20de%20tapicería.';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Logo />
        <nav className="hidden flex-1 md:flex md:justify-center md:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <Button asChild variant="destructive" className="hidden sm:flex">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Pide tu Presupuesto
            </a>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <SheetDescription className="sr-only">Menú principal de navegación para la aplicación.</SheetDescription>
              <div className="flex flex-col gap-6 p-6">
                <Logo />
                <nav className="grid gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium -mx-3 px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <Button asChild variant="destructive" className="mt-4">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="mr-2 h-4 w-4" />
                    Pide tu Presupuesto
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

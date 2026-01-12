import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-nosotros', label: 'Sobre Nosotros' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#clientes', label: 'Clientes' },
  { href: '#reseñas', label: 'Reseñas' },
  { href: '#contacto', label: 'Contacto' },
];

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">Restaurando muebles con tradición y calidad desde 1984.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <nav className="grid gap-2">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>[Dirección Completa], 3340X, Avilés, Asturias.</p>
              <p>Email: <a href="mailto:contacto@tapiceriarincon.com" className="hover:text-primary">contacto@tapiceriarincon.com</a></p>
              <p>Teléfono: <a href="tel:+34000000000" className="hover:text-primary">[Tu número de teléfono]</a></p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary"><Facebook /></a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tapicería Rincón. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

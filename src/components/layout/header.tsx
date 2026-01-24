'use client';

import { useState, useEffect } from 'react'; // Eliminamos lo que ya no se usa
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
import { Menu, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // 👈 IMPORTANTE: Conectamos al contexto

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-nosotros', label: 'Nosotros' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#clientes', label: 'Clientes' },
  { href: '#reseñas', label: 'Reseñas' },
  { href: '#contacto', label: 'Contacto' },
];

const Icon = ({ name }: { name: string }) => (
  <span className="material-symbols-outlined text-[20px] align-middle leading-none">
    {name}
  </span>
);

interface HeaderProps {
  globalWhatsapp?: string;
  globalLogo?: string;
}

export function Header({ globalWhatsapp, globalLogo }: HeaderProps) {
  const router = useRouter();
  
  // 📡 CONSUMIMOS EL CONTEXTO (Ya no necesitamos estados locales de user/loading)
  const { user, isLoading, logout, loadProfile } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);

  const AUTH_CENTER_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3000';
  const finalWhatsapp = globalWhatsapp || 'https://wa.me/34000000000';

  /**
   * 🚪 Cerrar sesión (Usando la función del contexto)
   */
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  /**
   * 🔐 Abrir popup de autenticación (Se mantiene igual)
   */
  const handleAuthClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const trackingData = {
      sourceApp: 'tapiceria-rincon',
      timestamp: new Date().toISOString(),
      returnUrl: window.location.href
    };
    const encodedTracking = encodeURIComponent(JSON.stringify(trackingData));
    const loginUrl = `${AUTH_CENTER_URL}/login?tracking=${encodedTracking}`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.open(loginUrl, '_blank');
    } else {
      const width = 500, height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      window.open(loginUrl, 'AuthCenterLogin', `width=${width},height=${height},left=${left},top=${top}`);
    }
  };

  /**
   * 📨 Escuchar mensajes del popup
   * (Mantenemos esto aquí porque el Header es quien "dispara" el popup)
   */
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'auth:success') {
        console.log('✅ Login detectado desde popup');
        setTimeout(() => {
          loadProfile(); // 👈 Llamamos a la función del contexto para refrescar el usuario
        }, 300);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [loadProfile]);

  const LogoBrand = ({ className }: { className?: string }) => (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      {globalLogo ? (
        <div className="relative h-16 w-64 transition-transform duration-300 group-hover:scale-105">
          <Image
            src={globalLogo}
            alt="Logo Tapicería Rincón"
            fill
            sizes="(max-width: 768px) 100vw, 256px"
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md shadow-sm">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-4">
          <LogoBrand />

          {/* Estado Logueado Desktop con Link al Admin */}
          {!isLoading && user && (
            <Link 
              href="/admin" 
              className="hidden md:flex flex-col border-l pl-4 border-muted-foreground/30 h-10 justify-center group cursor-pointer animate-in fade-in slide-in-from-left-4 duration-500"
            >
              <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                Hola, <span className="text-primary font-bold">{user.name}</span>
              </p>
              <p className="text-[10px] uppercase tracking-tighter text-muted-foreground mt-1">
                Rol: {user.role}
              </p>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-8">
          <nav className="hidden lg:flex items-center gap-8">
            {!isLoading && (
              user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-xs font-bold uppercase tracking-[0.2em] hover:text-destructive relative group"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Salir
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-destructive transition-all duration-300 group-hover:w-full" />
                </button>
              ) : (
                <a
                  href="#"
                  onClick={handleAuthClick}
                  className="flex items-center text-xs font-bold uppercase tracking-[0.2em] hover:text-primary relative group"
                >
                  <span className="mr-2 text-primary"><Icon name="door_open" /></span>
                  Entrar
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              )
            )}

            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="flex items-center text-xs font-bold uppercase tracking-[0.2em] hover:text-primary relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild variant="destructive" className="hidden sm:flex rounded-full px-6 font-bold transition-all hover:scale-105">
              <a href={finalWhatsapp} target="_blank" rel="noreferrer">Presupuesto</a>
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden border-2 border-primary/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <SheetTitle className="sr-only">Menú</SheetTitle>
                <SheetDescription className="sr-only">Navegación móvil</SheetDescription>

                <div className="flex flex-col gap-10 mt-6">
                  <LogoBrand className="h-10" />

                  {!isLoading && user && (
                    <div className="flex flex-col gap-1 border-b pb-4 border-muted animate-in fade-in slide-in-from-left-4 duration-500">
                      <Link href="/admin" onClick={() => setIsOpen(false)}>
                        <p className="text-xl font-bold italic hover:text-primary transition-colors">Hola, {user.name}!</p>
                        <p className="text-xs text-muted-foreground uppercase">{user.role}</p>
                      </Link>
                      <button
                        onClick={() => { handleLogout(); setIsOpen(false); }}
                        className="mt-2 text-sm text-destructive hover:underline flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  )}

                  <nav className="flex flex-col gap-4">
                    {!isLoading && !user && (
                      <a href="#" className="flex items-center text-2xl font-black uppercase tracking-tighter border-b border-muted py-2 text-primary" onClick={(e) => { handleAuthClick(e); setIsOpen(false); }}>
                        <span className="mr-3"><Icon name="door_open" /></span>
                        Entrar
                      </a>
                    )}
                    {navLinks.map((link) => (
                      <a key={link.href} href={link.href} className="flex items-center text-2xl font-black uppercase tracking-tighter border-b border-muted py-2 transition-colors hover:text-primary" onClick={() => setIsOpen(false)}>
                        {link.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
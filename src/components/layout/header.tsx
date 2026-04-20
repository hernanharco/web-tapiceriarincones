'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription,
} from '@/components/ui/sheet';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import { Menu, LogOut, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-nosotros', label: 'Nosotros' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#clientes', label: 'Clientes' },
  { href: '#reseñas', label: 'Reseñas' },
  { href: '#contacto', label: 'Contacto' },
];

const Icon = ({ name }: { name: string }) => (
  <span className="material-symbols-outlined text-[20px] align-middle leading-none">{name}</span>
);

interface HeaderProps {
  globalWhatsapp?: string;
  globalLogo?: string;
}

export function Header({ globalWhatsapp, globalLogo }: HeaderProps) {
  const router = useRouter();
  const { user, isLoading, logout, loadProfile } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '/api/v1';
  const finalWhatsapp = globalWhatsapp || 'https://wa.me/34000000000';

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleAuthClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginOpen(true);
  };

  /**
   * Abre popup de Google OAuth apuntando al backend FastAPI.
   * El callback de FastAPI debe hacer postMessage con { type: 'auth:success' }
   * cuando el login sea correcto.
   */
  const handleGoogleLogin = () => {
    setLoginLoading(true);
    setLoginError('');

    const googleAuthUrl = `${BACKEND_URL}/auth/google`;
    const width = 500, height = 650;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      googleAuthUrl,
      'GoogleLogin',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes`
    );

    // Vigilar si el usuario cierra el popup sin completar el login
    const timer = setInterval(() => {
      if (popup?.closed) {
        clearInterval(timer);
        setLoginLoading(false);
      }
    }, 500);
  };

  /**
   * Escuchar el postMessage que manda el callback de FastAPI.
   * Tu endpoint /api/v1/auth/callback ya devuelve HTML con postMessage.
   */
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // Aceptar mensajes del propio origen (el popup viene del backend proxeado)
      if (event.data?.type === 'auth:success') {
        setLoginLoading(false);
        setLoginOpen(false);
        // Esperar un tick para que la cookie esté disponible
        await new Promise(r => setTimeout(r, 300));
        await loadProfile();
      }

      if (event.data?.type === 'auth:error') {
        setLoginLoading(false);
        setLoginError(event.data.message || 'Error al iniciar sesión con Google');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [loadProfile]);

  const LogoBrand = ({ className }: { className?: string }) => (
    <Link href="/" className={`flex items-center gap-2 group ${className}`}>
      {globalLogo ? (
        <div className="relative h-16 w-64 transition-transform duration-300 group-hover:scale-105">
          <Image src={globalLogo} alt="Logo Tapicería Rincón" fill
            sizes="(max-width: 768px) 100vw, 256px"
            className="object-contain object-left" priority />
        </div>
      ) : (
        <span className="text-2xl font-black tracking-tighter uppercase transition-colors group-hover:text-primary">
          Tapicería <span className="text-destructive">Rincón</span>
        </span>
      )}
    </Link>
  );

  return (
    <>
      {/* Dialog de login con Google */}
      <Dialog open={loginOpen} onOpenChange={(open) => {
        if (!open) setLoginLoading(false);
        setLoginOpen(open);
      }}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Acceder al panel</DialogTitle>
            <DialogDescription>
              Usa tu cuenta de Google para identificarte
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-4">
            <Button
              onClick={handleGoogleLogin}
              disabled={loginLoading}
              variant="outline"
              className="w-full flex items-center gap-3 h-11 text-sm font-medium border-2"
            >
              {loginLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                /* SVG oficial de Google */
                <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
              )}
              {loginLoading ? 'Esperando...' : 'Continuar con Google'}
            </Button>

            {loginError && (
              <p className="text-sm text-destructive text-center">{loginError}</p>
            )}

            <p className="text-xs text-muted-foreground text-center">
              Solo cuentas autorizadas por el administrador pueden acceder
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md shadow-sm">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-4">
            <LogoBrand />
            {!isLoading && user && (
              <Link href="/admin"
                className="hidden md:flex flex-col border-l pl-4 border-muted-foreground/30 h-10 justify-center group cursor-pointer animate-in fade-in slide-in-from-left-4 duration-500">
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
                  <button onClick={handleLogout}
                    className="flex items-center text-xs font-bold uppercase tracking-[0.2em] hover:text-destructive relative group">
                    <LogOut className="mr-2 h-4 w-4" />
                    Salir
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-destructive transition-all duration-300 group-hover:w-full" />
                  </button>
                ) : (
                  <a href="#" onClick={handleAuthClick}
                    className="flex items-center text-xs font-bold uppercase tracking-[0.2em] hover:text-primary relative group">
                    <span className="mr-2 text-primary"><Icon name="door_open" /></span>
                    Entrar
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                )
              )}
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}
                  className="flex items-center text-xs font-bold uppercase tracking-[0.2em] hover:text-primary relative group">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Button asChild variant="destructive"
                className="hidden sm:flex rounded-full px-6 font-bold transition-all hover:scale-105">
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
                          <p className="text-xl font-bold italic hover:text-primary transition-colors">
                            Hola, {user.name}!
                          </p>
                          <p className="text-xs text-muted-foreground uppercase">{user.role}</p>
                        </Link>
                        <button onClick={() => { handleLogout(); setIsOpen(false); }}
                          className="mt-2 text-sm text-destructive hover:underline flex items-center gap-2">
                          <LogOut className="h-4 w-4" />
                          Cerrar Sesión
                        </button>
                      </div>
                    )}
                    <nav className="flex flex-col gap-4">
                      {!isLoading && !user && (
                        <a href="#" onClick={(e) => { handleAuthClick(e); setIsOpen(false); }}
                          className="flex items-center text-2xl font-black uppercase tracking-tighter border-b border-muted py-2 text-primary">
                          <span className="mr-3"><Icon name="door_open" /></span>
                          Entrar
                        </a>
                      )}
                      {navLinks.map((link) => (
                        <a key={link.href} href={link.href}
                          className="flex items-center text-2xl font-black uppercase tracking-tighter border-b border-muted py-2 transition-colors hover:text-primary"
                          onClick={() => setIsOpen(false)}>
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
    </>
  );
}
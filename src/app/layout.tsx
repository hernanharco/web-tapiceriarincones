export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Tapicería Rincón - Avilés',
  description: 'El Arte de Restaurar Tus Muebles con Tradición. Más de 40 años de experiencia familiar.',
  keywords: 'tapicería, avilés, asturias, restauración, muebles',
};

// Función única para obtener los datos de contacto y logo
async function getContactSection() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002'}/api/sections/contact`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error obteniendo datos globales:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const contactData = await getContactSection();
  const globalWhatsapp = contactData?.content?.whatsappLink;
  const globalLogo = contactData?.content?.logoUrl;

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans flex flex-col min-h-screen">
        <Header globalWhatsapp={globalWhatsapp} globalLogo={globalLogo} />
        
        <main className="flex-1">
          {children}
        </main>
        
        {/* Pasamos también los datos al Footer para consistencia total */}
        <Footer contactData={contactData} />
        <Toaster />
      </body>
    </html>
  );
}

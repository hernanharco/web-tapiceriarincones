export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Tapicería Rincón - Avilés',
  description: 'El Arte de Restaurar Tus Muebles con Tradición.',
};

// Función para detectar la URL correcta en cualquier entorno
function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:9002';
}

async function getContactSection() {
  const baseUrl = getBaseUrl().replace(/\/$/, '');
  try {
    const res = await fetch(`${baseUrl}/api/sections/contact`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error Layout Fetch:", error);
    return null;
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const contactData = await getContactSection();
  
  // Extracción robusta de datos
  const source = contactData?.content || contactData;
  const globalWhatsapp = source?.whatsappLink;
  const globalLogo = source?.logoUrl;

  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased font-sans flex flex-col min-h-screen">
        <Header globalWhatsapp={globalWhatsapp} globalLogo={globalLogo} />
        <main className="flex-1">{children}</main>
        <Footer contactData={contactData} />
        <Toaster />
      </body>
    </html>
  );
}

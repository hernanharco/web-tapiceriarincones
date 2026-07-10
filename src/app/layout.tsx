import type { Metadata } from 'next';
import { Alegreya } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AuthProvider } from '@/context/AuthContext';
import { BroadcastRefresh } from '@/components/layout/broadcast-refresh';

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
  display: 'swap',
});

// Importaciones para conexión directa a Base de Datos
import connectDB from '@/lib/mongodb';
import Section from '@/lib/models/Section';

export const metadata: Metadata = {
  title: 'Tapicería Rincón - Avilés',
  description: 'El Arte de Restaurar Tus Muebles con Tradición.',
};

// ISR 1h para datos de contacto (cambian poco)
export const revalidate = 3600;

async function getContactSectionDirect() {
  try {
    await connectDB();
    // Consultamos directamente el modelo Section
    const section = await Section.findOne({
      identifier: 'contact',
      isActive: true
    }).lean();

    if (!section) return null;

    // Serializamos el objeto de MongoDB para evitar errores con tipos complexos
    return JSON.parse(JSON.stringify(section));
  } catch (error) {
    console.error("Error Layout Direct Fetch:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactData = await getContactSectionDirect();

  // Extracción robusta de datos para Header y Footer
  const source = contactData?.content || contactData;
  const globalWhatsapp = source?.whatsappLink;
  const globalLogo = source?.logoUrl;

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Preconnect para Google Fonts (Material Symbols se carga desde el Header) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${alegreya.variable} antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          <BroadcastRefresh />
          <Header
            globalWhatsapp={globalWhatsapp}
            globalLogo={globalLogo}
          />

          <main className="flex-1">
            {children}
          </main>

          <Footer contactData={contactData} />

          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

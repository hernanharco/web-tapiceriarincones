import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// Importaciones para conexión directa a Base de Datos
import connectDB from '@/lib/mongodb';
import Section from '@/lib/models/Section';

export const metadata: Metadata = {
  title: 'Tapicería Rincón - Avilés',
  description: 'El Arte de Restaurar Tus Muebles con Tradición.',
};

// Forzamos que no haya cacheo para que los cambios del admin se vean reflejados
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getContactSectionDirect() {
  try {
    await connectDB();
    // Consultamos directamente el modelo Section
    const section = await Section.findOne({ 
      identifier: 'contact',
      isActive: true 
    }).lean();

    if (!section) return null;

    // Serializamos el objeto de MongoDB para evitar errores con tipos complexos (como ObjectIDs)
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
      <body className="antialiased font-sans flex flex-col min-h-screen">
        <Header 
          globalWhatsapp={globalWhatsapp} 
          globalLogo={globalLogo} 
        />
        
        <main className="flex-1">
          {children}
        </main>

        <Footer contactData={contactData} />
        
        <Toaster />
      </body>
    </html>
  );
}

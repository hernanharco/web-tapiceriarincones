export const dynamic = 'force-dynamic';

import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Clients } from '@/components/sections/clients';
import { Reviews } from '@/components/sections/reviews';
import { Contact } from '@/components/sections/contact';

// IMPORTA DIRECTAMENTE TU LÓGICA DE NEGOCIO
import connectDB from '@/lib/mongodb';
import Section from '@/lib/models/Section';

async function getSectionDataDirect(id: string) {
  try {
    await connectDB();
    // Buscamos directamente en la base de datos sin pasar por HTTP/Fetch
    const section = await Section.findOne({ identifier: id, isActive: true }).lean();
    return JSON.parse(JSON.stringify(section)); // Serializamos para evitar errores de hidratación
  } catch (error) {
    console.error(`Error DB Direct ${id}:`, error);
    return null;
  }
}

export default async function Home() {
  // Ahora las llamadas son directas a la base de datos
  const [heroData, aboutData, projectsData, clientsData, reviewsData, contactData] = 
    await Promise.all([
      getSectionDataDirect('hero'),
      getSectionDataDirect('about'),
      getSectionDataDirect('projects'),
      getSectionDataDirect('clients'),
      getSectionDataDirect('reviews'),
      getSectionDataDirect('contact'),
    ]);

  const globalWhatsapp = contactData?.content?.whatsappLink || contactData?.whatsappLink;

  return (
    <>
      <Hero data={heroData} globalWhatsapp={globalWhatsapp} />
      <About data={aboutData} />
      <Projects data={projectsData} globalWhatsapp={globalWhatsapp} />
      <Clients data={clientsData} />
      <Reviews data={reviewsData} />
      <Contact data={contactData} />
    </>
  );
}
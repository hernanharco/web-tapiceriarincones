import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Clients } from '@/components/sections/clients';
import { Reviews } from '@/components/sections/reviews';
import { Contact } from '@/components/sections/contact';

async function getSectionData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002'}/api/sections/${id}`,
      {
        cache: 'no-store',
      },
    );

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error cargando sección ${id}:`, error);
    return null;
  }
}

export default async function Home() {
  // LÓGICA DE ARQUITECTO: Cargamos todas en paralelo para máxima velocidad
  const [
    heroData,
    aboutData,
    projectsData,
    clientsData,
    reviewsData,
    contactData,
  ] = await Promise.all([
    getSectionData('hero'),
    getSectionData('about'),
    getSectionData('projects'),
    getSectionData('clients'),
    getSectionData('reviews'),
    getSectionData('contact'),
  ]);

  // Extraemos el link de WhatsApp Global (del contacto)
  const globalWhatsapp = contactData?.content?.whatsappLink;

  return (
    <>
      {/* Pasamos el link global al Hero */}
      <Hero data={heroData} globalWhatsapp={globalWhatsapp} />

      <About data={aboutData} />
      <Projects data={projectsData} globalWhatsapp={globalWhatsapp} />
      <Clients data={clientsData} />
      <Reviews data={reviewsData} />

      <Contact data={contactData} />
    </>
  );
}

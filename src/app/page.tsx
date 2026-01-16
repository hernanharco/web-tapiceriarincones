export const dynamic = 'force-dynamic'; // CRÍTICO: Debe ir al principio

import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Clients } from '@/components/sections/clients';
import { Reviews } from '@/components/sections/reviews';
import { Contact } from '@/components/sections/contact';

async function getSectionData(id: string) {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002').replace(/\/$/, '');
  
  try {
    const res = await fetch(`${baseUrl}/api/sections/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    // Durante el build de Vercel, esto fallará si la API no está lista, 
    // pero con force-dynamic evitamos que el build se rompa.
    return null;
  }
}

export default async function Home() {
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

  const globalWhatsapp = contactData?.content?.whatsappLink;

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
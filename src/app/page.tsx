export const dynamic = 'force-dynamic';

import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Clients } from '@/components/sections/clients';
import { Reviews } from '@/components/sections/reviews';
import { Contact } from '@/components/sections/contact';

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:9002';
}

async function getSectionData(id: string) {
  const baseUrl = getBaseUrl().replace(/\/$/, '');
  try {
    const res = await fetch(`${baseUrl}/api/sections/${id}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error API ${id}:`, error);
    return null;
  }
}

export default async function Home() {
  const [heroData, aboutData, projectsData, clientsData, reviewsData, contactData] = 
    await Promise.all([
      getSectionData('hero'),
      getSectionData('about'),
      getSectionData('projects'),
      getSectionData('clients'),
      getSectionData('reviews'),
      getSectionData('contact'),
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
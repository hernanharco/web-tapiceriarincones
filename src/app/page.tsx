import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Clients } from '@/components/sections/clients';
import { Reviews } from '@/components/sections/reviews';
import { Contact } from '@/components/sections/contact';

// 1. Función para obtener datos de la API
async function getSectionData(id: string) {
  try {
    // Usamos cache: 'no-store' para que Next.js no guarde una copia vieja
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002'}/api/sections/${id}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error cargando sección ${id}:`, error);
    return null;
  }
}

// 2. Convertimos Home en una función async (Server Component)
export default async function Home() {
  // 3. Llamamos a los datos de cada sección
  const heroData = await getSectionData('hero');
  const aboutData = await getSectionData('about');
  const projectsData = await getSectionData('projects');
  const clientsData = await getSectionData('clients');
  const reviewsData = await getSectionData('reviews');
  const contactData = await getSectionData('contact');

  return (
    <>
      {/* 4. Pasamos los datos a los componentes */}
      <Hero data={heroData} />
      <About data={aboutData} />
      <Projects data={projectsData} />
      <Clients data={clientsData} />
      <Reviews data={reviewsData} />
      <Contact data={contactData} />
    </>
  );
}
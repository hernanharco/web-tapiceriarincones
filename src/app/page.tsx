import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Projects } from '@/components/sections/projects';
import { Clients } from '@/components/sections/clients';
import { Reviews } from '@/components/sections/reviews';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Clients />
      <Reviews />
      <Contact />
    </>
  );
}

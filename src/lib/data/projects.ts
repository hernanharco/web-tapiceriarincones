import { PlaceHolderImages } from '../placeholder-images';
import type { Project } from '@/lib/types';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export const projects: Project[] = [
  {
    id: 'chester',
    title: 'Restauración de Sofá Chester',
    beforeImage: findImage('chester-before'),
    afterImage: findImage('chester-after'),
    contentForAI: 'Un clásico sofá Chesterfield de cuero, desgastado por el tiempo, fue completamente restaurado. Se reemplazó el relleno, se trató y tiñó el cuero para devolverle su color y lustre original, y se reforzó la estructura. Se prestó especial atención a la técnica de capitoné para mantener su diseño icónico.'
  },
  {
    id: 'dining-chairs',
    title: 'Tapizado de Sillas de Comedor',
    beforeImage: findImage('chairs-before'),
    afterImage: findImage('chairs-after'),
    contentForAI: 'Juego de seis sillas de comedor de madera con el tapizado original roto y manchado. Se eligió una nueva tela de alta resistencia y diseño moderno. Se renovó el acolchado del asiento para mayor comodidad y se limpió y trató la madera para que luciera como nueva.'
  },
  {
    id: 'classic-armchair',
    title: 'Retapizado de Butaca Clásica',
    beforeImage: findImage('armchair-before'),
    afterImage: findImage('armchair-after'),
    contentForAI: 'Una butaca clásica con valor sentimental, cuya tela estaba descolorida y gastada. El cliente eligió una tela de terciopelo de alta calidad. El proceso incluyó el reemplazo total del tapizado, nuevo relleno y el pulido de las patas de madera, convirtiéndola en la pieza central de la sala.'
  },
  {
    id: 'headboard',
    title: 'Creación de Cabecero a Medida',
    beforeImage: findImage('headboard-before'),
    afterImage: findImage('headboard-after'),
    contentForAI: 'Diseño y fabricación de un cabecero de cama tapizado en lino. El cliente quería un diseño moderno y minimalista para su dormitorio. Se creó una estructura de madera a medida, se acolchó con espuma de alta densidad y se tapizó con una tela de lino de color neutro, creando una pieza única y elegante.'
  }
];

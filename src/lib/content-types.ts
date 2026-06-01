// ============================================================
// src/lib/content-types.ts
// Tipos de contenido para cada sección del CMS.
// Discriminated union: el identifier determina la forma de content.
// ============================================================

// --- Hero ---
export interface HeroContent {
  mainTitle?: string;
  subtitle?: string;
  whatsappLink?: string;
  buttonText1?: string;
  buttonText2?: string;
  backgroundImage?: string;
}

// --- About ---
export interface AboutContent {
  title?: string;
  subtitle?: string;
  paragraphs?: string[];
  aboutImage?: string;
  teamImage?: string;
  historyStartYear?: number;
  spainEstablishmentYear?: number;
  location?: string;
}

// --- Projects ---
export interface ProjectItem {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export interface ProjectsContent {
  title?: string;
  subtitle?: string;
  catalogTitle?: string;
  whatsappLink?: string;
  projects: ProjectItem[];
}

// --- Clients ---
export interface ClientItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface ClientsContent {
  title?: string;
  subtitle?: string;
  items: ClientItem[];
}

// --- Reviews ---
export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  text: string;
  status?: 'published' | 'hidden' | 'pending';
  mobile?: string;
  email?: string;
  date?: Date;
}

export interface ReviewsContent {
  title?: string;
  subtitle?: string;
  reviews: ReviewItem[];
}

// --- Contact ---
export interface ContactContent {
  title?: string;
  subtitle?: string;
  whatsappLink?: string;
  buttonText?: string;
  address?: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
}

// ============================================================
// Mapa identifier → tipo de content
// ============================================================
export type SectionIdentifier =
  | 'hero'
  | 'about'
  | 'projects'
  | 'clients'
  | 'reviews'
  | 'contact';

export type SectionContentMap = {
  hero: HeroContent;
  about: AboutContent;
  projects: ProjectsContent;
  clients: ClientsContent;
  reviews: ReviewsContent;
  contact: ContactContent;
};

// Helper: dame el tipo de content para un identifier dado
export type ContentFor<T extends SectionIdentifier> = SectionContentMap[T];

// ============================================================
// Tipo de sección completo (lo que viaja entre DB, API y UI)
// ============================================================
export interface SectionData<T extends SectionIdentifier = SectionIdentifier> {
  _id?: string;
  identifier: T;
  title?: string;
  subtitle?: string;
  content: SectionContentMap[T];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================
// Valores por defecto para cada sección
// ============================================================
export const DEFAULT_SECTION_CONTENT: {
  [K in SectionIdentifier]: SectionContentMap[K];
} = {
  hero: {
    mainTitle: 'Tapicería Rincón: El Arte de Restaurar Tus Muebles con Tradición.',
    subtitle:
      'Más de 40 años de experiencia familiar, desde Colombia hasta Avilés, devolviendo la vida a tus sofás, sillas y tesoros.',
    whatsappLink:
      'https://wa.me/34000000000?text=Hola%20Tapicería%20Rincón,%20me%20gustaría%20pedir%20presupuesto%20para%20un%20trabajo%20de%20tapicería.',
    buttonText1: 'Ver Nuestros Trabajos',
    buttonText2: 'Contactar Ahora',
  },
  about: {
    title: 'De Tradición: Nuestra Historia',
    paragraphs: [
      'Somos una empresa familiar con una herencia en el arte de la tapicería que se remonta a <strong>1984 en Colombia</strong>. Llevamos la pasión y el conocimiento de generaciones en cada puntada.',
      "Desde <strong>2001</strong>, establecimos nuestro taller en <strong>Avilés, Asturias</strong>, combinando las técnicas tradicionales que aprendimos con los mejores materiales y tendencias de España. 'Tapicería Rincón' es el puente entre la tradición colombiana y la calidad europea.",
    ],
  },
  projects: {
    title: 'Transformamos lo Antiguo en Nuevo',
    subtitle:
      'Nuestro trabajo habla por nosotros. Hojea nuestro catálogo para ver la magia.',
    catalogTitle: 'Catálogo de Proyectos',
    projects: [],
  },
  clients: {
    title: '¿Para Quién Trabajamos?',
    subtitle:
      'En Tapicería Rincón ofrecemos soluciones tanto para hogares como para negocios.',
    items: [],
  },
  reviews: {
    title: 'Lo que Opinan Nuestros Clientes',
    reviews: [],
  },
  contact: {
    title: 'Hablemos de tu Proyecto',
    subtitle:
      'Estamos en Avilés, Asturias. Envíanos una foto de tu mueble y te damos presupuesto sin compromiso.',
    whatsappLink:
      'https://wa.me/34000000000?text=Hola%20Tapicería%20Rincón,%20me%20gustaría%20pedir%20presupuesto%20para%20un%20trabajo%20de%20tapicería.',
    buttonText: 'Pedir Presupuesto por WhatsApp',
    address: '[Dirección Completa], 3340X, Avilés, Asturias.',
    email: 'contacto@tapiceriarincon.com',
    phone: '[Tu número de teléfono]',
  },
};

/**
 * Combina datos de MongoDB (parciales) con valores por defecto,
 * aplanando content si es necesario.
 */
export function extractContent<T extends SectionIdentifier>(
  data: SectionData<T> | undefined | null,
): SectionContentMap[T] {
  const source = data?.content ?? ({} as SectionContentMap[T]);
  return { ...DEFAULT_SECTION_CONTENT[data?.identifier ?? 'hero'], ...source };
}

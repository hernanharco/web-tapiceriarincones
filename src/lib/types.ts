// ============================================================
// src/lib/types.ts — Re-exportaciones y tipos transversales
// ============================================================

export type {
  HeroContent,
  AboutContent,
  ProjectItem,
  ProjectsContent,
  ClientItem,
  ClientsContent,
  ReviewItem,
  ReviewsContent,
  ContactContent,
  SectionIdentifier,
  SectionContentMap,
  ContentFor,
  SectionData,
} from './content-types';

export { DEFAULT_SECTION_CONTENT, extractContent } from './content-types';

// ============================================================
// Tipos legacy (mantenidos para compatibilidad)
// ============================================================

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export type Project = {
  id: string;
  title: string;
  beforeImage: ImagePlaceholder | undefined;
  afterImage: ImagePlaceholder | undefined;
  contentForAI: string;
};

export type Review = {
  name: string;
  rating: number;
  text: string;
};

export type ClientType = {
  icon: string;
  title: string;
  description: string;
};

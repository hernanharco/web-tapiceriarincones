import { describe, it, expect } from 'vitest';
import { extractContent, DEFAULT_SECTION_CONTENT } from '@/lib/content-types';
import type { SectionData, HeroContent } from '@/lib/content-types';

describe('DEFAULT_SECTION_CONTENT', () => {
  it('tiene defaults para hero', () => {
    expect(DEFAULT_SECTION_CONTENT.hero.mainTitle).toBeTruthy();
    expect(DEFAULT_SECTION_CONTENT.hero.subtitle).toBeTruthy();
    expect(DEFAULT_SECTION_CONTENT.hero.whatsappLink).toContain('wa.me');
  });

  it('tiene defaults para about', () => {
    expect(DEFAULT_SECTION_CONTENT.about.title).toBeTruthy();
    expect(DEFAULT_SECTION_CONTENT.about.paragraphs).toHaveLength(2);
  });

  it('tiene defaults para contact', () => {
    expect(DEFAULT_SECTION_CONTENT.contact.title).toBeTruthy();
    expect(DEFAULT_SECTION_CONTENT.contact.whatsappLink).toContain('wa.me');
    expect(DEFAULT_SECTION_CONTENT.contact.email).toBeTruthy();
  });
});

describe('extractContent', () => {
  it('devuelve defaults para data null', () => {
    const result = extractContent<'hero'>(null);
    expect(result.mainTitle).toBe(DEFAULT_SECTION_CONTENT.hero.mainTitle);
  });

  it('devuelve defaults para data undefined', () => {
    const result = extractContent<'hero'>(undefined);
    expect(result.mainTitle).toBe(DEFAULT_SECTION_CONTENT.hero.mainTitle);
  });

  it('mezcla data parcial con defaults', () => {
    const data: SectionData<'hero'> = {
      identifier: 'hero',
      content: { mainTitle: 'Título Personalizado' },
      isActive: true,
    };
    const result = extractContent(data);
    expect(result.mainTitle).toBe('Título Personalizado');
    expect(result.subtitle).toBe(DEFAULT_SECTION_CONTENT.hero.subtitle);
  });
});

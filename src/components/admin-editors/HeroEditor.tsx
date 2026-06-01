'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploader } from './ImageUploader';
import type { SectionData, HeroContent } from '@/lib/content-types';

interface HeroEditorProps {
  data: SectionData<'hero'>;
  onChange: (newData: SectionData<'hero'>) => void;
}

export function HeroEditor({ data, onChange }: HeroEditorProps) {
  const content: HeroContent = data.content ?? {};

  const handleFieldChange = (field: keyof HeroContent, value: any) => {
    onChange({
      ...data,
      content: { ...content, [field]: value },
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 gap-6">
        {/* TÍTULO PRINCIPAL */}
        <div>
          <Label className="text-xs font-bold uppercase">Título Principal</Label>
          <Input
            className="text-lg font-bold"
            value={content.mainTitle ?? ''}
            onChange={(e) => handleFieldChange('mainTitle', e.target.value)}
            placeholder="Ej: Expertos en Tapicería Artesanal"
          />
        </div>

        {/* SUBTÍTULO */}
        <div>
          <Label className="text-xs font-bold uppercase">Subtítulo</Label>
          <Textarea
            value={content.subtitle ?? ''}
            onChange={(e) => handleFieldChange('subtitle', e.target.value)}
            rows={3}
            placeholder="Describe brevemente tu servicio..."
          />
        </div>

        {/* BOTONES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase">Texto Botón Primario</Label>
            <Input
              value={content.buttonText1 ?? ''}
              onChange={(e) => handleFieldChange('buttonText1', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase">Texto Botón Secundario</Label>
            <Input
              value={content.buttonText2 ?? ''}
              onChange={(e) => handleFieldChange('buttonText2', e.target.value)}
            />
          </div>
        </div>

        {/* GESTIÓN DE IMAGEN DE FONDO */}
        <div className="space-y-2">
          <Label className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">image</span>
            Imagen de Fondo del Hero
          </Label>

          <ImageUploader
            label="Imagen Principal de Portada"
            value={content.backgroundImage ?? ''}
            onChange={(url) => handleFieldChange('backgroundImage', url)}
          />

          <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">
            * Esta imagen se mostrará detrás de los textos principales.
          </p>
        </div>

        {/* WHATSAPP */}
        <div>
          <Label className="text-xs font-bold uppercase">Link de WhatsApp</Label>
          <Input
            value={content.whatsappLink ?? ''}
            onChange={(e) => handleFieldChange('whatsappLink', e.target.value)}
            placeholder="https://wa.me/34..."
          />
        </div>
      </div>
    </div>
  );
}

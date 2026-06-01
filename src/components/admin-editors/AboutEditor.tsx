'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploader } from './ImageUploader';
import { Info, ImageIcon } from 'lucide-react';
import type { SectionData, AboutContent } from '@/lib/content-types';

interface AboutEditorProps {
  data: SectionData<'about'>;
  onChange: (newData: SectionData<'about'>) => void;
}

export function AboutEditor({ data, onChange }: AboutEditorProps) {
  const content: AboutContent = data.content ?? {};

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...data,
      content: { ...content, title: e.target.value },
    });
  };

  const handleParagraphsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({
      ...data,
      content: {
        ...content,
        paragraphs: e.target.value.split('\n').filter((p) => p.trim() !== ''),
      },
    });
  };

  const handleImageChange = (url: string) => {
    onChange({
      ...data,
      content: { ...content, aboutImage: url },
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-2 border-b pb-2">
        <Info className="h-4 w-4 text-primary" />
        <h3 className="font-bold text-sm uppercase tracking-wider">Configuración Sobre Nosotros</h3>
      </div>

      <div className="space-y-4">
        {/* TÍTULO */}
        <div>
          <Label htmlFor="aboutTitle" className="text-xs font-bold uppercase text-muted-foreground">
            Título de la Sección
          </Label>
          <Input
            id="aboutTitle"
            className="mt-1 bg-white"
            value={content.title ?? ''}
            onChange={handleTitleChange}
          />
        </div>

        {/* PÁRRAFOS */}
        <div>
          <Label htmlFor="paragraphs" className="text-xs font-bold uppercase text-muted-foreground">
            Párrafos (uno por línea)
          </Label>
          <Textarea
            id="paragraphs"
            className="mt-1 resize-none bg-white font-sans"
            value={content.paragraphs?.join('\n') ?? ''}
            onChange={handleParagraphsChange}
            rows={6}
          />
        </div>

        {/* CARGADOR DE IMAGEN */}
        <div className="pt-4 border-t border-dashed">
          <Label className="text-sm font-bold uppercase flex items-center gap-2 mb-3 text-primary">
            <ImageIcon className="h-4 w-4" /> Imagen de la Sección
          </Label>

          <ImageUploader
            label="Foto del taller o equipo"
            value={content.aboutImage ?? ''}
            onChange={handleImageChange}
          />

          <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-tight italic text-center">
            * La imagen aparecerá automáticamente al guardar los cambios.
          </p>
        </div>
      </div>
    </div>
  );
}

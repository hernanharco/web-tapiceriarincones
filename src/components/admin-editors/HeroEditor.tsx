'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageIcon } from 'lucide-react';

// Importamos el componente que ya te funciona en ProjectsEditor
import { ImageUploader } from './ImageUploader';

interface HeroEditorProps {
  data: any;
  onChange: (newData: any) => void;
}

export function HeroEditor({ data, onChange }: HeroEditorProps) {
  
  // Función centralizada para cambios en el contenido
  const handleFieldChange = (field: string, value: any) => {
    onChange({
      ...data,
      content: {
        ...data.content,
        [field]: value,
      },
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
            value={data.content.mainTitle || ''}
            onChange={(e) => handleFieldChange('mainTitle', e.target.value)}
            placeholder="Ej: Expertos en Tapicería Artesanal"
          />
        </div>

        {/* SUBTÍTULO */}
        <div>
          <Label className="text-xs font-bold uppercase">Subtítulo</Label>
          <Textarea
            value={data.content.subtitle || ''}
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
              value={data.content.buttonText1 || ''}
              onChange={(e) => handleFieldChange('buttonText1', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase">Texto Botón Secundario</Label>
            <Input
              value={data.content.buttonText2 || ''}
              onChange={(e) => handleFieldChange('buttonText2', e.target.value)}
            />
          </div>
        </div>

        {/* GESTIÓN DE IMAGEN DE FONDO (Integrando el componente exitoso) */}
        <div className="space-y-2">
          <Label className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
            <ImageIcon className="h-4 w-4" /> Imagen de Fondo del Hero
          </Label>
          
          <ImageUploader 
            label="Imagen Principal de Portada"
            value={data.content.backgroundImage || ''}
            onChange={(url) => handleFieldChange('backgroundImage', url)}
          />
          
          <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">
            * Esta imagen se mostrará detrás de los textos principales.
          </p>
        </div>
      </div>
    </div>
  );
}
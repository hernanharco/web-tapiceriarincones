'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ImageUploader } from '@/components/admin-editors/ImageUploader';
import { Mail, Phone, MapPin, MessageSquare, Building2 } from 'lucide-react';
import type { SectionData, ContactContent } from '@/lib/content-types';

interface ContactEditorProps {
  data: SectionData<'contact'>;
  onChange: (newData: SectionData<'contact'>) => void;
}

export function ContactEditor({ data, onChange }: ContactEditorProps) {
  const content: ContactContent = data.content ?? {};

  const updateContent = <K extends keyof ContactContent>(
    field: K,
    value: ContactContent[K],
  ) => {
    onChange({
      ...data,
      content: { ...content, [field]: value },
    });
  };

  return (
    <div className="space-y-8">
      {/* SECCIÓN DEL LOGO */}
      <div className="bg-muted/30 p-4 rounded-xl border-2 border-dashed border-primary/20">
        <h3 className="text-sm font-bold flex items-center gap-2 mb-4 text-primary uppercase tracking-tighter">
          <Building2 className="h-4 w-4" /> Logo de la Empresa
        </h3>
        <div className="max-w-sm mx-auto">
          <ImageUploader
            label="Logo Oficial"
            value={content.logoUrl ?? ''}
            onChange={(url) => updateContent('logoUrl', url)}
          />
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2 italic">
          Se recomienda un archivo PNG con fondo transparente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TEXTOS PRINCIPALES */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest border-b pb-2">
            Textos de la Sección
          </h3>
          <div>
            <Label htmlFor="contactTitle">Título Principal</Label>
            <Input
              id="contactTitle"
              value={content.title ?? ''}
              onChange={(e) => updateContent('title', e.target.value)}
              placeholder="Ej: Hablemos de tu Proyecto"
            />
          </div>
          <div>
            <Label htmlFor="contactSubtitle">Subtítulo o Descripción</Label>
            <Textarea
              id="contactSubtitle"
              value={content.subtitle ?? ''}
              onChange={(e) => updateContent('subtitle', e.target.value)}
              rows={4}
              placeholder="Escribe una breve descripción..."
            />
          </div>
        </div>

        {/* DATOS DE CONTACTO */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest border-b pb-2">
            Información de Enlace
          </h3>

          <div className="space-y-3">
            <div>
              <Label className="flex items-center gap-2">
                <MapPin className="h-3 w-3" /> Dirección Física
              </Label>
              <Input
                value={content.address ?? ''}
                onChange={(e) => updateContent('address', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="flex items-center gap-2">
                  <Mail className="h-3 w-3" /> Email
                </Label>
                <Input
                  type="email"
                  value={content.email ?? ''}
                  onChange={(e) => updateContent('email', e.target.value)}
                />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Phone className="h-3 w-3" /> Teléfono
                </Label>
                <Input
                  value={content.phone ?? ''}
                  onChange={(e) => updateContent('phone', e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2">
              <Label className="flex items-center gap-2 text-green-600 font-bold">
                <MessageSquare className="h-3 w-3" /> Enlace de WhatsApp Global
              </Label>
              <Input
                className="border-green-200 focus-visible:ring-green-500 bg-green-50/30"
                value={content.whatsappLink ?? ''}
                onChange={(e) => updateContent('whatsappLink', e.target.value)}
                placeholder="https://wa.me/34..."
              />
              <p className="text-[10px] text-green-700 mt-1">
                Este link se sincronizará automáticamente en el Header, Hero y Catálogo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

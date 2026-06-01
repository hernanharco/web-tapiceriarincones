'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, LayoutGrid } from 'lucide-react';
import { ImageUploader } from './ImageUploader';
import type { SectionData, ClientsContent, ClientItem } from '@/lib/content-types';

interface ClientsEditorProps {
  data: SectionData<'clients'>;
  onChange: (newData: SectionData<'clients'>) => void;
}

export function ClientsEditor({ data, onChange }: ClientsEditorProps) {
  const content: ClientsContent = data.content ?? { items: [] };
  const items: ClientItem[] = content.items ?? [];

  const handleGlobalChange = (field: string, value: string) => {
    onChange({
      ...data,
      content: { ...content, [field]: value },
    });
  };

  const addItem = () => {
    const newItem: ClientItem = {
      id: crypto.randomUUID(),
      title: 'Nuevo Servicio',
      subtitle: '',
      icon: '',
    };
    onChange({
      ...data,
      content: { ...content, items: [...items, newItem] },
    });
  };

  const updateItem = (index: number, field: keyof ClientItem, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({
      ...data,
      content: { ...content, items: newItems },
    });
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange({
      ...data,
      content: { ...content, items: newItems },
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* CABECERA */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-sm uppercase tracking-wider">Editor de Servicios / Clientes</h3>
        </div>
        <Button onClick={addItem} size="sm" className="gap-2 bg-primary">
          <Plus className="h-4 w-4" /> Agregar Bloque
        </Button>
      </div>

      {/* TEXTOS GENERALES DE LA SECCIÓN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/30 p-4 rounded-lg border">
        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase">Título de Sección</Label>
          <Input
            value={content.title ?? ''}
            onChange={(e) => handleGlobalChange('title', e.target.value)}
            placeholder="Ej: Nuestros Servicios"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase">Subtítulo de Sección</Label>
          <Input
            value={content.subtitle ?? ''}
            onChange={(e) => handleGlobalChange('subtitle', e.target.value)}
            placeholder="Breve descripción de la sección"
          />
        </div>
      </div>

      {/* LISTADO DINÁMICO DE TARJETAS */}
      <div className="grid grid-cols-1 gap-6 mt-4">
        {items.map((item: ClientItem, index: number) => (
          <Card
            key={item.id}
            className="relative group border-2 border-dashed hover:border-primary/50 transition-colors"
          >
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => removeItem(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase flex items-center gap-1">
                    Icono / Logo
                  </Label>
                  <ImageUploader
                    label="Subir Icono"
                    value={item.icon ?? ''}
                    onChange={(url) => updateItem(index, 'icon', url)}
                  />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase">Título del Servicio</Label>
                    <Input
                      value={item.title ?? ''}
                      onChange={(e) => updateItem(index, 'title', e.target.value)}
                      placeholder="Ej: Clientes Particulares"
                      className="font-bold text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase">Descripción / Subtítulo</Label>
                    <Textarea
                      value={item.subtitle ?? ''}
                      onChange={(e) => updateItem(index, 'subtitle', e.target.value)}
                      placeholder="Describe brevemente el servicio..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {items.length === 0 && (
          <div className="text-center py-10 border-2 border-dashed rounded-lg bg-muted/10">
            <p className="text-muted-foreground text-sm">
              No hay bloques creados. Haz clic en &quot;Agregar Bloque&quot; para empezar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

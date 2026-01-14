'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Plus, LayoutGrid } from 'lucide-react';
import { ImageUploader } from './ImageUploader';

export function ProjectsEditor({ data, onChange }: { data: any; onChange: (newData: any) => void }) {
  const projects = data.content.projects || [];

  const updateProject = (index: number, field: string, value: string) => {
    const newProjects = [...projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    onChange({ ...data, content: { ...data.content, projects: newProjects } });
  };

  const addProject = () => {
    const newProject = { id: crypto.randomUUID(), title: '', beforeImage: '', afterImage: '', description: '' };
    onChange({ ...data, content: { ...data.content, projects: [...projects, newProject] } });
  };

  const removeProject = (index: number) => {
    const newProjects = projects.filter((_: any, i: number) => i !== index);
    onChange({ ...data, content: { ...data.content, projects: newProjects } });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-primary" /> Catálogo de Proyectos
          </h3>
          <p className="text-xs text-muted-foreground">Gestiona las fotos de "Antes y Después"</p>
        </div>
        <Button onClick={addProject} className="gap-2 shadow-sm">
          <Plus className="h-4 w-4" /> Nuevo Trabajo
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project: any, index: number) => (
          <Card key={project.id} className="relative bg-muted/5 border-primary/5 hover:border-primary/20 transition-colors">
            <Button 
              variant="destructive" 
              size="icon" 
              className="absolute -top-2 -right-2 h-7 w-7 rounded-full shadow-md"
              onClick={() => removeProject(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase">Nombre del Trabajo</Label>
                  <Input
                    value={project.title}
                    onChange={(e) => updateProject(index, 'title', e.target.value)}
                    placeholder="Ej: Sofá Chesterfield Cuero"
                    className="bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ImageUploader 
                    label="Estado Inicial (Antes)"
                    value={project.beforeImage}
                    onChange={(url) => updateProject(index, 'beforeImage', url)}
                  />
                  <ImageUploader 
                    label="Resultado Final (Después)"
                    value={project.afterImage}
                    onChange={(url) => updateProject(index, 'afterImage', url)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
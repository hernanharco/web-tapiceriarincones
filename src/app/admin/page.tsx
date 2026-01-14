'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importante para refrescar
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Eye, RefreshCw, ExternalLink } from 'lucide-react';

interface SectionData {
  identifier: string;
  title?: string;
  subtitle?: string;
  content: any;
  isActive: boolean;
}

const SECTIONS = [
  { id: 'hero', name: 'Hero Principal', description: 'Título principal y botones de acción' },
  { id: 'about', name: 'Sobre Nosotros', description: 'Historia y descripción de la empresa' },
  { id: 'projects', name: 'Proyectos', description: 'Catálogo de trabajos realizados' },
  { id: 'clients', name: 'Clientes', description: 'Tipos de clientes a los que servimos' },
  { id: 'contact', name: 'Contacto', description: 'Información de contacto y WhatsApp' },
  { id: 'reviews', name: 'Reseñas', description: 'Testimonios de clientes' }
];

export default function AdminPage() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState('hero');
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadSection = async (sectionId: string) => {
    setLoading(true);
    setMessage(null);
    
    try {
      const response = await fetch(`/api/sections/${sectionId}`);
      if (response.ok) {
        const data = await response.json();
        setSectionData(data);
      } else {
        setSectionData({
          identifier: sectionId,
          content: {},
          isActive: true
        });
      }
    } catch (error) {
      console.error('Error loading section:', error);
      setMessage({ type: 'error', text: 'Error cargando la sección' });
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async () => {
  if (!sectionData) return;
  setSaving(true);
  
  try {
    const response = await fetch(`/api/sections/${selectedSection}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sectionData),
    });
    
    if (response.ok) {
      setMessage({ type: 'success', text: '¡Guardado! Actualizando web...' });
      router.refresh();

      // --- LA SOLUCIÓN PROFESIONAL ---
      // Enviamos un mensaje a todas las pestañas de nuestro sitio
      const channel = new BroadcastChannel('site_update');
      channel.postMessage('refresh_home');
      channel.close(); // Cerramos el canal después de enviar

    } else {
      setMessage({ type: 'error', text: 'Error en la base de datos' });
    }
  } catch (error) {
    setMessage({ type: 'error', text: 'Error de conexión' });
  } finally {
    setSaving(false);
  }
};

  useEffect(() => {
    loadSection(selectedSection);
  }, [selectedSection]);

  const renderContentEditor = () => {
    if (!sectionData) return null;

    switch (selectedSection) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="mainTitle">Título Principal</Label>
              <Input
                id="mainTitle"
                value={sectionData.content.mainTitle || ''}
                onChange={(e) => setSectionData({
                  ...sectionData,
                  content: { ...sectionData.content, mainTitle: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtítulo</Label>
              <Textarea
                id="subtitle"
                value={sectionData.content.subtitle || ''}
                onChange={(e) => setSectionData({
                  ...sectionData,
                  content: { ...sectionData.content, subtitle: e.target.value }
                })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="whatsappLink">Enlace de WhatsApp</Label>
              <Input
                id="whatsappLink"
                value={sectionData.content.whatsappLink || ''}
                onChange={(e) => setSectionData({
                  ...sectionData,
                  content: { ...sectionData.content, whatsappLink: e.target.value }
                })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="buttonText1">Texto Botón 1</Label>
                <Input
                  id="buttonText1"
                  value={sectionData.content.buttonText1 || ''}
                  onChange={(e) => setSectionData({
                    ...sectionData,
                    content: { ...sectionData.content, buttonText1: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="buttonText2">Texto Botón 2</Label>
                <Input
                  id="buttonText2"
                  value={sectionData.content.buttonText2 || ''}
                  onChange={(e) => setSectionData({
                    ...sectionData,
                    content: { ...sectionData.content, buttonText2: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        );

      // ... otros casos (about, contact) se mantienen igual
      default:
        return <p className="text-sm text-muted-foreground">Editor para esta sección en desarrollo.</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-primary">Panel de Control</h1>
          <p className="text-muted-foreground text-sm">Gestiona el contenido de Tapicería Rincón</p>
        </div>
        <Button variant="outline" onClick={() => window.open('/', '_blank')}>
          <ExternalLink className="mr-2 h-4 w-4" />
          Ver Web Pública
        </Button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg animate-in fade-in slide-in-from-top-2 ${
          message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
          'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Secciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {SECTIONS.map((section) => (
                <Button
                  key={section.id}
                  variant={selectedSection === section.id ? 'default' : 'ghost'}
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => setSelectedSection(section.id)}
                >
                  <div>
                    <div className="font-semibold">{section.name}</div>
                    <div className="text-[10px] opacity-70 uppercase tracking-wider">{section.id}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="shadow-lg border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between bg-muted/30">
              <CardTitle className="text-xl">
                {SECTIONS.find(s => s.id === selectedSection)?.name}
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => loadSection(selectedSection)}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={saveSection}
                  disabled={saving || !sectionData}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Save className={`h-4 w-4 mr-2 ${saving ? 'animate-pulse' : ''}`} />
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary mb-2" />
                  <span className="text-sm font-medium">Conectando con MongoDB...</span>
                </div>
              ) : (
                renderContentEditor()
              )}
            </CardContent>
          </Card>

          {/* Vista Previa del JSON para depuración técnica */}
          <Card className="mt-6 opacity-80">
            <CardHeader className="py-3">
              <CardTitle className="text-sm flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                Data Debug (JSON)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-900 text-green-400 p-4 rounded-md text-[10px] overflow-auto max-h-40 font-mono">
                {JSON.stringify(sectionData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
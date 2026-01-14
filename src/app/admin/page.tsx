'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, Eye, RefreshCw, ExternalLink, LayoutDashboard } from 'lucide-react';

// Importamos el nuevo editor especializado
import { ProjectsEditor } from '@/components/admin-editors/ProjectsEditor';

interface SectionData {
  identifier: string;
  title?: string;
  subtitle?: string;
  content: any;
  isActive: boolean;
}

const SECTIONS = [
  { id: 'hero', name: 'Hero Principal', description: 'Portada y botones' },
  { id: 'about', name: 'Sobre Nosotros', description: 'Historia y descripción' },
  { id: 'projects', name: 'Proyectos', description: 'Catálogo Antes/Después' },
  { id: 'clients', name: 'Clientes', description: 'Tipos de clientes' },
  { id: 'contact', name: 'Contacto', description: 'Info y redes sociales' },
  { id: 'reviews', name: 'Reseñas', description: 'Testimonios' }
];

export default function AdminPage() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState('hero');
  const [sectionData, setSectionData] = useState<SectionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Carga de datos desde MongoDB
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

  // Guardado y notificación vía BroadcastChannel
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
        setMessage({ type: 'success', text: '¡Cambios guardados! Sincronizando web...' });
        router.refresh();
        
        // Sincronización en tiempo real
        const channel = new BroadcastChannel('site_update');
        channel.postMessage('refresh_home');
        channel.close();
      } else {
        setMessage({ type: 'error', text: 'Error al guardar en base de datos' });
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
              <Label>Título Principal</Label>
              <Input
                value={sectionData.content.mainTitle || ''}
                onChange={(e) => setSectionData({
                  ...sectionData,
                  content: { ...sectionData.content, mainTitle: e.target.value }
                })}
              />
            </div>
            <div>
              <Label>Subtítulo</Label>
              <Textarea
                value={sectionData.content.subtitle || ''}
                onChange={(e) => setSectionData({
                  ...sectionData,
                  content: { ...sectionData.content, subtitle: e.target.value }
                })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label>Botón 1</Label>
                <Input
                  value={sectionData.content.buttonText1 || ''}
                  onChange={(e) => setSectionData({...sectionData, content: {...sectionData.content, buttonText1: e.target.value}})}
                />
              </div>
              <div>
                <Label>Botón 2</Label>
                <Input
                  value={sectionData.content.buttonText2 || ''}
                  onChange={(e) => setSectionData({...sectionData, content: {...sectionData.content, buttonText2: e.target.value}})}
                />
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={sectionData.content.title || ''}
                onChange={(e) => setSectionData({...sectionData, content: {...sectionData.content, title: e.target.value}})}
              />
            </div>
            <div>
              <Label>Historia (Párrafos - Uno por línea)</Label>
              <Textarea
                value={sectionData.content.paragraphs?.join('\n') || ''}
                onChange={(e) => setSectionData({
                  ...sectionData,
                  content: { ...sectionData.content, paragraphs: e.target.value.split('\n').filter(p => p.trim()) }
                })}
                rows={8}
              />
            </div>
          </div>
        );

      case 'projects':
        // LLAMADA AL COMPONENTE EXTERNO
        return (
          <ProjectsEditor 
            data={sectionData} 
            onChange={(newData) => setSectionData(newData)} 
          />
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Dirección</Label>
                <Input
                  value={sectionData.content.address || ''}
                  onChange={(e) => setSectionData({...sectionData, content: {...sectionData.content, address: e.target.value}})}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={sectionData.content.email || ''}
                  onChange={(e) => setSectionData({...sectionData, content: {...sectionData.content, email: e.target.value}})}
                />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input
                  value={sectionData.content.phone || ''}
                  onChange={(e) => setSectionData({...sectionData, content: {...sectionData.content, phone: e.target.value}})}
                />
              </div>
            </div>
          </div>
        );

      default:
        return <div className="p-10 text-center border-2 border-dashed rounded-lg text-muted-foreground">Editor para {selectedSection} en desarrollo.</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header del Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <LayoutDashboard className="text-primary" /> Panel de Control
          </h1>
          <p className="text-muted-foreground">Tapicería Rincón - Sistema de Gestión</p>
        </div>
        <Button variant="outline" onClick={() => window.open('/', '_blank')}>
          <ExternalLink className="mr-2 h-4 w-4" /> Ver Web
        </Button>
      </div>

      {/* Alertas */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg border animate-in fade-in slide-in-from-top-2 ${
          message.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Secciones */}
        <aside className="lg:col-span-1 space-y-2">
          <Card>
            <CardHeader><CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Contenido</CardTitle></CardHeader>
            <CardContent className="space-y-1 p-2">
              {SECTIONS.map((section) => (
                <Button
                  key={section.id}
                  variant={selectedSection === section.id ? 'default' : 'ghost'}
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => setSelectedSection(section.id)}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{section.name}</span>
                    <span className="text-[10px] opacity-60 leading-none mt-1 uppercase tracking-tighter">{section.id}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Editor Principal */}
        <main className="lg:col-span-3">
          <Card className="shadow-xl border-primary/10">
            <CardHeader className="flex flex-row items-center justify-between bg-muted/20 border-b">
              <CardTitle className="text-lg">Editando: {SECTIONS.find(s => s.id === selectedSection)?.name}</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => loadSection(selectedSection)} disabled={loading}>
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
                <Button size="sm" onClick={saveSection} disabled={saving || !sectionData}>
                  <Save className={`h-4 w-4 mr-2 ${saving ? 'animate-pulse' : ''}`} />
                  {saving ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <RefreshCw className="h-10 w-10 animate-spin text-primary/40 mb-2" />
                  <p className="text-sm font-medium animate-pulse">Conectando con MongoDB...</p>
                </div>
              ) : renderContentEditor()}
            </CardContent>
          </Card>

          {/* Debug Panel */}
          <Card className="mt-8 opacity-60 hover:opacity-100 transition-opacity">
            <CardHeader className="py-2 border-b"><CardTitle className="text-[10px] flex items-center uppercase tracking-widest"><Eye className="h-3 w-3 mr-2" /> JSON Preview</CardTitle></CardHeader>
            <CardContent className="p-0">
              <pre className="bg-slate-950 text-slate-400 p-4 rounded-b-md text-[10px] overflow-auto max-h-40 font-mono">
                {JSON.stringify(sectionData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Save, Eye, RefreshCw, ExternalLink } from 'lucide-react';

// Hooks y Constantes
import { useAdminSections } from '@/hooks/useAdminSections';
import { SECTIONS } from '@/constants/adminSections';

// Editores
import { HeroEditor } from '@/components/admin-editors/HeroEditor';
import { ProjectsEditor } from '@/components/admin-editors/ProjectsEditor';
import { AboutEditor } from '@/components/admin-editors/AboutEditor';
import { ClientsEditor } from '@/components/admin-editors/clientsEditor';
import { ReviewsEditor } from '@/components/admin-editors/ReviewsEditor';
import { ContactEditor } from '@/components/admin-editors/ContactEditor';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function AdminPage() {
  const [selectedSection, setSelectedSection] = useState('hero');
  // 1. Obtenemos la URL de las variables de entorno
  const LOGIC_LAYER_URL = process.env.NEXT_PUBLIC_AUTH_LOGICLAYER || 'http://localhost:5173/';

  // Extraemos toda la lógica del Hook
  const {
    sectionData,
    setSectionData,
    loading,
    saving,
    message,
    loadSection,
    saveSection
  } = useAdminSections();

  // Efecto para cargar cuando cambia la selección
  useEffect(() => {
    loadSection(selectedSection);
  }, [selectedSection]);

  const renderContentEditor = () => {
    if (!sectionData) return null;
    const props = { data: sectionData, onChange: setSectionData };

    switch (selectedSection) {
      case 'hero': return <HeroEditor {...props} />;
      case 'about': return <AboutEditor {...props} />;
      case 'contact': return <ContactEditor {...props} />;
      case 'projects': return <ProjectsEditor {...props} />;
      case 'clients': return <ClientsEditor {...props} />;
      case 'reviews': return <ReviewsEditor {...props} />;
      // Nueva lógica para la Capa de Negocio
      case 'logic-layer':
        return (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
            <div className="bg-primary/10 p-6 rounded-full">
              <span className="material-symbols-outlined text-5xl text-primary">payments</span>
            </div>
            <div>
              <h3 className="text-xl font-bold">Módulo de Facturación y Finanzas</h3>
              <p className="text-muted-foreground max-w-md mx-auto mt-2">
                Esta sección se gestiona de forma externa para garantizar la seguridad de los cálculos financieros.
              </p>
            </div>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => window.open(LOGIC_LAYER_URL, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Abrir Capa de Negocio
            </Button>
            <div className="text-[10px] text-muted-foreground font-mono">
              Endpoint: {LOGIC_LAYER_URL}
            </div>
          </div>
        );

      default: return <p className="text-sm text-muted-foreground">Editor en desarrollo.</p>;
    }
  };

  return (
    <ProtectedRoute minRole="Admin">
      <div className="container mx-auto px-4 py-8">
        {/* Cabecera */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-primary">Panel de Control</h1>
            <p className="text-muted-foreground text-sm">Gestiona el contenido de Tapicería Rincón</p>
          </div>
          <Button variant="outline" onClick={() => window.open('/', '_blank')}>
            <ExternalLink className="mr-2 h-4 w-4" /> Ver Web Pública
          </Button>
        </div>

        {/* Mensajes de Feedback */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg animate-in fade-in slide-in-from-top-2 ${message.type === 'success' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
            } border`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar de Secciones */}
          <div className="lg:col-span-1">
            <Card className="border-primary/20">
              <CardHeader><CardTitle className="text-lg">Secciones</CardTitle></CardHeader>
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

          {/* Editor Principal */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between bg-muted/30">
                <CardTitle className="text-xl">
                  {SECTIONS.find((s) => s.id === selectedSection)?.name}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => loadSection(selectedSection)} disabled={loading}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Reset
                  </Button>
                  <Button size="sm" onClick={() => saveSection(selectedSection)} disabled={saving || !sectionData} className="bg-primary hover:bg-primary/90">
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
                ) : renderContentEditor()}
              </CardContent>
            </Card>

            {/* Debug JSON */}
            <Card className="mt-6 opacity-80">
              <CardHeader className="py-3">
                <CardTitle className="text-sm flex items-center"><Eye className="h-4 w-4 mr-2" /> Data Debug (JSON)</CardTitle>
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
    </ProtectedRoute>
  );
}
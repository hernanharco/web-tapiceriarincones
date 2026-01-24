'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface SectionData {
  identifier: string;
  title?: string;
  subtitle?: string;
  content: any;
  isActive: boolean;
}

export function useAdminSections() {
  const router = useRouter();
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
        setSectionData({ identifier: sectionId, content: {}, isActive: true });
      }
    } catch (error) {
      console.error('Error loading section:', error);
      setMessage({ type: 'error', text: 'Error cargando la sección' });
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (selectedSection: string) => {
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
        const channel = new BroadcastChannel('site_update');
        channel.postMessage('refresh_home');
        channel.close();
      } else {
        setMessage({ type: 'error', text: 'Error en la base de datos' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión' });
    } finally {
      setSaving(false);
    }
  };

  return {
    sectionData,
    setSectionData,
    loading,
    saving,
    message,
    setMessage,
    loadSection,
    saveSection
  };
}
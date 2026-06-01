'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type {
  SectionIdentifier,
  SectionData,
  SectionContentMap,
} from '@/lib/content-types';

interface UseAdminSectionsReturn<T extends SectionIdentifier> {
  sectionData: SectionData<T> | null;
  setSectionData: React.Dispatch<React.SetStateAction<SectionData<T> | null>>;
  loading: boolean;
  saving: boolean;
  message: { type: 'success' | 'error'; text: string } | null;
  setMessage: React.Dispatch<
    React.SetStateAction<{ type: 'success' | 'error'; text: string } | null>
  >;
  loadSection: (sectionId: T) => Promise<void>;
  saveSection: (sectionId: T) => Promise<void>;
}

export function useAdminSections<
  T extends SectionIdentifier = SectionIdentifier,
>(): UseAdminSectionsReturn<T> {
  const router = useRouter();
  const [sectionData, setSectionData] = useState<SectionData<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const loadSection = async (sectionId: T) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/sections/${sectionId}`);
      if (response.ok) {
        const data: SectionData<T> = await response.json();
        setSectionData(data);
      } else {
        setSectionData({
          identifier: sectionId,
          content: {} as SectionContentMap[T],
          isActive: true,
        } as SectionData<T>);
      }
    } catch (error) {
      console.error('Error loading section:', error);
      setMessage({ type: 'error', text: 'Error cargando la sección' });
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (sectionId: T) => {
    if (!sectionData) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/sections/${sectionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sectionData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: '¡Guardado! Actualizando web...' });

        // 1. Revalidación del lado del servidor (On-Demand Revalidation)
        fetch('/api/revalidate', { method: 'POST' }).catch(() => {});

        // 2. Refresco del router de Next.js (client-side)
        router.refresh();

        // 3. BroadcastChannel para otras pestañas con la web abierta
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
    saveSection,
  };
}

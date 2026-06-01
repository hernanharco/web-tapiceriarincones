'use client';

import { useEffect } from 'react';

/**
 * Hook que escucha el canal BroadcastChannel 'site_update'
 * y recarga la página cuando recibe 'refresh_home'.
 * Se usa en las secciones públicas para reflejar cambios del admin.
 *
 * Centraliza la lógica que estaba duplicada en todos los componentes de sección.
 */
export function useRevalidateOnSave() {
  useEffect(() => {
    const channel = new BroadcastChannel('site_update');

    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'refresh_home') {
        window.location.reload();
      }
    };

    channel.addEventListener('message', handleMessage);

    return () => {
      channel.removeEventListener('message', handleMessage);
      channel.close();
    };
  }, []);
}

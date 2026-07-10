'use client';

import { useEffect } from 'react';

/**
 * Hook de layout que escucha BroadcastChannel 'site_update'
 * y recarga la página cuando recibe 'refresh_home'.
 *
 * Centralizado AQUÍ en vez de duplicado en cada sección.
 */
export function BroadcastRefresh() {
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

  // Este componente no renderiza nada visible
  return null;
}

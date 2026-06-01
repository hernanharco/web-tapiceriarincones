'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4">
      <div className="bg-destructive/10 p-6 rounded-full">
        <span className="material-symbols-outlined text-5xl text-destructive">
          error
        </span>
      </div>
      <h2 className="text-2xl font-bold text-center">
        Algo salió mal
      </h2>
      <p className="text-muted-foreground text-center max-w-md">
        Hubo un error al cargar la página. Ya lo registramos y lo estamos
        revisando.
      </p>
      <Button onClick={reset} variant="default">
        Intentar de nuevo
      </Button>
    </div>
  );
}

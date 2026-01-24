'use client';

import { useAuth } from '@/context/AuthContext'; // Asumiendo que crearás un contexto o usa tu lógica de Header
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { hasPermission, UserRole } from '@/lib/roles';

export function ProtectedRoute({ 
  children, 
  minRole 
}: { 
  children: React.ReactNode; 
  minRole: UserRole 
}) {
  const { user, isLoading } = useAuth(); // Necesitarás centralizar el estado del usuario
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || !hasPermission(user.role, minRole))) {
      router.push('/'); // Si no tiene permiso, lo mandamos al inicio
    }
  }, [user, isLoading, minRole, router]);

  if (isLoading || !user || !hasPermission(user.role, minRole)) {
    return <div className="h-screen flex items-center justify-center">Verificando credenciales...</div>;
  }

  return <>{children}</>;
}
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { hasPermission, UserRole } from '@/lib/roles';

export function ProtectedRoute({
  children,
  minRole,
}: {
  children: React.ReactNode;
  minRole: UserRole;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      // No autenticado → redirigir al login
      router.push('/login');
    } else if (!hasPermission(user.role, minRole)) {
      // Autenticado pero sin permisos → a la home
      router.push('/');
    }
  }, [user, isLoading, minRole, router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-muted-foreground">
        Verificando credenciales...
      </div>
    );
  }

  if (!user || !hasPermission(user.role, minRole)) {
    return null;
  }

  return <>{children}</>;
}

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loadProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // REGLA DE ORO: Usamos la ruta relativa para que el Proxy de Next.js
  // intercepte la petición, añada las cookies y la mande a Render.
  const API_BASE = '/api/v1';

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      // Al usar path relativo, el navegador adjunta automáticamente 
      // las cookies de localhost/vercel si SameSite está en 'none' o 'lax'.
      const response = await fetch(`${API_BASE}/perfil`, {
        method: 'GET',
        // credentials: 'include' es vital para que las cookies viajen al backend de Render
        credentials: 'include', 
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser({
            name: data.user.name || data.user.email?.split('@')[0] || 'Usuario',
            email: data.user.email || '',
            role: data.user.role || 'Viewer'
          });
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error en sincronización de identidad:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/logout`, { 
        method: 'POST', 
        credentials: 'include' 
      });
      setUser(null);
      // Opcional: Redirigir al Auth Center tras el logout
      window.location.href = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3000';
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, loadProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};
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
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000/api';

  const loadProfile = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/perfil`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser({
            name: data.user.email?.split('@')[0] || 'Usuario',
            email: data.user.email || '',
            role: data.user.role || 'Viewer'
          });
        }
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${BACKEND_URL}/logout`, { method: 'POST', credentials: 'include' });
      setUser(null);
    } catch (err) {
      console.error('Logout error', err);
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

// Hook para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};
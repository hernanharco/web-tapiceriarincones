// src/app/login/page.tsx
// Página de login: redirige al backend de autenticación externo.
// El backend maneja el login y redirige de vuelta con la cookie de sesión.

import { redirect } from 'next/navigation';

export default function LoginPage() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '/api/v1';
  const returnUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';

  // Redirigir al login del backend con return URL
  redirect(`${backendUrl}/auth/login?redirect=${encodeURIComponent(returnUrl)}`);
}

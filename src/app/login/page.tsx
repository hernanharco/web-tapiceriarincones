// src/app/login/page.tsx
// Esta clase se crea porque cada vez que habia un error este redirigía a /login
// y no era lo que queríamos.
import { redirect } from 'next/navigation';
export default function LoginPage() {
  // Forzamos que cualquier intento de ir a /login termine en la raíz
  redirect('/'); 
}
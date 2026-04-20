# Acceso al Panel de Administración (/admin)

## 📋 Resumen

El acceso al panel de administración está protegido por un sistema de autenticación basado en roles (RBAC). Solo usuarios con rol **Admin** o superior pueden acceder a `/admin`.

## 🔐 Cómo Acceder a /admin

### 1. Autenticación Requerida
- **URL**: `https://tu-dominio.com/admin`
- **Método**: Navegar directamente a la ruta `/admin`
- **Redirección**: Si no estás autenticado, serás redirigido al inicio

### 2. Proceso de Verificación
1. El sistema verifica si tienes una sesión activa (cookies)
2. Consulta el endpoint `/api/perfil` para obtener tu rol
3. Compara tu rol con el mínimo requerido (Admin)
4. Si tienes permisos, carga el panel; si no, redirige al inicio

## 🛡️ Sistema de Permisos

### Jerarquía de Roles (de mayor a menor autoridad)

```typescript
const ROLE_HIERARCHY = {
  SuperAdmin: 100, // Control absoluto del sistema
  Owner: 80,      // Dueño del negocio: finanzas y borrado lógico
  Admin: 60,      // Gestión de personal, clientes y reportes ✅ MÍNIMO PARA /admin
  Editor: 40,     // Gestión de contenidos, fotos y proyectos
  Viewer: 20,      // Solo lectura
}
```

### Componente Clave: `ProtectedRoute`

**Archivo**: `src/components/auth/ProtectedRoute.tsx`

Este componente es el guardián de las rutas protegidas:

```typescript
<ProtectedRoute minRole="Admin">
  <AdminPage />
</ProtectedRoute>
```

**Función principal**:
- Verifica el rol del usuario via `useAuth()`
- Usa `hasPermission()` para comparar roles
- Redirige si no tiene permisos suficientes

## 🔍 Lógica de Permisos

### Función: `hasPermission()`

**Archivo**: `src/lib/roles.ts`

```typescript
export const hasPermission = (userRole: string, minRequiredRole: UserRole): boolean => {
  const userLevel = ROLE_HIERARCHY[userRole as UserRole] || 0;
  const requiredLevel = ROLE_HIERARCHY[minRequiredRole];
  return userLevel >= requiredLevel;
};
```

**Lógica**: Si el nivel numérico del usuario ≥ nivel requerido → ✅ Acceso permitido

## 👤 Roles que Pueden Acceder a /admin

| Rol | Nivel | ¿Puede acceder a /admin? |
|-----|-------|---------------------------|
| SuperAdmin | 100 | ✅ Sí |
| Owner | 80 | ✅ Sí |
| Admin | 60 | ✅ Sí (mínimo requerido) |
| Editor | 40 | ❌ No |
| Viewer | 20 | ❌ No |

## 🔄 Flujo Completo de Acceso

1. **Usuario navega a `/admin`**
2. **`ProtectedRoute` se activa** con `minRole="Admin"`
3. **`useAuth()` verifica sesión** via cookies
4. **Llama a `/api/perfil`** para obtener datos del usuario
5. **`hasPermission()` compara roles**
6. **Resultado**:
   - ✅ Si `user.role >= Admin` → Carga panel de administración
   - ❌ Si no → Redirección a `/` con mensaje "Verificando credenciales..."

## 🛠️ Configuración del Usuario

### Contexto de Autenticación

**Archivo**: `src/context/AuthContext.tsx`

El usuario se estructura así:
```typescript
interface User {
  name: string;
  email: string;
  role: string; // "Admin", "Editor", etc.
}
```

### Endpoint de Perfil

- **URL**: `${BACKEND_URL}/perfil`
- **Método**: GET
- **Credenciales**: `include` (cookies)
- **Respuesta esperada**:
```json
{
  "success": true,
  "user": {
    "email": "admin@ejemplo.com",
    "role": "Admin"
  }
}
```

## 🚨 Mensajes de Error Comunes

### "Verificando credenciales..."
- **Causa**: No hay sesión activa o el rol es insuficiente
- **Solución**: Iniciar sesión con un usuario Admin o superior

### Redirección automática al inicio
- **Causa**: El rol del usuario es menor a "Admin"
- **Solución**: Contactar al administrador para asignar rol adecuado

## 📝 Notas Importantes

- Las cookies son **esenciales** para mantener la sesión
- El rol se obtiene del **backend** cada vez que se carga la página
- El sistema es **stateless** - no depende del estado local
- Todos los roles superiores a Admin heredan automáticamente el acceso

---

**Última actualización**: Sistema basado en RBAC con protección por `ProtectedRoute` y jerarquía en `src/lib/roles.ts`

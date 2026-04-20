/**
 * JERARQUÍA DE ROLES - CONTROL DE ACCESO BASADO EN ROLES (RBAC)
 * * Definimos el peso de cada rol. A mayor valor numérico, mayor nivel de autoridad.
 * Esta estructura permite comparaciones lógicas (ej: Admin > Editor).
 * Usamos 'as const' para que TypeScript trate los valores como literales exactos.
 */
export const ROLE_HIERARCHY = {  
  SuperAdmin: 100, // Control absoluto del sistema y multitenencia
  Owner: 80,      // Dueño del negocio: acceso a finanzas y borrado lógico
  Admin: 60,      // Gestión de personal, clientes y reportes
  Editor: 40,     // Gestión de contenidos, fotos y proyectos
  Viewer: 20,     // Solo lectura: clientes o invitados que ven su dashboard
} as const;

/**
 * TIPO: UserRole
 * Extrae las llaves de ROLE_HIERARCHY para asegurar que solo usemos roles válidos
 * en todo el proyecto (Autocompletado de TypeScript).
 */
export type UserRole = keyof typeof ROLE_HIERARCHY;

/**
 * FUNCIÓN: hasPermission
 * Determina si un usuario tiene el nivel suficiente para realizar una acción
 * o acceder a una ruta específica.
 * * @param userRole - El rol actual del usuario (extraído del JWT o Perfil)
 * @param minRequiredRole - El rol mínimo necesario para la acción
 * @returns boolean - true si tiene permiso, false en caso contrario
 */
export const hasPermission = (userRole: string | undefined, minRequiredRole: UserRole): boolean => {
  // 1. Si no hay rol (usuario no autenticado), denegamos acceso por defecto
  if (!userRole) return false;

  // 2. Obtenemos el "peso" numérico del rol del usuario
  // Si el rol no existe en nuestra jerarquía, asignamos peso 0
  const userLevel = ROLE_HIERARCHY[userRole as UserRole] || 0;

  // 3. Obtenemos el "peso" mínimo requerido
  const requiredLevel = ROLE_HIERARCHY[minRequiredRole];

  // 4. Lógica de umbral: Si el nivel del usuario es mayor o igual al requerido, tiene permiso
  return userLevel >= requiredLevel;
};

export function mapBackendRole(backendRole: string): string {
  const map: Record<string, string> = {
    'SUPERADMIN': 'SuperAdmin',
    'ADMIN':      'Admin',
    'MANAGER':    'Admin',   // Manager también puede acceder a /admin
    'USER':       'Viewer',
    'VIEWER':     'Viewer',
    'NONE':       'Viewer',
  };
  return map[backendRole?.toUpperCase()] || 'Viewer';
}
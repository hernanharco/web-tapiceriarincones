import { describe, it, expect } from 'vitest';
import { hasPermission, mapBackendRole, ROLE_HIERARCHY } from '@/lib/roles';

describe('ROLE_HIERARCHY', () => {
  it('tiene los roles definidos con niveles correctos', () => {
    expect(ROLE_HIERARCHY.SuperAdmin).toBe(100);
    expect(ROLE_HIERARCHY.Owner).toBe(80);
    expect(ROLE_HIERARCHY.Admin).toBe(60);
    expect(ROLE_HIERARCHY.Editor).toBe(40);
    expect(ROLE_HIERARCHY.Viewer).toBe(20);
  });
});

describe('hasPermission', () => {
  it('deniega acceso si no hay rol', () => {
    expect(hasPermission(undefined, 'Admin')).toBe(false);
  });

  it('deniega acceso si el rol es insuficiente', () => {
    expect(hasPermission('Viewer', 'Admin')).toBe(false);
    expect(hasPermission('Editor', 'Admin')).toBe(false);
  });

  it('permite acceso si el rol es igual al requerido', () => {
    expect(hasPermission('Admin', 'Admin')).toBe(true);
    expect(hasPermission('Viewer', 'Viewer')).toBe(true);
  });

  it('permite acceso si el rol supera el requerido', () => {
    expect(hasPermission('SuperAdmin', 'Admin')).toBe(true);
    expect(hasPermission('Admin', 'Editor')).toBe(true);
    expect(hasPermission('Owner', 'Viewer')).toBe(true);
  });

  it('devuelve false para roles inválidos', () => {
    expect(hasPermission('NonExistent', 'Admin')).toBe(false);
  });
});

describe('mapBackendRole', () => {
  it('mapea SUPERADMIN correctamente', () => {
    expect(mapBackendRole('SUPERADMIN')).toBe('SuperAdmin');
  });

  it('mapea ADMIN y MANAGER a Admin', () => {
    expect(mapBackendRole('ADMIN')).toBe('Admin');
    expect(mapBackendRole('MANAGER')).toBe('Admin');
  });

  it('mapea USER a Viewer por defecto', () => {
    expect(mapBackendRole('USER')).toBe('Viewer');
  });

  it('mapea roles desconocidos a Viewer', () => {
    expect(mapBackendRole('UNKNOWN')).toBe('Viewer');
  });

  it('es case-insensitive', () => {
    expect(mapBackendRole('admin')).toBe('Admin');
    expect(mapBackendRole('Admin')).toBe('Admin');
  });
});

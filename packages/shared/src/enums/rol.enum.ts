export const RolUsuario = {
  ADMIN: 'ADMIN',
  CANDIDATO: 'CANDIDATO',
  EMPLEADOR: 'EMPLEADOR',
} as const;

export type RolUsuario = (typeof RolUsuario)[keyof typeof RolUsuario];

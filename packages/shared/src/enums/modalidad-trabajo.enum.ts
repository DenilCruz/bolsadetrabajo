export const ModalidadTrabajo = {
  PRESENCIAL: 'PRESENCIAL',
  REMOTO: 'REMOTO',
  HIBRIDO: 'HIBRIDO',
} as const;

export type ModalidadTrabajo =
  (typeof ModalidadTrabajo)[keyof typeof ModalidadTrabajo];

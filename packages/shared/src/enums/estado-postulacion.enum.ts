export const EstadoPostulacion = {
  POSTULADO: 'POSTULADO',
  EN_REVISION: 'EN_REVISION',
  ENTREVISTA: 'ENTREVISTA',
  RECHAZADO: 'RECHAZADO',
  ACEPTADO: 'ACEPTADO',
} as const;

export type EstadoPostulacion =
  (typeof EstadoPostulacion)[keyof typeof EstadoPostulacion];

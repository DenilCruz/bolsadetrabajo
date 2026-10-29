import { EstadoPostulacion } from '../enums/estado-postulacion.enum.js';

export interface IPostulacion {
  id: string;
  ofertaId: string;
  candidatoId: string;
  estado: EstadoPostulacion;
  cartaPresentacion?: string;
  creadoEn: Date;
  actualizadoEn: Date;
}


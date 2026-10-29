import { ModalidadTrabajo } from '../enums/modalidad-trabajo.enum.js';

export interface IOfertaEmpleo {
  id: string;
  empresaId: string;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  modalidad: ModalidadTrabajo;
  salarioMin?: number;
  salarioMax?: number;
  estaPublicada: boolean;
  fechaPublicacion?: Date;
  fechaCierre?: Date;
}


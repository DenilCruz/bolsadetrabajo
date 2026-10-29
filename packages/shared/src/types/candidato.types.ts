export interface ICandidato {
  id: string;
  usuarioId: string;
  nombres: string;
  apellidos: string;
  telefono?: string;
  tituloProfesional?: string;
  resumen?: string;
  cvUrl?: string;
}

export interface IExperienciaLaboral {
  id: string;
  candidatoId: string;
  puesto: string;
  empresa: string;
  fechaInicio: Date;
  fechaFin?: Date;
  esActual: boolean;
  descripcion?: string;
}

export interface IEducacion {
  id: string;
  candidatoId: string;
  institucion: string;
  titulo: string;
  fechaInicio: Date;
  fechaFin?: Date;
}


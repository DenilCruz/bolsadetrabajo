import { DistritoMunicipalSCZ } from '../enums/distrito-scz.enum.js';

export interface IVacanteDistrito {
  id_empleo: string;
  titulo_puesto: string;
  nombre_empresa: string;
  sector_industrial?: string;
  modalidad: string;
  ubicacion_exacta: string;
  salario_bs: number;
  req_destacado?: string;
  distrito: DistritoMunicipalSCZ | string;
  fecha_publicacion?: string;
}

export interface IDistritoResumen {
  codigo: DistritoMunicipalSCZ | string;
  numero: number;
  nombre: string;
  subalcaldia: string;
  barrios: string[];
  totalVacantes: number;
  ofertas: IVacanteDistrito[];
}


import { RolUsuario } from '../enums/rol.enum.js';

export interface IUsuario {
  id: string;
  email: string;
  rol: RolUsuario;
  estaActivo: boolean;
  creadoEn: Date;
  actualizadoEn: Date;
}

export interface IAuthUser {
  id: string;
  email: string;
  rol: RolUsuario;
}


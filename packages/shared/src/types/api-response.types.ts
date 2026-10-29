export interface IApiResponse<T = unknown> {
  exito: boolean;
  mensaje?: string;
  datos?: T;
  error?: string;
}

export interface IPaginacionMeta {
  total: number;
  pagina: number;
  limite: number;
  totalPaginas: number;
}

export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  meta?: IPaginacionMeta;
}


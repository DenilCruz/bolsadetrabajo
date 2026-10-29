export interface IEmpresa {
  id: string;
  nombreComercial: string;
  razonSocial: string;
  identificacionFiscal: string;
  sitioWeb?: string;
  descripcion?: string;
  logoUrl?: string;
}

export interface IEmpleador {
  id: string;
  usuarioId: string;
  empresaId: string;
  cargo: string;
  telefono?: string;
}


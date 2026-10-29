import { Injectable } from '@nestjs/common';
import {
  DistritoMunicipalSCZ,
  type IDistritoResumen,
  type IVacanteDistrito,
} from '@bolsa/shared';
import { DatabaseService } from '../database/database.service.js';

const CATALOGO_DISTRITOS: Omit<IDistritoResumen, 'totalVacantes' | 'ofertas'>[] = [
  {
    codigo: DistritoMunicipalSCZ.DM_1,
    numero: 1,
    nombre: 'Piraí / Equipetrol / Las Palmas',
    subalcaldia: 'Av. Roca y Coronado (lado Fexpocruz)',
    barrios: ['Equipetrol Norte', 'Barrio Sirari', 'Las Palmas', 'Barrio Hamacas', 'Zona Fexpocruz'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_2,
    numero: 2,
    nombre: 'Norte Interno / Av. Banzer - Mutualista',
    subalcaldia: 'Av. Mutualista entre 2do y 3er Anillo',
    barrios: ['Barrio Petrolero', 'Los Sauces', 'Av. Cristo Redentor', 'Av. Alemana'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_3,
    numero: 3,
    nombre: 'Estación Argentina / Melchor Pinto',
    subalcaldia: 'Av. Tres Pasos al Frente y 3er Anillo',
    barrios: ['Estación Argentina', 'Barrio Lindo', 'Parque Urbano', 'Av. Brasil'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_4,
    numero: 4,
    nombre: 'Pari / El Trompillo / Santos Dumont',
    subalcaldia: 'Av. Santos Dumont entre 3er y 4to Anillo',
    barrios: ['Barrio Urbari', 'Zona El Trompillo', 'Barrio Ramafa', 'Las Palmas Sur'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_5,
    numero: 5,
    nombre: 'Norte Alto / Remanso / Banzer Norte',
    subalcaldia: 'Av. Banzer 4to Anillo al Norte',
    barrios: ['Zona Remanso', 'Valle Sánchez', 'Los Chacos', 'Km 8 al Norte'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_6,
    numero: 6,
    nombre: 'Pampa de la Isla / Carretera a Cotoca',
    subalcaldia: 'Av. Virgen de Cotoca 6to Anillo',
    barrios: ['Pampa de la Isla', 'Virgen de Luján', '23 de Diciembre', 'Carretera a Cotoca'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_7,
    numero: 7,
    nombre: 'Villa 1ro de Mayo',
    subalcaldia: 'Plaza Principal Villa 1ro de Mayo',
    barrios: ['Villa 1ro de Mayo', 'Av. Cumavi', 'Tres Pasos al Frente', 'Barrio Primavera'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_8,
    numero: 8,
    nombre: 'Plan 3000 / Ciudadela Andrés Ibáñez',
    subalcaldia: 'Rotonda El Mechero, Av. Paurito',
    barrios: ['El Mechero', 'Av. Principal San Martín', 'Barrio San Agustín', 'La Campana'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_9,
    numero: 9,
    nombre: 'Palmasola / Sur',
    subalcaldia: 'Av. Santos Dumont 6to Anillo Sur',
    barrios: ['Palmasola', 'Zona Refinería', 'San Antonio Sur', 'Santos Dumont Sur'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_10,
    numero: 10,
    nombre: 'El Bajío / Doble Vía a La Guardia',
    subalcaldia: 'Doble Vía La Guardia Km 6',
    barrios: ['El Bajío', 'Km 6 Doble Vía', 'Barrio Magisterio Sur', 'Mercado Abasto Nuevo'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_11,
    numero: 11,
    nombre: 'Centro Histórico / Casco Viejo',
    subalcaldia: 'Centro (Dentro del 1er y 2do Anillo)',
    barrios: ['Plaza 24 de Septiembre', 'Mercado 7 Calles', 'San Roque', 'Monseñor Rivero'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_12,
    numero: 12,
    nombre: 'Los Lotes / Nuevo Palmar',
    subalcaldia: 'Av. Nuevo Palmar Sur',
    barrios: ['Los Lotes', 'Nuevo Palmar', 'El Fuerte', 'Isla del Palmar', 'Copacabana'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_13,
    numero: 13,
    nombre: 'El Palmar del Oratorio / Zona Sur',
    subalcaldia: 'Subalcaldía Distrito 13 - El Palmar',
    barrios: ['El Palmar del Oratorio', 'Cortéz', 'San Miguel del Rosario', 'Zona Sur'],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_16,
    numero: 16,
    nombre: 'Distrito Industrial (Parque Industrial)',
    subalcaldia: 'Parque Industrial Ramón Darío Gutiérrez',
    barrios: ['Parque Industrial', 'Manzanas Industriales PI-1 a PI-45', 'Av. Virgen de Cotoca'],
  },
];

@Injectable()
export class PublicoService {
  constructor(private readonly db: DatabaseService) {}

  async obtenerVacantesPorDistrito(): Promise<IDistritoResumen[]> {
    const result = await this.db.query<IVacanteDistrito>(`
      SELECT 
        o.id_empleo,
        o.titulo_puesto,
        e.nombre_empresa,
        e.sector_industrial,
        o.modalidad,
        o.ubicacion_exacta,
        o.salario_bs::float AS salario_bs,
        o.req_destacado,
        o.distrito,
        o.fecha_publicacion
      FROM ofertas_empleo o
      INNER JOIN empresas e ON e.id_empresa = o.id_empresa
      WHERE o.estado = 'ACTIVA'
      ORDER BY o.fecha_publicacion DESC
    `);

    const ofertas = result.rows;

    return CATALOGO_DISTRITOS.map((dist) => {
      const ofertasDistrito = ofertas.filter((o) => o.distrito === dist.codigo);
      return {
        ...dist,
        totalVacantes: ofertasDistrito.length,
        ofertas: ofertasDistrito,
      };
    });
  }
}

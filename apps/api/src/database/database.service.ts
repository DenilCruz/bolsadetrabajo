import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import pg from 'pg';

const { Pool } = pg;

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly pool: pg.Pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      user: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASSWORD ?? 'postgres',
      database: process.env.DB_NAME ?? 'bolsa_trabajo',
    });
  }

  async onModuleInit() {
    try {
      await this.pool.query(`
        INSERT INTO ofertas_empleo (id_empleo, id_empresa, titulo_puesto, modalidad, distrito, ubicacion_exacta, salario_bs, req_destacado, estado) VALUES
        ('OFE-124', 'EMP-006', 'Encargado de Centro de Distribución Sur', 'Presencial', 'DM-13', 'Av. El Palmar del Oratorio Km 9 Sur', 6100.00, 'Gestión de inventarios y despacho mayorista', 'ACTIVA'),
        ('OFE-125', 'EMP-004', 'Jefe de Planta Procesadora de Alimentos', 'Presencial', 'DM-16', 'Parque Industrial Manzana 24 (4to Anillo)', 10800.00, 'Ingeniería Industrial o de Alimentos, 4 años exp.', 'ACTIVA'),
        ('OFE-126', 'EMP-008', 'Analista de Laboratorio de Control Físico-Químico', 'Presencial', 'DM-16', 'Parque Industrial PI-31, Av. Virgen de Cotoca', 6400.00, 'Lic. Ingeniería Química o Industrial', 'ACTIVA')
        ON CONFLICT (id_empleo) DO NOTHING;
      `);
    } catch {
      // Ignorar si PostgreSQL aún no está activo
    }
  }

  async query<T extends pg.QueryResultRow = any>(
    text: string,
    params?: unknown[],
  ): Promise<pg.QueryResult<T>> {
    return this.pool.query<T>(text, params);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}


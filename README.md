# pasantia

## Bolsa de Trabajo por Distritos Municipales (Santa Cruz de la Sierra)

Plataforma de Bolsa de Trabajo georreferenciada para la Provincia Andrés Ibáñez (Santa Cruz de la Sierra, Bolivia).

### Tecnologías
- **Frontend:** React 19, Vite, TypeScript, Leaflet con polígonos oficiales de Guía Urbana GAMSC.
- **Backend:** NestJS, TypeScript, PostgreSQL.
- **Base de Datos:** PostgreSQL en Docker con esquema relacional para empresas, ofertas de empleo, postulaciones y candidatos.
- **Monorepo:** Administrado con `pnpm workspaces` (`@bolsa/shared`, `apps/web`, `apps/api`).

### Instrucciones de uso
```bash
# 1. Iniciar la base de datos PostgreSQL
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Compilar el monorepo
pnpm build

# 4. Iniciar en modo desarrollo
pnpm dev
```

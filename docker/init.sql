-- Inicialización de Base de Datos para Bolsa de Trabajo (Santa Cruz de la Sierra)
-- PostgreSQL Schema

-- 1. Tabla de Empresas (Empleadores)
CREATE TABLE IF NOT EXISTS empresas (
    id_empresa VARCHAR(20) PRIMARY KEY,
    nombre_empresa VARCHAR(100) NOT NULL,
    email_contacto VARCHAR(100) NOT NULL,
    sector_industrial VARCHAR(50),
    tamano VARCHAR(50),
    zona_sede VARCHAR(100),
    logo_url TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Ofertas de Empleo (Anuncios)
CREATE TABLE IF NOT EXISTS ofertas_empleo (
    id_empleo VARCHAR(20) PRIMARY KEY,
    id_empresa VARCHAR(20) NOT NULL,
    titulo_puesto VARCHAR(100) NOT NULL,
    modalidad VARCHAR(50),
    distrito VARCHAR(20) NOT NULL DEFAULT 'DM-11',
    ubicacion_exacta VARCHAR(100),
    salario_bs DECIMAL(10, 2),
    req_destacado VARCHAR(255),
    estado VARCHAR(20) DEFAULT 'ACTIVA',
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_empresa 
        FOREIGN KEY (id_empresa) 
        REFERENCES empresas(id_empresa) 
        ON DELETE CASCADE
);

-- 3. Tabla de Candidatos (Postulantes)
CREATE TABLE IF NOT EXISTS candidatos (
    id_candidato VARCHAR(20) PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    profesion_oficio VARCHAR(100),
    zona_residencia VARCHAR(100),
    whatsapp_contacto VARCHAR(20),
    habilidades_clave TEXT,
    cv_url TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla de Postulaciones (Relación Candidatos - Ofertas)
CREATE TABLE IF NOT EXISTS postulaciones (
    id_postulacion VARCHAR(20) PRIMARY KEY,
    id_empleo VARCHAR(20) NOT NULL,
    id_candidato VARCHAR(20) NOT NULL,
    estado VARCHAR(20) DEFAULT 'POSTULADO',
    fecha_postulacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_postulacion_empleo 
        FOREIGN KEY (id_empleo) 
        REFERENCES ofertas_empleo(id_empleo) 
        ON DELETE CASCADE,
    CONSTRAINT fk_postulacion_candidato 
        FOREIGN KEY (id_candidato) 
        REFERENCES candidatos(id_candidato) 
        ON DELETE CASCADE,
    CONSTRAINT uk_candidato_empleo 
        UNIQUE (id_empleo, id_candidato)
);

-- ============================================================================
-- DATOS SEMILLA (SEED) - SANTA CRUZ DE LA SIERRA (PROVINCIA ANDRÉS IBÁÑEZ)
-- ============================================================================

INSERT INTO empresas (id_empresa, nombre_empresa, email_contacto, sector_industrial, tamano, zona_sede) VALUES
('EMP-001', 'Banco Ganadero S.A.', 'rrhh@bg.com.bo', 'Banca y Finanzas', 'Grande', 'Centro Histórico / Casco Viejo'),
('EMP-002', 'Farmacorp S.A.', 'talento@farmacorp.com', 'Salud y Retail', 'Grande', 'Equipetrol Norte'),
('EMP-003', 'FEXPOCRUZ', 'rrhh@fexpocruz.com.bo', 'Eventos y Negocios', 'Mediana', 'Av. Roca y Coronado'),
('EMP-004', 'Sofía Ltda.', 'seleccion@sofia.com.bo', 'Agroindustria y Alimentos', 'Grande', 'Parque Industrial / Norte'),
('EMP-005', 'Tigo Bolivia', 'careers@tigo.net.bo', 'Telecomunicaciones y TI', 'Grande', 'Av. Doble Vía La Guardia'),
('EMP-006', 'Supermercados Hipermaxi', 'empleos@hipermaxi.com', 'Comercio y Supermercados', 'Grande', 'Av. Banzer 3er Anillo'),
('EMP-007', 'Cooperativa Jesús Nazareno', 'rrhh@cjn.com.bo', 'Finanzas / Cooperativa', 'Grande', 'Villa 1ro de Mayo'),
('EMP-008', 'Industrias Oleaginosas (IOL)', 'talento@rico.com.bo', 'Industrial', 'Grande', 'Carretera a Cotoca / Pampa de la Isla')
ON CONFLICT (id_empresa) DO NOTHING;

INSERT INTO ofertas_empleo (id_empleo, id_empresa, titulo_puesto, modalidad, distrito, ubicacion_exacta, salario_bs, req_destacado, estado) VALUES
-- DM-11: Casco Viejo / Centro
('OFE-101', 'EMP-001', 'Ejecutivo de Cuentas Empresariales', 'Presencial', 'DM-11', 'Calle Bolívar esq. Beni (UV 1)', 7500.00, 'Lic. Ingeniería Comercial o Financiera, 2 años exp.', 'ACTIVA'),
('OFE-102', 'EMP-001', 'Analista de Riesgo Crediticio', 'Híbrido', 'DM-11', 'Plaza 24 de Septiembre', 6800.00, 'Manejo avanzado de estados financieros y Excel', 'ACTIVA'),
('OFE-103', 'EMP-002', 'Regente Farmacéutico Turno Mañana', 'Presencial', 'DM-11', 'Zona Mercado 7 Calles', 5200.00, 'Título en Provisión Nacional en Bioquímica y Farmacia', 'ACTIVA'),

-- DM-1: Piraí / Equipetrol / Las Palmas
('OFE-104', 'EMP-002', 'Desarrollador Full Stack (React / NestJS)', 'Híbrido', 'DM-1', 'Equipetrol Calle 8 Este (UV 29)', 11500.00, 'TypeScript, PostgreSQL, React, APIs REST', 'ACTIVA'),
('OFE-105', 'EMP-003', 'Coordinador de Logística Ferial', 'Presencial', 'DM-1', 'Av. Roca y Coronado (Predio Ferial)', 6400.00, 'Experiencia en montaje de eventos y proveedores', 'ACTIVA'),
('OFE-106', 'EMP-002', 'Especialista en Marketing Digital & Growth', 'Híbrido', 'DM-1', 'Barrio Sirari, Torre Empresarial', 7200.00, 'Gestión de pauta digital, SEO/SEM y analítica', 'ACTIVA'),

-- DM-2: Norte Interno (Av. Banzer / Mutualista / Alemana)
('OFE-107', 'EMP-006', 'Jefe de Sucursal Comercial', 'Presencial', 'DM-2', 'Av. Cristo Redentor 3er Anillo', 8200.00, 'Liderazgo de equipos de +30 personas en retail', 'ACTIVA'),
('OFE-108', 'EMP-006', 'Contador General Senior', 'Presencial', 'DM-2', 'Av. Mutualista 2do Anillo (UV 18)', 6500.00, 'Conocimiento SIAT Impuestos Nacionales y NIIF', 'ACTIVA'),

-- DM-3: Estación Argentina / Melchor Pinto
('OFE-109', 'EMP-006', 'Supervisor de Almacén yRecepción', 'Presencial', 'DM-3', 'Av. Brasil y 3er Anillo Interno', 4900.00, 'Manejo de ERP SAP e inventarios rotativos', 'ACTIVA'),

-- DM-4: Pari / El Trompillo
('OFE-110', 'EMP-001', 'Oficial de Negocios PYME', 'Presencial', 'DM-4', 'Av. Santos Dumont 3er Anillo (Barrio Urbari)', 5800.00, 'Cartera de clientes en zona sur y mercados', 'ACTIVA'),
('OFE-111', 'EMP-003', 'Encargado de Mantenimiento Eléctrico', 'Presencial', 'DM-4', 'Zona Aeropuerto El Trompillo', 5100.00, 'Técnico Superior en Electricidad Industrial', 'ACTIVA'),

-- DM-5: Norte Alto / Remanso / Banzer Norte
('OFE-112', 'EMP-004', 'Ingeniero de Control de Calidad Agroindustrial', 'Presencial', 'DM-5', 'Av. Banzer Km 8.5 al Norte (Zona Remanso)', 8900.00, 'Normas ISO 22000, BPM y HACCP', 'ACTIVA'),
('OFE-113', 'EMP-004', 'Jefe de Despacho y Cadena de Frío', 'Presencial', 'DM-5', '4to Anillo y Av. Alemana Norte', 7400.00, 'Logística de distribución nacional', 'ACTIVA'),

-- DM-6: Pampa de la Isla / Carretera a Cotoca
('OFE-114', 'EMP-008', 'Ingeniero Electromecánico de Planta', 'Presencial', 'DM-6', 'Carretera a Cotoca Km 6 (Pampa de la Isla)', 9200.00, 'Mantenimiento preventivo de líneas industriales', 'ACTIVA'),
('OFE-115', 'EMP-008', 'Prevencionista de Seguridad Industrial (SYSO)', 'Presencial', 'DM-6', 'Av. Virgen de Cotoca 6to Anillo', 6300.00, 'Registro vigente en Ministerio de Trabajo', 'ACTIVA'),

-- DM-7: Villa 1ro de Mayo
('OFE-116', 'EMP-007', 'Asesor de Microcrédito Productivo', 'Presencial', 'DM-7', 'Plaza Principal Villa 1ro de Mayo', 5400.00, 'Evaluación crediticia en campo y comercio', 'ACTIVA'),
('OFE-117', 'EMP-007', 'Cajero de Agencia Financiera', 'Presencial', 'DM-7', 'Av. Cumavi 5to Anillo', 3800.00, 'Arqueo de caja y detección de billetes', 'ACTIVA'),

-- DM-8: Plan 3000 (Ciudadela Andrés Ibáñez)
('OFE-118', 'EMP-007', 'Jefe de Agencia Financiera Plan 3000', 'Presencial', 'DM-8', 'Rotonda El Mechero, Av. Paurito', 8500.00, 'Experiencia liderando agencias bancarias en ciudadelas', 'ACTIVA'),
('OFE-119', 'EMP-002', 'Encargado de Sucursal Farmacéutica', 'Presencial', 'DM-8', 'Av. Principal San Martín (Plan 3000)', 5100.00, 'Atención al cliente y control de stock', 'ACTIVA'),

-- DM-9: Palmasola / Sur
('OFE-120', 'EMP-004', 'Supervisor de Flota y Transporte Pesado', 'Presencial', 'DM-9', 'Av. Santos Dumont 6to Anillo Sur', 6000.00, 'Control satelital GPS y mantenimiento diésel', 'ACTIVA'),

-- DM-10: El Bajío / Doble Vía a La Guardia
('OFE-121', 'EMP-005', 'Ingeniero de Redes y Fibra Óptica', 'Presencial', 'DM-10', 'Doble Vía La Guardia Km 6 (El Bajío)', 8800.00, 'Certificación CCNA y despliegue GPON', 'ACTIVA'),
('OFE-122', 'EMP-005', 'Ejecutivo de Ventas Corporativas B2B', 'Híbrido', 'DM-10', 'Av. Doble Vía La Guardia 4to Anillo', 6900.00, 'Cierre de cuentas corporativas en telecomunicaciones', 'ACTIVA'),

-- DM-12: Los Lotes / Nuevo Palmar
('OFE-123', 'EMP-007', 'Oficial de Crédito Agropecuario y Pyme', 'Presencial', 'DM-12', 'Av. Nuevo Palmar (Zona Los Lotes)', 5200.00, 'Conocimiento de la zona sur y transporte propio', 'ACTIVA'),

-- DM-13: El Palmar del Oratorio / Zona Sur
('OFE-124', 'EMP-006', 'Encargado de Centro de Distribución Sur', 'Presencial', 'DM-13', 'Av. El Palmar del Oratorio Km 9 Sur', 6100.00, 'Gestión de inventarios y despacho mayorista', 'ACTIVA'),

-- DM-16: Distrito Industrial (Parque Industrial Ramón Darío Gutiérrez)
('OFE-125', 'EMP-004', 'Jefe de Planta Procesadora de Alimentos', 'Presencial', 'DM-16', 'Parque Industrial Manzana 24 (4to Anillo)', 10800.00, 'Ingeniería Industrial o de Alimentos, 4 años exp.', 'ACTIVA'),
('OFE-126', 'EMP-008', 'Analista de Laboratorio de Control Físico-Químico', 'Presencial', 'DM-16', 'Parque Industrial PI-31, Av. Virgen de Cotoca', 6400.00, 'Lic. Ingeniería Química o Industrial', 'ACTIVA')
ON CONFLICT (id_empleo) DO NOTHING;

import { useEffect, useMemo, useState } from 'react';
import {
  DistritoMunicipalSCZ,
  type IDistritoResumen,
} from '@bolsa/shared';
import { MapaDistritosSantaCruz } from '../components/MapaDistritosSantaCruz.js';
import {
  IconHome,
  IconMap,
  IconBriefcase,
  IconPostulaciones,
  IconInfo,
  IconContact,
  IconCathedral,
  IconPin,
  IconSearch,
  IconChevronRight,
  IconBank,
  IconPill,
  IconSignal,
  IconRetail,
  IconFactory,
} from '../../../components/icons/Icons.js';

const FALLBACK_DISTRITOS: IDistritoResumen[] = [
  {
    codigo: DistritoMunicipalSCZ.DM_11,
    numero: 11,
    nombre: 'Centro Histórico / Casco Viejo',
    subalcaldia: 'Centro (Dentro del 1er y 2do Anillo)',
    barrios: ['Plaza 24 de Septiembre', 'Mercado 7 Calles', 'San Roque', 'Monseñor Rivero'],
    totalVacantes: 3,
    ofertas: [
      {
        id_empleo: 'OFE-101',
        titulo_puesto: 'Ejecutivo de Cuentas Empresariales',
        nombre_empresa: 'Banco Ganadero S.A.',
        sector_industrial: 'Banca y Finanzas',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Calle Bolívar esq. Beni (UV 1)',
        salario_bs: 7500,
        req_destacado: 'Lic. Ingeniería Comercial o Financiera, 2 años exp.',
        distrito: 'DM-11',
      },
      {
        id_empleo: 'OFE-102',
        titulo_puesto: 'Analista de Riesgo Crediticio',
        nombre_empresa: 'Banco Ganadero S.A.',
        sector_industrial: 'Banca y Finanzas',
        modalidad: 'Híbrido',
        ubicacion_exacta: 'Plaza 24 de Septiembre',
        salario_bs: 6800,
        req_destacado: 'Manejo avanzado de estados financieros y Excel',
        distrito: 'DM-11',
      },
      {
        id_empleo: 'OFE-103',
        titulo_puesto: 'Regente Farmacéutico Turno Mañana',
        nombre_empresa: 'Farmacorp S.A.',
        sector_industrial: 'Salud y Retail',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Zona Mercado 7 Calles',
        salario_bs: 5200,
        req_destacado: 'Título en Provisión Nacional en Bioquímica y Farmacia',
        distrito: 'DM-11',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_1,
    numero: 1,
    nombre: 'Piraí / Equipetrol / Las Palmas',
    subalcaldia: 'Av. Roca y Coronado (lado Fexpocruz)',
    barrios: ['Equipetrol Norte', 'Barrio Sirari', 'Las Palmas', 'Barrio Hamacas', 'Zona Fexpocruz'],
    totalVacantes: 3,
    ofertas: [
      {
        id_empleo: 'OFE-104',
        titulo_puesto: 'Desarrollador Full Stack (React / NestJS)',
        nombre_empresa: 'Farmacorp S.A.',
        sector_industrial: 'Salud y Retail',
        modalidad: 'Híbrido',
        ubicacion_exacta: 'Equipetrol Calle 8 Este (UV 29)',
        salario_bs: 11500,
        req_destacado: 'TypeScript, PostgreSQL, React, APIs REST',
        distrito: 'DM-1',
      },
      {
        id_empleo: 'OFE-105',
        titulo_puesto: 'Coordinador de Logística Ferial',
        nombre_empresa: 'FEXPOCRUZ',
        sector_industrial: 'Eventos y Negocios',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Av. Roca y Coronado (Predio Ferial)',
        salario_bs: 6400,
        req_destacado: 'Experiencia en montaje de eventos y proveedores',
        distrito: 'DM-1',
      },
      {
        id_empleo: 'OFE-106',
        titulo_puesto: 'Especialista en Marketing Digital & Growth',
        nombre_empresa: 'Farmacorp S.A.',
        sector_industrial: 'Salud y Retail',
        modalidad: 'Híbrido',
        ubicacion_exacta: 'Barrio Sirari, Torre Empresarial',
        salario_bs: 7200,
        req_destacado: 'Gestión de pauta digital, SEO/SEM y analítica',
        distrito: 'DM-1',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_2,
    numero: 2,
    nombre: 'Norte Interno / Av. Banzer - Mutualista',
    subalcaldia: 'Av. Mutualista entre 2do y 3er Anillo',
    barrios: ['Barrio Petrolero', 'Los Sauces', 'Av. Cristo Redentor', 'Av. Alemana'],
    totalVacantes: 2,
    ofertas: [
      {
        id_empleo: 'OFE-107',
        titulo_puesto: 'Jefe de Sucursal Comercial',
        nombre_empresa: 'Supermercados Hipermaxi',
        sector_industrial: 'Comercio y Supermercados',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Av. Cristo Redentor 3er Anillo',
        salario_bs: 8200,
        req_destacado: 'Liderazgo de equipos de +30 personas en retail',
        distrito: 'DM-2',
      },
      {
        id_empleo: 'OFE-108',
        titulo_puesto: 'Contador General Senior',
        nombre_empresa: 'Supermercados Hipermaxi',
        sector_industrial: 'Comercio y Supermercados',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Av. Mutualista 2do Anillo (UV 18)',
        salario_bs: 6500,
        req_destacado: 'Conocimiento SIAT Impuestos Nacionales y NIIF',
        distrito: 'DM-2',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_3,
    numero: 3,
    nombre: 'Estación Argentina / Melchor Pinto',
    subalcaldia: 'Av. Tres Pasos al Frente y 3er Anillo',
    barrios: ['Estación Argentina', 'Barrio Lindo', 'Parque Urbano', 'Av. Brasil'],
    totalVacantes: 1,
    ofertas: [
      {
        id_empleo: 'OFE-109',
        titulo_puesto: 'Supervisor de Almacén y Recepción',
        nombre_empresa: 'Supermercados Hipermaxi',
        sector_industrial: 'Comercio y Supermercados',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Av. Brasil y 3er Anillo Interno',
        salario_bs: 4900,
        req_destacado: 'Manejo de ERP SAP e inventarios rotativos',
        distrito: 'DM-3',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_4,
    numero: 4,
    nombre: 'Pari / El Trompillo / Santos Dumont',
    subalcaldia: 'Av. Santos Dumont entre 3er y 4to Anillo',
    barrios: ['Barrio Urbari', 'Zona El Trompillo', 'Barrio Ramafa', 'Las Palmas Sur'],
    totalVacantes: 2,
    ofertas: [
      {
        id_empleo: 'OFE-110',
        titulo_puesto: 'Oficial de Negocios PYME',
        nombre_empresa: 'Banco Ganadero S.A.',
        sector_industrial: 'Banca y Finanzas',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Av. Santos Dumont 3er Anillo (Barrio Urbari)',
        salario_bs: 5800,
        req_destacado: 'Cartera de clientes en zona sur y mercados',
        distrito: 'DM-4',
      },
      {
        id_empleo: 'OFE-111',
        titulo_puesto: 'Encargado de Mantenimiento Eléctrico',
        nombre_empresa: 'FEXPOCRUZ',
        sector_industrial: 'Eventos y Negocios',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Zona Aeropuerto El Trompillo',
        salario_bs: 5100,
        req_destacado: 'Técnico Superior en Electricidad Industrial',
        distrito: 'DM-4',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_5,
    numero: 5,
    nombre: 'Norte Alto / Remanso / Banzer Norte',
    subalcaldia: 'Av. Banzer 4to Anillo al Norte',
    barrios: ['Zona Remanso', 'Valle Sánchez', 'Los Chacos', 'Km 8 al Norte'],
    totalVacantes: 2,
    ofertas: [
      {
        id_empleo: 'OFE-112',
        titulo_puesto: 'Ingeniero de Control de Calidad Agroindustrial',
        nombre_empresa: 'Sofía Ltda.',
        sector_industrial: 'Agroindustria y Alimentos',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Av. Banzer Km 8.5 al Norte (Zona Remanso)',
        salario_bs: 8900,
        req_destacado: 'Normas ISO 22000, BPM y HACCP',
        distrito: 'DM-5',
      },
      {
        id_empleo: 'OFE-113',
        titulo_puesto: 'Jefe de Despacho y Cadena de Frío',
        nombre_empresa: 'Sofía Ltda.',
        sector_industrial: 'Agroindustria y Alimentos',
        modalidad: 'Presencial',
        ubicacion_exacta: '4to Anillo y Av. Alemana Norte',
        salario_bs: 7400,
        req_destacado: 'Logística de distribución nacional',
        distrito: 'DM-5',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_6,
    numero: 6,
    nombre: 'Pampa de la Isla / Carretera a Cotoca',
    subalcaldia: 'Av. Virgen de Cotoca 6to Anillo',
    barrios: ['Pampa de la Isla', 'Virgen de Luján', '23 de Diciembre', 'Carretera a Cotoca'],
    totalVacantes: 2,
    ofertas: [
      {
        id_empleo: 'OFE-114',
        titulo_puesto: 'Ingeniero Electromecánico de Planta',
        nombre_empresa: 'Industrias Oleaginosas (IOL)',
        sector_industrial: 'Industrial',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Carretera a Cotoca Km 6 (Pampa de la Isla)',
        salario_bs: 9200,
        req_destacado: 'Mantenimiento preventivo de líneas industriales',
        distrito: 'DM-6',
      },
      {
        id_empleo: 'OFE-115',
        titulo_puesto: 'Prevencionista de Seguridad Industrial (SYSO)',
        nombre_empresa: 'Industrias Oleaginosas (IOL)',
        sector_industrial: 'Industrial',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Av. Virgen de Cotoca 6to Anillo',
        salario_bs: 6300,
        req_destacado: 'Registro vigente en Ministerio de Trabajo',
        distrito: 'DM-6',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_7,
    numero: 7,
    nombre: 'Villa 1ro de Mayo',
    subalcaldia: 'Plaza Principal Villa 1ro de Mayo',
    barrios: ['Villa 1ro de Mayo', 'Av. Cumavi', 'Tres Pasos al Frente', 'Barrio Primavera'],
    totalVacantes: 2,
    ofertas: [
      {
        id_empleo: 'OFE-116',
        titulo_puesto: 'Asesor de Microcrédito Productivo',
        nombre_empresa: 'Cooperativa Jesús Nazareno',
        sector_industrial: 'Finanzas / Cooperativa',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Plaza Principal Villa 1ro de Mayo',
        salario_bs: 5400,
        req_destacado: 'Evaluación crediticia en campo y comercio',
        distrito: 'DM-7',
      },
      {
        id_empleo: 'OFE-117',
        titulo_puesto: 'Cajero de Agencia Financiera',
        nombre_empresa: 'Cooperativa Jesús Nazareno',
        sector_industrial: 'Finanzas / Cooperativa',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Av. Cumavi 5to Anillo',
        salario_bs: 3800,
        req_destacado: 'Arqueo de caja y detección de billetes',
        distrito: 'DM-7',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_8,
    numero: 8,
    nombre: 'Plan 3000 / Ciudadela Andrés Ibáñez',
    subalcaldia: 'Rotonda El Mechero, Av. Paurito',
    barrios: ['El Mechero', 'Av. Principal San Martín', 'Barrio San Agustín', 'La Campana'],
    totalVacantes: 2,
    ofertas: [
      {
        id_empleo: 'OFE-118',
        titulo_puesto: 'Jefe de Agencia Financiera Plan 3000',
        nombre_empresa: 'Cooperativa Jesús Nazareno',
        sector_industrial: 'Finanzas / Cooperativa',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Rotonda El Mechero, Av. Paurito',
        salario_bs: 8500,
        req_destacado: 'Experiencia liderando agencias bancarias en ciudadelas',
        distrito: 'DM-8',
      },
      {
        id_empleo: 'OFE-119',
        titulo_puesto: 'Encargado de Sucursal Farmacéutica',
        nombre_empresa: 'Farmacorp S.A.',
        sector_industrial: 'Salud y Retail',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Av. Principal San Martín (Plan 3000)',
        salario_bs: 5100,
        req_destacado: 'Atención al cliente y control de stock',
        distrito: 'DM-8',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_9,
    numero: 9,
    nombre: 'Palmasola / Sur',
    subalcaldia: 'Av. Santos Dumont 6to Anillo Sur',
    barrios: ['Palmasola', 'Zona Refinería', 'San Antonio Sur', 'Santos Dumont Sur'],
    totalVacantes: 1,
    ofertas: [
      {
        id_empleo: 'OFE-120',
        titulo_puesto: 'Supervisor de Flota y Transporte Pesado',
        nombre_empresa: 'Sofía Ltda.',
        sector_industrial: 'Agroindustria y Alimentos',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Av. Santos Dumont 6to Anillo Sur',
        salario_bs: 6000,
        req_destacado: 'Control satelital GPS y mantenimiento diésel',
        distrito: 'DM-9',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_10,
    numero: 10,
    nombre: 'El Bajío / Doble Vía a La Guardia',
    subalcaldia: 'Doble Vía La Guardia Km 6',
    barrios: ['El Bajío', 'Km 6 Doble Vía', 'Barrio Magisterio Sur', 'Mercado Abasto Nuevo'],
    totalVacantes: 2,
    ofertas: [
      {
        id_empleo: 'OFE-121',
        titulo_puesto: 'Ingeniero de Redes y Fibra Óptica',
        nombre_empresa: 'Tigo Bolivia',
        sector_industrial: 'Telecomunicaciones y TI',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Doble Vía La Guardia Km 6 (El Bajío)',
        salario_bs: 8800,
        req_destacado: 'Certificación CCNA y despliegue GPON',
        distrito: 'DM-10',
      },
      {
        id_empleo: 'OFE-122',
        titulo_puesto: 'Ejecutivo de Ventas Corporativas B2B',
        nombre_empresa: 'Tigo Bolivia',
        sector_industrial: 'Telecomunicaciones y TI',
        modalidad: 'Híbrido',
        ubicacion_exacta: 'Av. Doble Vía La Guardia 4to Anillo',
        salario_bs: 6900,
        req_destacado: 'Cierre de cuentas corporativas en telecomunicaciones',
        distrito: 'DM-10',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_12,
    numero: 12,
    nombre: 'Los Lotes / Nuevo Palmar',
    subalcaldia: 'Av. Nuevo Palmar Sur',
    barrios: ['Los Lotes', 'Nuevo Palmar', 'El Fuerte', 'Isla del Palmar', 'Copacabana'],
    totalVacantes: 1,
    ofertas: [
      {
        id_empleo: 'OFE-123',
        titulo_puesto: 'Oficial de Crédito Agropecuario y Pyme',
        nombre_empresa: 'Cooperativa Jesús Nazareno',
        sector_industrial: 'Finanzas / Cooperativa',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Av. Nuevo Palmar (Zona Los Lotes)',
        salario_bs: 5200,
        req_destacado: 'Conocimiento de la zona sur y transporte propio',
        distrito: 'DM-12',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_13,
    numero: 13,
    nombre: 'El Palmar del Oratorio / Zona Sur',
    subalcaldia: 'Subalcaldía Distrito 13 - El Palmar',
    barrios: ['El Palmar del Oratorio', 'Cortéz', 'San Miguel del Rosario', 'Zona Sur'],
    totalVacantes: 1,
    ofertas: [
      {
        id_empleo: 'OFE-124',
        titulo_puesto: 'Encargado de Centro de Distribución Sur',
        nombre_empresa: 'Supermercados Hipermaxi',
        sector_industrial: 'Comercio y Supermercados',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Av. El Palmar del Oratorio Km 9 Sur',
        salario_bs: 6100,
        req_destacado: 'Gestión de inventarios y despacho mayorista',
        distrito: 'DM-13',
      },
    ],
  },
  {
    codigo: DistritoMunicipalSCZ.DM_16,
    numero: 16,
    nombre: 'Distrito Industrial (Parque Industrial)',
    subalcaldia: 'Parque Industrial Ramón Darío Gutiérrez',
    barrios: ['Parque Industrial', 'Manzanas Industriales PI-1 a PI-45', 'Av. Virgen de Cotoca'],
    totalVacantes: 2,
    ofertas: [
      {
        id_empleo: 'OFE-125',
        titulo_puesto: 'Jefe de Planta Procesadora de Alimentos',
        nombre_empresa: 'Sofía Ltda.',
        sector_industrial: 'Agroindustria y Alimentos',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Parque Industrial Manzana 24 (4to Anillo)',
        salario_bs: 10800,
        req_destacado: 'Ingeniería Industrial o de Alimentos, 4 años exp.',
        distrito: 'DM-16',
      },
      {
        id_empleo: 'OFE-126',
        titulo_puesto: 'Analista de Laboratorio de Control Físico-Químico',
        nombre_empresa: 'Industrias Oleaginosas (IOL)',
        sector_industrial: 'Industrial',
        modalidad: 'Presencial',
        ubicacion_exacta: 'Parque Industrial PI-31, Av. Virgen de Cotoca',
        salario_bs: 6400,
        req_destacado: 'Lic. Ingeniería Química o Industrial',
        distrito: 'DM-16',
      },
    ],
  },
];

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

function getJobIcon(sector?: string, empresa?: string) {
  const s = (sector || '').toLowerCase();
  const e = (empresa || '').toLowerCase();
  if (s.includes('banca') || s.includes('finanz') || e.includes('banco') || e.includes('cooperativa')) {
    return <IconBank />;
  }
  if (s.includes('salud') || s.includes('retail') || e.includes('farmacorp')) {
    return <IconPill />;
  }
  if (s.includes('telecom') || s.includes('ti') || e.includes('tigo')) {
    return <IconSignal />;
  }
  if (s.includes('supermercado') || e.includes('hipermaxi')) {
    return <IconRetail />;
  }
  return <IconFactory />;
}

export function OfertasPorDistritoPage() {
  const [distritos, setDistritos] = useState<IDistritoResumen[]>(FALLBACK_DISTRITOS);
  const [distritoSeleccionado, setDistritoSeleccionado] = useState<string>(
    DistritoMunicipalSCZ.DM_11,
  );
  const [busqueda, setBusqueda] = useState('');
  const [activeMenu, setActiveMenu] = useState('inicio');

  useEffect(() => {
    let cancelado = false;
    fetch(`${API_URL}/publico/distritos`)
      .then((res) => {
        if (!res.ok) throw new Error('API no disponible');
        return res.json();
      })
      .then((data: IDistritoResumen[]) => {
        if (!cancelado && Array.isArray(data) && data.length > 0) {
          setDistritos(data);
        }
      })
      .catch(() => {
        // Modo demo local con datos semilla cruceños
      });

    return () => {
      cancelado = true;
    };
  }, []);

  const totalVacantesGlobal = useMemo(
    () => distritos.reduce((acc, d) => acc + d.totalVacantes, 0),
    [distritos],
  );

  const distritoActual = useMemo(
    () =>
      distritos.find((d) => d.codigo === distritoSeleccionado) ?? distritos[0],
    [distritos, distritoSeleccionado],
  );

  const ofertasFiltradas = useMemo(() => {
    if (!distritoActual) return [];
    const term = busqueda.trim().toLowerCase();
    if (!term) return distritoActual.ofertas;
    return distritoActual.ofertas.filter(
      (o) =>
        o.titulo_puesto.toLowerCase().includes(term) ||
        o.nombre_empresa.toLowerCase().includes(term) ||
        o.ubicacion_exacta.toLowerCase().includes(term),
    );
  }, [distritoActual, busqueda]);

  return (
    <div className="scz-layout-container">
      {/* 1. TOPBAR HERO BANNER (Ocupa el 100% del ancho superior) */}
      <header className="scz-hero-banner">
        {/* Imagen panorámica hacia la derecha con difuminación verde hacia la izquierda */}
        <div className="scz-hero-img-container">
          <img
            src="/images/hero-santacruz.png"
            alt="Santa Cruz de la Sierra"
            className="scz-hero-img-right"
          />
          <div className="scz-hero-gradient-fade" />
        </div>

        <div className="scz-hero-content">
          <div className="scz-hero-left">
            <img
              src="/images/escudo-scz.png"
              alt="Escudo de Santa Cruz de la Sierra"
              className="scz-escudo-img"
            />
            <div className="scz-hero-titles">
              <div className="scz-hero-pre">
                <span>PROVINCIA ANDRÉS IBÁÑEZ</span>
                <span className="dot">•</span>
                <span>SANTA CRUZ DE LA SIERRA</span>
              </div>
              <h1 className="scz-hero-h1">
                Bolsa de Trabajo por <span className="highlight-green">Distritos Municipales</span>
              </h1>
              <p className="scz-hero-desc">
                Selecciona cualquier Distrito Municipal en el mapa cartográfico para explorar sus barrios y vacantes disponibles.
              </p>
            </div>
          </div>

          {/* Tarjeta de métricas flotante (derecha) */}
          <div className="scz-hero-stats">
            <div className="scz-stat-pill">
              <div className="stat-icon-wrap">
                <IconBriefcase />
              </div>
              <div className="stat-text">
                <span className="stat-num">{totalVacantesGlobal}</span>
                <span className="stat-label">Vacantes Activas</span>
              </div>
            </div>

            <div className="scz-stat-sep" />

            <div className="scz-stat-pill">
              <div className="stat-icon-wrap">
                <IconCathedral />
              </div>
              <div className="stat-text">
                <span className="stat-num">{distritos.length}</span>
                <span className="stat-label">Distritos GAMSC</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Cuerpo de la página debajo del Topbar */}
      <div className="scz-body-layout">
        {/* Barra Lateral Izquierda (Debajo del Topbar) */}
        <aside className="scz-sidebar">
          <nav className="scz-nav-menu">
            <button
              type="button"
              className={`scz-nav-btn ${activeMenu === 'inicio' ? 'active' : ''}`}
              onClick={() => setActiveMenu('inicio')}
            >
              <IconHome />
              <span>Inicio</span>
            </button>
            <button
              type="button"
              className={`scz-nav-btn ${activeMenu === 'mapa' ? 'active' : ''}`}
              onClick={() => setActiveMenu('mapa')}
            >
              <IconMap />
              <span>Mapa Distrital</span>
            </button>
            <button
              type="button"
              className={`scz-nav-btn ${activeMenu === 'vacantes' ? 'active' : ''}`}
              onClick={() => setActiveMenu('vacantes')}
            >
              <IconBriefcase />
              <span>Vacantes</span>
            </button>
            <button
              type="button"
              className={`scz-nav-btn ${activeMenu === 'postulaciones' ? 'active' : ''}`}
              onClick={() => setActiveMenu('postulaciones')}
            >
              <IconPostulaciones />
              <span>Mis Postulaciones</span>
            </button>
            <button
              type="button"
              className={`scz-nav-btn ${activeMenu === 'info' ? 'active' : ''}`}
              onClick={() => setActiveMenu('info')}
            >
              <IconInfo />
              <span>Información</span>
            </button>
            <button
              type="button"
              className={`scz-nav-btn ${activeMenu === 'contacto' ? 'active' : ''}`}
              onClick={() => setActiveMenu('contacto')}
            >
              <IconContact />
              <span>Contacto</span>
            </button>
          </nav>

          {/* Imagen inferior de la barra lateral (Palmeras de Santa Cruz y lema cruceño) */}
          <div className="scz-sidebar-art">
            <img
              src="/images/sidebar.png"
              alt="Santa Cruz es trabajo, productividad y gente emprendedora"
              className="scz-sidebar-img"
            />
          </div>
        </aside>

        {/* Área Principal de Contenido (a la derecha de la sidebar) */}
        <div className="scz-main-area">

        {/* Barra de Filtro Rápido por Distrito */}
        <section className="scz-chips-bar">
          <div className="scz-chips-scroller">
            {[...distritos]
              .sort((a, b) => a.numero - b.numero)
              .map((d) => {
                const isSelected = d.codigo === distritoSeleccionado;
                const label = d.numero === 16 ? 'D-IND' : `DM-${d.numero}`;
                return (
                  <button
                    key={d.codigo}
                    type="button"
                    onClick={() => setDistritoSeleccionado(d.codigo)}
                    className={`scz-dist-chip ${isSelected ? 'selected' : ''}`}
                  >
                    <span>{label}</span>
                    {isSelected && <IconPin className="chip-pin-icon" />}
                    {!isSelected && d.totalVacantes > 0 && (
                      <span className="chip-sub-count">{d.totalVacantes}</span>
                    )}
                  </button>
                );
              })}
          </div>
        </section>

        {/* Cuadrícula Principal: Mapa Cartográfico (Izq) y Panel de Ofertas (Der) */}
        <main className="scz-dashboard-grid">
          {/* Columna Izquierda: Tarjeta del Mapa con Leaflet y Polígonos GAMSC */}
          <section className="scz-map-card">
            <MapaDistritosSantaCruz
              distritos={distritos}
              distritoSeleccionado={distritoSeleccionado}
              onSelectDistrito={setDistritoSeleccionado}
            />
          </section>

          {/* Columna Derecha: Tarjeta de Distrito y Lista de Vacantes */}
          <aside className="scz-details-card">
            {distritoActual && (
              <>
                {/* Cabecera del Distrito Seleccionado con foto de fondo */}
                <div className="scz-dist-banner-header">
                  <div className="scz-dist-banner-bg" />
                  <div className="scz-dist-banner-inner">
                    <div className="scz-dist-info-col">
                      <div className="scz-dist-tag">
                        <IconPin />
                        <span>DISTRITO MUNICIPAL {distritoActual.numero} ({distritoActual.codigo})</span>
                      </div>
                      <h2 className="scz-dist-title">{distritoActual.nombre}</h2>
                      <p className="scz-dist-sub">{distritoActual.subalcaldia}</p>
                    </div>

                    <div className="scz-dist-badge-vacantes">
                      <IconBriefcase />
                      <div className="vac-count-box">
                        <span className="num">{distritoActual.totalVacantes}</span>
                        <span className="lbl">Vacantes</span>
                      </div>
                    </div>
                  </div>

                  {/* Barrios y zonas de referencia */}
                  <div className="scz-dist-barrios-row">
                    <div className="barrios-label">
                      <IconPin />
                      <span>Barrios y Zonas de Referencia:</span>
                    </div>
                    <div className="barrios-chips">
                      {distritoActual.barrios.map((b) => (
                        <span key={b} className="barrio-pill">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lista de Vacantes en el Distrito */}
                <div className="scz-jobs-wrapper">
                  <div className="scz-jobs-header-row">
                    <div className="jobs-title-flex">
                      <div className="jobs-icon-badge">
                        <IconBriefcase />
                      </div>
                      <h3 className="jobs-title">
                        Ofertas en {distritoActual.codigo} ({ofertasFiltradas.length})
                      </h3>
                    </div>

                    <div className="scz-search-box">
                      <IconSearch />
                      <input
                        type="search"
                        placeholder="Buscar cargo, empresa o zona..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="scz-search-input"
                      />
                    </div>
                  </div>

                  <div className="scz-jobs-scroll">
                    {ofertasFiltradas.length === 0 ? (
                      <div className="scz-empty-state">
                        No hay vacantes activas que coincidan con la búsqueda en este distrito.
                      </div>
                    ) : (
                      ofertasFiltradas.map((oferta) => (
                        <article key={oferta.id_empleo} className="scz-job-card">
                          <div className="job-card-top">
                            <div className="job-company-icon">
                              {getJobIcon(oferta.sector_industrial, oferta.nombre_empresa)}
                            </div>
                            <div className="job-main-info">
                              <h4 className="job-role">{oferta.titulo_puesto}</h4>
                              <p className="job-company">
                                {oferta.nombre_empresa}
                                {oferta.sector_industrial ? ` • ${oferta.sector_industrial}` : ''}
                              </p>
                            </div>
                            <div className="job-salary-wrap">
                              <span className="job-salary">
                                Bs. {Number(oferta.salario_bs).toLocaleString('es-BO')}
                              </span>
                              <IconChevronRight className="job-arrow" />
                            </div>
                          </div>

                          <div className="job-card-meta">
                            <span className="meta-loc">
                              <IconPin />
                              {oferta.ubicacion_exacta}
                            </span>
                            <span className="meta-modality">{oferta.modalidad}</span>
                          </div>

                          {oferta.req_destacado && (
                            <p className="job-card-req">
                              <strong>Requisito clave:</strong> {oferta.req_destacado}
                            </p>
                          )}
                        </article>
                      ))
                    )}
                  </div>
                </div>
              </>
            )}
          </aside>
        </main>
      </div>
    </div>
  </div>
);
}

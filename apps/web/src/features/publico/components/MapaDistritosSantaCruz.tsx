import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { IDistritoResumen } from '@bolsa/shared';
import {
  DISTRITOS_OFICIALES_SCZ,
  type IDistritoPoligonoOficial,
} from '../../../assets/geo/distritos-andres-ibanez.geojson.js';
import { IconCrosshair, IconEye } from '../../../components/icons/Icons.js';

export interface MapaDistritosSantaCruzProps {
  distritos: IDistritoResumen[];
  distritoSeleccionado: string;
  onSelectDistrito: (codigo: string) => void;
}

function getPolygonStyle(isSelected: boolean): L.PathOptions {
  return {
    color: isSelected ? '#008a3c' : '#1f63f4',
    weight: isSelected ? 3 : 1.8,
    opacity: isSelected ? 1 : 0.85,
    fillColor: isSelected ? '#22c55e' : '#1f63f4',
    fillOpacity: isSelected ? 0.22 : 0.09,
  };
}

export function MapaDistritosSantaCruz({
  distritos,
  distritoSeleccionado,
  onSelectDistrito,
}: MapaDistritosSantaCruzProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const polygonGroupRef = useRef<L.FeatureGroup | null>(null);
  const urbanBoundsRef = useRef<L.LatLngBounds | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const [mostrarEtiquetas, setMostrarEtiquetas] = useState<boolean>(true);

  // 1. Inicializar mapa base Leaflet
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-17.7865, -63.165],
      zoom: 12,
      minZoom: 10,
      maxZoom: 18,
      zoomControl: true,
      preferCanvas: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &middot; GAMSC',
    }).addTo(map);

    // Escala gráfica en la esquina inferior derecha
    L.control.scale({ imperial: false, position: 'bottomright' }).addTo(map);

    polygonGroupRef.current = L.featureGroup().addTo(map);
    markersGroupRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    // Encuadrar en la mancha urbana de Santa Cruz
    const urbanGroup = L.featureGroup();
    DISTRITOS_OFICIALES_SCZ.filter((d) => d.esUrbanoPrincipal).forEach((d) => {
      L.polygon(d.poligono).addTo(urbanGroup);
    });
    const bounds = urbanGroup.getBounds();
    if (bounds.isValid()) {
      urbanBoundsRef.current = bounds;
      map.fitBounds(bounds, { padding: [16, 16] });
    }

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Renderizar polígonos oficiales y marcadores según la maqueta
  useEffect(() => {
    const map = mapInstanceRef.current;
    const polygonGroup = polygonGroupRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !polygonGroup || !markersGroup) return;

    polygonGroup.clearLayers();
    markersGroup.clearLayers();

    const vacantesMap = new Map<string, number>();
    distritos.forEach((d) => vacantesMap.set(d.codigo, d.totalVacantes));

    DISTRITOS_OFICIALES_SCZ.forEach((distrito: IDistritoPoligonoOficial) => {
      if (!distrito.poligono || !distrito.poligono.length) return;

      const isSelected = distrito.codigo === distritoSeleccionado;
      const total = vacantesMap.get(distrito.codigo) ?? 0;
      const shortCode = distrito.numero === 16 ? 'D-IND' : `DM ${distrito.numero}`;

      const layer = L.polygon(distrito.poligono, getPolygonStyle(isSelected));

      layer.bindTooltip(
        `<div class="scz-map-tooltip">
          <strong>${distrito.nombreOficial} (${distrito.codigo})</strong><br/>
          <span>${distrito.nombreZona}</span><br/>
          <span class="scz-tooltip-vacantes">${total} ${total === 1 ? 'vacante activa' : 'vacantes activas'}</span>
        </div>`,
        { sticky: true, direction: 'top' },
      );

      layer.on({
        mouseover: (e) => {
          const target = e.target as L.Polygon;
          if (distrito.codigo !== distritoSeleccionado) {
            target.setStyle({
              color: '#008a3c',
              weight: 2.5,
              fillColor: '#22c55e',
              fillOpacity: 0.2,
            });
          }
        },
        mouseout: (e) => {
          const target = e.target as L.Polygon;
          target.setStyle(getPolygonStyle(distrito.codigo === distritoSeleccionado));
        },
        click: () => {
          onSelectDistrito(distrito.codigo);
        },
      });

      polygonGroup.addLayer(layer);

      // Etiquetas / Contadores de vacantes dentro de cada distrito
      if (mostrarEtiquetas && distrito.esUrbanoPrincipal) {
        const badgeIcon = L.divIcon({
          className: 'scz-district-marker-wrap',
          html: `
            <div class="scz-map-pill ${isSelected ? 'scz-map-pill-active' : ''}" title="${distrito.nombreOficial}: ${total} vacantes">
              <span class="scz-pill-label">${shortCode}</span>
              <span class="scz-pill-badge">${total}</span>
            </div>
          `,
          iconSize: [64, 24],
          iconAnchor: [32, 12],
        });

        const marker = L.marker([distrito.lat, distrito.lng], { icon: badgeIcon });
        marker.on('click', () => onSelectDistrito(distrito.codigo));
        markersGroup.addLayer(marker);
      }
    });
  }, [distritos, distritoSeleccionado, mostrarEtiquetas, onSelectDistrito]);

  const handleResetView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (urbanBoundsRef.current?.isValid()) {
      map.fitBounds(urbanBoundsRef.current, { padding: [16, 16], animate: true });
    } else {
      map.setView([-17.7865, -63.165], 12, { animate: true });
    }
  };

  return (
    <div className="scz-map-wrapper">
      {/* Barra superior de controles del mapa */}
      <div className="scz-map-toolbar">
        <div className="scz-map-legend">
          <span className="legend-dot legend-dot-green"></span>
          <span>Distritos Oficiales GAMSC</span>
          <span className="legend-dot legend-dot-blue"></span>
          <span>Seleccionado</span>
        </div>
        <div className="scz-map-actions">
          <button
            type="button"
            className="scz-btn-ocultar"
            onClick={() => setMostrarEtiquetas((prev) => !prev)}
          >
            <IconEye />
            <span>{mostrarEtiquetas ? 'Ocultar Contadores' : 'Mostrar Contadores'}</span>
          </button>
          <button type="button" className="scz-btn-encuadrar" onClick={handleResetView}>
            <IconCrosshair />
            <span>Encuadrar Ciudad</span>
          </button>
        </div>
      </div>

      {/* Contenedor del mapa Leaflet */}
      <div className="scz-leaflet-relative">
        <div ref={mapContainerRef} className="scz-leaflet-container" />

        {/* Leyenda flotante en la esquina inferior izquierda (estilo de la maqueta) */}
        <div className="scz-map-floating-legend">
          <div className="scz-legend-item">
            <span className="scz-box-blue-border"></span>
            <span>Límites de Distritos Municipales</span>
          </div>
          <div className="scz-legend-item">
            <span className="scz-box-blue-fill"></span>
            <span>Barrios y Zonas</span>
          </div>
        </div>

        {/* Rosa de los vientos / Norte discreto */}
        <div className="scz-north-arrow" title="Norte geográfico">
          <span>▲</span>
          <strong>N</strong>
        </div>
      </div>
    </div>
  );
}

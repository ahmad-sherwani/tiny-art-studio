import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { MapPin, Navigation } from 'lucide-react';

export const LocationPicker = ({ 
  lat = 28.6139, 
  lng = 77.2090, 
  onLocationSelect, 
  readOnly = false,
  height = '240px'
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Fix leaflet marker icon URL issue in bundler environment
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 13,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      // Custom terracotta pin icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `<div style="background-color: #8C4A38; color: white; border: 2px solid white; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); font-size: 16px;">🧵</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([lat, lng], {
        draggable: !readOnly,
        icon: customIcon
      }).addTo(map);

      markerRef.current = marker;
      mapInstanceRef.current = map;

      if (!readOnly) {
        map.on('click', (e) => {
          const { lat: newLat, lng: newLng } = e.latlng;
          marker.setLatLng([newLat, newLng]);
          if (onLocationSelect) {
            onLocationSelect({ lat: parseFloat(newLat.toFixed(6)), lng: parseFloat(newLng.toFixed(6)) });
          }
        });

        marker.on('dragend', () => {
          const position = marker.getLatLng();
          if (onLocationSelect) {
            onLocationSelect({ lat: parseFloat(position.lat.toFixed(6)), lng: parseFloat(position.lng.toFixed(6)) });
          }
        });
      }
    } else {
      mapInstanceRef.current.setView([lat, lng]);
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      }
    }

    return () => {
      // Map cleanup on unmount
    };
  }, [lat, lng, readOnly]);

  const handleCurrentLocation = () => {
    if (navigator.geolocation && mapInstanceRef.current && !readOnly) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLat = pos.coords.latitude;
          const newLng = pos.coords.longitude;
          mapInstanceRef.current.setView([newLat, newLng], 15);
          if (markerRef.current) {
            markerRef.current.setLatLng([newLat, newLng]);
          }
          if (onLocationSelect) {
            onLocationSelect({ lat: parseFloat(newLat.toFixed(6)), lng: parseFloat(newLng.toFixed(6)) });
          }
        },
        (err) => {
          console.warn('Geolocation denied or failed', err);
        }
      );
    }
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#D6C5B7] shadow-2xs group">
      <div ref={mapContainerRef} style={{ height, width: '100%' }} className="z-0" />
      
      {!readOnly && (
        <div className="absolute bottom-3 right-3 z-10">
          <button
            type="button"
            onClick={handleCurrentLocation}
            className="bg-white hover:bg-[#FAF6F0] text-[#8C4A38] p-2 rounded-full shadow-md text-xs font-bold border border-[#D6C5B7] flex items-center gap-1 transition-all"
            title="Use current GPS location"
          >
            <Navigation className="w-3.5 h-3.5 fill-current" />
            <span className="text-[11px] hidden sm:inline">Use My Location</span>
          </button>
        </div>
      )}

      <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-mono text-[#4A2E25] border border-[#E3D3C5] shadow-2xs">
        Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}
      </div>
    </div>
  );
};

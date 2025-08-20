import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Location } from '../data/locations';

interface GoogleMapProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  locations,
  selectedLocation,
  onLocationSelect,
  className = '',
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const [isApiLoaded, setIsApiLoaded] = useState(false);

  // Effect 1: Load API and initialize map
  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
      version: 'weekly',
      libraries: ['maps', 'marker'],
    });

    loader.load().then(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center: { lat: 39.8283, lng: -98.5795 },
          zoom: 4,
          mapId: 'YOUR_VECTOR_MAP_ID', // Optional: Replace with your Map ID
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
      }
      setIsApiLoaded(true);
    }).catch(err => console.error('Failed to load Google Maps', err));
  }, []);

  // Effect 2: Create/update markers when locations change
  useEffect(() => {
    if (!isApiLoaded || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => (marker.map = null));
    markersRef.current = [];

    const newMarkers = locations.map(location => {
      const pinElement = document.createElement('div');
      (pinElement as any).locationId = location.id; // Store id for style updates

      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.name,
        content: pinElement,
      });

      marker.addListener('click', () => onLocationSelect(location));
      return marker;
    });

    markersRef.current = newMarkers;

    // Fit bounds when locations change
    if (newMarkers.length > 0 && !selectedLocation) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        if (marker.position) bounds.extend(marker.position);
      });
      map.fitBounds(bounds);
      if (newMarkers.length === 1) {
        map.setZoom(15);
      }
    }
  }, [isApiLoaded, locations, onLocationSelect]);

  // Effect 3: Handle selection change (styling and pan/zoom)
  useEffect(() => {
    if (!isApiLoaded || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Update marker styles
    markersRef.current.forEach(marker => {
      const pinElement = marker.content as HTMLDivElement;
      const locationId = (pinElement as any).locationId;
      const isSelected = selectedLocation?.id === locationId;

      pinElement.innerHTML = isSelected
        ? `
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="#D4AF37" stroke="white" stroke-width="3"/>
            <circle cx="16" cy="16" r="8" fill="white"/>
          </svg>
        `
        : `
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#D4AF37" stroke="white" stroke-width="2"/>
            <circle cx="12" cy="12" r="4" fill="white"/>
          </svg>
        `;
    });

    // Pan and zoom to selected location
    if (selectedLocation) {
      const selectedPosition = { lat: selectedLocation.lat, lng: selectedLocation.lng };
      map.panTo(selectedPosition);
      const currentZoom = map.getZoom();
      if (currentZoom !== undefined && currentZoom < 15) {
        map.setZoom(15);
      }
    }
  }, [isApiLoaded, selectedLocation]);

  return <div ref={mapRef} className={`w-full h-full ${className}`} />;
};

export default GoogleMap;

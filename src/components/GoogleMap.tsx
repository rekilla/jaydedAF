import React, { useEffect, useRef, useState } from 'react';
import { Location } from '../data/locations';

interface GoogleMapProps {
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  className?: string;
}

declare global {
  interface Window {
    google: any;
    initGoogleMap: () => void;
  }
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  locations,
  selectedLocation,
  onLocationSelect,
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [scriptLoadAttempts, setScriptLoadAttempts] = useState(0);

  // Initialize Google Maps with timeout fallback
  useEffect(() => {
    const initializeMap = () => {
      if (!window.google && !document.querySelector('script[src*="maps.googleapis.com"]')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCiSytrxAJprCpNb8ifCb3FyCAk2Qh8Nc8&callback=initGoogleMap`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          console.log('Google Maps script loaded successfully');
        };

        script.onerror = () => {
          console.error('Failed to load Google Maps script');
          setMapError('Failed to load Google Maps API');
        };

        document.head.appendChild(script);

        // Set timeout for API loading
        const timeout = setTimeout(() => {
          if (!window.google) {
            console.error('Google Maps API loading timeout');
            setMapError('Google Maps API loading timeout');
          }
        }, 10000); // 10 second timeout

        window.initGoogleMap = () => {
          clearTimeout(timeout);
          console.log('Google Maps initialized successfully');
          setIsMapLoaded(true);
          setMapError(null);
        };
      } else if (window.google) {
        setIsMapLoaded(true);
      }
    };

    // Small delay to ensure component is mounted
    const timer = setTimeout(initializeMap, 100);
    return () => clearTimeout(timer);
  }, [scriptLoadAttempts]);

  // Initialize map when Google Maps API is loaded
  useEffect(() => {
    if (isMapLoaded && mapRef.current && !map) {
      const mapOptions = {
        center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
        zoom: 4,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      };

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
      setMap(newMap);
    }
  }, [isMapLoaded, map]);

  // Create markers for locations
  useEffect(() => {
    if (map && locations.length > 0) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));

      const newMarkers = locations.map(location => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          icon: {
            url: selectedLocation?.id === location.id
              ? 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="14" fill="#D4AF37" stroke="white" stroke-width="3"/>
                  <circle cx="16" cy="16" r="8" fill="white"/>
                </svg>
              `)
              : 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#D4AF37" stroke="white" stroke-width="2"/>
                  <circle cx="12" cy="12" r="4" fill="white"/>
                </svg>
              `),
            scaledSize: new window.google.maps.Size(
              selectedLocation?.id === location.id ? 32 : 24,
              selectedLocation?.id === location.id ? 32 : 24
            )
          }
        });

        // Add click listener to marker
        marker.addListener('click', () => {
          onLocationSelect(location);
        });

        return marker;
      });

      setMarkers(newMarkers);

      // Fit bounds to show all markers
      if (newMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        newMarkers.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
        map.fitBounds(bounds);

        // Don't zoom in too much for single locations
        if (newMarkers.length === 1) {
          map.setZoom(15);
        }
      }
    }
  }, [map, locations, selectedLocation, onLocationSelect]);

  // Pan to selected location
  useEffect(() => {
    if (map && selectedLocation) {
      const selectedPosition = { lat: selectedLocation.lat, lng: selectedLocation.lng };
      map.panTo(selectedPosition);

      // Smooth zoom to show the location well
      const currentZoom = map.getZoom();
      if (currentZoom < 15) {
        map.setZoom(15);
      }
    }
  }, [map, selectedLocation]);

  // Show fallback iframe if there's an error or timeout
  if (mapError) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        {/* Fallback to original iframe */}
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1mlNOUQtYyofIzmenE6y0QOrjpfyVG_U"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Store Locations Map"
        />
        {/* Error overlay with retry button */}
        <div className="absolute top-2 right-2 bg-red-100 border border-red-400 text-red-700 px-2 py-1 rounded text-xs">
          <div className="flex items-center gap-2">
            <span>Interactive features unavailable</span>
            <button
              onClick={() => {
                setMapError(null);
                setIsMapLoaded(false);
                setScriptLoadAttempts(prev => prev + 1);
              }}
              className="text-blue-600 hover:text-blue-800 underline text-xs"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!isMapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="text-gray-500 mb-2">Loading interactive map...</div>
            <div className="text-xs text-gray-400">This may take a moment</div>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default GoogleMap;

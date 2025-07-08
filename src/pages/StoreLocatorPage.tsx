import React, { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '../lib/utils';
import { locations, Location } from '../data/locations';

// Store card component - minimal and elegant
const StoreCard: React.FC<{
  store: Location;
  isSelected: boolean;
  distance?: number;
  onClick: () => void;
}> = ({ store, isSelected, distance, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      if (store.hours) {
        const [openHour, openMin] = store.hours.open.split(':').map(Number);
        const [closeHour, closeMin] = store.hours.close.split(':').map(Number);
        const openTime = openHour * 60 + openMin;
        let closeTime = closeHour * 60 + closeMin;
        
        // Handle closing times after midnight
        if (closeTime < openTime) closeTime += 24 * 60;
        
        setIsOpen(currentTime >= openTime && currentTime <= closeTime);
      }
    };

    checkIfOpen();
    const interval = setInterval(checkIfOpen, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [store.hours]);

  return (
    <div
      className={cn(
        "p-5 border border-brand-gold/10 rounded-lg cursor-pointer transition-all duration-300",
        "hover:border-brand-gold/30 hover:shadow-lg hover:shadow-brand-gold/5 hover:-translate-y-0.5",
        isSelected && "border-brand-gold/50 shadow-lg shadow-brand-gold/10"
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-heading text-lg text-brand-gold mb-1">{store.name}</h3>
          <p className="text-sm text-brand-text/70">{store.address}</p>
          {distance !== undefined && (
            <p className="text-xs text-brand-text/50 mt-1">{distance.toFixed(1)} miles away</p>
          )}
        </div>
        <div className="flex items-center gap-1 ml-4">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isOpen ? "bg-green-500" : "bg-red-500/70"
          )} />
          <span className="text-xs text-brand-text/50">
            {isOpen ? "Open" : "Closed"}
          </span>
        </div>
      </div>
    </div>
  );
};

// Google Maps implementation
const GoogleMap: React.FC<{
  locations: Location[];
  selectedStore: Location | null;
  onSelectStore: (store: Location) => void;
}> = ({ locations: storeLocations, selectedStore, onSelectStore }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMap = useRef<google.maps.Map | null>(null);
  const markers = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    // Load Google Maps script
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      // Define callback
      (window as any).initMap = () => {
        if (!mapRef.current) return;

        // Initialize map with dark theme
        googleMap.current = new google.maps.Map(mapRef.current, {
          center: { lat: 44.9778, lng: -93.2650 },
          zoom: 10,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#212121" }] },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
            {
              featureType: "administrative",
              elementType: "geometry",
              stylers: [{ color: "#757575" }]
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [{ color: "#2c2c2c" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#000000" }]
            }
          ]
        });

        // Add markers
        storeLocations.forEach(location => {
          const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: googleMap.current!,
            title: location.name,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#bfb23a',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }
          });

          marker.addListener('click', () => {
            onSelectStore(location);
          });

          markers.current.push(marker);
        });
      };
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      markers.current.forEach(marker => marker.setMap(null));
      markers.current = [];
    };
  }, [storeLocations, onSelectStore]);

  // Pan to selected store
  useEffect(() => {
    if (googleMap.current && selectedStore) {
      googleMap.current.panTo({ lat: selectedStore.lat, lng: selectedStore.lng });
      googleMap.current.setZoom(14);
    }
  }, [selectedStore]);

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};

// Main store locator component
const StoreLocatorPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [filteredLocations, setFilteredLocations] = useState(locations);

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 3959; // Radius of Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  // Filter locations based on search
  useEffect(() => {
    const filtered = locations.filter(location =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort by distance if user location is available
    if (userLocation) {
      filtered.sort((a, b) => {
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distA - distB;
      });
    }

    setFilteredLocations(filtered);
  }, [searchTerm, userLocation]);

  return (
    <main className="w-full min-h-screen bg-black text-brand-text pt-20">
      {/* Hero Section - Minimal */}
      <section className="text-center py-12 px-4">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-brand-gold mb-3">
          Find Jayded AF Near You
        </h1>
        <p className="text-lg text-brand-text/70 max-w-md mx-auto">
          Available at select premium retailers
        </p>
      </section>

      {/* Search Section - Clean */}
      <section className="container mx-auto px-4 max-w-xl mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter city or ZIP"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-brand-dark/50 border border-brand-text/20 rounded-lg 
                     text-brand-text placeholder:text-brand-text/40 
                     focus:border-brand-gold/50 focus:outline-none focus:ring-1 focus:ring-brand-gold/30
                     transition-all duration-300"
          />
          <button
            onClick={getUserLocation}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-brand-gold/70 
                     hover:text-brand-gold transition-colors duration-200 flex items-center gap-1"
          >
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Use my location</span>
          </button>
        </div>
      </section>

      {/* Map and Results */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Interactive Map */}
          <div className="lg:col-span-2 h-[50vh] lg:h-[600px] bg-brand-dark/30 border border-brand-gold/10 rounded-lg overflow-hidden">
            <GoogleMap
              locations={filteredLocations}
              selectedStore={selectedStore}
              onSelectStore={setSelectedStore}
            />
          </div>

          {/* Store List - Elegant scroll */}
          <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2 
                          scrollbar-thin scrollbar-track-brand-dark/20 scrollbar-thumb-brand-gold/20">
            {filteredLocations.length > 0 ? (
              filteredLocations.map(store => (
                <StoreCard
                  key={store.id}
                  store={store}
                  isSelected={selectedStore?.id === store.id}
                  distance={userLocation ? calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    store.lat,
                    store.lng
                  ) : undefined}
                  onClick={() => {
                    setSelectedStore(store);
                  }}
                />
              ))
            ) : (
              <p className="text-brand-text/50 text-center py-8">
                No locations found matching your search.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Selected Store Details - Simple tooltip style */}
      {selectedStore && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-brand-dark/95 backdrop-blur-sm 
                        border border-brand-gold/20 rounded-lg p-4 shadow-xl max-w-sm mx-4 z-30">
          <h3 className="font-heading text-brand-gold mb-2">{selectedStore.name}</h3>
          <p className="text-sm text-brand-text/70 mb-3">{selectedStore.address}</p>
          <div className="flex gap-3">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(selectedStore.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 px-4 bg-brand-gold/10 hover:bg-brand-gold/20 
                         text-brand-gold text-sm rounded transition-colors duration-200"
            >
              Get Directions
            </a>
            {selectedStore.phone && (
              <a
                href={`tel:${selectedStore.phone}`}
                className="flex-1 text-center py-2 px-4 bg-brand-gold/10 hover:bg-brand-gold/20 
                           text-brand-gold text-sm rounded transition-colors duration-200"
              >
                Call Store
              </a>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default StoreLocatorPage;

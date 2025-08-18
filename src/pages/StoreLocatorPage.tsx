import React, { useState, useEffect } from 'react';
import { Seo } from '../seo/Seo';
import { MapPin } from 'lucide-react';
import { locations } from '../data/locations';
import { StoreListItem } from '../components/StoreListItem';


// Main store locator component
const StoreLocatorPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
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
    <>
      <Seo
        title="Jayded AF - Store Locator"
        description="Find Jayded AF near you. Use our store locator to find a store near you."
        path="/store-locator"
      />
      <main className="w-full min-h-screen bg-white text-black pt-32">
        {/* Hero Section - Minimal */}

      {/* Search Section - Clean */}
      <section className="container mx-auto px-6 max-w-xl mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter city, state, or ZIP code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-white border border-black/20 rounded-lg
                     text-black placeholder:text-black/40
                     focus:border-black focus:outline-none focus:ring-2 focus:ring-black
                     transition-all duration-300 text-lg"
          />
          <button
            onClick={getUserLocation}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white
                       px-4 py-2 rounded-md flex items-center gap-2
                       hover:bg-gray-800 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Use My Location</span>
          </button>
        </div>
      </section>

      {/* Map and Results */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-[120px] pb-11">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Interactive Map */}
          <div className="lg:col-span-1 h-[60vh] lg:h-[700px] bg-gray-100 rounded-lg overflow-hidden shadow-inner">
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1mlNOUQtYyofIzmenE6y0QOrjpfyVG_U"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Store List */}
          <div className="lg:col-span-1 max-h-[700px] overflow-y-auto rounded-lg">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((store) => (
                <StoreListItem
                  key={store.id}
                  store={store}
                  isSelected={false}
                  distance={userLocation ? calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    store.lat,
                    store.lng
                  ) : undefined}
                  onClick={() => {}}
                />
              ))
            ) : (
              <div className="text-center p-10">
                <p className="text-black/60">No locations found.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      </main>
    </>
  );
};

export default StoreLocatorPage;

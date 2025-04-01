import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { InView } from '../components/ui/in-view';
import { cn } from '../lib/utils';
import { MapPin, Search, SlidersHorizontal, X } from 'lucide-react';

// --- Actual Retailer Data ---
const retailers = [
  { id: 'twmg', name: "Total Wine Maple Grove", address: "Maple Grove, MN", tags: ["Retailer"] },
  { id: 'twm', name: "Total Wine Minnetonka", address: "Minnetonka, MN", tags: ["Retailer"] },
  { id: 'twr', name: "Total Wine Rochester", address: "Rochester, MN", tags: ["Retailer"] },
  { id: 'hp', name: "Haskell's Plymouth", address: "Plymouth, MN", tags: ["Retailer"] },
  { id: 'hmg', name: "Haskell's Maple Grove", address: "Maple Grove, MN", tags: ["Retailer"] },
  { id: 'ku', name: "Kowalski's Uptown", address: "Uptown, Minneapolis, MN", tags: ["Retailer"] },
  { id: 'ks', name: "Kowalski's Shorewood", address: "Shorewood, MN", tags: ["Retailer"] },
  { id: 'kw', name: "Kowalski's Woodbury", address: "Woodbury, MN", tags: ["Retailer"] },
  { id: 'koph', name: "Kowalski's Oak Park Heights", address: "Oak Park Heights, MN", tags: ["Retailer"] },
  { id: 'nlws', name: "North Loop Wine & Spirits", address: "North Loop, Minneapolis, MN", tags: ["Retailer"] },
  { id: 'sl', name: "Shorewood Liquors", address: "Shorewood, MN", tags: ["Retailer"] },
  { id: 'zl', name: "Zipps Liquor", address: "[City, MN - Needs Clarification]", tags: ["Retailer"] }, // Assuming Zipps is MN based on context
  { id: 'cal', name: "Central Ave Liquors", address: "[City, MN - Needs Clarification]", tags: ["Retailer"] },
  { id: 'sll', name: "South Lyndale Liquors", address: "South Minneapolis, MN", tags: ["Retailer"] },
  { id: 'mbs', name: "Mick's Bottle Shop", address: "[City, MN - Needs Clarification]", tags: ["Retailer"] },
  { id: 'is', name: "Itasca Spirits", address: "[City, MN - Needs Clarification]", tags: ["Retailer"] },
  { id: 'pl', name: "Princeton's Liquor", address: "[City, MN - Needs Clarification]", tags: ["Retailer"] },
];

const partners = [
    { id: 'whm', name: "W Hotel Minneapolis", address: "Minneapolis, MN", tags: ["On Premise"] },
    { id: 'ah', name: "Aloft Hotel", address: "Minneapolis, MN", tags: ["On Premise"] },
    { id: 'gch', name: "Grand Casino Hinkley", address: "Hinckley, MN", tags: ["On Premise"] },
    { id: 'hm', name: "Hyatt Minneapolis", address: "Minneapolis, MN", tags: ["On Premise"] },
];

// --- Retailer Card Component ---
// Added optional phone/hours, simplified tags display
const RetailerCard: React.FC<{ name: string; address: string; tags?: string[]; onClick: () => void }> = ({ name, address, tags, onClick }) => (
  <div
    className="p-4 sm:p-5 border border-brand-gold/10 rounded-lg bg-brand-dark/30 hover:bg-brand-dark/50 transition-colors cursor-pointer shadow-sm hover:shadow-md"
    onClick={onClick}
  >
    <h3 className="font-semibold text-lg text-brand-gold mb-1">{name}</h3>
    <p className="text-sm text-brand-text/80 mb-2">{address}</p>
    {/* Optional: Display tags if needed */}
    {/* {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
        {tags.map(tag => (
            <span key={tag} className="text-xs bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded-full">{tag}</span>
        ))}
        </div>
    )} */}
  </div>
);

// --- Store Detail Modal/Panel Placeholder ---
// Simplified modal for now
const StoreDetailModal: React.FC<{ store: (typeof retailers[0] & { phone?: string, hours?: string, image?: string }) | null; onClose: () => void }> = ({ store, onClose }) => {
  if (!store) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-brand-dark border border-brand-gold/20 rounded-lg shadow-xl p-6 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-brand-text/70 hover:text-brand-gold" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-heading text-brand-gold mb-4">{store.name}</h2>
        <p className="text-brand-text/80 mb-1"><strong>Address:</strong> {store.address}</p>
        {/* Conditionally render phone/hours if available */}
        {store.hours && <p className="text-brand-text/80 mb-1"><strong>Hours:</strong> {store.hours}</p>}
        {store.phone && <p className="text-brand-text/80 mb-4"><strong>Phone:</strong> {store.phone}</p>}
        <Button
            variant="outline"
            className="w-full mt-4 border-brand-gold text-brand-gold hover:bg-brand-gold/10 hover:text-brand-gold"
            onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(store.address + ', MN')}`, '_blank')} // Basic directions link
        >
            Get Directions
        </Button>
      </div>
    </div>
  );
};


// --- Main Page Component ---
const StoreLocatorPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState<typeof retailers[0] | null>(null);
  // TODO: Implement filtering logic based on search term

  const filteredRetailers = retailers.filter(r =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
   const filteredPartners = partners.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Search is handled by filtering the list based on searchTerm state
    console.log("Filtering for:", searchTerm);
  };

  return (
    <main className="w-full pt-20 bg-black text-brand-text"> {/* Use black background */}
      <InView as="section" className="py-16 text-center container mx-auto px-4">
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold mb-4">Find Jayded AF</h1>
        <p className="text-lg text-brand-text/80 max-w-xl mx-auto">
          Available at various locations in Minnesota. Subscribe below to find out when we arrive near you.
        </p>
        {/* TODO: Add Subscribe section/form if needed */}
      </InView>

      {/* Search Bar */}
      <InView as="section" className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 max-w-2xl"> {/* Constrain search width */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="text"
            placeholder="Search by Name or City..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-3 bg-brand-dark/50 border-brand-text/20 focus:border-brand-gold focus:ring-brand-gold placeholder:text-brand-text/50 rounded-md text-base"
          />
          <Button type="submit" className="bg-brand-gold text-brand-dark hover:bg-brand-gold/90 px-6 rounded-md">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </form>
         {/* Removed Filter Buttons for now */}
      </InView>

      {/* Map and Results Grid */}
      <InView as="section" className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Map Placeholder */}
        <div className="lg:col-span-2 h-[50vh] lg:h-[65vh] bg-brand-dark/50 border border-brand-gold/10 rounded-lg flex items-center justify-center text-brand-text/40 shadow-lg">
          [ Dark Themed Interactive Map Placeholder ]
        </div>

        {/* Results List */}
        <div className="lg:col-span-1 max-h-[65vh] overflow-y-auto space-y-4 pr-2 -mr-2">
            <h2 className="text-2xl font-semibold text-brand-gold mb-3 sticky top-0 bg-black py-2">Currently Sold At:</h2>
            {filteredRetailers.length > 0 ? (
                filteredRetailers.map(store => (
                    <RetailerCard key={store.id} {...store} onClick={() => setSelectedStore(store)} />
                ))
            ) : (
                 <p className="text-brand-text/60 italic mt-4">No matching retailers found.</p>
            )}

            <h2 className="text-2xl font-semibold text-brand-gold mb-3 mt-8 sticky top-0 bg-black py-2">On Premise Partners:</h2>
             {filteredPartners.length > 0 ? (
                filteredPartners.map(partner => (
                    // Using RetailerCard structure for partners too
                    <RetailerCard key={partner.id} {...partner} onClick={() => setSelectedStore(partner)} />
                ))
             ) : (
                 <p className="text-brand-text/60 italic mt-4">No matching partners found.</p>
             )}
        </div>
      </InView>

      {/* Store Detail Modal */}
      <StoreDetailModal store={selectedStore} onClose={() => setSelectedStore(null)} />

    </main>
  );
};

export default StoreLocatorPage;

export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  hours?: {
    open: string;
    close: string;
  };
  type?: string;
  featured?: boolean;
}

export const locations: Location[] = [
  // Retailers
  { id: 'twmg', name: "Total Wine Maple Grove", address: "12555 Elm Creek Blvd N, Maple Grove, MN 55369", lat: 45.0934, lng: -93.4560, phone: "(763) 493-2620", hours: { open: "09:00", close: "22:00" }, featured: true },
  { id: 'twm', name: "Total Wine Minnetonka", address: "11220 Wayzata Blvd, Minnetonka, MN 55305", lat: 44.9743, lng: -93.4157, phone: "(952) 285-5800", hours: { open: "09:00", close: "22:00" } },
  { id: 'twr', name: "Total Wine Rochester", address: "1200 16th St SW, Rochester, MN 55902", lat: 44.0121, lng: -92.4802, phone: "(507) 292-9463", hours: { open: "09:00", close: "21:00" } },
  { id: 'hp', name: "Haskell's Plymouth", address: "3025 Harbor Ln N, Plymouth, MN 55447", lat: 45.0227, lng: -93.4534, phone: "(763) 473-2572", hours: { open: "10:00", close: "21:00" } },
  { id: 'hmg', name: "Haskell's Maple Grove", address: "7860 Main St N, Maple Grove, MN 55369", lat: 45.0895, lng: -93.4412, phone: "(763) 416-0600", hours: { open: "10:00", close: "21:00" } },
  { id: 'nlws', name: "North Loop Wine & Spirits", address: "229 Washington Ave N, Minneapolis, MN 55401", lat: 44.9848, lng: -93.2702, phone: "(612) 455-2800", hours: { open: "10:00", close: "22:00" } },
  { id: 'sl', name: "Shorewood Liquors", address: "24315 Smithtown Rd, Shorewood, MN 55331", lat: 44.9012, lng: -93.5785, phone: "(952) 474-8448", hours: { open: "10:00", close: "21:00" } },
  { id: 'sll', name: "South Lyndale Liquors", address: "5201 Lyndale Ave S, Minneapolis, MN 55419", lat: 44.9097, lng: -93.2889, phone: "(612) 824-4494", hours: { open: "10:00", close: "22:00" } },
  // On Premise
  { id: 'whm', name: "W Hotel Minneapolis", address: "401 Hennepin Ave S, Minneapolis, MN 55401", lat: 44.9796, lng: -93.2715, type: "lounge", hours: { open: "16:00", close: "02:00" } },
  { id: 'ah', name: "Aloft Hotel", address: "900 Washington Ave S, Minneapolis, MN 55415", lat: 44.9749, lng: -93.2561, type: "lounge", hours: { open: "17:00", close: "01:00" } },
];

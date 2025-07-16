export interface Product {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  bottleImage: string;
  lifestyleImage: string;
  colorHex: string;
  colorClass: string;
  bottleNexusId?: number;
  inStock?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "LEMON DROP",
    subtitle: "COCKTAIL",
    description: "A vibrant twist on a classic. Sharp lemon zest meets smooth gin.",
    price: "$24.99",
    bottleImage: "/Leamon_Bottle_Render.png",
    lifestyleImage: "/LE.jpg",
    colorHex: "#FFD700",
    colorClass: "from-yellow-600/20 to-yellow-400/5",
    bottleNexusId: 47035,
    inStock: true
  },
  {
    id: 2,
    name: "LAVENDER",
    subtitle: "COCKTAIL", 
    description: "Smooth gin infused with lavender botanicals for a calming experience.",
    price: "$24.99",
    bottleImage: "/Lavender_Bottle_Render.png",
    lifestyleImage: "/LV.jpg",
    colorHex: "#8A2BE2",
    colorClass: "from-purple-600/20 to-purple-400/5",
    bottleNexusId: 47036,
    inStock: true
  },
  {
    id: 3,
    name: "LAXLY CUCUMBER",
    subtitle: "COCKTAIL",
    description: "Cool, crisp cucumber blended with premium gin for ultimate refreshment.",
    price: "$24.99",
    bottleImage: "/cucumber_Bottle_Render.png",
    lifestyleImage: "/CU.jpg",
    colorHex: "#2FAF7D",
    colorClass: "from-emerald-600/20 to-emerald-400/5",
    bottleNexusId: 47037,
    inStock: true
  }
];

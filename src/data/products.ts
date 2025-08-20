export interface Product {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  path: string;
  price: string;
  bottleImage: string;
  lifestyleImage: string;
  colorHex: string;
  colorClass: string;
  inStock?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "LEMON DROP",
    subtitle: "COCKTAIL",
    description: "Classic, Sophisticated and Sinfully Edgy.",
    price: "$24.99",
    path: "/cocktails/lemon-drop",
    bottleImage: "/Leamon_Bottle_Render.png",
    lifestyleImage: "/LE.jpg",
    colorHex: "#FFD700",
    colorClass: "from-yellow-400/20 to-yellow-600/5",
    inStock: true
  },
  {
    id: 2,
    name: "LAVENDER",
    subtitle: "COCKTAIL",
    description: "Sexy, Subtle and Incredibly Chic.",
    price: "$24.99",
    path: "/cocktails/lavender",
    bottleImage: "/Lavender_Bottle_Render.png",
    lifestyleImage: "/LV.jpg",
    colorHex: "#C7B8FF",
    colorClass: "from-gray-400/20 to-gray-600/5",
    inStock: true
  },
  {
    id: 3,
    name: "LAXLY CUCUMBER",
    subtitle: "COCKTAIL",
    description: "Centered, Poised and Effortlessly Cool.",
    price: "$24.99",
    path: "/cocktails/cucumber",
    bottleImage: "/cucumber_Bottle_Render.png",
    lifestyleImage: "/CU.jpg",
    colorHex: "#8BC34A",
    colorClass: "from-green-400/20 to-green-600/5",
    inStock: true
  }
];

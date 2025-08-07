import FlavorPageLayout from '../../layouts/FlavorPageLayout';
import { MediaItemType } from '../../components/ui/cocktail-bento-gallery';

const flavorData = {
  key: "lemon",
  name: "Lemon Drop",
  heroImage: "/Lemon Title.svg",
  tagline: "",
  colorClass: "text-brand-gold",
  colorHex: "#FFFFFF",
};

const perfectServeData = {
  title: "Your Perfect Serve",
  serveStyles: [
    { id: 1, title: "Neat", description: "16°C Shot Glass - Pure citrus courage" },
    { id: 2, title: "On the Rocks", description: "4°C Rocks Glass - Chilled perfection for the unbridled" },
    { id: 3, title: "Lemon Drop Martini", description: "2°C Martini Glass - The ultimate sophisticated statement" }
  ]
};

const curatedMomentsMedia: MediaItemType[] = [
    { id: 'ld1', type: 'image', title: '', desc: '', url: "/images/Lemon/Whisk_5dc1750ce6.jpg" },
    { id: 'ld2', type: 'image', title: '', desc: '', url: "/images/Lemon/Whisk_7e4e74c949.jpg" },
    { id: 'ld3', type: 'image', title: '', desc: '', url: "/images/Lemon/Whisk_051e47542d.jpg" },
    { id: 'ld4', type: 'image', title: '', desc: '', url: "/images/Lemon/Whisk_094a3f8728.jpg" },
    { id: 'ld5', type: 'image', title: '', desc: '', url: "/images/Lemon/Whisk_4089bd3aea.jpg" },
    { id: 'ld6', type: 'image', title: '', desc: '', url: "/images/Lemon/Whisk_a7df7f7215.jpg" },
    { id: 'ld7', type: 'image', title: '', desc: '', url: "/images/Lemon/Whisk_f9c9b961e1.jpg" },
    { id: 'ld8', type: 'image', title: '', desc: '', url: "/images/Lemon/Whisk_ae72e68558.jpg" }
];

const lemonPageData = {
  flavorData,
  perfectServeData,
  curatedMomentsMedia,
  interimTitle: "The Genesis",
  interimDescription: (
    <>
      Classic, Sophisticated and Sinfully Edgy. The Lemon Drop Martini Cocktail is simply the prototype of the art of a cocktail.
      <br /><br />
      Start your story with a flavor that commands attention. Tart Meyer Lemons, bold Juniper, and a kiss of Triple Sec—this is citrus swagger in a glass. You are the sun, so radiate.
      <br /><br />
      <span className="italic">Confidence distilled.</span>
    </>
  ),
  lifestyleMoment: {
    image: "/images/Lemon/Whisk_d9cd8f895e.jpg",
    title: "Your Power Hour Moment",
    subtitle: "Where audacity meets sophistication",
  },
  unlockCta: {
    title: "Bright & Playful",
    productId: 47035,
  },
  curatedMoments: {
    title: "Curated Moments",
    wideImage: "/images/Lemon/Whisk_4e25346a05.jpg",
  },
  specifications: {
    title: "The Details",
    details: [
      { delay: 0.1, value: '12%', label: 'ABV', icon: '/martini-glass-with-straw-svgrepo-com.svg' },
      { delay: 0.2, value: '90', label: 'Calories', icon: '/calories-svgrepo-com.svg' },
      { delay: 0.3, value: '100%', label: 'ALL NATURAL', icon: '/leaf-svgrepo-com.svg' }
    ],
  },
  closingCta: {
    title: "Own Your Moment",
    image: "/images/Lemon/Whisk_3aac0a8433.jpg",
    productId: 47035,
  },
};

const LemonDropPage = () => {
  return <FlavorPageLayout {...lemonPageData} />;
};

export default LemonDropPage;

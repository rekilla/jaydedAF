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
  title: "The Perfect Serve",
  serveStyles: [
    { id: 1, title: "Chilled: 18°C", description: "" },
    { id: 2, title: "Shaken: 2°C", description: "" },
    { id: 3, title: "On The Rocks: 4°C", description: "" }
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
      Classic, Sophisticated and Sinfully Edgy. The Lemon Drop Martini is simply the prototype of the art of a cocktail. It commands attention. Well deserved. Embodying a flavor profile consisting of Meyer Lemons, Juniper Berries and Triple Sec.
    </>
  ),
  lifestyleMoment: {
    image: "/images/Lemon/Whisk_d9cd8f895e.jpg",
    title: "Power",
    subtitle: "Audacity meets sophistication.",
  },
  curatedMoments: {
    title: "A Curation",
    wideImage: "/images/Lemon/Whisk_4e25346a05.jpg",
  },
  specifications: {
    title: "The Details",
    details: [
      { delay: 0.1, value: '12.5%', label: 'ABV', icon: '/martini-glass-with-straw-svgrepo-com.svg' },
      { delay: 0.2, value: '150', label: 'Calories', icon: '/calories-svgrepo-com.svg' },
      { delay: 0.3, value: '100%', label: 'All Natural Flavors & Gluten Free', icon: '/leaf-svgrepo-com.svg' }
    ],
  },
  closingCta: {
    title: "",
    image: "/images/Lemon/Whisk_3aac0a8433.jpg",
    productId: 47035,
  },
};

const LemonDropPage = () => {
  return <FlavorPageLayout {...lemonPageData} />;
};

export default LemonDropPage;

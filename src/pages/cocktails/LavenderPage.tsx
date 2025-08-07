import FlavorPageLayout from '../../layouts/FlavorPageLayout';
import { MediaItemType } from '../../components/ui/cocktail-bento-gallery';

const flavorData = {
  key: "lavender",
  name: "Lavender",
  heroImage: "/Lavender Title.svg",
  tagline: "",
  colorClass: "text-brand-lavender",
  colorHex: "#FFFFFF",
};

const perfectServeData = {
  title: "Your Perfect Serve",
  serveStyles: [
    { id: 1, title: "Chilled", description: "18°C Coupe - Chill perfection for the multifaceted." },
    { id: 2, title: "Shaken", description: "2°C martini - A floral rebellion" },
    { id: 3, title: "On The Rocks", description: "4°C Rocks Glass - A lavender haze" }
  ]
};

const curatedMomentsMedia: MediaItemType[] = [
  { id: 'lv1', type: 'image', title: '', desc: '', url: "/images/lavender/Whisk_06d12f3f2e.jpg" },
  { id: 'lv2', type: 'image', title: '', desc: '', url: "/images/lavender/Whisk_069d4c71ba.jpg" },
  { id: 'lv3', type: 'image', title: '', desc: '', url: "/images/lavender/Whisk_6394e9d2b6.jpg" },
  { id: 'lv4', type: 'image', title: '', desc: '', url: "/images/lavender/Whisk_84528a668d.jpg" },
  { id: 'lv5', type: 'image', title: '', desc: '', url: "/images/lavender/Whisk_923316f1e8.jpg" },
  { id: 'lv6', type: 'image', title: '', desc: '', url: "/images/lavender/Whisk_ac02859538.jpg" },
  { id: 'lv7', type: 'image', title: '', desc: '', url: "/images/lavender/Whisk_ba998da4da.jpg" },
  { id: 'lv8', type: 'image', title: '', desc: '', url: "/images/lavender/Whisk_cc6a11bb08.jpg" }
];

const lavenderPageData = {
  flavorData,
  perfectServeData,
  curatedMomentsMedia,
  interimTitle: "The Interim",
  interimDescription: (
    <>
      Sexy, Subtle and Incredibly Chic. Your interlude in elegance. The Lavender Martini Cocktail excites the senses with the hypnotic allure of the vibrant bloom, ending naturally on the sweet note of Mandarin Orange.
      <br /><br />
      Hand-curated for those who understand that true power whispers, never shouts. You are layered, authentic, and unapologetically bold.
    </>
  ),
  lifestyleMoment: {
    image: "/images/lavender/Whisk_c146dc0301.jpg",
    title: "Enigma.",
    subtitle: "where subtle mystery meets chic.",
  },
  unlockCta: {
    title: "Unlock the Calm",
    productId: 47036,
  },
  curatedMoments: {
    title: "Curated Moments",
    wideImage: "/images/lavender/Whisk_18e89e678e.jpg",
  },
  specifications: {
    title: "The Details",
    details: [
      { delay: 0.1, value: '12%', label: 'ABV', icon: '/martini-glass-with-straw-svgrepo-com.svg' },
      { delay: 0.2, value: '140', label: 'Calories', icon: '/calories-svgrepo-com.svg' },
      { delay: 0.3, value: '100%', label: 'ALL NATURAL', icon: '/leaf-svgrepo-com.svg' }
    ],
  },
  closingCta: {
    title: "Embrace Your Mystique",
    image: "/images/lavender/Whisk_feecfdbb1c.jpg",
    productId: 47035,
  },
};

const LavenderPage = () => {
  return <FlavorPageLayout {...lavenderPageData} />;
};

export default LavenderPage;

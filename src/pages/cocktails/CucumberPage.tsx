import FlavorPageLayout from '../../layouts/FlavorPageLayout';
import { MediaItemType } from '../../components/ui/cocktail-bento-gallery';

const flavorData = {
  key: "cucumber",
  name: "Cucumber",
  heroImage: "/Cucumber Title.svg",
  tagline: "",
  colorClass: "text-green-500",
  colorHex: "#84cc16",
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
    { id: 'cu1', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_3d7bb4c753.jpg" },
    { id: 'cu2', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_43c68645c0.jpg" },
    { id: 'cu3', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_94f02a652d.jpg" },
    { id: 'cu4', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_407c1299b7.jpg" },
    { id: 'cu5', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_717dcefee8.jpg" },
    { id: 'cu6', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_735ceadfeb.jpg" },
    { id: 'cu7', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_aceae8968e.jpg" },
    { id: 'cu8', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_bcbd4f271b.jpg" }
];

const cucumberPageData = {
  flavorData,
  perfectServeData,
  curatedMomentsMedia,
  interimTitle: "The Final Chapter",
  interimDescription: (
    <>
      Centered, Poised and Effortlessly Cool. The Laxly Cucumber Martini Cocktail embodies the very essence of the Jayded AF brand.
      <br /><br />
      Artisan-designed with essences of Elderflower, Pear and a hint of Lime. For the woman who has arrived, who knows her worth, and radiates authenticity without trying. This is liquid zen with an edge.
    </>
  ),
  lifestyleMoment: {
    image: "/images/cucumber/Whisk_9070bc219a.jpg",
    title: "Zenith.",
    subtitle: "Where serenity meets strength",
  },
  unlockCta: {
    title: "Spa-Fresh / Sophisticated",
    productId: 47037,
  },
  curatedMoments: {
    title: "Curated Moments",
    wideImage: "/images/cucumber/Whisk_73e915b469.jpg",
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
    title: "Complete Your Journey",
    image: "/images/cucumber/Whisk_6a2ef6e3f3.jpg",
    productId: 47037,
  },
};

const CucumberPage = () => {
  return <FlavorPageLayout {...cucumberPageData} />;
};

export default CucumberPage;

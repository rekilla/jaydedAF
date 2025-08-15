import FlavorPageLayout from '../../layouts/FlavorPageLayout';
import { MediaItemType } from '../../components/ui/cocktail-bento-gallery';

const flavorData = {
  key: "cucumber",
  name: "Cucumber",
  heroImage: "/Cucumber Title.svg",
  tagline: "",
  colorClass: "text-green-500",
  colorHex: "#038264",
};

const perfectServeData = {
  title: "The Perfect Serve",
  serveStyles: [
    { id: 1, title: "Chilled", body: "18 °C Coupe", subBody: "A crisp, clean slate." },
    { id: 2, title: "Shaken", body: "2 °C Martini", subBody: "A refreshing rebellion." },
    { id: 3, title: "On The Rocks", body: "4 °C Rocks Glass", subBody: "A cool cucumber haze." }
  ]
};

const curatedMomentsMedia: MediaItemType[] = [
    { id: 'cu1', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_634ea23028.jpg" },
    { id: 'cu2', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_5fec71df79.jpg" },
    { id: 'cu3', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_494461be83.jpg" },
    { id: 'cu4', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_79687110ca.jpg" },
    { id: 'cu5', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_a577fabf7b.jpg" },
    { id: 'cu6', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_ad0d81dcf7.jpg" },
    { id: 'cu7', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_cbef435bee.jpg" },
    { id: 'cu8', type: 'image', title: '', desc: '', url: "/images/cucumber/grid/Whisk_94f02a652d.jpg" }
];

const cucumberPageData = {
  flavorData,
  perfectServeData,
  curatedMomentsMedia,
  interimTitle: "The Final Chapter",
  interimDescription: (
    <>
      Centered, Poised and Effortlessly Cool. The Laxly Cucumber Martini is liquid Zen, with an edge. Aura for days with a flavor profile boasting the essences of Elderflower, Pear and a hint of Lime.
    </>
  ),
  lifestyleMoment: {
    image: "/images/cucumber/Whisk_9070bc219a.jpg",
    title: "Zenith",
    subtitle: "A cut above",
  },
  curatedMoments: {
    title: "A Curation",
    wideImage: "/images/cucumber/Whisk_73e915b469.jpg",
  },
  specifications: {
    title: "The Details",
    details: [
      { delay: 0.1, value: '12.5%', label: 'ABV', icon: '/martini-glass-with-straw-svgrepo-com.svg' },
      { delay: 0.2, value: '90', label: 'Calories', icon: '/calories-svgrepo-com.svg' },
      { delay: 0.3, value: '100%', label: 'All Natural Flavors & Gluten Free', icon: '/leaf-svgrepo-com.svg' }
    ],
  },
  closingCta: {
    image: "/images/cucumber/Whisk_6a2ef6e3f3.jpg",
    productId: 47037,
  },
};

const CucumberPage = () => {
  return <FlavorPageLayout {...cucumberPageData} />;
};

export default CucumberPage;

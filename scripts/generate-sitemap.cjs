const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');
const path = require('path');

const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://jaydedaf.com').replace(/\/$/, '');

const routes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/contact', changefreq: 'monthly', priority: 0.8 },
  { url: '/press', changefreq: 'monthly', priority: 0.8 },
  { url: '/store-locator', changefreq: 'monthly', priority: 0.8 },
  { url: '/cocktails/cucumber', changefreq: 'monthly', priority: 0.8 },
  { url: '/cocktails/lavender', changefreq: 'monthly', priority: 0.8 },
  { url: '/cocktails/lemon-drop', changefreq: 'monthly', priority: 0.8 },
];

const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
const sitemap = new SitemapStream({ hostname: siteUrl });
const writeStream = fs.createWriteStream(outPath);

sitemap.pipe(writeStream);
routes.forEach((r) => sitemap.write(r));
sitemap.end();

streamToPromise(sitemap).then(() => console.log(`Sitemap generated at ${outPath}`));

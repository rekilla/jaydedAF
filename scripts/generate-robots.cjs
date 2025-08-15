const fs = require('fs');
const path = require('path');

const env = process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'development';
const isPreview = env === 'preview';
const isProd = env === 'production';
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://jaydedaf.com').replace(/\/$/, '');

const lines = [
  'User-agent: *',
  isPreview ? 'Disallow: /' : 'Allow: /',
  '',
  isProd ? `Sitemap: ${siteUrl}/sitemap.xml` : '',
].filter(Boolean);

fs.writeFileSync(path.join(process.cwd(), 'public', 'robots.txt'), lines.join('\n'));
console.log(`robots.txt generated for ${env}`);

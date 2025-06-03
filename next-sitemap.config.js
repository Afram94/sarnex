// next-sitemap.config.js
const axios = require('axios');

module.exports = {
  siteUrl: 'https://sarnexdigital.se',
  generateRobotsTxt: true,
  outDir: './public',

  // 👇 Add dynamic paths here
  additionalPaths: async (config) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/features`);
    const features = res.data;

    return features.map((feature) => ({
      loc: `/features/${feature.slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
  },
};

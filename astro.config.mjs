import { defineConfig } from 'astro/config';

// TODO: Replace this with your real domain once you have one connected
// (e.g. 'https://savvysanskar.com'). This value is used to build absolute
// URLs for canonical tags, RSS feeds, the sitemap, and Open Graph images,
// so it should always be the final, real address of the live site.
export default defineConfig({
  site: 'https://savvysanskar.example',
  trailingSlash: 'never',
});

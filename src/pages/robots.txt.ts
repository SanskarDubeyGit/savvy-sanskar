// Generated dynamically (instead of a static public/robots.txt) so the
// Sitemap line always points at whatever domain is set in astro.config.mjs
// — you only ever have to update the domain in one place.

export async function GET(context: { site: URL }) {
  const site = context.site;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}

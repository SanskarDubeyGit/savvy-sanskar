import { getCollection } from 'astro:content';

// A small, hand-written sitemap endpoint. This avoids adding the
// @astrojs/sitemap package as a dependency — for a site this size, a plain
// static-route list is simpler and just as correct.

const escapeXml = (value: string) => value.replace(/&/g, '&amp;');

export async function GET(context: { site: URL }) {
  const site = context.site;
  if (!site) {
    throw new Error('`site` is not set in astro.config.mjs — the sitemap needs it to build absolute URLs.');
  }

  const thoughts = await getCollection('thoughts');
  const articles = await getCollection('articles');

  const thoughtsPerPage = 10;
  const articlesPerPage = 5;
  const thoughtPages = Math.max(1, Math.ceil(thoughts.length / thoughtsPerPage));
  const articlePages = Math.max(1, Math.ceil(articles.length / articlesPerPage));

  const latestDate = (dates: Date[]) =>
    dates.length ? new Date(Math.max(...dates.map((d) => d.valueOf()))) : undefined;

  const allDates = [
    ...thoughts.map((t) => t.data.publishedAt),
    ...articles.map((a) => a.data.updatedAt ?? a.data.publishedAt),
  ];

  type Entry = { path: string; lastmod?: Date };
  const entries: Entry[] = [
    { path: '/', lastmod: latestDate(allDates) },
    { path: '/about' },
    { path: '/now' },
    {
      path: '/thoughts',
      lastmod: latestDate(thoughts.slice(0, thoughtsPerPage).map((t) => t.data.publishedAt)),
    },
    {
      path: '/articles',
      lastmod: latestDate(
        articles.slice(0, articlesPerPage).map((a) => a.data.updatedAt ?? a.data.publishedAt),
      ),
    },
  ];

  for (let page = 2; page <= thoughtPages; page++) {
    const pageItems = thoughts.slice((page - 1) * thoughtsPerPage, page * thoughtsPerPage);
    entries.push({ path: `/thoughts/page/${page}`, lastmod: latestDate(pageItems.map((t) => t.data.publishedAt)) });
  }

  for (let page = 2; page <= articlePages; page++) {
    const pageItems = articles.slice((page - 1) * articlesPerPage, page * articlesPerPage);
    entries.push({
      path: `/articles/page/${page}`,
      lastmod: latestDate(pageItems.map((a) => a.data.updatedAt ?? a.data.publishedAt)),
    });
  }

  for (const article of articles) {
    entries.push({
      path: `/articles/${article.id}`,
      lastmod: article.data.updatedAt ?? article.data.publishedAt,
    });
  }

  const urls = entries
    .map((entry) => {
      const loc = escapeXml(new URL(entry.path, site).toString());
      const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod.toISOString()}</lastmod>` : '';
      return `  <url>\n    <loc>${loc}</loc>${lastmod}\n  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}

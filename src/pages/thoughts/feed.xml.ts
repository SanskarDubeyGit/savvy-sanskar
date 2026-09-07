import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, excerpt } from '../../lib/site';

export async function GET(context: { site: URL }) {
  const thoughts = await getCollection('thoughts');
  return rss({
    title: `${SITE.name} — Thoughts`,
    description: `Short thoughts from ${SITE.name}.`,
    site: context.site,
    items: thoughts
      .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
      .map((entry) => ({
        title: excerpt(entry.body ?? ''),
        pubDate: entry.data.publishedAt,
        description: entry.body?.trim(),
        link: '/thoughts',
      })),
  });
}

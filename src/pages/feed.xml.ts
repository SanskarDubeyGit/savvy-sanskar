import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, excerpt } from '../lib/site';

export async function GET(context: { site: URL }) {
  const thoughts = await getCollection('thoughts');
  const articles = await getCollection('articles');

  const items = [
    ...thoughts.map((entry) => ({
      title: excerpt(entry.body ?? ''),
      pubDate: entry.data.publishedAt,
      description: entry.body?.trim(),
      link: '/thoughts',
    })),
    ...articles.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.publishedAt,
      description: entry.data.description ?? entry.data.title,
      link: `/articles/${entry.id}`,
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items,
  });
}

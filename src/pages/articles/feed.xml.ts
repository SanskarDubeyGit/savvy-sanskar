import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../lib/site';

export async function GET(context: { site: URL }) {
  const articles = await getCollection('articles');
  return rss({
    title: `${SITE.name} — Articles`,
    description: `Articles from ${SITE.name}.`,
    site: context.site,
    items: articles
      .sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
      .map((entry) => ({
        title: entry.data.title,
        pubDate: entry.data.publishedAt,
        description: entry.data.description ?? entry.data.title,
        link: `/articles/${entry.id}`,
      })),
  });
}

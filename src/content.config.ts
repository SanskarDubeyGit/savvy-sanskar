import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const thoughts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/thoughts' }),
  schema: z.object({
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  // The `image` helper below is provided automatically by Astro for any
  // collection schema. Wrapping the schema in a function like this is what
  // unlocks it — it's how `coverImage` gets validated AND optimized.
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // A short 1-2 sentence summary. Optional — used for the browser tab's
      // meta description and social-share previews. Falls back to the site
      // description if you leave it out.
      description: z.string().optional(),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      // Optional cover image for the article's own page and its social-share
      // preview. This is NOT shown on the /articles list (per the site's
      // "no featured-image cards" rule) — only on the article page itself.
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
    }),
});

export const collections = { thoughts, articles };

# Savvy Sanskar

A personal, minimal, editorial website built with Astro — a digital home for
Thoughts (short notes) and Articles (long-form writing).

## Stack

- Astro 7.1.6
- TypeScript
- CSS (no framework, no client-side JS beyond a couple of small `<script is:inline>` snippets)
- Markdown via Astro Content Collections (the Content Layer API)
- `@astrojs/rss` 4.0.19

## Routes

- `/` Home
- `/thoughts` Thoughts (10 per page, numbered pagination)
- `/articles` Articles (5 per page, newest/oldest toggle)
- `/articles/[slug]` individual Article pages
- `/now` Now
- `/about` About
- `/feed.xml`, `/thoughts/feed.xml`, `/articles/feed.xml` — RSS
- `/sitemap.xml` — sitemap (hand-written, no extra dependency)
- `/robots.txt` — generated from your configured domain

## Local setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

> **First build after this update:** run `npm run build` once and read the
> output. Content-schema and image-path mistakes show up as build errors
> with a file name and line number — that's normal and expected the first
> time you add real content.

## Personalizing the site

Edit `src/lib/site.ts` — one file controls the site name, tagline, the
"Currently:" line on the homepage, your email, and your GitHub/LinkedIn/X
links (leave any of the social links as an empty string to hide it).

Before you go live, also update:

- `astro.config.mjs` — replace the placeholder `site` URL with your real domain.
- `src/pages/robots.txt.ts` — nothing to do here; it reads the domain from `astro.config.mjs` automatically.

## Writing a Thought

Create a Markdown file in `src/content/thoughts/`, named however you like
(the existing files use a `YYYY-MM-DD-slug.md` convention to keep them
sorted in a file browser, but the date shown on the site always comes from
`publishedAt`, not the filename):

```md
---
publishedAt: 2026-09-08
---

Whatever's on your mind. Basic Markdown works: **bold**, _italic_, links,
short paragraphs.
```

### Adding an image to a Thought

Put the image file in the same folder as the Markdown file, then reference
it with a relative path:

```md
---
publishedAt: 2026-09-08
---

Some text.

![Describe the image for screen readers](./my-photo.jpg)
*An optional italic line right under an image becomes its caption.*
```

## Writing an Article

Create a Markdown file in `src/content/articles/`:

```md
---
title: "Why I Build Things"
publishedAt: 2026-09-08
description: "A one-sentence summary, used for SEO and social sharing."
---

# Why I Build Things

Your article content goes here, with full Markdown support: headings,
**bold**, _italic_, blockquotes, lists, links, images with captions
(same pattern as Thoughts, above), inline `code`, fenced code blocks, and
tables.
```

### Optional: a cover image for an Article

Add `coverImage` (and, ideally, `coverImageAlt`) to the frontmatter. Unlike
inline images in the body, this one appears once at the top of the article
page and is also used as the image when the article link is shared on
social media. It is **not** shown on the `/articles` list page — that list
intentionally stays text-only.

```md
---
title: "Why I Build Things"
publishedAt: 2026-09-08
coverImage: ./why-i-build-things-cover.jpg
coverImageAlt: "A short description of the image"
---
```

Both `coverImage` and inline `![]()` images are automatically optimized,
resized, and served responsively by Astro — you don't need to compress or
resize anything yourself before adding it.

## Two demo files to look at

- `src/content/articles/building-things-slowly.md` — shows an inline image
  with a caption, plus a fenced code block.
- `src/content/articles/the-internet-as-a-personal-space.md` — shows the
  `coverImage` frontmatter field.

Both use small, auto-generated abstract placeholder graphics (not real
photos) purely so you can see the pattern working. Delete or replace the
`.jpg` files next to them whenever you add your own images.

## Notes on this environment

This project was updated by an AI assistant without network access, so
`npm install` / `npm run build` could not be run end-to-end here to verify
the final result. Everything was written carefully against current, stable
Astro APIs, but please run `npm install && npm run build` locally as the
first step, and report back any errors — they're usually one-line fixes.

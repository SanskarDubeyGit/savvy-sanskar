// Central place for site-wide settings. Edit the values below and the
// change will apply everywhere: navigation, footer, RSS feeds, and SEO tags.

export const SITE = {
  name: 'Savvy Sanskar',
  tagline: 'Beyond the Screen',
  description: 'A digital home for everything I create and think about.',

  // A one-line summary of what you're up to right now. Shown on the
  // homepage as a small teaser that links to the full /now page.
  now: 'Rebuilding this site, one page at a time.',

  // Used as the fallback social-share image for any page that doesn't
  // set its own. Lives at /public/images/og-default.png.
  ogImage: '/images/og-default.png',

  social: {
    github: '',
    linkedin: '',
    x: '',
  },
  email: 'hello@example.com',
} as const;

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

// Turns the first line (or first ~90 characters) of a Thought's body into
// a short, readable title for RSS readers, since Thoughts don't have their
// own titles or pages.
export const excerpt = (body: string, maxLen = 90) => {
  const firstLine = body
    .trim()
    .split('\n')
    .find((line) => line.trim().length > 0) ?? '';

  // Strip basic Markdown syntax so RSS titles read as plain text.
  const plain = firstLine
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~]/g, '')
    .trim();

  if (plain.length <= maxLen) return plain || 'Thought';
  return `${plain.slice(0, maxLen).trimEnd()}…`;
};

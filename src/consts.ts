/**
 * Single source of truth for site-wide values.
 * Change something here and it updates everywhere: nav, footer, SEO, schema.
 */

export const SITE = {
  name: 'Psymark',
  /** Used as the `... | Psymark` suffix on every page title. */
  titleSuffix: 'Psymark',
  /** Fallback description. Individual pages should always set their own. */
  description:
    'VMAT is the first fully digital standardized visual-motor assessment for iPad. Automatic scoring, instant reports, and Post Covid Norms for school psychologists and occupational therapists.',
  /** Production canonical. The deploy target can override it, see astro.config.mjs. */
  url: 'https://www.psymark.ai',
  locale: 'en_US',
} as const;

/**
 * Prefixes an internal path with the deploy base path.
 *
 * On psymark.ai the site lives at the domain root and this is a no-op. The
 * GitHub Pages demo serves from `/psymark-demo-site/`, where every absolute
 * href and every file in `public/` has to carry that prefix or 404. Use this
 * for internal links and for anything under `public/`. Images imported from
 * `src/assets/` go through Astro's `<Image>` and are prefixed automatically.
 */
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;

export const COMPANY = {
  legalName: 'Psymark, Inc.',
  email: 'karen@psymark.ai',
  phone: '888-339-6112',
} as const;

/** Primary navigation. Must stay on ONE line at desktop: keep it to 5 items. */
export const NAV = [
  // The homepage IS the VMAT page. There is no separate /vmat/.
  { label: 'VMAT', href: '/' },
  { label: 'Other Tests', href: '/other-tests/' },
  { label: 'Research', href: '/research/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Help', href: '/help/' },
] as const;

export const STORE_URL = 'https://psymark-store.square.site/';

/** One label per intent. Do not add a second way of saying "buy". */
export const CTA = {
  primary: 'Buy VMAT',
  secondary: 'See how it scores',
} as const;

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
    'VMAT is the first fully digital standardized visual-motor assessment for iPad. Automatic scoring, instant reports, and post-COVID norms for school psychologists and occupational therapists.',
  /** Must match `site` in astro.config.mjs. */
  url: 'https://www.psymark.ai',
  locale: 'en_US',
} as const;

export const COMPANY = {
  legalName: 'Psymark, Inc.',
  email: 'karen@psymark.ai',
  phone: '888-339-6112',
} as const;

/** Primary navigation. Must stay on ONE line at desktop: keep it to 5 items. */
export const NAV = [
  { label: 'VMAT', href: '/vmat/' },
  { label: 'Other Tests', href: '/other-tests/' },
  { label: 'Research', href: '/research/' },
  { label: 'Help', href: '/help/' },
] as const;

export const STORE_URL = 'https://psymark-store.square.site/';

/** One label per intent. Do not add a second way of saying "buy". */
export const CTA = {
  primary: 'Buy VMAT',
  secondary: 'See how it scores',
} as const;

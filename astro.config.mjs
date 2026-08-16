// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';

// `site` drives canonical URLs, the sitemap and every absolute OG image URL.
// If the production domain ever changes, change it HERE and nowhere else.
//
// SITE_URL and BASE_PATH exist so a preview deploy can point somewhere else
// without editing this file. The GitHub Pages demo sets both, because a project
// page is served from https://<user>.github.io/<repo>/ rather than a root.
// Unset, both fall back to production.
export default defineConfig({
  site: process.env.SITE_URL || 'https://www.psymark.ai',
  base: process.env.BASE_PATH || undefined,

  integrations: [sitemap()],

  vite: { plugins: [tailwind()] },

  // The design system specifies Plus Jakarta Sans and IBM Plex Mono. Astro
  // downloads, subsets and self-hosts them at build time, so there is no
  // Google Fonts <link> and no third-party request at runtime.
  fonts: [
    {
      name: 'Plus Jakarta Sans',
      cssVariable: '--font-jakarta',
      provider: fontProviders.google(),
      weights: ['400', '500', '600', '700', '800'],
      styles: ['normal'],
    },
    {
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      provider: fontProviders.google(),
      weights: ['500', '600'],
      styles: ['normal'],
    },
  ],
});

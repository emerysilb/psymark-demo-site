// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';

// `site` drives canonical URLs, the sitemap and every absolute OG image URL.
// If the domain ever changes, change it HERE and nowhere else.
export default defineConfig({
  site: 'https://www.psymark.ai',

  integrations: [
    sitemap({
      // Concept pages are internal review artifacts. Never ship them to Google.
      filter: (page) => !page.includes('/concepts/'),
    }),
  ],

  vite: { plugins: [tailwind()] },

  // Astro's native font pipeline: self-hosted, subset, preloaded, zero layout
  // shift. No Google Fonts <link>, no Fontsource packages.
  fonts: [
    {
      name: 'Switzer',
      cssVariable: '--font-switzer',
      provider: fontProviders.fontshare(),
      weights: ['400', '500', '600', '700'],
      styles: ['normal'],
    },
    {
      name: 'Cabinet Grotesk',
      cssVariable: '--font-cabinet',
      provider: fontProviders.fontshare(),
      weights: ['500', '700', '800'],
      styles: ['normal'],
    },
    {
      name: 'General Sans',
      cssVariable: '--font-general',
      provider: fontProviders.fontshare(),
      weights: ['400', '500', '600'],
      styles: ['normal'],
    },
    {
      name: 'Satoshi',
      cssVariable: '--font-satoshi',
      provider: fontProviders.fontshare(),
      weights: ['400', '500', '700', '900'],
      styles: ['normal'],
    },
  ],
});

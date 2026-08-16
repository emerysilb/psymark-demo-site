import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Testimonials.
 *
 * To add one: drop a new .md file in src/content/testimonials/.
 * The fields below are enforced at build time, so a testimonial missing a role
 * or a credential fails the build instead of shipping as "- Sarah".
 */
const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: ({ image }) =>
    z.object({
      /** First name + last initial, matching how the reviewer agreed to appear. */
      name: z.string(),
      /** Job title, e.g. "School Psychologist". */
      role: z.string(),
      /** Post-nominals, e.g. "OTD, OTR/L". Use '' if the reviewer has none. */
      credentials: z.string(),
      /** State or district. Keeps social proof concrete. */
      location: z.string(),
      /**
       * The pull quote. Keep it to 3 lines on screen, roughly 160 characters.
       * Trim by DELETING words from the original review, never by rewording it:
       * these are real practitioners and the quote must stay theirs.
       */
      quote: z.string().max(220, 'Pull quotes must stay short enough to read at a glance.'),
      photo: image().optional(),
      /** Controls display order. Lower numbers first. */
      order: z.number().default(99),
    }),
});

export const collections = { testimonials };

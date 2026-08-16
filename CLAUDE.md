# Psymark website

Static marketing site for Psymark, Inc. Astro 7, Tailwind v4, deployed on
Cloudflare Pages. Replaces the old Squarespace site.

## Who you are talking to

**Karen owns this site and is not a developer.** She will describe what she
wants in plain language ("I got three new testimonials", "the price changed",
"can the headline say something warmer"). Your job is to make the change, show
her, and publish it when she says so.

Rules for working with her:

- **Never ask her to run a command.** You run everything.
- **Never show her a diff, a stack trace, or a file path** unless she asks.
  Describe changes in terms of what she will see on the page.
- **Always show before publishing.** Make the change, make sure the dev server
  is running, and tell her which page to look at. Wait for her to approve.
- **"Looks good, push it" means publish.** Run the publish steps below, then
  confirm it is live and roughly when it will appear.
- If a request is ambiguous, make the most reasonable version, show it, and say
  what you assumed. Do not block on a question she cannot answer.

## Running the site

```bash
npm run dev
```

Serves at `http://localhost:4321`. It hot-reloads, so leave it running while
editing. Start it before showing Karen anything.

## Where things live

| What | Where |
|---|---|
| Testimonials | `src/content/testimonials/*.md`, one file per person |
| Pages | `src/pages/*.astro`, filename becomes the URL |
| Site name, nav, phone, email, store link | `src/consts.ts` |
| Colours, fonts, spacing, radius | `src/styles/global.css` |
| Images | `src/assets/` (optimized) or `public/img/` (served as-is) |
| SEO tags and schema | `src/components/Seo.astro` |

## Common tasks

### Add a testimonial

Create `src/content/testimonials/first-lastinitial.md`:

```markdown
---
name: Dana R.
role: School Psychologist
credentials: NCSP
location: Oregon
quote: One clean sentence from their review, under 220 characters.
photo: ../../assets/reviewer-dana.png   # optional, omit if no photo
order: 4
---
```

It appears automatically everywhere testimonials are shown. The build fails if
a field is missing, which is intentional.

**Quotes must stay the reviewer's own words.** Shorten by deleting words, never
by rewriting. These are real practitioners and a reworded quote is a fabricated
one. If a quote is too long, cut a sentence rather than paraphrasing.

### Add a page

Create `src/pages/whatever.astro`. It must use `Base` and it must pass a
`description`:

```astro
---
import Base from '../layouts/Base.astro';
---
<Base
  title="Research"
  description="Peer-reviewed research and the VMAT standardization sample, for school psychologists and OTs evaluating a digital visual-motor assessment."
>
  <main id="main">...</main>
</Base>
```

If you add a page to the nav, add it to `NAV` in `src/consts.ts`, and keep the
nav at five items or fewer so it stays on one line.

### Change wording

Most copy is inline in the page files. Search for the sentence, edit it, done.

## SEO: non-negotiable

The old Squarespace site shipped an **empty meta description on all 18 pages**,
had **no H1 on the homepage**, and left placeholder posts named
`Blog Post Title One-3zaa9-zlxng` in the sitemap. None of that happens again.

Every page must:

1. **Pass a `description`** of roughly 120 to 158 characters, written for a
   school psychologist or OT deciding whether to click. The build throws without
   one, and warns if the length is off.
2. **Have exactly one `<h1>`**, and it must describe the page. Not "Resources"
   on the About page.
3. **Give every meaningful image a real `alt`.** Decorative images get
   `alt=""` plus `aria-hidden="true"`, never a missing attribute.
4. **Set a unique `<title>`.** No "Contact 2".

Also:

- URLs are permanent. Renaming `src/pages/vmat.astro` breaks every inbound link
  and every citation in a district's purchasing doc. If a URL must change, say
  so explicitly and set up a redirect in `public/_redirects` first.
- `public/robots.txt` deliberately **allows** AI crawlers. The old site blocked
  them. Do not re-block without asking.
- The sitemap is generated at build. `/concepts/` is excluded on purpose.

## Design rules

The visual system is locked. Do not improvise new values.

- **Colours:** only the tokens in `src/styles/global.css`. Navy `#1F3B61` and
  emerald `#069876` are the brand and came off the old site.
- **`emerald` vs `emerald-ink`:** the brand green measures only 3.65:1 against
  white, which fails accessibility for normal-size text. Use `emerald-ink`
  (`#05745A`) for buttons, links, and anything under 18px. Use `emerald` only
  for large display text, icons, and graphics. **Never put white text on
  `emerald`.** The old site's Buy Now button did and it was unreadable for
  low-vision users.
- **One corner radius:** `rounded-brand` (10px). Do not add a second.
- **Fonts** are configured in `astro.config.mjs` and self-hosted by Astro. Do
  not add a Google Fonts `<link>`.
- **No em-dashes** in visible copy. Use a period, a comma, or a regular hyphen.
- **Motion** is deliberately restrained. Reveals use CSS `animation-timeline`,
  which costs nothing and respects `prefers-reduced-motion`. Do not add an
  animation library.
- **Never embed an auto-buffering video.** The old homepage pulled **40 MB**
  because the hero video preloaded all 104 seconds while paused. Practitioners
  open this on school wifi. Any video gets `preload="none"` and a poster image.

## Picking a design direction

`src/pages/concepts/{a,b,c}.astro` are three competing directions, and
`src/pages/index.astro` is currently a chooser page. All are `noindex` and
excluded from the sitemap.

Once Karen picks one:

1. Build the real homepage from the winning concept into `src/pages/index.astro`.
2. Delete `src/pages/concepts/` and the unused font families in
   `astro.config.mjs`.
3. Remove the sitemap `filter` in `astro.config.mjs`.

## Publishing

Cloudflare Pages watches the `main` branch and rebuilds on every push.

```bash
npm run build
```

If the build passes:

```bash
git add -A && git commit -m "Add three new testimonials" && git push
```

Cloudflare picks it up within about a minute and the site is live one to two
minutes after that. Tell Karen when it will be visible, and mention that a hard
refresh may be needed if she does not see it immediately.

**If the build fails, do not push.** Fix it, rebuild, then push.

Never push directly if `git status` shows changes you did not make and cannot
explain. Ask first.

## Things to leave alone

- `src/components/Seo.astro` guardrails. The thrown error is the feature.
- `site` in `astro.config.mjs`. It drives canonical URLs and the sitemap.
- `public/_redirects` entries, once added. They keep old Squarespace URLs alive.
- Form field `name` attributes on the Mailchimp signup. Renaming them silently
  breaks the mailing list.

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
| Nav bar and footer | `src/components/Header.astro`, `Footer.astro` |
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
- The sitemap is generated at build and includes every page.

## Design rules

The visual system comes from the **Psymark Design System** project on
claude.ai/design. `src/styles/global.css` is the local mirror of it. Do not
improvise new values: if something is missing, it belongs in the design system
first.

- **Colours:** only what is in `src/styles/global.css`. Tailwind's stock palette
  is deliberately deleted there, so `bg-emerald-500` and friends do not exist
  and will silently do nothing. Brand green is `green-600` `#009966`, brand navy
  is `navy-700` `#1E3A5F`, body copy is `slate-600`.
- **`green-600` vs `green-700`:** the brand green measures 3.9:1 on white, which
  passes only for large text. Use `green-700` (`#007D53`, 5.2:1) for buttons,
  links, and anything under 18px. Use `green-600` for large display text, rules,
  and icons. **Never put white text on `green-600` or lighter.** The old site's
  Buy Now button did and it was unreadable for low-vision users.
- **Two radii, no more:** `rounded-md` (10px) for buttons and pills,
  `rounded-lg` (14px) for cards and images.
- **Every full-width block uses `psy-container`.** That is what keeps the logo,
  the h1 and every paragraph on one left edge down the whole page. Do not
  hand-roll `mx-auto max-w-... px-...`.
- **Fonts** are Plus Jakarta Sans and IBM Plex Mono, configured in
  `astro.config.mjs` and self-hosted by Astro. Do not add a Google Fonts
  `<link>`. Mono is for scores and phone numbers only.
- **No em-dashes** in visible copy. Use a period, a comma, or a regular hyphen.
- **Motion** is deliberately restrained. Reveals use CSS `animation-timeline`,
  which costs nothing and respects `prefers-reduced-motion`. Do not add an
  animation library.
- **Never embed an auto-buffering video.** The old homepage pulled **40 MB**
  because the hero video preloaded all 104 seconds while paused. Practitioners
  open this on school wifi. Any video gets `preload="none"` and a poster image.

## Answers we do not have yet

Two FAQ answers on `src/pages/help.astro` are marked `pending: true` and render
in muted italic: which iPads are supported, and where student data is stored.

**Do not guess at these.** A wrong answer about device support or student data
handling is the kind of thing that kills a district purchase. When Karen
confirms the real wording, replace `a:` and delete the `pending: true` line, and
the answer joins the page's FAQ schema automatically.

## Publishing

Always build first. **If the build fails, do not push.** Fix it, rebuild, then
push.

```bash
npm run build
```

If the build passes:

```bash
git add -A && git commit -m "Add three new testimonials" && git push
```

Never push if `git status` shows changes you did not make and cannot explain.
Ask first.

### Where a push actually goes

There are two deploy targets, and right now only the first is connected.

| Target | URL | How |
|---|---|---|
| **Demo** | `emerysilb.github.io/psymark-demo-site/` | GitHub Actions, `.github/workflows/deploy.yml`, runs on every push to `main` |
| **Production** | `www.psymark.ai` | Cloudflare Pages, watches `main`. Not connected yet. |

Both build from the same commit. The demo is live one to two minutes after a
push; Cloudflare, once connected, takes about the same. Tell Karen when it will
be visible and mention that a hard refresh may be needed.

The demo is served from a subfolder, not a domain root, which is why internal
links go through the `url()` helper in `src/consts.ts` instead of being written
as plain `/help/`. **Use `url()` for every internal link and every file in
`public/`.** A raw `href="/help/"` works locally and 404s on the demo.

Preview builds also emit `noindex` automatically, so Google never sees a
duplicate of psymark.ai on a github.io URL. That is driven by whether the built
`site` matches `SITE.url`, and it needs no maintenance.

## Things to leave alone

- `src/components/Seo.astro` guardrails. The thrown error is the feature, and so
  is the automatic `noindex` on preview deploys.
- `site` in `astro.config.mjs`. It drives canonical URLs and the sitemap. The
  `SITE_URL` / `BASE_PATH` env vars exist so the demo deploy can override it
  without editing the file.
- `public/_redirects` entries, once added. They keep old Squarespace URLs alive.
  Note this is a **Cloudflare** feature and does nothing on the GitHub Pages
  demo, so a redirect that "does not work" on the demo is not broken.
- Form field `name` attributes on the Mailchimp signup. Renaming them silently
  breaks the mailing list.

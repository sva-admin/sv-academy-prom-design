# Stack: the engineering spine

Read this when standing up a new project or wiring the asset pipeline. Both
reference builds share this skeleton, which is why a third project can start in
an afternoon.

Nothing here is mandatory. If the project already has a stack, take the four
ideas in section 4 and leave the rest.

## Contents

1. The stack
2. Pages as real files, shipped as one artifact
3. The typed asset manifest
4. The four ideas worth porting anywhere
5. Delivery and caching
6. Tests as a design contract

---

## 1. The stack

```json
"scripts": {
  "dev": "wrangler dev",
  "build": "npm run pages && wrangler deploy --dry-run --outdir dist",
  "test": "vitest run",
  "typecheck": "tsc --noEmit",
  "assets": "node scripts/assets-manifest.mjs",
  "assets:check": "node scripts/assets-manifest.mjs --check",
  "assets:local": "node scripts/assets-manifest.mjs --seed-local",
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "pages": "node scripts/pages-bundle.mjs"
}
```

Runtime: `hono` on Cloudflare Workers, `drizzle-orm` with `postgres`. Dev:
`wrangler`, `vitest`, `typescript`, `drizzle-kit`, `@cloudflare/workers-types`.

**No CSS framework and no client framework on either project.** The CSS is
hand-written against the token file, and the JavaScript is a small amount of
vanilla per page. That is a large part of why they are fast, and it is only
sustainable because the token discipline in `tokens.md` is enforced.

One `wrangler.toml` trap worth knowing: the default `watch_dir` is `src`, which
contains generated build output, so a `[build]` command that writes into `src`
retriggers itself forever and `wrangler dev` never serves a request. Narrow
`watch_dir` to the bundler's real inputs.

---

## 2. Pages as real files, shipped as one artifact

Pages live as actual `.html` files you can double-click and open, but the Worker
deploys as a single module. A build script reads `src/pages/*.html` and
`src/vendor/*.js` and writes a generated `site.ts` with the bodies keyed by
route:

```js
const routeFor = f => (f === 'index.html' ? '/' : `/${f.replace(/\.html$/, '')}`)
export const PAGES = { '/': '…', '/gallery': '…' }
```

This is not a style choice. A deploy pipeline that uploads only `index.js` will
otherwise ship a Worker referencing text modules that were never uploaded, and
the failure appears in production rather than in the build.

The benefit is real: designers can open a page from Finder with no dev server
running, which keeps the review loop fast.

---

## 3. The typed asset manifest

A script walks the assets folder and generates a typed `asset()` helper, so
every reference is checked at compile time rather than discovered as a 404 by a
customer.

- `npm run assets` regenerates it.
- `npm run assets:check` fails CI if the manifest is stale.
- The generator enforces size caps, so an unoptimised 12MB hero cannot land
  quietly.
- Never hand-edit the generated file.

For photography there is a second step that builds derivatives (multiple widths
and formats) from each source image, with `npm run photos` before
`npm run assets`. Commit both, or the manifest and the files disagree.

---

## 4. The four ideas worth porting anywhere

Even on a completely different stack, these are the parts that earn their keep:

1. **A generated, typed asset reference with a CI staleness check.** Broken
   image paths are the most common defect in media-heavy sites and this removes
   the entire class.
2. **A design-law file that is short enough to read.** Sixty-three lines
   governed the whole of AURA Heights: seven colours, three fonts, one easing curve,
   one honesty rule, and a named reference page whose implementation is the
   tiebreaker. See section 6 and `tokens.md`.
3. **Build gates for tokens and copy.** No hex outside the token file, no em
   dashes, all user-facing strings through the translation function. Rules a
   human has to remember are rules that decay.
4. **An asset map with a data-flags section.** Inventory every supplied asset,
   record every contradiction in the source documents, and write down the
   spatial or factual ground truth. This is what stops a well-meaning sentence
   becoming a misrepresentation. See `copy.md` section 4.

---

## 5. Delivery and caching

- **`cache-control: no-cache` on the document.** Safari heuristically caches
  page HTML, and a phone can serve a week-old page, and the stale script URLs
  inside it, for days after a green deploy. Revalidating a 60KB document is
  cheap; serving a stale one costs a client meeting.
- **Long, immutable caching on hashed assets**, set per extension.
- **Two encodes of every video and image**, with the smaller served to phones,
  and honour `Save-Data`.
- **Self-host fonts as subset `woff2`** with exactly two preloads. Google Fonts
  is blocked in some markets these projects sell into, so a CDN dependency is a
  correctness issue rather than a performance one.
- **Range-request support** for video, or scrubbing will not work on Safari.
- **Serve HTML with an explicit `charset=utf-8`.** Without it a browser may fall
  back to Latin-1, and every non-ASCII character (Thai, the middot separator,
  curly quotes) renders as mojibake. This bites hardest on a quick local static
  server used for review, where the page looks broken for a reason that has
  nothing to do with the design.

Measured payoff from The Assembly pass: mobile LCP went from 5,820ms to 1,236ms, and
the home page dropped from 9.8 screens of scroll to 3.8. Both numbers came from
the metrics in `scripts/shots.mjs`, which is why that script reports them.

---

## 6. Tests as a design contract

The test suite asserts design facts, not just routes:

- **Chrome parity**: every page has identical nav and footer markup. This is the
  mechanical answer to "mobile navigation is inconsistent between pages".
- **Asset manifest resolution**: every referenced asset exists.
- **Path-rewrite guard**: generated routes match the files on disk.
- Add a **grep gate for every defect a past audit found**, so each defect class
  can only be discovered once.

Two warnings from a real post-mortem, because a gate that lies is worse than no
gate:

- **Give the test runner an explicit config.** Without one, test files can race
  against a single shared database and pass or fail by timing.
- **Never assert on a stopwatch.** One bootstrap test measured elapsed time and
  failed roughly one run in three, which taught everyone to re-run until green.
  A suite people re-run until it passes is not a gate.

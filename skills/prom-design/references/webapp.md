# The web app: compact, footer-navigated, worth touching

Read this whenever the register is **instrument** (see SKILL.md). A web app is
not a shorter marketing page, it is a different object, and the most common
failure is building a landing page and calling it an app.

The governing complaint, paraphrased from the brief that produced this whole
register:

> Far too much empty space and far too much scrolling. Make it feel like a web
> app, mobile first, without a parade of sections to wade through.

## Contents

1. The density budget, with a number
2. Footer navigation, in full
3. Eleven ways to compact a screen
4. The gimmicks that earn their place
5. Using 21st.dev components
6. What NOT to bring from the cinematic register
7. The check before you show it

---

## 1. The density budget, with a number

Vague targets do not survive a deadline, so use the measured one.

Run the review gate and read the `screens` column, which is
`scrollHeight / viewport height`:

```bash
node ~/.claude/skills/prom-design/scripts/shots.mjs \
  --base http://127.0.0.1:8788 --routes / --widths 375
```

| screens at 375px | verdict |
|---|---|
| 1.0 to 2.0 | an app screen. Good. |
| 2.0 to 3.0 | acceptable for a browse or list screen |
| 3.0 to 4.5 | getting long, justify every section |
| over 4.5 | this is a landing page wearing an app costume |

The Assembly home screen was cut from **9.8 screens to 3.8** and that single change
did more for how the product felt than any restyle. Treat the number as a
budget you spend, not a result you observe.

**The payload goes above the fold.** On an app home screen the user should see
the thing they came for (the next booking, the available slots, the balance)
without scrolling at all. Everything else is below.

## 2. Footer navigation, in full

A bottom tab bar is the single change that makes a web page feel like an app. It
is not decoration: it is a promise that the whole product is reachable from
anywhere in one tap.

```css
.tabbar{
  position:fixed; inset:auto 0 0 0; z-index:var(--z-bar);
  height:calc(var(--tabbar-h) + env(safe-area-inset-bottom));
  padding-bottom:env(safe-area-inset-bottom);
  display:grid; grid-auto-flow:column; grid-auto-columns:1fr;
  background:var(--paper); border-top:1px solid var(--line);
}
.tabbar a{
  display:grid; place-items:center; gap:3px;
  font-size:var(--t-micro); color:var(--ink-3);
  min-height:48px; text-decoration:none;
  -webkit-tap-highlight-color:transparent;
}
.tabbar a[aria-current="page"]{ color:var(--ink); font-weight:600 }
/* every scroll container must clear the bar, or the last row is unreachable */
main{ padding-bottom:calc(var(--tabbar-h) + env(safe-area-inset-bottom) + var(--s5)) }
```

Rules, each of which has failed somewhere:

- **Three to five destinations. Never six.** If you need six, two of them belong
  inside a third.
- **Icon plus label, always.** Icon-only bars fail for everyone who does not
  already know the product. The Assembly ships Home, Explore, Clubs, Jump.
- **`env(safe-area-inset-bottom)`** or the bar sits under the iPhone home
  indicator.
- **`--tabbar-h` is a token**, and every scroll container, sticky element and
  modal references it. Without that, exactly one screen has content hidden
  behind the bar and nobody can work out why.
- **Mark the current tab with `aria-current="page"`**, not just a colour class.
- **The bar never changes between pages.** Inconsistent mobile navigation
  between pages is a named, remembered defect in this house.
- **48px minimum touch height**, and `touch-action: manipulation` to kill the
  300ms tap delay.
- A **sticky action bar** (`--actionbar-h`) may sit above the tab bar on a
  detail screen for the one commit action. Never two action bars.

Retire the hamburger. On a phone it hides the product behind a mystery button;
the tab bar shows it.

## 3. Eleven ways to compact a screen

Compaction is not shrinking type. It is showing the conclusion and hiding the
derivation.

1. **Facets instead of scroll.** A filter row turns 40 items into 6. This is
   the single biggest win, and it is why The Assembly leads with "By place / By kind".
2. **Segmented control instead of sections.** Today / This week / All in one
   control replaces three stacked blocks.
3. **Horizontal rails for peers.** A row of dates or categories that scrolls
   sideways costs one screen instead of six. Label the affordance.
4. **Sheets instead of pages.** A bottom sheet for detail keeps the user in
   place and removes a whole navigation round trip.
5. **Disclosure for the long tail.** "See all 17 dates" beats rendering 17.
6. **Merge the header into the payload.** An app does not need a hero. The Assembly's
   entire "hero" is one line of live numbers and a button.
7. **Cards carry facts, not paragraphs.** Category, availability, title, then
   one metadata line. If a card needs a paragraph, the card is a page.
8. **Kill the section that exists because the template had one.** Testimonials,
   "our values", a second CTA. In an app they are all noise.
9. **One primary action per screen.** More than one is a decision the user did
   not ask to make.
10. **Empty states do work.** An empty list should offer the action that fills
    it, not apologise.
11. **Collapse chrome on scroll.** The header can shrink; the tab bar must not.

## 4. The gimmicks that earn their place

Delight is not decoration when it teaches, reassures, or removes a step. Each of
these is cheap and each does a job. Use several; do not use all of them on one
screen.

**The shadow coach overlay (first-run tutorial).** A dimmed scrim, a card,
`1 of 3`, Skip and Next. This is the "shadow tutorial" pattern, and the copy
should teach trust rather than point at buttons. The real The Assembly line:

> The dates and the places left are counted out of the database as the page is
> built, not written by hand. When a table fills, this number drops.

Exactly three steps. Store the dismissal, and know whether it lives in
`localStorage` or a cookie because every screenshot run needs to skip it. Add
icons so the gesture is legible without reading.

**Spotlight cutout.** A step better than a flat scrim: punch a hole so the
element being explained stays lit.

```css
.spot{ position:fixed; inset:0; z-index:var(--z-scrim);
  background:rgba(20,26,24,.72);
  /* the lit element's rect, as a rounded hole */
  clip-path:polygon(0 0,100% 0,100% 100%,0 100%);
  -webkit-mask:
    linear-gradient(#000,#000),
    radial-gradient(circle at var(--sx) var(--sy), transparent 0 var(--sr), #000 var(--sr));
  -webkit-mask-composite:destination-out; mask-composite:exclude;
}
```

**Shadow gallery.** A media rail where depth does the sorting: the active tile
sits at `--lift-3` and full scale, its neighbours at `--lift-1`, `scale(.94)`
and slightly desaturated. Scroll-snap keeps it honest.

```css
.gal{ display:flex; gap:var(--s3); overflow-x:auto;
  scroll-snap-type:x mandatory; scroll-padding:var(--pad);
  -webkit-overflow-scrolling:touch; touch-action:pan-x }
.gal>*{ flex:0 0 78%; scroll-snap-align:center;
  border-radius:var(--r-media); box-shadow:var(--lift-1);
  transform:scale(.94); filter:saturate(.85);
  transition:transform .45s var(--ease), box-shadow .45s var(--ease), filter .45s var(--ease) }
.gal>*.is-active{ transform:scale(1); box-shadow:var(--lift-3); filter:none }
```

Drive `.is-active` with an IntersectionObserver at `threshold: 0.6`. Show an
edge fade **only while it actually overflows** (`scrollWidth - clientWidth > 4`),
or a gallery of one gets dressed up as a scrollable list.

**Other gimmicks worth their weight:**

- **Number ticker** on the live count, so a changing number is felt. Cheap with
  `requestAnimationFrame` over 600ms, and it must respect reduced motion.
- **Skeletons, not spinners.** A skeleton shaped like the content reads as fast;
  a spinner reads as broken.
- **Optimistic state** on tap, with a quiet revert on failure.
- **Pull-to-refresh feel** via `overscroll-behavior: contain` plus a small
  rubber-band indicator.
- **Sticky commit bar** that slides in once a selection exists.
- **A live dot.** A small pulsing dot next to a number that updates. Protect its
  meaning: it may only mount on genuinely live data, never on hover. In one
  system this was lint-enforced with a hard rule of one halo per screen.
- **Count-up-on-reveal** for stat rows, once per session.
- **Micro haptic analogue**: a 60ms scale to `.97` on tap. It is the closest a
  web app gets to feeling native.

Everything here obeys the affordance law: if it can be swiped, dragged or
scrubbed, say so in words or animate a hint on first view.

## 5. Using 21st.dev components

21st.dev is the fastest way to get a well-built React component (bottom bars,
sheets, carousels, command palettes, animated counters) without inventing one.

Two access paths, depending on your setup:

- **The `claude.ai 21st.dev` connector** (`https://21st.dev/api/mcp`), if your
  client supports remote MCP connectors.
- **The local `magic` MCP** (`npx @21st-dev/magic`) with your own API key from
  <https://21st.dev/mcp>. Keep the key out of version control, and rotate it
  if it ever leaks.

How to use the output well, which matters more than fetching it:

1. **Take the mechanism, not the skin.** A 21st.dev component arrives with its
   own palette, radii and shadows. Rip those out and rebind every value to your
   tokens. A component that keeps its own look is the "out of place" defect.
2. **Rebind radii by role**, not by size: `--r-control` for buttons and inputs,
   `--r-media` for imagery, `--r-sheet` for the drawer, `--r-commit` for the
   pill.
3. **Delete the variants you do not use.** Most of these components ship six
   sizes and four tones; keeping them is how a design system dies.
4. **Check contrast after rebinding**, from rendered pixels, because the
   component was contrast-tested against its own palette and not yours.
5. **Check the licence** before shipping a component into client work.

The same discipline applies to any component source (shadcn/ui, Radix, Headless
UI). Borrow behaviour and accessibility, never appearance.

## 6. What NOT to bring from the cinematic register

- No full-viewport hero. No `100svh` section on an app home screen.
- No display serif at `clamp(38px,5vw,72px)`. The instrument register runs one
  sans and gets its hierarchy from weight and size, not from a second face.
- No script accent. A booking screen with decorative type reads as unserious.
- No scroll-scrubbed film, no Ken Burns, no ambitious first-load motion.
- No `clamp(56px,6.5vw,92px)` section rhythm. Use `--s5` and `--s6` between
  blocks and `--s7` only between major regions.

The one thing that does carry over completely is the **honesty system**. The Assembly's
"how this page counts" note is the same move as AURA Heights's "not an artist's
impression", and it is what makes a dense screen feel trustworthy rather than
merely busy. See `copy.md`.

## 7. The check before you show it

1. `screens` at 375px is inside the budget in section 1.
2. The payload is visible with zero scrolling.
3. The tab bar is present, identical, and nothing hides behind it.
4. Exactly one primary action on the screen.
5. Every rail, sheet and scrubber announces itself.
6. No section survives that you could not name a reason for.
7. Contrast measured from rendered pixels, including over any imagery.
8. Any borrowed component has been rebound to your tokens.

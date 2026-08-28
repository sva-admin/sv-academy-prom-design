# Patterns: the components that carry the style

Read this when building a specific piece. Everything here shipped, and the
values are counted from the source rather than recommended in the abstract.

## Contents

1. The two-register type system (the most important idea here)
2. The primitives every page shares
3. The section eyebrow
4. The pill, the only button
5. The grain overlay
6. Radii, shadows, motion
7. The reveal
8. Signature moments: compare slider, proof pair, provenance chip, bento,
   stat row, affordance-labelled rail
9. Instrument-register components: bottom tab bar, event card, coach overlay
10. Hard-won interaction lessons

---

## 1. The two-register type system

This is the single most transferable idea in the whole aesthetic, and it is not
about which fonts you pick.

**There are two type worlds and a deliberately empty middle.**

The display world, in the serif:

| Role | Value |
|---|---|
| Home h1 | `clamp(38px,5vw,72px)` |
| Home h1 script span | `clamp(50px,6.4vw,96px)` |
| Interior h1 | `clamp(31px,4.4vw,62px)` |
| Section h2 | `clamp(32px,4.4vw,60px)` |
| Lede | `clamp(17px,1.5vw,21px)` |
| Body | `15px` fixed |

The micro world, in the letterspaced sans, lives entirely at **7.5, 8, 8.5, 9,
9.5, 10, 10.5, 11, 11.5, 12px**.

Now notice the holes. **Nothing exists between 12px and 15px, and nothing
between 21px and 30px.** That absence is what produces the couture feel. A page
whose type sizes form a smooth continuum reads as a document; a page with two
separated worlds reads as designed. When you are tempted to add a 13px label or
a 26px subhead, you are filling in the gap that makes it work.

Two constraints go with it:

```css
h2      { max-width: 22ch }   /* display lines stay short */
.lede   { max-width: 58ch }
h2 .script { font-size: 1.28em }  /* scales with its host clamp, no own clamp */
```

### The letterspacing rule

Counted across every page:

| Value | Uses | Where |
|---|---|---|
| `.02` to `.06em` | ~35 | Serif display, only ever this tight |
| `.2em` | 30 | Captions, legal |
| `.24em` | 33 | Nav links, pill labels |
| `.26em` / `.28em` | 44 | Waypoints, chips, tabs |
| `.3em` | 58 | Generic uppercase micro-labels |
| `.34em` | 31 | Nav wordmark, form labels |
| `.42em` | 18 | Section eyebrows |
| `.5em` / `.52em` | 25 | Hero eyebrow, "BY AURA" |

**Serif display gets 0.02 to 0.06em. Sans micro-labels get 0.2 to 0.52em.
Nothing sits in between.** Same principle as the size scale: two worlds, no
blend.

One detail worth copying: a heavily tracked wordmark carries `text-indent`
equal to its tracking (`letter-spacing:.34em; text-indent:.34em`) so the
trailing letter-space does not push the mark visually off-centre.

---

## 2. The primitives every page shares

About a dozen classes, copied verbatim between pages.

```css
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:70px}
body{background:var(--ivory);color:var(--ink);font-family:var(--sans);
     font-size:15px;line-height:1.75;-webkit-font-smoothing:antialiased;
     overflow-x:hidden}
::selection{background:var(--gold-soft);color:#fff}
img,video{display:block;max-width:100%}
img{height:auto}
a{color:inherit;text-decoration:none}
.band{position:relative;background:var(--ivory)}
.wrap{max-width:1360px;margin:0 auto;padding:0 clamp(20px,4vw,56px)}
section{overflow:hidden}
```

`img{height:auto}` with **real `width` and `height` attributes on every image**
is deliberate: the attributes give the browser an aspect ratio to reserve so
layout never shifts, and `height:auto` stops those attributes stretching the
rendered image. Both halves are needed.

Rhythm is one reused clamp: `padding-block:clamp(56px,6.5vw,92px)`, with
`clamp(64px,7vw,100px)` for register bands. The page gutter,
`clamp(20px,4vw,56px)`, is reused on `.wrap` and on every fixed element so
nothing drifts out of alignment.

---

## 3. The section eyebrow

Used on every section of every page. A 34px gold hairline, a 12px gap, then
10px text at `.42em`.

```css
.eyebrow2{display:inline-flex;align-items:center;gap:12px;font-size:10px;
  letter-spacing:.42em;color:var(--gold-ink);margin-bottom:22px}
.eyebrow2::before{content:"";width:34px;height:1px;background:var(--gold)}
```

On dark bands, switch both the text and the rule to `--gold-soft`.

The full section header is the triple: **eyebrow, then serif headline with one
script word, then a restrained lede.** See `copy.md` for the headline formula.

---

## 4. The pill, the only button

There is exactly one button in the system, in three skins. Resisting the urge to
add a second button style is most of what keeps the site coherent.

```css
.pill{display:inline-flex;align-items:center;gap:12px;border-radius:999px;
  padding:13px 10px 13px 26px;font-size:11px;letter-spacing:.24em;
  border:1px solid rgba(255,255,255,.55);color:#fff;
  transition:all .5s var(--ease);cursor:pointer;min-height:46px}
.pill .dot{width:30px;height:30px;border-radius:50%;
  background:rgba(255,255,255,.18);display:grid;place-items:center;
  font-size:13px;transition:transform .5s var(--ease)}
.pill:hover{background:rgba(255,255,255,.12)}
.pill:hover .dot{transform:translateX(3px)}
.pill.gold{background:var(--gold);border-color:var(--gold);color:#fff}
.pill.gold:hover{background:#B8931F}
.pill.dark{border-color:var(--line);color:var(--brown);background:transparent}
.pill.dark .dot{background:rgba(96,56,19,.08)}
```

The asymmetric padding (`13px 10px 13px 26px`) exists to make room for the
trailing circular dot, which slides 3px right on hover. `min-height:46px` keeps
it a legal touch target. `#B8931F` is the only hardcoded colour in the system,
and it is just gold darkened one step for hover.

---

## 5. The grain overlay

One rule, on every page, and the single move that stops flat ivory reading as a
default background:

```css
body::after{content:"";position:fixed;inset:0;z-index:80;pointer-events:none;
  opacity:.05;mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,...feTurbulence type='fractalNoise'
    baseFrequency='0.85' numOctaves='2'...")}
```

A 160x160 inline SVG fractal-noise tile at 5%, multiplied, fixed so it does not
scroll with the content. Zero network cost. `pointer-events:none` is essential
or it eats every click on the page.

---

## 6. Radii, shadows, motion

**Radii.** 51 uses of `999px` (every pill, chip, badge, tag), 32 of `50%` (dots,
knobs, thumbs). Media frames sit at 26px, 22px, 20px, 18px depending on size,
and **phones drop one step** (a 18px tile becomes 14px), because the same radius
reads as heavier on a small screen.

**Shadows.** Two do almost all the work:

```css
/* a border pretending to be a shadow, so it can animate */
box-shadow: 0 1px 0 var(--line-soft);
/* the panel lift */
box-shadow: 0 26px 64px rgba(28,16,6,.18);
```

The family rule: **blur is 3 to 4x the Y offset, alpha never above .35 on light
grounds, and the colour is always the warm brown-black `rgba(28,16,6,…)`, never
`#000`.** Dark bands need a deeper drop (`rgba(20,12,4,.5)`).

Two structural uses worth stealing: a focus ring applied as
`0 0 0 2px var(--gold-soft)` so it follows the border radius, and a current-page
underline as `inset 0 -1px 0 var(--gold-soft)`.

**Motion.** One easing token for the entire site,
`--ease:cubic-bezier(.23,1,.32,1)`. Everything the visitor operates settles
under 0.7s (0.25s for small buttons, 0.5s for nav and pills, 0.55s for a
slide-over). Only content reveals run longer (1.1s), and only Ken Burns runs
very long (40 to 52s).

Image hover uses **inverted zoom**: rest at `scale(1.04)` and relax to `1.00`
over 1.2 to 1.4s. It feels like settling rather than lunging, and it makes an
edge gap structurally impossible.

---

## 7. The reveal

Identical on every page:

```js
gsap.to(els, { opacity:1, y:0, duration:1.1, ease:'power4.out',
               stagger:0.12, overwrite:true })
ScrollTrigger.batch('.rv', { start:'top 86%', onEnter:showEls })
```

with `.rv{opacity:0;transform:translateY(46px)}` at rest. Denser grids use
`stagger:0.08` and `start:'top 92%'`.

**Critical cleanup**, learned the hard way: on complete, remove the `.rv` class
and call `gsap.set(el,{clearProps:'transform,opacity'})`. A residual transform
on an ancestor becomes the containing block for any `position:fixed` child, so a
slide-over panel silently breaks on mobile with no error anywhere.

Also plan for the reveal never firing. Three layered failsafes so a page can
never render blank: a settle timeout, a force timeout, and a standalone
`<script>` that runs before everything else and removes the resting state if the
main script died.

---

## 8. Signature moments

**Compare slider.** Two stacked images, a draggable knob, and a label that says
what to do ("Drag the line to move the sun"). Requires `touch-action:pan-y` on
the drag surface or the page stops scrolling on phones.

**Proof pair.** Two frames side by side captioned `THE RENDER` and
`BUILT · PHOTOGRAPHED`. The whole trust argument in one component.

**Provenance chip.** A translucent dark glass chip on every image naming what it
is. The photograph variant upgrades to a gold border and gold text, so the real
thing is the only thing allowed to wear gold. See `copy.md` section 4.

**Stat row.** Big numbers at `clamp(34px,3.4vw,52px)` over tracked micro labels.
Use real figures only.

**Bento gallery.** 12 columns, because 12 divides by 1, 2, 3 and 4. Express the
layout as a repeating array of `{n, aspect}` rows and run a pass before first
paint, so every filter state stays flush **by construction** and no tile is ever
left alone on a square row.

**Affordance-labelled rail.** A horizontal carousel whose label reads
"SWIPE, DRAG, OR USE THE ARROWS". Apply the overflow fade mask only while
content is genuinely off-screen (`scrollWidth - clientWidth > 4`), otherwise a
rail with one item gets dressed up as a scrollable list.

---

## 9. Instrument-register components

**Bottom tab bar.** Four destinations, icon plus label, `--tabbar-h` as a token
so every scroll container can account for it. This is the single change that
makes a web page feel like an app.

**Event card.** Category chip, availability (`3 of 12 places` or `Full`), title,
then a metadata line of date, time, venue and price, then transit distance
("8 min from Harbor Station, north exit"). Every field is a real fact. The card
is mostly information, which is why it survives being seen fifty times.

**First-run coach overlay.** A scrim, a card, `1 of 3`, a title, two sentences,
Skip and Next. Keep it to three steps, give each a real reason to exist, and
have the copy teach trust rather than point at buttons: "The dates and the
places left are counted out of the database as the page is built, not written by
hand."

Store the dismissal and check it **before** navigating, and know whether it
lives in `localStorage` or a cookie, because every audit and screenshot run
needs to skip it.

---

## 10. Hard-won interaction lessons

Each of these cost real time. The comments in the source state the failure they
prevent, which is the habit to copy.

- **Scroll-scrub smoothing must be time-based, not frame-based.**
  `chase += (t - chase) * (1 - Math.exp(-dt / 0.07))` with `dt` capped at 0.1s
  feels identical at 60Hz and 120Hz. A fixed lerp factor accumulates lag on
  high-refresh displays.
- **A video seek lock must retry, not merely unlock.** Browsers swallow
  `seeked`, and a watchdog that only clears the flag leaves the film stranded
  short of its target. Re-call the pump after ~400ms, and use a small deadband
  (`|target - current| > 0.02`) so you do not seek forever.
- **Touch move can deliver two events in the same millisecond.** Sampling
  velocity across a near-zero `dt` seeds a huge spike that release inertia then
  flies away on. Only sample when `dt >= 4ms`, and clamp to ±2px/ms.
- **Any element sharing a row with a draggable track needs a fixed width.** A
  read-out column that resized with its own label dragged the track out from
  under the thumb mid-gesture.
- **Set the drag thumb's `transition:none` while dragging** and restore it for
  taps and keys. Otherwise the thumb lags the finger, or a tap teleports.
- **`touch-action:pan-y` on every horizontal drag surface.** This is what keeps
  the page scrollable while the widget stays draggable.
- **Use `svh` for a pinned hero on desktop but `dvh` on phones.** `svh` leaves a
  band beneath the film as the Safari toolbar collapses; `dvh` tracks it.
- **Reduced motion is a layout decision, not an animation switch.** A 400vh
  scroll runway that exists only to drive a scrubbed film must collapse to one
  screen, and whatever the scrub would have revealed has to be shown statically.
- **A loading veil needs at least two escape hatches outside its own logic**,
  one of them in a separate `<script>` that runs first. If the main script dies,
  the visitor is otherwise trapped behind an opaque panel forever.
- **Send `cache-control: no-cache` on the document.** Safari heuristically caches
  page HTML, so a phone can serve a week-old page, and its stale script URLs, for
  days after a green deploy. Revalidating a 60KB document is cheap.
- **Nesting an interactive iframe in a lightbox** needs three things: set
  `src='about:blank'` on close or its render loop stays resident, call
  `stopPropagation()` on Escape so one keypress closes exactly one layer, and
  exempt the inner overlay from the outer panel's focus trap.

# Taste: what "good" means in this house

Read this when deciding whether something is finished, and again before showing
work to anyone. The second reading is the one that saves you, because the
critique that lands hardest is the one you could have given yourself.

## Contents

1. The two registers, concretely
2. The five laws, turned into checks
3. The failure catalogue (the real critique vocabulary)
4. The reverted redesign: the most instructive failure in the archive
5. Colour grammar as navigation
6. Where this house and `impeccable` genuinely disagree
7. Bilingual (Thai and Latin) rules
8. The self-check before any review

---

## 1. The two registers, concretely

### Cinematic (AURA Heights)

Warm ivory ground, brown ink, a single gold accent, a display serif with a
letterspaced humanist sans and one script face used almost never. Sections are
full-bleed and narrative. The user scrolls through an argument.

The stack, exactly as it shipped in the client work this style distills:

```css
--ivory:#F7F2E9; --cream:#FDFAF3; --brown:#603813; --ink:#40301D;
--soft:#7A6448;  --gold:#C9A227;  --gold-soft:#D9B351; --gold-ink:#8A6A11;
--line:rgba(96,56,19,.16); --line-soft:rgba(96,56,19,.09);
--serif:'Cormorant Garamond',Georgia,serif;
--sans:'Tenor Sans',system-ui,sans-serif;
--script:'Sacramento',cursive;
--ease:cubic-bezier(.23,1,.32,1);
```

One easing curve for the entire site. That single decision does more for
coherence than any amount of per-component tuning.

### Instrument (The Assembly)

Paper white with a warm secondary surface, green-tinted near-black ink, one sans
carrying both Thai and Latin, and colour reserved almost entirely for state and
category. Content is dense, card-based, and reachable from a bottom tab bar.

What makes it good is not the palette, it is that **the tokens are semantic**.
See `tokens.md`; the short version is radius by role (`--r-control`,
`--r-media`, `--r-sheet`, `--r-commit`), colour by state (`--few`, `--full`,
`--error`), a named z ladder, and app-chrome heights as tokens.

### Choosing

If the user is deciding whether to care, go cinematic. If they are trying to
finish a task, go instrument. When a product needs both, build a cinematic front
surface sitting on an instrument, sharing one token file. Do not average them.

---

## 2. The five laws, turned into checks

The laws are in SKILL.md. Here they are as things you can actually verify.

**Specificity.** Scan every string of user-facing copy. Any adjective doing the
work of a number ("spacious", "convenient", "premium", "many") is a defect. Can
it be replaced with 217.40 sqm, 8 minutes, 3 of 12? Placeholder text and
`Feature One` are the extreme case and must never survive to a review.

**Proof.** For each claim on the page, name the evidence sitting next to it. If
there is none, either find it or cut the claim. Sceptic test: would someone who
assumed you were exaggerating be satisfied by what is on screen?

**Tinted neutrals.** Grep the stylesheet for `#fff`, `#ffffff`, `#000`,
`#000000`, `white`, `black`. Each hit is either a deliberate, defended choice or
a defect. Every neutral should lean toward the brand hue.

**Affordance.** List every element that responds to drag, swipe, scrub, pinch,
long-press, or hover. For each, name the thing on screen that tells a
first-time visitor on a phone that it does. Hover-only reveals do not count,
because there is no hover on a phone. Words are allowed and often best: "SWIPE,
DRAG, OR USE THE ARROWS" is not a failure of elegance, it is the house style.

**Density on mobile.** At 375px, count how many full-height sections stand
between the user and the primary action. In the instrument register, more than
one is usually a defect.

---

## 3. The failure catalogue

These are the actual words used when work is rejected. Each is a defect class
with a real cause and a real fix. Learn to see them before they are said.

| Verdict | What it usually means | The fix |
|---|---|---|
| **"cluttered"** | Too many competing weights or sizes in one region; no clear first read | Cut one level of hierarchy; raise contrast between the remaining two |
| **"chopped off"** | Fixed heights, `overflow:hidden`, or a background image with the subject outside the crop box | Re-crop to the subject; use `object-position`; test at 375 and 1280 |
| **"out of place"** | Component borrowed from another visual system (wrong radius, shadow, or type) | Rebuild from tokens; nothing bespoke |
| **"odd"** | Something physically implausible: light from nowhere, furniture floating, a curtain that reads as an office blind | Fix the referent in the real world, not the pixels |
| **"over complicated"** | Interface exposes structure the user did not ask about | Show the conclusion; move detail behind a disclosure |
| **"too generic" / "ai slop"** | The palette and type are guessable from the category name | Run the benchmark-then-diverge method below |
| **"negative empty space"** | Cinematic spacing applied in an instrument context | Compress; raise density; kill full-viewport sections |
| **"too much scrolling"** | Information architecture is a list when it should be a facet | Add filters, tabs, or a bottom nav; put the payload above the fold |
| **"irrelevant"** | A section exists because the template had one | Delete it |
| **"not seamless"** | A transition, a panorama seam, or a video loop shows its joins | Fix the join at the source; for panoramas, bake the crossfade |

### Benchmark, then diverge

The anti-slop method, exactly as it was asked for: look at the best real
products solving the same problem, then build our own thing.

1. Name three real products (The Assembly used ClassPass, Airbnb, Agoda).
2. Write one sentence each on the **mechanism** they get right, not the look.
3. Adopt mechanisms. Never adopt skins.
4. Write one sentence on what this brand does differently and why it must.

If you cannot complete step 4, you do not yet have a design, you have a
reference.

---

## 4. The reverted redesign

Mid-project, a large "make it minimal" refactor shipped and was rejected
outright. The verdict, paraphrased, named eight defects at once: cluttered,
poorly organised, weak placement, not mobile optimised, key lists hard to find,
too much scrolling to navigate, header and text overlapping on desktop, an
over-long gallery, and an overall feel cheaper than before.

Three lessons, all expensive:

1. **Roll back first, replan second.** The instruction was to revert the live
   site immediately, then discuss. Do not defend a rejected direction while it
   is still live.
2. **A refactor that touches layout everywhere is a redesign**, and it needs the
   same brief-and-gate treatment as new work. "Minimal" is not a brief.
3. **"Looks cheaper than before" is the summary verdict to fear.** It usually
   means density dropped, specificity dropped, or the type scale flattened.

## The device-branch rule

When the request is "design it like a web app so it works whether you are on
phone or desktop", the correct move is to **delete the device branch, not add a
second layout**. On AURA Heights this meant the unit panel became a slide-over with a
scrim at every width, and every `isDesk()` branch was removed. One interaction
model at every breakpoint is both less code and more coherent.

---

## 5. Colour grammar as navigation

From the tour, and worth generalising: colour can carry wayfinding if you assign
it a grammar and then never break it.

- **Gold fill**: the single next action on this screen. One per screen.
- **Brown fill**: where you currently are.
- **Outline**: available, not current, not primary.

The same idea appears in the instrument register as "the primary button has no
accent colour, it is the maximum-contrast object on the page, one per screen".
Either grammar works. Mixing two grammars does not.

Related discipline: in one shipped booking system, the glow token was allowed to mount
**only** on `[data-live="true"]` and was lint-banned from `:hover`, `:focus` and
`:active`, with review enforcing "max one halo per screen". If an effect means
something, protect its meaning mechanically.

---

## 6. Where this house and `impeccable` disagree

`impeccable`'s brand reference keeps a reflex-reject font list, and it includes
**Cormorant Garamond** and **Playfair Display**, on the sound argument that they
are the training-data reflex for "luxury".

The shipped project behind AURA Heights carries Cormorant Garamond, and it
landed with customers.

Both things are true, so hold the tension honestly rather than picking a side:

- The reflex warning is correct **as a default**. Reaching for Cormorant because
  the brief says "luxury condo" is exactly the failure mode.
- What rescues AURA Heights is not the font, it is everything around it: a warm ivory
  ground rather than white, `Tenor Sans` (an unusual, slightly awkward humanist)
  as the working face, one script used once, self-hosted subsets, and copy with
  real numbers in it. The serif is the least load-bearing part of the system.

**So: inherit the role structure, not the font names.** The structure is one
display serif, one letterspaced humanist sans for eyebrows and UI, and at most
one script for a single signature word. Then run `impeccable`'s four-step font
selection procedure to fill those three roles for the brand in front of you. If
it lands on Cormorant again after genuinely considering alternatives, that is a
choice rather than a reflex, and it is fine.

---

## 7. Bilingual: Thai and Latin

Most of this house's clients are Thai. These rules were learned the hard way and
are not optional.

- **Prefer one face that carries both scripts.** The Assembly uses `LINE Seed Sans TH`,
  which removes an entire class of fallback bugs.
- **Thai needs more leading.** Set a dedicated `--lh-thai` (1.65 was the measured
  value in one shipped Thai-first system) and raise line-height by roughly +0.15 under `:lang(th)`.
- **Kill letter-spacing for Thai.** Tracking that flatters Latin caps breaks
  Thai.
- **There is no uppercase in Thai.** Uppercase letterspaced eyebrows, a
  signature move of the cinematic register, simply do not translate. Design a
  Thai equivalent rather than transliterating the trick.
- **Thai rows need more height**: 36px against 32px for Latin was the measured
  answer in one system.
- **Thai overflow is fixed with explicit `line-height` locks**, not by shrinking
  the font until it fits.

### Four Thai traps that have actually shipped bugs

1. **The baht sign can read as a dollar sign.** In several faces `฿` is drawn as
   a B with a single vertical stroke and, at small sizes, Thai readers parse it
   as `$`. Check the glyph at the size you actually render, and consider writing
   `THB` where the amount matters.
2. **`Noto Sans Thai` contains no Latin glyphs.** Set it alone and "AI" falls
   back and can render as "Al". Always pair it with an explicit Latin face, or
   use a dual-script family such as `LINE Seed Sans TH`.
3. **PDF scrambles Thai on copy and paste.** When a client needs to reuse text,
   deliver DOCX. This is why brand assets arrive as `.docx` in this house.
4. **Word carries a separate `szCs` attribute** for complex-script size. Change
   only the Latin size and Thai silently keeps the old one.

One editorial rule worth carrying across both languages: **a negation plants the
accusation it denies.** "We are not a course seller" makes the reader think
about course sellers. State the positive instead.

---

## 8. The self-check before any review

Run this before handing over a link. It is short on purpose so it actually gets
done.

1. Loaded at **375px**, **768px**, and **1280px**, with a screenshot of each.
2. Every interactive thing has a visible affordance at 375px.
3. No `#fff` or `#000`; every neutral tinted.
4. No placeholder copy; every vague adjective replaced by a number or cut.
5. Every claim has its proof adjacent.
6. No em dashes or en dashes anywhere.
7. Navigation is identical in structure on every page.
8. Contrast **measured** from rendered pixels, not estimated from tokens. See
   the next point, it is a real scar.
9. The primary action is unmistakable and singular on each screen.
10. Nothing is chopped off at any of the three widths.

**On measuring rather than estimating**: in a blind judging of three design
directions, the leading candidate was disqualified because it presented
estimated contrast ratios as measurements, and nine of them were off by more
than 0.35. A related finding from the same audit generalises well: **a hairline
border fails to be visible on any surface within about two lightness steps of
itself**, and eight of twenty measured cases fell below a 1.10 contrast
threshold. Sample the actual pixels.

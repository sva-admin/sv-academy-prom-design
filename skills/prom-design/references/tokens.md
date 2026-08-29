# Tokens: the design contract

Read this when starting a project or writing the design contract, before any
component exists. Retrofitting a type scale across forty files is how a week
disappears.

Both systems below were read from shipped client work (renamed here to the
fictional brands), so they are what actually shipped rather than planned.

## Contents

1. The rule that makes tokens work
2. System A: AURA Heights (cinematic)
3. System B: The Assembly (instrument)
4. The five semantic patterns worth stealing
5. The three-layer architecture, for larger systems
6. Build gates that keep the contract honest
7. Font loading

---

## 1. The rule that makes tokens work

**No raw hex, `rgb()`, `hsl()`, or px value may appear in a component.** Tokens
are not documentation, they are the only source of truth, and the only way that
survives contact with a deadline is to enforce it mechanically. See section 6.

A token file that components ignore is worse than no token file, because it
tells you the system is fine while the drift happens.

---

## 2. System A: AURA Heights (cinematic)

```css
:root{
  /* ground and ink, never white, never black */
  --ivory:#F7F2E9;   /* page ground */
  --cream:#FDFAF3;   /* raised surface */
  --ink:#40301D;     /* body text, warm brown-black */
  --brown:#603813;   /* brand, headings, current-location fill */
  --soft:#7A6448;    /* secondary text */

  /* one accent, three weights */
  --gold:#C9A227;      /* the single next action */
  --gold-soft:#D9B351; /* hover, gradients */
  --gold-ink:#8A6A11;  /* gold text on light ground, for contrast */

  /* lines derived from the brand hue, never neutral grey */
  --line:rgba(96,56,19,.16);
  --line-soft:rgba(96,56,19,.09);

  /* three type roles */
  --serif:'Cormorant Garamond',Georgia,serif;   /* display only */
  --sans:'Tenor Sans',system-ui,sans-serif;     /* everything working */
  --script:'Sacramento',cursive;                /* one word, rarely */

  /* one curve for the entire site */
  --ease:cubic-bezier(.23,1,.32,1);
}
```

Three things to notice:

- **The lines are the brand hue at low alpha**, not grey. This is most of why
  the page feels warm even in regions with no colour.
- **`--gold-ink` exists because `--gold` fails contrast as text on ivory.** An
  accent usually needs a darker sibling for type. Budget for it.
- **One easing curve, everywhere.** Coherence for free.

Read the role structure, not the font names. See `taste.md` section 6 for the
honest disagreement with `impeccable` about Cormorant.

---

## 3. System B: The Assembly (instrument)

Abridged to the load-bearing parts.

```css
:root{
  /* surfaces */
  --paper:#FFFFFF; --paper-2:#F3EEE3; --surface-2:#E9E2D2; --card:#FFFFFF;

  /* a three-step line ramp, so borders can express hierarchy */
  --line:#E2DCCB; --line-mid:#C9C2AE; --line-strong:#8E897A;

  /* ink ramp, green-tinted near-black */
  --ink:#141A18; --ink-2:#4A5250; --ink-3:#63625A;

  /* action colour is called signal, not primary */
  --signal:#000000; --signal-hover:#1E241F;
  --signal-wash:#E7F2EF; --signal-ink:#E1FECC;

  /* state as tokens, this is the good bit */
  --few:#8F5500;    /* few places left */
  --full:#5B6360;   /* sold out */
  --error:#A81E14;

  /* elevation as ring plus shadow */
  --lift-1:0 0 0 1px rgba(20,26,24,.08),0 1px 2px rgba(20,26,24,.05);
  --lift-2:0 0 0 1px rgba(20,26,24,.05),0 6px 16px rgba(20,26,24,.10);
  --lift-3:0 12px 32px rgba(20,26,24,.16);

  /* radius by ROLE, not by size */
  --r-control:10px; --r-media:14px; --r-sheet:20px; --r-commit:999px;

  /* named z ladder, no raw z-index anywhere */
  --z-bar:45; --z-scrim:48; --z-header:50; --z-menu:52; --z-viewer:60;

  /* semantic type scale */
  --t-micro:.8125rem; --t-meta:.875rem; --t-body:1rem; --t-lede:1.125rem;
  --t-card:1rem; --t-sec:1.375rem; --t-h1:2rem;
  --t-hero:min(4.9vw + 1.5rem,4.25rem);

  /* spacing, 4px base */
  --s1:4px;  --s2:8px;  --s3:12px; --s4:16px; --s5:24px; --s6:32px;
  --s7:48px; --s8:64px; --s9:96px; --s10:144px; --s11:200px;

  /* layout */
  --pad:clamp(20px,4vw,32px); --shell:1240px; --measure:62ch;
  --band:clamp(32px,6vw,96px);

  /* app chrome, this is what makes it feel native */
  --header-h:52px; --tabbar-h:58px; --actionbar-h:68px;

  /* one face for Thai and Latin */
  --ui:'LINE Seed Sans TH',system-ui,-apple-system,'Segoe UI',Roboto,'Noto Sans Thai',sans-serif;
}
```

Category colours are a triad per category, which scales cleanly:

```css
--cat-sailing:#0E63A8;  --cat-sailing-wash:#E7F0F8;  --cat-sailing-beacon:#5AB0EE;
--cat-dining:#B3341F;   --cat-dining-wash:#F9EBE7;   --cat-dining-beacon:#F4785C;
--cat-wellness:#0F7A62; --cat-wellness-wash:#E6F2EE; --cat-wellness-beacon:#3FC6A0;
--cat-sport:#3C3F96;    --cat-sport-wash:#EAEBF6;    --cat-sport-beacon:#8B92F0;
--cat-art:#6B3AA0;      --cat-art-wash:#F1EAF7;      --cat-art-beacon:#C089F0;
```

`base` for text and icons, `wash` for the chip background, `beacon` for the
bright dot or highlight that has to survive on a photograph.

---

## 4. The five semantic patterns worth stealing

These generalise far beyond these two projects, and they are the real lesson of
the token files.

**1. Radius by role, not size.** `--r-control` (10px) for buttons and inputs,
`--r-media` (14px) for images, `--r-sheet` (20px) for modals and drawers,
`--r-commit` (999px) for the pill that commits an action. When a designer asks
"is this a `--r-md` or `--r-lg`?" the answer is a coin flip. When they ask "is
this a control or a sheet?" the answer is obvious, and the system stays
coherent as it grows.

**2. State as a token.** `--few` and `--full` are not colours, they are product
facts that happen to have colours. Naming them this way means the scarcity rule
lives in one place, and a designer cannot accidentally use "the orange" for
something that is not scarcity.

**3. Elevation as ring plus shadow.** `0 0 0 1px rgba(...)` combined with a soft
drop shadow reads as crisp on both light and dark surfaces, where a plain
`box-shadow` goes muddy. Three steps is enough.

**4. Named z ladder.** Eight or fewer named levels, and raw `z-index` forbidden
in components. This single rule eliminates the entire category of z-index bugs.

**5. App chrome as tokens.** `--header-h`, `--tabbar-h`, `--actionbar-h` let
every scroll container, sticky element, and safe-area calculation reference the
same numbers. Without these, the bottom tab bar covers content on exactly one
device and nobody can work out why.

Two more worth carrying: a **three-step line ramp** so borders can express
hierarchy instead of just existing, and `--measure` (62ch here) so text columns
never need a magic max-width.

---

## 5. The three-layer architecture, for larger systems

When a product has more than one brand direction or theme, three cascading
layers keep it sane:

**scale** (raw, brand-free) then **semantic** (roles) then **direction**
(the brand's answer).

Scale layer, proven shape:

- Space `--space-0..8` = 0, 4, 8, 12, 16, 24, 32, 48, 64.
- Radius `--r-sm` 4, `--r-md` 8, `--r-lg` 12, `--r-xl` 16, `--r-pill` 999,
  each multiplied by a `--r-unit` that the direction layer supplies, so one
  variable resets the whole system's softness.
- Fluid type ramp with `clamp()` between 390px and 1440px viewports, seven
  steps from 11px to 48px. Keep the max at roughly 2.5x the min or the jump
  becomes unreadable mid-range.
- Line heights `--lh-tight` 1.2, `--lh-body` 1.5, `--lh-thai` 1.65. Putting
  Thai leading in the scale layer means every component inherits it for free.
- Motion `--t-micro` 150ms, `--t-state` 250ms, `--t-narrate` 400ms, scaled by a
  `--motion-unit`.

Themes should ship with **byte-identical token key sets**, and the build should
fail if they diverge. Otherwise one theme quietly loses a token and a component
renders invisible.

A real bug worth designing against: a border token that equals an elevated
surface token makes that surface invisible. Keep border values deliberately
unequal to any surface value.

---

## 6. Build gates that keep the contract honest

Two small scripts did more for quality than any review:

**Token gate.** Scan every source file outside the token directory for `#hex`,
`rgb(`, `hsl(`. Fail the build on a hit. Around 200 files scan clean in under a
second. Genuine exceptions (WebGL shader constants, for instance) get an inline
comment explaining themselves rather than a silenced rule.

**Copy gate.** Fail on em dashes and en dashes, on banned words, and on any
user-facing string that bypasses the translation function. This is how the
no-dashes rule stops being something a human has to remember.

**Contrast fixture in CI.** Render every text token on every surface token and
fail below 4.5:1, with disabled states explicitly exempted and annotated. This
is the mechanical version of "measure, do not estimate".

---

## 7. Font loading

Self-host `woff2` with `unicode-range` subsets and `font-display: swap`, and
preload only the two faces that appear above the fold. Both live sites do this
and it is a large part of why they feel instant.

One scar worth inheriting: assert fonts with `document.fonts.load(spec)` per
typeface, **not** `document.fonts.ready`. `ready` resolves prematurely against
an empty DOM, so a silent regression to a system fallback can ship without
anyone noticing.

Also set `font-variant-numeric: tabular-nums` on body. Prices, counts, times,
and floor numbers all align, and misaligned digits are one of those defects
people feel without being able to name.

---

## Six shipped directions, as derivation examples

Same laws, six subjects, six palettes. Use these as worked examples of
deriving tokens from a subject's world, never as a menu to copy from:

| Brand | Subject world | Ground | Ink | Accent, from what object |
|---|---|---|---|---|
| AURA Heights | warm coast, golden hour | `#F7F2E9` | `#40301D` | `#9C6B2F` brass railings |
| Ember Cafe | one room, one fire | `#1B1714` | ivory text | `#C4472E` the ember itself |
| Ledgerline | money that must add up | `#F2F4F6` | `#1E2630` | `#1E6B52` ledger green |
| Northlight | last hour of light | `#0E1113` | cool paper text | `#9FB6BF` ice on the lens |
| The Assembly | linen, smoke, a long table | `#F1F1EB` | `#22261F` | `#6E3B2A` oxblood chairs |
| Fern and Fog | a rainy hill town florist | `#EDF1EC` | `#24312A` | `#A65A33` fired-clay pots |


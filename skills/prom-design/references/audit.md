# The multi-lens audit

Read this before any customer preview. The question that triggers it is always
some version of "check and verify, I am about to show this to customers, no
loose ends".

One reviewer misses what a panel catches, but a panel that is not reconciled
produces noise. The shape below solves both, and it is drawn from a harness that
was actually run against The Assembly and AURA Heights rather than invented here.

`scripts/design-audit.mjs` generates a ready-to-run workflow with your project's
details filled in.

## Contents

1. Why this shape
2. The brief every lens shares
3. The finding schema
4. The five lenses
5. The rank phase, which is the part people skip
6. Defect vocabulary
7. Mechanical gates that stop regressions

---

## 1. Why this shape

Five principles do the work. If you adapt the harness, keep these.

**Parallel and sealed, then reconciled.** Lenses never see each other's output.
That way, when two lenses independently report the same defect, the agreement is
real corroboration rather than an echo. The ranker is the only agent that sees
everything.

**Rank is falsification, not formatting.** The ranker re-checks every "broken"
claim against the actual source and drops or downgrades what it cannot confirm.
The justifying line is worth memorising: *auditors describing a tree from memory
get things wrong*. An audit that only formats findings will confidently hand you
things that are not true, which costs more time than it saves.

**Supply the priors.** Tell each lens what probably went wrong. "This codebase
just went through a rapid redesign; a bottom dock, a segmented nav, a first-run
tour, a category picker and filter tags all landed fast; things will have been
left half-finished. Assume nothing is fine because it looks fine." That converts
a vague sweep into a hunt.

**Give each lens a different instrument.** Driving the browser, reading
screenshots, sampling pixels, reading source statically, reading the seed data.
Same schema, five different ways of knowing. Five agents with the same
instrument produce one opinion five times.

**Let severity encode the business.** `broken` outranks `polish` because the run
exists to win a deal, and the ranker is told so in those words.

---

## 2. The brief every lens shares

Put these five things in the shared context block, in this order:

1. **What the product is and what is commercially at stake.** The auditor cannot
   rank by impact without knowing what impact means here.
2. **The architecture in one paragraph.** Naming "server-rendered, no build step,
   no client framework, all CSS inlined from one file" lets an auditor make
   categorical claims instead of hedged ones.
3. **Where the law lives.** Paths to `DESIGN.md` and `AGENTS.md` or their
   equivalents.
4. **The prior that primes suspicion**, naming the components that shipped most
   recently.
5. **Tooling with the gotchas pre-solved.** This is the part most audits omit and
   it is why they stall. Include the exact local URL and port, the Playwright
   path, how to skip or trigger the first-run tour and whether it lives in
   `localStorage` or a cookie, how to set the theme, and a working sign-in
   recipe with real selectors.

Then the rules paragraph, which is worth lifting close to verbatim:

> Every finding must name the route, the exact selector or `file:line`, the
> MEASURED evidence (a number, a status code, a console error, a screenshot
> observation), and a concrete fix. No speculation, no "might be", no padding.
> If your area is clean, say so in one line. Never use em dashes or en dashes.
> Your output is raw material for a fixer, not prose for a human.

Four separable rules there: location plus measurement plus fix or it is not a
finding; hedges are banned; a clean area is a one-line result rather than
silence; the output is machine feedstock, so narrative filler is a defect.

---

## 3. The finding schema

```js
const FINDINGS = {
  type: 'object',
  properties: {
    findings: { type: 'array', items: { type: 'object',
      properties: {
        severity: { type:'string', description:'broken | half-finished | risk | polish' },
        where:    { type:'string', description:'route and/or file:line' },
        what:     { type:'string', description:'the defect, with the measured evidence' },
        fix:      { type:'string', description:'the concrete change' },
      }, required:['severity','where','what','fix'] } },
    cleanAreas: { type:'array', items:{ type:'string' } },
  },
  required: ['findings','cleanAreas'],
}
```

Two choices to keep. **The severity vocabulary is product-shaped**, and
`half-finished` is the point: it catches work that no pass/fail test can see
because nothing throws. **`cleanAreas` is required**, which forces each lens to
state its negative space so the ranker can tell "nobody looked" from "somebody
looked and it was fine".

---

## 4. The five lenses

### Lens 1, flows: drive the product

"Find what is BROKEN, not what is ugly." Then walk real journeys, signed out and
signed in, including every form submitted empty as well as valid.

Four coverage patterns generalise to any product:

- **State transition**: the whole journey signed out, then again signed in.
- **Dismissal**: everything that opens must close three ways, by its own
  control, by Escape or Close, and by browser Back.
- **Boundary**: empty, valid, and one over the limit. If a field caps at 100
  characters, send 101.
- **Console capture as a standing tax**: record console and page errors on every
  single navigation and report all of them.

### Lens 2, visual: three widths, and actually look

Screenshot every route at 320, 390 and 1440, then **read the images**. A lens
that does not look at its own screenshots is a lens that reports nothing.

Enumerate the routes explicitly, covering each page archetype plus filtered and
unfiltered states.

Defect vocabulary to hand it: overlapping elements, clipped text, broken
spacing, orphaned headings, empty containers, elements that render with no
content, duplicated content, sections that look unfinished, wrong image aspect
ratios, and anything that simply reads as a bug to a person looking at it.

Bolt on one hard measurement: **report `document.body.scrollHeight` per route**
and flag anything absurdly long. That turns the taste complaint "too much
scrolling" into a number you can track.

### Lens 3, contrast: sample the rendered pixels

The most transferable idea in the whole method:

> Compute real contrast by sampling the rendered pixels rather than trusting
> computed styles, because much of this product sets text over photographs where
> the CSS background is transparent.

Report anything under 4.5:1, or 3:1 at 24px and above, naming the element and
the measured ratio. Walk both themes. Supply the prior if one theme was retuned
late. Name the surfaces that must not be skipped: the dock, the header and
account menu, the first-run tour, every pill and chip, anything over an image.

Cross-check statically as well: grep the stylesheet for hex literals outside the
palette objects and check each renders acceptably.

### Lens 4, code: read, do not drive

No browser. Every finding carries `file:line`. Hunt dead components, props and
CSS classes, near-duplicate rules that should collapse, selectors that can never
match, props threaded but ignored, TODOs, commented-out code, and anything left
half-migrated.

The high-yield check, where CSS is centralised, is **bidirectional**: every
class rendered in source has a matching rule, and every non-trivial rule is
actually rendered somewhere. List both directions. One direction alone finds
half the rot.

### Lens 5, content and data

All four jobs are quantitative:

1. **Inventory credibility.** Exact counts per category and per axis. A category
   with one thin entry and no dates looks broken in a demo even though nothing
   is broken.
2. **Asset utilisation.** Which supplied photographs are used, which are not, and
   which entities are rendering a generated fallback instead of a real photo.
3. **Copy defects.** Placeholder, lorem, TODO, invented filler, repeated
   sentences, statements that contradict each other across screens. Check for em
   dashes and en dashes **in the rendered HTML**, not the source, because that is
   where the rule actually applies.
4. **Temporal validity.** Every seeded date genuinely in the future, nothing
   rendering as invalid.

---

## 5. The rank phase

Flatten the five schema'd results into one digest, then give one agent the tech
lead role with this framing: *five auditors worked in parallel and did not talk
to each other*.

Its six duties:

1. **Dedupe**, merging the same defect found under different names, and record
   which lenses saw it, because multi-lens agreement is evidence worth keeping.
2. **Verify what matters.** Check every `broken` claim against the real source.
   Drop or downgrade anything unconfirmed and say that you did.
3. **Rank by user impact for this audience**, not by ease of fix. Something that
   stops a booking outranks a contrast nit.
4. **Per item**: one-line title, file and line, the exact fix, and whether it
   risks breaking existing tests. Naming the real test count in the prompt forces
   the ranker to think about the regression surface.
5. **List what is PENDING separately from what is broken**: started and not
   finished, or promised and never done. It is a genuinely different deliverable.
6. **End with the three things to fix first, and why.**

Keep the digest format and the artefact format identical, so the wire format is
the document:

```
[severity] where
  WHAT: ...
  FIX: ...
```

---

## 6. Defect vocabulary

The house critique words map onto audit lenses. See `taste.md` for the full
table with causes and fixes. Briefly: cluttered, chopped off, out of place, odd,
over complicated, too generic, ai slop, negative empty space, too much
scrolling, irrelevant, not seamless.

---

## 7. Mechanical gates

An audit finds what has already happened. Gates stop it recurring, and they are
cheap:

- **Token gate**: no hex, `rgb()`, or `hsl()` outside the token files.
- **Copy gate**: no em dashes or en dashes, no banned words, all user-facing
  strings through the translation function.
- **Contrast fixture in CI**: every text token on every surface, failing below
  4.5:1, with disabled states exempted and annotated.
- **Grep gates in the test suite** for whatever the last audit found, so each
  defect class can only be discovered once.

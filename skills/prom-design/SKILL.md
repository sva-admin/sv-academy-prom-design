---
name: prom-design
description: >
  Design and build client-ready websites and mobile web apps in a working
  studio's proven house style, shown throughout on two fictional brands
  (AURA Heights, The Assembly): tinted grounds, editorial typography,
  obsessive specificity, and proof over promise. Carries the full working
  loop (brief, design contract, build, review gate, multi-lens audit, ship),
  two verified token systems, signature component patterns, proof-driven
  copywriting, real-photography rules, and a mobile web-app playbook
  (density budget, bottom tab bar, compaction). Trigger on "make it look
  expensive", "make it beautiful", "high end design", "client ready",
  "on brand professional", "use the prom design style", "design this landing
  page", "make it more like an app", "too much scrolling", "add real images",
  "the site looks cheap", "too generic", "ai slop". Not for inventing a fresh
  visual direction from a blank brief: this skill applies ONE proven aesthetic.
---

# Prom Design

This style shipped real client work. The examples in this skill use two
fictional stand-in brands, **AURA Heights** (a beachfront condominium) and
**The Assembly** (a members' events web app), so the rules are shown at full
specificity without exposing any client. The rules are the transferable part.

Two public skills are referenced as optional companions: `impeccable` (design
review) and `design-dna` (screenshot to tokens). Everything here works without
them. The Blender 360 tour mentioned in places is a separate toolchain and is
not part of this skill.

## Start every job with the sixty-second intake

Do not build first and ask forgiveness later. When this skill is invoked, and
the user has not already answered these, ask BEFORE writing any code, in one
short message, plain words, no design jargon:

1. **What is this page for, and who lands on it?** (one line is enough)
2. **Should it sell or should it work?** Offer the registers as a plain choice:
   "a page that makes people want it (cinematic) or a page that gets things
   done (instrument)?" If they hesitate, recommend one and say why in one
   sentence.
3. **Anything that must stay?** Brand colors, a logo, existing copy.

Then do thirty seconds of thinking about the subject's WORLD before answering
(what materials, weather, rooms, and objects live in this business), and
present **two or three named directions**, each in one line: a name, the
ground tint and accent as real hex values, the face pairing, and why it fits
this subject. Recommend one and say why in one sentence. Example shape:

> 1. **Rain jar** (recommended): cool green-grey ground `#EDF1EC`, moss ink,
>    fired-clay accent `#A65A33`, Fraunces + Archivo. Fits a flower shop in a
>    rainy hill town: the palette is the shop's own window on a wet morning.
> 2. **Night market**: charcoal ground, paper-lantern amber accent,
>    Newsreader + Archivo. Moodier, better if evenings are the business.

End with "pick one, mix them, or say just build it." One round of questions,
maximum. The intake exists to make newcomers feel steered, never
interrogated, and the options exist so they choose by recognition instead of
having to describe taste they do not have words for.

## Mobile is the default, not the afterthought

Assume most viewers are on phones. These defaults apply to EVERY build unless
the user says otherwise, and they come from the webapp playbook
(`references/webapp.md`), which is not just for web apps:

- **Scroll budget.** A page should land its argument within about 3.5 phone
  screens (the density budget). When content wants to sprawl, compact it:
  facets, tabs, or a horizontal shadow gallery instead of another stacked
  section.
- **Side-scroll galleries carry an affordance.** Any horizontal scroller shows
  a peeking next card, a subtle edge fade, and on first view a brief swipe
  cue. Never a naked overflow that looks like the content just got cut.
- **Real tap targets.** Buttons and cards at thumb size (44px minimum), the
  primary action reachable in the bottom half of the screen, and a bottom tab
  bar the moment a product has three or more destinations.
- **Coach marks, once.** If a surface has a gesture the user cannot guess
  (swipe, long-press, drag), a one-time overlay teaches it, then never
  appears again.
- **The viewport meta is not optional**, and every page must measure
  `scrollWidth == viewport width` at 390px. Internal scrollers scroll
  themselves, the page never scrolls sideways.

The cinematic register on a phone is a smaller cinema: fewer sections, larger
type, the same argument. The instrument register on a phone should feel like
a native app, not a shrunk website.

## Why this skill exists at all

Most design skills, `impeccable` and `high-end-visual-design` included, are
built to invent a **fresh** point of view for every brief. That is correct for
agency work, and `impeccable` even warns itself against converging: if the last
surface was restrained-on-cream, the next one must not be.

This skill does the opposite on purpose. It carries **one aesthetic that has
already been paid for**, so a newcomer can produce work in that idiom without
having taste yet. Taste is the slow part. A proven system is the shortcut.

Use both. `impeccable` owns the universal laws (OKLCH colour handling, motion
curves, the six absolute bans, the AI-slop test). This skill owns the specific
house answer and the client workflow around it. Where they disagree, note it out
loud rather than silently picking, and see `references/taste.md` for the one
place they genuinely conflict (the serif choice).

## First decision: which register

Everything downstream depends on this. The two builds look nothing alike because
they answer different questions.

| | **Cinematic** (AURA Heights) | **Instrument** (The Assembly) |
|---|---|---|
| The user is | deciding whether to care | trying to get something done |
| Success is | a feeling, then an enquiry | a completed task, fast |
| Layout | full-bleed sections, scroll narrative | dense cards, facets, lists |
| Type | display serif + letterspaced sans | one sans, many sizes |
| Motion | ambitious, first-load allowed | functional only |
| Mobile | a smaller cinema | a native-feeling app with a tab bar |
| Verdict | marketing site, launch, brand | booking, dashboard, catalogue, account |

If the answer is genuinely both (a marketing front door plus a logged-in app),
build them as two registers under one token system rather than compromising into
a mush. The Assembly does exactly that: a cinematic home surface sitting on top of an
instrument.

Write the register down before touching a file. It decides the type stack, the
density, and what counts as a defect later.

## Second decision: the brand's own tokens

The register decides the architecture. The SUBJECT decides the palette and
the faces, and this is where most one-style skills go wrong: they ship one
palette and every client comes out beige. The law is the STRUCTURE of the
tokens, never one fixed set of values:

- **A tinted ground, any temperature.** Never pure `#FFFFFF` or `#000000`.
  The tint comes from the subject's material world: a florist in the rain is
  cool green-grey, a fintech ledger is cool paper-blue, a supper club is
  linen and smoke, a beachfront tower is warm ivory. Derive it, do not
  default to it.
- **Ink, not black.** A dark that carries the ground's temperature.
- **One accent, from an object the business actually owns.** Ember red from
  the oven, clay from the pots, ledger green from the money, gold from the
  brass. Name the object when you present the direction.
- **Faces carry the voice, so vary them.** A short vetted menu, all on Google
  Fonts, each with a voice: Cormorant Garamond (candlelit, classical),
  Fraunces (warm, contemporary, slightly soft), Newsreader (editorial, dry),
  Spectral (precise, technical warmth), Libre Caslon Text (bookish). Pair
  with one working sans: Archivo, Public Sans, or IBM Plex Sans. For Thai,
  Trirong (serif) and Sarabun (sans) carry both scripts honestly.
- **Banned regardless of brief:** the AI-slop pairings (Playfair Display over
  Montserrat, Inter for everything), purple-to-blue gradients, and reusing a
  previous client's palette because it worked there. Every demo brand in this
  repo runs a different direction derived this way; that variation is the
  proof the method works.

## The five laws

These are the load-bearing ideas. Everything else is detail. Each is drawn from
what actually shipped, and each has a reason, because a rule you understand
survives contact with a new situation and a rule you memorize does not.

### 1. Specificity is the luxury signal

Real numbers, real names, real distances. AURA Heights says "217.40 sqm", "38m above
the bay", "ninety seconds from the pier". The Assembly says "3 of 12 places", "09:20 to
14:05", "8 min from Harbor Station, north exit".

Vagueness reads as either hiding something or not knowing. Precision is
expensive to fake, so it signals the real thing. This is also the cheapest
upgrade available on any page: replace every "spacious residences" with the
square metres and the page gets more premium without a single CSS change.

Corollary: **placeholder content is a design defect, not a content to-do.**
Lorem ipsum and "Feature One" hide exactly the quality this style depends on.

### 2. Proof over promise

Every claim carries the evidence next to it. AURA Heights does not say the views are
beautiful; it flew a drone to the exact position of nearly every residence and
says "Not an artist's impression. Your view, on file." It does not say the
materials are good; it says every material in the renders exists today in the
sales gallery, go and touch it. It shows the render and the photograph side by
side and invites the comparison.

The Assembly applies the same move to onboarding: "The dates and the places left are
counted out of the database as the page is built, not written by hand. When a
table fills, this number drops."

When you write a claim, ask what would make a sceptic believe it, then put that
thing in the layout. This is what separates the style from ordinary luxury
pastiche, which asserts and hopes.

### 3. The ground is never white and the ink is never black

AURA Heights sits on `#F7F2E9` warm ivory with `#40301D` brown ink. The Assembly uses white
paper but a green-tinted `#141A18` ink and an `#F3EEE3` secondary surface.

Pure `#FFF` on pure `#000` is the default of something unconsidered, and the eye
reads the tint as intent even when it cannot name it. Tint every neutral a
little toward the brand hue. `impeccable` says the same thing in OKLCH terms and
its reasoning is worth reading.

### 4. Anything interactive must announce itself

This is the most-repeated correction in the entire project history, so treat it
as the house's sorest point. AURA Heights labels its carousel "SWIPE, DRAG, OR USE
THE ARROWS" and its comparison slider "Drag the line to move the sun". The 360
viewer got a side-arrow scroll cue specifically because a user could not tell it
was scrubbable.

A control that only reveals itself on hover does not exist on a phone. If a
thing can be dragged, swiped, scrubbed, or expanded, say so in words, show an
affordance, or animate a hint on first view. Discoverability is not decoration.

### 5. On mobile, density is respect

The instrument register exists because of a specific correction: too much
negative space and too much scrolling, most people are on a phone, and they
should not have to wade through sections. Build for the thumb: a bottom tab bar,
content above the fold, facets instead of endless scroll, and real information
on every card.

Airy full-viewport sections are a cinematic-register privilege. Spending them on
an instrument is a defect.

## The anti-slop clause

The sharpest critique this house gives is that a page reads as generic AI
slop, fonts included. The instruction that followed matters as much: look at
classpass.com, airbnb, agoda, then **create our own style**.

So the method is benchmark, then diverge:

1. Name three real products that solve a similar interaction problem well.
2. Say in one sentence each what they actually get right, mechanically.
3. Take the mechanism, never the skin.
4. State what this project will do differently, and why the brand demands it.

If the palette and type are guessable from the category name, it is the
training-data reflex and it has to be reworked. `impeccable`'s category-reflex
check covers this well.

## The loop

This is the sequence the good work actually followed. The gates are the point;
skipping them is how projects go wrong.

### 1. Brief, out loud, before any file

State the register, who the user is, what the one action is, and what the brand
already owns (logo, photography, a document, an existing site). Client assets
often arrive as a `.docx` or a folder of photos, so extract the real brand from
them rather than inventing one. `design-dna` is the right tool when a screenshot
or reference image is the input.

**Gate: say the plan before building it.** The standing instruction in this
house is to explain how you will do it first. This is not ceremony; it is the
cheapest possible place to catch a wrong direction.

### 2. Design contract

Lock the decisions before components exist, because retrofitting a type scale
across forty files is how a week disappears. Write tokens down, then treat them
as the only source of truth: no raw hex or px in components.

Both proven token systems are in `references/tokens.md`, including the semantic
patterns worth stealing wholesale (radius by role, colour by state, named
z-index, app-chrome heights). Read it before inventing your own scale.

### 3. Build

Component patterns with real markup are in `references/patterns.md`: the
section-header triple, the stat counter row, the affordance-labelled carousel,
the comparison slider, the proof pair, the event card, the bottom tab bar, and
the first-run coach overlay.

**If the register is instrument, read `references/webapp.md` before building
anything.** It carries the density budget (a real number you measure), the
footer tab bar spec, eleven compaction moves, and the delight components worth
their weight: the shadow coach overlay, the spotlight cutout, the shadow
gallery, tickers, skeletons and the sticky commit bar. It also covers borrowing
21st.dev components without inheriting their skin.

**Photography is not optional.** Zero images is a bug, not a restraint, and the
usual failure is a pretty image with the wrong context (a tropical beach on a
Chiang Mai page). `references/imagery.md` covers choosing for context, the free
sources and their licences, the Unsplash URL shape, how many and which, and the
labelling rules that keep stock imagery inside the honesty system.

Copy is part of the design, not a later pass. `references/copy.md` carries the
voice, which is the least copyable and most valuable part of the whole thing.

If the project uses the house engineering spine (Cloudflare Workers, Drizzle,
Wrangler, Vitest, a generated asset manifest), `references/stack.md` describes
it and the photo-derivative pipeline.

### 4. The localhost review gate

**Never push to show work.** The standing rule is to put it on localhost and
hand over the link first. Then verify it yourself before claiming it works, at
375px, 768px, and 1280px, because "I thought you checked everything" is what
gets said when a hero video silently fails on mobile.

`scripts/shots.mjs` captures the three widths in one command so review is a
glance rather than a chore.

### 5. Critique, in the house vocabulary

Work is reviewed with a small, consistent set of words. Treat each as a named
defect class and check for it *before* presenting, since finding your own faults
is much cheaper than being handed them:

cluttered · chopped off · out of place · odd · over complicated · too generic ·
ai slop · negative empty space · too much scrolling · irrelevant · not seamless

`references/taste.md` turns each into something checkable.

### 6. Multi-lens audit before any customer sees it

Before a client preview the question asked is always some version of "check and
verify, no loose ends". One reviewer misses things a panel catches, so fan out
across independent lenses and then verify each finding against the source before
keeping it, because unverified findings waste more time than they save.

`references/audit.md` describes the five lenses and
`scripts/design-audit.mjs` is a ready-to-run harness.

### 7. Ship, then check the live URL

Deployed is not done. Load the real domain on a real phone viewport and confirm
the thing you fixed is actually fixed in production.

## Cost gate for paid generation

If a step spends money (image or video generation, paid APIs), print the plan
and the expected cost and get a yes first. A costly render that came back wrong
after a long planning phase is a specific, remembered failure in this house. The
`generate` skill enforces budget caps and is the right front door.

## House hard rules

- **No em dashes or en dashes anywhere**, in code, copy, comments, or commit
  messages. Use commas, colons, periods, or parentheses.
- Mobile navigation is consistent on every page, and stale pages get deleted
  rather than left to rot.
- Self-host fonts as `woff2` and preload the two that matter. Both live sites do
  this; it is why they feel instant.
- Thai and Latin should share one face where possible. The Assembly uses
  `LINE Seed Sans TH`, which carries both and saves a whole fallback problem.
- Accessibility is not optional polish: real contrast, real focus states, real
  alt text. Sample rendered pixels rather than trusting the token values.

## What this skill bundles

```bash
# The review gate: every route, three widths, with the numbers that matter.
node ~/.claude/skills/prom-design/scripts/shots.mjs \
  --base http://127.0.0.1:8788 --routes / /gallery /contact --out ./shots
# reports HTTP status, scroll height in screens, horizontal overflow, broken
# images, rendered em/en dashes, console errors. Then LOOK at the PNGs.

# Generate the six-agent audit, with your paths and priors filled in.
node ~/.claude/skills/prom-design/scripts/design-audit.mjs \
  --repo /path/to/source --base http://127.0.0.1:8788 \
  --routes / /events --tests 271 --out ./audit-workflow.js
# then run it with your agent's workflow orchestrator if it has one, or hand
# each generated prompt to a subagent in sequence; both work.

# A copyable design contract to start from.
cp ~/.claude/skills/prom-design/assets/tokens-starter.css ./src/tokens.css

# Installed as a plugin instead of a plain skill? The files live in the plugin
# cache; locate them once with:
#   find ~/.claude/plugins -path '*prom-design*' -name shots.mjs
```

`shots.mjs` finds `playwright-core` in the npx cache on its own, so there is
usually nothing to install. If it cannot, it tells you the one command to run.

## Where to go next

Read the reference that matches the step you are on. They are written to be read
one at a time, not all at once.

| File | Read it when |
|---|---|
| `references/taste.md` | Deciding what "good" means here, or self-checking before a review |
| `references/tokens.md` | Writing the design contract or starting a new project |
| `references/webapp.md` | **The register is instrument.** Density budget, footer nav, compaction, the delight components, 21st.dev |
| `references/patterns.md` | Building a specific component |
| `references/imagery.md` | **Any page with photographs.** Choosing images with the right context, free sources, labelling, performance |
| `references/copy.md` | Writing any user-facing words |
| `references/stack.md` | Standing up the app skeleton or the asset pipeline |
| `references/audit.md` | Preparing for a customer preview |

The Blender 360 virtual tour is a different toolchain entirely and is not
part of this skill.

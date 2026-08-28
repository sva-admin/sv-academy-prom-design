# Copy: the voice

Read this before writing any user-facing words. Copy is not a later pass. On
both reference builds it is doing at least half the work of making the thing
feel expensive, and it is the part a competitor cannot screenshot.

## Contents

1. The headline formula
2. Eyebrows, captions, separators
3. Numbers
4. The honesty system, which is what clients actually loved
5. Register-specific voice
6. Voice extends to commits and comments
7. Bans

---

## 1. The headline formula

Every heading across all nine AURA Heights pages is built the same way: **a serif
sentence with exactly one word swapped into the script face.**

```html
<h1>Where the bay learns<br>your <span class="script">name</span></h1>
<h1>Choose your <span class="script">view</span> before you choose your home</h1>
<h1>The project, in plain <span class="script">numbers</span></h1>
<h2>The real view from <span class="script">your</span> floor</h2>
<h2>The showroom keeps our <span class="script">promise</span></h2>
<h2>Begin with a <span class="script">conversation</span></h2>
```

Rules that keep it from becoming a tic:

- **One script word per heading, never two in one line.**
- At most one script moment per section.
- The scripted word should be the one carrying the emotional claim
  (`promise`, `your`, `conversation`), not a noun that happens to be nearby.
- The sentence must still read correctly with the span removed. If it does not,
  the sentence is bad and the script is hiding it.

This single formula gives an entire site typographic coherence for free, and it
is why the pages look related even when their layouts differ completely.

In the instrument register there is usually no script face at all. The Assembly uses one
calligraphic line for the brand statement ("One table. Every door.")
and then nothing else, because a booking screen with decorative type in it reads
as unserious.

---

## 2. Eyebrows, captions, separators

**Eyebrows** are uppercase, heavily letterspaced, and short. They come from the
brand's own campaign language where it exists, and are operational where it does
not: `AN UNCOMMON EXPRESSION OF SEASIDE CALM`, `BEYOND ADDRESS, A HARBOUR
HEIRLOOM`, `QUIET LANDMARK`, `SIGNATURE FACILITIES`, `MEASURED. THEN BUILT.`,
`NOTHING RENDERED`, `ONE ADDRESS, TWO MOODS`, `THE FILM`.

Note how many are declarative fragments rather than labels. `NOTHING RENDERED`
is doing an argument's work in two words.

Remember that **uppercase does not exist in Thai**, so an eyebrow is a
Latin-only device. Design a Thai equivalent rather than transliterating it.

**Captions are always two lines**: a tracked uppercase provenance or location
line, then the name in the serif.

```html
<div class="floor">9TH FLOOR ROOFTOP · BUILDING A</div>
<div class="name">The Cliff Bath</div>
```

Giving an amenity its floor number is a small move with a large effect: it
converts a stock photograph into a specific place in a specific building.

**The separator is always `·` (middot).** Never a dash, never a pipe. This is
partly the house dash ban and partly that the middot is quieter.

---

## 3. Numbers

**Spell them in prose, digitise them as evidence.**

- Prose: "Seventy-five seconds by the sea."
- Evidence: "48 residences filmed in 4K", "217.40 sqm", "38m above the bay",
  "3 of 12 places", "8 min from Harbor Station, north exit".

The distinction matters because a spelled number reads as voice and a digit
reads as a fact. Using digits everywhere makes the page feel like a
spreadsheet; using words everywhere makes it feel evasive.

Set `font-variant-numeric: tabular-nums` so the digits align. Misaligned figures
are a defect people feel without being able to name.

---

## 4. The honesty system

This is the most distinctive thing either project does, and the field notes from the shipped projects are
explicit that it is what clients actually loved. It began as one line of design
law:

> Every image is labelled honestly as a render or a photograph.

It was then enforced as a visible taxonomy across the site, counted here as
actually shipped:

| Label | Count | Meaning |
|---|---|---|
| `RENDER` | 57 | CGI |
| `PHOTOGRAPH` | 8 | Camera, gold-outlined chip |
| `FOR ILLUSTRATION ONLY` | 9 | Every plan sheet caption |
| `REAL DRONE FOOTAGE` | 6+ | An actual flight, pulsing red dot |
| `NOT RENDERED` | 3 | e.g. `PHOTOGRAPHED, NOT RENDERED` |
| `FLOWN, NOT RENDERED` | 2 | The flight chapters |
| `BUILT · PHOTOGRAPHED` | 2 | Render versus reality pairs |
| `GENERATED FROM 2 PHOTOGRAPHS` | 1 | AI interpolation, disclosed |
| `LIVING PHOTOGRAPH` | 1 | Cinemagraph |
| `SCHEMATIC, NOT TO SCALE` | 1 | Orientation diagram |

**Provenance is styled as a visual rank.** The chip is translucent dark glass by
default; the photograph chip upgrades to a gold border and gold text. A
photograph is the only thing on the page allowed to wear gold. So the honesty
system is not a disclaimer, it is a reward: the real thing looks better.

That inversion is the whole trick. Most projects treat disclosure as a cost to
be minimised. Here it is the premium signal, and it works because a developer
willing to mark 57 images as renders has clearly not hidden anything in the
other 8.

Four more places the honesty runs:

1. **Say when sources disagree.** "Where our source documents disagree, we print
   the more conservative figure and flag it rather than choosing the flattering
   one." One exception is named explicitly, and the line is left blank rather
   than estimated.
2. **Model the absence.** `size: null` renders as "ON REQUEST" rather than an
   interpolated number. Build the data model so honesty is possible.
3. **Admit the gap.** A coverage-gap card reads "We would rather say so than
   show you the neighbour."
4. **Tell the user what a button will do before they press it.** The register
   form says it opens WhatsApp, because there is no CRM behind the prototype.

Upstream of all this sits an asset map with a **data-flags section** listing
every unresolved contradiction (unit count 48 vs 51 vs 52, three different
penthouse areas, source typos never to copy) and a **spatial ground truth**
section ("the bay lies east, stacks 03 to 05 face the ridge, never describe a
corner stack as a bay view"). Write that file early. It is what stops a
well-meaning sentence becoming a misrepresentation.

**Generalise it like this:** find the thing your project is tempted to fudge,
then build the interface element that admits it, and make that element the
best-looking thing on the page.

---

## 5. Register-specific voice

**Cinematic** is declarative and unhurried. Short sentences. Concrete sensory
nouns. No adjective that a number could replace. "Two buildings, one address."
"Rendered. Then built." "The showroom keeps our promise."

**Instrument** is quieter still, and its poetry lives in the item descriptions
rather than the chrome: "Seven copper kettles, and lunch that runs long." "Bread proved overnight,
then a fire to come back to." "One room above the print shop,
eight chairs, one seating."

Notice those are not descriptions of a service, they are descriptions of an
evening. The pattern is: name one physical detail and one temporal detail, and
let the reader assemble the rest.

Interface copy in the instrument register carries scarcity plainly and without
pressure tactics: "12 dates open. 84 places left." then "Eight tables. Every seat
has a name." The second line is what stops the first reading as a growth
hack. It explains the constraint instead of exploiting it.

---

## 6. Voice extends to commits and comments

Commit subjects follow the same rule as headlines: **what changed, and the
reason or the constraint.**

```
Pages ship with no-cache: phones were showing week-old HTML
Mobile hero: the film scrubs on phones now, not just desktop
Nine pages become five, and navigation becomes furniture
Tour minimap: our own dollhouse render, a map and nothing more
Revert the five-page consolidation while it is redesigned
```

Reverts are named honestly rather than disguised as fixes.

**Code comments state the failure they prevent**, not what the line does. This
is the single most transferable habit in the whole codebase, because it makes a
comment useful to the person considering deleting the line:

```
// a swallowed `seeked` must not leave the film stranded short of the target
// any residual transform on an ancestor would become the containing block
//   for the position:fixed unit panel on mobile
// the default watch dir is src, which contains generated output, so every
//   build retriggered the build
// Safari heuristically caches page HTML, and a phone can keep showing a stale
//   page for days after a deploy
// Pointing at the node put the hall-to-bedroom marker 40.7 degrees off, flat
//   on a blank wall
```

A comment that says what the code does is noise. A comment that says what broke
last time is a gift.

---

## 7. Bans

- **No em dashes, no en dashes, and no `--`.** Account-wide rule. Enforce it in
  CI against the *rendered* HTML, not the source, because that is where it
  actually matters.
- No lorem, no placeholder, no "Feature One". Placeholder copy is a design
  defect, not a content to-do.
- No adjective standing in for a number.
- No claim without its evidence beside it.
- No pressure tactics. Scarcity may be stated, never manufactured.

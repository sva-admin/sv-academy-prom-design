# Imagery: real photographs, in the right context

Read this before building any page that shows a place, a product, a room, or a
person. Which is almost every page.

**Zero images is a bug, not a design choice.** A page about a riverside hotel
with no photograph of a river is not minimal, it is unfinished. The house style
depends on real photography carrying the emotional weight while the type stays
restrained; take the photographs away and the restraint just reads as empty.

## Contents

1. The context rule, which is the one that actually gets broken
2. Where to get free images, ranked
3. The Unsplash URL shape
4. How many, and which
5. Making them look expensive
6. Labelling: mock is not the same as real
7. Performance and the derivative pipeline
8. When to generate instead

---

## 1. The context rule

The failure is almost never "no image". It is **the wrong image, chosen because
it was pretty**. A generic tropical beach on a Chiang Mai hotel page is worse
than no photograph, because it tells a visitor who knows the place that you do
not.

Before searching, write down three things about the actual subject:

1. **The place.** Not "Thailand". Northern Thailand, teak architecture, the Ping
   river, lantern festival, misty hills, not palm-and-turquoise.
2. **The season and hour.** Golden hour on a beachfront tower is a different
   product from the same tower at noon.
3. **The specific object.** "Padel court" is not "tennis court". "Teak shophouse"
   is not "bamboo bungalow". If you cannot tell them apart, look them up first;
   the client can.

Then search with those words rather than the category word. Search "Ping river
Chiang Mai teak house" before "luxury hotel".

**Check every image against the facts you have already written.** The AURA Heights
asset map records the sea lying west and which unit stacks face the city, and a
photograph of a sunset over water on a city-facing page would contradict the
copy sitting next to it. Imagery is part of the honesty system, not decoration
outside it.

Quick rejection test: if the photograph could belong to any competitor in any
country, it is the training-data reflex in visual form. Find the one that could
only be this place.

## 2. Where to get free images, ranked

| Source | Licence | Best for |
|---|---|---|
| **Unsplash** | free for commercial use, no attribution required (credit is polite) | interiors, landscape, food, lifestyle. The default. |
| **Pexels** | free for commercial use | similar coverage, different set, good when Unsplash is thin |
| **Wikimedia Commons** | varies per file, CHECK EACH | real named places, buildings, maps, historical. Best for accuracy. |
| **Openverse** | varies, filter to permissive | broad aggregate search |
| **The Met Open Access** | CC0 | art, texture, pattern, anything historical |
| **Rawpixel public domain** | CC0 | vintage prints, patterns, botanical |

Two cautions worth taking seriously:

- **Wikimedia and Openverse licences vary per file.** Some require attribution,
  some require share-alike, which can be genuinely awkward for a client site.
  Read the licence on the file page, not the site's general terms.
- **People in photographs need model releases for commercial use**, and free
  sites generally do not provide them. For any page implying endorsement, use
  images without identifiable faces, or use the client's own photography.

For a Thai client specifically, the client almost always has real photography
already. Ask before searching. Real photographs of the actual property beat any
stock image, and the AURA Heights "the showroom keeps our promise" section only works
because the images are of the real thing.

## 3. The Unsplash URL shape

Unsplash serves resized images directly, so you rarely need to download
anything:

```
https://images.unsplash.com/photo-{id}?auto=format&fit=crop&w=1600&q=80
```

- `auto=format` serves WebP or AVIF to browsers that accept them.
- `fit=crop` with `w` and `h` gives a deterministic aspect ratio.
- `q=80` is the sweet spot; `q=60` is fine for background imagery.
- Add `&crop=entropy` when the subject sits off-centre.

Always pair it with real `width`/`height` attributes so layout never shifts:

```html
<img src="https://images.unsplash.com/photo-XXXXXXXX?auto=format&fit=crop&w=1600&q=80"
     width="1600" height="1067" loading="lazy" decoding="async"
     alt="The teak facade seen from the river at dusk">
```

**Two hard constraints.** First, a hotlinked image is a third-party dependency
on someone else's uptime and it leaks your visitors' IPs; for anything that
ships to a client, download, optimise and self-host. Second, some markets block
or throttle foreign CDNs, which is the same reason this house self-hosts fonts.
Hotlink while prototyping, self-host before delivery.

## 4. How many, and which

- **Hero**: one image that carries the whole argument. Spend real time here.
- **Every card in a list needs one.** A grid where three items have photographs
  and two have grey placeholders looks broken, not in progress. This is exactly
  what The Assembly content audit checked: which entities render a real photo and
  which fall back to a generated plate.
- **Vary the shot type.** Wide establishing, one detail, one human-scale
  interior, one from an unusual angle. Four wide shots of the same room read as
  a brochure someone gave up on.
- **Keep a consistent grade.** Mixing a cool blue photograph into a warm golden
  set is the single fastest way to make a page look assembled rather than
  designed. Pick the temperature first and reject images that fight it. The AURA
  Heights material palette was measured, not guessed: 11 of 13 sampled textures
  were warm, with red exceeding blue by 6 to 40 points.

## 5. Making them look expensive

- **Inverted hover zoom**: rest at `scale(1.04)`, relax to `1.00` over 1.2 to
  1.4s. It settles rather than lunges, and it makes an edge gap impossible.
- **Never stretch.** `object-fit: cover` with a deliberate `object-position`.
  "Chopped off" in the critique vocabulary is almost always a subject sitting
  outside the crop box at one breakpoint.
- **A scrim, not a filter.** For text over an image use a directional gradient
  (`linear-gradient(105deg, rgba(24,14,5,.62), transparent 60%)`) plus a text
  shadow, rather than dimming the whole photograph. The image stays bright and
  the text still passes contrast. Measure the contrast on the rendered pixels,
  not the token.
- **Grain over everything.** The 5% fractal-noise overlay ties photographs and
  flat colour into one surface. See `patterns.md`.
- **Ken Burns only where it earns it**, 40 to 52 seconds, and never on more than
  one element in view.

## 6. Labelling: mock is not the same as real

The honesty system in `copy.md` applies to stock imagery too, and this is where
most projects quietly mislead.

- A stock photograph standing in for a room that has not been built or
  photographed is **not** a photograph of that room. Label it, exactly as AURA
  Heights labels 44 images `RENDER` and 6 `FOR ILLUSTRATION ONLY`.
- In a demo or a pitch build, say so once, plainly, the way The Assembly does:
  "Preview build. Sample data, simulated sign-in, no payment taken."
- Never present a stock interior as the client's own property to that client's
  customers. That is a misrepresentation with real consequences in property and
  hospitality, and it is the fastest way to lose the trust the rest of the style
  is built to earn.

Placeholder imagery is allowed and useful while building. It just has to be
visibly a placeholder, and it has to be gone before a customer preview.

## 7. Performance and the derivative pipeline

Photography is where page weight goes, and weight is a design property here:
The Assembly's mobile LCP went from 5,820ms to 1,236ms largely on image work.

- **Two encodes of everything**, a mobile and a desktop, and honour `Save-Data`.
- **AVIF or WebP with a JPEG fallback.** `auto=format` handles this for
  hotlinked Unsplash; self-hosted needs a build step.
- **`loading="lazy"` on everything below the fold, and never on the hero.**
  Lazy-loading the hero delays the LCP element, which is the opposite of what
  you want.
- **Preload the hero image** alongside the two fonts.
- Generate derivatives with a script and a manifest, so a missing size is a
  build error rather than a 404 a customer finds. See `stack.md`.

## 8. When to generate instead

Sometimes the right image does not exist for free: an interior that has not been
built, a specific unit view, a product that is not made yet.

- **Render it** if the 3D model exists. That is what a 360 render pipeline is for, and
  a render you control beats a stock photograph of somewhere else.
- **Generate it** only with a costed plan approved first. The `generate` skill
  enforces budget caps for exactly this reason: an expensive generation that
  came back wrong after a long planning phase is a specific, remembered failure
  in this house.
- **Disclose it either way.** `GENERATED FROM 2 PHOTOGRAPHS` is a real label on
  a real shipped page. Nobody minded, because it was said out loud.

# SV Academy Prom Design

**Prom** is a pun: พร้อม (*prom*) is Thai for **ready**. This is ready-to-use
design taste for AI coding agents, the actual house-style skill a working
studio runs to ship client websites with Claude, published for anyone to use.

Same brand, same request, one difference: the skill.

| Without the skill | With the skill |
|---|---|
| ![Generic AI output](demo/without-skill.png) | ![House style output](demo/with-skill.png) |

The left page is what agents produce by default: the purple gradient, the
emoji hero, "revolutionize your living experience", the rounded pill button.
The right page is the same fictional brand through this skill: a tinted
ground instead of pure white, editorial serif at display size, and copy that
proves instead of promises ("48 residences, all filmed", "90 sec walk, timed"). Both screenshots are unedited browser renders of the files in
[`demo/`](demo/).

## Install

**Claude Code**, as a plugin:

```bash
claude plugin marketplace add sva-admin/sv-academy-prom-design
claude plugin install prom-design@sv-academy-prom-design
```

or as a plain skill:

```bash
git clone https://github.com/sva-admin/sv-academy-prom-design
cp -r sv-academy-prom-design/skills/prom-design ~/.claude/skills/
```

**Cursor** (recent versions) reads the same folder via the open Agent Skills
standard, so the second install path can cover both tools at once; confirm on
your Cursor version.

**Claude Cowork**: zip `skills/prom-design/` and upload it as a skill.

## Use

Ask for design work and mention the style, or invoke it directly:

```
Build a landing page for my coffee shop. Use the prom-design skill.
```

```
This dashboard looks like AI slop. Apply prom-design and tell me what you changed.
```

```
/prom-design redesign this booking page, keep the copy honest and specific
```

## What is inside

| File | What it carries |
|---|---|
| `SKILL.md` | The style thesis, the two moods (Cinematic, Instrument), and the working loop: brief, design contract, build, review gate, audit, ship |
| `references/taste.md` | The taste rules: what the style always does, never does, and why |
| `references/tokens.md` + `assets/tokens-starter.css` | Two verified token systems, ready to drop in |
| `references/patterns.md` | The signature components, with the measurements that make them |
| `references/copy.md` | Proof-over-promise copywriting: evidence next to every claim |
| `references/imagery.md` | Real-photography rules: specific place, season, hour, object |
| `references/webapp.md` | The mobile web-app playbook: density budget, bottom tab bar, coach overlays |
| `references/audit.md` | The multi-lens audit that rejects slop before a client sees it |
| `scripts/` | Screenshot and audit harnesses the loop uses |

## Honesty notes

- **All example brands are fictional.** AURA Heights and The Assembly exist
  only in this repo. The rules they illustrate shipped real client work; the
  clients stay private.
- This is one deliberate aesthetic, not a neutral toolkit. If you want an
  agent to invent a fresh visual direction, use a different skill. If you want
  it to stop producing the same generic page, this is the one.
- Works best with Claude models; nothing in it is model-locked.

## From SV Academy

Built by Prom at [SV Academy](https://loop.sv-academy.org). We teach people to
build real things with AI. Learn free at
[loop.sv-academy.org](https://loop.sv-academy.org). More open skills:
[github.com/sva-admin](https://github.com/sva-admin?tab=repositories).

MIT licensed. Use it, fork it, ship something that does not look like
everything else.

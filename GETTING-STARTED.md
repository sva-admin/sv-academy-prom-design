# Getting started, from absolute zero

You have never installed a Claude skill. Maybe you have never used Claude
Code. This page takes you from nothing to your first good-looking page in
about five minutes, one step at a time.

## Step 0. What you need

One AI coding agent. Any of these works:

- **Claude Code** (terminal or desktop app): [claude.com/claude-code](https://claude.com/claude-code)
- **Cursor**: [cursor.com](https://cursor.com)
- Any of 19+ agents supported by the `skills` CLI (Amp, Cline, Codex, Antigravity, and more)

No design knowledge. That is the point of the skill.

## Step 1. Install the skill (pick ONE way)

**The universal way** (works for Claude Code, Cursor, and 19+ other agents).
In your terminal, inside your project folder:

```bash
npx skills add sva-admin/sv-academy-prom-design
```

**The Claude Code plugin way** (installs once for all your projects):

```bash
claude plugin marketplace add sva-admin/sv-academy-prom-design
claude plugin install prom-design@sv-academy-prom-design
```

**The Cowork way**: download this repo, zip the `skills/prom-design` folder,
and upload it in Cowork as a skill.

## Step 2. Check it took

Ask your agent:

```
Do you have the prom-design skill? One line.
```

It should say yes. (Claude Code users can also run `claude plugin list` in
the terminal, or look for `.agents/skills/prom-design/` in the project.)

## Step 3. Your first page

Copy-paste one of these, exactly as written. Swap the business for yours.

```
Build a one-page site for a small coffee shop called Driftwood, using the
prom-design skill. Cinematic register. Real copy, no lorem ipsum.
```

What you should see: a tinted background (not pure white), one serif
headline, specific copy ("roasted Tuesdays, 14 seats") instead of slogans,
and no purple gradient anywhere. If you see emoji in headings, ask: "apply
the prom-design anti-slop audit to this page".

## Step 4. The one that convinces everyone

Run it on a page you already have:

```
Apply the prom-design skill to this page. Keep my content and brand colors.
Show me before and after, and name every rule you applied.
```

The named rules are the point: you learn what changed and why, so the tenth
page needs less of the skill than the first.

## Five use cases to steal

| You want | Paste this |
|---|---|
| A landing page that looks funded | `Landing page for [product], prom-design cinematic register, proof over promise copy` |
| A dashboard that feels trustworthy | `Redesign this dashboard with prom-design, instrument register, tabular numerals, one accent color` |
| A portfolio that sells your work | `Portfolio for a [your craft], prom-design, one full-bleed image, editorial serif, tiny nav` |
| A mobile booking flow | `Rebuild this page as a mobile web app per prom-design's webapp playbook: density budget, bottom tab bar` |
| Rescue an existing page | `This looks like AI slop. Apply prom-design and list every fix by rule name` |

## When something looks off

- **Fonts look default**: say "load the fonts the skill specifies and show me the @font-face or link tags".
- **Still too generic**: say "run the taste check from prom-design's audit.md against this page and fix every failure".
- **Too fancy for the task**: say "instrument register, not cinematic". Dashboards are meant to be quiet.

## What the words mean

- **Register**: which of the two moods the skill applies. Cinematic sells, instrument works.
- **Design tokens**: the small set of colors, sizes, and spacing the page is allowed to use. Consistency is what reads as expensive.
- **Proof over promise**: every claim carries its evidence ("48 residences, all filmed", not "premium quality").

Stuck? Open an issue. Learn the deeper craft free at
[loop.sv-academy.org](https://loop.sv-academy.org).

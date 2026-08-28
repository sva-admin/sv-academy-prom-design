#!/usr/bin/env node
// design-audit.mjs - emit a ready-to-run multi-lens audit workflow.
//
// This does not run the audit itself. It writes a Workflow script (the kind the
// Workflow tool executes) with your project's paths, port, routes and priors
// already filled in, because the reason most audits stall is that the agents do
// not know how to sign in, which port to hit, or how to dismiss the first-run
// overlay. Pre-solving the tooling is most of the value.
//
// Usage:
//   node design-audit.mjs \
//     --repo "/Users/me/Desktop/Project/source" \
//     --base http://127.0.0.1:8788 \
//     --routes / /events /communities /join \
//     --product "a members-club booking product going in front of a prospective client" \
//     --arch "Hono JSX, server-rendered, no build step, all CSS inlined from src/ui/theme.ts" \
//     --recent "bottom dock, segmented header nav, first-run tour, category picker, filter tags" \
//     --tests 268 \
//     --out ./audit-workflow.js
//
// Optional:
//   --design DESIGN.md --rules AGENTS.md
//   --signin "go to /join, fill input[name=email], click form[action='/auth/login'] button[type=submit]"
//   --skip-tour "localStorage app.tour=1"   --theme-cookie "app_theme=dark"
//   --widths 320,390,1440

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const argv = process.argv.slice(2)
const arg = (n, d = null) => { const i = argv.indexOf(`--${n}`); return i === -1 ? d : argv[i + 1] }
const list = (n) => {
  const i = argv.indexOf(`--${n}`); if (i === -1) return []
  const out = []; for (let j = i + 1; j < argv.length && !argv[j].startsWith('--'); j++) out.push(argv[j])
  return out
}

const repo = arg('repo')
const base = arg('base', 'http://127.0.0.1:8788')
const routes = list('routes').length ? list('routes') : ['/']
const product = arg('product', 'a client-facing web product')
const arch = arg('arch', 'describe the architecture in one paragraph')
const recent = arg('recent', 'recently added components')
const tests = arg('tests', '0')
const design = arg('design', 'DESIGN.md')
const rules = arg('rules', 'AGENTS.md')
const signin = arg('signin', '')
const skipTour = arg('skip-tour', '')
const themeCookie = arg('theme-cookie', '')
const widths = arg('widths', '320,390,1440')
const out = resolve(arg('out', './audit-workflow.js'))

if (!repo) {
  console.error('--repo is required (absolute path to the source root).')
  process.exit(2)
}

const q = (s) => String(s).replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
const routeLines = routes.map(r => `  ${r}`).join('\n')

const script = `export const meta = {
  name: 'design-audit',
  description: 'Multi-lens design and QA audit before a customer preview',
  phases: [
    { title: 'Audit', detail: 'five sealed lenses in parallel' },
    { title: 'Rank', detail: 'dedupe, verify against source, rank by impact' },
  ],
}

const REPO   = ${JSON.stringify(repo)}
const BASE   = ${JSON.stringify(base)}
const WIDTHS = ${JSON.stringify(widths)}
const ROUTES = \`
${q(routeLines)}
\`.trim()

// Shared brief. Order matters: stakes, architecture, where the law lives,
// the prior that primes suspicion, then tooling with the gotchas pre-solved.
const CONTEXT = \`
PRODUCT: ${q(product)}
ARCHITECTURE: ${q(arch)}
DESIGN SOURCE OF TRUTH: \${REPO}/${q(design)}
REPO RULES: \${REPO}/${q(rules)}
LOCAL URL: \${BASE}

IMPORTANT CONTEXT: this codebase has recently been through rapid change.
Recently added: ${q(recent)}.
Things WILL have been left half-finished, duplicated, or subtly broken.
Your job is to find them. Assume nothing is fine because it looks fine.

ROUTES IN SCOPE:
\${ROUTES}

TOOLING (already solved, do not rediscover):
- Drive a real browser with playwright-core from the npx cache. Locate it with:
  ls -d "$HOME"/.npm/_npx/*/node_modules/playwright-core
  Import its index.mjs, then chromium.launch({ channel: 'chrome' }).
- There is a ready screenshot+metrics tool at
  ~/.claude/skills/prom-design/scripts/shots.mjs
  Example: node shots.mjs --base \${BASE} --routes / /events --widths \${WIDTHS} --out ./shots
  It reports HTTP status, scrollHeight in screens, horizontal overflow, broken
  images, rendered em/en dashes, and console errors, and writes report.json.
- Write any scratch scripts into a temp dir and run them with node.
${skipTour ? `- Dismiss the first-run overlay BEFORE navigating: ${q(skipTour)}. Set it in an init script, not after load.\n` : ''}${themeCookie ? `- Theme is a cookie: ${q(themeCookie)}.\n` : ''}${signin ? `- Sign-in recipe: ${q(signin)}\n` : ''}
RULES FOR YOUR OUTPUT:
Every finding must name the route, the exact selector or file:line, the MEASURED
evidence (a number, a status code, a console error, a screenshot observation),
and a concrete fix. No speculation, no "might be", no padding. If your area is
clean, say so in one line. Never use em dashes or en dashes. Your output is raw
material for a fixer, not prose for a human.
\`

const FINDINGS = {
  type: 'object',
  properties: {
    findings: { type: 'array', items: { type: 'object',
      properties: {
        severity: { type: 'string', description: 'broken | half-finished | risk | polish' },
        where:    { type: 'string', description: 'route and/or file:line' },
        what:     { type: 'string', description: 'the defect, with the measured evidence' },
        fix:      { type: 'string', description: 'the concrete change' },
      }, required: ['severity','where','what','fix'] } },
    cleanAreas: { type: 'array', items: { type: 'string' } },
  },
  required: ['findings','cleanAreas'],
}

const lenses = [
  ['flows', \`YOUR SCOPE: functional QA by driving the product. Find what is BROKEN, not what is ugly.
Walk the real journeys, signed out and then signed in. For every affordance that opens something,
confirm it closes three ways: its own control, Escape or Close, and browser Back. Submit EVERY form
empty as well as with valid data, and confirm errors render on the right field or step. Probe
boundaries: empty, valid, and one character over any stated limit. Capture console errors and page
errors on EVERY page you touch and report every one.\`],

  ['visual', \`YOUR SCOPE: visual regression at widths \${WIDTHS}, light theme. Screenshot every route
in scope and then ACTUALLY LOOK at the images with the Read tool. A lens that does not read its own
screenshots reports nothing. Look for: overlapping elements, clipped text, broken spacing, orphaned
headings, empty containers, elements that render with no content, duplicated content on one page,
sections that look unfinished, images with wrong aspect ratios, and anything that simply reads as a
bug to a person looking at it. Also measure document.body.scrollHeight per route and report anything
absurdly long, since that is the number behind the complaint "too much scrolling".\`],

  ['contrast', \`YOUR SCOPE: colour and contrast, measured rather than assumed. Compute REAL contrast by
sampling the RENDERED PIXELS instead of trusting computed styles, because text is often set over
photographs where the CSS background is transparent. Report any text under 4.5:1, or under 3:1 at
24px and above, naming the element and the measured ratio. Walk every theme the product ships. Do not
skip: the nav and any dock, menus, overlays and first-run tours, every pill and chip, and any text
over an image. Cross-check statically by grepping the stylesheet for hex literals outside the palette
definitions and checking each renders acceptably. Never present an estimated ratio as a measurement.\`],

  ['code', \`YOUR SCOPE: code health. READ the source, do not drive the browser. Every finding carries
file:line. Hunt: dead components, props, helpers and CSS classes that nothing uses; duplicate or
near-duplicate rules that should collapse; selectors that can never match; props threaded but ignored;
TODOs and commented-out code; anything left half-migrated (an old class still styled but no longer
rendered, or a new class rendered but never styled). Do the BIDIRECTIONAL class audit and list BOTH
directions: every class rendered in source has a matching rule, and every non-trivial rule is actually
rendered somewhere. Report the size of the stylesheet and whether anything obvious is wasted.\`],

  ['content', \`YOUR SCOPE: content, data and imagery, all of it quantitative.
1. Inventory credibility: exact counts per category and per axis. Anything too thin to look credible
   in a client demo is a finding even though nothing is broken.
2. Asset utilisation: which supplied photographs are used, which are unused, and which entities render
   a generated fallback instead of a real photo.
3. Copy defects: placeholder, lorem, TODO, invented filler, repeated sentences, or statements that
   contradict each other between two screens. Check for em dashes and en dashes in the RENDERED HTML
   by fetching pages and grepping, not in the source.
4. Temporal validity: every date genuinely in the future, nothing rendering as invalid.\`],
]

phase('Audit')
const audits = await parallel(lenses.map(([key, brief]) => () =>
  agent(CONTEXT + '\\n\\n' + brief, { label: key, phase: 'Audit', schema: FINDINGS, effort: 'high' })
))

const ok = audits.map((a, i) => [lenses[i][0], a]).filter(([, a]) => a)
log(\`\${ok.length}/\${lenses.length} lenses reported\`)

const digest = ok.map(([key, a]) =>
  \`\\n\\n===== \${key.toUpperCase()} =====\\nCLEAN: \${(a.cleanAreas || []).join('; ')}\\n\` +
  (a.findings || []).map(f => \`[\${f.severity}] \${f.where}\\n  WHAT: \${f.what}\\n  FIX: \${f.fix}\`).join('\\n')
).join('')

phase('Rank')
const ranked = await agent(CONTEXT + \`

You are the tech lead. \${ok.length} auditors worked in parallel and DID NOT talk to each other.
Here is everything they reported:
\${digest}

Your duties, in order:
1. DEDUPE. The same defect will have been found by two or three of them under different names. Merge
   those into one entry and SAY WHICH LENSES SAW IT, because independent agreement is evidence.
2. VERIFY THE CLAIMS THAT MATTER. For anything marked broken, check it against the actual source at
   \${REPO} before you keep it. Auditors describing a tree from memory get things wrong. Drop or
   downgrade anything you cannot confirm, and say that you did.
3. RANK by real user impact for a customer preview, not by how easy it is to fix. Something that stops
   a user completing the main action outranks a contrast nit.
4. PER ITEM: a one-line title, the file and line, the exact fix, and whether it risks breaking any of
   the ${q(tests)} existing tests.
5. SEPARATELY list WHAT IS PENDING rather than broken: work that was started and not finished, and
   work that was promised and never done.
6. END with the three things you would fix first, and why.

Output one markdown document. No em dashes or en dashes.\`, { label: 'rank', phase: 'Rank', effort: 'high' })

return { ranked }
`

writeFileSync(out, script)
console.log(`Wrote ${out}`)
console.log(`
Run it with the Workflow tool:
  Workflow({ scriptPath: ${JSON.stringify(out)} })

Six agents: five sealed lenses in parallel, then one ranker that re-verifies
every "broken" claim against the source before keeping it. The rank phase is
the part people skip and it is the part that makes the output trustworthy.
`)

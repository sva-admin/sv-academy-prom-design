#!/usr/bin/env node
// shots.mjs - the localhost review gate in one command.
//
// Captures every route at three widths, records scrollHeight (the number behind
// "too much scrolling"), and collects console/page errors, which is where the
// silent failures hide.
//
// Usage:
//   node shots.mjs --base http://127.0.0.1:8788 --routes / /gallery /contact
//   node shots.mjs --base https://example.com --routes-file routes.txt --out ./shots
//   node shots.mjs --base http://127.0.0.1:8788 --widths 320,390,1440 --cookie name=v
//
// Then LOOK at the images. A review gate where nobody opens the screenshots is
// not a gate.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { execSync } from 'node:child_process'

// ---- locate playwright-core without requiring a project install -------------
async function loadChromium () {
  // A module may expose chromium directly (ESM entry) or under .default
  // (the CJS entry seen through the ESM loader). Accept either.
  const pick = (m) => (m && (m.chromium || (m.default && m.default.chromium))) || null

  const candidates = []
  try {
    const globs = execSync(
      'ls -d "$HOME"/.npm/_npx/*/node_modules/playwright-core 2>/dev/null || true',
      { encoding: 'utf8' },
    ).trim().split('\n').filter(Boolean)
    candidates.push(...globs)
  } catch {}
  for (const bare of ['playwright', 'playwright-core']) {
    try { const c = pick(await import(bare)); if (c) return c } catch {}
  }
  for (const dir of candidates) {
    for (const entry of ['index.mjs', 'index.js', '']) {
      try { const c = pick(await import(entry ? join(dir, entry) : dir)); if (c) return c } catch {}
    }
  }
  console.error(
    'Could not load playwright-core.\n' +
    'Fix with:  npx playwright-core --version   (populates the npx cache)\n' +
    'or:        npm i -D playwright-core',
  )
  process.exit(2)
}

// ---- args ------------------------------------------------------------------
const argv = process.argv.slice(2)
const arg = (name, fallback = null) => {
  const i = argv.indexOf(`--${name}`)
  return i === -1 ? fallback : argv[i + 1]
}
const list = (name) => {
  const i = argv.indexOf(`--${name}`)
  if (i === -1) return []
  const out = []
  for (let j = i + 1; j < argv.length && !argv[j].startsWith('--'); j++) out.push(argv[j])
  return out
}

const base = (arg('base') || 'http://127.0.0.1:8788').replace(/\/$/, '')
const outDir = resolve(arg('out') || './shots')
const widths = (arg('widths') || '375,768,1280').split(',').map(n => parseInt(n.trim(), 10))
const routesFile = arg('routes-file')
const fullPage = !argv.includes('--viewport-only')

let routes = list('routes')
if (!routes.length && routesFile && existsSync(routesFile)) {
  routes = readFileSync(routesFile, 'utf8').split('\n').map(s => s.trim()).filter(s => s && !s.startsWith('#'))
}
if (!routes.length) routes = ['/']

const cookies = list('cookie').map(kv => {
  const [name, ...rest] = kv.split('=')
  const { hostname } = new URL(base)
  return { name, value: rest.join('='), domain: hostname, path: '/' }
})
// Skip a first-run overlay so it does not sit on every screenshot.
// Pass as --localstorage demo.tour=1
const lsPairs = list('localstorage').map(kv => {
  const [k, ...r] = kv.split('=')
  return [k, r.join('=')]
})

// ---- run -------------------------------------------------------------------
const chromium = await loadChromium()
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch())
const rows = []
const problems = []

for (const width of widths) {
  const ctx = await browser.newContext({
    viewport: { width, height: width < 500 ? 812 : 900 },
    deviceScaleFactor: 2,
    isMobile: width < 500,
    hasTouch: width < 500,
    userAgent: width < 500
      ? 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36'
      : undefined,
  })
  if (cookies.length) await ctx.addCookies(cookies)
  if (lsPairs.length) {
    await ctx.addInitScript((pairs) => {
      try { for (const [k, v] of pairs) localStorage.setItem(k, v) } catch {}
    }, lsPairs)
  }

  for (const route of routes) {
    const page = await ctx.newPage()
    const errs = []
    page.on('console', m => { if (m.type() === 'error') errs.push(`console: ${m.text().slice(0, 200)}`) })
    page.on('pageerror', e => errs.push(`pageerror: ${String(e).slice(0, 200)}`))

    const url = base + (route.startsWith('/') ? route : `/${route}`)
    let status = 0
    try {
      const resp = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
      status = resp ? resp.status() : 0
    } catch (e) {
      errs.push(`nav: ${String(e).slice(0, 160)}`)
    }
    // let entrance animations settle so screenshots are not caught mid-fade
    await page.waitForTimeout(900)

    // Scroll the whole page before capturing. Almost every good page reveals
    // sections with IntersectionObserver or scroll-linked animation, and those
    // start at opacity:0. A fullPage screenshot does NOT scroll, so without
    // this sweep the capture shows huge blank bands and the reviewer goes
    // hunting a layout bug that does not exist. Then return to the top so the
    // sticky header is captured in its resting state.
    await page.evaluate(async () => {
      const step = Math.max(200, Math.floor(window.innerHeight * 0.8))
      const height = () => document.documentElement.scrollHeight
      for (let y = 0; y < height(); y += step) {
        window.scrollTo(0, y)
        await new Promise(r => setTimeout(r, 70))
      }
      window.scrollTo(0, height())
      await new Promise(r => setTimeout(r, 150))
      window.scrollTo(0, 0)
    }).catch(() => {})
    await page.waitForTimeout(500)

    const metrics = await page.evaluate(() => ({
      scrollHeight: document.body ? document.body.scrollHeight : 0,
      innerHeight: window.innerHeight,
      // horizontal overflow is the classic mobile defect
      overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
      scrollWidth: document.documentElement.scrollWidth,
      title: document.title,
      // Genuinely broken only: finished loading but has no pixels. An image that
      // is merely !complete is usually lazy-loaded below the fold, and counting
      // those makes the report cry wolf until people stop reading it.
      imgs: [...document.images].filter(i => i.complete && i.naturalWidth === 0).length,
      imgsPending: [...document.images].filter(i => !i.complete).length,
      // Content that never revealed. After a full scroll sweep every reveal
      // should have fired, so anything still fully transparent with real size
      // is a section the visitor will never see. This is the blank-band defect,
      // and it is invisible to every other check because nothing errors.
      stuckHidden: (() => {
        let n = 0
        for (const el of document.querySelectorAll('body *')) {
          const cs = getComputedStyle(el)
          if (parseFloat(cs.opacity) > 0.01 || cs.visibility === 'hidden' || cs.display === 'none') continue
          const r = el.getBoundingClientRect()
          if (r.width > 120 && r.height > 60 && (el.textContent || '').trim().length > 20) n++
        }
        return n
      })(),
      // U+2014 em dash, U+2013 en dash. Built via RegExp source escapes so
      // this file does not itself trip the gate it implements.
      dashes: ((document.body ? document.body.innerText : '')
        .match(new RegExp('[\\u2014\\u2013]', 'g')) || []).length,
    })).catch(() => ({ scrollHeight: 0, innerHeight: 0, overflowX: false, scrollWidth: 0, title: '', imgs: 0, imgsPending: 0, stuckHidden: 0, dashes: 0 }))

    const slug = (route === '/' ? 'home' : route.replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')) || 'home'
    const file = join(outDir, `${slug}@${width}.png`)
    try { await page.screenshot({ path: file, fullPage }) } catch (e) { errs.push(`shot: ${String(e).slice(0, 120)}`) }

    const screens = metrics.innerHeight ? (metrics.scrollHeight / metrics.innerHeight) : 0
    rows.push({ route, width, status, screens: screens.toFixed(1), ...metrics, errors: errs.length, file })
    if (status >= 400 || status === 0) problems.push(`${route} @${width}: HTTP ${status}`)
    if (metrics.overflowX) problems.push(`${route} @${width}: horizontal overflow (${metrics.scrollWidth}px > ${width}px)`)
    if (metrics.imgs) problems.push(`${route} @${width}: ${metrics.imgs} image(s) broken (loaded with zero pixels)`)
    if (metrics.dashes) problems.push(`${route} @${width}: ${metrics.dashes} em/en dash(es) in rendered text`)
    if (metrics.stuckHidden) problems.push(`${route} @${width}: ${metrics.stuckHidden} block(s) still at opacity 0 after a full scroll (reveal never fired, visitor sees a blank band)`)
    for (const e of errs) problems.push(`${route} @${width}: ${e}`)
    await page.close()
  }
  await ctx.close()
}
await browser.close()

// ---- report ----------------------------------------------------------------
const pad = (s, n) => String(s).padEnd(n)
console.log(`\nbase: ${base}\nout:  ${outDir}\n`)
console.log(pad('route', 28) + pad('w', 6) + pad('http', 6) + pad('screens', 9) + pad('overflowX', 11) + 'errs')
console.log('-'.repeat(70))
for (const r of rows) {
  console.log(
    pad(r.route, 28) + pad(r.width, 6) + pad(r.status, 6) +
    pad(r.screens, 9) + pad(r.overflowX ? 'YES' : '.', 11) + (r.errors || '.'),
  )
}

writeFileSync(join(outDir, 'report.json'), JSON.stringify({ base, rows, problems }, null, 2))

if (problems.length) {
  console.log(`\n${problems.length} problem(s):`)
  for (const p of [...new Set(problems)]) console.log('  - ' + p)
} else {
  console.log('\nNo automatic problems detected.')
}
console.log(
  '\n"screens" is scrollHeight / viewport height. In the instrument register,\n' +
  'anything much over 3 on mobile is the number behind "too much scrolling".\n' +
  'Now OPEN the PNGs and look at them. Automatic checks do not see ugly.\n',
)
process.exit(0)

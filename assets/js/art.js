/* =====================================================================
   RACHANA BUILDERS — Procedural architectural artwork
   Fills .art[data-art] panels with deterministic SVG skylines / towers /
   blueprints / villas + glitch slices. No external images required.
   ===================================================================== */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* seeded RNG so each panel is stable & varied */
  function rng(seed) {
    let s = seed >>> 0 || 1;
    return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  }
  const GOLD = "#f0d98a", GOLD2 = "#d4af37", MINT = "#7fe8e0";
  const SIL = "rgba(8,16,30,.58)"; /* navy building silhouette */

  function windows(x, y, w, h, cols, rows, r, lit) {
    const gap = 4, pw = (w - gap * (cols + 1)) / cols, ph = (h - gap * (rows + 1)) / rows;
    let s = "";
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const on = r() < lit;
      const wx = x + gap + i * (pw + gap), wy = y + gap + j * (ph + gap);
      s += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${pw.toFixed(1)}" height="${ph.toFixed(1)}" rx="1" fill="${on ? GOLD : "rgba(255,255,255,.06)"}" ${on && r() < .3 ? `class="lit"` : ""}/>`;
    }
    return s;
  }

  function skyline(seed) {
    const r = rng(seed); let b = "";
    const moonX = 40 + r() * 320;
    b += `<circle cx="${moonX.toFixed(0)}" cy="46" r="20" fill="url(#glow${seed})"/>`;
    let x = -10;
    while (x < 400) {
      const w = 34 + r() * 46, h = 80 + r() * 170, y = 300 - h;
      const cols = Math.max(2, Math.round(w / 16)), rows = Math.max(3, Math.round(h / 26));
      b += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="rgba(8,16,30,.55)"/>`;
      b += windows(x, y, w, h, cols, rows, r, .22);
      if (r() < .4) b += `<rect x="${(x + w / 2 - 1).toFixed(1)}" y="${(y - 18).toFixed(1)}" width="2" height="18" fill="${GOLD2}"/>`;
      x += w + 5 + r() * 8;
    }
    return b;
  }

  function tower(seed) {
    const r = rng(seed);
    const cx = 200, w = 120, h = 250, y = 300 - h, x = cx - w / 2;
    let b = `<circle cx="300" cy="60" r="26" fill="url(#glow${seed})"/>`;
    b += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(8,16,30,.5)"/>`;
    b += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#face${seed})"/>`;
    b += windows(x, y, w, h, 6, 12, r, .3);
    b += `<rect x="${cx - 2}" y="${y - 26}" width="4" height="26" fill="${GOLD2}"/>`;
    b += `<circle cx="${cx}" cy="${y - 26}" r="3" fill="${GOLD}" class="lit"/>`;
    return b;
  }

  function villa(seed) {
    const r = rng(seed); let b = `<circle cx="320" cy="60" r="22" fill="url(#glow${seed})"/>`;
    for (let k = 0; k < 3; k++) {
      const w = 110, h = 70 + r() * 30, x = 10 + k * 130, y = 300 - h;
      b += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(8,16,30,.5)"/>`;
      b += `<polygon points="${x - 6},${y} ${x + w + 6},${y} ${x + w / 2},${y - 26}" fill="rgba(8,16,30,.65)"/>`;
      b += windows(x + 8, y + 10, w - 16, h - 18, 4, 2, r, .55);
    }
    return b;
  }

  function blueprint(seed) {
    const r = rng(seed); let b = "";
    for (let i = 0; i < 5; i++) {
      const x = 30 + i * 75, w = 50 + r() * 20, h = 60 + r() * 160, y = 280 - h;
      b += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${MINT}" stroke-opacity=".5" stroke-width="1.2"/>`;
      for (let g = 1; g < h / 22; g++) b += `<line x1="${x}" y1="${(y + g * 22).toFixed(0)}" x2="${x + w}" y2="${(y + g * 22).toFixed(0)}" stroke="${MINT}" stroke-opacity=".22" stroke-width=".8"/>`;
      b += `<circle cx="${x}" cy="${y}" r="2.5" fill="${GOLD}"/>`;
    }
    b += `<line x1="0" y1="280" x2="400" y2="280" stroke="${GOLD2}" stroke-width="1.4"/>`;
    return b;
  }

  /* a single reusable map-pin teardrop, tip at local (0,0) */
  const PIN_D = "M0,0 C-13,-16 -13,-32 0,-32 C13,-32 13,-16 0,0 Z";
  function pin(x, y, s, op) {
    return `<g transform="translate(${x},${y}) scale(${s})" opacity="${op}">
      <ellipse cx="0" cy="3" rx="9" ry="2.6" fill="rgba(0,0,0,.35)"/>
      <path d="${PIN_D}" fill="${GOLD2}"/>
      <circle cx="0" cy="-20" r="7" fill="#0e1c33"/>
    </g>`;
  }

  /* "Locations" illustration — a stylised city map with a dropped pin */
  function map(seed) {
    const r = rng(seed);
    const mx = 268, my = 168;
    let grid = "";
    [60, 150, 250, 330].forEach(x => grid += `<line x1="${x}" y1="8" x2="${x}" y2="292" stroke="${GOLD}" stroke-opacity=".14" stroke-width="1.2"/>`);
    [66, 150, 232].forEach(y => grid += `<line x1="8" y1="${y}" x2="392" y2="${y}" stroke="${GOLD}" stroke-opacity=".14" stroke-width="1.2"/>`);
    const road = `<path d="M0,224 C90,196 150,244 220,208 C290,172 330,140 400,104" fill="none" stroke="${GOLD2}" stroke-width="3" stroke-linecap="round" opacity=".5"/>`;
    let blocks = "";
    [[66, 84, 28, 22], [168, 172, 32, 24], [280, 58, 24, 30], [68, 192, 26, 20], [300, 210, 26, 22]].forEach(([x, y, w, h]) => {
      blocks += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(8,16,30,.55)" stroke="${GOLD2}" stroke-opacity=".4" stroke-width=".8"/>`;
      blocks += windows(x + 3, y + 3, w - 6, h - 6, 2, Math.max(2, Math.round(h / 12)), r, .3);
    });
    const glow = `<circle cx="${mx}" cy="${my - 46}" r="60" fill="url(#glow${seed})" opacity=".55"/>`;
    const reach = `<circle cx="${mx}" cy="${my}" r="56" fill="none" stroke="${GOLD}" stroke-opacity=".28" stroke-dasharray="3 7" stroke-width="1"/>`;
    return grid + road + blocks + glow + reach + pin(110, 96, .7, .55) + pin(330, 232, .6, .5) + pin(mx, my, 1.35, 1);
  }

  /* "Our Journey" illustration — groundbreaking flag to a completed landmark, along a milestone road */
  function journey(seed) {
    const r = rng(seed);
    const glow = `<circle cx="362" cy="54" r="46" fill="url(#glow${seed})" opacity=".6"/>`;
    const base = `<line x1="0" y1="272" x2="400" y2="272" stroke="${GOLD2}" stroke-opacity=".22" stroke-width="1"/>`;
    const road = `<path d="M28,258 C110,258 118,176 194,168 C270,160 254,80 362,54" fill="none" stroke="${GOLD2}" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="1 11" opacity=".9"/>`;
    const pts = [[28, 258, 4.5, GOLD], [140, 192, 4.5, GOLD], [254, 118, 4.5, GOLD], [362, 54, 6, GOLD2]];
    const nodes = pts.map(([x, y, rad, c]) => `<circle cx="${x}" cy="${y}" r="${rad}" fill="${c}"/>`).join("");
    const flag = `<line x1="28" y1="258" x2="28" y2="222" stroke="${GOLD}" stroke-width="2"/><polygon points="28,222 28,236 48,229" fill="${GOLD}"/>`;
    const bw = 26, bh = 32, bx = 349, by = 22;
    const bldg = `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="rgba(8,16,30,.6)" stroke="${GOLD2}" stroke-width="1"/>`
      + windows(bx + 3, by + 4, bw - 6, bh - 8, 2, 3, r, .5)
      + `<line x1="${bx + bw / 2}" y1="${by}" x2="${bx + bw / 2}" y2="${by - 14}" stroke="${GOLD2}" stroke-width="2"/><polygon points="${bx + bw / 2},${by - 14} ${bx + bw / 2},${by - 6} ${bx + bw / 2 + 13},${by - 10}" fill="${GOLD2}"/>`;
    return glow + base + road + nodes + flag + bldg;
  }

  /* small flat building icon with a window grid, top-left at (x,y) */
  function bldgIcon(x, y, w, h, seed, cols, rows, lit) {
    const r = rng(seed);
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(8,16,30,.55)" stroke="${GOLD2}" stroke-opacity=".5" stroke-width="1"/>`
      + windows(x + 3, y + 3, w - 6, h - 6, cols, rows, r, lit);
  }

  /* small "VS" divider badge, used by the head-to-head illustrations */
  function vsBadge(x, y) {
    return `<circle cx="${x}" cy="${y}" r="17" fill="#0e1c33" stroke="${GOLD2}" stroke-width="1.4"/>
      <text x="${x}" y="${y + 5}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="800" font-size="13" fill="${GOLD}">VS</text>`;
  }

  /* "Market Outlook" — a rising skyline behind an upward trend line */
  function trend(seed) {
    const r = rng(seed);
    let bars = "";
    const xs = [20, 70, 120, 175, 235, 300, 365], hs = [50, 80, 65, 110, 95, 150, 130];
    xs.forEach((x, i) => {
      const h = hs[i], y = 280 - h, w = 38;
      bars += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(8,16,30,.5)" stroke="${GOLD2}" stroke-opacity=".35" stroke-width="1"/>`;
      bars += windows(x + 3, y + 3, w - 6, h - 6, 2, Math.max(2, Math.round(h / 24)), r, .28);
    });
    const glow = `<circle cx="330" cy="60" r="52" fill="url(#glow${seed})" opacity=".55"/>`;
    const line = `<path d="M20,238 L88,198 L158,213 L228,148 L298,166 L368,68" fill="none" stroke="${GOLD}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
    const dots = [[20, 238], [88, 198], [158, 213], [228, 148], [298, 166]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="${GOLD}"/>`).join("")
      + `<circle cx="368" cy="68" r="5.5" fill="${GOLD2}"/>`;
    return glow + bars + line + dots;
  }

  /* "An address to watch" — a neighbourhood map with a spotlighted pin */
  function watchspot(seed) {
    const r = rng(seed);
    const mx = 210, my = 160;
    let grid = "";
    [80, 210, 320].forEach(x => grid += `<line x1="${x}" y1="10" x2="${x}" y2="290" stroke="${GOLD}" stroke-opacity=".13" stroke-width="1.1"/>`);
    [90, 170, 240].forEach(y => grid += `<line x1="10" y1="${y}" x2="390" y2="${y}" stroke="${GOLD}" stroke-opacity=".13" stroke-width="1.1"/>`);
    let blocks = "";
    [[40, 60, 30, 26], [300, 60, 26, 32], [40, 210, 28, 22], [300, 215, 26, 20]].forEach(([x, y, w, h]) => {
      blocks += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="rgba(8,16,30,.5)" stroke="${GOLD2}" stroke-opacity=".35" stroke-width=".8"/>`;
      blocks += windows(x + 3, y + 3, w - 6, h - 6, 2, 2, r, .28);
    });
    const glow = `<circle cx="${mx}" cy="${my - 40}" r="64" fill="url(#glow${seed})" opacity=".6"/>`;
    const rings = [30, 48, 66].map((rad, i) => `<circle cx="${mx}" cy="${my}" r="${rad}" fill="none" stroke="${GOLD}" stroke-opacity="${(.35 - i * .09).toFixed(2)}" stroke-width="1.2"/>`).join("");
    let ticks = "";
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      const x1 = mx + Math.cos(a) * 76, y1 = my + Math.sin(a) * 76, x2 = mx + Math.cos(a) * 84, y2 = my + Math.sin(a) * 84;
      ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${GOLD}" stroke-opacity=".4" stroke-width="1.2"/>`;
    }
    return grid + blocks + glow + rings + ticks + pin(mx, my, 1.3, 1);
  }

  /* "Plots vs apartments" — a fenced plot facing off against an apartment tower */
  function compare(seed) {
    const px = 40, py = 170, pw = 130, ph = 90;
    let fence = "";
    for (let x = px; x <= px + pw; x += 14) fence += `<line x1="${x}" y1="${py + ph}" x2="${x}" y2="${py + ph - 14}" stroke="${GOLD2}" stroke-width="2"/>`;
    fence += `<line x1="${px}" y1="${py + ph - 14}" x2="${px + pw}" y2="${py + ph - 14}" stroke="${GOLD2}" stroke-width="2"/>`;
    const plot = `<rect x="${px}" y="${py}" width="${pw}" height="${ph - 14}" fill="none" stroke="${GOLD}" stroke-opacity=".5" stroke-width="1.4" stroke-dasharray="5 5"/>`;
    const tree = `<circle cx="${px + pw - 20}" cy="${py + 30}" r="14" fill="rgba(212,175,55,.25)"/><line x1="${px + pw - 20}" y1="${py + 44}" x2="${px + pw - 20}" y2="${py + 58}" stroke="${GOLD2}" stroke-width="2"/>`;
    const bx = 250, by = 70, bw = 90, bh = 190;
    const bldg = bldgIcon(bx, by, bw, bh, seed, 4, 7, .3);
    const glow = `<circle cx="${px + pw / 2}" cy="${py - 10}" r="40" fill="url(#glow${seed})" opacity=".4"/>`;
    return glow + plot + fence + tree + bldg + vsBadge(200, 150);
  }

  /* "RERA registration" — a certification seal over a registration document */
  function seal(seed) {
    const cx = 200, cy = 150;
    const doc = `<rect x="120" y="50" width="160" height="210" rx="6" fill="rgba(8,16,30,.5)" stroke="${GOLD2}" stroke-opacity=".4" stroke-width="1"/>`;
    let lines = "";
    for (let i = 0; i < 6; i++) lines += `<line x1="140" y1="${80 + i * 16}" x2="260" y2="${80 + i * 16}" stroke="${GOLD}" stroke-opacity=".25" stroke-width="2"/>`;
    const glow = `<circle cx="${cx}" cy="${cy}" r="70" fill="url(#glow${seed})" opacity=".55"/>`;
    const outerRing = `<circle cx="${cx}" cy="${cy}" r="54" fill="#0e1c33" stroke="${GOLD2}" stroke-width="2.4"/>`;
    const innerRing = `<circle cx="${cx}" cy="${cy}" r="44" fill="none" stroke="${GOLD}" stroke-opacity=".5" stroke-dasharray="2 5" stroke-width="1.2"/>`;
    const check = `<path d="M178,150 L194,166 L226,130" fill="none" stroke="${GOLD}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
    const ribbonL = `<polygon points="${cx - 16},${cy + 46} ${cx - 30},${cy + 86} ${cx - 6},${cy + 70}" fill="${GOLD2}"/>`;
    const ribbonR = `<polygon points="${cx + 16},${cy + 46} ${cx + 30},${cy + 86} ${cx + 6},${cy + 70}" fill="${GOLD2}"/>`;
    return doc + lines + glow + outerRing + innerRing + check + ribbonL + ribbonR;
  }

  /* "Ready vs under-construction" — a finished tower facing a cranes-and-scaffolding site */
  function buildvs(seed) {
    const lx = 40, ly = 70, lw = 90, lh = 190;
    const finished = bldgIcon(lx, ly, lw, lh, seed, 4, 7, .4);
    const flagL = `<line x1="${lx + lw / 2}" y1="${ly}" x2="${lx + lw / 2}" y2="${ly - 16}" stroke="${GOLD2}" stroke-width="2"/><polygon points="${lx + lw / 2},${ly - 16} ${lx + lw / 2},${ly - 8} ${lx + lw / 2 + 13},${ly - 12}" fill="${GOLD}"/>`;
    const rx = 270, ry = 100, rw = 90, rh = 160;
    let scaffold = `<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="rgba(8,16,30,.4)" stroke="${MINT}" stroke-opacity=".5" stroke-width="1.2" stroke-dasharray="4 3"/>`;
    for (let i = 1; i < rh / 26; i++) scaffold += `<line x1="${rx}" y1="${ry + i * 26}" x2="${rx + rw}" y2="${ry + i * 26}" stroke="${MINT}" stroke-opacity=".3" stroke-width=".8"/>`;
    const crane = `<line x1="${rx + rw - 10}" y1="${ry}" x2="${rx + rw - 10}" y2="${ry - 70}" stroke="${GOLD2}" stroke-width="2.4"/><line x1="${rx + rw - 10}" y1="${ry - 70}" x2="${rx + rw + 40}" y2="${ry - 70}" stroke="${GOLD2}" stroke-width="2.4"/><line x1="${rx + rw - 10}" y1="${ry - 70}" x2="${rx + rw - 40}" y2="${ry - 56}" stroke="${GOLD2}" stroke-width="1.6"/><circle cx="${rx + rw - 10}" cy="${ry - 70}" r="3" fill="${GOLD}"/>`;
    const glow = `<circle cx="330" cy="40" r="40" fill="url(#glow${seed})" opacity=".5"/>`;
    return glow + finished + flagL + scaffold + crane + vsBadge(200, 190);
  }

  /* "Victoria expands to Vidyanagar" — a route from one pin to a newly-announced one */
  function expand(seed) {
    const p1x = 90, p1y = 210, p2x = 300, p2y = 110;
    const path = `<path d="M${p1x},${p1y} C160,190 220,150 ${p2x},${p2y}" fill="none" stroke="${GOLD2}" stroke-width="2" stroke-dasharray="1 9" stroke-linecap="round" opacity=".8"/>`;
    const rings = [26, 42, 58].map((rad, i) => `<circle cx="${p2x}" cy="${p2y}" r="${rad}" fill="none" stroke="${GOLD}" stroke-opacity="${(.5 - i * .14).toFixed(2)}" stroke-width="1.2"/>`).join("");
    const glow = `<circle cx="${p2x}" cy="${p2y - 10}" r="60" fill="url(#glow${seed})" opacity=".55"/>`;
    return glow + path + rings + pin(p1x, p1y, .8, .55) + pin(p2x, p2y, 1.3, 1);
  }

  /* "Home loan basics" — a home with a rate badge and a stack of savings */
  function loan(seed) {
    const cx = 170, cy = 190;
    const house = `<polygon points="${cx - 70},${cy} ${cx},${cy - 70} ${cx + 70},${cy}" fill="rgba(8,16,30,.55)" stroke="${GOLD2}" stroke-opacity=".5" stroke-width="1.4"/>
      <rect x="${cx - 50}" y="${cy}" width="100" height="70" fill="rgba(8,16,30,.55)" stroke="${GOLD2}" stroke-opacity=".5" stroke-width="1.4"/>
      <rect x="${cx - 12}" y="${cy + 30}" width="24" height="40" fill="rgba(212,175,55,.2)" stroke="${GOLD}" stroke-opacity=".4" stroke-width="1"/>`;
    const glow = `<circle cx="300" cy="90" r="60" fill="url(#glow${seed})" opacity=".55"/>`;
    const coin = `<circle cx="300" cy="90" r="34" fill="#0e1c33" stroke="${GOLD2}" stroke-width="2.4"/><text x="300" y="101" text-anchor="middle" font-family="Arial, sans-serif" font-weight="800" font-size="30" fill="${GOLD}">%</text>`;
    let stack = "";
    [0, 1, 2].forEach(i => stack += `<rect x="${290 - i * 3}" y="${240 - i * 10}" width="60" height="10" rx="2" fill="${GOLD2}" opacity="${(.9 - i * .2).toFixed(2)}"/>`);
    return glow + house + coin + stack;
  }

  const builders = { skyline, tower, villa, blueprint, map, journey, trend, watchspot, compare, seal, buildvs, expand, loan };

  /* abstract "construction compass" watermark — a slowly rotating crane/crosshair
     motif so any panel without a real photo still reads as deliberate, live content */
  function rotor(seed) {
    const r = rng(seed + 999);
    const cx = 310 + r() * 30, cy = 78 + r() * 14, R = 68;
    let ticks = "";
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2;
      const big = k % 3 === 0;
      const x1 = cx + Math.cos(a) * (R - (big ? 14 : 8)), y1 = cy + Math.sin(a) * (R - (big ? 14 : 8));
      const x2 = cx + Math.cos(a) * R, y2 = cy + Math.sin(a) * R;
      ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${GOLD}" stroke-opacity="${big ? .95 : .6}" stroke-width="${big ? 2.6 : 1.3}"/>`;
    }
    return `
      <g class="art-rotor" style="transform-origin:${cx.toFixed(1)}px ${cy.toFixed(1)}px">
        <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${R + 16}" fill="url(#glow${seed})" opacity=".5"/>
        <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${R}" fill="none" stroke="${GOLD}" stroke-opacity=".65" stroke-width="1.4" stroke-dasharray="3 6"/>
        <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${R - 20}" fill="none" stroke="${GOLD}" stroke-opacity=".3" stroke-width="1"/>
        ${ticks}
        <line x1="${(cx - R + 4).toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx + R - 4).toFixed(1)}" y2="${cy.toFixed(1)}" stroke="${GOLD}" stroke-opacity=".85" stroke-width="1.6"/>
        <line x1="${cx.toFixed(1)}" y1="${(cy - R + 4).toFixed(1)}" x2="${cx.toFixed(1)}" y2="${(cy + R - 4).toFixed(1)}" stroke="${GOLD}" stroke-opacity=".85" stroke-width="1.6"/>
        <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="6" fill="${GOLD}"/>
      </g>`;
  }

  document.querySelectorAll(".art[data-art]").forEach((el, i) => {
    const kind = el.dataset.art;
    const seed = parseInt(el.dataset.seed || (i * 97 + 13), 10);
    const fn = builders[kind] || skyline;
    const glitch = !reduce && el.dataset.glitch !== "off";
    const useRotor = el.dataset.rotor !== "off";
    const slice = glitch ? `
      <g class="art-glitch">
        <rect x="0" y="${100 + (seed % 80)}" width="400" height="10" fill="${MINT}" opacity=".0"/>
      </g>` : "";
    el.innerHTML = `
      <svg class="sky" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="glow${seed}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${GOLD}" stop-opacity=".9"/>
            <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="face${seed}" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="rgba(212,175,55,.18)"/>
            <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
          </linearGradient>
        </defs>
        ${fn(seed)}
        ${useRotor ? rotor(seed) : ""}
        ${slice}
      </svg>`;
  });

  /* twinkle a few lit windows + occasional glitch slice */
  if (!reduce) {
    const style = document.createElement("style");
    style.textContent = `
      .art .lit { animation: twinkle 3.2s ease-in-out infinite; }
      .art.static .lit { animation: none; }
      .art .sky { transition: filter .4s ease; }
      @keyframes twinkle { 0%,100%{opacity:1} 50%{opacity:.35} }
      .art-rotor { animation: artspin 34s linear infinite; }
      .art.static .art-rotor { animation: none; }
      @keyframes artspin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .pc-visual:hover .sky, .cat-tile:hover .sky { filter: drop-shadow(0 0 6px rgba(212,175,55,.5)); }
      .art-glitch rect { animation: artslice 6s steps(1) infinite; }
      @keyframes artslice {
        0%,92%,100% { opacity:0; transform:translateX(0); }
        93% { opacity:.6; transform:translateX(-8px); }
        95% { opacity:.4; transform:translateX(7px); }
        97% { opacity:.5; transform:translateX(-4px); }
      }`;
    document.head.appendChild(style);
  }
})();

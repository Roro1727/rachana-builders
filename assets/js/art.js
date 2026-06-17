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

  const builders = { skyline, tower, villa, blueprint };

  document.querySelectorAll(".art[data-art]").forEach((el, i) => {
    const kind = el.dataset.art;
    const seed = parseInt(el.dataset.seed || (i * 97 + 13), 10);
    const fn = builders[kind] || skyline;
    const glitch = !reduce && el.dataset.glitch !== "off";
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
        ${slice}
      </svg>`;
  });

  /* twinkle a few lit windows + occasional glitch slice */
  if (!reduce) {
    const style = document.createElement("style");
    style.textContent = `
      .art .lit { animation: twinkle 3.2s ease-in-out infinite; }
      .art .sky { transition: filter .4s ease; }
      @keyframes twinkle { 0%,100%{opacity:1} 50%{opacity:.35} }
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

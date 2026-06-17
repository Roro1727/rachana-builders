/* =====================================================================
   RACHANA BUILDERS — Interaction engine
   Reveal-on-scroll · counters · glitch bursts · filters · accordion
   scroll progress · sticky header · preloader · forms
   ===================================================================== */
(function () {
  "use strict";
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  window.addEventListener("load", () => {
    const pl = $("#preloader");
    if (pl) setTimeout(() => pl.classList.add("done"), 650);
  });

  /* ---------- Scroll progress + sticky header + to-top ---------- */
  const bar = document.createElement("div");
  bar.className = "scroll-progress"; document.body.appendChild(bar);
  const header = $(".site-header");
  const toTop = () => $("#toTop");

  let ticking = false;
  function onScroll() {
    const st = window.scrollY || document.documentElement.scrollTop;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (st / h) * 100 : 0) + "%";
    if (header) header.classList.toggle("scrolled", st > 40);
    const tt = toTop();
    if (tt) tt.classList.toggle("show", st > 600);
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  document.addEventListener("click", (e) => {
    const tt = e.target.closest("#toTop");
    if (tt) window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Reveal on scroll ---------- */
  const revs = $$(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    revs.forEach(el => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revs.forEach(el => io.observe(el));
  }

  /* ---------- Animated counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const dec = (el.dataset.count.split(".")[1] || "").length;
    const isYear = Number.isInteger(target) && target >= 1900 && target <= 2099; // don't comma-ize years
    const fmt = v => isYear ? Math.round(v).toString()
      : v.toLocaleString("en-IN", { minimumFractionDigits: dec, maximumFractionDigits: dec });
    const dur = 1600, start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target);
    }
    requestAnimationFrame(step);
    setTimeout(() => { el.textContent = fmt(target); }, dur + 120); // safety net if rAF is throttled
  }
  const counters = $$("[data-count]");
  if (counters.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      counters.forEach(el => { const t = parseFloat(el.dataset.count); el.textContent = (Number.isInteger(t) && t >= 1900 && t <= 2099) ? String(t) : t.toLocaleString("en-IN"); });
    } else {
      const cio = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.isIntersecting) { animateCount(en.target); cio.unobserve(en.target); } });
      }, { threshold: 0.45 });
      counters.forEach(el => {
        cio.observe(el);
        // robust: if already on-screen at load, start now instead of waiting for the IO callback
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.92 && r.bottom > 0) { animateCount(el); cio.unobserve(el); }
      });
    }
  }

  /* ---------- Glitch bursts (random, on titles marked .glitch.auto) ---------- */
  if (!reduce) {
    const autos = $$(".glitch.auto");
    function burst() {
      if (autos.length) {
        const el = autos[Math.floor(Date.now() / 900) % autos.length];
        el && el.classList.add("glitching");
        setTimeout(() => el && el.classList.remove("glitching"), 600);
      }
      setTimeout(burst, 2600 + (Date.now() % 1800));
    }
    setTimeout(burst, 2000);
  }

  /* ---------- Project / category filters ---------- */
  $$("[data-filter-group]").forEach(group => {
    const btns = $$(".filter-btn", group.querySelector(".filters") || group);
    const items = $$(".filter-item", group);
    group.addEventListener("click", (e) => {
      const b = e.target.closest(".filter-btn");
      if (!b) return;
      btns.forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      const f = b.dataset.filter;
      items.forEach(it => {
        const match = f === "all" || (it.dataset.cat || "").split(" ").includes(f);
        it.classList.toggle("hide", !match);
      });
    });
  });

  /* ---------- Tabs (contact sales/vendor) ---------- */
  $$("[data-tabs]").forEach(tabs => {
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest(".tab-btn");
      if (!b) return;
      $$(".tab-btn", tabs).forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      const name = b.dataset.tab;
      $$(".tab-panel", tabs).forEach(p => p.classList.toggle("active", p.dataset.panel === name));
    });
  });

  /* ---------- Accordion ---------- */
  function syncOpenAccordions() {
    $$(".acc-item.open > .acc-body").forEach(b => { b.style.maxHeight = b.scrollHeight + "px"; });
  }
  $$(".accordion").forEach(acc => {
    const multi = acc.hasAttribute("data-multi");
    acc.addEventListener("click", (e) => {
      const head = e.target.closest(".acc-head");
      if (!head) return;
      const item = head.parentElement;
      const body = item.querySelector(".acc-body");
      const open = item.classList.contains("open");
      if (!multi) {
        $$(".acc-item", acc).forEach(i => {
          i.classList.remove("open");
          i.querySelector(".acc-body").style.maxHeight = null;
        });
      }
      if (!open) { item.classList.add("open"); body.style.maxHeight = body.scrollHeight + "px"; }
      else { item.classList.remove("open"); body.style.maxHeight = null; }
    });
  });
  // expand items that start open + keep them sized on load/resize
  syncOpenAccordions();
  window.addEventListener("load", syncOpenAccordions);
  window.addEventListener("resize", syncOpenAccordions);

  /* ---------- Tilt on elements with .tilt ---------- */
  if (!reduce && window.matchMedia("(pointer:fine)").matches) {
    $$(".tilt").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- Forms (demo handling, no backend) ---------- */
  $$("form[data-demo]").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector("[type=submit]");
      if (!btn) return;
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = "Sending…";
      setTimeout(() => {
        btn.innerHTML = "✓ Thank you!";
        form.reset();
        setTimeout(() => { btn.innerHTML = original; btn.disabled = false; }, 2600);
      }, 1100);
    });
  });

  /* ---------- Smooth in-page anchor with header offset ---------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
    });
  });
})();

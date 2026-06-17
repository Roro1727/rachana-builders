/* =====================================================================
   RACHANA BUILDERS — Shared header & footer injection + nav logic
   Keeps all 11 pages on one consistent, categorized navigation.
   ===================================================================== */
(function () {
  "use strict";

  /* ---- tiny inline icon set (no external icon font needed) ---- */
  const I = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.4-.43-5a2.6 2.6 0 0 0-1.83-1.84C19.14 4.7 12 4.7 12 4.7s-7.14 0-8.74.46A2.6 2.6 0 0 0 1.43 7C1 8.6 1 12 1 12s0 3.4.43 5a2.6 2.6 0 0 0 1.83 1.84c1.6.46 8.74.46 8.74.46s7.14 0 8.74-.46A2.6 2.6 0 0 0 22.57 17C23 15.4 23 12 23 12zM9.75 15.02V8.98L15.5 12z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.06 24l1.68-6.13A11.86 11.86 0 0 1 .14 11.9C.14 5.34 5.48 0 12.04 0a11.82 11.82 0 0 1 8.41 3.49 11.82 11.82 0 0 1 3.48 8.42c0 6.56-5.34 11.9-11.9 11.9a11.9 11.9 0 0 1-5.68-1.45L.06 24zM6.6 20.13c1.68 1 3.28 1.6 5.43 1.6 5.45 0 9.89-4.43 9.89-9.88a9.84 9.84 0 0 0-9.88-9.89c-5.46 0-9.89 4.43-9.89 9.88 0 2.27.66 3.97 1.77 5.74l-1 3.63 3.68-1.08zM17.5 14.3c-.07-.12-.27-.2-.56-.34-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.76-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5l-.56-.02c-.2 0-.5.07-.77.37-.27.3-1.02 1-1.02 2.43s1.05 2.82 1.2 3.02c.15.2 2.05 3.13 4.97 4.39.7.3 1.24.48 1.66.62.7.22 1.33.19 1.83.12.56-.08 1.76-.72 2-1.42.25-.7.25-1.28.18-1.4z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    caret: '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  };
  window.SVG = I;

  /* ---- the real Rachana "R" brand mark (client logo) ---- */
  const LOGO = `<img class="brand-logo-img" src="assets/img/logo.png?v=4" alt="Rachana Builders" />`;

  /* ---- navigation model (categorized) ---- */
  const NAV = [
    { key: "home", label: "Home", href: "index.html" },
    { key: "residential", label: "Residential", href: "residential.html", sub: [
      ["residential.html#ready", "Ready Possession"],
      ["residential.html#uc", "Under Construction"],
      ["residential.html", "All Residential"],
    ]},
    { key: "commercial", label: "Commercial", href: "commercial.html", sub: [
      ["commercial.html#ready", "Ready Possession"],
      ["commercial.html#uc", "Under Construction"],
      ["commercial.html", "All Commercial"],
    ]},
    { key: "projects", label: "Projects", href: "projects.html", sub: [
      ["projects.html", "The Victoria Collection"],
      ["locations.html", "Locations"],
      ["archives.html", "Delivered"],
    ]},
    { key: "corporate", label: "Company", href: "corporate.html", sub: [
      ["corporate.html#profile", "Company Profile"],
      ["corporate.html#vision", "Vision & Mission"],
      ["corporate.html#csr", "Quality Promise"],
      ["corporate.html#testimonials", "Testimonials"],
      ["why-sangini.html", "Why Rachana"],
    ]},
    { key: "insights", label: "Insights", href: "blogs.html", sub: [
      ["blogs.html", "Blogs & News"],
      ["careers.html", "Careers"],
    ]},
    { key: "contact", label: "Contact", href: "contact.html" },
  ];

  const ACTIVE_MAP = {
    home: "home", residential: "residential", commercial: "commercial",
    projects: "projects", locations: "projects", archives: "projects",
    corporate: "corporate", "why-sangini": "corporate",
    blogs: "insights", careers: "insights", contact: "contact",
  };

  const page = document.body.dataset.page || "home";
  const activeKey = ACTIVE_MAP[page] || "home";

  /* placeholder contact — replace with Rachana's real details before launch */
  const PHONE_DISPLAY = "+91 93277 87878";
  const PHONE_TEL = "+919327787878";
  const PHONE_ALT = ["+91 94279 09192", "+91 94285 90382"];
  const EMAIL = "sales@rachanabuilders.in";

  /* ---- build header ---- */
  const brand = `
    <a class="brand" href="index.html" aria-label="Rachana Builders — Bhavnagar">
      <span class="brand-mark">${LOGO}</span>
      <span class="brand-name">Rachana<small>Builders · Bhavnagar</small></span>
    </a>`;

  const menuHTML = NAV.map(item => {
    const isActive = item.key === activeKey ? " active" : "";
    if (item.sub) {
      const subs = item.sub.map(([href, lbl]) => `<a href="${href}"><i></i>${lbl}</a>`).join("");
      return `<li class="${isActive.trim()}">
        <a href="${item.href}">${item.label} ${I.caret}</a>
        <div class="dropdown">${subs}</div>
      </li>`;
    }
    return `<li class="${isActive.trim()}"><a href="${item.href}">${item.label}</a></li>`;
  }).join("");

  const headerHTML = `
    <div class="nav-inner">
      ${brand}
      <nav aria-label="Primary"><ul class="nav-menu">${menuHTML}</ul></nav>
      <div class="nav-cta">
        <a class="nav-phone" href="tel:${PHONE_TEL}">${I.phone}${PHONE_DISPLAY}</a>
        <a class="btn btn-gold btn-sm" href="contact.html">Enquire ${I.arrow}</a>
        <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>`;

  /* ---- mobile drawer ---- */
  const mobileHTML = NAV.map(item => {
    if (item.sub) {
      const subs = item.sub.map(([href, lbl]) => `<a href="${href}">${lbl}</a>`).join("");
      return `<div class="m-group">
        <button>${item.label} ${I.caret}</button>
        <div class="m-sub">${subs}</div>
      </div>`;
    }
    return `<a href="${item.href}">${item.label}</a>`;
  }).join("");

  /* ---- footer ---- */
  const footerHTML = `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          ${brand}
          <p>Since 2017, Rachana Builders has crafted quality homes and commercial landmarks across Bhavnagar — the RERA-registered name behind the Rachana Victoria collection, built on quality, detailing and true value.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook">${I.fb}</a>
            <a href="#" aria-label="Instagram">${I.ig}</a>
            <a href="#" aria-label="YouTube">${I.yt}</a>
          </div>
        </div>
        <div class="footer-col">
          <h5>Explore</h5>
          <ul>
            <li><a href="residential.html">Residential</a></li>
            <li><a href="commercial.html">Commercial</a></li>
            <li><a href="projects.html">The Victoria Collection</a></li>
            <li><a href="locations.html">Locations</a></li>
            <li><a href="archives.html">Delivered</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="corporate.html">About Rachana</a></li>
            <li><a href="why-sangini.html">Why Rachana</a></li>
            <li><a href="blogs.html">Blogs & News</a></li>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5>Get in Touch</h5>
          <ul class="footer-contact">
            <li>${I.pin}<span>Shop No. 319, 3rd Floor, Eva Surbhi Complex, Waghawadi Road, Bhavnagar – 364001, Gujarat</span></li>
            <li>${I.phone}<span><a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a><br /><a href="tel:${PHONE_ALT[0].replace(/\s/g,"")}">${PHONE_ALT[0]}</a> · <a href="tel:${PHONE_ALT[1].replace(/\s/g,"")}">${PHONE_ALT[1]}</a></span></li>
            <li>${I.mail}<a href="mailto:${EMAIL}">${EMAIL}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2017–2026 Rachana Builders, Bhavnagar. All Rights Reserved. · RERA Registered.</p>
        <div class="fb-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Disclaimer</a>
        </div>
      </div>
    </div>`;

  /* ---- inject ---- */
  const header = document.getElementById("site-header");
  if (header) { header.className = "site-header"; header.innerHTML = headerHTML; }

  const mnav = document.createElement("div");
  mnav.className = "mobile-nav"; mnav.id = "mobileNav"; mnav.innerHTML = mobileHTML;
  document.body.appendChild(mnav);

  const footer = document.getElementById("site-footer");
  if (footer) { footer.className = "site-footer"; footer.innerHTML = footerHTML; }

  /* floating actions */
  const toTop = document.createElement("button");
  toTop.className = "to-top"; toTop.id = "toTop"; toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
  document.body.appendChild(toTop);

  const wa = document.createElement("a");
  wa.className = "wa-fab"; wa.href = "https://wa.me/" + PHONE_TEL.replace("+", ""); wa.target = "_blank"; wa.rel = "noopener";
  wa.setAttribute("aria-label", "WhatsApp"); wa.innerHTML = I.wa;
  document.body.appendChild(wa);

  /* ---- nav interactions ---- */
  const burger = document.getElementById("burger");
  if (burger) {
    burger.addEventListener("click", () => {
      const open = mnav.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
  }
  mnav.querySelectorAll(".m-group > button").forEach(btn => {
    btn.addEventListener("click", () => {
      const g = btn.parentElement;
      g.classList.toggle("open");
      btn.nextElementSibling.classList.toggle("open");
    });
  });
  mnav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    mnav.classList.remove("open"); burger && burger.classList.remove("open");
    document.body.style.overflow = "";
  }));
})();

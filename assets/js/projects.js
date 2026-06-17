/* =====================================================================
   RACHANA BUILDERS — Project dataset + card renderer
   The real "Rachana Victoria" collection (Bhavnagar).
   Real clean renders (assets/img/victoria) on cards; real floor plans
   (assets/img/victoria/floorplans) in a click-to-enlarge gallery.
   ===================================================================== */
(function () {
  "use strict";
  const arts = ["art-1", "art-2", "art-3", "art-4", "art-5", "art-6"];
  const artKinds = ["tower", "skyline", "tower", "skyline", "tower", "skyline"];
  const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  /* type: residential | commercial · status: ready | uc
     img = clean exterior render (optional) · floorplans = real plan pages */
  const PROJECTS = [
    { name: "Victoria 18", type: "residential", status: "ready", loc: "Subhashnagar", detail: "Residential Plots", tag: "Gated Community", note: "RERA Plots" },
    { name: "Victoria Prime", type: "commercial", status: "ready", loc: "Kaliyabid", detail: "Offices · Shops · Showrooms", tag: "Modern Business Hub", note: "Ready Possession", img: "prime", pos: "center", floorplans: [
      { src: "prime-fp-1", label: "Ground & First Floor" },
      { src: "prime-fp-2", label: "2nd–4th & Fifth Floor" },
    ]},
    { name: "Victoria Heights", type: "commercial", status: "ready", loc: "Vidyanagar", detail: "Showrooms & Offices", tag: "Showroom Plaza", note: "Ready Possession", img: "heights", pos: "center 40%" },
    { name: "Victoria Edge", type: "commercial", status: "uc", loc: "Sidsar", detail: "Showrooms & Offices", tag: "Near New High Court", note: "Possession 2027", floorplans: [
      { src: "edge-ground", label: "Ground Floor" },
      { src: "edge-typical", label: "Typical Floor" },
    ]},
    { name: "Victoria Corporate", type: "commercial", status: "ready", loc: "Krishna Nagar", detail: "Corporate Offices & Showrooms", tag: "Corporate Tower", note: "Ready Possession", img: "corporate", pos: "center 40%", floorplans: [
      { src: "corp-ground", label: "Ground Floor" },
      { src: "corp-typical", label: "Typical Floor" },
      { src: "corp-7th", label: "7th Floor" },
    ]},
    { name: "Victoria Akshar", type: "commercial", status: "uc", loc: "Waghawadi Road", detail: "Offices · Shops · Showrooms", tag: "Showroom Tower", note: "Possession 2027", img: "akshar", pos: "center" },
  ];
  window.RACHANA_PROJECTS = PROJECTS;

  /* expose floor plans for the lightbox, keyed by project slug */
  const FP = {};
  PROJECTS.forEach(p => { if (p.floorplans && p.floorplans.length) FP[slug(p.name)] = { name: p.name, plans: p.floorplans }; });
  window.RACHANA_FLOORPLANS = FP;

  const pin = '<svg viewBox="0 0 24 24" width="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';
  const bldg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M9 7h2M9 11h2M9 15h2"/><path d="M17 21V9h2a1 1 0 0 1 1 1v11"/></svg>';
  const tagIc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor"/></svg>';
  const planIc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M9 9v12M3 15h6"/></svg>';

  function card(p, i) {
    const artClass = arts[i % arts.length];
    const artKind = artKinds[i % artKinds.length];
    const seed = (i * 53 + 31) % 200;
    const statusLabel = p.status === "ready" ? "Ready Possession" : "Under Construction";
    const statusClass = p.status === "ready" ? "ready" : "uc";
    const typeLabel = p.type === "residential" ? "Residential" : "Commercial";
    const detailPage = p.type === "residential" ? "residential.html" : "commercial.html";
    const visual = p.img
      ? `<img class="pc-img" src="assets/img/victoria/${p.img}.jpg" alt="${p.name} — ${p.loc}, Bhavnagar" loading="lazy" style="object-position:${p.pos || "center"}" />`
      : `<div class="art ${artClass}" data-art="${artKind}" data-seed="${seed}" style="position:absolute;inset:0"></div>`;
    const fpBtn = (p.floorplans && p.floorplans.length)
      ? `<button class="fp-btn" data-fp="${slug(p.name)}" type="button">${planIc} Floor Plans (${p.floorplans.length})</button>`
      : "";
    return `
    <article class="project-card filter-item reveal" data-cat="${p.type} ${p.status} ${slug(p.loc)}" data-delay="${(i % 3) + 1}">
      <div class="pc-visual">
        ${visual}
        <div class="pc-tags"><span class="tag ${p.type === "residential" ? "gold" : "teal"}">${typeLabel}</span><span class="tag ${statusClass}">${statusLabel}</span></div>
        <div class="pc-glitch-label">
          <h3 class="glitch" data-text="${p.name}">${p.name}</h3>
          <div class="loc">${pin} ${p.loc}, Bhavnagar</div>
        </div>
      </div>
      <div class="pc-body">
        <ul class="pc-specs">
          <li>${bldg} ${p.detail}</li>
          <li>${tagIc} ${p.tag}</li>
        </ul>
        ${fpBtn}
        <div class="pc-foot">
          <div class="price">On Request<small>${p.note}</small></div>
          <a class="link-arrow" href="${detailPage}"><span>Details</span></a>
        </div>
      </div>
    </article>`;
  }

  document.querySelectorAll("[data-projects]").forEach(box => {
    const type = box.dataset.type || "all";
    const status = box.dataset.status || "all";
    const loc = box.dataset.loc || "all";
    const limit = parseInt(box.dataset.limit || "999", 10);
    let list = PROJECTS.filter(p =>
      (type === "all" || p.type === type) &&
      (status === "all" || p.status === status) &&
      (loc === "all" || slug(p.loc) === loc)
    );
    list = list.slice(0, limit);
    box.classList.add("grid", box.dataset.cols || "g-3");
    box.innerHTML = list.map((p, i) => card(p, i)).join("") ||
      `<p class="muted">More landmarks in this category are on the way — <a class="link-arrow" href="contact.html"><span>register your interest</span></a>.</p>`;
  });
})();

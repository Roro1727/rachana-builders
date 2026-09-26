/* =====================================================================
   RACHANA BUILDERS — Floor-plan / photo-gallery lightbox
   Opens from any [data-fp="<project-slug>"] (floor plans) or
   [data-gallery="<project-slug>"] (real site photos) trigger.
   Thumbnails + prev/next + click-to-zoom.
   ===================================================================== */
(function () {
  "use strict";
  const FP = window.RACHANA_FLOORPLANS || {};
  const GAL = window.RACHANA_GALLERIES || {};
  if (!Object.keys(FP).length && !Object.keys(GAL).length) return;
  const BASES = {
    fp: "assets/img/victoria/floorplans/",
    gallery: "assets/img/victoria/gallery/",
  };
  let BASE = BASES.fp;

  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.innerHTML = `
    <div class="lb-head">
      <div class="lb-title" id="lbTitle"></div>
      <button class="lb-close" id="lbClose" aria-label="Close floor plans">&times;</button>
    </div>
    <div class="lb-stage" id="lbStage">
      <button class="lb-nav lb-prev" id="lbPrev" aria-label="Previous">
        <svg viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <img id="lbImg" alt="Floor plan" />
      <button class="lb-nav lb-next" id="lbNext" aria-label="Next">
        <svg viewBox="0 0 24 24" width="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
    <div class="lb-label" id="lbLabel"></div>
    <div class="lb-thumbs" id="lbThumbs"></div>`;
  document.body.appendChild(lb);

  const $ = id => lb.querySelector(id);
  const elTitle = $("#lbTitle"), elImg = $("#lbImg"), elLabel = $("#lbLabel"),
        elThumbs = $("#lbThumbs"), elStage = $("#lbStage");
  let plans = [], idx = 0;

  function show(i) {
    idx = (i + plans.length) % plans.length;
    const p = plans[idx];
    elStage.classList.remove("zoomed");
    elImg.src = BASE + p.src + ".jpg";
    elLabel.textContent = p.label + "  ·  " + (idx + 1) + " / " + plans.length;
    elThumbs.querySelectorAll(".lb-thumb").forEach((t, k) => t.classList.toggle("active", k === idx));
    elThumbs.children[idx] && elThumbs.children[idx].scrollIntoView({ block: "nearest", inline: "center" });
  }

  function open(slug, kind) {
    const data = kind === "gallery" ? GAL[slug] : FP[slug];
    if (!data) return;
    BASE = BASES[kind === "gallery" ? "gallery" : "fp"];
    plans = data.plans;
    elTitle.innerHTML = data.name + "<small>" + (kind === "gallery" ? "Site Photos" : "Floor Plans") + "</small>";
    elThumbs.innerHTML = plans.map((p, k) =>
      `<button class="lb-thumb" data-i="${k}" aria-label="${p.label}"><img src="${BASE + p.src}.jpg" alt="${p.label}" loading="lazy"/></button>`).join("");
    show(0);
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function close() { lb.classList.remove("open"); document.body.style.overflow = ""; }

  /* open from any trigger */
  document.addEventListener("click", (e) => {
    const tFp = e.target.closest("[data-fp]");
    const tGal = e.target.closest("[data-gallery]");
    if (tFp) { e.preventDefault(); open(tFp.dataset.fp, "fp"); }
    else if (tGal) { e.preventDefault(); open(tGal.dataset.gallery, "gallery"); }
  });

  /* controls */
  $("#lbClose").addEventListener("click", close);
  $("#lbPrev").addEventListener("click", () => show(idx - 1));
  $("#lbNext").addEventListener("click", () => show(idx + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
  elThumbs.addEventListener("click", (e) => {
    const th = e.target.closest(".lb-thumb"); if (th) show(+th.dataset.i);
  });
  /* click image to toggle zoom (enlarge to natural size, scrollable) */
  elImg.addEventListener("click", () => elStage.classList.toggle("zoomed"));

  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(idx - 1);
    else if (e.key === "ArrowRight") show(idx + 1);
  });
})();

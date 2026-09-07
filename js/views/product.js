/* ============================================================
   TechBench Store — PRODUCT DETAIL VIEW
   Trust stack: unit serial, bench certificate w/ print,
   grading explainer, CheckMend verification link, photos.
   ============================================================ */

function renderProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  const view = document.getElementById("view");
  if (!p) {
    view.innerHTML = `<div style="text-align:center;padding:80px 20px;color:var(--muted);">Product not found. <a href="#/">← Back to store</a></div>`;
    return;
  }

  const isAvail = p.status === "available";
  const sold = p.status === "sold";
  const incoming = p.status === "incoming";

  const waEnquiry = waLink(`Hi TechBench, I'm interested in the ${p.model}${p.storage ? " " + p.storage : ""} (${p.color || ""}) — ${isAvail ? zar(p.price) : ""}`);
  const waReport = waLink(`Hi TechBench, please send the bench report + photos for the ${p.model} (Unit ${p.unit || ""})`);

  const specRows = Object.entries(p.specs || {})
    .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join("");

  // ---- Bench certificate (visible trust block) ----
  const benchChecks = p.bench && p.bench.length;
  const certLink = p.unit ? `<a class="cert-link" href="certs/${p.unit}.html" target="_blank" rel="noopener">🔗 View public certificate for ${p.unit}</a>` : "";
  const benchHTML = benchChecks ? `
    <div class="d-section cert" id="bench-cert">
      <div class="cert-head">
        <div>
          <h3 style="margin:0 0 2px;"><span class="tick">✓</span> Bench Certificate</h3>
          <div class="cert-unit">Unit <b>${p.unit || "—"}</b> · Tested ${p.benchDate ? new Date(p.benchDate).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" }) : "—"} · TechBench, South Africa</div>
        </div>
        <span class="cert-stamp">PASSED ✓</span>
      </div>
      <div class="bench-list">${p.bench.map(b => `<div><span class="ok">✓</span> ${b}</div>`).join("")}</div>
      <div class="cert-foot">
        <span>${p.bench.length} of ${p.bench.length} checks passed on the TechBench workbench</span>
        <span style="display:flex;gap:10px;flex-wrap:wrap;">${certLink}<button class="btn btn-ghost btn-small" id="cert-print">🖨️ Print / save certificate</button></span>
      </div>
    </div>` : (p.status === "sold"
      ? `<div class="d-section cert"><div class="cert-head"><div><h3 style="margin:0;">✓ Bench Certificate</h3><div class="cert-unit">Unit ${p.unit || "—"} · Tested ${p.benchDate || "—"} · passed full bench test before shipping</div></div><span class="cert-stamp" style="background:var(--green);color:#fff;">SOLD ✓</span></div>${certLink ? `<div class="cert-foot" style="border:none;padding:12px 0 0;">${certLink}</div>` : ""}</div>`
      : `<div class="d-section cert"><div class="cert-head"><div><h3 style="margin:0;">🔜 Bench Certificate pending</h3><div class="cert-unit">Unit ${p.unit || "—"} will be bench-tested when it lands — report published here before it's listed.</div></div></div></div>`);

  // ---- Grading explainer trigger ----
  const gradeExplain = GRADES[p.grade] ? `
    <button class="grade-link" id="grade-info">ℹ️ What does "${gradeLabel(p.grade)}" mean?</button>` : "";

  const notesHTML = p.notes ? `<div class="d-section"><div class="d-notes">📌 ${p.notes}</div></div>` : "";

  // ---- Verified buyer reviews (exported from the DB — approved only) ----
  const unitReviews = (typeof REVIEWS !== "undefined" && p.unit && REVIEWS[p.unit]) || [];
  const starRow = (n) => "★".repeat(n) + "☆".repeat(5 - n);
  const reviewsHTML = `
    <div class="d-section" id="reviews">
      <h3 style="margin-bottom:14px;">💬 Buyer reviews <span class="verified-badge">✓ verified buyers only</span></h3>
      ${unitReviews.length ? `
        <div class="review-list">
          ${unitReviews.map(r => `
            <div class="review-item">
              <div class="review-head">
                <span class="review-stars" style="color:var(--bench);letter-spacing:1px;">${starRow(r.rating)}</span>
                <span class="review-verified">✓ Verified buyer of ${r.unit}</span>
              </div>
              <p style="margin:8px 0 4px;font-size:14.5px;line-height:1.6;">${r.text}</p>
              <small style="color:var(--muted);">${r.author} · ${new Date(r.date).toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" })}</small>
            </div>`).join("")}
        </div>` : `
        <p style="font-size:14px;color:var(--muted);line-height:1.6;">No reviews yet for this unit — it ships with a written 7-day warranty, and its next owner gets to write the first verified review. <a href="docs/grades.html" style="color:var(--bench);">See how grading works →</a></p>`}
    </div>`;

  const savePct = p.was ? Math.round((1 - p.price / p.was) * 100) : 0;

  // ---- Photo or emoji visual ----
  const visual = p.photo
    ? `<img src="${p.photo}" alt="${p.model}" class="detail-photo">`
    : `<span class="big-emoji">${p.emoji}</span>`;

  const actions = isAvail ? `
    <div class="d-actions">
      <button class="btn btn-orange" id="d-add">${ICON_CART} Add to cart</button>
      <a class="btn btn-wa" href="${waEnquiry}" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width:17px;height:17px;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Enquire on WhatsApp
      </a>
    </div>
    <button class="btn btn-ghost btn-block" id="d-report">📋 Request full bench report + real photos</button>`
  : sold ? `<div class="d-actions"><a class="btn btn-wa btn-block" href="${waLink("Hi TechBench, is the " + p.model + " sold? Do you have a similar unit coming in?")}">This unit sold — ask about similar</a></div>`
  : `<div class="d-actions"><a class="btn btn-wa btn-block" href="${waLink("Hi TechBench, notify me when the " + p.model + " lands on the bench")}">🔔 Notify me when it lands</a></div>`;

  view.innerHTML = `
    <nav style="padding:16px 0 0;font-size:13px;color:var(--muted);">
      <a href="#/" data-link style="color:var(--muted);text-decoration:none;">← Store</a>
      &nbsp;/&nbsp; ${p.category} &nbsp;/&nbsp; <b style="color:var(--ink);">${p.model}</b>
    </nav>
    <div class="detail">
      <div class="detail-visual">
        <div class="detail-badges">
          <span class="p-grade ${gradeClass(p.grade)}" style="position:static;">${gradeLabel(p.grade)}</span>
          ${p.battery ? `<span class="p-grade" style="position:static;background:rgba(255,255,255,.14);color:#fff;">🔋 ${p.battery}%</span>` : ""}
          ${p.unit ? `<span class="p-grade" style="position:static;background:rgba(255,255,255,.14);color:#fff;">🔧 ${p.unit}</span>` : ""}
        </div>
        ${visual}
        ${gradeExplain}
      </div>
      <div class="detail-info">
        <h1>${p.model}${p.storage ? " · " + p.storage : ""}</h1>
        <div class="d-sub">${p.color ? p.color + " · " : ""}${p.category} · ${p.tagline || "Bench-tested"}</div>
        <div class="d-price-row">
          ${isAvail ? `
            ${p.was ? `<span class="d-was">${zar(p.was)}</span>` : ""}
            <span class="d-price">${zar(p.price)}</span>
            ${savePct ? `<span class="d-save">SAVE ${savePct}%</span>` : ""}
          ` : sold ? `<span class="d-price" style="color:var(--muted);">Sold</span>` : `<span class="d-price">Coming soon</span>`}
        </div>
        ${isAvail ? `<div class="d-free">✓ Free door-to-door delivery · 7-day warranty · IMEI &amp; iCloud verified · <a href="https://www.checkmend.com/za/" target="_blank" rel="noopener" style="color:var(--bench);text-decoration:underline;">CheckMend check on request</a></div>` : ""}
        ${actions}
        <div class="d-section">
          <p style="font-size:14.5px;color:var(--muted);">${p.description || ""}</p>
        </div>
        ${Object.keys(p.specs || {}).length ? `<div class="d-section">
          <h3>📋 Device details</h3>
          <table class="spec-table">${specRows}</table>
        </div>` : ""}
        ${benchHTML}
        ${notesHTML}
        ${reviewsHTML}
      </div>
    </div>`;

  // bind: add to cart
  const addBtn = document.getElementById("d-add");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      Cart.add(p.id, 1);
      addBtn.innerHTML = "✓ Added to cart";
      addBtn.style.background = "var(--green)";
      setTimeout(() => { addBtn.innerHTML = ICON_CART + " Add to cart"; addBtn.style.background = ""; }, 1400);
    });
  }
  // bind: bench report request
  const reportBtn = document.getElementById("d-report");
  if (reportBtn) {
    reportBtn.addEventListener("click", () => { window.open(waReport, "_blank"); });
  }
  // bind: print certificate
  const certPrint = document.getElementById("cert-print");
  if (certPrint) {
    certPrint.addEventListener("click", () => window.print());
  }
  // bind: grade explainer → simple modal
  const gradeBtn = document.getElementById("grade-info");
  if (gradeBtn) {
    gradeBtn.addEventListener("click", () => {
      const gradeKey = p.grade;
      const text = GRADES[gradeKey] || GRADES.A;
      const modal = document.createElement("div");
      modal.className = "modal-wrap";
      modal.innerHTML = `
        <div class="modal-card">
          <button class="modal-close" aria-label="Close">✕</button>
          <h3>${gradeLabel(p.grade)} grade at TechBench</h3>
          <p style="color:var(--muted);line-height:1.6;">${text}</p>
          <a class="btn btn-wa btn-block" href="${waLink("Hi TechBench, can you send me the real photos of the " + p.model + "?")}" target="_blank" rel="noopener">📷 See real photos on WhatsApp</a>
        </div>`;
      document.body.appendChild(modal);
      modal.querySelector(".modal-close").addEventListener("click", () => modal.remove());
      modal.addEventListener("click", e => { if (e.target === modal) modal.remove(); });
    });
  }
}

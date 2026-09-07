/* ============================================================
   TechBench Store — CATALOG VIEW
   Filters (category), sort, search, product grid.
   ============================================================ */

const state = {
  category: "All",
  sort: "featured",
  search: ""
};

function gradeClass(g) {
  return g === "A" ? "gA" : g === "B" ? "gB" : g === "C" ? "gC" : "";
}
function gradeLabel(g) {
  if (g === "incoming") return "INCOMING";
  return g + "-GRADE";
}

function filteredProducts() {
  let list = PRODUCTS.slice();
  if (state.category !== "All") {
    list = list.filter(p => p.category === state.category);
  }
  if (state.search) {
    const q = state.search.toLowerCase();
    list = list.filter(p =>
      (p.model + " " + (p.storage || "") + " " + (p.color || "") + " " + p.category).toLowerCase().includes(q)
    );
  }
  // sort
  switch (state.sort) {
    case "price-asc": list.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
    case "price-desc": list.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
    case "battery": list.sort((a, b) => (b.battery || 0) - (a.battery || 0)); break;
    default: // featured first, then available, then incoming/sold
      const rank = p => p.status === "available" ? (p.featured ? 0 : 1) : p.status === "incoming" ? 2 : 3;
      list.sort((a, b) => rank(a) - rank(b));
  }
  return list;
}

function renderCatalog() {
  const view = document.getElementById("view");
  const list = filteredProducts();
  const avail = list.filter(p => p.status === "available").length;
  const incoming = list.filter(p => p.status === "incoming").length;

  const hero = (!state.search && state.category === "All") ? `
    <div class="home-hero">
      <div class="hh-copy">
        <h1>Quality pre-owned tech,<br><span class="hh-accent">bench-tested before it ships.</span></h1>
        <p>Every device runs a full test pass on our bench — real grade, real battery health, real photos, and a dated certificate for the exact unit you buy. Free delivery, 7-day warranty, one human on WhatsApp.</p>
        <div class="hh-stats">
          <div><b>${avail}</b><small>units on the bench now</small></div>
          <div><b>100%</b><small>IMEI &amp; iCloud checked</small></div>
          <div><b>7-day</b><small>written warranty</small></div>
        </div>
      </div>
      <div class="hh-trust">
        <div class="trust-card"><span class="tc-ic">🛡️</span><div><b>No stolen or locked stock</b><small>Blacklist + iCloud verified on every unit</small></div></div>
        <div class="trust-card"><span class="tc-ic">🔋</span><div><b>Honest battery health</b><small>The real number, from Settings</small></div></div>
        <div class="trust-card"><span class="tc-ic">🚚</span><div><b>Free tracked delivery</b><small>Paxi or Courier Guy, door to door</small></div></div>
        <div class="trust-card"><span class="tc-ic">💬</span><div><b>Pay after proof</b><small>Bench report + photos before you pay</small></div></div>
      </div>
    </div>` : "";

  view.innerHTML = `
    ${hero}
    <div class="toolbar">
      <div class="result-count"><b>${avail}</b> available${incoming ? ` · <b>${incoming}</b> incoming` : ""}${state.category !== "All" ? ` in ${state.category}` : ""}${state.search ? ` for "${state.search}"` : ""}</div>
      <select class="sort-select" id="sort-select" aria-label="Sort products">
        <option value="featured" ${state.sort === "featured" ? "selected" : ""}>Featured</option>
        <option value="price-asc" ${state.sort === "price-asc" ? "selected" : ""}>Price: low → high</option>
        <option value="price-desc" ${state.sort === "price-desc" ? "selected" : ""}>Price: high → low</option>
        <option value="battery" ${state.sort === "battery" ? "selected" : ""}>Best battery</option>
      </select>
    </div>
    <div class="product-grid" id="product-grid">
      ${list.length ? list.map(cardHTML).join("") : `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--muted);">
        <div style="font-size:44px;margin-bottom:10px;">🔍</div>
        Nothing found${state.search ? ` for "${state.search}"` : ""}.<br>
        <a href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi TechBench, I'm looking for " + (state.search || "a device") + " - can you source it?")}" style="font-weight:700;">Ask us to source it →</a>
      </div>`}
    </div>
  `;

  // bind sort
  document.getElementById("sort-select").addEventListener("change", e => {
    state.sort = e.target.value;
    renderCatalog();
  });

  // bind card events
  document.querySelectorAll("[data-product]").forEach(card => {
    const id = card.dataset.product;
    card.addEventListener("click", e => {
      if (e.target.closest("[data-add]") || e.target.closest("a")) return;
      location.hash = `#/product/${id}`;
    });
  });
  document.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const id = btn.dataset.add;
      Cart.add(id, 1);
      btn.classList.add("added");
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>';
      setTimeout(() => {
        btn.classList.remove("added");
        btn.innerHTML = ICON_CART;
      }, 1200);
    });
  });
}

function cardHTML(p) {
  const isAvail = p.status === "available";
  const isIncoming = p.status === "incoming";
  const sold = p.status === "sold";

  const specsHTML = [p.battery ? `<span>${ICON_CHECK} <span class="ok"></span>🔋 ${p.battery}%</span>` : "",
    `<span>${ICON_CHECK} IMEI clean</span>`, `<span>${ICON_CHECK} iCloud clear</span>`]
    .filter(s => s && (isAvail || sold)).slice(0, 2).join("");

  const addBtn = isAvail
    ? `<button class="p-add" data-add="${p.id}" aria-label="Add ${p.model} to cart">${ICON_CART}</button>`
    : isIncoming
      ? `<a href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi TechBench, notify me when the " + p.model + " lands")}" class="p-add" style="text-decoration:none;background:var(--orange);font-size:16px;">🔔</a>`
      : "";

  const visualContent = p.photo
    ? `<img src="${p.photo}" alt="${p.model}" class="card-photo" loading="lazy">`
    : `<span class="p-emoji">${p.emoji}</span>`;

  return `
    <div class="p-card ${sold ? "sold" : ""} ${isIncoming ? "incoming" : ""}" data-product="${p.id}">
      <div class="p-visual">
        <span class="p-cat">${p.category}</span>
        <span class="p-grade ${gradeClass(p.grade)}">${gradeLabel(p.grade)}</span>
        ${visualContent}
      </div>
      <div class="p-body">
        <div class="p-title">${p.model}${p.storage ? " · " + p.storage : ""}</div>
        <div class="p-sub">${p.tagline || (p.color ? p.color : "")}</div>
        <div class="p-unit">${p.unit ? `🔧 Unit ${p.unit} · bench-tested` : ""}</div>
        ${specsHTML ? `<div class="p-specs">${specsHTML}</div>` : ""}
        <div class="p-bottom">
          <div class="p-price">
            ${p.was ? `<span class="was">${zar(p.was)}</span>` : ""}
            ${isAvail ? zar(p.price) : isIncoming ? "Soon" : "Sold"}
          </div>
          ${addBtn}
        </div>
      </div>
    </div>`;
}

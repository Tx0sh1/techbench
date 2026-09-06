/* ============================================================
   TechBench Store — APP ENTRY
   Wires router, category chips, search, cart drawer, init.
   ============================================================ */

/* ---------- category chips ---------- */
function renderChips() {
  const el = document.getElementById("category-chips");
  if (!el) return;
  el.innerHTML = CATEGORIES.map(c =>
    `<button class="chip ${state.category === c ? "active" : ""}" data-cat="${c}">${c}</button>`
  ).join("");
  el.querySelectorAll("[data-cat]").forEach(chip => {
    chip.addEventListener("click", () => {
      state.category = chip.dataset.cat;
      renderChips();
      renderCatalog();
    });
  });
  // footer categories
  const fc = document.getElementById("footer-cats");
  if (fc) {
    fc.innerHTML = CATEGORIES.filter(c => c !== "All").map(c =>
      `<li><a href="#/" data-cat-link="${c}" style="cursor:pointer;">${c}</a></li>`
    ).join("");
    fc.querySelectorAll("[data-cat-link]").forEach(a => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        state.category = a.dataset.catLink;
        renderChips();
        location.hash = "#/";
        renderCatalog();
      });
    });
  }
}

/* ---------- search ---------- */
function bindSearch() {
  const input = document.getElementById("search-input");
  if (!input) return;
  let t;
  input.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => {
      state.search = input.value.trim();
      if (Router.current.startsWith("product") || Router.current === "checkout") {
        location.hash = "#/";
      } else {
        renderCatalog();
      }
    }, 250);
  });
}

/* ---------- cart drawer events ---------- */
function bindCartDrawer() {
  document.getElementById("open-cart").addEventListener("click", openCart);
  document.getElementById("cart-close").addEventListener("click", closeCart);
  document.getElementById("cart-overlay").addEventListener("click", closeCart);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeCart(); });
}

/* ---------- router ---------- */
function bindRouter() {
  window.addEventListener("hashchange", () => Router.navigate(location.hash));
  // intercept in-page links that carry data-link or hash targets handled by router
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#/"]');
    if (link) {
      e.preventDefault();
      location.hash = link.getAttribute("href");
    }
  });
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  Cart.load();
  Cart.renderCount();
  renderChips();
  bindSearch();
  bindCartDrawer();
  bindRouter();
  Router.navigate(location.hash || "#/");
});

/* ---------- expose for devtools/testing ---------- */
window.TB = { Cart, Router, state, PRODUCTS, CATEGORIES, GRADES, zar };

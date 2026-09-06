/* ============================================================
   TechBench Store — ENGINE
   Cart state, localStorage persistence, ZAR formatting,
   toasts, helpers. Framework-free.
   ============================================================ */

/* ---------- ZAR formatting ---------- */
// Deterministic comma formatting (en-ZA toLocaleString inserts spaces in some
// environments — bad for prices and WhatsApp order messages). SA convention: R4,999.
function zar(n) {
  const v = Number(n || 0);
  const s = Math.round(v).toString();
  const withCommas = s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return "R" + withCommas;
}

/* ---------- Cart state ---------- */
const Cart = {
  KEY: "techbench_cart_v1",
  items: [],

  load() {
    try {
      this.items = JSON.parse(localStorage.getItem(this.KEY) || "[]");
    } catch (_) { this.items = []; }
  },
  save() {
    localStorage.setItem(this.KEY, JSON.stringify(this.items));
    this.renderCount();
  },
  add(productId, qty = 1) {
    const p = PRODUCTS.find(x => x.id === productId);
    if (!p || p.status !== "available") return false;
    const existing = this.items.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ id: productId, qty });
    }
    this.save();
    toast(`Added ${p.model} to cart`);
    return true;
  },
  remove(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.save();
    renderCart();
  },
  setQty(productId, qty) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;
    if (qty <= 0) { this.remove(productId); return; }
    item.qty = qty;
    this.save();
    renderCart();
  },
  clear() {
    this.items = [];
    this.save();
  },
  count() {
    return this.items.reduce((n, i) => n + i.qty, 0);
  },
  total() {
    return this.items.reduce((sum, i) => {
      const p = PRODUCTS.find(x => x.id === i.id);
      return sum + (p ? p.price * i.qty : 0);
    }, 0);
  },
  renderCount() {
    const el = document.getElementById("cart-count");
    if (!el) return;
    const c = this.count();
    el.textContent = c;
    el.classList.toggle("empty", c === 0);
  }
};

/* ---------- Toasts ---------- */
function toast(msg, icon = "✓") {
  const wrap = document.getElementById("toast-wrap");
  if (!wrap) return;
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `<span class="t-ic">${icon}</span> ${msg}`;
  wrap.appendChild(t);
  setTimeout(() => {
    t.style.opacity = "0";
    t.style.transition = "opacity .3s";
    setTimeout(() => t.remove(), 320);
  }, 2400);
}

/* ---------- WhatsApp helpers ---------- */
function waLink(message) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ---------- Router ---------- */
const Router = {
  current: "catalog",

  navigate(hash) {
    // hash format: #/  |  #/product/ID  |  #/checkout  |  #/guide | #/faq | #/how
    const clean = (hash || "").replace(/^#\/?/, "");
    const parts = clean.split("/").filter(Boolean);

    if (parts[0] === "product" && parts[1]) {
      this.current = `product:${parts[1]}`;
      renderProduct(parts[1]);
    } else if (parts[0] === "checkout") {
      this.current = "checkout";
      renderCheckout();
    } else if (parts[0] === "guide" || parts[0] === "faq" || parts[0] === "how") {
      this.current = parts[0];
      renderContent(parts[0]);
    } else {
      this.current = "catalog";
      renderCatalog();
    }
    window.scrollTo({ top: 0 });
    closeCart();
  }
};

/* ---------- Cart drawer controls ---------- */
function openCart() {
  renderCart();
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
}
function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
}

/* ---------- shared SVG ---------- */
const ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:12px;height:12px;"><path d="M20 6L9 17l-5-5"/></svg>';
const ICON_CART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>';


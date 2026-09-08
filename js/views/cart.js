/* ============================================================
   TechBench Store — CART DRAWER VIEW
   ============================================================ */

function renderCart() {
  const itemsEl = document.getElementById("cart-items");
  const footEl = document.getElementById("cart-foot");
  const items = Cart.items;
  const count = Cart.count();

  if (!items.length) {
    itemsEl.innerHTML = `<div class="cart-empty">
      <div class="big">🛒</div>
      Your cart is empty.<br>
      <a href="#/" data-link style="font-weight:700;">Browse the store →</a>
    </div>`;
    footEl.innerHTML = "";
    Cart.renderCount();
    return;
  }

  itemsEl.innerHTML = items.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return "";
    return `
      <div class="cart-item">
        <div class="ci-emoji">${p.emoji}</div>
        <div class="ci-info">
          <div class="ci-title">${p.model}${p.storage ? " " + p.storage : ""}</div>
          <div class="ci-sub">${p.grade}-grade · ${p.color || ""} · 🔋${p.battery ?? "—"}%</div>
          <div class="ci-price">${zar(p.price)}</div>
          <div class="ci-qty">
            <button class="qty-btn" data-qty-minus="${p.id}" aria-label="Decrease quantity">−</button>
            <span class="q">${item.qty}</span>
            <button class="qty-btn" data-qty-plus="${p.id}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="ci-remove" data-remove="${p.id}" aria-label="Remove from cart">✕</button>
      </div>`;
  }).join("");

  footEl.innerHTML = `
    <div class="cart-total">
      <span>Total${count > 1 ? ` (${count} items)` : ""}
        <small>Paxi FREE · Courier Guy R100</small>
      </span>
      <span>${zar(Cart.total())}</span>
    </div>
    <button class="btn btn-wa btn-block" id="checkout-btn" style="width:100%;">
      Checkout via WhatsApp →
    </button>
    <div class="cart-note">No payment taken online. You'll confirm your order on WhatsApp, then pay by secure EFT. Bench reports &amp; real photos sent before you pay.</div>`;

  // bind events
  document.querySelectorAll("[data-qty-plus]").forEach(b => {
    b.addEventListener("click", () => Cart.setQty(b.dataset.qtyPlus, Cart.items.find(i => i.id === b.dataset.qtyPlus).qty + 1));
  });
  document.querySelectorAll("[data-qty-minus]").forEach(b => {
    b.addEventListener("click", () => {
      const item = Cart.items.find(i => i.id === b.dataset.qtyMinus);
      if (item) Cart.setQty(b.dataset.qtyMinus, item.qty - 1);
    });
  });
  document.querySelectorAll("[data-remove]").forEach(b => {
    b.addEventListener("click", () => Cart.remove(b.dataset.remove));
  });
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      closeCart();
      location.hash = "#/checkout";
    });
  }
  Cart.renderCount();
}

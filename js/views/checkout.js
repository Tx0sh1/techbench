/* ============================================================
   TechBench Store — CHECKOUT VIEW
   Collects buyer details, then opens WhatsApp with a fully
   formatted order. No payment gateway needed — EFT follows
   the WhatsApp confirmation. This is the SA way to sell.
   ============================================================ */

function renderCheckout() {
  const view = document.getElementById("view");
  const items = Cart.items;

  if (!items.length) {
    view.innerHTML = `<div style="text-align:center;padding:80px 20px;color:var(--muted);">
      <div style="font-size:44px;margin-bottom:10px;">🛒</div>
      Your cart is empty — nothing to check out.<br>
      <a href="#/" data-link style="font-weight:700;">← Back to the store</a>
    </div>`;
    return;
  }

  const rows = items.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return `<div class="os-row"><span>${p.emoji} ${p.model}${p.storage ? " " + p.storage : ""} × ${item.qty}</span><span>${zar(p.price * item.qty)}</span></div>`;
  }).join("");

  view.innerHTML = `
    <div class="checkout">
      <a href="#/" data-link style="font-size:13px;color:var(--muted);text-decoration:none;">← Back to store</a>
      <h1 style="margin-top:14px;">Checkout</h1>
      <div class="c-sub">Tell us where to deliver — we'll confirm everything on WhatsApp, send the bench reports + real photos, then you pay by secure EFT.</div>

      <div class="order-summary">
        <h4>Your order</h4>
        ${rows}
        <div class="os-row total"><span>Total — free delivery</span><span>${zar(Cart.total())}</span></div>
      </div>

      <div class="form-group">
        <label for="c-name">Your name</label>
        <input id="c-name" type="text" placeholder="e.g. Thabo Nkosi" autocomplete="name">
      </div>
      <div class="form-group">
        <label for="c-phone">WhatsApp number</label>
        <input id="c-phone" type="tel" placeholder="e.g. 082 123 4567" autocomplete="tel">
      </div>
      <div class="form-group">
        <label>Delivery method</label>
        <div class="delivery-options" id="delivery-options">
          <label class="delivery-opt selected" data-delivery="Courier Guy">
            <input type="radio" name="delivery" value="Courier Guy" checked>
            <div><b>🚚 Courier Guy</b><small>Fast door-to-door · 1-3 days · tracked</small></div>
          </label>
          <label class="delivery-opt" data-delivery="Paxi">
            <input type="radio" name="delivery" value="Paxi">
            <div><b>📦 Paxi (PEP)</b><small>Affordable door-to-door · 3-7 days</small></div>
          </label>
          <label class="delivery-opt" data-delivery="Collection">
            <input type="radio" name="delivery" value="Collection">
            <div><b>🤝 Safe collection</b><small>Meet in a safe public place · inspect before paying</small></div>
          </label>
        </div>
      </div>
      <div class="form-group hidden" id="address-group">
        <label for="c-address">Delivery address</label>
        <textarea id="c-address" rows="2" placeholder="Street address, suburb, city, province"></textarea>
      </div>
      <div class="form-group">
        <label for="c-notes">Notes (optional)</label>
        <input id="c-notes" type="text" placeholder="Anything we should know?">
      </div>

      <button class="btn btn-wa btn-block" id="place-order" style="padding:16px;font-size:16px;">
        <svg viewBox="0 0 24 24" fill="currentColor" style="width:19px;height:19px;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Place order on WhatsApp
      </button>
      <div class="checkout-note">Ordering opens WhatsApp with your order pre-filled — hit send and it's with us. We reply with bench reports, photos and payment details. No online payment needed.</div>
    </div>
  `;

  // delivery option toggle
  let delivery = "Courier Guy";
  document.querySelectorAll(".delivery-opt").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".delivery-opt").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      delivery = opt.dataset.delivery;
      document.getElementById("address-group").classList.toggle("hidden", delivery === "Collection");
    });
  });

  // place order
  document.getElementById("place-order").addEventListener("click", () => {
    const name = document.getElementById("c-name").value.trim();
    const phone = document.getElementById("c-phone").value.trim();
    const address = document.getElementById("c-address") ? document.getElementById("c-address").value.trim() : "";
    const notes = document.getElementById("c-notes").value.trim();

    if (!name) { toast("Please enter your name", "⚠️"); document.getElementById("c-name").focus(); return; }
    if (!phone || phone.replace(/\D/g, "").length < 9) { toast("Please enter a valid phone number", "⚠️"); document.getElementById("c-phone").focus(); return; }
    if (delivery !== "Collection" && !address) { toast("Please enter your delivery address", "⚠️"); document.getElementById("c-address").focus(); return; }

    // build the order message
    const lines = [];
    lines.push("🛒 *NEW ORDER — TechBench Store*");
    lines.push("");
    lines.push(`👤 *Name:* ${name}`);
    lines.push(`📱 *Phone:* ${phone}`);
    lines.push(`🚚 *Delivery:* ${delivery}`);
    if (delivery !== "Collection" && address) lines.push(`📍 *Address:* ${address}`);
    if (notes) lines.push(`📝 *Notes:* ${notes}`);
    lines.push("");
    lines.push("*Items:*");
    Cart.items.forEach(item => {
      const p = PRODUCTS.find(x => x.id === item.id);
      if (p) lines.push(`• ${p.model}${p.storage ? " " + p.storage : ""} (${p.grade}-grade${p.battery ? ", 🔋" + p.battery + "%" : ""}) × ${item.qty} — ${zar(p.price * item.qty)}`);
    });
    lines.push("");
    lines.push(`💰 *Total (free delivery):* ${zar(Cart.total())}`);
    lines.push("");
    lines.push("Please send the bench reports + real photos for the items above. I'll pay by EFT once confirmed. 🙌");

    const msg = lines.join("\n");
    window.open(waLink(msg), "_blank");
    toast("Opening WhatsApp with your order…", "📲");

    // clear cart after a beat (order placed)
    setTimeout(() => { Cart.clear(); }, 800);
  });
}

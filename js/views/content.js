/* ============================================================
   TechBench Store — CONTENT VIEWS
   Marketing pages folded into the store SPA:
   #/how    — how it works + why TechBench (trust promises)
   #/guide  — SA buyer's guide + scam awareness
   #/faq    — questions answered straight
   ============================================================ */

function renderContent(page) {
  const view = document.getElementById("view");
  const html = {
    how: `
    <div class="content-page">
      <div class="cp-head">
        <h1>From our bench to your hands</h1>
        <p class="cp-sub">Every device is treated like it's going to someone we know — because it is. Here's exactly how it works.</p>
      </div>

      <div class="steps-grid">
        <div class="step-card">
          <div class="step-num">01</div>
          <div class="step-ic">🔍</div>
          <h3>We source &amp; bench-test</h3>
          <p>Devices are sourced, IMEI-checked, and run through the full test pass on our bench before they're ever listed. If it fails any material test, it's repaired, regraded, or not sold.</p>
        </div>
        <div class="step-card">
          <div class="step-num">02</div>
          <div class="step-ic">📋</div>
          <h3>You get the proof</h3>
          <p>Real photos, real battery health, real grade — plus a dated bench certificate for the exact unit you're buying. Decide with full information.</p>
        </div>
        <div class="step-card">
          <div class="step-num">03</div>
          <div class="step-ic">🔒</div>
          <h3>Secure payment</h3>
          <p>Clear invoice, EFT to our bank. We ship only once payment reflects in-bank — never on a screenshot.</p>
        </div>
        <div class="step-card">
          <div class="step-num">04</div>
          <div class="step-ic">🚚</div>
          <h3>Free tracked delivery</h3>
          <p>Door-to-door via Paxi or Courier Guy, insured and tracked. You sign for it — that's when it becomes yours.</p>
        </div>
      </div>

      <h2 class="cp-h2">What we promise — in writing</h2>
      <div class="promise-grid">
        <div class="promise-card">
          <div class="promise-ic">📷</div>
          <h3>Honest condition reports</h3>
          <p>Real photos of the actual unit, real battery health, real grade. What you see is exactly what ships.</p>
        </div>
        <div class="promise-card">
          <div class="promise-ic">🛠️</div>
          <h3>Bench-tested, not "tested"</h3>
          <p>Every function physically verified before listing — the bench certificate proves it, unit by unit.</p>
        </div>
        <div class="promise-card">
          <div class="promise-ic">🛡️</div>
          <h3>IMEI &amp; iCloud verified</h3>
          <p>No blacklisted, stolen or iCloud-locked devices. Ever. It's the first check on the bench and non-negotiable.</p>
        </div>
        <div class="promise-card">
          <div class="promise-ic">💬</div>
          <h3>One human on WhatsApp</h3>
          <p>You talk to the person who tested your device — from first message to delivery and beyond. No call centres, no bots.</p>
        </div>
      </div>

      <div class="cp-cta">
        <h3>Ready to see what's on the bench?</h3>
        <a class="btn btn-orange" href="#/" data-link>Browse current stock →</a>
      </div>
    </div>`,

    guide: `
    <div class="content-page">
      <div class="cp-head">
        <div class="kicker">Free knowledge — no secrets</div>
        <h1>The SA Buyer's Guide</h1>
        <p class="cp-sub">We publish the exact checks we run, because an educated buyer is a happy buyer. Steal these — they'll save you from the scams out there.</p>
      </div>

      <div class="guide-grid">
        <div class="guide-card">
          <div class="gic">✅</div>
          <h3>Check the IMEI before you pay</h3>
          <p>Dial *#06#, verify it matches Settings, run it through a blacklist check. A "cheap" blacklisted iPhone is a brick with a screen.</p>
          <span class="g-tag">Blacklist · iCloud lock</span>
        </div>
        <div class="guide-card">
          <div class="gic">⚡</div>
          <h3>Why is that phone so cheap?</h3>
          <p>iCloud-locked, blacklisted, a "deposit first" scam, or wrong internals in a pretty shell. If it's far below market, you're the product.</p>
          <span class="g-tag">Too-good-to-be-true</span>
        </div>
        <div class="guide-card">
          <div class="gic">🔋</div>
          <h3>Battery health is a price lever</h3>
          <p>85%+ is good for a used phone. Below ~80% means a battery replacement is coming — price it accordingly, or walk away.</p>
          <span class="g-tag">Settings → Battery</span>
        </div>
        <div class="guide-card">
          <div class="gic">🚫</div>
          <h3>Never pay a "deposit to hold"</h3>
          <p>Real sellers don't need deposits from strangers. Meet safely, inspect before paying, and use cleared EFT or cash in hand.</p>
          <span class="g-tag">Scam pattern #1</span>
        </div>
        <div class="guide-card">
          <div class="gic">🔍</div>
          <h3>Meet somewhere public, not "my cousin's shop"</h3>
          <p>Police station, mall, bank lobby. If the seller steers you somewhere private or remote, that's a red flag — walk away.</p>
          <span class="g-tag">Safe meetups</span>
        </div>
        <div class="guide-card">
          <div class="gic">📄</div>
          <h3>Ask for the invoice &amp; proof</h3>
          <p>A real seller has a record: invoice, unit number, test report. No paperwork, no proof of the unit's history — no deal.</p>
          <span class="g-tag">Unit serials</span>
        </div>
      </div>

      <div class="cp-cta">
        <h3>We run every check above on every device we sell.</h3>
        <p>Ask us for the bench certificate of any unit — it's yours to keep before you pay a cent.</p>
        <a class="btn btn-wa" href="${waLink("Hi TechBench, please send me the bench certificate for a unit I'm looking at")}" target="_blank" rel="noopener">Ask for a bench certificate →</a>
      </div>
    </div>`,

    faq: `
    <div class="content-page">
      <div class="cp-head">
        <div class="kicker">FAQ</div>
        <h1>Questions, answered straight</h1>
      </div>
      <div class="faq">
        <details open>
          <summary>Are your phones stolen or locked?<span class="plus">+</span></summary>
          <div class="a">No. Every device passes an IMEI blacklist check and an iCloud / activation-lock check before listing. We don't sell blacklisted or locked devices — it's the first thing checked on the bench, and it's not worth our name to skip it. The bench report shows you the proof.</div>
        </details>
        <details>
          <summary>Why are you cheaper than iStore Preowned?<span class="plus">+</span></summary>
          <div class="a">iStore sells a brand name, a storefront, and retail overhead. We sell bench-test proof, direct communication with the person who tested your device, and a written warranty — without the retail cost. That's where your saving comes from, not from cutting corners.</div>
        </details>
        <details>
          <summary>What does the warranty actually cover?<span class="plus">+</span></summary>
          <div class="a">Every device includes a 7-day warranty against functional defects from delivery. It excludes physical damage, liquid damage, and battery wear from normal use (battery health is disclosed at sale). The full written policy is sent with your invoice — no fine print surprises.</div>
        </details>
        <details>
          <summary>How does delivery work?<span class="plus">+</span></summary>
          <div class="a">Free door-to-door via Paxi or Courier Guy, wherever they deliver. You get a tracking number the day it ships, and the parcel is insured. Risk passes to you only once it's signed for as delivered — if it's lost in transit, that's on us, not you.</div>
        </details>
        <details>
          <summary>How do I pay?<span class="plus">+</span></summary>
          <div class="a">By EFT to the bank account on your invoice. We ship only once payment reflects in our bank account — verified in-bank, never on a screenshot. That protects us both: you know the device is real, and we know the payment is real.</div>
        </details>
        <details>
          <summary>Can I collect instead?<span class="plus">+</span></summary>
          <div class="a">Yes — safe public meetup (police station / mall / bank lobby), and you can inspect and test the device in person before paying. Collection saves us the courier cost, so the price may be slightly lower. We'll arrange it on WhatsApp.</div>
        </details>
        <details>
          <summary>What if the device doesn't match the listing?<span class="plus">+</span></summary>
          <div class="a">Then we've misrepresented it, and you're covered: return it within 7 days for a full refund. Devices are sold as-described with real photos — if what arrives doesn't match, that's on us to make right. Our Consumer Protection Act obligations always apply.</div>
        </details>
        <details>
          <summary>Do you buy phones or take trade-ins?<span class="plus">+</span></summary>
          <div class="a">Coming soon — we're building the trade-in desk. When it launches, you'll be able to sell us your old or broken device (it feeds our repair bench and keeps prices down). Message us on WhatsApp and you'll hear first.</div>
        </details>
      </div>
      <div class="cp-cta">
        <h3>Something else on your mind?</h3>
        <a class="btn btn-wa" href="${waLink("Hi TechBench, I have a question that isn't in the FAQ")}" target="_blank" rel="noopener">Ask us on WhatsApp →</a>
      </div>
    </div>`
  }[page] || `<div style="text-align:center;padding:80px 20px;color:var(--muted);">Page not found. <a href="#/">← Back to store</a></div>`;

  view.innerHTML = html;
}

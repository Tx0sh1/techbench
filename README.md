# TechBench — Website (single product)

Quality used tech, bench-tested before it ships. South Africa.
Live: https://tx0sh1.github.io/techbench/ · Target domain: **techbench.co.za** · WhatsApp: 064 792 8206

## Structure — one product, two faces

```
index.html   ← THE STORE (public): catalog + filters/search, product pages
                 with bench certificates, cart, WhatsApp checkout, buyer's
                 guide + FAQ pages (#/guide #/faq #/how)
admin.html   ← YOUR COCKPIT (token-gated): stock manager + bench console
                 wizard. GitHub-API CMS — edits commit straight to this repo.
js/data.js   ← product catalog (add/change stock — admin does this for you)
docs/        ← public legal pages: terms.html, warranty.html
```

## Deploy
Push to main → GitHub Pages builds automatically (~1 min). No build step.
Custom domain later: DNS CNAME techbench.co.za → tx0sh1.github.io + Pages setting.

## Ownership
This repo holds ONLY the public website. The business playbook (pricing,
suppliers, margins) lives in the private techbench-ops repo — never here.

© TechBench — we verify, we test, we deliver.

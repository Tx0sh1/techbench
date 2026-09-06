/* ============================================================
   TechBench Store — DATA LAYER
   ------------------------------------------------------------
   ⚠️ THIS IS THE FILE YOU EDIT TO ADD/CHANGE STOCK.

   To add a product: copy one object below, change the values,
   save. The store rebuilds itself. That's the whole workflow.

   status: "available" | "incoming" | "sold"
   category: "Phones" | "Tablets" | "Consoles" | "Audio" | "Laptops"
   ============================================================ */
const WA_NUMBER = "27XXXXXXXXX"; // <-- YOUR WhatsApp number (intl format, no +)

const PRODUCTS = [
  {
    id: "iphone-12-128-a",
    model: "iPhone 12",
    storage: "128GB",
    category: "Phones",
    emoji: "📱",
    grade: "A",
    color: "Blue",
    battery: 88,
    price: 4999,
    was: 5499,
    status: "available",
    featured: true,
    tagline: "Excellent A-grade — micro-scratches only",
    description: "The iPhone 12 in A-grade condition: 6.1\" OLED, 5G, dual cameras, MagSafe. Bench-tested end to end — this unit is the closest thing to new you'll get without paying new prices.",
    specs: {
      "Model": "iPhone 12 (A2403)",
      "Storage": "128GB",
      "Colour": "Blue",
      "Grade": "A — excellent, micro-scratches only",
      "Battery health": "88%",
      "Network": "Unlocked — all SA networks",
      "iOS": "Latest (updated on bench)",
      "Accessories": "Cable included · no box",
      "Warranty": "30-day TechBench warranty"
    },
    bench: [
      "Screen & touch — no dead pixels, no lines",
      "OLED burn-in check — clean",
      "Face ID — enrolled & working",
      "Cameras (front + rear) — tested both",
      "Speakers, mic & earpiece — call test done",
      "Charging port + wireless — verified",
      "WiFi / Bluetooth / Cellular — all connected",
      "Buttons, haptics, sensors — full pass",
      "Liquid indicators — clean",
      "Battery drain test — normal"
    ],
    notes: "A-Grade means you'll need to hunt for the micro-scratches. Screen is pristine. Full bench report with photos sent on WhatsApp before you pay anything."
  },
  {
    id: "iphone-11-128-b",
    model: "iPhone 11",
    storage: "128GB",
    category: "Phones",
    emoji: "📱",
    grade: "B",
    color: "Black",
    battery: 84,
    price: 3499,
    was: 0,
    status: "sold",
    featured: false,
    tagline: "Delivered to a happy buyer in Pretoria ✓",
    description: "A solid B-grade iPhone 11 — honest signs of use, fully functional. Sold as proof of life: this is how TechBench works.",
    specs: {
      "Model": "iPhone 11",
      "Storage": "128GB",
      "Colour": "Black",
      "Grade": "B — visible signs of use",
      "Battery health": "84%",
      "Network": "Unlocked"
    },
    bench: [],
    notes: "SOLD ✓"
  },
  {
    id: "iphone-se-2022-64-a",
    model: "iPhone SE (2022)",
    storage: "64GB",
    category: "Phones",
    emoji: "📱",
    grade: "A",
    color: "Midnight",
    battery: 92,
    price: 2999,
    was: 3399,
    status: "available",
    featured: false,
    tagline: "A15 chip in a classic body — the budget king",
    description: "The SE 2022 packs the same A15 chip as the iPhone 13 into the classic compact body. 92% battery is outstanding for a used unit. Perfect first iPhone or reliable daily.",
    specs: {
      "Model": "iPhone SE (3rd gen, 2022)",
      "Storage": "64GB",
      "Colour": "Midnight",
      "Grade": "A",
      "Battery health": "92%",
      "Network": "Unlocked",
      "Warranty": "30-day TechBench warranty"
    },
    bench: [
      "Screen & touch — full pass",
      "Touch ID — enrolled & working",
      "Cameras — tested both",
      "Speakers & mic — call test done",
      "Charging — verified",
      "WiFi / BT / Cellular — all good",
      "Battery drain — normal"
    ],
    notes: "Battery health of 92% is exceptional for a used SE — this one was lightly used. Great value pick."
  },
  {
    id: "ipad-9-64-a",
    model: "iPad (9th gen)",
    storage: "64GB",
    category: "Tablets",
    emoji: "📱",
    grade: "A",
    color: "Space Grey",
    battery: 95,
    price: 3999,
    was: 4499,
    status: "available",
    featured: true,
    tagline: "95% battery — near-new tablet, half price",
    description: "The reliable iPad 9th gen with the A13 chip. 95% battery health means this tablet was barely used. Perfect for study, streaming, and the family.",
    specs: {
      "Model": "iPad (9th generation)",
      "Storage": "64GB WiFi",
      "Colour": "Space Grey",
      "Grade": "A",
      "Battery health": "95%",
      "Network": "WiFi only",
      "Warranty": "30-day TechBench warranty"
    },
    bench: [
      "Screen & touch — full pass",
      "Cameras — tested",
      "Speakers — tested",
      "Charging — verified",
      "WiFi / Bluetooth — connected",
      "Battery health — 95%, exceptional",
      "Apple Pencil support — working"
    ],
    notes: "95% battery on a 9th gen iPad is the best we've seen. Includes cable. Ideal study tablet."
  },
  {
    id: "ps4-slim-500-b",
    model: "PS4 Slim",
    storage: "500GB",
    category: "Consoles",
    emoji: "🎮",
    grade: "B",
    color: "White",
    battery: null,
    price: 2799,
    was: 3299,
    status: "available",
    featured: false,
    tagline: "Console + controller, fully tested",
    description: "PS4 Slim 500GB in honest B-grade. Comes with one DualShock 4 controller and power cable. Tested for hours — runs quiet, reads discs, connects to PSN.",
    specs: {
      "Model": "PS4 Slim CUH-2215B",
      "Storage": "500GB",
      "Colour": "White (glacier)",
      "Grade": "B — scuffs, fully functional",
      "Includes": "1× DualShock 4, power cable",
      "Tested": "2hr stress test on bench",
      "Warranty": "30-day TechBench warranty"
    },
    bench: [
      "Power on / off cycles — clean",
      "Disc drive — reads Blu-ray + games",
      "HDMI out — 1080p verified",
      "WiFi + Ethernet — connected",
      "Controller — all buttons, sticks, motion",
      "Fan noise — within normal range",
      "Console storage — wiped & reset",
      "PSN sign-in — verified working"
    ],
    notes: "B-grade = visible scuffs on the shell, everything inside works. Hours of bench testing, not a 2-minute boot check."
  },
  {
    id: "switch-lite-turquoise-a",
    model: "Nintendo Switch Lite",
    storage: "32GB",
    category: "Consoles",
    emoji: "🎮",
    grade: "A",
    color: "Turquoise",
    battery: null,
    price: 2499,
    was: 2899,
    status: "available",
    featured: false,
    tagline: "Handheld perfection, A-grade shell",
    description: "Switch Lite in turquoise, A-grade. Perfect screen, tight sticks, no drift. Charger included. Tested with multiple games.",
    specs: {
      "Model": "Nintendo Switch Lite (HDH-001)",
      "Storage": "32GB (expandable)",
      "Colour": "Turquoise",
      "Grade": "A",
      "Includes": "Charger",
      "Warranty": "30-day TechBench warranty"
    },
    bench: [
      "Screen — no scratches, no dead pixels",
      "Analog sticks — no drift (tested)",
      "All buttons — tactile",
      "Speakers + headphone jack — clear",
      "Charging — verified",
      "Joy-Con rails — firm",
      "Game compatibility — tested"
    ],
    notes: "Stick drift is the Switch killer — this unit passed the drift test clean. A-grade handheld, ready for travel."
  },
  {
    id: "airpods-pro-1-b",
    model: "AirPods Pro (1st gen)",
    storage: "",
    category: "Audio",
    emoji: "🎧",
    grade: "B",
    color: "White",
    battery: 82,
    price: 1499,
    was: 1899,
    status: "available",
    featured: false,
    tagline: "ANC earbuds — new tips fitted on bench",
    description: "AirPods Pro 1st gen with active noise cancellation. Fresh ear tips fitted on the bench, case battery healthy. Tested for ANC, mics and both buds.",
    specs: {
      "Model": "AirPods Pro (1st gen, A2084/A2083)",
      "Grade": "B — case scuffs, buds clean",
      "Battery": "Buds ~82%, case healthy",
      "Includes": "Fresh ear tips (S/M/L), cable",
      "Warranty": "30-day TechBench warranty"
    },
    bench: [
      "Both buds — audio output clean",
      "Active Noise Cancellation — working",
      "Mics — call test both sides",
      "Case charging — verified",
      "Fresh ear tips fitted",
      "Firmware — updated on bench"
    ],
    notes: "New ear tips fitted so they feel fresh. ANC verified against a noisy fan on the bench."
  },
  {
    id: "incoming-macbook-air",
    model: "MacBook Air M1",
    storage: "256GB",
    category: "Laptops",
    emoji: "💻",
    grade: "incoming",
    color: "Gold",
    battery: null,
    price: 0,
    was: 0,
    status: "incoming",
    featured: false,
    tagline: "On its way to the bench — join the waitlist",
    description: "MacBook Air M1 256GB inbound. Will be fully bench-tested before listing. Join the waitlist to get first refusal.",
    specs: {},
    bench: [],
    notes: "Incoming — bench test scheduled. Waitlist members get first refusal."
  }
];

const CATEGORIES = ["All", "Phones", "Tablets", "Consoles", "Audio", "Laptops"];

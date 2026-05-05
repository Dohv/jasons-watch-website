import React, { useState, useEffect } from "react";

// ============ DATA (what the owner would manage in Sanity) ============
const INVENTORY = [
  { id: 1, brand: "Patek Philippe", model: "Nautilus", ref: "5711/1A", dial: "Blue", year: 2021, price: "Inquire", status: "available", dialColor: "blue" },
  { id: 2, brand: "Patek Philippe", model: "Aquanaut", ref: "5167A", dial: "Black", year: 2022, price: "Inquire", status: "available", dialColor: "black" },
  { id: 3, brand: "Rolex", model: "Submariner Date", ref: "116610LN", dial: "Black", year: 2019, price: "$14,800", status: "available", dialColor: "black" },
  { id: 4, brand: "Rolex", model: "Oyster Perpetual", ref: "124300", dial: "Green", year: 2023, price: "$9,200", status: "available", dialColor: "green" },
  { id: 5, brand: "Patek Philippe", model: "Nautilus", ref: "5711/1A", dial: "White", year: 2020, price: "Inquire", status: "sold", dialColor: "white" },
  { id: 6, brand: "Audemars Piguet", model: "Royal Oak", ref: "15500ST", dial: "Blue", year: 2022, price: "$48,500", status: "available", dialColor: "blue" },
  { id: 7, brand: "Rolex", model: "Daytona", ref: "116500LN", dial: "White", year: 2021, price: "$32,400", status: "new", dialColor: "white" },
  { id: 8, brand: "Patek Philippe", model: "Calatrava", ref: "5227G", dial: "Silver", year: 2020, price: "Inquire", status: "available", dialColor: "silver" },
  { id: 9, brand: "Rolex", model: "GMT-Master II", ref: "126710BLNR", dial: "Black", year: 2022, price: "$19,200", status: "new", dialColor: "black" },
];

const REVIEWS = [
  { stars: 5, text: "The Submariner I'd been hunting for two years. Authenticated, packaged like art, delivered in 48 hours. This is how it should be done.", author: "M. Castellanos", watch: "Submariner 116610LN", location: "Miami, FL" },
  { stars: 5, text: "Trade-in process was painless. Honest valuation, prompt wire, and they helped me find my grail piece in the same conversation.", author: "D. Rosenthal", watch: "Nautilus 5711/1A", location: "Greenwich, CT" },
  { stars: 5, text: "I've bought from auction houses and gray market dealers. MYTIME26 operates on a different level — patient, knowledgeable, no pressure.", author: "J. Tanaka", watch: "Aquanaut 5167A", location: "Los Angeles, CA" },
];

// ============ STYLES ============
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;1,9..144,300;1,9..144,400&family=Inter+Tight:wght@300;400;500&family=JetBrains+Mono:wght@300;400&display=swap');

:root {
  --ink: #0f0e0c;
  --ink-soft: #1c1a16;
  --cream: #f4eee3;
  --cream-warm: #ebe2d2;
  --cream-deep: #ddd2bd;
  --bronze: #8c6b3f;
  --bronze-deep: #5e4626;
  --gold: #c9a86a;
  --rule: rgba(15, 14, 12, 0.12);
  --rule-strong: rgba(15, 14, 12, 0.25);
  --rule-cream: rgba(244, 238, 227, 0.18);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: "Inter Tight", sans-serif;
  background: var(--cream);
  color: var(--ink);
  font-weight: 300;
  letter-spacing: 0.005em;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
.serif { font-family: "Fraunces", serif; font-weight: 300; letter-spacing: -0.02em; }
.mono { font-family: "JetBrains Mono", monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 400; }
button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }
a { color: inherit; text-decoration: none; }

/* TICKER */
.ticker {
  background: var(--ink);
  color: var(--cream);
  padding: 11px 0;
  overflow: hidden;
  border-bottom: 1px solid var(--ink-soft);
}
.ticker-track {
  display: flex;
  gap: 64px;
  animation: scroll 50s linear infinite;
  white-space: nowrap;
  width: max-content;
}
.ticker-item {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 64px;
}
.ticker-item::after { content: "✦"; color: var(--gold); }
@keyframes scroll { to { transform: translateX(-50%); } }

/* NAV */
nav {
  position: sticky; top: 0;
  background: rgba(244, 238, 227, 0.88);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 100;
  border-bottom: 1px solid var(--rule);
}
.nav-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 22px 48px;
  gap: 48px;
  max-width: 1600px;
  margin: 0 auto;
}
.nav-left, .nav-right { display: flex; gap: 36px; align-items: center; }
.nav-right { justify-content: flex-end; }
.nav-link {
  font-size: 12.5px;
  letter-spacing: 0.04em;
  transition: opacity 0.3s ease;
  position: relative;
  padding: 4px 0;
}
.nav-link:hover { opacity: 0.55; }
.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -2px; left: 0; right: 0;
  height: 1px;
  background: var(--bronze);
}
.brand-logo {
  font-family: "Fraunces", serif;
  font-size: 22px;
  letter-spacing: -0.02em;
  font-weight: 400;
  font-style: italic;
  display: flex;
  align-items: baseline;
  gap: 6px;
}
.brand-logo sup {
  font-size: 9px;
  font-style: normal;
  letter-spacing: 0.2em;
  font-family: "JetBrains Mono", monospace;
  color: var(--bronze);
  font-weight: 400;
}
.cta-pill {
  border: 1px solid var(--ink);
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 11.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  cursor: pointer;
}
.cta-pill:hover { background: var(--ink); color: var(--cream); }

/* HERO */
.hero {
  padding: 100px 48px 140px;
  position: relative;
  min-height: calc(100vh - 130px);
  display: flex;
  align-items: center;
}
.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 96px;
  align-items: center;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
}
.hero-meta {
  display: flex;
  gap: 24px;
  margin-bottom: 48px;
  align-items: center;
}
.hero-meta-line { height: 1px; flex: 1; max-width: 60px; background: var(--rule-strong); }
.hero-meta-text { color: var(--bronze-deep); font-family: "JetBrains Mono", monospace; font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase; }

h1.display {
  font-family: "Fraunces", serif;
  font-size: clamp(56px, 8vw, 124px);
  line-height: 0.92;
  letter-spacing: -0.04em;
  font-weight: 300;
  margin-bottom: 36px;
}
h1.display em { font-style: italic; font-weight: 300; color: var(--bronze); }
.hero-sub {
  font-size: 17px;
  line-height: 1.65;
  color: var(--ink-soft);
  max-width: 480px;
  margin-bottom: 56px;
  font-weight: 300;
}
.hero-actions { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; }
.btn-primary {
  background: var(--ink);
  color: var(--cream);
  padding: 17px 30px;
  border-radius: 100px;
  font-size: 12.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 14px;
}
.btn-primary:hover { background: var(--bronze-deep); transform: translateY(-1px); }
.btn-primary svg { transition: transform 0.3s ease; }
.btn-primary:hover svg { transform: translateX(4px); }
.btn-text {
  font-size: 12.5px;
  letter-spacing: 0.06em;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 4px;
  transition: opacity 0.3s ease;
}
.btn-text:hover { opacity: 0.6; }

/* HERO VISUAL */
.hero-visual {
  position: relative;
  aspect-ratio: 4/5;
  background: radial-gradient(circle at 30% 25%, #2a251e 0%, #14110d 60%, #0a0805 100%);
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(15,14,12,0.18), 0 10px 30px rgba(15,14,12,0.08);
}
.hero-visual::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(201, 168, 106, 0.18), transparent 60%);
}
.hero-visual::after {
  content: ""; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3CfeColorMatrix values='0 0 0 0 0.78 0 0 0 0 0.66 0 0 0 0 0.42 0 0 0 0.04 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.7;
  mix-blend-mode: overlay;
}
.hero-watch-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.hero-tag {
  position: absolute;
  top: 28px; left: 28px;
  background: rgba(15, 14, 12, 0.55);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(201, 168, 106, 0.35);
  color: var(--cream);
  padding: 7px 14px;
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-radius: 100px;
  z-index: 3;
}
.hero-visual-meta {
  position: absolute;
  bottom: 28px; left: 28px; right: 28px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  color: var(--cream);
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  z-index: 3;
}
.hero-visual-meta strong { color: var(--gold); font-weight: 400; }
.hero-visual-meta .price-line { font-family: "Fraunces", serif; font-size: 18px; font-style: italic; letter-spacing: -0.01em; text-transform: none; color: var(--cream); }

/* STATS */
.stats {
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  padding: 48px;
  background: var(--cream);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
  max-width: 1500px;
  margin: 0 auto;
}
.stat { display: flex; flex-direction: column; gap: 10px; }
.stat-num {
  font-family: "Fraunces", serif;
  font-size: 56px;
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1;
}
.stat-num em { font-style: italic; color: var(--bronze); }
.stat-label { color: var(--ink-soft); opacity: 0.7; font-size: 13px; }

/* SECTION */
section { padding: 140px 48px; position: relative; }
.section-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 48px;
  align-items: end;
  margin-bottom: 80px;
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
}
.section-head h2 {
  font-family: "Fraunces", serif;
  font-size: clamp(42px, 5.5vw, 84px);
  font-weight: 300;
  letter-spacing: -0.035em;
  line-height: 0.95;
}
.section-head h2 em { font-style: italic; color: var(--bronze); }
.section-num { color: var(--bronze); align-self: start; }
.section-link {
  font-size: 12.5px;
  letter-spacing: 0.06em;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 4px;
  white-space: nowrap;
  cursor: pointer;
}

/* INVENTORY */
.inventory-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--rule);
  max-width: 1500px;
  margin: 0 auto;
  border: 1px solid var(--rule);
}
.watch-card {
  background: var(--cream);
  padding: 36px;
  cursor: pointer;
  transition: background 0.4s ease;
  position: relative;
  display: flex;
  flex-direction: column;
}
.watch-card:hover { background: var(--cream-warm); }
.watch-card-image {
  aspect-ratio: 1;
  margin-bottom: 28px;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.watch-card-image::after {
  content: ""; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='1.2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='150' height='150' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
}
.dial-black { background: radial-gradient(circle at 35% 30%, #2a2a2a 0%, #0a0a0a 75%); }
.dial-blue { background: radial-gradient(circle at 35% 30%, #2a4a72 0%, #0a1a30 75%); }
.dial-green { background: radial-gradient(circle at 35% 30%, #355c45 0%, #0f2a1a 75%); }
.dial-white { background: radial-gradient(circle at 35% 30%, #f0ece4 0%, #b8b0a0 75%); }
.dial-silver { background: radial-gradient(circle at 35% 30%, #d4d0c8 0%, #7a7568 75%); }
.watch-illust { transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); position: relative; z-index: 1; }
.watch-card:hover .watch-illust { transform: scale(1.05) rotate(-2deg); }
.watch-status {
  position: absolute;
  top: 14px; left: 14px;
  background: rgba(244, 238, 227, 0.95);
  color: var(--ink);
  padding: 5px 11px;
  font-family: "JetBrains Mono", monospace;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-radius: 100px;
  z-index: 2;
}
.watch-status.sold { background: var(--ink); color: var(--cream); }
.watch-status.new { background: var(--bronze); color: var(--cream); }
.watch-card-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  color: var(--bronze-deep);
}
.watch-card h3 {
  font-family: "Fraunces", serif;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.015em;
  line-height: 1.15;
  margin-bottom: 8px;
}
.watch-card .ref {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  color: var(--ink-soft);
  opacity: 0.6;
  margin-bottom: 20px;
}
.watch-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid var(--rule);
}
.watch-price {
  font-family: "Fraunces", serif;
  font-size: 19px;
  font-weight: 400;
  font-style: italic;
}
.watch-price em { font-style: italic; color: var(--bronze); font-size: 13px; margin-right: 4px; font-family: "Inter Tight", sans-serif; }
.watch-card-arrow {
  width: 38px; height: 38px;
  border: 1px solid var(--rule-strong);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.watch-card:hover .watch-card-arrow { background: var(--ink); border-color: var(--ink); color: var(--cream); }

/* STORY */
.story-section { background: var(--ink); color: var(--cream); position: relative; overflow: hidden; }
.story-section::before {
  content: ""; position: absolute; inset: 0;
  background:
    radial-gradient(circle at 20% 80%, rgba(201, 168, 106, 0.08), transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(140, 107, 63, 0.06), transparent 50%);
  pointer-events: none;
}
.story-grid {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 96px;
  align-items: center;
  max-width: 1500px;
  margin: 0 auto;
  position: relative;
}
.story-image {
  aspect-ratio: 3/4;
  background: linear-gradient(135deg, #1a1612 0%, #2a2520 50%, #1a1612 100%);
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(201, 168, 106, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}
.story-image::after {
  content: ""; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85'/%3E%3CfeColorMatrix values='0 0 0 0 0.78 0 0 0 0 0.66 0 0 0 0 0.42 0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
}
.story-mono {
  font-family: "JetBrains Mono", monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 28px;
  display: inline-block;
}
.story-section h2 {
  font-family: "Fraunces", serif;
  font-size: clamp(38px, 4.8vw, 72px);
  line-height: 1.02;
  font-weight: 300;
  letter-spacing: -0.035em;
  margin-bottom: 36px;
}
.story-section h2 em { font-style: italic; color: var(--gold); }
.story-section p {
  font-size: 16px;
  line-height: 1.75;
  color: rgba(244, 238, 227, 0.72);
  margin-bottom: 22px;
  max-width: 540px;
}
.story-sig {
  margin-top: 48px;
  display: flex;
  align-items: center;
  gap: 24px;
  padding-top: 36px;
  border-top: 1px solid var(--rule-cream);
}
.story-sig-name { font-family: "Fraunces", serif; font-style: italic; font-size: 24px; color: var(--cream); font-weight: 400; }
.story-sig-role { font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); margin-top: 4px; }

/* PROCESS */
.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--rule);
  max-width: 1500px;
  margin: 0 auto;
  border: 1px solid var(--rule);
}
.process-step {
  background: var(--cream-warm);
  padding: 56px 36px;
  position: relative;
  transition: background 0.4s ease;
}
.process-step:hover { background: var(--cream); }
.process-step-num {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-weight: 300;
  font-size: 88px;
  line-height: 1;
  color: var(--bronze);
  margin-bottom: 36px;
}
.process-step h3 {
  font-family: "Fraunces", serif;
  font-size: 26px;
  font-weight: 400;
  margin-bottom: 16px;
  letter-spacing: -0.015em;
}
.process-step p {
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--ink-soft);
}

/* REVIEWS */
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 1500px;
  margin: 0 auto;
}
.review-card {
  padding: 44px;
  border: 1px solid var(--rule);
  border-radius: 4px;
  background: var(--cream-warm);
  position: relative;
  transition: transform 0.4s ease;
}
.review-card:hover { transform: translateY(-4px); }
.review-stars { color: var(--bronze); font-size: 14px; letter-spacing: 4px; margin-bottom: 28px; }
.review-text {
  font-family: "Fraunces", serif;
  font-size: 19px;
  line-height: 1.5;
  letter-spacing: -0.01em;
  font-weight: 400;
  margin-bottom: 36px;
  font-style: italic;
}
.review-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 22px;
  border-top: 1px solid var(--rule);
}
.review-author { font-size: 13px; font-weight: 400; }
.review-author small { display: block; opacity: 0.6; font-size: 11px; margin-top: 2px; }
.review-watch { font-family: "JetBrains Mono", monospace; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--bronze-deep); text-align: right; }

/* CONCIERGE */
.concierge {
  padding: 180px 48px;
  background: var(--cream);
  position: relative;
  overflow: hidden;
  text-align: center;
}
.concierge-inner { max-width: 920px; margin: 0 auto; position: relative; z-index: 2; }
.concierge h2 {
  font-family: "Fraunces", serif;
  font-size: clamp(48px, 7vw, 110px);
  font-weight: 300;
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin-bottom: 36px;
}
.concierge h2 em { font-style: italic; color: var(--bronze); }
.concierge p {
  font-size: 18px;
  line-height: 1.65;
  max-width: 560px;
  margin: 0 auto 56px;
  color: var(--ink-soft);
}
.concierge-deco {
  position: absolute;
  font-family: "Fraunces", serif;
  font-style: italic;
  font-weight: 300;
  color: var(--bronze);
  opacity: 0.06;
  pointer-events: none;
  font-size: 480px;
  line-height: 0.8;
  letter-spacing: -0.05em;
  top: 50%;
  transform: translateY(-50%);
}
.concierge-deco.left { left: -8%; }
.concierge-deco.right { right: -8%; }

/* FOOTER */
footer { background: var(--ink); color: var(--cream); padding: 100px 48px 40px; }
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 48px;
  max-width: 1500px;
  margin: 0 auto 80px;
}
.footer-brand .brand-logo { color: var(--cream); font-size: 32px; margin-bottom: 28px; }
.footer-brand p { color: rgba(244, 238, 227, 0.55); font-size: 14px; line-height: 1.65; max-width: 320px; margin-bottom: 32px; }
.footer-col h4 {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 400;
  color: var(--gold);
  margin-bottom: 28px;
}
.footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 14px; }
.footer-col a { color: rgba(244, 238, 227, 0.7); font-size: 13.5px; transition: color 0.3s ease; cursor: pointer; }
.footer-col a:hover { color: var(--gold); }
.footer-bottom {
  border-top: 1px solid var(--rule-cream);
  padding-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1500px;
  margin: 0 auto;
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(244, 238, 227, 0.5);
}
.social-icons { display: flex; gap: 16px; }
.social-icons a {
  width: 36px; height: 36px;
  border: 1px solid var(--rule-cream);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}
.social-icons a:hover { background: var(--gold); border-color: var(--gold); color: var(--ink); }

/* SHOP PAGE */
.page-header {
  padding: 120px 48px 80px;
  border-bottom: 1px solid var(--rule);
  max-width: 1500px;
  margin: 0 auto;
}
.page-header .mono { color: var(--bronze); margin-bottom: 24px; display: block; }
.page-header h1 {
  font-family: "Fraunces", serif;
  font-size: clamp(56px, 8vw, 120px);
  font-weight: 300;
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin-bottom: 32px;
}
.page-header h1 em { font-style: italic; color: var(--bronze); }
.page-header p {
  font-size: 18px;
  line-height: 1.65;
  color: var(--ink-soft);
  max-width: 640px;
}

.filter-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 32px 48px;
  border-bottom: 1px solid var(--rule);
  max-width: 1500px;
  margin: 0 auto;
  align-items: center;
}
.filter-bar .mono { color: var(--ink-soft); margin-right: 16px; }
.filter-pill {
  padding: 8px 16px;
  border: 1px solid var(--rule-strong);
  border-radius: 100px;
  font-size: 12px;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
}
.filter-pill:hover { border-color: var(--ink); }
.filter-pill.active { background: var(--ink); color: var(--cream); border-color: var(--ink); }

.shop-grid-wrap { padding: 60px 48px 140px; }

/* PRODUCT PAGE */
.product-page { padding: 60px 48px 140px; max-width: 1500px; margin: 0 auto; }
.breadcrumb {
  font-family: "JetBrains Mono", monospace;
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 48px;
  color: var(--ink-soft);
}
.breadcrumb a { color: var(--bronze); cursor: pointer; }
.breadcrumb span { margin: 0 12px; opacity: 0.4; }
.product-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 80px;
  align-items: start;
}
.product-images { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 100px; }
.product-image-main {
  aspect-ratio: 1;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.product-image-main::after {
  content: ""; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
}
.product-thumbs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.product-thumb {
  aspect-ratio: 1;
  border-radius: 2px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s ease;
}
.product-thumb.active { border-color: var(--bronze); }

.product-info .mono { color: var(--bronze); margin-bottom: 16px; display: block; }
.product-info h1 {
  font-family: "Fraunces", serif;
  font-size: clamp(42px, 5vw, 72px);
  font-weight: 300;
  letter-spacing: -0.035em;
  line-height: 0.95;
  margin-bottom: 16px;
}
.product-info h1 em { font-style: italic; color: var(--bronze); }
.product-ref { font-family: "JetBrains Mono", monospace; font-size: 13px; letter-spacing: 0.1em; color: var(--ink-soft); opacity: 0.6; margin-bottom: 36px; }
.product-price-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 28px 0;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  margin-bottom: 36px;
}
.product-price { font-family: "Fraunces", serif; font-size: 36px; font-weight: 400; font-style: italic; }
.product-price small { font-family: "Inter Tight", sans-serif; font-style: normal; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--bronze); margin-right: 8px; }
.product-status-pill {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 6px 12px;
  border: 1px solid var(--bronze);
  color: var(--bronze);
  border-radius: 100px;
}
.product-description {
  font-size: 16px;
  line-height: 1.7;
  color: var(--ink-soft);
  margin-bottom: 36px;
}
.product-description p { margin-bottom: 18px; }
.product-specs {
  border-top: 1px solid var(--rule);
  padding-top: 32px;
  margin-bottom: 40px;
}
.product-specs h3 {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--bronze);
  margin-bottom: 24px;
  font-weight: 400;
}
.spec-row {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  padding: 14px 0;
  border-bottom: 1px solid var(--rule);
  font-size: 14px;
}
.spec-row span:first-child { color: var(--ink-soft); opacity: 0.7; }
.spec-row span:last-child { font-family: "Fraunces", serif; font-style: italic; }
.product-actions { display: flex; gap: 16px; flex-wrap: wrap; }

/* SELL PAGE */
.sell-hero {
  padding: 120px 48px;
  background: var(--ink);
  color: var(--cream);
  position: relative;
  overflow: hidden;
}
.sell-hero::before {
  content: ""; position: absolute; inset: 0;
  background: radial-gradient(circle at 80% 30%, rgba(201, 168, 106, 0.1), transparent 50%);
}
.sell-hero-inner { max-width: 1500px; margin: 0 auto; position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 96px; align-items: center; }
.sell-hero h1 {
  font-family: "Fraunces", serif;
  font-size: clamp(48px, 6.5vw, 96px);
  font-weight: 300;
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin-bottom: 36px;
}
.sell-hero h1 em { font-style: italic; color: var(--gold); }
.sell-hero p { font-size: 17px; line-height: 1.7; color: rgba(244, 238, 227, 0.72); margin-bottom: 32px; }
.sell-hero .mono { color: var(--gold); margin-bottom: 28px; display: block; }
.sell-list { list-style: none; }
.sell-list li {
  padding: 16px 0;
  border-bottom: 1px solid var(--rule-cream);
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14.5px;
  color: rgba(244, 238, 227, 0.85);
}
.sell-list svg { color: var(--gold); flex-shrink: 0; }

.sell-form-section { background: var(--cream); padding: 140px 48px; }
.sell-form-wrap { max-width: 920px; margin: 0 auto; }
.sell-form-head { margin-bottom: 64px; text-align: center; }
.sell-form-head .mono { color: var(--bronze); display: block; margin-bottom: 16px; }
.sell-form-head h2 {
  font-family: "Fraunces", serif;
  font-size: clamp(40px, 5vw, 72px);
  font-weight: 300;
  letter-spacing: -0.035em;
  line-height: 1;
}
.sell-form-head h2 em { font-style: italic; color: var(--bronze); }
.sell-form { background: var(--cream-warm); padding: 56px; border-radius: 4px; border: 1px solid var(--rule); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
.form-field { display: flex; flex-direction: column; gap: 10px; }
.form-field label {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--bronze-deep);
  font-weight: 400;
}
.form-field input, .form-field select, .form-field textarea {
  background: var(--cream);
  border: 1px solid var(--rule);
  padding: 14px 16px;
  font-family: "Inter Tight", sans-serif;
  font-size: 14px;
  border-radius: 2px;
  color: var(--ink);
  transition: border 0.3s ease;
}
.form-field input:focus, .form-field select:focus, .form-field textarea:focus { outline: none; border-color: var(--bronze); }
.form-field textarea { resize: vertical; min-height: 120px; font-family: "Inter Tight", sans-serif; }
.form-upload {
  border: 2px dashed var(--rule-strong);
  padding: 40px;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--cream);
}
.form-upload:hover { border-color: var(--bronze); background: var(--cream-warm); }
.form-upload-icon { color: var(--bronze); margin-bottom: 16px; }
.form-upload p { font-size: 14px; color: var(--ink-soft); margin-bottom: 4px; }
.form-upload small { font-size: 11px; color: var(--ink-soft); opacity: 0.6; font-family: "JetBrains Mono", monospace; letter-spacing: 0.1em; text-transform: uppercase; }
.form-checkbox-row { display: flex; gap: 24px; flex-wrap: wrap; padding: 16px 0; }
.form-checkbox { display: flex; gap: 10px; align-items: center; cursor: pointer; font-size: 14px; }
.form-checkbox input[type="checkbox"] { width: 18px; height: 18px; accent-color: var(--bronze); }
.form-section-title {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--bronze);
  margin: 32px 0 20px;
  padding-top: 24px;
  border-top: 1px solid var(--rule);
}
.form-section-title:first-child { margin-top: 0; padding-top: 0; border-top: none; }

/* ABOUT PAGE */
.about-intro { padding: 120px 48px 80px; max-width: 1100px; margin: 0 auto; text-align: center; }
.about-intro .mono { color: var(--bronze); display: block; margin-bottom: 24px; }
.about-intro h1 {
  font-family: "Fraunces", serif;
  font-size: clamp(48px, 7vw, 110px);
  font-weight: 300;
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin-bottom: 40px;
}
.about-intro h1 em { font-style: italic; color: var(--bronze); }
.about-intro p { font-size: 19px; line-height: 1.65; color: var(--ink-soft); max-width: 700px; margin: 0 auto; }

.about-image-wrap { padding: 0 48px; max-width: 1500px; margin: 40px auto; }
.about-image {
  aspect-ratio: 21/9;
  background: linear-gradient(135deg, #1a1612 0%, #2a2520 50%, #1a1612 100%);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--rule);
}
.about-image::after {
  content: ""; position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.85'/%3E%3CfeColorMatrix values='0 0 0 0 0.78 0 0 0 0 0.66 0 0 0 0 0.42 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
}

.about-story-section { padding: 120px 48px; max-width: 1500px; margin: 0 auto; }
.about-story-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 96px; align-items: start; }
.about-story-grid .mono { color: var(--bronze); display: block; margin-bottom: 16px; }
.about-story-grid h2 {
  font-family: "Fraunces", serif;
  font-size: clamp(36px, 4.5vw, 64px);
  font-weight: 300;
  letter-spacing: -0.035em;
  line-height: 1;
  position: sticky;
  top: 120px;
}
.about-story-grid h2 em { font-style: italic; color: var(--bronze); }
.about-story-grid .story-body p { font-size: 16.5px; line-height: 1.75; margin-bottom: 24px; color: var(--ink-soft); }
.about-pullquote {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-size: 28px;
  line-height: 1.4;
  letter-spacing: -0.015em;
  color: var(--ink);
  margin: 40px 0;
  padding: 32px 0;
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
  font-weight: 400;
}

.values-section { background: var(--cream-warm); padding: 140px 48px; }
.values-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px; max-width: 1500px; margin: 0 auto; }
.value-card {}
.value-num { font-family: "Fraunces", serif; font-style: italic; font-size: 64px; line-height: 1; color: var(--bronze); margin-bottom: 28px; font-weight: 300; }
.value-card h3 { font-family: "Fraunces", serif; font-size: 28px; font-weight: 400; letter-spacing: -0.015em; margin-bottom: 16px; }
.value-card p { font-size: 15px; line-height: 1.65; color: var(--ink-soft); }

/* RESPONSIVE */
@media (max-width: 968px) {
  .hero-grid, .story-grid, .about-story-grid, .sell-hero-inner, .product-grid { grid-template-columns: 1fr; gap: 48px; }
  .stats-grid, .inventory-grid, .process-grid, .reviews-grid, .values-grid { grid-template-columns: 1fr; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .nav-inner { grid-template-columns: 1fr auto; }
  .nav-left, .nav-right .nav-link { display: none; }
  .nav-right { display: flex; }
  section, .hero, .sell-hero, .sell-form-section, .about-story-section, .values-section { padding: 80px 24px; }
  .hero { padding-top: 60px; padding-bottom: 80px; }
  .stats { padding: 32px 24px; }
  .stats-grid { gap: 32px; }
  .section-head { grid-template-columns: 1fr; gap: 16px; align-items: start; margin-bottom: 48px; }
  nav .nav-inner, footer { padding-left: 24px; padding-right: 24px; }
  .form-row { grid-template-columns: 1fr; }
  .sell-form { padding: 32px 24px; }
  .product-images { position: static; }
  .footer-bottom { flex-direction: column; gap: 24px; text-align: center; }
}
`;

// ============ WATCH SVG (reused across cards) ============
const WatchSVG = ({ size = 200, dialColor = "black" }) => {
  const dialFill = {
    black: "#0a0a0a", blue: "#0a1a30", green: "#0f2a1a",
    white: "#e8e2d4", silver: "#a8a298"
  }[dialColor] || "#0a0a0a";
  const markerColor = ["white", "silver"].includes(dialColor) ? "#1a1a1a" : "#d4c89a";

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className="watch-illust">
      {/* bracelet top */}
      <rect x="78" y="10" width="44" height="38" rx="3" fill="#9a9590" />
      <rect x="78" y="10" width="44" height="38" rx="3" fill="url(#braceletGrad)" />
      {/* bracelet bottom */}
      <rect x="78" y="152" width="44" height="38" rx="3" fill="#9a9590" />
      <rect x="78" y="152" width="44" height="38" rx="3" fill="url(#braceletGrad)" />
      {/* outer case */}
      <circle cx="100" cy="100" r="64" fill="#c0bbb4" />
      <circle cx="100" cy="100" r="64" fill="url(#caseGrad)" />
      {/* bezel */}
      <circle cx="100" cy="100" r="58" fill="#a8a39c" />
      <circle cx="100" cy="100" r="58" fill="url(#bezelGrad)" />
      {/* dial */}
      <circle cx="100" cy="100" r="50" fill={dialFill} />
      <circle cx="100" cy="100" r="50" fill="url(#dialGrad)" opacity="0.6" />
      {/* hour markers */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x1 = 100 + Math.cos(angle) * 42;
        const y1 = 100 + Math.sin(angle) * 42;
        const x2 = 100 + Math.cos(angle) * 46;
        const y2 = 100 + Math.sin(angle) * 46;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={markerColor} strokeWidth="2.5" strokeLinecap="round" />;
      })}
      {/* hands */}
      <line x1="100" y1="100" x2="100" y2="68" stroke={markerColor} strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="100" x2="125" y2="100" stroke={markerColor} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="100" x2="100" y2="115" stroke="#c9a86a" strokeWidth="1.5" strokeLinecap="round" />
      {/* center dot */}
      <circle cx="100" cy="100" r="3" fill={markerColor} />
      <circle cx="100" cy="100" r="1.5" fill="#c9a86a" />
      {/* crown */}
      <rect x="164" y="95" width="6" height="10" rx="1" fill="#9a9590" />
      <defs>
        <linearGradient id="braceletGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7a7568" />
          <stop offset="0.3" stopColor="#c0bbb4" />
          <stop offset="0.7" stopColor="#c0bbb4" />
          <stop offset="1" stopColor="#7a7568" />
        </linearGradient>
        <linearGradient id="caseGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#e0dcd5" />
          <stop offset="0.5" stopColor="#a8a39c" />
          <stop offset="1" stopColor="#6a6558" />
        </linearGradient>
        <linearGradient id="bezelGrad" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#c0bbb4" />
          <stop offset="1" stopColor="#7a7568" />
        </linearGradient>
        <radialGradient id="dialGrad" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.3" />
        </radialGradient>
      </defs>
    </svg>
  );
};

const ArrowIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ============ COMPONENTS ============
const Ticker = () => (
  <div className="ticker">
    <div className="ticker-track">
      {[...Array(2)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="ticker-item">Authenticated · Insured Shipping</span>
          <span className="ticker-item">Scottsdale, Arizona</span>
          <span className="ticker-item">Established 2020</span>
          <span className="ticker-item">By Appointment Only</span>
          <span className="ticker-item">+1 (480) 710-0323</span>
          <span className="ticker-item">Trusted On Chrono24</span>
        </React.Fragment>
      ))}
    </div>
  </div>
);

const Nav = ({ page, setPage }) => (
  <nav>
    <div className="nav-inner">
      <div className="nav-left">
        <a className={`nav-link ${page === "shop" ? "active" : ""}`} onClick={() => setPage("shop")}>Inventory</a>
        <a className={`nav-link ${page === "sell" ? "active" : ""}`} onClick={() => setPage("sell")}>Sell / Trade</a>
        <a className={`nav-link ${page === "about" ? "active" : ""}`} onClick={() => setPage("about")}>About</a>
        <a className="nav-link" onClick={() => setPage("home")}>Journal</a>
      </div>
      <a className="brand-logo" onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
        MYTIME26
      </a>
      <div className="nav-right">
        <a className="nav-link">(480) 710-0323</a>
        <a className="cta-pill" onClick={() => setPage("sell")}>Get a Quote</a>
      </div>
    </div>
  </nav>
);

const Footer = ({ setPage }) => (
  <footer>
    <div className="footer-grid">
      <div className="footer-brand">
        <span className="brand-logo">MYTIME26</span>
        <p>Curated luxury timepieces for the discerning collector. Based in Scottsdale, Arizona. By appointment only.</p>
        <div className="social-icons">
          <a><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33V22c4.78-.8 8.44-4.93 8.44-9.93z"/></svg></a>
          <a><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg></a>
          <a><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .1.2 2 3 4.7 4.2 1.7.7 2.3.8 3.1.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.4 1.3 4.9L2 22l5.3-1.3c1.4.7 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg></a>
        </div>
      </div>
      <div className="footer-col">
        <h4>Shop</h4>
        <ul>
          <li><a onClick={() => setPage("shop")}>All Watches</a></li>
          <li><a>Patek Philippe</a></li>
          <li><a>Rolex</a></li>
          <li><a>Audemars Piguet</a></li>
          <li><a>Watch Quest Form</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a onClick={() => setPage("sell")}>Sell Your Watch</a></li>
          <li><a>Trade-In</a></li>
          <li><a>Sourcing</a></li>
          <li><a>Authentication</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a onClick={() => setPage("about")}>About</a></li>
          <li><a>Journal</a></li>
          <li><a>Press</a></li>
          <li><a>Contact</a></li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Policies</h4>
        <ul>
          <li><a>Shipping</a></li>
          <li><a>Returns</a></li>
          <li><a>Warranty</a></li>
          <li><a>Privacy</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© 2026 MYTIME26, LLC</span>
      <span>Scottsdale · Arizona</span>
      <span>By Appointment Only</span>
    </div>
  </footer>
);

// ============ HOME ============
const HomePage = ({ setPage, setProductId }) => (
  <>
    {/* HERO */}
    <section className="hero">
      <div className="hero-grid">
        <div>
          <div className="hero-meta">
            <span className="hero-meta-line"></span>
            <span className="hero-meta-text">Since 2020 · Scottsdale, AZ</span>
          </div>
          <h1 className="display">
            Time, well<br />
            <em>spent.</em>
          </h1>
          <p className="hero-sub">
            A curated dealer of the world's finest timepieces — Patek Philippe, Rolex, Audemars Piguet, and the rare references that connoisseurs hunt for. Every watch authenticated. Every relationship lasting.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setPage("shop")}>
              View Inventory <ArrowIcon />
            </button>
            <a className="btn-text" onClick={() => setPage("sell")}>Sell or trade your piece →</a>
          </div>
        </div>
        <div className="hero-visual">
          <span className="hero-tag">Featured · Available</span>
          <div className="hero-watch-wrap"><WatchSVG size={360} dialColor="blue" /></div>
          <div className="hero-visual-meta">
            <div>
              <div><strong>Patek Philippe</strong></div>
              <div style={{ marginTop: 4, opacity: 0.7 }}>Nautilus 5711/1A · Blue Dial</div>
            </div>
            <div className="price-line">Inquire</div>
          </div>
        </div>
      </div>
    </section>

    {/* STATS */}
    <div className="stats">
      <div className="stats-grid">
        <div className="stat"><div className="stat-num">600<em>+</em></div><div className="stat-label">Watches placed</div></div>
        <div className="stat"><div className="stat-num">5<em>.0</em></div><div className="stat-label">Average review</div></div>
        <div className="stat"><div className="stat-num">48<em>hr</em></div><div className="stat-label">Insured shipping</div></div>
        <div className="stat"><div className="stat-num">100<em>%</em></div><div className="stat-label">Authenticated</div></div>
      </div>
    </div>

    {/* INVENTORY */}
    <section>
      <div className="section-head">
        <span className="mono section-num">/ 01</span>
        <h2>Current <em>inventory</em></h2>
        <a className="section-link" onClick={() => setPage("shop")}>View all watches →</a>
      </div>
      <div className="inventory-grid">
        {INVENTORY.slice(0, 6).map(w => (
          <WatchCard key={w.id} watch={w} onClick={() => { setProductId(w.id); setPage("product"); }} />
        ))}
      </div>
    </section>

    {/* STORY */}
    <section className="story-section">
      <div className="story-grid">
        <div className="story-image">
          <WatchSVG size={280} dialColor="black" />
        </div>
        <div>
          <span className="story-mono">/ 02 — Our story</span>
          <h2>What began as a passion became <em>a calling.</em></h2>
          <p>
            MYTIME26 started in 2020 as a side project — a way to share the watches I loved with people who'd appreciate them. By 2023, what had been a hobby became my life's work. I left the corporate world to do this full-time, and I haven't looked back.
          </p>
          <p>
            Watches connect us to the moments that matter. They're worn on wedding days, on the day a child is born, on the last morning of a long career. I take that seriously. Every piece I sell is one I'd be proud to wear myself.
          </p>
          <div className="story-sig">
            <div>
              <div className="story-sig-name">— Founder</div>
              <div className="story-sig-role">MYTIME26</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* PROCESS */}
    <section>
      <div className="section-head">
        <span className="mono section-num">/ 03</span>
        <h2>Selling? <em>Simple.</em></h2>
        <a className="section-link" onClick={() => setPage("sell")}>Get a quote →</a>
      </div>
      <div className="process-grid">
        <div className="process-step"><div className="process-step-num">i.</div><h3>Quote</h3><p>Submit a few photos of your watch and warranty card. We respond with a fair, market-aware offer — usually within hours.</p></div>
        <div className="process-step"><div className="process-step-num">ii.</div><h3>Ship</h3><p>Accept and we send a prepaid, fully-insured FedEx label. Drop it off at any FedEx location and you're done.</p></div>
        <div className="process-step"><div className="process-step-num">iii.</div><h3>Authenticate</h3><p>Our team inspects every piece for condition and authenticity. Transparent process, no surprises.</p></div>
        <div className="process-step"><div className="process-step-num">iv.</div><h3>Paid</h3><p>Once verified, payment hits your account by wire. Most sellers see funds the same day.</p></div>
      </div>
    </section>

    {/* REVIEWS */}
    <section style={{ background: "var(--cream-warm)" }}>
      <div className="section-head">
        <span className="mono section-num">/ 04</span>
        <h2>What collectors <em>say.</em></h2>
        <a className="section-link">Read all reviews →</a>
      </div>
      <div className="reviews-grid">
        {REVIEWS.map((r, i) => (
          <div key={i} className="review-card">
            <div className="review-stars">★ ★ ★ ★ ★</div>
            <div className="review-text">"{r.text}"</div>
            <div className="review-meta">
              <div className="review-author">{r.author}<small>{r.location}</small></div>
              <div className="review-watch">{r.watch}</div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CONCIERGE */}
    <section className="concierge">
      <div className="concierge-deco left">K</div>
      <div className="concierge-deco right">T</div>
      <div className="concierge-inner">
        <span className="mono" style={{ color: "var(--bronze)", display: "block", marginBottom: 24 }}>/ 05 — The watch quest</span>
        <h2>Looking for <em>something specific?</em></h2>
        <p>If the piece you're hunting isn't in our inventory, tell us about it. With a network of trusted partners worldwide, we can usually find what you're looking for — at the right price.</p>
        <button className="btn-primary" onClick={() => setPage("sell")}>Begin a quest <ArrowIcon /></button>
      </div>
    </section>
  </>
);

// ============ WATCH CARD ============
const WatchCard = ({ watch, onClick }) => (
  <div className="watch-card" onClick={onClick}>
    <div className={`watch-card-image dial-${watch.dialColor}`}>
      {watch.status === "sold" && <span className="watch-status sold">Sold</span>}
      {watch.status === "new" && <span className="watch-status new">Just In</span>}
      {watch.status === "available" && <span className="watch-status">Available</span>}
      <WatchSVG size={180} dialColor={watch.dialColor} />
    </div>
    <div className="watch-card-meta">
      <span className="mono">{watch.brand}</span>
      <span className="mono">{watch.year}</span>
    </div>
    <h3>{watch.model}</h3>
    <div className="ref">Ref. {watch.ref} · {watch.dial} dial</div>
    <div className="watch-card-footer">
      <div className="watch-price">
        {watch.price === "Inquire" ? <em>Price on request</em> : watch.price}
      </div>
      <div className="watch-card-arrow"><ArrowIcon size={12} /></div>
    </div>
  </div>
);

// ============ SHOP ============
const ShopPage = ({ setPage, setProductId }) => {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? INVENTORY : INVENTORY.filter(w => w.brand.toLowerCase().includes(filter));

  return (
    <>
      <div className="page-header">
        <span className="mono">/ Inventory · 09 watches</span>
        <h1>Currently <em>in the case.</em></h1>
        <p>Our collection evolves daily. Every piece has been authenticated, photographed, and is ready to ship insured. If you don't see what you're hunting, ask us — we likely know where to find it.</p>
      </div>
      <div className="filter-bar">
        <span className="mono">Filter</span>
        <button className={`filter-pill ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All</button>
        <button className={`filter-pill ${filter === "patek" ? "active" : ""}`} onClick={() => setFilter("patek")}>Patek Philippe</button>
        <button className={`filter-pill ${filter === "rolex" ? "active" : ""}`} onClick={() => setFilter("rolex")}>Rolex</button>
        <button className={`filter-pill ${filter === "audemars" ? "active" : ""}`} onClick={() => setFilter("audemars")}>Audemars Piguet</button>
        <button className="filter-pill">Sort: Newest ↓</button>
      </div>
      <div className="shop-grid-wrap">
        <div className="inventory-grid" style={{ maxWidth: 1500, margin: "0 auto" }}>
          {filtered.map(w => (
            <WatchCard key={w.id} watch={w} onClick={() => { setProductId(w.id); setPage("product"); }} />
          ))}
        </div>
      </div>
    </>
  );
};

// ============ PRODUCT ============
const ProductPage = ({ productId, setPage }) => {
  const watch = INVENTORY.find(w => w.id === productId) || INVENTORY[0];
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <div className="product-page">
      <div className="breadcrumb">
        <a onClick={() => setPage("home")}>Home</a><span>/</span>
        <a onClick={() => setPage("shop")}>Inventory</a><span>/</span>
        {watch.brand} {watch.model}
      </div>
      <div className="product-grid">
        <div className="product-images">
          <div className={`product-image-main dial-${watch.dialColor}`}>
            <WatchSVG size={420} dialColor={watch.dialColor} />
          </div>
          <div className="product-thumbs">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`product-thumb dial-${watch.dialColor} ${activeThumb === i ? "active" : ""}`} onClick={() => setActiveThumb(i)}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                  <WatchSVG size={70} dialColor={watch.dialColor} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="product-info">
          <span className="mono">{watch.brand} · {watch.year}</span>
          <h1>{watch.model.split(" ")[0]} <em>{watch.model.split(" ").slice(1).join(" ") || ""}</em></h1>
          <div className="product-ref">Reference {watch.ref}</div>

          <div className="product-price-row">
            <div className="product-price"><small>Price</small>{watch.price === "Inquire" ? <em>Inquire</em> : watch.price}</div>
            <div className="product-status-pill">Available · In stock</div>
          </div>

          <div className="product-description">
            <p>An exceptional example of {watch.brand}'s {watch.model} reference {watch.ref}, presented with its signature {watch.dial.toLowerCase()} dial. The proportions are perfectly judged — substantial enough to make a statement, refined enough for any occasion.</p>
            <p>This particular piece comes complete with original box, papers, and warranty card. Condition is excellent throughout, with sharp lines and clean transitions consistent with light wear. A watch of this caliber rarely surfaces on the open market — and when it does, it doesn't stay long.</p>
          </div>

          <div className="product-specs">
            <h3>Specifications</h3>
            <div className="spec-row"><span>Reference</span><span>{watch.ref}</span></div>
            <div className="spec-row"><span>Year</span><span>{watch.year}</span></div>
            <div className="spec-row"><span>Dial</span><span>{watch.dial}</span></div>
            <div className="spec-row"><span>Case material</span><span>Stainless steel</span></div>
            <div className="spec-row"><span>Movement</span><span>Self-winding automatic</span></div>
            <div className="spec-row"><span>Includes</span><span>Box, papers, warranty</span></div>
          </div>

          <div className="product-actions">
            <button className="btn-primary">Inquire about this watch <ArrowIcon /></button>
            <button className="cta-pill">Trade in your watch</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ SELL ============
const SellPage = () => (
  <>
    <section className="sell-hero">
      <div className="sell-hero-inner">
        <div>
          <span className="mono">/ Sell or trade</span>
          <h1>Get top dollar for <em>your timepiece.</em></h1>
          <p>Whether you're parting with a single piece or upgrading from one watch to another, we offer competitive valuations backed by genuine market expertise. No haggling. No games.</p>
          <p style={{ marginBottom: 0 }}>Submit your watch below and we'll respond — usually within hours — with a transparent offer.</p>
        </div>
        <ul className="sell-list">
          <li><CheckIcon /> Competitive cash offers, often above auction estimates</li>
          <li><CheckIcon /> Pre-paid, fully-insured FedEx shipping</li>
          <li><CheckIcon /> In-house authentication by certified specialists</li>
          <li><CheckIcon /> Same-day wire transfers on accepted offers</li>
          <li><CheckIcon /> Trade-in credit toward any watch in our inventory</li>
        </ul>
      </div>
    </section>

    <section className="sell-form-section">
      <div className="sell-form-wrap">
        <div className="sell-form-head">
          <span className="mono">/ The form</span>
          <h2>Tell us about <em>your watch.</em></h2>
        </div>
        <div className="sell-form">
          <div className="form-section-title">/ Your watch</div>
          <div className="form-row">
            <div className="form-field">
              <label>Brand *</label>
              <select><option>Select brand</option><option>Patek Philippe</option><option>Rolex</option><option>Audemars Piguet</option><option>Other</option></select>
            </div>
            <div className="form-field">
              <label>Model *</label>
              <input type="text" placeholder="e.g. Nautilus 5711" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Reference number</label>
              <input type="text" placeholder="e.g. 5711/1A" />
            </div>
            <div className="form-field">
              <label>Year</label>
              <input type="text" placeholder="e.g. 2021" />
            </div>
          </div>

          <div className="form-checkbox-row">
            <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--bronze-deep)" }}>Includes:</span>
            <label className="form-checkbox"><input type="checkbox" /> Original box</label>
            <label className="form-checkbox"><input type="checkbox" /> Warranty card</label>
            <label className="form-checkbox"><input type="checkbox" /> Service papers</label>
            <label className="form-checkbox"><input type="checkbox" /> Extra links</label>
          </div>

          <div className="form-section-title">/ Photos</div>
          <div className="form-field" style={{ marginBottom: 16 }}>
            <label>Watch photos *</label>
            <div className="form-upload">
              <div className="form-upload-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/></svg>
              </div>
              <p>Drop photos here, or click to browse</p>
              <small>JPG / PNG · Up to 100MB · Multiple files OK</small>
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Warranty card — front</label>
              <div className="form-upload" style={{ padding: 24 }}>
                <p style={{ fontSize: 13 }}>Upload front of card</p>
                <small>Optional but speeds offer</small>
              </div>
            </div>
            <div className="form-field">
              <label>Warranty card — back</label>
              <div className="form-upload" style={{ padding: 24 }}>
                <p style={{ fontSize: 13 }}>Upload back of card</p>
                <small>Optional but speeds offer</small>
              </div>
            </div>
          </div>

          <div className="form-section-title">/ Your details</div>
          <div className="form-row">
            <div className="form-field">
              <label>First name *</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="form-field">
              <label>Email *</label>
              <input type="email" placeholder="you@example.com" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Phone *</label>
              <input type="tel" placeholder="(555) 555-5555" />
            </div>
            <div className="form-field">
              <label>Preferred contact</label>
              <select><option>Either</option><option>Phone / Text</option><option>Email</option><option>WhatsApp</option></select>
            </div>
          </div>
          <div className="form-field" style={{ marginBottom: 32 }}>
            <label>Anything we should know</label>
            <textarea placeholder="Service history, condition notes, ideal timeline, target price..."></textarea>
          </div>

          <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Submit for valuation <ArrowIcon />
          </button>
          <p style={{ marginTop: 20, fontSize: 12, color: "var(--ink-soft)", opacity: 0.7, textAlign: "center", letterSpacing: "0.04em" }}>
            By submitting you agree to our terms. We respond to every inquiry, usually within hours.
          </p>
        </div>
      </div>
    </section>
  </>
);

// ============ ABOUT ============
const AboutPage = () => (
  <>
    <section className="about-intro">
      <span className="mono">/ About — our story</span>
      <h1>A passion that became <em>a calling.</em></h1>
      <p>MYTIME26 is a small operation, intentionally. One pair of hands inspects every watch. One person speaks with every client. That's the way it should be.</p>
    </section>

    <div className="about-image-wrap">
      <div className="about-image">
        <WatchSVG size={300} dialColor="black" />
      </div>
    </div>

    <section className="about-story-section">
      <div className="about-story-grid">
        <h2>From <em>side project</em><br />to full-time pursuit.</h2>
        <div className="story-body">
          <span className="mono">/ Founded 2020 — Full-time since 2023</span>
          <p>For as long as I can remember, watches have been a hobby that connected me to good people, great memories, and the kind of moments that linger. What started as quiet trading among collectors became something bigger — a network, a reputation, a real business.</p>
          <p>In 2023 I left corporate life to commit to this full-time. MYTIME26 exists because I believe the watch business — particularly at this level — should be personal. Every client gets a direct line. Every transaction gets the full attention of someone who actually cares about what's on your wrist.</p>
          <div className="about-pullquote">
            "Watches aren't just jewelry or 'things' — they're tools, and they're objects of personal expression. Every piece we sell goes on to mark moments we'll never see. We take that seriously."
          </div>
          <p>Based in Scottsdale, we operate by appointment only. The collection skews toward icons — Patek Philippe, Rolex, Audemars Piguet — but we'll source anything our clients are hunting for, from a steel sports model to a one-of-a-kind grand complication.</p>
          <p>We're not the biggest dealer. We don't want to be. We want to be the one you call back.</p>
        </div>
      </div>
    </section>

    <section className="values-section">
      <div className="section-head">
        <span className="mono section-num">/ 01</span>
        <h2>How we <em>work.</em></h2>
        <span></span>
      </div>
      <div className="values-grid">
        <div className="value-card">
          <div className="value-num">i.</div>
          <h3>Curated, not cataloged.</h3>
          <p>We carry watches we'd wear ourselves. If a piece doesn't meet our standards for condition, provenance, or pedigree, it doesn't make it onto the site.</p>
        </div>
        <div className="value-card">
          <div className="value-num">ii.</div>
          <h3>Transparent, always.</h3>
          <p>Honest pricing, honest condition reports, honest timelines. If a watch has a flaw, we'll tell you before you ask. If a deal doesn't make sense, we'll say so.</p>
        </div>
        <div className="value-card">
          <div className="value-num">iii.</div>
          <h3>For the long run.</h3>
          <p>Our best clients are the ones who come back — for their next watch, for their kid's first watch, to trade up, to sell back. We build for decades, not transactions.</p>
        </div>
      </div>
    </section>
  </>
);

// ============ APP ============
export default function App() {
  const [page, setPage] = useState("home");
  const [productId, setProductId] = useState(1);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <>
      <style>{styles}</style>
      <Ticker />
      <Nav page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} setProductId={setProductId} />}
      {page === "shop" && <ShopPage setPage={setPage} setProductId={setProductId} />}
      {page === "product" && <ProductPage productId={productId} setPage={setPage} />}
      {page === "sell" && <SellPage />}
      {page === "about" && <AboutPage />}
      <Footer setPage={setPage} />
    </>
  );
}

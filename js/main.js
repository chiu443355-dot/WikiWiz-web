// WikiWiz — MAIN.JS

document.addEventListener('DOMContentLoaded', () => {
  // Init all modules
  initMarkets();
  initMarketEvents();
  initFearGreed();
  initChapters();
  initCalculators();

  // Load saved state
  const state = getState();
  updateXPDisplay(state.xp, 0);
  updateRank(state.xp);
  renderBadges();
  updateProgress();

  // Init TradingView
  setTimeout(() => initTradingView('NASDAQ:AAPL'), 500);

  // Animate hero stats
  animateCounters();

  // Scroll-triggered animations
  setupScrollObserver();

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) {
      nav.style.borderBottom = window.scrollY > 50
        ? '1px solid rgba(0,255,204,0.1)'
        : '1px solid rgba(255,255,255,0.07)';
    }
  });
});

function animateCounters() {
  // Animate hero stats
  const stat1 = document.getElementById('hStat1');
  const stat2 = document.getElementById('hStat2');
  if (stat1) animateNumber(stat1, 0, 12, 1200);
  if (stat2) animateNumber(stat2, 0, 50, 1500, '+');
}

function animateNumber(el, from, to, duration, suffix = '') {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (to - from) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function setupScrollObserver() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.market-card, .chapter-card, .event-card').forEach(el => {
    observer.observe(el);
  });
}

// GitHub README content
window.downloadReadme = function() {
  const readme = `# APEX TRADER — Complete Trading Academy

> "The market never sleeps. Do you?"

A world-class trading education web application with live markets, AI-powered Kalman Filter predictions, professional calculators, 50+ chapters, gamification, and real market event analysis.

## 🚀 Features

- **Live Markets** — Real-time simulated price feeds for 12 instruments (BTC, Gold, Nifty, Forex, etc.)
- **Fear & Greed Meter** — CNN-style sentiment gauge with live updates
- **Kalman Filter Predictions** — Based on IEEE Access research paper (Wankhede, 2026)
- **50+ Learning Chapters** — 12 phases from Financial Literacy to Quant Trading
- **8 Professional Calculators** — Position sizing, DCF, Kelly Criterion, compound interest
- **Market Events** — 2020 COVID crash, FTX collapse, 2026 Nifty correction analyzed
- **Gamification** — XP system, ranks, achievement badges
- **TradingView Integration** — Live charts for stocks, crypto, forex

## 📦 Installation & GitHub Pages Deploy

\`\`\`bash
# 1. Clone or download
git init
git add .
git commit -m "Initial commit — Apex Trader Academy"

# 2. Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/apex-trader.git
git push -u origin main

# 3. Enable GitHub Pages
# Go to Settings → Pages → Source: main branch → / (root)
# Your app will be live at: https://YOUR_USERNAME.github.io/apex-trader/
\`\`\`

## 🔬 Kalman Filter — Research Credit

The predictive chart feature implements the **MIMI Logic Kernel (MLK)** from:

> Wankhede, S.T., "The Inverse Reliability Paradox: Multi-Continental Empirical Evidence and a Simulation-Validated Kalman Filter-Based Predictive Framework for Priority Leakage Mitigation in Global Logistics Networks", *IEEE Access*, 2026.

Key mathematical components:
- State-space: x_k = [ρ_k, ρ̇_k]ᵀ
- Sigmoidal Priority Decay: Φ(ρ) = 1/[1 + e^{k(ρ-ρ_c)}]
- Analytically derived k = 1/[ρ_c(1-ρ_c)] ≈ 7.84 at ρ_c = 0.85
- T+3 horizon prediction with η = 63.1% state predictability

## ⚠️ Disclaimer

This platform is **strictly for educational purposes only**. Nothing constitutes financial advice, investment recommendations, or trading signals. Always consult a certified financial advisor. Trading involves substantial risk of loss.

## 📁 Project Structure

\`\`\`
apex-trader/
├── index.html          # Main entry point
├── css/
│   ├── main.css        # Core styles
│   └── animations.css  # Animation library
├── js/
│   ├── data.js         # All static data
│   ├── markets.js      # Live market simulation
│   ├── feargreed.js    # Fear & Greed meter
│   ├── chapters.js     # Learning chapters + SVG charts
│   ├── calculators.js  # Trading calculators
│   ├── gamification.js # XP, badges, ranks
│   ├── kalman.js       # Kalman Filter prediction
│   └── main.js         # App initialization
└── README.md
\`\`\`

## 🏆 Gamification Ranks

| XP | Rank |
|---|---|
| 0 | 🥚 Rookie |
| 100 | 📈 Chartist |
| 300 | 🎯 Analyst |
| 600 | ⚡ Trader |
| 1200 | 🔱 Strategist |
| 2000 | 🧠 Quant |
| 3500 | 👑 Apex Trader |

## 🔑 API Keys (Optional)

To enable live Fear & Greed data:
1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to CNN Fear & Greed Index API
3. In \`js/feargreed.js\`, call \`fetchLiveFearGreed('YOUR_API_KEY')\`
`;

  const blob = new Blob([readme], { type: 'text/markdown' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'README.md';
  a.click();
};

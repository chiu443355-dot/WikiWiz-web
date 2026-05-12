// WikiWiz — MAIN.JS

document.addEventListener('DOMContentLoaded', () => {
  // Init all modules
  initMarkets();
  initMarketEvents();
  initFearGreed();
  initChapters();
  initCalculators();
  initEconomicCalendar();
  initNews();

  // Restore state
  const state = getState();
  updateXPDisplay(state.xp, 0);
  updateRank(state.xp);
  renderBadges();
  updateProgress();

  // Init TradingView after brief delay
  setTimeout(() => initTradingView('NASDAQ:AAPL'), 600);

  // Animate hero stats
  animateCounter(document.getElementById('hStat1'), 0, 12, 1200);
  animateCounter(document.getElementById('hStat2'), 0, 45, 1500, '+');

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) nav.style.borderBottom = window.scrollY > 50
      ? '1px solid rgba(0,255,204,0.12)' : '1px solid rgba(255,255,255,0.07)';
  });

  // Scroll animations
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.style.animation = 'fadeInUp 0.5s ease both'; observer.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.market-card, .chapter-card, .event-card').forEach(el => observer.observe(el));

  // Resize MLK canvas when window resizes
  window.addEventListener('resize', () => {
    if (mlkOpen) setTimeout(runMLKPrediction, 200);
  });
});

function animateCounter(el, from, to, dur, suffix = '') {
  if (!el) return;
  const start = performance.now();
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * e) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

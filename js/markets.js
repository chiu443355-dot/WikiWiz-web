// WikiWiz — MARKETS.JS
// Simulated live market data with realistic movement

const marketState = {};

function initMarkets() {
  const grid = document.getElementById('marketGrid');
  if (!grid) return;

  MARKET_SYMBOLS.forEach(m => {
    marketState[m.symbol] = {
      price: m.base,
      open: m.base,
      history: Array.from({length: 20}, () => m.base * (0.995 + Math.random() * 0.01)),
      vol: m.vol
    };
    const card = createMarketCard(m);
    grid.appendChild(card);
  });

  // Update every 2 seconds
  setInterval(updateMarkets, 2000);

  // Init ticker
  initTicker();
}

function createMarketCard(m) {
  const card = document.createElement('div');
  card.className = 'market-card glow-hover';
  card.id = `mc-${m.symbol.replace('/','-').replace(' ','-')}`;
  card.innerHTML = `
    <div class="mc-symbol">${m.flag} ${m.symbol}</div>
    <div class="mc-name">${m.name}</div>
    <div class="mc-price" id="price-${m.symbol.replace(/[\/ ]/g,'-')}">
      ${formatPrice(m.base, m.symbol)}
    </div>
    <div class="mc-change" id="chg-${m.symbol.replace(/[\/ ]/g,'-')}">+0.00%</div>
    <canvas class="mc-sparkline" id="spark-${m.symbol.replace(/[\/ ]/g,'-')}" width="180" height="40"></canvas>
    <div class="mc-updated"><span class="live-dot"></span>LIVE</div>
  `;
  return card;
}

function updateMarkets() {
  MARKET_SYMBOLS.forEach(m => {
    const s = marketState[m.symbol];
    // Random walk with mean reversion
    const drift = (m.base - s.price) * 0.0001;
    const shock = (Math.random() - 0.5) * 2 * s.vol * s.price;
    s.price = Math.max(s.price + drift + shock, s.price * 0.9);

    s.history.push(s.price);
    if (s.history.length > 20) s.history.shift();

    const change = ((s.price - s.open) / s.open) * 100;
    const isUp = change >= 0;
    const key = m.symbol.replace(/[\/ ]/g, '-');

    const priceEl = document.getElementById(`price-${key}`);
    const chgEl = document.getElementById(`chg-${key}`);
    const card = document.getElementById(`mc-${m.symbol.replace('/','-').replace(' ','-')}`);

    if (priceEl) priceEl.textContent = formatPrice(s.price, m.symbol);
    if (chgEl) {
      chgEl.textContent = `${isUp ? '+' : ''}${change.toFixed(2)}%`;
      chgEl.className = `mc-change ${isUp ? 'up' : 'down'}`;
    }
    if (card) {
      card.className = `market-card glow-hover ${isUp ? 'up' : 'down'}`;
    }

    drawSparkline(`spark-${key}`, s.history, isUp);
  });

  updateTicker();
}

function formatPrice(price, symbol) {
  if (symbol.includes('INR') || symbol === 'NIFTY 50' || symbol === 'SENSEX' || symbol === 'BANK NIFTY') {
    return '₹' + price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  }
  if (price > 1000) return '$' + price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  if (price > 1) return '$' + price.toFixed(4);
  return '$' + price.toFixed(6);
}

function drawSparkline(id, data, isUp) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  ctx.beginPath();
  ctx.strokeStyle = isUp ? '#00ff88' : '#ff3c6e';
  ctx.lineWidth = 1.5;
  ctx.shadowColor = isUp ? '#00ff88' : '#ff3c6e';
  ctx.shadowBlur = 4;

  data.forEach((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();
}

function initTicker() {
  const ticker = document.getElementById('heroTicker');
  if (!ticker) return;
  let html = '';
  MARKET_SYMBOLS.forEach(m => {
    html += `<span class="ticker-item">
      <span class="ticker-sym">${m.flag} ${m.symbol}</span>
      <span class="ticker-price" id="t-${m.symbol.replace(/[\/ ]/g,'-')}">${formatPrice(m.base, m.symbol)}</span>
      <span class="ticker-chg up" id="tc-${m.symbol.replace(/[\/ ]/g,'-')}">+0.00%</span>
    </span>`;
  });
  // Duplicate for infinite scroll
  ticker.innerHTML = html + html;
}

function updateTicker() {
  MARKET_SYMBOLS.forEach(m => {
    const s = marketState[m.symbol];
    const change = ((s.price - s.open) / s.open) * 100;
    const isUp = change >= 0;
    const key = m.symbol.replace(/[\/ ]/g, '-');
    const tp = document.getElementById(`t-${key}`);
    const tc = document.getElementById(`tc-${key}`);
    if (tp) tp.textContent = formatPrice(s.price, m.symbol);
    if (tc) {
      tc.textContent = `${isUp ? '+' : ''}${change.toFixed(2)}%`;
      tc.className = `ticker-chg ${isUp ? 'up' : 'down'}`;
    }
  });
}

// Market Events
function initMarketEvents() {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;

  MARKET_EVENTS.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'event-card fade-in-up';
    card.innerHTML = `
      <div class="event-tag">${ev.tag}</div>
      <div class="event-card-top">
        <div class="event-date">${ev.date}</div>
        <div class="event-title">${ev.title}</div>
        <div class="event-drop">${ev.drop}</div>
      </div>
      <div class="event-body">
        <p>${ev.body}</p>
        <p style="margin-top:0.75rem;font-size:0.8rem;opacity:0.7;">${ev.why}</p>
        <div class="event-lesson">${ev.lesson}</div>
        ${ev.recovery ? `<p style="margin-top:0.75rem;font-family:var(--font-mono);font-size:0.65rem;color:var(--green)">↗ ${ev.recovery}</p>` : ''}
      </div>
    `;
    grid.appendChild(card);
  });
}

// TradingView Widget
let currentWidget = null;
function initTradingView(symbol = 'NASDAQ:AAPL') {
  const container = document.getElementById('tradingview_widget');
  if (!container) return;
  container.innerHTML = '';

  if (typeof TradingView !== 'undefined') {
    currentWidget = new TradingView.widget({
      autosize: true,
      symbol: symbol,
      interval: 'D',
      timezone: 'Asia/Kolkata',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#0d0d1a',
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      container_id: 'tradingview_widget',
      studies: ['MACD@tv-basicstudies', 'RSI@tv-basicstudies', 'Volume@tv-basicstudies'],
      backgroundColor: '#070710',
      gridColor: 'rgba(0,255,204,0.04)',
      overrides: {
        'paneProperties.background': '#070710',
        'paneProperties.backgroundGradientStartColor': '#070710',
        'paneProperties.backgroundGradientEndColor': '#0d0d1a',
        'scalesProperties.textColor': '#8888aa',
        'mainSeriesProperties.candleStyle.upColor': '#00ff88',
        'mainSeriesProperties.candleStyle.downColor': '#ff3c6e',
        'mainSeriesProperties.candleStyle.borderUpColor': '#00ff88',
        'mainSeriesProperties.candleStyle.borderDownColor': '#ff3c6e',
        'mainSeriesProperties.candleStyle.wickUpColor': '#00ff88',
        'mainSeriesProperties.candleStyle.wickDownColor': '#ff3c6e',
      }
    });
  }
}

function switchChart(symbol) {
  document.querySelectorAll('.tv-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  initTradingView(symbol);
}

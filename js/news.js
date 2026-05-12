// WikiWiz — ECONOMIC CALENDAR + NEWS

// ============================================================
// ECONOMIC CALENDAR — Realistic live simulation
// ============================================================

const ECON_EVENTS_BASE = [
  { time:'08:30', country:'🇮🇳', currency:'INR', event:'CPI Inflation YoY', impact:'high', forecast:'5.1%', previous:'5.4%', actual:null },
  { time:'09:00', country:'🇮🇳', currency:'INR', event:'RBI Interest Rate Decision', impact:'high', forecast:'6.50%', previous:'6.50%', actual:null },
  { time:'10:00', country:'🇺🇸', currency:'USD', event:'Non-Farm Payrolls', impact:'high', forecast:'185K', previous:'175K', actual:null },
  { time:'10:30', country:'🇺🇸', currency:'USD', event:'Core PCE Price Index MoM', impact:'high', forecast:'0.3%', previous:'0.2%', actual:null },
  { time:'12:00', country:'🇪🇺', currency:'EUR', event:'ECB Interest Rate Decision', impact:'high', forecast:'3.65%', previous:'3.65%', actual:null },
  { time:'12:30', country:'🇬🇧', currency:'GBP', event:'GDP MoM', impact:'med', forecast:'0.1%', previous:'-0.1%', actual:null },
  { time:'13:00', country:'🇯🇵', currency:'JPY', event:'Bank of Japan Rate Decision', impact:'high', forecast:'-0.10%', previous:'-0.10%', actual:'0.10%' },
  { time:'14:00', country:'🇺🇸', currency:'USD', event:'ISM Manufacturing PMI', impact:'med', forecast:'49.2', previous:'47.8', actual:'50.3' },
  { time:'14:30', country:'🇺🇸', currency:'USD', event:'Initial Jobless Claims', impact:'med', forecast:'215K', previous:'220K', actual:'208K' },
  { time:'15:00', country:'🇮🇳', currency:'INR', event:'Nifty Options Expiry (Weekly)', impact:'high', forecast:'—', previous:'—', actual:null },
  { time:'16:00', country:'🇨🇳', currency:'CNY', event:'Caixin Services PMI', impact:'med', forecast:'52.1', previous:'51.4', actual:null },
  { time:'16:30', country:'🇦🇺', currency:'AUD', event:'RBA Rate Decision', impact:'high', forecast:'4.35%', previous:'4.35%', actual:null },
  { time:'17:00', country:'🇨🇭', currency:'CHF', event:'SNB Policy Rate', impact:'med', forecast:'1.50%', previous:'1.75%', actual:null },
  { time:'18:00', country:'🇺🇸', currency:'USD', event:'FOMC Meeting Minutes', impact:'high', forecast:'—', previous:'—', actual:null },
  { time:'20:00', country:'🇺🇸', currency:'USD', event:'Crude Oil Inventories', impact:'med', forecast:'-1.2M', previous:'+0.8M', actual:null },
];

let calendarRefreshCount = 0;

function initEconomicCalendar() {
  renderCalendar();
  // Auto-refresh with new actuals every 30 seconds
  setInterval(() => {
    calendarRefreshCount++;
    updateCalendarActuals();
  }, 30000);
}

function renderCalendar() {
  const tbody = document.getElementById('econCalBody');
  if (!tbody) return;
  
  const now = new Date();
  const nowH = now.getHours();
  const nowM = now.getMinutes();
  
  tbody.innerHTML = '';
  ECON_EVENTS_BASE.forEach((ev, i) => {
    const [h, m] = ev.time.split(':').map(Number);
    const isPast = h < nowH || (h === nowH && m <= nowM);
    const isCurrent = h === nowH;
    
    // Generate actual if past
    if (isPast && !ev.actual && ev.forecast !== '—') {
      ev.actual = generateActual(ev.forecast, ev.impact);
    }
    
    const actualClass = ev.actual ? getActualClass(ev.actual, ev.forecast) : '';
    const row = document.createElement('tr');
    row.className = ev.impact + '-impact';
    if (isCurrent) row.style.background = 'rgba(0,255,204,0.04)';
    row.innerHTML = `
      <td class="econ-time">${ev.time}</td>
      <td class="econ-country">${ev.country}</td>
      <td><span class="impact-dot ${ev.impact}"></span>${ev.event}</td>
      <td style="color:var(--text2)">${ev.forecast}</td>
      <td style="color:var(--text2)">${ev.previous}</td>
      <td class="econ-actual ${actualClass}" id="econ-actual-${i}">${ev.actual || '<span style="color:var(--text2);opacity:0.5">Pending...</span>'}</td>
    `;
    tbody.appendChild(row);
  });
}

function updateCalendarActuals() {
  const now = new Date();
  const nowH = now.getHours();
  const nowM = now.getMinutes();
  
  ECON_EVENTS_BASE.forEach((ev, i) => {
    const [h, m] = ev.time.split(':').map(Number);
    const isPast = h < nowH || (h === nowH && m <= nowM);
    if (isPast && !ev.actual && ev.forecast !== '—') {
      ev.actual = generateActual(ev.forecast, ev.impact);
      const cell = document.getElementById(`econ-actual-${i}`);
      if (cell) {
        const cls = getActualClass(ev.actual, ev.forecast);
        cell.className = `econ-actual ${cls}`;
        cell.innerHTML = ev.actual;
        cell.style.animation = 'fadeInUp 0.4s ease';
      }
    }
  });
  
  // Update header refresh time
  const refreshEl = document.getElementById('calRefreshTime');
  if (refreshEl) refreshEl.textContent = `Last updated: ${new Date().toLocaleTimeString('en-IN')}`;
}

function generateActual(forecast, impact) {
  if (!forecast || forecast === '—') return null;
  
  // Extract numeric part
  const numMatch = forecast.match(/-?[\d.]+/);
  if (!numMatch) return forecast;
  
  const base = parseFloat(numMatch[0]);
  const variance = impact === 'high' ? 0.15 : 0.08;
  const deviation = base * variance * (Math.random() - 0.5) * 2;
  const actual = base + deviation;
  
  // Reconstruct with same format
  const formatted = Math.abs(actual) < 10 ? actual.toFixed(1) : Math.round(actual).toString();
  return forecast.replace(numMatch[0], formatted);
}

function getActualClass(actual, forecast) {
  if (!actual || !forecast || forecast === '—') return '';
  const aNum = parseFloat(actual.match(/-?[\d.]+/)?.[0] || 0);
  const fNum = parseFloat(forecast.match(/-?[\d.]+/)?.[0] || 0);
  if (aNum > fNum * 1.02) return 'beat';
  if (aNum < fNum * 0.98) return 'miss';
  return '';
}

// ============================================================
// MARKET NEWS — Simulated Forex Factory / Reuters style
// ============================================================

const NEWS_SOURCES = ['Reuters', 'Bloomberg', 'Economic Times', 'Forex Factory', 'CNBC', 'Moneycontrol', 'LiveMint', 'MarketWatch'];

const NEWS_TEMPLATES = [
  // Bullish templates
  { template: 'Fed signals potential rate cuts as inflation cools — markets rally', sentiment: 'bull', tags: ['USD', 'Stocks'] },
  { template: 'Nifty 50 hits fresh highs on strong FII inflows — ₹{amt} crore bought', sentiment: 'bull', tags: ['NIFTY'] },
  { template: 'Gold surges as safe-haven demand rises amid geopolitical tensions', sentiment: 'bull', tags: ['GOLD'] },
  { template: 'RBI keeps rates unchanged, signals accommodative stance going forward', sentiment: 'bull', tags: ['INR', 'NIFTY'] },
  { template: 'Bitcoin breaks above $98,000 on institutional accumulation reports', sentiment: 'bull', tags: ['BTC'] },
  { template: 'IT sector leads gains as Infosys, TCS report strong quarterly numbers', sentiment: 'bull', tags: ['NIFTY'] },
  { template: 'Strong GDP data boosts risk appetite — equities and commodities rally', sentiment: 'bull', tags: ['USD', 'Stocks'] },
  { template: 'Bank Nifty surges {pct}% after credit growth data beats estimates', sentiment: 'bull', tags: ['BANKNIFTY'] },
  
  // Bearish templates
  { template: 'FII outflows hit ₹{amt} crore — Nifty faces selling pressure', sentiment: 'bear', tags: ['NIFTY'] },
  { template: 'Crude oil spikes {pct}% on OPEC+ supply cut announcement — inflation fears rise', sentiment: 'bear', tags: ['CRUDE', 'INFLATION'] },
  { template: 'Dollar strengthens as US bond yields hit multi-month highs', sentiment: 'bear', tags: ['USD', 'Emerging Markets'] },
  { template: 'China GDP misses estimates — Asian markets under pressure', sentiment: 'bear', tags: ['ASIA', 'CNY'] },
  { template: 'Inflation data surprises on upside — rate cut expectations recede', sentiment: 'bear', tags: ['USD', 'Bonds'] },
  { template: 'VIX spikes to {val} as options traders hedge against market uncertainty', sentiment: 'bear', tags: ['VIX'] },
  
  // Neutral templates
  { template: 'Markets await FOMC minutes — traders cautious ahead of Fed speak', sentiment: 'neutral', tags: ['USD'] },
  { template: 'Nifty consolidates near {level} — crucial support being tested', sentiment: 'neutral', tags: ['NIFTY'] },
  { template: 'RBI forex intervention stabilises rupee near ₹{rate}/USD', sentiment: 'neutral', tags: ['INR'] },
  { template: 'Earnings season kicks off — mixed results from early reporters', sentiment: 'neutral', tags: ['Earnings'] },
  { template: 'Global markets mixed as traders digest conflicting economic signals', sentiment: 'neutral', tags: ['Global'] },
  { template: 'Sebi announces new F&O regulations — implementation from next month', sentiment: 'neutral', tags: ['NIFTY', 'Regulation'] },
];

let newsItems = [];
let newsRefreshInterval = null;

function initNews() {
  generateNews();
  // Refresh every 5 seconds (add 1-2 new items, rotate old)
  newsRefreshInterval = setInterval(() => {
    refreshNews();
    updateNewsTimer();
  }, 5000);
}

function generateNews() {
  newsItems = [];
  const count = 12;
  for (let i = 0; i < count; i++) {
    newsItems.push(createNewsItem(i));
  }
  renderNews();
}

function createNewsItem(ageMinutes = 0) {
  const template = NEWS_TEMPLATES[Math.floor(Math.random() * NEWS_TEMPLATES.length)];
  const source = NEWS_SOURCES[Math.floor(Math.random() * NEWS_SOURCES.length)];
  const time = new Date(Date.now() - ageMinutes * 60000);
  
  let headline = template.template
    .replace('{amt}', (Math.floor(Math.random() * 8) + 2) * 1000 + ',' + Math.floor(Math.random() * 900))
    .replace('{pct}', (Math.random() * 3 + 0.5).toFixed(1))
    .replace('{level}', (Math.floor(Math.random() * 1000) + 21000).toLocaleString('en-IN'))
    .replace('{rate}', (83 + Math.random() * 1).toFixed(2))
    .replace('{val}', (15 + Math.random() * 10).toFixed(1));
  
  const minutesAgo = Math.floor(ageMinutes);
  const timeStr = minutesAgo === 0 ? 'Just now' : minutesAgo < 60 ? `${minutesAgo}m ago` : `${Math.floor(minutesAgo/60)}h ago`;
  
  return { headline, source, sentiment: template.sentiment, timeStr, tags: template.tags, timestamp: time.getTime() };
}

function refreshNews() {
  // Add 1-2 new items at top
  const newCount = Math.random() < 0.4 ? 2 : 1;
  for (let i = 0; i < newCount; i++) {
    newsItems.unshift(createNewsItem(0));
  }
  // Remove oldest if too many
  if (newsItems.length > 18) newsItems = newsItems.slice(0, 18);
  // Update timestamps
  newsItems.forEach((item, i) => {
    const ageMs = Date.now() - item.timestamp;
    const ageMin = Math.floor(ageMs / 60000);
    item.timeStr = ageMin === 0 ? 'Just now' : ageMin < 60 ? `${ageMin}m ago` : `${Math.floor(ageMin/60)}h ago`;
  });
  renderNews();
}

function renderNews() {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;
  
  grid.innerHTML = newsItems.map((item, i) => `
    <div class="news-item" style="animation: fadeInUp 0.3s ease ${i === 0 ? '' : 'none'}">
      <div class="news-time">
        <span class="news-source">${item.source}</span>
        <span>${item.timeStr}</span>
        ${item.tags.map(t => `<span style="color:var(--text2);font-size:0.5rem;padding:0.15rem 0.4rem;background:rgba(255,255,255,0.05);border-radius:2px">${t}</span>`).join('')}
      </div>
      <div class="news-headline">${item.headline}</div>
      <div class="news-sentiment ${item.sentiment}">${item.sentiment === 'bull' ? '▲ Bullish' : item.sentiment === 'bear' ? '▼ Bearish' : '◆ Neutral'}</div>
    </div>
  `).join('');
}

let newsTimerCount = 5;
function updateNewsTimer() {
  newsTimerCount = 5;
  const el = document.getElementById('newsTimer');
  if (el) el.textContent = `Refreshing in 5s`;
  
  const countdown = setInterval(() => {
    newsTimerCount--;
    if (el) el.textContent = `Refreshing in ${newsTimerCount}s`;
    if (newsTimerCount <= 0) clearInterval(countdown);
  }, 1000);
}

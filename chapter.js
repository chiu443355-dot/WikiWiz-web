// WikiWiz — CHAPTERS.JS

function initChapters() {
  renderChapters();
  renderBadges();
}

function renderChapters() {
  const grid = document.getElementById('chaptersGrid');
  if (!grid) return;

  // Group chapters by phase
  const phases = {};
  ALL_CHAPTERS.forEach(ch => {
    const phase = ch.phase || 0;
    if (!phases[phase]) phases[phase] = [];
    phases[phase].push(ch);
  });

  const state = getState();

  Object.entries(phases).sort(([a],[b]) => +a - +b).forEach(([phase, chapters]) => {
    const firstChapter = chapters.find(c => c.phaseTitle);

    // Phase header
    const header = document.createElement('div');
    header.className = 'phase-header';
    header.innerHTML = `
      <div class="phase-num">0${phase}</div>
      <div class="phase-info">
        <div class="phase-title">${firstChapter?.phaseTitle || 'ADVANCED'}</div>
        <div class="phase-subtitle">${firstChapter?.phaseSubtitle || ''}</div>
      </div>
    `;
    grid.appendChild(header);

    chapters.forEach(ch => {
      const done = state.completed.includes(ch.id);
      const card = document.createElement('div');
      card.className = `chapter-card ${done ? 'completed' : ''}`;
      card.innerHTML = `
        <div class="cc-tag">${ch.tag}</div>
        <div class="cc-title">${ch.title}</div>
        <div class="cc-desc">${ch.desc}</div>
        <div class="cc-meta">
          <span class="cc-xp">⚡ +${ch.xp} XP</span>
          <span class="cc-time">⏱ ${ch.time}</span>
          <span class="cc-diff ${ch.diff}">${ch.diff.toUpperCase()}</span>
        </div>
      `;
      card.addEventListener('click', () => openChapter(ch));
      grid.appendChild(card);
    });
  });
}

function openChapter(chapter) {
  const modal = document.getElementById('chapterModal');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;

  const state = getState();
  const done = state.completed.includes(chapter.id);

  const hasFull = chapter.content && chapter.content.sections;

  let bodyHTML = '';
  if (hasFull) {
    const c = chapter.content;
    bodyHTML += `<p>${c.intro}</p>`;

    c.sections.forEach(sec => {
      if (sec.h) bodyHTML += `<h3>${sec.h}</h3>`;
      if (sec.body) bodyHTML += `<p>${sec.body.replace(/\n/g, '<br/>')}</p>`;
      if (sec.list) {
        bodyHTML += '<ul>' + sec.list.map(i => `<li>${i}</li>`).join('') + '</ul>';
      }
      if (sec.formula) bodyHTML += `<div class="formula">${sec.formula.replace(/\n/g,'<br/>')}</div>`;
      if (sec.quote) bodyHTML += `<div class="quote-block">${sec.quote}</div>`;
      if (sec.warn) bodyHTML += `<div class="warn-block">${sec.warn}</div>`;
    });

    // Chart
    bodyHTML += `<div class="modal-chart">
      <div class="modal-chart-title">📊 VISUAL EXPLANATION — ${chapter.title.toUpperCase()}</div>
      ${getChartSVG(chapter.content.chart || 'generic', chapter)}
    </div>`;

    if (c.key_takeaways) {
      bodyHTML += `<h4>KEY TAKEAWAYS</h4><ul>` + c.key_takeaways.map(t => `<li>${t}</li>`).join('') + `</ul>`;
    }
  } else {
    bodyHTML = `
      <p>This chapter covers advanced concepts in ${chapter.title}. 
      As you progress through the curriculum, each topic builds on the previous — 
      reinforcing the interconnected nature of financial markets and trading mastery.</p>
      <div class="quote-block">"The more you learn, the more you realize how much you don't know — and that awareness is the beginning of mastery."</div>
      <div class="modal-chart">
        <div class="modal-chart-title">📊 CONCEPT OVERVIEW</div>
        ${getChartSVG('generic', chapter)}
      </div>
      <h4>WHAT YOU WILL LEARN</h4>
      <ul>
        <li>Core theory and practical application</li>
        <li>Real market examples and case studies</li>
        <li>Common mistakes and how to avoid them</li>
        <li>Professional techniques used by institutional traders</li>
      </ul>
    `;
  }

  content.innerHTML = `
    <button class="modal-close" onclick="closeModal()">✕ CLOSE</button>
    <div class="modal-tag">${chapter.tag} · ${chapter.diff.toUpperCase()} · ${chapter.time}</div>
    <h2 class="modal-title">${chapter.title}</h2>
    <div class="modal-body">${bodyHTML}</div>
    <button class="modal-complete-btn ${done ? 'done' : ''}" id="modalCompleteBtn" onclick="completeChapter('${chapter.id}', ${chapter.xp})">
      ${done ? '✓ CHAPTER COMPLETED — +' + chapter.xp + ' XP EARNED' : '⚡ MARK COMPLETE — EARN +' + chapter.xp + ' XP'}
    </button>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('chapterModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

function completeChapter(id, xp) {
  const state = getState();
  if (!state.completed.includes(id)) {
    state.completed.push(id);
    state.xp += xp;
    state.calcsUsed = state.calcsUsed || 0;
    saveState(state);
    updateXPDisplay(state.xp, xp);
    checkBadges(state);

    // Update button
    const btn = document.getElementById('modalCompleteBtn');
    if (btn) {
      btn.textContent = `✓ CHAPTER COMPLETED — +${xp} XP EARNED`;
      btn.classList.add('done');
    }

    // Refresh chapter cards
    document.querySelectorAll('.chapter-card').forEach(card => {
      const title = card.querySelector('.cc-title')?.textContent;
      const chapter = ALL_CHAPTERS.find(c => c.title === title);
      if (chapter && chapter.id === id) card.classList.add('completed');
    });

    updateProgress();
  }
}

// ======================================================
// SVG CHARTS FOR EACH CHAPTER
// ======================================================
function getChartSVG(type, chapter) {
  const charts = {
    money_timeline: moneyTimelineChart,
    compound_growth: compoundGrowthChart,
    stock_ownership: stockOwnershipChart,
    order_flow: orderFlowChart,
    order_book: orderBookChart,
    candlestick_patterns: candlestickChart,
    support_resistance: supportResistanceChart,
    price_action: priceActionChart,
    financial_statements: financialStatementsChart,
    indicators: indicatorsChart,
    position_sizing: positionSizingChart,
    psychology: psychologyChart,
    psychology_biases: biasesChart,
    options_greeks: optionsGreeksChart,
    smc_concepts: smcChart,
    algo_trading: algoChart,
    macro_relationships: macroChart,
    moat_analysis: moatChart,
    probability_trading: probabilityChart,
    portfolio_allocation: portfolioChart,
    generic: genericChart,
  };
  const fn = charts[type] || genericChart;
  return fn(chapter);
}

function svgWrap(content, h = 240) {
  return `<svg viewBox="0 0 760 ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:Space Mono,monospace;">${content}</svg>`;
}

function compoundGrowthChart() {
  const years = [0,5,10,15,20,25,30];
  const vals6 = years.map(y => 10000 * Math.pow(1.06, y));
  const vals12 = years.map(y => 10000 * Math.pow(1.12, y));
  const vals24 = years.map(y => 10000 * Math.pow(1.24, y));
  const maxV = 300000;
  const toX = y => 80 + (y / 30) * 640;
  const toY = v => 210 - (Math.min(v, maxV) / maxV) * 180;

  const line = (arr, color) => {
    const pts = years.map((y,i) => `${toX(y)},${toY(arr[i])}`).join(' ');
    return `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  };
  const dots = (arr, color) => years.map((y,i) => 
    `<circle cx="${toX(y)}" cy="${toY(arr[i])}" r="4" fill="${color}"/>`
  ).join('');

  return svgWrap(`
    <line x1="80" y1="30" x2="80" y2="215" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <line x1="80" y1="215" x2="720" y2="215" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    ${years.map(y => `<text x="${toX(y)}" y="230" fill="#8888aa" font-size="10" text-anchor="middle">${y}yr</text>`).join('')}
    ${[0,100000,200000,300000].map(v => `<text x="75" y="${toY(v)+4}" fill="#8888aa" font-size="9" text-anchor="end">₹${(v/1000).toFixed(0)}K</text><line x1="80" y1="${toY(v)}" x2="720" y2="${toY(v)}" stroke="rgba(255,255,255,0.04)"/>`).join('')}
    ${line(vals6, '#8888aa')} ${dots(vals6, '#8888aa')}
    ${line(vals12, '#00ffcc')} ${dots(vals12, '#00ffcc')}
    ${line(vals24, '#ff3c6e')} ${dots(vals24, '#ff3c6e')}
    <text x="600" y="${toY(vals6[6])-8}" fill="#8888aa" font-size="9">6% — ₹57K</text>
    <text x="600" y="${toY(vals12[6])-8}" fill="#00ffcc" font-size="9">12% — ₹300K</text>
    <text x="560" y="${toY(Math.min(vals24[5], maxV))-8}" fill="#ff3c6e" font-size="9">24% — EXPLOSIVE</text>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">₹10,000 INVESTED — COMPOUND GROWTH</text>
  `, 245);
}

function candlestickChart() {
  const candles = [
    {x:80, o:120, c:150, h:165, l:110, bull:true},
    {x:145, o:148, c:130, h:158, l:120, bull:false},
    {x:210, o:128, c:128, h:155, l:100, bull:false, doji:true},
    {x:275, o:105, c:170, h:175, l:95, bull:true, engulf:true},
    {x:340, o:168, c:195, h:210, l:160, bull:true},
    {x:405, o:192, c:185, h:225, l:180, bull:false, star:true},
    {x:470, o:183, c:155, h:192, l:140, bull:false},
    {x:535, o:152, c:152, h:178, l:125, bull:false, hammer:true},
    {x:600, o:155, c:195, h:200, l:148, bull:true},
    {x:665, o:193, c:220, h:228, l:186, bull:true},
  ];
  const toY = v => 10 + (240 - v);

  const cands = candles.map(c => {
    const col = c.bull ? '#00ff88' : '#ff3c6e';
    const top = Math.max(c.o, c.c), bot = Math.min(c.o, c.c);
    return `
      <line x1="${c.x}" y1="${toY(c.h)}" x2="${c.x}" y2="${toY(c.l)}" stroke="${col}" stroke-width="1.5"/>
      <rect x="${c.x-14}" y="${toY(top)}" width="28" height="${Math.max(2,top-bot)}" fill="${col}" rx="1"/>
      ${c.doji ? `<text x="${c.x}" y="${toY(c.l)-6}" fill="#ffd700" font-size="8" text-anchor="middle">DOJI</text>` : ''}
      ${c.engulf ? `<text x="${c.x}" y="${toY(c.l)-6}" fill="#00ff88" font-size="7" text-anchor="middle">ENGULF</text>` : ''}
      ${c.star ? `<text x="${c.x}" y="${toY(c.h)+14}" fill="#ff3c6e" font-size="7" text-anchor="middle">SHOOT★</text>` : ''}
      ${c.hammer ? `<text x="${c.x}" y="${toY(c.l)-6}" fill="#00ff88" font-size="7" text-anchor="middle">HAMMER</text>` : ''}
    `;
  }).join('');

  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.3)" rx="2"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">CANDLESTICK PATTERNS — VISUAL GUIDE</text>
    ${cands}
    <line x1="30" y1="220" x2="730" y2="220" stroke="rgba(255,255,255,0.1)"/>
    <text x="380" y="238" fill="#8888aa" font-size="8" text-anchor="middle">Bull markets = buyer domination | Bear = seller domination | Wicks = rejected price levels</text>
  `);
}

function supportResistanceChart() {
  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.3)" rx="2"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">SUPPORT & RESISTANCE — ROLE REVERSAL</text>
    <!-- Resistance line -->
    <line x1="60" y1="80" x2="700" y2="80" stroke="#ff3c6e" stroke-width="1.5" stroke-dasharray="8,4"/>
    <text x="710" y="84" fill="#ff3c6e" font-size="9">RESISTANCE</text>
    <!-- Support line -->
    <line x1="60" y1="170" x2="700" y2="170" stroke="#00ff88" stroke-width="1.5" stroke-dasharray="8,4"/>
    <text x="710" y="174" fill="#00ff88" font-size="9">SUPPORT</text>
    <!-- Price path -->
    <polyline points="60,140 120,145 180,138 230,142 280,80 340,82 380,78 430,160 500,168 560,162 610,170 670,80 720,78" fill="none" stroke="#00ffcc" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- Bounce arrows -->
    <text x="280" y="68" fill="#ffd700" font-size="10" text-anchor="middle">BREAK!</text>
    <text x="430" y="150" fill="#ff3c6e" font-size="9" text-anchor="middle">OLD RES = NEW SUP</text>
    <text x="670" y="68" fill="#ffd700" font-size="10" text-anchor="middle">BREAK!</text>
    <text x="380" y="230" fill="#8888aa" font-size="8" text-anchor="middle">Role Reversal: Broken resistance becomes new support — the most powerful concept in technical analysis</text>
  `);
}

function orderBookChart() {
  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.3)" rx="2"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">ORDER BOOK — HOW PRICE IS MADE</text>
    <!-- Bids (left) -->
    <text x="180" y="40" fill="#00ff88" font-size="10" text-anchor="middle">BID (BUYERS)</text>
    ${[0,1,2,3,4].map(i => `
      <rect x="${60 + i*8}" y="${60+i*28}" width="${120-i*20}" height="22" fill="rgba(0,255,136,0.15)" rx="1"/>
      <rect x="${60 + i*8}" y="${60+i*28}" width="${8}" height="22" fill="#00ff88" rx="1"/>
      <text x="80" y="${75+i*28}" fill="#00ff88" font-size="9">₹${(500 - i*2).toFixed(0)}</text>
      <text x="160" y="${75+i*28}" fill="#8888aa" font-size="8">${(120 - i*15).toFixed(0)} qty</text>
    `).join('')}
    <!-- Price in middle -->
    <rect x="320" y="110" width="120" height="30" fill="rgba(255,215,0,0.15)" rx="2"/>
    <text x="380" y="130" fill="#ffd700" font-size="12" text-anchor="middle" font-weight="bold">₹500.00</text>
    <text x="380" y="155" fill="#8888aa" font-size="8" text-anchor="middle">LAST TRADE</text>
    <!-- Asks (right) -->
    <text x="580" y="40" fill="#ff3c6e" font-size="10" text-anchor="middle">ASK (SELLERS)</text>
    ${[0,1,2,3,4].map(i => `
      <rect x="${480}" y="${60+i*28}" width="${120-i*20}" height="22" fill="rgba(255,60,110,0.15)" rx="1"/>
      <rect x="${480 + 112 - i*20}" y="${60+i*28}" width="${8}" height="22" fill="#ff3c6e" rx="1"/>
      <text x="500" y="${75+i*28}" fill="#ff3c6e" font-size="9">₹${(502 + i*2).toFixed(0)}</text>
      <text x="600" y="${75+i*28}" fill="#8888aa" font-size="8">${(100 - i*12).toFixed(0)} qty</text>
    `).join('')}
    <text x="380" y="230" fill="#8888aa" font-size="8" text-anchor="middle">Price discovery: Aggressive buyer hits ask → price rises | Aggressive seller hits bid → price falls</text>
  `);
}

function positionSizingChart() {
  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.3)" rx="2"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">POSITION SIZING — THE MATH OF SURVIVAL</text>
    <!-- Account blocks -->
    <rect x="60" y="40" width="200" height="100" fill="rgba(0,255,204,0.08)" rx="2" stroke="rgba(0,255,204,0.3)" stroke-width="1"/>
    <text x="160" y="62" fill="#00ffcc" font-size="10" text-anchor="middle">ACCOUNT: ₹1,00,000</text>
    <text x="160" y="82" fill="#8888aa" font-size="9" text-anchor="middle">2% Rule = ₹2,000 max risk</text>
    <line x1="60" y1="95" x2="260" y2="95" stroke="rgba(255,255,255,0.1)"/>
    <text x="160" y="112" fill="#ffd700" font-size="9" text-anchor="middle">Entry: ₹500</text>
    <text x="160" y="128" fill="#ff3c6e" font-size="9" text-anchor="middle">Stop: ₹480 (₹20 risk)</text>
    <!-- Formula -->
    <rect x="310" y="40" width="200" height="100" fill="rgba(123,47,255,0.08)" rx="2" stroke="rgba(123,47,255,0.3)" stroke-width="1"/>
    <text x="410" y="62" fill="#a78bfa" font-size="10" text-anchor="middle">CALCULATION</text>
    <text x="410" y="85" fill="#fff" font-size="11" text-anchor="middle">₹2,000 ÷ ₹20</text>
    <line x1="370" y1="92" x2="450" y2="92" stroke="rgba(255,255,255,0.3)"/>
    <text x="410" y="110" fill="#00ff88" font-size="14" text-anchor="middle">100 SHARES</text>
    <text x="410" y="128" fill="#8888aa" font-size="8" text-anchor="middle">Position Size</text>
    <!-- R:R -->
    <rect x="560" y="40" width="160" height="100" fill="rgba(255,215,0,0.06)" rx="2" stroke="rgba(255,215,0,0.3)" stroke-width="1"/>
    <text x="640" y="62" fill="#ffd700" font-size="10" text-anchor="middle">RISK:REWARD</text>
    <text x="640" y="85" fill="#00ff88" font-size="12" text-anchor="middle">Target: ₹560</text>
    <text x="640" y="105" fill="#ff3c6e" font-size="11" text-anchor="middle">Stop: ₹480</text>
    <text x="640" y="128" fill="#ffd700" font-size="10" text-anchor="middle">= 3:1 R:R ✓</text>
    <!-- Survival chart -->
    <text x="380" y="175" fill="#8888aa" font-size="9" text-anchor="middle">With 2% rule: 50 consecutive losses still leaves you 36% of capital</text>
    ${[0,1,2,3,4,5,6,7,8,9].map(i => {
      const pct = Math.pow(0.98, i*5) * 100;
      return `<rect x="${60+i*65}" y="${215-pct*0.35}" width="55" height="${pct*0.35}" fill="rgba(0,255,204,${0.1+pct/500})" rx="1"/>
      <text x="${87+i*65}" y="222" fill="#8888aa" font-size="7" text-anchor="middle">${i*5}L</text>`;
    }).join('')}
  `);
}

function indicatorsChart() {
  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.3)" rx="2"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">INDICATORS — RSI DIVERGENCE EXAMPLE</text>
    <!-- Price panel -->
    <text x="60" y="38" fill="#8888aa" font-size="8">PRICE</text>
    <polyline points="60,120 120,110 180,100 240,88 300,80 360,85 420,78 480,90 540,95 600,88 660,95 720,92" fill="none" stroke="#00ffcc" stroke-width="2"/>
    <!-- RSI panel -->
    <line x1="60" y1="140" x2="720" y2="140" stroke="rgba(255,255,255,0.06)"/>
    <text x="60" y="155" fill="#8888aa" font-size="8">RSI(14)</text>
    <line x1="60" y1="160" x2="720" y2="160" stroke="rgba(255,100,100,0.2)" stroke-dasharray="4,3"/>
    <text x="725" y="164" fill="#ff3c6e" font-size="7">70</text>
    <polyline points="60,195 120,185 180,178 240,170 300,165 360,168 420,172 480,180 540,185 600,188 660,192 720,196" fill="none" stroke="#ffd700" stroke-width="2"/>
    <!-- Divergence arrow -->
    <line x1="420" y1="78" x2="660" y2="95" stroke="#ff3c6e" stroke-width="1.5" stroke-dasharray="4,2"/>
    <text x="530" y="72" fill="#ff3c6e" font-size="8" text-anchor="middle">Price: Higher High</text>
    <line x1="420" y1="172" x2="660" y2="192" stroke="#ff3c6e" stroke-width="1.5" stroke-dasharray="4,2"/>
    <text x="530" y="210" fill="#ff3c6e" font-size="8" text-anchor="middle">RSI: Lower High = BEARISH DIVERGENCE ⚠️</text>
    <text x="380" y="232" fill="#8888aa" font-size="8" text-anchor="middle">Divergence = momentum weakening before price reverses. More powerful than overbought/oversold alone.</text>
  `);
}

function smcChart() {
  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.3)" rx="2"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">SMC — ORDER BLOCK + LIQUIDITY SWEEP</text>
    <!-- Price path with liquidity sweep and OB -->
    <polyline points="60,180 120,165 180,150 220,145 260,170 290,185 310,200 320,190 350,140 400,120 450,105 500,110 530,130 560,140 580,145" fill="none" stroke="#00ffcc" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Order block highlight -->
    <rect x="220" y="140" width="80" height="45" fill="rgba(0,255,204,0.08)" rx="1" stroke="#00ffcc" stroke-width="1" stroke-dasharray="4,2"/>
    <text x="260" y="135" fill="#00ffcc" font-size="8" text-anchor="middle">ORDER BLOCK</text>
    <text x="260" y="196" fill="#8888aa" font-size="7" text-anchor="middle">Last bearish candle before up move</text>
    <!-- Liquidity sweep zone -->
    <line x1="290" y1="186" x2="430" y2="186" stroke="#ff3c6e" stroke-width="1" stroke-dasharray="3,2"/>
    <text x="360" y="200" fill="#ff3c6e" font-size="8" text-anchor="middle">STOP HUNT ZONE</text>
    <!-- Sweep arrow -->
    <line x1="310" y1="190" x2="310" y2="205" stroke="#ff3c6e" stroke-width="2"/>
    <polygon points="310,210 306,200 314,200" fill="#ff3c6e"/>
    <text x="310" y="222" fill="#ff3c6e" font-size="7" text-anchor="middle">SWEEP</text>
    <!-- Premium/Discount zones -->
    <rect x="400" y="95" width="160" height="45" fill="rgba(255,60,110,0.06)" rx="1" stroke="rgba(255,60,110,0.3)"/>
    <text x="480" y="112" fill="#ff3c6e" font-size="8" text-anchor="middle">PREMIUM ZONE</text>
    <text x="480" y="128" fill="#8888aa" font-size="7" text-anchor="middle">(above 50% — sell)</text>
    <rect x="400" y="155" width="160" height="45" fill="rgba(0,255,136,0.06)" rx="1" stroke="rgba(0,255,136,0.3)"/>
    <text x="480" y="172" fill="#00ff88" font-size="8" text-anchor="middle">DISCOUNT ZONE</text>
    <text x="480" y="188" fill="#8888aa" font-size="7" text-anchor="middle">(below 50% — buy)</text>
    <text x="380" y="232" fill="#8888aa" font-size="8" text-anchor="middle">Smart money sweeps liquidity below obvious lows, fills orders, then reverses aggressively</text>
  `);
}

function genericChart(chapter) {
  const xpBars = Math.min(10, Math.round((chapter?.xp || 100) / 40));
  return svgWrap(`
    <rect width="760" height="200" fill="rgba(0,0,0,0.3)" rx="2"/>
    <text x="380" y="25" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">${(chapter?.title || 'CHAPTER').toUpperCase()} — CONCEPT MAP</text>
    ${Array.from({length: 7}, (_,i) => {
      const x = 80 + i * 90;
      const h = 40 + Math.random() * 100;
      const col = i < 3 ? '#ff3c6e' : i === 3 ? '#ffd700' : '#00ff88';
      return `<rect x="${x-25}" y="${175-h}" width="50" height="${h}" fill="${col}22" rx="2" stroke="${col}55"/>
      <text x="${x}" y="${175-h-6}" fill="${col}" font-size="8" text-anchor="middle">${['Entry','Risk','Setup','Target','Exit','Review','Journal'][i]}</text>`;
    }).join('')}
    <text x="380" y="195" fill="#8888aa" font-size="8" text-anchor="middle">Every element of trading is interconnected — master each component</text>
  `, 210);
}

// Simplified chart stubs for other types
const orderFlowChart = (ch) => svgWrap(`
  <rect width="760" height="220" fill="rgba(0,0,0,0.3)" rx="2"/>
  <text x="380" y="20" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">ORDER FLOW — HOW YOUR TRADE REACHES THE EXCHANGE</text>
  ${['You Place Order','Broker Routes','Exchange Matches','Settlement T+1'].map((s,i) => `
    <rect x="${80+i*165}" y="70" width="140" height="60" fill="rgba(0,255,204,0.06)" rx="4" stroke="rgba(0,255,204,0.2)"/>
    <text x="${150+i*165}" y="98" fill="#00ffcc" font-size="9" text-anchor="middle">${s.split(' ')[0]}</text>
    <text x="${150+i*165}" y="114" fill="#8888aa" font-size="8" text-anchor="middle">${s.split(' ').slice(1).join(' ')}</text>
    ${i<3?`<line x1="${220+i*165}" y1="100" x2="${245+i*165}" y2="100" stroke="#ffd700" stroke-width="2" marker-end="url(#arr)"/>`:''}
  `).join('')}
  <text x="380" y="185" fill="#ffd700" font-size="9" text-anchor="middle">⚡ HFT algorithms see your order and can front-run within microseconds. Use limit orders, not market orders.</text>
`, 200);

const psychologyChart = (ch) => svgWrap(`
  <rect width="760" height="220" fill="rgba(0,0,0,0.3)" rx="2"/>
  <text x="380" y="20" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">EMOTIONAL CYCLE OF A TYPICAL TRADER</text>
  <polyline points="60,170 120,140 180,100 240,70 300,85 340,120 370,155 400,180 430,160 470,140 510,120 560,100 620,80 680,60 720,50" fill="none" stroke="#ffd700" stroke-width="2.5"/>
  ${[
    [60,170,'START','#8888aa'],[180,100,'OPTIMISM','#ffd700'],[240,70,'THRILL','#00ff88'],
    [340,120,'ANXIETY','#ff9900'],[400,180,'PANIC','#ff3c6e'],[430,160,'CAPITULATE','#ff3c6e'],
    [560,100,'HOPE','#ffd700'],[680,60,'RELIEF','#00ff88'],[720,50,'CONFIDENCE','#00ffcc']
  ].map(([x,y,label,col]) => `<text x="${x}" y="${y-8}" fill="${col}" font-size="7" text-anchor="middle">${label}</text><circle cx="${x}" cy="${y}" r="4" fill="${col}"/>`).join('')}
  <text x="380" y="205" fill="#8888aa" font-size="8" text-anchor="middle">Most retail traders buy at THRILL and sell at PANIC. Professionals do the opposite.</text>
`, 215);

const biasesChart = psychologyChart;
const stockOwnershipChart = genericChart;
const financialStatementsChart = genericChart;
const priceActionChart = supportResistanceChart;
const optionsGreeksChart = genericChart;
const algoChart = genericChart;
const macroChart = genericChart;
const moatChart = genericChart;
const probabilityChart = compoundGrowthChart;
const portfolioChart = genericChart;

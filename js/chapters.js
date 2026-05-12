// WikiWiz — CHAPTERS.JS

function initChapters() {
  renderChapters();
  renderBadges();
}

function renderChapters() {
  const grid = document.getElementById('chaptersGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const phases = {};
  ALL_CHAPTERS.forEach(ch => {
    const p = ch.phase || 0;
    if (!phases[p]) phases[p] = [];
    phases[p].push(ch);
  });

  const state = getState();

  Object.entries(phases).sort(([a],[b]) => +a - +b).forEach(([phase, chapters]) => {
    const first = chapters.find(c => c.phaseTitle);
    const header = document.createElement('div');
    header.className = 'phase-header';
    header.innerHTML = `
      <div class="phase-num">0${phase}</div>
      <div>
        <div class="phase-title">${first?.phaseTitle || 'ADVANCED'}</div>
        <div class="phase-subtitle">${first?.phaseSubtitle || ''}</div>
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
          ${done ? '<span style="color:var(--green);font-family:var(--font-mono);font-size:0.6rem">✓ DONE</span>' : ''}
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

  let bodyHTML = '';
  if (chapter.content) {
    const c = chapter.content;
    bodyHTML += `<p style="font-size:1rem;color:var(--text);line-height:1.9;margin-bottom:1.5rem">${c.intro}</p>`;
    c.sections.forEach(sec => {
      if (sec.h) bodyHTML += `<h3>${sec.h}</h3>`;
      if (sec.body) bodyHTML += `<p>${sec.body.replace(/\n/g, '<br/>')}</p>`;
      if (sec.list) bodyHTML += '<ul>' + sec.list.map(i => `<li>${i}</li>`).join('') + '</ul>';
      if (sec.formula) bodyHTML += `<div class="formula">${sec.formula.replace(/\n/g,'<br/>')}</div>`;
      if (sec.quote) bodyHTML += `<div class="quote-block">${sec.quote}</div>`;
      if (sec.warn) bodyHTML += `<div class="warn-block">${sec.warn}</div>`;
    });

    // Visual chart
    bodyHTML += `<div class="modal-chart">
      <div class="modal-chart-title">📊 VISUAL EXPLANATION — ${chapter.title.toUpperCase()}</div>
      ${getChapterChart(chapter.content.chart || 'generic', chapter)}
    </div>`;

    if (c.key_takeaways) {
      bodyHTML += `<h4>⚡ KEY TAKEAWAYS</h4><ul>` + c.key_takeaways.map(t => `<li><strong>${t}</strong></li>`).join('') + `</ul>`;
    }
  } else {
    // Default for extra chapters
    bodyHTML = `
      <p>This is an advanced chapter covering ${chapter.title}. It builds on the foundational concepts from earlier phases and introduces professional-grade techniques used by institutional traders and fund managers.</p>
      <div class="quote-block">"The more you learn, the more you realise how much you don't know — and that awareness is the beginning of mastery."</div>
      <div class="modal-chart">
        <div class="modal-chart-title">📊 CONCEPT OVERVIEW</div>
        ${getChapterChart('generic', chapter)}
      </div>
      <h4>WHAT YOU WILL LEARN</h4>
      <ul>
        <li>Core theory with practical real-market application</li>
        <li>Real examples from Indian and global markets</li>
        <li>Common mistakes and how to avoid them</li>
        <li>Professional techniques used by fund managers</li>
        <li>Step-by-step implementation framework</li>
      </ul>
    `;
  }

  content.innerHTML = `
    <button class="modal-close" onclick="closeModal()">✕ CLOSE</button>
    <div class="modal-tag">${chapter.tag} · ${chapter.diff.toUpperCase()} · ${chapter.time}</div>
    <h2 class="modal-title">${chapter.title}</h2>
    <div class="modal-body">${bodyHTML}</div>
    <button class="modal-complete-btn ${done ? 'done' : ''}" id="modalCompleteBtn" onclick="completeChapter('${chapter.id}', ${chapter.xp})">
      ${done ? '✓ COMPLETED — +' + chapter.xp + ' XP EARNED' : '⚡ MARK COMPLETE — EARN +' + chapter.xp + ' XP'}
    </button>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('chapterModal')?.classList.remove('open');
  document.body.style.overflow = '';
}

function completeChapter(id, xp) {
  const state = getState();
  if (!state.completed.includes(id)) {
    state.completed.push(id);
    state.xp += xp;
    saveState(state);
    updateXPDisplay(state.xp, xp);
    checkBadges(state);
    const btn = document.getElementById('modalCompleteBtn');
    if (btn) { btn.textContent = `✓ COMPLETED — +${xp} XP EARNED`; btn.classList.add('done'); }
    document.querySelectorAll('.chapter-card').forEach(card => {
      const title = card.querySelector('.cc-title')?.textContent;
      const ch = ALL_CHAPTERS.find(c => c.title === title);
      if (ch?.id === id) card.classList.add('completed');
    });
    updateProgress();
  }
}

// ============================================================
// VISUAL CHARTS — SVG explanations for each chapter
// ============================================================
function getChapterChart(type, chapter) {
  const map = {
    compound_growth: compoundChart,
    candlestick_patterns: candlestickChart,
    support_resistance: srChart,
    price_action_chart: priceActionChart,
    indicators_chart: indicatorsChart,
    position_sizing_chart: positionSizingChart,
    psychology_chart: psychologyChart,
    order_book_chart: orderBookChart,
    order_flow_chart: orderFlowChart,
    financial_chart: financialChart,
    moat_chart: moatChart,
    macro_chart: macroChart,
    options_chart: optionsChart,
    smc_chart: smcChart,
    algo_chart: algoChart,
    money_supply: moneySupplyChart,
    stock_price_chart: stockPriceChart,
    generic: genericChart,
  };
  const fn = map[type] || genericChart;
  return fn(chapter);
}

function svgWrap(inner, h = 240) {
  return `<svg viewBox="0 0 760 ${h}" xmlns="http://www.w3.org/2000/svg" style="font-family:Space Mono,monospace;display:block;width:100%">${inner}</svg>`;
}

function compoundChart() {
  const years = [0,5,10,15,20,25,30];
  const v6 = years.map(y => 100000 * Math.pow(1.06, y));
  const v12 = years.map(y => 100000 * Math.pow(1.12, y));
  const v18 = years.map(y => 100000 * Math.pow(1.18, y));
  const maxV = 2500000;
  const toX = y => 80 + (y/30)*640;
  const toY = v => 220 - (Math.min(v,maxV)/maxV)*185;
  const line = (arr, color, dash='') => {
    const pts = years.map((y,i) => `${toX(y)},${toY(arr[i])}`).join(' ');
    return `<polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${dash}"/>`;
  };
  const dots = (arr, color) => years.map((y,i) => `<circle cx="${toX(y)}" cy="${toY(arr[i])}" r="4" fill="${color}"/>`).join('');

  return svgWrap(`
    <text x="380" y="20" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">₹1,00,000 INVESTED — COMPOUND GROWTH OVER 30 YEARS</text>
    <line x1="80" y1="30" x2="80" y2="225" stroke="rgba(255,255,255,0.1)"/>
    <line x1="80" y1="225" x2="720" y2="225" stroke="rgba(255,255,255,0.1)"/>
    ${[0,500000,1000000,1500000,2000000,2500000].map(v => `
      <line x1="80" y1="${toY(v)}" x2="720" y2="${toY(v)}" stroke="rgba(255,255,255,0.04)"/>
      <text x="75" y="${toY(v)+4}" fill="#55557a" font-size="8" text-anchor="end">₹${(v/100000).toFixed(0)}L</text>
    `).join('')}
    ${years.map(y => `<text x="${toX(y)}" y="238" fill="#55557a" font-size="9" text-anchor="middle">${y}yr</text>`).join('')}
    ${line(v6,'#8888aa','6,3')}${dots(v6,'#8888aa')}
    ${line(v12,'#00ffcc')}${dots(v12,'#00ffcc')}
    ${line(v18,'#ffd700')}${dots(v18,'#ffd700')}
    <text x="640" y="${toY(v6[6])-8}" fill="#8888aa" font-size="9">6% → ₹5.7L</text>
    <text x="640" y="${toY(v12[6])-8}" fill="#00ffcc" font-size="9">12% → ₹30L 🚀</text>
    <text x="580" y="${toY(Math.min(v18[4],maxV))-8}" fill="#ffd700" font-size="9">18% → MOON 🌕</text>
    <rect x="80" y="248" width="14" height="2" fill="#8888aa"/>
    <text x="98" y="253" fill="#8888aa" font-size="8">6% CAGR</text>
    <rect x="160" y="248" width="14" height="2" fill="#00ffcc"/>
    <text x="178" y="253" fill="#00ffcc" font-size="8">12% (Nifty historical)</text>
    <rect x="310" y="248" width="14" height="2" fill="#ffd700"/>
    <text x="328" y="253" fill="#ffd700" font-size="8">18%</text>
  `, 265);
}

function candlestickChart() {
  const candles = [
    {x:60,o:100,c:130,h:140,l:90,bull:true},
    {x:120,o:128,c:110,h:135,l:100,bull:false},
    {x:180,o:108,c:108,h:135,l:80,bull:false,doji:true,label:'DOJI'},
    {x:240,o:85,c:150,h:158,l:78,bull:true,label:'ENGULFING'},
    {x:300,o:148,c:170,h:185,l:140,bull:true},
    {x:360,o:168,c:168,h:205,l:155,bull:false,label:'SHOOTING ★'},
    {x:420,o:165,c:140,h:175,l:130,bull:false},
    {x:480,o:138,c:138,h:158,l:100,bull:true,label:'HAMMER'},
    {x:540,o:140,c:175,h:180,l:135,bull:true},
    {x:600,o:173,c:200,h:210,l:165,bull:true},
    {x:660,o:198,c:180,h:215,l:170,bull:false},
    {x:720,o:178,c:190,h:195,l:162,bull:true},
  ];
  const toY = v => 10 + (215 - v * 1.05);

  const cands = candles.map(c => {
    const col = c.bull ? '#00ff88' : '#ff3c6e';
    const top = Math.max(c.o,c.c), bot = Math.min(c.o,c.c);
    return `
      <line x1="${c.x}" y1="${toY(c.h)}" x2="${c.x}" y2="${toY(c.l)}" stroke="${col}" stroke-width="1.5"/>
      <rect x="${c.x-13}" y="${toY(top)}" width="26" height="${Math.max(2,top-bot)*1.05}" fill="${col}" rx="1"/>
      ${c.label ? `<text x="${c.x}" y="${toY(c.l)-8}" fill="${col}" font-size="7" text-anchor="middle">${c.label}</text>` : ''}
    `;
  }).join('');

  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">CANDLESTICK PATTERNS — VISUAL GUIDE</text>
    ${cands}
    <line x1="30" y1="222" x2="730" y2="222" stroke="rgba(255,255,255,0.08)"/>
    <text x="380" y="238" fill="#55557a" font-size="8" text-anchor="middle">Green = buyers won that period | Red = sellers won | Long wicks = STRONG REJECTION of that price level</text>
  `);
}

function srChart() {
  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">SUPPORT & RESISTANCE — ROLE REVERSAL</text>
    <line x1="50" y1="75" x2="710" y2="75" stroke="#ff3c6e" stroke-width="1.5" stroke-dasharray="8,4"/>
    <text x="716" y="79" fill="#ff3c6e" font-size="9">RESISTANCE</text>
    <line x1="50" y1="165" x2="710" y2="165" stroke="#00ff88" stroke-width="1.5" stroke-dasharray="8,4"/>
    <text x="716" y="169" fill="#00ff88" font-size="9">SUPPORT</text>
    <polyline points="50,145 120,150 180,140 230,148 280,75 350,78 390,73 430,155 490,162 545,168 600,165 655,75 710,72" fill="none" stroke="#00ffcc" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="280" y="62" fill="#ffd700" font-size="9" text-anchor="middle">BREAK ▲</text>
    <text x="430" y="175" fill="#8888aa" font-size="8" text-anchor="middle">Old resistance → New support!</text>
    <rect x="400" y="152" width="160" height="17" fill="rgba(0,255,204,0.08)" rx="2" stroke="rgba(0,255,204,0.3)" stroke-width="1"/>
    <text x="655" y="62" fill="#ffd700" font-size="9" text-anchor="middle">BREAK ▲</text>
    <text x="380" y="226" fill="#55557a" font-size="8" text-anchor="middle">Role Reversal: Broken support becomes resistance — broken resistance becomes support. Most powerful concept in TA.</text>
  `);
}

function priceActionChart() {
  const pts = [180,175,160,148,155,142,130,135,118,125,112,120,108,115,102,110,100,108,95,105];
  const toX = (i) => 50 + i * 32;
  const toY = (v) => 30 + (v - 90) * 1.8;
  let path = pts.map((v,i) => `${i===0?'M':'L'}${toX(i)},${toY(v)}`).join(' ');

  // Mark HH/HL points
  const highs = [{i:0,v:180,lbl:'HH'},{i:4,v:155,lbl:'LH'},{i:8,v:125,lbl:'LH'}];
  const lows = [{i:2,v:160,lbl:'HL'},{i:6,v:130,lbl:'LL'},{i:10,v:112,lbl:'LL'}];

  return svgWrap(`
    <rect width="760" height="235" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">MARKET STRUCTURE — IDENTIFYING TRENDS</text>
    <text x="200" y="36" fill="#ff3c6e" font-size="9" text-anchor="middle">← DOWNTREND (LH + LL)</text>
    <text x="560" y="36" fill="#00ff88" font-size="9" text-anchor="middle">UPTREND (HH + HL) →</text>
    <path d="${path}" fill="none" stroke="#8888aa" stroke-width="1.5" stroke-dasharray="4,3"/>
    <polyline points="${pts.slice(0,11).map((v,i) => `${toX(i)},${toY(v)}`).join(' ')}" fill="none" stroke="#ff3c6e" stroke-width="2.5" stroke-linecap="round"/>
    <polyline points="${pts.slice(10).map((v,i) => `${toX(i+10)},${toY(v)}`).join(' ')}" fill="none" stroke="#00ff88" stroke-width="2.5" stroke-linecap="round"/>
    ${highs.map(p=>`<circle cx="${toX(p.i)}" cy="${toY(p.v)}" r="6" fill="none" stroke="#ffd700" stroke-width="1.5"/><text x="${toX(p.i)}" y="${toY(p.v)-10}" fill="#ffd700" font-size="8" text-anchor="middle">${p.lbl}</text>`).join('')}
    ${lows.map(p=>`<circle cx="${toX(p.i)}" cy="${toY(p.v)}" r="6" fill="none" stroke="#a78bfa" stroke-width="1.5"/><text x="${toX(p.i)}" y="${toY(p.v)+16}" fill="#a78bfa" font-size="8" text-anchor="middle">${p.lbl}</text>`).join('')}
    <line x1="${toX(10)}" y1="30" x2="${toX(10)}" y2="215" stroke="rgba(255,215,0,0.4)" stroke-width="1" stroke-dasharray="4,3"/>
    <text x="${toX(10)}" y="225" fill="#ffd700" font-size="8" text-anchor="middle">STRUCTURE BREAK → TREND REVERSAL</text>
    <text x="680" y="200" fill="#55557a" font-size="8">Pin Bar = long wick,</text>
    <text x="680" y="211" fill="#55557a" font-size="8">small body at S/R</text>
  `, 235);
}

function indicatorsChart() {
  return svgWrap(`
    <rect width="760" height="245" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">RSI DIVERGENCE — THE MOST POWERFUL INDICATOR SIGNAL</text>
    <text x="80" y="38" fill="#55557a" font-size="8">PRICE</text>
    <polyline points="70,110 120,100 180,88 240,78 300,82 360,76 420,80 480,90 540,95 600,88 660,95" fill="none" stroke="#00ffcc" stroke-width="2"/>
    <line x1="70" y1="148" x2="690" y2="148" stroke="rgba(255,255,255,0.05)"/>
    <text x="80" y="162" fill="#55557a" font-size="8">RSI(14)</text>
    <line x1="70" y1="168" x2="690" y2="168" stroke="rgba(255,100,100,0.15)" stroke-dasharray="4,3"/>
    <text x="695" y="172" fill="#ff3c6e" font-size="7">70</text>
    <line x1="70" y1="205" x2="690" y2="205" stroke="rgba(100,255,100,0.15)" stroke-dasharray="4,3"/>
    <text x="695" y="209" fill="#00ff88" font-size="7">30</text>
    <polyline points="70,185 120,178 180,170 240,163 300,167 360,170 420,174 480,180 540,184 600,188 660,192" fill="none" stroke="#ffd700" stroke-width="2"/>
    <line x1="420" y1="80" x2="660" y2="95" stroke="#ff3c6e" stroke-width="1.5" stroke-dasharray="5,3"/>
    <text x="530" y="72" fill="#ff3c6e" font-size="8" text-anchor="middle">Price: Higher High</text>
    <line x1="420" y1="174" x2="660" y2="192" stroke="#ff3c6e" stroke-width="1.5" stroke-dasharray="5,3"/>
    <text x="530" y="228" fill="#ff3c6e" font-size="8" text-anchor="middle">RSI: Lower High = ⚠️ BEARISH DIVERGENCE</text>
    <text x="380" y="243" fill="#55557a" font-size="8" text-anchor="middle">Divergence = momentum weakening BEFORE price reverses. Much more powerful than overbought/oversold alone.</text>
  `, 250);
}

function positionSizingChart() {
  return svgWrap(`
    <rect width="760" height="245" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">THE 2% RULE — SURVIVAL MATHEMATICS</text>
    <rect x="50" y="35" width="200" height="95" fill="rgba(0,255,204,0.06)" rx="4" stroke="rgba(0,255,204,0.2)"/>
    <text x="150" y="56" fill="#00ffcc" font-size="10" text-anchor="middle">ACCOUNT: ₹1,00,000</text>
    <text x="150" y="74" fill="#55557a" font-size="9" text-anchor="middle">2% Rule = ₹2,000 max risk</text>
    <line x1="50" y1="85" x2="250" y2="85" stroke="rgba(255,255,255,0.08)"/>
    <text x="150" y="103" fill="#ffd700" font-size="9" text-anchor="middle">Entry: ₹500 | Stop: ₹480</text>
    <text x="150" y="120" fill="#ff3c6e" font-size="9" text-anchor="middle">Risk/share = ₹20</text>
    <line x1="255" y1="82" x2="285" y2="82" stroke="#00ffcc" stroke-width="1.5" marker-end="url(#arr)"/>
    <rect x="290" y="35" width="190" height="95" fill="rgba(123,47,255,0.06)" rx="4" stroke="rgba(123,47,255,0.2)"/>
    <text x="385" y="56" fill="#a78bfa" font-size="10" text-anchor="middle">CALCULATION</text>
    <text x="385" y="80" fill="white" font-size="13" text-anchor="middle">₹2,000 ÷ ₹20</text>
    <line x1="340" y1="87" x2="430" y2="87" stroke="rgba(255,255,255,0.2)"/>
    <text x="385" y="106" fill="#00ff88" font-size="16" text-anchor="middle">100 SHARES ✓</text>
    <text x="385" y="123" fill="#55557a" font-size="8" text-anchor="middle">Position Size</text>
    <line x1="485" y1="82" x2="515" y2="82" stroke="#00ffcc" stroke-width="1.5"/>
    <rect x="520" y="35" width="185" height="95" fill="rgba(255,215,0,0.05)" rx="4" stroke="rgba(255,215,0,0.2)"/>
    <text x="612" y="56" fill="#ffd700" font-size="10" text-anchor="middle">RISK:REWARD</text>
    <text x="612" y="78" fill="#00ff88" font-size="11" text-anchor="middle">Target: ₹560 (+₹60)</text>
    <text x="612" y="98" fill="#ff3c6e" font-size="10" text-anchor="middle">Stop: ₹480 (-₹20)</text>
    <text x="612" y="120" fill="#ffd700" font-size="11" text-anchor="middle">= 3:1 R:R 🏆</text>
    <text x="380" y="155" fill="#8888aa" font-size="9" text-anchor="middle">With 2% rule: 50 consecutive losses still leaves you 36% of capital. Without it: 5 bad trades = broke.</text>
    ${[0,1,2,3,4,5,6,7,8,9].map(i => {
      const h = Math.pow(0.98, i*5) * 120;
      const col = h > 80 ? '#00ff88' : h > 50 ? '#ffd700' : '#ff3c6e';
      return `<rect x="${55+i*65}" y="${195-h}" width="52" height="${h}" fill="${col}22" rx="2" stroke="${col}44"/>
      <text x="${81+i*65}" y="205" fill="#55557a" font-size="7" text-anchor="middle">${i*5}L</text>
      <text x="${81+i*65}" y="${190-h}" fill="${col}" font-size="7" text-anchor="middle">${(Math.pow(0.98,i*5)*100).toFixed(0)}%</text>`;
    }).join('')}
    <text x="380" y="238" fill="#55557a" font-size="8" text-anchor="middle">Capital remaining after N consecutive losses (each risking 2%). You survive to fight another day.</text>
  `, 248);
}

function psychologyChart() {
  const pts = [
    [60,160,'START','#55557a'],[120,130,'HOPE','#00ff88'],[190,100,'OPTIMISM','#00ff88'],
    [255,70,'THRILL','#ffd700'],[310,55,'EUPHORIA','#ffd700'],[370,80,'ANXIETY','#ff9900'],
    [415,125,'DENIAL','#ff6600'],[455,165,'PANIC','#ff3c6e'],[490,185,'CAPITULATE','#ff3c6e'],
    [530,175,'DESPAIR','#ff3c6e'],[575,155,'HOPE','#ffd700'],[635,120,'RELIEF','#00ff88'],
    [690,85,'OPTIMISM','#00ff88'],[735,60,'CONFIDENCE','#00ffcc']
  ];
  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">THE EMOTIONAL CYCLE OF A TYPICAL TRADER</text>
    <polyline points="${pts.map(p=>`${p[0]},${p[1]}`).join(' ')}" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    ${pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${p[3]}"/>
    <text x="${p[0]}" y="${p[1]-9}" fill="${p[3]}" font-size="7" text-anchor="middle">${p[2]}</text>`).join('')}
    <rect x="280" y="48" width="95" height="20" fill="rgba(255,215,0,0.1)" rx="2" stroke="rgba(255,215,0,0.3)"/>
    <text x="327" y="62" fill="#ffd700" font-size="8" text-anchor="middle">RETAIL BUYS ↑</text>
    <rect x="430" y="158" width="90" height="20" fill="rgba(255,60,110,0.1)" rx="2" stroke="rgba(255,60,110,0.3)"/>
    <text x="475" y="172" fill="#ff3c6e" font-size="8" text-anchor="middle">RETAIL SELLS ↓</text>
    <text x="310" y="210" fill="#00ff88" font-size="8" text-anchor="middle">← Smart money SELLS into FOMO</text>
    <text x="550" y="210" fill="#00ff88" font-size="8" text-anchor="middle">Smart money BUYS at despair →</text>
    <text x="380" y="228" fill="#55557a" font-size="8" text-anchor="middle">Most retail traders buy at EUPHORIA and sell at PANIC. Professionals do the exact opposite.</text>
  `);
}

function orderBookChart() {
  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">THE ORDER BOOK — HOW PRICE IS ACTUALLY MADE</text>
    <text x="185" y="38" fill="#00ff88" font-size="9" text-anchor="middle">BID (BUYERS)</text>
    <text x="575" y="38" fill="#ff3c6e" font-size="9" text-anchor="middle">ASK (SELLERS)</text>
    ${[0,1,2,3,4].map(i=>`
      <rect x="${55+i*5}" y="${48+i*30}" width="${140-i*22}" height="24" fill="rgba(0,255,136,0.1)" rx="2" stroke="rgba(0,255,136,0.2)"/>
      <rect x="${55+i*5}" y="${48+i*30}" width="8" height="24" fill="#00ff88" rx="1"/>
      <text x="80" y="${64+i*30}" fill="#00ff88" font-size="9">₹${(500-i*2).toFixed(0)}</text>
      <text x="175" y="${64+i*30}" fill="#55557a" font-size="8">${120-i*18} qty</text>
    `).join('')}
    <rect x="315" y="103" width="130" height="32" fill="rgba(255,215,0,0.12)" rx="4" stroke="rgba(255,215,0,0.4)"/>
    <text x="380" y="122" fill="#ffd700" font-size="12" text-anchor="middle" font-weight="bold">₹500.00</text>
    <text x="380" y="148" fill="#55557a" font-size="8" text-anchor="middle">LAST TRADE PRICE</text>
    ${[0,1,2,3,4].map(i=>`
      <rect x="${475}" y="${48+i*30}" width="${140-i*22}" height="24" fill="rgba(255,60,110,0.1)" rx="2" stroke="rgba(255,60,110,0.2)"/>
      <rect x="${475+132-i*22}" y="${48+i*30}" width="8" height="24" fill="#ff3c6e" rx="1"/>
      <text x="498" y="${64+i*30}" fill="#ff3c6e" font-size="9">₹${(502+i*2).toFixed(0)}</text>
      <text x="593" y="${64+i*30}" fill="#55557a" font-size="8">${100-i*14} qty</text>
    `).join('')}
    <text x="380" y="218" fill="#55557a" font-size="8" text-anchor="middle">Buyer hits ask → price rises | Seller hits bid → price falls | AGGRESSIVE side controls direction</text>
    <text x="380" y="232" fill="#55557a" font-size="8" text-anchor="middle">Spread = Ask − Bid = your transaction cost. Wide spreads = avoid trading that instrument.</text>
  `);
}

function orderFlowChart() {
  const steps = ['You Click BUY','Your Broker','NSE/BSE Exchange','Order Matched','Settlement T+1'];
  return svgWrap(`
    <rect width="760" height="220" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">ORDER FLOW — HOW YOUR TRADE REACHES THE MARKET</text>
    ${steps.map((s,i)=>`
      <rect x="${45+i*140}" y="55" width="120" height="60" fill="rgba(0,255,204,0.05)" rx="6" stroke="rgba(0,255,204,0.2)"/>
      <text x="${105+i*140}" y="80" fill="#00ffcc" font-size="9" text-anchor="middle">${s.split(' ')[0]}</text>
      <text x="${105+i*140}" y="95" fill="#55557a" font-size="8" text-anchor="middle">${s.split(' ').slice(1).join(' ')}</text>
      <text x="${105+i*140}" y="108" fill="#55557a" font-size="7" text-anchor="middle">Step ${i+1}</text>
      ${i<4?`<line x1="${165+i*140}" y1="85" x2="${185+i*140}" y2="85" stroke="#ffd700" stroke-width="2"/><polygon points="${185+i*140},81 ${193+i*140},85 ${185+i*140},89" fill="#ffd700"/>`:''}
    `).join('')}
    <text x="380" y="140" fill="#ffd700" font-size="9" text-anchor="middle">⚡ HFT algorithms see your order in MICROSECONDS. Use limit orders to avoid being front-run.</text>
    <text x="380" y="160" fill="#55557a" font-size="8" text-anchor="middle">Market order → fills at any price (BAD). Limit order → fills only at your price or better (GOOD).</text>
    <rect x="50" y="175" width="660" height="30" fill="rgba(255,60,110,0.05)" rx="4" stroke="rgba(255,60,110,0.2)"/>
    <text x="380" y="195" fill="#ff3c6e" font-size="9" text-anchor="middle">FIIs buy: ₹500 crore+ moves Nifty significantly. Your ₹50,000 moves it 0.000001%. Size is EVERYTHING.</text>
  `, 220);
}

function financialChart() {
  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">THREE FINANCIAL STATEMENTS — THE COMPLETE PICTURE</text>
    <rect x="40" y="32" width="210" height="150" fill="rgba(0,255,204,0.04)" rx="4" stroke="rgba(0,255,204,0.2)"/>
    <text x="145" y="52" fill="#00ffcc" font-size="10" text-anchor="middle">BALANCE SHEET</text>
    <text x="145" y="67" fill="#55557a" font-size="8" text-anchor="middle">(Snapshot in time)</text>
    ${['Total Assets: ₹500Cr','Total Liabilities: ₹200Cr','Shareholders Equity: ₹300Cr','Current Ratio: 1.8 ✓','D/E Ratio: 0.67 ✓'].map((t,i)=>`<text x="60" y="${88+i*18}" fill="#e8e8f0" font-size="8">${t}</text>`).join('')}
    <rect x="270" y="32" width="210" height="150" fill="rgba(123,47,255,0.04)" rx="4" stroke="rgba(123,47,255,0.2)"/>
    <text x="375" y="52" fill="#a78bfa" font-size="10" text-anchor="middle">INCOME STATEMENT</text>
    <text x="375" y="67" fill="#55557a" font-size="8" text-anchor="middle">(Performance over period)</text>
    ${['Revenue: ₹1,200Cr','Gross Profit: ₹480Cr (40%)','Operating Profit: ₹240Cr','Net Profit: ₹160Cr (13%)','EPS Growth YoY: +18% ✓'].map((t,i)=>`<text x="288" y="${88+i*18}" fill="#e8e8f0" font-size="8">${t}</text>`).join('')}
    <rect x="500" y="32" width="210" height="150" fill="rgba(255,215,0,0.04)" rx="4" stroke="rgba(255,215,0,0.2)"/>
    <text x="605" y="52" fill="#ffd700" font-size="10" text-anchor="middle">CASH FLOW ⭐</text>
    <text x="605" y="67" fill="#55557a" font-size="8" text-anchor="middle">(Reality check — hardest to fake)</text>
    ${['Operating CF: ₹185Cr','CapEx: ₹45Cr','Free Cash Flow: ₹140Cr','FCF Yield: 8.7% ✓','FCF Growth 3yr: +22% 🏆'].map((t,i)=>`<text x="518" y="${88+i*18}" fill="#e8e8f0" font-size="8">${t}</text>`).join('')}
    <text x="380" y="205" fill="#ffd700" font-size="9" text-anchor="middle">⭐ Cash Flow is hardest to manipulate — always trust it over reported profit.</text>
    <text x="380" y="222" fill="#55557a" font-size="8" text-anchor="middle">Profits can be "engineered" through accounting. Cash in the bank cannot. Buffett lives by FCF.</text>
  `);
}

function moatChart() {
  const moats = [
    {name:'Network Effects',pct:95,ex:'WhatsApp, Visa',col:'#00ff88'},
    {name:'Switching Costs',pct:85,ex:'SAP, Microsoft',col:'#00ffcc'},
    {name:'Intangible Assets',pct:80,ex:'Coca-Cola, Asian Paints',col:'#a78bfa'},
    {name:'Cost Advantage',pct:75,ex:'Amazon, Walmart',col:'#ffd700'},
    {name:'Efficient Scale',pct:65,ex:'Utilities, Airports',col:'#ff9900'},
  ];
  return svgWrap(`
    <rect width="760" height="235" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">ECONOMIC MOATS — STRENGTH OF COMPETITIVE ADVANTAGE</text>
    ${moats.map((m,i) => `
      <text x="220" y="${52+i*35}" fill="#e8e8f0" font-size="9" text-anchor="end">${m.name}</text>
      <rect x="230" y="${40+i*35}" width="${m.pct*4.2}" height="20" fill="${m.col}22" rx="3" stroke="${m.col}44"/>
      <rect x="230" y="${40+i*35}" width="${m.pct*4.2}" height="20" fill="${m.col}33" rx="3"/>
      <text x="${235+m.pct*4.2}" y="${54+i*35}" fill="${m.col}" font-size="8">${m.pct}% durability</text>
      <text x="${235+m.pct*4.2+80}" y="${54+i*35}" fill="#55557a" font-size="8">(${m.ex})</text>
    `).join('')}
    <rect x="50" y="200" width="660" height="22" fill="rgba(255,215,0,0.05)" rx="3" stroke="rgba(255,215,0,0.2)"/>
    <text x="380" y="215" fill="#ffd700" font-size="8" text-anchor="middle">Moat signal: ROE > 15% consistently for 10+ years across market cycles. No moat = competition erodes profits.</text>
  `, 235);
}

function macroChart() {
  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">MACRO RELATIONSHIPS — HOW IT ALL CONNECTS</text>
    <circle cx="380" cy="120" r="35" fill="rgba(255,215,0,0.1)" stroke="#ffd700" stroke-width="2"/>
    <text x="380" y="115" fill="#ffd700" font-size="10" text-anchor="middle">INTEREST</text>
    <text x="380" y="130" fill="#ffd700" font-size="10" text-anchor="middle">RATES</text>
    ${[
      {x:140,y:80,label:'STOCKS',detail:'Rates ↑ → Stocks ↓',col:'#00ffcc',rel:'inverse'},
      {x:620,y:80,label:'BONDS',detail:'Rates ↑ → Bonds ↓',col:'#a78bfa',rel:'inverse'},
      {x:140,y:165,label:'GOLD',detail:'Rates ↑ → Gold ↓',col:'#ffd700',rel:'inverse'},
      {x:620,y:165,label:'FOREX (USD)',detail:'Rates ↑ → USD ↑',col:'#00ff88',rel:'direct'},
      {x:380,y:215,label:'INFLATION',detail:'Rates ↑ → CPI ↓',col:'#ff3c6e',rel:'inverse'},
    ].map(n=>`
      <rect x="${n.x-55}" y="${n.y-20}" width="110" height="40" fill="rgba(255,255,255,0.04)" rx="4" stroke="rgba(255,255,255,0.15)"/>
      <text x="${n.x}" y="${n.y-3}" fill="${n.col}" font-size="9" text-anchor="middle">${n.label}</text>
      <text x="${n.x}" y="${n.y+12}" fill="#55557a" font-size="7" text-anchor="middle">${n.detail}</text>
    `).join('')}
    <line x1="345" y1="100" x2="195" y2="80" stroke="rgba(255,255,255,0.2)" stroke-dasharray="4,3"/>
    <line x1="415" y1="100" x2="565" y2="80" stroke="rgba(255,255,255,0.2)" stroke-dasharray="4,3"/>
    <line x1="345" y1="138" x2="195" y2="155" stroke="rgba(255,255,255,0.2)" stroke-dasharray="4,3"/>
    <line x1="415" y1="138" x2="565" y2="155" stroke="rgba(255,255,255,0.2)" stroke-dasharray="4,3"/>
    <line x1="380" y1="155" x2="380" y2="195" stroke="rgba(255,255,255,0.2)" stroke-dasharray="4,3"/>
  `);
}

function optionsChart() {
  const x = Array.from({length:20},(_,i) => i*10+400);
  const toX = v => 50 + ((v-390)/(600-390))*660;
  const toY_call = v => v > 500 ? 200 - (v-500)*0.8 : 200;
  const toY_put = v => v < 500 ? 200 - (500-v)*0.8 : 200;
  const strike = 500;

  return svgWrap(`
    <rect width="760" height="245" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">OPTIONS PAYOFF AT EXPIRY — BUYER'S VIEW</text>
    <line x1="50" y1="200" x2="710" y2="200" stroke="rgba(255,255,255,0.15)"/>
    <line x1="${toX(strike)}" y1="30" x2="${toX(strike)}" y2="215" stroke="rgba(255,215,0,0.4)" stroke-dasharray="5,3"/>
    <text x="${toX(strike)}" y="225" fill="#ffd700" font-size="8" text-anchor="middle">STRIKE ₹${strike}</text>
    <polyline points="${x.map(v=>`${toX(v)},${toY_call(v)}`).join(' ')}" fill="none" stroke="#00ff88" stroke-width="2.5"/>
    <text x="680" y="${toY_call(600)-8}" fill="#00ff88" font-size="9">CALL OPTION</text>
    <text x="680" y="${toY_call(600)+4}" fill="#55557a" font-size="7">(Right to BUY)</text>
    <polyline points="${x.map(v=>`${toX(v)},${toY_put(v)}`).join(' ')}" fill="none" stroke="#ff3c6e" stroke-width="2.5"/>
    <text x="80" y="${toY_put(410)-8}" fill="#ff3c6e" font-size="9">PUT OPTION</text>
    <text x="80" y="${toY_put(410)+4}" fill="#55557a" font-size="7">(Right to SELL)</text>
    <line x1="50" y1="192" x2="710" y2="192" stroke="rgba(255,60,110,0.3)" stroke-dasharray="3,3"/>
    <text x="55" y="188" fill="#ff3c6e" font-size="7">Premium paid (your max loss)</text>
    <rect x="50" y="30" width="660" height="8" fill="rgba(255,60,110,0.1)"/>
    <text x="380" y="50" fill="#ff3c6e" font-size="7" text-anchor="middle">LOSS ZONE (theta decaying your premium every day!)</text>
    <text x="380" y="232" fill="#55557a" font-size="8" text-anchor="middle">Theta eats your premium every day. Sellers collect theta. Buyers fight theta. In India: weekly expiry = theta KILLS you Tue-Thu.</text>
  `, 248);
}

function smcChart() {
  return svgWrap(`
    <rect width="760" height="245" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">SMC — ORDER BLOCK + LIQUIDITY SWEEP IN ACTION</text>
    <polyline points="50,185 110,175 160,162 200,168 235,185 260,200 275,212 285,205 310,165 360,140 410,120 460,125 500,140 535,152 560,158" fill="none" stroke="#00ffcc" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="198" y="158" width="75" height="45" fill="rgba(0,255,204,0.08)" rx="2" stroke="#00ffcc" stroke-width="1.2" stroke-dasharray="4,2"/>
    <text x="235" y="152" fill="#00ffcc" font-size="8" text-anchor="middle">ORDER BLOCK</text>
    <text x="235" y="210" fill="#55557a" font-size="7" text-anchor="middle">Last bearish candle before pump</text>
    <line x1="260" y1="200" x2="460" y2="200" stroke="#ff3c6e" stroke-width="1.2" stroke-dasharray="4,3"/>
    <text x="360" y="214" fill="#ff3c6e" font-size="7" text-anchor="middle">STOP HUNT ZONE (retail stops cluster here)</text>
    <line x1="275" y1="205" x2="275" y2="218" stroke="#ff3c6e" stroke-width="2"/>
    <polygon points="275,222 271,212 279,212" fill="#ff3c6e"/>
    <text x="275" y="235" fill="#ff3c6e" font-size="7" text-anchor="middle">SWEEP → fills institutional orders</text>
    <rect x="395" y="110" width="165" height="50" fill="rgba(255,60,110,0.06)" rx="2" stroke="rgba(255,60,110,0.25)"/>
    <text x="477" y="130" fill="#ff3c6e" font-size="8" text-anchor="middle">PREMIUM ZONE</text>
    <text x="477" y="146" fill="#55557a" font-size="7" text-anchor="middle">(above 50% → sell bias)</text>
    <rect x="395" y="165" width="165" height="50" fill="rgba(0,255,136,0.06)" rx="2" stroke="rgba(0,255,136,0.25)"/>
    <text x="477" y="185" fill="#00ff88" font-size="8" text-anchor="middle">DISCOUNT ZONE</text>
    <text x="477" y="201" fill="#55557a" font-size="7" text-anchor="middle">(below 50% → buy bias)</text>
    <line x1="392" y1="161" x2="392" y2="163" stroke="rgba(255,215,0,0.5)" stroke-width="1"/>
    <line x1="390" y1="162" x2="560" y2="162" stroke="rgba(255,215,0,0.4)" stroke-dasharray="3,3"/>
    <text x="565" y="165" fill="#ffd700" font-size="7">50% EQ</text>
  `, 248);
}

function algoChart() {
  return svgWrap(`
    <rect width="760" height="240" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">ALGORITHMIC TRADING — HOW MACHINES SEE MARKETS</text>
    ${['Data Feed','Signal Gen','Risk Check','Order Router','Exchange'].map((s,i)=>`
      <rect x="${50+i*135}" y="45" width="115" height="55" fill="rgba(0,255,204,0.05)" rx="4" stroke="rgba(0,255,204,0.15)"/>
      <text x="${107+i*135}" y="68" fill="#00ffcc" font-size="9" text-anchor="middle">${s}</text>
      <text x="${107+i*135}" y="84" fill="#55557a" font-size="7" text-anchor="middle">${['Raw OHLCV','If/Then Rules','Size & Risk','Smart Split','Fill & Settle'][i]}</text>
      ${i<4?`<line x1="${165+i*135}" y1="72" x2="${185+i*135}" y2="72" stroke="#ffd700" stroke-width="1.5"/><polygon points="${185+i*135},68 ${192+i*135},72 ${185+i*135},76" fill="#ffd700"/>`:''}
    `).join('')}
    <text x="380" y="125" fill="#ffd700" font-size="8" text-anchor="middle">⚡ HFT executes this entire chain in under 1 MILLISECOND. Human reaction time: ~200ms.</text>
    <polyline points="50,195 120,185 190,178 250,172 310,168 370,165 430,162 490,163 550,158 610,155 670,160 720,152" fill="none" stroke="#a78bfa" stroke-width="2"/>
    <text x="380" y="145" fill="#55557a" font-size="8" text-anchor="middle">Backtested equity curve of a systematic trend-following strategy (Sharpe Ratio > 2.0)</text>
    <polyline points="50,200 120,203 190,198 250,205 310,202 370,200 430,207 490,203 550,208 610,200 670,205 720,200" fill="none" stroke="#ff3c6e" stroke-width="1.5" stroke-dasharray="4,3"/>
    <text x="60" y="220" fill="#a78bfa" font-size="8">Algo strategy</text>
    <text x="190" y="220" fill="#ff3c6e" font-size="8">Benchmark (buy & hold)</text>
    <text x="380" y="234" fill="#55557a" font-size="8" text-anchor="middle">Backtesting: test rules on historical data. Beware overfitting — if it wins 95% in backtest, something is wrong.</text>
  `);
}

function moneySupplyChart() {
  const years = [2000,2005,2010,2015,2020,2024];
  const m2 = [4800,6200,8600,12100,19200,21000];
  const gold = [280,520,1220,1060,1900,2680];
  const maxM2 = 22000, maxGold = 3000;
  const toX = y => 60 + ((y-2000)/(2024-2000))*640;
  const toY_m2 = v => 200 - (v/maxM2)*170;
  const toY_gold = v => 200 - (v/maxGold)*170;
  return svgWrap(`
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">MONEY PRINTING vs GOLD PRICE — WHY HARD ASSETS MATTER</text>
    <line x1="60" y1="30" x2="60" y2="205" stroke="rgba(255,255,255,0.1)"/>
    <line x1="60" y1="205" x2="700" y2="205" stroke="rgba(255,255,255,0.1)"/>
    ${years.map(y=>`<text x="${toX(y)}" y="220" fill="#55557a" font-size="8" text-anchor="middle">${y}</text>`).join('')}
    <polyline points="${years.map((y,i)=>`${toX(y)},${toY_m2(m2[i])}`).join(' ')}" fill="none" stroke="#a78bfa" stroke-width="2.5" stroke-linecap="round"/>
    <polyline points="${years.map((y,i)=>`${toX(y)},${toY_gold(gold[i])}`).join(' ')}" fill="none" stroke="#ffd700" stroke-width="2.5" stroke-linecap="round"/>
    <text x="680" y="${toY_m2(21000)-6}" fill="#a78bfa" font-size="8">US M2</text>
    <text x="680" y="${toY_gold(2680)-6}" fill="#ffd700" font-size="8">Gold</text>
    <text x="380" y="238" fill="#55557a" font-size="8" text-anchor="middle">As money supply expands, hard assets (gold, stocks, real estate) appreciate — protecting purchasing power.</text>
  `);
}

function stockPriceChart() {
  const quarters = ['Q1','Q2','Q3','Q4','Q5','Q6','Q7','Q8'];
  const eps = [10,12,11,14,16,15,18,20];
  const price = [145,170,160,200,230,215,260,295];
  const toX = i => 80 + i*80;
  const toY_eps = v => 195 - (v/22)*140;
  const toY_price = v => 195 - (v/320)*140;
  return svgWrap(`
    <text x="380" y="18" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">PRICE FOLLOWS EARNINGS — LONG TERM RELATIONSHIP</text>
    <line x1="70" y1="55" x2="70" y2="200" stroke="rgba(255,255,255,0.08)"/>
    <line x1="70" y1="200" x2="700" y2="200" stroke="rgba(255,255,255,0.08)"/>
    ${quarters.map((q,i)=>`<text x="${toX(i)}" y="215" fill="#55557a" font-size="8" text-anchor="middle">${q}</text>`).join('')}
    <polyline points="${eps.map((v,i)=>`${toX(i)},${toY_eps(v)}`).join(' ')}" fill="none" stroke="#00ff88" stroke-width="2.5" stroke-linecap="round"/>
    <polyline points="${price.map((v,i)=>`${toX(i)},${toY_price(v)}`).join(' ')}" fill="none" stroke="#00ffcc" stroke-width="2.5" stroke-linecap="round"/>
    ${eps.map((v,i)=>`<circle cx="${toX(i)}" cy="${toY_eps(v)}" r="4" fill="#00ff88"/>`).join('')}
    ${price.map((v,i)=>`<circle cx="${toX(i)}" cy="${toY_price(v)}" r="4" fill="#00ffcc"/>`).join('')}
    <rect x="80" y="225" width="12" height="2" fill="#00ff88"/>
    <text x="96" y="230" fill="#00ff88" font-size="8">EPS (earnings per share)</text>
    <rect x="280" y="225" width="12" height="2" fill="#00ffcc"/>
    <text x="296" y="230" fill="#00ffcc" font-size="8">Stock Price</text>
    <text x="380" y="243" fill="#55557a" font-size="8" text-anchor="middle">Short-term: prices follow emotions. Long-term: prices ALWAYS converge to earnings. This is why fundamentals matter.</text>
  `, 250);
}

function genericChart(chapter) {
  const title = chapter?.title || 'CHAPTER OVERVIEW';
  const concepts = ['Entry Rules','Risk Mgmt','Market Context','Exit Rules','Psychology','Journal'];
  return svgWrap(`
    <rect width="760" height="200" fill="rgba(0,0,0,0.25)" rx="4"/>
    <text x="380" y="22" fill="#00ffcc" font-size="11" text-anchor="middle" letter-spacing="2">${title.toUpperCase()} — CONCEPT FRAMEWORK</text>
    ${concepts.map((c,i) => {
      const x = 100 + (i%3)*195;
      const y = i < 3 ? 70 : 135;
      const col = ['#00ffcc','#ffd700','#a78bfa','#00ff88','#ff9900','#ff3c6e'][i];
      return `
        <rect x="${x-65}" y="${y-22}" width="130" height="44" fill="${col}11" rx="4" stroke="${col}33"/>
        <text x="${x}" y="${y}" fill="${col}" font-size="10" text-anchor="middle">${c}</text>
        <text x="${x}" y="${y+14}" fill="#55557a" font-size="7" text-anchor="middle">Click to learn</text>
      `;
    }).join('')}
    <text x="380" y="188" fill="#55557a" font-size="8" text-anchor="middle">Every element of professional trading is interconnected. Master each component systematically.</text>
  `, 200);
}

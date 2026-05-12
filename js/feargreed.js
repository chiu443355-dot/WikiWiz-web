// WikiWiz — FEARGREED.JS

let fgValue = 50;
let fgTrend = 0;

const FG_ZONES = {
  extreme_fear: { label:'EXTREME FEAR', color:'#ff2020', min:0, max:25 },
  fear: { label:'FEAR', color:'#ff6b00', min:25, max:45 },
  neutral: { label:'NEUTRAL', color:'#ffd700', min:45, max:55 },
  greed: { label:'GREED', color:'#7fff00', min:55, max:75 },
  extreme_greed: { label:'EXTREME GREED', color:'#00ff88', min:75, max:100 }
};

const FG_CONTEXT = {
  extreme_fear: 'Markets in extreme fear. Panic-selling of quality assets. Historically, extreme fear creates the best buying opportunities — Buffett gets greedy when others are fearful. Every major market bottom in history was surrounded by extreme fear.',
  fear: 'Fear dominates. Institutions are cautious, retail is nervous. Above-average opportunity for patient investors who've done their homework. Prices are likely below fair value.',
  neutral: 'Balanced market. Neither panic-selling nor euphoric buying. The most rational state — fair value is most accurately reflected here. Plan your next move.',
  greed: 'Greed is driving markets. Retail participation is increasing, media coverage is positive. Tighten stops, reduce leverage. Smart money is quietly distributing into this buying.',
  extreme_greed: 'EXTREME GREED — Euphoria. Everyone is a genius. When your neighbour gives you stock tips, it\'s time to be careful. Institutions are distributing to retail FOMO buyers. The higher the greed, the harder the eventual fall.'
};

function getFgZone(value) {
  for (const [key, zone] of Object.entries(FG_ZONES)) {
    if (value >= zone.min && value <= zone.max) return { key, ...zone };
  }
  return { key: 'neutral', ...FG_ZONES.neutral };
}

function updateFearGreedUI(value) {
  fgValue = Math.max(1, Math.min(99, value));
  const zone = getFgZone(fgValue);

  // Score display
  const scoreEl = document.getElementById('fgScoreNum');
  const labelEl = document.getElementById('fgScoreLbl');
  const timeEl = document.getElementById('fgScoreTime');
  const ctxEl = document.getElementById('fgContextText');

  if (scoreEl) { scoreEl.textContent = Math.round(fgValue); scoreEl.style.color = zone.color; }
  if (labelEl) { labelEl.textContent = zone.label; labelEl.style.color = zone.color; }
  if (timeEl) timeEl.textContent = `Updated ${new Date().toLocaleTimeString('en-IN')} IST`;
  if (ctxEl) ctxEl.textContent = FG_CONTEXT[zone.key];

  // Draw gauge SVG
  drawFGGauge(fgValue, zone.color);
  // Update indicators
  updateFGIndicators(fgValue);
}

function drawFGGauge(value, color) {
  const svg = document.getElementById('fgGaugeSVG');
  if (!svg) return;

  const cx = 150, cy = 140, r = 110;
  const startAngle = Math.PI; // 180 deg (left)
  const endAngle = 0;        // 0 deg (right)
  const angle = startAngle + (value / 100) * Math.PI;

  // Arc path helper
  function arcPath(cx, cy, r, start, end, color, width, id) {
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const large = (end - start) > Math.PI ? 1 : 0;
    return `<path d="M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" id="${id}"/>`;
  }

  // Gradient track (background)
  const trackPath = arcPath(cx, cy, r, Math.PI, 0, 'rgba(255,255,255,0.06)', 22, 'fg-track');

  // Coloured segments
  const segments = [
    { color: '#ff2020', from: 0, to: 25 },
    { color: '#ff6b00', from: 25, to: 45 },
    { color: '#ffd700', from: 45, to: 55 },
    { color: '#7fff00', from: 55, to: 75 },
    { color: '#00ff88', from: 75, to: 100 }
  ];

  const segPaths = segments.map(seg => {
    const a1 = Math.PI + (seg.from / 100) * Math.PI;
    const a2 = Math.PI + (seg.to / 100) * Math.PI;
    return arcPath(cx, cy, r, a1, a2, seg.color + '55', 22, `seg-${seg.from}`);
  }).join('');

  // Active value arc
  const activePath = arcPath(cx, cy, r, Math.PI, Math.PI + (value / 100) * Math.PI, color, 22, 'fg-active');

  // Needle
  const nx = cx + 85 * Math.cos(angle);
  const ny = cy + 85 * Math.sin(angle);
  const needle = `
    <line x1="${cx}" y1="${cy}" x2="${nx.toFixed(1)}" y2="${ny.toFixed(1)}" stroke="white" stroke-width="3" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="8" fill="white"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#06060f"/>
  `;

  // Zone labels
  const labels = `
    <text x="30" y="155" fill="#ff2020" font-size="9" font-family="Space Mono,monospace">EXTREME</text>
    <text x="30" y="167" fill="#ff2020" font-size="9" font-family="Space Mono,monospace">FEAR</text>
    <text x="245" y="155" fill="#00ff88" font-size="9" font-family="Space Mono,monospace" text-anchor="end">EXTREME</text>
    <text x="245" y="167" fill="#00ff88" font-size="9" font-family="Space Mono,monospace" text-anchor="end">GREED</text>
    <text x="${cx}" y="58" fill="#ffd700" font-size="8" font-family="Space Mono,monospace" text-anchor="middle">NEUTRAL</text>
  `;

  // Glow filter
  const defs = `<defs>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>`;

  svg.innerHTML = defs + trackPath + segPaths + activePath + `<g filter="url(#glow)">${needle}</g>` + labels;
}

function updateFGIndicators(fgValue) {
  const indicators = [
    { id: 'ind1', val: Math.max(5, Math.min(95, fgValue + (Math.random()-0.5)*18)) },
    { id: 'ind2', val: Math.max(5, Math.min(95, fgValue + (Math.random()-0.5)*22)) },
    { id: 'ind3', val: Math.max(5, Math.min(95, 100 - fgValue + (Math.random()-0.5)*14)) },
    { id: 'ind4', val: Math.max(5, Math.min(95, fgValue + (Math.random()-0.5)*18)) },
    { id: 'ind5', val: Math.max(5, Math.min(95, 100 - fgValue + (Math.random()-0.5)*16)) },
  ];

  indicators.forEach(ind => {
    const fill = document.getElementById(`${ind.id}-fill`);
    const val = document.getElementById(`${ind.id}-val`);
    if (!fill || !val) return;
    const zone = getFgZone(ind.val);
    fill.style.width = ind.val.toFixed(0) + '%';
    fill.style.background = `linear-gradient(90deg, ${zone.color}88, ${zone.color})`;
    val.textContent = Math.round(ind.val);
    val.style.color = zone.color;
  });
}

function triggerFGRefresh() {
  // Slightly adjust F&G when switching charts for live feel
  const shift = (Math.random() - 0.5) * 8;
  fgValue = Math.max(5, Math.min(95, fgValue + shift));
  updateFearGreedUI(fgValue);
}

function simulateFG() {
  if (fgValue === 50 && fgTrend === 0) {
    fgValue = 30 + Math.random() * 40;
    fgTrend = (Math.random() - 0.5) * 0.5;
  }
  if (Math.random() < 0.03) fgTrend = (Math.random() - 0.5) * 2;
  fgValue += fgTrend + (Math.random() - 0.5) * 1.2;
  fgTrend *= 0.97;
  fgValue = Math.max(5, Math.min(95, fgValue));
  updateFearGreedUI(fgValue);
}

function initFearGreed() {
  updateFearGreedUI(42);
  setInterval(simulateFG, 3500);
}

// WikiWiz — CALCULATORS.JS

const CALCULATORS = {
  position: {
    title: 'Position Size Calculator',
    desc: 'Never risk more than you can afford. Calculate exact position size based on your risk rules.',
    inputs: [
      { id: 'acc_size', label: 'Account Size (₹)', placeholder: '100000', type: 'number' },
      { id: 'risk_pct', label: 'Risk % (max 2%)', placeholder: '2', type: 'number' },
      { id: 'entry', label: 'Entry Price (₹)', placeholder: '500', type: 'number' },
      { id: 'stop', label: 'Stop Loss (₹)', placeholder: '480', type: 'number' },
      { id: 'target', label: 'Target Price (₹)', placeholder: '560', type: 'number' },
    ],
    compute: (v) => {
      const riskAmt = v.acc_size * (v.risk_pct / 100);
      const riskPerShare = Math.abs(v.entry - v.stop);
      const posSize = Math.floor(riskAmt / riskPerShare);
      const rrRatio = Math.abs(v.target - v.entry) / riskPerShare;
      const totalRisk = posSize * riskPerShare;
      const totalReward = posSize * Math.abs(v.target - v.entry);
      return [
        { label: 'Max Risk Amount', val: '₹' + riskAmt.toFixed(2) },
        { label: 'Risk Per Share', val: '₹' + riskPerShare.toFixed(2) },
        { label: 'Position Size', val: posSize + ' shares' },
        { label: 'Total Capital Used', val: '₹' + (posSize * v.entry).toFixed(2) },
        { label: 'Total Risk', val: '₹' + totalRisk.toFixed(2) },
        { label: 'Potential Profit', val: '₹' + totalReward.toFixed(2) },
        { label: 'Risk:Reward Ratio', val: '1 : ' + rrRatio.toFixed(2) + (rrRatio >= 2 ? ' ✓ GOOD' : ' ⚠️ LOW') },
        { label: 'Win Rate Needed (breakeven)', val: (100 / (1 + rrRatio)).toFixed(1) + '%' },
      ];
    },
    insight: (v) => {
      const rr = Math.abs(v.target - v.entry) / Math.abs(v.entry - v.stop);
      if (rr >= 3) return '🏆 Excellent R:R! Professional-grade setup. This is the quality you want.';
      if (rr >= 2) return '✓ Good R:R. You need less than 33% win rate to be profitable with this setup.';
      if (rr >= 1) return '⚠️ Acceptable but not ideal. Target a minimum 2:1 R:R for sustainable profitability.';
      return '🚨 Poor R:R. Skip this trade. Never risk more than you stand to gain.';
    }
  },
  rr: {
    title: 'Risk/Reward Calculator',
    desc: 'Understand your expected value over a series of trades.',
    inputs: [
      { id: 'win_rate', label: 'Win Rate (%)', placeholder: '45', type: 'number' },
      { id: 'avg_win', label: 'Average Win (₹)', placeholder: '4000', type: 'number' },
      { id: 'avg_loss', label: 'Average Loss (₹)', placeholder: '2000', type: 'number' },
      { id: 'num_trades', label: 'Number of Trades', placeholder: '100', type: 'number' },
      { id: 'start_capital', label: 'Starting Capital (₹)', placeholder: '100000', type: 'number' },
    ],
    compute: (v) => {
      const wr = v.win_rate / 100;
      const lr = 1 - wr;
      const ev = (wr * v.avg_win) - (lr * v.avg_loss);
      const totalEV = ev * v.num_trades;
      const rr = v.avg_win / v.avg_loss;
      const breakEven = 100 / (1 + rr);
      const expectedWins = wr * v.num_trades;
      const expectedLosses = lr * v.num_trades;
      return [
        { label: 'Expected Value Per Trade', val: (ev >= 0 ? '+' : '') + '₹' + ev.toFixed(2) },
        { label: 'Total Expected P&L', val: (totalEV >= 0 ? '+' : '') + '₹' + totalEV.toFixed(0) },
        { label: 'Risk:Reward Ratio', val: '1 : ' + rr.toFixed(2) },
        { label: 'Break-even Win Rate', val: breakEven.toFixed(1) + '%' },
        { label: 'Expected Wins', val: Math.round(expectedWins) + ' trades' },
        { label: 'Expected Losses', val: Math.round(expectedLosses) + ' trades' },
        { label: 'Profit Factor', val: ((wr * v.avg_win) / (lr * v.avg_loss)).toFixed(2) },
        { label: 'Final Capital (estimated)', val: '₹' + (v.start_capital + totalEV).toFixed(0) },
      ];
    },
    insight: (v) => {
      const wr = v.win_rate / 100;
      const lr = 1 - wr;
      const ev = (wr * v.avg_win) - (lr * v.avg_loss);
      if (ev > 0) return `✅ POSITIVE EDGE! Your system has an expected value of ₹${ev.toFixed(2)} per trade. Execute consistently and the math works in your favor.`;
      return `🚨 NEGATIVE EDGE. Your system loses ₹${Math.abs(ev).toFixed(2)} per trade on average. Either increase win rate, average win, or decrease average loss.`;
    }
  },
  pip: {
    title: 'Pip Value & Forex Calculator',
    desc: 'Calculate pip value for forex positions. Know your risk in currency terms.',
    inputs: [
      { id: 'pair', label: 'Currency Pair', placeholder: 'EUR/USD', type: 'text' },
      { id: 'lot_size', label: 'Lot Size', placeholder: '1', type: 'number' },
      { id: 'lot_type', label: 'Lot Type', type: 'select', options: ['Standard (100,000)', 'Mini (10,000)', 'Micro (1,000)'] },
      { id: 'pips', label: 'Number of Pips', placeholder: '50', type: 'number' },
      { id: 'exchange_rate', label: 'USD/INR Rate', placeholder: '83.4', type: 'number' },
    ],
    compute: (v) => {
      const units = v.lot_type === 0 ? 100000 : v.lot_type === 1 ? 10000 : 1000;
      const totalUnits = units * v.lot_size;
      const pipSize = 0.0001;
      const pipValueUSD = (pipSize / 1) * totalUnits;
      const pipValueINR = pipValueUSD * v.exchange_rate;
      const totalPnlUSD = pipValueUSD * v.pips;
      const totalPnlINR = totalPnlUSD * v.exchange_rate;
      const spread = 1.5;
      const spreadCost = spread * pipValueUSD;
      return [
        { label: 'Total Units', val: totalUnits.toLocaleString() },
        { label: 'Pip Size', val: pipSize.toFixed(4) },
        { label: 'Pip Value (USD)', val: '$' + pipValueUSD.toFixed(2) },
        { label: 'Pip Value (INR)', val: '₹' + pipValueINR.toFixed(2) },
        { label: `P&L for ${v.pips} pips (USD)`, val: '$' + totalPnlUSD.toFixed(2) },
        { label: `P&L for ${v.pips} pips (INR)`, val: '₹' + totalPnlINR.toFixed(2) },
        { label: 'Spread Cost (1.5 pips)', val: '$' + spreadCost.toFixed(2) },
        { label: 'Breakeven Pips', val: Math.ceil(spread) + ' pips to cover spread' },
      ];
    },
    insight: () => 'Forex trading involves leverage. A standard lot controls $100,000. Even 1 pip move = $10 profit/loss. Always use proper position sizing — leverage amplifies both gains AND losses.'
  },
  compound: {
    title: 'Compound Interest & SIP Calculator',
    desc: 'See how your money grows over time. The eighth wonder of the world.',
    inputs: [
      { id: 'principal', label: 'Initial Investment (₹)', placeholder: '100000', type: 'number' },
      { id: 'monthly_add', label: 'Monthly SIP (₹)', placeholder: '10000', type: 'number' },
      { id: 'annual_rate', label: 'Annual Return (%)', placeholder: '12', type: 'number' },
      { id: 'years', label: 'Years', placeholder: '20', type: 'number' },
    ],
    compute: (v) => {
      const r = v.annual_rate / 100 / 12;
      const n = v.years * 12;
      // Lump sum compound
      const lumpSum = v.principal * Math.pow(1 + r, n);
      // SIP FV = P × [(1+r)^n - 1] / r
      const sipFV = v.monthly_add * (Math.pow(1 + r, n) - 1) / r * (1 + r);
      const totalFV = lumpSum + sipFV;
      const totalInvested = v.principal + v.monthly_add * n;
      const gains = totalFV - totalInvested;
      const rule72 = (72 / v.annual_rate).toFixed(1);
      return [
        { label: 'Total Invested', val: '₹' + totalInvested.toLocaleString('en-IN') },
        { label: 'Lump Sum Growth', val: '₹' + lumpSum.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label: 'SIP Future Value', val: '₹' + sipFV.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label: 'Total Corpus', val: '₹' + totalFV.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label: 'Total Gains', val: '₹' + gains.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label: 'Return on Investment', val: ((gains / totalInvested) * 100).toFixed(1) + '%' },
        { label: 'Wealth Multiple', val: (totalFV / totalInvested).toFixed(2) + 'x' },
        { label: 'Rule of 72 (Years to double)', val: rule72 + ' years at ' + v.annual_rate + '%' },
      ];
    },
    insight: (v) => {
      const totalInvested = v.principal + v.monthly_add * v.years * 12;
      const r = v.annual_rate / 100 / 12;
      const n = v.years * 12;
      const fv = v.principal * Math.pow(1+r, n) + v.monthly_add * (Math.pow(1+r,n)-1)/r*(1+r);
      const multiple = fv / totalInvested;
      return `🚀 At ${v.annual_rate}% CAGR over ${v.years} years, your money grows ${multiple.toFixed(1)}x. The Nifty 50 has historically returned ~12% CAGR. Starting early beats investing more later — every 10 years of delay halves your final corpus.`;
    }
  },
  dcf: {
    title: 'DCF Intrinsic Value Calculator',
    desc: 'Discounted Cash Flow — Warren Buffett\'s method. What is the company actually worth?',
    inputs: [
      { id: 'fcf', label: 'Current Free Cash Flow (₹ Cr)', placeholder: '1000', type: 'number' },
      { id: 'growth_rate', label: 'FCF Growth Rate (%/yr)', placeholder: '15', type: 'number' },
      { id: 'terminal_rate', label: 'Terminal Growth Rate (%)', placeholder: '4', type: 'number' },
      { id: 'discount_rate', label: 'Discount Rate / WACC (%)', placeholder: '12', type: 'number' },
      { id: 'shares', label: 'Shares Outstanding (Cr)', placeholder: '100', type: 'number' },
      { id: 'current_price', label: 'Current Share Price (₹)', placeholder: '500', type: 'number' },
    ],
    compute: (v) => {
      const r = v.discount_rate / 100;
      const g = v.growth_rate / 100;
      const gT = v.terminal_rate / 100;
      let pv = 0;
      let fcfYr = v.fcf;
      // 10-year DCF
      for (let yr = 1; yr <= 10; yr++) {
        fcfYr *= (1 + g);
        pv += fcfYr / Math.pow(1 + r, yr);
      }
      // Terminal value
      const terminalFCF = fcfYr * (1 + gT);
      const terminalValue = terminalFCF / (r - gT);
      const pvTerminal = terminalValue / Math.pow(1 + r, 10);
      const totalValue = pv + pvTerminal;
      const intrinsicPerShare = totalValue / v.shares;
      const margin = ((intrinsicPerShare - v.current_price) / intrinsicPerShare) * 100;
      return [
        { label: '10-Year DCF Value (₹ Cr)', val: '₹' + pv.toFixed(0) + ' Cr' },
        { label: 'Terminal Value (₹ Cr)', val: '₹' + pvTerminal.toFixed(0) + ' Cr' },
        { label: 'Total Enterprise Value', val: '₹' + totalValue.toFixed(0) + ' Cr' },
        { label: 'Intrinsic Value Per Share', val: '₹' + intrinsicPerShare.toFixed(2) },
        { label: 'Current Market Price', val: '₹' + v.current_price },
        { label: 'Margin of Safety', val: margin.toFixed(1) + '%' + (margin > 20 ? ' 🟢 BUY ZONE' : margin > 0 ? ' 🟡 FAIR' : ' 🔴 OVERVALUED') },
        { label: 'Upside Potential', val: (((intrinsicPerShare / v.current_price) - 1) * 100).toFixed(1) + '%' },
      ];
    },
    insight: (v) => 'DCF requires accurate FCF projections which are uncertain. This is why Buffett adds a "Margin of Safety" — he only buys when intrinsic value is significantly higher than market price. The larger the margin, the safer the bet.'
  },
  margin: {
    title: 'Margin & Leverage Calculator',
    desc: 'Calculate margin requirements, leverage exposure, and liquidation levels.',
    inputs: [
      { id: 'position_val', label: 'Position Value (₹)', placeholder: '500000', type: 'number' },
      { id: 'leverage', label: 'Leverage Ratio', placeholder: '5', type: 'number' },
      { id: 'margin_pct', label: 'Margin Required (%)', placeholder: '20', type: 'number' },
      { id: 'maintenance', label: 'Maintenance Margin (%)', placeholder: '10', type: 'number' },
    ],
    compute: (v) => {
      const capitalReq = v.position_val * (v.margin_pct / 100);
      const maintenanceAmt = v.position_val * (v.maintenance / 100);
      const liquidationDrop = ((capitalReq - maintenanceAmt) / v.position_val) * 100;
      const borrowedCapital = v.position_val - capitalReq;
      return [
        { label: 'Your Capital Required', val: '₹' + capitalReq.toFixed(0) },
        { label: 'Borrowed Capital', val: '₹' + borrowedCapital.toFixed(0) },
        { label: 'Maintenance Margin Amount', val: '₹' + maintenanceAmt.toFixed(0) },
        { label: 'Liquidation at Price Drop of', val: liquidationDrop.toFixed(2) + '%' },
        { label: 'Effective Leverage', val: v.leverage.toFixed(1) + 'x' },
        { label: '1% move on position = gain/loss', val: '₹' + (v.position_val * 0.01).toFixed(0) },
        { label: '5% adverse move = loss', val: '₹' + (v.position_val * 0.05).toFixed(0) },
        { label: 'Margin Call Buffer', val: (liquidationDrop).toFixed(2) + '% price move' },
      ];
    },
    insight: () => '🚨 LEVERAGE WARNING: A 5x leveraged position loses 5x faster. The same volatility that creates opportunity creates destruction. Most retail traders who use leverage blow accounts within 6 months. Always know your liquidation price before entering.'
  },
  drawdown: {
    title: 'Drawdown Recovery Calculator',
    desc: 'Understand how much you need to gain after a loss. The math is brutal.',
    inputs: [
      { id: 'start_cap', label: 'Starting Capital (₹)', placeholder: '100000', type: 'number' },
      { id: 'loss_pct', label: 'Drawdown (%)', placeholder: '30', type: 'number' },
      { id: 'monthly_target', label: 'Monthly Return Target (%)', placeholder: '5', type: 'number' },
    ],
    compute: (v) => {
      const lostAmt = v.start_cap * (v.loss_pct / 100);
      const remaining = v.start_cap - lostAmt;
      const recoveryNeeded = (v.loss_pct / (100 - v.loss_pct)) * 100;
      const monthsNeeded = Math.log(v.start_cap / remaining) / Math.log(1 + v.monthly_target / 100);
      return [
        { label: 'Capital After Loss', val: '₹' + remaining.toFixed(0) },
        { label: 'Amount Lost', val: '₹' + lostAmt.toFixed(0) },
        { label: 'Recovery Gain Needed', val: recoveryNeeded.toFixed(2) + '%' },
        { label: 'Months to Recover (at ' + v.monthly_target + '%/mo)', val: monthsNeeded.toFixed(1) + ' months' },
        { label: 'Years to Recover', val: (monthsNeeded / 12).toFixed(1) + ' years' },
        { label: '25% loss needs recovery of', val: '33.3%' },
        { label: '50% loss needs recovery of', val: '100%' },
        { label: '75% loss needs recovery of', val: '300%' },
      ];
    },
    insight: (v) => {
      const r = v.loss_pct / (100 - v.loss_pct) * 100;
      return `💡 A ${v.loss_pct}% loss requires a ${r.toFixed(1)}% gain just to break even. This asymmetry is why capital preservation is THE #1 priority. Small losses (5-10%) are easy to recover. Large losses (>40%) can take years or never recover.`;
    }
  },
  expected: {
    title: 'Expected Value (Kelly Criterion)',
    desc: 'Calculate your trading edge and optimal position sizing using Kelly Criterion.',
    inputs: [
      { id: 'win_prob', label: 'Win Probability (%)', placeholder: '55', type: 'number' },
      { id: 'win_size', label: 'Win Size (R)', placeholder: '2', type: 'number' },
      { id: 'loss_size', label: 'Loss Size (R)', placeholder: '1', type: 'number' },
      { id: 'bankroll', label: 'Total Bankroll (₹)', placeholder: '100000', type: 'number' },
      { id: 'risk_per_r', label: 'Risk Per R (₹)', placeholder: '2000', type: 'number' },
    ],
    compute: (v) => {
      const p = v.win_prob / 100;
      const q = 1 - p;
      const b = v.win_size / v.loss_size;
      const ev = (p * v.win_size) - (q * v.loss_size);
      // Kelly: f* = (bp - q) / b
      const kelly = ((b * p) - q) / b;
      const halfKelly = kelly / 2;
      const kellyAmt = kelly * v.bankroll;
      const halfKellyAmt = halfKelly * v.bankroll;
      const profitFactor = (p * v.win_size) / (q * v.loss_size);
      return [
        { label: 'Expected Value Per Trade', val: ev.toFixed(3) + 'R (' + (ev >= 0 ? 'POSITIVE EDGE ✓' : 'NO EDGE ✗') + ')' },
        { label: 'Profit Factor', val: profitFactor.toFixed(2) + (profitFactor > 1.5 ? ' 🟢 Strong' : ' 🟡 Weak') },
        { label: 'Full Kelly %', val: (kelly * 100).toFixed(1) + '%' },
        { label: 'Half Kelly % (recommended)', val: (halfKelly * 100).toFixed(1) + '%' },
        { label: 'Kelly Capital Bet', val: '₹' + kellyAmt.toFixed(0) },
        { label: 'Half-Kelly Capital Bet', val: '₹' + halfKellyAmt.toFixed(0) },
        { label: 'Trades to double (estimate)', val: Math.ceil(0.693 / (ev * (v.risk_per_r / v.bankroll))) + ' trades' },
        { label: 'Long-run edge per ₹ risked', val: '₹' + (ev * v.risk_per_r / v.loss_size).toFixed(2) },
      ];
    },
    insight: (v) => {
      const p = v.win_prob / 100;
      const q = 1 - p;
      const ev = (p * v.win_size) - (q * v.loss_size);
      if (ev <= 0) return '🚨 No edge! This system loses money long-term. Do not trade it with real capital.';
      const kelly = ((v.win_size/v.loss_size * p) - q) / (v.win_size/v.loss_size);
      return `✅ Positive edge system! Kelly suggests risking ${(kelly*100).toFixed(1)}% of bankroll, but use Half-Kelly for safety. Remember: even with edge, variance can cause losing streaks. Stay disciplined.`;
    }
  }
};

function initCalculators() {
  const state = getState();
  state.calcsUsed = state.calcsUsed || new Set();
  showCalc('position');
}

function showCalc(id) {
  document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
  const tabs = document.querySelectorAll('.calc-tab');
  const keys = Object.keys(CALCULATORS);
  const idx = keys.indexOf(id);
  if (tabs[idx]) tabs[idx].classList.add('active');

  const calc = CALCULATORS[id];
  if (!calc) return;

  const container = document.getElementById('calcContainer');
  if (!container) return;

  const inputsHTML = calc.inputs.map(inp => {
    if (inp.type === 'select') {
      return `<div class="calc-field">
        <label class="calc-label">${inp.label}</label>
        <select class="calc-input calc-select" id="calc_${inp.id}">
          ${inp.options.map((o,i) => `<option value="${i}">${o}</option>`).join('')}
        </select>
      </div>`;
    }
    return `<div class="calc-field">
      <label class="calc-label">${inp.label}</label>
      <input class="calc-input" type="${inp.type}" id="calc_${inp.id}" placeholder="${inp.placeholder || ''}" value="${inp.placeholder || ''}"/>
    </div>`;
  }).join('');

  container.innerHTML = `
    <div class="calc-title">${calc.title}</div>
    <div class="calc-desc">${calc.desc}</div>
    <div class="calc-grid">
      <div class="calc-inputs">
        ${inputsHTML}
        <button class="calc-btn" onclick="runCalc('${id}')">CALCULATE →</button>
      </div>
      <div id="calcResults_${id}">
        <div class="calc-results">
          <h4>RESULTS</h4>
          <p style="color:var(--text2);font-size:0.8rem">Fill in the values and click Calculate.</p>
        </div>
      </div>
    </div>
  `;

  // Track calc usage for badges
  const state = getState();
  if (!Array.isArray(state.calcsUsed)) state.calcsUsed = [];
  if (!state.calcsUsed.includes(id)) {
    state.calcsUsed.push(id);
    saveState(state);
    checkBadges(state);
  }
}

function runCalc(id) {
  const calc = CALCULATORS[id];
  if (!calc) return;

  const vals = {};
  calc.inputs.forEach(inp => {
    const el = document.getElementById(`calc_${inp.id}`);
    if (!el) return;
    vals[inp.id] = inp.type === 'select' ? parseInt(el.value) : parseFloat(el.value) || 0;
    if (inp.type === 'text') vals[inp.id] = el.value;
  });

  const results = calc.compute(vals);
  const insight = typeof calc.insight === 'function' ? calc.insight(vals) : calc.insight;

  const resultsHTML = `
    <div class="calc-results">
      <h4>RESULTS</h4>
      ${results.map(r => `
        <div class="calc-result-item">
          <span class="calc-res-label">${r.label}</span>
          <span class="calc-res-val">${r.val}</span>
        </div>
      `).join('')}
      <div class="calc-insight">${insight}</div>
    </div>
  `;

  const container = document.getElementById(`calcResults_${id}`);
  if (container) {
    container.innerHTML = resultsHTML;
    container.style.animation = 'fadeInUp 0.3s ease';
  }

  // Award XP for using calculators
  awardXP(25, 'Calculator used! +25 XP');
}

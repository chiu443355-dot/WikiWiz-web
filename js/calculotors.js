// WikiWiz — CALCULATORS.JS

const CALCULATORS = {
  position: {
    title: 'Position Size Calculator',
    desc: 'Calculate exact position size based on your account and risk rules. Never risk more than you plan.',
    inputs: [
      { id:'acc_size', label:'Account Size (₹)', val:'100000', type:'number' },
      { id:'risk_pct', label:'Risk % Per Trade (max 2%)', val:'2', type:'number' },
      { id:'entry', label:'Entry Price (₹)', val:'500', type:'number' },
      { id:'stop', label:'Stop Loss Price (₹)', val:'480', type:'number' },
      { id:'target', label:'Target Price (₹)', val:'560', type:'number' },
    ],
    compute(v) {
      const riskAmt = v.acc_size * (v.risk_pct / 100);
      const riskPer = Math.abs(v.entry - v.stop);
      if (riskPer === 0) return [{label:'Error',val:'Entry = Stop. Please fix.'}];
      const posSize = Math.floor(riskAmt / riskPer);
      const rr = Math.abs(v.target - v.entry) / riskPer;
      const totalRisk = posSize * riskPer;
      const totalReward = posSize * Math.abs(v.target - v.entry);
      const capital = posSize * v.entry;
      const winNeeded = (100 / (1 + rr)).toFixed(1);
      return [
        { label:'Max Risk Amount', val:'₹' + riskAmt.toLocaleString('en-IN', {maximumFractionDigits:2}) },
        { label:'Risk Per Share/Unit', val:'₹' + riskPer.toFixed(2) },
        { label:'Position Size', val:posSize.toLocaleString('en-IN') + ' shares' },
        { label:'Total Capital Used', val:'₹' + capital.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Total Risk (if wrong)', val:'₹' + totalRisk.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Potential Profit', val:'₹' + totalReward.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Risk:Reward Ratio', val:'1 : ' + rr.toFixed(2) + (rr >= 2 ? '  ✓ GOOD' : rr >= 1 ? '  ⚠️ MARGINAL' : '  🚨 SKIP TRADE') },
        { label:'Breakeven Win Rate Needed', val:winNeeded + '%' },
      ];
    },
    insight(v) {
      const rr = Math.abs(v.target - v.entry) / Math.abs(v.entry - v.stop);
      const riskPct = ((v.risk_pct || 2));
      let msg = '';
      if (riskPct > 2) msg += '🚨 You are risking more than 2% — reduce position size. ';
      if (rr >= 3) msg += '🏆 Excellent 3:1+ R:R setup. This is institutional-grade quality. Execute with confidence.';
      else if (rr >= 2) msg += '✅ Good 2:1 R:R. You only need a 33% win rate to be profitable long-term with this setup.';
      else if (rr >= 1) msg += '⚠️ Below 2:1 R:R. Acceptable but not ideal. Skip unless this is a very high-conviction setup.';
      else msg += '🚨 Poor R:R — DO NOT TAKE THIS TRADE. You are risking more than you stand to gain.';
      return msg;
    }
  },

  rr: {
    title: 'Risk/Reward & System EV Calculator',
    desc: 'Calculate expected value and long-term profitability of your trading system.',
    inputs: [
      { id:'win_rate', label:'Win Rate (%)', val:'45', type:'number' },
      { id:'avg_win', label:'Average Win (₹)', val:'4000', type:'number' },
      { id:'avg_loss', label:'Average Loss (₹)', val:'2000', type:'number' },
      { id:'num_trades', label:'Number of Trades', val:'100', type:'number' },
      { id:'start_cap', label:'Starting Capital (₹)', val:'100000', type:'number' },
    ],
    compute(v) {
      const wr = v.win_rate / 100;
      const lr = 1 - wr;
      const ev = (wr * v.avg_win) - (lr * v.avg_loss);
      const totalEV = ev * v.num_trades;
      const rr = v.avg_win / v.avg_loss;
      const breakEven = (100 / (1 + rr)).toFixed(1);
      const pf = (wr * v.avg_win) / (lr * v.avg_loss || 1);
      return [
        { label:'Expected Value Per Trade', val:(ev >= 0 ? '+' : '') + '₹' + ev.toFixed(2) + (ev > 0 ? ' ✓ EDGE' : ' 🚨 NO EDGE') },
        { label:'Total Expected P&L (' + v.num_trades + ' trades)', val:(totalEV >= 0 ? '+' : '') + '₹' + totalEV.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Risk:Reward Ratio', val:'1 : ' + rr.toFixed(2) },
        { label:'Breakeven Win Rate', val:breakEven + '%' },
        { label:'Profit Factor', val:pf.toFixed(2) + (pf > 1.5 ? '  🟢 Strong' : pf > 1 ? '  🟡 Weak' : '  🔴 Losing') },
        { label:'Expected Wins', val:Math.round(wr * v.num_trades) + ' trades' },
        { label:'Expected Losses', val:Math.round(lr * v.num_trades) + ' trades' },
        { label:'Projected Final Capital', val:'₹' + (v.start_cap + totalEV).toLocaleString('en-IN', {maximumFractionDigits:0}) },
      ];
    },
    insight(v) {
      const wr = v.win_rate / 100;
      const lr = 1 - wr;
      const ev = (wr * v.avg_win) - (lr * v.avg_loss);
      if (ev > 0) return `✅ POSITIVE EDGE! Expected value of ₹${ev.toFixed(2)} per trade. Over ${v.num_trades} trades = ₹${(ev*v.num_trades).toLocaleString('en-IN',{maximumFractionDigits:0})} expected profit. Execute consistently and the math works for you.`;
      return `🚨 NEGATIVE EDGE. This system loses ₹${Math.abs(ev).toFixed(2)} per trade on average. Fix: Increase win rate, increase average win, or decrease average loss. Do NOT trade this live.`;
    }
  },

  pip: {
    title: 'Pip Value & Forex Calculator',
    desc: 'Calculate pip value for forex positions. Know your exact risk in rupee terms.',
    inputs: [
      { id:'pair', label:'Currency Pair (e.g. EUR/USD)', val:'EUR/USD', type:'text' },
      { id:'lot_size', label:'Lot Size', val:'1', type:'number' },
      { id:'lot_type', label:'Lot Type', type:'select', options:['Standard (100,000 units)','Mini (10,000 units)','Micro (1,000 units)'] },
      { id:'pips', label:'Number of Pips (move)', val:'50', type:'number' },
      { id:'usd_inr', label:'USD/INR Rate', val:'83.4', type:'number' },
    ],
    compute(v) {
      const units = v.lot_type === 0 ? 100000 : v.lot_type === 1 ? 10000 : 1000;
      const totalUnits = units * v.lot_size;
      const pipSz = 0.0001;
      const pipUSD = pipSz * totalUnits;
      const pipINR = pipUSD * v.usd_inr;
      const pnlUSD = pipUSD * v.pips;
      const pnlINR = pnlUSD * v.usd_inr;
      const spread = 1.5;
      const spreadCostUSD = spread * pipUSD;
      return [
        { label:'Total Units', val:totalUnits.toLocaleString('en-US') },
        { label:'Pip Size', val:pipSz.toFixed(4) },
        { label:'Value Per Pip (USD)', val:'$' + pipUSD.toFixed(2) },
        { label:'Value Per Pip (INR)', val:'₹' + pipINR.toFixed(2) },
        { label:`P&L for ${v.pips} pips (USD)`, val:'$' + pnlUSD.toFixed(2) },
        { label:`P&L for ${v.pips} pips (INR)`, val:'₹' + pnlINR.toFixed(2) },
        { label:'Typical Spread Cost (1.5 pip)', val:'$' + spreadCostUSD.toFixed(2) },
        { label:'Pips to Break Even vs Spread', val:Math.ceil(spread) + ' pips minimum per trade' },
      ];
    },
    insight() {
      return '⚡ Forex uses leverage. A 1 standard lot = $100,000 exposure. Even 10 pip move = $100 profit/loss. Always know your pip value in rupees BEFORE entering a trade. Leverage amplifies both gains AND losses equally.';
    }
  },

  compound: {
    title: 'Compound Interest & SIP Calculator',
    desc: 'See how money grows over time. The most powerful wealth-building tool ever discovered.',
    inputs: [
      { id:'principal', label:'Initial Investment (₹)', val:'100000', type:'number' },
      { id:'monthly', label:'Monthly SIP Amount (₹)', val:'10000', type:'number' },
      { id:'rate', label:'Annual Return (%)', val:'12', type:'number' },
      { id:'years', label:'Investment Period (Years)', val:'20', type:'number' },
    ],
    compute(v) {
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const lumpFV = v.principal * Math.pow(1 + r, n);
      const sipFV = r > 0 ? v.monthly * (Math.pow(1 + r, n) - 1) / r * (1 + r) : v.monthly * n;
      const totalFV = lumpFV + sipFV;
      const totalInvested = v.principal + v.monthly * n;
      const gains = totalFV - totalInvested;
      const rule72 = (72 / v.rate).toFixed(1);
      const multiple = (totalFV / totalInvested).toFixed(2);
      return [
        { label:'Total Amount Invested', val:'₹' + totalInvested.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Lump Sum Growth', val:'₹' + lumpFV.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'SIP Future Value', val:'₹' + sipFV.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Total Corpus', val:'₹' + totalFV.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Total Wealth Gained', val:'₹' + gains.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Return on Investment', val:((gains / totalInvested) * 100).toFixed(1) + '%' },
        { label:'Wealth Multiple', val:multiple + 'x your investment' },
        { label:'Rule of 72 — Years to Double', val:rule72 + ' years at ' + v.rate + '% CAGR' },
      ];
    },
    insight(v) {
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const totalInvested = v.principal + v.monthly * n;
      const fv = v.principal * Math.pow(1+r,n) + (r > 0 ? v.monthly*(Math.pow(1+r,n)-1)/r*(1+r) : v.monthly*n);
      const mult = (fv/totalInvested).toFixed(1);
      return `🚀 At ${v.rate}% CAGR over ${v.years} years, money grows ${mult}x. Nifty 50 has historically returned ~12% CAGR. The secret: START EARLY. Every 10 years of delay roughly halves your final corpus. Time in market beats timing the market.`;
    }
  },

  dcf: {
    title: 'DCF Intrinsic Value Calculator',
    desc: "Discounted Cash Flow — Warren Buffett's preferred valuation method. What is the company ACTUALLY worth?",
    inputs: [
      { id:'fcf', label:'Current Free Cash Flow (₹ Crore)', val:'1000', type:'number' },
      { id:'growth', label:'FCF Growth Rate (%/yr, yrs 1–10)', val:'15', type:'number' },
      { id:'terminal', label:'Terminal Growth Rate (% forever)', val:'4', type:'number' },
      { id:'discount', label:'Discount Rate / WACC (%)', val:'12', type:'number' },
      { id:'shares', label:'Shares Outstanding (Crore)', val:'100', type:'number' },
      { id:'curr_price', label:'Current Market Price (₹)', val:'500', type:'number' },
    ],
    compute(v) {
      if (v.discount <= v.terminal) return [{ label:'Error', val:'Discount rate must exceed terminal growth rate.' }];
      const r = v.discount / 100;
      const g = v.growth / 100;
      const gT = v.terminal / 100;
      let pv = 0, fcfYr = v.fcf;
      for (let yr = 1; yr <= 10; yr++) {
        fcfYr *= (1 + g);
        pv += fcfYr / Math.pow(1 + r, yr);
      }
      const termFCF = fcfYr * (1 + gT);
      const tv = termFCF / (r - gT);
      const pvTV = tv / Math.pow(1 + r, 10);
      const total = pv + pvTV;
      const intrinsic = total / v.shares;
      const mos = ((intrinsic - v.curr_price) / intrinsic * 100).toFixed(1);
      const upside = (((intrinsic / v.curr_price) - 1) * 100).toFixed(1);
      return [
        { label:'10-Year DCF Value (₹ Cr)', val:'₹' + pv.toFixed(0) + ' Cr' },
        { label:'Terminal Value PV (₹ Cr)', val:'₹' + pvTV.toFixed(0) + ' Cr' },
        { label:'Total Enterprise Value', val:'₹' + total.toFixed(0) + ' Cr' },
        { label:'Intrinsic Value Per Share', val:'₹' + intrinsic.toFixed(2) },
        { label:'Current Market Price', val:'₹' + v.curr_price },
        { label:'Margin of Safety', val:mos + '%' + (parseFloat(mos) > 30 ? '  🟢 BUY ZONE' : parseFloat(mos) > 10 ? '  🟡 FAIR VALUE' : '  🔴 OVERVALUED') },
        { label:'Upside Potential', val:upside + '%' },
      ];
    },
    insight(v) {
      return `DCF is powerful but sensitive to assumptions. A 1% change in discount rate can change intrinsic value by 20–40%. Always use conservative estimates. Buffett buys at 50%+ margin of safety — the gap is your protection against being wrong. Never pay fair value; always demand a discount.`;
    }
  },

  margin: {
    title: 'Margin & Leverage Calculator',
    desc: 'Understand your true exposure, margin requirements, and liquidation levels.',
    inputs: [
      { id:'pos_val', label:'Total Position Value (₹)', val:'500000', type:'number' },
      { id:'leverage', label:'Leverage Ratio (e.g. 5 for 5x)', val:'5', type:'number' },
      { id:'margin_pct', label:'Initial Margin Required (%)', val:'20', type:'number' },
      { id:'maintenance', label:'Maintenance Margin (%)', val:'10', type:'number' },
    ],
    compute(v) {
      const capReq = v.pos_val * (v.margin_pct / 100);
      const maintAmt = v.pos_val * (v.maintenance / 100);
      const liqDrop = ((capReq - maintAmt) / v.pos_val * 100).toFixed(2);
      const borrowed = v.pos_val - capReq;
      const movePnl1 = v.pos_val * 0.01;
      const movePnl5 = v.pos_val * 0.05;
      return [
        { label:'Your Capital Required', val:'₹' + capReq.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Borrowed Capital', val:'₹' + borrowed.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Maintenance Margin Amount', val:'₹' + maintAmt.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Liquidation Triggered at Drop', val:liqDrop + '% price decline' },
        { label:'Effective Leverage', val:v.leverage + 'x — 1% move = ' + v.leverage + '% gain/loss on capital' },
        { label:'1% Adverse Move = Loss of', val:'₹' + movePnl1.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'5% Adverse Move = Loss of', val:'₹' + movePnl5.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Safety Buffer Before Liq Call', val:liqDrop + '% price move maximum' },
      ];
    },
    insight(v) {
      return `🚨 LEVERAGE IS A DOUBLE-EDGED SWORD. At ${v.leverage}x leverage, a ${(100/v.leverage).toFixed(0)}% adverse move WIPES YOUR ENTIRE CAPITAL. Most retail traders who use leverage heavily blow accounts within 6 months. Always know your liquidation price before entering. If in doubt, use zero leverage.`;
    }
  },

  drawdown: {
    title: 'Drawdown Recovery Calculator',
    desc: 'Understand the brutal asymmetric math of losses. Why capital preservation is the #1 priority.',
    inputs: [
      { id:'start_cap', label:'Starting Capital (₹)', val:'100000', type:'number' },
      { id:'loss_pct', label:'Drawdown / Loss (%)', val:'30', type:'number' },
      { id:'monthly_ret', label:'Monthly Return Target (%)', val:'5', type:'number' },
    ],
    compute(v) {
      const lost = v.start_cap * (v.loss_pct / 100);
      const remaining = v.start_cap - lost;
      const recoveryNeeded = (v.loss_pct / (100 - v.loss_pct) * 100).toFixed(2);
      const monthsNeeded = v.monthly_ret > 0 ? (Math.log(v.start_cap / remaining) / Math.log(1 + v.monthly_ret / 100)).toFixed(1) : 'Infinite';
      const yearsNeeded = v.monthly_ret > 0 ? (parseFloat(monthsNeeded) / 12).toFixed(1) : '∞';
      return [
        { label:'Capital Remaining After Loss', val:'₹' + remaining.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Amount Lost', val:'₹' + lost.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'% Gain Needed to Recover', val:recoveryNeeded + '% 🚨' },
        { label:'Months to Recover (at ' + v.monthly_ret + '%/mo)', val:monthsNeeded + ' months' },
        { label:'Years to Recover', val:yearsNeeded + ' years' },
        { label:'10% loss needs recovery of', val:'11.1%' },
        { label:'25% loss needs recovery of', val:'33.3%' },
        { label:'50% loss needs recovery of', val:'100% 💀' },
      ];
    },
    insight(v) {
      const r = (v.loss_pct / (100 - v.loss_pct) * 100).toFixed(1);
      return `A ${v.loss_pct}% loss requires a ${r}% gain just to BREAK EVEN — not to profit, just to get back to zero. This asymmetry is why capital preservation beats chasing returns. Lose less, win more. The 2% rule exists precisely to prevent reaching this point.`;
    }
  },

  expected: {
    title: 'Expected Value & Kelly Criterion',
    desc: 'Calculate your true trading edge and mathematically optimal position sizing using Kelly Criterion.',
    inputs: [
      { id:'win_prob', label:'Win Probability (%)', val:'55', type:'number' },
      { id:'win_size', label:'Win Size (in R, e.g. 2 = 2R)', val:'2', type:'number' },
      { id:'loss_size', label:'Loss Size (in R, always 1)', val:'1', type:'number' },
      { id:'bankroll', label:'Total Trading Capital (₹)', val:'100000', type:'number' },
      { id:'risk_per_r', label:'Risk Per R (₹)', val:'2000', type:'number' },
    ],
    compute(v) {
      const p = v.win_prob / 100;
      const q = 1 - p;
      const b = v.win_size / v.loss_size;
      const ev = (p * v.win_size) - (q * v.loss_size);
      const kelly = ((b * p - q) / b);
      const halfKelly = kelly / 2;
      const kellyAmt = Math.max(0, kelly * v.bankroll);
      const halfKellyAmt = Math.max(0, halfKelly * v.bankroll);
      const pf = (p * v.win_size) / (q * v.loss_size || 0.001);
      const tradesToDouble = ev > 0 ? Math.ceil(0.693 / (ev * (v.risk_per_r / v.bankroll))) : 'N/A (no edge)';
      return [
        { label:'Expected Value Per Trade', val:ev.toFixed(3) + 'R  ' + (ev > 0 ? '✓ POSITIVE EDGE' : '🚨 NO EDGE') },
        { label:'Profit Factor', val:pf.toFixed(2) + (pf > 2 ? '  🟢 Strong' : pf > 1 ? '  🟡 Weak' : '  🔴 Losing') },
        { label:'Full Kelly % (theoretical)', val:(kelly * 100).toFixed(1) + '%' },
        { label:'Half-Kelly % (recommended)', val:(halfKelly * 100).toFixed(1) + '%' },
        { label:'Full Kelly Capital Bet', val:'₹' + kellyAmt.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Half-Kelly Capital Bet (safe)', val:'₹' + halfKellyAmt.toLocaleString('en-IN', {maximumFractionDigits:0}) },
        { label:'Trades to Double Capital', val:tradesToDouble.toString() },
        { label:'Edge Per ₹ Risked', val:ev > 0 ? '₹' + (ev * v.risk_per_r).toFixed(2) + ' expected per trade' : 'Negative — do not trade' },
      ];
    },
    insight(v) {
      const p = v.win_prob / 100;
      const q = 1 - p;
      const b = v.win_size / v.loss_size;
      const ev = (p * v.win_size) - (q * v.loss_size);
      const kelly = (b * p - q) / b;
      if (ev <= 0) return '🚨 This system has NO EDGE. Negative expected value. DO NOT trade it with real capital. Fix: Increase win rate, increase average win size, or decrease loss size.';
      return `✅ Positive edge system! Full Kelly says bet ${(kelly*100).toFixed(1)}% but USE HALF-KELLY (${(kelly*50).toFixed(1)}%) for safety — even with edge, variance creates brutal drawdowns at full Kelly. Your edge per trade compounds over time. Execute consistently.`;
    }
  }
};

function initCalculators() {
  showCalc('position');
}

function showCalc(id) {
  // Update active tab
  document.querySelectorAll('.calc-tab').forEach(t => t.classList.remove('active'));
  const keys = Object.keys(CALCULATORS);
  const idx = keys.indexOf(id);
  const tabs = document.querySelectorAll('.calc-tab');
  if (tabs[idx]) tabs[idx].classList.add('active');

  const calc = CALCULATORS[id];
  if (!calc) return;

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
      <input class="calc-input" type="${inp.type}" id="calc_${inp.id}" value="${inp.val || ''}" placeholder="${inp.val || ''}"/>
    </div>`;
  }).join('');

  document.getElementById('calcContainer').innerHTML = `
    <div class="calc-title">${calc.title}</div>
    <div class="calc-desc">${calc.desc}</div>
    <div class="calc-grid">
      <div class="calc-inputs">
        ${inputsHTML}
        <button class="calc-btn" onclick="runCalc('${id}')">CALCULATE →</button>
      </div>
      <div id="calcResults_${id}">
        <div class="calc-results">
          <h4>RESULTS WILL APPEAR HERE</h4>
          <p style="color:var(--text2);font-size:0.8rem;margin-top:0.5rem">Fill in the values above and click CALCULATE.</p>
        </div>
      </div>
    </div>
  `;

  // Track for badges
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

  // Gather values
  const vals = {};
  calc.inputs.forEach(inp => {
    const el = document.getElementById(`calc_${inp.id}`);
    if (!el) return;
    if (inp.type === 'select') vals[inp.id] = parseInt(el.value);
    else if (inp.type === 'text') vals[inp.id] = el.value;
    else vals[inp.id] = parseFloat(el.value) || 0;
  });

  let results, insight;
  try {
    results = calc.compute(vals);
    insight = typeof calc.insight === 'function' ? calc.insight(vals) : (calc.insight || '');
  } catch(e) {
    results = [{ label:'Error', val:'Please check all input values.' }];
    insight = 'An error occurred. Please verify your inputs.';
  }

  const html = `
    <div class="calc-results" style="animation:fadeInUp 0.3s ease">
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
  if (container) container.innerHTML = html;

  // Award XP
  awardXP(25, 'Calculator used! +25 XP');
}

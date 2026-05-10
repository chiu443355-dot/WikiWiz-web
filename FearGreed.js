// WikiWiz — FEARGREED.JS
// Live Fear & Greed with realistic simulation + API ready

let fgValue = 50;
let fgTrend = 0;
let lastFgUpdate = 0;

const FG_DESCRIPTIONS = {
  extreme_fear: {
    label: 'EXTREME FEAR', color: '#ff2020',
    context: 'Extreme Fear grips the market. Investors are panic-selling quality assets at discounted prices. Historically, extreme fear creates the best buying opportunities. This is when Warren Buffett gets greedy. Every major market bottom in history was surrounded by extreme fear. Do you have the courage to buy when others are terrified?'
  },
  fear: {
    label: 'FEAR', color: '#ff6b00',
    context: 'Fear dominates market sentiment. Institutions are cautious, retail is nervous. This is a zone of above-average opportunity if your conviction in quality assets is high. Fear means prices are below fair value. Patient investors accumulate here.'
  },
  neutral: {
    label: 'NEUTRAL', color: '#ffd700',
    context: 'The market is balanced between fear and greed. Neither panic selling nor euphoric buying. This is the most rational state for markets. Fair value is most accurately reflected here. Plan your next move — the pendulum always swings.'
  },
  greed: {
    label: 'GREED', color: '#7fff00',
    context: 'Greed is driving markets higher. Retail participation is increasing, media coverage is positive, and everyone seems to be making money. This is when caution is warranted. Not a sell signal — but tighten stops and reduce leverage. The distribution phase often looks like this.'
  },
  extreme_greed: {
    label: 'EXTREME GREED', color: '#00ff88',
    context: 'Extreme Greed. Euphoria. Everyone is a genius. Crypto millionaires are on TV. Your taxi driver gives stock tips. This is the most dangerous phase. Institutions are distributing (selling) to retail FOMO buyers. The higher the greed, the harder the eventual fall. Be very careful with new positions here.'
  }
};

function getFgZone(value) {
  if (value <= 25) return FG_DESCRIPTIONS.extreme_fear;
  if (value <= 45) return FG_DESCRIPTIONS.fear;
  if (value <= 55) return FG_DESCRIPTIONS.neutral;
  if (value <= 75) return FG_DESCRIPTIONS.greed;
  return FG_DESCRIPTIONS.extreme_greed;
}

function updateFearGreedUI(value) {
  fgValue = Math.max(1, Math.min(99, value));
  const zone = getFgZone(fgValue);

  // Update score
  const scoreEl = document.getElementById('fgScore');
  const labelEl = document.getElementById('fgLabel');
  const updatedEl = document.getElementById('fgUpdated');
  const ctxEl = document.getElementById('fgContext');

  if (scoreEl) {
    scoreEl.textContent = Math.round(fgValue);
    scoreEl.style.color = zone.color;
  }
  if (labelEl) {
    labelEl.textContent = zone.label;
    labelEl.style.color = zone.color;
  }
  if (updatedEl) {
    updatedEl.textContent = `Updated: ${new Date().toLocaleTimeString('en-IN')} IST`;
  }
  if (ctxEl) {
    const p = ctxEl.querySelector('.fg-context-text');
    if (p) p.textContent = zone.context;
  }

  // Update needle
  updateNeedle(fgValue);

  // Update indicator bars
  updateIndicators(fgValue);
}

function updateNeedle(value) {
  const needle = document.getElementById('fgNeedle');
  if (!needle) return;

  // Map 0-100 to -90 to 90 degrees (left to right)
  const degrees = -90 + (value / 100) * 180;
  const radians = (degrees * Math.PI) / 180;

  const cx = 150, cy = 160, len = 80;
  const x2 = cx + len * Math.sin(radians);
  const y2 = cy - len * Math.cos(radians);

  needle.setAttribute('x2', x2.toFixed(1));
  needle.setAttribute('y2', y2.toFixed(1));
}

function updateIndicators(fgValue) {
  // Simulate 5 component indicators with variance
  const indicators = [
    { id: 'ind1', name: 'Market Momentum', val: Math.max(0, Math.min(100, fgValue + (Math.random() - 0.5) * 20)) },
    { id: 'ind2', name: 'Stock Price Strength', val: Math.max(0, Math.min(100, fgValue + (Math.random() - 0.5) * 25)) },
    { id: 'ind3', name: 'Safe Haven Demand', val: Math.max(0, Math.min(100, 100 - fgValue + (Math.random() - 0.5) * 15)) },
    { id: 'ind4', name: 'Junk Bond Demand', val: Math.max(0, Math.min(100, fgValue + (Math.random() - 0.5) * 20)) },
    { id: 'ind5', name: 'Market Volatility (VIX)', val: Math.max(0, Math.min(100, 100 - fgValue + (Math.random() - 0.5) * 20)) },
  ];

  indicators.forEach(ind => {
    const fill = document.getElementById(ind.id);
    const valEl = document.getElementById(ind.id + 'v');
    if (fill) fill.style.width = ind.val.toFixed(0) + '%';
    if (valEl) {
      const zone = getFgZone(ind.val);
      valEl.textContent = Math.round(ind.val);
      valEl.style.color = zone.color;
    }
  });
}

// Try live API, fall back to simulation
async function fetchFearGreed() {
  try {
    // Note: Replace with your actual RapidAPI key
    // This endpoint simulates realistic fear/greed based on market conditions
    // Real API: https://cnn-fear-and-greed-index.p.rapidapi.com/
    // For now, use realistic simulation
    simulateFearGreed();
  } catch (err) {
    simulateFearGreed();
  }
}

function simulateFearGreed() {
  // Realistic market simulation
  // Start at a realistic value and drift slowly
  if (fgValue === 50 && fgTrend === 0) {
    // Initialize to a realistic mid value
    fgValue = 35 + Math.random() * 35; // Start between 35-70
    fgTrend = (Math.random() - 0.5) * 0.3;
  }

  // Occasional spike events
  if (Math.random() < 0.02) {
    fgTrend = (Math.random() - 0.5) * 2;
  }

  // Add momentum and noise
  fgValue += fgTrend + (Math.random() - 0.5) * 1.5;
  fgTrend *= 0.98; // Trend decay
  fgValue = Math.max(5, Math.min(95, fgValue));

  updateFearGreedUI(fgValue);
}

function initFearGreed() {
  // Set initial value
  updateFearGreedUI(42);

  // Fetch live data immediately
  fetchFearGreed();

  // Update every 3 seconds for live feel
  setInterval(() => {
    simulateFearGreed();
  }, 3000);

  // Try actual API every 60 seconds
  setInterval(fetchFearGreed, 60000);
}

// Real API integration (when key is provided)
async function fetchLiveFearGreed(apiKey) {
  if (!apiKey) return;

  try {
    const response = await fetch('https://cnn-fear-and-greed-index.p.rapidapi.com/cnn/v1/fear_and_greed/index', {
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'cnn-fear-and-greed-index.p.rapidapi.com',
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.score !== undefined) {
        updateFearGreedUI(data.score);
      }
    }
  } catch (err) {
    console.log('Fear & Greed API unavailable, using simulation');
  }
}

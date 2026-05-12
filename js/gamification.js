// WikiWiz — GAMIFICATION.JS

const STATE_KEY = 'wikiwiz_state_v3';

function getState() {
  try {
    const s = JSON.parse(localStorage.getItem(STATE_KEY));
    return s || { xp:0, completed:[], calcsUsed:[], earnedBadges:[], rank:0 };
  } catch { return { xp:0, completed:[], calcsUsed:[], earnedBadges:[], rank:0 }; }
}

function saveState(state) {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch {}
}

function updateXPDisplay(totalXP, newXP) {
  const el = document.getElementById('xpDisplay');
  if (el) el.textContent = totalXP.toLocaleString('en-IN') + ' XP';
  if (newXP > 0) {
    const toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.textContent = `⚡ +${newXP} XP EARNED!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }
  updateRank(totalXP);
  updateProgress();
}

function awardXP(amount, msg) {
  const state = getState();
  state.xp = (state.xp || 0) + amount;
  saveState(state);
  updateXPDisplay(state.xp, amount);
}

function updateRank(xp) {
  const el = document.getElementById('navRank');
  if (!el) return;
  let rank = RANKS[0];
  for (const r of RANKS) { if (xp >= r.minXP) rank = r; else break; }
  el.textContent = rank.name;
}

function checkBadges(state) {
  const completed = state.completed || [];
  const xp = state.xp || 0;
  const calcsUsed = Array.isArray(state.calcsUsed) ? state.calcsUsed : [];
  BADGES.forEach(badge => {
    if ((state.earnedBadges || []).includes(badge.id)) return;
    let earned = false;
    if (badge.xpReq && xp >= badge.xpReq) earned = true;
    if (badge.chapReq && completed.length >= badge.chapReq) earned = true;
    if (badge.calcReq && calcsUsed.length >= badge.calcReq) earned = true;
    if (badge.phaseReq === 'risk' && completed.includes('position-sizing')) earned = true;
    if (earned) {
      state.earnedBadges = state.earnedBadges || [];
      state.earnedBadges.push(badge.id);
      saveState(state);
      showBadgeToast(badge);
      renderBadges();
    }
  });
}

function showBadgeToast(badge) {
  const toast = document.createElement('div');
  toast.className = 'badge-toast';
  toast.innerHTML = `<div class="badge-toast-title">🏆 BADGE UNLOCKED!</div><div class="badge-toast-name">${badge.icon} ${badge.name}</div><div style="font-size:0.6rem;color:var(--text2);margin-top:0.2rem">${badge.desc}</div>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function renderBadges() {
  const row = document.getElementById('badgesRow');
  if (!row) return;
  const earned = getState().earnedBadges || [];
  row.innerHTML = BADGES.map(b => `
    <div class="badge ${earned.includes(b.id) ? 'earned' : ''}" title="${b.desc}">
      <span>${b.icon}</span><span>${b.name}</span>
    </div>
  `).join('');
}

function updateProgress() {
  const state = getState();
  const total = ALL_CHAPTERS.length;
  const done = (state.completed || []).length;
  const pct = Math.round((done / total) * 100);
  const fill = document.getElementById('overallFill');
  const pctEl = document.getElementById('overallPct');
  if (fill) fill.style.width = pct + '%';
  if (pctEl) pctEl.textContent = pct + '%';
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
}

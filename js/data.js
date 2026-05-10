// WikiWiz — DATA.JS
// All static data: market events, chapters, badges

const MARKET_EVENTS = [
  {
    id: 'covid2020',
    date: 'MARCH 2020',
    title: '2020 COVID CRASH',
    drop: '-34% in 33 days',
    tag: 'BLACK SWAN',
    body: `On March 16, 2020, the Dow Jones fell 2,997 points in a single day — the largest single-day point drop in history. Global markets collapsed as lockdowns shut economies overnight. The S&P 500 fell from 3,386 to 2,237 in just 33 days — faster than any bear market in history.`,
    why: `Institutions sold everything to meet margin calls and liquidity needs. When hedge funds got redemption calls, they dumped assets indiscriminately. Retail traders, watching their portfolios bleed, panic-sold at the bottom — right before the greatest recovery in market history.`,
    lesson: '⚡ LESSON: Panic selling locks in losses. The COVID bottom was the greatest buying opportunity of the decade. Those who held or bought were rewarded 100%+ within a year.',
    recovery: 'Recovered in 148 days. S&P hit all-time highs by August 2020.'
  },
  {
    id: 'btc2022',
    date: 'NOV 2022',
    title: 'FTX COLLAPSE',
    drop: 'BTC: -75% peak to trough',
    tag: 'FRAUD',
    body: `Sam Bankman-Fried's FTX exchange — once valued at $32 billion — collapsed in 72 hours when it was revealed customer funds had been secretly transferred to sister firm Alameda Research. $8 billion in customer funds vanished. Bitcoin fell from $69,000 to $15,500.`,
    why: `Institutions and whales with insider knowledge began selling weeks before the public announcement. On-chain data showed massive BTC outflows from FTX. Retail traders who trusted "too big to fail" lost everything. This is why: not your keys, not your coins.`,
    lesson: '⚡ LESSON: Always withdraw crypto to self-custody. No exchange is "too big to fail." Watch on-chain flows for early warning signals.',
    recovery: 'BTC recovered to $70,000+ by early 2024.'
  },
  {
    id: 'nifty2026',
    date: 'JAN 2026',
    title: '2026 NIFTY CORRECTION',
    drop: '-18% in 6 weeks',
    tag: 'CORRECTION',
    body: `After years of bull market euphoria, Nifty 50 corrected sharply from 26,000 levels as global risk-off sentiment, FII outflows, and rupee depreciation triggered a cascade. Mid and small caps fell 30-40%. Many retail investors who entered at peak valuations saw portfolio destruction.`,
    why: `Foreign Institutional Investors (FIIs) pulled out ₹2.5 lakh crore over 3 months as US rates stayed high. Overleveraged retail positions in futures and options were wiped. Algorithmic traders intensified the sell-off through stop-loss cascades.`,
    lesson: '⚡ LESSON: Always know who the buyer of last resort is. FII flows drive Indian markets. When they leave, retail gets crushed. Track FII DII data daily.',
    recovery: 'Market found support at 21,800. Gradual recovery underway.'
  },
  {
    id: 'gold2024',
    date: 'SEPT 2024',
    title: 'GOLD SURGE & CORRECTION',
    drop: 'Rally +35%, then -12%',
    tag: 'COMMODITY',
    body: `Gold rallied from $1,800 to $2,800 as central banks globally diversified away from USD, geopolitical tensions escalated, and inflation fears returned. Then a sharp 12% correction as real yields rose and the dollar strengthened. Many retail buyers who chased the top got caught.`,
    why: `Central bank buying from China, India, and Russia drove the underlying trend. But when the Fed signaled rate cuts were slower than expected, gold's non-yield nature became a disadvantage. Smart money used retail FOMO as exit liquidity.`,
    lesson: '⚡ LESSON: Understand WHY an asset moves. Sentiment-driven rallies reverse violently. Institutions use retail euphoria as exit liquidity.',
    recovery: 'Gold stabilized around $2,600 and resumed uptrend.'
  },
  {
    id: 'silver2011',
    date: 'APRIL–MAY 2011',
    title: 'SILVER FLASH CRASH',
    drop: '-30% in 9 days',
    tag: 'VOLATILITY',
    body: `Silver rallied from $18 to $50 in 8 months — a 177% move. Then CME Group raised margin requirements 5 times in 8 days. Forced liquidations cascaded. Silver fell from $50 to $35 in 9 days, then to $26 over weeks. The most violent commodity crash of the decade.`,
    why: `When exchanges raise margin, leveraged positions must either add capital or liquidate. With everyone leveraged at the top, the forced selling fed on itself. Institutions that orchestrated the rally had already exited. Retail bagholders were left holding.`,
    lesson: '⚡ LESSON: Parabolic moves always end badly. When an asset triples in months, the question is not IF it corrects, but WHEN. Use trailing stops.',
    recovery: 'Silver took years to recover. Never reached $50 again for a decade.'
  },
  {
    id: 'dotcom2000',
    date: '2000–2002',
    title: 'DOT-COM BUST',
    drop: 'NASDAQ: -78%',
    tag: 'BUBBLE',
    body: `The NASDAQ Composite fell from 5,048 to 1,114 — a 78% decline over 30 months. Companies with no revenue, no profits, and no viable business models had traded at absurd valuations. When the money stopped flowing, the illusion collapsed. $5 trillion in market cap evaporated.`,
    why: `Venture capital dried up. Without fresh funding, unprofitable companies had no runway. Revenue multiples of 100x+ were exposed as fantasy. Institutional money quietly exited months before the peak as insider selling accelerated dramatically.`,
    lesson: '⚡ LESSON: "This time is different" is always wrong. Fundamentals always matter, eventually. A company must earn money to sustain value.',
    recovery: 'NASDAQ took 15 years to reclaim its 2000 peak. Many stocks never recovered.'
  }
];

const BADGES = [
  { id: 'first_blood', icon: '🩸', name: 'FIRST BLOOD', desc: 'Complete your first chapter', xpReq: 0, chapReq: 1 },
  { id: 'chart_reader', icon: '📊', name: 'CHART READER', desc: 'Complete 5 chapters', xpReq: 0, chapReq: 5 },
  { id: 'risk_guard', icon: '🛡️', name: 'RISK GUARDIAN', desc: 'Complete Risk Management phase', xpReq: 0, chapReq: 0, phaseReq: 'risk' },
  { id: 'calculator', icon: '🔢', name: 'THE CALCULATOR', desc: 'Use 5 different calculators', xpReq: 0, chapReq: 0, calcReq: 5 },
  { id: 'iron_will', icon: '⚔️', name: 'IRON WILL', desc: 'Earn 500 XP', xpReq: 500, chapReq: 0 },
  { id: 'market_sage', icon: '🧙', name: 'MARKET SAGE', desc: 'Complete 15 chapters', xpReq: 0, chapReq: 15 },
  { id: 'the_oracle', icon: '🔮', name: 'THE ORACLE', desc: 'Earn 2000 XP', xpReq: 2000, chapReq: 0 },
  { id: 'apex_trader', icon: '👑', name: 'APEX TRADER', desc: 'Complete all chapters', xpReq: 0, chapReq: 50 },
];

const RANKS = [
  { name: '🥚 ROOKIE', minXP: 0 },
  { name: '📈 CHARTIST', minXP: 100 },
  { name: '🎯 ANALYST', minXP: 300 },
  { name: '⚡ TRADER', minXP: 600 },
  { name: '🔱 STRATEGIST', minXP: 1200 },
  { name: '🧠 QUANT', minXP: 2000 },
  { name: '👑 APEX TRADER', minXP: 3500 },
];

const CHAPTERS = [
  // PHASE 0 — FOUNDATIONS
  {
    phase: 0, phaseTitle: 'FOUNDATIONS', phaseSubtitle: 'Before markets, understand money',
    id: 'what-is-money', tag: 'PHASE 0 · CH 1', title: 'What Is Money?',
    desc: 'From barter to Bitcoin — why money exists and what gives it value.',
    xp: 50, time: '15 min', diff: 'beginner',
    content: {
      intro: 'Money is the most powerful technology humanity ever invented. Yet most people cannot define it. Understanding money is the bedrock of all trading and investing knowledge.',
      sections: [
        { h: 'The Problem Money Solves', body: `Before money, humans bartered. A farmer with wheat had to find someone who (1) had what the farmer wanted AND (2) wanted wheat. This "double coincidence of wants" made large economies impossible. Money solved this by acting as an intermediary.` },
        { h: 'The Three Functions of Money', body: null, list: ['Medium of Exchange: Accepted everywhere for goods and services', 'Store of Value: Maintains purchasing power over time', 'Unit of Account: A standard measure to price everything'] },
        { h: 'What Backs Money?', body: `Before 1971, the US dollar was backed by gold (the Gold Standard). Since then, it is backed by nothing except trust — called "fiat" currency (from Latin: "let it be done"). The government declares it legal tender and enforces its acceptance.` },
        { h: 'Why This Matters for Trading', body: `When central banks print money (quantitative easing), they expand the money supply. More money chasing the same goods = inflation. Inflation destroys the purchasing power of cash. This is why investors buy stocks, real estate, gold, and crypto — to preserve purchasing power.` },
        { quote: '"In the absence of the gold standard, there is no way to protect savings from confiscation through inflation." — Alan Greenspan' },
        { h: 'Bitcoin as Hard Money', body: `Bitcoin was designed as digital gold — with a fixed supply of 21 million coins. No government can print more Bitcoin. This scarcity gives it "hardness" similar to gold, but with the portability of digital information. This property drives institutional interest.` },
        { warn: '⚠️ This is education only. Bitcoin is extremely volatile. Never invest more than you can afford to lose completely.' }
      ],
      chart: 'money_timeline',
      key_takeaways: ['Money is a technology, not a natural resource', 'Fiat money can be inflated away', 'Hard assets protect against currency debasement', 'Understanding money supply is crucial for macro trading']
    }
  },
  {
    phase: 0, id: 'what-is-stock', tag: 'PHASE 0 · CH 2', title: 'What Is a Stock?',
    desc: 'Ownership in a company. Voting rights. Dividends. All explained simply.',
    xp: 50, time: '12 min', diff: 'beginner',
    content: {
      intro: 'A stock is a tiny ownership stake in a real company. When you buy one share of Apple, you own a microscopic piece of Apple Inc. — its factories, patents, cash, and future earnings.',
      sections: [
        { h: 'Why Companies Issue Stock', body: `To raise capital. Instead of borrowing from a bank, a company can sell ownership stakes. Early investors in Amazon or Google became multi-millionaires as those companies grew. The company gets cash to expand; investors get a share of future profits.` },
        { h: 'Common vs Preferred Stock', body: null, list: ['Common Stock: Voting rights, last to get paid in bankruptcy, potential for unlimited upside', 'Preferred Stock: No voting rights, fixed dividends paid first, safer but capped upside'] },
        { h: 'How Stock Prices Move', body: `Prices reflect collective beliefs about future earnings. Good news → buyers rush in → price rises. Bad news → sellers rush out → price falls. Long term, stock prices follow earnings. Short term, they follow emotions — fear and greed.` },
        { formula: 'Stock Price ≈ EPS × P/E Ratio\n(Earnings Per Share × Price-to-Earnings Multiple)' },
        { h: 'Dividends', body: `Some companies share profits directly with shareholders. This is a dividend — usually paid quarterly. Mature, stable companies like Coca-Cola pay reliable dividends. Growth companies like Tesla reinvest profits to expand.` },
        { quote: '"Owning a share of a business is the most direct way to participate in economic growth." — Peter Lynch' }
      ],
      chart: 'stock_ownership',
      key_takeaways: ['Stock = ownership stake in a business', 'Price follows earnings over the long run', 'Dividends are your share of profits', 'Volatility is the price of higher long-term returns']
    }
  },
  {
    phase: 0, id: 'stock-market', tag: 'PHASE 0 · CH 3', title: 'The Stock Market',
    desc: 'NSE, BSE, NYSE — what they are, how they work, who controls price.',
    xp: 60, time: '18 min', diff: 'beginner',
    content: {
      intro: 'The stock market is not one place — it is a global network of exchanges, brokers, market makers, and algorithms all connected in real time. Understanding its structure removes the mystery.',
      sections: [
        { h: 'Primary vs Secondary Market', body: `Primary Market: Where companies first sell shares to the public (IPO). You buy directly from the company. Secondary Market: Where investors trade shares among themselves. This is "the stock market" — NSE, BSE, NYSE, NASDAQ.` },
        { h: 'Key Indian Exchanges', body: null, list: ['NSE (National Stock Exchange): Largest by volume. Home of Nifty 50 index.', 'BSE (Bombay Stock Exchange): Oldest (1875). 5,000+ listed companies. Home of Sensex.', 'MCX: For commodity trading — gold, silver, crude oil'] },
        { h: 'How Orders Get Filled', body: `When you click "Buy," your order goes to a broker → routed to exchange → matched with a seller → settlement in T+1 (next day). Prices are determined by the order book — a live record of all buy and sell orders at different price levels.` },
        { h: 'Market Participants', body: null, list: ['Retail Traders: Individuals like you. Least information. Most emotional.', 'FIIs (Foreign Institutional Investors): Largest movers of Indian markets. Track their flows daily.', 'DIIs (Domestic Institutions): Mutual funds, insurance companies. Often counter-FII moves.', 'HFTs (High Frequency Traders): Algorithms making millions of trades per second. Provide liquidity.', 'Market Makers: Always quote buy and sell prices. Profit from the spread.'] },
        { warn: '⚠️ Retail traders have every disadvantage: less information, higher costs, more emotional. The only edge retail has is patience and long time horizons.' },
        { quote: '"The stock market is filled with individuals who know the price of everything but the value of nothing." — Philip Fisher' }
      ],
      chart: 'order_flow',
      key_takeaways: ['Stock markets are matching engines for buyers and sellers', 'FII flows dominate Indian market direction', 'You are always trading against informed participants', 'Understanding structure beats memorizing patterns']
    }
  },
  // PHASE 1
  {
    phase: 1, phaseTitle: 'FINANCIAL LITERACY', phaseSubtitle: '2–4 weeks · The language of money',
    id: 'compound-interest', tag: 'PHASE 1 · CH 4', title: 'Compound Interest: The 8th Wonder',
    desc: 'Why Einstein called it the most powerful force in the universe.',
    xp: 70, time: '15 min', diff: 'beginner',
    content: {
      intro: 'Albert Einstein reportedly called compound interest "the eighth wonder of the world." It is the mechanism by which small amounts of money, given time, become extraordinary wealth.',
      sections: [
        { h: 'Simple vs Compound Interest', body: `Simple Interest: You earn interest only on your principal. ₹1,00,000 at 10% = ₹10,000/year, forever.\n\nCompound Interest: You earn interest on your interest too. Year 1: ₹10,000. Year 2: ₹11,000. Year 3: ₹12,100. The amount grows.` },
        { formula: 'A = P × (1 + r/n)^(n×t)\n\nA = Final Amount\nP = Principal\nr = Annual Interest Rate\nn = Times compounded per year\nt = Years' },
        { h: 'The Rule of 72', body: `Divide 72 by your annual return to find how many years to double your money.\n\n• At 6% return: 72÷6 = 12 years to double\n• At 12% return: 72÷12 = 6 years to double\n• At 24% return: 72÷24 = 3 years to double\n\nThe Nifty 50 has historically returned ~12% CAGR. Your money doubles every 6 years.` },
        { h: 'The Time Cost', body: `₹10,000 invested at 12% CAGR:\n• After 10 years: ₹31,058\n• After 20 years: ₹96,463\n• After 30 years: ₹2,99,599\n\nThe third decade earns MORE than the first two combined. This is why starting early matters more than amount.` },
        { quote: '"Compound interest is the eighth wonder of the world. He who understands it, earns it. He who doesn\'t, pays it." — Albert Einstein' },
        { warn: '⚠️ Debt works on the same principle — against you. A credit card at 36% APR is compound interest destroying your wealth.' }
      ],
      chart: 'compound_growth',
      key_takeaways: ['Start investing early — time > amount', 'Reinvest all dividends to maximize compounding', 'Minimize transaction costs and taxes (they erode compounding)', 'The Rule of 72 is your mental calculator']
    }
  },
  {
    phase: 1, id: 'reading-financials', tag: 'PHASE 1 · CH 5', title: 'Reading Financial Statements',
    desc: 'Balance sheets, income statements, cash flows. Decode company health like a pro.',
    xp: 100, time: '30 min', diff: 'intermediate',
    content: {
      intro: 'Every public company must file financial statements. These are X-rays of a business. Most retail traders never read them. That ignorance is your opportunity.',
      sections: [
        { h: 'The Balance Sheet: A Snapshot in Time', body: `The balance sheet shows what a company OWNS (assets) vs what it OWES (liabilities). The difference is shareholders\' equity.\n\nFormula: Assets = Liabilities + Equity\n\nKey things to check: Is debt growing faster than assets? Is cash adequate to cover short-term debts?` },
        { formula: 'Current Ratio = Current Assets ÷ Current Liabilities\n(>1.5 = healthy, <1 = potential trouble)\n\nDebt/Equity Ratio = Total Debt ÷ Shareholders Equity\n(<1 = conservative, >2 = risky)' },
        { h: 'The Income Statement: Performance Over Time', body: `Shows revenue, expenses, and profits over a period. Key metrics:\n• Gross Margin: (Revenue - COGS) / Revenue\n• Operating Margin: Operating Profit / Revenue\n• Net Margin: Net Profit / Revenue\n\nTrend matters more than absolute numbers. Shrinking margins signal trouble ahead.` },
        { h: 'The Cash Flow Statement: Reality Check', body: `Profits can be manipulated through accounting. Cash flow cannot. A company can show accounting profit while running out of cash.\n\nFree Cash Flow = Operating Cash Flow - Capital Expenditure\n\nThis is the true money a business generates. Warren Buffett focuses heavily on owner earnings (a form of FCF).` },
        { h: 'Key Ratios', body: null, list: ['P/E Ratio: Price ÷ EPS. How many years of earnings you pay for. Lower = cheaper.', 'ROE: Net Profit ÷ Shareholders Equity. How efficiently equity generates profit.', 'EPS Growth: Is earnings per share growing year over year?', 'Operating Margin: How much profit per rupee of revenue?'] },
        { quote: '"Accounting is the language of business, and you have to be as comfortable with that language as you are with your mother tongue." — Warren Buffett' }
      ],
      chart: 'financial_statements',
      key_takeaways: ['Always check cash flow, not just profits', 'Debt/Equity and Current Ratio reveal financial health', 'Growing margins = competitive advantage', 'Compare ratios to industry peers, not in isolation']
    }
  },
  // PHASE 2
  {
    phase: 2, phaseTitle: 'MARKET STRUCTURE', phaseSubtitle: '2–3 weeks · How markets really work',
    id: 'market-structure', tag: 'PHASE 2 · CH 6', title: 'Market Structure & Liquidity',
    desc: 'Price moves because of liquidity imbalance. Not RSI. Not candles.',
    xp: 120, time: '25 min', diff: 'intermediate',
    content: {
      intro: 'Most traders study indicators — RSI, MACD, Bollinger Bands — and wonder why they fail. The answer: they are looking at effects, not causes. Price moves because of one thing: imbalance between buyers and sellers in the order book.',
      sections: [
        { h: 'The Order Book', body: `Every exchange maintains a real-time order book — all pending buy orders (bids) and sell orders (asks). The current "price" is where the last transaction occurred. When more aggressive buyers hit asks, price rises. When more aggressive sellers hit bids, price falls.` },
        { h: 'Liquidity', body: `Liquidity = ease of buying/selling without moving price. High liquidity: You can buy ₹10 lakh of Reliance without moving price significantly. Low liquidity: You buy ₹10 lakh of a small-cap and price jumps 5%. Liquidity is the water markets swim in.` },
        { h: 'Bid-Ask Spread', body: null, list: ['Bid: Highest price buyers are willing to pay', 'Ask: Lowest price sellers are willing to accept', 'Spread: Difference between ask and bid', 'Tight spread = high liquidity = lower trading cost', 'Wide spread = low liquidity = higher friction'] },
        { formula: 'Slippage = (Actual Fill Price - Expected Price) / Expected Price × 100%\n\nHigh slippage destroys small edges. Size matters.' },
        { h: 'Why Institutional Moves Drive Markets', body: `A retail trader buying ₹1 lakh of stock moves price 0.000001%. A mutual fund buying ₹1,000 crore moves it significantly. Institutions must split orders, hide their intent, use algorithms. When they buy, price rises. When they sell, it falls. Technical analysis patterns are often just footprints of institutional activity.` },
        { warn: '⚠️ High Frequency Trading firms make money on the spread millions of times per day. They see your order before it fills. This is legal and unavoidable. Trade less frequently to minimize their advantage over you.' },
        { quote: '"Price is what you pay. Value is what you get." — Warren Buffett' }
      ],
      chart: 'order_book',
      key_takeaways: ['Price = outcome of order book imbalance', 'Liquidity determines how easily you enter/exit', 'Institutions move markets — track their footprints', 'Slippage and spread are real costs, minimize them']
    }
  },
  // PHASE 3
  {
    phase: 3, phaseTitle: 'TECHNICAL ANALYSIS', phaseSubtitle: '2–3 months · Reading the chart language',
    id: 'candlesticks', tag: 'PHASE 3 · CH 7', title: 'Candlestick Mastery',
    desc: 'From basic candles to the 12 most powerful patterns. Visual price psychology.',
    xp: 150, time: '35 min', diff: 'intermediate',
    content: {
      intro: 'Candlestick charts were invented by Japanese rice traders in the 1700s. Each candle tells a story of the battle between buyers and sellers in a given time period. Learning to read this language is essential.',
      sections: [
        { h: 'Anatomy of a Candle', body: `Each candlestick has 4 data points:\n• Open: Where price started the period\n• Close: Where price ended the period  \n• High: Highest point reached\n• Low: Lowest point reached\n\nGreen (bullish) candle: Close > Open. Buyers won.\nRed (bearish) candle: Close < Open. Sellers won.` },
        { h: 'The 12 Most Powerful Patterns', body: null },
        { h: 'BULLISH PATTERNS', body: null, list: [
          'Hammer: Small body, long lower wick. Buyers rejected lower prices. Reversal signal at support.',
          'Bullish Engulfing: Small red candle fully engulfed by large green candle. Momentum shift.',
          'Morning Star: 3-candle pattern. Red → small doji → green. Strong reversal.',
          'Piercing Line: Red candle then green opens below but closes above midpoint of red.',
          'Doji at Support: Indecision at key level. Often precedes reversal.',
          'Three White Soldiers: Three consecutive green candles with closing at highs. Powerful uptrend start.'
        ]},
        { h: 'BEARISH PATTERNS', body: null, list: [
          'Shooting Star: Small body at bottom, long upper wick. Sellers rejected higher prices.',
          'Bearish Engulfing: Small green engulfed by large red. Sellers took control.',
          'Evening Star: Green → small doji → red. Top reversal pattern.',
          'Dark Cloud Cover: Green then red opens above but closes below midpoint of green.',
          'Hanging Man: Looks like a hammer but appears at top of uptrend. Warning signal.',
          'Three Black Crows: Three consecutive red candles. Powerful downtrend beginning.'
        ]},
        { warn: '⚠️ CRITICAL: Candle patterns are NOT standalone signals. They need: (1) Context — where is price in the trend? (2) Volume confirmation. (3) Key level — support/resistance. A hammer in the middle of nowhere means nothing.' },
        { quote: '"The chart is a picture of market psychology. Every candlestick is a referendum on who controlled price." — Steve Nison' }
      ],
      chart: 'candlestick_patterns',
      key_takeaways: ['Context > pattern in isolation', 'Combine patterns with support/resistance', 'Volume confirms or negates candle signals', 'Practice identifying patterns on real historical charts']
    }
  },
  {
    phase: 3, id: 'support-resistance', tag: 'PHASE 3 · CH 8', title: 'Support & Resistance',
    desc: 'The most important concept in all of technical analysis. Mastered by few.',
    xp: 150, time: '30 min', diff: 'intermediate',
    content: {
      intro: 'Support and Resistance are the foundation of every serious technical trader\'s framework. Every pattern, every indicator, every signal gains or loses meaning relative to these levels.',
      sections: [
        { h: 'Why Do These Levels Form?', body: `Support and resistance exist because of human psychology and order clustering:\n\n• Traders remember significant price levels (past highs, lows, round numbers)\n• Institutions place large orders at these levels\n• Stop-losses cluster below support, creating "fuel" for bounces\n• Take-profits cluster near resistance, creating selling pressure` },
        { h: 'Types of Support & Resistance', body: null, list: [
          'Horizontal S/R: Previous swing highs and lows — the most reliable',
          'Dynamic S/R: Moving averages (50MA, 200MA) act as floating support',
          'Trendline S/R: Connect swing highs or lows to form trend channels',
          'Psychological Levels: Round numbers (₹1000, ₹2000, $50,000 BTC)',
          'Previous Day High/Low: Critical intraday levels respected by algorithms',
          'Gap Levels: Price gaps often act as support/resistance after the fact'
        ]},
        { h: 'The Role Reversal Principle', body: `This is the most powerful concept: Once a support level is broken convincingly, it often becomes resistance (and vice versa). The level that was "the floor" becomes "the ceiling."\n\nWhy? Because traders who bought at the support and are now at a loss will sell when price returns to breakeven — creating new resistance.` },
        { formula: 'STRENGTH OF A LEVEL is determined by:\n1. How many times price tested it (3+ = strong)\n2. Volume at each test (high volume = institutional interest)\n3. How long ago it formed (recent = more relevant)\n4. How far price bounced from it (strong bounce = strong level)' },
        { warn: '⚠️ Avoid trading inside the "zone." The best entries are at the edge of support/resistance zones with defined risk below the zone. Never buy the middle of nowhere.' }
      ],
      chart: 'support_resistance',
      key_takeaways: ['S/R are zones, not precise lines', 'Role reversal is your most powerful tool', 'Combine multiple types of S/R for confluence', 'The more times a level holds, the more significant its break']
    }
  },
  {
    phase: 3, id: 'price-action', tag: 'PHASE 3 · CH 9', title: 'Pure Price Action Trading',
    desc: 'Trade with only price. No indicators. The cleanest approach to markets.',
    xp: 180, time: '40 min', diff: 'intermediate',
    content: {
      intro: 'Price action trading means reading only the raw price movement — no indicators, no oscillators, no moving averages cluttering your chart. Just price. It\'s how professional traders operated before modern software.',
      sections: [
        { h: 'Market Structure (Swings)', body: `Markets move in waves: Higher Highs (HH) and Higher Lows (HL) = Uptrend. Lower Highs (LH) and Lower Lows (LL) = Downtrend. Until this structure breaks, the trend continues.\n\nA trend change is confirmed only when a previous swing point is violated.` },
        { h: 'The Pin Bar', body: `The pin bar is the most reliable price action signal:\n• Long wick in one direction = price rejected that area\n• Small "body" relative to wick\n• Appears at key S/R levels\n\nA bearish pin at resistance with a 3:1 R:R setup is institutional-grade quality.` },
        { h: 'Inside Bars', body: `When a candle forms entirely within the range of the previous candle (mother bar), it signals consolidation and energy compression. The subsequent breakout of the mother bar is a high-quality trade setup — especially at key levels.` },
        { h: 'The False Break', body: `One of the most profitable price action trades:\n1. Obvious support level that everyone sees\n2. Price breaks below it (triggering stop-losses)\n3. Price quickly reverses and closes back above\n4. Enter long as price recovers — institutions used the break to fill orders` },
        { quote: '"The best trades are the ones everyone sees coming, but the entry is where most are afraid to enter." — Al Brooks' },
        { warn: '⚠️ Price action requires significant experience to trade well. Back-test extensively before trading real capital.' }
      ],
      chart: 'price_action',
      key_takeaways: ['Market structure (HH/HL) defines trend direction', 'Trade in the direction of the higher timeframe trend', 'False breaks are the setups institutions create', 'Fewer trades, higher quality = better results']
    }
  },
  // PHASE 4
  {
    phase: 4, phaseTitle: 'RISK MANAGEMENT', phaseSubtitle: 'THE MOST IMPORTANT PHASE',
    id: 'position-sizing', tag: 'PHASE 4 · CH 10', title: 'Position Sizing & The 2% Rule',
    desc: 'The single rule that separates survivors from blown accounts.',
    xp: 200, time: '25 min', diff: 'intermediate',
    content: {
      intro: 'You can be right 40% of the time and still make money. You can be right 60% of the time and still blow your account. The difference is position sizing. This is the most important chapter in this entire curriculum.',
      sections: [
        { h: 'The 2% Rule', body: `Never risk more than 2% of your total trading capital on a single trade.\n\nWith ₹1,00,000:\n• Max risk per trade = ₹2,000\n• Not your position size — your LOSS if wrong\n\nThis means you can lose 50 consecutive trades and still have capital to trade.` },
        { formula: 'Position Size = (Account Size × Risk %) ÷ (Entry Price - Stop Loss Price)\n\nExample:\nAccount: ₹1,00,000 | Risk: 2% = ₹2,000\nEntry: ₹500 | Stop: ₹480 | Risk per share: ₹20\nPosition Size = ₹2,000 ÷ ₹20 = 100 shares' },
        { h: 'Risk-to-Reward Ratio', body: `Always know your reward potential vs risk before entering.\n\n• 1:1 R:R — You need >50% win rate to be profitable\n• 2:1 R:R — You need >33% win rate to be profitable\n• 3:1 R:R — You need >25% win rate to be profitable\n\nProfessionals aim for 2:1 minimum. Most retail traders take 0.5:1 trades (risking more than they gain).` },
        { h: 'R-Multiple System', body: `Express all profits and losses in terms of R (your defined risk).\n\nIf you risked ₹2,000 and made ₹6,000 = +3R\nIf you risked ₹2,000 and lost ₹2,000 = -1R\n\nA trading system that averages +0.5R per trade is excellent. Track your average R to measure system quality.` },
        { h: 'Drawdown Math', body: `Understanding why losses hurt more than gains help:\n\n• Lose 10% → Need 11.1% to recover\n• Lose 25% → Need 33% to recover  \n• Lose 50% → Need 100% to recover\n• Lose 75% → Need 300% to recover\n\nProtecting capital is the #1 priority.` },
        { warn: '⚠️ The biggest mistake: increasing position size after losses to "make it back." This is how accounts blow up. After losses, REDUCE size. Rebuild confidence first.' },
        { quote: '"Risk management is the most overlooked aspect of trading. The goal is never to make money — it\'s to not lose it." — Paul Tudor Jones' }
      ],
      chart: 'position_sizing',
      key_takeaways: ['Risk 1-2% max per trade, always', 'Calculate position size BEFORE entering', 'Target minimum 2:1 R:R setups', 'Never add to losing positions']
    }
  },
  // PHASE 5
  {
    phase: 5, phaseTitle: 'TRADING PSYCHOLOGY', phaseSubtitle: 'Lifelong · The inner game',
    id: 'psychology', tag: 'PHASE 5 · CH 11', title: 'The Psychology of Trading',
    desc: 'Fear, greed, FOMO, revenge trading. Why your brain is your biggest enemy.',
    xp: 180, time: '30 min', diff: 'intermediate',
    content: {
      intro: 'Trading is the only arena where your instincts — developed over millions of years of evolution — work systematically against you. Every natural human response to loss and gain is the wrong response in markets.',
      sections: [
        { h: 'The Loss Aversion Problem', body: `Nobel laureate Daniel Kahneman discovered that losses feel approximately 2.5x more painful than equivalent gains feel good. Losing ₹10,000 hurts more than winning ₹10,000 feels good.\n\nThis means traders:\n• Hold losing trades too long (hoping to avoid crystallizing pain)\n• Cut winning trades too early (taking profit to feel good)\nThis is the reverse of what makes money.` },
        { h: 'The FOMO Trap', body: `Fear Of Missing Out drives some of the worst trades. Bitcoin goes from $30k to $60k. You didn't buy. It goes to $65k. Now you buy — right at the top, chasing what you already missed.\n\nInstitutions create FOMO deliberately. They distribute (sell) into retail FOMO buying at tops.` },
        { h: 'Revenge Trading', body: `You take a loss. Your ego is hurt. You immediately take another trade — larger size, lower quality setup — to "make it back."\n\nThis is how a small loss becomes an account-destroying loss. After any loss, step away. Minimum 30 minutes. Reassess the market with fresh eyes.` },
        { h: 'Overtrading', body: `The best traders take fewer trades, not more. Each trade is a decision that costs emotional energy. Decision fatigue leads to lower quality decisions.\n\nMost professional fund managers make 30-50 trades per year. Most retail traders make that in a day — and lose.` },
        { h: 'Building the Right Mindset', body: null, list: [
          'Think in probabilities, not certainties. No trade is a guarantee.',
          'Define your plan BEFORE market opens. Stick to it.',
          'Detach emotionally from individual trade outcomes.',
          'Keep a journal. Your emotions are the data.',
          'Accept that losses are the cost of doing business.'
        ]},
        { quote: '"The most important quality for an investor is temperament, not intellect." — Warren Buffett' }
      ],
      chart: 'psychology',
      key_takeaways: ['Your instincts in markets are evolved for the wrong environment', 'Process > outcomes in the short run', 'A trading journal is your most powerful tool', 'The ability to do nothing is underrated']
    }
  },
  // PHASE 6
  {
    phase: 6, phaseTitle: 'FUNDAMENTAL ANALYSIS', phaseSubtitle: 'Warren Buffett territory',
    id: 'moats', tag: 'PHASE 6 · CH 12', title: 'Economic Moats & Competitive Advantage',
    desc: 'Why some companies compound wealth for decades while others die.',
    xp: 200, time: '35 min', diff: 'advanced',
    content: {
      intro: 'Warren Buffett\'s most important investing concept: the economic moat. A moat is a sustainable competitive advantage that protects a business from competition — like a moat around a castle.',
      sections: [
        { h: 'Types of Economic Moats', body: null, list: [
          'Network Effects: More users = more valuable. WhatsApp, Visa. Near impossible to displace.',
          'Cost Advantage: Produce cheaper than competitors. Walmart, Amazon.',
          'Switching Costs: Expensive/painful to leave. Microsoft Office, Salesforce.',
          'Intangible Assets: Brands, patents, licenses. Apple, Coca-Cola, pharma patents.',
          'Efficient Scale: In limited markets, first mover prevents entry. Utilities, toll roads.'
        ]},
        { h: 'How to Identify a Moat', body: `Look for companies that:\n• Maintain high ROE (>15%) consistently for 10+ years\n• Have pricing power (can raise prices without losing customers)\n• Show high and stable operating margins\n• Earn high returns on invested capital (ROIC >15%)\n\nSustained high returns = competitive advantage = moat.` },
        { h: 'Valuation: Margin of Safety', body: `Even a great company is a bad investment at the wrong price.\n\nIntrinsic Value: What a business is worth based on future cash flows.\nMargin of Safety: Buy significantly below intrinsic value.\n\nBuffett's rule: Buy $1 of value for $0.50. The gap is your protection against being wrong.` },
        { formula: 'DCF: Intrinsic Value = Σ [FCFt ÷ (1 + r)^t]\n\nFCF = Free Cash Flow\nr = Discount Rate (usually WACC)\nt = Year number\n\nSimplified: Intrinsic Value ≈ FCF × (1 + growth)^years ÷ (discount - growth)' },
        { quote: '"Price is what you pay. Value is what you get. Buy wonderful companies at fair prices, not fair companies at wonderful prices." — Warren Buffett' }
      ],
      chart: 'moat_analysis',
      key_takeaways: ['Moats protect future earnings power', 'Pricing power is the clearest sign of a moat', 'Buy quality businesses at a margin of safety', 'Hold moat companies for decades, not months']
    }
  },
  // PHASE 7
  {
    phase: 7, phaseTitle: 'MACROECONOMICS', phaseSubtitle: 'The big picture everyone ignores',
    id: 'macro', tag: 'PHASE 7 · CH 13', title: 'How Macro Moves Markets',
    desc: 'Interest rates, inflation, GDP, central banks — the invisible hands on markets.',
    xp: 220, time: '40 min', diff: 'advanced',
    content: {
      intro: 'Every stock, bond, currency, and commodity exists within a macro environment. When you ignore macro, you are sailing blind. The 2022 crash, the 2020 recovery, the 2008 crisis — all were predictable from macro signals weeks or months in advance.',
      sections: [
        { h: 'The Rate Cycle & Markets', body: `Central bank interest rates are the gravity of financial markets:\n\n📈 Rising Rates:\n• Borrowing costs increase → corporate profits fall\n• Bond yields rise → bonds become more attractive than stocks\n• Growth stocks hit hardest (future earnings discounted more)\n• Dollar typically strengthens\n\n📉 Falling Rates:\n• Opposite of above. Stocks, especially growth, rally.` },
        { h: 'Inflation & CPI', body: `CPI (Consumer Price Index) measures average price changes.\n\nHigh Inflation (>4%): Central banks raise rates to cool economy → markets fall\nLow Inflation (<2%): Central banks cut rates to stimulate → markets rise\n\nThe Fed's dual mandate: price stability AND maximum employment. These often conflict.` },
        { h: 'Key Macro Relationships', body: null, list: [
          'Rates ↑ → Growth stocks ↓ (highest sensitivity)',
          'Rates ↓ → Gold ↑ (non-yield asset becomes attractive)',
          'Dollar ↑ → Emerging markets ↓ (USD debt becomes expensive)',
          'Oil ↑ → Inflation ↑ → Rate hike risk ↑',
          'VIX ↑ → Market fear → S/R more likely to hold',
          'Yield curve inverts → Recession warning (6-18 months lag)'
        ]},
        { h: 'The Yield Curve', body: `Normal yield curve: Long-term bonds yield more than short-term (makes sense — more time = more risk).\n\nInverted yield curve: Short-term yields exceed long-term. This is abnormal and has preceded every US recession for 50 years. Watch the 2Y vs 10Y Treasury spread.` },
        { quote: '"In macroeconomics, the difficulty is not the ideas themselves, but escaping from the old ones." — John Maynard Keynes' }
      ],
      chart: 'macro_relationships',
      key_takeaways: ['Central bank rates are the gravity of all asset prices', 'Trade with the macro wind, not against it', 'Yield curve inversion is the most reliable recession indicator', 'FII flows into India are driven by global macro, not Indian fundamentals alone']
    }
  },
  // PHASE 8
  {
    phase: 8, phaseTitle: 'OPTIONS & DERIVATIVES', phaseSubtitle: 'Advanced · Do NOT skip earlier phases',
    id: 'options-greeks', tag: 'PHASE 8 · CH 14', title: 'Options Greeks: The Real Language',
    desc: 'Delta, Theta, Gamma, Vega — what they actually mean for your P&L.',
    xp: 300, time: '45 min', diff: 'advanced',
    content: {
      intro: 'Options are weapons of mass wealth creation and destruction. The Greeks are the control panel. Most options traders lose because they buy options without understanding Theta decay. That is like driving without knowing what the gas pedal does.',
      sections: [
        { h: 'What Is an Option?', body: `An options contract gives you the RIGHT (not obligation) to buy or sell an asset at a specific price (strike) by a specific date (expiry).\n\nCALL option: Right to BUY\nPUT option: Right to SELL\n\nBuying options costs a premium. Selling options collects premium but takes on obligation.` },
        { h: 'Delta (Δ) — Directional Exposure', body: `Delta measures how much an option\'s price changes for a ₹1 move in the underlying.\n\n• ATM (at-the-money) call: ~0.50 delta\n• Deep ITM call: ~1.00 delta (moves like stock)\n• Far OTM call: ~0.05 delta (lottery ticket)\n\nDelta is also the approximate probability of expiring ITM.` },
        { h: 'Theta (Θ) — Time Decay', body: `Theta is the enemy of options buyers. Every day that passes, options lose value — even if price doesn\'t move.\n\nATM options lose time value fastest in the last 30 days before expiry. This is why weekly options sellers are profitable — they harvest theta.\n\nIn India, weekly Nifty options expire every Thursday. Theta decay is most aggressive Tuesday–Thursday.` },
        { formula: 'Option Value = Intrinsic Value + Time Value\n\nIntrinsic Value (call) = Max(Spot - Strike, 0)\nTime Value = Total Premium - Intrinsic Value\n\nTheta ≈ Time Value Loss per Day' },
        { h: 'Gamma (Γ) — Rate of Delta Change', body: `Gamma measures how fast delta changes. High gamma near expiry means small moves in underlying cause huge percentage moves in options. Both opportunity and danger.` },
        { h: 'Vega (ν) — Volatility Exposure', body: `Vega measures sensitivity to implied volatility (IV). When fear spikes (VIX jumps), IV rises, options premiums expand. Buy options before volatility expansion, sell after.` },
        { warn: '⚠️ Most retail traders in India buy weekly OTM options and lose to theta decay. The odds favor sellers, not buyers. Never buy options with less than 10 days to expiry unless you understand gamma risk completely.' },
        { quote: '"Options are not for everyone. But for those who master them, they are the most precise risk management tool ever created." — Sheldon Natenberg' }
      ],
      chart: 'options_greeks',
      key_takeaways: ['Theta kills option buyers — time is always working against you', 'Delta = directional position, Gamma = risk acceleration', 'Volatility expansion/contraction drives vega P&L', 'Never trade options without knowing your max risk']
    }
  },
  // PHASE 9 — SMC
  {
    phase: 9, phaseTitle: 'SMART MONEY CONCEPTS', phaseSubtitle: 'Institutional footprints',
    id: 'smc', tag: 'PHASE 9 · CH 15', title: 'Smart Money Concepts (SMC)',
    desc: 'Order blocks, fair value gaps, liquidity sweeps — how institutions actually trade.',
    xp: 280, time: '45 min', diff: 'advanced',
    content: {
      intro: 'Smart Money Concepts is a framework for understanding institutional order flow. Instead of memorizing patterns, you learn to read WHERE and WHY large players place orders — and trade with them, not against them.',
      sections: [
        { h: 'What Is "Smart Money"?', body: `Smart money = institutional traders: banks, hedge funds, central banks, proprietary trading firms. They move markets. Retail money = dumb money in institutional parlance. Not an insult — just different information, size, and methodology.` },
        { h: 'Order Blocks', body: `An order block is the last candle before a strong move away from a level. Institutions place large orders here — they cannot fill everything at once, so they return to the same price later to fill the rest.\n\nBullish Order Block: Last down candle before a strong move UP\nBearish Order Block: Last up candle before a strong move DOWN\n\nWhen price returns to an order block, institutions re-enter. This creates highly predictable bounce zones.` },
        { h: 'Fair Value Gaps (FVG)', body: `When price moves so fast that a gap forms between three candles, a Fair Value Gap exists. Markets are "imbalanced" and tend to return to fill these gaps before continuing the trend.\n\nFVG Identification:\n1. Look at 3 consecutive candles\n2. If the high of candle 1 doesn't overlap with low of candle 3 = FVG\n3. This zone is often revisited` },
        { h: 'Liquidity Sweeps', body: `Institutions need liquidity to fill large orders. They know retail stop-losses cluster just below obvious support levels or above obvious resistance.\n\nInstitutional play:\n1. Push price below obvious support (triggering retail stops = liquidity)\n2. Absorb retail sell orders at discounted prices\n3. Reverse aggressively with full position filled\n\nThis is the "stop hunt" pattern every retail trader has experienced. Now you know why it happens.` },
        { formula: 'ICT SMART MONEY MODEL:\nPremium Zone (above equilibrium) → sell\nDiscount Zone (below equilibrium) → buy\nEquilibrium = 50% of the previous swing range' },
        { h: 'Break of Structure (BOS)', body: `Market structure breaks (price takes out previous swing high/low) signal trend change or continuation. Combine with order blocks for high-probability entries.` },
        { quote: '"The banks move the market. Everything else is just the shadow of their footprint." — ICT (Michael Huddleston)' },
        { warn: '⚠️ SMC requires significant chart time to develop pattern recognition. Study 1000+ examples before trading with real money.' }
      ],
      chart: 'smc_concepts',
      key_takeaways: ['Order blocks = institutional footprints worth tracking', 'Liquidity sweeps are manufactured — not random', 'FVGs create high-probability return-to-fill setups', 'Always determine premium vs discount before entering']
    }
  },
  {
    phase: 9, id: 'algorithmic-trading', tag: 'PHASE 9 · CH 16', title: 'Algorithmic & Quant Trading',
    desc: 'How machines trade. Backtesting. Building an edge with data.',
    xp: 350, time: '50 min', diff: 'advanced',
    content: {
      intro: 'Over 70% of daily trading volume in US markets is algorithmic. In India, it\'s growing rapidly. Understanding how algos work prevents you from being their prey — and opens the door to building your own edge.',
      sections: [
        { h: 'Types of Algorithmic Strategies', body: null, list: [
          'Market Making: Post both bid and ask, profit from spread. Requires HFT infrastructure.',
          'Statistical Arbitrage: Trade price discrepancies between correlated instruments.',
          'Trend Following (CTA): Systematic trend capture across multiple assets.',
          'Mean Reversion: Trade deviations from historical average.',
          'Momentum: Buy winners, sell losers systematically.',
          'ML/AI Strategies: Pattern recognition in alternative data (satellite images, social sentiment, etc.)'
        ]},
        { h: 'Backtesting Basics', body: `Before trading any strategy with real money, test it on historical data:\n\n1. Define rules precisely (if...then...)\n2. Apply to out-of-sample data\n3. Measure: Win rate, R:R, Sharpe ratio, max drawdown\n4. Beware of overfitting (curve-fitting rules to past data)\n\nKey Metrics:\n• Sharpe Ratio > 1.5 = good\n• Max Drawdown < 20% = acceptable\n• Win Rate × Avg Win > Loss Rate × Avg Loss = edge` },
        { h: 'Python for Quant Trading', body: `Essential libraries:\n• pandas: Data manipulation\n• numpy: Mathematical operations\n• matplotlib/plotly: Charting\n• backtrader/zipline: Backtesting frameworks\n• alphalens: Factor analysis\n\nStart with: fetch market data from NSE/BSE APIs → build simple momentum strategy → backtest → analyze results.` },
        { formula: 'Sharpe Ratio = (Return - Risk Free Rate) / Standard Deviation\n\n> 1.5 = Good\n> 2.0 = Excellent\n> 3.0 = Exceptional\n\nExpected Value = (Win Rate × Avg Win) - (Loss Rate × Avg Loss)' },
        { warn: '⚠️ Backtesting bias: look-ahead bias, survivorship bias, and overfitting are the three demons of backtesting. If your backtest shows 95% win rate, it\'s almost certainly one of these errors.' },
        { quote: '"In God we trust. All others must bring data." — W. Edwards Deming' }
      ],
      chart: 'algo_trading',
      key_takeaways: ['Algos exploit predictable retail behavior — learn their patterns', 'Backtesting requires out-of-sample validation', 'Python + pandas is the foundation of quant trading', 'Any edge degrades when discovered — constantly research new ones']
    }
  },
  // More chapters for completeness
  {
    phase: 3, id: 'indicators', tag: 'PHASE 3 · CH 17', title: 'Indicators: Tools Not Oracles',
    desc: 'RSI, MACD, Bollinger Bands, VWAP — what they actually measure.',
    xp: 140, time: '30 min', diff: 'intermediate',
    content: {
      intro: 'Indicators are derived from price. They show you the past in a different visual form. They are useful tools — not crystal balls. Understanding what they measure changes how you use them.',
      sections: [
        { h: 'RSI (Relative Strength Index)', body: `RSI measures the speed and magnitude of recent price moves on a 0-100 scale.\n\n• >70 = "Overbought" — not a sell signal alone\n• <30 = "Oversold" — not a buy signal alone\n\nBetter use: RSI divergence. Price makes new high but RSI makes lower high = momentum weakening = potential reversal.` },
        { formula: 'RSI = 100 - [100 / (1 + RS)]\nRS = Average Gain / Average Loss over N periods (typically 14)' },
        { h: 'MACD', body: `Moving Average Convergence Divergence. Shows momentum by comparing two moving averages (typically 12 and 26 period EMA).\n\nSignal line (9 EMA of MACD) crossing = trend change signal.\nHistogram (MACD - Signal) shows acceleration/deceleration.\n\nBest used: MACD divergence on daily timeframe for swing trades.` },
        { h: 'VWAP (Volume Weighted Average Price)', body: `VWAP is the intraday average price weighted by volume. Institutional traders use it as a benchmark.\n\n• Price above VWAP = bullish intraday bias\n• Price below VWAP = bearish intraday bias\n• First reclaim of VWAP after gap down = key long entry\n\nReset daily. Most useful for intraday traders.` },
        { h: 'Bollinger Bands', body: `Standard deviation bands around a moving average. When price hits upper band = extended. When price hits lower band = compressed.\n\nBollinger Squeeze: Bands narrow dramatically → volatility compression → explosive move coming (direction unknown, use other signals).` },
        { warn: '⚠️ Using 5+ indicators simultaneously creates "analysis paralysis" and conflicting signals. Use 1-2 indicators max, plus price action. More indicators = more excuses not to trade.' }
      ],
      chart: 'indicators',
      key_takeaways: ['Indicators lag price — they confirm, not predict', 'Divergence is more useful than absolute readings', 'VWAP is the most institutional of all indicators', 'One good indicator understood deeply beats five poorly understood']
    }
  },
  {
    phase: 5, id: 'fear-greed-self', tag: 'PHASE 5 · CH 18', title: 'Controlling Fear & Greed Within Yourself',
    desc: 'The internal battle every trader fights. Practical tools to win it.',
    xp: 160, time: '25 min', diff: 'intermediate',
    content: {
      intro: 'The CNN Fear and Greed Index measures market sentiment. But the most dangerous fear and greed is the one inside your own head. Mastering your emotional state is the final frontier of trading performance.',
      sections: [
        { h: 'The Amygdala Hijack', body: `When you watch ₹50,000 evaporate in minutes, your amygdala (the brain\'s alarm system) triggers a fight-or-flight response. Cortisol floods your system. Rational thinking shuts down.\n\nThis is evolution — designed for running from lions. In markets, it causes: freezing (not cutting losses), panicking (selling at the exact bottom), or aggression (revenge trading).` },
        { h: 'Practical Tools', body: null, list: [
          'Pre-Market Ritual: Define your plan before markets open. Write it down. When emotional, refer to it.',
          'The 30-Minute Rule: After any loss >2R, stop trading for 30 minutes minimum.',
          'Position Sizing Psychology: Reduce size until you feel calm. If a trade makes your heart race, size is too big.',
          'Journaling: Write the emotion alongside the trade. Over time, patterns emerge.',
          'Meditation & Breathwork: Box breathing (4-4-4-4) during volatile markets reduces cortisol.',
          'Accountability Partner: A trusted peer who sees your journal and calls out patterns.'
        ]},
        { h: 'Cognitive Biases in Trading', body: null, list: [
          'Confirmation Bias: You only see information that confirms your trade idea. Actively seek contrary evidence.',
          'Recency Bias: Overweighting recent events. A 3-day winning streak doesn\'t change your system\'s edge.',
          'Anchoring: Being fixated on your buy price. The market doesn\'t know or care what you paid.',
          'Sunk Cost Fallacy: "I can\'t sell now, I\'ve already lost so much." This locks in larger losses.',
          'Overconfidence: After a winning streak, traders take larger risks. This is when accounts blow up.'
        ]},
        { quote: '"The most important investment you can make is in yourself. The most dangerous investment you can make is in your emotions." — Warren Buffett (adapted)' }
      ],
      chart: 'psychology_biases',
      key_takeaways: ['Your emotional state determines trade quality more than any indicator', 'Systemize decisions to reduce emotional interference', 'Size down until you can trade without fear or excitement', 'Journaling emotions transforms them into data']
    }
  },
  {
    phase: 10, phaseTitle: 'QUANT & DATA', phaseSubtitle: 'Elite level · Where institutional edge starts',
    id: 'statistics-trading', tag: 'PHASE 10 · CH 19', title: 'Statistics & Probability in Trading',
    desc: 'Expected value, probability distributions, Monte Carlo — think like a quant.',
    xp: 300, time: '45 min', diff: 'advanced',
    content: {
      intro: 'Professional traders think in probabilities, not predictions. Every trade is a probability distribution of outcomes, not a certain event. Shifting to this mindset is the single biggest edge available to retail traders.',
      sections: [
        { h: 'Expected Value', body: `Expected Value (EV) is the average outcome if you repeat a trade thousands of times.\n\nPositive EV = profitable long-term even with losses.\nNegative EV = losing long-term even with wins.\n\nCasinos have ~2% edge on roulette. Over millions of bets, they never lose. Run your trades the same way.` },
        { formula: 'E(X) = Σ [Outcome × Probability]\n\nExample:\n60% chance of +2R (+₹4,000)\n40% chance of -1R (-₹2,000)\n\nEV = (0.60 × 4000) + (0.40 × -2000)\nEV = 2400 - 800 = +₹1,600 per trade\n\nOver 100 trades = ₹1,60,000 in expectancy' },
        { h: 'The Kelly Criterion', body: `Kelly tells you the optimal fraction of capital to risk given your edge:\n\nKelly % = (bp - q) / b\nwhere:\nb = win/loss ratio\np = probability of winning\nq = 1 - p\n\nMost professionals use half-Kelly for safety. Full Kelly leads to massive drawdowns.` },
        { h: 'Normal Distribution & Fat Tails', body: `Market returns are NOT normally distributed. They have "fat tails" — extreme events happen far more often than a normal distribution predicts.\n\nThis is why:\n• Black swan events happen every 3-5 years\n• Options are more valuable than Black-Scholes suggests at extremes\n• Risk models that assume normality (like most banks use) fail catastrophically` },
        { warn: '⚠️ The 2008 financial crisis happened partly because risk models assumed normal distributions. The actual tail risk was 25 standard deviations — a "once in 10 quadrillion years" event by normal distribution math.' }
      ],
      chart: 'probability_trading',
      key_takeaways: ['Every trade is a bet on a probability distribution', 'Positive EV + volume = profits over time', 'Fat tails kill models that assume normality', 'Kelly Criterion provides mathematically optimal bet sizing']
    }
  },
  {
    phase: 11, phaseTitle: 'PORTFOLIO BUILDING', phaseSubtitle: 'Systems over individual trades',
    id: 'portfolio', tag: 'PHASE 11 · CH 20', title: 'Building a Robust Portfolio',
    desc: 'Asset allocation, correlation, diversification done right.',
    xp: 250, time: '40 min', diff: 'advanced',
    content: {
      intro: 'Individual stock picking is one game. Portfolio construction is another — and it\'s played at a higher level. How you combine assets determines 90%+ of your long-term returns.',
      sections: [
        { h: 'Modern Portfolio Theory (MPT)', body: `Harry Markowitz showed that combining imperfectly correlated assets reduces portfolio risk without reducing returns. Diversification is the only "free lunch" in finance.\n\nCorrelation of -1 = move opposite directions perfectly\nCorrelation of 0 = move independently\nCorrelation of +1 = move together perfectly\n\nYou want assets with low or negative correlation.` },
        { h: 'Strategic Asset Allocation', body: null, list: [
          'Equity (Nifty ETF, US ETF, small cap): 50-70% for growth-oriented investor',
          'Debt (Government bonds, debt funds): 15-30% for stability, reduces volatility',
          'Gold: 5-15% — best hedge against crisis and inflation. Uncorrelated to equities.',
          'International (S&P 500, NASDAQ ETF): 10-20% — rupee hedge, tech exposure',
          'Cash/Liquid: 5-10% — dry powder for opportunities'
        ]},
        { h: 'Rebalancing', body: `If equity rises 50% and bonds stay flat, your allocation drifts. Rebalancing (selling equity, buying bonds) forces "buy low, sell high" automatically. Rebalance: annually or when any asset class drifts 5%+ from target.` },
        { h: 'Factor Investing', body: `Decades of research show certain factors drive excess returns:\n• Value: Cheap stocks outperform over long cycles\n• Momentum: Recent winners continue outperforming (6-12 month horizon)\n• Quality: High ROE, low debt companies outperform\n• Small Cap: Small companies outperform over decades (with more volatility)` },
        { quote: '"Don\'t look for the needle in the haystack. Just buy the haystack." — John Bogle' }
      ],
      chart: 'portfolio_allocation',
      key_takeaways: ['Correlation matters more than individual asset performance', 'Rebalancing forces systematic buy-low-sell-high', 'International diversification is currency protection too', 'Low-cost index funds beat most active managers over 15+ years']
    }
  }
];

// Additional chapters to reach 50+
const EXTRA_CHAPTERS = [
  { phase: 3, id: 'trend-analysis', tag: 'PHASE 3 · CH 21', title: 'Trend Following Systems', desc: 'The oldest and most reliable trading approach. Trade with the momentum, not against it.', xp: 160, time: '30 min', diff: 'intermediate' },
  { phase: 3, id: 'multi-timeframe', tag: 'PHASE 3 · CH 22', title: 'Multi-Timeframe Analysis', desc: 'Monthly → Weekly → Daily → 4H → 1H. How to stack timeframes for precision entries.', xp: 180, time: '35 min', diff: 'intermediate' },
  { phase: 3, id: 'volume-analysis', tag: 'PHASE 3 · CH 23', title: 'Volume Profile & Order Flow', desc: 'Volume is the lifeblood of price movement. No volume = no conviction.', xp: 200, time: '40 min', diff: 'advanced' },
  { phase: 3, id: 'wyckoff', tag: 'PHASE 3 · CH 24', title: 'Wyckoff Method', desc: 'The 100-year-old method that still works. Accumulation, distribution, markup, markdown.', xp: 250, time: '50 min', diff: 'advanced' },
  { phase: 3, id: 'elliott-wave', tag: 'PHASE 3 · CH 25', title: 'Elliott Wave Theory', desc: 'Markets move in predictable 5-3 wave patterns. The controversial but powerful theory.', xp: 230, time: '45 min', diff: 'advanced' },
  { phase: 4, id: 'risk-advanced', tag: 'PHASE 4 · CH 26', title: 'Advanced Risk Management', desc: 'Portfolio heat, correlation risk, drawdown recovery strategies.', xp: 220, time: '35 min', diff: 'advanced' },
  { phase: 4, id: 'stop-loss-mastery', tag: 'PHASE 4 · CH 27', title: 'Stop-Loss Mastery', desc: 'Where to place stops so they protect capital without getting hunted.', xp: 180, time: '30 min', diff: 'intermediate' },
  { phase: 6, id: 'dcf-valuation', tag: 'PHASE 6 · CH 28', title: 'DCF Valuation Masterclass', desc: 'Build a full discounted cash flow model from scratch. What Buffett actually does.', xp: 280, time: '55 min', diff: 'advanced' },
  { phase: 6, id: 'sector-rotation', tag: 'PHASE 6 · CH 29', title: 'Sector Rotation Strategy', desc: 'Different sectors lead at different economic cycle stages. How to position accordingly.', xp: 200, time: '35 min', diff: 'advanced' },
  { phase: 7, id: 'currency-markets', tag: 'PHASE 7 · CH 30', title: 'Forex & Currency Markets', desc: 'How currency movements affect your equity portfolio — and how to trade them.', xp: 220, time: '40 min', diff: 'advanced' },
  { phase: 7, id: 'commodities', tag: 'PHASE 7 · CH 31', title: 'Commodity Markets Deep Dive', desc: 'Gold, crude oil, agricultural commodities — how they work and interact with stocks.', xp: 210, time: '40 min', diff: 'advanced' },
  { phase: 8, id: 'options-strategies', tag: 'PHASE 8 · CH 32', title: 'Options Strategies Playbook', desc: 'Covered calls, iron condors, spreads, straddles. When and how to use each.', xp: 320, time: '60 min', diff: 'advanced' },
  { phase: 8, id: 'futures-trading', tag: 'PHASE 8 · CH 33', title: 'Futures Trading', desc: 'Leverage, margin, rollover. How futures contracts work in practice.', xp: 280, time: '45 min', diff: 'advanced' },
  { phase: 9, id: 'order-blocks-deep', tag: 'PHASE 9 · CH 34', title: 'Order Block Deep Dive', desc: 'Bullish/bearish order blocks, breaker blocks, mitigation blocks — the full framework.', xp: 300, time: '50 min', diff: 'advanced' },
  { phase: 9, id: 'liquidity', tag: 'PHASE 9 · CH 35', title: 'Liquidity Concepts', desc: 'Equal highs/lows, buyside/sellside liquidity, inducement — SMC liquidity framework.', xp: 280, time: '45 min', diff: 'advanced' },
  { phase: 9, id: 'python-trading', tag: 'PHASE 9 · CH 36', title: 'Python for Traders', desc: 'Fetch data, build strategies, backtest, visualize. Complete starter guide.', xp: 350, time: '70 min', diff: 'advanced' },
  { phase: 10, id: 'backtesting', tag: 'PHASE 10 · CH 37', title: 'Backtesting Your Strategy', desc: 'Build, test, and validate a trading strategy on historical data. Step by step.', xp: 300, time: '55 min', diff: 'advanced' },
  { phase: 11, id: 'execution', tag: 'PHASE 11 · CH 38', title: 'Building Your Execution System', desc: 'Watchlists, journals, entry criteria, exit rules, review process — build YOUR system.', xp: 250, time: '40 min', diff: 'advanced' },
  { phase: 11, id: 'trading-journal', tag: 'PHASE 11 · CH 39', title: 'The Trading Journal: Your Edge', desc: 'How to structure a journal that actually improves your trading over time.', xp: 200, time: '25 min', diff: 'intermediate' },
  { phase: 0, id: 'what-is-bitcoin', tag: 'PHASE 0 · CH 40', title: 'What Is Bitcoin & Why It Exists', desc: 'The genesis block, Satoshi, monetary policy, halvings — the complete Bitcoin story.', xp: 80, time: '20 min', diff: 'beginner' },
  { phase: 0, id: 'what-is-trading', tag: 'PHASE 0 · CH 41', title: 'Why Does Trading Exist?', desc: 'Price discovery, capital allocation, risk transfer — the economic purpose of markets.', xp: 60, time: '15 min', diff: 'beginner' },
  { phase: 0, id: 'perfect-timing', tag: 'PHASE 0 · CH 42', title: 'The Perfect Timing Myth', desc: 'Nobody times the market perfectly. What actually works: DCA, quality, patience.', xp: 70, time: '15 min', diff: 'beginner' },
  { phase: 1, id: 'bonds', tag: 'PHASE 1 · CH 43', title: 'Bonds & Fixed Income', desc: 'Government bonds, corporate bonds, yield, duration. The asset class that moves trillions.', xp: 100, time: '25 min', diff: 'intermediate' },
  { phase: 1, id: 'etfs-mf', tag: 'PHASE 1 · CH 44', title: 'ETFs vs Mutual Funds vs SIPs', desc: 'Which investment vehicle suits your goals? Costs, liquidity, tax efficiency compared.', xp: 90, time: '20 min', diff: 'beginner' },
  { phase: 1, id: 'insurance-basics', tag: 'PHASE 1 · CH 45', title: 'Insurance & Risk Transfer', desc: 'Term life, health, disability — why insurance is the foundation of a financial plan.', xp: 70, time: '15 min', diff: 'beginner' },
  { phase: 2, id: 'types-of-markets', tag: 'PHASE 2 · CH 46', title: 'All Market Types Explained', desc: 'Spot, futures, options, forex, crypto, commodities — what makes each unique.', xp: 120, time: '25 min', diff: 'intermediate' },
  { phase: 2, id: 'market-hours', tag: 'PHASE 2 · CH 47', title: 'Market Sessions & Timing', desc: 'When different markets are most active and why it matters for your trading.', xp: 80, time: '15 min', diff: 'beginner' },
  { phase: 4, id: 'drawdown', tag: 'PHASE 4 · CH 48', title: 'Drawdown Management', desc: 'Understanding and surviving drawdowns. The psychology and math of recovery.', xp: 180, time: '30 min', diff: 'intermediate' },
  { phase: 6, id: 'warren-buffett', tag: 'PHASE 6 · CH 49', title: 'The Warren Buffett Framework', desc: 'Circle of competence, margin of safety, moats — the complete Buffett method.', xp: 230, time: '40 min', diff: 'advanced' },
  { phase: 12, phaseTitle: 'REAL WORLD EXPERIENCE', phaseSubtitle: 'Years · No shortcut exists', id: 'real-experience', tag: 'PHASE 12 · CH 50', title: 'Real World Trading Experience', desc: 'Bull markets, bear markets, crashes, euphoria — what you can only learn by doing.', xp: 400, time: '20 min', diff: 'advanced' },
];

// Merge all chapters
const ALL_CHAPTERS = [...CHAPTERS, ...EXTRA_CHAPTERS];

const MARKET_SYMBOLS = [
  { symbol: 'NIFTY 50', name: 'India Large Cap', base: 22400, vol: 0.008, flag: '🇮🇳' },
  { symbol: 'SENSEX', name: 'BSE Index', base: 73800, vol: 0.008, flag: '🇮🇳' },
  { symbol: 'BTC/USD', name: 'Bitcoin', base: 97200, vol: 0.025, flag: '₿' },
  { symbol: 'ETH/USD', name: 'Ethereum', base: 3420, vol: 0.028, flag: '⟠' },
  { symbol: 'GOLD', name: 'XAU/USD', base: 2680, vol: 0.005, flag: '🟡' },
  { symbol: 'SILVER', name: 'XAG/USD', base: 30.2, vol: 0.012, flag: '⚪' },
  { symbol: 'CRUDE OIL', name: 'WTI Crude', base: 82.4, vol: 0.01, flag: '🛢️' },
  { symbol: 'EUR/USD', name: 'Euro/Dollar', base: 1.0842, vol: 0.003, flag: '🇪🇺' },
  { symbol: 'USD/INR', name: 'Dollar/Rupee', base: 83.4, vol: 0.002, flag: '💵' },
  { symbol: 'S&P 500', name: 'US Large Cap', base: 5280, vol: 0.006, flag: '🇺🇸' },
  { symbol: 'NASDAQ', name: 'US Tech Index', base: 18400, vol: 0.009, flag: '💻' },
  { symbol: 'BANK NIFTY', name: 'India Banks', base: 48200, vol: 0.01, flag: '🏦' },
];

// WikiWiz — DATA.JS

const MARKET_EVENTS = [
  { id:'covid2020', date:'MARCH 2020', title:'2020 COVID CRASH', drop:'-34% in 33 days', tag:'BLACK SWAN', body:'On March 16, 2020, the Dow fell 2,997 points — the largest single-day point drop ever. The S&P 500 collapsed from 3,386 to 2,237 in 33 days.', why:'Institutions sold everything to meet margin calls. Retail traders panic-sold at the exact bottom.', lesson:'⚡ LESSON: Panic selling locks in losses. The COVID bottom was the best buying opportunity of the decade. Those who held or bought were rewarded 100%+ within a year.', recovery:'Recovered in 148 days. S&P hit all-time highs by August 2020.' },
  { id:'btc2022', date:'NOV 2022', title:'FTX COLLAPSE', drop:'BTC: -75% peak to trough', tag:'FRAUD', body:'FTX — valued at $32 billion — collapsed in 72 hours. $8 billion in customer funds vanished. Bitcoin fell from $69,000 to $15,500.', why:'Institutions with insider knowledge sold weeks before. On-chain data showed massive outflows. Retail traders who trusted "too big to fail" lost everything.', lesson:'⚡ LESSON: Not your keys, not your coins. Never trust centralised custody. Watch on-chain flows.', recovery:'BTC recovered to $70,000+ by early 2024.' },
  { id:'nifty2026', date:'JAN 2026', title:'2026 NIFTY CORRECTION', drop:'-18% in 6 weeks', tag:'CORRECTION', body:'Nifty 50 corrected sharply from 26,000 as global risk-off, FII outflows, and rupee depreciation triggered a cascade. Mid and small caps fell 30-40%.', why:'FIIs pulled out ₹2.5 lakh crore over 3 months. Overleveraged retail positions were wiped. Algos intensified the sell-off.', lesson:'⚡ LESSON: Track FII DII data daily. When FIIs leave Indian markets, retail gets crushed.', recovery:'Market found support at 21,800. Gradual recovery underway.' },
  { id:'dotcom2000', date:'2000–2002', title:'DOT-COM BUST', drop:'NASDAQ: -78%', tag:'BUBBLE', body:'NASDAQ fell from 5,048 to 1,114 — a 78% decline. $5 trillion in market cap evaporated. Companies with no revenue traded at absurd valuations.', why:'Venture capital dried up. Revenue multiples of 100x were fantasy. Institutions quietly exited months before the peak.', lesson:'⚡ LESSON: "This time is different" is always wrong. Fundamentals always matter, eventually.', recovery:'NASDAQ took 15 years to reclaim its 2000 peak.' },
];

const BADGES = [
  { id:'first_blood', icon:'🩸', name:'FIRST BLOOD', desc:'Complete your first chapter', chapReq:1 },
  { id:'chart_reader', icon:'📊', name:'CHART READER', desc:'Complete 5 chapters', chapReq:5 },
  { id:'risk_guard', icon:'🛡️', name:'RISK GUARDIAN', desc:'Complete Risk Management phase', phaseReq:'risk' },
  { id:'calculator', icon:'🔢', name:'THE CALCULATOR', desc:'Use 5 different calculators', calcReq:5 },
  { id:'iron_will', icon:'⚔️', name:'IRON WILL', desc:'Earn 500 XP', xpReq:500 },
  { id:'market_sage', icon:'🧙', name:'MARKET SAGE', desc:'Complete 15 chapters', chapReq:15 },
  { id:'the_oracle', icon:'🔮', name:'THE ORACLE', desc:'Earn 2000 XP', xpReq:2000 },
  { id:'apex_trader', icon:'👑', name:'APEX TRADER', desc:'Complete 30+ chapters', chapReq:30 },
];

const RANKS = [
  { name:'🥚 ROOKIE', minXP:0 },
  { name:'📈 CHARTIST', minXP:100 },
  { name:'🎯 ANALYST', minXP:300 },
  { name:'⚡ TRADER', minXP:600 },
  { name:'🔱 STRATEGIST', minXP:1200 },
  { name:'🧠 QUANT', minXP:2000 },
  { name:'👑 APEX TRADER', minXP:3500 },
];

const MARKET_SYMBOLS = [
  { symbol:'NIFTY 50', name:'India Large Cap', base:22400, vol:0.008, flag:'🇮🇳', tv:'NSE:NIFTY' },
  { symbol:'SENSEX', name:'BSE Index', base:73800, vol:0.008, flag:'🇮🇳', tv:'BSE:SENSEX' },
  { symbol:'BTC/USD', name:'Bitcoin', base:97200, vol:0.025, flag:'₿', tv:'BINANCE:BTCUSDT' },
  { symbol:'ETH/USD', name:'Ethereum', base:3420, vol:0.028, flag:'⟠', tv:'BINANCE:ETHUSDT' },
  { symbol:'GOLD', name:'XAU/USD', base:2680, vol:0.005, flag:'🥇', tv:'OANDA:XAUUSD' },
  { symbol:'SILVER', name:'XAG/USD', base:30.2, vol:0.012, flag:'⚪', tv:'OANDA:XAGUSD' },
  { symbol:'CRUDE OIL', name:'WTI Crude', base:82.4, vol:0.01, flag:'🛢️', tv:'NYMEX:CL1!' },
  { symbol:'EUR/USD', name:'Euro/Dollar', base:1.0842, vol:0.003, flag:'🇪🇺', tv:'OANDA:EURUSD' },
  { symbol:'USD/INR', name:'Dollar/Rupee', base:83.4, vol:0.002, flag:'💵', tv:'OANDA:USDINR' },
  { symbol:'S&P 500', name:'US Large Cap', base:5280, vol:0.006, flag:'🇺🇸', tv:'SP:SPX' },
  { symbol:'NASDAQ', name:'US Tech Index', base:18400, vol:0.009, flag:'💻', tv:'NASDAQ:NDX' },
  { symbol:'BANK NIFTY', name:'India Banks', base:48200, vol:0.01, flag:'🏦', tv:'NSE:BANKNIFTY' },
];

// All chapters with FULL CONTENT
const ALL_CHAPTERS = [
  // PHASE 0 — FOUNDATIONS
  {
    phase:0, phaseTitle:'FOUNDATIONS', phaseSubtitle:'Before markets, understand money',
    id:'what-is-money', tag:'PHASE 0 · CH 1', title:'What Is Money?',
    desc:'From barter to Bitcoin — why money exists, what gives it value, and why this matters for every trade you ever make.',
    xp:50, time:'15 min', diff:'beginner',
    content:{
      intro:'Money is the most powerful technology humanity ever invented. Yet most people cannot define it. Before you trade a single rupee, you must understand what you\'re actually trading.',
      sections:[
        { h:'Why Money Was Invented', body:'Before money, people bartered — a farmer with wheat had to find someone who BOTH had what the farmer wanted AND wanted wheat. This "double coincidence of wants" made large economies impossible. Money solved this by acting as a middleman everyone trusts.' },
        { h:'The Three Jobs of Money', list:['📦 Medium of Exchange — accepted everywhere for goods and services','💎 Store of Value — keeps its worth over time (ideally!)','📏 Unit of Account — a common way to measure and price everything'] },
        { h:'What Backs Money Today?', body:'Before 1971, the US dollar was backed by gold. Since then, money is backed by NOTHING except government decree and trust — called "fiat" currency. The government says it\'s legal tender, and everyone agrees to use it. That\'s it.\n\nThis means governments CAN print unlimited money — which is exactly why inflation exists and why real assets (stocks, gold, real estate) tend to rise in price over time.' },
        { h:'Why Traders Need to Understand This', body:'When central banks print money (called Quantitative Easing or QE), the money supply expands. More money chasing the same goods = prices rise = inflation. This is why smart investors hold assets, not just cash. Stocks, gold, real estate — these protect your wealth from being eroded by inflation.' },
        { quote:'"In the absence of the gold standard, there is no way to protect savings from confiscation through inflation." — Alan Greenspan' },
        { h:'Bitcoin — Hard Money for the Digital Age', body:'Bitcoin was designed with a fixed supply of 21 million coins. Unlike rupees or dollars, no government can print more Bitcoin. This scarcity is called "hardness" — and it\'s why institutions increasingly hold BTC as a store of value alongside gold.' },
        { warn:'⚠️ Understanding money is foundational — but Bitcoin is extremely volatile. This is education, not advice.' }
      ],
      chart:'money_supply',
      key_takeaways:['Money is a social technology, not a natural resource','Fiat money can be inflated away by governments printing more','Hard assets (gold, BTC, stocks) protect wealth from inflation','Central bank decisions about money supply move ALL markets']
    }
  },
  {
    phase:0, id:'what-is-stock', tag:'PHASE 0 · CH 2', title:'What Is a Stock?',
    desc:'Tiny ownership stakes in real companies. Voting rights. Dividends. How they actually work.',
    xp:50, time:'12 min', diff:'beginner',
    content:{
      intro:'A stock is a tiny ownership stake in a real company. When you buy one share of Reliance, you literally own a microscopic piece of Reliance Industries — its factories, patents, cash, and future profits.',
      sections:[
        { h:'Why Companies Issue Stock', body:'Companies need money to grow. Instead of borrowing from a bank, they can sell ownership stakes to the public. Early investors in companies like Infosys or TCS became multi-millionaires as those companies grew. The company gets cash to expand; investors get a share of future profits.' },
        { h:'Common vs Preferred Stock', list:['Common Stock — Voting rights on company decisions, potential for unlimited upside, last to get paid if company goes bankrupt','Preferred Stock — No voting rights, gets paid fixed dividends first, capped upside but safer than common stock'] },
        { h:'What Makes Stock Prices Move?', body:'Price reflects what people BELIEVE the company will earn in the future. Good news (earnings beat, new product launch) → buyers rush in → price rises. Bad news (earnings miss, scandal) → sellers rush out → price falls.\n\nShort term: prices follow emotions (fear and greed)\nLong term: prices follow actual earnings' },
        { formula:'Stock Price ≈ EPS × P/E Ratio\n(Earnings Per Share × Price-to-Earnings Multiple)\n\nExample: TCS earns ₹100/share, P/E is 25 → Fair price ≈ ₹2,500' },
        { h:'Dividends', body:'Some companies share profits directly with shareholders quarterly or annually — called a dividend. Mature companies like Coal India pay reliable dividends. Growth companies like Zomato reinvest profits to expand instead.' },
        { quote:'"Owning a share of a business is the most direct way to participate in economic growth." — Peter Lynch' }
      ],
      chart:'stock_price_chart',
      key_takeaways:['Stock = real ownership in a real business','Short-term price = sentiment; Long-term price = earnings','Dividends are your share of actual profits','Higher potential return = higher short-term volatility']
    }
  },
  {
    phase:0, id:'stock-market', tag:'PHASE 0 · CH 3', title:'The Stock Market',
    desc:'NSE, BSE, NYSE — what they are, how they actually work, who controls price.',
    xp:60, time:'18 min', diff:'beginner',
    content:{
      intro:'The stock market is not one place — it\'s a global network of exchanges, brokers, market makers and algorithms connected in real time. Understanding its structure removes the mystery and helps you trade smarter.',
      sections:[
        { h:'Primary vs Secondary Market', body:'Primary Market: Where companies first sell shares to the public (IPO — Initial Public Offering). You buy directly from the company, giving it fresh capital to grow.\n\nSecondary Market: Where investors trade shares among each other AFTER the IPO. This is what people call "the stock market" — NSE, BSE, NYSE, NASDAQ. The company gets no money here; it\'s just investors trading with each other.' },
        { h:'India\'s Key Exchanges', list:['NSE (National Stock Exchange) — India\'s largest by volume. Home of Nifty 50 index. Over ₹80,000 crore traded daily.','BSE (Bombay Stock Exchange) — World\'s oldest exchange (1875). 5,000+ listed companies. Home of Sensex index.','MCX — For commodity trading: gold, silver, crude oil, natural gas'] },
        { h:'How Your Trade Gets Executed', body:'Step 1: You click "Buy" on Zerodha/Groww\nStep 2: Your order goes to your broker\nStep 3: Broker routes to NSE/BSE\nStep 4: Exchange matches you with a seller\nStep 5: Settlement happens in T+1 (next working day)\n\nThe price is set by the ORDER BOOK — a live database of all pending buy and sell orders.' },
        { h:'Who Are the Players?', list:['Retail Traders — Individuals like you. Least information, most emotional, smallest size.','FIIs (Foreign Institutional Investors) — Biggest movers in Indian markets. Track their data daily on NSE website.','DIIs (Domestic Institutions) — Mutual funds, insurance companies. Often buy when FIIs sell.','HFTs (High Frequency Traders) — Algorithms making millions of trades per second. Legal but controversial.','Market Makers — Always quote buy and sell prices. Profit from the spread between them.'] },
        { warn:'⚠️ Retail traders have every disadvantage: less information, slower execution, more emotional. Your edge is PATIENCE and LONG TIME HORIZONS — use them.' },
        { quote:'"The stock market is filled with individuals who know the price of everything but the value of nothing." — Philip Fisher' }
      ],
      chart:'order_flow_chart',
      key_takeaways:['Exchanges are just matching engines for buyers and sellers','FII flows dominate Indian market direction — track them daily','You\'re trading against institutions with more information and faster systems','Understanding structure makes you a smarter participant']
    }
  },
  // PHASE 1
  {
    phase:1, phaseTitle:'FINANCIAL LITERACY', phaseSubtitle:'2–4 weeks · The language of money',
    id:'compound-interest', tag:'PHASE 1 · CH 4', title:'Compound Interest: The 8th Wonder',
    desc:'Why starting at 18 beats investing 10x more at 35. The maths that Einstein called the most powerful force in the universe.',
    xp:70, time:'15 min', diff:'beginner',
    content:{
      intro:'Compound interest is the snowball effect of money. Your interest earns interest. That interest earns more interest. Over decades, small amounts become extraordinary wealth.',
      sections:[
        { h:'Simple vs Compound Interest — The Difference', body:'Simple Interest: You earn interest only on your original amount. ₹1,00,000 at 10% = ₹10,000/year. Always ₹10,000/year.\n\nCompound Interest: You earn interest on your growing total. Year 1: ₹10,000. Year 2: ₹11,000. Year 3: ₹12,100. It keeps growing.' },
        { formula:'Compound Formula: A = P × (1 + r/n)^(n×t)\n\nA = Final amount | P = Principal | r = Rate | n = Times/year | t = Years\n\nExample: ₹1,00,000 at 12% for 10 years:\nA = 1,00,000 × (1.12)^10 = ₹3,10,585 🚀' },
        { h:'The Rule of 72 — Mental Maths', body:'Divide 72 by your annual return to find years to double:\n\n• 6% return → 72÷6 = 12 years to double\n• 12% return → 72÷12 = 6 years to double  \n• 24% return → 72÷24 = 3 years to double\n\nNifty 50 has historically returned ~12% CAGR. Your money doubles every 6 years in an index fund.' },
        { h:'Why Starting Early Destroys Starting Late', body:'Rohan starts at age 22, invests ₹5,000/month, stops at 32 (10 years, ₹6 lakh invested)\nPriya starts at age 32, invests ₹5,000/month, continues to 60 (28 years, ₹16.8 lakh invested)\n\nAt age 60 at 12% CAGR:\nRohan: ₹5.8 CRORE 🏆\nPriya: ₹2.3 crore\n\nRohan invested LESS and won because TIME is the multiplier.' },
        { quote:'"Compound interest is the eighth wonder of the world. He who understands it, earns it. He who doesn\'t, pays it." — Albert Einstein' },
        { warn:'⚠️ Debt compounds AGAINST you. A credit card at 36% APR: ₹50,000 becomes ₹6.8 lakh in 10 years if unpaid. Compound interest is a superpower — make sure it\'s working for you, not against you.' }
      ],
      chart:'compound_growth',
      key_takeaways:['Start investing TODAY, even small amounts','Reinvest all dividends to maximise compounding','The Rule of 72 is your instant mental calculator','Debt is compound interest working against you — minimise it']
    }
  },
  {
    phase:1, id:'reading-financials', tag:'PHASE 1 · CH 5', title:'Reading Financial Statements',
    desc:'Balance sheets, income statements, cash flows. Decode company health like a professional fund manager.',
    xp:100, time:'30 min', diff:'intermediate',
    content:{
      intro:'Every public company must publish financial statements quarterly. These are the X-rays of a business. Most retail traders never read them — that ignorance is your opportunity.',
      sections:[
        { h:'The Balance Sheet — Snapshot of a Business', body:'Shows what the company OWNS (assets) vs what it OWES (liabilities). The difference is shareholders\' equity — what belongs to you as an owner.\n\nAssets = Liabilities + Shareholders Equity\n\nKey questions: Is debt growing faster than assets? Does the company have enough cash to survive a downturn?' },
        { formula:'Current Ratio = Current Assets ÷ Current Liabilities\n✅ >1.5 = healthy  ⚠️ <1.0 = potential trouble\n\nDebt/Equity Ratio = Total Debt ÷ Shareholders Equity\n✅ <1.0 = conservative  🚨 >3.0 = highly leveraged' },
        { h:'The Income Statement — Performance Over Time', body:'Shows revenue, costs, and profits over a period. What to look for:\n\n• Gross Margin: (Revenue - Cost of Goods) / Revenue — is the core business profitable?\n• Operating Margin: Operating Profit / Revenue — how efficient is management?\n• Net Margin: Net Profit / Revenue — bottom line efficiency\n\nTRENDS matter more than absolute numbers. Shrinking margins = danger ahead.' },
        { h:'The Cash Flow Statement — Reality Check', body:'Profits can be manipulated through accounting tricks. Cash cannot. A company can show accounting profit while actually running out of cash.\n\nFree Cash Flow (FCF) = Operating Cash Flow - Capital Expenditure\n\nFCF is the real money a business generates. Warren Buffett calls this "owner earnings" and it\'s what he focuses on most.' },
        { h:'Key Ratios Every Investor Must Know', list:['P/E Ratio — Price ÷ Earnings Per Share. How many years of earnings you pay for. Industry relative.','ROE — Net Profit ÷ Shareholders Equity. How efficiently equity generates profit. >15% is good.','EPS Growth — Is earnings per share growing year over year?','Operating Cash Flow Growth — Is actual cash generation increasing?'] },
        { quote:'"Accounting is the language of business, and you have to be as comfortable with that language as your mother tongue." — Warren Buffett' }
      ],
      chart:'financial_chart',
      key_takeaways:['Always check CASH FLOW, not just profit — profits can be faked, cash cannot','Current Ratio and D/E reveal financial health at a glance','Growing margins over time = sustainable competitive advantage','Compare ratios to industry peers, never in isolation']
    }
  },
  // PHASE 2
  {
    phase:2, phaseTitle:'MARKET STRUCTURE', phaseSubtitle:'2–3 weeks · How markets really work',
    id:'market-structure', tag:'PHASE 2 · CH 6', title:'Market Structure & Liquidity',
    desc:'Price moves because of liquidity imbalance. Not RSI. Not candles. Understanding the order book is understanding price.',
    xp:120, time:'25 min', diff:'intermediate',
    content:{
      intro:'Most traders study indicators and wonder why they fail. The answer: they are looking at EFFECTS, not CAUSES. Price moves because of one thing — order imbalance. When buyers are more aggressive than sellers, price rises. That\'s it.',
      sections:[
        { h:'The Order Book — Where Price Is Made', body:'Every exchange maintains a real-time order book:\n\nBID SIDE (buyers): All pending buy orders at various price levels\nASK SIDE (sellers): All pending sell orders at various price levels\n\n"Current price" = the last transaction price.\n\nWhen an aggressive buyer hits the ask → price rises\nWhen an aggressive seller hits the bid → price falls' },
        { h:'Liquidity — The Water Markets Swim In', body:'High liquidity: You can buy ₹1 crore of Reliance without moving price significantly\nLow liquidity: You buy ₹10 lakh of a small-cap and price jumps 5%\n\nLiquidity dries up in crises — which is WHY crashes are so fast and violent. When everyone wants out simultaneously, there are no buyers, and prices gap down catastrophically.' },
        { h:'Bid-Ask Spread', list:['Bid = Highest price buyers will pay','Ask = Lowest price sellers will accept','Spread = Ask - Bid (your transaction cost)','Tight spread = high liquidity = cheaper to trade','Wide spread = low liquidity = expensive to trade, avoid!'] },
        { formula:'Your True Cost Per Trade:\nCommission + Spread + Slippage\n\nSlippage = (Actual Fill - Expected Price) / Expected Price × 100%\n\nFor small traders this is small. For institutions, minimising slippage is a science.' },
        { h:'Why Institutions Move Markets', body:'When a mutual fund buys ₹500 crore of Nifty stocks, they cannot do it in one trade — it would move the price against them. They must split orders over days or weeks, hide their intent, use algorithms.\n\nThis is WHY technical patterns work — they are often just the footprints of institutional accumulation or distribution.' },
        { warn:'⚠️ High Frequency Trading firms see your order before it fills (legally). Use LIMIT orders, not market orders. Never trade illiquid stocks — the spread alone can eat your profit.' }
      ],
      chart:'order_book_chart',
      key_takeaways:['Price = result of order imbalance, nothing else','Liquidity determines how easily you enter and exit','Institutions move markets — learn to read their footprints','Always use limit orders; market orders give away money on spread']
    }
  },
  // PHASE 3 — TECHNICAL
  {
    phase:3, phaseTitle:'TECHNICAL ANALYSIS', phaseSubtitle:'2–3 months · Reading the chart language',
    id:'candlesticks', tag:'PHASE 3 · CH 7', title:'Candlestick Mastery',
    desc:'From basic candles to the 12 most powerful patterns. Understand what every candle says about the battle between buyers and sellers.',
    xp:150, time:'35 min', diff:'intermediate',
    content:{
      intro:'Japanese rice traders invented candlestick charts in the 1700s. Each candle tells a complete story of the battle between buyers and sellers during a specific time period. Learning to read this language is like learning to hear the market\'s heartbeat.',
      sections:[
        { h:'Anatomy of a Single Candle', body:'Every candlestick has 4 data points:\n\n🟢 OPEN — Where price started the period\n📈 HIGH — The highest price reached\n📉 LOW — The lowest price reached\n🔴 CLOSE — Where price ended the period\n\nGREEN candle = Close > Open (buyers won the period)\nRED candle = Close < Open (sellers won the period)\n\nThe BODY shows the open-to-close range. The WICKS show how far price extended but was REJECTED.' },
        { h:'Reading Wicks — The Most Important Skill', body:'A long UPPER wick means: Price tried to go higher but sellers aggressively pushed it back down. The top was REJECTED.\n\nA long LOWER wick means: Price tried to go lower but buyers aggressively pushed it back up. The bottom was REJECTED.\n\nBIG wicks = STRONG rejection = potential reversal area' },
        { h:'The 6 Most Powerful Bullish Patterns', list:['🔨 Hammer — Small body at top, long lower wick. Buyers rejected lower prices. Strong at support.','🟢 Bullish Engulfing — Large green candle fully engulfs previous red candle. Complete momentum shift.','🌅 Morning Star — Red → tiny doji → green. 3-candle reversal pattern. Very reliable.','📍 Piercing Line — Red candle, then green opens below red\'s low but closes above its midpoint.','⚡ Doji at Support — Indecision at key level. Neither side won. Often precedes reversal.','3 White Soldiers — Three consecutive green candles closing at highs. Powerful uptrend start.'] },
        { h:'The 6 Most Powerful Bearish Patterns', list:['⭐ Shooting Star — Small body at bottom, long upper wick. Sellers rejected higher prices. Strong at resistance.','🔴 Bearish Engulfing — Large red candle swallows previous green. Sellers took complete control.','🌆 Evening Star — Green → tiny doji → red. 3-candle top reversal. Mirror of Morning Star.','🌑 Dark Cloud Cover — Green candle, then red opens above green\'s high but closes below its midpoint.','👤 Hanging Man — Looks like hammer but appears at TOP of uptrend. Warning, not confirmation.','3 Black Crows — Three consecutive red candles at lows. Powerful downtrend beginning.'] },
        { warn:'🚨 CRITICAL: NO CANDLE PATTERN WORKS ALONE. You need: (1) Where is it on the chart? (2) Is it at a key support/resistance level? (3) Does volume confirm? A hammer in the middle of nowhere means nothing.' },
        { quote:'"A candlestick chart is a picture of market psychology. Every candle is a referendum on who controlled price that period." — Steve Nison' }
      ],
      chart:'candlestick_patterns',
      key_takeaways:['CONTEXT beats pattern — where on the chart matters most','Long wicks = strong rejection = potential reversal','Volume must confirm the pattern or it\'s weak','Combine with support/resistance for high-probability setups']
    }
  },
  {
    phase:3, id:'support-resistance', tag:'PHASE 3 · CH 8', title:'Support & Resistance',
    desc:'The single most important concept in all of technical analysis. Where price memory creates predictable zones.',
    xp:150, time:'30 min', diff:'intermediate',
    content:{
      intro:'Support and Resistance are the foundation of every technical trader\'s framework. These are price levels where buying or selling pressure is strong enough to stop or reverse the trend. Every serious trader knows these levels before they open a trade.',
      sections:[
        { h:'Why Do These Levels Form?', body:'Support and resistance exist because of PRICE MEMORY:\n\n• Traders remember significant past price levels (previous highs, lows, round numbers)\n• Large institutions place massive orders at these levels\n• Stop-losses cluster just BELOW support — creating extra selling fuel if broken\n• Take-profit orders cluster NEAR resistance — creating selling pressure\n\nThese are self-fulfilling prophecies because everyone watches the same levels.' },
        { h:'Types of Support & Resistance', list:['📍 Horizontal S/R — Previous swing highs and lows. Most reliable type.','〰️ Dynamic S/R — Moving averages (50MA, 200MA) act as floating support/resistance.','📐 Trendline S/R — Connect swing highs or lows to form channels.','🔵 Psychological Levels — Round numbers: ₹1000, $50,000 BTC. Everyone watches these.','📊 Previous Day High/Low — Critical for intraday. Respected by algorithms.','⬜ Gap Levels — Price gaps often act as S/R after the fact.'] },
        { h:'The Role Reversal Principle ⭐', body:'This is the MOST POWERFUL concept in technical analysis:\n\nWhen support BREAKS → it becomes RESISTANCE\nWhen resistance BREAKS → it becomes SUPPORT\n\nWHY? Traders who bought at support and are now in a loss will SELL when price returns to their entry (to get out at breakeven) — creating new resistance at the old support.\n\nThis creates predictable, repeatable setups that work across all markets and all timeframes.' },
        { formula:'STRENGTH OF A LEVEL is determined by:\n1. Tests — More touches = stronger (3+ tests is strong)\n2. Volume — High volume at the level = institutional interest\n3. Recency — Recent levels are more respected than old ones\n4. Bounce strength — A strong bounce = a strong level' },
        { h:'How to Trade Support/Resistance', body:'Best setups: Price returns to S/R level AFTER confirming role reversal.\n\nEntry: At the edge of the S/R zone\nStop: Below the zone (not at the line — give it room)\nTarget: Next S/R level in the direction of trade\n\nNEVER trade in the middle of nowhere — only at key levels.' },
        { warn:'⚠️ Support/Resistance are ZONES, not precise lines. Price often overshoots slightly before reversing — this is institutions sweeping stops before the real move.' }
      ],
      chart:'support_resistance',
      key_takeaways:['S/R are zones of price memory, not magic lines','Role Reversal: broken support → new resistance (and vice versa)','More tests + higher volume = stronger level','Only trade AT key levels; ignore everything in between']
    }
  },
  {
    phase:3, id:'price-action', tag:'PHASE 3 · CH 9', title:'Pure Price Action Trading',
    desc:'Trade with only price. No indicators cluttering your chart. The cleanest, most honest approach to markets.',
    xp:180, time:'40 min', diff:'intermediate',
    content:{
      intro:'Price action trading means reading ONLY the raw price movement — no RSI, no MACD, no moving averages. Just price. This is how professional traders operated for centuries before modern software, and it still works because markets are driven by human psychology which doesn\'t change.',
      sections:[
        { h:'Market Structure — Trends and Reversals', body:'Markets move in waves. Learn to identify these structure points:\n\n📈 UPTREND = Higher Highs (HH) + Higher Lows (HL)\n📉 DOWNTREND = Lower Highs (LH) + Lower Lows (LL)\n➡️ RANGE = Price bouncing between same S/R levels\n\nA TREND CHANGE is ONLY confirmed when a previous structure point is violated. Don\'t call reversals early.' },
        { h:'The Pin Bar — Most Reliable Signal', body:'A pin bar has:\n• A long wick in one direction (rejection)\n• A small "body" (open and close are close together)\n• Appears at a KEY support or resistance level\n\nBearish pin at resistance = sellers aggressively rejected higher prices\nBullish pin at support = buyers aggressively rejected lower prices\n\nThis is one of the highest-probability setups in all of trading.' },
        { h:'Inside Bars — Energy Building', body:'An inside bar forms COMPLETELY within the range of the previous candle (the "mother bar"). This means:\n• Price is compressing\n• Volatility is decreasing\n• Energy is building\n\nWhen price breaks out of the mother bar range → strong directional move follows.\n\nBest when: After a clear trend, at a key level, with volume declining during the inside bar.' },
        { h:'The False Break (Stop Hunt)', body:'This is one of the most profitable setups:\n\n1. Obvious support that EVERYONE can see\n2. Price breaks below it (triggering retail stop-losses)\n3. Then immediately reverses BACK above it\n4. The "break" was fake — institutions used it to fill their buy orders cheaply\n\nEntry: Long when price closes BACK above the support\nStop: Below the false break low\nThis is essentially trading WITH institutions against trapped retail.' },
        { quote:'"The best trades are the ones everyone sees coming, but the entry is where most are afraid to enter." — Al Brooks' }
      ],
      chart:'price_action_chart',
      key_takeaways:['Market structure (HH/HL) defines the trend — respect it','Trade WITH the higher timeframe trend, not against it','False breaks are manufactured by institutions to fill orders','Fewer high-quality setups beat many low-quality ones']
    }
  },
  {
    phase:3, id:'indicators', tag:'PHASE 3 · CH 10', title:'Indicators: Tools Not Oracles',
    desc:'RSI, MACD, Bollinger Bands, VWAP — what they actually measure and how to use them correctly.',
    xp:140, time:'30 min', diff:'intermediate',
    content:{
      intro:'Indicators are derived FROM price — they show you the past in a different visual form. They lag. They are useful CONFIRMATION tools, not prediction tools. Understanding exactly what they measure changes everything about how you use them.',
      sections:[
        { h:'RSI — Relative Strength Index', body:'RSI measures the SPEED and MAGNITUDE of recent price moves on a 0–100 scale.\n\nCommon (wrong) use: Buy below 30, sell above 70\nProfessional use: RSI DIVERGENCE\n\nDivergence: Price makes a new HIGH but RSI makes a LOWER high → momentum is weakening → potential reversal. This is far more powerful than using overbought/oversold alone.' },
        { formula:'RSI = 100 − [100 / (1 + RS)]\nRS = Average Gain / Average Loss over 14 periods\n\nPro tip: RSI > 50 = bullish momentum. RSI < 50 = bearish momentum. Use the 50 line as trend filter.' },
        { h:'MACD — Moving Average Convergence Divergence', body:'Shows momentum by comparing two EMAs (usually 12 and 26 period).\n\nWhen the MACD line crosses ABOVE the signal line = momentum shifting bullish\nWhen MACD crosses BELOW signal line = momentum shifting bearish\n\nThe HISTOGRAM shows acceleration — when it\'s shrinking (even if still positive), momentum is fading.\n\nBest use: MACD divergence on the daily chart for swing trades.' },
        { h:'VWAP — The Institutional Benchmark', body:'Volume Weighted Average Price = the average price weighted by volume. This is how institutional traders measure their execution quality.\n\n• Price ABOVE VWAP = bullish intraday bias\n• Price BELOW VWAP = bearish intraday bias\n• First VWAP reclaim after opening gap down = strong long entry\n\nVWAP resets every day. Most useful for intraday (day trading).' },
        { h:'Bollinger Bands — Volatility Measurement', body:'Two standard deviation bands around a moving average.\n\nWhen bands NARROW dramatically (the squeeze) → volatility is compressing → an EXPLOSIVE move is coming soon (direction unknown — use other signals to determine which way).\n\nWhen price tags the UPPER band repeatedly → strong uptrend, not a sell signal alone.' },
        { warn:'⚠️ Using 5+ indicators = analysis paralysis. Every indicator will eventually conflict with another, giving you an excuse not to trade. Use 1-2 max. One deeply understood indicator beats five poorly understood ones.' }
      ],
      chart:'indicators_chart',
      key_takeaways:['Indicators CONFIRM, they don\'t PREDICT — they always lag','RSI divergence is far more powerful than overbought/oversold','VWAP is the most institutional indicator — respect it','Less indicators + more price action = clearer thinking']
    }
  },
  // PHASE 4 — RISK
  {
    phase:4, phaseTitle:'RISK MANAGEMENT', phaseSubtitle:'THE MOST IMPORTANT PHASE',
    id:'position-sizing', tag:'PHASE 4 · CH 11', title:'Position Sizing & The 2% Rule',
    desc:'The single rule that separates professionals from blown accounts. Get this wrong and nothing else matters.',
    xp:200, time:'25 min', diff:'intermediate',
    content:{
      intro:'You can be right 40% of the time and still make money. You can be right 60% of the time and still blow your account. The ONLY difference is position sizing. This is the most important chapter in this entire curriculum — not candlesticks, not indicators, not smart money. THIS.',
      sections:[
        { h:'The 2% Rule — The Golden Rule of Trading', body:'Never risk more than 2% of your total trading capital on a single trade.\n\nWith ₹1,00,000:\n• Maximum loss allowed = ₹2,000 per trade\n• NOT your position size — your MAXIMUM LOSS if you\'re wrong\n\nWith the 2% rule, you can lose 50 consecutive trades and still have 36% of your capital left. This buys you time to learn and adjust. Without it, 5 bad trades can end your account.' },
        { formula:'POSITION SIZE FORMULA:\nMax Risk = Account × Risk%\nRisk Per Share = |Entry − Stop Loss|\nPosition Size = Max Risk ÷ Risk Per Share\n\nExample:\nAccount: ₹1,00,000 | Risk: 2% = ₹2,000\nEntry: ₹500 | Stop: ₹480 | Risk/share: ₹20\nPosition = ₹2,000 ÷ ₹20 = 100 shares ✓' },
        { h:'Risk-to-Reward Ratio — Non-Negotiable', body:'Always know your reward potential vs risk BEFORE entering ANY trade.\n\n• 1:1 R:R → Need >50% win rate to be profitable\n• 2:1 R:R → Need >33% win rate to be profitable ✅\n• 3:1 R:R → Need >25% win rate to be profitable 🏆\n\nMost retail traders take 0.5:1 trades (risking more than they can gain). This is why most retail traders lose. Target minimum 2:1 R:R always.' },
        { h:'The Brutal Mathematics of Drawdown', body:'This is why large losses are catastrophic:\n\n• 10% loss → Need 11.1% gain to recover\n• 25% loss → Need 33% gain to recover ⚠️\n• 50% loss → Need 100% gain to recover 🚨\n• 75% loss → Need 300% gain to recover 💀\n\nA 50% loss requires you to DOUBLE your remaining capital just to get back to zero. That\'s why protecting capital is always priority #1.' },
        { warn:'🚨 BIGGEST MISTAKE: Increasing position size after losses to "make it back." This is how small losses become account-destroying losses. After any loss, REDUCE size. Confidence must be rebuilt, not bought.' },
        { quote:'"Risk management is the most overlooked aspect of trading. The goal is never to make money — it\'s to not lose it." — Paul Tudor Jones' }
      ],
      chart:'position_sizing_chart',
      key_takeaways:['Never risk more than 2% per trade — ever','Calculate position size BEFORE you enter, not after','Target minimum 2:1 R:R on every setup','After losses, REDUCE size — not increase it']
    }
  },
  // PHASE 5 — PSYCHOLOGY
  {
    phase:5, phaseTitle:'TRADING PSYCHOLOGY', phaseSubtitle:'Lifelong · The inner game',
    id:'psychology', tag:'PHASE 5 · CH 12', title:'The Psychology of Trading',
    desc:'Fear, greed, FOMO, revenge trading. Why your brain is your biggest enemy and practical tools to defeat it.',
    xp:180, time:'30 min', diff:'intermediate',
    content:{
      intro:'Trading is the only arena where your instincts — developed over millions of years of evolution — work systematically AGAINST you. Every natural human response to loss and gain is the WRONG response in markets.',
      sections:[
        { h:'The Loss Aversion Problem', body:'Nobel laureate Daniel Kahneman discovered: losses feel 2.5x more painful than equivalent gains feel good.\n\nLosing ₹10,000 feels worse than winning ₹10,000 feels good.\n\nThis causes traders to:\n• Hold LOSING trades too long (hoping to avoid crystallising pain)\n• Cut WINNING trades too early (taking profit to feel good)\n\nThis is the exact OPPOSITE of what makes money.' },
        { h:'FOMO — Fear Of Missing Out', body:'BTC goes from ₹20L to ₹60L. You didn\'t buy. It goes to ₹65L. Now you buy — right at the top.\n\nInstitutions CREATE FOMO deliberately. They distribute (sell) into retail FOMO buying at tops. The more media coverage, the more euphoria, the closer you are to a top.\n\nAntidote: If everyone is talking about an asset, you missed the best entry.' },
        { h:'Revenge Trading — The Spiral', body:'You take a loss. Your ego hurts. You immediately take another trade — bigger size, lower quality setup — to "make it back."\n\nThis is how a manageable ₹2,000 loss becomes a ₹20,000 account-destroying loss.\n\nThe 30-Minute Rule: After ANY loss, stop trading for 30 minutes minimum. Walk away. Reset your emotional state before taking the next trade.' },
        { h:'Practical Tools That Actually Work', list:['📋 Pre-Market Plan — Define your trades, levels, and rules BEFORE markets open. When emotional, refer to the plan.','⏱️ 30-Minute Rule — After any loss >2R, stop for 30 minutes minimum.','📏 Size Down — If a trade makes your heart race, your position is too big.','📓 Trade Journal — Write the emotion alongside the trade result. Patterns emerge over time.','🧘 Breathwork — Box breathing (4-4-4-4) during volatile markets reduces cortisol.'] },
        { h:'The Cognitive Biases Killing Your P&L', list:['Confirmation Bias — You only see information that confirms your existing trade idea.','Recency Bias — Overweighting recent events. A 3-day winning streak doesn\'t change your edge.','Anchoring — Fixated on your buy price. The market doesn\'t know or care what you paid.','Overconfidence — After a winning streak, traders take reckless size. This is when accounts blow up.'] },
        { quote:'"The most important quality for an investor is temperament, not intellect." — Warren Buffett' }
      ],
      chart:'psychology_chart',
      key_takeaways:['Your evolved brain is built for the savanna, not markets — it will mislead you','Define your trading plan before markets open; execute robotically','After losses, reduce size — confidence must be earned, not bought','A trading journal transforms emotions into data you can learn from']
    }
  },
  // PHASE 6 — FUNDAMENTAL
  {
    phase:6, phaseTitle:'FUNDAMENTAL ANALYSIS', phaseSubtitle:'Warren Buffett territory',
    id:'moats', tag:'PHASE 6 · CH 13', title:'Economic Moats & Competitive Advantage',
    desc:'Why some companies compound wealth for decades while competitors die. The foundation of value investing.',
    xp:200, time:'35 min', diff:'advanced',
    content:{
      intro:'Warren Buffett\'s most important investing concept: the economic moat. A moat is a sustainable competitive advantage that protects a business from competition — like a moat around a medieval castle. Without it, profits attract competitors, margins compress, and the business eventually dies.',
      sections:[
        { h:'The 5 Types of Economic Moats', list:['🌐 Network Effects — More users = more valuable. WhatsApp, Visa, Zerodha. Nearly impossible to displace because switching requires everyone to switch.','💰 Cost Advantage — Produce cheaper than all competitors. Walmart, Amazon Web Services. Even thin margins beat competitors who can\'t match the price.','🔒 Switching Costs — Expensive or painful to leave. SAP, Salesforce, Microsoft Office. Once embedded, customers stay forever.','💎 Intangible Assets — Brands, patents, licenses. Coca-Cola\'s brand is worth more than its plants. Asian Paints brand in India is irreplaceable.','⚖️ Efficient Scale — In limited markets, the first mover prevents profitable entry by others. Utilities, toll roads, airports.'] },
        { h:'How to Identify a Moat in the Wild', body:'Look for companies that consistently:\n• Maintain high ROE (>15%) for 10+ years across market cycles\n• Have PRICING POWER — can raise prices without losing customers\n• Show stable or improving operating margins over time\n• Earn high Returns on Invested Capital (ROIC >15%)\n\nSustained high returns = moat exists. Simple as that.' },
        { h:'Margin of Safety — Buffett\'s Protection', body:'Even a great company is a terrible investment at the wrong price.\n\nIntrinsic Value: What a business is actually worth (DCF calculation)\nMarket Price: What the stock market says it\'s worth right now\nMargin of Safety: The gap between them\n\nBuffett\'s rule: Buy ₹1 of value for ₹0.50 or less. The discount is your protection against being wrong in your analysis. The bigger the margin, the safer the bet.' },
        { formula:'Return on Equity (ROE) = Net Profit ÷ Shareholders Equity × 100%\n>15% consistently = possible moat\n>25% consistently = strong moat\n\nReturn on Invested Capital (ROIC) = NOPAT ÷ Invested Capital\n>15% = value being created\n>25% = exceptional quality business' },
        { quote:'"I\'d rather own a wonderful company at a fair price than a fair company at a wonderful price." — Warren Buffett' }
      ],
      chart:'moat_chart',
      key_takeaways:['Moats protect future earnings power from competition','Pricing power is the clearest evidence of a moat','Always buy quality businesses at a margin of safety','Hold moat companies for decades — compounding does the work']
    }
  },
  // PHASE 7 — MACRO
  {
    phase:7, phaseTitle:'MACROECONOMICS', phaseSubtitle:'The big picture everyone ignores',
    id:'macro', tag:'PHASE 7 · CH 14', title:'How Macro Moves Markets',
    desc:'Interest rates, inflation, GDP, central banks — the invisible gravitational forces that move every market on earth.',
    xp:220, time:'40 min', diff:'advanced',
    content:{
      intro:'Every stock, bond, currency, and commodity exists within a macro environment. When you ignore macro, you\'re sailing with your eyes closed. The 2022 crash, the 2020 recovery, the 2008 crisis — all were predictable from macro signals weeks or months in advance.',
      sections:[
        { h:'Interest Rates — The Gravity of Markets', body:'Central bank interest rates are the gravitational force of all financial markets:\n\n📈 RISING RATES:\n• Borrowing costs increase → corporate profits fall\n• Bond yields rise → bonds compete with stocks for investment\n• Growth stocks (high future earnings) hit hardest — their future cash flows get discounted more\n• Dollar typically strengthens\n\n📉 FALLING RATES:\n• Opposite of above. Stocks rally, especially growth stocks.\n• The 2020–2021 bull market was almost entirely rate-driven.' },
        { h:'Inflation & CPI', body:'CPI (Consumer Price Index) measures average price changes across a basket of goods.\n\nHigh Inflation (>4%): Central banks must raise rates to cool economy → markets fall\nLow Inflation (<2%): Central banks can cut rates to stimulate → markets rise\nStagflation: High inflation + low growth = worst possible scenario for stocks\n\nRBI\'s current inflation target: 4% ± 2% (India)' },
        { h:'Key Macro Relationships to Memorise', list:['Rates ↑ → Growth stocks ↓ (most sensitive to rate changes)','Rates ↓ → Gold ↑ (non-yield asset becomes relatively attractive)','Dollar ↑ → Emerging markets ↓ (USD debt becomes more expensive to service)','Oil ↑ → Inflation ↑ → Rate hike risk ↑ → Markets ↓','VIX ↑ → Fear → Support levels more likely to hold (or break violently)','Yield curve inverts → Recession in 6–18 months (100% accuracy since 1970)'] },
        { h:'The Yield Curve — Most Reliable Recession Indicator', body:'NORMAL: Long-term bond yields > short-term (makes sense — more time = more risk).\n\nINVERTED: Short-term yields EXCEED long-term. This is abnormal. It means investors expect future rates to fall (because they expect recession).\n\nEvery US recession since 1970 was preceded by an inverted yield curve. Watch the 2-Year vs 10-Year US Treasury spread. When 2Y > 10Y = danger signal.' },
        { quote:'"In macroeconomics, the difficulty is not the ideas themselves, but escaping from the old ones." — John Maynard Keynes' }
      ],
      chart:'macro_chart',
      key_takeaways:['Interest rates are gravity — they move ALL assets simultaneously','Never fight the central bank — trade with their policy direction','Yield curve inversion = most reliable recession predictor ever discovered','FII flows into India are driven by GLOBAL macro, not just Indian fundamentals']
    }
  },
  // PHASE 8 — OPTIONS
  {
    phase:8, phaseTitle:'OPTIONS & DERIVATIVES', phaseSubtitle:'Advanced · Do NOT skip earlier phases',
    id:'options-greeks', tag:'PHASE 8 · CH 15', title:'Options Greeks: The Real Language',
    desc:'Delta, Theta, Gamma, Vega — what they actually mean for your P&L and why most options traders bleed theta to death.',
    xp:300, time:'45 min', diff:'advanced',
    content:{
      intro:'Options are weapons of mass wealth creation — and destruction. The Greeks are the control panel. Most Indian retail traders lose money buying options because they don\'t understand Theta decay. That\'s like buying a car without knowing what the brake pedal does.',
      sections:[
        { h:'What Is an Options Contract?', body:'An options contract gives you the RIGHT (not obligation) to buy or sell an asset at a fixed price (strike) by a specific date (expiry).\n\nCALL option = Right to BUY\nPUT option = Right to SELL\n\nBuying options: Pay a premium upfront. Your loss is limited to that premium.\nSelling options: Collect premium. Your loss is potentially unlimited.' },
        { h:'Delta Δ — Your Directional Exposure', body:'Delta measures how much an option\'s price changes for every ₹1 move in the underlying.\n\n• ATM (at-the-money) call option: ~0.50 delta (moves ₹0.50 for every ₹1 in underlying)\n• Deep ITM call: ~1.00 delta (moves like the stock)\n• Far OTM call: ~0.05 delta (barely moves — lottery ticket)\n\nDelta is ALSO approximately the probability of expiring in-the-money.' },
        { h:'Theta Θ — The Silent Killer', body:'Theta = the amount of value your option LOSES each day, even if price doesn\'t move.\n\nATM options lose time value fastest in the last 30 days before expiry.\n\nIn India: Weekly Nifty options expire every Thursday. From Tuesday–Thursday, theta decay is MOST aggressive. Buying weekly ATM options and holding through the week = almost guaranteed loss from theta alone.\n\nThis is why option sellers (not buyers) are consistently profitable.' },
        { formula:'Option Value = Intrinsic Value + Time Value\n\nIntrinsic Value (call) = max(Spot − Strike, 0)\nTime Value = Total Premium − Intrinsic Value\n\nAt expiry: Time Value = 0 (all theta decays to zero)\n→ Your option is worth ONLY its intrinsic value at expiry' },
        { h:'Gamma Γ — Acceleration Risk', body:'Gamma measures how fast Delta changes. High gamma (near expiry, near strike) means small moves in underlying cause HUGE percentage changes in option price.\n\nThis is why weekly options can go from ₹10 to ₹500 in hours — but also from ₹500 to ₹10. Gamma is opportunity AND danger simultaneously.' },
        { h:'Vega ν — Volatility Exposure', body:'Vega measures sensitivity to Implied Volatility (IV). When fear spikes (VIX jumps), IV rises, all options premiums expand — even if price doesn\'t move.\n\nProfessional strategy: Buy options BEFORE volatility expansion (before events like earnings or RBI policy). Sell options AFTER volatility has spiked (when IV is high).' },
        { warn:'🚨 Most retail traders in India buy weekly OTM options and lose to theta decay. The odds mathematically favour sellers. Never buy options with less than 10 days to expiry unless you fully understand gamma risk.' }
      ],
      chart:'options_chart',
      key_takeaways:['Theta kills option buyers — time works against you every single day','Delta = directional position size; Gamma = risk that accelerates near expiry','IV expansion/contraction (Vega) matters as much as price direction','Selling options favours math; buying options needs strong directional conviction']
    }
  },
  // PHASE 9 — SMC
  {
    phase:9, phaseTitle:'SMART MONEY CONCEPTS', phaseSubtitle:'Institutional footprints',
    id:'smc', tag:'PHASE 9 · CH 16', title:'Smart Money Concepts (SMC)',
    desc:'Order blocks, fair value gaps, liquidity sweeps — how institutions actually accumulate and distribute positions.',
    xp:280, time:'45 min', diff:'advanced',
    content:{
      intro:'Smart Money Concepts is a framework for understanding INSTITUTIONAL order flow. Instead of memorising patterns, you learn to read WHERE and WHY large players place orders — then position yourself with them, not against them.',
      sections:[
        { h:'What Is "Smart Money"?', body:'"Smart money" = institutional traders: banks (Goldman Sachs, JP Morgan), hedge funds, central banks, proprietary trading desks.\n\nThey move BILLIONS, which means:\n• They cannot enter/exit positions quickly — takes days or weeks\n• They must hide their intent to avoid moving price against themselves\n• They leave FOOTPRINTS that patient traders can read' },
        { h:'Order Blocks — Institutional Footprints', body:'An order block is the LAST candle before a strong directional move. Institutions couldn\'t fill all their orders at once, so they come BACK to the same price level to fill the rest.\n\nBullish Order Block: The last bearish (red) candle BEFORE a strong move up\nBearish Order Block: The last bullish (green) candle BEFORE a strong move down\n\nWhen price returns to an order block → institutions re-enter → highly predictable bounce' },
        { h:'Fair Value Gaps (FVG) — Imbalanced Markets', body:'When price moves so fast that a gap forms between 3 consecutive candles — this is a Fair Value Gap.\n\nIdentification:\n1. Look at 3 consecutive candles\n2. If HIGH of candle 1 doesn\'t overlap with LOW of candle 3 → FVG exists\n3. This zone is often revisited before trend continues\n\nMarkets prefer to be "balanced" — price tends to return to fill FVGs.' },
        { h:'Liquidity Sweeps — The Stop Hunt', body:'Institutions need LIQUIDITY to fill large orders. They know retail stop-losses cluster just BELOW obvious support and ABOVE obvious resistance.\n\nThe institutional play:\n1. Push price below obvious support (triggering retail stops = sells entering = liquidity)\n2. ABSORB all retail sells at discounted prices\n3. Reverse aggressively with now-full position\n\nThis is EXACTLY the "fake breakdown" that makes retail traders want to quit. Now you know it\'s manufactured, not random.' },
        { formula:'ICT SMART MONEY MODEL:\nPremium Zone (above 50% of swing range) → look to SELL\nDiscount Zone (below 50% of swing range) → look to BUY\n\nEquilibrium = 50% retracement of previous significant swing\nBuy at discount, sell at premium — always.' },
        { warn:'⚠️ SMC requires 500+ chart hours to develop genuine pattern recognition. Study historical examples extensively before risking real capital. Paper trade first.' }
      ],
      chart:'smc_chart',
      key_takeaways:['Order blocks = where institutions placed unfilled orders — they return to them','Liquidity sweeps are manufactured, not random — trade the reversal after','FVGs are imbalances that markets tend to fill before continuing','Always determine premium vs discount before entering any trade']
    }
  },
  {
    phase:9, id:'algorithmic-trading', tag:'PHASE 9 · CH 17', title:'Algorithmic & Quant Trading',
    desc:'How machines trade. Backtesting. Building a data-driven edge.',
    xp:350, time:'50 min', diff:'advanced',
    content:{
      intro:'Over 70% of daily US market volume is algorithmic. India is catching up rapidly. Understanding how algos work prevents you from being their prey — and opens the door to building systematic edges of your own.',
      sections:[
        { h:'Types of Algorithmic Strategies', list:['Market Making — Post both bid and ask, profit from spread millions of times/day. Requires HFT infrastructure.','Statistical Arbitrage — Trade price discrepancies between correlated instruments before they converge.','Trend Following (CTA) — Systematic momentum capture across multiple asset classes.','Mean Reversion — Trade large deviations from historical average, expecting return to mean.','ML/AI Strategies — Pattern recognition in alternative data (satellite images, social sentiment, credit card data).'] },
        { h:'Backtesting — Testing Before Risking', body:'Before trading any strategy with real money, test it on HISTORICAL data:\n\n1. Define rules precisely and completely (no ambiguity)\n2. Apply rules to out-of-sample data (data the rules weren\'t designed on)\n3. Measure: Win rate, R:R, Sharpe ratio, max drawdown\n4. BEWARE OVERFITTING — curve-fitting rules to past data creates strategies that only work in the past' },
        { formula:'Key Performance Metrics:\nSharpe Ratio = (Return − Risk Free Rate) / Std Deviation\n  >1.5 = Good | >2.0 = Excellent | >3.0 = Exceptional\n\nExpected Value = (Win% × Avg Win) − (Loss% × Avg Loss)\n  Must be positive for a viable system\n\nMax Drawdown — Largest peak-to-trough loss\n  <20% = acceptable for most strategies' },
        { h:'Python for Quant Trading', body:'Essential libraries to learn:\n• pandas — data manipulation (the backbone of quant work)\n• numpy — mathematical operations\n• matplotlib/plotly — visualisation\n• backtrader — backtesting framework\n• yfinance — free market data\n\nStart with: Fetch Nifty data → build simple 50/200 MA crossover → backtest → analyse results → iterate.' },
        { warn:'⚠️ Backtesting demons: (1) Look-ahead bias — using future data in your signals. (2) Survivorship bias — testing only on companies that still exist. (3) Overfitting — 99% win rate in backtest = one of these errors. Guaranteed.' }
      ],
      chart:'algo_chart',
      key_takeaways:['Algos exploit predictable human behaviour — learn their patterns','Backtesting requires out-of-sample validation — not just in-sample','Python + pandas is the foundation of modern quant trading','All edges eventually decay — research is continuous']
    }
  },
  // Extra chapters
  { phase:3, id:'trend-analysis', tag:'PHASE 3 · CH 18', title:'Trend Following Systems', desc:'The oldest and most reliable approach. Trade with momentum, not against it. Why the trend is your friend until it ends.', xp:160, time:'30 min', diff:'intermediate' },
  { phase:3, id:'multi-timeframe', tag:'PHASE 3 · CH 19', title:'Multi-Timeframe Analysis', desc:'Monthly → Weekly → Daily → 4H → 1H. How to stack timeframes for precision entries aligned with the bigger picture.', xp:180, time:'35 min', diff:'intermediate' },
  { phase:3, id:'volume-analysis', tag:'PHASE 3 · CH 20', title:'Volume Profile & Order Flow', desc:'Volume is the lifeblood of price movement. No volume = no conviction. Price without volume is a lie.', xp:200, time:'40 min', diff:'advanced' },
  { phase:3, id:'wyckoff', tag:'PHASE 3 · CH 21', title:'Wyckoff Method', desc:'The 100-year-old method that still works. Accumulation, distribution, markup, markdown — the institutional cycle.', xp:250, time:'50 min', diff:'advanced' },
  { phase:4, id:'stop-loss-mastery', tag:'PHASE 4 · CH 22', title:'Stop-Loss Mastery', desc:'Where to place stops so they protect capital without getting hunted by institutions looking for retail stops.', xp:180, time:'30 min', diff:'intermediate' },
  { phase:4, id:'risk-advanced', tag:'PHASE 4 · CH 23', title:'Advanced Risk Management', desc:'Portfolio heat, correlation risk, drawdown recovery strategies used by professional fund managers.', xp:220, time:'35 min', diff:'advanced' },
  { phase:5, id:'fear-greed-self', tag:'PHASE 5 · CH 24', title:'Controlling Fear & Greed Within', desc:'The internal battle. Practical neuroscience-backed tools to stay rational when your account is moving.', xp:160, time:'25 min', diff:'intermediate' },
  { phase:6, id:'dcf-valuation', tag:'PHASE 6 · CH 25', title:'DCF Valuation Masterclass', desc:'Build a full discounted cash flow model from scratch. What Buffett actually does when valuing a business.', xp:280, time:'55 min', diff:'advanced' },
  { phase:6, id:'sector-rotation', tag:'PHASE 6 · CH 26', title:'Sector Rotation Strategy', desc:'Different sectors lead at different economic cycle stages. Position accordingly and ride the institutional wave.', xp:200, time:'35 min', diff:'advanced' },
  { phase:7, id:'currency-markets', tag:'PHASE 7 · CH 27', title:'Forex & Currency Markets', desc:'How currency movements affect your equity portfolio — and how to trade forex pairs directly.', xp:220, time:'40 min', diff:'advanced' },
  { phase:7, id:'commodities', tag:'PHASE 7 · CH 28', title:'Commodity Markets Deep Dive', desc:'Gold, crude oil, agricultural commodities — how they work and their relationships with equity markets.', xp:210, time:'40 min', diff:'advanced' },
  { phase:8, id:'options-strategies', tag:'PHASE 8 · CH 29', title:'Options Strategies Playbook', desc:'Covered calls, iron condors, spreads, straddles, strangles. When and how to use each strategy.', xp:320, time:'60 min', diff:'advanced' },
  { phase:8, id:'futures-trading', tag:'PHASE 8 · CH 30', title:'Futures Trading', desc:'Leverage, margin, rollover costs, basis risk. How futures contracts work in the real world.', xp:280, time:'45 min', diff:'advanced' },
  { phase:9, id:'order-blocks-deep', tag:'PHASE 9 · CH 31', title:'Order Block Deep Dive', desc:'Bullish/bearish order blocks, breaker blocks, mitigation blocks — the complete SMC order block framework.', xp:300, time:'50 min', diff:'advanced' },
  { phase:9, id:'liquidity', tag:'PHASE 9 · CH 32', title:'Liquidity Concepts', desc:'Equal highs/lows, buyside/sellside liquidity, inducement — the full SMC liquidity framework explained.', xp:280, time:'45 min', diff:'advanced' },
  { phase:10, phaseTitle:'QUANT & DATA', phaseSubtitle:'Elite level — where institutional edge starts', id:'statistics-trading', tag:'PHASE 10 · CH 33', title:'Statistics & Probability in Trading', desc:'Expected value, probability distributions, Monte Carlo simulation — think like a quant, not a gambler.', xp:300, time:'45 min', diff:'advanced' },
  { phase:10, id:'backtesting', tag:'PHASE 10 · CH 34', title:'Backtesting Your Strategy', desc:'Build, test, and validate a trading strategy on historical data. Step-by-step with real data.', xp:300, time:'55 min', diff:'advanced' },
  { phase:10, id:'python-trading', tag:'PHASE 10 · CH 35', title:'Python for Traders', desc:'Fetch data, build strategies, backtest, visualise. Complete starter guide for quantitative analysis.', xp:350, time:'70 min', diff:'advanced' },
  { phase:11, phaseTitle:'PORTFOLIO BUILDING', phaseSubtitle:'Systems over individual trades', id:'portfolio', tag:'PHASE 11 · CH 36', title:'Building a Robust Portfolio', desc:'Asset allocation, correlation, diversification done properly. How to combine assets for superior risk-adjusted returns.', xp:250, time:'40 min', diff:'advanced' },
  { phase:11, id:'execution', tag:'PHASE 11 · CH 37', title:'Building Your Execution System', desc:'Watchlists, journals, entry criteria, exit rules, weekly review process — build YOUR complete trading system.', xp:250, time:'40 min', diff:'advanced' },
  { phase:11, id:'trading-journal', tag:'PHASE 11 · CH 38', title:'The Trading Journal: Your Real Edge', desc:'How to structure a journal that actually improves your trading over time. The most underused tool.', xp:200, time:'25 min', diff:'intermediate' },
  { phase:0, id:'what-is-bitcoin', tag:'PHASE 0 · CH 39', title:'Bitcoin & Why It Was Created', desc:'Genesis block, Satoshi, monetary policy, halvings, digital scarcity — the complete Bitcoin story.', xp:80, time:'20 min', diff:'beginner' },
  { phase:1, id:'bonds', tag:'PHASE 1 · CH 40', title:'Bonds & Fixed Income', desc:'Government bonds, corporate bonds, yield, duration, convexity. The asset class that moves trillions.', xp:100, time:'25 min', diff:'intermediate' },
  { phase:1, id:'etfs-mf', tag:'PHASE 1 · CH 41', title:'ETFs vs Mutual Funds vs SIPs', desc:'Which investment vehicle fits your goals? Costs, liquidity, tax efficiency compared properly.', xp:90, time:'20 min', diff:'beginner' },
  { phase:2, id:'types-of-markets', tag:'PHASE 2 · CH 42', title:'All Market Types Explained', desc:'Spot, futures, options, forex, crypto, commodities — what makes each unique and how they interact.', xp:120, time:'25 min', diff:'intermediate' },
  { phase:4, id:'drawdown', tag:'PHASE 4 · CH 43', title:'Drawdown Management', desc:'Understanding and surviving drawdowns. The asymmetric mathematics of losses and recovery.', xp:180, time:'30 min', diff:'intermediate' },
  { phase:6, id:'warren-buffett', tag:'PHASE 6 · CH 44', title:'The Warren Buffett Framework', desc:'Circle of competence, margin of safety, moats, patience — the complete Buffett investment philosophy.', xp:230, time:'40 min', diff:'advanced' },
  { phase:12, phaseTitle:'REAL WORLD EXPERIENCE', phaseSubtitle:'Years · No shortcut exists', id:'real-experience', tag:'PHASE 12 · CH 45', title:'Real World Trading Experience', desc:'Bull markets, bear markets, crashes, euphoria — what you can only learn by actually doing it with real money.', xp:400, time:'20 min', diff:'advanced' },
];

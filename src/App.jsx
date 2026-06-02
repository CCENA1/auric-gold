import { useState, useEffect } from "react";
import {
  TrendingUp, Activity, Shield, Zap, ChevronRight,
  Globe, Check, Target, Clock, ArrowUpRight,
  ArrowDownRight, Crown, Cpu, BookOpen, Award,
  DollarSign, Calendar, Layers, BarChart2
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────

const Styles = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --bg:          #09090B;
        --bg2:         #0C0C10;
        --bg3:         #111116;
        --card:        #131318;
        --gold:        #C9930A;
        --gold2:       #E8B420;
        --gold-glow:   rgba(201,147,10,0.2);
        --gold-border: rgba(201,147,10,0.28);
        --gold-dim:    rgba(201,147,10,0.08);
        --border:      rgba(255,255,255,0.07);
        --border2:     rgba(255,255,255,0.04);
        --text:        #F0EDE8;
        --text2:       #7A7888;
        --text3:       #444450;
        --green:       #00C896;
        --green-dim:   rgba(0,200,150,0.1);
        --red:         #FF4B55;
        --red-dim:     rgba(255,75,85,0.1);
      }

      body { background: var(--bg); color: var(--text); font-family: 'Outfit', sans-serif; overflow-x: hidden; }

      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: var(--bg); }
      ::-webkit-scrollbar-thumb { background: var(--gold-border); border-radius: 2px; }

      @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
      }
      @keyframes pulse-dot {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%       { opacity: 0.4; transform: scale(0.75); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-7px); }
      }
      @keyframes fade-up {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes flash-green {
        0%   { color: var(--green); }
        100% { color: var(--text); }
      }
      @keyframes flash-red {
        0%   { color: var(--red); }
        100% { color: var(--text); }
      }
      @keyframes bar-load {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
      }

      .gold-text {
        background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 50%, var(--gold) 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 4s linear infinite;
      }
      .display  { font-family: 'Cinzel', serif; }
      .mono     { font-family: 'DM Mono', monospace; }

      .card {
        background: var(--card);
        border: 1px solid var(--border);
        border-radius: 12px;
      }
      .card-gold {
        background: linear-gradient(135deg, rgba(201,147,10,0.07) 0%, var(--card) 65%);
        border: 1px solid var(--gold-border);
        border-radius: 12px;
      }

      .glass {
        background: rgba(255,255,255,0.025);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
      }

      .btn-gold {
        background: linear-gradient(135deg, #A87208 0%, #E8B420 50%, #A87208 100%);
        background-size: 200% auto;
        color: #000;
        font-weight: 700;
        font-family: 'Outfit', sans-serif;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        letter-spacing: 0.02em;
      }
      .btn-gold:hover:not(:disabled) {
        background-position: right center;
        box-shadow: 0 0 32px rgba(201,147,10,0.55);
        transform: translateY(-1px);
      }
      .btn-gold:disabled { opacity: 0.6; cursor: not-allowed; }

      .btn-outline {
        background: transparent;
        border: 1px solid var(--border);
        color: var(--text);
        font-family: 'Outfit', sans-serif;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .btn-outline:hover { border-color: var(--gold-border); color: var(--gold2); }

      .nav-bar {
        background: rgba(9,9,11,0.9);
        backdrop-filter: blur(22px);
        -webkit-backdrop-filter: blur(22px);
        border-bottom: 1px solid var(--border);
      }

      .hero-bg {
        background:
          radial-gradient(ellipse 90% 55% at 50% -15%, rgba(201,147,10,0.11) 0%, transparent 60%),
          radial-gradient(ellipse 50% 35% at 85% 55%,  rgba(201,147,10,0.04) 0%, transparent 55%),
          var(--bg);
      }
      .grid-overlay {
        background-image:
          linear-gradient(rgba(201,147,10,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,147,10,0.04) 1px, transparent 1px);
        background-size: 50px 50px;
      }

      .animate-float     { animation: float 5s ease-in-out infinite; }
      .animate-pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
      .animate-fade-up   { animation: fade-up 0.65s ease forwards; }
      .animate-spin      { display: inline-block; animation: spin 1.2s linear infinite; }

      .price-up   { animation: flash-green 0.8s ease; }
      .price-down { animation: flash-red   0.8s ease; }

      .hover-card { transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease; }
      .hover-card:hover {
        transform: translateY(-2px);
        border-color: var(--gold-border) !important;
        box-shadow: 0 10px 36px rgba(0,0,0,0.35);
      }

      .sidebar-link {
        border-radius: 8px;
        transition: all 0.15s ease;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 9px 12px;
        margin-bottom: 2px;
        font-size: 13px;
        color: var(--text2);
      }
      .sidebar-link:hover { background: rgba(255,255,255,0.04); color: var(--text); }
      .sidebar-link.active { background: var(--gold-dim); color: var(--gold2); }

      .confidence-track {
        height: 3px;
        background: rgba(255,255,255,0.08);
        border-radius: 2px;
        overflow: hidden;
      }
      .confidence-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 1.2s ease;
      }

      .badge-buy     { background: var(--green-dim); color: var(--green); border: 1px solid rgba(0,200,150,0.25); }
      .badge-sell    { background: var(--red-dim);   color: var(--red);   border: 1px solid rgba(255,75,85,0.25); }
      .badge-neutral { background: var(--gold-dim);  color: var(--gold2); border: 1px solid var(--gold-border); }

      .divider      { height: 1px; background: linear-gradient(90deg, transparent, var(--border),      transparent); }
      .divider-gold { height: 1px; background: linear-gradient(90deg, transparent, var(--gold-border), transparent); }

      .loading-bar {
        height: 2px;
        background: linear-gradient(90deg, transparent 0%, var(--gold2) 50%, transparent 100%);
        background-size: 200% auto;
        border-radius: 1px;
        animation: bar-load 1.4s linear infinite;
      }

      .section-label {
        font-size: 10px;
        letter-spacing: 0.16em;
        color: var(--gold);
        font-family: 'DM Mono', monospace;
        text-transform: uppercase;
        margin-bottom: 10px;
      }

      @media (max-width: 768px) {
        .mobile-hide  { display: none !important; }
        .mobile-stack { flex-direction: column !important; }
        .mobile-full  { width: 100% !important; }
      }
    `}</style>
  </>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────

const generateChartData = (base = 4484.86) => {
  const pts = [];
  let p = base - 28;
  for (let i = 47; i >= 0; i--) {
    p += (Math.random() - 0.48) * 2.8;
    pts.push({
      time:  i === 0 ? "Now" : i % 8 === 0 ? `-${i}h` : "",
      price: parseFloat(p.toFixed(2)),
    });
  }
  return pts;
};

const SAMPLE_SIGNALS = [
  {
    type: "BUY", timeframe: "Intraday (4–8H)",
    entry: 4468.00, sl: 4442.00, tp1: 4502.00, tp2: 4528.00, tp3: 4558.00,
    rr: "1:2.7", confidence: 76, bias: "Bullish", volatility: "Moderate",
    validity: "Valid 6–8 hrs",
    reasoning: "Price has held the 4H demand zone at $4,460 after sweeping intraday lows. US-Iran ceasefire uncertainty is sustaining safe-haven premium. Institutional COT data continues to reflect net long accumulation at these levels.",
    factors: ["4H Demand Zone Hold", "Geopolitical Safe-Haven Bid", "Bullish RSI Divergence"],
  },
  {
    type: "SELL", timeframe: "Scalp (1–2H)",
    entry: 4512.00, sl: 4528.00, tp1: 4494.00, tp2: 4480.00, tp3: 4465.00,
    rr: "1:1.9", confidence: 69, bias: "Bearish", volatility: "Elevated",
    validity: "Valid 2–3 hrs",
    reasoning: "Liquidity sweep above the session high at $4,508 with immediate bearish rejection. 1H supply zone confluence with an unfilled Fair Value Gap from Monday's gap-down open. Momentum exhaustion signals on 15M and 1H timeframes.",
    factors: ["Session High Liquidity Sweep", "1H Supply Zone Confluence", "Momentum Exhaustion"],
  },
  {
    type: "BUY", timeframe: "Swing (2–3D)",
    entry: 4450.00, sl: 4412.00, tp1: 4520.00, tp2: 4580.00, tp3: 4650.00,
    rr: "1:3.4", confidence: 81, bias: "Bullish", volatility: "Low",
    validity: "Valid 2–3 days",
    reasoning: "Weekly demand confluence at $4,450 aligns with the 52-week rising channel support. Escalating Middle East tensions and oil price pressure are reinforcing the inflation hedge narrative. Fed rate path uncertainty underpins structural gold demand.",
    factors: ["Weekly Channel Support", "Inflation Hedge Premium", "Fed Uncertainty Bid"],
  },
];

const ECONOMIC_EVENTS = [
  { time: "13:30 UTC", event: "US Non-Farm Payrolls", impact: "HIGH",   forecast: "182K",   previous: "175K" },
  { time: "18:00 UTC", event: "Federal Reserve Statement", impact: "HIGH",   forecast: "Rate hold",  previous: "—" },
  { time: "18:30 UTC", event: "FOMC Press Conference", impact: "HIGH",   forecast: "Guidance expected", previous: "—" },
  { time: "09:00 UTC", event: "Eurozone CPI Flash (y/y)", impact: "MEDIUM", forecast: "2.3%",   previous: "2.6%" },
  { time: "12:00 UTC", event: "US Treasury 10Y Auction", impact: "MEDIUM", forecast: "4.42%",  previous: "4.38%" },
];

const ANALYSIS_SECTIONS = [
  {
    title: "Trend Analysis",
    items: [
      { name: "EMA 20",  value: "4,462", note: "Price above — Bullish",    pos: true },
      { name: "EMA 50",  value: "4,418", note: "Price above — Bullish",    pos: true },
      { name: "EMA 200", value: "4,102", note: "Price above — Bullish",    pos: true },
      { name: "MACD",    value: "-8.3",  note: "Bearish histogram",        pos: false },
    ],
  },
  {
    title: "Momentum",
    items: [
      { name: "RSI (14)",   value: "62.4",  note: "Bullish, not overbought", pos: true  },
      { name: "Stoch RSI",  value: "78.6",  note: "Approaching overbought",  pos: null  },
      { name: "CCI",        value: "+114",  note: "Strong momentum",          pos: true  },
      { name: "MFI",        value: "61.9",  note: "Buying pressure healthy",  pos: true  },
    ],
  },
  {
    title: "Volatility",
    items: [
      { name: "ATR (14)",    value: "52.1",  note: "Above 30D average",       pos: null },
      { name: "Bollinger %B",value: "0.68",  note: "Upper half range",        pos: true },
      { name: "BB Width",    value: "0.93%", note: "Moderate expansion",      pos: null },
      { name: "VIX Proxy",   value: "18.2",  note: "Neutral risk environment", pos: null },
    ],
  },
  {
    title: "Smart Money",
    items: [
      { name: "Order Block",  value: "$4,450",    note: "4H demand zone active",    pos: true },
      { name: "Buy Liquidity",value: "$4,600",    note: "Pool above session high",   pos: null },
      { name: "FVG (4H)",    value: "$4,470–85", note: "Gap partially filled",      pos: null },
      { name: "COT Bias",    value: "Net Long",  note: "+8.2K institutional",       pos: true },
    ],
  },
];

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#1A1A22",
      border: "1px solid var(--gold-border)",
      borderRadius: 8,
      padding: "7px 13px",
      fontFamily: "DM Mono, monospace",
      fontSize: 12,
      color: "var(--gold2)",
    }}>
      ${payload[0]?.value?.toFixed(2)}
    </div>
  );
};

const GoldChart = ({ data, height = 200, gradId = "g1" }) => (
  <ResponsiveContainer width="100%" height={height}>
    <AreaChart data={data} margin={{ top: 5, right: 4, bottom: 0, left: 0 }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%"  stopColor="#C9930A" stopOpacity={0.32} />
          <stop offset="95%" stopColor="#C9930A" stopOpacity={0}    />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
      <XAxis dataKey="time" tick={{ fontSize: 9, fill: "#444", fontFamily: "DM Mono,monospace" }} axisLine={false} tickLine={false} />
      <YAxis domain={["auto", "auto"]} tick={{ fontSize: 9, fill: "#444", fontFamily: "DM Mono,monospace" }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `$${v}`} />
      <Tooltip content={<CustomTooltip />} />
      <Area type="monotone" dataKey="price" stroke="#C9930A" strokeWidth={1.5} fill={`url(#${gradId})`} dot={false} />
    </AreaChart>
  </ResponsiveContainer>
);

const MetricCard = ({ label, value, icon: Icon, sub, color = "gold", live }) => {
  const accent = color === "green" ? "var(--green)" : color === "red" ? "var(--red)" : "var(--gold2)";
  return (
    <div className="card hover-card" style={{ padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ fontSize: 10, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.09em" }}>{label}</span>
        <div style={{ padding: 6, borderRadius: 6, background: "rgba(255,255,255,0.04)" }}>
          <Icon size={12} style={{ color: accent }} />
        </div>
      </div>
      <div className="mono" style={{ fontSize: 19, fontWeight: 700, marginBottom: 3 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "var(--text3)" }}>{sub}</div>}
      {live && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5 }}>
          <div className="animate-pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)" }} />
          <span style={{ fontSize: 10, color: "var(--text3)" }}>Live</span>
        </div>
      )}
    </div>
  );
};

const SignalCard = ({ signal, compact }) => {
  const isBuy   = signal.type === "BUY";
  const accent  = isBuy ? "var(--green)" : "var(--red)";
  const badgeClass = isBuy ? "badge-buy" : "badge-sell";
  const lvls = [
    { label: "Entry",  val: signal.entry.toFixed(2), color: "var(--text)" },
    { label: "SL",     val: signal.sl.toFixed(2),    color: "var(--red)"  },
    { label: "TP1",    val: signal.tp1.toFixed(2),   color: "var(--green)" },
    { label: "TP2",    val: signal.tp2.toFixed(2),   color: "var(--green)" },
  ];
  return (
    <div className="card hover-card" style={{ borderLeft: `3px solid ${accent}`, padding: compact ? 16 : 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 11 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className={`mono ${badgeClass}`} style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 4, letterSpacing: "0.07em" }}>
            {signal.type}
          </span>
          <span style={{ fontSize: 11, color: "var(--text2)" }}>{signal.timeframe}</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "var(--text3)", marginBottom: 1 }}>Confidence</div>
          <div className="mono" style={{ fontSize: 17, fontWeight: 700, color: accent }}>{signal.confidence}%</div>
        </div>
      </div>

      <div className="confidence-track" style={{ marginBottom: 13 }}>
        <div className="confidence-fill" style={{ width: `${signal.confidence}%`, background: `linear-gradient(90deg, ${accent}70, ${accent})` }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 11 }}>
        {lvls.map(l => (
          <div key={l.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 6, padding: "6px 10px" }}>
            <div style={{ fontSize: 9, color: "var(--text3)", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{l.label}</div>
            <div className="mono" style={{ fontSize: 12, fontWeight: 600, color: l.color }}>${l.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: compact ? 0 : 10 }}>
        <span style={{ fontSize: 11, color: "var(--text2)" }}>R:R <span className="mono" style={{ color: "var(--gold2)" }}>{signal.rr}</span></span>
        <span style={{ fontSize: 11, color: "var(--text2)" }}>{signal.bias} · {signal.volatility}</span>
        <span style={{ fontSize: 10, color: "var(--text3)", display: "flex", alignItems: "center", gap: 3 }}><Clock size={9} />{signal.validity}</span>
      </div>

      {!compact && (
        <>
          <div className="divider" style={{ margin: "10px 0" }} />
          <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.65, marginBottom: 10 }}>{signal.reasoning}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {signal.factors.map(f => (
              <span key={f} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--text2)" }}>{f}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const PricingCard = ({ plan, price, period, tag, features, highlight, icon: Icon }) => (
  <div className={`${highlight ? "card-gold" : "card"} hover-card`} style={{ padding: 28, position: "relative", overflow: "hidden" }}>
    {highlight && (
      <>
        <div style={{ position: "absolute", top: 0, right: 0, background: "var(--gold)", color: "#000", fontSize: 9, fontWeight: 800, padding: "4px 12px", borderBottomLeftRadius: 8, letterSpacing: "0.08em" }}>
          MOST POPULAR
        </div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top right, rgba(201,147,10,0.09) 0%, transparent 60%)", pointerEvents: "none" }} />
      </>
    )}
    <div style={{ position: "relative" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: highlight ? "rgba(201,147,10,0.14)" : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
        <Icon size={19} style={{ color: highlight ? "var(--gold2)" : "var(--text2)" }} />
      </div>
      <div style={{ fontSize: 11, color: "var(--text3)", marginBottom: 4 }}>{tag}</div>
      <div className={highlight ? "display" : ""} style={{ fontSize: 17, fontWeight: 600, letterSpacing: highlight ? "0.04em" : 0, marginBottom: 12, color: highlight ? "var(--gold2)" : "var(--text)" }}>{plan}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 22 }}>
        <span className="mono" style={{ fontSize: 32, fontWeight: 700, color: highlight ? "var(--gold2)" : "var(--text)" }}>{price}</span>
        <span style={{ fontSize: 12, color: "var(--text3)" }}>{period}</span>
      </div>
      <div className="divider" style={{ marginBottom: 20 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 24 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <Check size={13} style={{ color: highlight ? "var(--gold)" : "var(--green)", flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.4 }}>{f}</span>
          </div>
        ))}
      </div>
      <button className={highlight ? "btn-gold" : "btn-outline"} style={{ width: "100%", padding: "11px 0", fontSize: 14 }}>
        {highlight ? "Get Started" : "Choose Plan"}
      </button>
    </div>
  </div>
);

// ─── LANDING SECTIONS ─────────────────────────────────────────────────────────

const Navbar = ({ onDash }) => (
  <nav className="nav-bar" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Logo />
      <div className="mobile-hide" style={{ display: "flex", gap: 30, fontSize: 13 }}>
        {["Platform", "Signals", "Research", "Pricing"].map(n => (
          <span key={n} style={{ color: "var(--text2)", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text2)"; }}>
            {n}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn-outline mobile-hide" style={{ padding: "7px 16px", fontSize: 13 }}>Sign In</button>
        <button className="btn-gold" style={{ padding: "7px 18px", fontSize: 13 }} onClick={onDash}>Dashboard →</button>
      </div>
    </div>
  </nav>
);

const Logo = ({ size = "md" }) => {
  const s = size === "sm" ? 20 : 26;
  const fs = size === "sm" ? 9 : 11;
  const ts = size === "sm" ? 13 : 15;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div style={{ width: s, height: s, borderRadius: 6, background: "linear-gradient(135deg, #9B6A06 0%, #E8B420 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: fs, fontWeight: 800, color: "#000", fontFamily: "Cinzel, serif" }}>A</span>
      </div>
      <span className="display" style={{ fontSize: ts, fontWeight: 700, letterSpacing: "0.13em", color: "var(--text)" }}>AURIC</span>
    </div>
  );
};

const Hero = ({ price, change, trend, flashClass, onDash }) => (
  <section className="hero-bg grid-overlay" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 64px", position: "relative", overflow: "hidden" }}>
    {/* Decorative rings */}
    {[700, 480, 300].map((size, i) => (
      <div key={i} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: size, height: size, borderRadius: "50%", border: `1px solid rgba(201,147,10,${0.04 + i * 0.03})`, pointerEvents: "none" }} />
    ))}
    {/* Central glow */}
    <div style={{ position: "absolute", top: "0", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(201,147,10,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

    <div style={{ position: "relative", maxWidth: 840, textAlign: "center" }} className="animate-fade-up">
      {/* Badge */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(201,147,10,0.07)", border: "1px solid var(--gold-border)", borderRadius: 20, padding: "5px 15px", marginBottom: 32 }}>
        <div className="animate-pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)" }} />
        <span className="mono" style={{ fontSize: 10, color: "var(--gold2)", letterSpacing: "0.12em" }}>LIVE · XAU/USD INTELLIGENCE PLATFORM</span>
      </div>

      {/* Headline */}
      <h1 className="display" style={{ fontSize: "clamp(34px, 6vw, 78px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "0.04em", marginBottom: 22 }}>
        <span style={{ color: "var(--text)" }}>INSTITUTIONAL</span>
        <br />
        <span className="gold-text">GOLD INTELLIGENCE</span>
      </h1>

      <p style={{ fontSize: "clamp(14px, 2vw, 17px)", color: "var(--text2)", maxWidth: 500, margin: "0 auto 44px", lineHeight: 1.75 }}>
        AI-powered XAU/USD signals, real-time market command center, and institutional-grade analysis — engineered for precision gold trading.
      </p>

      {/* Live price */}
      <div className="card-gold animate-float" style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", padding: "22px 48px", marginBottom: 40 }}>
        <div className="mono" style={{ fontSize: 10, color: "var(--text2)", letterSpacing: "0.12em", marginBottom: 7 }}>XAU/USD SPOT PRICE</div>
        <div className={`mono ${flashClass}`} style={{ fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 700, color: "var(--text)", letterSpacing: "0.02em", marginBottom: 8 }}>
          ${price.toFixed(2)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {trend === "up"
            ? <ArrowUpRight size={13} style={{ color: "var(--green)" }} />
            : <ArrowDownRight size={13} style={{ color: "var(--red)" }} />}
          <span className="mono" style={{ fontSize: 12, color: trend === "up" ? "var(--green)" : "var(--red)" }}>
            {trend === "up" ? "+" : ""}{change.toFixed(2)} ({((change / price) * 100).toFixed(2)}%)
          </span>
          <div className="animate-pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", marginLeft: 4 }} />
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 18 }}>
        <button className="btn-gold" style={{ padding: "13px 30px", fontSize: 14 }} onClick={onDash}>
          Enter Dashboard →
        </button>
        <button className="btn-outline" style={{ padding: "13px 30px", fontSize: 14 }}>
          View Research
        </button>
      </div>
      <p style={{ fontSize: 11, color: "var(--text3)" }}>
        All trading involves risk. Signals represent probabilistic analysis — not financial advice.
      </p>
    </div>
  </section>
);

const CommandCenter = ({ price, change }) => (
  <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div className="section-label">Command Center</div>
      <h2 className="display" style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 12 }}>
        Real-Time Gold Intelligence Hub
      </h2>
      <p style={{ color: "var(--text2)", fontSize: 14, maxWidth: 460, margin: "0 auto" }}>
        Continuously updated institutional metrics across all major gold market factors.
      </p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))", gap: 14 }}>
      <MetricCard label="XAU/USD Spot"      value={`$${price.toFixed(2)}`} icon={DollarSign} color="gold"  sub={`${change > 0 ? "+" : ""}${change.toFixed(2)} today`} live />
      <MetricCard label="Trend Direction"    value="▼ Bearish"              icon={TrendingUp} color="red"   sub="Short-term pressure" />
      <MetricCard label="Market Sentiment"   value="42 / Fear"              icon={Activity}   color="gold"  sub="Fear & Greed Index" />
      <MetricCard label="Risk Level"         value="Elevated"               icon={Shield}     color="red"   sub="Geopolitical premium" />
      <MetricCard label="Volatility (ATR)"   value="52.1"                   icon={Zap}        color="gold"  sub="High daily range" />
      <MetricCard label="Institutional Bias" value="Net Long"               icon={Globe}      color="green" sub="COT: +8.2K contracts" />
    </div>
  </section>
);

const SignalShowcase = ({ chartData }) => (
  <section style={{ background: "var(--bg2)", padding: "80px 0" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }} className="mobile-stack">
        <div>
          <div className="section-label">Signal Engine</div>
          <h2 className="display" style={{ fontSize: "clamp(22px, 3vw, 33px)", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 16, lineHeight: 1.35 }}>
            Precision Signals.<br />Institutional Clarity.
          </h2>
          <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
            Every signal synthesises multi-factor analysis — technical structure, smart money concepts, liquidity mapping, and macro catalysts — into a single actionable recommendation.
          </p>
          {["Entry, SL, TP1, TP2, TP3 price levels", "Risk:Reward ratio & confidence score", "Full AI reasoning with market context", "Real-time signal validity tracking"].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 11 }}>
              <Check size={13} style={{ color: "var(--gold)", flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "var(--text2)" }}>{item}</span>
            </div>
          ))}
          <p style={{ fontSize: 11, color: "var(--text3)", marginTop: 18, lineHeight: 1.5 }}>
            Probability-based analysis generated from multiple market factors. Past signal accuracy does not guarantee future results.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {SAMPLE_SIGNALS.slice(0, 2).map((s, i) => <SignalCard key={i} signal={s} compact />)}
        </div>
      </div>

      {/* Chart */}
      <div className="card" style={{ marginTop: 48, padding: "22px 22px 10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>XAU/USD Price Chart</div>
            <div style={{ fontSize: 11, color: "var(--text2)" }}>48-Hour Historical · Simulated Live</div>
          </div>
          <div style={{ display: "flex", gap: 7 }}>
            {["1H", "4H", "1D", "1W"].map(t => (
              <button key={t} className="mono" style={{ padding: "4px 10px", fontSize: 10, borderRadius: 4, background: t === "4H" ? "var(--gold-dim)" : "transparent", border: `1px solid ${t === "4H" ? "var(--gold-border)" : "var(--border)"}`, color: t === "4H" ? "var(--gold2)" : "var(--text2)", cursor: "pointer" }}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <GoldChart data={chartData} height={200} gradId="g1" />
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div className="section-label">Membership</div>
      <h2 className="display" style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 600, letterSpacing: "0.06em", marginBottom: 12 }}>
        Choose Your Edge
      </h2>
      <p style={{ color: "var(--text2)", fontSize: 14 }}>Cancel anytime. All plans include full risk disclaimer and terms.</p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(275px, 1fr))", gap: 20 }}>
      <PricingCard plan="Free"          price="$0"   period="/month" tag="Get Started"        icon={Award} features={["3 signals per week", "Basic market dashboard", "Daily gold outlook", "Educational library", "Mobile access"]} />
      <PricingCard plan="Professional"  price="$79"  period="/month" tag="For Active Traders"  icon={Zap}   highlight features={["Unlimited AI signals", "Full command center", "AI analysis engine", "Economic events tracker", "Trade journal & stats", "Weekly research reports", "Priority support"]} />
      <PricingCard plan="Institutional" price="$249" period="/month" tag="For Institutions"    icon={Crown} features={["Everything in Professional", "API access (1,000 req/day)", "Custom signal parameters", "5 multi-user seats", "White-label PDF reports", "Monthly strategy call"]} />
    </div>
    <p style={{ textAlign: "center", marginTop: 24, fontSize: 11, color: "var(--text3)" }}>
      All trading involves substantial risk. Signals represent probabilistic analysis and are not financial advice.
    </p>
  </section>
);

const Footer = () => (
  <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "48px 24px 24px" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 32, marginBottom: 40 }}>
        <div>
          <Logo size="sm" />
          <p style={{ fontSize: 12, color: "var(--text3)", lineHeight: 1.65, marginTop: 12 }}>
            Institutional gold intelligence platform. Not financial advice. All trading involves risk.
          </p>
        </div>
        {[
          { title: "Platform", links: ["Dashboard", "Signal Engine", "AI Analysis", "Research"] },
          { title: "Company",  links: ["About", "Blog", "Careers", "Contact"] },
          { title: "Legal",    links: ["Privacy", "Terms", "Risk Disclosure", "Cookies"] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text2)", marginBottom: 14, textTransform: "uppercase" }}>{col.title}</div>
            {col.links.map(l => (
              <div key={l} style={{ fontSize: 13, color: "var(--text3)", marginBottom: 9, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--text)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--text3)"; }}>
                {l}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="divider" style={{ marginBottom: 20 }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text3)", flexWrap: "wrap", gap: 8 }}>
        <span>© 2025 Auric Intelligence Ltd. All rights reserved.</span>
        <span>All trading involves risk. Not financial advice.</span>
      </div>
    </div>
  </footer>
);

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

const Dashboard = ({ price, change, trend, chartData, isLive, fetchStatus, onExit }) => {
  const [tab,        setTab]        = useState("overview");
  const [aiSignal,   setAiSignal]   = useState(null);
  const [generating, setGenerating] = useState(false);
  const [genError,   setGenError]   = useState(null);

  const generateSignal = async () => {
    setGenerating(true);
    setGenError(null);
    setAiSignal(null);
    try {
      const res = await fetch("/api/generate-signal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 900,
          messages: [{
            role: "user",
            content: `You are an elite institutional gold trading analyst at a tier-1 hedge fund. Gold (XAU/USD) is currently trading at $${price.toFixed(2)}.

Generate a realistic XAU/USD trading signal. Return ONLY valid JSON with NO markdown or explanation:
{
  "type": "BUY",
  "timeframe": "Intraday (4-8H)",
  "entry": 2341.50,
  "sl": 2327.00,
  "tp1": 2355.00,
  "tp2": 2368.00,
  "tp3": 2382.00,
  "rr": "1:2.4",
  "confidence": 78,
  "bias": "Bullish",
  "volatility": "Moderate",
  "validity": "Valid for 6-8 hours",
  "reasoning": "Two to three sentences of institutional-grade analysis referencing specific technical levels, market structure elements (order blocks, liquidity zones, FVGs), and macro context relevant to gold right now.",
  "factors": ["Specific Factor One", "Specific Factor Two", "Specific Factor Three"]
}
Use realistic price levels relative to the current price of $${price.toFixed(2)}.`,
          }],
        }),
      });
      const data = await res.json();
      const raw  = data.content?.[0]?.text || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      setAiSignal(JSON.parse(clean));
    } catch {
      setGenError("Signal generation failed. Check your connection and try again.");
    }
    setGenerating(false);
  };

  const navItems = [
    { id: "overview",  label: "Overview",  icon: Layers   },
    { id: "signals",   label: "Signals",   icon: Target   },
    { id: "analysis",  label: "Analysis",  icon: BarChart2 },
    { id: "events",    label: "Events",    icon: Calendar },
    { id: "research",  label: "Research",  icon: BookOpen },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--bg)", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: 195, background: "var(--bg2)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", padding: "18px 10px", flexShrink: 0 }}>
        <div style={{ padding: "0 4px", marginBottom: 28 }}><Logo size="sm" /></div>
        {navItems.map(n => (
          <div key={n.id} className={`sidebar-link${tab === n.id ? " active" : ""}`} onClick={() => setTab(n.id)}>
            <n.icon size={14} />
            {n.label}
          </div>
        ))}
        <div style={{ marginTop: "auto" }}>
          <div className="divider" style={{ marginBottom: 14 }} />
          <div className="sidebar-link" onClick={onExit} style={{ color: "var(--text3)" }}>
            <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} />
            Back to Site
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ height: 52, background: "var(--bg2)", borderBottom: "1px solid var(--border)", padding: "0 22px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 11, color: "var(--text2)" }}>XAU/USD</span>
            <span className={`mono ${trend === "up" ? "price-up" : "price-down"}`} style={{ fontSize: 15, fontWeight: 700 }}>${price.toFixed(2)}</span>
            <span className="mono" style={{ fontSize: 12, color: change >= 0 ? "var(--green)" : "var(--red)" }}>
              {change >= 0 ? "+" : ""}{change.toFixed(2)}
            </span>
            {isLive ? (
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(0,200,150,0.08)", border: "1px solid rgba(0,200,150,0.2)", borderRadius: 10, padding: "2px 8px" }}>
                <div className="animate-pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)" }} />
                <span className="mono" style={{ fontSize: 9, color: "var(--green)", letterSpacing: "0.08em" }}>
                  {fetchStatus === "error" ? "FETCH ERROR" : "LIVE"}
                </span>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(201,147,10,0.08)", border: "1px solid var(--gold-border)", borderRadius: 10, padding: "2px 8px" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--gold)" }} />
                <span className="mono" style={{ fontSize: 9, color: "var(--gold)", letterSpacing: "0.08em" }}>SIMULATED</span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="mobile-hide" style={{ display: "flex", gap: 14, fontSize: 11, color: "var(--text3)" }}>
              <span>London 14:32</span>
              <span>NY 09:32</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: "auto", padding: 22 }}>

          {/* OVERVIEW */}
          {tab === "overview" && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 18 }}>Market Overview</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 12, marginBottom: 22 }}>
                <MetricCard label="XAU/USD"   value={`$${price.toFixed(2)}`} icon={DollarSign} color="gold"  sub={`${change > 0 ? "+" : ""}${change.toFixed(2)}`} live />
                <MetricCard label="Trend"     value="▼ Bearish"              icon={TrendingUp} color="red"   sub="Short-term pressure" />
                <MetricCard label="Sentiment" value="Fear"                    icon={Activity}   color="gold"  sub="Score: 42 / 100" />
                <MetricCard label="ATR (14)"  value="52.1"                    icon={Zap}        color="gold"  sub="Elevated volatility" />
              </div>
              <div className="card" style={{ padding: "18px 18px 8px", marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 14 }}>48H Price Chart · XAU/USD</div>
                <GoldChart data={chartData} height={215} gradId="g2" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { title: "Market Structure", rows: [
                    { l: "Primary Trend",   v: "Bearish",   c: "var(--red)"   },
                    { l: "4H Structure",    v: "CHoCH Seen",c: "var(--gold2)" },
                    { l: "Key Support",     v: "$4,366",    c: "var(--text)"  },
                    { l: "Key Resistance",  v: "$4,600",    c: "var(--text)"  },
                    { l: "52W High",        v: "$5,597",    c: "var(--gold2)" },
                  ]},
                  { title: "Macro Factors", rows: [
                    { l: "Fed Stance",   v: "Hawkish",    c: "var(--red)"   },
                    { l: "Iran Risk",    v: "Elevated",   c: "var(--red)"   },
                    { l: "Oil / CPI",    v: "Rising",     c: "var(--red)"   },
                    { l: "Rate Hike?",   v: "Possible",   c: "var(--gold2)" },
                    { l: "ETF Flows",    v: "+$148M",     c: "var(--green)" },
                  ]},
                ].map(section => (
                  <div key={section.title} className="card" style={{ padding: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--gold2)", marginBottom: 14 }}>{section.title}</div>
                    {section.rows.map(r => (
                      <div key={r.l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <span style={{ fontSize: 12, color: "var(--text2)" }}>{r.l}</span>
                        <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: r.c }}>{r.v}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SIGNALS */}
          {tab === "signals" && (
            <div className="animate-fade-up">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>AI Signal Engine</h2>
                  <p style={{ fontSize: 11, color: "var(--text2)" }}>Probability-based analysis — not financial advice. Always manage your risk.</p>
                </div>
                <button className="btn-gold" style={{ padding: "10px 20px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}
                  onClick={generateSignal} disabled={generating}>
                  {generating
                    ? <><span className="animate-spin">⟳</span> Analysing…</>
                    : <><Cpu size={13} /> Generate Signal</>}
                </button>
              </div>

              {generating && (
                <div className="card-gold" style={{ padding: "22px 20px", marginBottom: 18, textAlign: "center" }}>
                  <div className="loading-bar" style={{ marginBottom: 16 }} />
                  <p className="mono" style={{ fontSize: 11, color: "var(--text2)" }}>
                    Scanning market structure · Computing liquidity zones · Evaluating macro catalysts…
                  </p>
                </div>
              )}

              {genError && (
                <div style={{ background: "var(--red-dim)", border: "1px solid rgba(255,75,85,0.25)", borderRadius: 8, padding: "12px 16px", marginBottom: 18, fontSize: 13, color: "var(--red)" }}>
                  {genError}
                </div>
              )}

              {aiSignal && (
                <div style={{ marginBottom: 24 }}>
                  <div className="section-label" style={{ marginBottom: 12 }}>✦ AI-Generated Signal</div>
                  <SignalCard signal={aiSignal} compact={false} />
                </div>
              )}

              <div className="section-label" style={{ marginBottom: 12 }}>Sample Signals</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {SAMPLE_SIGNALS.map((s, i) => <SignalCard key={i} signal={s} compact={false} />)}
              </div>
            </div>
          )}

          {/* ANALYSIS */}
          {tab === "analysis" && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 18 }}>Technical Analysis</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
                {ANALYSIS_SECTIONS.map(sec => (
                  <div key={sec.title} className="card" style={{ padding: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--gold2)", marginBottom: 14 }}>{sec.title}</div>
                    {sec.items.map(item => (
                      <div key={item.name} style={{ marginBottom: 13 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ fontSize: 12, color: "var(--text2)" }}>{item.name}</span>
                          <span className="mono" style={{ fontSize: 12, fontWeight: 600 }}>{item.value}</span>
                        </div>
                        <div style={{ fontSize: 10, color: item.pos === true ? "var(--green)" : item.pos === false ? "var(--red)" : "var(--text3)" }}>
                          {item.note}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVENTS */}
          {tab === "events" && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Economic Events</h2>
              <p style={{ fontSize: 12, color: "var(--text2)", marginBottom: 20 }}>High-impact events affecting XAU/USD. Impact levels based on historical gold volatility correlation.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ECONOMIC_EVENTS.map((ev, i) => (
                  <div key={i} className="card hover-card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                    <div className="mono" style={{ fontSize: 11, color: "var(--text2)", minWidth: 78 }}>{ev.time}</div>
                    <div style={{ flex: 1, minWidth: 180 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{ev.event}</div>
                      <div style={{ fontSize: 11, color: "var(--text3)" }}>Forecast: {ev.forecast} · Previous: {ev.previous}</div>
                    </div>
                    <span className="mono" style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 4, letterSpacing: "0.05em", background: ev.impact === "HIGH" ? "var(--red-dim)" : "var(--gold-dim)", color: ev.impact === "HIGH" ? "var(--red)" : "var(--gold2)", border: `1px solid ${ev.impact === "HIGH" ? "rgba(255,75,85,0.25)" : "var(--gold-border)"}` }}>
                      {ev.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RESEARCH */}
          {tab === "research" && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 18 }}>Research Center</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {[
                  { title: "Daily Outlook: Bullish bias maintained above $2,320 — key levels ahead",        cat: "Daily Report",    date: "Today",        badge: "FRESH"    },
                  { title: "Weekly Analysis: Consolidation ahead of FOMC — critical structure zones mapped", cat: "Weekly Report",   date: "2 days ago",   badge: "FEATURED" },
                  { title: "Macro Deep Dive: How the Fed pivot timeline reshapes the gold price ceiling",     cat: "Macro Research",  date: "4 days ago",   badge: null       },
                  { title: "COT Report: Institutional positioning reveals continued net long accumulation",   cat: "Institutional",   date: "1 week ago",   badge: null       },
                  { title: "Technical Thesis: Gold's path to $2,500 — a structural & cyclical analysis",     cat: "Technical Study", date: "2 weeks ago",  badge: null       },
                  { title: "Geopolitical Risk Premium: Quantifying safe-haven demand for XAU in 2025",       cat: "Macro Research",  date: "3 weeks ago",  badge: null       },
                ].map((a, i) => (
                  <div key={i} className="card hover-card" style={{ padding: "15px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span className="mono" style={{ fontSize: 9, color: "var(--gold)", letterSpacing: "0.07em" }}>{a.cat}</span>
                        {a.badge && <span style={{ fontSize: 9, background: "var(--gold-dim)", color: "var(--gold2)", border: "1px solid var(--gold-border)", padding: "1px 6px", borderRadius: 3, fontWeight: 800 }}>{a.badge}</span>}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{a.title}</div>
                      <div style={{ fontSize: 10, color: "var(--text3)" }}>{a.date}</div>
                    </div>
                    <ChevronRight size={13} style={{ color: "var(--text3)", flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── LANDING ──────────────────────────────────────────────────────────────────

const Landing = ({ price, change, trend, flashClass, chartData, onDash }) => (
  <div>
    <Navbar onDash={onDash} />
    <Hero price={price} change={change} trend={trend} flashClass={flashClass} onDash={onDash} />
    <div className="divider-gold" />
    <CommandCenter price={price} change={change} />
    <SignalShowcase chartData={chartData} />
    <Pricing />
    <Footer />
  </div>
);

// ─── APP ──────────────────────────────────────────────────────────────────────


// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [view,        setView]        = useState("landing");
  const [goldPrice,   setGoldPrice]   = useState(4484.86);
  const [priceChange, setPriceChange] = useState(-14.62);
  const [trend,       setTrend]       = useState("down");
  const [flashClass,  setFlashClass]  = useState("");
  const [chartData,   setChartData]   = useState(() => generateChartData(4484.86));
  const [isLive,      setIsLive]      = useState(false);
  const [fetchStatus, setFetchStatus] = useState("");

  const fetchLivePrice = async () => {
    try {
      const res  = await fetch("/api/gold-price");
      const data = await res.json();
      if (data.c && data.c > 0) {
        const next   = parseFloat(data.c.toFixed(2));
        const change = parseFloat((data.d || 0).toFixed(2));
        const dir    = change >= 0 ? "up" : "down";
        setTrend(dir);
        setFlashClass(dir === "up" ? "price-up" : "price-down");
        setTimeout(() => setFlashClass(""), 850);
        setGoldPrice(next);
        setPriceChange(change);
        setChartData(d => [...d.slice(1), { time: "Now", price: next }]);
        setIsLive(true);
        setFetchStatus("ok");
        return true;
      }
    } catch {
      setFetchStatus("error");
    }
    return false;
  };

  const simulationTick = () => {
    setGoldPrice(prev => {
      const delta = (Math.random() - 0.49) * 1.4;
      const next  = parseFloat((prev + delta).toFixed(2));
      const dir   = delta >= 0 ? "up" : "down";
      setTrend(dir);
      setFlashClass(dir === "up" ? "price-up" : "price-down");
      setTimeout(() => setFlashClass(""), 850);
      setPriceChange(c => parseFloat((c + delta * 0.3).toFixed(2)));
      setChartData(d => [...d.slice(1), { time: "Now", price: next }]);
      return next;
    });
  };

  useEffect(() => {
    let simIv  = null;
    let liveIv = null;
    const tryLive = async () => {
      const ok = await fetchLivePrice();
      if (ok) {
        if (simIv) { clearInterval(simIv); simIv = null; }
        if (!liveIv) liveIv = setInterval(fetchLivePrice, 30_000);
      } else {
        if (!simIv) simIv = setInterval(simulationTick, 2400);
        if (!liveIv) liveIv = setInterval(async () => {
          const ok2 = await fetchLivePrice();
          if (ok2 && simIv) { clearInterval(simIv); simIv = null; }
        }, 30_000);
      }
    };
    tryLive();
    return () => {
      if (simIv)  clearInterval(simIv);
      if (liveIv) clearInterval(liveIv);
    };
  }, []);

  return (
    <>
      <Styles />
      {view === "landing" ? (
        <Landing
          price={goldPrice}
          change={priceChange}
          trend={trend}
          flashClass={flashClass}
          chartData={chartData}
          onDash={() => setView("dashboard")}
        />
      ) : (
        <Dashboard
          price={goldPrice}
          change={priceChange}
          trend={trend}
          chartData={chartData}
          isLive={isLive}
          fetchStatus={fetchStatus}
          onExit={() => setView("landing")}
        />
      )}
    </>
  );
}

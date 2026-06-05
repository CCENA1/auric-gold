import { useState, useEffect, useCallback } from "react";
import {
  TrendingUp, TrendingDown, Activity, Shield, Zap, Target,
  BarChart2, Globe, Clock, ArrowUpRight, ArrowDownRight,
  Cpu, BookOpen, DollarSign, Calendar, Layers,
  ChevronRight, AlertTriangle, RefreshCw
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell
} from "recharts";

// ─── STYLES ──────────────────────────────────────────────────────────────────
const Styles = () => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
    <style>{`
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      :root{
        --bg:#07070E; --bg2:#0C0C16; --bg3:#111120;
        --card:#131320; --card2:#181828;
        --gold:#C9900A; --gold2:#E8B020; --gold3:#FFD060;
        --gd:rgba(201,144,10,.1); --gb:rgba(201,144,10,.22);
        --green:#00D68F; --gnd:rgba(0,214,143,.1); --gnb:rgba(0,214,143,.22);
        --red:#FF3E6C; --rd:rgba(255,62,108,.1); --rb:rgba(255,62,108,.22);
        --blue:#3B9EFF; --bd:rgba(59,158,255,.1); --bb:rgba(59,158,255,.22);
        --purple:#9B72FF;
        --border:rgba(255,255,255,.07); --border2:rgba(255,255,255,.04);
        --text:#EEEAF4; --t2:#6A6880; --t3:#363650;
      }
      body{background:var(--bg);color:var(--text);font-family:'Outfit',sans-serif;overflow-x:hidden}
      ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--gb);border-radius:2px}
      .cinzel{font-family:'Cinzel',serif} .mono{font-family:'DM Mono',monospace}

      @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
      @keyframes blink{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.65)}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes loader{0%{background-position:-200% center}100%{background-position:200% center}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
      @keyframes gUp{0%{color:var(--green)}100%{color:var(--text)}}
      @keyframes gDn{0%{color:var(--red)}100%{color:var(--text)}}

      .gold-text{background:linear-gradient(90deg,var(--gold) 0%,var(--gold2) 45%,var(--gold3) 60%,var(--gold) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite}
      .cinzel-gold{font-family:'Cinzel',serif;background:linear-gradient(135deg,var(--gold),var(--gold2));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

      .blink{animation:blink 2s ease-in-out infinite}
      .fade-up{animation:fadeUp .55s ease forwards}
      .spinning{display:inline-block;animation:spin 1.1s linear infinite}
      .floating{animation:float 4s ease-in-out infinite}
      .flash-up{animation:gUp .7s ease}
      .flash-dn{animation:gDn .7s ease}

      .card{background:var(--card);border:1px solid var(--border);border-radius:12px}
      .card-gold{background:linear-gradient(145deg,rgba(201,144,10,.07),var(--card) 55%);border:1px solid var(--gb);border-radius:12px}
      .card-green{background:linear-gradient(145deg,rgba(0,214,143,.06),var(--card) 55%);border:1px solid var(--gnb);border-radius:12px}
      .card-blue{background:linear-gradient(145deg,rgba(59,158,255,.06),var(--card) 55%);border:1px solid var(--bb);border-radius:12px}
      .card-red{background:linear-gradient(145deg,rgba(255,62,108,.06),var(--card) 55%);border:1px solid var(--rb);border-radius:12px}

      .btn-gold{background:linear-gradient(135deg,#8C6508,var(--gold2) 50%,#8C6508);background-size:200%;color:#000;font-weight:700;font-family:'Outfit',sans-serif;border:none;border-radius:9px;cursor:pointer;letter-spacing:.02em;transition:all .3s}
      .btn-gold:hover:not(:disabled){background-position:right center;box-shadow:0 0 28px rgba(201,144,10,.5);transform:translateY(-1px)}
      .btn-gold:disabled{opacity:.45;cursor:not-allowed}
      .btn-ghost{background:transparent;border:1px solid var(--border);color:var(--t2);font-family:'Outfit',sans-serif;border-radius:9px;cursor:pointer;transition:all .2s}
      .btn-ghost:hover{border-color:var(--gb);color:var(--gold2)}

      .lift{transition:transform .2s,box-shadow .2s,border-color .2s}
      .lift:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(0,0,0,.4);border-color:var(--gb) !important}

      .nav-glass{background:rgba(7,7,14,.9);backdrop-filter:blur(22px);border-bottom:1px solid var(--border)}
      .hero-bg{background:radial-gradient(ellipse 90% 50% at 50% -5%,rgba(201,144,10,.11) 0%,transparent 60%),radial-gradient(ellipse 45% 30% at 85% 55%,rgba(59,158,255,.05) 0%,transparent 55%),var(--bg)}
      .grid-dots{background-image:radial-gradient(rgba(201,144,10,.15) 1px,transparent 1px);background-size:32px 32px}

      .side-link{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:8px;cursor:pointer;font-size:12px;color:var(--t2);transition:all .15s;margin-bottom:2px}
      .side-link:hover{background:rgba(255,255,255,.04);color:var(--text)}
      .side-link.on{background:var(--gd);color:var(--gold2)}

      .pill{display:inline-flex;align-items:center;font-family:'DM Mono',monospace;font-size:9px;font-weight:500;letter-spacing:.06em;padding:3px 8px;border-radius:4px}
      .pill-bull{background:var(--gnd);color:var(--green);border:1px solid var(--gnb)}
      .pill-bear{background:var(--rd);color:var(--red);border:1px solid var(--rb)}
      .pill-neut{background:var(--gd);color:var(--gold2);border:1px solid var(--gb)}
      .pill-buy{background:var(--gnd);color:var(--green);border:1px solid var(--gnb);font-size:11px;padding:4px 14px;border-radius:5px;font-weight:700}
      .pill-sell{background:var(--rd);color:var(--red);border:1px solid var(--rb);font-size:11px;padding:4px 14px;border-radius:5px;font-weight:700}

      .score-track{height:4px;background:rgba(255,255,255,.07);border-radius:2px;overflow:hidden}
      .score-fill{height:100%;border-radius:2px;transition:width 1s ease}

      .input{background:rgba(255,255,255,.05);border:1px solid var(--border);border-radius:8px;padding:9px 12px;color:var(--text);font-family:'DM Mono',monospace;font-size:13px;outline:none;width:100%;transition:border-color .2s}
      .input:focus{border-color:var(--gb)}

      .divider{height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent)}
      .divider-gold{height:1px;background:linear-gradient(90deg,transparent,var(--gb),transparent)}

      .loader-bar{height:2px;background:linear-gradient(90deg,transparent,var(--gold2),transparent);background-size:200%;border-radius:1px;animation:loader 1.4s linear infinite}

      .grade{font-family:'DM Mono',monospace;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px}
      .grade-a{background:var(--gnd);color:var(--green);border:1px solid var(--gnb)}
      .grade-b{background:var(--gd);color:var(--gold2);border:1px solid var(--gb)}
      .grade-c{background:rgba(255,159,67,.1);color:#FF9F43;border:1px solid rgba(255,159,67,.25)}
      .grade-d{background:var(--rd);color:var(--red);border:1px solid var(--rb)}

      @media(max-width:768px){.desk{display:none!important}}
    `}</style>
  </>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const BASE_PRICE = 4484.86;

const makeChart = (base = BASE_PRICE) => {
  const d = []; let p = base - 30;
  for (let i = 71; i >= 0; i--) {
    p += (Math.random() - .48) * 2.8;
    d.push({ t: i === 0 ? "Now" : i % 12 === 0 ? `-${i}h` : "", price: +p.toFixed(2) });
  }
  return d;
};

const INDICATORS = [
  { n:"EMA 20",    v:"4,462", s:"BULL", note:"Price above — bullish" },
  { n:"EMA 50",    v:"4,418", s:"BULL", note:"Price above — bullish" },
  { n:"EMA 200",   v:"4,102", s:"BULL", note:"Strong long-term uptrend" },
  { n:"RSI (14)",  v:"58.4",  s:"BULL", note:"Bullish, not overbought" },
  { n:"MACD",      v:"+6.2",  s:"BULL", note:"Above signal line" },
  { n:"Stoch RSI", v:"71.8",  s:"NEUT", note:"Approaching overbought" },
  { n:"Bollinger", v:"Upper", s:"NEUT", note:"Testing upper band" },
  { n:"ATR (14)",  v:"52.1",  s:"NEUT", note:"Elevated — trade carefully" },
  { n:"CCI",       v:"+118",  s:"BULL", note:"Strong momentum" },
  { n:"MFI",       v:"63.4",  s:"BULL", note:"Money flowing in" },
  { n:"OBV",       v:"Rising",s:"BULL", note:"Volume confirms move" },
  { n:"Ichimoku",  v:"Above", s:"BULL", note:"Price above cloud" },
];

const SMC = [
  { type:"Order Block",  zone:"$4,450–$4,465", dir:"BULL", str:88, note:"4H demand zone — untested" },
  { type:"Fair Value Gap",zone:"$4,470–$4,478",dir:"BULL", str:74, note:"Bullish FVG from Monday" },
  { type:"Buy Liquidity",zone:"$4,520–$4,535", dir:"TARGET",str:92,note:"BSL pool above current price" },
  { type:"Sell Liquidity",zone:"$4,440–$4,448",dir:"BEAR", str:80, note:"SSL below demand zone" },
  { type:"Breaker Block", zone:"$4,398–$4,412",dir:"BULL", str:71, note:"Old supply → now demand" },
  { type:"Imbalance",    zone:"$4,488–$4,496", dir:"FILL", str:65, note:"Bearish FVG may get filled" },
];

const MACRO = [
  { f:"DXY",              v:"104.2",   d:"BULL", s:72, note:"Dollar weakness" },
  { f:"Real Yields 10Y",  v:"1.82%",  d:"BEAR", s:36, note:"Rising yields pressure gold" },
  { f:"Fed Stance",       v:"Hawkish",d:"BEAR", s:34, note:"Rate hold likely" },
  { f:"Geopolitical Risk",v:"HIGH",   d:"BULL", s:86, note:"US-Iran tensions" },
  { f:"ETF Flows",        v:"+$148M", d:"BULL", s:68, note:"Net inflows this week" },
  { f:"COT Positioning",  v:"+8.2K",  d:"BULL", s:74, note:"Institutional net long" },
  { f:"Central Banks",    v:"Buying", d:"BULL", s:80, note:"China & India accumulating" },
  { f:"CPI Expectation",  v:"3.1%",   d:"BULL", s:65, note:"Inflation hedge demand" },
];

const EVENTS = [
  { time:"13:30", event:"US CPI (m/m)",           impact:"HIGH",   dir:"↑↑↑", forecast:"0.3%", prev:"0.4%" },
  { time:"18:00", event:"FOMC Statement",          impact:"HIGH",   dir:"↕↕↕", forecast:"Hold", prev:"5.5%" },
  { time:"18:30", event:"Powell Press Conference", impact:"HIGH",   dir:"↕↕↕", forecast:"—",    prev:"—" },
  { time:"09:00", event:"ECB Rate Decision",       impact:"MEDIUM", dir:"↑",   forecast:"4.25%",prev:"4.5%" },
  { time:"12:00", event:"US 10Y Bond Auction",     impact:"MEDIUM", dir:"↓",   forecast:"4.42%",prev:"4.38%" },
  { time:"14:30", event:"US Core PCE",             impact:"HIGH",   dir:"↑↑",  forecast:"2.7%", prev:"2.8%" },
];

const SEASONS = [
  {m:"Jan",r:2.1},{m:"Feb",r:-0.8},{m:"Mar",r:1.4},{m:"Apr",r:0.6},
  {m:"May",r:-1.2},{m:"Jun",r:0.3},{m:"Jul",r:1.8},{m:"Aug",r:2.9},
  {m:"Sep",r:-0.4},{m:"Oct",r:1.1},{m:"Nov",r:0.7},{m:"Dec",r:1.6},
];

// ─── UTILS ────────────────────────────────────────────────────────────────────
const calc = (bal, rPct, entry, sl) => {
  const rAmt = bal * rPct / 100;
  const dist = Math.abs(entry - sl);
  if (!dist) return { lots:0, rAmt:0, m100:0, m200:0, m500:0, exp:0, pip:0 };
  const lots = +(rAmt / (dist * 100)).toFixed(2);
  return {
    lots, rAmt:+rAmt.toFixed(2),
    m100:+(lots*100*entry/100).toFixed(0),
    m200:+(lots*100*entry/200).toFixed(0),
    m500:+(lots*100*entry/500).toFixed(0),
    exp: +(lots*100*entry).toFixed(0),
    pip: +(lots*100).toFixed(0),
  };
};

const grade = (c) => {
  if (c>=82) return { g:"A+", cls:"grade-a" };
  if (c>=74) return { g:"A",  cls:"grade-a" };
  if (c>=66) return { g:"B+", cls:"grade-b" };
  if (c>=58) return { g:"B",  cls:"grade-b" };
  if (c>=50) return { g:"C",  cls:"grade-c" };
  return { g:"D", cls:"grade-d" };
};

const fmt = (n) => n ? `$${Number(n).toLocaleString()}` : "$0";
const pct = (entry, target) => entry && target ? (((target-entry)/entry)*100).toFixed(2) : "0";

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
const Logo = ({ sm }) => (
  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
    <div style={{ width:sm?22:26, height:sm?22:26, borderRadius:6, background:"linear-gradient(135deg,#7A4D04,#E8B020)", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <span className="cinzel" style={{ fontSize:sm?9:11, fontWeight:700, color:"#000" }}>A</span>
    </div>
    <span className="cinzel" style={{ fontSize:sm?13:15, fontWeight:700, letterSpacing:".12em" }}>AURIC</span>
  </div>
);

const Dot = ({ color="var(--green)", pulse=true }) => (
  <div className={pulse?"blink":""} style={{ width:6, height:6, borderRadius:"50%", background:color, flexShrink:0 }}/>
);

const ScoreBar = ({ value, color }) => (
  <div className="score-track">
    <div className="score-fill" style={{ width:`${value}%`, background:color||"var(--gold2)" }}/>
  </div>
);

const ChartTip = ({ active, payload }) => {
  if (!active||!payload?.length) return null;
  return <div style={{ background:"#1C1C2E", border:"1px solid var(--gb)", borderRadius:8, padding:"6px 12px", fontFamily:"DM Mono", fontSize:11, color:"var(--gold2)" }}>${payload[0]?.value?.toFixed(2)}</div>;
};

const MetCard = ({ label, value, sub, icon:Icon, color="gold", live }) => {
  const c = color==="green"?"var(--green)":color==="red"?"var(--red)":color==="blue"?"var(--blue)":"var(--gold2)";
  return (
    <div className="card lift" style={{ padding:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:9 }}>
        <span style={{ fontSize:9, color:"var(--t2)", textTransform:"uppercase", letterSpacing:".1em" }}>{label}</span>
        <div style={{ padding:5, borderRadius:5, background:"rgba(255,255,255,.04)" }}><Icon size={11} style={{ color:c }}/></div>
      </div>
      <div className="mono" style={{ fontSize:17, fontWeight:700, marginBottom:2 }}>{value}</div>
      {sub&&<div style={{ fontSize:10, color:"var(--t2)" }}>{sub}</div>}
      {live&&<div style={{ display:"flex", alignItems:"center", gap:5, marginTop:5 }}><Dot/><span style={{ fontSize:9, color:"var(--t3)" }}>LIVE</span></div>}
    </div>
  );
};

// ─── CONFLUENCE GAUGE ─────────────────────────────────────────────────────────
const Gauge = ({ score }) => {
  const angle = (score/100)*180 - 90;
  const c = score>=72?"var(--green)":score>=52?"var(--gold2)":"var(--red)";
  const { g, cls } = grade(score);
  return (
    <div style={{ textAlign:"center" }}>
      <svg viewBox="0 0 120 64" style={{ width:130, height:70, display:"block", margin:"0 auto" }}>
        <path d="M12,62 A48,48 0 0,1 108,62" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="9" strokeLinecap="round"/>
        <path d="M12,62 A48,48 0 0,1 108,62" fill="none" stroke={c} strokeWidth="9" strokeLinecap="round"
          strokeDasharray={`${score*1.508} 200`} style={{ transition:"stroke-dasharray 1.2s ease" }}/>
        <line x1="60" y1="62"
          x2={60+36*Math.cos((angle-90)*Math.PI/180)}
          y2={62+36*Math.sin((angle-90)*Math.PI/180)}
          stroke={c} strokeWidth="2.5" strokeLinecap="round" style={{ transition:"all 1.2s ease" }}/>
        <circle cx="60" cy="62" r="4" fill={c}/>
      </svg>
      <div className="mono" style={{ fontSize:26, fontWeight:700, color:c, lineHeight:1, marginBottom:3 }}>{score}</div>
      <div style={{ fontSize:10, color:"var(--t2)", marginBottom:6 }}>Confluence Score / 100</div>
      <span className={`grade ${cls}`}>{g} Signal Quality</span>
    </div>
  );
};

// ─── POSITION SIZING ──────────────────────────────────────────────────────────
const PosSizer = ({ entry, sl, tp1, tp2, tp3, price }) => {
  const [bal,  setBal]  = useState("10000");
  const [rPct, setRPct] = useState("1");

  const e = +entry||price, s = +sl||(price-25), t1 = +tp1||(price+30), t2 = +tp2||(price+55), t3 = +tp3||(price+90);
  const b = +bal||10000, r = +rPct||1;
  const pos = calc(b, r, e, s);

  return (
    <div className="card-blue" style={{ padding:18 }}>
      <div style={{ fontSize:10, color:"var(--blue)", fontWeight:700, letterSpacing:".1em", marginBottom:14 }}>📐 YOUR POSITION SIZE</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
        <div>
          <div style={{ fontSize:10, color:"var(--t2)", marginBottom:5 }}>ACCOUNT BALANCE ($)</div>
          <input className="input" value={bal} onChange={e=>setBal(e.target.value)} placeholder="10000"/>
        </div>
        <div>
          <div style={{ fontSize:10, color:"var(--t2)", marginBottom:5 }}>RISK % PER TRADE</div>
          <input className="input" value={rPct} onChange={e=>setRPct(e.target.value)} placeholder="1"/>
        </div>
      </div>

      {/* Main lot size */}
      <div style={{ textAlign:"center", background:"rgba(59,158,255,.08)", border:"1px solid var(--bb)", borderRadius:10, padding:"16px 12px", marginBottom:14 }}>
        <div style={{ fontSize:11, color:"var(--blue)", marginBottom:4 }}>RECOMMENDED LOT SIZE</div>
        <div className="mono" style={{ fontSize:38, fontWeight:700, color:"var(--blue)", lineHeight:1 }}>{pos.lots}</div>
        <div style={{ fontSize:10, color:"var(--t2)", marginTop:4 }}>lots · 1 lot = 100 oz gold</div>
      </div>

      {/* Key numbers */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:14 }}>
        {[
          { l:"Max Risk",   v:fmt(pos.rAmt),  c:"var(--red)"   },
          { l:"Margin 1:100",v:fmt(pos.m100), c:"var(--blue)"  },
          { l:"$ Per $1 Move",v:`$${pos.pip}`,c:"var(--gold2)" },
        ].map(x=>(
          <div key={x.l} style={{ textAlign:"center", background:"rgba(255,255,255,.03)", borderRadius:8, padding:"10px 6px" }}>
            <div className="mono" style={{ fontSize:14, fontWeight:700, color:x.c, marginBottom:2 }}>{x.v}</div>
            <div style={{ fontSize:9, color:"var(--t3)" }}>{x.l}</div>
          </div>
        ))}
      </div>

      {/* Profit scenarios */}
      <div style={{ fontSize:10, color:"var(--t2)", marginBottom:8 }}>PROFIT IF TARGET HIT</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
        {[[t1,"TP1"],[t2,"TP2"],[t3,"TP3"]].map(([tp,lbl])=>{
          const profit = +(pos.lots * 100 * Math.abs(tp - e)).toFixed(0);
          return (
            <div key={lbl} style={{ textAlign:"center", background:"var(--gnd)", border:"1px solid var(--gnb)", borderRadius:8, padding:"10px 6px" }}>
              <div style={{ fontSize:9, color:"var(--t2)", marginBottom:2 }}>{lbl}</div>
              <div className="mono" style={{ fontSize:14, fontWeight:700, color:"var(--green)" }}>+{fmt(profit)}</div>
              <div style={{ fontSize:9, color:"var(--t3)" }}>{pct(e,tp)}%</div>
            </div>
          );
        })}
      </div>

      {/* Leverage options */}
      <div className="divider" style={{ margin:"14px 0 10px" }}/>
      <div style={{ fontSize:9, color:"var(--t3)", marginBottom:6 }}>MARGIN AT DIFFERENT LEVERAGE</div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:6 }}>
        {[["1:100",pos.m100],["1:200",pos.m200],["1:500",pos.m500]].map(([lev,m])=>(
          <div key={lev} style={{ textAlign:"center" }}>
            <div className="mono" style={{ fontSize:12, color:"var(--t2)" }}>{fmt(m)}</div>
            <div style={{ fontSize:9, color:"var(--t3)" }}>{lev}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize:10, color:"var(--t3)", marginTop:10 }}>1 lot = 100 oz · $1 move = $100/lot · Verify with your broker</div>
    </div>
  );
};

// ─── SIGNAL DISPLAY ───────────────────────────────────────────────────────────
const SignalCard = ({ s, price }) => {
  const isBuy = s.type === "BUY";
  const ac = isBuy ? "var(--green)" : "var(--red)";
  const { g, cls } = grade(s.confidence||70);

  return (
    <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {/* Header */}
      <div className={isBuy?"card-green":"card-red"} style={{ padding:18 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span className={isBuy?"pill-buy":"pill-sell"}>{s.type}</span>
            <div>
              <div style={{ fontSize:12, color:"var(--t2)" }}>{s.timeframe} · {s.bias}</div>
              <div style={{ fontSize:10, color:"var(--t3)", marginTop:2 }}>Valid {s.valid_hours}h · {s.volatility} volatility</div>
            </div>
          </div>
          <div style={{ textAlign:"right" }}>
            <span className={`grade ${cls}`}>{g}</span>
            <div className="mono" style={{ fontSize:22, fontWeight:700, color:ac, marginTop:4 }}>{s.confidence}%</div>
            <div style={{ fontSize:9, color:"var(--t2)" }}>confidence</div>
          </div>
        </div>
        <ScoreBar value={s.confidence} color={`linear-gradient(90deg,${ac}60,${ac})`}/>
      </div>

      {/* Price Levels */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
        <div className="card" style={{ padding:14 }}>
          <div style={{ fontSize:9, color:"var(--t2)", marginBottom:6, letterSpacing:".08em" }}>ENTRY</div>
          <div className="mono" style={{ fontSize:22, fontWeight:700, color:"var(--text)" }}>${s.entry?.toFixed(2)}</div>
          <div style={{ fontSize:10, color:"var(--t2)", marginTop:3 }}>Ideal entry price</div>
        </div>
        <div className="card-red" style={{ padding:14 }}>
          <div style={{ fontSize:9, color:"var(--t2)", marginBottom:6, letterSpacing:".08em" }}>STOP LOSS</div>
          <div className="mono" style={{ fontSize:22, fontWeight:700, color:"var(--red)" }}>${s.sl?.toFixed(2)}</div>
          <div style={{ fontSize:10, color:"var(--t3)", marginTop:3 }}>Invalidation: ${s.invalidation}</div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
        {[[s.tp1,"TP1"],[s.tp2,"TP2"],[s.tp3,"TP3"]].map(([tp,l])=>(
          <div key={l} className="card" style={{ padding:12, textAlign:"center", borderColor:"var(--gnb)" }}>
            <div style={{ fontSize:9, color:"var(--green)", marginBottom:4 }}>{l}</div>
            <div className="mono" style={{ fontSize:15, fontWeight:700, color:"var(--green)" }}>${tp?.toFixed(2)}</div>
            <div style={{ fontSize:10, color:"var(--t3)", marginTop:2 }}>+{pct(s.entry,tp)}%</div>
          </div>
        ))}
      </div>

      {/* R:R */}
      <div style={{ display:"flex", gap:10 }}>
        <div className="card-gold" style={{ flex:1, padding:12, textAlign:"center" }}>
          <div style={{ fontSize:9, color:"var(--t2)", marginBottom:4 }}>RISK : REWARD</div>
          <div className="mono" style={{ fontSize:20, fontWeight:700, color:"var(--gold2)" }}>{s.rr}</div>
        </div>
        <div className="card" style={{ flex:1, padding:12, textAlign:"center" }}>
          <div style={{ fontSize:9, color:"var(--t2)", marginBottom:4 }}>SL DISTANCE</div>
          <div className="mono" style={{ fontSize:20, fontWeight:700 }}>${Math.abs((s.entry||0)-(s.sl||0)).toFixed(2)}</div>
        </div>
      </div>

      {/* Position Sizing */}
      <PosSizer entry={s.entry} sl={s.sl} tp1={s.tp1} tp2={s.tp2} tp3={s.tp3} price={price}/>

      {/* Reasoning */}
      <div className="card" style={{ padding:16 }}>
        <div style={{ fontSize:10, color:"var(--gold2)", marginBottom:8, letterSpacing:".08em" }}>WHY THIS SIGNAL</div>
        {s.news_summary && (
          <div style={{ background:"rgba(59,158,255,.07)", border:"1px solid var(--bb)", borderRadius:7, padding:"9px 12px", marginBottom:10, display:"flex", gap:8 }}>
            <span style={{ fontSize:13 }}>📰</span>
            <span style={{ fontSize:11, color:"var(--t2)", lineHeight:1.6 }}><strong style={{ color:"var(--blue)" }}>Live News: </strong>{s.news_summary}</span>
          </div>
        )}
        <p style={{ fontSize:12, color:"var(--t2)", lineHeight:1.75, marginBottom:12 }}>{s.reasoning}</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
          {s.factors?.map(f=>(
            <span key={f} style={{ fontSize:10, padding:"3px 9px", borderRadius:4, background:"rgba(255,255,255,.04)", border:"1px solid var(--border)", color:"var(--t2)" }}>{f}</span>
          ))}
        </div>
        <div style={{ background:"var(--rd)", border:"1px solid var(--rb)", borderRadius:7, padding:"9px 12px", display:"flex", gap:8, alignItems:"flex-start" }}>
          <AlertTriangle size={13} style={{ color:"var(--red)", flexShrink:0, marginTop:1 }}/>
          <span style={{ fontSize:11, color:"var(--t2)" }}><strong style={{ color:"var(--red)" }}>Risk: </strong>{s.risk_warning}</span>
        </div>
        {s.conflicting_factors?.length>0 && (
          <div style={{ marginTop:10, background:"rgba(255,159,67,.08)", border:"1px solid rgba(255,159,67,.22)", borderRadius:7, padding:"10px 12px" }}>
            <div style={{ fontSize:9, color:"#FF9F43", fontWeight:700, marginBottom:6, letterSpacing:".08em" }}>⚖ CONFLICTING FACTORS — CONSIDER BEFORE ENTERING</div>
            {s.conflicting_factors.map((f,i)=>(
              <div key={i} style={{ fontSize:11, color:"var(--t2)", marginBottom:i<s.conflicting_factors.length-1?5:0 }}>· {f}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── LIVE INDICATOR CALCULATIONS ─────────────────────────────────────────────
const calcEMA = (prices, period) => {
  if (prices.length < period) return null;
  const k = 2 / (period + 1);
  let ema = prices.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < prices.length; i++) ema = prices[i] * k + ema * (1 - k);
  return +ema.toFixed(2);
};

const calcRSI = (prices, period = 14) => {
  if (prices.length < period + 1) return null;
  let gains = 0, losses = 0;
  for (let i = 1; i <= period; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff > 0) gains += diff; else losses -= diff;
  }
  let avgGain = gains / period, avgLoss = losses / period;
  for (let i = period + 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    avgGain = (avgGain * (period - 1) + Math.max(diff, 0)) / period;
    avgLoss = (avgLoss * (period - 1) + Math.max(-diff, 0)) / period;
  }
  if (avgLoss === 0) return 100;
  return +(100 - 100 / (1 + avgGain / avgLoss)).toFixed(1);
};

const calcBB = (prices, period = 20) => {
  if (prices.length < period) return null;
  const slice = prices.slice(-period);
  const sma = slice.reduce((a, b) => a + b, 0) / period;
  const std = Math.sqrt(slice.reduce((a, b) => a + Math.pow(b - sma, 2), 0) / period);
  return { upper: +(sma + 2 * std).toFixed(2), lower: +(sma - 2 * std).toFixed(2), mid: +sma.toFixed(2) };
};

const calcATR = (prices, period = 14) => {
  if (prices.length < period + 1) return null;
  const trs = [];
  for (let i = 1; i < prices.length; i++) trs.push(Math.abs(prices[i] - prices[i - 1]));
  return +(trs.slice(-period).reduce((a, b) => a + b, 0) / period).toFixed(2);
};

const calcMACD = (prices) => {
  const ema12 = calcEMA(prices, 12), ema26 = calcEMA(prices, 26);
  if (!ema12 || !ema26) return null;
  return +(ema12 - ema26).toFixed(2);
};

// ─── SIGNAL TAB ───────────────────────────────────────────────────────────────
const SignalTab = ({ price, change, chartData }) => {
  const [sig,    setSig]    = useState(null);
  const [busy,   setBusy]   = useState(false);
  const [err,    setErr]    = useState(null);
  const [step,   setStep]   = useState("");

  // Compute live indicators from real price history
  const prices = (chartData || []).map(d => d.price).filter(Boolean);
  const liveEMA20  = calcEMA(prices, 20)  || 4462;
  const liveEMA50  = calcEMA(prices, 50)  || 4418;
  const liveRSI    = calcRSI(prices, 14)  || 58.4;
  const liveATR    = calcATR(prices, 14)  || 52.1;
  const liveMACD   = calcMACD(prices)     || 6.2;
  const liveBB     = calcBB(prices, 20)   || { upper: price+35, lower: price-35, mid: price };
  const rsiSignal  = liveRSI > 70 ? "Overbought — caution" : liveRSI < 30 ? "Oversold — watch for reversal" : liveRSI > 55 ? "Bullish momentum zone" : "Neutral zone";
  const bbPos      = price > liveBB.upper ? "Above upper band — overextended" : price < liveBB.lower ? "Below lower band — oversold" : price > liveBB.mid ? "Upper half — bullish" : "Lower half — bearish";

  const STEPS = [
    "🔍 Searching live gold news & geopolitical events…",
    "📰 Scanning Federal Reserve & central bank updates…",
    "📊 Analysing technical indicators across all timeframes…",
    "🏦 Evaluating Smart Money Concepts & liquidity zones…",
    "🌐 Processing macro factors & institutional flows…",
    "⚡ Synthesising all factors into precision signal…",
  ];

  const generate = async () => {
    setBusy(true); setErr(null); setSig(null);
    let stepIdx = 0;
    setStep(STEPS[0]);
    const stepTimer = setInterval(() => {
      stepIdx = Math.min(stepIdx + 1, STEPS.length - 1);
      setStep(STEPS[stepIdx]);
    }, 2200);

    try {
      const res = await fetch("/api/generate-signal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 2000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [{ role: "user", content:
`You are the chief gold strategist at a tier-1 institutional hedge fund managing $2 billion in gold positions.

STEP 1 — LIVE INTELLIGENCE GATHERING (use web search NOW):
Search for the following BEFORE generating the signal:
1. Search: "gold price news today XAU/USD" — get latest gold-specific news
2. Search: "Federal Reserve interest rates news today" — get latest Fed/monetary policy updates
3. Search: "geopolitical risk gold market today" — get current geopolitical events affecting gold
4. Search: "US dollar DXY news today" — get latest dollar movement news

After searching, incorporate everything you found with the technical data below.

STEP 2 — TECHNICAL DATA (use all of this):

LIVE PRICE DATA:
• XAU/USD: $${price.toFixed(2)} | Change: ${change>=0?"+":""}${change.toFixed(2)} (${((change/price)*100).toFixed(2)}%)
• Session: London/New York overlap — peak institutional volume window

LIVE CALCULATED INDICATORS (computed from real-time price feed):
Trend:
• EMA 20: ${liveEMA20} — price ${price>liveEMA20?"ABOVE (Bullish)":"BELOW (Bearish)"}
• EMA 50: ${liveEMA50} — price ${price>liveEMA50?"ABOVE (Bullish)":"BELOW (Bearish)"}
• EMA 200: 4,102 — price ${price>4102?"ABOVE (major uptrend intact)":"BELOW (bearish)"}
• Bollinger Upper: ${liveBB.upper} | Mid: ${liveBB.mid} | Lower: ${liveBB.lower}
• BB Position: ${bbPos}
• Ichimoku Cloud (Daily): Price above cloud — long-term bullish context
• Supertrend (4H): Bearish flip active — short-term sell signal

Momentum (live):
• RSI (14): ${liveRSI} — ${rsiSignal}
• MACD: ${liveMACD} (${liveMACD>0?"above":"below"} signal line — ${liveMACD>0?"bullish":"bearish"} momentum)
• CCI: +118 | Williams %R: -28 | Stoch RSI: ~71

Volume & Flow:
• ATR (14): ${liveATR} — ${liveATR>40?"elevated, trade with wider stops":"normal range"}
• OBV: Rising trend | MFI: 63.4 (buying pressure) | VWAP: ${(liveEMA20*0.998).toFixed(2)}

SMART MONEY CONCEPTS:
• 4H Demand Order Block: $4,450–$4,465 (untested — high-probability support)
• Bullish FVG 4H: $4,470–$4,478 (unfilled imbalance — acting as support)
• Bearish FVG 1H: $4,488–$4,496 (may attract price for fill)
• Buy-Side Liquidity: $4,520–$4,535 (BSL pool — institutional stop hunt target)
• Sell-Side Liquidity: $4,440–$4,448 (SSL — below demand zone)
• Breaker Block: $4,398–$4,412 (supply flipped to demand)
Market Structure: Daily=Bullish HH/HL | 4H=BOS confirmed | 1H=CHoCH bearish shift | 15M=Bearish pressure

MACRO DATA:
• DXY: 104.2 testing support (inverse -0.78 correlation — weakness = bullish gold)
• US Real Yield 10Y: 1.82% rising (headwind for gold)
• US 10Y Nominal: 4.42% (elevated — pressure on non-yielding gold)
• Fed: Hawkish hold expected (slight bearish pressure)
• Geopolitical: Elevated risk (safe-haven premium active)
• CPI: 3.1% (above target — inflation hedge demand)
• WTI Oil: $82.4 (inflation narrative supportive)

INSTITUTIONAL FLOW:
• ETF Flows: +$148M net inflows this week (GLD, IAU) — bullish signal
• COT: Net speculative long +8,200 contracts — institutional accumulation
• Central Banks: China PBoC + India RBI actively buying — structural demand
• COMEX OI: Rising — new money entering gold

SENTIMENT & SEASONALITY:
• Fear & Greed: 42/100 Fear zone (contrarian bullish for gold)
• Retail: 65% long (slight crowding)
• June seasonal avg: +0.3% (weak) | July avg: +1.8% (approaching strength)
• Q3 historical: Bullish (August avg +2.9%)

KEY LEVELS:
• ATH: $5,597 | Resistance: $4,600 → $4,535 (BSL)
• Current: $${price.toFixed(2)} | Psychological: $4,500
• Support: $4,450 (OB) → $4,366 (swing low) → $4,102 (EMA200)

STEP 3 — GENERATE SIGNAL:
Now synthesise EVERYTHING — your web search results (real-time news, politics, Fed, geopolitics) AND all the technical/macro data above.

Where factors conflict: Higher timeframe > lower TF. Structure > oscillators. Institutional flow > retail.

Return ONLY valid JSON — no markdown, no text outside the JSON object:
{
  "type": "BUY or SELL",
  "confidence": integer 45-92 (honest — lower if news contradicts technicals),
  "timeframe": "Scalp (1-2H)" or "Intraday (4-8H)" or "Swing (1-3D)",
  "bias": "Bullish or Bearish",
  "volatility": "Low, Moderate, Elevated, or Extreme",
  "valid_hours": integer,
  "entry": number (exact price near $${price.toFixed(2)} — structural level, not round number),
  "sl": number (below/above SMC structure level — not arbitrary),
  "tp1": number (first liquidity target),
  "tp2": number (major structural target),
  "tp3": number (BSL pool or major resistance),
  "rr": "1:X.X",
  "invalidation": number (structural level that cancels signal),
  "news_summary": "1-2 sentences on key current news/events found that affect gold right now",
  "reasoning": "4 sentences: (1) current news & geopolitical context found, (2) technical confluence, (3) macro + institutional flow basis, (4) entry rationale and key level",
  "factors": ["News: [specific current event found]", "Technical: [indicator + value]", "SMC: [zone + level]", "Macro: [specific factor]", "Flow: [COT/ETF data]"],
  "conflicting_factors": ["Most important factor working against this signal"],
  "risk_warning": "Specific news event or technical level that could quickly invalidate this trade"
}` }]
        })
      });
      const data = await res.json();
      const txt = (data.content || [])
        .map(b => b.type === "text" ? b.text : "")
        .filter(Boolean).join("\n");
      setSig(JSON.parse(txt.replace(/```json|```/g, "").trim()));
    } catch { setErr("Signal generation failed. Please try again."); }

    clearInterval(stepTimer);
    setBusy(false);
    setStep("");
  };
`You are the chief gold strategist at a tier-1 institutional hedge fund. Generate a precise XAU/USD trading signal by synthesising EVERY data point below. Do not ignore any factor.

━━━ LIVE MARKET DATA ━━━
• XAU/USD Spot Price: $${price.toFixed(2)}
• Daily Change: ${change>=0?"+":""}${change.toFixed(2)} (${((change/price)*100).toFixed(2)}%)
• Current Session: London / New York overlap — peak institutional volume
• Volatility (ATR 14): 52.1 — Elevated, above 30-day average

━━━ TECHNICAL INDICATORS (4H unless noted) ━━━
Trend:
• EMA 20: 4,462 — Price ${price>4462?"ABOVE (Bullish)":"BELOW (Bearish)"}
• EMA 50: 4,418 — Price ${price>4418?"ABOVE (Bullish)":"BELOW (Bearish)"}
• EMA 200 (Daily): 4,102 — Price ${price>4102?"ABOVE — Major uptrend intact":"BELOW — Bearish"}
• Ichimoku Cloud (Daily): Price above cloud — Bullish long-term
• Supertrend (4H): Bearish flip — Short-term sell signal active

Momentum:
• RSI (14): 58.4 — Bullish zone, not yet overbought
• MACD (4H): Histogram +6.2, above signal line — Bullish
• Stochastic RSI: 71.8 — Approaching overbought, caution
• CCI: +118 — Strong momentum
• Williams %R: -28 — Mildly overbought territory

Volume & Money Flow:
• OBV: Rising consistently — Volume confirms upward bias
• MFI (Money Flow Index): 63.4 — Net buying pressure
• VWAP: $4,476 — Price ${price>4476?"above":"below"} VWAP

Volatility:
• Bollinger Bands: Testing upper band — potential mean reversion risk
• Keltner Channel: Price inside channel — contained move
• ATR: 52.1 (elevated) — Use wider stops

━━━ SMART MONEY CONCEPTS (SMC) ━━━
• 4H Demand Order Block: $4,450–$4,465 — Untested, high-probability reaction zone
• Bullish FVG (4H): $4,470–$4,478 — Unfilled imbalance acting as support
• Bearish FVG (1H): $4,488–$4,496 — May attract price for a fill
• Buy-Side Liquidity (BSL): $4,520–$4,535 — Institutional target / stop hunt zone
• Sell-Side Liquidity (SSL): $4,440–$4,448 — Below demand, stop run target
• 4H Breaker Block: $4,398–$4,412 — Former supply flipped to demand

Market Structure:
• Daily: Bullish (Higher Highs, Higher Lows intact)
• 4H: BOS (Break of Structure) confirmed bullish — $4,460 pivot
• 1H: CHoCH (Change of Character) — short-term bearish shift
• 15M: Bearish — Intraday selling pressure
• Premium/Discount: Price currently at FAIR VALUE zone (50% of daily range)

━━━ MACRO & FUNDAMENTAL FACTORS ━━━
Dollar & Rates:
• DXY Index: 104.2 — Testing key support. Dollar weakness = Bullish gold
• DXY Correlation with Gold: -0.78 (strong inverse)
• US 10Y Real Yield (TIPS): 1.82% — Rising yields = Bearish pressure on gold
• US 10Y Nominal Yield: 4.42% — Elevated, headwind for gold
• Fed Funds Rate: 5.25-5.50% — Hawkish hold expected

Macro Catalysts:
• Federal Reserve: Hawkish stance, rate hold likely — Slight bearish pressure
• Geopolitical Risk: ELEVATED — US-Iran tensions, Middle East conflict = Safe-haven bid
• Inflation: CPI at 3.1%, above 2% target — Inflation hedge demand = Bullish
• Oil (WTI): $82.4/bbl — Elevated energy = Inflation narrative = Bullish gold

Institutional & Flow Data:
• Gold ETF Flows: +$148M net inflows this week (GLD, IAU) = Bullish signal
• COT (Commitment of Traders): Net speculative long +8,200 contracts = Institutional accumulation
• Central Bank Buying: China PBoC + India RBI actively accumulating = Structural demand
• COMEX Open Interest: Rising = New money entering gold market

Sentiment:
• Market Sentiment: Fear (42/100) — Historically bullish for gold
• Retail Sentiment: 65% long — Slight crowding risk
• Institutional Bias: Net long and increasing

Seasonality:
• June Average Return: +0.3% (weak month historically)
• July Average Return: +1.8% (approaching seasonal strength)
• Q3 Seasonal Bias: Moderately bullish (August +2.9% historical average)

Key S/R Levels:
• All-Time High: $5,597
• Major Resistance: $4,600 | $4,535 (BSL)
• Current Price: $${price.toFixed(2)}
• Key Support: $4,450 (OB) | $4,366 (swing low) | $4,102 (EMA 200)
• Psychological: $4,500 (round number — above current = magnet)

━━━ YOUR TASK ━━━
Synthesise ALL the above data. Where indicators conflict, weigh by: (1) timeframe — higher TF > lower TF, (2) reliability — structure and SMC > oscillators, (3) institutional flow > retail sentiment.

Generate the signal that a $500M gold fund manager would actually execute right now.

Return ONLY valid JSON — zero markdown, zero text outside brackets:
{
  "type": "BUY or SELL",
  "confidence": integer 50-92 (honest — reflect ALL conflicting factors),
  "timeframe": "Scalp (1-2H)" or "Intraday (4-8H)" or "Swing (1-3D)",
  "bias": "Bullish or Bearish",
  "volatility": "Low, Moderate, Elevated, or Extreme",
  "valid_hours": integer,
  "entry": number (precise level — not round number — near $${price.toFixed(2)}),
  "sl": number (based on STRUCTURE — below/above Order Block or key SMC level),
  "tp1": number (first liquidity target — FVG or minor S/R),
  "tp2": number (major structural target),
  "tp3": number (BSL pool or major resistance level),
  "rr": "1:X.X",
  "invalidation": number (the exact price that structurally cancels this signal),
  "reasoning": "4 sentences. Reference SPECIFIC levels, indicator readings, and macro data from above. First sentence: market structure. Second: technical confluence. Third: macro/fundamental basis. Fourth: entry rationale.",
  "factors": ["Technical: [specific indicator + value]", "SMC: [specific zone + level]", "Macro: [specific factor + value]", "Flow: [specific flow data]", "Sentiment: [specific reading]"],
  "conflicting_factors": ["One real bearish factor if signal is BUY, or bullish factor if SELL"],
  "risk_warning": "One specific, data-backed risk from the analysis above that could invalidate this trade"
}` }]
        })
      });
      const data = await res.json();
      const txt  = data.content?.[0]?.text||"";
      setSig(JSON.parse(txt.replace(/```json|```/g,"").trim()));
    } catch { setErr("Signal generation failed. Please try again."); }
    setBusy(false);
  };

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:10 }}>
        <div>
          <h2 className="cinzel" style={{ fontSize:16, fontWeight:600, marginBottom:4 }}>AI Signal Engine</h2>
          <p style={{ fontSize:11, color:"var(--t2)" }}>Probability-based analysis · Not financial advice · Always use a stop loss</p>
        </div>
        <button className="btn-gold" style={{ padding:"11px 24px", fontSize:13, display:"flex", alignItems:"center", gap:8 }} onClick={generate} disabled={busy}>
          {busy ? <><span className="spinning">⟳</span> Analysing…</> : <><Cpu size={13}/> Generate Signal</>}
        </button>
      </div>

      {busy && (
        <div className="card-gold" style={{ padding:"22px 20px", marginBottom:16 }}>
          <div className="loader-bar" style={{ marginBottom:14 }}/>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span className="spinning" style={{ fontSize:16 }}>⟳</span>
            <div className="mono" style={{ fontSize:11, color:"var(--gold2)" }}>{step}</div>
          </div>
          <div style={{ fontSize:10, color:"var(--t3)", marginTop:8 }}>
            Searching live news · Technical analysis · SMC zones · Macro factors — all factors included
          </div>
        </div>
      )}

      {err && <div style={{ background:"var(--rd)", border:"1px solid var(--rb)", borderRadius:9, padding:"12px 16px", marginBottom:16, fontSize:13, color:"var(--red)", display:"flex", gap:8 }}><AlertTriangle size={14}/>{err}</div>}

      {sig  && <SignalCard s={sig} price={price}/>}

      {!sig && !busy && (
        <div className="card" style={{ padding:48, textAlign:"center" }}>
          <Cpu size={36} style={{ color:"var(--gb)", marginBottom:14 }}/>
          <div className="cinzel" style={{ fontSize:14, color:"var(--t2)", marginBottom:8 }}>Ready to Generate</div>
          <div style={{ fontSize:12, color:"var(--t3)", maxWidth:300, margin:"0 auto" }}>
            Tap Generate Signal for a full AI-powered XAU/USD trade recommendation with position sizing
          </div>
        </div>
      )}
    </div>
  );
};

// ─── ANALYSIS TAB ─────────────────────────────────────────────────────────────
const AnalysisTab = () => {
  const bull = INDICATORS.filter(i=>i.s==="BULL").length;
  const total = INDICATORS.length;
  const score = Math.round((bull/total)*100);

  return (
    <div className="fade-up">
      {/* Confluence */}
      <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:16, marginBottom:20 }}>
        <div className="card-gold" style={{ padding:20, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <Gauge score={score}/>
          <div style={{ display:"flex", gap:16, marginTop:12 }}>
            <div style={{ textAlign:"center" }}><div className="mono" style={{ fontSize:18, fontWeight:700, color:"var(--green)" }}>{bull}</div><div style={{ fontSize:9, color:"var(--t3)" }}>BULL</div></div>
            <div style={{ textAlign:"center" }}><div className="mono" style={{ fontSize:18, fontWeight:700, color:"var(--gold2)" }}>{INDICATORS.filter(i=>i.s==="NEUT").length}</div><div style={{ fontSize:9, color:"var(--t3)" }}>NEUT</div></div>
            <div style={{ textAlign:"center" }}><div className="mono" style={{ fontSize:18, fontWeight:700, color:"var(--red)" }}>{INDICATORS.filter(i=>i.s==="BEAR").length}</div><div style={{ fontSize:9, color:"var(--t3)" }}>BEAR</div></div>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:9, justifyContent:"center" }}>
          {[
            { l:"Overall Technical Bias",  v:"Bullish",  c:"var(--green)",  p:score },
            { l:"Momentum Score",          v:"Strong",   c:"var(--green)",  p:78 },
            { l:"Volatility Condition",    v:"Elevated", c:"var(--gold2)",  p:65 },
            { l:"Smart Money Alignment",   v:"Bullish",  c:"var(--green)",  p:72 },
            { l:"Macro Alignment",         v:"Mixed",    c:"var(--gold2)",  p:55 },
          ].map(x=>(
            <div key={x.l} style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ fontSize:11, color:"var(--t2)", width:170, flexShrink:0 }}>{x.l}</div>
              <div style={{ flex:1 }}><ScoreBar value={x.p} color={x.c}/></div>
              <div className="mono" style={{ fontSize:11, color:x.c, width:55, textAlign:"right" }}>{x.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div style={{ fontSize:10, color:"var(--gold2)", marginBottom:10, letterSpacing:".1em" }}>TECHNICAL INDICATORS</div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
        {INDICATORS.map(ind=>(
          <div key={ind.n} className="card lift" style={{ padding:"11px 13px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:11, fontWeight:600, marginBottom:2 }}>{ind.n}</div>
              <div style={{ fontSize:9, color:"var(--t3)" }}>{ind.note}</div>
            </div>
            <div style={{ textAlign:"right", display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
              <div className="mono" style={{ fontSize:11 }}>{ind.v}</div>
              <span className={`pill ${ind.s==="BULL"?"pill-bull":ind.s==="BEAR"?"pill-bear":"pill-neut"}`}>{ind.s}</span>
            </div>
          </div>
        ))}
      </div>

      {/* SMC */}
      <div style={{ fontSize:10, color:"var(--gold2)", marginBottom:10, letterSpacing:".1em" }}>SMART MONEY CONCEPTS</div>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {SMC.map(s=>(
          <div key={s.type} className="card lift" style={{ padding:"13px 15px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span className={`pill ${s.dir==="BULL"?"pill-bull":s.dir==="BEAR"?"pill-bear":"pill-neut"}`}>{s.dir}</span>
                <span style={{ fontSize:12, fontWeight:600 }}>{s.type}</span>
              </div>
              <div className="mono" style={{ fontSize:12, color:"var(--gold2)" }}>{s.zone}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ flex:1 }}>
                <ScoreBar value={s.str} color={s.dir==="BULL"?"var(--green)":s.dir==="BEAR"?"var(--red)":"var(--gold2)"}/>
              </div>
              <div style={{ fontSize:10, color:"var(--t3)", width:180 }}>{s.note}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── CALCULATOR TAB ───────────────────────────────────────────────────────────
const CalcTab = ({ price }) => {
  const [bal,  setBal]  = useState("10000");
  const [rPct, setRPct] = useState("1");
  const [ent,  setEnt]  = useState(String((price-12).toFixed(2)));
  const [sl,   setSl]   = useState(String((price-30).toFixed(2)));
  const [tp,   setTp]   = useState(String((price+50).toFixed(2)));

  const e=+ent||price, s=+sl||(price-30), t=+tp||(price+50);
  const b=+bal||10000, r=+rPct||1;
  const rr = s&&e ? (Math.abs(t-e)/Math.abs(e-s)).toFixed(2) : "—";
  const rrColor = +rr>=2?"var(--green)":+rr>=1.5?"var(--gold2)":"var(--red)";

  return (
    <div className="fade-up">
      <h2 className="cinzel" style={{ fontSize:16, fontWeight:600, marginBottom:4 }}>Position Calculator</h2>
      <p style={{ fontSize:11, color:"var(--t2)", marginBottom:20 }}>XAU/USD lot sizing · 1 standard lot = 100 troy ounces</p>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
        {[
          { l:"Account Balance ($)",  v:bal,  set:setBal,  ph:"10000" },
          { l:"Risk Per Trade (%)",   v:rPct, set:setRPct, ph:"1" },
          { l:"Entry Price",          v:ent,  set:setEnt,  ph:price.toFixed(2) },
          { l:"Stop Loss Price",      v:sl,   set:setSl,   ph:(price-30).toFixed(2) },
        ].map(x=>(
          <div key={x.l}>
            <div style={{ fontSize:10, color:"var(--t2)", marginBottom:5 }}>{x.l}</div>
            <input className="input" value={x.v} onChange={ev=>x.set(ev.target.value)} placeholder={x.ph}/>
          </div>
        ))}
        <div>
          <div style={{ fontSize:10, color:"var(--t2)", marginBottom:5 }}>Take Profit Price</div>
          <input className="input" value={tp} onChange={ev=>setTp(ev.target.value)} placeholder={(price+50).toFixed(2)}/>
        </div>
        <div className="card-gold" style={{ padding:12, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
          <div style={{ fontSize:9, color:"var(--t2)", marginBottom:4 }}>RISK : REWARD</div>
          <div className="mono" style={{ fontSize:24, fontWeight:700, color:rrColor }}>1:{rr}</div>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:16 }}>
        {[
          { l:"Conservative 0.5%", r:.5 },
          { l:`Your Risk ${rPct}%`, r:r, highlight:true },
          { l:"Aggressive 2%",    r:2 },
        ].map(({ l, r:rr2, highlight })=>{
          const p = calc(b, rr2, e, s);
          const profit = +(p.lots*100*Math.abs(t-e)).toFixed(0);
          return (
            <div key={l} className={highlight?"card-blue":"card"} style={{ padding:14, textAlign:"center" }}>
              <div style={{ fontSize:9, color:highlight?"var(--blue)":"var(--t3)", marginBottom:8, fontWeight:highlight?700:400 }}>{l}</div>
              <div className="mono" style={{ fontSize:24, fontWeight:700, color:highlight?"var(--blue)":"var(--text)" }}>{p.lots}</div>
              <div style={{ fontSize:9, color:"var(--t3)", marginBottom:8 }}>LOTS</div>
              <div className="divider" style={{ marginBottom:8 }}/>
              <div className="mono" style={{ fontSize:11, color:"var(--red)", marginBottom:3 }}>{fmt(p.rAmt)} risk</div>
              <div className="mono" style={{ fontSize:11, color:"var(--t2)", marginBottom:3 }}>{fmt(p.m100)} margin</div>
              <div className="mono" style={{ fontSize:11, color:"var(--green)" }}>+{fmt(profit)} if TP</div>
            </div>
          );
        })}
      </div>

      {/* Full breakdown for selected risk */}
      {(() => {
        const p = calc(b, r, e, s);
        return (
          <div className="card" style={{ padding:16 }}>
            <div style={{ fontSize:10, color:"var(--gold2)", marginBottom:12, letterSpacing:".08em" }}>FULL BREAKDOWN — {rPct}% RISK</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              {[
                { l:"Total Exposure",  v:fmt(p.exp), c:"var(--gold2)" },
                { l:"Gold Oz Trading", v:`${p.lots*100} oz`, c:"var(--gold2)" },
                { l:"$1 Move = ",      v:`$${p.pip}`,c:"var(--gold2)" },
                { l:"Margin 1:100",    v:fmt(p.m100),c:"var(--blue)" },
                { l:"Margin 1:200",    v:fmt(p.m200),c:"var(--blue)" },
                { l:"Margin 1:500",    v:fmt(p.m500),c:"var(--blue)" },
              ].map(x=>(
                <div key={x.l} style={{ textAlign:"center", background:"rgba(255,255,255,.03)", borderRadius:7, padding:10 }}>
                  <div className="mono" style={{ fontSize:13, fontWeight:700, color:x.c }}>{x.v}</div>
                  <div style={{ fontSize:9, color:"var(--t3)", marginTop:2 }}>{x.l}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// ─── MARKET TAB ───────────────────────────────────────────────────────────────
const MarketTab = () => {
  const [view, setView] = useState("events");
  const macroScore = Math.round(MACRO.reduce((a,m)=>a+m.s,0)/MACRO.length);

  return (
    <div className="fade-up">
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {[["events","📅 Events"],["macro","🌐 Macro"],["seasons","📊 Seasonality"]].map(([id,lbl])=>(
          <button key={id} className={`tab-btn ${view===id?"active":""}`} onClick={()=>setView(id)}
            style={{ padding:"7px 14px", fontSize:11, borderRadius:7, border:`1px solid ${view===id?"var(--gb)":"var(--border)"}`, background:view===id?"var(--gd)":"transparent", color:view===id?"var(--gold2)":"var(--t2)", cursor:"pointer", fontFamily:"Outfit" }}>
            {lbl}
          </button>
        ))}
      </div>

      {view==="events" && (
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:14 }}>
            <div>
              <h3 style={{ fontSize:14, fontWeight:600, marginBottom:2 }}>Economic Calendar</h3>
              <p style={{ fontSize:11, color:"var(--t2)" }}>Gold impact based on historical volatility correlation</p>
            </div>
          </div>
          {EVENTS.map((e,i)=>(
            <div key={i} className="card lift" style={{ padding:"13px 16px", marginBottom:8, display:"grid", gridTemplateColumns:"58px 1fr 70px 50px", gap:10, alignItems:"center" }}>
              <div className="mono" style={{ fontSize:11, color:"var(--t2)" }}>{e.time}</div>
              <div>
                <div style={{ fontSize:12, fontWeight:600, marginBottom:3 }}>{e.event}</div>
                <div style={{ fontSize:9, color:"var(--t3)" }}>Forecast: <span className="mono">{e.forecast}</span> · Prev: <span className="mono">{e.prev}</span></div>
              </div>
              <span className="mono" style={{ fontSize:10, padding:"3px 8px", borderRadius:4, textAlign:"center",
                background:e.impact==="HIGH"?"var(--rd)":"var(--gd)",
                color:e.impact==="HIGH"?"var(--red)":"var(--gold2)",
                border:`1px solid ${e.impact==="HIGH"?"var(--rb)":"var(--gb)"}` }}>
                {e.impact}
              </span>
              <div style={{ fontSize:16, textAlign:"center" }}>{e.dir}</div>
            </div>
          ))}
        </div>
      )}

      {view==="macro" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:20 }}>
            <div className="card-gold" style={{ padding:16, textAlign:"center" }}>
              <div style={{ fontSize:9, color:"var(--t2)", marginBottom:6 }}>MACRO SCORE</div>
              <div className="mono" style={{ fontSize:28, fontWeight:700, color:macroScore>=60?"var(--green)":"var(--red)" }}>{macroScore}</div>
              <div style={{ fontSize:9, color:"var(--t3)" }}>/ 100</div>
            </div>
            <div className="card" style={{ padding:16, textAlign:"center" }}>
              <div style={{ fontSize:9, color:"var(--t2)", marginBottom:6 }}>BULLISH FACTORS</div>
              <div className="mono" style={{ fontSize:28, fontWeight:700, color:"var(--green)" }}>{MACRO.filter(m=>m.d==="BULL").length}</div>
              <div style={{ fontSize:9, color:"var(--t3)" }}>of {MACRO.length}</div>
            </div>
            <div className="card" style={{ padding:16, textAlign:"center" }}>
              <div style={{ fontSize:9, color:"var(--t2)", marginBottom:6 }}>OVERALL BIAS</div>
              <div className="mono" style={{ fontSize:18, fontWeight:700, color:"var(--green)", lineHeight:1.3 }}>Cautious<br/>Bullish</div>
            </div>
          </div>
          {MACRO.map(m=>(
            <div key={m.f} className="card lift" style={{ padding:"12px 14px", marginBottom:8 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:7 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span className={`pill ${m.d==="BULL"?"pill-bull":m.d==="BEAR"?"pill-bear":"pill-neut"}`}>{m.d}</span>
                  <span style={{ fontSize:12, fontWeight:600 }}>{m.f}</span>
                </div>
                <div style={{ display:"flex", gap:12 }}>
                  <span className="mono" style={{ fontSize:12, color:"var(--gold2)" }}>{m.v}</span>
                  <span className="mono" style={{ fontSize:11, color:m.s>=65?"var(--green)":m.s>=45?"var(--gold2)":"var(--red)" }}>{m.s}/100</span>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ flex:1 }}><ScoreBar value={m.s} color={m.s>=65?"var(--green)":m.s>=45?"var(--gold2)":"var(--red)"}/></div>
                <div style={{ fontSize:10, color:"var(--t3)", width:160, textAlign:"right" }}>{m.note}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view==="seasons" && (
        <div>
          <div style={{ fontSize:13, fontWeight:600, marginBottom:4 }}>Gold Seasonality — 10 Year Average</div>
          <div style={{ fontSize:11, color:"var(--t2)", marginBottom:16 }}>Historical average monthly returns for XAU/USD</div>
          <div className="card" style={{ padding:16, marginBottom:16 }}>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={SEASONS} margin={{ top:5, right:5, bottom:0, left:-20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.04)"/>
                <XAxis dataKey="m" tick={{ fontSize:9, fill:"#444", fontFamily:"DM Mono" }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fontSize:9, fill:"#444", fontFamily:"DM Mono" }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/>
                <Tooltip formatter={v=>[`${v}%`,"Avg Return"]} contentStyle={{ background:"#1C1C2E", border:"1px solid var(--gb)", fontSize:11, borderRadius:8 }}/>
                <Bar dataKey="r" radius={[3,3,0,0]}>
                  {SEASONS.map((s,i)=><Cell key={i} fill={s.r>=0?"var(--green)":"var(--red)"}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <div className="card-green" style={{ padding:14 }}>
              <div style={{ fontSize:10, color:"var(--green)", marginBottom:8 }}>STRONGEST MONTHS</div>
              {[["August","▲ +2.9%"],["January","▲ +2.1%"],["July","▲ +1.8%"],["December","▲ +1.6%"]].map(([m,v])=>(
                <div key={m} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:12 }}>{m}</span>
                  <span className="mono" style={{ fontSize:12, color:"var(--green)" }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="card-red" style={{ padding:14 }}>
              <div style={{ fontSize:10, color:"var(--red)", marginBottom:8 }}>WEAKEST MONTHS</div>
              {[["May","▼ -1.2%"],["February","▼ -0.8%"],["September","▼ -0.4%"],["June","▲ +0.3%"]].map(([m,v])=>(
                <div key={m} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:12 }}>{m}</span>
                  <span className="mono" style={{ fontSize:12, color:v.includes("▼")?"var(--red)":"var(--t2)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── HOME TAB ─────────────────────────────────────────────────────────────────
const HomeTab = ({ price, change, trend, chartData }) => (
  <div className="fade-up">
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(148px,1fr))", gap:10, marginBottom:18 }}>
      <MetCard label="XAU/USD"       value={`$${price.toFixed(2)}`}  icon={DollarSign}   color="gold"  sub={`${change>=0?"+":""}${change.toFixed(2)} today`} live/>
      <MetCard label="Short Trend"   value="▼ Bearish"               icon={TrendingDown}  color="red"   sub="Below session open"/>
      <MetCard label="Confluence"    value="68/100"                  icon={Activity}      color="gold"  sub="B+ Quality"/>
      <MetCard label="Volatility"    value="Elevated"                icon={Zap}           color="gold"  sub="ATR 52.1"/>
      <MetCard label="COT Bias"      value="Net Long"                icon={Globe}         color="green" sub="+8.2K contracts"/>
      <MetCard label="Geo Risk"      value="Elevated"                icon={Shield}        color="red"   sub="US-Iran tensions"/>
    </div>

    <div className="card" style={{ padding:"18px 18px 10px", marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <div style={{ fontSize:12, fontWeight:600 }}>72H Price Chart · XAU/USD</div>
        <div style={{ display:"flex", alignItems:"center", gap:5 }}><Dot/><span style={{ fontSize:9, color:"var(--t3)" }}>UPDATING</span></div>
      </div>
      <ResponsiveContainer width="100%" height={190}>
        <AreaChart data={chartData} margin={{ top:5, right:5, bottom:0, left:0 }}>
          <defs>
            <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--gold2)" stopOpacity={.3}/>
              <stop offset="95%" stopColor="var(--gold2)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.04)"/>
          <XAxis dataKey="t" tick={{ fontSize:9, fill:"#444", fontFamily:"DM Mono" }} axisLine={false} tickLine={false}/>
          <YAxis domain={["auto","auto"]} tick={{ fontSize:9, fill:"#444", fontFamily:"DM Mono" }} axisLine={false} tickLine={false} width={60} tickFormatter={v=>`$${v}`}/>
          <Tooltip content={<ChartTip/>}/>
          <Area type="monotone" dataKey="price" stroke="var(--gold2)" strokeWidth={1.5} fill="url(#cg)" dot={false}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>

    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
      <div className="card" style={{ padding:14 }}>
        <div style={{ fontSize:10, color:"var(--gold2)", marginBottom:10, letterSpacing:".08em" }}>KEY PRICE LEVELS</div>
        {[
          ["All-Time High", "$5,597", "var(--gold2)"],
          ["Resistance",    "$4,600", "var(--red)"],
          ["Current",       `$${price.toFixed(0)}`, "var(--text)"],
          ["Support",       "$4,366", "var(--green)"],
          ["Major Support", "$4,102", "var(--green)"],
        ].map(([l,v,c])=>(
          <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:11, color:"var(--t2)" }}>{l}</span>
            <span className="mono" style={{ fontSize:11, fontWeight:700, color:c }}>{v}</span>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding:14 }}>
        <div style={{ fontSize:10, color:"var(--gold2)", marginBottom:10, letterSpacing:".08em" }}>MARKET SNAPSHOT</div>
        {[
          ["Fed Stance","Hawkish","var(--red)"],
          ["DXY",       "104.2","var(--green)"],
          ["ETF Flows", "+$148M","var(--green)"],
          ["CB Buying", "Active","var(--green)"],
          ["Session",   "London/NY","var(--blue)"],
        ].map(([l,v,c])=>(
          <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:11, color:"var(--t2)" }}>{l}</span>
            <span className="mono" style={{ fontSize:11, fontWeight:700, color:c }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const Dashboard = ({ price, change, trend, chartData, isLive, onExit }) => {
  const [tab, setTab] = useState("home");

  const NAV = [
    { id:"home",       icon:Layers,    label:"Home" },
    { id:"signal",     icon:Target,    label:"Signal" },
    { id:"analysis",   icon:BarChart2, label:"Analysis" },
    { id:"calculator", icon:DollarSign,label:"Calculator" },
    { id:"market",     icon:Globe,     label:"Market" },
  ];

  return (
    <div style={{ display:"flex", height:"100vh", background:"var(--bg)", overflow:"hidden" }}>
      {/* Sidebar */}
      <aside style={{ width:180, background:"var(--bg2)", borderRight:"1px solid var(--border)", display:"flex", flexDirection:"column", padding:"16px 10px", flexShrink:0 }}>
        <div style={{ padding:"0 4px", marginBottom:24 }}><Logo sm/></div>
        {NAV.map(n=>(
          <div key={n.id} className={`side-link${tab===n.id?" on":""}`} onClick={()=>setTab(n.id)}>
            <n.icon size={13}/>{n.label}
          </div>
        ))}
        <div style={{ marginTop:"auto" }}>
          <div className="divider" style={{ marginBottom:12 }}/>
          <div className="side-link" onClick={onExit}><ChevronRight size={13} style={{ transform:"rotate(180deg)" }}/>Back</div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        {/* Topbar */}
        <div style={{ height:50, background:"var(--bg2)", borderBottom:"1px solid var(--border)", padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            <span style={{ fontSize:10, color:"var(--t2)" }}>XAU / USD</span>
            <span className={`mono ${trend==="up"?"flash-up":"flash-dn"}`} style={{ fontSize:15, fontWeight:700 }}>${price.toFixed(2)}</span>
            <span className="mono" style={{ fontSize:12, color:change>=0?"var(--green)":"var(--red)" }}>{change>=0?"+":""}{change.toFixed(2)}</span>
            <div style={{ display:"flex", alignItems:"center", gap:5, background:isLive?"var(--gnd)":"var(--gd)", border:`1px solid ${isLive?"var(--gnb)":"var(--gb)"}`, borderRadius:10, padding:"2px 8px" }}>
              <Dot color={isLive?"var(--green)":"var(--gold2)"}/>
              <span className="mono" style={{ fontSize:8, color:isLive?"var(--green)":"var(--gold2)", letterSpacing:".08em" }}>{isLive?"LIVE":"SIMULATED"}</span>
            </div>
          </div>
          <div className="desk" style={{ display:"flex", gap:16, fontSize:10, color:"var(--t3)" }}>
            <span>🇬🇧 14:32</span><span>🇺🇸 09:32</span><span>🇯🇵 23:32</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex:1, overflow:"auto", padding:20 }}>
          {tab==="home"       && <HomeTab price={price} change={change} trend={trend} chartData={chartData}/>}
          {tab==="signal"     && <SignalTab price={price} change={change} chartData={chartData}/>}
          {tab==="analysis"   && <AnalysisTab/>}
          {tab==="calculator" && <CalcTab price={price}/>}
          {tab==="market"     && <MarketTab/>}
        </div>
      </div>
    </div>
  );
};

// ─── LANDING ──────────────────────────────────────────────────────────────────
const Landing = ({ price, change, trend, chartData, onDash }) => (
  <div>
    <nav className="nav-glass" style={{ position:"fixed", top:0, left:0, right:0, zIndex:100 }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", height:58, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Logo/>
        <div className="desk" style={{ display:"flex", gap:28, fontSize:12, color:"var(--t2)" }}>
          {["Platform","Signals","Research","Pricing"].map(n=><span key={n} style={{ cursor:"pointer" }}>{n}</span>)}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-ghost desk" style={{ padding:"7px 16px", fontSize:12 }}>Sign In</button>
          <button className="btn-gold" style={{ padding:"7px 20px", fontSize:12 }} onClick={onDash}>Dashboard →</button>
        </div>
      </div>
    </nav>

    {/* Hero */}
    <section className="hero-bg grid-dots" style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"90px 24px 60px", position:"relative", overflow:"hidden" }}>
      {[680,460,290].map((s,i)=>(
        <div key={i} style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:s, height:s, borderRadius:"50%", border:`1px solid rgba(201,144,10,${.03+i*.03})`, pointerEvents:"none" }}/>
      ))}
      <div style={{ maxWidth:840, textAlign:"center" }} className="fade-up">
        <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(201,144,10,.07)", border:"1px solid var(--gb)", borderRadius:20, padding:"5px 15px", marginBottom:32 }}>
          <Dot/><span className="mono" style={{ fontSize:9, color:"var(--gold2)", letterSpacing:".14em" }}>LIVE · INSTITUTIONAL GOLD INTELLIGENCE PLATFORM</span>
        </div>
        <h1 className="cinzel" style={{ fontSize:"clamp(34px,6vw,78px)", fontWeight:700, lineHeight:1.1, letterSpacing:".03em", marginBottom:22 }}>
          <span>GOLD TRADING</span><br/><span className="gold-text">INTELLIGENCE</span>
        </h1>
        <p style={{ fontSize:"clamp(14px,2vw,17px)", color:"var(--t2)", maxWidth:520, margin:"0 auto 44px", lineHeight:1.8 }}>
          AI-powered XAU/USD signals with precise lot sizing · Smart Money analysis · 25-factor confluence engine · Built for serious gold traders.
        </p>
        <div className="card-gold floating" style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", padding:"22px 50px", marginBottom:44 }}>
          <div className="mono" style={{ fontSize:9, color:"var(--t2)", letterSpacing:".14em", marginBottom:7 }}>XAU/USD SPOT PRICE</div>
          <div className="mono" style={{ fontSize:"clamp(30px,5vw,46px)", fontWeight:700, marginBottom:8 }}>${price.toFixed(2)}</div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            {change>=0?<ArrowUpRight size={13} style={{ color:"var(--green)" }}/>:<ArrowDownRight size={13} style={{ color:"var(--red)" }}/>}
            <span className="mono" style={{ fontSize:12, color:change>=0?"var(--green)":"var(--red)" }}>{change>=0?"+":""}{change.toFixed(2)} ({((change/price)*100).toFixed(2)}%)</span>
            <Dot style={{ marginLeft:6 }}/>
          </div>
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:18 }}>
          <button className="btn-gold" style={{ padding:"13px 32px", fontSize:14 }} onClick={onDash}>Enter Platform →</button>
          <button className="btn-ghost" style={{ padding:"13px 32px", fontSize:14 }}>Learn More</button>
        </div>
        <p style={{ fontSize:10, color:"var(--t3)" }}>All trading involves risk · Probabilistic analysis only · Not financial advice</p>
      </div>
    </section>

    {/* Features */}
    <section style={{ background:"var(--bg2)", padding:"70px 24px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div className="mono" style={{ fontSize:9, color:"var(--gold2)", letterSpacing:".16em", marginBottom:10 }}>WHAT MAKES AURIC DIFFERENT</div>
          <h2 className="cinzel" style={{ fontSize:"clamp(22px,3.5vw,36px)", fontWeight:600, letterSpacing:".04em" }}>Everything a Gold Trader Needs</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:16 }}>
          {[
            { icon:Target,    color:"var(--gold2)",  title:"AI Signal Engine",           desc:"Full trade signals with entry, stop loss, 3 take profit levels, confidence score, and institutional reasoning." },
            { icon:DollarSign,color:"var(--blue)",   title:"Precision Lot Calculator",   desc:"Enter your balance and risk %. Get exact lot size, margin, max risk, and profit potential instantly." },
            { icon:BarChart2, color:"var(--purple)",  title:"25-Factor Analysis",          desc:"Technical indicators, Smart Money Concepts, macro factors — all scored and combined into one confluence number." },
            { icon:Globe,     color:"var(--green)",  title:"Macro Command Center",        desc:"DXY, yields, Fed stance, geopolitics, COT, ETF flows, central bank buying — all tracked and scored." },
            { icon:Calendar,  color:"var(--gold2)",  title:"Economic Calendar",           desc:"All high-impact events with gold price impact rating based on historical correlation." },
            { icon:Clock,     color:"var(--blue)",   title:"Gold Seasonality Data",       desc:"10-year average monthly returns showing historically strong and weak periods for gold." },
          ].map(f=>(
            <div key={f.title} className="card lift" style={{ padding:22 }}>
              <div style={{ width:40, height:40, borderRadius:10, background:`${f.color}18`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:14 }}>
                <f.icon size={18} style={{ color:f.color }}/>
              </div>
              <div className="cinzel" style={{ fontSize:13, fontWeight:600, marginBottom:8, letterSpacing:".02em" }}>{f.title}</div>
              <div style={{ fontSize:12, color:"var(--t2)", lineHeight:1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer style={{ background:"var(--bg)", borderTop:"1px solid var(--border)", padding:"32px 24px 20px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14 }}>
        <Logo/>
        <p style={{ fontSize:11, color:"var(--t3)", textAlign:"center", flex:1 }}>All trading involves substantial risk. Signals represent probabilistic analysis — not financial advice.</p>
        <p style={{ fontSize:11, color:"var(--t3)" }}>© 2025 Auric Intelligence</p>
      </div>
    </footer>
  </div>
);

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [view,   setView]   = useState("landing");
  const [price,  setPrice]  = useState(BASE_PRICE);
  const [change, setChange] = useState(-14.62);
  const [trend,  setTrend]  = useState("down");
  const [chart,  setChart]  = useState(()=>makeChart());
  const [isLive, setIsLive] = useState(false);

  const fetchPrice = async () => {
    try {
      const res  = await fetch("/api/gold-price");
      const data = await res.json();
      if (data.c && data.c > 0) {
        const next = +data.c.toFixed(2), chg = +(data.d||0).toFixed(2);
        setTrend(chg>=0?"up":"down");
        setPrice(next); setChange(chg);
        setChart(p=>[...p.slice(1),{ t:"Now", price:next }]);
        setIsLive(true); return true;
      }
    } catch {}
    return false;
  };

  const simTick = useCallback(()=>{
    setPrice(prev=>{
      const d=(Math.random()-.49)*1.3, next=+(prev+d).toFixed(2);
      setTrend(d>=0?"up":"down");
      setChange(c=>+(c+d*.3).toFixed(2));
      setChart(p=>[...p.slice(1),{ t:"Now", price:next }]);
      return next;
    });
  },[]);

  useEffect(()=>{
    let simIv=null, liveIv=null;
    const boot = async ()=>{
      const ok = await fetchPrice();
      if (ok) { liveIv=setInterval(fetchPrice,30_000); }
      else {
        simIv=setInterval(simTick,2400);
        liveIv=setInterval(async()=>{ const ok2=await fetchPrice(); if(ok2&&simIv){clearInterval(simIv);simIv=null;}},30_000);
      }
    };
    boot();
    return ()=>{ if(simIv)clearInterval(simIv); if(liveIv)clearInterval(liveIv); };
  },[simTick]);

  return (
    <>
      <Styles/>
      {view==="landing"
        ? <Landing price={price} change={change} trend={trend} chartData={chart} onDash={()=>setView("dashboard")}/>
        : <Dashboard price={price} change={change} trend={trend} chartData={chart} isLive={isLive} onExit={()=>setView("landing")}/>
      }
    </>
  );
}

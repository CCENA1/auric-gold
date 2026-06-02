# AURIC — Institutional Gold Intelligence Platform

AI-powered XAU/USD trading signals with live Finnhub price data, deployed on Cloudflare Pages.

---

## ⚠️ Security — Do this first

If you received API keys from someone or shared them anywhere, **regenerate them now**:
- Finnhub: finnhub.io → Dashboard → API Keys → Regenerate
- Anthropic: console.anthropic.com → API Keys → Delete + create new

Keys are **never** stored in code. They live only in Cloudflare's environment variables.

---

## Project Structure

```
auric-gold/
├── src/
│   ├── App.jsx          ← Full React app (UI + logic)
│   └── main.jsx         ← React entry point
├── functions/
│   └── api/
│       ├── gold-price.js       ← CF Function: proxies Finnhub
│       └── generate-signal.js  ← CF Function: proxies Anthropic
├── public/
│   ├── favicon.svg
│   └── _headers         ← Security + cache headers
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── .dev.vars.example    ← Template for local dev (never commit .dev.vars)
```

---

## Step 1 — Push to GitHub

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit — AURIC gold platform"

# Create a new repo on github.com named: auric-gold
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/auric-gold.git
git branch -M main
git push -u origin main
```

---

## Step 2 — Deploy on Cloudflare Pages

### 2a. Connect GitHub

1. Go to **dash.cloudflare.com**
2. Left sidebar → **Workers & Pages**
3. Click **Create application** → **Pages** → **Connect to Git**
4. Authorize GitHub → select the **auric-gold** repo
5. Click **Begin setup**

### 2b. Build settings

| Setting | Value |
|---|---|
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (leave blank) |
| Node.js version | `18` |

### 2c. Add environment variables ← your API keys go here

Still on the same setup page, scroll to **Environment variables**:

| Variable name | Value |
|---|---|
| `FINNHUB_API_KEY` | your new Finnhub API key |
| `ANTHROPIC_API_KEY` | your new Anthropic API key |

> Set both for **Production** and **Preview** environments.

### 2d. Deploy

Click **Save and Deploy**. Cloudflare will:
1. Pull your code from GitHub
2. Run `npm run build`
3. Deploy to `auric-gold.pages.dev`

Every time you push to `main`, it auto-redeploys. Pull requests get preview URLs automatically.

---

## Step 3 — Add a custom domain (optional)

1. Pages dashboard → your project → **Custom domains**
2. Add your domain (e.g. `auric.trade`)
3. Cloudflare handles SSL automatically

---

## How live pricing works

```
Browser ──GET /api/gold-price──► CF Pages Function ──► Finnhub API
                                 (adds your API key)    (returns XAU/USD quote)
```

- Updates every **30 seconds**
- Falls back to simulation if the API is unavailable
- The top bar shows **LIVE** (green dot) or **SIMULATED** (gold dot)

## How AI signals work

```
Browser ──POST /api/generate-signal──► CF Pages Function ──► Anthropic API
                                       (adds your API key)   (returns signal JSON)
```

---

## Local development

```bash
npm install

# Option A: Frontend only (API calls show SIMULATED, no live price)
npm run dev
# Visit http://localhost:5173

# Option B: Full stack with live prices and AI signals
cp .dev.vars.example .dev.vars
# Edit .dev.vars and add your real keys
npm run build
npm run pages:dev
# Visit http://localhost:8788
```

---

## Finnhub free tier

- **60 API calls/minute** on free plan
- This app polls every 30 seconds = 2 calls/minute ✓
- Symbol used: `OANDA:XAU_USD`
- Dashboard: finnhub.io

## Anthropic API

- Pay-per-use, no monthly fee
- Each "Generate Signal" click uses ~900 tokens ≈ $0.003
- Dashboard: console.anthropic.com

---

## Disclaimer

All trading involves substantial risk. Signals represent probabilistic analysis and are not financial advice. Past performance does not indicate future results.

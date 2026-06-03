/**
 * Cloudflare Pages Function: /api/gold-price
 * Uses Twelve Data for real-time XAU/USD pricing (free tier: 800 credits/day)
 *
 * Environment variable required:
 *   TWELVE_DATA_API_KEY = your_twelve_data_key
 */
export async function onRequest(context) {
  const { env } = context;

  if (!env.TWELVE_DATA_API_KEY) {
    return new Response(
      JSON.stringify({ error: "TWELVE_DATA_API_KEY not configured" }),
      { status: 500, headers: corsHeaders() }
    );
  }

  try {
    const [priceRes, quoteRes] = await Promise.all([
      fetch(`https://api.twelvedata.com/price?symbol=XAU/USD&apikey=${env.TWELVE_DATA_API_KEY}`),
      fetch(`https://api.twelvedata.com/quote?symbol=XAU/USD&apikey=${env.TWELVE_DATA_API_KEY}`)
    ]);

    const priceData = await priceRes.json();
    const quoteData = await quoteRes.json();

    if (!priceData.price) {
      throw new Error(priceData.message || "No price returned");
    }

    const current   = parseFloat(priceData.price);
    const prevClose = quoteData.previous_close ? parseFloat(quoteData.previous_close) : current;
    const change    = parseFloat((current - prevClose).toFixed(2));

    // Return same shape as before: c=current, d=change, dp=pct, pc=prevClose
    return new Response(JSON.stringify({
      c:  current,
      d:  change,
      dp: parseFloat(((change / prevClose) * 100).toFixed(3)),
      h:  quoteData.high  ? parseFloat(quoteData.high)  : current,
      l:  quoteData.low   ? parseFloat(quoteData.low)   : current,
      pc: prevClose,
    }), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 502, headers: corsHeaders() }
    );
  }
}

function corsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store, max-age=0",
  };
}

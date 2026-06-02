/**
 * Cloudflare Pages Function: /api/gold-price
 * Proxies XAU/USD quote from Finnhub, keeping the API key server-side.
 *
 * Environment variable required (set in Cloudflare Pages dashboard):
 *   FINNHUB_API_KEY = your_finnhub_key
 */
export async function onRequest(context) {
  const { env } = context;

  if (!env.FINNHUB_API_KEY) {
    return new Response(
      JSON.stringify({ error: "FINNHUB_API_KEY not configured" }),
      { status: 500, headers: corsHeaders("application/json") }
    );
  }

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=OANDA:XAU_USD&token=${env.FINNHUB_API_KEY}`,
      { headers: { "Accept": "application/json" } }
    );

    if (!res.ok) {
      throw new Error(`Finnhub returned ${res.status}`);
    }

    const data = await res.json();

    // Finnhub returns:
    //   c  = current price
    //   d  = change from previous close
    //   dp = percent change
    //   h  = day high
    //   l  = day low
    //   o  = day open
    //   pc = previous close

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: corsHeaders("application/json"),
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 502, headers: corsHeaders("application/json") }
    );
  }
}

function corsHeaders(contentType) {
  return {
    "Content-Type": contentType,
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store, max-age=0",
  };
}

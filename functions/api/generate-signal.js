/**
 * Cloudflare Pages Function: /api/generate-signal
 * Proxies requests to the Anthropic API, keeping the API key server-side.
 *
 * Environment variable required (set in Cloudflare Pages dashboard):
 *   ANTHROPIC_API_KEY = sk-ant-api03-...
 */

const ALLOWED_ORIGIN = "*"; // lock down to your domain in production e.g. "https://auric-gold.pages.dev"

export async function onRequest(context) {
  const { request, env } = context;

  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (!env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY not configured" }),
      { status: 500, headers: jsonHeaders() }
    );
  }

  try {
    const body = await request.text();

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body,
    });

    const data = await res.text();

    return new Response(data, {
      status: res.status,
      headers: jsonHeaders(),
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 502, headers: jsonHeaders() }
    );
  }
}

function jsonHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  };
}

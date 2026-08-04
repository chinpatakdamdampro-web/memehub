/**
 * Cloudflare Pages Function — /api/config
 *
 * Serves the GitHub token to the dashboard at runtime.
 * The token lives in Cloudflare Pages environment variables
 * (Settings → Environment Variables → GITHUB_TOKEN) and
 * never touches the repo or source code.
 *
 * Only the Dashboard page should be calling this endpoint —
 * it is not publicly documented but is also not a hard secret
 * since the dashboard itself is password-protected.
 */
export async function onRequest(context) {
  const token = context.env.GITHUB_TOKEN;

  if (!token) {
    return new Response(
      JSON.stringify({ error: 'GITHUB_TOKEN env var not set in Cloudflare Pages' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response(
    JSON.stringify({ token }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Don't let CDN cache this
        'Cache-Control': 'no-store',
      },
    }
  );
}

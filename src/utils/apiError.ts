/**
 * Message when API is unreachable. Use deploy-focused text on live sites.
 */
export function getApiUnavailableMessage(): string {
  if (typeof window === 'undefined') return 'API not available.';
  const isLocal =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocal) {
    return 'API not available. Run the app with npm run dev.';
  }
  return 'API not available. Add GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO in your host’s environment (e.g. Vercel → Settings → Environment Variables), then redeploy. If you just added them, redeploy (Deployments → ⋮ → Redeploy) so they take effect.';
}

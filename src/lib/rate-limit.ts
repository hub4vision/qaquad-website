/**
 * Minimal in-memory sliding-window rate limiter for the contact form API
 * route, keyed by client IP.
 *
 * KNOWN LIMITATION (documented deliberately, not hidden): this state lives in
 * the Node process memory, so it resets on redeploy and is NOT shared across
 * serverless instances/regions. That's an acceptable first line of defense
 * against casual spam/abuse, but before high-traffic production launch,
 * replace this with a shared store (e.g. Upstash Redis, Vercel KV) or a
 * platform-level rate limit / WAF rule. See PROJECT_STATUS.md.
 */

type Bucket = {
  count: number;
  windowStart: number;
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return false;
  }

  bucket.count += 1;

  if (bucket.count > MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  return false;
}

// Periodically clear stale entries so this Map can't grow unbounded across
// a long-lived process.
const CLEANUP_INTERVAL_MS = 10 * 60_000;
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets.entries()) {
      if (now - bucket.windowStart > WINDOW_MS) {
        buckets.delete(key);
      }
    }
  }, CLEANUP_INTERVAL_MS);

  // `setInterval`'s return type differs between the DOM lib (number) and
  // Node's global typings (Timeout, which has `.unref()` to avoid keeping
  // the process alive just for this cleanup timer). Next.js API routes run
  // under Node, but this file's tsconfig also pulls in the "dom" lib for
  // the rest of the app, so we can't rely on the static type here — guard
  // at runtime instead.
  const maybeNodeTimer = timer as unknown as { unref?: () => void };
  if (typeof maybeNodeTimer.unref === "function") {
    maybeNodeTimer.unref();
  }
}

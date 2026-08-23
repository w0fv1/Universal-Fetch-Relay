# Security model

Universal Fetch Relay is a trusted application-layer intermediary. The Worker
operator can observe request bodies and upstream credentials. Only use a Relay
operated by a party you trust.

## Built-in controls

- A Cloudflare secret-backed bearer token is required.
- Token comparison uses SHA-256 and constant-time equality.
- IP-literal, localhost-like, metadata, credential-bearing, fragment-bearing,
  and direct Relay-loop targets are rejected.
- Relay-control, hop-by-hop, forwarding-identity, origin/referrer, and cookie
  headers are stripped.
- Redirects are manual and upstream cookies are never returned.
- Structured logs exclude bodies, credentials, target paths, and query values.

These checks reduce common mistakes; they are not a proof that every hostname is
safe in every deployment. If your threat model requires a target allowlist,
network egress policy, per-user identity, quotas, or abuse prevention, add those
controls before exposing the Relay.

## Token guidance

- Generate at least 32 random bytes.
- Store the value only with `wrangler secret put RELAY_TOKEN`.
- Never place it in source, Wrangler variables, screenshots, issues, or logs.
- Rotate it immediately after accidental disclosure.
- Use separate Workers or identity layers when clients must be isolated.

## Logging

The Worker emits request ID, method, target hostname/protocol, status, TTFB,
Cloudflare colo, and fixed error categories. Cloudflare platform logs and target
services may apply additional policies. Restrict log access and retention.

## Browser access

CORS support allows a browser application to call the Relay; it does not make
the Relay anonymous. Browser-delivered bearer tokens can be extracted by users
who can inspect that application. Prefer a trusted backend for shared secrets.

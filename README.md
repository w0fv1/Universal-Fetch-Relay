# Universal Fetch Relay

A stateless, single-source-file HTTP(S) Fetch Relay for Cloudflare Workers.
The Worker stores no target sites or provider configuration. Every request
supplies its complete target URL through `Fetch-Relay-Target`.

## Request

```bash
curl https://universal-fetch-relay.wofbi233.workers.dev/ \
  -H "Fetch-Relay-Authorization: Bearer $RELAY_TOKEN" \
  -H "Fetch-Relay-Target: https://api.example.com/v1/items?limit=2" \
  -H "Authorization: Bearer $UPSTREAM_API_KEY"
```

`Fetch-Relay-Target` is the only accepted target format. Query-string and path
target formats are deliberately unsupported.

The incoming method, body, and non-control headers are streamed to the target.
The upstream response body is streamed back without buffering. Redirects are
returned manually: `Location` is replaced with `Fetch-Relay-Location` so the
client can validate and submit the next target through the Relay.

## Deploy

```bash
npm install
npm test
npx wrangler secret put RELAY_TOKEN
npm run deploy
```

The Relay token is a Cloudflare secret and must never be placed in source or
`wrangler.jsonc`.

## Scope

- Supports public HTTP and HTTPS APIs, arbitrary HTTP methods, binary bodies,
  file uploads, JSON, GraphQL, SSE, and streamed responses.
- Rejects `CONNECT`, `TRACE`, URL credentials, IP-literal targets, local host
  names, fragments, and relay loops.
- Does not support SOCKS, HTTP CONNECT, raw TCP, automatic redirects, cookies,
  or WebSockets.
- Removes Relay control headers, hop-by-hop headers, forwarding identity
  headers, request cookies, and response `Set-Cookie`.
- Logs only request ID, method, target hostname/protocol, status, TTFB, and
  Cloudflare colo. It does not log bodies, credentials, paths, or query values.

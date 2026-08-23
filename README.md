# Universal Fetch Relay

[![CI](https://github.com/w0fv1/universal-fetch-relay/actions/workflows/ci.yml/badge.svg)](https://github.com/w0fv1/universal-fetch-relay/actions/workflows/ci.yml)
[![Docs](https://github.com/w0fv1/universal-fetch-relay/actions/workflows/docs.yml/badge.svg)](https://w0fv1.github.io/universal-fetch-relay/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A stateless, authenticated, streaming HTTP(S) Fetch Relay for Cloudflare
Workers. It stores no target-site or API-provider configuration: every request
supplies its complete public target URL in `Fetch-Relay-Target`.

```text
client ──authenticated request──> Relay Worker ──sanitized request──> target API
```

## Why

Some clients need an application-layer relay but cannot use a CONNECT or SOCKS
proxy. Universal Fetch Relay exposes a small HTTP protocol that works with JSON,
GraphQL, binary uploads, SSE, and other streaming API traffic.

## Deploy

```bash
npm install
npm test
npx wrangler login
npx wrangler secret put RELAY_TOKEN
npm run deploy
```

Use a long random token. Never put it in source or `wrangler.jsonc`.

## Request

```bash
curl 'https://your-relay.workers.dev' \
  -H "Fetch-Relay-Authorization: Bearer $RELAY_TOKEN" \
  -H 'Fetch-Relay-Target: https://httpbingo.org/anything?source=relay' \
  -H 'Content-Type: application/json' \
  --data-binary '{"hello":"world"}'
```

The incoming method, body, and safe non-control headers are streamed to the
target. The upstream response body is streamed back. Redirects are not followed;
their destination is exposed through `Fetch-Relay-Location`.

## Documentation

- [Documentation](https://w0fv1.github.io/universal-fetch-relay/)
- [Protocol](https://w0fv1.github.io/universal-fetch-relay/protocol)
- [Security model](https://w0fv1.github.io/universal-fetch-relay/security)
- [中文文档](https://w0fv1.github.io/universal-fetch-relay/zh/)

## Security

This is not an anonymous public proxy. A Relay operator can observe request
content and upstream credentials. Keep authentication enabled, rotate exposed
tokens, review sanitized logs, and add account-level controls appropriate to
your deployment. See [SECURITY.md](SECURITY.md) before exposing a Worker.

## Scope

- Supports public HTTP and HTTPS APIs and ordinary HTTP methods.
- Streams request and response bodies without application-level buffering.
- Rejects `CONNECT`, `TRACE`, URL credentials, IP-literal targets, local host
  names, fragments, and direct relay loops.
- Removes Relay-control, hop-by-hop, forwarding-identity, and cookie headers.
- Does not implement SOCKS, HTTP CONNECT, raw TCP, WebSockets, cookie sessions,
  or automatic redirects.

## License

[MIT](LICENSE)

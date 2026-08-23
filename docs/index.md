---
layout: home

hero:
  name: Universal Fetch Relay
  text: One small protocol for relaying HTTP APIs
  tagline: Stateless, authenticated, provider-agnostic, and streaming by default on Cloudflare Workers.
  actions:
    - theme: brand
      text: Get started
      link: /getting-started
    - theme: alt
      text: Protocol reference
      link: /protocol
    - theme: alt
      text: View on GitHub
      link: https://github.com/w0fv1/universal-fetch-relay

features:
  - title: Provider-agnostic
    details: The Worker stores no target-site list. Each authenticated request carries its complete public HTTP(S) target.
  - title: Streaming end to end
    details: Request and response streams pass through without application-level body buffering, including SSE and binary traffic.
  - title: Separate credentials
    details: Relay authentication uses its own header while the upstream Authorization header remains intact.
  - title: Defensive defaults
    details: Manual redirects, cookie stripping, control-header isolation, and rejection of obvious local or metadata targets.
---

## Minimal request

```bash
curl 'https://your-relay.workers.dev' \
  -H "Fetch-Relay-Authorization: Bearer $RELAY_TOKEN" \
  -H 'Fetch-Relay-Target: https://httpbingo.org/anything' \
  -H 'Content-Type: application/json' \
  --data-binary '{"hello":"relay"}'
```

Universal Fetch Relay is an application-layer transport, not a CONNECT, SOCKS,
TCP, or anonymous CORS proxy. Read the [security model](/security) before
deploying it for other users.

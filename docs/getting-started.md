# Getting started

## Requirements

- A Cloudflare account with Workers enabled
- Node.js 20 or newer
- npm

## Deploy your own Relay

```bash
git clone https://github.com/w0fv1/universal-fetch-relay.git
cd universal-fetch-relay
npm ci
npm test
npx wrangler login
```

Generate a strong token, then store it as a Cloudflare secret:

::: code-group

```bash [macOS / Linux]
openssl rand -hex 32
npx wrangler secret put RELAY_TOKEN
```

```powershell [PowerShell]
$bytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Fill($bytes)
[Convert]::ToHexString($bytes).ToLowerInvariant()
npx wrangler secret put RELAY_TOKEN
```

:::

Deploy and note the resulting `workers.dev` URL:

```bash
npm run deploy
```

## Verify JSON forwarding

```bash
curl 'https://your-relay.workers.dev' \
  -H "Fetch-Relay-Authorization: Bearer $RELAY_TOKEN" \
  -H 'Fetch-Relay-Target: https://httpbingo.org/anything?source=smoke' \
  -H 'Content-Type: application/json' \
  --data-binary '{"hello":"relay"}'
```

The response should report the POST method, `source=smoke`, and the exact JSON
body. A missing or incorrect Relay credential returns `401`.

## Verify streaming

```bash
curl --no-buffer 'https://your-relay.workers.dev' \
  -H "Fetch-Relay-Authorization: Bearer $RELAY_TOKEN" \
  -H 'Fetch-Relay-Target: https://httpbingo.org/drip?duration=3&numbytes=3&delay=0'
```

Bytes should arrive during the three-second request, not only at completion.

## Local development

Create a Git-ignored `.dev.vars` file:

```dotenv
RELAY_TOKEN=local-development-token
```

Then run:

```bash
npm run dev
```

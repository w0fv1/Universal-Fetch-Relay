# Operations

## Commands

```bash
npm test            # Worker regression suite
npm run dev          # local Worker
npm run deploy       # deploy to Cloudflare
npm run docs:dev     # local documentation
npm run docs:build   # production documentation build
```

## Rotate the Relay token

```bash
npx wrangler secret put RELAY_TOKEN
```

Wrangler creates a new Worker version with the updated secret. Update authorized
clients promptly and revoke any distributed old value.

## Logs

```bash
npx wrangler tail
```

Use `Fetch-Relay-Request-ID` to correlate a response with sanitized Worker logs.
Do not add body, authorization, full path, or query logging while debugging.

## Redirect handling

Clients should treat `Fetch-Relay-Location` as untrusted input. Validate it with
the same policy as an initial target before issuing a new Relay request.

## GitHub Pages

The repository deploys `docs/.vitepress/dist` with GitHub Actions. Pushes to
`main` that change documentation or its build configuration trigger the Pages
workflow. Pull requests run the same production build in CI without deploying.

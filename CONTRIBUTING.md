# Contributing

Thanks for helping improve Universal Fetch Relay.

## Development

Requirements: Node.js 20 or newer and npm.

```bash
npm ci
npm test
npm run docs:build
```

Run the Worker locally with a non-production token:

```bash
echo 'RELAY_TOKEN=local-development-token' > .dev.vars
npm run dev
```

`.dev.vars` is ignored by Git. Never use or commit a production credential.

## Pull requests

- Keep changes focused and explain the concrete behavior being changed.
- Add regression tests for protocol, streaming, redirect, or security changes.
- Update the English and Chinese documentation when the public contract changes.
- Confirm `npm test` and `npm run docs:build` pass.
- Do not add compatibility formats without first documenting their security and
  logging implications.

Security vulnerabilities should be reported privately as described in
[SECURITY.md](SECURITY.md), not opened as public issues.

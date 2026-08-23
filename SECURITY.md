# Security Policy

## Reporting a vulnerability

Use GitHub's private vulnerability reporting for this repository. Do not open a
public issue containing an undisclosed vulnerability, live credential, request
body, or upstream API key.

Include the affected commit, reproduction steps, impact, and any suggested
mitigation. Reports will be acknowledged as soon as practical.

## Deployment responsibilities

Universal Fetch Relay is a security boundary. The Worker operator can observe
the requests and credentials sent through it. Operators must:

- use a long, unique `RELAY_TOKEN` stored as a Cloudflare secret;
- rotate any token that has been published or shared beyond its intended users;
- keep Cloudflare and Worker observability access restricted;
- monitor traffic and configure suitable account-level abuse controls;
- understand that the built-in hostname checks reduce obvious SSRF exposure but
  are not a substitute for deployment-specific policy or an allowlist when one
  is required;
- never treat the Relay as an anonymous public CORS proxy.

The project intentionally does not log bodies, credentials, paths, or query
values. Cloudflare and upstream services may have their own logging policies.

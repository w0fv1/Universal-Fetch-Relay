# FreeLLMAPI integration

FreeLLMAPI supports this protocol as an opt-in global outbound transport.

## Environment configuration

```dotenv
PROXY_MODE=fetch-relay
PROXY_URL=https://your-relay.workers.dev
FETCH_RELAY_TOKEN=<the same RELAY_TOKEN secret>
```

Restart FreeLLMAPI after changing environment variables. Existing forward
proxy, SOCKS, per-key proxy, bypass, and `NO_PROXY` behavior remains unchanged
unless `fetch-relay` is explicitly selected.

## Dashboard configuration

Under **Keys → Outbound proxy**:

1. Select `fetch-relay`.
2. Enter the Worker URL.
3. Enter the Relay token.
4. Use **Test** before saving.

FreeLLMAPI stores Dashboard Relay tokens encrypted at rest and does not return
them through the settings API. Its provider `Authorization` header remains
separate from `Fetch-Relay-Authorization`.

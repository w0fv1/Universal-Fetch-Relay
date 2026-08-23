# 接入 FreeLLMAPI

FreeLLMAPI 可将本协议作为显式启用的全局出站传输。

## 环境变量

```dotenv
PROXY_MODE=fetch-relay
PROXY_URL=https://your-relay.workers.dev
FETCH_RELAY_TOKEN=<与 RELAY_TOKEN 相同的值>
```

修改后重启 FreeLLMAPI。只有显式选择 `fetch-relay` 才会改变行为；原有 HTTP、
HTTPS、SOCKS、per-key proxy、bypass 和 `NO_PROXY` 保持不变。

## Dashboard

进入 **Keys → Outbound proxy**：

1. 选择 `fetch-relay`。
2. 输入 Worker URL。
3. 输入 Relay Token。
4. 保存前点击 **Test**。

FreeLLMAPI 会加密保存 Dashboard 中的 Relay Token，设置 API 不会回传明文。
上游 `Authorization` 与 `Fetch-Relay-Authorization` 始终分离。

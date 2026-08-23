# 协议参考

## 请求 Header

| Header | 必需 | 含义 |
| --- | --- | --- |
| `Fetch-Relay-Authorization` | 是 | 使用 `Bearer <RELAY_TOKEN>` 认证中继调用方。 |
| `Fetch-Relay-Target` | 是 | 完整的公网 `http:` 或 `https:` 目标 URL。 |
| `Authorization` | 否 | 普通上游凭据，会转发给目标 API。 |

目标只允许通过 `Fetch-Relay-Target` 传入，不支持 Query 或 Path 兼容格式。
中继保留普通 HTTP Method 和 Body，但会移除中继控制头、逐跳头、转发身份头、
Origin、Referer、Cookie 等。`CONNECT` 和 `TRACE` 返回 `405`。

## 响应 Header

| Header | 含义 |
| --- | --- |
| `Fetch-Relay-Request-ID` | 用于关联脱敏日志的请求 UUID。 |
| `Fetch-Relay-Location` | 上游原始重定向目标。 |

上游 `Location` 和 `Set-Cookie` 不会直接返回。中继不会自动跟随重定向，调用方
需要验证 `Fetch-Relay-Location` 后显式发起下一次中继请求。

## 错误格式

```json
{
  "error": "unauthorized",
  "requestId": "0e72e66b-9af4-4ddb-82b2-7cbcf41302ae"
}
```

常见状态码：无效目标 `400`、鉴权失败 `401`、方法不支持 `405`、上游请求失败
`502`、未配置 Secret `503`。

## 流式和取消

Worker 直接传递 `request.body`、`request.signal` 和 `upstream.body`，不会对业务
Body 调用 `json()`、`text()` 或 `arrayBuffer()`，因此能够保留 SSE、二进制流
以及取消信号。

# 快速开始

## 环境要求

- 已启用 Workers 的 Cloudflare 账号
- Node.js 20 或更高版本
- npm

## 部署自己的中继

```bash
git clone https://github.com/w0fv1/universal-fetch-relay.git
cd universal-fetch-relay
npm ci
npm test
npx wrangler login
npx wrangler secret put RELAY_TOKEN
npm run deploy
```

`RELAY_TOKEN` 应使用至少 32 字节随机数据，并且只能通过 Cloudflare Secret
保存，不能写入源码或 `wrangler.jsonc`。

## 验证 JSON 转发

```bash
curl 'https://your-relay.workers.dev' \
  -H "Fetch-Relay-Authorization: Bearer $RELAY_TOKEN" \
  -H 'Fetch-Relay-Target: https://httpbingo.org/anything?source=smoke' \
  -H 'Content-Type: application/json' \
  --data-binary '{"hello":"relay"}'
```

响应应显示 POST、`source=smoke` 和完全一致的 JSON。缺失或错误密码返回
`401`。

## 验证流式响应

```bash
curl --no-buffer 'https://your-relay.workers.dev' \
  -H "Fetch-Relay-Authorization: Bearer $RELAY_TOKEN" \
  -H 'Fetch-Relay-Target: https://httpbingo.org/drip?duration=3&numbytes=3&delay=0'
```

数据应在三秒内逐步到达，而不是结束后一次性返回。

本地开发时，将测试密码放在 Git 已忽略的 `.dev.vars`：

```dotenv
RELAY_TOKEN=local-development-token
```

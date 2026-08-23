---
layout: home

hero:
  name: Universal Fetch Relay
  text: 面向通用 HTTP API 的轻量中继协议
  tagline: 基于 Cloudflare Workers，无状态、带鉴权、与供应商无关，并默认支持流式传输。
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/getting-started
    - theme: alt
      text: 协议参考
      link: /zh/protocol
    - theme: alt
      text: 查看 GitHub
      link: https://github.com/w0fv1/universal-fetch-relay

features:
  - title: 与供应商无关
    details: Worker 内不保存站点或 API 供应商列表，每次请求都携带完整的公网 HTTP(S) 目标。
  - title: 全链路流式
    details: 请求体和响应体不会在应用层整体缓冲，适用于 SSE、二进制和普通 API 流量。
  - title: 凭据分离
    details: 中继鉴权使用独立 Header，上游 Authorization 保持原样。
  - title: 防御性默认值
    details: 手动处理重定向、移除 Cookie 和控制头，并拒绝明显的本地及元数据目标。
---

## 最小请求

```bash
curl 'https://your-relay.workers.dev' \
  -H "Fetch-Relay-Authorization: Bearer $RELAY_TOKEN" \
  -H 'Fetch-Relay-Target: https://httpbingo.org/anything' \
  -H 'Content-Type: application/json' \
  --data-binary '{"hello":"relay"}'
```

它是应用层中继，不是 CONNECT、SOCKS、TCP 或匿名 CORS 代理。部署前请阅读
[安全模型](/zh/security)。

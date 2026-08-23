# 安全模型

Universal Fetch Relay 是受信任的应用层中间节点。Worker 运营者能够看到请求
内容和上游凭据，只应使用由可信主体运营的中继。

## 内置控制

- 必须使用 Cloudflare Secret 中保存的 Bearer Token。
- 使用 SHA-256 和恒定时间比较验证 Token。
- 拒绝 IP 字面量、本地主机、元数据地址、URL 凭据、Fragment 和直接中继循环。
- 移除中继控制头、逐跳头、转发身份头、Origin、Referer 和 Cookie。
- 不自动跟随重定向，也不返回上游 Cookie。
- 结构化日志不包含 Body、凭据、目标 Path 或 Query。

这些措施只能降低常见风险，不能证明所有域名在所有部署中都安全。如果威胁模型
要求域名白名单、网络出口策略、用户级身份、配额或防滥用，应在公开服务之前添加。

## Token 建议

- 使用至少 32 字节随机数据。
- 只用 `wrangler secret put RELAY_TOKEN` 保存。
- 不要放进源码、变量文件、截图、Issue 或日志。
- 一旦泄露立即轮换。
- 不同信任边界应使用不同 Worker 或身份层。

浏览器能够调用中继不代表它是匿名代理。前端代码中的共享 Token 可以被最终用户
提取；共享密钥更适合放在可信后端。

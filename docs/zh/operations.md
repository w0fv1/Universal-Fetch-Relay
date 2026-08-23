# 运维指南

## 常用命令

```bash
npm test
npm run dev
npm run deploy
npm run docs:dev
npm run docs:build
```

## 轮换密码

```bash
npx wrangler secret put RELAY_TOKEN
```

Wrangler 会创建带有新 Secret 的 Worker 版本。应及时更新授权客户端，并停止使用
旧值。

## 查看日志

```bash
npx wrangler tail
```

可用 `Fetch-Relay-Request-ID` 关联响应和脱敏日志。排障时也不应添加 Body、完整
URL、Query 或 Authorization 日志。

## GitHub Pages

仓库使用 GitHub Actions 发布 `docs/.vitepress/dist`。修改文档或构建配置并推送
到 `main` 后会自动部署；Pull Request 只执行构建验证，不发布。

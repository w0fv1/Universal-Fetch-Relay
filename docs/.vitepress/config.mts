import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Universal Fetch Relay',
  description: 'An authenticated, streaming HTTP(S) Fetch Relay for Cloudflare Workers.',
  base: '/universal-fetch-relay/',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#0f766e' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
  ],
  locales: {
    root: { label: 'English', lang: 'en' },
    zh: { label: '简体中文', lang: 'zh-CN', link: '/zh/' },
  },
  themeConfig: {
    search: { provider: 'local' },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/w0fv1/universal-fetch-relay' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 w0fv1',
    },
    locales: {
      root: {
        nav: [
          { text: 'Guide', link: '/getting-started' },
          { text: 'Protocol', link: '/protocol' },
          { text: 'Security', link: '/security' },
        ],
        sidebar: [
          {
            text: 'Documentation',
            items: [
              { text: 'Getting started', link: '/getting-started' },
              { text: 'Protocol reference', link: '/protocol' },
              { text: 'Security model', link: '/security' },
              { text: 'Operations', link: '/operations' },
              { text: 'FreeLLMAPI integration', link: '/freellmapi' },
            ],
          },
        ],
        editLink: {
          pattern: 'https://github.com/w0fv1/universal-fetch-relay/edit/main/docs/:path',
          text: 'Edit this page on GitHub',
        },
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2026 w0fv1',
        },
      },
      zh: {
        nav: [
          { text: '指南', link: '/zh/getting-started' },
          { text: '协议', link: '/zh/protocol' },
          { text: '安全', link: '/zh/security' },
        ],
        sidebar: [
          {
            text: '文档',
            items: [
              { text: '快速开始', link: '/zh/getting-started' },
              { text: '协议参考', link: '/zh/protocol' },
              { text: '安全模型', link: '/zh/security' },
              { text: '运维指南', link: '/zh/operations' },
              { text: '接入 FreeLLMAPI', link: '/zh/freellmapi' },
            ],
          },
        ],
        editLink: {
          pattern: 'https://github.com/w0fv1/universal-fetch-relay/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页',
        },
        footer: {
          message: '基于 MIT 许可证发布。',
          copyright: 'Copyright © 2026 w0fv1',
        },
      },
    },
  },
})

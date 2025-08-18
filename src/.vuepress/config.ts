import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite';
import theme from "./theme.js";
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineUserConfig({
  base: "/leetcode-notes/",

  bundler: viteBundler({
    viteOptions: {
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      },
      worker: {
        plugins: [], // 这里保证 Worker 也经过 Vite 编译
      },
    },
  }),

  locales: {
    "/": {
      lang: "zh-CN",
      title: "老马啸西风",
      description: "老马啸西风的技术博客",
    },
  },

  theme,
});

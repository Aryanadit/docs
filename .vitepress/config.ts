import { defineConfig } from 'vitepress';
import { blogSidebar } from './sidebar';

export default defineConfig({
  srcDir: './',
  outDir: './build',
  assetsDir: 'assets',
  base: '/',
  cleanUrls: true,
  ignoreDeadLinks: false,
  lang: 'en-US',
  title: 'Blog',
  description: 'Our company blog.',
  lastUpdated: true,

  themeConfig: {
    siteTitle: 'Blog',
    nav: [{ text: 'Blog', link: '/blog/' }],
    sidebar: {
      '/blog/': blogSidebar,
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
  },
});

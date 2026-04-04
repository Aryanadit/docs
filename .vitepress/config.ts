import { defineConfig } from 'vitepress';
import { blogSidebar } from './sidebar';

export default defineConfig({
  srcDir: './',
  outDir: './build',
  assetsDir: 'assets',
  base: '/',
  cleanUrls: true,
  ignoreDeadLinks: true,
  lang: 'en-US',
  title: 'Blog',
  description: 'Our company blog.',
  lastUpdated: true,
  srcExclude: ['**/README.md'],

  themeConfig: {
    siteTitle: 'Blog',
    nav: [{ text: 'Blog', link: '/blog/' }],
    sidebar: {
      '/blog/': blogSidebar,
    },
    search: {
      provider: 'local',
    },
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
  },
});

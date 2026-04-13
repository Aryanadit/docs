import { defineConfig } from 'vitepress';
import { blogSidebar } from './sidebar';

export default defineConfig({
  srcDir: './',
  outDir: './build',
  assetsDir: 'assets',
  base: '/docs',
  cleanUrls: true,
  ignoreDeadLinks: true,
  lang: 'en-US',

  title: 'Docs',
  description: 'MeasureMate documentation.',

  lastUpdated: true,
  srcExclude: ['**/README.md'],

  themeConfig: {
    siteTitle: 'Docs',

    nav: [{ text: 'Docs', link: '/docs/' }],

    sidebar: {
      '/docs/': blogSidebar,
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

import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },

  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      {
        name: 'post',
        label: 'Blog Posts',
        path: 'blog',
        format: 'md',

        match: {
          include: '**/*',
          exclude: 'index',
        },

        ui: {
          allowedActions: {
            create: true,
            delete: true,
          },

          // 🔥 Folder-based structure
          filename: {
            slugify: (values: any) => {
              const rawCategory = values?.categoryLabel || 'uncategorized';
              const title = values?.title || 'new-post';

              const categorySlug = rawCategory
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

              const titleSlug = title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

              return `${categorySlug}/${titleSlug}`;
            },
          },
        },

        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
          },
          {
            type: 'string',
            name: 'author',
            label: 'Author',
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            //required: true,
            ui: {
              defaultValue: new Date().toISOString(),
            },
          },

          {
            type: 'string',
            name: 'categoryLabel',
            label: 'Category',
            required: true,
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category (slug)',
            ui: {
              component: 'hidden',
              parse: (_: any, values: any) => {
                return values?.categoryLabel
                  ?.toLowerCase()
                  .trim()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-+|-+$/g, '');
              },
            },
          },

          // ✅ BODY (Markdown + images)
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
});

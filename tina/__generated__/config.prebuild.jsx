// tina/config.ts
import { defineConfig } from "tinacms";

// tina/media.ts
var CustomMediaStore = class {
  accept = "image/*";
  async persist(files) {
    const uploaded = await Promise.all(
      files.map(async (file) => {
        const formData = new FormData();
        formData.append("image", file.file);
        formData.append("category", "tina");
        formData.append("slug", "editor");
        const res = await fetch(
          "https://uploadimage-134044598052.europe-west1.run.app/upload-image",
          {
            method: "POST",
            body: formData
          }
        );
        const data = await res.json();
        return {
          id: data.url,
          type: "file",
          filename: file.file.name,
          directory: "",
          src: data.url
        };
      })
    );
    return uploaded;
  }
  async delete() {
    return;
  }
  async list() {
    return {
      items: []
    };
  }
};

// tina/config.ts
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    loadCustomStore: async () => {
      return CustomMediaStore;
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "blog",
        format: "md",
        match: {
          include: "**/*",
          exclude: "index"
        },
        ui: {
          allowedActions: {
            create: true,
            delete: true
          },
          // 🔥 Folder-based structure
          filename: {
            slugify: (values) => {
              const rawCategory = values?.categoryLabel || "uncategorized";
              const title = values?.title || "new-post";
              const categorySlug = rawCategory.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
              const titleSlug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
              return `${categorySlug}/${titleSlug}`;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "string",
            name: "author",
            label: "Author"
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            //required: true,
            ui: {
              defaultValue: "2026-01-01T00:00:00.000Z"
            }
          },
          {
            type: "string",
            name: "categoryLabel",
            label: "Category",
            required: true
          },
          {
            type: "string",
            name: "category",
            label: "Category (slug)",
            ui: {
              component: "hidden",
              parse: (_, values) => {
                return values?.categoryLabel?.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
              }
            }
          },
          // ✅ BODY (Markdown + images)
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};

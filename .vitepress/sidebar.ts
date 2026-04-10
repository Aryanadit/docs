import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

const blogDir = join(process.cwd(), 'docs');

function getPostsInCategory(category: string) {
  const categoryDir = join(blogDir, category);
  if (!existsSync(categoryDir)) return [];

  return readdirSync(categoryDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const name = file.replace('.md', '');
      return {
        text: name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        link: `/docs/${category}/${name}`,
      };
    });
}

function getCategories() {
  if (!existsSync(blogDir)) return [];

  return readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => ({
      text: d.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      collapsed: false,
      items: getPostsInCategory(d.name),
    }));
}

export const blogSidebar = getCategories();

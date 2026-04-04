<!-- <script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { useRoute } from 'vitepress';
import Breadcrumb from './Breadcrumb.vue';

const { Layout } = DefaultTheme;

const route = useRoute();
const showBreadcrumb = route.path.startsWith('/blog/');
</script>

<template>
  <Layout>
    <template #doc-before>
      <Breadcrumb v-if="showBreadcrumb" />
    </template>
  </Layout>
</template> -->

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import { useRoute, useData } from 'vitepress';
import Breadcrumb from './Breadcrumb.vue';
import { computed } from 'vue';

const { Layout } = DefaultTheme;
const route = useRoute();
const { frontmatter } = useData();

const isBlogPost = computed(
  () => route.path.includes('/blog/') && route.path.split('/').filter(Boolean).length >= 3,
);
const editUrl = computed(() => {
  const parts = route.path.split('/').filter(Boolean);
  const category = parts[1];
  const title = parts[2];
  return `http://localhost:4001/admin/index.html#/collections/edit/post/${category}/${title}`;
});

console.log('route.path:', route.path, 'parts:', route.path.split('/').filter(Boolean).length);
</script>
<template>
  <Layout>
    <template #doc-before>
      <Breadcrumb v-if="route.path.startsWith('/blog/')" />
    </template>
    <template #doc-footer-before>
      <div v-if="isBlogPost" style="display: flex; gap: 0.5rem; margin-bottom: 1rem">
        <a
          :href="editUrl"
          target="_blank"
          style="
            padding: 0.3rem 0.8rem;
            background: var(--vp-c-brand);
            color: white;
            border-radius: 6px;
            text-decoration: none;
            font-size: 0.85rem;
            font-weight: 600;
          "
        >
          ✏️ Edit Post
        </a>
      </div>
    </template>
  </Layout>
</template>

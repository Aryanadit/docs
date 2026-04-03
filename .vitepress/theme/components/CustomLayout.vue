<script setup lang="ts">
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
</template>

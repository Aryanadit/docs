<script setup lang="ts">
import { useRoute } from 'vitepress'
import { computed } from 'vue'

const route = useRoute()

const crumbs = computed(() => {
  const parts = route.path.split('/').filter(Boolean)
  const result = [{ text: 'Home', link: '/' }]
  let path = ''
  for (const part of parts) {
    path += `/${part}`
    result.push({
      text: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
      link: path,
    })
  }
  return result
})
</script>

<template>
  <nav class="breadcrumb">
    <span v-for="(crumb, i) in crumbs" :key="crumb.link">
      <a v-if="i < crumbs.length - 1" :href="crumb.link">{{ crumb.text }}</a>
      <span v-else class="current">{{ crumb.text }}</span>
      <span v-if="i < crumbs.length - 1" class="sep"> › </span>
    </span>
  </nav>
</template>

<style scoped>
.breadcrumb {
  font-size: 0.85rem;
  margin-bottom: 1rem;
  color: var(--vp-c-text-2);
}
.breadcrumb a {
  color: var(--vp-c-brand);
  text-decoration: none;
}
.breadcrumb a:hover {
  text-decoration: underline;
}
.sep {
  margin: 0 4px;
}
.current {
  color: var(--vp-c-text-1);
}
</style>

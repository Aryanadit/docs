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
import { computed, ref, onMounted } from 'vue';
import '../firebase';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';

const { Layout } = DefaultTheme;
const route = useRoute();
const { frontmatter } = useData();

const isBlogPost = computed(
  () => route.path.includes('/docs/') && route.path.split('/').filter(Boolean).length >= 3,
);

// const editUrl = computed(() => {
//   const parts = route.path.split('/').filter(Boolean);
//   const category = parts[1];
//   const title = parts[2];
//   return `http://localhost:4001/admin/index.html#/collections/edit/post/${category}/${title}`;
// });

const editUrl = computed(() => {
  const parts = route.path.split('/').filter(Boolean);
  const category = parts[1];
  const title = parts[2];
  return `/admin/index.html#/collections/edit/post/${category}/${title}`;
});

console.log('route.path:', route.path, 'parts:', route.path.split('/').filter(Boolean).length);

// 🔐 AUTH STATE
const user = ref<User | null>(null);
const isAdmin = ref(false);

const allowedUsers = [
  'aryanadit1407@gmail.com', // 🔥 your admin email
];

onMounted(() => {
  const auth = getAuth();

  onAuthStateChanged(auth, (u: User | null) => {
    user.value = u;

    if (u && allowedUsers.includes(u.email || '')) {
      isAdmin.value = true;
    } else {
      isAdmin.value = false;
    }
  });
});

// 🔐 LOGIN FUNCTION
const login = async () => {
  const email = prompt('Enter email');
  const password = prompt('Enter password');

  if (!email || !password) return;

  const auth = getAuth();

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert('Login failed');
    console.error(err);
  }
};

// 🔐 LOGOUT FUNCTION
const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
};
</script>

<template>
  <Layout>
    <template #doc-before>
      <Breadcrumb v-if="route.path.startsWith('/docs/')" />
    </template>

    <template #doc-footer-before>
      <div style="display: flex; gap: 0.6rem; margin-bottom: 1rem; align-items: center">
        <!-- LOGIN -->
        <button
          v-if="!user"
          @click="login"
          style="
            padding: 0.3rem 0.8rem;
            background: #444;
            color: white;
            border-radius: 6px;
            border: none;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
          "
        >
          🔐 Login
        </button>

        <!-- LOGOUT -->
        <button
          v-if="user"
          @click="logout"
          style="
            padding: 0.3rem 0.8rem;
            background: #666;
            color: white;
            border-radius: 6px;
            border: none;
            font-size: 0.85rem;
            font-weight: 600;
            cursor: pointer;
          "
        >
          🚪 Logout
        </button>

        <!-- EDIT BUTTON -->
        <a
          v-if="isBlogPost && isAdmin"
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

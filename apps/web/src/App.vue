<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { http } from './lib/http';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3999';
const postCount = ref<number | null>(null);

onMounted(async () => {
  const response = await http.post.findMany({
    query: {
      skip: '0',
      take: '5',
    },
  });

  if (response.status === 200) {
    postCount.value = response.body.length;
  }
});
</script>

<template>
  <main class="app-shell">
    <section class="hero-card">
      <p class="eyebrow">Vue 3 + TypeScript + Vite + Axios</p>
      <h1>Nest Demo Web</h1>
      <p class="description">
        前端基础脚手架已接入当前 monorepo，可以在这里继续扩展路由、状态管理和 API
        页面。
      </p>

      <div class="stack-grid">
        <article>
          <span>应用目录</span>
          <strong>apps/web</strong>
        </article>
        <article>
          <span>开发命令</span>
          <strong>pnpm --filter @repo/web dev</strong>
        </article>
        <article>
          <span>接口基地址</span>
          <strong>{{ apiBaseUrl }}</strong>
        </article>
        <article>
          <span>共享契约请求示例</span>
          <strong>{{ postCount === null ? '加载中' : `posts: ${postCount}` }}</strong>
        </article>
      </div>
    </section>
  </main>
</template>

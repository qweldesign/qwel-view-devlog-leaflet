<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Markdown } from '../types/markdown.ts';
import { useMarkdown } from '../composables/useMarkdown';

const logs = ref<Markdown[]>([]);

onMounted(async (limit = 10) => {
  // index.json を読み込む
  const res = await fetch('/assets/logs/index.json');
  let files = await res.json();

  // markdown を limit 件数切り分ける
  files = files.slice(0, limit);

  // 各 markdown を読み込んで表示
  for (const file of files) {
    const { meta, html, loadMarkDown } = useMarkdown();
    await loadMarkDown(file);

    if (meta.value) {
      logs.value.push({
        meta: meta.value,
        html: html.value
      });
    }
  }
});
</script>

<template>
  <section id="logs" class="section my-24">
    <div class="inner">
      <h2 class="heading my-6">議事録</h2>
      <details v-for="log, i in logs" :key="i">
        <summary class="border-b border-dashed font-bold text-xl leading-9 cursor-pointer">
          <span v-text="log.meta.date"></span> | <span v-text="log.meta.title"></span>
        </summary>
        <div class="markdown" v-html="log.html"></div>
      </details>
    </div>
  </section>
</template>

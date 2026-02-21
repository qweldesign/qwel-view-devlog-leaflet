<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useData } from '../composables/useData';
import { useMarkdown } from '../composables/useMarkdown';

const { data, loadData } = useData();
const tasks = computed(() => {
  return data.value?.tasks.filter(t => t['進捗'] === '進行中')
});

const { meta, html, loadMarkDown } = useMarkdown();

onMounted(async () => {
  await loadData();
  await loadMarkDown('overview');
});

const openIds = ref(new Set<number>());

function toggle(id: number) {
  if (openIds.value.has(id)) {
    openIds.value.delete(id);
  } else {
    openIds.value.add(id);
  }
}
</script>

<template>
  <section id="tasks" class="section mt-12 mb-24">
    <div class="inner">
      <h2 class="heading my-6">進捗・タスク</h2>
      <div class="my-6">
        <div class="my-3 italic underline" v-text="`最終更新: ${meta?.date}`"></div>
        <div class="markdown my-3" v-html="html"></div>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th class="hidden lg:table-cell">ID</th>
              <th class="hidden lg:table-cell">段階</th>
              <th>タスク名</th>
              <th class="hidden lg:table-cell">重要度</th>
              <th class="hidden lg:table-cell">労力度</th>
              <th>進捗</th>
              <th>期限</th>
              <th>備考</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="t in tasks" :key="t['ID']">
              <tr>
                <td class="hidden lg:table-cell" v-text="t['ID']"></td>
                <td class="hidden lg:table-cell" v-text="t['段階']"></td>
                <td v-text="t['タスク名']"></td>
                <td
                  class="hidden lg:table-cell"
                  :class="t['重要度'] === '最重要' ? 'is-critical' : t['重要度'] === '高' ? 'is-heigh' : t['重要度'] === '中' ? 'is-meddle' : 'is-low'"
                  v-text="t['重要度']"
                ></td>
                <td
                  class="hidden lg:table-cell"
                  :class="t['労力度'] === '大' ? 'is-large' : t['労力度'] === '中' ? 'is-medium' : 'is-small'"
                  v-text="t['労力度']"
                ></td>
                <td
                  :class="t['進捗'] === '完了' ? 'is-done' : t['進捗'] === '進行中' ? 'is-doing' : 'is-hold'"
                  v-text="t['進捗']"
                ></td>
                <td v-text="t['期限']"></td>
                <td
                  :class="(t['備考'] ? 'cursor-pointer' : '')"
                  v-text="(t['備考'] ? openIds.has(t['ID']) ? '▼' : '▶' : '-')"
                  @click="t['備考'] && toggle(t['ID'])"></td>
              </tr>
              <tr v-show="openIds.has(t['ID'])">
                <td class="text-sm/7 text-center align-top" colspan="2">備考:</td>
                <td colspan="6" class="text-sm/7" v-html="t['備考'].replaceAll('\n', '<br>')"></td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

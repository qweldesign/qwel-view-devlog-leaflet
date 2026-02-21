<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import type { Property } from '../types/data';
import { useData } from '../composables/useData';

const props = defineProps<{ id: string }>();
const { data, loadData } = useData();
const property = computed(() => {
  return parseData(data.value?.properties.find(p => p['ID'] === props.id));
});

onMounted(async () => {
  await loadData();
});

function parseData(data?: Property) {
  if (!data) return [];
  const {ID, 緯度, 経度, カテゴリ, ステータス, 空き家になった年, ...formatted} = data;
  return Object.entries(formatted);
}
</script>

<template>
  <section id="property" class="section my-24">
    <div class="inner">
      <h2 class="heading my-6">物件詳細</h2>
      <div class="my-6 overflow-x-auto">
        <table class="table">
          <tbody>
            <tr v-for="arr in property">
              <th class="w-48" v-text="arr[0]"></th>
              <th v-html="arr[1].replaceAll('\n', '<br>')"></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="my-6 text-center">
      <RouterLink class="button-orange mx-6" to="/">ダッシュボードへ戻る</RouterLink>
      <RouterLink class="button-orange mx-6" to="/properties/">物件一覧へ戻る</RouterLink>
    </div>
  </section>
</template>

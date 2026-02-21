<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useData } from '../composables/useData';

const { data, loadData } = useData();
const properties = computed(() => {
  return data.value?.properties.filter(p => p['カテゴリ'] !== '施設');
});

onMounted(async () => {
  await loadData();
});
</script>

<template>
  <section id="properties" class="section my-24">
    <div class="inner">
      <h2 class="heading my-6">物件一覧</h2>
    </div>
    <div class="max-w-6xl my-6 mx-auto px-6">
      <div class="my-6 overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>名称</th>
              <th>住所</th>
              <th>ステータス</th>
              <th>ツアー物件</th>
              <th>ランク</th>
              <th>間取り図</th>
              <th class="hidden lg:table-cell">形態</th>
              <th class="hidden lg:table-cell">価格帯</th>
              <th>詳細</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in properties" :key="p['ID']">
              <td v-text="p['名称']"></td>
              <td v-text="p['住所']"></td>
              <td
                :class="p['ステータス'] === '内覧可' ? 'is-available' : p['ステータス'] === '調査前' ? 'is-survey' : 'is-hold'"
                v-text="p['ステータス']"
              ></td>
              <td
                :class="p['ツアー物件'] === '有力候補' ? 'is-primary' : ''"
                v-text="p['ツアー物件']"
              ></td>
              <td
                :class="p['ランク'] !== '-' ? `is-${p['ランク']}` : ''"
                v-text="p['ランク']"
              ></td>
              <td v-text="p['間取り図']"></td>
              <td class="hidden lg:table-cell" v-text="p['形態']"></td>
              <td class="hidden lg:table-cell" v-text="p['価格帯']"></td>
              <td>
                <RouterLink :to="`/properties/${p['ID']}`">▶</RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="text-center">
      <RouterLink class="button-orange m-6" to="/">ダッシュボードへ戻る</RouterLink>
    </div>
  </section>
</template>

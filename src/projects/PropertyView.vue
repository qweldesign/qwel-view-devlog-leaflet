<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useData } from '../composables/useData'

const props = defineProps<{ id: string }>()
const { data, loadData } = useData()
const property = computed(() => {
  return data.value?.properties.find(p => p['ID'] === props.id)
})

onMounted(async () => {
  await loadData()
})
</script>

<template>
  <section id="property" class="section my-24">
    <img src="/images/logo_kunimi-life.png" class="hidden absolute top-0 right-0 z-1 w-24 h-auto m-12 opacity-100 print:block">
    <div class="inner print:w-[210mm] print:mx-auto">
      <h2 class="heading my-9 print:text-base">国見 海・人・暮らし相談室 - 物件データ</h2>
      <div class="flex flex-wrap">
        <div class="flex-1/2 px-3">
          <table class="table min-w-0 border-t border-gray-200">
            <tbody>
              <tr>
                <td class="w-1/3 font-bold">名称</td>
                <td class="w-2/3">{{ property?.名称 }}</td>
              </tr>
              <tr>
                <td class="w-1/3 font-bold">住所</td>
                <td class="w-2/3">福井市 {{ property?.住所 }}</td>
              </tr>
              <tr>
                <td class="w-1/3 font-bold">希望取引価格</td>
                <td class="w-2/3">{{ property?.価格帯 }}</td>
              </tr>
              <tr>
                <td class="w-1/3 font-bold">不動産業者</td>
                <td class="w-2/3">{{ property?.仲介者氏名 }}</td>
              </tr>
              <tr>
                <td class="w-1/3 font-bold">不動産連絡先</td>
                <td class="w-2/3">{{ property?.仲介者連絡先 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex-1/2 px-3">
          <table class="table min-w-0 border-t border-gray-200">
            <tbody>
              <tr>
                <td class="w-1/3 font-bold">構造</td>
                <td class="w-2/3" v-html="property?.構造.replaceAll('\n', '<br>')"></td>
              </tr>
              <tr>
                <td class="w-1/3 font-bold">間取り</td>
                <td class="w-2/3" v-html="property?.間取り.replaceAll('\n', '<br>')"></td>
              </tr>
              <tr>
                <td class="w-1/3 font-bold">インフラ状況</td>
                <td class="w-2/3" v-html="property?.設備.replaceAll('\n', '<br>')"></td>
              </tr>
              <tr>
                <td class="w-1/3 font-bold">特徴</td>
                <td class="w-2/3" v-html="property?.特徴.replaceAll('\n', '<br>')"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <figure v-if="property?.間取り図 === '有'" class="my-6">
        <img :src="`/floor-plan/${property.ID}.jpg`" class="w-full h-auto">
      </figure>
      <div class="flex gap-6">
        <div class="flex-1/2 shrink-1 p-3 border border-gray-400 rounded">
          <h5 class="mb-3 font-bold">所有者からの一言</h5>
          <p v-html="property?.所有者からの一言.replaceAll('\n', '<br>')"></p>
        </div>
        <div class="flex-1/2 shrink-1 p-3 border border-gray-400 rounded">
          <h5 class="mb-3 font-bold">相談室からの一言</h5>
          <p v-html="property?.相談室からの一言.replaceAll('\n', '<br>')"></p>
        </div>
      </div>
    </div>
    <div class="text-center print:hidden">
      <RouterLink class="button-orange m-6" to="/">ダッシュボードへ戻る</RouterLink>
      <RouterLink class="button-orange m-6" to="/properties/">物件一覧へ戻る</RouterLink>
    </div>
  </section>
</template>

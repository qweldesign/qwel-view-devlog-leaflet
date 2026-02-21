<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useData } from '../composables/useData';
import { useLeafletMap } from '../composables/useLeafletMap';

const mapRef = ref<HTMLDivElement | null>(null);
const { data, loadData } = useData();
const { addMarkers } = useLeafletMap(mapRef);

onMounted(async () => {
  await loadData();
  if (data.value?.properties.length) {
    addMarkers(data.value.properties)
  }
});
</script>

<template>
  <section id="map" class="section my-24">
    <div class="inner">
      <h2 class="heading my-6">現在調査中の空き家マップ</h2>
    </div>
    <div class="map" ref="mapRef"></div>
    <div class="my-6 text-center">
      <RouterLink class="button-orange mx-6" to="/properties/">物件一覧を見る</RouterLink>
    </div>
  </section>
</template>

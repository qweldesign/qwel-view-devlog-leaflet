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

const showCover = ref(true);

function closeCover() {
  showCover.value = false;
};
</script>

<template>
  <section id="map" class="section my-24">
    <div class="inner">
      <h2 class="heading my-6">現在調査中の空き家マップ</h2>
    </div>
    <div class="map relative my-6">
      <div class="h-1/1" ref="mapRef"></div>
      <Transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div class="absolute inset-0 z-1000 flex justify-center items-center bg-black/25 cursor-pointer" v-if="showCover" @click="closeCover">
          <p class="text-white">クリックするとマップを操作できるようになります。</p>
        </div>
      </Transition>
    </div>
    <div class="text-center">
      <RouterLink class="button-orange m-6" to="/properties/">物件一覧を見る</RouterLink>
    </div>
  </section>
</template>

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
  <div class="map" ref="mapRef"></div>
</template>

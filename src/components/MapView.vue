<script lang="ts" setup>
import { ref } from 'vue';
import { useLeafletMap } from '../composables/useLeafletMap';

const mapRef = ref<HTMLDivElement | null>(null);
useLeafletMap(mapRef);
</script>

<template>
  <div class="map" ref="mapRef"></div>
</template>

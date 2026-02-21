<script setup lang="ts">
import PropertyView from '../components/PropertyView.vue';
const props = defineProps<{ id: string }>();
</script>

<template>
  <div>
    <PropertyView :id="props.id" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
import { watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

watch(
  () => route.fullPath,
  async () => {
    if (route.hash) {
      await nextTick();
      setTimeout(() => {
        const el = document.querySelector(route.hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  },
  { immediate: true }
);
</script>

<template>
  <AppHeader />
  <RouterView v-slot="{ Component }">
    <Transition
      name="fade"
      mode="out-in"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <component :is="Component" />
    </Transition>
  </RouterView>
  <AppFooter />
</template>

<script setup lang="ts">
import TasksView from '../components/TasksView.vue';
import MapView from '../components/MapView.vue';
import LogsView from '../components/LogsView.vue';
</script>

<template>
  <div>
    <TasksView mode="summary" />
    <MapView />
    <LogsView />
  </div>
</template>

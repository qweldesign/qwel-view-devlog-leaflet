<script setup lang="ts">
import TasksView from '../projects/TasksView.vue'
import MapView from '../projects/MapView.vue'
import LogsView from '../projects/LogsView.vue'
</script>

<template>
  <div>
    <TasksView mode="summary" />
    <MapView />
    <LogsView />
  </div>
</template>

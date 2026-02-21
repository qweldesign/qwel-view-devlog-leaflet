import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Tasks from './pages/Tasks.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/tasks/', component: Tasks }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return false;
    }
    return { top: 0 };
  }
});

export default router;

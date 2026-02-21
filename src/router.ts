import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Tasks from './pages/Tasks.vue';
import PropertiesList from './pages/PropertiesList.vue';
import PropertyDetail from './pages/PropertyDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/tasks/', component: Tasks },
    { path: '/properties/', component: PropertiesList },
    { path: '/properties/:id', component: PropertyDetail, props: true }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return false;
    }
    return { top: 0 };
  }
});

export default router;

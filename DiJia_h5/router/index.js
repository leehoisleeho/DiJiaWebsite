import { createRouter, createWebHistory } from 'vue-router';
import index from '/src/pages/index.vue'; // 首页
import about from '/src/pages/about.vue'; // 关于我们
import newsDetails from '/src/pages/newsDetails.vue'; // 首页
import projectDetais from '/src/pages/projectDetais.vue'; // 首页
const routes = [
  { path: '/', component: index },
  { path: '/about', component: about },
  { path: '/newsDetails', component: newsDetails },
  { path: '/projectDetais', component: projectDetais },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
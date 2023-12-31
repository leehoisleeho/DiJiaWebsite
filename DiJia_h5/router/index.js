import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router';
import index from '/src/pages/index.vue'; // 首页
import about from '/src/pages/about.vue'; // 关于我们
import newsDetails from '/src/pages/newsDetails.vue'; // 新闻详情
import projectDetais from '/src/pages/projectDetais.vue'; // 项目详情
import contact from '/src/pages/contact.vue'
import success from '/src/pages/success.vue'
const routes = [
  { path: '/', component: index },
  { path: '/about', component: about },
  { path: '/newsDetails', component: newsDetails },
  { path: '/projectDetais', component: projectDetais },
  { path: '/contact', component: contact },
  { path: '/success', component: success },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
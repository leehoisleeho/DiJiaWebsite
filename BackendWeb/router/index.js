import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../src/pages/index.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("../src/pages/dashboard.vue"),
      },
      {
        path: "banner",
        component: () => import("../src/pages/banner.vue"),
      },
      {
        path: "projectList",
        component: () => import("../src/pages/projectList.vue"),
      },
      {
        path: "article",
        component: () => import("../src/pages/article.vue"),
      },
      {
        path: "about",
        component: () => import("../src/pages/about.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../src/pages/login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

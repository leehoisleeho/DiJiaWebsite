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
        path: "contact",
        component: () => import("../src/pages/contact.vue"),
      },
      {
        path: "basicTemplate",
        component: () => import("../src/pages/basicTemplate.vue"),
      },
      {
        path: "dataTemplate",
        component: () => import("../src/pages/dataTemplate.vue"),
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

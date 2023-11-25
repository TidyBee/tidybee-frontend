import MainPage from "@/MainPage.vue";
import ConfigurationPage from "@/ConfigurationPage.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: MainPage,
    path: "",
  },
  {
    name: "Configuration",
    component: ConfigurationPage,
    path: "/settings",
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHashHistory(),
  routes,
});

export default router;

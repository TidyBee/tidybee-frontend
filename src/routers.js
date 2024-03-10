import MainPage from "@/pages/MainPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";

import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: MainPage,
    path: "",
  },
  {
    name: "Settings",
    component: SettingsPage,
    path: "/settings",
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHashHistory(),
  routes,
});

export default router;

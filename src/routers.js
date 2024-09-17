import MainPage from "@/pages/MainPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";

import { createRouter, createWebHistory } from "vue-router";

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
  {
    name: "Callback",
    path: "/callback/google",
    redirect: (to) => {
      console.log(to);
      return {
        path: "/settings"
      }
    }
  }
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes,
});

export default router;

import MainPage from "@/pages/MainPage.vue";
import SettingsPage from "@/pages/SettingsPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: MainPage,
    path: "/",
  },
  {
    name: "Settings",
    component: SettingsPage,
    path: "/settings",
  },
  {
    name: "Callback",
    path: "/callback/google",
    redirect: () => {
      return {
        path: "/settings",
      };
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

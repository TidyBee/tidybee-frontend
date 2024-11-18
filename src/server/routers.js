import HomePage from "@/front/pages/home/HomePage.vue"
import ConfigurationPage from "@/front/pages/configuration/ConfigurationPage.vue"
import OverviewPage from "@/front/pages/overview/OverviewPage.vue"
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: HomePage,
    path: "/",
  },
  {
    name: "Configuration",
    component: ConfigurationPage,
    path: "/configuration",
  },
  {
    name: "Overview",
    component: OverviewPage,
    path: "/overview",
  },
  {
    name: "Callback",
    path: "/callback/:provider",
    redirect: "/settings",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

import HomePage from "@/front/pages/home/HomePage.vue";
import ConfigurationPage from "@/front/pages/configuration/ConfigurationPage.vue";
import TidyListe from "@/front/pages/tidyliste/TidyListe.vue";
import TidyListeDetails from "@/front/pages/tidyliste/table/details/TidyListeDetails.vue";
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
    name: "TidyListe",
    component: TidyListe,
    path: "/TidyListe",
  },
  {
    name: "TidyListeDetails",
    component: TidyListeDetails,
    path: "/TidyListe/:file_path",
    props: (route) => ({ item: route.state?.item || {} }),
  },
  {
    name: "Callback",
    path: "/callback/:provider",
    redirect: async to => {
      if (to.params.provider == "google") {
        const Oauth2Token = to.hash.split('=')[1];
        const req = await fetch(`${process.env.VUE_APP_HUB_AUTH}/SyncGoogle`, {
          method: 'POST',
          body: {
            Oauth2Token
          }
        });
      }

      return {path: "/"}
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

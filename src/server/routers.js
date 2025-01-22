import HomePage from "@/front/pages/home/HomePage.vue";
import ConfigurationPage from "@/front/pages/configuration/ConfigurationPage.vue";
import TidyListeDetails from "@/front/pages/tidyliste/table/details/TidyListeDetails.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: HomePage,
    path: "/",
    meta: {
      title: 'Tidybee',
    }
  },
  {
    name: "Configuration",
    component: ConfigurationPage,
    path: "/configuration",
    meta: {
      title: 'Configuration',
    }
  },
  {
    name: "TidyListeDetails",
    component: TidyListeDetails,
    path: "/TidyListe/:file_path",
    props: (route) => ({ item: route.state?.item || {} }),
    meta: {
      title: 'TidyListe',
    }
  },
  {
    name: "Callback",
    path: "/callback/:provider",
    redirect: async to => {
      if (to.params.provider == "google") {
        const Oauth2Token = to.hash.split('=')[1].split("&token_type")[0];
        const req = await fetch(`${process.env.VUE_APP_HUB_AUTH}/Cloud/SyncGoogle`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Oauth2Token
          })
        });
      }

      return 'Home'
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

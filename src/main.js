import { createApp } from "vue";
import App from "./App.vue";
import router from "@/routers.js";
import VueCookies from "vue-cookies";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

if (!VueCookies.get(["locale"])) {
  VueCookies.set("locale", "en");
}

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(router).mount("#app");

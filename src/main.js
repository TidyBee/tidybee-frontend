import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "@/routers.js";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import VueCookies from "vue-cookies";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import fr from "@/assets/translation/fr.json";
import en from "@/assets/translation/en.json";

const vuetify = createVuetify({
  components,
  directives,
});

if (!VueCookies.get(["locale"])) {
  VueCookies.set("locale", "en");
}
const locale = VueCookies.get(["locale"]);

const i18n = createI18n({
  locale: locale,
  fallbackLocale: "fr",
  messages: { fr, en },
});

createApp(App).use(i18n).use(vuetify).use(router).mount("#app");

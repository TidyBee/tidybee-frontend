import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "@/routers.js";
import VueCookies from "vue-cookies";

import fr from "@/assets/fr.json";
import en from "@/assets/en.json";

if (!VueCookies.get(["locale"])) {
  VueCookies.set("locale", "en");
}
const locale = VueCookies.get(["locale"]);

const i18n = createI18n({
  locale: locale,
  fallbackLocale: "fr",
  messages: { fr, en },
});

createApp(App).use(i18n).use(router).mount("#app");

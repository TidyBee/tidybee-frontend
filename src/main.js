import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import mitt from "mitt";
import App from "@/front/App.vue";
import router from "@/server/routers.js";
import VueCookies from "vue-cookies";
import { vuetify } from "./plugins/vuetify";
import fr from "@/translation/fr.json";
import "@mdi/font/css/materialdesignicons.css";


if (!VueCookies.get("locale")) {
  VueCookies.set("locale", "fr");
}
const locale = VueCookies.get("locale");

const i18n = createI18n({
  locale: locale || "fr",
  fallbackLocale: "fr",
  messages: { fr },
});

const emitter = mitt();

const app = createApp(App);

app.use(i18n);
app.use(vuetify);
app.use(router);
app.use(VueCookies);

app.config.globalProperties.emitter = emitter;
app.mount("#app");

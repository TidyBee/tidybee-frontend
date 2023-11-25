import { createApp } from "vue";
import App from "./App.vue";
import router from "@/routers.js";

createApp(App).use(router).mount("#app");

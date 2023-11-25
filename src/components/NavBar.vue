<template>
  <div class="NavBar">
    <div class="logo" @click="redirectToRoute('Home')">
      <img src="@/assets/tidybeelogo.png" alt="TidyBeeLogo" />
      <h2 class="nav-item">TidyBee</h2>
    </div>
    <select v-model="locale" @change="switchLang">
      LANG :
      <option>en</option>
      <option>fr</option>
    </select>
    <div class="menu-items">
      <h3 class="nav-item" @click="redirectToRoute('Configuration')">
        {{ $t("navbar.configuration") }}
      </h3>
      <h3 class="nav-item">
        {{ $t("navbar.about") }}
      </h3>
    </div>
  </div>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  name: "NavBar",
  setup() {
    if (!VueCookies.get(["locale"])) {
      VueCookies.set("locale", "en");
    }
    const locale = VueCookies.get(["locale"]);
    return {
      locale,
    };
  },
  data() {
    return {
      lang: "en",
    };
  },
  methods: {
    switchLang() {
      VueCookies.set("locale", this.locale);
      this.$i18n.locale = this.locale;
    },
    redirectToRoute(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style src="./css/NavBar.css" scoped></style>

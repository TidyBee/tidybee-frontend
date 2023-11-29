<template>
  <v-app-bar class="px-3" flat density="compact">
    <v-app-bar-icon>
      <v-img src="tidybeelogo.png" />
    </v-app-bar-icon>
    <v-spacer />
    <v-tabs centered color="grey-darken-2">
      <v-tab
        v-for="link in links"
        :key="link"
        :text="$t('navbar.' + link)"
        @click="redirectToRoute(link)"
      ></v-tab>
    </v-tabs>
    <v-spacer />
    <select v-model="locale" @change="switchLang">
      <option
        v-for="availableLocale in availableLocales"
        :key="availableLocale"
      >
        {{ availableLocale }}
      </option>
    </select>
  </v-app-bar>
  <!-- <div class="NavBar">
    <div class="logo" @click="redirectToRoute('Home')">
      <img src="@/assets/tidybeelogo.png" alt="TidyBeeLogo" />
      <h2 class="nav-item">TidyBee</h2>
    </div>
    <div class="menu-items">
      <h3 class="nav-item" @click="redirectToRoute('Configuration')">
        {{ $t("navbar.configuration") }}
      </h3>
      <h3 class="nav-item">
        {{ $t("navbar.about") }}
      </h3>
    </div>
  </div> -->
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  data: () => ({
    links: ["Home", "Configuration", "About"],
  }),
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

<template>
  <v-app-bar-icon class="logo">
    <img src="@/assets/tidybee-logo.svg" alt="TidyBee Logo" height="150" />
  </v-app-bar-icon>
  <v-app-bar class="px-3" flat density="compact">
    <v-spacer />
    <v-tabs centered color="grey-darken-2">
      <v-tab
        v-for="link in links"
        :key="link"
        :text="$t('navbar.' + link)"
        :data-cy="link"
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
      availableLocales: [""],
      links: ["Home", "Settings", "About"],
    };
  },
  mounted() {
    this.availableLocales = this.$i18n.availableLocales;
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

<style src="@/../css/pages/NavBar.css"></style>
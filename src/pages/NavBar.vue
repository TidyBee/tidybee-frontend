<template>
  <v-app-bar-icon class="logo">
    <img src="@/assets/tidybee-logo.svg" alt="TidyBee Logo" height="150" @click="redirectToRoute('Home')" />
  </v-app-bar-icon>
  <v-app-bar class="px-3" density="compact" :elevation="5" :height="80">
    <v-spacer />
    <v-tabs centered color="grey-darken-2" :grow="true">
      <v-tab
        v-for="link in links"
        :key="link"
        :text="$t('navbar.' + link)"
        :data-cy="link"
        class="tab"
        @click="redirectToRoute(link)"
      ></v-tab>
    </v-tabs>
    <v-spacer />
  </v-app-bar>
</template>

<script>
import VueCookies from "vue-cookies";

export default {
  name: "NavBar",
  setup() {
    if (!VueCookies.get(["locale"])) {
      VueCookies.set("locale", "fr");
    }
    const locale = VueCookies.get(["locale"]);
    return {
      locale,
    };
  },
  data() {
    return {
      availableLocales: [""],
      links: ["Home", "Settings"],
    };
  },
  mounted() {
    this.availableLocales = this.$i18n.availableLocales;
  },
  methods: {
    redirectToRoute(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style src="@/../css/pages/NavBar.css"></style>
<template>
  <v-app-bar class="navbar" :elevation="3" app>
    <v-spacer />
    <v-tabs v-model="activeTab" centered color="grey-darken-2">
      <v-tab
        :text="'Home'"
        @click="redirectToRoute('Home')"
        class="d-flex align-center justify-center"
      >
        <v-img
          src="https://tidybee.fr/images/logo-bookmark.svg"
          height="80"
          width="120"
          contain
        ></v-img>
      </v-tab>
      <v-tab 
        :text="'Configuration'" 
        @click="redirectToRoute('Configuration')"
        ></v-tab>
    </v-tabs>
    <v-spacer />
  </v-app-bar>
</template>

<script>
import VueCookies from "vue-cookies";
import { ref } from 'vue';

export default {
  name: "NavBar",
  setup() {
    if (!VueCookies.get("locale")) {
      VueCookies.set("locale", "fr");
    }
    const locale = VueCookies.get("locale");
    const activeTab = ref(2);

    return {
      locale,
      activeTab,
    };
  },
  data() {
    return {
      availableLocales: [],
      links: ["Home", "Configuration", "TidyListe"],
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

<style scoped>

</style>

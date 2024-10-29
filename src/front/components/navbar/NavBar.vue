<template>
  <v-app-bar class="navbar" :elevation="3" app>
    <v-spacer />
      <v-tab 
        height="80"
        :text="'TidyList'" 
        @click="redirectToRoute('Overview')"
      ></v-tab>
      <v-tab 
        height="80"
        :text="'Statistique'" 
        @click="redirectToRoute('Overview')"
      ></v-tab>
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
        height="80"
        :text="'TITLE'" 
        @click="redirectToRoute('Overview')"
        ></v-tab>
      <v-tab 
        height="80"
        :text="'Configuration'" 
        @click="redirectToRoute('Configuration')"
        ></v-tab>
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
      links: ["Home", "Configuration", "Overview"],
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

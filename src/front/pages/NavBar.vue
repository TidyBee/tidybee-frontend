<template>
  <v-app-bar class="px-3" density="compact" :elevation="5" :height="80">
    <v-spacer />
    <v-tabs centered color="grey-darken-2" :grow="true">
      <v-tab :text="'Tidybee'" @click="redirectToRoute('Home')"></v-tab>
      <v-tab :text="'Statistique'" @click="redirectToRoute('Home')"></v-tab>
      <v-tab :text="'TidyList'" @click="redirectToRoute('Overview')"></v-tab>
      <v-tab :text="'Configuration'" @click="redirectToRoute('Configuration')"></v-tab>
    </v-tabs>
    <v-switch
      v-model="isDarkTheme"
      @change="toggleTheme"
      inset
      hide-details
    >
      <template #input>
        <v-icon v-if="isDarkTheme" color="yellow">mdi-moon</v-icon>
        <v-icon v-else color="orange">mdi-sun</v-icon>
      </template>
    </v-switch>

    <v-spacer />
  </v-app-bar>
</template>

<script>
import VueCookies from "vue-cookies";
import { useTheme } from 'vuetify';
import { computed } from 'vue';

export default {
  name: "NavBar",
  setup() {
    // Vérification et définition de la locale avec les cookies
    if (!VueCookies.get("locale")) {
      VueCookies.set("locale", "fr");
    }
    const locale = VueCookies.get("locale");
    
    // Utilisation de Vuetify pour gérer le thème
    const theme = useTheme();

    // Création d'un computed réactif pour isDarkTheme
    const isDarkTheme = computed(() => theme.global.name.value === 'dark');

    const toggleTheme = () => {
      theme.global.name.value = theme.global.name.value === 'light' ? 'dark' : 'light';
    };

    return {
      locale,
      toggleTheme,
      isDarkTheme,
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
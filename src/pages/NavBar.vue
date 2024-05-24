<template>
  <v-app-bar-icon class="logo">
    <img src="@/assets/tidybee-logo.svg" alt="TidyBee Logo" height="150" @click="redirectToRoute('Home')" />
  </v-app-bar-icon>
  <v-app-bar class="px-3" density="compact" :elevation="5" :height="80">
    <v-spacer />
    <v-tabs
      v-model="activeTab"
      centered
      color="grey-darken-2"
      :grow="true"
    >
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
    <div class="lang-button" @click="switchLang">
      <span class="lang-text">EN</span>
      <span class="lang-text">FR</span>
      <div class="lang-slider" :class="{ 'lang-slid' : isFrench }"></div>
    </div>
  </v-app-bar>
</template>

<script>
import VueCookies from "vue-cookies";
import { ref } from "vue";

export default {
  name: "NavBar",
  setup() {
    if (!VueCookies.get("locale")) {
      VueCookies.set("locale", "en");
    }
    const locale = VueCookies.get("locale");
    const isFrench = ref(locale === 'fr');

    if (!VueCookies.get("activeTab")) {
      VueCookies.set("activeTab", "Home");
    }
    const activeTab = ref(VueCookies.get("activeTab"));

    return {
      locale,
      isFrench,
      activeTab
    };
  },
  data() {
    return {
      availableLocales: [],
      links: ["Home", "Settings"],
    };
  },
  watch: {
    activeTab(newTab) {
      VueCookies.set("activeTab", newTab);
    }
  },
  mounted() {
    this.availableLocales = this.$i18n.availableLocales;
  },
  methods: {
    switchLang() {
      if (this.locale === 'en') {
        this.locale = 'fr';
        this.isFrench = true;
      } else {
        this.locale = 'en';
        this.isFrench = false;
      }
      VueCookies.set("locale", this.locale);
      this.$i18n.locale = this.locale;
    },
    redirectToRoute(routeName) {
      this.activeTab = routeName;
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style src="@/../css/pages/NavBar.css"></style>
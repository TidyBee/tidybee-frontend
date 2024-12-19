<template>
  <v-container fluid>
    <Dashboard />
    <TidyListe />
  </v-container>
</template>

<script>

import Dashboard from "./components/dashboard/Dashboard.vue";
import TidyListe from './../tidyliste/TidyListe.vue';

export default {
  name: "HomePage",
  components: {
    TidyListe,
    Dashboard,
  },
  data() {
    return {
      tidyHubApi: process.env.HUB_URL,
    };
  },
};
</script>

<style scoped>
</style>

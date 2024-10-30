<template>
  <v-container fluid>
    <Dashboard />
  </v-container>
</template>

<script>

import Dashboard from "./components/dashboard/Dashboard.vue";

export default {
  name: "HomePage",
  components: {
    Dashboard,
  },
  data() {
    return {
      tidyHubApi: process.env.VUE_APP_HUB,
    };
  },
};
</script>

<style scoped>
</style>

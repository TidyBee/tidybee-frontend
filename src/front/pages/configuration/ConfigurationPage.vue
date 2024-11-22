<template>
  <v-container fluid class="pt-16">
    <v-row justify="center">
      <ConfigurationWidget class="widget-top-container" :tidy-hub-api="'SendTidyRules'" />
    </v-row>
  </v-container>
</template>

<script>
import ConfigurationWidget from "./components/ConfigurationWidget.vue";

export default {
  name: "ConfigurationPage",
  components: {
    ConfigurationWidget,
  },
  data() {
    return {
      tidyHubApi: process.env.VUE_APP_HUB,
    };
  },
};
</script>

<style src="./ConfigurationPage.css" scoped></style>
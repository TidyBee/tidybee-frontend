<template>
  <v-container fluid>
    <v-row justify="center mt-12">
      <ConfigurationWidget class="setting-container" :tidy-hub-api="'SendTidyRules'" />
    </v-row>
  </v-container>
</template>

<script>
import ConfigurationWidget from "./Settings/ConfigurationWidget.vue";

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

<style scoped src="./ConfigurationPage.css"></style>

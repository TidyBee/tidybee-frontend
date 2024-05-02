<template>
  <v-container fluid>
    <v-row justify="center" class="widget-top-container">
      <ConfigurationWidget :tidy-hub-api="tidyHubApi + '/Gateway/dataProcessing/Widget/getTidyRules'" />
    </v-row> 
  </v-container>
</template>

<script>
import ConfigurationWidget from "@/components/Settings/ConfigurationWidget.vue";

export default {
  name: "SettingsPage",
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

<style src="@/../css/pages/SettingsPage.css" scoped></style>

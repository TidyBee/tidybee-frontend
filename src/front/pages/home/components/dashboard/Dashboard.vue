<template>
  <v-container fluid>
    <v-row justify="center" class="widget-top-container">
      <WidgetTextSmall :tidy-hub-api="'SendTextWidgetunused'" widget-title="text.title.unused" />
    </v-row>
  </v-container>
</template>

<script>
import WidgetTextSmall from "./../widgets/text/small/WidgetTextSmall.vue";

export default {
  name: "Dashboard",
  components: {
    WidgetTextSmall,
  },
  data() {
    return {
      tidyHubApi: process.env.VUE_APP_HUB,
    };
  },
};
</script>

<style scoped>
.widget-top-container {
  display: flex;
  gap: 40px;
  justify-content: center;
  margin-top: 40px !important;
}
</style>
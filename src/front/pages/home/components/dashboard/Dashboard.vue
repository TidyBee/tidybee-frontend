<template>
  <v-container fluid>
    <v-row justify="center" class="widget-top-container">
      <WidgetTextSmall :tidy-hub-api="'SendTextWidgetunused'" widget-title="text.title.unused" />
      <WidgetTextSmall :tidy-hub-api="'SendTextWidgetbadname'" widget-title="text.title.badname" />
      <WidgetTextSmall :tidy-hub-api="'SendTextWidgetduplicate'" widget-title="text.title.duplicate" />
      <WidgetTextSmall :tidy-hub-api="'SendTotalMonitored'" widget-title="text.title.total" />
      <WidgetGraphSmall :tidy-hub-api="'SendTextWidgetstorage'" widget-title="text.title.storage" />
    </v-row>
    <v-row justify="center" class="widget-bottom-container">
      <WidgetGraphMedium class="full-height" :tidy-hub-api="'SendGraphWidget'" />
    </v-row>
  </v-container>
</template>

<script>
import WidgetTextSmall from "./../widgets/text/small/WidgetTextSmall.vue";
import WidgetGraphSmall from "./../widgets/graph/small/WidgetGraphSmall.vue";
import WidgetGraphMedium from "./../widgets/graph/medium/WidgetGraphMedium.vue";

export default {
  name: "Dashboard",
  components: {
    WidgetTextSmall,
    WidgetGraphSmall,
    WidgetGraphMedium,
  },
  data() {
    return {
      tidyHubApi: process.env.VUE_APP_HUB,
    };
  },
};
</script>

<style scoped src="./Dashboard.css"> </style>
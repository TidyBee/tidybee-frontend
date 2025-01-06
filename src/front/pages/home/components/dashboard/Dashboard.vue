<template>
  <v-container fluid>
    <v-row justify="center" class="widget-top-container">
      <WidgetTextSmall :tidy-hub-api="this.unused" widget-title="text.title.unused" />
      <WidgetTextSmall :tidy-hub-api="this.badname" widget-title="text.title.badname" />
      <WidgetTextSmall :tidy-hub-api="this.duplicate" widget-title="text.title.duplicate" />
      <WidgetTextSmall :tidy-hub-api="this.totalMonitored" widget-title="text.title.total" />
    </v-row>
    <v-row justify="center"  class="widget-top-container">
        <WidgetGraphMedium :tidy-hub-api="this.graph" />
        <WidgetGrade :tidy-hub-api="this.grade" />
    </v-row>
  </v-container>
</template>

<script>
import WidgetTextSmall from "./../widgets/text/small/WidgetTextSmall.vue";
import WidgetGraphSmall from "./../widgets/graph/small/WidgetGraphSmall.vue";
import WidgetGraphMedium from "./../widgets/graph/medium/WidgetGraphMedium.vue";
import WidgetGrade from "./../widgets/grade//WidgetGrade.vue";

export default {
  name: "Dashboard",
  components: {
    WidgetTextSmall,
    WidgetGraphSmall,
    WidgetGraphMedium,
    WidgetGrade
  },
  data() {
    return {
      tidyHubApi: process.env.VUE_APP_HUB,
      unused: process.env.VUE_APP_WEBSOCKET_UNUSED,
      badname: process.env.VUE_APP_WEBSOCKET_BADNAME,
      duplicate: process.env.VUE_APP_WEBSOCKET_DUPLICATE,
      totalMonitored: process.env.VUE_APP_WEBSOCKET_TOTAL_MONITORED,
      grade: process.env.VUE_APP_WEBSOCKET_GRADE,
      graph: process.env.VUE_APP_WEBSOCKET_GRAPH,
    };
  },
};
</script>

<style scoped src="./Dashboard.css"> </style>
<template>
  <v-container fluid>
    <v-row justify="center" class="widget-top-container">
      <WidgetTextSmall :tidy-hub-api="'SendTextWidgetunused'" widget-title="text.title.unused" />
      <WidgetTextSmall :tidy-hub-api="'SendTextWidgetbadname'" widget-title="text.title.badname" />
      <WidgetTextSmall :tidy-hub-api="'SendTextWidgetduplicate'" widget-title="text.title.duplicate" />
      <WidgetTextSmall :tidy-hub-api="'SendTotalMonitored'" widget-title="text.title.total" />
    </v-row>
    <v-row justify="center"  class="widget-top-container">
        <WidgetGraphMedium :tidy-hub-api="'SendGraphWidget'" />
        <WidgetGrade :tidy-hub-api="'SendGradeWidget'" />
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
    };
  },
};
</script>

<style scoped src="./Dashboard.css"> </style>
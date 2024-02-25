<template>
  <v-container fluid>
    <v-row justify="center" class="widget-container">
      <TextWidget :tidy-hub-api="tidyHubApi + '/Gateway/getTextWidgetunused'" />
      <TextWidget :tidy-hub-api="tidyHubApi + '/Gateway/getTextWidgetbadname'" />
      <TextWidget :tidy-hub-api="tidyHubApi + '/Gateway/getTextWidgetduplicate'" />
      <TextWidget :tidy-hub-api="tidyHubApi + '/Gateway/getTextWidgetheavy'" />
      <TextWidget :tidy-hub-api="tidyHubApi + '/Gateway/getTextWidgetstorage'" />
    </v-row>

    <v-row justify="center" class="widget-container">
      <GraphWidget />
      <OverViewWidget :tidy-hub-api="tidyHubApi" />
    </v-row>

    <v-row justify="center">
      <v-btn class="refresh-btn" @click="actualiser">Actualiser</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import TextWidget from "@/components/dashboard/widgets/Text/TextWidget.vue";
import GraphWidget from "@/components/dashboard/widgets/Graph/GraphWidget.vue";
import OverViewWidget from "@/components/dashboard/widgets/OverView/OverViewWidget.vue";

export default {
  name: "DashBoard",
  components: {
    TextWidget,
    OverViewWidget,
    GraphWidget,
  },
  data() {
    return {
      tidyHubApi: process.env.VUE_APP_HUB,
    };
  },
};
</script>

<style src="@/components/dashboard/css/DashBoard.css" scoped></style>

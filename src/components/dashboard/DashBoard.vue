<template>
  <v-container fluid>
    <v-row justify="center" class="widget-top-container">
      <TextWidget :tidy-hub-api="tidyHubApi + '/Gateway/dataProcessing/Widget/getTextWidgetunused'" widget-title="text.title.unused" />
      <TextWidget :tidy-hub-api="tidyHubApi + '/Gateway/dataProcessing/Widget/getTextWidgetbadname'" widget-title="text.title.badname" />
      <TextWidget :tidy-hub-api="tidyHubApi + '/Gateway/dataProcessing/Widget/getTextWidgetduplicate'" widget-title="text.title.duplicate" />
      <TextWidget :tidy-hub-api="tidyHubApi + '/Gateway/dataProcessing/Widget/getTextWidgetheavy'" widget-title="text.title.heavy" />
      <TextWidget :tidy-hub-api="tidyHubApi + '/Gateway/dataProcessing/Widget/getTextWidgetstorage'" widget-title="text.title.storage" />
    </v-row>

    <v-row justify="center" class="widget-bottom-container">
      <v-col class="no-flex-grow">
        <GraphWidget :tidy-hub-api="tidyHubApi + '/Gateway/dataProcessing/Widget/getGraphWidget'" />
        <GradeWidget :tidy-hub-api="tidyHubApi + '/Gateway/dataProcessing/Widget/getGradeWidget'" />
      </v-col>
      <v-col class="no-flex-grow">
        <OverViewWidget :tidy-hub-api="tidyHubApi + '/Gateway/dataProcessing/Widget/getOverview'" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn class="refresh-btn" @click="refresh">
        {{ $t("dashboard.refresh") }}
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import TextWidget from "@/components/dashboard/widgets/Text/TextWidget.vue";
import GraphWidget from "@/components/dashboard/widgets/Graph/GraphWidget.vue";
import GradeWidget from "@/components/dashboard/widgets/Grade/GradeWidget.vue";
import OverViewWidget from "@/components/dashboard/widgets/OverView/OverViewWidget.vue";

export default {
  name: "DashBoard",
  components: {
    TextWidget,
    OverViewWidget,
    GraphWidget,
    GradeWidget,
  },
  data() {
    return {
      tidyHubApi: process.env.VUE_APP_HUB,
    };
  },
  methods: {
    refresh() {
      location.reload();
    },
  },
};
</script>

<style src="@/../css/components/dashboard/DashBoard.css" scoped></style>

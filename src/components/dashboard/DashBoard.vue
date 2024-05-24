<template>
  <v-container fluid>
    <v-row justify="center" class="widget-top-container">
      <TextWidget :tidy-hub-api="'SendTextWidgetunused'" widget-title="text.title.unused" />
      <TextWidget :tidy-hub-api="'SendTextWidgetbadname'" widget-title="text.title.badname" />
      <TextWidget :tidy-hub-api="'SendTextWidgetduplicate'" widget-title="text.title.duplicate" />
      <TextWidget :tidy-hub-api="'SendTotalMonitored'" widget-title="text.title.total" />
      <TextWidget :tidy-hub-api="'SendOverviewMisnamed'" widget-title="text.title.storage" />
    </v-row>

    <v-row justify="center" class="widget-bottom-container">
      <v-col class="no-flex-grow">
        <GraphWidget :tidy-hub-api="'SendGraphWidget'" />
        <GradeWidget :tidy-hub-api="'SendGradeWidget'" />
      </v-col>
      <v-col class="no-flex-grow">
        <OverViewWidget :tidy-hub-api="'SendOverview'" />
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
// import GraphWidget from "@/components/dashboard/widgets/Graph/GraphWidget.vue";
// import GradeWidget from "@/components/dashboard/widgets/Grade/GradeWidget.vue";
// import OverViewWidget from "@/components/dashboard/widgets/OverView/OverViewWidget.vue";

export default {
  name: "DashBoard",
  components: {
    TextWidget,
    // OverViewWidget,
    // GraphWidget,
    // GradeWidget,
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

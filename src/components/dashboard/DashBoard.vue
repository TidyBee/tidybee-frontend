<template>
  <v-container fluid>
    <v-row justify="center" class="widget-top-container">
      <TextWidget
        :tidy-hub-api="
          tidyHubApi + '/Gateway/dataProcessing/Widget/getTextWidgetunused'
        "
      />
      <TextWidget
        :tidy-hub-api="
          tidyHubApi + '/Gateway/dataProcessing/Widget/getTextWidgetbadname'
        "
      />
      <TextWidget
        :tidy-hub-api="
          tidyHubApi + '/Gateway/dataProcessing/Widget/getTextWidgetduplicate'
        "
      />
      <TextWidget
        :tidy-hub-api="
          tidyHubApi + '/Gateway/dataProcessing/Widget/getTextWidgetheavy'
        "
      />
      <TextWidget
        :tidy-hub-api="
          tidyHubApi + '/Gateway/dataProcessing/Widget/getTextWidgetstorage'
        "
      />
    </v-row>

    <v-row justify="center" class="widget-bottom-container">
      <v-col>
        <GraphWidget
          :tidy-hub-api="
            tidyHubApi + '/Gateway/dataProcessing/Widget/getGraphWidget'
          "
        />
        <GradeWidget
          :tidy-hub-api="
            tidyHubApi + '/Gateway/dataProcessing/Widget/getGradeWidget'
          "
        />
      </v-col>
      <v-col>
        <OverViewWidget
          :tidy-hub-api="tidyHubApi + '/proxy/get_files?amount=5&sort_by=size'"
        />
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

<template>
  <div class="widget-container">
    <TextWidget
      :tidy-hub-api="tidyHubApi + '/Gateway/getTextWidgetunused'"
    />
    <TextWidget
      :tidy-hub-api="tidyHubApi + '/Gateway/getTextWidgetbadname'"
    />
    <TextWidget
      :tidy-hub-api="tidyHubApi + '/Gateway/getTextWidgetduplicate'"
    />
    <TextWidget
      :tidy-hub-api="tidyHubApi + '/Gateway/getTextWidgetheavy'"
    />
    <TextWidget
      :tidy-hub-api="tidyHubApi + '/Gateway/getTextWidgetstorage'"
    />
  </div>
  <div class="widget-container">
    <GraphWidget />
    <OverViewWidget />
  </div>
  <v-btn class="refresh-btn" @click="actualiser">Actualiser</v-btn>
</template>

<script>
import TextWidget from "@/components/dashboard/widgets/TextWidget.vue";
import GraphWidget from "@/components/dashboard/widgets/GraphWidget.vue";
import OverViewWidget from "@/components/dashboard/widgets/OverViewWidget.vue";

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

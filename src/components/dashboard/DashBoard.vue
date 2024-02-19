<template>
  <div class="widget-container">
    <TextWidget
      :title="'badname'"
      :types="'Number'"
      :data="{ percentage: '-12', value: '259', status: false }"
    />
    <TextWidget
      :title="'unused'"
      :types="'Number'"
      :data="{ percentage: '+8', value: '377', status: true }"
    />
    <TextWidget
      :title="'duplicate'"
      :types="'Number'"
      :data="{ percentage: '+19', value: '124', status: true }"
    />
    <TextWidget
      :title="'heavy'"
      :types="'Number'"
      :data="{ percentage: '-5', value: '86', status: false }"
    />
    <TextWidget
      :title="'storage'"
      :types="'Graph'"
      :data="{
        percentage: '+4',
        value: '145/512GB',
        valuePercentage: '28.32',
        status: true,
      }"
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
      data: {
        percentage: "-12%",
        value: "236",
      },
    };
  },
};
</script>

<style src="@/components/dashboard/css/DashBoard.css" scoped></style>

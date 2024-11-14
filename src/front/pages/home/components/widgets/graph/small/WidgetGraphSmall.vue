<template>
  <v-card class="rounded-rectangle" elevation="10">
    <ApiLoader 
      :api-url="tidyHubApi" 
      :widget-name="widgetTitle" >
      <template #default="{ data }">
            <v-row>
              <v-span
                v-if="data && data.title"
                class="widget-title"
              >
                {{ $t(`dashboard.widgets.text.title.${data.title}`) }}
              </v-span>
            </v-row>
          
      </template>
    </ApiLoader>
    <GraphChart :pie-data="formatSeries(data)" /> 
  </v-card>
</template>

<script>

import ApiLoader from "@/front/utils/websockets/ApiLoader.vue";
import GraphChart from "./GraphChart.vue";

export default {
  name: "WidgetGraphSmall",
  components: {
    ApiLoader,
    GraphChart,
  },
  props: {
    widgetTitle: {
      type: String,
      required: true,
    },
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
  methods: {
    formatSeries(data) {
      try {
        return [];
      } catch (error) {
        console.error('Erreur lors du traitement des séries JSON :', error);
        return [];
      }
    },
  }
};
</script>

<style scoped src="./WidgetGraphSmall.css"> </style>
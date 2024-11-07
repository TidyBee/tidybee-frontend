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
import ApiLoader from "./../../../../../../utils/websockets/ApiLoader.vue";
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

<style scoped>
.v-progress-circular {
  margin: 1rem;
}

.rounded-rectangle {
  border-radius: 15px;
  background-color: white;
  height: 160px;
  width: 230px;
  display: flex; 
  flex-direction: column;
  justify-content: center;
}

.widget-title {
  position: absolute;
  top: 10px;
  left: 12px;
  font-size: 14px;
  color: #515151;
}

.widget-graph-center {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 120%;
  font-size: 43px;
  color: red;
}


.widget-graph-center {
  font-size: 15px;
  color: red;
}

.grey-text {
  color: #515151;
}
</style>
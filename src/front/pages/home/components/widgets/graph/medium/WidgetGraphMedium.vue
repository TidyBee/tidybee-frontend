<template>
  <v-card class="rounded-rectangle" elevation="10">
    <ApiLoader :api-url="tidyHubApi" widget-name="graph.title" class="full-height w-100">
      <template #default="{ data }">
        <div v-if="data" class="full-height">
          <v-row>
            <v-span class="widget-title" :data-cy="`graphwidget-title`">
              {{ $t(`dashboard.widgets.graph.title`) }}
            </v-span>
          </v-row>
          <GraphChart :pie-data="formatSeries(data)" />
        </div>
      </template>
    </ApiLoader>
  </v-card>
</template>

<script>

import GraphChart from "./GraphChart.vue"
import ApiLoader from "@/front/utils/websockets/ApiLoader.vue";

export default {
  name: "WidgetGraphMedium",
  components: {
    GraphChart,
    ApiLoader
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        width: "10%",
        colors: ["#2E93fA", "#66DA26", "#FF9800", "#E91E63", "#546E7A"],
        labels: ["TidyScore A", "TidyScore B", "TidyScore C", "TidyScore D", "TidyScore E"],
        name: "Test",
        chart: {
          type: "donut",
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          style: {
            fontSize: "14px",
          },
        },
        plotOptions: {
          pie: {
            expandOnClick: true,
            offsetX: 55,
            offsetY: -85,
            customScale: 0.55,
            donut: {
              size: "60%",
              background: "transparent",
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  label: this.$t("dashboard.widgets.graph.total"),
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#515151",
                  formatter: function (w) {
                    return (
                      w.globals.seriesTotals.reduce((a, b) => {
                        return a + b;
                      }, 0) + "%"
                    );
                  },
                },
              },
            },
          },
        },
        legend: {
          show: true,
          showForZeroSeries: true,
          position: "left",
          fontSize: "12px",
          offsetX: -20,
          offsetY: 75,
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },
      },
    };
  },
  methods: {
    formatSeries(data) {
      try {
        return [
          { value: Math.round(data.series[0]), name: 'TidyScore A' },
          { value: Math.round(data.series[1]), name: 'TidyScore B' },
          { value: Math.round(data.series[2]), name: 'TidyScore C' },
          { value: Math.round(data.series[3]), name: 'TidyScore D' },
          { value: Math.round(data.series[4]), name: 'TidyScore E' }
        ];
      } catch (error) {
        console.error('Erreur lors du traitement des séries JSON :', error);
        return [];
      }
    },
  }
};
</script>


<style scoped src="./WidgetGraphMedium.css"> </style>
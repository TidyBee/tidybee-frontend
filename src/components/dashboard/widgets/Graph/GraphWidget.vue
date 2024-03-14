<template>
  <ApiLoader :api-url="tidyHubApi">
    <template #default="{ data }">
      <v-card v-if="data" class="rounded-rectangle" elevation="10">
        <v-row>
          <v-span 
            class="widget-title"
            :data-cy="`graphwidget-title`"
          >
            {{ $t(`dashboard.widgets.graph.title`) }}
          </v-span>
        </v-row>
        <apexchart 
          width="500"
          height="500"
          class="centered-container-graph"
          :options="chartOptions"
          :series="data.series"
          :data-cy="`graphwidget-graph`"
        >
        </apexchart>
      </v-card>
    </template>
  </ApiLoader>
</template>

<script>

import VueApexCharts from 'vue3-apexcharts';
import ApiLoader from "@/components/communication/ApiLoader.vue";


export default {
  name: "GraphWidget",
  components: {
    apexchart: VueApexCharts,
    ApiLoader,
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
        width: '10%',
        colors: ['#2E93fA', '#66DA26', '#FF9800', '#E91E63', '#546E7A'],
        labels: ['TidyScore A', 'TidyScore B', 'TidyScore C', 'TidyScore D', 'TidyScore E'],
        name: "Test",
        chart: {
          type: 'donut'
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%"
          },
          style: {
            fontSize: '14px'
          }
        },
        plotOptions: {
          pie: { 
            expandOnClick: true, 
            offsetX: 50,
            offsetY: -100,
            customScale: 0.55,
            donut: {
              size: '60%',
              background: 'transparent',
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  label: this.$t('dashboard.widgets.graph.total'),
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#515151',
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b
                    }, 0) + "%";
                  }
                }
              }
            },
          }
        },
        legend: {
          show: true,
          showForZeroSeries: true,
          position: 'left',
          fontSize: '12px',
          offsetX: -20,
          offsetY: 30,
          onItemClick: {
              toggleDataSeries: true
          },
          onItemHover: {
              highlightDataSeries: true
          },
        }
      },
    }
  },
};
</script>

<style src="@/../css/components/dashboard/GraphWidget.css" scoped></style>

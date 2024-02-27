<template>
  <ApiLoader :api-url="tidyHubApi">
    <template #default="{ data }">
      <v-card class="rounded-rectangle" elevation="10">
        <v-row>
          <v-span class="widget-title">
            {{ $t(`dashboard.widgets.graph.title`) }}
          </v-span>
        </v-row>
        <apexchart 
          width="500"
          height="500"
          class="centered-container-graph"
          :options="chartOptions"
          :series="data.series"
        >
        </apexchart>
      </v-card>
    </template>
  </ApiLoader>
</template>

<script>

import VueApexCharts from 'vue3-apexcharts';
import ApiLoader from "@/components/ApiLoader.vue";


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

<style scoped>
.rounded-rectangle {
  border-radius: 15px;
  background-color: white;
  height: 210px;
  width: 500px;
  margin-left: 80px;
}

.centered-container-graph {
  margin: 10px !important;
}

.widget-title {
  position: absolute;
  top: 5px;
  left: 8px;
  font-size: 14px;
  color: #515151;
}

.centered-text {
  text-align: center;
  margin-top: 30px;
}

</style>

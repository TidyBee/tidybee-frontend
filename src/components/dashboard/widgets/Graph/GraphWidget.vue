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
        <GraphChart :pie-data="formatSeries(data.series)" />
      </div>
      </template>
    </ApiLoader>
  </v-card>
</template>

<script>
import GraphChart from "@/components/dashboard/widgets/Graph/GraphChart.vue"
import ApiLoader from "@/components/communication/ApiLoader.vue";

export default {
  name: "GraphWidget",
  components: {
    GraphChart,
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
    formatSeries(series) {
      return ([
        {value: series[0], name: 'TidyScore A'},
        {value: series[1], name: 'TidyScore B'},
        {value: series[2], name: 'TidyScore C'},
        {value: series[3], name: 'TidyScore D'},
        {value: series[4], name: 'TidyScore E'}
      ]);
    },
  }
};
</script>

<style src="@/../css/components/dashboard/GraphWidget.css" scoped></style>

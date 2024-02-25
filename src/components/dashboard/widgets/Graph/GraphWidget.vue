<template>
  <v-card class="rounded-rectangle" elevation="10">
    <div class="widget-title">
      {{ "Résultat de l'analyse de votre espace de stockage" }}
    </div>
    <div class="centered-container-graph">
      <apexchart
        width="400"
        height="220"
        type="bar"
        :options="chartOptions"
        :series="series"
      >
      </apexchart>
    </div>
    <v-divider></v-divider>
    <v-row justify="center" class="mt-10">
      <span class="centered-text" style="font-size: 50px;">
        {{ "C" }}
      </span>
    </v-row>
    <v-row justify="center" class="mt-2">
      <span class="centered-text" style="font-size: 20px;">
        {{ "est la grade de votre espace partagé" }}
      </span>
    </v-row>
  </v-card>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: "GraphWidget",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
     chartOptions: {
        chart: {
          id: "basic-bar",
          animations: {
            speed: 200
          },
          toolbar: {
            show: false,
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: true,
        },
        plotOptions: {
          bar: {
            distributed: true,
            columnWidth: '50%',
          }
        },
        xaxis: {
          title: {
            text: "Grade du TidyScore",
             style: {
              color: "#515151",
              fontSize: "12px"
             }
          },
          categories: ["A", "B", "C", "D", "E"]
        },
        yaxis: {
          title: {
            text: "% / 100%",
             style: {
              color: "#515151",
              fontSize: "12px"
             }
          },
        }
      },
      series: [
        {
          name: "% du grade / 100%",
          data: ["22%", "18%", "21%", "31%", "8%"]
        },
      ]
    }
  },
};
</script>

<style scoped>
.rounded-rectangle {
  border-radius: 15px;
  background-color: white;
  height: 460px;
  width: 500px;
  margin-left: 40px;
  margin-top: 40px;
}
  
.centered-container-graph {
  margin-top: 20px;
  margin-left: 45px;
}
  
.widget-title {
  position: absolute;
  top: 5px;
  left: 8px;
  font-size: 12px;
  color: #515151;
}
  
.centered-container {
  text-align: center;
}

.centered-text {
  text-align: center;
}

.mt-10 {
  margin-top: 10px;
}

.mt-2 {
  margin-top: 2px;
}
</style>

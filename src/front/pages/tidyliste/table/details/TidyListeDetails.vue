<template>
  <div class="file-info-container">
    <div class="file-info">
      <div class="back-arrow" @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </div>
      <h1 class="file-title">Détails du fichier : {{ option.name }}</h1>
      <div class="content-wrapper">
        <div class="text-content">
          <p><strong>Emplacement :</strong> {{ option.fileDetails.path }}</p>
          <p><strong>Poids :</strong> {{ formatFileSize(option.size) }}</p>
          <p><strong>Dernière utilisation :</strong> {{ option.lastUsed }}</p>
          <p><strong>Espace de stockage :</strong> {{ option.location }}</p>
        </div>
        <div class="v-chart-container">
          <v-chart :option="option" autoresize style="height: 40vh;"></v-chart>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, reactive, onMounted } from "vue";
import { use } from "echarts/core";
import { PieChart } from "echarts/charts";
import { TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VChart from "vue-echarts";

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

export default {
  name: "TidyListeDetails",
  components: {
    VChart,
  },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const currentItem = ref(props.item);
    if (!currentItem.value.file_path) {
      const storedItem = localStorage.getItem("currentItem");
      if (storedItem) {
        currentItem.value = JSON.parse(storedItem);
      }
    }
    console.log(currentItem);
    const option = reactive({
      ...currentItem.value,
      color: currentItem.value.gradeColor,
      series: [
        {
          type: "pie",
          radius: ["20%", "36%"],
          center: ["80%", "50%"],
          labelLine: {
            show: false,
          },
          data: currentItem.value.pieData?.length
            ? currentItem.value.pieData
            : [
                { value: 33.33, name: "Mal nommée" },
                { value: 33.33, name: "Inutilisé" },
                { value: 33.33, name: "Dupliqué" },
              ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          label: {
            show: true,
            position: "center",
            formatter: currentItem.value.tidyscore,
            fontSize: 15,
            bold: true
          },
        },
      ],
    });

    onMounted(() => {
      if (!currentItem.value.file_path) {
        const storedItem = localStorage.getItem("currentItem");
        if (storedItem) {
          currentItem.value = JSON.parse(storedItem);
        }
      }
    });

    return {
      option,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    formatFileSize(fileSize) {
      const sizeThresholds = [
        [1024, "B"],
        [Math.pow(1024, 2), "KB"],
        [Math.pow(1024, 3), "MB"],
        [Math.pow(1024, 4), "GB"],
      ];
      if (typeof fileSize != "number") return "NaN";
      let fixed = 0;
      for (const [threshold, unit] of sizeThresholds) {
        if (fileSize < threshold) {
          return (fileSize / (threshold / 1024)).toFixed(fixed) + " " + unit;
        }
        fixed = 2;
      }
      return (
        (fileSize / (sizeThresholds[sizeThresholds.length - 1][0] / 1024)).toFixed(
          2,
        ) +
        " " +
        sizeThresholds[sizeThresholds.length - 1][1]
      );
    }
  }
};
</script>

<style scoped src="./TidyListeDetails.css"></style>

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
          <p><strong>Poids :</strong> {{ option.size }}</p>
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
import { getGradeColor } from "../utils.js"


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
    const option = reactive({
      ...currentItem.value,
      color: [getGradeColor(currentItem.value.fileDetails.tidyscore.misnamed.grade), getGradeColor(currentItem.value.fileDetails.tidyscore.unused.grade), getGradeColor(currentItem.value.fileDetails.tidyscore.duplicated.grade) ],
      tooltip: {
        formatter: function (value) {
          return value.name;
        },
        trigger: 'item'
      },
      series: [
        {
          name: "TidyScore",
          type: "pie",
          padAngle: 5,
          radius: ["20%", "36%"],
          center: ["80%", "50%"],

          data: [
            { value: 1, name: 'Mal nommé : ' + currentItem.value.fileDetails.tidyscore.misnamed.grade },
            { value: 1, name: 'Inutilisé : ' + currentItem.value.fileDetails.tidyscore.unused.grade },
            { value: 1, name: 'Dupliqué : ' + currentItem.value.fileDetails.tidyscore.duplicated.grade },
          ],
          label: {
            show: true,
            position: "center",
            formatter: currentItem.value.tidyscore,
            fontSize: 30,
            bold: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
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
    getGradeColor,
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped src="./TidyListeDetails.css"></style>

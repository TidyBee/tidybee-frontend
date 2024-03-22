<template>
  <v-chart class="grade-graph" :option="option"></v-chart>
</template>

<script setup>
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { ref, defineProps } from 'vue';

use([TitleComponent, TooltipComponent, PieChart, CanvasRenderer]);

// const props = defineProps(['pieData', 'pieColor', 'score']);
const props = defineProps({
  pieData: {type: Object, required: true, default: () => ({})},
  pieColor: {type: String, required: true, default: '#fff'},
  score: {type: String, required: true, defualt: 'A'},
})

const option = ref({
  color: [props.pieColor],
  title: {
    text: props.score,
    left: 'center',
    top: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}',
    position: 'left',
  },
  series: [
    {
      name: 'TidyScore',
      type: 'pie',
      padAngle: 5,
      radius: ['45%', '80%'],
      data: props.pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
});
</script>

<style src="@/../css/components/dashboard/TidyScore.css" scoped></style>
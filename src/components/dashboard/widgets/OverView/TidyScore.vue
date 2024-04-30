<template>
  <v-chart data-cy="overviewwidget-fileitem-toggle-tidyscore-graph" class="grade-graph" :option="option"></v-chart>
</template>

<script setup>
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { ref, defineProps } from 'vue';

use([TitleComponent, TooltipComponent, PieChart, CanvasRenderer]);

const props = defineProps({
  pieData: { type: Array, required: true, default: () => ([]) },
  pieColor: { type: String, required: true, default: '#fff'  },
  seriesData: { type: Array, required: true, default: () => ([]) },
  score: { type: String, required: true, default: 'A' },
  t: { type: Function, required: true, },
  tab: { type: String, required: true}
})

const option = ref({
  color: [props.pieColor],
  title: {
    text: props.score,
    right: '13%',
    top: 'center',
    textStyle: {
      fontSize: 30,
      color: '#757575',
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: function(value) {
      return props.t(value.name) + " : " + props.pieData[value.dataIndex];
    },
    position: 'left',
  },
  series: [
    {
      name: 'TidyScore',
      type: 'pie',
      padAngle: 5,
      radius: ['45%', '80%'],
      data: props.seriesData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      center: ['85%', '50%']
    },
  ],
});
</script>

<style src="@/../css/components/dashboard/TidyScore.css" scoped></style>

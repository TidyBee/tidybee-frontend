<template>
  <v-chart data-cy="graphwidget-graph" class="centered-container-graph" :option="option"></v-chart>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { getGradeColor } from '@/utils';
import VChart from 'vue-echarts';


use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

const props = defineProps({
    pieData: { type: Object, required: true, default: () => ({}) },
})

const option = ref({
  color: [getGradeColor('A'), getGradeColor('B'), getGradeColor('C'), getGradeColor('D'), getGradeColor('E')],
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}%',
    position: 'top'
  },
  legend: {
    bottom: '5%',
    orient: 'vertical',
    formatter: '{name} %',
    selectedMode: false,
    left: 'left',
  },
  width: '420px',
  series: [
    {
      type: 'pie',
      radius: ['40%', '80%'],
      minShowLabelAngle: 20,
      label: {
        formatter: '{c}%',
        position: 'inside'
      },
      data: props.pieData,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      center: ['72.5%', '57%']
    }
  ]
});
</script>

<style src="@/../css/components/dashboard/TidyScore.css" scoped></style>
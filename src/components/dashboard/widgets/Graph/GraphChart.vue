<template>
    <v-chart data-cy="graphwidget-graph" class="centered-container-graph" :option="option"></v-chart>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';


use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);



const props = defineProps({
    pieData: { type: Object, required: true, default: () => ({}) },
})

const option = ref({
  color: ['#2E93fA', '#66DA26', '#FF9800', '#E91E63', '#546E7A'],
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}%',
    position: 'left'
  },
  legend: {
    top: '20%',
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '80%'],
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
      center: ['80%', '55%']
    }
  ]
});
</script>

<style src="@/../css/components/dashboard/TidyScore.css" scoped></style>
<template>
  <v-chart :option="option" autoresize style="height: 100vh;"></v-chart>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';
import { getGradeColor } from './utils';

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

const props = defineProps({
  pieData: { type: Object, required: true, default: () => ({}) },
});

const option = ref({
  color: [
    getGradeColor('A'),
    getGradeColor('B'),
    getGradeColor('C'),
    getGradeColor('D'),
    getGradeColor('E')
  ],
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}%',
    position: 'left'
  },
  legend: {
    top: '45%',
    orient: 'vertical',
    left: 'left',
    selectedMode: false
  },
  series: [
    {
      type: 'pie',
      radius: ['20%', '36%'],
      center: ['74.5%', '51.5%'],
      label: {
        formatter: '{c}%',
        position: 'inside'
      },
      labelLine: {
        show: false
      },
      data: props.pieData.length ? props.pieData : [
        { value: 1, name: 'TidyScore A' },
        { value: 2, name: 'TidyScore B' },
        { value: 2, name: 'TidyScore C' },
        { value: 94, name: 'TidyScore D' },
        { value: 1, name: 'TidyScore E' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
});
</script>

<style scoped>
.centered-container-graph {
  margin: 10px !important;
}
</style>

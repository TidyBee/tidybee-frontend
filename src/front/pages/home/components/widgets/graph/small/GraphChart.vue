<template>
  <v-chart :option="option" autoresize style="height: 100vh;"></v-chart>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { use } from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import VChart from 'vue-echarts';

use([LegendComponent, PieChart, CanvasRenderer]);

const props = defineProps({
    pieData: { type: Object, required: true, default: () => ({}) },
})

const option = ref({
  legend: {
    bottom: '5%',
    left: 'center',
    selectable: false
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '70%'],
      startAngle: 180,
      endAngle: 360,
      labelLine: {
        show: false
      },
      label: {
        show: false
      },
      selectable: false,
      data: [
        { value: 1048, name: 'Utilisé', itemStyle: { color: '#515151' } },  
        { value: 735, name: 'Disponible', itemStyle: { color: '#2E7D32' } },
      ]
    }
  ]
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>

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

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

const props = defineProps({
  item: { type: Object, required: true, default: () => ({}) },
});

const option = ref({
  color: props.item.gradeColor,
  legend: {
    top: '0%',
    orient: 'vertical',
    left: 'left',
    selectedMode: false,
  },
  series: [
    {
      type: 'pie',
      radius: ['20%', '36%'],
      center: ['5%', '5%'],
      label: {
        formatter: '{c}%',
        position: 'inside',
      },
      labelLine: {
        show: false,
      },
      data: props.item.pieData?.length
        ? props.item.pieData
        : [
            { value: 33.33, name: 'Mal nommée' },
            { value: 33.33, name: 'Inutilisé' },
            { value: 33.33, name: 'Dupliqué' },
          ],
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

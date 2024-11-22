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
import { TitleComponent } from 'echarts/components';

use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer, TitleComponent]);

const props = defineProps({
  pieData: { type: Object, required: true, default: () => ({}) },
  color: { type: String, required: true, default: [] }, 
  tidyscore: { type: String, required: true, default: 'A' },
});

const option = ref({
  tooltip: {
    trigger: 'item'
  },
  title: {
    top: '48%',
    text: props.tidyscore,
    left: 'center',
    textStyle: {
      fontSize: 30,
      color: '#757575',
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['16%', '24%'],
      padAngle: 5,
      itemStyle: {
        borderRadius: 10,
        color: props.color
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      data: props.pieData
    }
  ]
});
</script>

<template>
  <div>
    <NavBar />
    <ul class="option-list">
      <li
        v-for="option in myConfig"
        :key="option.name"
      >
        <component
          :is="getOptionType(option)"
          :option="option"
          @config-input="(n) => option.value = n"
        />
      </li>
    </ul>
    <button @click="saveConfig()">
      Save
    </button>
  </div>
</template>
  
<script>
import NavBar from '@/components/NavBar.vue'
import SliderOption from '@/components/options/SliderOption.vue'
import InputOption from '@/components/options/InputOption.vue'
import MultipleOption from '@/components/options/MultipleOption.vue'
import DropdownOption from '@/components/options/DropdownOption.vue'
import json from "@/assets/configurationExample.json"

export default {
    name: 'ConfigurationPage',
    components: {
        NavBar,
        SliderOption,
        InputOption,
        MultipleOption,
        DropdownOption
    },
    data() {
        return {
            filesInfos: [],
            tidyHubApi: process.env.VUE_APP_HUB,
            myConfig: json,
        };
    },
    async mounted() {
    },
    methods: {
      getOptionType(option) {
      switch (option.type) {
        case 'Slider':
          return 'SliderOption';
        case 'MultipleChoice':
          return 'MultipleOption';
        case 'Input':
          return 'InputOption';
        case 'Dropdown':
          return 'DropdownOption';
        default:
          return 'Input';
      }
    },
      saveConfig() {
          let data = JSON.stringify(this.myConfig);
          console.log(data);
      }
    },
}
</script>
  
<style src="./css/ConfigurationPage.css" scoped></style>
  
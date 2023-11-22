<template>
  <div>
    <NavBar_Components />
    <ul>
      <li
        v-for="option in getConfigTypes('Slider')"
        :key="option.name"
      >
        <SliderOption
          :option="option"
          @config-input="(n) => option.value = n"
        />
      </li>
      <li
        v-for="option in getConfigTypes('MultipleChoice')"
        :key="option.name"
      >
        <MultipleOption
          :option="option"
          @config-input="(n) => option.value = n"
        />
      </li>
      <li
        v-for="option in getConfigTypes('Input')"
        :key="option.name"
      >
        <InputOption
          :option="option"
          @config-input="(n) => option.value = n"
        />
      </li>
      <li
        v-for="option in getConfigTypes('Dropdown')"
        :key="option.name"
      >
        <DropdownOption
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
import NavBar_Components from '@/components/NavBar.vue'
import SliderOption from '@/components/SliderOption.vue';
import InputOption from '@/components/InputOption.vue'
import MultipleOption from '@/components/MultipleOption.vue'
import DropdownOption from '@/components/DropdownOption.vue'
import json from "@/assets/configurationExample.json"

export default {
    name: 'ConfigurationPage',
    components: {
        NavBar_Components,
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
        getConfigTypes(configType) {
            return this.myConfig.filter(option => option.type == configType);
        },
        saveConfig() {
            let data = JSON.stringify(this.myConfig);
            console.log(data);
        }
    },
}
</script>
  
<style src="./css/ConfigurationPage.css" scoped></style>
  
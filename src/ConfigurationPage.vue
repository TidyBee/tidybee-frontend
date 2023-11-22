<template>
  <div>
    <NavBar_Components />
    <ul>
      <li
        v-for="option in myConfig"
        :key="option.name"
      >
        <SliderOption
          v-if="option.type == 'Slider'"
          :option="option"
          @config-input="(n) => option.value = n"
        />
        <MultipleOption
          v-if="option.type == 'MultipleChoice'"
          :option="option"
          @config-input="(n) => option.value = n"
        />
        <InputOption
          v-if="option.type == 'Input'"
          :option="option"
          @config-input="(n) => option.value = n"
        />
        <DropdownOption
          v-if="option.type == 'Dropdown'"
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
        saveConfig() {
            let data = JSON.stringify(this.myConfig);
            console.log(data);
        }
    },
}
</script>
  
<style src="./css/ConfigurationPage.css" scoped></style>
  
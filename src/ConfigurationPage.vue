<template>
  <div>
    <ul class="option-list">
      <li v-for="option in options" :key="option.name">
        <component
          :is="getOptionType(option)"
          :option="option"
          @config-input="(n) => (option.value = n)"
        />
      </li>
    </ul>
    <button @click="saveConfig()">Save</button>
  </div>
</template>

<script>
import SliderOption from "@/components/options/SliderOption.vue";
import InputOption from "@/components/options/InputOption.vue";
import MultipleOption from "@/components/options/MultipleOption.vue";
import DropdownOption from "@/components/options/DropdownOption.vue";

export default {
  name: "ConfigurationPage",
  components: {
    SliderOption,
    InputOption,
    MultipleOption,
    DropdownOption,
  },
  data() {
    return {
      filesInfos: [],
      tidyHubApi: process.env.VUE_APP_HUB,
      options: null,
    };
  },
  async mounted() {
    try {
      this.options = require("@/assets/configurationExample.json");
    } catch (error) {
      console.error("Error loading JSON data:", error);
    }
  },
  methods: {
    getOptionType(option) {
      switch (option.type) {
        case "Slider":
          return "SliderOption";
        case "MultipleChoice":
          return "MultipleOption";
        case "Input":
          return "InputOption";
        case "Dropdown":
          return "DropdownOption";
        default:
          return "Input";
      }
    },
    saveConfig() {
      let data = JSON.stringify(this.options);
      console.log(data);
    },
  },
};
</script>

<style src="./css/ConfigurationPage.css" scoped></style>

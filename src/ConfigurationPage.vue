<template>
  <div>
    <NavBar />
    <ApiLoader :api-url="tidyHubApi + 'api/User/getData'">
      <template #default="{ data }">
        <ul class="option-list" :data="data">
          <li v-for="option in options" :key="option.name">
            <component
              :is="getOptionType(option)"
              :option="option"
              @config-input="(n) => (option.value = n)"
            />
          </li>
        </ul>
      </template>
    </ApiLoader>
    <button @click="saveConfig()">Save</button>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ApiLoader from "@/components/ApiLoader.vue"
import { postData } from "@/communication/communication.js";
import SliderOption from "@/components/options/SliderOption.vue";
import InputOption from "@/components/options/InputOption.vue";
import MultipleOption from "@/components/options/MultipleOption.vue";
import DropdownOption from "@/components/options/DropdownOption.vue";

export default {
  name: "ConfigurationPage",
  components: {
    NavBar,
    ApiLoader,
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
      postData(this.tidyHubApi + 'api/User/setConfig', { data })
      console.log(data);
    },
  },
};
</script>

<style src="./css/ConfigurationPage.css" scoped></style>

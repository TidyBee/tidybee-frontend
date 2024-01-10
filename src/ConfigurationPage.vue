<template>
  <v-main>
    <v-container class="text-center d-flex align-center">
      <v-spacer />
      <v-col cols="12" md="6">
        <div>
          <v-list>
            <v-list-item v-for="option in options" :key="option.name">
              <component
                :is="getOptionType(option)"
                :option="option"
                @config-input="(n) => (option.value = n)"
              />
            </v-list-item>
          </v-list>
          <v-btn @click="saveConfig()">{{ $t("parameters.save") }}</v-btn>
        </div>
      </v-col>
      <v-spacer />
    </v-container>
  </v-main>
</template>

<script>
import SliderOption from "@/components/options/SliderOption.vue";
import InputOption from "@/components/options/InputOption.vue";
import MultipleOption from "@/components/options/MultipleOption.vue";
import DropdownOption from "@/components/options/DropdownOption.vue";
import { postData, fetchData } from "@/communication/communication.js";

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
      tidyHubApi: process.env.VUE_APP_HUB,
      options: null,
    };
  },
  async mounted() {
    try {
      const response = fetchData(this.tidyHubApi + "api/settings/get"); // exemple
      if (response.status == 200 && response.data) {
        this.option = response.data;
      } else {
        console.log("Error loading data, now loading default parameters");
        this.options = require("./configurationFiles/default_parameters.json");
      }
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
      postData(this.tidyHubApi + "api/settings/set", data);
    },
  },
};
</script>

<style src="./css/ConfigurationPage.css" scoped></style>

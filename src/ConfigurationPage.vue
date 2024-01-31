<template>
  <v-main>
    <v-tabs v-model="selectedType" centered color="grey-darken-2">
      <v-spacer />
      <v-tab
        v-for="type in types"
        :key="type"
        :text="type"
        :data-cy="$t(type)"
      ></v-tab>
      <v-spacer />
    </v-tabs>
    <v-container class="text-center d-flex align-center">
      <v-spacer />
      <v-col cols="12" md="6">
        <div>
          <v-list>
            <v-list-item v-for="(option, index) in options" :key="index">
              <v-list-item-title :data-cy="$t(option.name + '-title')">
                {{ $t(`parameters.${option.name}`) }} <br />
              </v-list-item-title>
              <v-select
                v-model="value"
                :label="option.value"
                :data-cy="$t(option.name + '-select')"
                @disabled="true"
                @update:model-value="updateValue"
              />
            </v-list-item>
          </v-list>
          <v-btn :data-cy="$t('save')" @click="saveConfig">
            {{ $t("parameters.save") }}
          </v-btn>
        </div>
      </v-col>
      <v-spacer />
    </v-container>
  </v-main>
</template>

<script>
import { postData, fetchData } from "@/communication/communication.js";

export default {
  name: "ConfigurationPage",
  data() {
    return {
      tidyHubApi: process.env.VUE_APP_HUB,
      options: {},
      types: ["Flexible", "Normal", "Strict"],
      selectedType: "Flexible",
    };
  },
  watch: {
    selectedType: "loadConfigForSelectedType",
  },
  async mounted() {
    try {
      const response = await fetchData(this.tidyHubApi + "api/settings/get");
      if (response.status === 200 && response.data) {
        this.options = response.data;
      } else {
        console.log("Selected Type:", this.selectedType);
        console.log("Error loading data, now loading default parameters");
        await this.loadConfigForSelectedType();
      }
    } catch (error) {
      console.error("Error loading JSON data:", error);
    }
  },
  methods: {
    async loadConfigForSelectedType() {
      try {
        console.log("Selected Type Load:", this.selectedType);
        const newOptions = JSON.parse(
          JSON.stringify(
            require(`./configurationFiles/${this.selectedType}.json`),
          ),
        );

        this.options = newOptions;

        console.log("option:", this.options);
        console.log("newOptions[1].value:", this.options[1].value);
      } catch (error) {
        console.error("Error loading JSON data:", error);
      }
    },
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

<template>
  <v-card class="rounded-rectangle" elevation="10" :data-cy="`settings-container`">
    <ApiLoader :api-url="tidyHubApi" class="full-height">
      <template #default="{ data }">
        <div v-if="data">
          <v-card class="rounded-rectangle-settings-title" :data-cy="`settings-title-container`">
            <v-tabs v-model="tab" direction="vertical" :hide-slider="true">
              <v-tab v-for="(rule, index) in getWidgetNames(data)" :key="index" :value="rule.name">
                {{ rule.name }}
              </v-tab>
            </v-tabs>
          </v-card>
          <v-card class="rounded-rectangle-settings-content" :data-cy="`settings-content-container`">
            <div v-if="selectedRule(data)">
              <v-row>
                <v-virtual-scroll :height="650" style="margin-top: 15px" :items="selectedRuleConfiguration(data)">
                  <template #default="{ item: config }">
                    <v-list-item cols="12">
                      <SettingItem :config="config" />
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-row>
            </div>
          </v-card>
        </div>
      </template>
    </ApiLoader>
  </v-card>
</template>

<script>
import ApiLoader from "@/components/communication/ApiLoader.vue";
import SettingItem from "@/components/Settings/SettingItem.vue";

export default {
  name: "ConfigurationWidget",
  components: {
    ApiLoader,
    SettingItem
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tab: "misnamed",
      selectedTabLabel: "MISNAMED",
    };
  },
  methods: {
    getWidgetNames(data) {
      try {
        let parsedData = JSON.parse(data);
        console.log(parsedData.rules)
        return parsedData.rules
      } catch (error) {
        console.error("Erreur lors du parsing JSON :", error);
        return null;
      }
    },
    selectedRule(data) {
      try {
        let parsedData = JSON.parse(data);
        if (!parsedData && !parsedData.rules) {
          return null;
        }
        return parsedData.rules.find(rule => rule.name === this.tab);
      } catch (error) {
        console.error("Erreur lors du parsing JSON :", error);
        return null;
      }
    },
    selectedRuleConfiguration(data) {
      try {
        let parsedData = JSON.parse(data);
        if (!parsedData && !parsedData.rules) {
          return null;
        }
        console.log(parsedData.rules.find(rule => rule.name === this.tab).configurations)
        return parsedData.rules.find(rule => rule.name === this.tab).configurations;
      } catch (error) {
        console.error("Erreur lors du parsing JSON :", error);
        return null;
      }
    }
  },
};
</script>

<style scoped src="@/../css/components/Settings/ConfigurationWidget.css"> </style>

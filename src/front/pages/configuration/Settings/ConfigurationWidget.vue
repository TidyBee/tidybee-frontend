<template>
  <v-card class="rounded-rectangle" elevation="10" :data-cy="`settings-container`">
    <ApiLoader :api-url="tidyHubApi" class="full-height">
      <template #default="{ data }">
        <div v-if="data" class="full-height">
          <v-card class="rounded-rectangle-settings-title full-height" :data-cy="`settings-title-container`">
            <v-tabs direction="vertical" :hide-slider="true" class="full-height">
              <div class="upper-tab-border">
                <v-tab v-for="(rule, index) in data.rules" :key="index" class="rule-tab"
                  :class="{ 'rule-active': isRuleSelected(rule.name) }" @click="tab = rule.name">
                  {{ $t('settings.rule.' + rule.name) }}
                </v-tab>
              </div>
              <div class="upper-tab-border">
                <v-tab class="rule-tab" @click="severityDialog = true">
                  Sévérité des règles
                </v-tab>
              </div>
              <div class="bottom-tab-border">
                <IntegrationWidget />
              </div>
            </v-tabs>
          </v-card>
          <v-card class="rounded-rectangle-settings-content" :data-cy="`settings-content-container`">
            <div v-if="selectedRule(data)">
              <v-row>
                <v-col class="text-left mt-4 mx-3 text-wrap" cols="12">
                  {{ selectedRule(data).description }}
                </v-col>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-virtual-scroll :height="600" style="margin-top: 10px" :items="selectedRule(data).configurations">
                  <template #default="{ item: config }">
                    <v-list-item cols="12">
                      <SettingItem v-if="hasSubRules(selectedRule(data))" :config="config"
                        :translate-name="selectedRule(data).name != 'misnamed'" />
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-row>
            </div>
          </v-card>
        </div>
        <v-dialog v-model="severityDialog" max-width="600px">
          <SeverityWidget :rules="data.rules" @close="severityDialog = false" />
        </v-dialog>
      </template>
    </ApiLoader>
  </v-card>
</template>

<script>
import ApiLoader from "@/front/utils/websockets/ApiLoader.vue";
import SettingItem from "./SettingItem.vue";
import IntegrationWidget from "./IntegrationWidget.vue";
import SeverityWidget from "./SeverityWidget.vue";

export default {
  name: "ConfigurationWidget",
  components: {
    ApiLoader,
    SettingItem,
    IntegrationWidget,
    SeverityWidget
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
      severityDialog: false,

    };
  },
  computed: {
    selectedRule() {
      return (data) => {
        if (data && data.rules) {
          return data.rules.find(rule => rule.name === this.tab);
        }
        return null;
      };
    },
  },
  methods: {
    isRuleSelected(name) {
      return this.tab === name;
    },
    hasSubRules(rule) {
      let config = rule.configurations;
      if (config.length > 1 || rule.description != config[0]?.description)
        return true;
      return false;
    }
  }
};
</script>

<style scoped src="./ConfigurationWidget.css"></style>
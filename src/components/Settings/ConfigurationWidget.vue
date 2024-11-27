<template>
  <v-card class="rounded-rectangle" elevation="10" :data-cy="`settings-container`">
    <ApiLoader :api-url="tidyHubApi" class="full-height">
      <template #default="{ data }">
        <div v-if="data" class="full-height">
          <v-card class="rounded-rectangle-settings-title full-height" :data-cy="`settings-title-container`">
            <v-tabs direction="vertical" :hide-slider="true" class="full-height">
              <div class="upper-tab-border">
                <v-tab v-for="(rule, index) in data.rules" :key="index" class="rule-tab" @click="tab = rule.name">
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
                  <b>{{ $t('settings.rule.' + tab) }}</b>
                  <br>
                  <br>
                  {{ $t('settings.descriptions.' + tab) }}
                </v-col>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-virtual-scroll :height="540" style="margin-top: 10px" :items="selectedRule(data).configurations">
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
        <v-dialog v-model="severityDialog" max-width="600px">
          <SeverityWidget :rules="data.rules" @close="severityDialog = false" />
        </v-dialog>
        <!-- <v-dialog v-model="severityDialog" max-width="600px">
          <v-card class="rounded-dialog">
            <v-card-title>
              Sévérité des règles
            </v-card-title>
            <v-card-text>
              <p>
                Veuillez choisir le degré de sévérité des règles.
              </p>
              <p>
                La sévérité a impact direct sur le score de vos fichiers.
              </p>
              <br />
              <br />
              <br />
              <v-container>
                <v-row>
                  <v-col />
                  <v-col class="text-center">
                    Faible
                  </v-col>
                  <v-col class="text-center">
                    Moyen
                  </v-col>
                  <v-col class="text-center">
                    Elevé
                  </v-col>
                </v-row>
                <br />
                <v-radio-group v-for="(rule, index) in data.rules" :key="index" v-model="rule.weight">
                  <v-row>
                    <v-col class="text-center grid-items">
                      {{ $t('settings.rule.' + rule.name) }}
                    </v-col>
                    <v-col class="text-center grid-items">
                      <v-radio :value="1" />
                    </v-col>
                    <v-col class="text-center grid-items">
                      <v-radio :value="2" />
                    </v-col>
                    <v-col class="text-center grid-items">
                      <v-radio :value="3" />
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="severityDialog = false">Annuler</v-btn>
              <v-btn text @click="severityDialog = false">Soumettre</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
      </template>
    </ApiLoader>
  </v-card>
</template>

<script>
import ApiLoader from "@/components/communication/ApiLoader.vue";
import SettingItem from "@/components/Settings/SettingItem.vue";
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
    }
  },
};
</script>

<style scoped src="@/../css/components/Settings/ConfigurationWidget.css"></style>
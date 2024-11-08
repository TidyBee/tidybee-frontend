<template>
  <ApiLoader :api-url="tidyHubApi" class="full-height full-width" classes="full-width settings-width">
    <template #default="{ data }">
      <div v-if="data" :data-cy="`settings-title-container`">
        <v-text-field v-model="searchText" placeholder="Rechercher une règle" prepend-inner-icon="mdi-magnify" />
        <div v-for="(rule, index) in data.rules" :key="index" :value="rule.name">
          <v-card v-if="filterConfigs(rule.configurations).length > 0" style="text-align: left; padding: 10px; font-weight: 600; background-color: #D9D9D9;">
            {{ rule.name }}
          </v-card>
          <div>
            <div v-for="(config, i) in filterConfigs(rule.configurations)" :key="i" :value="config.name" class="d-flex flex-row align-center">
              <v-icon icon="mdi-arrow-right-bottom" />
              <SettingItem :config="config" class="full-width" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </ApiLoader>

  <!-- <v-card class="rounded-rectangle" elevation="10" :data-cy="`settings-container`">
    <ApiLoader :api-url="tidyHubApi" class="full-height">
      <template #default="{ data }">
        <div v-if="data">
          <v-card class="rounded-rectangle-settings-title" :data-cy="`settings-title-container`">
            <v-tabs v-model="tab" direction="vertical" :hide-slider="true">
              <v-tab v-for="(rule, index) in data.rules" :key="index" :value="rule.name">
                {{ rule.name }}
              </v-tab>
            </v-tabs>
          </v-card>
          <v-card class="rounded-rectangle-settings-content" :data-cy="`settings-content-container`">
            <div v-if="selectedRule(data)">
              
              <v-row>
                <v-virtual-scroll :height="650" style="margin-top: 15px" :items="filterConfigs(selectedRule(data).configurations)">
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
</v-card> -->
</template>

<script>
import ApiLoader from "@/components/communication/ApiLoader.vue";
import SettingItem from "@/components/Settings/SettingItem.vue";

export default {
  name: "ConfigurationWidget",
  components: {
    ApiLoader,
    SettingItem,
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
      searchText: ""
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
    filterConfigs(configs) {
      const searchTextLower = this.searchText.toLowerCase();
      console.log(configs.filter(config =>
        config.name.toLowerCase().includes(searchTextLower)
      ));
      return configs.filter(config =>
        config.name.toLowerCase().includes(searchTextLower)
      );
    }
  }
};
</script>

<style scoped src="@/../css/components/Settings/ConfigurationWidget.css"></style>
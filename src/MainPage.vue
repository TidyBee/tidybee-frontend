<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" md="2">
          <v-row>
            <FileList
              v-if="Heaviest"
              :tidy-hub-api="tidyHubApi + 'api/Dashboard/top-heaviest-files'"
              :widget-name="'Top Heaviest Files'"
              @click="handleFileListClick('Heaviest')"
            />
          </v-row>
          <v-row>
            <FileList
              v-if="Unused"
              :tidy-hub-api="tidyHubApi + 'api/Dashboard/top-heaviest-files'"
              :widget-name="'Top Unused Files'"
              @click="handleFileListClick('Unused')"
          />
        </v-row>
        </v-col>
      </v-row>
      <panel-widget @toggle-widget="handleToggleWidget" />
    </v-container>
  </v-main>
</template>

<script>
import PanelWidget from "@/components/widgets/Panel.vue";
import FileList from "@/components/widgets/FileList.vue";

export default {
  name: "MainPage",
  components: {
    PanelWidget,
    FileList,
  },
  data() {
    return {
      filesInfos: [],
      tidyHubApi: process.env.VUE_APP_HUB,
      Heaviest: false,
      Unused: false,
    };
  },
  methods: {
    handleFileListClick(widgetName) {
      if (widgetName === 'Heaviest') {
        this.Heaviest = false;
      } else if (widgetName === 'Unused') {
        this.Unused = false;
      }
    },
    handleToggleWidget(status, widgetName) {
      console.log("HERE");
      if (widgetName === 'Heaviest') {
        this.Heaviest = status;
      } else if (widgetName === 'Unused') {
        this.Unused = status;
      }
    }
  },
};
</script>

<style scoped>
</style>

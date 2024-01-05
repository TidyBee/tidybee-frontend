<template>
  <v-main class="bg-grey-lighten-3">
    <v-container>
      <v-row align="center">
        <v-col v-for="widget in visibleWidgets" :key="widget.name" cols="12" md="3">
          <v-btn icon @click="handleFileListClick(widget.name)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <FileList
            :tidy-hub-api="tidyHubApi + widget.apiEndpoint"
            :widget-name="widget.displayName"
          />
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
      widgets: [
        { name: 'Heaviest', displayName: 'Top Heaviest Files', apiEndpoint: 'api/Dashboard/top-heaviest-files', show: false },
        { name: 'Unused', displayName: 'Top Unused Files', apiEndpoint: 'api/Dashboard/top-heaviest-files', show: false },
        { name: 'Badnamed', displayName: 'Top Badnamed Files', apiEndpoint: 'api/Dashboard/top-heaviest-files', show: false },
      ],
    };
  },
  computed: {
    visibleWidgets() {
      return this.widgets.filter(widget => widget.show);
    },
  },
  methods: {
    handleFileListClick(widgetName) {
      const widget = this.widgets.find(widget => widget.name === widgetName);
      if (widget) {
        widget.show = !widget.show;
      }
    },
    handleToggleWidget(status, widgetName) {
      const widget = this.widgets.find(widget => widget.name === widgetName);
      if (widget) {
        widget.show = status;
      }
    },
  },
};
</script>


<style scoped>
</style>

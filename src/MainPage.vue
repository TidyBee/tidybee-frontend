<template>
  <v-main class="bg-grey-lighten-3">
    <!-- <AddButton @click="addToGrid()" /> -->
    <div @click="cancelLongPress">
      <v-container>
        <v-row align="center">
          <v-col
            v-for="widget in visibleWidgets"
            :key="widget.name"
            cols="12"
            md="3"
          >
            <v-btn icon @click="addSpecificWidget(widget.name)">
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
      <GridComponent ref="gridRef" :tidy-hub-api="tidyHubApi" />
    </div>
  </v-main>
</template>

<script>
import GridComponent from "@/components/GridComponent.vue";
import PanelWidget from "@/components/widgets/Panel.vue";

export default {
  name: "MainPage",
  components: {
    GridComponent,
    PanelWidget,
  },
  data() {
    return {
      tidyHubApi: process.env.VUE_APP_HUB,
      widgets: [
        {
          name: "Heaviest",
          displayName: "Top Heaviest Files",
          apiEndpoint: "/Gateway/getNewParsing",
          widgetType: "FileList",
        },
        {
          name: "Unused",
          displayName: "Top Unused Files",
          apiEndpoint: "/proxy/get_files?amount=5&sort_by=size",
          widgetType: "FileList",
        },
        {
          name: "Misnamed",
          displayName: "Top misnamed Files",
          apiEndpoint: "/proxy/get_files?amount=5&sort_by=size",
          widgetType: "FileList",
        },
        {
          name: "TextWidget",
          displayName: "Text Widget",
          apiEndpoint: "/proxy/get_files?amount=5&sort_by=size",
          widgetType: "TextWidget",
        },
        {
          name: "Directory",
          displayName: "Folder tracker",
          apiEndpoint: "/proxy/get_files?amount=5&sort_by=size",
          widgetType: "FolderWidget",
        },
      ],
    };
  },
  computed: {
    visibleWidgets() {
      return this.widgets.filter((widget) => widget.show);
    },
  },
  methods: {
    handleToggleWidget(widgetName, size) {
      this.widgets.forEach((widget) => {
        if (widgetName === widget.name) {
          this.$refs.gridRef.addWidget(widget, size);
        }
      });
    },
  },
};
</script>

<style src="@/css/MainPage.css" scoped></style>

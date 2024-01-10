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
    <grid-layout
      v-model:layout="widgetLayout"
      :col-num="12"
      :row-height="75"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :responsive="true"
      :vertical-compact="false"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in widgetLayout"
        :key="item.index"
        :static="item.static"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        drag-allow-from=".header"
        drag-ignore-from=".file_item"
      >
        <component
          :is="item.widgetType"
          class="grid-widget"
          :tidy-hub-api="tidyHubApi + item.widgetUrl"
          :widget-name="item.widgetName"
        />
      </grid-item>
    </grid-layout>
    <AddButton @click="addWidget()" />
  </v-main>
</template>

<script>
import PanelWidget from "@/components/widgets/Panel.vue";
import FileList from "@/components/widgets/FileList.vue";
import { GridLayout, GridItem } from "vue3-grid-layout-next";
import AddButton from "@/components/AddButton.vue";
// import PostButton from "@/components/widgets/PostButton.vue";

export default {
  name: "MainPage",
  components: {
    PanelWidget,
    FileList,
    GridLayout,
    GridItem,
    AddButton,
    // PostButton,
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
      widgetLayout: [
        {
          x: 0,
          y: 0,
          w: 3,
          h: 3,
          i: "0",
          widgetType: "FileList",
          widgetUrl: "api/Dashboard/top-heaviest-files",
          widgetName: "TopHeaviestFiles",
          static: false,
        },
      ],
      lastI: 0,
      draggable: true,
      resizable: true,
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
    addWidget() {
      this.lastI++;
      this.widgetLayout.push({
        x: 0,
        y: 0,
        w: 3,
        h: 3,
        i: this.lastI.toString(),
        widgetType: "FileList",
        widgetUrl: "api/Dashboard/top-heaviest-files",
        widgetName: "TopHeaviestFiles",
        static: false,
      });
    },
  },
};
</script>

<style src="@/css/MainPage.css" scoped></style>

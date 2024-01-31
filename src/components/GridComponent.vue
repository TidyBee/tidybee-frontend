<template>
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
</template>

<script>
import { GridLayout, GridItem } from "vue3-grid-layout-next";
import FileList from "@/components/widgets/FileList.vue";
import FolderWidget from "@/components/widgets/FolderWidget.vue";

export default {
  name: "GridComponent",
  components: {
    FileList,
    FolderWidget,
    GridLayout,
    GridItem,
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filesInfos: [],
      widgetLayout: [
        {
          x: 0,
          y: 0,
          w: 3,
          h: 3,
          i: "0",
          widgetType: "FileList",
          widgetUrl: "/proxy/get_files?amount=5&sort_by=size",
          widgetName: "TopHeaviestFiles",
          static: false,
        },
        {
          x: 0,
          y: 0,
          w: 3,
          h: 3,
          i: "1",
          widgetType: "FolderWidget",
          widgetUrl: "api/Dashboard/files?nbFiles=20",
          widgetName: "FOLDER",
          static: false,
        },
      ],
      lastI: 0,
      draggable: true,
      resizable: true,
    };
  },
  methods: {
    addWidget() {
      this.lastI++;
      this.widgetLayout.push({
        x: 0,
        y: 0,
        w: 3,
        h: 3,
        i: this.lastI.toString(),
        widgetType: "FileList",
        widgetUrl: "/proxy/get_files?amount=5&sort_by=size",
        widgetName: "TopHeaviestFiles",
        static: false,
      });
    },
  },
};
</script>

<style src="@/css/MainPage.css" scoped></style>

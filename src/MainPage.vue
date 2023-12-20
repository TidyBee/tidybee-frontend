<template>
  <v-main class="bg-grey-lighten-3">
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
        <component class="grid-widget"
          :is="item.widgetType"
          :tidy-hub-api="tidyHubApi + item.widgetUrl"
          :widget-name="item.widgetName"
        />
      </grid-item>
    </grid-layout>
    <AddButton @click="addWidget()" />
  </v-main>
</template>


<script>
import FileList from "@/components/widgets/FileList.vue";
import { GridLayout, GridItem } from "vue3-grid-layout-next"
import AddButton from "@/components/AddButton.vue"
// import PostButton from "@/components/widgets/PostButton.vue";

export default {
  name: "MainPage",
  components: {
    FileList,
    GridLayout,
    GridItem,
    AddButton
    // PostButton,
  },
  data() {
    return {
      filesInfos: [],
      tidyHubApi: process.env.VUE_APP_HUB,
      widgetLayout: [
        {"x":0,"y":0,"w":3,"h":3,"i":"0", "widgetType":"FileList", "widgetUrl":"api/Dashboard/top-heaviest-files", "widgetName":"TopHeaviestFiles", static: false},
      ],
      lastI: 0,
      draggable: true,
      resizable: true,
    };
  },
  methods: {
    addWidget() {
      this.lastI++;
      this.widgetLayout.push({"x":0,"y":0,"w":3,"h":3,"i":(this.lastI).toString(), "widgetType":"FileList", "widgetUrl":"api/Dashboard/top-heaviest-files", "widgetName":"TopHeaviestFiles", static: false})
    }
  }
};
</script>


<style src="@/css/MainPage.css" scoped></style>
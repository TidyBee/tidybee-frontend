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
      >
        <FileList style="height: 100%;"
          :tidy-hub-api="tidyHubApi + 'api/Dashboard/top-heaviest-files'"
          :widget-name="'Top Heaviest Files'"
        />
      </grid-item>
    </grid-layout>
  </v-main>
</template>


<script>
import FileList from "@/components/widgets/FileList.vue";
import { GridLayout, GridItem } from "vue3-grid-layout-next"
// import PostButton from "@/components/widgets/PostButton.vue";

export default {
  name: "MainPage",
  components: {
    FileList,
    GridLayout,
    GridItem
    // PostButton,
  },
  data() {
    return {
      filesInfos: [],
      tidyHubApi: process.env.VUE_APP_HUB,
      widgetLayout: [
        {"x":0,"y":0,"w":3,"h":3,"i":"0", static: false},
        {"x":3,"y":0,"w":3,"h":3,"i":"1", static: false},
        {"x":6,"y":0,"w":3,"h":3,"i":"2", static: false},
        {"x":9,"y":0,"w":3,"h":3,"i":"3", static: false},
      ],
      draggable: true,
      resizable: true,
    };
  },
};
</script>


<style src="@/css/MainPage.css" scoped></style>
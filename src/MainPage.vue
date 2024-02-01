<template>
  <v-main class="bg-grey-lighten-3">
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
          @mousedown="startLongPress(item.i)"
        >
          <component
            :is="item.widgetType"
            class="grid-widget"
            :tidy-hub-api="tidyHubApi + item.widgetUrl"
            :widget-name="item.widgetName"
          />
          <v-dialog v-model="dialog1" max-width="300">
            <v-card>
              <v-card-title> {{ $t("widgetPanel.delete") }}</v-card-title>
              <v-btn
                class="mb-3 elevate"
                @click="removeWidget(), closeDialog()"
              >
                {{ $t("widgetPanel.yes") }}
              </v-btn>
              <v-btn class="mb-3 elevate" @click="closeDialog()">
                {{ $t("widgetPanel.no") }}
              </v-btn>
            </v-card>
          </v-dialog>
        </grid-item>
      </grid-layout>
    </div>
  </v-main>
</template>

<script>
import PanelWidget from "@/components/widgets/Panel.vue";
import FileList from "@/components/widgets/FileList.vue";
import FolderWidget from "@/components/widgets/FolderWidget.vue";
import { GridLayout, GridItem } from "vue3-grid-layout-next";
import AddButton from "@/components/AddButton.vue";

export default {
  name: "MainPage",
  components: {
    PanelWidget,
    FileList,
    FolderWidget,
    GridLayout,
    GridItem,
    AddButton,
  },
  data() {
    return {
      filesInfos: [],
      tidyHubApi: process.env.VUE_APP_HUB,
      widgets: [
        {
          name: "Heaviest",
          displayName: "Top Heaviest Files",
          apiEndpoint: "api/Dashboard/top-heaviest-files",
          widgetType: "FileList",
        },
        {
          name: "Unused",
          displayName: "Top Unused Files",
          apiEndpoint: "api/Dashboard/top-heaviest-files",
          widgetType: "FileList",
        },
        {
          name: "Missnamed",
          displayName: "Top missnamed Files",
          apiEndpoint: "api/Dashboard/top-heaviest-files",
          widgetType: "FileList",
        },
      ],
      widgetLayout: [
        {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
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
      showDeleteButton: null,
      longPressTimeout: null,
      dialog1: false,
    };
  },
  computed: {
    visibleWidgets() {
      return this.widgets.filter((widget) => widget.show);
    },
  },
  methods: {
    startLongPress(widgetIndex) {
      this.showDeleteButton = widgetIndex;
      this.dialogItemIndex = widgetIndex;
      this.longPressTimeout = setTimeout(() => {
        this.dialog1 = true;
      }, 1000);
    },
    removeWidget() {
      this.widgetLayout = this.widgetLayout.filter(
        (item) => item.i !== this.dialogItemIndex,
      );
      this.showDeleteButton = null;
    },
    handleToggleWidget(widgetName, size) {
      this.widgets.forEach((widget) => {
        if (widgetName === widget.name) {
          this.lastI++;
          this.widgetLayout.push({
            x: 0,
            y: 0,
            w: size.x,
            h: size.y,
            i: this.lastI.toString(),
            widgetType: widget.widgetType,
            widgetUrl: widget.apiEndpoint,
            widgetName: widget.displayName,
            static: false,
          });
        }
      });
    },
    closeDialog() {
      this.dialog1 = false;
    },
  },
};
</script>

<style src="@/css/MainPage.css" scoped></style>

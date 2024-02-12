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
    @layout-updated="cancelLongPress()"
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
      @mouseup="cancelLongPress()"
    >
      <component
        :is="item.widgetType"
        :data-cy="$t('widget-' + item.widgetName)"
        class="grid-widget"
        :tidy-hub-api="tidyHubApi + item.widgetUrl"
        :widget-name="item.widgetDisplayName"
      />
      <v-dialog v-model="dialog1" max-width="300">
        <v-card>
          <v-card-title> {{ $t("widgetPanel.delete") }}</v-card-title>
          <v-btn
            :data-cy="$t('widget-delete-btn-yes')"
            class="mb-3 elevate"
            @click="removeWidget(), closeDialog()"
          >
            {{ $t("widgetPanel.yes") }}
          </v-btn>
          <v-btn
            :data-cy="$t('widget-delete-btn-no')"
            class="mb-3 elevate"
            @click="closeDialog()"
          >
            {{ $t("widgetPanel.no") }}
          </v-btn>
        </v-card>
      </v-dialog>
    </grid-item>
  </grid-layout>
</template>

<script>
import { GridLayout, GridItem } from "vue3-grid-layout-next";
import FileList from "@/components/widgets/FileList.vue";
import FolderWidget from "@/components/widgets/FolderWidget.vue";
import CarbonWidget from "@/components/widgets/CarbonWidget.vue";

export default {
  name: "GridComponent",
  components: {
    FileList,
    FolderWidget,
    GridLayout,
    GridItem,
    CarbonWidget,
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
      widgetLayout: [],
      lastI: 0,
      draggable: true,
      resizable: true,
      showDeleteButton: null,
      longPressTimeout: null,
      longPressCancel: false,
      dialog1: false,
    };
  },
  methods: {
    addWidget(widget, size) {
      this.lastI++;
      this.widgetLayout.push({
        x: 0,
        y: 0,
        w: size.x,
        h: size.y,
        i: this.lastI.toString(),
        widgetType: widget.widgetType,
        widgetUrl: widget.apiEndpoint,
        widgetDisplayName: widget.displayName,
        widgetName: widget.name,
        static: false,
      });
      console.log(this.widgetLayout);
    },
    removeWidget() {
      this.widgetLayout = this.widgetLayout.filter(
        (item) => item.i !== this.dialogItemIndex,
      );
      this.showDeleteButton = null;
    },
    cancelLongPress() {
      this.longPressCancel = true;
    },
    startLongPress(widgetIndex) {
      this.showDeleteButton = widgetIndex;
      this.dialogItemIndex = widgetIndex;
      this.longPressCancel = false;
      this.longPressTimeout = setTimeout(() => {
        if (!this.longPressCancel) {
          this.dialog1 = true;
        }
      }, 1000);
    },
    closeDialog() {
      this.dialog1 = false;
    },
  },
};
</script>

<style src="@/css/MainPage.css" scoped></style>

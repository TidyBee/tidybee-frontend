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
    @layout-updated="saveNewChanges()"
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
        :data-cy="'widget-' + item.widgetName"
        class="grid-widget"
        :tidy-hub-api="tidyHubApi + item.widgetUrl"
        :widget-name="item.widgetDisplayName"
        :widget="item"
        @update-config="updateWidget"
      />
      <v-dialog v-model="dialog1" max-width="300">
        <v-card>
          <v-card-title> {{ $t("widgetPanel.delete") }}</v-card-title>
          <v-btn
            :data-cy="'widget-delete-btn-yes'"
            class="mb-3 elevate"
            @click="removeWidget(), closeDialog()"
          >
            {{ $t("widgetPanel.yes") }}
          </v-btn>
          <v-btn
            :data-cy="'widget-delete-btn-no'"
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
import TextWidget from "@/components/widgets/TextWidget.vue";
import VueCookies from "vue-cookies";

export default {
  name: "GridComponent",
  components: {
    FileList,
    FolderWidget,
    GridLayout,
    GridItem,
    TextWidget,
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
  },
  setup() {
    if (!VueCookies.get(["widgetLayout"])) {
      VueCookies.set("widgetLayout", []);
    }
    const widgetLayoutCookie = VueCookies.get(["widgetLayout"]);
    return {
      widgetLayoutCookie,
    };
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
  mounted() {
    this.widgetLayout = this.widgetLayoutCookie.map((item, index) => ({
      ...item,
      i: (index + 1).toString(),
    }));
    this.lastI = Math.max(...this.widgetLayout.map((item) => parseInt(item.i)));
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
    },
    updateWidget(newConfig) {
      if (Number(newConfig) != "NaN" && Number(newConfig) > 0) {
        this.widgetLayout.find(
          (item) => item.i == this.dialogItemIndex,
        ).widgetUrl = "/proxy/get_files?amount=" + newConfig + "&sort_by=size";
        this.widgetLayout.find((item) => item.i == this.dialogItemIndex).extra =
          newConfig;
      } else {
        this.widgetLayout.find(
          (item) => item.i == this.dialogItemIndex,
        ).widgetUrl = "/proxy/get_files?amount=5&sort_by=size";
        this.widgetLayout.find((item) => item.i == this.dialogItemIndex).extra =
          NaN;
      }
      this.emitter.emit("refresh-widgets", {});
      this.saveNewChanges();
    },
    removeWidget() {
      this.widgetLayout = this.widgetLayout.filter(
        (item) => item.i !== this.dialogItemIndex,
      );
      this.showDeleteButton = null;
    },
    saveNewChanges() {
      VueCookies.set("widgetLayout", this.widgetLayout);
      this.cancelLongPress();
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

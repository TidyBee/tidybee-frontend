<template>
  <div>
    <v-btn :data-cy="$t('add-widget-btn')" color="grey" @click="openDialog(1)">
      +
    </v-btn>
    <v-dialog v-model="dialog1" max-width="500">
      <v-card>
        <v-card-title> {{ $t("widgetPanel.add") }}</v-card-title>
        <v-card-text>
          <div v-for="(widgetName, index) in widgetNames" :key="index">
            <v-btn
              :data-cy="$t('widgetPanel-' + widgetName + '-btn')"
              class="mb-3 elevate"
              @click="openDialog(2, index + 1), closeDialog(1)"
            >
              {{ $t("widgetPanel." + widgetName) }}
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :data-cy="$t('widget-panel-close-btn')"
            color="primary"
            @click="closeDialog(1)"
          >
            {{ $t("widgetPanel.close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" max-width="500">
      <v-card>
        <v-card-title>
          {{ $t("widgetPanel." + widgetNames[selectedButton - 1]) }}
        </v-card-title>
        <v-btn
          :data-cy="$t('widget-small-size-btn')"
          class="mb-3 elevate"
          @click="
            handleToggleWidget(widgetNames[selectedButton - 1], { x: 3, y: 3 })
          "
        >
          {{ smallsize[selectedButton - 1] }}
        </v-btn>
        <v-btn
          :data-cy="$t('widget-large-size-btn')"
          class="mb-3 elevate"
          @click="
            handleToggleWidget(widgetNames[selectedButton - 1], { x: 6, y: 6 })
          "
        >
          {{ largesize[selectedButton - 1] }}
        </v-btn>
        <v-card-actions>
          <v-btn
            :data-cy="$t('widget-panel-back-btn')"
            color="primary"
            @click="closeDialog(2), openDialog(1)"
          >
            {{ $t("widgetPanel.back") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "PanelWidget",
  emits: ["toggle-widget"],
  data() {
    return {
      dialog1: false,
      dialog2: false,
      selectedButton: null,
      smallsize: [
        "3x3",
        "3x3",
        // "3x3",
        "3x3",
        // "3x3",
        "3x3",
        "3x3",
      ],
      largesize: [
        "6x6",
        "6x6",
        // "6x6",
        "6x6",
        // "6x6",
        "6x6",
        "6x6",
      ],
      widgetNames: [
        "Heaviest",
        "Unused",
        //  "Dashboard",
        "Misnamed",
        //  "Tri",
        "TextWidget",
        "Directory",
      ],
    };
  },
  methods: {
    openDialog(dialogNumber, buttonIndex) {
      if (dialogNumber === 1) {
        this.selectedButton = null;
        this.dialog1 = true;
      } else if (dialogNumber === 2) {
        this.selectedButton = buttonIndex;
        this.dialog2 = true;
      }
    },
    closeDialog(dialogNumber) {
      if (dialogNumber === 1) {
        this.dialog1 = false;
      } else if (dialogNumber === 2) {
        this.dialog2 = false;
      }
    },
    handleToggleWidget(widgetName, size) {
      this.$emit("toggle-widget", widgetName, size);
      this.dialog1 = false;
      this.dialog2 = false;
    },
  },
};
</script>

<style scoped>
.mb-3 {
  margin-bottom: 15px;
}
</style>

<template>
  <div>
    <v-btn color="grey" @click="openDialog(1)">+</v-btn>

    <v-dialog v-model="dialog1" max-width="400">
      <v-card>
        <v-card-title> Widget Panel </v-card-title>
        <v-card-text>
          <div v-for="(button, index) in buttonTexts" :key="index">
            <v-btn
              class="mb-3 elevate"
              @click="openDialog(2, index + 1), closeDialog(1)"
            >
              {{ button }}
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="closeDialog(1)">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog2" max-width="400">
      <v-card>
        <v-card-title>
          {{ buttonTexts[selectedButton - 1] }}
        </v-card-title>
        <v-btn
          class="mb-3 elevate"
          @click="
            handleToggleWidget(widgetName[selectedButton - 1], { x: 3, y: 3 })
          "
        >
          3x3
        </v-btn>
        <v-btn
          class="mb-3 elevate"
          @click="
            handleToggleWidget(widgetName[selectedButton - 1], { x: 6, y: 6 })
          "
        >
          6x6
        </v-btn>
        <v-card-actions>
          <v-btn color="primary" @click="closeDialog(2), openDialog(1)">
            Retour
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
      buttonTexts: [
        "Top Heaviest File",
        "Top Unused File",
        // "Dashboard Dossier",
        "Top Missnamed File",
        // "Widget de Tri",
        // "Consomation Co2",
      ],
      widgetName: [
        "Heaviest",
        "Unused",
        //  "Dashboard",
        "Missnamed",
        //  "Tri",
        //  "Co2"
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

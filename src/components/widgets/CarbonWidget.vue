<template>
  <ApiLoader :api-url="tidyHubApi" class="full-height">
    <template #default="{}">
      <!-- <template> -->
      <v-list class="file_list full-height">
        <v-list-title class="header">
          {{ widgetName }}
          <img
            class="edit-icon"
            src="@/assets/editIcon.svg"
            @click="isOpen = !isOpen"
          />
        </v-list-title>
        <v-list-item class="emission_size"> 502 tCO2e </v-list-item>
        <v-list-item v-if="showEvolution"> + 12% </v-list-item>
        <!-- <v-list-item class="file_item"> -->
        <!-- <FileItem :file="file" /> -->
        <!-- </v-list-item> -->
      </v-list>
    </template>
  </ApiLoader>
  <span>
    <v-dialog v-model="isOpen" max-width="300px">
      <v-card>
        <v-form @submit.prevent>
          <v-list>
            <v-list-item class="evolution_option">
              {{ $t("carbonWidget.showEvolution") }}
              <br />
              <input v-model="showEvolution" type="checkbox" />
            </v-list-item>
          </v-list>
          <!-- <v-file-input webkitdirectory></v-file-input> -->
        </v-form>
        <v-btn type="close" @click="closeDialog">
          {{ $t("common.close") }}
        </v-btn>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import ApiLoader from "@/components/ApiLoader.vue";

export default {
  name: "CarbonWidget",
  components: {
    ApiLoader,
  },
  props: {
    tidyHubApi: {
      type: String,
      required: true,
    },
    widgetName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hoveredIndex: -1,
      selectedFolder: "",
      isOpen: false,
      showEvolution: false,
      rules: [
        (value) => {
          if (value) return true;

          return this.$t("common.missingInput");
        },
      ],
    };
  },
  methods: {
    closeDialog() {
      this.isOpen = false;
    },
  },
};
</script>

<style src="./css/FileList.css" scoped></style>

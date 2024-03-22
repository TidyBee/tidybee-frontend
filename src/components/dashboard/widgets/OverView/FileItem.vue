<template>
  <v-row>
    <v-col cols="10">
      <div class="text-left" :data-cy="`overviewwidget-fileitem-${replaceSpecificChar(parseFileName(file.pretty_path))}`">
        {{ parseFileName(file.pretty_path) }}
      </div>
    </v-col>
    <v-col cols="1">
      <span :data-cy="`overviewwidget-fileitem-tidyscore-${replaceSpecificChar(parseFileName(file.pretty_path))}`">
        {{ getGrade(file.tidy_score) }}
      </span>
    </v-col>
    <v-col cols="1">
      <img
        src="@/assets/icons/redirect.svg"
        class="redirect-icon"
        :data-cy="`overviewwidget-fileitem-open-tidyscore-${replaceSpecificChar(parseFileName(file.pretty_path))}`"
        @click="isOpen = !isOpen"
      />
    </v-col>
    <span>
      <v-dialog v-model="isOpen" max-width="300px">
        <v-card>
          <TidyScore :file="file" />
          <v-btn 
            :data-cy="`overviewwidget-fileitem-close-dialog`"
            @click="closeDialog"
          > 
            {{ $t("common.close") }}
          </v-btn>
        </v-card>
      </v-dialog>
    </span>
  </v-row>
  <v-divider></v-divider>
</template>

<script>
import TidyScore from "@/components/dashboard/widgets/OverView/TidyScore.vue";
import { getGrade } from "@/utils";

export default {
  name: "FileItem",
  components: {
    TidyScore,
  },
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    getGrade,
    openDialog() {
      this.isOpen = true;
    },
    closeDialog() {
      this.isOpen = false;
    },
    parseFileName(pretty_path) {
      if (pretty_path.includes('/')) {
        const segments = pretty_path.split('/');
        const fileName = segments[segments.length - 1];
        return fileName;
      } else {
        return pretty_path;
      }
    },
    replaceSpecificChar(str) {
      const replaceStr = str.replace(/[./_]/g, '-');
      return replaceStr;
    }
  }
};
</script>

<style src="@/../css/components/dashboard/FileItem.css" scoped></style>

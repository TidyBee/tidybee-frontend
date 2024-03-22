<template>
  <v-row>
    <v-col cols="10">
      <div
        class="text-left"
        :data-cy="$t(`overviewwidget-fileitem-${replaceSpecificChar(parseFileName(file.pretty_path))}`)"
      >
        {{ parseFileName(file.pretty_path) }}
      </div>
      <div v-if="isOpen" class="text-left pt-3 text-grey-darken-1" data-cy="tidyscore-information">
        {{ $t("fileView.general") }}
        <br>
        &nbsp;&nbsp;{{ $t("fileView.type") + parseFileType(file.pretty_path) }}
        <br>
        &nbsp;&nbsp;{{ $t("fileView.size") + formatFileSize(file.size) }}
        <br>
        &nbsp;&nbsp;{{ $t("fileView.lastUsed") + calculateElapsedTime(file.last_modified.secs_since_epoch) +
          $t("fileView.ago") }}
        <br>
        &nbsp;&nbsp;{{ $t("fileView.placement") + parseFilePlace(file.pretty_path) }}
      </div>
    </v-col>
    <v-col cols="1">
      <span
        v-if="!isOpen"
        :data-cy="$t(`overviewwidget-fileitem-tidyscore-${replaceSpecificChar(parseFileName(file.pretty_path))}`)"
      >
        {{ getGrade(file.tidy_score) }}
      </span>
      <TidyScore
        v-if="isOpen" :pie-data="getPieData(file.tidy_score)"
        :pie-color="getGradeColor(getGrade(file.tidy_score))" :score="getGrade(file.tidy_score)"
      >
      </TidyScore>
    </v-col>
    <v-col cols="1">
      <v-icon
        class="redirect-icon" :icon="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'" :data-cy="$t(`overviewwidget-fileitem-open-tidyscore-${replaceSpecificChar(parseFileName(file.pretty_path))}`)"
        @click="isOpen = !isOpen"
      />
    </v-col>
  </v-row>
  <v-divider></v-divider>
</template>

<script>
import { getGrade, calculateElapsedTime, formatFileSize, getGradeColor } from "@/utils";
import TidyScore from './TidyScore.vue';


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
    formatFileSize,
    getGrade,
    getGradeColor,
    calculateElapsedTime,
    getPieData(tidyScore) {
      const misnamedTitle = this.$t('fileView.misnamed') + (tidyScore?.misnamed ? this.$t('fileView.yes') : this.$t('fileView.no'));
      const duplicatedTitle = this.$t('fileView.duplicated') + (tidyScore?.duplicated ? this.$t('fileView.yes') : this.$t('fileView.no'));
      const unusedTitle = this.$t('fileView.unused') + (tidyScore?.unused ? this.$t('fileView.yes') : this.$t('fileView.no'));
      const heavyTitle = this.$t('fileView.heavy') + (tidyScore?.heavy ? this.$t('fileView.yes') : this.$t('fileView.no'));
      return ([{ value: 1, name: misnamedTitle, label: { show: false } }, { value: 1, name: duplicatedTitle, label: { show: false } }, { value: 1, name: unusedTitle, label: { show: false } }, { value: 1, name: heavyTitle, label: { show: false } }]);
    },
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
    },
    parseFileType(pretty_path) {
      const fileName = this.parseFileName(pretty_path);
      if (fileName.includes('.')) {
        const segments = fileName.split('.');
        const fileType = segments[segments.length - 1];
        return fileType;
      } else {
        return "N/A";
      }
    },
    parseFilePlace(pretty_path) {
      if (pretty_path.includes('/')) {
        const segments = pretty_path.split('/');
        let filePath = segments[0];
        for (let i = 1; i < segments.length - 2; i++)
          filePath += '/' + segments[i];
        return filePath;
      } else {
        return 'root';
      }
    }
  }
};
</script>

<style src="@/../css/components/dashboard/FileItem.css" scoped></style>

<template>
  <v-row>
    <v-col cols="3">
      <div
        class="text-left"
        :data-cy="(`overviewwidget-fileitem-${replaceSpecificChar(parseFileName(file.pretty_path))}`)"
      >
        {{ parseFileName(file.pretty_path) }}
      </div>
      <div v-if="isOpen" class="text-left pt-3 text-grey-darken-1 text-no-wrap" data-cy="tidyscore-information">
        {{ $t("fileView.general") }}
        <br>
        &nbsp;&nbsp;{{ $t("fileView.type") + parseFileType(file.pretty_path) }}
        <br>
        &nbsp;&nbsp;{{ $t("fileView.size") + formatFileSize(file.size) }}
        <br>
        &nbsp;&nbsp;{{ $t("fileView.lastUsed") + calculateElapsedTime(file.last_modified.secs_since_epoch, $t) +
          $t("fileView.ago") }}
        <br>
        &nbsp;&nbsp;{{ $t("fileView.placement") + parseFilePlace(file.pretty_path) }}
      </div>
    </v-col>
    <v-col cols="3">
      <span
        v-if="!isOpen"
        :data-cy="(`overviewwidget-fileitem-size-${replaceSpecificChar(parseFileName(file.pretty_path))}`)"
      >
        {{ formatFileSize(file.size) }}
      </span>
    </v-col>
    <v-col cols="3">
      <span
        v-if="!isOpen"
        :data-cy="(`overviewwidget-fileitem-date-${replaceSpecificChar(parseFileName(file.pretty_path))}`)"
      >
        {{ calculateElapsedTime(file.last_modified.secs_since_epoch, $t) }}
      </span>
    </v-col>
    <v-col cols="2">
      <span
        v-if="!isOpen"
        :data-cy="(`overviewwidget-fileitem-tidyscore-${replaceSpecificChar(parseFileName(file.pretty_path))}`)"
      >
        {{ getGrade(file.tidy_score) }}
      </span>
      <TidyScore
        v-if="isOpen" :pie-data="getPieData(file.tidy_score)" :pie-color="getGradeColor(getGrade(file.tidy_score))"
        :score="getGrade(file.tidy_score)" :t="$t"
      >
      </TidyScore>
    </v-col>
    <v-col cols="1">
      <v-icon
        class="redirect-icon" :icon="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        :data-cy="`overviewwidget-fileitem-toggle-tidyscore-${replaceSpecificChar(parseFileName(file.pretty_path))}`"
        @click="isOpen = !isOpen"
      />
    </v-col>
  </v-row>
  <v-divider></v-divider>
</template>

<script>
import TidyScore from "@/components/dashboard/widgets/OverView/TidyScore.vue";
import { getGrade, formatFileSize, calculateElapsedTime, parseFileName, getGradeColor } from "@/utils";

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
    parseFileName,
    getPieData(tidyScore) {
      // const misnamedTitle = this.$t('fileView.misnamed') + (tidyScore?.misnamed ? this.$t('fileView.yes') : this.$t('fileView.no'));
      // const duplicatedTitle = this.$t('fileView.duplicated') + (tidyScore?.duplicated ? this.$t('fileView.yes') : this.$t('fileView.no'));
      // const unusedTitle = this.$t('fileView.unused') + (tidyScore?.unused ? this.$t('fileView.yes') : this.$t('fileView.no'));
      // const heavyTitle = this.$t('fileView.heavy') + (tidyScore?.heavy ? this.$t('fileView.yes') : this.$t('fileView.no'));
      // return ([{ value: 1, name: misnamedTitle, label: { show: false } }, { value: 1, name: duplicatedTitle, label: { show: false } }, { value: 1, name: unusedTitle, label: { show: false } }, { value: 1, name: heavyTitle, label: { show: false } }]);
      return ([
        tidyScore?.misnamed,
        tidyScore?.duplicated,
        tidyScore?.unused,
        tidyScore?.heavy
      ])
    },
    openDialog() {
      this.isOpen = true;
    },
    closeDialog() {
      this.isOpen = false;
    },
    replaceSpecificChar(str) {
      const replaceStr = str.replace(/[./_]/g, "-");
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
